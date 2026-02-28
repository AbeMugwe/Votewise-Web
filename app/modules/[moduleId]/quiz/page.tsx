"use client";
import { useState } from "react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useParams, useRouter } from "next/navigation";
import NavMenu from "@/app/components/Navigation";
import BackArrow from "@/app/components/BackArrow";
import ProgressBar from "@/app/components/ProgressBar";
import { saveQuizResult } from "@/lib/progressStorage";

const font = "system-ui, -apple-system, sans-serif";

export default function QuizPage() {
  const params = useParams();
  const router = useRouter();
  const moduleId = params.moduleId as Id<"modules">;
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const [qIdx, setQIdx] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [locked, setLocked] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [toast, setToast] = useState<{ text: string; ok: boolean } | null>(null);

  const mod = useQuery(api.admin.getModule, { moduleId });
  const questions = useQuery(api.admin.getMultipleChoiceByModule, { moduleId }) ?? [];

  const totalQ = questions.length;
  const quizBarPct = totalQ > 0 ? Math.round((qIdx / totalQ) * 100) : 0;

  const showToast = (text: string, ok: boolean) => {
    setToast({ text, ok });
    setTimeout(() => setToast(null), 1200);
  };

  const submitAnswer = () => {
    if (selected === null || locked || !questions.length) return;
    setLocked(true);

    const correct = questions[qIdx].correctAnswer;
    const isCorrect = selected === correct;
    const newCorrect = isCorrect ? correctCount + 1 : correctCount;
    if (isCorrect) setCorrectCount(newCorrect);

    showToast(
      isCorrect
        ? "Correct! Well done."
        : `Incorrect! The correct answer: ${questions[qIdx].options[correct]}.`,
      isCorrect,
    );

    setTimeout(() => {
      if (qIdx + 1 < totalQ) {
        setQIdx((q) => q + 1);
        setSelected(null);
        setLocked(false);
      } else {
        // Save result to localStorage, then navigate back to module overview
        saveQuizResult(moduleId, newCorrect, totalQ);
        router.push(`/modules/${moduleId}`);
      }
    }, 1200);
  };

  if (!questions.length) return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: font, color: "#9ca3af" }}>
      Loading…
    </div>
  );

  const q = questions[qIdx];

  return (
    <div style={{ minHeight: "100vh", background: "#f9fafb", display: "flex", justifyContent: "center", fontFamily: font, color: "black" }}>
      <div style={{ width: 390, background: "#f9fafb", minHeight: "100vh" }}>
        <NavMenu
          isMenuOpen={isMenuOpen}
          toggleMenu={() => setIsMenuOpen((v) => !v)}
          toggleDarkMode={() => {}}
          handleLogout={() => {}}
        />

        <div style={{ padding: "16px 16px 120px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
            <BackArrow href={`/modules/${moduleId}/flashcards`} />
            <h1 style={{ margin: 0, fontSize: 16, fontWeight: 600, color: "black" }}>{mod?.title ?? "Quiz"}</h1>
          </div>
          <ProgressBar pct={quizBarPct} />

          {/* Question card */}
          <div style={{ background: "#fff", borderRadius: 24, boxShadow: "0 10px 30px rgba(0,0,0,.12)", padding: "22px 20px" }}>
            <p style={{ margin: "0 0 6px", fontSize: 12, fontWeight: 600, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.05em" }}>
              Question {qIdx + 1} of {totalQ}
            </p>
            <h2 style={{ margin: "0 0 20px", fontSize: 16, fontWeight: 800 }}>{q.question}</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {q.options.map((choice, i) => {
                let bg = "#fff", border = "1px solid #e5e7eb", shadow = "0 2px 6px rgba(0,0,0,.07)";
                if (locked) {
                  if (i === q.correctAnswer) { bg = "#dcfce7"; border = "2px solid #22c55e"; }
                  else if (i === selected && selected !== q.correctAnswer) { bg = "#fee2e2"; border = "2px solid #ef4444"; }
                } else if (i === selected) {
                  bg = "#dcfce7"; border = "2px solid #4ade80"; shadow = "0 2px 8px rgba(74,222,128,.25)";
                }
                return (
                  <button
                    key={i}
                    disabled={locked}
                    onClick={() => !locked && setSelected(i)}
                    style={{
                      width: "100%", textAlign: "left", padding: "14px 18px",
                      borderRadius: 12, background: bg, border, boxShadow: shadow,
                      fontSize: 15, cursor: locked ? "default" : "pointer",
                      transition: "all 0.2s", fontFamily: "inherit",
                    }}
                  >
                    {choice}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Toast feedback */}
          {toast && (
            <div style={{
              marginTop: 16, borderRadius: 10,
              border: `1px solid ${toast.ok ? "#86efac" : "#fca5a5"}`,
              background: toast.ok ? "#f0fdf4" : "#fef2f2",
              color: toast.ok ? "#14532d" : "#991b1b",
              padding: "12px 16px", fontSize: 14, fontWeight: 500,
            }}>
              {toast.text}
            </div>
          )}

          {/* Submit button */}
          <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 16 }}>
            <button
              disabled={selected === null || locked}
              onClick={submitAnswer}
              style={{
                padding: "12px 28px",
                background: selected !== null && !locked ? "#14532d" : "#d1d5db",
                color: "#fff", border: "none", borderRadius: 12,
                fontSize: 15, fontWeight: 600,
                cursor: selected !== null && !locked ? "pointer" : "default",
                boxShadow: selected !== null && !locked ? "0 4px 12px rgba(0,0,0,.2)" : "none",
                transition: "all 0.2s", fontFamily: "inherit",
              }}
            >
              {locked ? "Submitted" : "Submit"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}