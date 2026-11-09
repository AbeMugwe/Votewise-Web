import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  BadgeCheck,
  CalendarClock,
  ChevronRight,
  ExternalLink,
  MapPin,
} from "lucide-react";
import CivicShell from "@/app/components/civic/CivicShell";
import EmptyState from "@/app/components/civic/SourcePanel";
import ScorecardPanel from "@/app/components/civic/ScorecardPanel";
import { ALL_LEADERS, countyName, getLeader } from "@/content/civic/leaders";
import { getOffice } from "@/content/civic/offices";
import {
  SCORECARDS_EMPTY_COPY,
  SCORECARD_SOURCE_LINKS,
  getScorecard,
  scorecardForHolder,
} from "@/content/civic/scorecards";

type Params = { holderId: string };

export function generateStaticParams(): Params[] {
  return ALL_LEADERS.filter((entry) => entry.name).map((entry) => ({
    holderId: entry.id,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { holderId } = await params;
  const holder = getLeader(holderId);
  if (!holder?.name) return { title: "Office holder not found | VoteWise Kenya" };
  return {
    title: `${holder.name} | VoteWise Kenya`,
    description: `${holder.name}, ${holder.officeTitle}. What the office controls, and what has been delivered against the manifesto.`,
  };
}

export default async function LeaderProfilePage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { holderId } = await params;
  const holder = getLeader(holderId);

  // An unnamed record has no profile to show — the directory links those
  // straight to the official register instead of here.
  if (!holder || !holder.name) notFound();

  const office = holder.officeId ? getOffice(holder.officeId) : undefined;
  const card = holder.scorecardId
    ? getScorecard(holder.scorecardId)
    : scorecardForHolder(holder.id);
  const county = holder.countyCode ? countyName(holder.countyCode) : undefined;

  /*
   * The official rosters publish a name and a seat for most members and nothing
   * else, so `note` is often absent. The office description is a better fallback
   * than a repeated boilerplate sentence: it is specific to the seat, and it is
   * the thing a reader needs in order to judge the holder fairly.
   */
  const summary =
    holder.note ??
    office?.oneLiner ??
    `${holder.officeTitle}. VoteWise records the seat and the official source; the roster publishes no further detail for this holder.`;

  const spokenText = [
    holder.name,
    holder.officeTitle,
    summary,
    card ? `Manifesto record: ${card.promises.length} promises tracked.` : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <CivicShell
      eyebrow={holder.tier === "national" ? "National office" : "County office"}
      title={holder.name}
      intro={summary}
      lastVerified={holder.asOf}
      readAloudText={spokenText}
      breadcrumb={{ href: "/leaders", label: "Who is in office now" }}
      width="wide"
    >
      <section aria-labelledby="holder-facts" className="-mt-2">
        <h2 id="holder-facts" className="sr-only">
          Office details
        </h2>

        <div className="vw-card p-5 sm:p-6">
          <dl className="grid gap-x-8 gap-y-4 sm:grid-cols-2 xl:grid-cols-4">
            <Fact label="Office" value={holder.officeTitle} />
            <Fact
              label="Jurisdiction"
              value={county ? `${county} County` : holder.jurisdiction}
              icon={<MapPin size={14} />}
            />
            <Fact
              label="How they got there"
              value={holder.elected ? "Elected" : "Appointed"}
              icon={holder.elected ? <BadgeCheck size={14} /> : undefined}
            />
            <Fact
              label="Record last checked"
              value={holder.asOf}
              icon={<CalendarClock size={14} />}
            />
          </dl>

          <div className="mt-5 flex flex-wrap items-center gap-3">
            <a
              href={holder.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-green-700 hover:text-green-900"
            >
              Official page for this office
              <ExternalLink size={14} />
            </a>

            {office && (
              <>
                <span className="text-gray-300" aria-hidden="true">
                  ·
                </span>
                <Link
                  href={`/politicians/${office.id}`}
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-green-700 hover:text-green-900"
                >
                  What a {office.title} controls
                  <ChevronRight size={15} />
                </Link>
              </>
            )}
          </div>
        </div>
      </section>

      {office && (
        <section aria-labelledby="powers-heading">
          <h2 id="powers-heading" className="text-2xl font-bold text-gray-900 mb-2">
            What this office can and cannot do
          </h2>
          <p className="text-gray-600 mb-6">
            Judge a holder on the powers they actually have. Blaming the wrong office is
            how a genuine failure goes unanswered.
          </p>

          <div className="grid gap-5 lg:grid-cols-2">
            <div className="vw-card p-5">
              <h3 className="font-bold text-gray-900 mb-3">Their job</h3>
              <ul className="space-y-2">
                {office.responsibilities.map((item) => (
                  <li key={item} className="flex gap-2 text-gray-700 leading-relaxed">
                    <span className="text-green-700 shrink-0" aria-hidden="true">
                      ·
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {office.notTheirJob && (
              <div className="vw-card p-5 bg-gray-50">
                <h3 className="font-bold text-gray-900 mb-3">Not their job</h3>
                <p className="text-gray-700 leading-relaxed">{office.notTheirJob}</p>
              </div>
            )}
          </div>
        </section>
      )}

      {card ? (
        <ScorecardPanel card={card} />
      ) : (
        <section aria-labelledby="no-scorecard-heading">
          <h2
            id="no-scorecard-heading"
            className="text-2xl font-bold text-gray-900 mb-2"
          >
            What they promised, and what happened
          </h2>
          <p className="text-gray-600 mb-6">
            This is the part that matters most, and the part we refuse to improvise.
          </p>
          <EmptyState
            heading="No manifesto scorecard published for this office yet"
            body={SCORECARDS_EMPTY_COPY}
            links={SCORECARD_SOURCE_LINKS}
          />
        </section>
      )}
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
