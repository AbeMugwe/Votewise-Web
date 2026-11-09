/**
 * Who holds office, and who will be on your ballot.
 *
 * DATA INTEGRITY RULES — read before editing:
 *
 *  1. Anything in NATIONAL_OFFICE_HOLDERS is a claim about a real, named person.
 *     Every entry carries `asOf` and `sourceUrl`. Office holders change (by
 *     election, resignation, impeachment or death), so these MUST be re-checked
 *     against the source before any public showing. See VERIFY_BEFORE_DEMO.md.
 *
 *  2. COUNTIES is structural fact from the First Schedule of the Constitution
 *     and does not go stale.
 *
 *  3. We deliberately do NOT ship invented people. Where a holder is unknown to
 *     us, the UI shows an explicit "not recorded" state pointing at the official
 *     source, rather than a plausible-looking name. EXAMPLE_BALLOT is the single
 *     exception and is badged as an example everywhere it renders.
 *
 * Framework-free content module shared by the Next.js web app and the Expo
 * mobile app. Keep it free of React/DOM/RN imports so both bundlers can use it.
 */

import type { OfficeId } from "./offices";

export const POLITICIANS_LAST_VERIFIED = "2026-10-18";

export const POLITICIANS_INTRO =
  "You cannot hold someone accountable if you do not know who they are or what their " +
  "job is. This section names the offices, explains what each one controls, and shows " +
  "who currently holds the national ones. Always confirm against the IEBC and " +
  "Parliament before relying on it — office holders change.";

/**
 * How much we vouch for a record.
 * - "verify": a real person, believed current, must be re-checked before use.
 * - "example": illustrative only, never a real claim.
 * - "not-recorded": we deliberately have no name; UI links out instead.
 */
export type Confidence = "verify" | "example" | "not-recorded";

export interface OfficeHolder {
  id: string;
  /** Person's name, or null when confidence is "not-recorded". */
  name: string | null;
  /** The office title as officially styled. */
  officeTitle: string;
  /** Which ballot elects this office, where applicable. */
  officeId?: OfficeId;
  /** "Republic of Kenya", "Nairobi City County", etc. */
  jurisdiction: string;
  /** Appointed offices are not on any ballot — flagged so the UI can say so. */
  elected: boolean;
  confidence: Confidence;
  /** Date this record was last checked by a human. */
  asOf: string;
  /** What the office does, in one or two sentences. */
  note: string;
  sourceUrl: string;
}

const CABINET_SECRETARIES = [
  ["musalia-mudavadi", "Musalia Mudavadi", "Prime Cabinet Secretary and Cabinet Secretary for Foreign and Diaspora Affairs"],
  ["kipchumba-murkomen", "Kipchumba Murkomen", "Cabinet Secretary for Interior and National Administration"],
  ["davis-chirchir", "Davis Chirchir", "Cabinet Secretary for Roads and Transport"],
  ["hassan-joho", "Hassan Ali Joho", "Cabinet Secretary for Mining, Blue Economy and Maritime Affairs"],
  ["aden-duale", "Aden Duale", "Cabinet Secretary for Health"],
  ["alice-wahome", "Alice Wahome", "Cabinet Secretary for Lands, Public Works, Housing and Urban Development"],
  ["alfred-mutua", "Alfred Mutua", "Cabinet Secretary for Labour and Social Protection"],
  ["julius-ogamba", "Julius Migos Ogamba", "Cabinet Secretary for Education"],
  ["rebecca-miano", "Rebecca Miano", "Cabinet Secretary for Tourism and Wildlife"],
  ["salim-mvurya", "Salim Mvurya", "Cabinet Secretary for Youth Affairs, Creative Economy and Sports"],
  ["soipan-tuya", "Roselinda Soipan Tuya", "Cabinet Secretary for Defence"],
  ["wycliffe-oparanya", "Wycliffe Ambetsa Oparanya", "Cabinet Secretary for Co-operatives and MSME Development"],
  ["john-mbadi", "John Mbadi Ng'ongo", "Cabinet Secretary for the National Treasury and Economic Planning"],
  ["eric-muuga", "Eric Muriithi Muuga", "Cabinet Secretary for Water, Sanitation and Irrigation"],
  ["deborah-barasa", "Deborah Mulongo Barasa", "Cabinet Secretary for Environment, Climate Change and Forestry"],
  ["lee-kinyanjui", "Lee Maiyani Kinyanjui", "Cabinet Secretary for Investments, Trade and Industry"],
  ["mutahi-kagwe", "Mutahi Kagwe", "Cabinet Secretary for Agriculture and Livestock Development"],
  ["opiyo-wandayi", "James Opiyo Wandayi", "Cabinet Secretary for Energy and Petroleum"],
  ["william-kabogo", "William Kabogo Gitau", "Cabinet Secretary for Information, Communication and the Digital Economy"],
  ["geoffrey-ruku", "Geoffrey Kiringa Ruku", "Cabinet Secretary for Public Service and Human Capital Development"],
  ["beatrice-asukul", "Beatrice Asukul Moe", "Cabinet Secretary for East African Community and Regional Affairs"],
  ["hanna-cheptumo", "Hanna Wendot Cheptumo", "Cabinet Secretary for Gender"],
] as const;

/**
 * National office holders.
 *
 * These are recorded to the best of our knowledge as of `asOf` and are all
 * marked "verify". The verification checklist in VERIFY_BEFORE_DEMO.md lists
 * every one of these with a link, so a human can tick them off in a few minutes
 * before filming or publishing.
 */
export const NATIONAL_OFFICE_HOLDERS: OfficeHolder[] = [
  {
    id: "president",
    name: "William Ruto",
    officeTitle: "President of the Republic of Kenya",
    officeId: "president",
    jurisdiction: "Republic of Kenya",
    elected: true,
    confidence: "verify",
    asOf: "2026-10-18",
    note: "Head of State and Government, and Commander-in-Chief of the Kenya Defence Forces. Took office in September 2022.",
    sourceUrl: "https://www.president.go.ke/administration/office-of-the-president/",
  },
  {
    id: "deputy-president",
    name: "Kithure Kindiki",
    officeTitle: "Deputy President of the Republic of Kenya",
    jurisdiction: "Republic of Kenya",
    elected: true,
    confidence: "verify",
    asOf: "2026-10-18",
    note: "The principal assistant to the President. Assumed office in November 2024 following the removal of the previous holder by impeachment.",
    sourceUrl: "https://www.president.go.ke/cabinet/",
  },
  {
    id: "chief-justice",
    name: "Martha Koome",
    officeTitle: "Chief Justice and President of the Supreme Court",
    jurisdiction: "Republic of Kenya",
    elected: false,
    confidence: "verify",
    asOf: "2026-10-18",
    note: "Heads the Judiciary and presides over the Supreme Court, which hears presidential election petitions. Appointed in May 2021. This office is appointed, not elected.",
    sourceUrl: "https://supremecourt.judiciary.go.ke/hon-justice-martha-koome-egh/",
  },
  {
    id: "speaker-national-assembly",
    name: "Moses Wetang'ula",
    officeTitle: "Speaker of the National Assembly",
    jurisdiction: "Republic of Kenya",
    elected: false,
    confidence: "verify",
    asOf: "2026-10-18",
    note: "Presides over the National Assembly. Elected by members of the Assembly rather than by the public.",
    sourceUrl: "https://www.parliament.go.ke/the-national-assembly/speaker-national-assembly",
  },
  {
    id: "speaker-senate",
    name: "Amason Jeffah Kingi",
    officeTitle: "Speaker of the Senate",
    jurisdiction: "Republic of Kenya",
    elected: false,
    confidence: "verify",
    asOf: "2026-10-18",
    note: "Presides over the Senate. Elected by members of the Senate rather than by the public.",
    sourceUrl: "https://www.parliament.go.ke/node/26411",
  },
  ...CABINET_SECRETARIES.map(([id, name, officeTitle]): OfficeHolder => ({
    id: `cabinet-${id}`,
    name,
    officeTitle,
    jurisdiction: "Republic of Kenya",
    elected: false,
    confidence: "verify",
    asOf: "2026-10-18",
    note: "Member of the national Cabinet. Cabinet Secretaries are nominated by the President and appointed after approval by the National Assembly; they are not elected directly by voters.",
    sourceUrl: "https://www.president.go.ke/cabinet/",
  })),
];

/** The independent bodies a voter is most likely to need. */
export interface CivicInstitution {
  name: string;
  abbr: string;
  role: string;
  url: string;
  icon: string;
}

export const CIVIC_INSTITUTIONS: CivicInstitution[] = [
  {
    name: "Independent Electoral and Boundaries Commission",
    abbr: "IEBC",
    role: "Registers voters, conducts and supervises elections and referenda, and settles boundary questions.",
    url: "https://www.iebc.or.ke/",
    icon: "IEBC",
  },
  {
    name: "Parliament of Kenya",
    abbr: "Parliament",
    role: "The National Assembly and the Senate. Look up your sitting MP, Woman Representative and Senator, and read Hansard records of what they said.",
    url: "http://www.parliament.go.ke/",
    icon: "PARL",
  },
  {
    name: "Office of the Registrar of Political Parties",
    abbr: "ORPP",
    role: "Registers and regulates political parties, and publishes the register of party members.",
    url: "https://www.orpp.or.ke/",
    icon: "ORPP",
  },
  {
    name: "Ethics and Anti-Corruption Commission",
    abbr: "EACC",
    role: "Investigates corruption and economic crime, and enforces leadership and integrity requirements for State officers.",
    url: "https://eacc.go.ke/",
    icon: "EACC",
  },
  {
    name: "Office of the Controller of Budget",
    abbr: "COB",
    role: "Oversees implementation of national and county budgets and publishes quarterly reports on how public money was actually spent.",
    url: "https://cob.go.ke/",
    icon: "COB",
  },
  {
    name: "Kenya National Commission on Human Rights",
    abbr: "KNCHR",
    role: "Investigates human rights violations and monitors the State's compliance with the Bill of Rights.",
    url: "https://www.knchr.org/",
    icon: "KNCHR",
  },
];

export interface County {
  /** Official county code, 001–047. */
  code: string;
  name: string;
  /** Regional grouping, used only for filtering in the UI. */
  region: string;
}

/**
 * The 47 counties established by the First Schedule to the Constitution of
 * Kenya 2010. Codes are the official county numbers. This is structural fact.
 */
export const COUNTIES: County[] = [
  { code: "001", name: "Mombasa", region: "Coast" },
  { code: "002", name: "Kwale", region: "Coast" },
  { code: "003", name: "Kilifi", region: "Coast" },
  { code: "004", name: "Tana River", region: "Coast" },
  { code: "005", name: "Lamu", region: "Coast" },
  { code: "006", name: "Taita-Taveta", region: "Coast" },
  { code: "007", name: "Garissa", region: "North Eastern" },
  { code: "008", name: "Wajir", region: "North Eastern" },
  { code: "009", name: "Mandera", region: "North Eastern" },
  { code: "010", name: "Marsabit", region: "Eastern" },
  { code: "011", name: "Isiolo", region: "Eastern" },
  { code: "012", name: "Meru", region: "Eastern" },
  { code: "013", name: "Tharaka-Nithi", region: "Eastern" },
  { code: "014", name: "Embu", region: "Eastern" },
  { code: "015", name: "Kitui", region: "Eastern" },
  { code: "016", name: "Machakos", region: "Eastern" },
  { code: "017", name: "Makueni", region: "Eastern" },
  { code: "018", name: "Nyandarua", region: "Central" },
  { code: "019", name: "Nyeri", region: "Central" },
  { code: "020", name: "Kirinyaga", region: "Central" },
  { code: "021", name: "Murang'a", region: "Central" },
  { code: "022", name: "Kiambu", region: "Central" },
  { code: "023", name: "Turkana", region: "Rift Valley" },
  { code: "024", name: "West Pokot", region: "Rift Valley" },
  { code: "025", name: "Samburu", region: "Rift Valley" },
  { code: "026", name: "Trans Nzoia", region: "Rift Valley" },
  { code: "027", name: "Uasin Gishu", region: "Rift Valley" },
  { code: "028", name: "Elgeyo-Marakwet", region: "Rift Valley" },
  { code: "029", name: "Nandi", region: "Rift Valley" },
  { code: "030", name: "Baringo", region: "Rift Valley" },
  { code: "031", name: "Laikipia", region: "Rift Valley" },
  { code: "032", name: "Nakuru", region: "Rift Valley" },
  { code: "033", name: "Narok", region: "Rift Valley" },
  { code: "034", name: "Kajiado", region: "Rift Valley" },
  { code: "035", name: "Kericho", region: "Rift Valley" },
  { code: "036", name: "Bomet", region: "Rift Valley" },
  { code: "037", name: "Kakamega", region: "Western" },
  { code: "038", name: "Vihiga", region: "Western" },
  { code: "039", name: "Bungoma", region: "Western" },
  { code: "040", name: "Busia", region: "Western" },
  { code: "041", name: "Siaya", region: "Nyanza" },
  { code: "042", name: "Kisumu", region: "Nyanza" },
  { code: "043", name: "Homa Bay", region: "Nyanza" },
  { code: "044", name: "Migori", region: "Nyanza" },
  { code: "045", name: "Kisii", region: "Nyanza" },
  { code: "046", name: "Nyamira", region: "Nyanza" },
  { code: "047", name: "Nairobi City", region: "Nairobi" },
];

export const REGIONS = [
  "Coast",
  "North Eastern",
  "Eastern",
  "Central",
  "Rift Valley",
  "Western",
  "Nyanza",
  "Nairobi",
] as const;

/**
 * A single ballot slot: one office, for one county, with whoever holds it.
 * `holder` is null when we have no verified name — the UI then shows a
 * "look this up" state rather than inventing a person.
 */
export interface BallotSlot {
  officeId: OfficeId;
  /** The specific unit voted in, e.g. "Westlands Constituency", "Kitisuru Ward". */
  unit: string;
  holder: string | null;
  confidence: Confidence;
}

/**
 * A single worked example so the UI has a populated state to show.
 * Names here are ILLUSTRATIVE PLACEHOLDERS, not real people, and every surface
 * that renders this must display the example badge.
 */
export const EXAMPLE_BALLOT: {
  countyCode: string;
  countyName: string;
  constituency: string;
  ward: string;
  slots: BallotSlot[];
} = {
  countyCode: "047",
  countyName: "Nairobi City",
  constituency: "Westlands Constituency",
  ward: "Kitisuru Ward",
  slots: [
    { officeId: "president", unit: "Republic of Kenya", holder: "William Ruto", confidence: "verify" },
    { officeId: "governor", unit: "Nairobi City County", holder: null, confidence: "not-recorded" },
    { officeId: "senator", unit: "Nairobi City County", holder: null, confidence: "not-recorded" },
    { officeId: "mp", unit: "Westlands Constituency", holder: null, confidence: "not-recorded" },
    { officeId: "woman-rep", unit: "Nairobi City County", holder: null, confidence: "not-recorded" },
    { officeId: "mca", unit: "Kitisuru Ward", holder: null, confidence: "not-recorded" },
  ],
};

export const EXAMPLE_BADGE = "EXAMPLE";

export const NOT_RECORDED_COPY =
  "We have not recorded a verified holder for this seat. Rather than show you a name we " +
  "cannot stand behind, here is where to look it up.";

export const NOT_RECORDED_LINKS = [
  { label: "Parliament of Kenya — find your MP or Senator", url: "http://www.parliament.go.ke/" },
  { label: "IEBC — election results and boundaries", url: "https://www.iebc.or.ke/" },
  { label: "Council of Governors — county leadership", url: "https://www.cog.go.ke/" },
];

export function getCounty(code: string): County | undefined {
  return COUNTIES.find((c) => c.code === code);
}

export function countiesByRegion(region: string): County[] {
  return COUNTIES.filter((c) => c.region === region);
}
