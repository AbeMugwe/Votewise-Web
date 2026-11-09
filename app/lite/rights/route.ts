import { NON_DEROGABLE, RIGHTS_CATEGORIES } from "@/content/civic/rights";
import { escapeHtml as e, litePage } from "@/lib/lite/shell";
export const dynamic = "force-static";

export function GET() {
  const groups=RIGHTS_CATEGORIES.map(g=>`<h2>${e(g.title)}</h2><ul>${g.rights.map(r=>`<li><b>Article ${e(r.article)}: ${e(r.title)}</b>. ${e(r.summary)}</li>`).join("")}</ul>`).join("");
  return litePage("Know your rights", `<h2>Rights that cannot be limited</h2><ul>${NON_DEROGABLE.map(r=>`<li>Article ${e(r.article)}: <b>${e(r.title)}</b></li>`).join("")}</ul>${groups}`, { path: "/lite/rights" });
}
