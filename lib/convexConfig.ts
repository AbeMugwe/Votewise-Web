/**
 * Central place to answer "do we have a backend right now?".
 *
 * The learning, quiz and leaderboard features need Convex. The civic reference
 * sections (politicians, voter registration, rights) deliberately do not - they
 * are static content so they keep working during a demo even if the deployment
 * is unreachable. Pages use `isBackendConfigured` to pick the right empty state
 * instead of hanging on a spinner forever.
 */

const rawUrl = process.env.NEXT_PUBLIC_CONVEX_URL?.trim();

export const isBackendConfigured = Boolean(rawUrl && rawUrl.startsWith("http"));

/**
 * ConvexReactClient throws at construction on a missing or malformed URL, which
 * would take down every page including the static ones. Fall back to a
 * syntactically valid address that simply never answers: queries stay in their
 * loading state and pages render their offline branch.
 */
export const convexUrl = isBackendConfigured
  ? (rawUrl as string)
  : "https://backend-not-configured.convex.cloud";
