/**
 * CANDIDATE RECORDS — data only. Owned by the content agent (see AGENT_WORKBOARD.md).
 *
 * This file holds nothing but the array. The types, helpers and copy live in
 * ../candidates.ts and are owned by the interface agent, so the two of us never
 * edit the same file and never collide.
 *
 * BEFORE YOU ADD AN ENTRY:
 *  - Every candidate is a real, named person. No illustrative people, ever.
 *  - `asOf` is the date a human checked the whole record.
 *  - Every `stance` needs `sourceUrl`; every `record` item needs `sourceUrl`.
 *  - Keep `bio` neutral: no adjectives of praise or blame.
 *  - Add each new entry to VERIFY_BEFORE_DEMO.md with its source link.
 *
 * The UI renders a sourced "not published yet" state while this is empty, so an
 * empty array is a valid shippable state — never pad it to make a page look full.
 */

import type { Candidate } from "../candidates";

export const CANDIDATES: Candidate[] = [];
