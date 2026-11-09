"use client";
import { ReactNode, useState } from "react";
import Link from "next/link";
import { ChevronRight, ShieldCheck } from "lucide-react";
import NavMenu from "@/app/components/Navigation";
import ReadAloud from "./ReadAloud";

/**
 * Shared page frame for the three civic reference sections so they read as one
 * product rather than three bolt-ons. Handles the nav, the hero, the read-aloud
 * control and the provenance footer.
 */
export default function CivicShell({
  eyebrow,
  title,
  intro,
  lastVerified,
  readAloudText,
  children,
  breadcrumb,
  width = "read",
}: {
  eyebrow: string;
  title: string;
  intro: string;
  lastVerified: string;
  readAloudText: string;
  children: ReactNode;
  breadcrumb?: { href: string; label: string };
  /** "read" caps the measure for prose; "wide" suits card grids. */
  width?: "read" | "wide";
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const container = width === "wide" ? "vw-wide" : "max-w-4xl mx-auto px-5 sm:px-6";

  return (
    <div className="min-h-screen bg-gray-50">
      <NavMenu
        isMenuOpen={isMenuOpen}
        toggleMenu={() => setIsMenuOpen((v) => !v)}
        showLogout={false}
      />

      <section className="bg-gradient-to-br from-green-900 via-green-800 to-green-900 text-white">
        <div className={`${container} py-12 sm:py-16`}>
          {breadcrumb && (
            <Link
              href={breadcrumb.href}
              className="inline-flex items-center gap-1 text-green-200 hover:text-white text-sm mb-4 transition"
            >
              <ChevronRight size={14} className="rotate-180" />
              {breadcrumb.label}
            </Link>
          )}

          <span className="inline-block bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-medium mb-4">
            {eyebrow}
          </span>

          <h1 className="text-3xl sm:text-4xl font-bold leading-tight mb-4">{title}</h1>
          <p className="text-green-50/90 text-base sm:text-lg leading-relaxed max-w-3xl">
            {intro}
          </p>
        </div>
      </section>

      <main className={`${container} py-8 sm:py-10 space-y-10`}>
        <ReadAloud text={readAloudText} />
        {children}

        <footer className="border-t border-gray-200 pt-6 pb-4">
          <p className="flex items-start gap-2 text-xs text-gray-500 leading-relaxed">
            <ShieldCheck size={16} className="text-green-700 shrink-0 mt-0.5" />
            <span>
              Content last reviewed <strong className="text-gray-700">{lastVerified}</strong>.
              VoteWise is an independent civic education tool and is not affiliated with the
              IEBC or any political party. Laws and office holders change — always confirm
              against the official sources linked on this page before acting on it.
            </span>
          </p>
        </footer>
      </main>
    </div>
  );
}
