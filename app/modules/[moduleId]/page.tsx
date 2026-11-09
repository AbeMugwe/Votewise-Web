"use client";
import { useState } from "react";
import Link from "next/link";
import { useQuery } from "convex/react";
import { useParams, useSearchParams } from "next/navigation";
import {
  ArrowLeft, Award, BookOpen, CheckCircle2, ClipboardList, Clock,
  Play, RotateCcw, Trophy,
} from "lucide-react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import NavMenu from "@/app/components/Navigation";
import Confetti from "@/app/components/Confetti";
import BookLoader from "@/app/components/BookLoader";
import { isEmojiGlyph } from "@/lib/badgeGlyph";

/**
 * Module overview.
 *
 * Previously rendered inside a hard-coded `width: 390` column — a phone screen
 * centred in a desktop browser. It is now a two-column web layout: the module
 * narrative on the left, and a sticky action rail on the right carrying
 * progress, the badge and the primary call to action.
 */
export default function ModuleOverviewPage() {
  const params = useParams();
  const moduleId = params.moduleId as Id<"modules">;
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // The quiz redirects here with ?completed=1 when it finishes. That is more
  // reliable than document.referrer (which browsers frequently strip) and it
  // can be derived during render instead of from an effect.
  const searchParams = useSearchParams();
  const justCompleted = searchParams.get("completed") === "1";

  const mod = useQuery(api.admin.getModule, { moduleId });
  const flashcards = useQuery(api.admin.getFlashcardsByModule, { moduleId }) ?? [];
  const questions = useQuery(api.admin.getMultipleChoiceByModule, { moduleId }) ?? [];
  const moduleProgressData = useQuery(api.progress.getModuleProgress, { moduleId });

  if (mod === undefined) {
    return (
      <div className="min-h-screen bg-slate-50">
        <NavMenu isMenuOpen={isMenuOpen} toggleMenu={() => setIsMenuOpen((v) => !v)} />
        <div className="flex items-center justify-center py-32">
          <BookLoader text="Loading module…" />
        </div>
      </div>
    );
  }

  if (mod === null) {
    return (
      <div className="min-h-screen bg-slate-50">
        <NavMenu isMenuOpen={isMenuOpen} toggleMenu={() => setIsMenuOpen((v) => !v)} />
        <div className="vw-read py-24 text-center">
          <h1 className="text-2xl font-bold text-slate-900 mb-2">Module not found</h1>
          <p className="text-slate-600 mb-6">
            It may have been unpublished since you last opened this link.
          </p>
          <Link
            href="/modules"
            className="inline-flex items-center gap-2 bg-green-800 text-white px-5 py-2.5 rounded-lg hover:bg-green-900 transition font-medium"
          >
            <ArrowLeft size={16} /> Back to modules
          </Link>
        </div>
      </div>
    );
  }

  const moduleProgress = moduleProgressData?.progress ?? 0;
  const quizComplete = moduleProgressData?.completed ?? false;
  const answeredCorrectly = moduleProgressData?.multipleChoiceCompleted ?? 0;
  const totalQuizQuestions = moduleProgressData?.totalMultipleChoice ?? 0;
  // `completed` only means the quiz was finished, not aced. The badge needs a
  // clean sweep, which is also what makes "Try again" reachable.
  const badgeEarned =
    quizComplete && totalQuizQuestions > 0 && answeredCorrectly === totalQuizQuestions;

  return (
    <div className="min-h-screen bg-slate-50">
      <NavMenu isMenuOpen={isMenuOpen} toggleMenu={() => setIsMenuOpen((v) => !v)} />
      <Confetti active={justCompleted && (moduleProgressData?.completed ?? false)} />

      {/* Hero band */}
      <section className="bg-gradient-to-br from-green-900 via-green-800 to-green-900 text-white">
        <div className="vw-wide py-10 lg:py-14">
          <Link
            href="/modules"
            className="inline-flex items-center gap-1.5 text-green-200 hover:text-white text-sm mb-6 transition"
          >
            <ArrowLeft size={15} /> All modules
          </Link>

          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div className="max-w-3xl">
              {mod.category && (
                <span className="inline-block bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-semibold mb-4">
                  {mod.category}
                </span>
              )}
              <h1 className="text-3xl lg:text-5xl font-bold leading-tight">{mod.title}</h1>
              <p className="text-green-50/90 text-lg mt-4 leading-relaxed">
                {mod.description}
              </p>
            </div>

            <dl className="flex gap-8 shrink-0">
              <div>
                <dt className="text-green-200 text-xs uppercase tracking-wide font-semibold">
                  Flashcards
                </dt>
                <dd className="text-3xl font-bold mt-1">{flashcards.length}</dd>
              </div>
              <div>
                <dt className="text-green-200 text-xs uppercase tracking-wide font-semibold">
                  Questions
                </dt>
                <dd className="text-3xl font-bold mt-1">{questions.length}</dd>
              </div>
              {mod.duration && (
                <div>
                  <dt className="text-green-200 text-xs uppercase tracking-wide font-semibold">
                    Minutes
                  </dt>
                  <dd className="text-3xl font-bold mt-1">{mod.duration}</dd>
                </div>
              )}
            </dl>
          </div>
        </div>
      </section>

      <div className="vw-wide py-10">
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_22rem] gap-8 items-start">
          {/* Main column */}
          <div className="space-y-6">
            <section className="vw-card p-6 lg:p-8">
              <h2 className="text-xl font-bold text-slate-900 mb-5">What you will cover</h2>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="flex gap-4 rounded-xl bg-green-50 border border-green-100 p-5">
                  <span className="shrink-0 w-11 h-11 rounded-xl bg-white flex items-center justify-center shadow-sm">
                    <BookOpen size={20} className="text-green-700" />
                  </span>
                  <div>
                    <p className="font-bold text-slate-900">
                      {flashcards.length} flashcard{flashcards.length !== 1 ? "s" : ""}
                    </p>
                    <p className="text-sm text-slate-600 mt-1 leading-relaxed">
                      Short prompts you reveal at your own pace.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 rounded-xl bg-orange-50 border border-orange-100 p-5">
                  <span className="shrink-0 w-11 h-11 rounded-xl bg-white flex items-center justify-center shadow-sm">
                    <ClipboardList size={20} className="text-orange-600" />
                  </span>
                  <div>
                    <p className="font-bold text-slate-900">
                      {questions.length} quiz question{questions.length !== 1 ? "s" : ""}
                    </p>
                    <p className="text-sm text-slate-600 mt-1 leading-relaxed">
                      Answer them all correctly to earn the badge.
                    </p>
                  </div>
                </div>
              </div>

              {mod.content && (
                <div className="vw-prose mt-6 pt-6 border-t border-slate-100">
                  <p>{mod.content}</p>
                </div>
              )}
            </section>

            {/* Flashcard preview — gives the desktop page something to show */}
            {flashcards.length > 0 && (
              <section className="vw-card p-6 lg:p-8">
                <div className="flex items-center justify-between gap-4 mb-5">
                  <h2 className="text-xl font-bold text-slate-900">In this module</h2>
                  <Link
                    href={`/modules/${moduleId}/flashcards`}
                    className="text-sm font-semibold text-green-700 hover:text-green-900 transition"
                  >
                    Open all {flashcards.length} →
                  </Link>
                </div>

                <ul className="grid sm:grid-cols-2 gap-3">
                  {flashcards.slice(0, 6).map((card, i) => (
                    <li
                      key={card._id}
                      className="flex gap-3 rounded-xl border border-slate-200 bg-slate-50/60 p-4"
                    >
                      <span className="shrink-0 w-6 h-6 rounded-full bg-white border border-slate-200 text-xs font-bold text-slate-500 flex items-center justify-center">
                        {i + 1}
                      </span>
                      <p className="text-sm text-slate-700 leading-relaxed">
                        {card.question}
                      </p>
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </div>

          {/* Sticky action rail */}
          <aside className="lg:sticky lg:top-24 space-y-4">
            <div className="vw-card p-6">
              <div className="flex items-baseline justify-between mb-2">
                <h2 className="font-bold text-slate-900">Your progress</h2>
                <span className="text-2xl font-extrabold text-green-700">
                  {moduleProgress}%
                </span>
              </div>
              <div
                className="h-2.5 rounded-full bg-slate-200 overflow-hidden"
                role="progressbar"
                aria-valuenow={moduleProgress}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label="Module progress"
              >
                <div
                  className="h-full bg-green-600 rounded-full transition-all duration-700"
                  style={{ width: `${moduleProgress}%` }}
                />
              </div>

              <Link
                href={`/modules/${moduleId}/flashcards`}
                className="mt-6 flex items-center justify-center gap-2 w-full py-3.5 rounded-xl bg-green-800 text-white font-semibold hover:bg-green-900 transition shadow-md"
              >
                <Play size={17} />
                {quizComplete ? "Review the module" : moduleProgress > 0 ? "Continue" : "Start learning"}
              </Link>

              {quizComplete && !badgeEarned && (
                <Link
                  href={`/modules/${moduleId}/quiz`}
                  className="mt-3 flex items-center justify-center gap-2 w-full py-3 rounded-xl border-2 border-green-800 text-green-900 font-semibold hover:bg-green-50 transition"
                >
                  <RotateCcw size={16} />
                  Retake the quiz for the badge
                </Link>
              )}
            </div>

            {/* Badge */}
            <div
              className={`vw-card p-6 ${badgeEarned ? "border-amber-300 bg-amber-50/50" : ""}`}
            >
              <h2 className="font-bold text-slate-900 mb-4">Badge</h2>
              <div className="flex items-center gap-4">
                <span
                  className={`shrink-0 w-14 h-14 rounded-full border flex items-center justify-center text-2xl ${
                    badgeEarned
                      ? "bg-amber-100 border-amber-300 shadow-[0_4px_16px_rgba(245,158,11,0.35)]"
                      : "bg-slate-100 border-slate-200 grayscale opacity-60"
                  }`}
                >
                  {isEmojiGlyph(mod.badgeIcon) ? (
                    mod.badgeIcon
                  ) : (
                    <Award size={24} className={badgeEarned ? "text-amber-600" : "text-slate-400"} />
                  )}
                </span>
                <div className="min-w-0">
                  <p className="font-bold text-slate-900 leading-snug">
                    {mod.badgeText ?? `${mod.title} Expert`}
                  </p>
                  <p
                    className={`text-sm mt-0.5 font-medium ${
                      badgeEarned ? "text-green-700" : "text-slate-400"
                    }`}
                  >
                    {badgeEarned ? (
                      <span className="inline-flex items-center gap-1">
                        <CheckCircle2 size={14} /> Earned
                      </span>
                    ) : (
                      "Not earned yet"
                    )}
                  </p>
                </div>
              </div>

              {!badgeEarned && totalQuizQuestions > 0 && (
                <p className="text-xs text-slate-500 mt-4 leading-relaxed">
                  Answer all {totalQuizQuestions} quiz questions correctly to earn this badge.
                </p>
              )}
            </div>

            <div className="vw-card p-6">
              <h2 className="font-bold text-slate-900 mb-3 flex items-center gap-2">
                <Trophy size={17} className="text-amber-500" /> Points
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                Completing this module awards up to <strong>30 points</strong>, scaled by how
                many questions you get right. Points are awarded once per module.
              </p>
              {mod.duration && (
                <p className="flex items-center gap-1.5 text-xs text-slate-400 mt-4 pt-4 border-t border-slate-100">
                  <Clock size={13} /> About {mod.duration} minutes
                </p>
              )}
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
