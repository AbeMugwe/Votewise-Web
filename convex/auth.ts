import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const createUser = mutation({
  args: {
    fullName: v.string(),
    email: v.string(),
    password: v.string(),
  },
  handler: async (ctx, args) => {
    // Check if user already exists
    const existingUser = await ctx.db
    .query("users")
    .withIndex("email", (q) => q.eq("email", args.email))
    .first();

    if (existingUser) {
      throw new Error("User already exists");
    }

    // Create user (password hashing handled by Convex Auth)
    const userId = await ctx.db.insert("users", {
      fullName: args.fullName,
      email: args.email,
    });

    return userId;
  },
});