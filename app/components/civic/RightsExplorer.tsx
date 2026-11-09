"use client";
import { useState } from "react";
import { Globe2 } from "lucide-react";
import type { RightsCategory } from "@/content/civic/rights";

export default function RightsExplorer({ categories }: { categories: RightsCategory[] }) {
  const [activeId, setActiveId] = useState(categories[0]?.id ?? "");
  const active = categories.find((c) => c.id === activeId) ?? categories[0];

  return (
    <section aria-labelledby="rights-heading">
      <h2 id="rights-heading" className="text-2xl font-bold text-gray-900 mb-2">
        The Bill of Rights, grouped
      </h2>
      <p className="text-gray-600 mb-6">
        Chapter Four runs to more than forty articles. These are the ones that come up in
        ordinary life, in plain language.
      </p>

      <div
        role="tablist"
        aria-label="Categories of rights"
        className="flex gap-2 overflow-x-auto pb-3 -mx-1 px-1"
      >
        {categories.map((cat) => {
          const isActive = cat.id === active.id;
          return (
            <button
              key={cat.id}
              role="tab"
              aria-selected={isActive}
              onClick={() => setActiveId(cat.id)}
              className={`shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-full border-2 text-sm font-semibold transition ${
                isActive
                  ? "bg-green-800 border-green-800 text-white"
                  : "bg-white border-gray-200 text-gray-700 hover:border-green-300"
              }`}
            >
              <span aria-hidden="true">{cat.icon}</span>
              {cat.title}
            </button>
          );
        })}
      </div>

      <p className="text-sm text-gray-500 mt-3 mb-5">{active.blurb}</p>

      <div className="space-y-4">
        {active.rights.map((right) => (
          <article
            key={right.article}
            className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm"
          >
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="bg-green-100 text-green-900 text-xs font-bold px-2.5 py-1 rounded-full">
                Article {right.article}
              </span>
              {right.udhr && (
                <span className="flex items-center gap-1 bg-blue-50 text-blue-800 text-xs font-medium px-2.5 py-1 rounded-full">
                  <Globe2 size={12} />
                  UDHR {right.udhr}
                </span>
              )}
            </div>

            <h3 className="font-bold text-lg text-gray-900 mb-2">{right.title}</h3>
            <p className="text-gray-600 leading-relaxed">{right.summary}</p>

            {right.inPractice && (
              <p className="mt-3 border-l-4 border-green-500 bg-green-50/60 pl-4 py-2.5 text-sm text-gray-700 leading-relaxed rounded-r-lg">
                <strong className="text-green-900">In practice: </strong>
                {right.inPractice}
              </p>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}
