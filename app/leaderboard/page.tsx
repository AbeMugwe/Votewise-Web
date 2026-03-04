"use client";
import { useState, useEffect } from "react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { authClient } from "@/lib/auth-client";
import NavMenu from "@/app/components/Navigation";
import { useRouter } from "next/navigation";

export default function LeaderboardPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const router = useRouter();

  const leaderboard = useQuery(api.progress.getLeaderboard) ?? [];

  useEffect(() => {
    authClient.getSession().then(({ data }) => {
      if (data?.user) setCurrentUserId(data.user.id);
    });
  }, []);

  const handleLogout = async () => {
    await authClient.signOut();
    router.push("/signin");
  };

  const filtered = leaderboard.filter((u) =>
    u.name.toLowerCase().includes(search.toLowerCase())
  );

  const top3 = leaderboard.slice(0, 3);
  const medalColors = ["#FFD700", "#C0C0C0", "#CD7F32"];
  const medalEmojis = ["🥇", "🥈", "🥉"];

  return (
    <div className="min-h-screen bg-gray-50">
      <NavMenu
        isMenuOpen={isMenuOpen}
        toggleMenu={() => setIsMenuOpen((v) => !v)}
        toggleDarkMode={() => {}}
        handleLogout={handleLogout}
      />

      <main className="max-w-2xl mx-auto p-6 space-y-6">
        <h1 className="text-2xl font-bold text-gray-900">VoteWise Kenya Leaderboard</h1>

        {/* Top 3 Podium */}
        {top3.length > 0 && (
          <div className="bg-white rounded-xl p-6 shadow-md">
            <div className="flex justify-center items-end gap-4 mb-6">
              {/* Reorder: 2nd, 1st, 3rd */}
              {[top3[1], top3[0], top3[2]].map((u, displayIdx) => {
                if (!u) return <div key={displayIdx} className="w-24" />;
                const actualIdx = displayIdx === 0 ? 1 : displayIdx === 1 ? 0 : 2;
                const heights = ["h-20", "h-28", "h-16"];
                return (
                  <div key={u.userId} className="flex flex-col items-center gap-2">
                    <span className="text-2xl">{medalEmojis[actualIdx]}</span>
                    <div
                      className="w-20 rounded-t-lg flex items-end justify-center pb-2"
                      style={{ backgroundColor: medalColors[actualIdx], height: heights[displayIdx === 1 ? 0 : displayIdx === 0 ? 1 : 2] }}
                    >
                    </div>
                    <p className="text-xs font-bold text-center text-gray-800 max-w-[80px] truncate">{u.name}</p>
                    <p className="text-xs font-bold text-green-700">{u.points} pts</p>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Search */}
        <div className="relative">
          <input
            type="text"
            placeholder="Search leaderboard..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-4 py-3 pl-10 border border-gray-200 rounded-xl bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-800"
          />
          <svg className="absolute left-3 top-3.5 text-gray-400" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
          </svg>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Rank</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Name</th>
                <th className="text-right px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Points</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((u) => {
                const isMe = u.userId === currentUserId;
                return (
                  <tr
                    key={u.userId}
                    className={`border-b border-gray-50 ${isMe ? "bg-green-50" : "hover:bg-gray-50"}`}
                  >
                    <td className="px-4 py-3">
                      <span className={`font-bold text-sm ${u.rank <= 3 ? "text-yellow-600" : "text-gray-600"}`}>
                        {u.rank <= 3 ? medalEmojis[u.rank - 1] : u.rank}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`text-sm font-medium ${isMe ? "text-green-700" : "text-gray-800"}`}>
                        {u.name} {isMe && <span className="text-xs text-green-500">(you)</span>}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <span className="text-sm font-bold text-green-600">{u.points}</span>
                    </td>
                  </tr>
                );
              })}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={3} className="text-center py-8 text-gray-400 text-sm">
                    No results found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>

      <footer className="bg-black text-white text-center py-6 mt-12">
        <p className="text-sm">© 2025 VoteWise Kenya. All rights reserved.</p>
      </footer>
    </div>
  );
}