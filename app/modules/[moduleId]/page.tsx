"use client";
import { useState, useEffect } from "react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useParams } from "next/navigation";
import NavMenu from "@/app/components/Navigation";
import BackArrow from "@/app/components/BackArrow";
import Confetti from "@/app/components/Confetti";
import { getProgress, resetQuizProgress } from "@/lib/progressStorage";
import { authClient } from "@/lib/auth-client";
import BookLoader from "@/app/components/BookLoader";

const font = "system-ui, -apple-system, sans-serif";

export default function ModuleOverviewPage() {
  const params = useParams();
  const moduleId = params.moduleId as Id<"modules">;
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [progress, setProgress] = useState({ seenCardIds: [] as string[], correctAnswers: 0, totalQuestions: 0, quizComplete: false, badgeEarned: false });
  const [showConfetti, setShowConfetti] = useState(false);

  const mod = useQuery(api.admin.getModule, { moduleId });
  const flashcards = useQuery(api.admin.getFlashcardsByModule, { moduleId }) ?? [];
  const questions = useQuery(api.admin.getMultipleChoiceByModule, { moduleId }) ?? [];

 const [userId, setUserId] = useState<string | null>(null);

useEffect(() => {
  authClient.getSession().then(({ data }) => {
    if (data?.user) setUserId(data.user.id);
  });
}, []);

const moduleProgressData = useQuery(
  api.progress.getModuleProgress,
  userId ? { userId, moduleId } : "skip"
);

useEffect(() => {
  if (!moduleProgressData) return;
  setShowConfetti(moduleProgressData.completed && document.referrer.includes("/quiz"));
}, [moduleProgressData]);

  if (!mod) return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "white" }}>
    <BookLoader text="Loading module..." />
  </div>
  );

  const totalCards = flashcards.length;
  const totalQ = questions.length;
  // ✅ Read directly from Convex
  const moduleProgress = moduleProgressData?.progress ?? 0;
  const quizComplete = moduleProgressData?.completed ?? false;
  const badgeEarned = moduleProgressData?.completed ?? false;

  const handleRetry = () => {
    resetQuizProgress(moduleId);
    setProgress((p) => ({ ...p, correctAnswers: 0, totalQuestions: 0, quizComplete: false, badgeEarned: false }));
    window.location.href = `/modules/${moduleId}/quiz`;
  };

  return (
    <div style={{ minHeight: "100vh", background: "#f3f4f6", display: "flex", justifyContent: "center", fontFamily: font }}>
      <style>{`
        @keyframes badgeBounce { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
        @keyframes badgePing   { 0%{transform:scale(1);opacity:.6} 100%{transform:scale(2);opacity:0} }
      `}</style>
      <Confetti active={showConfetti} />

      <div style={{ width: 390, background: "#f3f4f6", minHeight: "100vh" }}>
        <NavMenu
          isMenuOpen={isMenuOpen}
          toggleMenu={() => setIsMenuOpen((v) => !v)}
          toggleDarkMode={() => {}}
          handleLogout={() => {}}
        />

        <div style={{ padding: "20px 16px", display: "flex", flexDirection: "column", gap: 18, color: "black" }}>

          {/* Back + title */}
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <BackArrow href="/modules" />
            <span style={{ fontSize: 15, fontWeight: 600, color: "#374151" }}>All Modules</span>
          </div>

          {/* Top card */}
          <div style={{ background: "#fff", borderRadius: 18, boxShadow: "0 10px 30px rgba(0,0,0,.14)", padding: "24px 20px 18px", textAlign: "center" }}>
            {mod.imageUrl
              ? <img src={mod.imageUrl} alt={mod.title} style={{ width: 110, height: 110, objectFit: "cover", borderRadius: 12, marginBottom: 12 }} />
              : <div style={{ width: 80, height: 80, borderRadius: "50%", background: "linear-gradient(135deg,#14532d,#22c55e)", display: "inline-flex", alignItems: "center", justifyContent: "center", marginBottom: 12 }}>
                  <svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18" />
                  </svg>
                </div>
            }
            <h1 style={{ margin: 0, fontSize: 20, fontWeight: 800 }}>{mod.title}</h1>
          </div>

          {/* Badge */}
          <div style={{ display: "flex", alignItems: "center", padding: "0 4px" }}>
            <p style={{ fontWeight: 600, margin: 0, minWidth: 56 }}>Badge:</p>
            <div style={{ display: "flex", alignItems: "center", gap: 14, margin: "0 auto" }}>
              <div style={{ position: "relative", width: 52, height: 52, flexShrink: 0 }}>
                {progress.badgeEarned && (
                  <div style={{ position: "absolute", inset: 0, borderRadius: "50%", background: "#fde68a", opacity: 0.5, animation: "badgePing 1s ease-out infinite" }} />
                )}
                <div style={{
                  position: "relative", width: 52, height: 52, borderRadius: "50%",
                  background: "#fef3c7", border: "1px solid #fde68a",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  animation: progress.badgeEarned ? "badgeBounce 0.7s ease-in-out infinite" : "none",
                  boxShadow: progress.badgeEarned ? "0 4px 16px rgba(245,158,11,.35)" : "none",
                }}>
                  <span style={{ fontSize: 22 }}>{mod.badgeIcon ?? "🏛️"}</span>
                </div>
              </div>
              <div>
                <p style={{ margin: 0, fontWeight: 700, fontSize: 15 }}>
                  {mod.badgeText ?? `${mod.title} Expert`}
                </p>
                <p style={{ margin: 0, fontSize: 13, color: progress.badgeEarned ? "#16a34a" : "#9ca3af", fontWeight: progress.badgeEarned ? 600 : 400 }}>
                  {progress.badgeEarned ? "Earned ✓" : "Not earned yet"}
                </p>
              </div>
            </div>
          </div>

          {/* Progress bar */}
          <div style={{ padding: "0 4px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: "#374151", marginBottom: 5 }}>
              <span>Your Progress:</span><span>{moduleProgress}%</span>
            </div>
            <div style={{ height: 10, background: "#e5e7eb", borderRadius: 99, overflow: "hidden" }}>
              <div style={{ height: "100%", width: `${moduleProgress}%`, background: "#16a34a", borderRadius: 99, transition: "width 0.8s ease" }} />
            </div>
          </div>

          {/* Content summary */}
          <div style={{ background: "#fff", borderRadius: 18, boxShadow: "0 10px 30px rgba(0,0,0,.14)", padding: "18px 20px" }}>
            <h2 style={{ margin: "0 0 16px", fontWeight: 700, fontSize: 16 }}>Module Content</h2>
            <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 14 }}>
              <div style={{ width: 38, height: 38, borderRadius: 10, background: "#dcfce7", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
                </svg>
              </div>
              <span style={{ fontSize: 15 }}>{flashcards.length} learning flashcard{flashcards.length !== 1 ? "s" : ""}</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <div style={{ width: 38, height: 38, borderRadius: 10, background: "#ffedd5", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ea580c" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
                </svg>
              </div>
              <span style={{ fontSize: 15 }}>{questions.length} quiz question{questions.length !== 1 ? "s" : ""}</span>
            </div>
          </div>

          <p style={{ textAlign: "center", fontSize: 13, color: "#6b7280", margin: "0 8px", lineHeight: 1.6 }}>
            {mod.description}
          </p>

          {/* CTA buttons */}
          <a href={`/modules/${moduleId}/flashcards`} style={{
            display: "block", width: "100%", padding: "15px",
            background: "#14532d", color: "#fff", textDecoration: "none",
            border: "none", borderRadius: 14, fontSize: 16, fontWeight: 600,
            cursor: "pointer", boxShadow: "0 6px 16px rgba(0,0,0,.2)",
            textAlign: "center", boxSizing: "border-box",
          }}>
            {quizComplete ? "Review Learning" : "Start Learning"}
          </a>

          {quizComplete && !badgeEarned && (
            <button onClick={handleRetry} style={{
              width: "100%", padding: "14px", background: "#fff", color: "#14532d",
              border: "2px solid #14532d", borderRadius: 14, fontSize: 15, fontWeight: 600,
              cursor: "pointer", marginTop: -8, fontFamily: "inherit",
            }}>
              🔄 Try Again
            </button>
          )}
        </div>
      </div>
    </div>
  );
}