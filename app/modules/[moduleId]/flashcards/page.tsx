"use client";
import { useState, useEffect } from "react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useParams } from "next/navigation";
import NavMenu from "@/app/components/Navigation";
import BackArrow from "@/app/components/BackArrow";
import ProgressBar from "@/app/components/ProgressBar";
import { getProgress, saveSeenCard } from "@/lib/progressStorage"

const font = "system-ui, -apple-system, sans-serif";

export default function FlashcardsPage() {
  const params = useParams();
  const moduleId = params.moduleId as Id<"modules">;
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [seen, setSeen] = useState<Set<string>>(new Set());

  const mod = useQuery(api.admin.getModule, { moduleId });
  const flashcards = useQuery(api.admin.getFlashcardsByModule, { moduleId }) ?? [];

  // Load already-seen cards from localStorage on mount
  useEffect(() => {
    const p = getProgress(moduleId);
    setSeen(new Set(p.seenCardIds));
  }, [moduleId]);

  const markSeen = (cardId: string) => {
    if (seen.has(cardId)) return;
    setSeen((prev) => new Set([...prev, cardId]));
    saveSeenCard(moduleId, cardId); // persist to localStorage
  };

  const totalCards = flashcards.length;
  const cardBarPct = totalCards > 0 ? Math.round((seen.size / totalCards) * 100) : 0;
  const allSeen = seen.size === totalCards && totalCards > 0;

  return (
    <div style={{ minHeight: "100vh", background: "#fff", display: "flex", justifyContent: "center", fontFamily: font, color: "black" }}>
      <div style={{ width: 390, background: "#fff", minHeight: "100vh" }}>
        <NavMenu
          isMenuOpen={isMenuOpen}
          toggleMenu={() => setIsMenuOpen((v) => !v)}
          toggleDarkMode={() => {}}
          handleLogout={() => {}}
        />

        <div style={{ padding: "16px 16px 100px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
            <BackArrow href={`/modules/${moduleId}`} />
            <h1 style={{ margin: 0, fontSize: 16, fontWeight: 600, color: "black" }}>{mod?.title ?? "Loading…"}</h1>
          </div>
          <ProgressBar pct={cardBarPct} />

          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            {flashcards.map((card) => {
              const isOpen = seen.has(card._id);
              return (
                <details
                  key={card._id}
                  open={isOpen}
                  onToggle={(e) => {
                    if ((e.currentTarget as HTMLDetailsElement).open) markSeen(card._id);
                  }}
                  style={{
                    background: "#fff", borderRadius: 24,
                    boxShadow: "0 8px 20px rgba(0,0,0,.12)", padding: "24px 20px",
                    minHeight: 130, cursor: "pointer",
                    border: isOpen ? "1.5px solid #22c55e" : "1px solid #e5e7eb",
                    transition: "border 0.25s",
                  }}
                >
                  <summary style={{ listStyle: "none", cursor: "pointer" }}>
                    <h2 style={{ margin: "0 0 8px", fontSize: 16, fontWeight: 800, textAlign: "center" }}>
                      {card.question}
                    </h2>
                    {!isOpen && (
                      <p style={{ margin: 0, textAlign: "center", fontSize: 15, color: "#9ca3af" }}>
                        Tap to reveal
                      </p>
                    )}
                  </summary>
                  <p style={{ margin: "12px 0 0", textAlign: "center", fontSize: 15, color: "#4b5563", lineHeight: 1.65 }}>
                    {card.answer}
                  </p>
                </details>
              );
            })}
          </div>

          {allSeen && (
            <a href={`/modules/${moduleId}/quiz`} style={{
              display: "block", position: "sticky", bottom: 16, marginTop: 24,
              width: "100%", padding: "14px", background: "#14532d", color: "#fff",
              border: "none", borderRadius: 12, fontSize: 16, fontWeight: 600,
              cursor: "pointer", boxShadow: "0 6px 16px rgba(0,0,0,.2)",
              textAlign: "center", textDecoration: "none", boxSizing: "border-box",
            }}>
              Continue to Quiz →
            </a>
          )}
        </div>
      </div>
    </div>
  );
}