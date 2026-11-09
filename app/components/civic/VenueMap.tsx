"use client";
import { useState } from "react";
import { ExternalLink, Map as MapIcon, Navigation2 } from "lucide-react";
import {
  directionsLink,
  embedMapSrc,
  mapLink,
  type PollingVenue,
} from "@/content/civic/venueCopy";

/**
 * The map slot for a polling venue.
 *
 * Three deliberate choices, all of them about data cost in Kenya:
 *
 *  1. No mapping library. An OpenStreetMap iframe needs no API key, no npm
 *     dependency and no bundle, and if it fails to load the name, directions
 *     and outbound links around it still work.
 *  2. Tiles load only when the reader asks. A map is ~300KB of tiles; on a
 *     metered bundle that is a real cost, and most readers only need the name
 *     of the school and the landmark next to it.
 *  3. Where we have no coordinates, this renders a search link rather than an
 *     empty grey box. Most Kenyan stations are schools whose name is a better
 *     wayfinder than a pin.
 */
export default function VenueMap({ venue }: { venue: PollingVenue }) {
  const [showTiles, setShowTiles] = useState(false);
  const hasCoords = venue.lat !== undefined && venue.lng !== undefined;

  return (
    <div className="rounded-xl border border-gray-200 bg-gray-50 overflow-hidden">
      {hasCoords && showTiles ? (
        <iframe
          title={`Map of ${venue.name}`}
          src={embedMapSrc(venue.lat!, venue.lng!)}
          loading="lazy"
          referrerPolicy="no-referrer"
          className="w-full h-64 border-0 bg-gray-100"
        />
      ) : (
        <div className="p-5">
          <p className="flex items-start gap-2 text-sm text-gray-600 leading-relaxed">
            <MapIcon size={16} className="shrink-0 mt-0.5 text-gray-400" />
            <span>
              {hasCoords
                ? "The map is not loaded yet — it costs about 300KB of data. The name and directions below are usually enough to find the place."
                : "We have no coordinates for this venue, only its gazetted name and ward. Search for it by name in a map app, or ask locally — these are almost always well-known schools or chief's camps."}
            </span>
          </p>

          {hasCoords && (
            <button
              onClick={() => setShowTiles(true)}
              className="mt-3 inline-flex items-center gap-1.5 rounded-lg bg-green-800 px-3.5 py-2 text-sm font-semibold text-white hover:bg-green-900 transition"
            >
              <MapIcon size={15} />
              Load the map anyway
            </button>
          )}
        </div>
      )}

      <div className="flex flex-wrap gap-2 border-t border-gray-200 bg-white px-4 py-3">
        <a
          href={directionsLink(venue)}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-700 hover:border-green-400 transition"
        >
          <Navigation2 size={13} />
          Directions
        </a>
        <a
          href={mapLink(venue)}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-700 hover:border-green-400 transition"
        >
          Open in OpenStreetMap
          <ExternalLink size={12} className="text-gray-400" />
        </a>
      </div>
    </div>
  );
}
