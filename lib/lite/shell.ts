const links = [
  ["Home", "/lite"], ["Leaders", "/lite/leaders"],
  ["Candidates", "/lite/candidates"], ["Register", "/lite/register"],
  ["Where to vote", "/lite/where-to-vote"], ["Promises", "/lite/record"],
  ["Rights", "/lite/rights"],
] as const;

export const LITE_HEADERS = {
  "Content-Type": "text/html; charset=utf-8",
  "Cache-Control": "public, max-age=600, stale-while-revalidate=86400",
};

export function escapeHtml(value: unknown): string {
  return String(value ?? "")
    .replaceAll("&", "&amp;").replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;").replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

export function link(href: string, label: string): string {
  return `<a href="${escapeHtml(href)}">${escapeHtml(label)}</a>`;
}

export function litePage(title: string, body: string, options: { path?: string; reviewed?: string } = {}): Response {
  const nav = links.map(([label, href]) => `<a href="${href}"${options.path === href ? ' aria-current="page"' : ""}>${escapeHtml(label)}</a>`).join(" | ");
  const reviewed = options.reviewed ?? "2026-10-18";
  const html = `<!doctype html><html lang="en-KE"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${escapeHtml(title)} | VoteWise Kenya</title><style>body{font:16px/1.45 system-ui,sans-serif;color:#17251b;background:#f6f7f4;margin:0}header,main,footer{max-width:42rem;margin:auto;padding:1rem}header{background:#14532d;color:#fff}header a{color:#fff}a{color:#075d2b}h1{font-size:1.7rem}h2{font-size:1.25rem;margin-top:1.5rem}article{background:#fff;border:1px solid #ccd4cc;padding:.8rem;margin:.7rem 0}label{display:block;margin:.5rem 0}input,select,button{font:inherit;max-width:100%;padding:.45rem}small{color:#536057}.skip{position:absolute;left:-9999px}.skip:focus{left:1rem;background:#fff;color:#000;padding:.4rem}ul,ol{padding-left:1.4rem}</style></head><body><a class="skip" href="#main">Skip to content</a><header><strong>VoteWise Kenya - low data</strong><nav>${nav}</nav></header><main id="main"><h1>${escapeHtml(title)}</h1>${body}</main><footer>${nav}<p>${link("/landing", "Full site")}. Text only; no images or scripts.</p><p><small>Content last reviewed ${escapeHtml(reviewed)}. VoteWise is independent and not affiliated with the IEBC or any political party.</small></p></footer></body></html>`;
  return new Response(html, { headers: LITE_HEADERS });
}

export function query(request: Request, name: string): string {
  return new URL(request.url).searchParams.get(name)?.trim() ?? "";
}

export function pageSlice<T>(items: T[], request: Request, size = 20): { items: T[]; page: number; more: boolean } {
  const raw = Number(new URL(request.url).searchParams.get("page"));
  const page = Number.isSafeInteger(raw) && raw > 0 ? raw : 1;
  const start = (page - 1) * size;
  return { items: items.slice(start, start + size), page, more: start + size < items.length };
}
