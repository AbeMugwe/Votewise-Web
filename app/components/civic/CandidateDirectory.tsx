"use client";
import { useMemo, useState } from "react";
import Link from "next/link";
import { BadgeCheck, ChevronRight, MapPin, Search, Users } from "lucide-react";
import { ELECTIVE_OFFICES, type OfficeId } from "@/content/civic/offices";
import { COUNTIES } from "@/content/civic/politicians";
import {
  CANDIDATES,
  CANDIDATES_EMPTY_COPY,
  CANDIDATE_SOURCE_LINKS,
  type Candidate,
} from "@/content/civic/candidates";
import EmptyState from "./SourcePanel";

/**
 * Candidate directory: filter by seat, county and party, then open a profile.
 *
 * The filters are driven entirely by what is in the dataset, so this renders
 * correctly at every stage of data entry — zero candidates, one race seeded, or
 * a full ballot — without the UI needing to change. Party chips only appear for
 * parties that actually have candidates recorded.
 */
export default function CandidateDirectory() {
  const [query, setQuery] = useState("");
  const [office, setOffice] = useState<OfficeId | "all">("all");
  const [county, setCounty] = useState<string>("all");
  const [party, setParty] = useState<string>("all");

  // Only offer a filter value if choosing it can return something. An empty
  // dropdown of 47 counties on a dataset of six candidates is just noise.
  const availableOffices = useMemo(
    () => ELECTIVE_OFFICES.filter((o) => CANDIDATES.some((c) => c.officeId === o.id)),
    [],
  );
  const availableCounties = useMemo(
    () => COUNTIES.filter((c) => CANDIDATES.some((cand) => cand.countyCode === c.code)),
    [],
  );
  const availableParties = useMemo(
    () => [...new Set(CANDIDATES.map((c) => c.partyAbbr ?? c.party))].sort(),
    [],
  );

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return CANDIDATES.filter((c) => {
      if (office !== "all" && c.officeId !== office) return false;
      if (county !== "all" && c.countyCode !== county) return false;
      if (party !== "all" && (c.partyAbbr ?? c.party) !== party) return false;
      if (!q) return true;
      return [c.name, c.party, c.officeSought, c.area ?? ""].some((field) =>
        field.toLowerCase().includes(q),
      );
    });
  }, [query, office, county, party]);

  const filtersActive =
    query.trim() !== "" || office !== "all" || county !== "all" || party !== "all";

  if (CANDIDATES.length === 0) {
    return (
      <EmptyState
        heading="No candidate profiles published yet"
        body={CANDIDATES_EMPTY_COPY}
        links={CANDIDATE_SOURCE_LINKS}
      />
    );
  }

  return (
    <div>
      <div className="relative mb-4">
        <Search
          size={18}
          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
        />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by name, party or seat…"
          aria-label="Search candidates"
          className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-900"
        />
      </div>

      <div className="flex flex-wrap gap-3 mb-6">
        {availableOffices.length > 1 && (
          <label className="text-sm">
            <span className="sr-only">Filter by seat</span>
            <select
              value={office}
              onChange={(e) => setOffice(e.target.value as OfficeId | "all")}
              className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-gray-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="all">All seats</option>
              {availableOffices.map((o) => (
                <option key={o.id} value={o.id}>
                  {o.title}
                </option>
              ))}
            </select>
          </label>
        )}

        {availableCounties.length > 1 && (
          <label className="text-sm">
            <span className="sr-only">Filter by county</span>
            <select
              value={county}
              onChange={(e) => setCounty(e.target.value)}
              className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-gray-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="all">All counties</option>
              {availableCounties.map((c) => (
                <option key={c.code} value={c.code}>
                  {c.name}
                </option>
              ))}
            </select>
          </label>
        )}

        {availableParties.length > 1 && (
          <label className="text-sm">
            <span className="sr-only">Filter by party</span>
            <select
              value={party}
              onChange={(e) => setParty(e.target.value)}
              className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-gray-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="all">All parties</option>
              {availableParties.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
          </label>
        )}

        {filtersActive && (
          <button
            onClick={() => {
              setQuery("");
              setOffice("all");
              setCounty("all");
              setParty("all");
            }}
            className="text-sm font-medium text-green-700 underline underline-offset-2 hover:text-green-900"
          >
            Clear filters
          </button>
        )}
      </div>

      <p className="text-sm text-gray-500 mb-4" role="status" aria-live="polite">
        {results.length} {results.length === 1 ? "profile" : "profiles"}
      </p>

      {results.length === 0 ? (
        <div className="vw-card p-8 text-center">
          <Users size={28} className="mx-auto text-gray-300" />
          <p className="mt-3 font-semibold text-gray-900">No candidate matches that</p>
          <p className="mt-1 text-sm text-gray-500">
            Try a wider filter, or check the IEBC candidate register for the full list.
          </p>
        </div>
      ) : (
        <ul className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {results.map((candidate) => (
            <li key={candidate.id}>
              <CandidateCard candidate={candidate} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export function CandidateCard({ candidate }: { candidate: Candidate }) {
  const county = candidate.countyCode
    ? COUNTIES.find((c) => c.code === candidate.countyCode)
    : undefined;

  return (
    <Link
      href={`/candidates/${candidate.id}`}
      className="group block h-full vw-card vw-card-hover p-5"
    >
      <div className="flex items-start gap-3">
        {/* Initials, not a photo: a missing or wrong headshot of a real person
            is a worse failure than no headshot at all. */}
        <span
          className="shrink-0 w-12 h-12 rounded-full bg-green-100 text-green-900 font-bold flex items-center justify-center text-base"
          aria-hidden="true"
        >
          {initials(candidate.name)}
        </span>

        <div className="min-w-0 flex-1">
          <h3 className="font-bold text-gray-900 leading-snug group-hover:text-green-800 transition">
            {candidate.name}
          </h3>
          <p className="text-sm text-gray-600 mt-0.5">{candidate.officeSought}</p>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2 mt-3">
        <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-gray-100 text-gray-700">
          {candidate.partyAbbr ?? candidate.party}
        </span>
        {candidate.incumbent && (
          <span className="inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full bg-blue-100 text-blue-900">
            <BadgeCheck size={12} />
            Incumbent
          </span>
        )}
        {(county || candidate.area) && (
          <span className="inline-flex items-center gap-1 text-xs text-gray-500">
            <MapPin size={12} />
            {candidate.area ?? county?.name}
          </span>
        )}
      </div>

      <p className="text-sm text-gray-600 leading-relaxed mt-3 line-clamp-3">
        {candidate.bio}
      </p>

      <span className="inline-flex items-center gap-1 mt-3 text-sm font-semibold text-green-700">
        {candidate.stance.length > 0
          ? `${candidate.stance.length} recorded ${candidate.stance.length === 1 ? "position" : "positions"}`
          : "Open profile"}
        <ChevronRight
          size={15}
          className="group-hover:translate-x-0.5 transition-transform"
        />
      </span>
    </Link>
  );
}

function initials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}
