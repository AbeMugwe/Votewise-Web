import type { QueryCtx, MutationCtx } from "./_generated/server";
import { authComponent } from "./auth";

/**
 * Resolve the calling user from the request's auth token.
 *
 * The web functions used to take `userId` as an argument. Convex functions are
 * public HTTP endpoints, so that let anyone post any user's id and read their
 * dashboard or award them points. Identity is now always derived server-side
 * from the token, and never trusted from the caller.
 */
export async function getUserId(
  ctx: QueryCtx | MutationCtx,
): Promise<string | null> {
  try {
    const user = await authComponent.getAuthUser(ctx);
    return user?._id ?? null;
  } catch {
    // Not signed in, or the token has expired.
    return null;
  }
}

/** Same as getUserId, but for endpoints that have nothing useful to say to an anonymous caller. */
export async function requireUserId(
  ctx: QueryCtx | MutationCtx,
): Promise<string> {
  const userId = await getUserId(ctx);
  if (!userId) throw new Error("Not signed in.");
  return userId;
}
