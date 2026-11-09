import { CANDIDATES, CANDIDATES_EMPTY_COPY } from "@/content/civic/candidates";
import { escapeHtml as e, link, litePage, pageSlice, query } from "@/lib/lite/shell";

export function GET(request: Request) {
  const q = query(request, "q").toLowerCase();
  const found = CANDIDATES.filter(c => !q || [c.name,c.party,c.officeSought,c.area ?? ""].some(v => v.toLowerCase().includes(q)));
  const part = pageSlice(found, request, 12);
  const rows = part.items.map(c => `<article><strong>${e(c.name)}</strong><br>${e(c.party)}; ${e(c.officeSought)}${c.incumbent ? "; incumbent" : ""}<p>${e(c.bio)}</p>${c.stance.slice(0,3).map(s=>`<p><b>${e(s.issue)}:</b> ${e(s.stance)} ${link(s.sourceUrl,"source")}</p>`).join("")}<small>Checked ${e(c.asOf)}</small></article>`).join("");
  return litePage("Candidate profiles", `<form method="get"><label>Search <input name="q" value="${e(q)}"></label><button>Search</button></form>${rows || `<p>${e(CANDIDATES_EMPTY_COPY)}</p>`}${part.more ? `<p>${link(`/lite/candidates?q=${encodeURIComponent(q)}&page=${part.page+1}`,"Next page")}</p>`:""}`, { path: "/lite/candidates" });
}
