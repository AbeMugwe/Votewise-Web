import { litePage, link } from "@/lib/lite/shell";
export const dynamic = "force-static";

export function GET() {
  return litePage("Civic information that works on 2G", `<p>Plain-text, non-partisan information for Kenyan voters. These pages use no JavaScript, images or web fonts.</p><ul><li>${link("/lite/leaders", "Who is in office")}</li><li>${link("/lite/candidates", "Candidate profiles")}</li><li>${link("/lite/register", "How to register")}</li><li>${link("/lite/where-to-vote", "Where to vote")}</li><li>${link("/lite/record", "Promises and delivery")}</li><li>${link("/lite/rights", "Know your rights")}</li></ul>`, { path: "/lite" });
}
