/**
 * Who currently holds office — the searchable directory behind /leaders.
 *
 * ./politicians.ts already records the national offices. This module adds the
 * county and constituency layer and merges both into one list the directory UI
 * can filter, so the national records stay in one place and are not duplicated.
 *
 * DATA INTEGRITY RULES — read before editing:
 *
 *  1. Every entry is a claim about a real, named person, and carries `asOf` and
 *     `sourceUrl`. County holders change through by-elections, resignations,
 *     impeachments and court rulings more often than national ones do.
 *  2. `COUNTY_OFFICE_HOLDERS` is empty by design. Where we have no name, the UI
 *     shows a "not recorded" state linking to Parliament, the Senate or the
 *     county's own site — never a plausible-looking name.
 *  3. A county with a recorded governor and no recorded senator is normal and
 *     renders fine. Partial data is expected; invented data is not.
 *
 * Framework-free content module shared by the Next.js web app and the Expo
 * mobile app. Keep it free of React/DOM/RN imports so both bundlers can use it.
 */

import { COUNTIES, NATIONAL_OFFICE_HOLDERS, type OfficeHolder } from "./politicians";

export const LEADERS_LAST_VERIFIED = "2026-10-18";

export const LEADERS_INTRO =
  "Accountability starts with a name. This directory lists the people currently holding " +
  "office — nationally and in each of the 47 counties — what each office controls, and " +
  "where the official record of their appointment lives. Where we do not have a verified " +
  "name we say so and point you at the body that does.";

/**
 * A holder plus the geography needed to filter by county.
 *
 * `OfficeHolder.jurisdiction` is free text ("Nairobi City County") because it
 * has to read well on a card. `countyCode` is the machine-readable version and
 * is what the directory filters on.
 */
export interface DirectoryEntry extends Omit<OfficeHolder, "note"> {
  /**
   * What this person's office does, or something specific about their tenure.
   *
   * Optional, unlike on OfficeHolder: the official rosters publish a name and a
   * seat and nothing else for most of the 416 members of Parliament, and the
   * alternative to an absent note was the same boilerplate sentence repeated
   * three hundred times. The UI falls back to the office description in
   * ./offices.ts, which is more accurate anyway.
   */
  note?: string;
  /** County code from COUNTIES. Absent for national offices. */
  countyCode?: string;
  /** "national" | "county" — the tier chip on the card. */
  tier: "national" | "county";
  /** Scorecard id in ./scorecards.ts, when one is published for this person. */
  scorecardId?: string;
  /**
   * The name exactly as the official roster published it, before normalisation
   * ("Sen. (Dr.) Khalwale Boni"). Set by the import scripts so a reader — or a
   * reviewer — can audit a normalised name against its source.
   */
  rawSourceName?: string;
}

/**
 * County holders live in ./data/leaders.data.ts (content agent). This file keeps
 * the types, the merge with the national records, and the helpers (interface
 * agent). See AGENT_WORKBOARD.md for the split.
 */
import { COUNTY_OFFICE_HOLDERS } from "./data/leaders.data";

export { COUNTY_OFFICE_HOLDERS };

/** The national records from ./politicians.ts, lifted into directory shape. */
export const NATIONAL_DIRECTORY: DirectoryEntry[] = NATIONAL_OFFICE_HOLDERS.map(
  (holder) => ({ ...holder, tier: "national" as const }),
);

/** Everything the directory can show, national first. */
export const ALL_LEADERS: DirectoryEntry[] = [
  ...NATIONAL_DIRECTORY,
  ...COUNTY_OFFICE_HOLDERS,
];

export const LEADERS_EMPTY_COPY =
  "VoteWise has not recorded verified holders for this county yet. County seats change " +
  "hands through by-elections and court rulings, and a stale name is worse than none. " +
  "The sources below are authoritative and current.";

export const LEADER_SOURCE_LINKS = [
  {
    label: "National Assembly members",
    url: "http://www.parliament.go.ke/the-national-assembly/mps",
    description: "Sitting MPs and woman representatives, by constituency and county.",
  },
  {
    label: "The Senate",
    url: "http://www.parliament.go.ke/the-senate/senators",
    description: "The 47 elected senators plus nominated members.",
  },
  {
    label: "Council of Governors",
    url: "https://cog.go.ke/",
    description: "The sitting governor of each of the 47 counties.",
  },
  {
    label: "IEBC",
    url: "https://www.iebc.or.ke/",
    description: "Declared results and by-election notices.",
  },
];

export function getLeader(id: string): DirectoryEntry | undefined {
  return ALL_LEADERS.find((entry) => entry.id === id);
}

export function leadersForCounty(countyCode: string): DirectoryEntry[] {
  return COUNTY_OFFICE_HOLDERS.filter((entry) => entry.countyCode === countyCode);
}

/** County codes we have at least one verified holder for — drives filter state. */
export function countiesWithLeaders(): string[] {
  return [
    ...new Set(
      COUNTY_OFFICE_HOLDERS.map((entry) => entry.countyCode).filter(
        (code): code is string => Boolean(code),
      ),
    ),
  ];
}

/** Human-readable county name for a code, for cards and lite pages. */
export function countyName(code: string): string | undefined {
  return COUNTIES.find((county) => county.code === code)?.name;
}

/** Free-text search across name, office title and jurisdiction. */
export function searchLeaders(query: string): DirectoryEntry[] {
  const q = query.trim().toLowerCase();
  if (!q) return ALL_LEADERS;
  return ALL_LEADERS.filter((entry) =>
    [entry.name ?? "", entry.officeTitle, entry.jurisdiction].some((field) =>
      field.toLowerCase().includes(q),
    ),
  );
}
