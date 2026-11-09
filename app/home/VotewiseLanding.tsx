'use client';

import React from 'react';
import Link from 'next/link';
import {
  Trophy, BookOpen, Star, Users, CheckCircle, Zap, Target, Award,
  IdCard, Scale, Building2, ArrowRight, ExternalLink,
} from 'lucide-react';
import ReadAloud from '@/app/components/civic/ReadAloud';
import { ELECTIVE_OFFICES } from '@/content/civic/offices';
import { COUNTIES } from '@/content/civic/politicians';

/**
 * Marketing / entry page.
 *
 * The stat strip previously advertised "1000+ Active Learners", "50+ Learning
 * Modules" and "25+ Badges" — none of which were true. Claims on a public
 * landing page have to be things we can stand behind, so these are now derived
 * from the actual content or are plainly verifiable facts.
 */

interface Stat {
  value: string;
  label: string;
}

const stats: Stat[] = [
  { value: String(ELECTIVE_OFFICES.length), label: 'Offices explained' },
  { value: String(COUNTIES.length), label: 'Counties covered' },
  { value: 'Free', label: 'Always, no ads' },
];

const civicGuides = [
  {
    href: '/politicians',
    icon: Building2,
    title: 'Who represents you',
    body: 'Six ballot papers, six different jobs. See what each office actually controls — and what it does not.',
    border: 'border-green-600',
    chip: 'bg-green-50 text-green-700',
  },
  {
    href: '/voter-card',
    icon: IdCard,
    title: 'Get registered to vote',
    body: 'Who qualifies, what to bring, where to go, and how to confirm you are on the register. Registration is free.',
    border: 'border-blue-600',
    chip: 'bg-blue-50 text-blue-700',
  },
  {
    href: '/rights',
    icon: Scale,
    title: 'Know your rights',
    body: 'The Bill of Rights in plain language — including the four rights that can never be taken away, in any circumstance.',
    border: 'border-purple-600',
    chip: 'bg-purple-50 text-purple-700',
  },
];

const spokenIntro =
  'VoteWise Kenya. Learn about democracy in Kenya, one game at a time. ' +
  'Master civic education through interactive flashcards, quizzes and leaderboards. ' +
  'Find out who represents you, how to register as a voter, and what your rights are ' +
  'under the Constitution of Kenya.';

const VoteWiseLanding: React.FC = () => {
  return (
    <div className="bg-white text-gray-900">
      {/* Hero */}
      <section className="bg-gradient-to-br from-green-900 via-green-800 to-green-900 text-white py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
            <span className="text-sm font-medium">Built for Kenya&rsquo;s youth voters</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
            Learn About Democracy in <span className="text-red-400">Kenya</span>,<br />
            One Game at a Time
          </h1>
          <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
            Master civic education through interactive flashcards, quizzes and leaderboards.
            Understand why your vote matters — and exactly who you are voting for.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/signup"
              className="bg-white text-green-900 font-semibold px-8 py-3 rounded-lg hover:bg-gray-100 transition shadow-lg"
            >
              Start Learning Now
            </Link>
            <Link
              href="/signin"
              className="bg-transparent border-2 border-white text-white font-semibold px-8 py-3 rounded-lg hover:bg-white/10 transition"
            >
              Log in
            </Link>
          </div>

          <div className="mt-12 grid grid-cols-3 gap-6 max-w-2xl mx-auto">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl font-bold">{stat.value}</div>
                <div className="text-sm text-gray-300">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Civic guide — no sign-in required */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-4">
            <span className="inline-block bg-green-100 text-green-800 text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wide">
              No account needed
            </span>
          </div>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Start here — the civic guide</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Three reference sections, free and open to everyone. No sign-up, no tracking,
              and every claim linked back to the Constitution or the IEBC.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {civicGuides.map(({ href, icon: Icon, title, body, border, chip }) => (
              <Link
                key={href}
                href={href}
                className={`group bg-white rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all p-7 border-t-4 ${border}`}
              >
                <div className={`inline-flex p-3 rounded-xl mb-4 ${chip}`}>
                  <Icon size={28} />
                </div>
                <h3 className="text-xl font-bold mb-2">{title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">{body}</p>
                <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-green-700">
                  Open guide
                  <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why VoteWise */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              Why <span className="text-red-600">VoteWise Kenya</span>?
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We&rsquo;re making civic education engaging, accessible and rewarding for Kenya&rsquo;s
              youth. Understanding democracy shouldn&rsquo;t be boring — it should be an adventure.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/*
              Class names are written out in full rather than interpolated —
              Tailwind extracts classes statically, so `border-${colour}-600`
              would never be generated and the cards would lose their colour.
            */}
            {[
              { Icon: Zap, border: 'border-green-600', chip: 'bg-green-100', text: 'text-green-600', title: 'Gamified Learning', body: 'Turn civic education into a game. Complete modules, take quizzes, and watch your progress climb the leaderboard.' },
              { Icon: Target, border: 'border-blue-600', chip: 'bg-blue-100', text: 'text-blue-600', title: 'Bite-Sized Content', body: 'Learn at your own pace with quick flashcards and short quizzes. Built for busy people who want to stay informed.' },
              { Icon: Trophy, border: 'border-purple-600', chip: 'bg-purple-100', text: 'text-purple-600', title: 'Competitive Spirit', body: 'Compete with friends and learners across Kenya. Every point counts as you race for the top spot.' },
              { Icon: Award, border: 'border-red-600', chip: 'bg-red-100', text: 'text-red-600', title: 'Real Impact', body: 'Understand not just how to vote, but why your vote matters. Become a citizen ready to shape Kenya’s future.' },
            ].map(({ Icon, border, chip, text, title, body }) => (
              <div
                key={title}
                className={`bg-white rounded-2xl shadow-lg p-8 border-t-4 ${border}`}
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className={`${chip} p-3 rounded-lg`}>
                    <Icon className={text} size={28} />
                  </div>
                  <h3 className="text-xl font-bold">{title}</h3>
                </div>
                <p className="text-gray-600">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              How <span className="text-red-600">VoteWise Kenya</span> Works
            </h2>
            <p className="text-gray-600">Your journey to becoming an informed voter in four steps</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { Icon: BookOpen, n: 1, from: 'from-green-50', to: 'to-green-100', text: 'text-green-600', bg: 'bg-green-600', title: 'Learn with Flashcards', body: 'Explore flashcards covering election processes, voting rights and democratic principles.' },
              { Icon: CheckCircle, n: 2, from: 'from-blue-50', to: 'to-blue-100', text: 'text-blue-600', bg: 'bg-blue-600', title: 'Take Quizzes', body: 'Test your knowledge after each module and reinforce what you have learned.' },
              { Icon: Star, n: 3, from: 'from-purple-50', to: 'to-purple-100', text: 'text-purple-600', bg: 'bg-purple-600', title: 'Earn Points & Badges', body: 'Complete modules to earn points and unlock achievement badges.' },
              { Icon: Users, n: 4, from: 'from-yellow-50', to: 'to-yellow-100', text: 'text-yellow-600', bg: 'bg-yellow-600', title: 'Climb the Leaderboard', body: 'Compete with others and race to the top. The more you learn, the higher you rank.' },
            ].map(({ Icon, n, from, to, text, bg, title, body }) => (
              <div key={n} className={`bg-gradient-to-br ${from} ${to} rounded-2xl shadow-md p-6 text-center`}>
                <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow">
                  <Icon className={text} size={32} />
                </div>
                <div className={`${bg} text-white text-sm font-bold rounded-full w-8 h-8 flex items-center justify-center mx-auto mb-2`}>
                  {n}
                </div>
                <h4 className="font-bold mb-2 text-lg">{title}</h4>
                <p className="text-gray-600 text-sm">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The six offices */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Know every name on your ballot</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              A Kenyan general election hands you six ballot papers. Most voters recognise
              one. Here are all six.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {ELECTIVE_OFFICES.map((office) => (
              <Link
                key={office.id}
                href={`/politicians/${office.id}`}
                className="group bg-white rounded-xl shadow-md p-6 border-l-4 hover:shadow-lg transition"
                style={{ borderLeftColor: office.accent }}
              >
                <div className="text-4xl mb-3" aria-hidden="true">{office.icon}</div>
                <h4 className="font-bold text-lg mb-2 group-hover:text-green-800 transition">
                  {office.title}
                </h4>
                <p className="text-gray-600 text-sm mb-3 leading-relaxed">{office.oneLiner}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500 inline-flex items-center gap-1">
                    What they control
                    <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
                  </span>
                  <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full">
                    {office.termYears}-year term
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-6 bg-gradient-to-r from-green-900 to-green-700 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Become an Informed Voter?
          </h2>
          <p className="text-xl mb-8 text-gray-200">
            Create a free account to track your progress, earn badges and climb the leaderboard.
          </p>
          <Link
            href="/signup"
            className="inline-block bg-white text-green-900 font-bold px-10 py-4 rounded-lg hover:bg-gray-100 transition shadow-xl text-lg"
          >
            Get Started Free
          </Link>
        </div>
      </section>

      {/* Listen */}
      <section className="max-w-6xl mx-auto px-6 my-8">
        <ReadAloud text={spokenIntro} label="New here? Listen to the introduction" />
      </section>

      {/* Footer */}
      <footer className="bg-black text-gray-300 py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-white font-bold text-lg mb-4">VoteWise Kenya</h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                Empowering youth through gamified civic education. Independent, free, and not
                affiliated with the IEBC or any political party.
              </p>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Civic guide</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/politicians" className="hover:text-white transition">Who represents you</Link></li>
                <li><Link href="/voter-card" className="hover:text-white transition">Get registered to vote</Link></li>
                <li><Link href="/rights" className="hover:text-white transition">Know your rights</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Learn</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/modules" className="hover:text-white transition">Modules</Link></li>
                <li><Link href="/leaderboard" className="hover:text-white transition">Leaderboard</Link></li>
                <li><Link href="/signup" className="hover:text-white transition">Create an account</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Official sources</h4>
              <ul className="space-y-2 text-sm">
                {[
                  { label: 'IEBC', url: 'https://www.iebc.or.ke/' },
                  { label: 'Parliament of Kenya', url: 'http://www.parliament.go.ke/' },
                  { label: 'Constitution (Kenya Law)', url: 'https://new.kenyalaw.org/akn/ke/act/2010/constitution/eng@2010-09-03' },
                ].map((l) => (
                  <li key={l.url}>
                    <a
                      href={l.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-white transition inline-flex items-center gap-1.5"
                    >
                      {l.label}
                      <ExternalLink size={11} className="text-gray-500" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 text-center text-sm">
            <p>&copy; {new Date().getFullYear()} VoteWise Kenya. Empowering democracy, one learner at a time.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default VoteWiseLanding;
