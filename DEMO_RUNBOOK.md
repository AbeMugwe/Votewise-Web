# VoteWise Kenya demo runbook

## Demo account

- Email: `demo.votewise.20260903@example.com`
- Password: `VoteWiseDemo2026!`
- Backend: Convex development deployment `polite-hornet-266`

This account is for the development demo only. Do not reuse its password for any other service.

## Recommended recording path

Target length: 2 minutes 30 seconds to 3 minutes.

1. Open `/home` and introduce VoteWise Kenya as a free, non-partisan civic-learning product.
2. Open **Who represents you**. Show the six elective offices and open the President page to demonstrate responsibilities, limits, term, ballot colour, and constitutional source.
3. Return to **Who represents you** and use the county finder. Explain that candidate lists must come from the IEBC after formal nomination; VoteWise never invents candidate names.
4. Open **Get registered to vote**. Run the eligibility check and show the document and registration steps.
5. Open **Know your rights**. Expand one right and demonstrate the read-aloud control.
6. Sign in with the demo account and show the four learning modules.
7. Open **Your Vote, Your Voice**, reveal a flashcard, and answer a quiz question.
8. Return to the dashboard to show synchronized progress, points, badges, and leaderboard ranking.
9. Show the same account on mobile and confirm that the progress is shared through Convex.

## Voice-over script

“VoteWise Kenya helps young voters move from political interest to informed participation.

The public civic guide works without an account. It explains every office on Kenya’s six-ballot general-election system, including what each representative controls and what falls outside their mandate. Current national office holders are dated and linked to official sources, while local candidate information is clearly marked for verification through the IEBC.

The registration guide turns voter registration into a simple checklist. A user can check basic eligibility, see which original document to carry, understand why their ward matters, and follow an official link to verify their registration.

The rights guide translates Kenya’s Bill of Rights into plain language. It includes practical examples, constitutional references, reporting channels, and read-aloud support for accessibility.

Registered learners can go further through short flashcards and quizzes. Their progress, points, badges, and leaderboard position are stored in one shared Convex backend, so learning started on the web can continue on mobile.

VoteWise Kenya is independent, free, non-partisan, and designed to help every voter understand the power attached to every mark on the ballot.”

## Recording notes

- Use a clean 1280×720 or 1920×1080 browser window at 100% zoom.
- Record the web flow first, then add a short phone capture for the shared-progress handoff.
- Keep the cursor still while speaking and move it only immediately before an interaction.
- Do not show the Convex dashboard, environment files, browser developer tools, or passwords in the final video.
- Use the seeded development data; do not improvise politician or candidate names.

## Local start commands

Web:

```powershell
cd Votewise-Web
npm install
npx convex dev
npm run dev
```

Mobile, in a second terminal:

```powershell
cd votewise
npm install
npx expo start
```

