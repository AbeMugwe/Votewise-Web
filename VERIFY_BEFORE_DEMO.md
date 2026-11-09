# Pre-demo civic verification checklist

Regenerate the official rosters with `node scripts/import-parliament-roster.mjs`, then run `node scripts/check-links.mjs` on the day of a public demo.

## Named people

- [ ] Confirm all national holders in `content/civic/politicians.ts` against their linked primary sources and `asOf` dates.
- [ ] Confirm 290 constituency MPs, 47 county woman representatives and 12 nominated MPs against the official 12 August 2026 Parliament PDF.
- [ ] Confirm 47 elected and 20 nominated senators against the linked Senate roster.
- [ ] Confirm the importer reports no duplicate constituency or holder IDs.
- [ ] Governors, deputy governors and county assembly speakers remain outstanding and must not be implied by the UI.

## Candidates and nomination timetable

- [ ] Candidates remain 0 until IEBC publishes the cleared 2027 register.
- [ ] Confirm the four nomination milestones against the linked IEBC Election Operation Plan 2025-2027.

## National manifesto scorecard

- [ ] Confirm the local PDF checksum is `0C99FF77C4DCBC2FD4D589F147D8EB6BB83AD7F95981318E6B8D2860B834B926`.
- [ ] Review all 182 transcribed bullet commitments against the mirrored manifesto PDF.
- [ ] Recheck the first evidence tranche: 25 externally cited statuses (22 `in-progress`, 3 `kept`); the remaining 157 are `unverified`.
- [ ] Confirm each promise retains `pdfPage` and `originalUrl` as well as the local mirror link.

## Polling venues

- [ ] Confirm all 26,282 centres in county chunks 001-047 against Gazette Notice 7996 dated 1 July 2022.
- [ ] Confirm the source PDF checksum is `A1120CB26E7AFB641F14FFE46911FE4F8FB93870D2C00EAA808FDA2849D42657`.
- [ ] Remind readers the register is re-gazetted before each election and must be confirmed with IEBC.

## Product gates

- [x] `npx tsc --noEmit` (2026-10-18)
- [x] `npx next build` (2026-10-18)
- [x] All seven `/lite` responses below 10KB; largest measured response 9,811 bytes (2026-10-18).
- [x] `/where-to-vote` route/layout client JS measured at 179,159 bytes, in the civic-page range and without venue chunks (2026-10-18).
- [ ] Resolve the ten failures currently emitted by `node scripts/check-links.mjs`; four Treasury PDF URLs work through indexed browser retrieval but returned 404 to the CLI checker.
- [ ] Portraits: 0; initials remain until licence evidence and optimized files are recorded.
- [ ] Swahili content pack remains outstanding.
