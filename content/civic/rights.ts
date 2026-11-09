/**
 * Basic human rights — Chapter Four (Bill of Rights) of the Constitution of
 * Kenya 2010, mapped to the Universal Declaration of Human Rights.
 *
 * Framework-free content module shared by the Next.js web app and the Expo
 * mobile app. Keep it free of React/DOM/RN imports so both bundlers can use it.
 */

export const RIGHTS_LAST_VERIFIED = "2026-09-03";

export const RIGHTS_INTRO =
  "Chapter Four of the Constitution of Kenya 2010 is the Bill of Rights. It is not a " +
  "list of favours the government grants you — Article 19 says these rights belong to " +
  "each person by virtue of being human, and the State's job is to observe, respect, " +
  "protect, promote and fulfil them. Every right below is enforceable in court.";

/** Rights that may never be limited, even in a state of emergency (Art. 25). */
export const NON_DEROGABLE_INTRO =
  "Most rights can be limited by law, but only where the limit is reasonable and " +
  "justifiable in an open and democratic society. Four rights can never be limited " +
  "for any reason whatsoever:";

export interface RightEntry {
  /** Constitutional article number, e.g. "38". */
  article: string;
  title: string;
  /** Plain-language summary — this is the part most people actually read. */
  summary: string;
  /** Concrete, everyday illustration of the right in practice. */
  inPractice?: string;
  /** Corresponding UDHR article, for the international frame. */
  udhr?: string;
}

export interface RightsCategory {
  id: string;
  title: string;
  /** One line explaining what ties this group together. */
  blurb: string;
  /** Emoji used as a lightweight icon on both platforms. */
  icon: string;
  rights: RightEntry[];
}

export const NON_DEROGABLE: RightEntry[] = [
  {
    article: "25(a)",
    title: "Freedom from torture and cruel, inhuman or degrading treatment",
    summary:
      "No circumstance — not war, not a state of emergency, not a criminal investigation — permits torture or degrading treatment.",
    udhr: "Article 5",
  },
  {
    article: "25(b)",
    title: "Freedom from slavery or servitude",
    summary: "No person may be held in slavery or servitude.",
    udhr: "Article 4",
  },
  {
    article: "25(c)",
    title: "The right to a fair trial",
    summary:
      "The guarantees of a fair hearing cannot be suspended, however serious the accusation.",
    udhr: "Articles 10 and 11",
  },
  {
    article: "25(d)",
    title: "The right to an order of habeas corpus",
    summary:
      "You can always ask a court to require that a detained person be produced and their detention justified.",
    udhr: "Article 9",
  },
];

export const RIGHTS_CATEGORIES: RightsCategory[] = [
  {
    id: "dignity",
    title: "Life, dignity and equality",
    blurb: "The floor beneath every other right.",
    icon: "01",
    rights: [
      {
        article: "26",
        title: "Right to life",
        summary:
          "Every person has the right to life, and it begins at conception. A person shall not be deprived of life intentionally, except as expressly authorised by the Constitution or other written law.",
        udhr: "Article 3",
      },
      {
        article: "27",
        title: "Equality and freedom from discrimination",
        summary:
          "Everyone is equal before the law. The State may not discriminate directly or indirectly on any ground including race, sex, pregnancy, marital status, health status, ethnic or social origin, colour, age, disability, religion, conscience, belief, culture, dress, language or birth.",
        inPractice:
          "Not more than two-thirds of the members of elective or appointive public bodies may be of the same gender.",
        udhr: "Articles 1, 2 and 7",
      },
      {
        article: "28",
        title: "Human dignity",
        summary:
          "Every person has inherent dignity and the right to have that dignity respected and protected.",
        udhr: "Article 1",
      },
      {
        article: "29",
        title: "Freedom and security of the person",
        summary:
          "You may not be deprived of freedom arbitrarily, detained without trial, subjected to violence from public or private sources, tortured, or punished in a cruel or degrading manner.",
        udhr: "Articles 3 and 5",
      },
      {
        article: "30",
        title: "Freedom from slavery, servitude and forced labour",
        summary: "No person shall be held in slavery or servitude, or required to perform forced labour.",
        udhr: "Article 4",
      },
    ],
  },
  {
    id: "voice",
    title: "Voice and participation",
    blurb: "The rights that make an election meaningful rather than decorative.",
    icon: "02",
    rights: [
      {
        article: "38",
        title: "Political rights",
        summary:
          "Every citizen is free to make political choices — to form or join a political party, to campaign for a party or cause, and to free, fair and regular elections by secret ballot. Every adult citizen has the right to be registered as a voter, to vote, and to stand for office.",
        inPractice:
          "Your vote is secret. No employer, chief, party official or family member is entitled to know or direct how you voted.",
        udhr: "Article 21",
      },
      {
        article: "33",
        title: "Freedom of expression",
        summary:
          "Includes the freedom to seek, receive or impart information and ideas, and freedom of artistic creativity. It does not extend to propaganda for war, incitement to violence, hate speech, or advocacy of hatred that constitutes ethnic incitement.",
        udhr: "Article 19",
      },
      {
        article: "34",
        title: "Freedom of the media",
        summary:
          "The State may not exercise control over or interfere with anyone engaged in broadcasting, producing or circulating any publication, nor penalise anyone for any opinion or content of any broadcast or publication.",
        udhr: "Article 19",
      },
      {
        article: "35",
        title: "Access to information",
        summary:
          "Every citizen has the right of access to information held by the State, and to information held by another person that is required for the exercise or protection of any right.",
        inPractice:
          "This is the right that lets you ask a county government how a budget was spent — and obliges them to answer.",
        udhr: "Article 19",
      },
      {
        article: "36",
        title: "Freedom of association",
        summary:
          "Every person has the right to form, join or participate in the activities of an association of any kind. No person may be compelled to join an association.",
        udhr: "Article 20",
      },
      {
        article: "37",
        title: "Assembly, demonstration, picketing and petition",
        summary:
          "Every person has the right, peaceably and unarmed, to assemble, demonstrate, picket and present petitions to public authorities.",
        inPractice:
          "The right is to peaceful and unarmed assembly. Organisers notify the authorities; they do not apply for permission.",
        udhr: "Article 20",
      },
      {
        article: "32",
        title: "Freedom of conscience, religion, belief and opinion",
        summary:
          "Every person has the right to freedom of conscience, religion, thought, belief and opinion, and may not be compelled to act contrary to their belief.",
        udhr: "Article 18",
      },
    ],
  },
  {
    id: "everyday",
    title: "Everyday needs",
    blurb: "Economic and social rights the State must progressively realise.",
    icon: "03",
    rights: [
      {
        article: "43",
        title: "Economic and social rights",
        summary:
          "Every person has the right to the highest attainable standard of health including reproductive health care; accessible and adequate housing with reasonable standards of sanitation; freedom from hunger and adequate food of acceptable quality; clean and safe water in adequate quantities; social security; and education.",
        inPractice:
          "A person shall not be denied emergency medical treatment.",
        udhr: "Articles 22, 25 and 26",
      },
      {
        article: "41",
        title: "Labour relations",
        summary:
          "Every worker has the right to fair remuneration, reasonable working conditions, to form and join a trade union, and to go on strike.",
        udhr: "Articles 23 and 24",
      },
      {
        article: "40",
        title: "Protection of the right to property",
        summary:
          "Every person has the right to acquire and own property anywhere in Kenya. Property may not be arbitrarily deprived, and compulsory acquisition requires prompt payment of just compensation in full.",
        udhr: "Article 17",
      },
      {
        article: "42",
        title: "A clean and healthy environment",
        summary:
          "Every person has the right to a clean and healthy environment, including having it protected for present and future generations.",
      },
      {
        article: "31",
        title: "Privacy",
        summary:
          "You have the right not to have your person, home or property searched, your possessions seized, information about your family or private affairs unnecessarily required or revealed, or the privacy of your communications infringed.",
        udhr: "Article 12",
      },
      {
        article: "39",
        title: "Freedom of movement and residence",
        summary:
          "Every person has the right to freedom of movement, to leave Kenya, and every citizen has the right to enter, remain in and reside anywhere in Kenya.",
        udhr: "Article 13",
      },
    ],
  },
  {
    id: "justice",
    title: "Justice and fair treatment",
    blurb: "What you are owed by police, courts and public offices.",
    icon: "04",
    rights: [
      {
        article: "49",
        title: "Rights of an arrested person",
        summary:
          "You must be told promptly, in a language you understand, why you are being arrested and that you may remain silent. You must be brought before a court as soon as reasonably possible, and not later than twenty-four hours after arrest. You may not be held in custody for an offence punishable by fine or imprisonment of six months or less.",
        inPractice:
          "You have the right to communicate with an advocate, and to be released on bond or bail on reasonable conditions unless there are compelling reasons not to.",
        udhr: "Articles 9 and 11",
      },
      {
        article: "50",
        title: "Fair hearing",
        summary:
          "Every person has the right to have a dispute decided in a fair and public hearing before a court or independent tribunal. An accused person is presumed innocent until proved guilty and is entitled to be informed of the charge in enough detail to answer it.",
        udhr: "Articles 10 and 11",
      },
      {
        article: "47",
        title: "Fair administrative action",
        summary:
          "Every person has the right to administrative action that is expeditious, efficient, lawful, reasonable and procedurally fair. Where a right has been adversely affected, you are entitled to written reasons.",
      },
      {
        article: "48",
        title: "Access to justice",
        summary:
          "The State shall ensure access to justice for all, and any fee required shall be reasonable and shall not impede access.",
        udhr: "Article 8",
      },
      {
        article: "51",
        title: "Rights of persons detained or imprisoned",
        summary:
          "A person in custody retains all the rights in the Bill of Rights except those clearly incompatible with being in custody, and may petition for an order of habeas corpus.",
      },
    ],
  },
  {
    id: "groups",
    title: "Specific protections",
    blurb: "Groups the Constitution singles out for explicit guarantees.",
    icon: "05",
    rights: [
      {
        article: "53",
        title: "Children",
        summary:
          "Every child has the right to a name and nationality from birth, to free and compulsory basic education, to nutrition, shelter and health care, and to protection from abuse, neglect, harmful cultural practices, all forms of violence, inhuman treatment and hazardous or exploitative labour. A child's best interests are of paramount importance in every matter concerning the child.",
        udhr: "Article 25",
      },
      {
        article: "54",
        title: "Persons with disabilities",
        summary:
          "The right to be treated with dignity and to be addressed in a manner that is not demeaning; to access educational institutions and facilities; to reasonable access to all places, public transport and information; to use Sign language, Braille or other appropriate means; and to materials and devices to overcome constraints arising from the disability.",
        inPractice:
          "The State shall progressively ensure that at least five percent of members of the public in elective and appointive bodies are persons with disabilities.",
      },
      {
        article: "55",
        title: "Youth",
        summary:
          "The State shall take measures to ensure that young people access relevant education and training, have opportunities to participate in political, social, economic and other spheres of life, access employment, and are protected from harmful cultural practices and exploitation.",
      },
      {
        article: "56",
        title: "Minorities and marginalised groups",
        summary:
          "The State shall put in place affirmative action programmes ensuring that minorities and marginalised groups participate in governance, are provided special opportunities in education and economic fields, and have reasonable access to water, health services and infrastructure.",
      },
      {
        article: "57",
        title: "Older members of society",
        summary:
          "The State shall take measures to ensure the rights of older persons to fully participate in society, pursue personal development, live in dignity and respect free from abuse, and receive reasonable care and assistance from family and the State.",
      },
    ],
  },
];

export interface EnforcementRoute {
  title: string;
  body: string;
  url?: string;
}

export const ENFORCEMENT_INTRO =
  "A right you cannot enforce is not a right. Article 22 lets any person go to court " +
  "claiming that a right in the Bill of Rights has been denied, violated, infringed or " +
  "threatened — and you may do so on your own behalf, on behalf of someone who cannot " +
  "act for themselves, as a member of a group, or in the public interest.";

export const ENFORCEMENT_ROUTES: EnforcementRoute[] = [
  {
    title: "Go to the High Court (Article 22 and 23)",
    body:
      "The High Court has jurisdiction to hear applications for redress of a denial or violation of a right. Court fees may not be charged in a way that impedes access, and formalities are kept to a minimum — you do not need a lawyer to file.",
  },
  {
    title: "Kenya National Commission on Human Rights (KNCHR)",
    body:
      "An independent constitutional commission that investigates human rights complaints against public bodies and can recommend redress.",
    url: "https://www.knchr.org/",
  },
  {
    title: "Commission on Administrative Justice (Office of the Ombudsman)",
    body:
      "Handles complaints about maladministration, delay, unresponsiveness and unfair treatment by public offices.",
    url: "https://www.ombudsman.go.ke/",
  },
  {
    title: "Independent Policing Oversight Authority (IPOA)",
    body:
      "Receives and investigates complaints against the National Police Service, including deaths and serious injuries in police custody or resulting from police action.",
    url: "https://www.ipoa.go.ke/",
  },
  {
    title: "Independent Electoral and Boundaries Commission (IEBC)",
    body:
      "For complaints about registration, the register of voters, or the conduct of an election.",
    url: "https://www.iebc.or.ke/",
  },
];

export const UDHR_NOTE =
  "Kenya's Bill of Rights sits inside a wider international framework. Article 2(5) and " +
  "2(6) of the Constitution make the general rules of international law and any treaty " +
  "ratified by Kenya part of Kenyan law. The Universal Declaration of Human Rights, " +
  "adopted by the UN General Assembly in 1948, is the reference point most of these " +
  "guarantees trace back to.";

export const UDHR_LINK: EnforcementRoute = {
  title: "Universal Declaration of Human Rights",
  body: "The full text of the 1948 Declaration, available in over 500 languages.",
  url: "https://www.un.org/en/about-us/universal-declaration-of-human-rights",
};
