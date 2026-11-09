import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Check, ChevronRight, CircleAlert, ExternalLink, Clock, Users2 } from "lucide-react";
import CivicShell from "@/app/components/civic/CivicShell";
import { ELECTIVE_OFFICES, getOffice, OFFICES_LAST_VERIFIED } from "@/content/civic/offices";
import { NATIONAL_OFFICE_HOLDERS } from "@/content/civic/politicians";

type Params = { officeId: string };

export function generateStaticParams(): Params[] {
  return ELECTIVE_OFFICES.map((o) => ({ officeId: o.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { officeId } = await params;
  const office = getOffice(officeId);
  if (!office) return { title: "Office not found | VoteWise Kenya" };
  return {
    title: `${office.title} | VoteWise Kenya`,
    description: office.oneLiner,
  };
}

export default async function OfficePage({ params }: { params: Promise<Params> }) {
  const { officeId } = await params;
  const office = getOffice(officeId);
  if (!office) notFound();

  // Only the presidency has a national holder we record against a ballot office.
  const holder = NATIONAL_OFFICE_HOLDERS.find((h) => h.officeId === office.id);

  const spokenText = [
    office.title,
    office.oneLiner,
    `Elected for ${office.termYears} years by ${office.constituencyType}.`,
    "What they do.",
    ...office.responsibilities,
    office.notTheirJob ? `What is not their job. ${office.notTheirJob}` : "",
  ]
    .filter(Boolean)
    .join(" ");

  const otherOffices = ELECTIVE_OFFICES.filter((o) => o.id !== office.id);

  return (
    <CivicShell
      eyebrow={`${office.ballotColour} ballot paper`}
      title={office.title}
      intro={office.oneLiner}
      lastVerified={OFFICES_LAST_VERIFIED}
      readAloudText={spokenText}
      breadcrumb={{ href: "/politicians", label: "All offices" }}
    >
      <section aria-label="Key facts" className="grid gap-4 sm:grid-cols-3">
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <span className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-gray-400">
            <Users2 size={14} /> Represents
          </span>
          <p className="font-bold text-gray-900 mt-2">{office.constituencyType}</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <span className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-gray-400">
            <Clock size={14} /> Term
          </span>
          <p className="font-bold text-gray-900 mt-2">{office.termYears} years</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <span className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-gray-400">
            <ChevronRight size={14} /> How many
          </span>
          <p className="font-bold text-gray-900 mt-2 text-sm leading-snug">
            {office.howMany}
          </p>
        </div>
      </section>

      {holder?.name && (
        <section aria-labelledby="holder-heading">
          <h2 id="holder-heading" className="text-2xl font-bold text-gray-900 mb-4">
            Current holder
          </h2>
          <a
            href={holder.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-start justify-between gap-3 bg-white rounded-xl border border-gray-200 p-5 hover:border-green-400 hover:shadow-md transition"
          >
            <div>
              <h3 className="font-bold text-lg text-gray-900">{holder.name}</h3>
              <p className="text-sm font-medium text-gray-700 mt-0.5">
                {holder.officeTitle}
              </p>
              <p className="text-sm text-gray-600 mt-2 leading-relaxed">{holder.note}</p>
              <p className="text-xs text-gray-400 mt-2">Recorded as of {holder.asOf}</p>
            </div>
            <ExternalLink size={16} className="shrink-0 text-gray-400 mt-1.5" />
          </a>
        </section>
      )}

      <section aria-labelledby="does-heading">
        <h2 id="does-heading" className="text-2xl font-bold text-gray-900 mb-4">
          What this office actually does
        </h2>
        <ul className="space-y-3">
          {office.responsibilities.map((item) => (
            <li
              key={item}
              className="flex gap-3 bg-white rounded-xl border border-gray-200 p-4"
            >
              <span
                className="shrink-0 w-6 h-6 rounded-full flex items-center justify-center mt-0.5"
                style={{ backgroundColor: `${office.accent}1a` }}
              >
                <Check size={14} style={{ color: office.accent }} strokeWidth={3} />
              </span>
              <span className="text-gray-700 leading-relaxed">{item}</span>
            </li>
          ))}
        </ul>
      </section>

      {office.notTheirJob && (
        <section aria-labelledby="not-heading">
          <div className="bg-amber-50 border-2 border-amber-200 rounded-2xl p-6">
            <h2
              id="not-heading"
              className="flex items-center gap-2 text-xl font-bold text-amber-950 mb-2"
            >
              <CircleAlert size={20} className="text-amber-600" />
              What is <em>not</em> their job
            </h2>
            <p className="text-amber-900/90 leading-relaxed">{office.notTheirJob}</p>
            <p className="text-sm text-amber-800/70 mt-3 leading-relaxed">
              Blaming the wrong office is how accountability leaks away. Knowing which seat
              owns a problem is the difference between a complaint and a result.
            </p>
          </div>
        </section>
      )}

      <section aria-labelledby="stand-heading">
        <h2 id="stand-heading" className="text-2xl font-bold text-gray-900 mb-3">
          Standing for this seat
        </h2>
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <p className="text-gray-700 leading-relaxed">{office.toStand}</p>
          <p className="text-xs text-gray-400 mt-4 pt-4 border-t border-gray-100">
            {office.source}
          </p>
        </div>
      </section>

      <section aria-labelledby="other-heading">
        <h2 id="other-heading" className="text-xl font-bold text-gray-900 mb-4">
          The other five seats on your ballot
        </h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {otherOffices.map((other) => (
            <Link
              key={other.id}
              href={`/politicians/${other.id}`}
              className="group flex items-center gap-3 bg-white rounded-xl border border-gray-200 p-4 hover:border-green-400 hover:shadow-md transition"
            >
              <span
                className="shrink-0 w-10 h-10 rounded-xl flex items-center justify-center text-lg"
                style={{ backgroundColor: `${other.accent}1a` }}
                aria-hidden="true"
              >
                {other.icon}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block font-semibold text-gray-900 group-hover:text-green-800 transition text-sm">
                  {other.title}
                </span>
                <span className="block text-xs text-gray-500 mt-0.5 truncate">
                  {other.constituencyType}
                </span>
              </span>
              <ChevronRight
                size={16}
                className="shrink-0 text-gray-300 group-hover:translate-x-0.5 transition-transform"
              />
            </Link>
          ))}
        </div>
      </section>
    </CivicShell>
  );
}
