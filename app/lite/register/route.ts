import { ELIGIBILITY, REGISTRATION_STEPS, VOTER_CARD_INTRO, VOTER_CARD_LINKS } from "@/content/civic/voterCard";
import { escapeHtml as e, link, litePage } from "@/lib/lite/shell";
export const dynamic = "force-static";

export function GET() {
  return litePage("Get registered to vote", `<p>${e(VOTER_CARD_INTRO)}</p><h2>Who can register</h2><ul>${ELIGIBILITY.map(x=>`<li><b>${e(x.label)}</b>: ${e(x.detail)} <small>${e(x.source)}</small></li>`).join("")}</ul><h2>Steps</h2><ol>${REGISTRATION_STEPS.map(x=>`<li><b>${e(x.title)}</b>: ${e(x.body)}</li>`).join("")}</ol><h2>Official sources</h2><ul>${VOTER_CARD_LINKS.map(x=>`<li>${link(x.url,x.label)}</li>`).join("")}</ul>`, { path: "/lite/register" });
}
