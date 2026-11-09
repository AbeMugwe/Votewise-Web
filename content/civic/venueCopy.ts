/**
 * Venue types, copy and link builders — with no dependency on the register.
 *
 * This module exists for a bundling reason, and it is worth stating plainly.
 * `pollingStations.ts` imports the county loader, which holds a dynamic import
 * for each of the 47 venue chunks. A `"use client"` component that imports
 * *anything* from that module — even one array of official links — drags the
 * whole graph into the browser bundle: first as a single 11.1MB chunk, then,
 * after the loader split, as 47 lazy ones still emitted into the client build.
 *
 * So the pieces a client component legitimately needs live here, free of any
 * data import, and `pollingStations.ts` re-exports them for server callers.
 * Client components must import from this file, never from pollingStations.
 *
 * Framework-free content module shared by the Next.js web app and the Expo
 * mobile app. Keep it free of React/DOM/RN imports so both bundlers can use it.
 */

export const VENUES_LAST_VERIFIED = "2026-10-18";

export const WHERE_TO_VOTE_INTRO =
  "You vote at one specific polling station — the one attached to the registration centre " +
  "where your details were taken. You cannot vote anywhere else, and queues are long, so " +
  "it is worth knowing exactly where it is and how long it takes to get there before " +
  "election day. Find your ward below, then confirm your own station with the IEBC.";

/**
 * A place a voter physically goes to.
 *
 * Most venues in Kenya serve both purposes: a school that is a continuous
 * registration centre during the cycle becomes a polling station on the day.
 * `kind` records which of the two we can vouch for.
 */
export type VenueKind = "polling-station" | "registration-centre" | "both";

export interface PollingVenue {
  /** Stable id for routing and anchors. Use the IEBC centre code when known. */
  id: string;
  /** Venue name as gazetted, e.g. "Olympic Primary School". */
  name: string;
  /** IEBC registration centre code, where we have it. */
  centreCode?: string;
  kind: VenueKind;
  /** County code from COUNTIES in ./politicians.ts. */
  countyCode: string;
  countyName: string;
  constituency: string;
  ward: string;
  /** How to find it on the ground: landmark, road, "behind the chief's camp". */
  directions?: string;
  /** Decimal degrees. Omit rather than guess. */
  lat?: number;
  lng?: number;
  /** Number of polling streams, which is a decent proxy for queue length. */
  streams?: number;
  /** Opening hours on polling day, if gazetted differently from the norm. */
  hours?: string;
  /** The gazette notice or IEBC page this came from. Required. */
  sourceUrl: string;
  asOf: string;
}

/** Deep link to a map app for a venue, used by both the rich and lite sites. */
export function mapLink(venue: PollingVenue): string {
  if (venue.lat !== undefined && venue.lng !== undefined) {
    return `https://www.openstreetmap.org/?mlat=${venue.lat}&mlon=${venue.lng}#map=17/${venue.lat}/${venue.lng}`;
  }
  const query = encodeURIComponent(
    `${venue.name}, ${venue.ward}, ${venue.countyName}, Kenya`,
  );
  return `https://www.openstreetmap.org/search?query=${query}`;
}

/** Walking/driving directions, which is what people actually want on the day. */
export function directionsLink(venue: PollingVenue): string {
  if (venue.lat !== undefined && venue.lng !== undefined) {
    return `https://www.google.com/maps/dir/?api=1&destination=${venue.lat},${venue.lng}`;
  }
  const query = encodeURIComponent(
    `${venue.name}, ${venue.ward}, ${venue.countyName}, Kenya`,
  );
  return `https://www.google.com/maps/dir/?api=1&destination=${query}`;
}

/**
 * Embeddable OSM frame for a venue.
 *
 * An iframe, not a mapping library: it costs nothing until it is scrolled into
 * view, needs no API key, and a failure to load leaves the surrounding list of
 * names and directions perfectly usable.
 */
export function embedMapSrc(lat: number, lng: number, span = 0.006): string {
  const bbox = [lng - span, lat - span / 2, lng + span, lat + span / 2]
    .map((n) => n.toFixed(5))
    .join("%2C");
  return `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${lat}%2C${lng}`;
}

export const VENUES_EMPTY_COPY =
  "VoteWise has not imported the gazetted station list for this area yet. Stations are " +
  "re-gazetted each cycle and a stale location is worse than none, so use the IEBC " +
  "verification portal below — it is the only source that can tell you your own station.";

/** The step-by-step a voter actually needs on the day. Structural, not data. */
export const POLLING_DAY_STEPS = [
  {
    n: 1,
    title: "Confirm your station before the day",
    body:
      "Use the IEBC verification portal or SMS service with your ID or passport number. It " +
      "returns the registration centre you are assigned to. Do this early — not on the morning.",
  },
  {
    n: 2,
    title: "Find the venue on a map while you still have data",
    body:
      "Save the location or write down the landmark. Network is unreliable around polling " +
      "stations on election day because everyone is on their phone at once.",
  },
  {
    n: 3,
    title: "Carry the original ID or passport you registered with",
    body:
      "No ID, no vote. A photocopy, a photo on your phone or a waiting card is not accepted " +
      "at the polling station.",
  },
  {
    n: 4,
    title: "Go early, and expect to queue",
    body:
      "Polling stations open at 6am and close at 5pm. If you are in the queue by closing time " +
      "you are still entitled to vote — stay in line.",
  },
  {
    n: 5,
    title: "Vote on all six ballots",
    body:
      "You will be handed six papers. The seats below the presidency are the ones that decide " +
      "your road, your dispensary and your ward bursary.",
  },
];

export const VENUE_SOURCE_LINKS = [
  {
    label: "IEBC voter verification portal",
    url: "https://verify.iebc.or.ke/",
    description:
      "The only place that can confirm which station you personally are assigned to.",
  },
  {
    label: "IEBC",
    url: "https://www.iebc.or.ke/",
    description: "Gazetted registration centres, polling day notices and county offices.",
  },
  {
    label: "Kenya Gazette",
    url: "http://kenyalaw.org/kenya_gazette/",
    description: "The legal notices that create and move polling stations.",
  },
];
