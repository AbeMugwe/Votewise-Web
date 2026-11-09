"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useQuery, useMutation } from "convex/react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Check, X, Trophy, Info } from "lucide-react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import NavMenu from "@/app/components/Navigation";
import BookLoader from "@/app/components/BookLoader";
import { authClient } from "@/lib/auth-client";

/**
 * Quiz.
 *
 * Rebuilt from a 390px phone column into a centred desktop card with a step
 * rail, larger answer targets and an inline explanation panel. One question at
 * a time is still the right pattern here — the change is proportion and pacing,
 * not structure.
 */
export default function QuizPage() {
  const params = useParams();
  const router = useRouter();
  const moduleId = params.moduleId as Id<"modules">;

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [qIdx, setQIdx] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [locked, setLocked] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [saving, setSaving] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);

  const mod = useQuery(api.admin.getModule, { moduleId });
  const flashcards = useQuery(api.admin.getFlashcardsByModule, { moduleId }) ?? [];
  const questions = useQuery(api.admin.getMultipleChoiceByModule, { moduleId });
  const completeModule = useMutation(api.progress.completeModule);

  useEffect(() => {
    authClient
      .getSession()
      .then(({ data }) => {
        if (data?.user) setUserId(data.user.id);
      })
      .catch(() => {});
  }, []);

  const all = questions ?? [];
  const totalQ = all.length;
  const q = all[qIdx];
  const isLast = qIdx + 1 >= totalQ;

  const submitAnswer = () => {
    if (selected === null || locked || !q) return;
    setLocked(true);
    if (selected === q.correctAnswer) setCorrectCount((c) => c + 1);
  };

  const next = async () => {
    if (!q) return;
    // submitAnswer already counted this question, so correctCount is final by
    // the time "Next" / "Finish" is reachable.
    const finalCorrect = correctCount;

    if (!isLast) {
      setQIdx((i) => i + 1);
      setSelected(null);
      setLocked(false);
      return;
    }

    if (userId) {
      setSaving(true);
      try {
        await completeModule({
          moduleId,
          correctAnswers: finalCorrect,
          totalQuestions: totalQ,
          totalFlashcards: flashcards.length,
        });
      } catch (e) {
        console.error("Failed to save completion:", e);
      } finally {
        setSaving(false);
      }
    }
    router.push(`/modules/${moduleId}?completed=1`);
  };

  if (questions === undefined) {
    return (
      <div className="min-h-screen bg-slate-50">
        <NavMenu isMenuOpen={isMenuOpen} toggleMenu={() => setIsMenuOpen((v) => !v)} />
        <div className="flex items-center justify-center py-32">
          <BookLoader text="Loading questions…" />
        </div>
      </div>
    );
  }

  if (totalQ === 0 || !q) {
    return (
      <div className="min-h-screen bg-slate-50">
        <NavMenu isMenuOpen={isMenuOpen} toggleMenu={() => setIsMenuOpen((v) => !v)} />
        <div className="vw-read py-24 text-center">
          <h1 className="text-2xl font-bold text-slate-900 mb-2">No quiz yet</h1>
          <p className="text-slate-600 mb-6">
            This module has no questions published.
          </p>
          <Link
            href={`/modules/${moduleId}`}
            className="inline-flex items-center gap-2 bg-green-800 text-white px-5 py-2.5 rounded-lg hover:bg-green-900 transition font-medium"
          >
            <ArrowLeft size={16} /> Back to the module
          </Link>
        </div>
      </div>
    );
  }

  const isRight = locked && selected === q.correctAnswer;

  return (
    <div className="min-h-screen bg-slate-50">
      <NavMenu isMenuOpen={isMenuOpen} toggleMenu={() => setIsMenuOpen((v) => !v)} />

      <main className="vw-page py-8 lg:py-12">
        <div className="max-w-3xl mx-auto">
          {/* Header + step rail */}
          <div className="flex items-center justify-between gap-4 mb-5">
            <Link
              href={`/modules/${moduleId}/flashcards`}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-600 hover:text-green-800 transition"
            >
              <ArrowLeft size={16} /> Flashcards
            </Link>
            <span className="text-sm font-semibold text-slate-500 tabular-nums">
              Question {qIdx + 1} of {totalQ}
            </span>
          </div>

          <div className="flex gap-1.5 mb-8" aria-hidden="true">
            {all.map((_, i) => (
              <span
                key={i}
                className={`h-1.5 flex-1 rounded-full transition-colors duration-300 ${
                  i < qIdx ? "bg-green-600" : i === qIdx ? "bg-green-400" : "bg-slate-200"
                }`}
              />
            ))}
          </div>

          <h1 className="text-sm font-semibold text-slate-500 mb-2">
            {mod?.title ?? "Quiz"}
          </h1>

          {/* Question card */}
          <section className="vw-card p-7 lg:p-9 vw-fade-up" key={qIdx}>
            <h2 className="text-xl lg:text-2xl font-bold text-slate-900 leading-snug mb-7">
              {q.question}
            </h2>

            <div className="space-y-3">
              {q.options.map((choice, i) => {
                const chosen = i === selected;
                const correct = i === q.correctAnswer;

                let cls =
                  "border-slate-200 bg-white hover:border-green-400 hover:bg-green-50/40";
                if (locked) {
                  if (correct) cls = "border-green-500 bg-green-50";
                  else if (chosen) cls = "border-red-400 bg-red-50";
                  else cls = "border-slate-200 bg-white opacity-60";
                } else if (chosen) {
                  cls = "border-green-500 bg-green-50";
                }

                return (
                  <button
                    key={i}
                    disabled={locked}
                    onClick={() => setSelected(i)}
                    className={`w-full flex items-center gap-4 text-left px-5 py-4 rounded-xl border-2 transition ${cls} ${
                      locked ? "cursor-default" : "cursor-pointer"
                    }`}
                  >
                    <span
                      className={`shrink-0 w-8 h-8 rounded-lg border-2 flex items-center justify-center text-sm font-bold ${
                        locked && correct
                          ? "bg-green-600 border-green-600 text-white"
                          : locked && chosen
                            ? "bg-red-500 border-red-500 text-white"
                            : chosen
                              ? "bg-green-600 border-green-600 text-white"
                              : "border-slate-300 text-slate-500"
                      }`}
                    >
                      {locked && correct ? (
                        <Check size={16} strokeWidth={3} />
                      ) : locked && chosen ? (
                        <X size={16} strokeWidth={3} />
                      ) : (
                        String.fromCharCode(65 + i)
                      )}
                    </span>
                    <span className="text-slate-800 leading-relaxed">{choice}</span>
                  </button>
                );
              })}
            </div>

            {/* Feedback */}
            {locked && (
              <div
                role="status"
                className={`mt-6 rounded-xl border-2 p-5 vw-fade-up ${
                  isRight
                    ? "border-green-200 bg-green-50"
                    : "border-amber-200 bg-amber-50"
                }`}
              >
                <p
                  className={`font-bold flex items-center gap-2 ${
                    isRight ? "text-green-900" : "text-amber-900"
                  }`}
                >
                  {isRight ? <Check size={17} /> : <Info size={17} />}
                  {isRight ? "Correct" : `The answer is ${q.options[q.correctAnswer]}`}
                </p>
                {q.explanation && (
                  <p
                    className={`text-sm mt-2 leading-relaxed ${
                      isRight ? "text-green-800" : "text-amber-900/90"
                    }`}
                  >
                    {q.explanation}
                  </p>
                )}
              </div>
            )}

            {/* Actions */}
            <div className="flex items-center justify-between gap-4 mt-8 pt-6 border-t border-slate-100">
              <p className="text-sm text-slate-500">
                {userId ? (
                  <span className="inline-flex items-center gap-1.5">
                    <Trophy size={14} className="text-amber-500" />
                    Score {correctCount}/{totalQ} so far
                  </span>
                ) : (
                  <>
                    <Link href="/signin" className="text-green-700 font-medium hover:underline">
                      Sign in
                    </Link>{" "}
                    to save your score
                  </>
                )}
              </p>

              {!locked ? (
                <button
                  disabled={selected === null}
                  onClick={submitAnswer}
                  className="px-7 py-3 rounded-xl font-semibold text-white transition shadow-sm disabled:bg-slate-300 disabled:shadow-none bg-green-800 hover:bg-green-900 disabled:cursor-not-allowed"
                >
                  Check answer
                </button>
              ) : (
                <button
                  onClick={next}
                  disabled={saving}
                  className="px-7 py-3 rounded-xl font-semibold text-white bg-green-800 hover:bg-green-900 transition shadow-sm disabled:opacity-70"
                >
                  {saving ? "Saving…" : isLast ? "Finish module" : "Next question"}
                </button>
              )}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
