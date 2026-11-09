import {
  CalendarClock,
  ExternalLink,
  FileText,
  Info,
  Quote,
  Scale,
} from "lucide-react";
import {
  SCORECARD_METHOD,
  STATUS_META,
  STATUS_ORDER,
  isTranscriptOnly,
  promiseSourceHref,
  scorecardSectors,
  tallyPromises,
  type ManifestoPromise,
  type PromiseStatus,
  type Scorecard,
} from "@/content/civic/scorecards";

/** Anchor id for a sector heading, used by the jump list. */
function sectorId(sector: string): string {
  return `sector-${sector.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")}`;
}

/**
 * A manifesto scorecard, rendered whole: the document, the tally, the promises
 * grouped by sector, and the rubric.
 *
 * Shared by /record/[scorecardId] and the leader profile, so a promise is
 * presented identically wherever a reader meets it. Server-rendered on purpose —
 * there is no interaction here worth shipping JavaScript for, and this is the
 * page most likely to be read on a slow connection.
 */
export default function ScorecardPanel({
  card,
  showMethod = true,
}: {
  card: Scorecard;
  showMethod?: boolean;
}) {
  const tally = tallyPromises(card);
  const total = card.promises.length;
  const sectors = scorecardSectors(card);
  const transcriptOnly = isTranscriptOnly(card);
  const pendingCount = card.promises.filter(
    (p) => p.status === "unverified" && p.evidence.length === 0,
  ).length;

  return (
    <div className="space-y-10">
      <section aria-labelledby="manifesto-heading">
        <h2 id="manifesto-heading" className="text-2xl font-bold text-gray-900 mb-2">
          The document
        </h2>
        <p className="text-gray-600 mb-4">
          Every promise below is traced to this manifesto. Read it yourself — it is a
          public document.
        </p>

        <a
          href={card.manifesto.url}
          target="_blank"
          rel="noopener noreferrer"
          className="group vw-card vw-card-hover p-5 block"
        >
          <span className="flex items-start justify-between gap-3">
            <span className="flex items-start gap-3 min-w-0">
              <FileText size={20} className="shrink-0 mt-0.5 text-green-700" />
              <span className="min-w-0">
                <span className="block font-semibold text-gray-900 group-hover:text-green-800 transition">
                  {card.manifesto.title}
                </span>
                <span className="block text-sm text-gray-500 mt-0.5">
                  {card.personName} · {card.officeTitle} · term {card.term}
                  {card.manifesto.published && ` · published ${card.manifesto.published}`}
                </span>
              </span>
            </span>
            <ExternalLink size={16} className="shrink-0 text-gray-400 mt-1" />
          </span>
        </a>
      </section>

      {transcriptOnly ? (
        <section aria-labelledby="tally-heading">
          <h2 id="tally-heading" className="text-2xl font-bold text-gray-900 mb-2">
            All {total} promises transcribed. None scored yet.
          </h2>
          <p className="text-gray-600 mb-5">
            This is an honest halfway house, and we would rather show it than hide it.
          </p>

          {/* No stacked bar here on purpose. A bar that is 100% one colour reads as
              a finding ("everything failed"), when the truth is that the assessment
              has not happened yet. */}
          <div className="vw-card border-dashed p-6">
            <h3 className="flex items-center gap-2 font-bold text-gray-900">
              <Info size={18} className="text-green-700 shrink-0" />
              What you are looking at
            </h3>
            <p className="mt-2 text-gray-700 leading-relaxed">
              Every promise in {card.manifesto.title} has been transcribed from the
              document, with the page it appears on. What has not happened yet is the
              evidence pass: reading the Auditor-General, Controller of Budget, Hansard
              and Gazette records for each promise and assigning a status we can defend.
            </p>
            <p className="mt-3 text-gray-700 leading-relaxed">
              Until that is done every promise sits at
              &ldquo;{STATUS_META.unverified.label}&rdquo;. That is not a verdict on the
              office holder — it is a statement about our own work. Scoring 182 promises
              from memory or from headlines would be quicker and worthless.
            </p>
            <p className="mt-3 text-sm text-gray-500 leading-relaxed">
              Transcription checked {card.asOf}. The promises below are useful now: they
              are what was actually committed to in writing, which is already more than
              most voters have in front of them.
            </p>
          </div>
        </section>
      ) : (
        <section aria-labelledby="tally-heading">
          <h2 id="tally-heading" className="text-2xl font-bold text-gray-900 mb-2">
            Where the {total} tracked {total === 1 ? "promise" : "promises"} stand
          </h2>
          <p className="text-gray-600 mb-5">
            Last checked {card.asOf}. A promise with no evidence either way counts as
            &ldquo;{STATUS_META.unverified.label}&rdquo; — we do not guess.
          </p>

          {pendingCount > 0 && (
            <p className="flex gap-2 mb-5 rounded-lg bg-gray-100 px-4 py-3 text-sm text-gray-600 leading-relaxed">
              <Info size={16} className="shrink-0 mt-0.5 text-gray-400" />
              <span>
                {pendingCount} of {total} promises are transcribed but not yet assessed.
                That is a statement about how far our evidence review has got, not a
                finding about {card.personName} — each one needs a document behind it
                before it moves.
              </span>
            </p>
          )}

          {/* A single stacked bar beats five pie charts: it answers "how much of
              this got done" in one glance and degrades to a legend list on narrow
              screens. */}
          <div
            className="flex h-4 w-full overflow-hidden rounded-full bg-gray-100"
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
          </div>

          <dl className="mt-5 grid gap-3 sm:grid-cols-3 xl:grid-cols-5">
            {STATUS_ORDER.map((status) => {
              const count = tally.find((t) => t.status === status)?.count ?? 0;
              return (
                <div key={status} className="vw-card p-4">
                  <dt className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                    <span
                      className="w-2.5 h-2.5 rounded-full shrink-0"
                      style={{ backgroundColor: STATUS_META[status].hex }}
                      aria-hidden="true"
                    />
                    {STATUS_META[status].label}
                  </dt>
                  <dd className="mt-1 text-2xl font-bold text-gray-900">{count}</dd>
                  <dd className="text-xs text-gray-500 leading-relaxed mt-1">
                    {STATUS_META[status].definition}
                  </dd>
                </div>
              );
            })}
          </dl>
        </section>
      )}

      {/* 182 promises is a very long page. A sector index turns it into something
          a reader can navigate to the thing they care about. */}
      {sectors.length > 3 && (
        <nav aria-labelledby="sector-index-heading">
          <h2
            id="sector-index-heading"
            className="text-2xl font-bold text-gray-900 mb-2"
          >
            Jump to a sector
          </h2>
          <p className="text-gray-600 mb-4">
            {sectors.length} sectors, {total} promises.
          </p>
          <ul className="flex flex-wrap gap-2">
            {sectors.map((sector) => {
              const count = card.promises.filter((p) => p.sector === sector).length;
              return (
                <li key={sector}>
                  <a
                    href={`#${sectorId(sector)}`}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 hover:border-green-400 hover:text-green-800 transition"
                  >
                    {sector}
                    <span className="text-xs text-gray-400">{count}</span>
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
      )}

      <section aria-labelledby="promises-heading">
        <h2 id="promises-heading" className="text-2xl font-bold text-gray-900 mb-2">
          Promise by promise
        </h2>
        <p className="text-gray-600 mb-6">
          Grouped by sector. Each promise shows where it was made and what evidence we
          have for what happened next.
        </p>

        <div className="space-y-8">
          {sectors.map((sector) => {
            const inSector = card.promises.filter((p) => p.sector === sector);
            const scored = inSector.filter(
              (p) => p.status !== "unverified" || p.evidence.length > 0,
            );
            const pending = inSector.filter(
              (p) => p.status === "unverified" && p.evidence.length === 0,
            );
            return (
              <div key={sector} id={sectorId(sector)} className="scroll-mt-20">
                <h3 className="flex items-baseline gap-2 text-sm font-semibold uppercase tracking-wide text-gray-500 mb-3">
                  {sector}
                  <span className="text-gray-400 font-normal normal-case">
                    {inSector.length} {inSector.length === 1 ? "promise" : "promises"}
                  </span>
                </h3>
                {scored.length > 0 && (
                  <ul className="space-y-4">
                    {scored.map((promise) => (
                      <li key={promise.id}>
                        <PromiseCard promise={promise} />
                      </li>
                    ))}
                  </ul>
                )}

                {/* A promise with no evidence either way has nothing to show in a
                    card but its own text. Rendering 157 full cards buried the 25
                    that have actually been assessed, and cost about 600KB of
                    markup to say "we do not know yet" over and over. */}
                {pending.length > 0 && (
                  <details className="mt-3 vw-card" open={scored.length === 0}>
                    <summary className="cursor-pointer px-5 py-3 text-sm font-semibold text-gray-700">
                      {pending.length} more transcribed, not yet assessed
                    </summary>
                    <ul className="divide-y divide-gray-100 border-t border-gray-100">
                      {pending.map((promise) => (
                        <li key={promise.id}>
                          <PromiseRow promise={promise} />
                        </li>
                      ))}
                    </ul>
                  </details>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {showMethod && <MethodPanel />}
    </div>
  );
}

export function StatusChip({ status }: { status: PromiseStatus }) {
  const meta = STATUS_META[status];
  return (
    <span
      className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full border ${meta.chipClass}`}
    >
      <span
        className="w-2 h-2 rounded-full shrink-0"
        style={{ backgroundColor: meta.hex }}
        aria-hidden="true"
      />
      {meta.label}
    </span>
  );
}

/**
 * Compact form for a transcribed-but-unscored promise.
 *
 * One line of commitment text and a link to the page it was printed on, which
 * is the whole of what we can honestly say at this stage.
 */
function PromiseRow({ promise }: { promise: ManifestoPromise }) {
  return (
    <article className="flex items-start justify-between gap-3 px-5 py-3.5">
      <p className="text-gray-800 leading-relaxed min-w-0">{promise.promise}</p>
      <a
        href={promiseSourceHref(promise)}
        target="_blank"
        rel="noopener noreferrer"
        className="shrink-0 inline-flex items-center gap-1 text-xs font-medium text-green-700 hover:text-green-900 mt-0.5"
      >
        {promise.pdfPage ? `Page ${promise.pdfPage}` : "Source"}
        <ExternalLink size={11} />
      </a>
    </article>
  );
}

function PromiseCard({ promise }: { promise: ManifestoPromise }) {
  return (
    <article className="vw-card p-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <h4 className="font-bold text-gray-900 leading-snug flex-1 min-w-0">
          {promise.promise}
        </h4>
        <StatusChip status={promise.status} />
      </div>

      {promise.quote && (
        <blockquote className="mt-3 flex gap-3 rounded-xl bg-gray-50 border-l-4 border-green-700 px-4 py-3">
          <Quote size={15} className="shrink-0 mt-1 text-green-700" />
          <p className="text-gray-700 italic leading-relaxed text-sm">{promise.quote}</p>
        </blockquote>
      )}

      <p className="text-gray-700 leading-relaxed mt-3">{promise.progressNote}</p>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        <a
          href={promiseSourceHref(promise)}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 bg-gray-50 px-3 py-1.5 text-xs font-medium text-gray-700 hover:border-green-400 hover:bg-white transition"
        >
          The promise
          {promise.pdfPage && (
            <span className="text-gray-400">p.{promise.pdfPage}</span>
          )}
          <ExternalLink size={12} className="text-gray-400" />
        </a>

        {promise.originalUrl && (
          <a
            href={promise.originalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-gray-700 hover:border-green-400 transition"
          >
            Original document
            <ExternalLink size={12} className="text-gray-400" />
          </a>
        )}

        {promise.evidence.map((item) => (
          <a
            key={item.url}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-gray-700 hover:border-green-400 transition"
          >
            {item.kind ? `${item.kind}: ${item.label}` : item.label}
            {item.dated && <span className="text-gray-400">{item.dated}</span>}
            <ExternalLink size={12} className="text-gray-400" />
          </a>
        ))}

        {promise.evidence.length === 0 && (
          <span className="text-xs text-gray-500">
            No evidence found either way — which is why this is not scored as delivered or
            abandoned.
          </span>
        )}
      </div>

      <p className="flex items-center gap-1.5 mt-3 text-xs text-gray-400">
        <CalendarClock size={12} />
        Status checked {promise.asOf}
      </p>
    </article>
  );
}

/** The rubric, published next to the scores rather than buried in an About page. */
export function MethodPanel() {
  return (
    <section aria-labelledby="method-heading">
      <h2 id="method-heading" className="text-2xl font-bold text-gray-900 mb-2">
        How we score a promise
      </h2>
      <p className="text-gray-600 mb-6">{SCORECARD_METHOD.intro}</p>

      <ul className="vw-card divide-y divide-gray-100">
        {SCORECARD_METHOD.rules.map((rule) => (
          <li key={rule} className="flex gap-3 px-5 py-4">
            <Scale size={18} className="shrink-0 mt-0.5 text-green-700" />
            <span className="text-gray-700 leading-relaxed">{rule}</span>
          </li>
        ))}
      </ul>

      <p className="mt-4 text-sm text-gray-500 leading-relaxed bg-gray-100 rounded-lg px-4 py-3">
        {SCORECARD_METHOD.disclaimer}
      </p>
    </section>
  );
}
