import { readFile, writeFile } from "node:fs/promises";

const codes = Array.from({ length: 47 }, (_, index) => String(index + 1).padStart(3, "0"));
const index = {};
for (const code of codes) {
  const source = await readFile(`content/civic/data/venues/${code}.data.ts`, "utf8");
  const arrayStart = source.indexOf("= [") + 2;
  const venues = JSON.parse(source.slice(arrayStart, source.lastIndexOf("]") + 1));
  const constituencies = {};
  for (const venue of venues) (constituencies[venue.constituency] ??= new Set()).add(venue.ward);
  index[code] = {
    centreCount: venues.length,
    constituencies: Object.fromEntries(Object.entries(constituencies).sort(([a], [b]) => a.localeCompare(b)).map(([name, wards]) => [name, [...wards].sort()])),
  };
}
const imports = codes.map((code) => `  "${code}": () => import("./venues/${code}.data").then((module) => module.VENUES_${code}),`).join("\n");
await writeFile("content/civic/data/venues.data.ts", `import type { PollingVenue } from "../pollingStations";

export interface CountyVenueIndexEntry {
  centreCount: number;
  constituencies: Readonly<Record<string, readonly string[]>>;
}

export const COUNTY_VENUE_INDEX = ${JSON.stringify(index, null, 2)} as const satisfies Readonly<Record<string, CountyVenueIndexEntry>>;

const COUNTY_LOADERS: Readonly<Record<string, () => Promise<PollingVenue[]>>> = {
${imports}
};

/** Load one county chunk on demand. Unknown county codes return an empty list. */
export async function loadCountyVenues(code: string): Promise<PollingVenue[]> {
  return COUNTY_LOADERS[code]?.() ?? [];
}
`);
console.log(`Generated a 47-county picker index for ${Object.values(index).reduce((sum, county) => sum + county.centreCount, 0).toLocaleString()} centres.`);
