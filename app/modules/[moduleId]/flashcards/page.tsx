"use client";
import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { useQuery, useMutation } from "convex/react";
import { useParams } from "next/navigation";
import { ArrowLeft, ArrowRight, Check, Eye, Layers } from "lucide-react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import NavMenu from "@/app/components/Navigation";
import BookLoader from "@/app/components/BookLoader";
import { authClient } from "@/lib/auth-client";

/**
 * Flashcard deck.
 *
 * The old version stacked cards in a 390px column with a `<details>` per card.
 * On a desktop that meant one narrow card per screenful. This lays the deck out
 * as a responsive grid with a sticky progress header, so a reviewer can see the
 * whole module at a glance and reveal answers in place.
 */
export default function FlashcardsPage() {
  const params = useParams();
  const moduleId = params.moduleId as Id<"modules">;
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [locallyRevealed, setLocallyRevealed] = useState<Set<string>>(new Set());
  const [userId, setUserId] = useState<string | null>(null);

  const mod = useQuery(api.admin.getModule, { moduleId });
  const flashcards = useQuery(api.admin.getFlashcardsByModule, { moduleId });
  const moduleProgress = useQuery(api.progress.getModuleProgress, { moduleId });
  const markFlashcardSeen = useMutation(api.progress.markFlashcardSeen);

  useEffect(() => {
    authClient
      .getSession()
      .then(({ data }) => {
        if (data?.user) setUserId(data.user.id);
      })
      .catch(() => {
        // Not signed in — the deck still works, it just is not synced.
      });
  }, []);

  // Memoised so the identity is stable — otherwise the `seen` memo below
  // recomputes on every render.
  const cards = useMemo(() => flashcards ?? [], [flashcards]);

  // Restore how far through the deck this learner already was, merged with
  // anything revealed in this session. Deriving it beats copying server state
  // into an effect, which clobbered fresh reveals whenever the query updated.
  const savedCount = moduleProgress?.flashcardsCompleted ?? 0;
  const seen = useMemo(() => {
    const merged = new Set(locallyRevealed);
    for (const card of cards.slice(0, savedCount)) merged.add(card._id);
    return merged;
  }, [locallyRevealed, cards, savedCount]);

  const reveal = async (cardId: string) => {
    if (seen.has(cardId)) return;
    const next = new Set([...seen, cardId]);
    setLocallyRevealed(next);

    if (!userId) return;
    try {
      await markFlashcardSeen({
        moduleId,
        flashcardsSeen: next.size,
        totalFlashcards: cards.length,
      });
    } catch {
      // Reading the card still worked; a failed sync is not worth interrupting.
    }
  };

  const revealAll = () => {
    setLocallyRevealed(new Set(cards.map((c) => c._id)));
    if (!userId) return;
    markFlashcardSeen({
      moduleId,
      flashcardsSeen: cards.length,
      totalFlashcards: cards.length,
    }).catch(() => {});
  };

  const total = cards.length;
  const pct = total > 0 ? Math.round((seen.size / total) * 100) : 0;
  const allSeen = total > 0 && seen.size === total;

  if (flashcards === undefined) {
    return (
      <div className="min-h-screen bg-slate-50">
        <NavMenu isMenuOpen={isMenuOpen} toggleMenu={() => setIsMenuOpen((v) => !v)} />
        <div className="flex items-center justify-center py-32">
          <BookLoader text="Loading flashcards…" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <NavMenu isMenuOpen={isMenuOpen} toggleMenu={() => setIsMenuOpen((v) => !v)} />

      {/* Sticky progress bar */}
      <div className="sticky top-[68px] z-30 bg-white/90 backdrop-blur border-b border-slate-200">
        <div className="vw-wide py-4">
          <div className="flex flex-wrap items-center gap-4">
            <Link
              href={`/modules/${moduleId}`}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-600 hover:text-green-800 transition"
            >
              <ArrowLeft size={16} />
              <span className="hidden sm:inline">{mod?.title ?? "Module"}</span>
              <span className="sm:hidden">Back</span>
            </Link>

            <div className="flex-1 min-w-[8rem] flex items-center gap-3">
              <div
                className="flex-1 h-2 rounded-full bg-slate-200 overflow-hidden"
                role="progressbar"
                aria-valuenow={pct}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label="Cards revealed"
              >
                <div
                  className="h-full bg-green-600 rounded-full transition-all duration-500"
                  style={{ width: `${pct}%` }}
                />
              </div>
              <span className="text-sm font-semibold text-slate-600 tabular-nums shrink-0">
                {seen.size}/{total}
              </span>
            </div>

            {!allSeen && total > 0 && (
              <button
                onClick={revealAll}
                className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-600 hover:text-green-800 transition"
              >
                <Eye size={15} /> Reveal all
              </button>
            )}

            {allSeen && (
              <Link
                href={`/modules/${moduleId}/quiz`}
                className="inline-flex items-center gap-2 bg-green-800 text-white px-5 py-2.5 rounded-lg font-semibold text-sm hover:bg-green-900 transition shadow-sm"
              >
                Continue to quiz <ArrowRight size={15} />
              </Link>
            )}
          </div>
        </div>
      </div>

      <main className="vw-wide py-8 lg:py-10">
        <header className="mb-7">
          <h1 className="text-2xl lg:text-3xl font-bold text-slate-900 flex items-center gap-2.5">
            <Layers size={26} className="text-green-700" />
            {mod?.title ?? "Flashcards"}
          </h1>
          <p className="text-slate-600 mt-2">
            Click a card to reveal the answer. Work through all {total} to unlock the quiz.
          </p>
        </header>

        {total === 0 ? (
          <div className="vw-card p-10 text-center">
            <Layers size={36} className="mx-auto text-slate-300 mb-3" />
            <h2 className="font-bold text-slate-900">No flashcards yet</h2>
            <p className="text-slate-600 text-sm mt-1">
              This module has no cards published.
            </p>
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {cards.map((card, i) => {
              const isOpen = seen.has(card._id);
              return (
                <article
                  key={card._id}
                  className={`vw-card flex flex-col p-6 transition ${
                    isOpen ? "border-green-300 bg-white" : "vw-card-hover cursor-pointer"
                  }`}
                  onClick={() => !isOpen && reveal(card._id)}
                >
                  <div className="flex items-center justify-between gap-3 mb-3">
                    <span className="text-xs font-bold text-slate-400 tabular-nums">
                      CARD {String(i + 1).padStart(2, "0")}
                    </span>
                    {isOpen && (
                      <span className="inline-flex items-center gap-1 text-xs font-semibold text-green-700">
                        <Check size={13} strokeWidth={3} /> Seen
                      </span>
                    )}
                  </div>

                  <h2 className="font-bold text-slate-900 text-lg leading-snug">
                    {card.question}
                  </h2>

                  {isOpen ? (
                    <p className="mt-4 pt-4 border-t border-slate-100 text-slate-600 leading-relaxed vw-fade-up">
                      {card.answer}
                    </p>
                  ) : (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        reveal(card._id);
                      }}
                      className="mt-auto pt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-green-700 hover:text-green-900 transition self-start"
                    >
                      <Eye size={15} /> Reveal answer
                    </button>
                  )}
                </article>
              );
            })}
          </div>
        )}

        {allSeen && (
          <div className="mt-10 vw-card p-8 text-center bg-gradient-to-br from-green-50 to-white border-green-200">
            <h2 className="text-xl font-bold text-slate-900">
              That is the whole deck — nice work.
            </h2>
            <p className="text-slate-600 mt-2 mb-6">
              Test yourself now. A clean sweep earns the module badge.
            </p>
            <Link
              href={`/modules/${moduleId}/quiz`}
              className="inline-flex items-center gap-2 bg-green-800 text-white px-8 py-3.5 rounded-xl font-semibold hover:bg-green-900 transition shadow-md"
            >
              Start the quiz <ArrowRight size={17} />
            </Link>
          </div>
        )}
      </main>
    </div>
  );
}
