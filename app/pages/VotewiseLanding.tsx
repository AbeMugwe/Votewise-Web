'use client';

import React, { useState } from 'react';
import { Trophy, BookOpen, Star, Users, CheckCircle, Zap, Target, Award } from 'lucide-react';

interface Module {
  title: string;
  icon: string;
  topics: number;
  color: string;
}

interface Stat {
  value: string;
  label: string;
}

const VoteWiseLanding: React.FC = () => {
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);

  const speakText = (text: string): void => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "en-GB";
      utterance.rate = 1;
      utterance.pitch = 1;
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      window.speechSynthesis.speak(utterance);
    } else {
      alert("Sorry, your browser does not support Text-to-Speech.");
    }
  };

  const pauseSpeech = (): void => window.speechSynthesis.pause();
  const resumeSpeech = (): void => window.speechSynthesis.resume();
  const stopSpeech = (): void => {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
  };

  const stats: Stat[] = [
    { value: "1000+", label: "Active Learners" },
    { value: "50+", label: "Learning Modules" },
    { value: "25+", label: "Badges to Earn" }
  ];

  const modules: Module[] = [
    { title: "Voter Registration", icon: "📝", topics: 12, color: "border-green-500" },
    { title: "Electoral Process", icon: "🗳️", topics: 15, color: "border-blue-500" },
    { title: "Your Rights", icon: "⚖️", topics: 10, color: "border-purple-500" },
    { title: "Political Systems", icon: "🏛️", topics: 14, color: "border-red-500" },
    { title: "Constitution Basics", icon: "📜", topics: 11, color: "border-yellow-500" },
    { title: "Making Informed Choices", icon: "💡", topics: 13, color: "border-indigo-500" }
  ];

  return (
    <div className="bg-white text-gray-900">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-900 via-green-800 to-green-900 text-white py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
            <span className="text-sm font-medium">🇰🇪 Empowering Kenya's Youth Voters</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
            Learn About Democracy in <span className="text-red-400">Kenya</span>,<br />
            One Game at a Time
          </h1>
          <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
            Master civic education through interactive flashcards, exciting quizzes, and competitive leaderboards. 
            Understand why your vote matters while earning points and badges.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a 
              href="/signin"
              className="bg-white text-green-900 font-semibold px-8 py-3 rounded-lg hover:bg-gray-100 transition shadow-lg"
            >
              Start Learning Now
            </a>
            <a 
              href="/login"
              className="bg-transparent border-2 border-white text-white font-semibold px-8 py-3 rounded-lg hover:bg-white/10 transition"
            >
              Login
            </a>
          </div>
          <div className="mt-12 grid grid-cols-3 gap-6 max-w-2xl mx-auto">
            {stats.map((stat, idx) => (
              <div key={idx} className="text-center">
                <div className="text-3xl font-bold">{stat.value}</div>
                <div className="text-sm text-gray-300">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why VoteWise Section */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              Why <span className="text-red-600">VoteWise Kenya</span>?
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We're making civic education engaging, accessible, and rewarding for Kenya's youth. 
              Understanding democracy shouldn't be boring—it should be an adventure.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl shadow-lg p-8 border-t-4 border-green-600">
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-green-100 p-3 rounded-lg">
                  <Zap className="text-green-600" size={28} />
                </div>
                <h3 className="text-xl font-bold">Gamified Learning</h3>
              </div>
              <p className="text-gray-600">
                Turn civic education into an exciting game. Complete modules, take quizzes, 
                and watch your progress soar as you climb the leaderboard.
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8 border-t-4 border-blue-600">
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-blue-100 p-3 rounded-lg">
                  <Target className="text-blue-600" size={28} />
                </div>
                <h3 className="text-xl font-bold">Bite-Sized Content</h3>
              </div>
              <p className="text-gray-600">
                Learn at your own pace with quick flashcards and short quizzes. 
                Perfect for busy youth who want to stay informed without the overwhelm.
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8 border-t-4 border-purple-600">
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-purple-100 p-3 rounded-lg">
                  <Trophy className="text-purple-600" size={28} />
                </div>
                <h3 className="text-xl font-bold">Competitive Spirit</h3>
              </div>
              <p className="text-gray-600">
                Compete with friends and learners across Kenya. Every point counts 
                as you race to claim the #1 spot on the leaderboard.
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8 border-t-4 border-red-600">
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-red-100 p-3 rounded-lg">
                  <Award className="text-red-600" size={28} />
                </div>
                <h3 className="text-xl font-bold">Real Impact</h3>
              </div>
              <p className="text-gray-600">
                Understand not just how to vote, but why your vote matters. 
                Become an informed citizen ready to shape Kenya's future.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              How <span className="text-red-600">VoteWise Kenya</span> Works
            </h2>
            <p className="text-gray-600">Your journey to becoming an informed voter in 4 simple steps</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl shadow-md p-6 text-center">
              <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow">
                <BookOpen className="text-green-600" size={32} />
              </div>
              <div className="bg-green-600 text-white text-sm font-bold rounded-full w-8 h-8 flex items-center justify-center mx-auto mb-2">
                1
              </div>
              <h4 className="font-bold mb-2 text-lg">Learn with Flashcards</h4>
              <p className="text-gray-600 text-sm">
                Explore interactive flashcards covering election processes, voting rights, 
                and democratic principles.
              </p>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl shadow-md p-6 text-center">
              <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow">
                <CheckCircle className="text-blue-600" size={32} />
              </div>
              <div className="bg-blue-600 text-white text-sm font-bold rounded-full w-8 h-8 flex items-center justify-center mx-auto mb-2">
                2
              </div>
              <h4 className="font-bold mb-2 text-lg">Take Quizzes</h4>
              <p className="text-gray-600 text-sm">
                Test your knowledge with engaging quizzes after each module. 
                Reinforce what you've learned.
              </p>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl shadow-md p-6 text-center">
              <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow">
                <Star className="text-purple-600" size={32} />
              </div>
              <div className="bg-purple-600 text-white text-sm font-bold rounded-full w-8 h-8 flex items-center justify-center mx-auto mb-2">
                3
              </div>
              <h4 className="font-bold mb-2 text-lg">Earn Points & Badges</h4>
              <p className="text-gray-600 text-sm">
                Complete modules to earn points and unlock achievement badges. 
                Show off your civic knowledge!
              </p>
            </div>

            <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-2xl shadow-md p-6 text-center">
              <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow">
                <Users className="text-yellow-600" size={32} />
              </div>
              <div className="bg-yellow-600 text-white text-sm font-bold rounded-full w-8 h-8 flex items-center justify-center mx-auto mb-2">
                4
              </div>
              <h4 className="font-bold mb-2 text-lg">Climb the Leaderboard</h4>
              <p className="text-gray-600 text-sm">
                Compete with others and race to the top. The more you learn, 
                the higher you rank!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Learning Modules Preview */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Explore Our Learning Modules</h2>
            <p className="text-gray-600">
              Comprehensive topics designed to make you an informed and confident voter
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {modules.map((module, idx) => (
              <div key={idx} className={`bg-white rounded-xl shadow-md p-6 border-l-4 ${module.color} hover:shadow-lg transition cursor-pointer`}>
                <div className="text-4xl mb-3">{module.icon}</div>
                <h4 className="font-bold text-lg mb-2">{module.title}</h4>
                <p className="text-gray-600 text-sm mb-3">{module.topics} flashcards • 1 quiz</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">Start Learning →</span>
                  <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full">+{module.topics * 10} pts</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-6 bg-gradient-to-r from-green-900 to-green-700 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Become an Informed Voter?
          </h2>
          <p className="text-xl mb-8 text-gray-200">
            Join thousands of Kenyan youth learning about democracy and making their voices heard.
          </p>
          <a 
            href="/signup"
            className="inline-block bg-white text-green-900 font-bold px-10 py-4 rounded-lg hover:bg-gray-100 transition shadow-xl text-lg"
          >
            Get Started Free
          </a>
        </div>
      </section>

      {/* TTS Controls */}
      <section className="bg-white shadow-lg mx-4 my-6 p-4 rounded-lg">
        <div className="flex items-center justify-between max-w-6xl mx-auto">
          <span className="text-gray-700 font-medium flex items-center gap-2">
            <span className="text-2xl">🔊</span>
            Click to read page aloud
          </span>
          <div className="flex gap-3 items-center">
            <button 
              onClick={() => speakText(document.body.innerText)}
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition font-medium"
              disabled={isSpeaking}
            >
              Play
            </button>
            <button 
              onClick={pauseSpeech}
              className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition"
              title="Pause"
            >
              ⏸
            </button>
            <button 
              onClick={resumeSpeech}
              className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition"
              title="Resume"
            >
              ▶
            </button>
            <button 
              onClick={stopSpeech}
              className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition"
              title="Stop"
            >
              ⏹
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-gray-300 py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-white font-bold text-lg mb-4">VoteWise Kenya</h3>
              <p className="text-sm text-gray-400">
                Empowering youth through gamified civic education
              </p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="/about" className="hover:text-white transition">About Us</a></li>
                <li><a href="/how-it-works" className="hover:text-white transition">How It Works</a></li>
                <li><a href="/modules" className="hover:text-white transition">Modules</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="https://www.iebc.or.ke/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">IEBC Website</a></li>
                <li><a href="https://www.parliament.go.ke/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">Kenya Constitution</a></li>
                <li><a href="https://new.kenyalaw.org/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">Electoral Laws</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="/contact" className="hover:text-white transition">Contact Us</a></li>
                <li><a href="/faq" className="hover:text-white transition">FAQ</a></li>
                <li><a href="/privacy" className="hover:text-white transition">Privacy Policy</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-sm">
            <p>&copy; 2025 VoteWise Kenya. All rights reserved. Empowering democracy, one learner at a time.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default VoteWiseLanding;