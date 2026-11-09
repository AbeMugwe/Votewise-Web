import type { Metadata } from "next";
import { ExternalLink, Lock, Scale } from "lucide-react";
import CivicShell from "@/app/components/civic/CivicShell";
import RightsExplorer from "@/app/components/civic/RightsExplorer";
import {
  RIGHTS_INTRO,
  RIGHTS_LAST_VERIFIED,
  RIGHTS_CATEGORIES,
  NON_DEROGABLE,
  NON_DEROGABLE_INTRO,
  ENFORCEMENT_INTRO,
  ENFORCEMENT_ROUTES,
  UDHR_NOTE,
  UDHR_LINK,
} from "@/content/civic/rights";

export const metadata: Metadata = {
  title: "Know your rights | VoteWise Kenya",
  description:
    "The Bill of Rights in Chapter Four of the Constitution of Kenya 2010, in plain language, and what to do when a right is violated.",
};

const spokenText = [
  "Know your rights.",
  RIGHTS_INTRO,
  NON_DEROGABLE_INTRO,
  ...NON_DEROGABLE.map((r) => `${r.title}. ${r.summary}`),
  ENFORCEMENT_INTRO,
].join(" ");

export default function RightsPage() {
  return (
    <CivicShell
      eyebrow="Civic guide"
      title="Know your rights"
      intro={RIGHTS_INTRO}
      lastVerified={RIGHTS_LAST_VERIFIED}
      readAloudText={spokenText}
    >
      <section aria-labelledby="absolute-heading">
        <div className="bg-gray-900 text-white rounded-2xl p-6 sm:p-7">
          <h2
            id="absolute-heading"
            className="flex items-center gap-2 text-xl font-bold mb-2"
          >
            <Lock size={20} className="text-amber-400" />
            Four rights that can never be limited
          </h2>
          <p className="text-gray-300 text-sm leading-relaxed mb-5">
            {NON_DEROGABLE_INTRO}
          </p>

          <div className="grid gap-3 sm:grid-cols-2">
            {NON_DEROGABLE.map((right) => (
              <div
                key={right.article}
                className="bg-white/5 border border-white/10 rounded-xl p-4"
              >
                <span className="text-xs font-bold text-amber-400">
                  Article {right.article}
                </span>
                <h3 className="font-semibold mt-1 mb-1.5 leading-snug">{right.title}</h3>
                <p className="text-sm text-gray-300 leading-relaxed">{right.summary}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <RightsExplorer categories={RIGHTS_CATEGORIES} />

      <section aria-labelledby="enforce-heading">
        <h2
          id="enforce-heading"
          className="flex items-center gap-2 text-2xl font-bold text-gray-900 mb-2"
        >
          <Scale size={24} className="text-green-700" />
          If a right of yours is violated
        </h2>
        <p className="text-gray-600 mb-6 leading-relaxed">{ENFORCEMENT_INTRO}</p>

        <div className="space-y-3">
          {ENFORCEMENT_ROUTES.map((route) => {
            const body = (
              <>
                <span className="flex items-start justify-between gap-3">
                  <span className="font-semibold text-gray-900">{route.title}</span>
                  {route.url && (
                    <ExternalLink size={16} className="shrink-0 text-gray-400 mt-1" />
                  )}
                </span>
                <span className="block text-sm text-gray-600 mt-1.5 leading-relaxed">
                  {route.body}
                </span>
              </>
            );

            return route.url ? (
              <a
                key={route.title}
                href={route.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block bg-white rounded-xl border border-gray-200 p-5 hover:border-green-400 hover:shadow-md transition"
              >
                {body}
              </a>
            ) : (
              <div
                key={route.title}
                className="bg-white rounded-xl border border-gray-200 p-5"
              >
                {body}
              </div>
            );
          })}
        </div>
      </section>

      <section aria-labelledby="udhr-heading">
        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6">
          <h2 id="udhr-heading" className="text-xl font-bold text-blue-950 mb-2">
            Kenya&rsquo;s rights sit inside a global framework
          </h2>
          <p className="text-blue-900/80 leading-relaxed mb-4">{UDHR_NOTE}</p>
          <a
            href={UDHR_LINK.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-blue-900 text-white px-5 py-2.5 rounded-lg hover:bg-blue-950 transition text-sm font-medium"
          >
            Read the Universal Declaration
            <ExternalLink size={14} />
          </a>
        </div>
      </section>
    </CivicShell>
  );
}
