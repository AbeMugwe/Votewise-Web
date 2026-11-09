import type { Metadata } from "next";
import { ExternalLink } from "lucide-react";
import CivicShell from "@/app/components/civic/CivicShell";
import PollingFinder from "@/app/components/civic/PollingFinder";
import { POLLING_DAY_STEPS, VENUES_LAST_VERIFIED, VENUE_SOURCE_LINKS, WHERE_TO_VOTE_INTRO } from "@/content/civic/pollingStations";

export const metadata: Metadata = {
  title: "Where to vote | VoteWise Kenya",
  description: "Find gazetted Kenyan polling and registration venues, then confirm your assigned station with the IEBC.",
};

const readAloudText = ["Where to vote in Kenya.", WHERE_TO_VOTE_INTRO, ...POLLING_DAY_STEPS.map(s => `Step ${s.n}. ${s.title}. ${s.body}`)].join(" ");

export default function WhereToVotePage() {
  return <CivicShell eyebrow="Civic guide" title="Where to vote" intro={WHERE_TO_VOTE_INTRO} lastVerified={VENUES_LAST_VERIFIED} readAloudText={readAloudText}>
    <PollingFinder />
    <section aria-labelledby="polling-day-heading"><h2 id="polling-day-heading" className="text-2xl font-bold text-gray-900 mb-6">On polling day</h2><ol className="space-y-4">{POLLING_DAY_STEPS.map(step => <li key={step.n} className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm"><div className="flex gap-4"><span className="shrink-0 w-9 h-9 rounded-full bg-green-700 text-white font-bold flex items-center justify-center">{step.n}</span><div><h3 className="font-bold text-lg text-gray-900 mb-1.5">{step.title}</h3><p className="text-gray-600 leading-relaxed">{step.body}</p></div></div></li>)}</ol></section>
    <section aria-labelledby="venue-links-heading"><h2 id="venue-links-heading" className="text-2xl font-bold text-gray-900 mb-2">Confirm with the source</h2><div className="grid gap-4 sm:grid-cols-2">{VENUE_SOURCE_LINKS.map(item => <a key={item.url} href={item.url} target="_blank" rel="noopener noreferrer" className="bg-white rounded-xl border border-gray-200 p-5"><span className="flex justify-between gap-3 font-semibold text-gray-900">{item.label}<ExternalLink size={16} /></span><span className="block text-sm text-gray-600 mt-2">{item.description}</span></a>)}</div></section>
  </CivicShell>;
}
