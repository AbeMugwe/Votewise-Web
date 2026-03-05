"use client";
import React, { useState, useEffect } from "react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { authClient } from "@/lib/auth-client";
import { BookOpen, Trophy, Award } from "lucide-react";
import NavMenu from "@/app/components/Navigation";
import { useRouter } from "next/navigation";

type SessionUser = {
  id: string;
  name?: string | null;
  email?: string | null;
};

export default function VoteWiseDashboard() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [user, setUser] = useState<SessionUser | null>(null);
  const router = useRouter();

  const resources = [
    { label: "IEBC Website", url: "https://www.iebc.or.ke/" },
    { label: "Kenya Constitution", url: "https://www.klrc.go.ke/" },
    { label: "Electoral Laws", url: "https://www.klrc.go.ke/index.php/constitution-of-kenya/legislation" },
  ];

  // Load session
  useEffect(() => {
    authClient.getSession().then(({ data }) => {
      if (data?.user) setUser(data.user as SessionUser);
    });
  }, []);

  // Pull dashboard data from Convex — skips if not logged in
  const dashData = useQuery(
    api.progress.getDashboardData,
    user?.id ? { userId: user.id } : "skip"
  );

  const recentActivity = useQuery(
    api.progress.getRecentActivity,
    user?.id ? { userId: user.id } : "skip"
  );

  const handleLogout = async () => {
    const { error } = await authClient.signOut();
    if (error) { alert(error.message ?? "Logout failed"); return; }
    router.push("/signin");
  };

  // Progress bar values
  const modulesCompleted = dashData?.modulesCompleted ?? 0;
  const totalModules = dashData?.totalModules ?? 0;
  const progressPct = dashData?.progressPercentage ?? 0;
  const points = dashData?.points ?? 0;
  const rank = dashData?.rank ?? "Newcomer";
  const badgesEarned = dashData?.badgesEarned ?? 0;

  return (
    <div className={`min-h-screen ${isDarkMode ? "bg-gray-900" : "bg-gray-50"}`}>
      <NavMenu
        isMenuOpen={isMenuOpen}
        toggleMenu={() => setIsMenuOpen((v) => !v)}
        toggleDarkMode={() => setIsDarkMode((v) => !v)}
        handleLogout={handleLogout}
      />

      <main className="max-w-2xl mx-auto p-6 space-y-6">

        {/* Welcome Card */}
        <div className="bg-gradient-to-r from-green-700 to-green-600 rounded-xl p-6 text-white shadow-lg">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-1">Welcome back,</h2>
              <h3 className="text-2xl font-bold mb-2">{user?.name ?? ""}</h3>
              <p className="text-green-100 text-sm">Start your learning journey</p>
            </div>
            <div className="bg-green-800 rounded-lg px-5 py-3 text-center w-24 shadow-md">
              <div className="text-white text-3xl font-extrabold leading-none">{points}</div>
              <div className="text-white/90 text-xs mt-1">Points</div>
            </div>
          </div>
        </div>

        {/* Learning Progress */}
        <div className={`${isDarkMode ? "bg-gray-800 text-white" : "bg-white"} rounded-xl p-6 shadow-md`}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg text-black font-bold">Your Learning Progress</h3>
            <span className="text-sm text-gray-500">
              {modulesCompleted} of {totalModules} module{totalModules !== 1 ? "s" : ""} completed
            </span>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
            <div
              className="bg-green-600 h-2 rounded-full transition-all duration-700"
              style={{ width: `${progressPct}%` }}
            />
          </div>
          <p className="text-xs text-gray-400 mb-6">
            {progressPct}% complete
            {progressPct === 100 && " 🎉 All modules done!"}
          </p>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-4 bg-yellow-50 rounded-lg">
              <Trophy className="mx-auto mb-2 text-yellow-600" size={32} />
              <div className="font-semibold text-black text-sm mb-1">Your Rank</div>
              <div className="text-yellow-600 font-bold text-2xl">{rank !== null ? `#${rank}` : "—"}</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <Award className="mx-auto mb-2 text-purple-600" size={32} />
              <div className="font-semibold text-black text-sm mb-1">Badges Earned</div>
              <div className="text-purple-600 font-bold text-2xl">{badgesEarned}</div>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className={`${isDarkMode ? "bg-gray-800 text-white" : "bg-white"} rounded-xl p-6 shadow-md`}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg text-black font-bold">Recent Activity</h3>
            <a href="/leaderboard" className="text-green-700 text-sm font-medium hover:underline">
              View Leaderboard
            </a>
          </div>

          {recentActivity && recentActivity.length > 0 ? (
            <div className="space-y-3">
              {recentActivity.map((a) => (
                <div key={a._id} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <BookOpen size={16} className="text-green-700" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-800 font-medium">{a.description}</p>
                    {a.moduleTitle && (
                      <p className="text-xs text-gray-500 mt-0.5">{a.moduleTitle}</p>
                    )}
                    <p className="text-xs text-gray-400 mt-0.5">
                      {new Date(a.timestamp).toLocaleDateString("en-KE", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" })}
                    </p>
                  </div>
                </div>
              ))}
             {progressPct < 100 && (
              <a
                href="/modules"
                className="flex items-center justify-center gap-2 w-full mt-3 py-3 bg-green-800 text-white rounded-xl font-semibold text-sm hover:bg-green-900 transition"
              >
              <BookOpen size={16} />
              Continue Learning →
              </a>
              )}

              {progressPct === 100 && (
              <a
              href="/modules"
              className="flex items-center justify-center gap-2 w-full mt-3 py-3 bg-gray-100 text-green-700 rounded-xl font-semibold text-sm hover:bg-gray-200 transition"
              >
              🎉 All done! Review Modules
              </a>
              )} 
            </div>
          ) : (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-gray-100 rounded-lg mx-auto mb-3 flex items-center justify-center">
                <BookOpen size={32} className="text-gray-400" />
              </div>
              <p className="text-gray-500 mb-4">No recent activity</p>
              <a href="/modules" className="bg-green-800 text-white px-6 py-2 rounded-lg hover:bg-green-900 transition font-medium inline-block">
                Start Learning
              </a>
            </div>
          )}
        </div>

        {/* Rank explanation */}
        <div className={`${isDarkMode ? "bg-gray-800" : "bg-white"} rounded-xl p-6 shadow-md`}>
          <h3 className="text-lg text-black font-bold mb-4">Rank System</h3>
          <div className="space-y-2">
            {[
              { rank: "Newcomer", points: "0–29 pts", color: "text-gray-500" },
              { rank: "Civic Learner", points: "30–89 pts", color: "text-blue-600" },
              { rank: "Active Citizen", points: "90–149 pts", color: "text-green-600" },
              { rank: "Democracy Expert", points: "150–299 pts", color: "text-purple-600" },
              { rank: "Civic Champion", points: "300+ pts", color: "text-yellow-600" },
            ].map((r) => (
              <div key={r.rank} className={`flex justify-between items-center p-2 rounded-lg ${rank === r.rank ? "bg-green-50 border border-green-200" : ""}`}>
                <span className={`font-semibold text-sm ${r.color}`}>{r.rank}</span>
                <span className="text-xs text-gray-400">{r.points}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Resources */}
        <div className={`${isDarkMode ? "bg-gray-800" : "bg-white"} rounded-xl p-6 shadow-md`}>
          <h3 className="text-lg text-black font-bold mb-4">Resources To Check</h3>
          <ul className="space-y-3">
            {resources.map((r) => (
              <button
                key={r.label}
                onClick={() => window.open(r.url, "_blank", "noopener,noreferrer")}
                className="w-full text-left px-4 py-3 rounded-lg hover:bg-gray-100 text-black"
              >
                {r.label}
              </button>
            ))}
          </ul>
        </div>
      </main>

      <footer className={`${isDarkMode ? "bg-gray-900 text-gray-400" : "bg-black text-white"} text-center py-6 mt-12`}>
        <p className="text-sm">© 2025 VoteWise Kenya. All rights reserved.</p>
      </footer>
    </div>
  );
}