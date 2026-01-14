import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
import { authTables } from "@convex-dev/auth/server";

export default defineSchema({
  ...authTables,

  users: defineTable({
    // Convex Auth standard fields (from docs)
    name: v.optional(v.string()),
    image: v.optional(v.string()),
    email: v.optional(v.string()),
    emailVerificationTime: v.optional(v.number()),
    phone: v.optional(v.string()),
    phoneVerificationTime: v.optional(v.number()),
    isAnonymous: v.optional(v.boolean()),

    // Your custom field
    fullName: v.optional(v.string()),
  }).index("email", ["email"]),
   profile: defineTable({
    userId: v.string(),
    name: v.string(),
    email: v.string(),
    points: v.number(),
    rank: v.optional(v.string()),
    modulesCompleted: v.number(),
    totalModules: v.number(),
    badgesEarned: v.number(),
    progressPercentage: v.number(),
    lastActive: v.number(),
    createdAt: v.number(),
  })
    .index("by_userId", ["userId"])
    .index("by_points", ["points"]),
});
