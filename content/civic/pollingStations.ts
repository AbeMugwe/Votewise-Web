/**
 * Where to register, and where to vote — the register-backed half.
 *
 * Types, copy and link builders live in ./venueCopy.ts and are re-exported
 * here, so server callers can keep importing everything from one place. A
 * client component must import ./venueCopy directly: this module reaches the
 * 14MB register through the loader below, and anything that imports it inherits
 * that graph.
 *
 * DATA INTEGRITY RULES — read before editing:
 *
 *  1. Polling stations are gazetted by the IEBC and they MOVE between cycles.
 *     Every venue carries `asOf` and `sourceUrl`, and the UI always tells the
 *     reader to confirm on the IEBC portal before travelling.
 *  2. Only the IEBC can tell a named person which station they are assigned to —
 *     that needs their ID number, which we deliberately do not collect. This
 *     dataset answers "which stations exist near me", not "which is mine".
 *  3. Coordinates are optional. A venue with no coordinates still renders as a
 *     name and a landmark, which is how most of Kenya's stations are found.
 *
 * Framework-free content module shared by the Next.js web app and the Expo
 * mobile app. Keep it free of React/DOM/RN imports so both bundlers can use it.
 */

export * from "./venueCopy";
import type { PollingVenue } from "./venueCopy";

/**
 * Venues live in ./data/venues.data.ts (content agent), split into one chunk per
 * county and loaded on demand.
 *
 * There is no eager `VENUES` array, and there must never be one again. The
 * gazetted register is 26,282 centres and about 14MB of JavaScript; when a
 * single `"use client"` component imported it, Next.js — correctly — bundled
 * the lot into an 11.1MB browser chunk. On the 2G connections this product
 * exists for, that is roughly half an hour of download for one page.
 *
 * So: the 48KB index (county -> constituencies -> wards) is cheap enough to
 * import anywhere and is what the pickers read, and the full rows for a single
 * county are fetched server-side, one chunk at a time.
 */
import {
  COUNTY_VENUE_INDEX,
  loadCountyVenues,
  type CountyVenueIndexEntry,
} from "./data/venues.data";

export { COUNTY_VENUE_INDEX, loadCountyVenues };
export type { CountyVenueIndexEntry };

/**
 * The index, widened to a string-keyed record.
 *
 * The generator emits a literal object, so its inferred type has 47 exact keys
 * and cannot be indexed by a county code held in a variable. Everything here
 * goes through this view instead of casting at each call site.
 */
export const VENUE_INDEX: Readonly<Record<string, CountyVenueIndexEntry>> =
  COUNTY_VENUE_INDEX;

/* ----------------------------------------------------------------------------
 * Index lookups. Synchronous and cheap — they read the 48KB county index, never
 * a venue chunk, so they are safe to call from a client component.
 * ------------------------------------------------------------------------- */

/** How many gazetted centres we hold for a county. 0 when it is not imported. */
export function countyVenueCount(countyCode: string): number {
  return VENUE_INDEX[countyCode]?.centreCount ?? 0;
}

export function constituenciesIn(countyCode: string): string[] {
  const entry = VENUE_INDEX[countyCode];
  return entry ? Object.keys(entry.constituencies).sort() : [];
}

export function wardsIn(countyCode: string, constituency: string): string[] {
  const wards = VENUE_INDEX[countyCode]?.constituencies[constituency];
  return wards ? [...wards].sort() : [];
}

/** County codes we hold any gazetted venue for, for picker states. */
export function countiesWithVenues(): string[] {
  return Object.keys(VENUE_INDEX).filter(
    (code) => countyVenueCount(code) > 0,
  );
}

/* ----------------------------------------------------------------------------
 * Row lookups. Async, server-side, and scoped to as few county chunks as the
 * question allows.
 * ------------------------------------------------------------------------- */

export async function venuesForCounty(countyCode: string): Promise<PollingVenue[]> {
  return loadCountyVenues(countyCode);
}

export async function venuesForWard(
  countyCode: string,
  ward: string,
): Promise<PollingVenue[]> {
  const venues = await loadCountyVenues(countyCode);
  return venues.filter((venue) => venue.ward === ward);
}

export interface VenueSearchOptions {
  /** Restrict to one county. Always pass this when the reader has chosen one. */
  countyCode?: string;
  constituency?: string;
  ward?: string;
  limit?: number;
}

/**
 * Free-text search across name, ward, constituency and centre code.
 *
 * With no county given, the index is searched first to work out which counties
 * could possibly match, and only those chunks are loaded — a search for
 * "Kibera" reads one 300KB chunk instead of all 14MB. The county fan-out is
 * capped because a two-letter query otherwise matches half the country.
 */
export async function searchVenues(
  query: string,
  options: VenueSearchOptions | number = {},
): Promise<PollingVenue[]> {
  // Tolerate the old `searchVenues(q, 20)` call signature.
  const opts: VenueSearchOptions =
    typeof options === "number" ? { limit: options } : options;
  const limit = opts.limit ?? 40;

  const q = query.trim().toLowerCase();
  if (!q && !opts.countyCode) return [];

  const candidateCounties = opts.countyCode
    ? [opts.countyCode]
    : countiesMatching(q).slice(0, 4);

  const results: PollingVenue[] = [];
  for (const code of candidateCounties) {
    const venues = await loadCountyVenues(code);
    for (const venue of venues) {
      if (opts.constituency && venue.constituency !== opts.constituency) continue;
      if (opts.ward && venue.ward !== opts.ward) continue;
      if (
        q &&
        ![venue.name, venue.ward, venue.constituency, venue.countyName, venue.centreCode ?? ""].some(
          (field) => field.toLowerCase().includes(q),
        )
      ) {
        continue;
      }
      results.push(venue);
      if (results.length >= limit) return results;
    }
  }
  return results;
}

/** Counties whose name, constituency or ward names match a query. */
function countiesMatching(q: string): string[] {
  if (!q) return [];
  const hits: string[] = [];
  for (const [code, entry] of Object.entries(VENUE_INDEX)) {
    const haystack = [
      ...Object.keys(entry.constituencies),
      ...Object.values(entry.constituencies).flat(),
    ];
    if (haystack.some((name) => name.toLowerCase().includes(q))) hits.push(code);
  }
  return hits;
}

/**
 * One venue by id.
 *
 * Venue ids are prefixed with the county code ("001-001-changamwe-port-reitz"),
 * so a single chunk answers this instead of a scan of all 47.
 */
export async function getVenue(id: string): Promise<PollingVenue | undefined> {
  const venues = await loadCountyVenues(id.slice(0, 3));
  return venues.find((venue) => venue.id === id);
}
