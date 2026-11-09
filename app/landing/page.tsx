"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useQuery } from "convex/react";
import { useRouter } from "next/navigation";
import {
  BookOpen, Trophy, Award, ExternalLink, PlugZap, ArrowRight,
  Building2, IdCard, Scale, Flame, Target,
} from "lucide-react";
import { api } from "@/convex/_generated/api";
import { authClient } from "@/lib/auth-client";
import NavMenu from "@/app/components/Navigation";
import BookLoader from "@/app/components/BookLoader";
import { isBackendConfigured } from "@/lib/convexConfig";

type SessionUser = { id: string; name?: string | null; email?: string | null };

/**
 * Learner dashboard.
 *
 * Was a 672px centred column — a phone layout stretched down a desktop page.
 * Now a two-column grid: progress and activity in the main column, standings
 * and reference links in a rail. `rank` from the backend is a numeric
 * leaderboard position, while the tier list is named, so the two are derived
 * separately (rendering `#{rank}` against tier names printed "#Newcomer").
 */
const RANK_TIERS = [
  { name: "Newcomer", min: 0, max: 29, colour: "text-slate-500", bar: "bg-slate-400" },
  { name: "Civic Learner", min: 30, max: 89, colour: "text-blue-600", bar: "bg-blue-500" },
  { name: "Active Citizen", min: 90, max: 149, colour: "text-green-600", bar: "bg-green-500" },
  { name: "Democracy Expert", min: 150, max: 299, colour: "text-purple-600", bar: "bg-purple-500" },
  { name: "Civic Champion", min: 300, max: Infinity, colour: "text-amber-600", bar: "bg-amber-500" },
] as const;

function tierFor(points: number) {
  return RANK_TIERS.find((t) => points >= t.min && points <= t.max) ?? RANK_TIERS[0];
}

function formatRange(t: (typeof RANK_TIERS)[number]) {
  return t.max === Infinity ? `${t.min}+ pts` : `${t.min}–${t.max} pts`;
}

const CIVIC_SHORTCUTS = [
  { href: "/politicians", icon: Building2, label: "Who represents you", blurb: "The six seats on your ballot" },
  { href: "/voter-card", icon: IdCard, label: "Get registered", blurb: "Eligibility, steps, verification" },
  { href: "/rights", icon: Scale, label: "Know your rights", blurb: "The Bill of Rights, plainly" },
];

const RESOURCES = [
  { label: "IEBC — register and verify", url: "https://www.iebc.or.ke/" },
  { label: "Constitution of Kenya 2010", url: "https://new.kenyalaw.org/akn/ke/act/2010/constitution/eng@2010-09-03" },
  { label: "Parliament of Kenya", url: "http://www.parliament.go.ke/" },
];

export default function VoteWiseDashboard() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState<SessionUser | null>(null);
  const [sessionChecked, setSessionChecked] = useState(false);
  const router = useRouter();

  useEffect(() => {
    authClient
      .getSession()
      .then(({ data }) => {
        if (data?.user) setUser(data.user as SessionUser);
      })
      .catch(() => {
        // No backend or not signed in — the page still renders its civic rail.
      })
      .finally(() => setSessionChecked(true));
  }, []);

  const dashData = useQuery(api.progress.getDashboardData, {});
  const recentActivity = useQuery(api.progress.getRecentActivity, {});

  const handleLogout = async () => {
    try {
      await authClient.signOut();
    } finally {
      router.push("/signin");
    }
  };

  const modulesCompleted = dashData?.modulesCompleted ?? 0;
  const totalModules = dashData?.totalModules ?? 0;
  const progressPct = dashData?.progressPercentage ?? 0;
  const points = dashData?.points ?? 0;
  const position = dashData?.rank ?? null;
  const badgesEarned = dashData?.badgesEarned ?? 0;
  const currentTier = tierFor(points);
  const nextTier = RANK_TIERS[RANK_TIERS.indexOf(currentTier) + 1];
  const displayName = dashData?.name || user?.name;

  const waitingOnData = Boolean(user?.id) && dashData === undefined && isBackendConfigured;

  return (
    <div className="min-h-screen bg-slate-50">
      <NavMenu
        isMenuOpen={isMenuOpen}
        toggleMenu={() => setIsMenuOpen((v) => !v)}
        handleLogout={handleLogout}
      />

      {/* Hero band with the headline numbers */}
      <section className="bg-gradient-to-br from-green-900 via-green-800 to-green-900 text-white">
        <div className="vw-wide py-10 lg:py-12">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
            <div>
              <p className="text-green-200 text-sm font-medium">Welcome back</p>
              <h1 className="text-3xl lg:text-4xl font-bold mt-1">
                {displayName || (sessionChecked ? "Learner" : "…")}
              </h1>
              <p className="inline-flex items-center gap-2 mt-3 bg-white/10 backdrop-blur px-3 py-1.5 rounded-full text-sm font-medium">
                <Flame size={14} className="text-amber-300" />
                {currentTier.name}
              </p>
            </div>

            <dl className="grid grid-cols-3 gap-6 sm:gap-10">
              <div>
                <dt className="text-green-200 text-xs uppercase tracking-wide font-semibold">
                  Points
                </dt>
                <dd className="text-4xl font-extrabold mt-1 tabular-nums">{points}</dd>
              </div>
              <div>
                <dt className="text-green-200 text-xs uppercase tracking-wide font-semibold">
                  Rank
                </dt>
                <dd className="text-4xl font-extrabold mt-1 tabular-nums">
                  {position !== null ? `#${position}` : "—"}
                </dd>
              </div>
              <div>
                <dt className="text-green-200 text-xs uppercase tracking-wide font-semibold">
                  Badges
                </dt>
                <dd className="text-4xl font-extrabold mt-1 tabular-nums">{badgesEarned}</dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      <main className="vw-wide py-8 lg:py-10">
        {!isBackendConfigured && (
          <div className="flex gap-3 bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6">
            <PlugZap className="text-amber-600 shrink-0" size={20} />
            <div>
              <p className="font-semibold text-amber-900 text-sm">Backend not connected</p>
              <p className="text-sm text-amber-800/90 mt-0.5 leading-relaxed">
                Progress, points and the leaderboard need a Convex deployment. The civic
                guide works without one.
              </p>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_21rem] gap-8 items-start">
          {/* Main column */}
          <div className="space-y-6">
            {/* Progress */}
            <section className="vw-card p-6 lg:p-7">
              <div className="flex items-baseline justify-between gap-4 mb-4">
                <h2 className="text-lg font-bold text-slate-900">Your learning progress</h2>
                <span className="text-sm text-slate-500 shrink-0 tabular-nums">
                  {modulesCompleted} of {totalModules} module{totalModules !== 1 ? "s" : ""}
                </span>
              </div>

              <div
                className="w-full bg-slate-200 rounded-full h-2.5 mb-2"
                role="progressbar"
                aria-valuenow={progressPct}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label="Modules completed"
              >
                <div
                  className="bg-green-600 h-2.5 rounded-full transition-all duration-700"
                  style={{ width: `${progressPct}%` }}
                />
              </div>
              <p className="text-xs text-slate-400 mb-6">
                {progressPct}% complete
                {progressPct === 100 && totalModules > 0 && " 🎉 All modules done"}
              </p>

              <div className="grid sm:grid-cols-3 gap-3">
                <Link
                  href="/modules"
                  className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50/60 p-4 hover:border-green-400 hover:bg-green-50/50 transition"
                >
                  <BookOpen size={20} className="text-green-700 shrink-0" />
                  <span className="text-sm font-semibold text-slate-800">
                    {progressPct === 0 ? "Start learning" : "Continue"}
                  </span>
                </Link>
                <Link
                  href="/leaderboard"
                  className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50/60 p-4 hover:border-green-400 hover:bg-green-50/50 transition"
                >
                  <Trophy size={20} className="text-amber-500 shrink-0" />
                  <span className="text-sm font-semibold text-slate-800">Leaderboard</span>
                </Link>
                <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50/60 p-4">
                  <Award size={20} className="text-purple-600 shrink-0" />
                  <span className="text-sm font-semibold text-slate-800">
                    {badgesEarned} badge{badgesEarned !== 1 ? "s" : ""}
                  </span>
                </div>
              </div>
            </section>

            {/* Recent activity */}
            <section className="vw-card p-6 lg:p-7">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-lg font-bold text-slate-900">Recent activity</h2>
                <Link
                  href="/leaderboard"
                  className="text-sm font-semibold text-green-700 hover:text-green-900 transition"
                >
                  View leaderboard →
                </Link>
              </div>

              {waitingOnData ? (
                <div className="flex justify-center py-10">
                  <BookLoader text="Loading your progress…" />
                </div>
              ) : recentActivity && recentActivity.length > 0 ? (
                <ul className="space-y-3">
                  {recentActivity.map((a) => (
                    <li
                      key={a._id}
                      className="flex items-start gap-3 p-4 bg-slate-50 rounded-xl border border-slate-100"
                    >
                      <span className="w-9 h-9 bg-green-100 rounded-lg flex items-center justify-center shrink-0">
                        <BookOpen size={16} className="text-green-700" />
                      </span>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-slate-800 font-medium">{a.description}</p>
                        {a.moduleTitle && (
                          <p className="text-xs text-slate-500 mt-0.5">{a.moduleTitle}</p>
                        )}
                      </div>
                      <time className="text-xs text-slate-400 shrink-0">
                        {new Date(a.timestamp).toLocaleDateString("en-KE", {
                          day: "numeric",
                          month: "short",
                        })}
                      </time>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="text-center py-12 border border-dashed border-slate-200 rounded-xl">
                  <BookOpen size={36} className="mx-auto text-slate-300 mb-3" />
                  <p className="text-slate-500 mb-5">
                    {user ? "No activity yet" : "Sign in to track your progress"}
                  </p>
                  <Link
                    href={user ? "/modules" : "/signin"}
                    className="inline-flex items-center gap-2 bg-green-800 text-white px-6 py-2.5 rounded-xl hover:bg-green-900 transition font-semibold text-sm"
                  >
                    {user ? "Start learning" : "Sign in"} <ArrowRight size={15} />
                  </Link>
                </div>
              )}
            </section>

            {/* Civic guide */}
            <section className="vw-card p-6 lg:p-7">
              <h2 className="text-lg font-bold text-slate-900 mb-1">Civic guide</h2>
              <p className="text-sm text-slate-500 mb-5">
                Free reference material. No sign-in needed.
              </p>
              <div className="grid sm:grid-cols-3 gap-4">
                {CIVIC_SHORTCUTS.map(({ href, icon: Icon, label, blurb }) => (
                  <Link
                    key={href}
                    href={href}
                    className="group rounded-xl border border-slate-200 p-5 hover:border-green-400 hover:shadow-md transition"
                  >
                    <Icon size={22} className="text-green-700 mb-3" />
                    <p className="font-bold text-slate-900 text-sm leading-snug">{label}</p>
                    <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">{blurb}</p>
                    <ArrowRight
                      size={14}
                      className="text-green-700 mt-3 group-hover:translate-x-0.5 transition-transform"
                    />
                  </Link>
                ))}
              </div>
            </section>
          </div>

          {/* Rail */}
          <aside className="space-y-5 lg:sticky lg:top-24">
            <section className="vw-card p-6">
              <h2 className="font-bold text-slate-900 flex items-center gap-2 mb-1">
                <Target size={17} className="text-green-700" /> Rank system
              </h2>
              <p className="text-sm text-slate-500 mb-4">
                You are a{" "}
                <strong className={currentTier.colour}>{currentTier.name}</strong>
                {nextTier && (
                  <>
                    {" "}
                    — {nextTier.min - points} more point
                    {nextTier.min - points !== 1 ? "s" : ""} to {nextTier.name}.
                  </>
                )}
              </p>

              <ul className="space-y-1.5">
                {RANK_TIERS.map((tier) => {
                  const isCurrent = tier.name === currentTier.name;
                  return (
                    <li
                      key={tier.name}
                      className={`flex items-center justify-between gap-2 px-3 py-2.5 rounded-lg ${
                        isCurrent ? "bg-green-50 border border-green-200" : ""
                      }`}
                    >
                      <span className="flex items-center gap-2 min-w-0">
                        <span className={`w-1.5 h-1.5 rounded-full ${tier.bar}`} />
                        <span className={`font-semibold text-sm ${tier.colour}`}>
                          {tier.name}
                        </span>
                      </span>
                      <span className="text-xs text-slate-400 shrink-0 tabular-nums">
                        {formatRange(tier)}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </section>

            <section className="vw-card p-6">
              <h2 className="font-bold text-slate-900 mb-4">Official sources</h2>
              <ul className="space-y-1">
                {RESOURCES.map((r) => (
                  <li key={r.url}>
                    <a
                      href={r.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between gap-3 px-3 py-2.5 rounded-lg hover:bg-slate-100 text-slate-700 text-sm transition"
                    >
                      <span>{r.label}</span>
                      <ExternalLink size={14} className="text-slate-400 shrink-0" />
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          </aside>
        </div>
      </main>

      <footer className="border-t border-slate-200 mt-8">
        <div className="vw-wide py-6 text-center">
          <p className="text-sm text-slate-500">
            &copy; {new Date().getFullYear()} VoteWise Kenya · Independent civic education,
            not affiliated with the IEBC or any political party.
          </p>
        </div>
      </footer>
    </div>
  );
}
