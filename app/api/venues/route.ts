import {
  VENUE_INDEX,
  constituenciesIn,
  countyVenueCount,
  searchVenues,
  wardsIn,
} from "@/content/civic/pollingStations";

/**
 * Venue lookup for the polling-station finder.
 *
 * This route exists so the gazetted register never reaches the browser. The
 * register is 26,282 centres across 47 county chunks; when the finder imported
 * it directly, Next.js bundled 11.1MB of it into the client chunk for
 * /where-to-vote. Here the rows stay on the server and only the handful a
 * reader asked for crosses the wire.
 *
 * Two modes:
 *   ?county=001&index=1   -> the constituency and ward names for the pickers
 *   ?county=001&q=kibera  -> matching venues (county, constituency, ward, q)
 *
 * The data is a gazette notice from 2022 and never changes between deploys, so
 * responses are cacheable for a long time. On a 2G connection a cache hit at
 * the edge is the difference between a usable page and an abandoned one.
 */

const CACHE_HEADERS = {
  "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
};

/** Cap the response so a one-letter query cannot return a county's whole list. */
const MAX_RESULTS = 50;

export async function GET(request: Request) {
  const params = new URL(request.url).searchParams;
  const county = params.get("county")?.trim() ?? "";
  const constituency = params.get("constituency")?.trim() ?? "";
  const ward = params.get("ward")?.trim() ?? "";
  const q = params.get("q")?.trim() ?? "";

  // Picker mode: names only, a few hundred bytes, no venue chunk loaded at all.
  if (params.get("index")) {
    if (!county || !VENUE_INDEX[county]) {
      return Response.json(
        { county, centreCount: 0, constituencies: {} },
        { headers: CACHE_HEADERS },
      );
    }
    const constituencies: Record<string, string[]> = {};
    for (const name of constituenciesIn(county)) {
      constituencies[name] = wardsIn(county, name);
    }
    return Response.json(
      { county, centreCount: countyVenueCount(county), constituencies },
      { headers: CACHE_HEADERS },
    );
  }

  // A search with neither a county nor a query would fan out across all 47
  // chunks for nothing useful.
  if (!county && !q) {
    return Response.json(
      { venues: [], truncated: false },
      { headers: CACHE_HEADERS },
    );
  }

  const venues = await searchVenues(q, {
    countyCode: county || undefined,
    constituency: constituency || undefined,
    ward: ward || undefined,
    limit: MAX_RESULTS + 1,
  });

  return Response.json(
    {
      venues: venues.slice(0, MAX_RESULTS),
      truncated: venues.length > MAX_RESULTS,
    },
    { headers: CACHE_HEADERS },
  );
}
