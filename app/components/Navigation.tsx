"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  Menu, X, Home, BookOpen, BarChart3, Users, ScrollText,
  IdCard, Scale, LogOut, ExternalLink, UserSearch, Landmark, ListChecks, MapPin,
} from "lucide-react";

type NavMenuProps = {
  isMenuOpen: boolean;
  toggleMenu: () => void;
  handleLogout?: () => void;
  /** Hide the log-out control on public pages where there is no session. */
  showLogout?: boolean;
  title?: string;
};

const PRIMARY_LINKS = [
  { href: "/landing", label: "Dashboard", icon: Home },
  { href: "/modules", label: "Learning", icon: BookOpen },
  { href: "/leaderboard", label: "Leaderboard", icon: BarChart3 },
];

const CIVIC_LINKS = [
  { href: "/politicians", label: "Who represents you", icon: Users },
  { href: "/candidates", label: "Candidate profiles", icon: UserSearch },
  { href: "/leaders", label: "Who is in office", icon: Landmark },
  { href: "/record", label: "Promises and delivery", icon: ListChecks },
  { href: "/where-to-vote", label: "Where to vote", icon: MapPin },
  { href: "/voter-card", label: "Get registered to vote", icon: IdCard },
  { href: "/rights", label: "Know your rights", icon: Scale },
];

export default function NavMenu({
  isMenuOpen,
  toggleMenu,
  handleLogout,
  showLogout = true,
  title = "VoteWise Kenya",
}: NavMenuProps) {
  const pathname = usePathname();

  // Close the drawer on Escape, and stop the page scrolling behind it.
  useEffect(() => {
    if (!isMenuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") toggleMenu();
    };
    window.addEventListener("keydown", onKey);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [isMenuOpen, toggleMenu]);

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(href + "/");

  const linkClass = (href: string) =>
    `flex items-center gap-3 px-4 py-3 rounded-lg transition font-medium ${
      isActive(href)
        ? "bg-green-50 text-green-800"
        : "text-gray-700 hover:bg-gray-100"
    }`;

  return (
    <>
      <header className="bg-green-800 text-white px-4 sm:px-6 py-4 flex items-center justify-between sticky top-0 z-40">
        <Link href="/landing" className="text-lg sm:text-xl font-bold hover:opacity-90 transition">
          {title}
        </Link>

        {/* Inline links on desktop so the primary sections are one click away. */}
        <nav className="hidden md:flex items-center gap-1">
          {[...PRIMARY_LINKS, ...CIVIC_LINKS].map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`px-3 py-2 rounded-lg text-sm transition ${
                isActive(href)
                  ? "bg-green-900 text-white font-semibold"
                  : "text-green-50 hover:bg-green-700"
              }`}
            >
              {label}
            </Link>
          ))}
        </nav>

        <button
          onClick={toggleMenu}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMenuOpen}
          className="p-2 hover:bg-green-700 rounded-lg transition md:hidden"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </header>

      <div
        role="dialog"
        aria-modal="true"
        aria-hidden={!isMenuOpen}
        className={`md:hidden fixed top-0 right-0 h-full w-72 max-w-[85vw] bg-white shadow-2xl transform transition-transform duration-300 ease-in-out z-50 overflow-y-auto ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-5">
          <button
            onClick={toggleMenu}
            aria-label="Close menu"
            className="absolute text-gray-600 top-4 right-4 p-2 hover:bg-gray-100 rounded-lg"
          >
            <X size={22} />
          </button>

          <nav className="mt-12 space-y-1">
            {PRIMARY_LINKS.map(({ href, label, icon: Icon }) => (
              <Link key={href} href={href} onClick={toggleMenu} className={linkClass(href)}>
                <Icon size={20} />
                <span>{label}</span>
              </Link>
            ))}

            <p className="px-4 pt-5 pb-1 text-xs font-semibold uppercase tracking-wide text-gray-400">
              Civic guide
            </p>
            {CIVIC_LINKS.map(({ href, label, icon: Icon }) => (
              <Link key={href} href={href} onClick={toggleMenu} className={linkClass(href)}>
                <Icon size={20} />
                <span>{label}</span>
              </Link>
            ))}

            <p className="px-4 pt-5 pb-1 text-xs font-semibold uppercase tracking-wide text-gray-400">
              Official sources
            </p>
            <a
              href="https://www.iebc.or.ke/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 transition font-medium"
            >
              <ScrollText size={20} />
              <span className="flex-1">IEBC</span>
              <ExternalLink size={14} className="text-gray-400" />
            </a>

            <a href="/lite" className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 transition font-medium">
              Low-data version (2G)
            </a>

            {showLogout && handleLogout && (
              <button
                onClick={handleLogout}
                className="flex items-center gap-3 px-4 py-3 rounded-lg bg-red-500 text-white hover:bg-red-600 transition w-full mt-6 font-medium"
              >
                <LogOut size={20} />
                <span>Log out</span>
              </button>
            )}
          </nav>
        </div>
      </div>

      {isMenuOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/40 z-40"
          onClick={toggleMenu}
          aria-hidden="true"
        />
      )}
    </>
  );
}
