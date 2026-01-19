"use client";

import React, { useMemo, useState } from "react";
import { X, BookOpen, Search, Filter, Lock } from "lucide-react";
import NavMenu from "../components/Navigation"; 

// Module Card Component
function ModuleCard({
  module,
  onCardClick,
}: {
  module: any;
  onCardClick: (m: any) => void;
}) {
  return (
    <div
      onClick={() => module.status === "available" && onCardClick(module)}
      className={`relative rounded-xl overflow-hidden shadow-lg ${
        module.status === "locked"
          ? "cursor-not-allowed"
          : "cursor-pointer hover:shadow-xl"
      } transition-shadow duration-300`}
    >
      {/* Module Image */}
      <div className="relative h-48 bg-gradient-to-br from-gray-400 to-gray-600">
        {module.image ? (
          <img
            src={module.image}
            alt={module.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full" />
        )}

        {/* Voted Badge */}
        {module.voted && (
          <div className="absolute top-3 left-3 bg-red-600 text-white rounded-full w-12 h-12 flex items-center justify-center shadow-lg">
            <div className="text-center">
              <div className="text-xs font-bold">{module.voted}</div>
              <div className="text-xs">Voted</div>
            </div>
          </div>
        )}

        {/* Lock overlay */}
        {module.status === "locked" && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <div className="text-center text-white">
              <Lock size={48} className="mx-auto mb-2" />
              <p className="font-bold">Coming Soon</p>
            </div>
          </div>
        )}

        {/* Title overlay */}
        {module.status !== "locked" && (
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
            <h3 className="text-white font-bold text-lg">{module.title}</h3>
          </div>
        )}
      </div>

      {/* Locked card bottom */}
      {module.status === "locked" && (
        <div className="bg-white p-4 text-center">
          <p className="text-gray-600 font-medium">{module.title}</p>
        </div>
      )}
    </div>
  );
}

// Module Details Modal
function ModuleDetailsModal({
  module,
  onClose,
  onStart,
}: {
  module: any;
  onClose: () => void;
  onStart: () => void;
}) {
  if (!module) return null;

  return (
    <div className="fixed inset-0 text-black bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl max-w-md w-full p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-lg"
        >
          <X size={20} />
        </button>

        <div className="mb-4">
          {module.image && (
            <img
              src={module.image}
              alt={module.title}
              className="w-full h-32 object-cover rounded-lg mb-4"
            />
          )}
          <h2 className="text-2xl font-bold mb-2">{module.title}</h2>
          {module.description && (
            <p className="text-gray-600 mb-4">{module.description}</p>
          )}
        </div>

        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition font-medium"
          >
            Go back
          </button>
          <button
            onClick={onStart}
            className="flex-1 px-4 py-2 bg-yellow-400 text-black rounded-lg hover:bg-yellow-500 transition font-bold"
          >
            Explore
          </button>
        </div>
      </div>
    </div>
  );
}

export default function VoteWiseLearningModules() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedModule, setSelectedModule] = useState<any>(null);

  const modules = [
    {
      id: 1,
      title: "Introduction to Democracy",
      description:
        "Understand your rights as a voter and why participation matters effectively.",
      image:
        "/images/Intro.jpg",
      voted: 1,
      status: "available",
    },
    {
      id: 2,
      title: "Voter Rights in Kenya",
      description: "Learn the basics of democratic principles and why it matters",
      image:
        "/images/rights.jpg",
      status: "available",
    },
    {
      id: 3,
      title: "Electoral Process",
      description: "Learn how elections are conducted in Kenya",
      image:
        "/images/Intro2.jpg",
      status: "available",
    },
    {
      id: 4,
      title: "Coming Soon",
      description: null,
      image: null,
      status: "locked",
    },
  ];

  const filteredModules = useMemo(() => {
    return modules.filter((m) =>
      m.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const handleLogout = () => {
    console.log("Logging out...");
  };

  const handleModuleClick = (module: any) => setSelectedModule(module);

  const handleStartModule = () => {
    console.log("Starting module:", selectedModule?.title);
    setSelectedModule(null);
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? "bg-gray-900" : "bg-gray-50"}`}>
      {/* ✅ Nav menu goes here (ONCE) */}
      <NavMenu
        isMenuOpen={isMenuOpen}
        toggleMenu={() => setIsMenuOpen((p) => !p)}
        toggleDarkMode={() => setIsDarkMode((p) => !p)}
        handleLogout={handleLogout}
      />

      <main className="max-w-4xl mx-auto p-6">
        <h1
          className={`text-3xl font-bold mb-6 ${
            isDarkMode ? "text-white" : "text-gray-900"
          }`}
        >
          Learning Modules
        </h1>

        {/* Search */}
        <div className="mb-6 flex gap-3">
          <div className="flex-1 relative">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Search modules..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full pl-10 text-black pr-4 py-3 rounded-lg border ${
                isDarkMode
                  ? "bg-gray-800 border-gray-700 text-white"
                  : "bg-white border-gray-300"
              } focus:outline-none focus:ring-2 focus:ring-green-700`}
            />
          </div>

          <button
            className={`p-3 rounded-lg border ${
              isDarkMode
                ? "bg-gray-800 border-gray-700 text-white"
                : "bg-white border-gray-300"
            } hover:bg-gray-100 transition`}
          >
            <Filter size={20} />
          </button>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredModules.map((module) => (
            <ModuleCard
              key={module.id}
              module={module}
              onCardClick={handleModuleClick}
            />
          ))}
        </div>

        {filteredModules.length === 0 && (
          <div className="text-center py-12">
            <BookOpen size={48} className="mx-auto text-gray-400 mb-3" />
            <p className="text-gray-500">No modules found</p>
          </div>
        )}
      </main>

      {selectedModule && (
        <ModuleDetailsModal
          module={selectedModule}
          onClose={() => setSelectedModule(null)}
          onStart={handleStartModule}
        />
      )}

      <footer
        className={`${
          isDarkMode ? "bg-gray-900 text-gray-400" : "bg-black text-white"
        } text-center py-6 mt-12`}
      >
        <p className="text-sm">© 2025 VoteWise Kenya. All rights reserved.</p>
      </footer>
    </div>
  );
}
