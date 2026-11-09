import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import CivicShell from "@/app/components/civic/CivicShell";
import ScorecardPanel from "@/app/components/civic/ScorecardPanel";
import { SCORECARDS, getScorecard } from "@/content/civic/scorecards";
import { getLeader } from "@/content/civic/leaders";

type Params = { scorecardId: string };

export function generateStaticParams(): Params[] {
  return SCORECARDS.map((card) => ({ scorecardId: card.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { scorecardId } = await params;
  const card = getScorecard(scorecardId);
  if (!card) return { title: "Scorecard not found | VoteWise Kenya" };
  return {
    title: `${card.personName}: promises and delivery | VoteWise Kenya`,
    description: `${card.promises.length} promises from ${card.manifesto.title}, each with its status and the evidence behind it.`,
  };
}

export default async function ScorecardPage({ params }: { params: Promise<Params> }) {
  const { scorecardId } = await params;
  const card = getScorecard(scorecardId);
  if (!card) notFound();

  const holder = card.holderId ? getLeader(card.holderId) : undefined;

  /*
   * Speak the assessed promises only. Reading all 182 aloud — most of them
   * "we have not found evidence yet" — is both unlistenable and about 45KB of
   * prose embedded twice in the page.
   */
  const assessed = card.promises.filter(
    (p) => p.status !== "unverified" || p.evidence.length > 0,
  );
  const spokenText = [
    `${card.personName}, ${card.officeTitle}.`,
    `Promises from ${card.manifesto.title}, term ${card.term}.`,
    `${card.promises.length} promises transcribed, ${assessed.length} assessed so far.`,
    ...assessed.map((p) => `${p.promise}. ${p.progressNote}`),
  ].join(" ");

  return (
    <CivicShell
      eyebrow="Promises and delivery"
      title={card.personName}
      intro={`${card.officeTitle}, ${card.jurisdiction}. Every promise below comes from ${card.manifesto.title} for the ${card.term} term, placed next to the evidence of what happened.`}
      lastVerified={card.asOf}
      readAloudText={spokenText}
      breadcrumb={{ href: "/record", label: "All scorecards" }}
      width="wide"
    >
      {holder?.name && (
        <Link
          href={`/leaders/${holder.id}`}
          className="group vw-card vw-card-hover p-5 block -mt-2"
        >
          <span className="flex items-center justify-between gap-3">
            <span className="font-semibold text-gray-900 group-hover:text-green-800 transition">
              The office {holder.name} holds, and what it controls
            </span>
            <ChevronRight size={18} className="shrink-0 text-gray-400" />
          </span>
          <span className="block text-sm text-gray-600 mt-2 leading-relaxed">
            {holder.officeTitle} · {holder.jurisdiction}
          </span>
        </Link>
      )}

      <ScorecardPanel card={card} />
    </CivicShell>
  );
}
