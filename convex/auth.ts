import { expo } from "@better-auth/expo";
import { betterAuth } from "better-auth";
import {
  createClient,
  type AuthFunctions,
  type GenericCtx,
} from "@convex-dev/better-auth";
import { convex } from "@convex-dev/better-auth/plugins";

import { components, internal } from "./_generated/api";
import type { DataModel } from "./_generated/dataModel";
import { query } from "./_generated/server";
import authConfig from "./auth.config";

/**
 * ONE auth configuration for BOTH clients.
 *
 * Before the merge the Next.js app and the Expo app ran against separate Convex
 * deployments with separate copies of this file, so an account created on the
 * web could not sign in on the phone and the two leaderboards were unrelated.
 * They now share a deployment, which means:
 *
 *   - `expo()` and the web origins both have to be registered here.
 *   - Profile creation happens in ONE place (the onCreate trigger below).
 *     The mobile build previously did this from a `hooks.after` middleware that
 *     called back into Convex over HTTP with a hardcoded deployment URL — that
 *     is gone.
 *
 * Deploy this from the WEB repo only. See scripts/sync-to-mobile.mjs.
 */

/** Set with: npx convex env set SITE_URL http://localhost:3000 */
const siteUrl = process.env.SITE_URL;

/**
 * Origins allowed to complete an auth flow. The custom scheme is what the Expo
 * app redirects back to after sign-in.
 */
const trustedOrigins = [
  "http://localhost:3000",
  "https://votewise-ke.vercel.app",
  "votewisemobile://",
];

const authFunctions: AuthFunctions = internal.auth;

export const authComponent = createClient<DataModel>(components.betterAuth, {
  authFunctions,
  triggers: {
    user: {
      onCreate: async (ctx, doc) => {
        // Every new account gets a profile row immediately, so the dashboard
        // and leaderboard never have to cope with a signed-in user that has no
        // profile.
        const totalModules = await ctx.db
          .query("modules")
          .withIndex("by_published", (q) => q.eq("isPublished", true))
          .collect();

        await ctx.db.insert("profile", {
          userId: doc._id,
          email: doc.email,
          name: doc.name ?? doc.email?.split("@")[0] ?? "Learner",
          points: 0,
          rank: undefined,
          modulesCompleted: 0,
          totalModules: totalModules.length,
          badgesEarned: 0,
          progressPercentage: 0,
          lastActive: Date.now(),
          createdAt: Date.now(),
        });
      },
    },
  },
});

export const createAuth = (
  ctx: GenericCtx<DataModel>,
) => {
  const googleClientId = process.env.GOOGLE_CLIENT_ID;
  const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET;

  return betterAuth({
    baseURL: siteUrl,
    trustedOrigins,
    database: authComponent.adapter(ctx),
    emailAndPassword: {
      enabled: true,
      requireEmailVerification: false,
    },
    // Registering the provider with blank credentials makes the Google button
    // fail at runtime with an opaque error. Only enable it when configured.
    ...(googleClientId && googleClientSecret
      ? {
          socialProviders: {
            google: { clientId: googleClientId, clientSecret: googleClientSecret },
          },
        }
      : {}),
    plugins: [
      expo(),
      convex({ authConfig, jwksRotateOnTokenGenerationError: true }),
    ],
  });
};

export const { onCreate, onUpdate, onDelete } = authComponent.triggersApi();

export const getCurrentUser = query({
  args: {},
  handler: async (ctx) => authComponent.getAuthUser(ctx),
});
