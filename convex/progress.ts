import { v } from "convex/values";
import { mutation, query, type MutationCtx, type QueryCtx } from "./_generated/server";
import { getUserId, requireUserId } from "./authHelpers";

/**
 * Learner progress, points and leaderboard.
 *
 * SECURITY NOTE: every function here used to accept `userId` (and `name` /
 * `email`) as arguments. Convex functions are public endpoints, so that allowed
 * anyone to read another learner's dashboard or write points into their profile
 * by guessing an id. Identity is now taken from the auth token via
 * `getUserId` / `requireUserId` and never from the caller.
 */

const POINTS_PER_MODULE = 30;

/** Ties share a rank: 90, 90, 90, 50 → 1, 1, 1, 4. */
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

async function publishedModuleCount(ctx: QueryCtx | MutationCtx): Promise<number> {
  const modules = await ctx.db
    .query("modules")
    .withIndex("by_published", (q) => q.eq("isPublished", true))
    .collect();
  return modules.length;
}

/**
 * The auth trigger in auth.ts creates a profile on sign-up, so this is only a
 * safety net for accounts made before that trigger existed.
 */
async function getOrCreateProfile(ctx: MutationCtx, userId: string) {
  const existing = await ctx.db
    .query("profile")
    .withIndex("by_userId", (q) => q.eq("userId", userId))
    .first();

  if (existing) return existing;

  const user = await ctx.db
    .query("profile")
    .withIndex("by_userId", (q) => q.eq("userId", userId))
    .first();

  const id = await ctx.db.insert("profile", {
    userId,
    name: user?.name ?? "Learner",
    email: user?.email ?? "",
    points: 0,
    rank: "Unranked",
    modulesCompleted: 0,
    totalModules: await publishedModuleCount(ctx),
    badgesEarned: 0,
    progressPercentage: 0,
    lastActive: Date.now(),
    createdAt: Date.now(),
  });

  const created = await ctx.db.get(id);
  if (!created) throw new Error("Failed to create profile.");
  return created;
}

export const completeModule = mutation({
  args: {
    moduleId: v.id("modules"),
    correctAnswers: v.number(),
    totalQuestions: v.number(),
    totalFlashcards: v.number(),
  },
  handler: async (ctx, args) => {
    const userId = await requireUserId(ctx);
    const { moduleId, correctAnswers, totalQuestions, totalFlashcards } = args;

    const existingProgress = await ctx.db
      .query("userModuleProgress")
      .withIndex("by_userId_and_moduleId", (q) =>
        q.eq("userId", userId).eq("moduleId", moduleId),
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

    // Points are only ever awarded once per module, so replaying a quiz cannot
    // farm the leaderboard.
    if (alreadyCompleted) {
      return { alreadyCompleted: true, pointsAwarded: 0 };
    }

    const profile = await getOrCreateProfile(ctx, userId);
    const earnedPoints = Math.round(
      (correctAnswers / Math.max(1, totalQuestions)) * POINTS_PER_MODULE,
    );
    const newPoints = profile.points + earnedPoints;

    const allCompleted = await ctx.db
      .query("userModuleProgress")
      .withIndex("by_userId", (q) => q.eq("userId", userId))
      .filter((q) => q.eq(q.field("completed"), true))
      .collect();

    const totalModules = await publishedModuleCount(ctx);
    const modulesCompleted = allCompleted.length;
    const progressPercentage = Math.round(
      (modulesCompleted / Math.max(1, totalModules)) * 100,
    );

    await ctx.db.patch(profile._id, {
      points: newPoints,
      modulesCompleted,
      totalModules,
      progressPercentage,
      lastActive: Date.now(),
    });

    await ctx.db.insert("recentActivity", {
      userId,
      activityType: "module_completed",
      moduleId,
      description:
        earnedPoints > 0
          ? `Completed a module and earned ${earnedPoints} points!`
          : "Completed a module.",
      timestamp: Date.now(),
    });

    return { alreadyCompleted: false, pointsAwarded: earnedPoints };
  },
});

export const getDashboardData = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getUserId(ctx);
    if (!userId) return null;

    const profile = await ctx.db
      .query("profile")
      .withIndex("by_userId", (q) => q.eq("userId", userId))
      .first();

    if (!profile) return null;

    // Rank is recomputed on read so it is never stale.
    const allProfiles = await ctx.db
      .query("profile")
      .withIndex("by_points")
      .order("desc")
      .take(500);

    const ranks = assignRanks(allProfiles);
    const myIndex = allProfiles.findIndex((p) => p.userId === userId);
    const myRank = myIndex >= 0 ? ranks[myIndex] : null;

    const totalModules = await publishedModuleCount(ctx);

    return {
      points: profile.points,
      rank: myRank,
      modulesCompleted: profile.modulesCompleted,
      totalModules,
      progressPercentage: Math.round(
        (profile.modulesCompleted / Math.max(1, totalModules)) * 100,
      ),
      badgesEarned: profile.badgesEarned,
      name: profile.name,
    };
  },
});

export const getRecentActivity = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getUserId(ctx);
    if (!userId) return [];

    const activities = await ctx.db
      .query("recentActivity")
      .withIndex("by_userId_and_timestamp", (q) => q.eq("userId", userId))
      .order("desc")
      .take(10);

    return await Promise.all(
      activities.map(async (a) => ({
        ...a,
        moduleTitle: a.moduleId ? ((await ctx.db.get(a.moduleId))?.title ?? null) : null,
      })),
    );
  },
});

export const getLeaderboard = query({
  args: {},
  handler: async (ctx) => {
    // The board itself is public — it is the same information every learner
    // already sees — but we tag the caller's own row so the client does not
    // need to know anyone else's id to highlight it.
    const userId = await getUserId(ctx);

    const profiles = await ctx.db
      .query("profile")
      .withIndex("by_points")
      .order("desc")
      .take(50);

    const ranks = assignRanks(profiles);

    return profiles.map((p, i) => ({
      rank: ranks[i],
      name: p.name,
      points: p.points,
      modulesCompleted: p.modulesCompleted,
      isMe: userId !== null && p.userId === userId,
    }));
  },
});

export const getCompletedModules = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getUserId(ctx);
    if (!userId) return [];

    const completed = await ctx.db
      .query("userModuleProgress")
      .withIndex("by_userId", (q) => q.eq("userId", userId))
      .filter((q) => q.eq(q.field("completed"), true))
      .collect();

    return completed.map((p) => p.moduleId);
  },
});

export const getModuleProgress = query({
  args: { moduleId: v.id("modules") },
  handler: async (ctx, args) => {
    const userId = await getUserId(ctx);
    if (!userId) return null;

    return (
      (await ctx.db
        .query("userModuleProgress")
        .withIndex("by_userId_and_moduleId", (q) =>
          q.eq("userId", userId).eq("moduleId", args.moduleId),
        )
        .first()) ?? null
    );
  },
});

export const markFlashcardSeen = mutation({
  args: {
    moduleId: v.id("modules"),
    flashcardsSeen: v.number(),
    totalFlashcards: v.number(),
  },
  handler: async (ctx, args) => {
    const userId = await requireUserId(ctx);
    const { moduleId, flashcardsSeen, totalFlashcards } = args;

    const existing = await ctx.db
      .query("userModuleProgress")
      .withIndex("by_userId_and_moduleId", (q) =>
        q.eq("userId", userId).eq("moduleId", moduleId),
      )
      .first();

    if (existing) {
      await ctx.db.patch(existing._id, {
        flashcardsCompleted: flashcardsSeen,
        totalFlashcards,
      });
      return;
    }

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
  },
});
