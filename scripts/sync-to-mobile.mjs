#!/usr/bin/env node
/**
 * Copy the shared source of truth from the web repo into the mobile repo.
 *
 * The two apps live in separate git repositories but must agree on:
 *   - content/civic/*   the civic reference text (offices, rights, registration)
 *   - convex/*          the backend, so both talk to the SAME deployment
 *
 * The web repo is authoritative. Edit there, then run:
 *
 *     npm run sync:mobile
 *
 * Only ever run `npx convex dev` / `npx convex deploy` from the WEB repo. The
 * mobile copy of convex/ exists so Metro can resolve `@/convex/_generated/api`
 * for types; deploying from both would have them fight over the deployment.
 *
 * Pass --check to verify the copies are in sync without writing (useful in CI).
 */

import { readdirSync, statSync, readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { join, dirname, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const webRoot = resolve(here, "..");
const mobileRoot = resolve(webRoot, "..", "votewise");

const checkOnly = process.argv.includes("--check");

/**
 * Copying convex/ replaces the mobile app's whole backend, so it is opt-in via
 * --convex. Do it only when you are ready to run `npx convex dev` and verify
 * sign-in still works on the device — otherwise the mobile app is left pointing
 * at functions nobody has exercised yet.
 */
const includeConvex = process.argv.includes("--convex");

/** Directories copied wholesale, relative to each repo root. */
const SYNC_DIRS = includeConvex ? ["content/civic", "convex"] : ["content/civic"];

/**
 * Never copy these. `_generated` is produced by the Convex CLI against whatever
 * version each app has installed, and node_modules is obvious.
 */
const SKIP = new Set(["_generated", "node_modules", ".git"]);

function walk(dir) {
  const out = [];
  if (!existsSync(dir)) return out;
  for (const entry of readdirSync(dir)) {
    if (SKIP.has(entry)) continue;
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) out.push(...walk(full));
    else out.push(full);
  }
  return out;
}

if (!existsSync(mobileRoot)) {
  console.error(`✗ Mobile repo not found at ${mobileRoot}`);
  console.error("  Expected the two repos to be siblings: <parent>/Votewise-Web and <parent>/votewise");
  process.exit(1);
}

let copied = 0;
let drifted = 0;

for (const dir of SYNC_DIRS) {
  const sourceDir = join(webRoot, dir);
  if (!existsSync(sourceDir)) continue;

  for (const sourceFile of walk(sourceDir)) {
    const rel = relative(webRoot, sourceFile);
    const targetFile = join(mobileRoot, rel);

    const source = readFileSync(sourceFile);
    const target = existsSync(targetFile) ? readFileSync(targetFile) : null;

    if (target !== null && source.equals(target)) continue;

    if (checkOnly) {
      console.error(`✗ out of sync: ${rel.replace(/\\/g, "/")}`);
      drifted++;
      continue;
    }

    mkdirSync(dirname(targetFile), { recursive: true });
    writeFileSync(targetFile, source);
    console.log(`  → ${rel.replace(/\\/g, "/")}`);
    copied++;
  }
}

if (checkOnly) {
  if (drifted > 0) {
    console.error(`\n✗ ${drifted} file(s) differ. Run: npm run sync:mobile`);
    process.exit(1);
  }
  console.log("✓ Mobile copy is in sync with the web repo.");
} else {
  console.log(
    copied === 0
      ? "✓ Already in sync — nothing to copy."
      : `✓ Synced ${copied} file(s) to ${relative(resolve(webRoot, ".."), mobileRoot)}/`,
  );
}
