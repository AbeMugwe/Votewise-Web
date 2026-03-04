import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

const POINTS_PER_MODULE = 30;

// ── Position-based rank with ties ─────────────────────────────────────────────
// If positions 1,2,3 all have 90pts → all rank 1, next person is rank 4
function assignRanks(profiles: { points: number }[]): number[] {
  const ranks: number[] = [];
  let currentRank = 1;
  for (let i = 0; i < profiles.length; i++) {
    if (i > 0 && profiles[i].points < profiles[i - 1].points) {
      currentRank = i + 1;
    }
    ranks.push(currentRank);
  }
  return ranks;
}

// ── Get or create a user profile ──────────────────────────────────────────────
async function getOrCreateProfile(ctx: any, userId: string, name: string, email: string) {
  const existing = await ctx.db
    .query("profile")
    .withIndex("by_userId", (q: any) => q.eq("userId", userId))
    .first();

  if (existing) return existing;

  const totalModules = await ctx.db
    .query("modules")
    .filter((q: any) => q.eq(q.field("isPublished"), true))
    .collect()
    .then((m: any[]) => m.length);

  const id = await ctx.db.insert("profile", {
    userId,
    name,
    email,
    points: 0,
    rank: "Unranked",
    modulesCompleted: 0,
    totalModules,
    badgesEarned: 0,
    progressPercentage: 0,
    lastActive: Date.now(),
    createdAt: Date.now(),
  });

  return await ctx.db.get(id);
}

// ── Complete a module: award points, update progress ─────────────────────────
export const completeModule = mutation({
  args: {
    userId: v.string(),
    moduleId: v.id("modules"),
    name: v.string(),
    email: v.string(),
    correctAnswers: v.number(),
    totalQuestions: v.number(),
    totalFlashcards: v.number(),
  },
  handler: async (ctx, args) => {
    const { userId, moduleId, name, email, correctAnswers, totalQuestions, totalFlashcards } = args;

    const existingProgress = await ctx.db
      .query("userModuleProgress")
      .withIndex("by_userId_and_moduleId", (q) =>
        q.eq("userId", userId).eq("moduleId", moduleId)
      )
      .first();

    const alreadyCompleted = existingProgress?.completed === true;

    if (existingProgress) {
      await ctx.db.patch(existingProgress._id, {
        completed: true,
        completedAt: Date.now(),
        progress: 100,
        multipleChoiceCompleted: correctAnswers,
        totalMultipleChoice: totalQuestions,
        flashcardsCompleted: totalFlashcards,
        totalFlashcards,
        currentQuestionIndex: totalQuestions,
      });
    } else {
      await ctx.db.insert("userModuleProgress", {
        userId,
        moduleId,
        completed: true,
        startedAt: Date.now(),
        completedAt: Date.now(),
        progress: 100,
        currentQuestionIndex: totalQuestions,
        flashcardsCompleted: totalFlashcards,
        multipleChoiceCompleted: correctAnswers,
        totalFlashcards,
        totalMultipleChoice: totalQuestions,
      });
    }

    if (!alreadyCompleted) {
      const profile = await getOrCreateProfile(ctx, userId, name, email);
      const earnedPoints = Math.round((correctAnswers / Math.max(1, totalQuestions)) * POINTS_PER_MODULE);
      const newPoints = profile.points + earnedPoints;

      const allCompleted = await ctx.db
        .query("userModuleProgress")
        .withIndex("by_userId", (q) => q.eq("userId", userId))
        .filter((q) => q.eq(q.field("completed"), true))
        .collect();

      const modulesCompleted = allCompleted.length;

      const allModules = await ctx.db
        .query("modules")
        .filter((q) => q.eq(q.field("isPublished"), true))
        .collect();

      const totalModules = allModules.length;
      const progressPercentage = Math.round((modulesCompleted / Math.max(1, totalModules)) * 100);

      // Calculate live rank
      const allProfiles = await ctx.db
        .query("profile")
        .withIndex("by_points")
        .order("desc")
        .collect();

      const updatedProfiles = allProfiles
        .map((p) => ({ ...p, points: p.userId === userId ? newPoints : p.points }))
        .sort((a, b) => b.points - a.points);

      const ranks = assignRanks(updatedProfiles);
      const myIndex = updatedProfiles.findIndex((p) => p.userId === userId);
      const myRank = myIndex >= 0 ? ranks[myIndex] : allProfiles.length + 1;

      await ctx.db.patch(profile._id, {
        points: newPoints,
        rank: String(myRank),
        modulesCompleted,
        totalModules,
        progressPercentage,
        lastActive: Date.now(),
      });

      await ctx.db.insert("recentActivity", {
        userId,
        activityType: "module_completed",
        moduleId,
        description: `Completed a module and earned ${earnedPoints} points!`,
        timestamp: Date.now(),
      });
    }

    return { alreadyCompleted, pointsAwarded: alreadyCompleted ? 0 : POINTS_PER_MODULE };
  },
});

// ── Get user dashboard data ───────────────────────────────────────────────────
export const getDashboardData = query({
  args: { userId: v.string() },
  handler: async (ctx, args) => {
    const profile = await ctx.db
      .query("profile")
      .withIndex("by_userId", (q) => q.eq("userId", args.userId))
      .first();

    if (!profile) return null;

    // Recalculate rank live every time
    const allProfiles = await ctx.db
      .query("profile")
      .withIndex("by_points")
      .order("desc")
      .collect();

    const ranks = assignRanks(allProfiles);
    const myIndex = allProfiles.findIndex((p) => p.userId === args.userId);
    const myRank = myIndex >= 0 ? ranks[myIndex] : null;

    const allModules = await ctx.db
      .query("modules")
      .filter((q) => q.eq(q.field("isPublished"), true))
      .collect();

    const totalModules = allModules.length;
    const progressPercentage = Math.round(
      (profile.modulesCompleted / Math.max(1, totalModules)) * 100
    );

    return {
      points: profile.points,
      rank: myRank !== null ? myRank : null,   // number e.g. 1, 2, 3
      modulesCompleted: profile.modulesCompleted,
      totalModules,
      progressPercentage,
      badgesEarned: profile.badgesEarned,
    };
  },
});

// ── Get recent activity for a user ───────────────────────────────────────────
export const getRecentActivity = query({
  args: { userId: v.string() },
  handler: async (ctx, args) => {
    const activities = await ctx.db
      .query("recentActivity")
      .withIndex("by_userId_and_timestamp", (q) => q.eq("userId", args.userId))
      .order("desc")
      .take(10);

    return await Promise.all(
      activities.map(async (a) => {
        const moduleTitle = a.moduleId
          ? (await ctx.db.get(a.moduleId))?.title ?? null
          : null;
        return { ...a, moduleTitle };
      })
    );
  },
});

// ── Leaderboard ───────────────────────────────────────────────────────────────
export const getLeaderboard = query({
  args: {},
  handler: async (ctx) => {
    const profiles = await ctx.db
      .query("profile")
      .withIndex("by_points")
      .order("desc")
      .take(50);

    const ranks = assignRanks(profiles);

    return profiles.map((p, i) => ({
      rank: ranks[i],       // e.g. 1,1,1,4 if three people tied at top
      name: p.name,
      points: p.points,
      modulesCompleted: p.modulesCompleted,
      userId: p.userId,
    }));
  },
});

// ── Get user's completed module IDs ──────────────────────────────────────────
export const getCompletedModules = query({
  args: { userId: v.string() },
  handler: async (ctx, args) => {
    const completed = await ctx.db
      .query("userModuleProgress")
      .withIndex("by_userId", (q) => q.eq("userId", args.userId))
      .filter((q) => q.eq(q.field("completed"), true))
      .collect();

    return completed.map((p) => p.moduleId);
  },
});

export const getModuleProgress = query({
  args: { userId: v.string(), moduleId: v.id("modules") },
  handler: async (ctx, args) => {
    const progress = await ctx.db
      .query("userModuleProgress")
      .withIndex("by_userId_and_moduleId", (q) =>
        q.eq("userId", args.userId).eq("moduleId", args.moduleId)
      )
      .first();
    return progress ?? null;
  },
});

export const markFlashcardSeen = mutation({
  args: {
    userId: v.string(),
    moduleId: v.id("modules"),
    flashcardsSeen: v.number(),
    totalFlashcards: v.number(),
  },
  handler: async (ctx, args) => {
    const { userId, moduleId, flashcardsSeen, totalFlashcards } = args;

    const existing = await ctx.db
      .query("userModuleProgress")
      .withIndex("by_userId_and_moduleId", (q) =>
        q.eq("userId", userId).eq("moduleId", moduleId)
      )
      .first();

    if (existing) {
      await ctx.db.patch(existing._id, {
        flashcardsCompleted: flashcardsSeen,
        totalFlashcards,
      });
    } else {
      await ctx.db.insert("userModuleProgress", {
        userId,
        moduleId,
        completed: false,
        startedAt: Date.now(),
        progress: 0,
        currentQuestionIndex: 0,
        flashcardsCompleted: flashcardsSeen,
        multipleChoiceCompleted: 0,
        totalFlashcards,
        totalMultipleChoice: 0,
      });
    }
  },
});