import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, CircleAlert, ExternalLink } from "lucide-react";
import CivicShell from "@/app/components/civic/CivicShell";
import BallotFinder from "@/app/components/civic/BallotFinder";
import { ELECTIVE_OFFICES, OFFICES_INTRO, BALLOT_TIP } from "@/content/civic/offices";
import {
  NATIONAL_OFFICE_HOLDERS,
  CIVIC_INSTITUTIONS,
  POLITICIANS_LAST_VERIFIED,
} from "@/content/civic/politicians";

export const metadata: Metadata = {
  title: "Who represents you | VoteWise Kenya",
  description:
    "The six offices you elect in a Kenyan general election, what each one actually controls, and who currently holds the national offices.",
};

const spokenText = [
  "Who represents you.",
  OFFICES_INTRO,
  ...ELECTIVE_OFFICES.map(
    (o) => `${o.title}. ${o.oneLiner} Elected for ${o.termYears} years by ${o.constituencyType}.`,
  ),
].join(" ");

export default function PoliticiansPage() {
  return (
    <CivicShell
      eyebrow="Civic guide"
      title="Who represents you"
      intro={OFFICES_INTRO}
      lastVerified={POLITICIANS_LAST_VERIFIED}
      readAloudText={spokenText}
      width="wide"
    >
      <section aria-labelledby="offices-heading">
        <h2 id="offices-heading" className="text-2xl font-bold text-gray-900 mb-2">
          The six seats you vote for
        </h2>
        <p className="text-gray-600 mb-6">
          Tap any office to see exactly what it controls — and, just as usefully, what it
          does not.
        </p>

        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {ELECTIVE_OFFICES.map((office) => (
            <Link
              key={office.id}
              href={`/politicians/${office.id}`}
              className="group bg-white rounded-2xl border border-gray-200 p-5 hover:shadow-lg hover:-translate-y-0.5 transition-all"
              style={{ borderTopWidth: 4, borderTopColor: office.accent }}
            >
              <div className="flex items-start gap-3 mb-3">
                <span
                  className="shrink-0 w-11 h-11 rounded-xl flex items-center justify-center text-xl"
                  style={{ backgroundColor: `${office.accent}1a` }}
                  aria-hidden="true"
                >
                  {office.icon}
                </span>
                <div className="min-w-0">
                  <h3 className="font-bold text-gray-900 leading-snug group-hover:text-green-800 transition">
                    {office.title}
                  </h3>
                  <p className="text-xs text-gray-500 mt-0.5">
                    {office.constituencyType} · {office.termYears}-year term
                  </p>
                </div>
              </div>

              <p className="text-sm text-gray-600 leading-relaxed">{office.oneLiner}</p>

              <span className="inline-flex items-center gap-1 mt-3 text-sm font-semibold text-green-700">
                What they control
                <ChevronRight
                  size={15}
                  className="group-hover:translate-x-0.5 transition-transform"
                />
              </span>
            </Link>
          ))}
        </div>

        <p className="mt-4 flex gap-2 text-sm text-gray-500 bg-gray-100 rounded-lg px-4 py-3 leading-relaxed">
          <CircleAlert size={16} className="shrink-0 mt-0.5 text-gray-400" />
          <span>{BALLOT_TIP}</span>
        </p>
      </section>

      <BallotFinder />

      <section aria-labelledby="holders-heading">
        <h2 id="holders-heading" className="text-2xl font-bold text-gray-900 mb-2">
          National office holders
        </h2>
        <p className="text-gray-600 mb-6">
          Recorded as of {POLITICIANS_LAST_VERIFIED}. Each entry links to the official
          source so you can confirm it yourself.
        </p>

        <div className="space-y-3">
          {NATIONAL_OFFICE_HOLDERS.map((holder) => (
            <a
              key={holder.id}
              href={holder.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-white rounded-xl border border-gray-200 p-5 hover:border-green-400 hover:shadow-md transition"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-bold text-lg text-gray-900">{holder.name}</h3>
                    <span
                      className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                        holder.elected
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {holder.elected ? "Elected" : "Appointed"}
                    </span>
                  </div>
                  <p className="text-sm font-medium text-gray-700 mt-0.5">
                    {holder.officeTitle}
                  </p>
                  <p className="text-sm text-gray-600 mt-2 leading-relaxed">{holder.note}</p>
                </div>
                <ExternalLink size={16} className="shrink-0 text-gray-400 mt-1.5" />
              </div>
            </a>
          ))}
        </div>
      </section>

      <section aria-labelledby="institutions-heading">
        <h2 id="institutions-heading" className="text-2xl font-bold text-gray-900 mb-2">
          Where to hold them to account
        </h2>
        <p className="text-gray-600 mb-6">
          Knowing the name is step one. These are the bodies that publish the records and
          take the complaints.
        </p>

        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {CIVIC_INSTITUTIONS.map((inst) => (
            <a
              key={inst.abbr}
              href={inst.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-white rounded-xl border border-gray-200 p-5 hover:border-green-400 hover:shadow-md transition"
            >
              <span className="flex items-start gap-3">
                <span className="text-2xl shrink-0" aria-hidden="true">
                  {inst.icon}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="flex items-start justify-between gap-2">
                    <span className="font-bold text-gray-900 group-hover:text-green-800 transition">
                      {inst.abbr}
                    </span>
                    <ExternalLink size={14} className="shrink-0 text-gray-400 mt-1" />
                  </span>
                  <span className="block text-xs text-gray-500 mt-0.5">{inst.name}</span>
                  <span className="block text-sm text-gray-600 mt-2 leading-relaxed">
                    {inst.role}
                  </span>
                </span>
              </span>
            </a>
          ))}
        </div>
      </section>
    </CivicShell>
  );
}
