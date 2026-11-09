"use client";
import { useState } from "react";
import Link from "next/link";
import { ChevronRight, ExternalLink, MapPin, Search } from "lucide-react";
import { ELECTIVE_OFFICES } from "@/content/civic/offices";
import {
  COUNTIES,
  NATIONAL_OFFICE_HOLDERS,
  NOT_RECORDED_LINKS,
  type County,
} from "@/content/civic/politicians";

const president = NATIONAL_OFFICE_HOLDERS.find((h) => h.id === "president");

/**
 * "What is on my ballot?" — pick a county, see the six seats you vote for.
 *
 * We know the office structure for every county with certainty (it is set by the
 * Constitution). We do NOT ship names for county seats, so those render a
 * look-it-up state rather than a fabricated person.
 */
export default function BallotFinder() {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<County | null>(null);

  const matches = query.trim()
    ? COUNTIES.filter((c) => c.name.toLowerCase().includes(query.trim().toLowerCase()))
    : COUNTIES;

  return (
    <section aria-labelledby="ballot-heading">
      <h2 id="ballot-heading" className="text-2xl font-bold text-gray-900 mb-2">
        What will be on your ballot?
      </h2>
      <p className="text-gray-600 mb-6">
        Pick your county. Every registered voter in Kenya receives six ballot papers at a
        general election — one for each of these seats.
      </p>

      <div className="relative mb-4">
        <Search
          size={18}
          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
        />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search all 47 counties…"
          aria-label="Search counties"
          className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-900"
        />
      </div>

      {!selected && (
        <div className="max-h-72 overflow-y-auto rounded-xl border border-gray-200 bg-white divide-y divide-gray-100">
          {matches.map((county) => (
            <button
              key={county.code}
              onClick={() => {
                setSelected(county);
                setQuery("");
              }}
              className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-green-50 transition"
            >
              <span className="text-xs font-mono text-gray-400 w-8">{county.code}</span>
              <span className="font-medium text-gray-900 flex-1">{county.name}</span>
              <span className="text-xs text-gray-400">{county.region}</span>
              <ChevronRight size={16} className="text-gray-300" />
            </button>
          ))}
          {matches.length === 0 && (
            <p className="px-4 py-8 text-center text-sm text-gray-400">
              No county matches &ldquo;{query}&rdquo;.
            </p>
          )}
        </div>
      )}

      {selected && (
        <div className="rounded-2xl border-2 border-green-200 bg-white overflow-hidden">
          <div className="bg-green-800 text-white px-5 py-4 flex items-center justify-between gap-3">
            <span className="flex items-center gap-2 font-bold">
              <MapPin size={18} />
              {selected.name} County
              <span className="text-green-200 font-normal text-sm">
                · code {selected.code}
              </span>
            </span>
            <button
              onClick={() => setSelected(null)}
              className="text-green-100 hover:text-white text-sm underline underline-offset-2"
            >
              Change
            </button>
          </div>

          <ol className="divide-y divide-gray-100">
            {ELECTIVE_OFFICES.map((office) => {
              const isPresident = office.id === "president";
              const unit =
                office.id === "president"
                  ? "Republic of Kenya"
                  : office.id === "mp"
                    ? "Your constituency"
                    : office.id === "mca"
                      ? "Your ward"
                      : `${selected.name} County`;

              return (
                <li key={office.id}>
                  <Link
                    href={`/politicians/${office.id}`}
                    className="flex items-start gap-4 px-5 py-4 hover:bg-gray-50 transition"
                  >
                    <span
                      className="shrink-0 w-10 h-10 rounded-xl flex items-center justify-center text-lg"
                      style={{ backgroundColor: `${office.accent}1a` }}
                      aria-hidden="true"
                    >
                      {office.icon}
                    </span>

                    <span className="flex-1 min-w-0">
                      <span className="block font-semibold text-gray-900">
                        {office.title}
                      </span>
                      <span className="block text-sm text-gray-500 mt-0.5">{unit}</span>

                      {isPresident && president?.name ? (
                        <span className="inline-block mt-2 text-sm bg-gray-100 text-gray-700 rounded-lg px-2.5 py-1">
                          Currently: <strong>{president.name}</strong>
                        </span>
                      ) : (
                        <span className="inline-block mt-2 text-xs text-amber-800 bg-amber-50 border border-amber-200 rounded-lg px-2.5 py-1">
                          Holder not recorded — look up on Parliament or IEBC
                        </span>
                      )}
                    </span>

                    <ChevronRight size={18} className="shrink-0 text-gray-300 mt-1" />
                  </Link>
                </li>
              );
            })}
          </ol>

          <div className="bg-gray-50 border-t border-gray-100 px-5 py-4">
            <p className="text-xs text-gray-500 leading-relaxed mb-3">
              VoteWise does not publish names for county and constituency seats. Office
              holders change through by-elections, resignations and court rulings, and a
              stale name is worse than none. These sources are authoritative:
            </p>
            <div className="flex flex-wrap gap-2">
              {NOT_RECORDED_LINKS.map((link) => (
                <a
                  key={link.url}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 bg-white border border-gray-200 rounded-lg px-3 py-1.5 text-xs font-medium text-gray-700 hover:border-green-400 transition"
                >
                  {link.label}
                  <ExternalLink size={12} className="text-gray-400" />
                </a>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
