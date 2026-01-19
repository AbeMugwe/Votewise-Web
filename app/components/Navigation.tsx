"use client";
import {
  Menu, X, Home, BookOpen, BarChart3, User, Settings,
  Moon, HelpCircle, Users, LogOut
} from "lucide-react";

type SidebarMenuProps = {
  isMenuOpen: boolean;
  toggleMenu: () => void;
  toggleDarkMode: () => void;
  handleLogout: () => void;
  title?: string; // optional: "VoteWise Kenya"
};

export default function NavMenu({
  isMenuOpen,
  toggleMenu,
  toggleDarkMode,
  handleLogout,
  title = "VoteWise Kenya",
}: SidebarMenuProps) {
  return (
    <>
      {/* Header */}
      <header className="bg-green-800 text-white px-6 py-4 flex items-center justify-between sticky top-0 z-40">
        <h1 className="text-xl font-bold">{title}</h1>
        <button
          onClick={toggleMenu}
          className="p-2 hover:bg-green-700 rounded-lg transition"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </header>

      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-white shadow-2xl transform transition-transform duration-300 ease-in-out z-50 ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-6">
          <button
            onClick={toggleMenu}
            className="absolute text-black top-4 right-4 p-2 hover:bg-gray-100 rounded-lg"
          >
            <X size={24} />
          </button>

          <nav className="mt-12 space-y-2">
            <a href="/landing" className="flex text-black items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-100 transition">
              <Home size={20} />
              <span className="font-medium">Dashboard</span>
            </a>

            <a href="#" className="flex text-black items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-100 transition">
              <BookOpen size={20} />
              <span className="font-medium">Learning</span>
            </a>

            <a href="#" className="flex text-black items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-100 transition">
              <BarChart3 size={20} />
              <span className="font-medium">Leaderboard</span>
            </a>

            <a href="#" className="flex text-black items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-100 transition">
              <User size={20} />
              <span className="font-medium">Your Profile</span>
            </a>

            <a href="#" className="flex text-black items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-100 transition">
              <Settings size={20} />
              <span className="font-medium">Settings</span>
            </a>

            <button
              onClick={toggleDarkMode}
              className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-100 transition w-full text-left text-black"
            >
              <Moon size={20} />
              <span className="font-medium">Dark Mode</span>
            </button>

            <a href="#" className="flex text-black items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-100 transition">
              <HelpCircle size={20} />
              <span className="font-medium">Help</span>
            </a>

            <a href="#" className="flex text-black items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-100 transition">
              <Users size={20} />
              <span className="font-medium">About Us</span>
            </a>

            <button
              onClick={handleLogout}
              className="flex items-center gap-3 px-4 py-3 rounded-lg bg-red-500 text-white hover:bg-red-600 transition w-full mt-4"
            >
              <LogOut size={20} />
              <span className="font-medium">Log out</span>
            </button>
          </nav>
        </div>
      </div>

      {/* Overlay */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40"
          onClick={toggleMenu}
        />
      )}
    </>
  );
}
