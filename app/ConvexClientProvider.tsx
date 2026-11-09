"use client";
import { ReactNode } from "react";
import { ConvexReactClient } from "convex/react";
import { ConvexBetterAuthProvider } from "@convex-dev/better-auth/react";
import { authClient } from "@/lib/auth-client";
import { convexUrl } from "@/lib/convexConfig";

/**
 * Plain `ConvexProvider` does not attach an auth token to requests, so every
 * `ctx.auth.getUserIdentity()` on the backend came back null. That is why the
 * old backend took `userId` as a function argument instead — which made those
 * endpoints impersonatable.
 *
 * This is the same provider the Expo app uses, so both clients authenticate
 * against the shared deployment in the same way.
 */
const convex = new ConvexReactClient(convexUrl);

export function ConvexClientProvider({ children }: { children: ReactNode }) {
  return (
    <ConvexBetterAuthProvider client={convex} authClient={authClient}>
      {children}
    </ConvexBetterAuthProvider>
  );
}
