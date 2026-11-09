import { directionsLink, searchVenues, VENUES_EMPTY_COPY, VENUE_SOURCE_LINKS } from "@/content/civic/pollingStations";
import { escapeHtml as e, link, litePage, query } from "@/lib/lite/shell";

export async function GET(request: Request) {
  const q=query(request,"q"); const found=await searchVenues(q,20);
  const rows=found.map(v=>`<article><strong>${e(v.name)}</strong><br>${e(v.ward)}, ${e(v.constituency)}, ${e(v.countyName)}${v.directions?`<p>${e(v.directions)}</p>`:""}<small>${link(directionsLink(v),"Directions")} | ${link(v.sourceUrl,"Gazette source")} | checked ${e(v.asOf)}</small></article>`).join("");
  return litePage("Where to vote", `<p>Search for a gazetted venue near you, then confirm your assigned station with IEBC before travelling.</p><form method="get"><label>School, ward or centre code <input name="q" value="${e(q)}"></label><button>Search</button></form>${q ? rows || `<p>${e(VENUES_EMPTY_COPY)}</p>` : "<p>Enter a place above.</p>"}<ul>${VENUE_SOURCE_LINKS.map(x=>`<li>${link(x.url,x.label)}</li>`).join("")}</ul>`, { path: "/lite/where-to-vote" });
}
