import { betterAuth } from "better-auth";
import { createClient, type GenericCtx, type AuthFunctions } from "@convex-dev/better-auth";
import { convex } from "@convex-dev/better-auth/plugins";

import { components, internal } from "./_generated/api";
import type { DataModel } from "./_generated/dataModel";
import authConfig from "./auth.config";

// Convex env var (set via `npx convex env set SITE_URL http://localhost:3000`)
const siteUrl = process.env.SITE_URL!;

// Required for triggers
const authFunctions: AuthFunctions = internal.auth;

export const authComponent = createClient<DataModel>(components.betterAuth, {
  authFunctions,
  triggers: {
    user: {
      onCreate: async (ctx, doc) => {
        // Create a profile row with defaults (match your schema)
        await ctx.db.insert("profile", {
          userId: doc._id,                 // or authUserId, depending on your schema
          email: doc.email,
          name: doc.name ?? "",
          points: 0,
          modulesCompleted: 0,
          totalModules: 0,
          progressPercentage: 0,
          lastActive: Date.now(),
          badgesEarned: 0,
          createdAt: Date.now(),
        });
      },
    },
  },
});

// ✅ THIS is what http.ts needs
export const createAuth = (ctx: GenericCtx<DataModel>) =>
  betterAuth({
    baseURL: siteUrl,
    database: authComponent.adapter(ctx),
    emailAndPassword: {
      enabled: true,
      requireEmailVerification: false,
    },
    plugins: [convex({ authConfig })],
  });

// ✅ Needed for triggers to work
export const { onCreate, onUpdate, onDelete } = authComponent.triggersApi();
