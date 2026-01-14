"use client";
import React, { useState } from 'react';
import { Menu, X, Home, BookOpen, BarChart3, User, Settings, Moon, HelpCircle, Users, LogOut, Trophy, Award } from 'lucide-react';

export default function VoteWiseDashboard() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const user = {
    name: "John Doe",
    points: 0,
    rank: "Not ranked yet",
    badgesEarned: 0
  };

  const resources = [
    "IEBC Website",
    "Kenya Constitution",
    "Electoral Laws"
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleLogout = () => {
    console.log("Logging out...");
    // Add logout logic here
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Header */}
      <header className="bg-green-800 text-white px-6 py-4 flex items-center justify-between sticky top-0 z-40">
        <h1 className="text-xl font-bold">VoteWise Kenya</h1>
        <button 
          onClick={toggleMenu}
          className="p-2 hover:bg-green-700 rounded-lg transition"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </header>

      {/* Sidebar Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-white shadow-2xl transform transition-transform duration-300 ease-in-out z-50 ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="p-6">
          <button 
            onClick={toggleMenu}
            className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-lg"
          >
            <X size={24} />
          </button>

          <nav className="mt-12 space-y-2">
            <a href="#" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-100 transition">
              <Home size={20} />
              <span className="font-medium">Dashboard</span>
            </a>

            <a href="#" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-100 transition">
              <BookOpen size={20} />
              <span className="font-medium">Learning</span>
            </a>

            <a href="#" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-100 transition">
              <BarChart3 size={20} />
              <span className="font-medium">Leaderboard</span>
            </a>

            <a href="#" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-100 transition">
              <User size={20} />
              <span className="font-medium">Your Profile</span>
            </a>

            <a href="#" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-100 transition">
              <Settings size={20} />
              <span className="font-medium">Settings</span>
            </a>

            <button 
              onClick={toggleDarkMode}
              className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-100 transition w-full text-left"
            >
              <Moon size={20} />
              <span className="font-medium">Dark Mode</span>
            </button>

            <a href="#" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-100 transition">
              <HelpCircle size={20} />
              <span className="font-medium">Help</span>
            </a>

            <a href="#" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-100 transition">
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
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={toggleMenu}
        ></div>
      )}

      {/* Main Content */}
      <main className="max-w-2xl mx-auto p-6 space-y-6">
        {/* Welcome Card */}
        <div className="bg-gradient-to-r from-green-700 to-green-600 rounded-xl p-6 text-white shadow-lg">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-1">Welcome back,</h2>
              <h3 className="text-2xl font-bold mb-2">{user.name}!</h3>
              <p className="text-green-100 text-sm">Start your learning journey</p>
            </div>
            <div className="bg-green-800 rounded-lg px-5 py-3 text-center w-24 shadow-md">
                <div className="text-white text-3xl font-extrabold leading-none">
                {user.points}
                </div>
                <div className="text-white/90 text-xs mt-1">
                Points
                </div>
            </div>

          </div>
        </div>

        {/* Learning Progress */}
        <div className={`${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white'} rounded-xl p-6 shadow-md`}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg text-black font-bold">Your Learning Progress</h3>
            <span className="text-sm text-gray-500">0 out of 0 modules completed</span>
          </div>
          
          {/* Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
            <div className="bg-green-600 h-2 rounded-full" style={{width: '0%'}}></div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-4 bg-yellow-50 rounded-lg">
              <Trophy className="mx-auto mb-2 text-yellow-600" size={32} />
              <div className="font-semibold text-black text-sm mb-1">Your Rank</div>
              <div className="text-yellow-600 font-bold">{user.rank}</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <Award className="mx-auto mb-2 text-purple-600" size={32} />
              <div className="font-semibold text-black text-sm mb-1">Badges Earned</div>
              <div className="text-purple-600 font-bold text-2xl">{user.badgesEarned}</div>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className={`${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white'} rounded-xl p-6 shadow-md`}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg text-black font-bold">Recent Activity</h3>
            <a href="#" className="text-green-700 text-sm font-medium hover:underline">
              View All Activities
            </a>
          </div>
          
          {/* Empty State */}
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-gray-100 rounded-lg mx-auto mb-3 flex items-center justify-center">
              <BookOpen size={32} className="text-gray-400" />
            </div>
            <p className="text-gray-500 mb-4">No recent activity</p>
            <button className="bg-green-800 text-white px-6 py-2 rounded-lg hover:bg-green-900 transition font-medium">
              Start Learning
            </button>
          </div>
        </div>

        {/* Your Badges */}
        <div className={`${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white'} rounded-xl p-6 shadow-md`}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg text-black font-bold">Your Badges</h3>
            <a href="#" className="text-green-700 text-sm font-medium hover:underline">
              View All
            </a>
          </div>
          
          {/* Empty State */}
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-gray-100 rounded-full mx-auto mb-3 flex items-center justify-center">
              <Award size={32} className="text-gray-400" />
            </div>
            <p className="text-gray-400 text-sm">Complete modules to earn badges</p>
          </div>
        </div>

        {/* Resources */}
        <div className={`${isDarkMode ? 'bg-gray-800 text-black' : 'bg-white'} rounded-xl p-6 shadow-md`}>
          <h3 className="text-lg text-black font-bold mb-4">Resources To Check</h3>
          <ul className="space-y-3 text-black">
            {resources.map((resource, index) => (
              <li key={index}>
                <a 
                  href="#" 
                  className={`block ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-200'} p-3 rounded-lg transition`}
                >
                  {resource}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </main>

      {/* Footer */}
      <footer className={`${isDarkMode ? 'bg-gray-900 text-gray-400' : 'bg-black text-white'} text-center py-6 mt-12`}>
        <p className="text-sm">© 2025 VoteWise Kenya. All rights reserved.</p>
      </footer>
    </div>
  );
}