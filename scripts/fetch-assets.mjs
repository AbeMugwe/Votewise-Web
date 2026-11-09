import { mkdir } from "node:fs/promises";

// Asset manifest intentionally starts empty: a download is permitted only after
// its licence has been recorded in portraits.data.ts and data/raw/SOURCES.md.
const assets = [];
await mkdir("public/images/people", { recursive: true });
await mkdir("public/images/parties", { recursive: true });
await mkdir("public/docs/manifestos", { recursive: true });
console.log(`No licensed remote assets configured (${assets.length}).`);
