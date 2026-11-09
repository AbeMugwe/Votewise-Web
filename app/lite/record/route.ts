import { SCORECARDS, SCORECARDS_EMPTY_COPY, STATUS_META } from "@/content/civic/scorecards";
import { escapeHtml as e, link, litePage, query } from "@/lib/lite/shell";

export function GET(request: Request) {
  const selected=query(request,"id"); const card=SCORECARDS.find(x=>x.id===selected) ?? SCORECARDS[0];
  const picker=`<form method="get"><label>Scorecard <select name="id">${SCORECARDS.map(x=>`<option value="${e(x.id)}"${x===card?" selected":""}>${e(x.personName)} - ${e(x.term)}</option>`).join("")}</select></label><button>Show</button></form>`;
  if(!card) return litePage("Promises and delivery", `<p>${e(SCORECARDS_EMPTY_COPY)}</p>`, { path: "/lite/record" });
  const promises=card.promises.slice(0,20).map(p=>`<article><strong>${e(STATUS_META[p.status].asciiMark)} ${e(p.sector)}</strong><p>${e(p.promise)}</p><small>${link(p.promiseSourceUrl,"Promise source")} | checked ${e(p.asOf)}</small></article>`).join("");
  return litePage("Promises and delivery", `${picker}<h2>${e(card.personName)}: ${e(card.term)}</h2><p>${link(card.manifesto.url,card.manifesto.title)}</p>${promises}${card.promises.length>20?"<p>Showing the first 20 promises. Use the full site for the complete scorecard.</p>":""}`, { path: "/lite/record" });
}
