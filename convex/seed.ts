import { internalMutation, type MutationCtx } from "./_generated/server";
import type { Id } from "./_generated/dataModel";

/**
 * Seed a fresh deployment with demo-ready learning content.
 *
 *     npx convex run seed:seedAll
 *
 * Safe to re-run: it clears the content tables it owns before inserting, so you
 * always end up with exactly this data rather than duplicates. It does NOT
 * touch profiles, user progress or accounts.
 *
 * Registered as an internalMutation so it is not reachable from the public API.
 */

interface SeedFlashcard {
  question: string;
  answer: string;
}

interface SeedQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

interface SeedModule {
  title: string;
  description: string;
  content: string;
  category: string;
  duration: number;
  badgeIcon: string;
  badgeText: string;
  flashcards: SeedFlashcard[];
  questions: SeedQuestion[];
}

const MODULES: SeedModule[] = [
  {
    title: "Your Vote, Your Voice",
    description:
      "Why elections matter, what a secret ballot protects, and what you are actually deciding when you vote.",
    content:
      "An introduction to democratic participation in Kenya and the weight a single vote carries.",
    category: "Foundations",
    duration: 8,
    badgeIcon: "VOTE",
    badgeText: "First Voter",
    flashcards: [
      {
        question: "What does Article 38 of the Constitution guarantee?",
        answer:
          "Political rights — the freedom to make political choices, to form or join a party, to campaign, and for every adult citizen to register as a voter, to vote by secret ballot, and to stand for office.",
      },
      {
        question: "What does a secret ballot actually protect you from?",
        answer:
          "Coercion. Because nobody can prove how you voted, an employer, chief, party official or family member cannot reliably reward or punish your choice.",
      },
      {
        question: "How often are general elections held in Kenya?",
        answer:
          "Every five years, on the second Tuesday of August, under Article 101 of the Constitution.",
      },
      {
        question: "How many ballot papers do you receive at a general election?",
        answer:
          "Six — President, Governor, Senator, Member of the National Assembly, County Woman Representative, and Member of the County Assembly.",
      },
      {
        question: "Does spoiling your ballot count as a protest vote?",
        answer:
          "A spoilt ballot is recorded but does not count towards any candidate. It is counted in the turnout figures but has no effect on who wins.",
      },
    ],
    questions: [
      {
        question: "How many ballot papers does a Kenyan voter receive at a general election?",
        options: ["Three", "Four", "Six", "Eight"],
        correctAnswer: 2,
        explanation:
          "Six: President, Governor, Senator, MP, County Woman Representative and MCA.",
      },
      {
        question: "Which article of the Constitution sets out political rights?",
        options: ["Article 27", "Article 38", "Article 43", "Article 83"],
        correctAnswer: 1,
        explanation:
          "Article 38 covers political rights. Article 83 covers the qualifications for registering as a voter.",
      },
      {
        question: "The main purpose of a secret ballot is to:",
        options: [
          "Speed up counting",
          "Protect voters from coercion",
          "Reduce printing costs",
          "Allow voting by phone",
        ],
        correctAnswer: 1,
        explanation:
          "If nobody can prove how you voted, nobody can reliably threaten or bribe you for it.",
      },
    ],
  },
  {
    title: "Registering to Vote",
    description:
      "Who qualifies, what documents you need, where to go, and how to confirm you are on the register.",
    content: "The practical mechanics of becoming a registered voter in Kenya.",
    category: "Practical",
    duration: 10,
    badgeIcon: "READY",
    badgeText: "Registered",
    flashcards: [
      {
        question: "What is the minimum age to register as a voter in Kenya?",
        answer:
          "Eighteen. You may register as soon as you turn 18 — you do not need to wait for an election year.",
      },
      {
        question: "Which documents are accepted at registration?",
        answer:
          "The ORIGINAL Kenyan national identity card or Kenyan passport. Photocopies, waiting cards and phone photos are not accepted.",
      },
      {
        question: "How much does voter registration cost?",
        answer:
          "Nothing. It is free at every stage. Anyone asking for payment is defrauding you.",
      },
      {
        question: "What is captured during Biometric Voter Registration?",
        answer:
          "Your fingerprints and a facial photograph, along with your name, ID number and assigned polling station.",
      },
      {
        question: "Why does the ward you register in matter?",
        answer:
          "Your ward determines which MCA, MP, Woman Representative, Senator and Governor appear on your ballot. Register where you actually live.",
      },
      {
        question: "What disqualifies someone under Article 83?",
        answer:
          "Not being a citizen, being under 18, being declared of unsound mind by a competent court, or a conviction for an election offence in the preceding five years.",
      },
    ],
    questions: [
      {
        question: "Which document can you use to register as a voter?",
        options: [
          "A photocopy of your ID",
          "An ID waiting card",
          "Your original national ID or passport",
          "A birth certificate",
        ],
        correctAnswer: 2,
        explanation: "Only the original national ID or Kenyan passport is accepted.",
      },
      {
        question: "How much does voter registration cost?",
        options: ["KSh 50", "KSh 200", "It is free", "It depends on the county"],
        correctAnswer: 2,
        explanation: "Registration is free everywhere in Kenya, at every stage.",
      },
      {
        question: "Which of these disqualifies you from registering?",
        options: [
          "Having any criminal record",
          "A conviction for an election offence in the last five years",
          "Living outside your home county",
          "Not belonging to a political party",
        ],
        correctAnswer: 1,
        explanation:
          "Article 83 names an election-offence conviction within five years. A criminal record alone does not disqualify you.",
      },
    ],
  },
  {
    title: "Who You Are Voting For",
    description:
      "The six elective offices, what each one controls, and why blaming the wrong office wastes your leverage.",
    content: "A guide to the six seats on a Kenyan ballot and the powers attached to each.",
    category: "Foundations",
    duration: 12,
    badgeIcon: "CIVIC",
    badgeText: "Ballot Expert",
    flashcards: [
      {
        question: "Who runs county health services, county roads and water?",
        answer:
          "The County Governor, as chief executive of the county government. These are devolved functions under the Fourth Schedule — not national government responsibilities.",
      },
      {
        question: "What is the Senate's main role?",
        answer:
          "Representing counties: it debates Bills concerning counties, determines the allocation of national revenue among them, oversees that money, and tries the impeachment of a Governor.",
      },
      {
        question: "What is a County Woman Representative?",
        answer:
          "A full Member of the National Assembly elected county-wide. There are 47 — one per county — and the seat exists to advance gender balance in Parliament.",
      },
      {
        question: "How many constituency MPs are there in the National Assembly?",
        answer:
          "290 elected from constituencies, plus 47 county woman representatives and 12 nominated members.",
      },
      {
        question: "What does an MCA do?",
        answer:
          "Represents a ward in the county assembly: makes county law, approves the county budget, vets county executive appointments and oversees the county government.",
      },
      {
        question: "How long is a term for every elective office in Kenya?",
        answer: "Five years, for all six offices.",
      },
    ],
    questions: [
      {
        question: "Your local dispensary has no medicine. Whose responsibility is that?",
        options: [
          "The President",
          "Your County Governor",
          "Your Senator",
          "The Chief Justice",
        ],
        correctAnswer: 1,
        explanation:
          "County health services are devolved to county governments, headed by the Governor.",
      },
      {
        question: "Which body determines how national revenue is shared among counties?",
        options: [
          "The National Assembly alone",
          "The Senate",
          "The county assemblies",
          "The Judiciary",
        ],
        correctAnswer: 1,
        explanation:
          "Article 96 gives the Senate the role of determining the allocation of national revenue among counties.",
      },
      {
        question: "How many County Woman Representatives sit in the National Assembly?",
        options: ["12", "47", "290", "68"],
        correctAnswer: 1,
        explanation: "One per county, so 47 in total.",
      },
    ],
  },
  {
    title: "Know Your Rights",
    description:
      "The Bill of Rights in plain language, including the four rights that can never be limited.",
    content: "Chapter Four of the Constitution of Kenya 2010 and how to enforce it.",
    category: "Rights",
    duration: 10,
    badgeIcon: "RIGHTS",
    badgeText: "Rights Defender",
    flashcards: [
      {
        question: "Which four rights can never be limited, even in an emergency?",
        answer:
          "Freedom from torture and cruel, inhuman or degrading treatment; freedom from slavery or servitude; the right to a fair trial; and the right to an order of habeas corpus (Article 25).",
      },
      {
        question: "How long can you be held before being brought to court?",
        answer:
          "Not later than twenty-four hours after arrest, under Article 49 — or the next court day if the 24 hours ends outside ordinary court hours.",
      },
      {
        question: "What does Article 35 give you?",
        answer:
          "The right of access to information held by the State, and to information held by another person that you need to exercise or protect a right.",
      },
      {
        question: "What must happen when you are arrested?",
        answer:
          "You must be told promptly, in a language you understand, why you are being arrested, that you may remain silent, and the consequences of not remaining silent.",
      },
      {
        question: "Who can go to court over a rights violation?",
        answer:
          "Under Article 22, any person — on their own behalf, for someone who cannot act, as a member of a group, in the public interest, or as an association acting for its members.",
      },
      {
        question: "Can a person be denied emergency medical treatment?",
        answer: "No. Article 43(2) states that a person shall not be denied emergency medical treatment.",
      },
    ],
    questions: [
      {
        question: "Within how long must an arrested person be brought before a court?",
        options: ["6 hours", "24 hours", "48 hours", "One week"],
        correctAnswer: 1,
        explanation: "Article 49(1)(f) requires it as soon as reasonably possible, and not later than 24 hours.",
      },
      {
        question: "Which of these rights CAN never be limited?",
        options: [
          "Freedom of movement",
          "The right to property",
          "Freedom from torture",
          "Freedom of assembly",
        ],
        correctAnswer: 2,
        explanation:
          "Article 25 lists freedom from torture among the four non-derogable rights.",
      },
      {
        question: "Under Article 22, who may bring a case about a rights violation?",
        options: [
          "Only the person affected",
          "Only a registered advocate",
          "Any person, including in the public interest",
          "Only the Attorney-General",
        ],
        correctAnswer: 2,
        explanation:
          "Article 22 deliberately opens standing wide, including public-interest litigation.",
      },
    ],
  },
];

const RESOURCES = [
  {
    title: "IEBC",
    description: "Register, verify your details and find your polling station.",
    url: "https://www.iebc.or.ke/",
    type: "link",
    category: "Elections",
  },
  {
    title: "Constitution of Kenya 2010",
    description: "The full text, including the Bill of Rights in Chapter Four.",
    url: "https://new.kenyalaw.org/akn/ke/act/2010/constitution/eng@2010-09-03",
    type: "link",
    category: "Law",
  },
  {
    title: "Parliament of Kenya",
    description: "Look up your MP or Senator and read what they said in the House.",
    url: "http://www.parliament.go.ke/",
    type: "link",
    category: "Government",
  },
  {
    title: "Kenya National Commission on Human Rights",
    description: "Report a human rights violation by a public body.",
    url: "https://www.knchr.org/",
    type: "link",
    category: "Rights",
  },
];

const BADGES = [
  {
    name: "First Steps",
    description: "Completed your first learning module.",
    icon: "START",
    requirement: "Complete 1 module",
    requiredModules: 1,
  },
  {
    name: "Informed Citizen",
    description: "Completed half of the available modules.",
    icon: "LEARN",
    requirement: "Complete 2 modules",
    requiredModules: 2,
  },
  {
    name: "Civic Champion",
    description: "Completed every module in the course.",
    icon: "CHAMPION",
    requirement: "Complete all modules",
    requiredModules: 4,
  },
];

type SeedTable =
  | "modules"
  | "flashcards"
  | "multipleChoiceQuestions"
  | "resources"
  | "badges";

/** Delete every row of a content table this script owns. */
async function clearTable(ctx: MutationCtx, table: SeedTable) {
  const rows = await ctx.db.query(table).collect();
  for (const row of rows) {
    await ctx.db.delete(row._id);
  }
  return rows.length;
}

export const seedAll = internalMutation({
  args: {},
  handler: async (ctx) => {
    // Re-runnable: wipe the content tables this script owns so a second run
    // replaces the data instead of duplicating it. User progress is untouched.
    const removed = {
      multipleChoiceQuestions: await clearTable(ctx, "multipleChoiceQuestions"),
      flashcards: await clearTable(ctx, "flashcards"),
      modules: await clearTable(ctx, "modules"),
      resources: await clearTable(ctx, "resources"),
      badges: await clearTable(ctx, "badges"),
    };

    const now = Date.now();
    let flashcardCount = 0;
    let questionCount = 0;

    for (const [index, mod] of MODULES.entries()) {
      const moduleId: Id<"modules"> = await ctx.db.insert("modules", {
        title: mod.title,
        description: mod.description,
        content: mod.content,
        status: "published",
        order: index + 1,
        duration: mod.duration,
        category: mod.category,
        badgeIcon: mod.badgeIcon,
        badgeText: mod.badgeText,
        isPublished: true,
        createdAt: now,
      });

      for (const [cardIndex, card] of mod.flashcards.entries()) {
        await ctx.db.insert("flashcards", {
          moduleId,
          question: card.question,
          answer: card.answer,
          // Flashcards and questions share one ordered sequence in the mobile
          // lesson player, so flashcards occupy the low orders and questions
          // continue after them.
          order: cardIndex + 1,
          createdAt: now,
        });
        flashcardCount++;
      }

      for (const [qIndex, q] of mod.questions.entries()) {
        await ctx.db.insert("multipleChoiceQuestions", {
          moduleId,
          question: q.question,
          options: q.options,
          correctAnswer: q.correctAnswer,
          explanation: q.explanation,
          order: mod.flashcards.length + qIndex + 1,
          createdAt: now,
        });
        questionCount++;
      }
    }

    for (const [i, resource] of RESOURCES.entries()) {
      await ctx.db.insert("resources", {
        title: resource.title,
        description: resource.description,
        url: resource.url,
        type: resource.type,
        category: resource.category,
        order: i + 1,
        isActive: true,
        createdAt: now,
      });
    }

    for (const badge of BADGES) {
      await ctx.db.insert("badges", { ...badge, createdAt: now });
    }

    return {
      removed,
      inserted: {
        modules: MODULES.length,
        flashcards: flashcardCount,
        questions: questionCount,
        resources: RESOURCES.length,
        badges: BADGES.length,
      },
    };
  },
});
