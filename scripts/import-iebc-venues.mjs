import { readFile, mkdir, writeFile } from "node:fs/promises";

// Converts an IEBC CSV export into county chunks. Input columns may be reordered,
// but must be headed county_code, county, constituency, ward, centre_code, name,
// streams and source_url. CSV cells containing commas must be quoted.
const input=process.argv[2];
if(!input) throw new Error("Usage: node scripts/import-iebc-venues.mjs <gazetted.csv>");
const parse=line=>{const out=[];let cell="",quoted=false;for(let i=0;i<line.length;i++){const c=line[i];if(c==='"'&&line[i+1]==='"'){cell+='"';i++;}else if(c==='"')quoted=!quoted;else if(c===','&&!quoted){out.push(cell);cell="";}else cell+=c;}out.push(cell);return out;};
const lines=(await readFile(input,"utf8")).replace(/^\uFEFF/,"").split(/\r?\n/).filter(Boolean);
const headers=parse(lines.shift()).map(x=>x.trim().toLowerCase());
const required=["county_code","county","constituency","ward","centre_code","name","source_url"];
for(const h of required) if(!headers.includes(h)) throw new Error(`Missing column ${h}`);
const rows=lines.map(parse).map(values=>Object.fromEntries(headers.map((h,i)=>[h,values[i]?.trim()??""])));
const invalid=rows.filter(r=>!/^\d{3}$/.test(r.county_code)||!r.name||!r.source_url.startsWith("http"));
if(invalid.length) throw new Error(`${invalid.length} invalid rows; refusing partial output`);
await mkdir("content/civic/data/venues",{recursive:true});
const imports=[];
for(const code of [...new Set(rows.map(r=>r.county_code))].sort()) { const data=rows.filter(r=>r.county_code===code).map(r=>({id:r.centre_code||`${code}-${r.constituency}-${r.ward}-${r.name}`.toLowerCase().replace(/[^a-z0-9]+/g,"-"),name:r.name,centreCode:r.centre_code||undefined,kind:"both",countyCode:code,countyName:r.county,constituency:r.constituency,ward:r.ward,streams:r.streams?Number(r.streams):undefined,sourceUrl:r.source_url,asOf:"2026-10-18"})); const symbol=`VENUES_${code}`; imports.push({code,symbol}); await writeFile(`content/civic/data/venues/${code}.data.ts`,`import type { PollingVenue } from "../../pollingStations";\nexport const ${symbol}: PollingVenue[] = ${JSON.stringify(data,null,2)};\n`); }
console.log(`Generated ${rows.length} venues in ${imports.length} county files.`);
console.log("Run node scripts/build-venue-index.mjs to regenerate the async loader and picker index.");
