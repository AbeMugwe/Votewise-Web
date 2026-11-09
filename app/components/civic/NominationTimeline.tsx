import { CalendarClock, ExternalLink } from "lucide-react";
import {
  formatMilestone,
  milestoneRange,
  type CandidatePublicationMilestone,
} from "@/content/civic/candidates";

/**
 * When candidate profiles will exist, from the IEBC's own election plan.
 *
 * The candidate section is empty and will stay empty until the Commission
 * clears the register — there is nobody to profile before nominations close.
 * "Nothing here yet" answers nothing, so the empty state carries the official
 * timetable instead and tells the reader when to come back.
 */
export default function NominationTimeline({
  milestones,
  asOf,
}: {
  milestones: CandidatePublicationMilestone[];
  asOf?: string;
}) {
  if (milestones.length === 0) return null;

  // The IEBC plan is not published in date order, and a timetable out of order
  // is worse than no timetable.
  const ordered = [...milestones].sort((a, b) =>
    milestoneRange(a).from.localeCompare(milestoneRange(b).from),
  );

  const today = new Date().toISOString().slice(0, 10);

  return (
    <section aria-labelledby="timeline-heading">
      <h2 id="timeline-heading" className="text-2xl font-bold text-gray-900 mb-2">
        When candidate profiles will appear
      </h2>
      <p className="text-gray-600 mb-6">
        These dates come from the IEBC&rsquo;s published election plan. We publish a
        profile only once the Commission has cleared the candidate — before that, any
        list would be speculation about who might stand.
      </p>

      <ol className="relative border-l-2 border-gray-200 ml-3 space-y-6">
        {ordered.map((milestone) => {
          const { from } = milestoneRange(milestone);
          const past = Boolean(from) && from < today;

          return (
            <li key={milestone.id} className="relative pl-6">
              <span
                className={`absolute -left-[7px] top-1.5 w-3 h-3 rounded-full ring-4 ring-gray-50 ${
                  past ? "bg-gray-300" : "bg-green-700"
                }`}
                aria-hidden="true"
              />

              <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-gray-500">
                <CalendarClock size={13} />
                {formatMilestone(milestone)}
                {past && <span className="text-gray-400 normal-case">· passed</span>}
              </p>

              <h3 className="font-semibold text-gray-900 mt-1">{milestone.label}</h3>
              <p className="text-sm text-gray-600 leading-relaxed mt-1">
                {milestone.detail}
              </p>

              <a
                href={milestone.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 mt-2 text-sm font-medium text-green-700 hover:text-green-900"
              >
                IEBC election plan
                <ExternalLink size={13} />
              </a>
            </li>
          );
        })}
      </ol>

      {asOf && (
        <p className="mt-5 text-xs text-gray-500 leading-relaxed">
          Timetable checked against the Commission&rsquo;s plan on {asOf}. Electoral
          dates move — treat these as the plan of record, not a guarantee.
        </p>
      )}
    </section>
  );
}
