"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { ExternalLink, LoaderCircle, MapPin, Search, Users } from "lucide-react";
import { COUNTIES } from "@/content/civic/politicians";
import {
  VENUE_SOURCE_LINKS,
  type PollingVenue,
} from "@/content/civic/venueCopy";
import VenueMap from "./VenueMap";

/**
 * "Where do I vote?" — drill down county → constituency → ward, or search.
 *
 * Three constraints shaped this, in order of how much they hurt:
 *
 *  1. The gazetted register must not enter the browser bundle. It is 26,282
 *     centres; importing it here once cost 11.1MB of client JavaScript, which
 *     on 2G is about half an hour. Everything now comes from /api/venues, so
 *     this component ships as markup and a fetch call.
 *  2. Only the IEBC can tell a named person which station they are assigned to,
 *     and that needs their ID number. We never collect one, so this answers
 *     "which stations serve my ward" and links out for the rest.
 *  3. Requests fail on bad connections, often. A failed lookup must leave the
 *     reader with a retry and the official links still on screen, never a
 *     spinner that never resolves.
 */

type IndexResponse = {
  centreCount: number;
  constituencies: Record<string, string[]>;
};

export default function PollingFinder() {
  const [county, setCounty] = useState("");
  const [constituency, setConstituency] = useState("");
  const [ward, setWard] = useState("");
  const [query, setQuery] = useState("");

  const [index, setIndex] = useState<IndexResponse | null>(null);
  const [venues, setVenues] = useState<PollingVenue[]>([]);
  const [truncated, setTruncated] = useState(false);
  const [state, setState] = useState<"idle" | "loading" | "error">("idle");
  const [openVenueId, setOpenVenueId] = useState<string | null>(null);

  // One in-flight lookup at a time: on a slow link a reader changes the ward
  // three times before the first response lands, and out-of-order replies would
  // show the wrong list.
  const requestRef = useRef(0);

  const load = useCallback(
    async (path: string, apply: (data: unknown) => void) => {
      const ticket = ++requestRef.current;
      setState("loading");
      try {
        const response = await fetch(path);
        if (!response.ok) throw new Error(String(response.status));
        const data = await response.json();
        if (ticket !== requestRef.current) return;
        apply(data);
        setState("idle");
      } catch {
        if (ticket !== requestRef.current) return;
        setState("error");
      }
    },
    [],
  );

  // Pickers for the chosen county: names only, a few hundred bytes.
  useEffect(() => {
    if (!county) {
      setIndex(null);
      return;
    }
    load(`/api/venues?index=1&county=${encodeURIComponent(county)}`, (data) =>
      setIndex(data as IndexResponse),
    );
  }, [county, load]);

  const runSearch = useCallback(() => {
    if (!county && !query.trim()) {
      setVenues([]);
      return;
    }
    const params = new URLSearchParams();
    if (county) params.set("county", county);
    if (constituency) params.set("constituency", constituency);
    if (ward) params.set("ward", ward);
    if (query.trim()) params.set("q", query.trim());

    load(`/api/venues?${params.toString()}`, (data) => {
      const payload = data as { venues: PollingVenue[]; truncated: boolean };
      setVenues(payload.venues);
      setTruncated(payload.truncated);
    });
  }, [county, constituency, ward, query, load]);

  // Picker changes search immediately; typing waits, so a slow link is not
  // flooded with a request per keystroke.
  useEffect(() => {
    if (!county && !query.trim()) {
      setVenues([]);
      return;
    }
    const delay = query.trim() ? 450 : 0;
    const timer = setTimeout(runSearch, delay);
    return () => clearTimeout(timer);
  }, [runSearch, county, query]);

  const constituencies = index ? Object.keys(index.constituencies).sort() : [];
  const wards = constituency ? (index?.constituencies[constituency] ?? []) : [];

  return (
    <div className="space-y-6">
      <div className="vw-card p-5">
        <div className="relative">
          <Search
            size={18}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by school, ward or centre code…"
            aria-label="Search polling venues"
            className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-900"
          />
        </div>

        <p className="my-3 text-center text-xs uppercase tracking-wide text-gray-400">
          or pick your area
        </p>

        <div className="grid gap-3 sm:grid-cols-3">
          <label className="text-sm font-semibold text-gray-700">
            County
            <select
              value={county}
              onChange={(e) => {
                setCounty(e.target.value);
                setConstituency("");
                setWard("");
              }}
              className="mt-1.5 block w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 font-normal text-gray-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="">Any county</option>
              {COUNTIES.map((c) => (
                <option key={c.code} value={c.code}>
                  {c.name}
                </option>
              ))}
            </select>
          </label>

          <label className="text-sm font-semibold text-gray-700">
            Constituency
            <select
              value={constituency}
              onChange={(e) => {
                setConstituency(e.target.value);
                setWard("");
              }}
              disabled={constituencies.length === 0}
              className="mt-1.5 block w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 font-normal text-gray-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 disabled:bg-gray-50 disabled:text-gray-400"
            >
              <option value="">Any constituency</option>
              {constituencies.map((name) => (
                <option key={name} value={name}>
                  {name}
                </option>
              ))}
            </select>
          </label>

          <label className="text-sm font-semibold text-gray-700">
            Ward
            <select
              value={ward}
              onChange={(e) => setWard(e.target.value)}
              disabled={wards.length === 0}
              className="mt-1.5 block w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 font-normal text-gray-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 disabled:bg-gray-50 disabled:text-gray-400"
            >
              <option value="">Any ward</option>
              {wards.map((name) => (
                <option key={name} value={name}>
                  {name}
                </option>
              ))}
            </select>
          </label>
        </div>

        {index && index.centreCount > 0 && (
          <p className="mt-3 text-xs text-gray-500">
            {index.centreCount.toLocaleString("en-KE")} gazetted centres recorded in{" "}
            {COUNTIES.find((c) => c.code === county)?.name} County.
          </p>
        )}
      </div>

      {state === "loading" && (
        <p
          className="flex items-center justify-center gap-2 py-6 text-sm text-gray-500"
          role="status"
        >
          <LoaderCircle size={16} className="animate-spin" />
          Looking up stations…
        </p>
      )}

      {state === "error" && (
        <div className="vw-card border-dashed p-6">
          <p className="font-semibold text-gray-900">That lookup did not go through</p>
          <p className="mt-1 text-sm text-gray-600 leading-relaxed">
            The connection dropped before the station list arrived. Nothing is wrong
            with your search — try again, or use the IEBC portal below, which can also
            confirm your own assigned station.
          </p>
          <button
            onClick={runSearch}
            className="mt-3 inline-flex items-center gap-1.5 rounded-lg bg-green-800 px-3.5 py-2 text-sm font-semibold text-white hover:bg-green-900 transition"
          >
            Try again
          </button>
        </div>
      )}

      {state === "idle" && venues.length > 0 && (
        <>
          <p className="text-sm text-gray-500" role="status" aria-live="polite">
            {venues.length} {venues.length === 1 ? "venue" : "venues"}
            {truncated && " (showing the first 50 — narrow by ward to see fewer)"}
          </p>

          <ul className="space-y-3">
            {venues.map((venue) => {
              const open = openVenueId === venue.id;
              return (
                <li key={venue.id} className="vw-card overflow-hidden">
                  <button
                    onClick={() => setOpenVenueId(open ? null : venue.id)}
                    aria-expanded={open}
                    className="w-full text-left px-5 py-4 hover:bg-gray-50 transition"
                  >
                    <span className="flex items-start justify-between gap-3">
                      <span className="min-w-0">
                        <span className="block font-bold text-gray-900">
                          {venue.name}
                        </span>
                        <span className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-gray-500 mt-1">
                          <span className="inline-flex items-center gap-1">
                            <MapPin size={13} />
                            {venue.ward}, {venue.constituency}
                          </span>
                          <span className="text-gray-300">·</span>
                          <span>{venue.countyName} County</span>
                        </span>
                      </span>

                      <span className="shrink-0 flex flex-col items-end gap-1">
                        <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-green-100 text-green-900">
                          {venue.kind === "registration-centre"
                            ? "Register here"
                            : venue.kind === "both"
                              ? "Register & vote"
                              : "Polling station"}
                        </span>
                        {venue.streams && (
                          <span className="inline-flex items-center gap-1 text-xs text-gray-500">
                            <Users size={12} />
                            {venue.streams} streams
                          </span>
                        )}
                      </span>
                    </span>
                  </button>

                  {open && (
                    <div className="border-t border-gray-100 px-5 py-4 space-y-4">
                      {venue.directions && (
                        <p className="text-sm text-gray-700 leading-relaxed">
                          {venue.directions}
                        </p>
                      )}

                      <VenueMap venue={venue} />

                      <p className="flex flex-wrap items-center gap-2 text-xs text-gray-500">
                        <span>Gazetted record dated {venue.asOf}.</span>
                        <a
                          href={venue.sourceUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 font-medium text-green-700 hover:text-green-900"
                        >
                          Source
                          <ExternalLink size={11} />
                        </a>
                      </p>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </>
      )}

      {state === "idle" && venues.length === 0 && (county || query.trim()) && (
        <div className="vw-card p-8 text-center">
          <MapPin size={28} className="mx-auto text-gray-300" />
          <p className="mt-3 font-semibold text-gray-900">No venue recorded here yet</p>
          <p className="mt-1 text-sm text-gray-500 max-w-md mx-auto leading-relaxed">
            Our import may not cover this ward, or the station may have been re-gazetted
            since. The IEBC verification portal is the authoritative answer for your own
            station.
          </p>
        </div>
      )}

      {state === "idle" && !county && !query.trim() && (
        <p className="text-sm text-gray-500 text-center py-4">
          Pick a county, or search for the school or hall you registered at.
        </p>
      )}

      <div className="flex flex-wrap gap-2">
        {VENUE_SOURCE_LINKS.map((source) => (
          <a
            key={source.url}
            href={source.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-gray-700 hover:border-green-400 transition"
          >
            {source.label}
            <ExternalLink size={12} className="text-gray-400" />
          </a>
        ))}
      </div>
    </div>
  );
}
