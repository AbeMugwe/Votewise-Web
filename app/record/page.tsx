import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, FileText } from "lucide-react";
import CivicShell from "@/app/components/civic/CivicShell";
import EmptyState, { SourceGrid } from "@/app/components/civic/SourcePanel";
import { MethodPanel, StatusChip } from "@/app/components/civic/ScorecardPanel";
import {
  SCORECARDS,
  SCORECARDS_EMPTY_COPY,
  SCORECARDS_INTRO,
  SCORECARDS_LAST_VERIFIED,
  SCORECARD_SOURCE_LINKS,
  STATUS_META,
  STATUS_ORDER,
  tallyPromises,
} from "@/content/civic/scorecards";

export const metadata: Metadata = {
  title: "Promises and delivery | VoteWise Kenya",
  description:
    "What Kenya's office holders promised in their manifestos, and the evidence for what has been delivered since — promise by promise, with sources.",
};

const spokenText = [
  "Promises and delivery.",
  SCORECARDS_INTRO,
  ...SCORECARDS.map(
    (c) => `${c.personName}, ${c.officeTitle}, ${c.promises.length} promises tracked.`,
  ),
].join(" ");

export default function RecordPage() {
  return (
    <CivicShell
      eyebrow="Civic guide"
      title="Promises and delivery"
      intro={SCORECARDS_INTRO}
      lastVerified={SCORECARDS_LAST_VERIFIED}
      readAloudText={spokenText}
      width="wide"
    >
      <section aria-labelledby="cards-heading">
        <h2 id="cards-heading" className="text-2xl font-bold text-gray-900 mb-2">
          Scorecards
        </h2>
        <p className="text-gray-600 mb-6">
          One card per manifesto. Open a card to see every promise, its status and the
          evidence behind that status.
        </p>

        {SCORECARDS.length === 0 ? (
          <EmptyState
            heading="No scorecards published yet"
            body={SCORECARDS_EMPTY_COPY}
            links={SCORECARD_SOURCE_LINKS}
          />
        ) : (
          <ul className="grid gap-5 lg:grid-cols-2">
            {SCORECARDS.map((card) => {
              const tally = tallyPromises(card);
              const total = card.promises.length;

              return (
                <li key={card.id}>
                  <Link
                    href={`/record/${card.id}`}
                    className="group block h-full vw-card vw-card-hover p-5"
                  >
                    <span className="flex items-start justify-between gap-3">
                      <span className="min-w-0">
                        <span className="block font-bold text-lg text-gray-900 group-hover:text-green-800 transition">
                          {card.personName}
                        </span>
                        <span className="block text-sm text-gray-600 mt-0.5">
                          {card.officeTitle} · {card.jurisdiction}
                        </span>
                      </span>
                      <ChevronRight size={18} className="shrink-0 text-gray-300 mt-1" />
                    </span>

                    <span className="flex items-center gap-1.5 text-xs text-gray-500 mt-3">
                      <FileText size={13} />
                      {card.manifesto.title} · term {card.term}
                    </span>

                    <span
                      className="flex h-3 w-full overflow-hidden rounded-full bg-gray-100 mt-4"
                      role="img"
                      aria-label={tally
                        .filter((t) => t.count > 0)
                        .map((t) => `${t.count} ${STATUS_META[t.status].label}`)
                        .join(", ")}
                    >
                      {tally
                        .filter((t) => t.count > 0)
                        .map((t) => (
                          <span
                            key={t.status}
                            style={{
                              width: `${(t.count / Math.max(total, 1)) * 100}%`,
                              backgroundColor: STATUS_META[t.status].hex,
                            }}
                          />
                        ))}
                    </span>

                    <span className="block text-sm text-gray-600 mt-3">
                      {total} {total === 1 ? "promise" : "promises"} tracked · checked{" "}
                      {card.asOf}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
      </section>

      <section aria-labelledby="key-heading">
        <h2 id="key-heading" className="text-2xl font-bold text-gray-900 mb-2">
          What the five statuses mean
        </h2>
        <p className="text-gray-600 mb-6">
          Kept-or-broken is a headline, not an assessment. These five let us be accurate
          about the messy middle, which is where most promises live.
        </p>

        <dl className="space-y-3">
          {STATUS_ORDER.map((status) => (
            <div
              key={status}
              className="vw-card p-5 flex flex-col sm:flex-row sm:items-start gap-3"
            >
              <dt className="shrink-0">
                <StatusChip status={status} />
              </dt>
              <dd className="text-gray-700 leading-relaxed">
                {STATUS_META[status].definition}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      <MethodPanel />

      <section aria-labelledby="evidence-heading">
        <h2 id="evidence-heading" className="text-2xl font-bold text-gray-900 mb-2">
          Where the evidence comes from
        </h2>
        <p className="text-gray-600 mb-6">
          These are the public records we read. You can read them too — and tell us when
          we have got a call wrong.
        </p>
        <SourceGrid links={SCORECARD_SOURCE_LINKS} />
      </section>
    </CivicShell>
  );
}
