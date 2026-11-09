"use client";
import { useMemo, useState } from "react";
import Link from "next/link";
import { useQuery } from "convex/react";
import { useRouter } from "next/navigation";
import { Search, Trophy, Users, TrendingUp, PlugZap } from "lucide-react";
import { api } from "@/convex/_generated/api";
import { authClient } from "@/lib/auth-client";
import NavMenu from "@/app/components/Navigation";
import BookLoader from "@/app/components/BookLoader";
import { isBackendConfigured } from "@/lib/convexConfig";

const MEDAL_COLOURS = ["#F5C518", "#C0C0C0", "#CD7F32"];
const MEDALS = ["🥇", "🥈", "🥉"];
/** Podium column heights, ordered as rendered: 2nd, 1st, 3rd. */
const PODIUM_HEIGHTS = ["h-24", "h-32", "h-20"];

export default function LeaderboardPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [search, setSearch] = useState("");
  const router = useRouter();

  // The server tags the caller's own row, so no other learner's id is sent to
  // the browser and the client does not need a session just to highlight it.
  const leaderboard = useQuery(api.progress.getLeaderboard, {});
  const isLoading = leaderboard === undefined && isBackendConfigured;
  const rows = useMemo(() => leaderboard ?? [], [leaderboard]);

  const handleLogout = async () => {
    try {
      await authClient.signOut();
    } finally {
      router.push("/signin");
    }
  };

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return rows;
    return rows.filter((u) => u.name.toLowerCase().includes(q));
  }, [rows, search]);

  const top3 = rows.slice(0, 3);
  const totalPoints = rows.reduce((sum, u) => sum + u.points, 0);
  const average = rows.length > 0 ? Math.round(totalPoints / rows.length) : 0;
  const topScore = rows.length > 0 ? rows[0].points : 0;

  return (
    <div className="min-h-screen bg-slate-50">
      <NavMenu
        isMenuOpen={isMenuOpen}
        toggleMenu={() => setIsMenuOpen((v) => !v)}
        handleLogout={handleLogout}
      />

      <section className="bg-gradient-to-br from-green-900 via-green-800 to-green-900 text-white">
        <div className="vw-wide py-10 lg:py-12">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold">Leaderboard</h1>
              <p className="text-green-50/90 text-lg mt-2">
                Learners across Kenya, ranked by points earned.
              </p>
            </div>

            <dl className="grid grid-cols-3 gap-6 sm:gap-10">
              <div>
                <dt className="text-green-200 text-xs uppercase tracking-wide font-semibold">
                  Learners
                </dt>
                <dd className="text-3xl font-extrabold mt-1 tabular-nums">{rows.length}</dd>
              </div>
              <div>
                <dt className="text-green-200 text-xs uppercase tracking-wide font-semibold">
                  Top score
                </dt>
                <dd className="text-3xl font-extrabold mt-1 tabular-nums">{topScore}</dd>
              </div>
              <div>
                <dt className="text-green-200 text-xs uppercase tracking-wide font-semibold">
                  Average
                </dt>
                <dd className="text-3xl font-extrabold mt-1 tabular-nums">{average}</dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      <main className="vw-wide py-8 lg:py-10">
        {isLoading && (
          <div className="flex justify-center py-24">
            <BookLoader text="Loading leaderboard…" />
          </div>
        )}

        {!isLoading && rows.length === 0 && (
          <div className="vw-card p-12 text-center max-w-xl mx-auto">
            {!isBackendConfigured ? (
              <>
                <PlugZap size={40} className="mx-auto text-amber-500 mb-4" />
                <h2 className="text-xl font-bold text-slate-900 mb-2">
                  Backend not connected
                </h2>
                <p className="text-slate-600">
                  The leaderboard needs a Convex deployment.
                </p>
              </>
            ) : (
              <>
                <Trophy size={40} className="mx-auto text-slate-300 mb-4" />
                <h2 className="text-xl font-bold text-slate-900 mb-2">
                  Nobody on the board yet
                </h2>
                <p className="text-slate-600 mb-6">
                  Complete a module to be the first name here.
                </p>
                <Link
                  href="/modules"
                  className="inline-block bg-green-800 text-white px-6 py-3 rounded-xl hover:bg-green-900 transition font-semibold"
                >
                  Start learning
                </Link>
              </>
            )}
          </div>
        )}

        {rows.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_20rem] gap-8 items-start">
            {/* Table */}
            <div className="space-y-6">
              {top3.length >= 1 && (
                <section className="vw-card p-6 lg:p-8">
                  <h2 className="text-lg font-bold text-slate-900 mb-6">Top three</h2>
                  <div className="flex justify-center items-end gap-4 sm:gap-8">
                    {/* Rendered 2nd, 1st, 3rd so the winner sits in the middle. */}
                    {[top3[1], top3[0], top3[2]].map((u, displayIdx) => {
                      if (!u) return <div key={displayIdx} className="w-24" />;
                      const actualIdx = displayIdx === 0 ? 1 : displayIdx === 1 ? 0 : 2;
                      return (
                        <div
                          key={`${u.rank}-${u.name}`}
                          className="flex flex-col items-center gap-2 w-24 sm:w-32"
                        >
                          <span className="text-3xl">{MEDALS[actualIdx]}</span>
                          <p className="text-sm font-bold text-slate-900 text-center truncate w-full">
                            {u.name}
                          </p>
                          <p className="text-sm font-bold text-green-700 tabular-nums">
                            {u.points} pts
                          </p>
                          <div
                            className={`w-full rounded-t-xl ${PODIUM_HEIGHTS[displayIdx]}`}
                            style={{ backgroundColor: MEDAL_COLOURS[actualIdx] }}
                          />
                        </div>
                      );
                    })}
                  </div>
                </section>
              )}

              <section className="vw-card overflow-hidden">
                <div className="p-5 border-b border-slate-100">
                  <div className="relative">
                    <Search
                      size={18}
                      className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                    />
                    <input
                      type="search"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      placeholder="Search by name…"
                      aria-label="Search the leaderboard"
                      className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-green-500 text-slate-900"
                    />
                  </div>
                </div>

                <table className="w-full">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-100">
                      <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide w-20">
                        Rank
                      </th>
                      <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">
                        Name
                      </th>
                      <th className="text-right px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide hidden sm:table-cell">
                        Modules
                      </th>
                      <th className="text-right px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide w-28">
                        Points
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((u) => (
                      <tr
                        key={`${u.rank}-${u.name}`}
                        className={`border-b border-slate-50 last:border-0 ${
                          u.isMe ? "bg-green-50" : "hover:bg-slate-50"
                        }`}
                      >
                        <td className="px-5 py-3.5">
                          <span
                            className={`font-bold text-sm tabular-nums ${
                              u.rank <= 3 ? "text-amber-600" : "text-slate-500"
                            }`}
                          >
                            {u.rank <= 3 ? MEDALS[u.rank - 1] : u.rank}
                          </span>
                        </td>
                        <td className="px-5 py-3.5">
                          <span
                            className={`text-sm font-medium ${
                              u.isMe ? "text-green-800" : "text-slate-800"
                            }`}
                          >
                            {u.name}
                            {u.isMe && (
                              <span className="ml-2 text-xs font-semibold text-green-600">
                                you
                              </span>
                            )}
                          </span>
                        </td>
                        <td className="px-5 py-3.5 text-right hidden sm:table-cell">
                          <span className="text-sm text-slate-500 tabular-nums">
                            {u.modulesCompleted}
                          </span>
                        </td>
                        <td className="px-5 py-3.5 text-right">
                          <span className="text-sm font-bold text-green-700 tabular-nums">
                            {u.points}
                          </span>
                        </td>
                      </tr>
                    ))}
                    {filtered.length === 0 && (
                      <tr>
                        <td colSpan={4} className="text-center py-12 text-slate-400 text-sm">
                          Nobody matches &ldquo;{search}&rdquo;.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </section>
            </div>

            {/* Rail */}
            <aside className="space-y-5 lg:sticky lg:top-24">
              <section className="vw-card p-6">
                <h2 className="font-bold text-slate-900 mb-4">At a glance</h2>
                <dl className="space-y-3">
                  <div className="flex items-center gap-3">
                    <span className="w-9 h-9 rounded-lg bg-green-100 flex items-center justify-center shrink-0">
                      <Users size={17} className="text-green-700" />
                    </span>
                    <div>
                      <dt className="text-xs text-slate-500">Learners ranked</dt>
                      <dd className="font-bold text-slate-900 tabular-nums">{rows.length}</dd>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="w-9 h-9 rounded-lg bg-amber-100 flex items-center justify-center shrink-0">
                      <Trophy size={17} className="text-amber-600" />
                    </span>
                    <div>
                      <dt className="text-xs text-slate-500">Highest score</dt>
                      <dd className="font-bold text-slate-900 tabular-nums">{topScore}</dd>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="w-9 h-9 rounded-lg bg-purple-100 flex items-center justify-center shrink-0">
                      <TrendingUp size={17} className="text-purple-600" />
                    </span>
                    <div>
                      <dt className="text-xs text-slate-500">Average score</dt>
                      <dd className="font-bold text-slate-900 tabular-nums">{average}</dd>
                    </div>
                  </div>
                </dl>
              </section>

              <section className="vw-card p-6 bg-gradient-to-br from-green-50 to-white border-green-200">
                <h2 className="font-bold text-slate-900 mb-2">Climb the board</h2>
                <p className="text-sm text-slate-600 leading-relaxed mb-5">
                  Each module awards up to 30 points, scaled by how many quiz questions you
                  get right. Points are awarded once per module.
                </p>
                <Link
                  href="/modules"
                  className="block text-center bg-green-800 text-white px-5 py-3 rounded-xl hover:bg-green-900 transition font-semibold text-sm"
                >
                  Complete a module
                </Link>
              </section>
            </aside>
          </div>
        )}
      </main>
    </div>
  );
}
