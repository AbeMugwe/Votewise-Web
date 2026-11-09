import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, ListChecks, Scale } from "lucide-react";
import CivicShell from "@/app/components/civic/CivicShell";
import CandidateDirectory from "@/app/components/civic/CandidateDirectory";
import NominationTimeline from "@/app/components/civic/NominationTimeline";
import { SourceGrid } from "@/app/components/civic/SourcePanel";
import { CANDIDATE_PUBLICATION_TIMELINE } from "@/content/civic/data/candidate-timeline.data";
import {
  CANDIDATES,
  CANDIDATES_INTRO,
  CANDIDATES_LAST_VERIFIED,
  CANDIDATE_METHOD,
  CANDIDATE_SOURCE_LINKS,
} from "@/content/civic/candidates";

export const metadata: Metadata = {
  title: "Candidate profiles | VoteWise Kenya",
  description:
    "Political profiles of candidates: declared positions, offices held, and the sources for both, so you can compare candidates on the public record.",
};

const spokenText = [
  "Candidate profiles.",
  CANDIDATES_INTRO,
  "How we write these profiles.",
  ...CANDIDATE_METHOD,
].join(" ");

export default function CandidatesPage() {
  return (
    <CivicShell
      eyebrow="Civic guide"
      title="Candidate profiles"
      intro={CANDIDATES_INTRO}
      lastVerified={CANDIDATES_LAST_VERIFIED}
      readAloudText={spokenText}
      width="wide"
    >
      <section aria-labelledby="directory-heading">
        <h2 id="directory-heading" className="text-2xl font-bold text-gray-900 mb-2">
          Find a candidate
        </h2>
        <p className="text-gray-600 mb-6">
          Filter by the seat they are standing for, their county, or their party.
        </p>

        <CandidateDirectory />
      </section>

      {CANDIDATES.length === 0 && (
        <NominationTimeline
          milestones={CANDIDATE_PUBLICATION_TIMELINE}
          asOf={CANDIDATES_LAST_VERIFIED}
        />
      )}

      <section aria-labelledby="method-heading">
        <h2 id="method-heading" className="text-2xl font-bold text-gray-900 mb-2">
          How we write a profile
        </h2>
        <p className="text-gray-600 mb-6">
          A profile that flatters or attacks is worthless to a voter. These are the rules
          we hold ourselves to, published so you can hold us to them.
        </p>

        <ul className="vw-card divide-y divide-gray-100">
          {CANDIDATE_METHOD.map((rule) => (
            <li key={rule} className="flex gap-3 px-5 py-4">
              <Scale size={18} className="shrink-0 mt-0.5 text-green-700" />
              <span className="text-gray-700 leading-relaxed">{rule}</span>
            </li>
          ))}
        </ul>
      </section>

      {CANDIDATES.length > 0 && (
        <section aria-labelledby="sources-heading">
          <h2 id="sources-heading" className="text-2xl font-bold text-gray-900 mb-2">
            Check with the source
          </h2>
          <p className="text-gray-600 mb-6">
            VoteWise summarises the record. These bodies publish it.
          </p>
          <SourceGrid links={CANDIDATE_SOURCE_LINKS} />
        </section>
      )}

      <section aria-labelledby="next-heading">
        <h2 id="next-heading" className="text-2xl font-bold text-gray-900 mb-2">
          Next
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <Link href="/leaders" className="group vw-card vw-card-hover p-5">
            <span className="flex items-center justify-between gap-3">
              <span className="font-semibold text-gray-900 group-hover:text-green-800 transition">
                Who is in office right now
              </span>
              <ChevronRight size={18} className="shrink-0 text-gray-400" />
            </span>
            <span className="block text-sm text-gray-600 mt-2 leading-relaxed">
              The current holders of the national and county seats, and what each office
              controls.
            </span>
          </Link>

          <Link href="/record" className="group vw-card vw-card-hover p-5">
            <span className="flex items-center justify-between gap-3">
              <span className="font-semibold text-gray-900 group-hover:text-green-800 transition">
                What they promised, and what happened
              </span>
              <ListChecks size={18} className="shrink-0 text-gray-400" />
            </span>
            <span className="block text-sm text-gray-600 mt-2 leading-relaxed">
              Manifesto promises placed next to the evidence of what was delivered.
            </span>
          </Link>
        </div>
      </section>
    </CivicShell>
  );
}
