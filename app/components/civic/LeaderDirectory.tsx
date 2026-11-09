import Link from "next/link";
import {
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Landmark,
  MapPin,
  Search,
  TriangleAlert,
} from "lucide-react";
import { COUNTIES } from "@/content/civic/politicians";
import { ELECTIVE_OFFICES } from "@/content/civic/offices";
import {
  ALL_LEADERS,
  COUNTY_OFFICE_HOLDERS,
  LEADERS_EMPTY_COPY,
  LEADER_SOURCE_LINKS,
  type DirectoryEntry,
} from "@/content/civic/leaders";

/**
 * "Who is in office right now" — one filterable list across both tiers.
 *
 * Server-rendered, driven by the URL rather than React state. Two reasons, and
 * the second one is the real one:
 *
 *  1. The roster is 416 people. As a client component this shipped the whole
 *     dataset into the browser bundle to filter it there, which is a lot of
 *     JavaScript to answer "who is my senator".
 *  2. It now works with JavaScript disabled, broken or still downloading — a
 *     plain GET form and links. On the connections this product is built for,
 *     that is not a nicety; it is the difference between a page that answers
 *     the question and a page that is still thinking about it.
 *
 * Filter state lives in the query string, so a result is also a shareable link.
 */

export const PAGE_SIZE = 25;

export type LeaderFilters = {
  q?: string;
  tier?: string;
  county?: string;
  office?: string;
  page?: string;
};

export default function LeaderDirectory({ filters }: { filters: LeaderFilters }) {
  const q = (filters.q ?? "").trim();
  const tier = filters.tier ?? "all";
  const county = filters.county ?? "all";
  const office = filters.office ?? "all";

  const matches = ALL_LEADERS.filter((entry) => {
    if (tier !== "all" && entry.tier !== tier) return false;
    if (county !== "all" && entry.countyCode !== county) return false;
    if (office !== "all" && entry.officeId !== office) return false;
    if (!q) return true;
    return [entry.name ?? "", entry.officeTitle, entry.jurisdiction].some((field) =>
      field.toLowerCase().includes(q.toLowerCase()),
    );
  });

  const pageCount = Math.max(1, Math.ceil(matches.length / PAGE_SIZE));
  const requested = Number(filters.page);
  const page = Number.isSafeInteger(requested)
    ? Math.min(Math.max(requested, 1), pageCount)
    : 1;
  const shown = matches.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  // A county with nothing recorded is the expected case for county executives
  // today, and it deserves a different answer from "no results" — it is a gap
  // in our data, not a typo in the reader's search.
  const countySelectedButEmpty =
    county !== "all" && !COUNTY_OFFICE_HOLDERS.some((e) => e.countyCode === county);

  const filtersActive =
    q !== "" || tier !== "all" || county !== "all" || office !== "all";

  const pageHref = (target: number) => {
    const params = new URLSearchParams();
    if (q) params.set("q", q);
    if (tier !== "all") params.set("tier", tier);
    if (county !== "all") params.set("county", county);
    if (office !== "all") params.set("office", office);
    if (target > 1) params.set("page", String(target));
    const query = params.toString();
    return query ? `/leaders?${query}` : "/leaders";
  };

  return (
    <div>
      {/* A GET form: no JavaScript, and the result is a URL you can send to
          someone. `key` resets the controls when the URL changes. */}
      <form method="get" action="/leaders" className="vw-card p-5 mb-6">
        <div className="relative">
          <Search
            size={18}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            type="search"
            name="q"
            defaultValue={q}
            key={q}
            placeholder="Search by name or office…"
            aria-label="Search office holders"
            className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-900"
          />
        </div>

        <div className="grid gap-3 sm:grid-cols-3 mt-3">
          <label className="text-sm font-semibold text-gray-700">
            Tier
            <select
              name="tier"
              defaultValue={tier}
              key={`tier-${tier}`}
              className="mt-1.5 block w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 font-normal text-gray-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="all">National and county</option>
              <option value="national">National offices</option>
              <option value="county">County and constituency</option>
            </select>
          </label>

          <label className="text-sm font-semibold text-gray-700">
            Seat
            <select
              name="office"
              defaultValue={office}
              key={`office-${office}`}
              className="mt-1.5 block w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 font-normal text-gray-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="all">Any seat</option>
              {ELECTIVE_OFFICES.map((o) => (
                <option key={o.id} value={o.id}>
                  {o.title}
                </option>
              ))}
            </select>
          </label>

          <label className="text-sm font-semibold text-gray-700">
            County
            <select
              name="county"
              defaultValue={county}
              key={`county-${county}`}
              className="mt-1.5 block w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 font-normal text-gray-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="all">All 47 counties</option>
              {COUNTIES.map((c) => (
                <option key={c.code} value={c.code}>
                  {c.name}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="flex flex-wrap items-center gap-3 mt-4">
          <button
            type="submit"
            className="rounded-lg bg-green-800 px-4 py-2 text-sm font-semibold text-white hover:bg-green-900 transition"
          >
            Search
          </button>
          {filtersActive && (
            <Link
              href="/leaders"
              className="text-sm font-medium text-green-700 underline underline-offset-2 hover:text-green-900"
            >
              Clear filters
            </Link>
          )}
        </div>
      </form>

      <p className="text-sm text-gray-500 mb-4" role="status">
        {matches.length.toLocaleString("en-KE")}{" "}
        {matches.length === 1 ? "holder" : "holders"} recorded
        {pageCount > 1 && ` · page ${page} of ${pageCount}`}
      </p>

      {shown.length > 0 && (
        <ul className="space-y-3">
          {shown.map((entry) => (
            <li key={entry.id}>
              <LeaderRow entry={entry} />
            </li>
          ))}
        </ul>
      )}

      {pageCount > 1 && (
        <nav
          className="flex items-center justify-between gap-3 mt-6"
          aria-label="Pagination"
        >
          {page > 1 ? (
            <Link
              href={pageHref(page - 1)}
              rel="prev"
              className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3.5 py-2 text-sm font-medium text-gray-700 hover:border-green-400 transition"
            >
              <ChevronLeft size={15} />
              Previous
            </Link>
          ) : (
            <span />
          )}

          <span className="text-sm text-gray-500">
            Page {page} of {pageCount}
          </span>

          {page < pageCount ? (
            <Link
              href={pageHref(page + 1)}
              rel="next"
              className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3.5 py-2 text-sm font-medium text-gray-700 hover:border-green-400 transition"
            >
              Next
              <ChevronRight size={15} />
            </Link>
          ) : (
            <span />
          )}
        </nav>
      )}

      {countySelectedButEmpty && (
        <div className="mt-4 vw-card border-dashed p-6">
          <h3 className="flex items-center gap-2 font-bold text-gray-900">
            <TriangleAlert size={18} className="text-amber-600 shrink-0" />
            No county executive recorded for{" "}
            {COUNTIES.find((c) => c.code === county)?.name} County
          </h3>
          <p className="mt-2 text-gray-600 leading-relaxed">{LEADERS_EMPTY_COPY}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {LEADER_SOURCE_LINKS.map((source) => (
              <a
                key={source.url}
                href={source.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 bg-white border border-gray-200 rounded-lg px-3 py-1.5 text-sm font-medium text-gray-700 hover:border-green-400 transition"
              >
                {source.label}
                <ExternalLink size={13} className="text-gray-400" />
              </a>
            ))}
          </div>
        </div>
      )}

      {shown.length === 0 && !countySelectedButEmpty && (
        <div className="vw-card p-8 text-center">
          <Landmark size={28} className="mx-auto text-gray-300" />
          <p className="mt-3 font-semibold text-gray-900">Nothing matches that search</p>
          <p className="mt-1 text-sm text-gray-500">
            Try a shorter search, or{" "}
            <Link href="/leaders" className="text-green-700 underline">
              clear the filters
            </Link>
            .
          </p>
        </div>
      )}
    </div>
  );
}

export function LeaderRow({ entry }: { entry: DirectoryEntry }) {
  const recorded = entry.name !== null && entry.confidence !== "not-recorded";

  // An unnamed holder is a dead end as a profile link, so it renders as a card
  // that points straight at the official source instead.
  if (!recorded) {
    return (
      <a
        href={entry.sourceUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="block vw-card p-5 hover:border-green-400 transition"
      >
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="font-semibold text-gray-700">{entry.officeTitle}</p>
            <p className="text-sm text-gray-500 mt-0.5">{entry.jurisdiction}</p>
            <p className="inline-block mt-2 text-xs text-amber-900 bg-amber-50 border border-amber-200 rounded-lg px-2.5 py-1">
              Holder not recorded — look it up on the official register
            </p>
          </div>
          <ExternalLink size={16} className="shrink-0 text-gray-400 mt-1" />
        </div>
      </a>
    );
  }

  return (
    <Link href={`/leaders/${entry.id}`} className="group block vw-card vw-card-hover p-5">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="font-bold text-lg text-gray-900 group-hover:text-green-800 transition">
              {entry.name}
            </h3>
            <span
              className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                entry.elected
                  ? "bg-green-100 text-green-800"
                  : "bg-gray-100 text-gray-600"
              }`}
            >
              {entry.elected ? "Elected" : "Appointed"}
            </span>
          </div>

          <p className="text-sm font-medium text-gray-700 mt-0.5">{entry.officeTitle}</p>
          <p className="inline-flex items-center gap-1 text-xs text-gray-500 mt-1">
            <MapPin size={12} />
            {entry.jurisdiction}
            <span className="text-gray-300">·</span>
            checked {entry.asOf}
          </p>

          {/* Only rendered when the roster actually said something about this
              person — the office description is on the profile page. */}
          {entry.note && (
            <p className="text-sm text-gray-600 mt-2 leading-relaxed">{entry.note}</p>
          )}
        </div>

        <ChevronRight size={18} className="shrink-0 text-gray-300 mt-1.5" />
      </div>
    </Link>
  );
}
