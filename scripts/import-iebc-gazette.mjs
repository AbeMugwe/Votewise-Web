import { mkdir, writeFile } from "node:fs/promises";
import { spawnSync } from "node:child_process";
const PDF=process.argv[2]??"data/raw/iebc-polling-stations-2022.pdf";
const SOURCE="https://www.iebc.or.ke/uploads/resources/6eYBKYk30d.pdf";
const parsed=spawnSync("python",["scripts/extract-iebc-gazette.py",PDF],{encoding:"utf8",maxBuffer:100_000_000});
if(parsed.status!==0)throw new Error(parsed.stderr);
const streams=JSON.parse(parsed.stdout).filter(row=>Number(row.countyCode)>=1&&Number(row.countyCode)<=47);
if(streams.length<40_000)throw new Error(`Only ${streams.length} polling streams parsed; refusing partial output`);
const centres=new Map();
for(const row of streams){const id=`${row.countyCode}-${row.centreCode}-${row.constituency}-${row.ward}`.toLowerCase().replace(/[^a-z0-9]+/g,"-");const old=centres.get(id);if(old)old.streams++;else centres.set(id,{id,name:row.name,centreCode:row.centreCode,kind:"both",countyCode:row.countyCode,countyName:row.countyName,constituency:row.constituency,ward:row.ward,directions:"Gazetted for the 9 August 2022 General Election. Polling places are re-gazetted before each election; confirm your assigned station with IEBC before travelling.",streams:1,sourceUrl:SOURCE,asOf:"2022-07-01"});}
await mkdir("content/civic/data/venues",{recursive:true});
const imports=[];
for(const code of [...new Set([...centres.values()].map(x=>x.countyCode))].sort()){const symbol=`VENUES_${code}`;imports.push({code,symbol});const data=[...centres.values()].filter(x=>x.countyCode===code);await writeFile(`content/civic/data/venues/${code}.data.ts`,`import type { PollingVenue } from "../../pollingStations";\nexport const ${symbol}: PollingVenue[] = ${JSON.stringify(data,null,2)};\n`);}
if(imports.length!==47)throw new Error(`Expected 47 county chunks, got ${imports.length}`);
console.log(`Parsed ${streams.length} polling streams into ${centres.size} registration centres across ${imports.length} counties.`);
console.log("Run node scripts/build-venue-index.mjs to regenerate the async loader and picker index.");
