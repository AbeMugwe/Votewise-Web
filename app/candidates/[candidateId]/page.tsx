import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  BadgeCheck,
  CalendarClock,
  ChevronRight,
  ExternalLink,
  MapPin,
  Quote,
  Scale,
} from "lucide-react";
import CivicShell from "@/app/components/civic/CivicShell";
import { SourceGrid } from "@/app/components/civic/SourcePanel";
import { getOffice } from "@/content/civic/offices";
import { COUNTIES } from "@/content/civic/politicians";
import {
  CANDIDATES,
  CANDIDATE_METHOD,
  getCandidate,
} from "@/content/civic/candidates";
import { getScorecard } from "@/content/civic/scorecards";

type Params = { candidateId: string };

export function generateStaticParams(): Params[] {
  return CANDIDATES.map((c) => ({ candidateId: c.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { candidateId } = await params;
  const candidate = getCandidate(candidateId);
  if (!candidate) return { title: "Candidate not found | VoteWise Kenya" };
  return {
    title: `${candidate.name} | VoteWise Kenya`,
    description: `${candidate.name}, ${candidate.party}, standing for ${candidate.officeSought}. Declared positions and record, with sources.`,
  };
}

export default async function CandidateProfilePage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { candidateId } = await params;
  const candidate = getCandidate(candidateId);
  if (!candidate) notFound();

  const office = getOffice(candidate.officeId);
  const county = candidate.countyCode
    ? COUNTIES.find((c) => c.code === candidate.countyCode)
    : undefined;
  const scorecard = candidate.scorecardId
    ? getScorecard(candidate.scorecardId)
    : undefined;

  const spokenText = [
    candidate.name,
    `${candidate.party}, standing for ${candidate.officeSought}.`,
    candidate.bio,
    candidate.stance.length ? "Declared positions." : "",
    ...candidate.stance.map((s) => `${s.issue}. ${s.stance}`),
    candidate.record.length ? "Record." : "",
    ...candidate.record.map((r) => `${r.period}. ${r.summary}`),
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <CivicShell
      eyebrow={candidate.incumbent ? "Candidate · incumbent" : "Candidate"}
      title={candidate.name}
      intro={candidate.bio}
      lastVerified={candidate.asOf}
      readAloudText={spokenText}
      breadcrumb={{ href: "/candidates", label: "All candidates" }}
      width="wide"
    >
      {/* Identity block: everything a voter needs before reading a word of policy. */}
      <section aria-labelledby="identity-heading" className="-mt-2">
        <h2 id="identity-heading" className="sr-only">
          Who this is
        </h2>

        <div className="vw-card p-5 sm:p-6">
          <dl className="grid gap-x-8 gap-y-4 sm:grid-cols-2 xl:grid-cols-4">
            <Fact label="Party or coalition" value={candidate.party} />
            <Fact label="Seat contested" value={candidate.officeSought} />
            <Fact
              label="Where"
              value={candidate.area ?? county?.name ?? "Republic of Kenya"}
              icon={<MapPin size={14} />}
            />
            <Fact
              label="Currently holds this seat"
              value={candidate.incumbent ? "Yes" : "No"}
              icon={candidate.incumbent ? <BadgeCheck size={14} /> : undefined}
            />
            {candidate.background && (
              <Fact label="Before politics" value={candidate.background} />
            )}
            <Fact
              label="Record last checked"
              value={candidate.asOf}
              icon={<CalendarClock size={14} />}
            />
          </dl>

          {office && (
            <Link
              href={`/politicians/${office.id}`}
              className="inline-flex items-center gap-1.5 mt-5 text-sm font-semibold text-green-700 hover:text-green-900"
            >
              What a {office.title} actually controls
              <ChevronRight size={15} />
            </Link>
          )}
        </div>
      </section>

      <section aria-labelledby="stance-heading">
        <h2 id="stance-heading" className="text-2xl font-bold text-gray-900 mb-2">
          Where they say they stand
        </h2>
        <p className="text-gray-600 mb-6">
          Positions as the candidate has stated them publicly. Each one links to the
          statement so you can read it in full and in context.
        </p>

        {candidate.stance.length === 0 ? (
          <p className="vw-card border-dashed p-6 text-gray-600 leading-relaxed">
            No sourced policy statements are recorded for this candidate yet. We do not
            summarise a position we cannot link to.
          </p>
        ) : (
          <ul className="space-y-4">
            {candidate.stance.map((position) => (
              <li key={position.issue} className="vw-card p-5">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="font-bold text-lg text-gray-900">{position.issue}</h3>
                  {position.statedOn && (
                    <span className="text-xs text-gray-500">
                      Stated {position.statedOn}
                    </span>
                  )}
                </div>

                <p className="text-gray-700 leading-relaxed mt-2">{position.stance}</p>

                {position.quote && (
                  <blockquote className="mt-3 flex gap-3 rounded-xl bg-gray-50 border-l-4 border-green-700 px-4 py-3">
                    <Quote size={16} className="shrink-0 mt-1 text-green-700" />
                    <p className="text-gray-700 italic leading-relaxed">
                      {position.quote}
                    </p>
                  </blockquote>
                )}

                <a
                  href={position.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 mt-3 text-sm font-medium text-green-700 hover:text-green-900"
                >
                  Read the source
                  <ExternalLink size={14} />
                </a>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section aria-labelledby="record-heading">
        <h2 id="record-heading" className="text-2xl font-bold text-gray-900 mb-2">
          What they have done
        </h2>
        <p className="text-gray-600 mb-6">
          Offices held and documented actions. Claims only, with a citation each — not
          endorsements, and not rumour.
        </p>

        {candidate.record.length === 0 ? (
          <p className="vw-card border-dashed p-6 text-gray-600 leading-relaxed">
            No record entries are published for this candidate yet.
          </p>
        ) : (
          <ol className="relative border-l-2 border-gray-200 ml-3 space-y-6">
            {candidate.record.map((item, i) => (
              <li key={`${item.period}-${i}`} className="relative pl-6">
                <span
                  className="absolute -left-[7px] top-1.5 w-3 h-3 rounded-full bg-green-700 ring-4 ring-gray-50"
                  aria-hidden="true"
                />
                <p className="text-xs font-mono text-gray-500">{item.period}</p>
                <h3 className="font-semibold text-gray-900 mt-0.5">{item.summary}</h3>
                {item.detail && (
                  <p className="text-sm text-gray-600 leading-relaxed mt-1">
                    {item.detail}
                  </p>
                )}
                <a
                  href={item.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 mt-2 text-sm font-medium text-green-700 hover:text-green-900"
                >
                  Source
                  <ExternalLink size={13} />
                </a>
              </li>
            ))}
          </ol>
        )}
      </section>

      {scorecard && (
        <section aria-labelledby="scorecard-heading">
          <h2 id="scorecard-heading" className="text-2xl font-bold text-gray-900 mb-2">
            Their last manifesto, measured
          </h2>
          <p className="text-gray-600 mb-4">
            {candidate.name} has held office before, so there is a published record of
            promises against outcomes.
          </p>
          <Link href={`/record/${scorecard.id}`} className="group vw-card vw-card-hover p-5 block">
            <span className="flex items-center justify-between gap-3">
              <span className="font-semibold text-gray-900 group-hover:text-green-800 transition">
                {scorecard.manifesto.title} · {scorecard.term}
              </span>
              <ChevronRight size={18} className="shrink-0 text-gray-400" />
            </span>
            <span className="block text-sm text-gray-600 mt-2">
              {scorecard.promises.length} promises tracked, each with evidence.
            </span>
          </Link>
        </section>
      )}

      <section aria-labelledby="candidate-sources-heading">
        <h2
          id="candidate-sources-heading"
          className="text-2xl font-bold text-gray-900 mb-2"
        >
          Official pages for this candidate
        </h2>
        <p className="text-gray-600 mb-6">
          Go past our summary. These are the candidate&rsquo;s and the state&rsquo;s own
          pages.
        </p>
        <SourceGrid links={candidate.sources} />
      </section>

      <section aria-labelledby="fairness-heading">
        <h2 id="fairness-heading" className="text-2xl font-bold text-gray-900 mb-2">
          How this profile was written
        </h2>
        <ul className="vw-card divide-y divide-gray-100">
          {CANDIDATE_METHOD.map((rule) => (
            <li key={rule} className="flex gap-3 px-5 py-4">
              <Scale size={18} className="shrink-0 mt-0.5 text-green-700" />
              <span className="text-gray-700 leading-relaxed">{rule}</span>
            </li>
          ))}
        </ul>
      </section>
    </CivicShell>
  );
}

function Fact({
  label,
  value,
  icon,
}: {
  label: string;
  value: string;
  icon?: React.ReactNode;
}) {
  return (
    <div className="min-w-0">
      <dt className="text-xs font-semibold uppercase tracking-wide text-gray-400">
        {label}
      </dt>
      <dd className="flex items-center gap-1.5 text-gray-900 font-medium mt-1">
        {icon && <span className="text-gray-400 shrink-0">{icon}</span>}
        <span className="min-w-0">{value}</span>
      </dd>
    </div>
  );
}
