/**
 * Political profiles of people seeking elective office.
 *
 * DATA INTEGRITY RULES — read before editing (these mirror ./politicians.ts):
 *
 *  1. Every entry here is a claim about a real, named person. Each one carries
 *     `asOf` and at least one `sources` entry. No entry ships without them.
 *  2. We do NOT ship invented candidates. `CANDIDATES` is deliberately empty
 *     until a human has sourced and checked real records — the UI renders an
 *     explicit "not published yet" state rather than plausible-looking names.
 *  3. `stance` and `record` are summaries of *sourced positions*, not our
 *     opinion of them. Write them so a supporter and an opponent of the person
 *     would both agree the summary is accurate.
 *  4. Give every claim in `record` a `sourceUrl`. A claim nobody can check is
 *     worse than no claim.
 *
 * Framework-free content module shared by the Next.js web app and the Expo
 * mobile app. Keep it free of React/DOM/RN imports so both bundlers can use it.
 */

import type { OfficeId } from "./offices";

export const CANDIDATES_LAST_VERIFIED = "2026-10-18";

export const CANDIDATES_INTRO =
  "A ballot paper gives you a name, a party and a symbol. It does not tell you what the " +
  "person has said, what they have done, or who funds them. These profiles collect what " +
  "is on the public record — declared positions, past office, and the sources for both — " +
  "so you can compare candidates on something firmer than a poster.";

/** How much we vouch for a record. Same vocabulary as ./politicians.ts. */
export type Confidence = "verify" | "example" | "not-recorded";

/** Where a candidate stands on one issue, as they have stated it publicly. */
export interface PolicyPosition {
  /** Issue area, e.g. "Cost of living", "Healthcare", "Devolution". */
  issue: string;
  /** Their stated position, in their framing, one or two sentences. */
  stance: string;
  /** Direct quote, manifesto line or speech excerpt, if we have one. */
  quote?: string;
  /** Where the stance is published. Required — no unsourced stances. */
  sourceUrl: string;
  /** Date of the statement, not the date we read it. */
  statedOn?: string;
}

/** Something the person has actually done, with a citation. */
export interface TrackRecordItem {
  /** Year or range, e.g. "2022" or "2017–2022". */
  period: string;
  /** What they held or did, e.g. "Senator, Kisumu County". */
  summary: string;
  /** Context a voter needs to read the line fairly. */
  detail?: string;
  sourceUrl: string;
}

/**
 * A person seeking (or holding, and seeking again) elective office.
 *
 * `id` is the routing slug: /candidates/[id]. Use kebab-case of the name,
 * e.g. "jane-wanjiku-mwangi". Never reuse an id for a different person.
 */
export interface Candidate {
  id: string;
  name: string;
  /** Party or coalition as registered, or "Independent". */
  party: string;
  /** Party abbreviation for chips, e.g. "UDA". Falls back to `party`. */
  partyAbbr?: string;
  /** Which ballot they are standing on. */
  officeId: OfficeId;
  /** Office title as officially styled, e.g. "Governor, Nakuru County". */
  officeSought: string;
  /** County code from COUNTIES in ./politicians.ts. Omit for national races. */
  countyCode?: string;
  /** Constituency or ward, where the race is below county level. */
  area?: string;
  /** Are they the sitting holder of this seat? Drives an "incumbent" chip. */
  incumbent: boolean;
  /** Two or three sentences. Neutral register, no adjectives of praise or blame. */
  bio: string;
  /** Profession before politics — often the most useful single line. */
  background?: string;
  stance: PolicyPosition[];
  record: TrackRecordItem[];
  /**
   * Scorecard id in ./scorecards.ts, when this person has held office long
   * enough to have a manifesto to measure against.
   */
  scorecardId?: string;
  /** Official pages: campaign site, party page, Parliament/county profile. */
  sources: { label: string; url: string }[];
  confidence: Confidence;
  /** Date a human last checked this whole record. */
  asOf: string;
}

/**
 * The records themselves live in ./data/candidates.data.ts and are owned by the
 * content agent; the types, helpers and copy in this file are owned by the
 * interface agent (see AGENT_WORKBOARD.md). Splitting them means neither of us
 * ever edits a file the other is holding.
 */
import { CANDIDATES } from "./data/candidates.data";

export { CANDIDATES };

/** Rendered wherever we have no candidate records for a filter or a race. */
export const CANDIDATES_EMPTY_COPY =
  "VoteWise has not published candidate profiles for this race yet. We only publish " +
  "profiles a person has checked against the public record, because a wrong or stale " +
  "profile is worse than none. Until then, the IEBC's published candidate lists are the " +
  "authoritative source.";

export const CANDIDATE_SOURCE_LINKS = [
  {
    label: "IEBC candidate registers",
    url: "https://www.iebc.or.ke/",
    description: "The official register of cleared candidates for each seat.",
  },
  {
    label: "Registrar of Political Parties",
    url: "https://orpp.or.ke/",
    description: "Which parties are registered, and who their officials are.",
  },
  {
    label: "Parliament of Kenya",
    url: "http://www.parliament.go.ke/",
    description: "Sitting members, committee seats and voting records.",
  },
];

/** How we write these profiles — shown to readers, not just to editors. */
export const CANDIDATE_METHOD = [
  "We summarise positions the candidate has stated publicly, and link the statement.",
  "We record offices held and documented actions, not rumour or endorsement.",
  "We do not rate, rank or recommend candidates, and we take no party's side.",
  "Where we cannot source a claim, we leave it out and say so.",
];

/**
 * A dated step on the official road to a candidate register.
 *
 * Before nominations close there are no candidates to profile, and "nothing
 * here yet" is a useless answer to a voter who wants to know when there will
 * be. These milestones let the empty state say "profiles appear after the IEBC
 * clears candidates, which its own plan plans for June 2027".
 *
 * `dateFrom`/`dateTo` supersede `date`: several milestones are windows rather
 * than days, and a range stuffed into a single field cannot be sorted or
 * formatted. `date` is kept optional so already-generated data keeps compiling.
 */
export interface CandidatePublicationMilestone {
  id: string;
  /** ISO date the milestone falls on, or opens. */
  dateFrom?: string;
  /** ISO date the window closes, for milestones that span days. */
  dateTo?: string;
  /** Legacy single field. May contain "YYYY-MM-DD/YYYY-MM-DD". */
  date?: string;
  label: string;
  detail: string;
  sourceUrl: string;
  asOf: string;
}

/** Normalise either shape into a start and optional end date. */
export function milestoneRange(milestone: CandidatePublicationMilestone): {
  from: string;
  to?: string;
} {
  if (milestone.dateFrom) return { from: milestone.dateFrom, to: milestone.dateTo };
  const [from, to] = (milestone.date ?? "").split("/");
  return { from: from ?? "", to: to || undefined };
}

/** "11 June 2027", or "29 May – 11 June 2027" for a window. */
export function formatMilestone(milestone: CandidatePublicationMilestone): string {
  const { from, to } = milestoneRange(milestone);
  const day = (iso: string, withYear: boolean) => {
    const parsed = new Date(`${iso}T00:00:00Z`);
    if (Number.isNaN(parsed.getTime())) return iso;
    return parsed.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      ...(withYear ? { year: "numeric" } : {}),
      timeZone: "UTC",
    });
  };
  if (!from) return "Date not recorded";
  if (!to) return day(from, true);
  // Drop the repeated year from the opening date: "29 May – 11 June 2027".
  const sameYear = from.slice(0, 4) === to.slice(0, 4);
  return `${day(from, !sameYear)} – ${day(to, true)}`;
}

export function getCandidate(id: string): Candidate | undefined {
  return CANDIDATES.find((c) => c.id === id);
}

export function candidatesForOffice(officeId: OfficeId): Candidate[] {
  return CANDIDATES.filter((c) => c.officeId === officeId);
}

export function candidatesForCounty(countyCode: string): Candidate[] {
  return CANDIDATES.filter((c) => c.countyCode === countyCode);
}

/** Every party that appears in the dataset, for the directory's filter chips. */
export function candidateParties(): string[] {
  return [...new Set(CANDIDATES.map((c) => c.partyAbbr ?? c.party))].sort();
}
