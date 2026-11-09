/**
 * Manifesto scorecards: what a leader promised, and what has happened since.
 *
 * DATA INTEGRITY RULES — read before editing:
 *
 *  1. A promise is quoted or closely paraphrased from a published manifesto or
 *     a recorded public commitment. `promiseSourceUrl` points at that document.
 *  2. A status is a factual claim about delivery and needs its own evidence.
 *     Every promise carries `evidence[]`; a promise with no evidence must be
 *     status "unverified", never "broken" and never "kept".
 *  3. Prefer the office's own reports, Auditor-General reports, Controller of
 *     Budget reports, Hansard and gazette notices over news coverage. Where we
 *     use reporting, link the report, not an aggregator.
 *  4. We grade delivery, not intentions, and we publish the rubric below so a
 *     reader can disagree with a specific call rather than the whole exercise.
 *  5. No invented scorecards. `SCORECARDS` stays empty until real promises have
 *     been transcribed and checked by a human.
 *
 * Framework-free content module shared by the Next.js web app and the Expo
 * mobile app. Keep it free of React/DOM/RN imports so both bundlers can use it.
 */

export const SCORECARDS_LAST_VERIFIED = "2026-10-18";

export const SCORECARDS_INTRO =
  "Manifestos are promises made in public. This section puts each promise next to what " +
  "has actually happened, with the document for the promise and the evidence for the " +
  "outcome side by side. It is a record, not a verdict: every call is sourced so you can " +
  "check it, and disagree with it.";

/**
 * Delivery status for a single promise.
 *
 * Deliberately five values, not three. "stalled" and "unverified" are the two
 * honest answers that a kept/broken binary forces you to fake.
 */
export type PromiseStatus =
  | "kept"
  | "in-progress"
  | "stalled"
  | "broken"
  | "unverified";

/** Label, meaning and palette for each status. The UI reads colours from here. */
export const STATUS_META: Record<
  PromiseStatus,
  {
    label: string;
    /** The rubric. Shown to readers in the methodology panel. */
    definition: string;
    /** Tailwind classes for chips on the rich site. */
    chipClass: string;
    /** Hex for the lite site and for summary bars. */
    hex: string;
    /** Plain-text marker for the 2G version, which has no colour to spare. */
    asciiMark: string;
  }
> = {
  kept: {
    label: "Delivered",
    definition:
      "The promised thing exists and is in operation, and a document outside the office's own press release shows it.",
    chipClass: "bg-green-100 text-green-900 border-green-200",
    hex: "#15803d",
    asciiMark: "[done]",
  },
  "in-progress": {
    label: "Under way",
    definition:
      "Work has visibly started — budget allocated, contract awarded, bill tabled — and is on a plausible path to completion.",
    chipClass: "bg-blue-100 text-blue-900 border-blue-200",
    hex: "#1d4ed8",
    asciiMark: "[started]",
  },
  stalled: {
    label: "Stalled",
    definition:
      "It started and then stopped: funds unspent, works abandoned, a bill that has not moved for a year or more.",
    chipClass: "bg-amber-100 text-amber-900 border-amber-200",
    hex: "#b45309",
    asciiMark: "[stalled]",
  },
  broken: {
    label: "Abandoned",
    definition:
      "The promise was dropped, reversed, or the term ended with no action we can find. Needs strong evidence.",
    chipClass: "bg-red-100 text-red-900 border-red-200",
    hex: "#b91c1c",
    asciiMark: "[dropped]",
  },
  unverified: {
    label: "Can't verify",
    definition:
      "We have the promise but no reliable evidence either way. This is an honest answer, and the default.",
    chipClass: "bg-gray-100 text-gray-700 border-gray-200",
    hex: "#475569",
    asciiMark: "[unclear]",
  },
};

/** Status order used for sorting and for the summary bar. */
export const STATUS_ORDER: PromiseStatus[] = [
  "kept",
  "in-progress",
  "stalled",
  "broken",
  "unverified",
];

export interface PromiseEvidence {
  label: string;
  url: string;
  /** "Auditor-General", "Hansard", "County budget", "Reporting" — kind of source. */
  kind?: string;
  /** Date of the document. */
  dated?: string;
}

export interface ManifestoPromise {
  id: string;
  /** Issue area, used to group the list: "Health", "Roads", "Education". */
  sector: string;
  /** The promise, quoted or closely paraphrased. Keep the original framing. */
  promise: string;
  /** Verbatim line from the manifesto, where we have it. */
  quote?: string;
  /**
   * The manifesto or recorded commitment this comes from. Required.
   *
   * This may be a local mirror under /docs/manifestos — manifesto sites vanish
   * after an election, so we keep our own copy. When it is a mirror, set
   * `originalUrl` too, or a reader has no way to check the mirror is faithful.
   */
  promiseSourceUrl: string;
  /** Page in the mirrored PDF, so the link can jump straight to the promise. */
  pdfPage?: number;
  /** Where the mirrored document was originally published. */
  originalUrl?: string;
  status: PromiseStatus;
  /** One or two sentences of what has happened. Factual, no adjectives. */
  progressNote: string;
  /** Required for any status other than "unverified". */
  evidence: PromiseEvidence[];
  /** Date a human last checked the status. */
  asOf: string;
}

export interface Scorecard {
  /** Routing slug: /record/[id]. Matches `scorecardId` on a holder or candidate. */
  id: string;
  /** Person the scorecard is about. */
  personName: string;
  officeTitle: string;
  jurisdiction: string;
  /** Term the manifesto covers, e.g. "2022-2027". */
  term: string;
  /** Title and link of the manifesto document itself. */
  manifesto: { title: string; url: string; published?: string };
  /** Holder id in ./politicians.ts or ./leaders.ts, if one exists. */
  holderId?: string;
  promises: ManifestoPromise[];
  asOf: string;
}

/**
 * Scorecards live in ./data/scorecards.data.ts (content agent). The rubric,
 * types and methodology copy stay here (interface agent), because the rubric is
 * a product decision and the UI publishes it verbatim next to the scores.
 */
import { SCORECARDS } from "./data/scorecards.data";

export { SCORECARDS };

export const SCORECARDS_EMPTY_COPY =
  "No scorecard is published for this office yet. Scoring a manifesto honestly means " +
  "transcribing every promise and finding evidence for each one, and we publish only " +
  "what has been checked. The sources below are where that evidence comes from, if you " +
  "want to look before we do.";

/** Shown to readers. The rubric is part of the product, not an appendix. */
export const SCORECARD_METHOD = {
  intro:
    "Scoring promises is a judgement call, so here is ours in full. Disagree with a " +
    "specific call and you will have the same documents we used.",
  rules: [
    "Only promises published in a manifesto or made on the record are scored.",
    "We quote the promise in the promiser's own framing, not a paraphrase that helps or hurts them.",
    "A status needs evidence from outside the office's own communications.",
    "A promise with no evidence either way is marked “Can't verify”, not “Abandoned”.",
    "Promises partly delivered are “Under way” or “Stalled” — we do not round them up to delivered.",
    "Every call carries the date it was last checked. Old checks go stale and get re-done.",
  ],
  disclaimer:
    "VoteWise is non-partisan and takes no party's side. We publish the same rubric for " +
    "every office holder we score, incumbent or opposition.",
};

export const SCORECARD_SOURCE_LINKS = [
  {
    label: "Office of the Auditor-General",
    url: "https://www.oagkenya.go.ke/",
    description: "Audits of how national and county money was actually spent.",
  },
  {
    label: "Controller of Budget",
    url: "https://cob.go.ke/",
    description: "Quarterly budget implementation reports for all 47 counties.",
  },
  {
    label: "Parliament Hansard",
    url: "http://www.parliament.go.ke/",
    description: "What was said and how members voted, on the record.",
  },
  {
    label: "Kenya Law",
    url: "https://new.kenyalaw.org/",
    description: "Acts, bills and gazette notices — whether a promise became law.",
  },
];

export function getScorecard(id: string): Scorecard | undefined {
  return SCORECARDS.find((s) => s.id === id);
}

export function scorecardForHolder(holderId: string): Scorecard | undefined {
  return SCORECARDS.find((s) => s.holderId === holderId);
}

/** Count of promises by status, in STATUS_ORDER, for summary bars. */
export function tallyPromises(
  card: Scorecard,
): { status: PromiseStatus; count: number }[] {
  return STATUS_ORDER.map((status) => ({
    status,
    count: card.promises.filter((p) => p.status === status).length,
  }));
}

/** Link to the promise, jumping to its page when we mirror the PDF. */
export function promiseSourceHref(promise: ManifestoPromise): string {
  return promise.pdfPage
    ? `${promise.promiseSourceUrl}#page=${promise.pdfPage}`
    : promise.promiseSourceUrl;
}

/**
 * True when every promise is still "unverified" — the card is a faithful
 * transcript of the manifesto but no delivery has been assessed yet.
 *
 * Transcribing 182 promises is a real step, and hiding the card until the
 * evidence pass finishes would waste it. But presenting it as a scorecard when
 * nothing has been scored would overclaim, so the UI says which it is.
 */
export function isTranscriptOnly(card: Scorecard): boolean {
  return (
    card.promises.length > 0 &&
    card.promises.every((promise) => promise.status === "unverified")
  );
}

/** Sectors present on a scorecard, for grouping the promise list. */
export function scorecardSectors(card: Scorecard): string[] {
  return [...new Set(card.promises.map((p) => p.sector))];
}
