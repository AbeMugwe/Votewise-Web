/**
 * How to register as a voter in Kenya.
 *
 * Framework-free content module shared by the Next.js web app and the Expo
 * mobile app. Keep it free of React/DOM/RN imports so both bundlers can use it.
 *
 * Sources: Constitution of Kenya 2010 (Art. 38, 83), Elections Act 2011,
 * IEBC continuous voter registration guidance. See VERIFY_BEFORE_DEMO.md.
 */

export const VOTER_CARD_LAST_VERIFIED = "2026-09-03";

export const VOTER_CARD_INTRO =
  "In Kenya you do not carry a separate plastic voter's card. When you register, your " +
  "biometrics and details are entered into the Principal Register of Voters and you are " +
  "given an acknowledgement slip. That entry in the register is what lets you vote. " +
  "Registration is free, and it is run by the Independent Electoral and Boundaries " +
  "Commission (IEBC).";

export interface EligibilityRule {
  /** Short label shown in the checklist. */
  label: string;
  /** One-sentence explanation. */
  detail: string;
  /** Constitutional or statutory anchor, shown as a small caption. */
  source: string;
}

export const ELIGIBILITY: EligibilityRule[] = [
  {
    label: "You are a Kenyan citizen",
    detail:
      "Only Kenyan citizens may register. Citizenship by birth and by registration both qualify.",
    source: "Constitution of Kenya 2010, Art. 83(1)(a)",
  },
  {
    label: "You are 18 years or older",
    detail:
      "You must have attained the age of eighteen years. You can register the day you turn 18 — you do not have to wait for an election year.",
    source: "Constitution of Kenya 2010, Art. 83(1)(a)",
  },
  {
    label: "You hold a Kenyan national ID or a Kenyan passport",
    detail:
      "You must produce the original document at the registration centre. A waiting card, a photocopy or a photo on your phone is not accepted.",
    source: "Elections Act 2011, s. 5",
  },
  {
    label: "You are of sound mind",
    detail:
      "A person declared to be of unsound mind by a competent court is not eligible to register.",
    source: "Constitution of Kenya 2010, Art. 83(1)(b)",
  },
  {
    label: "You have not been convicted of an election offence",
    detail:
      "A conviction for an election offence in the preceding five years disqualifies you from registering.",
    source: "Constitution of Kenya 2010, Art. 83(1)(c)",
  },
];

export interface RegistrationStep {
  n: number;
  title: string;
  body: string;
  /** Optional practical tip rendered in a highlighted box. */
  tip?: string;
}

export const REGISTRATION_STEPS: RegistrationStep[] = [
  {
    n: 1,
    title: "Get your original ID or passport",
    body:
      "Bring your original Kenyan national identity card or Kenyan passport. If you have lost yours, apply for a replacement at a Huduma Centre or a National Registration Bureau office first — you cannot register without it.",
    tip: "Turning 18 soon? Apply for your national ID as early as you can. ID processing is the most common reason young Kenyans miss registration.",
  },
  {
    n: 2,
    title: "Find a registration centre",
    body:
      "The IEBC runs continuous voter registration at its constituency offices, and registration is also offered at many Huduma Centres. Ahead of a general election the Commission gazettes extra centres for mass registration drives. Kenyans living abroad register at gazetted Kenyan diplomatic missions.",
    tip: "Register in the ward where you actually live. Your ward decides which MCA, MP, Woman Representative, Senator and Governor appear on your ballot.",
  },
  {
    n: 3,
    title: "Have your biometrics captured",
    body:
      "A clerk enters your details into a Biometric Voter Registration (BVR) kit, captures your fingerprints and takes your photograph. You confirm that your name, ID number and polling station are recorded correctly before the record is saved.",
    tip: "Check the spelling of your name and your ID number on the screen before you sign. Fixing an error later is far slower than catching it now.",
  },
  {
    n: 4,
    title: "Collect your acknowledgement slip",
    body:
      "You are issued an acknowledgement slip showing your name, ID number and the polling station assigned to you. Keep it. It is your receipt — it records where you are registered.",
  },
  {
    n: 5,
    title: "Verify your details in the register",
    body:
      "Before an election the IEBC opens the Register of Voters for public scrutiny and publishes a verification channel — typically an online portal on iebc.or.ke plus an SMS shortcode. Confirm that your record exists and that the polling station is the one you expect.",
    tip: "Verify again in the weeks before polling day even if you registered years ago. Verification is free and takes under a minute.",
  },
];

export interface FaqItem {
  q: string;
  a: string;
}

export const VOTER_CARD_FAQ: FaqItem[] = [
  {
    q: "Does registration cost anything?",
    a: "No. Voter registration in Kenya is free at every stage. Anyone asking you for money to register is defrauding you — report it at the IEBC constituency office.",
  },
  {
    q: "I have moved to a different county. What do I do?",
    a: "Apply to transfer your registration to your new ward. The IEBC opens a transfer window ahead of a general election and announces the closing date. If you do not transfer, you must travel back to your original polling station to vote.",
  },
  {
    q: "Can I register if I have a criminal record?",
    a: "A criminal record on its own does not disqualify you. The specific bar in Article 83 is a conviction for an election offence within the preceding five years. Rules on voting while in custody sit in electoral regulations and have changed over time — confirm the current position with the IEBC.",
  },
  {
    q: "I am a Kenyan living abroad. Can I vote?",
    a: "Yes, in the presidential election, if you register at a Kenyan diplomatic mission in a country the IEBC has gazetted for diaspora registration. The list of eligible countries is published before each general election.",
  },
  {
    q: "I lost my acknowledgement slip. Am I still registered?",
    a: "Yes. The slip is a receipt, not the registration itself. Your record lives in the Principal Register of Voters. Use the IEBC verification channel to confirm your details and polling station.",
  },
  {
    q: "How do I know my registration has not been tampered with?",
    a: "The Register of Voters is opened for public inspection before a general election, and the IEBC publishes a verification service. Article 35 of the Constitution also gives you the right of access to information the State holds about you.",
  },
];

export interface OfficialLink {
  label: string;
  url: string;
  description: string;
}

export const VOTER_CARD_LINKS: OfficialLink[] = [
  {
    label: "IEBC — Independent Electoral and Boundaries Commission",
    url: "https://www.iebc.or.ke/",
    description:
      "The authority on registration centres, verification channels and election dates.",
  },
  {
    label: "Huduma Kenya",
    url: "https://www.hudumakenya.go.ke/",
    description:
      "Government service centres — ID replacement and some registration services.",
  },
  {
    label: "Constitution of Kenya 2010 (Kenya Law)",
    url: "https://new.kenyalaw.org/akn/ke/act/2010/constitution/eng@2010-09-03",
    description:
      "Full text, including Article 38 on political rights and Article 83 on voter qualifications.",
  },
];
