import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, Landmark, ListChecks } from "lucide-react";
import CivicShell from "@/app/components/civic/CivicShell";
import LeaderDirectory, {
  type LeaderFilters,
} from "@/app/components/civic/LeaderDirectory";
import { SourceGrid } from "@/app/components/civic/SourcePanel";
import {
  ALL_LEADERS,
  LEADERS_INTRO,
  LEADERS_LAST_VERIFIED,
  LEADER_SOURCE_LINKS,
} from "@/content/civic/leaders";
import { ELECTIVE_OFFICES } from "@/content/civic/offices";

export const metadata: Metadata = {
  title: "Who is in office now | VoteWise Kenya",
  description:
    "The people currently holding national and county office in Kenya, what each office controls, and the official record for each appointment.",
};

/*
 * Read-aloud covers the page's own words, not the register.
 *
 * This used to concatenate all 416 holders, which put ~46KB of names into the
 * HTML (twice, counting the RSC payload) and made the listen control read the
 * entire Parliament aloud before reaching anything useful. The directory itself
 * is searchable; speech should orient a reader, then let them search.
 */
const spokenText = [
  "Who is in office now.",
  LEADERS_INTRO,
  `VoteWise records ${ALL_LEADERS.filter((l) => l.name).length} current office holders.`,
  "Search by name, or filter by seat and county, to hear about one of them.",
].join(" ");

export default async function LeadersPage({
  searchParams,
}: {
  searchParams: Promise<LeaderFilters>;
}) {
  const filters = await searchParams;

  return (
    <CivicShell
      eyebrow="Civic guide"
      title="Who is in office now"
      intro={LEADERS_INTRO}
      lastVerified={LEADERS_LAST_VERIFIED}
      readAloudText={spokenText}
      width="wide"
    >
      <section aria-labelledby="directory-heading">
        <h2 id="directory-heading" className="text-2xl font-bold text-gray-900 mb-2">
          The current holders
        </h2>
        <p className="text-gray-600 mb-6">
          Search by name, or narrow to your county. Every record shows the date a human
          last checked it, because office holders change.
        </p>

        <LeaderDirectory filters={filters} />
      </section>

      <section aria-labelledby="offices-heading">
        <h2 id="offices-heading" className="text-2xl font-bold text-gray-900 mb-2">
          What each office is for
        </h2>
        <p className="text-gray-600 mb-6">
          Knowing the name is half of it. Knowing which of them to call about a broken
          borehole is the other half.
        </p>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {ELECTIVE_OFFICES.map((office) => (
            <Link
              key={office.id}
              href={`/politicians/${office.id}`}
              className="group vw-card vw-card-hover p-5"
              style={{ borderTopWidth: 4, borderTopColor: office.accent }}
            >
              <span className="flex items-center justify-between gap-2">
                <span className="font-bold text-gray-900 group-hover:text-green-800 transition">
                  {office.title}
                </span>
                <ChevronRight size={16} className="shrink-0 text-gray-400" />
              </span>
              <span className="block text-sm text-gray-600 mt-2 leading-relaxed">
                {office.oneLiner}
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section aria-labelledby="accountability-heading">
        <h2
          id="accountability-heading"
          className="text-2xl font-bold text-gray-900 mb-2"
        >
          The official registers
        </h2>
        <p className="text-gray-600 mb-6">
          These bodies publish who holds what. When our record and theirs disagree,
          theirs is right.
        </p>
        <SourceGrid links={LEADER_SOURCE_LINKS} />
      </section>

      <section aria-labelledby="next-heading">
        <h2 id="next-heading" className="text-2xl font-bold text-gray-900 mb-2">
          Next
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <Link href="/record" className="group vw-card vw-card-hover p-5">
            <span className="flex items-center justify-between gap-3">
              <span className="font-semibold text-gray-900 group-hover:text-green-800 transition">
                What have they actually done?
              </span>
              <ListChecks size={18} className="shrink-0 text-gray-400" />
            </span>
            <span className="block text-sm text-gray-600 mt-2 leading-relaxed">
              Manifesto promises next to the evidence of delivery, promise by promise.
            </span>
          </Link>

          <Link href="/candidates" className="group vw-card vw-card-hover p-5">
            <span className="flex items-center justify-between gap-3">
              <span className="font-semibold text-gray-900 group-hover:text-green-800 transition">
                Who wants the job next?
              </span>
              <Landmark size={18} className="shrink-0 text-gray-400" />
            </span>
            <span className="block text-sm text-gray-600 mt-2 leading-relaxed">
              Candidate profiles: declared positions and past record, with sources.
            </span>
          </Link>
        </div>
      </section>
    </CivicShell>
  );
}
