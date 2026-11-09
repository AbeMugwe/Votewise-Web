import { ALL_LEADERS, searchLeaders } from "@/content/civic/leaders";
import { escapeHtml as e, link, litePage, pageSlice, query } from "@/lib/lite/shell";

export function GET(request: Request) {
  const q = query(request, "q");
  const found = q ? searchLeaders(q) : ALL_LEADERS;
  const part = pageSlice(found, request);
  const rows = part.items.map(x => `<article><strong>${e(x.name ?? "Not recorded")}</strong><br>${e(x.officeTitle)} - ${e(x.jurisdiction)}<br><small>Checked ${e(x.asOf)}. ${link(x.sourceUrl, "Source")}</small></article>`).join("");
  const next = part.more ? `<p>${link(`/lite/leaders?q=${encodeURIComponent(q)}&page=${part.page + 1}`, "Next page")}</p>` : "";
  return litePage("Who is in office", `<form method="get"><label>Search name or place <input name="q" value="${e(q)}"></label><button>Search</button></form><p>${found.length} records.</p>${rows || "<p>No verified record matches.</p>"}${next}`, { path: "/lite/leaders" });
}
