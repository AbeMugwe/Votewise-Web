"use client";
import { useMemo, useState } from "react";
import Link from "next/link";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { BookOpen, Clock, Lock, PlugZap, Search, ArrowRight } from "lucide-react";
import NavMenu from "../components/Navigation";
import BookLoader from "../components/BookLoader";
import { isBackendConfigured } from "@/lib/convexConfig";
import { isEmojiGlyph, glyphLabel } from "@/lib/badgeGlyph";

export default function ModulesListPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [search, setSearch] = useState("");

  // `undefined` is "still loading"; `[]` is "genuinely empty". Collapsing the
  // two used to leave a loader on screen forever against an empty deployment.
  const allModules = useQuery(api.admin.getModules);
  const isLoading = allModules === undefined && isBackendConfigured;

  const modules = useMemo(() => {
    const published = (allModules ?? []).filter((m) => m.isPublished);
    const q = search.trim().toLowerCase();
    if (!q) return published;
    return published.filter(
      (m) =>
        m.title.toLowerCase().includes(q) ||
        m.description.toLowerCase().includes(q) ||
        (m.category ?? "").toLowerCase().includes(q),
    );
  }, [allModules, search]);

  return (
    <div className="min-h-screen bg-slate-50">
      <NavMenu isMenuOpen={isMenuOpen} toggleMenu={() => setIsMenuOpen((v) => !v)} />

      <section className="bg-gradient-to-br from-green-900 via-green-800 to-green-900 text-white">
        <div className="vw-wide py-10 lg:py-14">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div className="max-w-2xl">
              <h1 className="text-3xl lg:text-4xl font-bold">Learning Modules</h1>
              <p className="text-green-50/90 text-lg mt-3 leading-relaxed">
                Short, gamified lessons on how Kenyan democracy actually works. Complete a
                module to earn points and a badge.
              </p>
            </div>

            <div className="relative w-full lg:w-80 shrink-0">
              <Search
                size={18}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/50"
              />
              <input
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search modules…"
                aria-label="Search modules"
                className="w-full pl-11 pr-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-white/50 backdrop-blur focus:outline-none focus:ring-2 focus:ring-white/40"
              />
            </div>
          </div>
        </div>
      </section>

      <main className="vw-wide py-8 lg:py-10">
        {isLoading && (
          <div className="flex justify-center py-24">
            <BookLoader text="Loading modules…" />
          </div>
        )}

        {!isLoading && modules.length === 0 && (
          <div className="vw-card p-12 text-center max-w-xl mx-auto">
            {!isBackendConfigured ? (
              <>
                <PlugZap size={40} className="mx-auto text-amber-500 mb-4" />
                <h2 className="text-xl font-bold text-slate-900 mb-2">
                  Backend not connected
                </h2>
                <p className="text-slate-600 leading-relaxed">
                  Learning modules are served from Convex. Set{" "}
                  <code className="bg-slate-100 px-1.5 py-0.5 rounded text-sm">
                    NEXT_PUBLIC_CONVEX_URL
                  </code>{" "}
                  and seed the content to see them here.
                </p>
              </>
            ) : search.trim() ? (
              <>
                <Search size={40} className="mx-auto text-slate-300 mb-4" />
                <h2 className="text-xl font-bold text-slate-900 mb-2">No match</h2>
                <p className="text-slate-600">
                  Nothing matches &ldquo;{search}&rdquo;.
                </p>
              </>
            ) : (
              <>
                <BookOpen size={40} className="mx-auto text-slate-300 mb-4" />
                <h2 className="text-xl font-bold text-slate-900 mb-2">
                  No modules published yet
                </h2>
                <p className="text-slate-600">
                  Once modules are published they will appear here.
                </p>
              </>
            )}

            <Link
              href="/politicians"
              className="inline-flex items-center gap-2 mt-6 bg-green-800 text-white px-6 py-3 rounded-xl hover:bg-green-900 transition font-semibold"
            >
              Browse the civic guide <ArrowRight size={16} />
            </Link>
          </div>
        )}

        {modules.length > 0 && (
          <>
            <p className="text-sm text-slate-500 mb-5">
              {modules.length} module{modules.length !== 1 ? "s" : ""}
              {search.trim() && ` matching “${search}”`}
            </p>

            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {modules.map((mod) => {
                const locked = mod.status === "locked";
                const comingSoon = mod.status === "coming_soon";
                const unavailable = locked || comingSoon;

                const inner = (
                  <>
                    {mod.imageUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={mod.imageUrl}
                        alt=""
                        className="w-full h-40 object-cover"
                      />
                    ) : (
                      <div className="relative h-40 bg-gradient-to-br from-green-900 via-green-800 to-green-600 flex items-center justify-center overflow-hidden">
                        {/* Soft radial wash so the flat gradient has some depth. */}
                        <span
                          aria-hidden="true"
                          className="absolute -right-8 -top-10 w-40 h-40 rounded-full bg-white/10 blur-2xl"
                        />
                        {isEmojiGlyph(mod.badgeIcon) ? (
                          <span className="text-5xl relative" aria-hidden="true">
                            {mod.badgeIcon}
                          </span>
                        ) : (
                          <BookOpen
                            size={40}
                            className="text-white/85 relative"
                            aria-hidden="true"
                          />
                        )}
                        {glyphLabel(mod.badgeIcon) && (
                          <span className="absolute bottom-3 left-4 text-[10px] font-bold tracking-[0.18em] text-white/70">
                            {glyphLabel(mod.badgeIcon)}
                          </span>
                        )}
                      </div>
                    )}

                    <div className="p-6 flex flex-col flex-1">
                      <div className="flex items-center gap-2 mb-2 flex-wrap">
                        {mod.category && (
                          <span className="text-[11px] font-bold uppercase tracking-wide text-green-700">
                            {mod.category}
                          </span>
                        )}
                        {comingSoon && (
                          <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800">
                            Coming soon
                          </span>
                        )}
                        {locked && (
                          <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                            <Lock size={10} /> Locked
                          </span>
                        )}
                      </div>

                      <h2 className="text-lg font-bold text-slate-900 leading-snug mb-2">
                        {mod.title}
                      </h2>
                      <p className="text-sm text-slate-600 leading-relaxed flex-1">
                        {mod.description}
                      </p>

                      <div className="flex items-center justify-between gap-3 mt-5 pt-4 border-t border-slate-100">
                        <span className="inline-flex items-center gap-1.5 text-xs text-slate-400">
                          {mod.duration ? (
                            <>
                              <Clock size={13} /> {mod.duration} min
                            </>
                          ) : (
                            <>
                              <BookOpen size={13} /> Self-paced
                            </>
                          )}
                        </span>
                        <span
                          className={`inline-flex items-center gap-1 text-sm font-bold ${
                            unavailable ? "text-slate-400" : "text-green-800"
                          }`}
                        >
                          {locked ? "Locked" : comingSoon ? "Soon" : "Explore"}
                          {!unavailable && <ArrowRight size={14} />}
                        </span>
                      </div>
                    </div>
                  </>
                );

                const shell = "vw-card overflow-hidden flex flex-col";

                // Unavailable modules are not destinations — render them inert
                // so they cannot be reached by click, keyboard or a URL guess.
                return unavailable ? (
                  <div
                    key={mod._id}
                    className={`${shell} opacity-65`}
                    aria-disabled="true"
                  >
                    {inner}
                  </div>
                ) : (
                  <Link
                    key={mod._id}
                    href={`/modules/${mod._id}`}
                    className={`${shell} vw-card-hover`}
                  >
                    {inner}
                  </Link>
                );
              })}
            </div>
          </>
        )}
      </main>
    </div>
  );
}
