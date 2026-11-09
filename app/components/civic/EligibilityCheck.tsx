"use client";
import { useState } from "react";
import { Check, CircleAlert, PartyPopper } from "lucide-react";
import type { EligibilityRule } from "@/content/civic/voterCard";

/**
 * Self-assessment checklist. Runs entirely in the browser and stores nothing -
 * we are asking about citizenship, age and criminal history, so the answers
 * must never leave the device.
 */
export default function EligibilityCheck({ rules }: { rules: EligibilityRule[] }) {
  const [checked, setChecked] = useState<boolean[]>(() => rules.map(() => false));

  const toggle = (i: number) =>
    setChecked((prev) => prev.map((v, idx) => (idx === i ? !v : v)));

  const metCount = checked.filter(Boolean).length;
  const allMet = metCount === rules.length;

  return (
    <section aria-labelledby="eligibility-heading">
      <h2 id="eligibility-heading" className="text-2xl font-bold text-gray-900 mb-2">
        Can you register?
      </h2>
      <p className="text-gray-600 mb-6">
        Tick each statement that is true for you. Nothing you tick is saved or sent
        anywhere — this check runs entirely on your own device.
      </p>

      <ul className="space-y-3">
        {rules.map((rule, i) => {
          const isChecked = checked[i];
          return (
            <li key={rule.label}>
              <button
                onClick={() => toggle(i)}
                aria-pressed={isChecked}
                className={`w-full text-left flex gap-4 p-4 rounded-xl border-2 transition ${
                  isChecked
                    ? "border-green-500 bg-green-50"
                    : "border-gray-200 bg-white hover:border-gray-300"
                }`}
              >
                <span
                  className={`shrink-0 w-6 h-6 rounded-md border-2 flex items-center justify-center mt-0.5 transition ${
                    isChecked ? "bg-green-600 border-green-600" : "border-gray-300 bg-white"
                  }`}
                >
                  {isChecked && <Check size={16} className="text-white" strokeWidth={3} />}
                </span>
                <span className="flex-1">
                  <span className="block font-semibold text-gray-900">{rule.label}</span>
                  <span className="block text-sm text-gray-600 mt-1 leading-relaxed">
                    {rule.detail}
                  </span>
                  <span className="block text-xs text-gray-400 mt-2">{rule.source}</span>
                </span>
              </button>
            </li>
          );
        })}
      </ul>

      <div
        role="status"
        className={`mt-6 rounded-xl p-5 border-2 ${
          allMet ? "bg-green-50 border-green-300" : "bg-amber-50 border-amber-200"
        }`}
      >
        {allMet ? (
          <div className="flex gap-3">
            <PartyPopper className="text-green-700 shrink-0" size={22} />
            <div>
              <p className="font-bold text-green-900">You meet every requirement.</p>
              <p className="text-sm text-green-800 mt-1 leading-relaxed">
                Take your original ID or passport to an IEBC constituency office or a
                participating Huduma Centre. Registration is free and takes a few minutes.
                The steps below walk you through it.
              </p>
            </div>
          </div>
        ) : (
          <div className="flex gap-3">
            <CircleAlert className="text-amber-700 shrink-0" size={22} />
            <div>
              <p className="font-bold text-amber-900">
                {metCount} of {rules.length} requirements ticked
              </p>
              <p className="text-sm text-amber-800 mt-1 leading-relaxed">
                All five must be true before you can be registered. If the one holding you
                back is your national ID, apply for it now at a Huduma Centre — that is the
                most common blocker and the slowest to fix.
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
