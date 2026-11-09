import type { Metadata } from "next";
import { ExternalLink, Lightbulb } from "lucide-react";
import CivicShell from "@/app/components/civic/CivicShell";
import EligibilityCheck from "@/app/components/civic/EligibilityCheck";
import Accordion from "@/app/components/civic/Accordion";
import {
  VOTER_CARD_INTRO,
  VOTER_CARD_LAST_VERIFIED,
  VOTER_CARD_FAQ,
  VOTER_CARD_LINKS,
  ELIGIBILITY,
  REGISTRATION_STEPS,
} from "@/content/civic/voterCard";

export const metadata: Metadata = {
  title: "Get registered to vote | VoteWise Kenya",
  description:
    "Who can register as a voter in Kenya, what to bring, where to go, and how to check that you are on the register.",
};

/** Plain-text rendering of the page for the read-aloud control. */
const spokenText = [
  "How to register as a voter in Kenya.",
  VOTER_CARD_INTRO,
  "Who can register.",
  ...ELIGIBILITY.map((r) => `${r.label}. ${r.detail}`),
  "The steps.",
  ...REGISTRATION_STEPS.map((s) => `Step ${s.n}. ${s.title}. ${s.body}`),
].join(" ");

export default function VoterCardPage() {
  return (
    <CivicShell
      eyebrow="Civic guide"
      title="Get registered to vote"
      intro={VOTER_CARD_INTRO}
      lastVerified={VOTER_CARD_LAST_VERIFIED}
      readAloudText={spokenText}
    >
      <EligibilityCheck rules={ELIGIBILITY} />

      <section aria-labelledby="steps-heading">
        <h2 id="steps-heading" className="text-2xl font-bold text-gray-900 mb-2">
          What actually happens
        </h2>
        <p className="text-gray-600 mb-6">
          Registration is free and usually takes under fifteen minutes once you reach the desk.
        </p>

        <ol className="space-y-4">
          {REGISTRATION_STEPS.map((step) => (
            <li
              key={step.n}
              className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm"
            >
              <div className="flex gap-4">
                <span className="shrink-0 w-9 h-9 rounded-full bg-green-700 text-white font-bold flex items-center justify-center">
                  {step.n}
                </span>
                <div className="flex-1">
                  <h3 className="font-bold text-lg text-gray-900 mb-1.5">{step.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{step.body}</p>

                  {step.tip && (
                    <p className="mt-3 flex gap-2 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2.5 text-sm text-amber-900 leading-relaxed">
                      <Lightbulb size={16} className="shrink-0 mt-0.5 text-amber-600" />
                      <span>{step.tip}</span>
                    </p>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section aria-labelledby="faq-heading">
        <h2 id="faq-heading" className="text-2xl font-bold text-gray-900 mb-6">
          Common questions
        </h2>
        <Accordion items={VOTER_CARD_FAQ} />
      </section>

      <section aria-labelledby="links-heading">
        <h2 id="links-heading" className="text-2xl font-bold text-gray-900 mb-2">
          Check with the source
        </h2>
        <p className="text-gray-600 mb-6">
          VoteWise explains the process. Only these bodies can confirm your registration.
        </p>

        <div className="grid gap-4 sm:grid-cols-2">
          {VOTER_CARD_LINKS.map((link) => (
            <a
              key={link.url}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-white rounded-xl border border-gray-200 p-5 hover:border-green-400 hover:shadow-md transition"
            >
              <span className="flex items-start justify-between gap-3">
                <span className="font-semibold text-gray-900 group-hover:text-green-800 transition">
                  {link.label}
                </span>
                <ExternalLink size={16} className="shrink-0 text-gray-400 mt-1" />
              </span>
              <span className="block text-sm text-gray-600 mt-2 leading-relaxed">
                {link.description}
              </span>
            </a>
          ))}
        </div>
      </section>
    </CivicShell>
  );
}
