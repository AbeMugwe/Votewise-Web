/**
 * The six elective offices on a Kenyan general election ballot.
 *
 * This structure is fixed by the Constitution of Kenya 2010 and does not change
 * between election cycles, so it is safe to present as authoritative. The people
 * currently holding these offices live in ./politicians.ts and DO change.
 *
 * Framework-free content module shared by the Next.js web app and the Expo
 * mobile app. Keep it free of React/DOM/RN imports so both bundlers can use it.
 */

export const OFFICES_LAST_VERIFIED = "2026-09-03";

export const OFFICES_INTRO =
  "On the day of a Kenyan general election you are handed six ballot papers, one for " +
  "each elective office. Most voters recognise the presidential ballot and guess at the " +
  "rest — yet the offices lower down the list are the ones that decide whether your road " +
  "gets tarmacked, your dispensary gets stocked, and your ward bursary gets paid. Here is " +
  "what each ballot actually buys you.";

/** Stable identifier used for routing: /politicians/[officeId] */
export type OfficeId =
  | "president"
  | "governor"
  | "senator"
  | "mp"
  | "woman-rep"
  | "mca";

export interface ElectiveOffice {
  id: OfficeId;
  /** Ballot paper title, e.g. "President". */
  title: string;
  /** Short form used in chips and tab labels. */
  shortTitle: string;
  /** Ballot paper colour used at recent general elections, for recognition. */
  ballotColour: string;
  /** Hex used to tint the card on both platforms. */
  accent: string;
  icon: string;
  /** The geographic unit this office represents. */
  constituencyType: string;
  /** How many of this office exist nationally. */
  howMany: string;
  termYears: number;
  /** One-line answer to "what does this person actually do?" */
  oneLiner: string;
  /** The concrete powers of the office. */
  responsibilities: string[];
  /** What this office cannot do — kills a lot of misplaced blame. */
  notTheirJob?: string;
  /** Qualifications to stand for the office. */
  toStand: string;
  /** Constitutional anchor. */
  source: string;
}

export const ELECTIVE_OFFICES: ElectiveOffice[] = [
  {
    id: "president",
    title: "President",
    shortTitle: "President",
    ballotColour: "White",
    accent: "#14532d",
    icon: "P",
    constituencyType: "The whole country",
    howMany: "1",
    termYears: 5,
    oneLiner:
      "Head of State and Government, and Commander-in-Chief of the Kenya Defence Forces.",
    responsibilities: [
      "Leads the national executive and chairs Cabinet",
      "Nominates and, with National Assembly approval, appoints Cabinet Secretaries, the Attorney-General and principal secretaries",
      "Assents to or refers back Bills passed by Parliament",
      "Represents Kenya in its dealings with other states and international bodies",
      "Confers national honours and exercises the power of mercy",
    ],
    notTheirJob:
      "The President does not run county governments. Water, local health facilities, county roads and markets are devolved functions that belong to your Governor.",
    toStand:
      "A citizen by birth, qualified to stand for election as a Member of Parliament, nominated by a political party or as an independent, and nominated by at least two thousand voters from each of a majority of the counties.",
    source: "Constitution of Kenya 2010, Chapter Nine (Art. 129–147)",
  },
  {
    id: "governor",
    title: "County Governor",
    shortTitle: "Governor",
    ballotColour: "Turquoise / blue-green",
    accent: "#0e7490",
    icon: "G",
    constituencyType: "Your county",
    howMany: "47 — one per county",
    termYears: 5,
    oneLiner:
      "Chief executive of your county government — the single most consequential vote for daily life.",
    responsibilities: [
      "Leads the county executive and appoints County Executive Committee members with county assembly approval",
      "Runs devolved functions: county health services, pre-primary education, county roads, water and sanitation, agriculture, trade licensing, markets and public transport",
      "Prepares and submits the county budget and development plans to the county assembly",
      "Signs county legislation passed by the county assembly",
    ],
    notTheirJob:
      "The Governor does not control national police, national trunk roads, universities, or national security. Those remain with the national government.",
    toStand:
      "Registered as a voter, satisfies moral and ethical requirements, and is nominated by a political party or is an independent candidate. Runs on a joint ticket with a Deputy Governor.",
    source: "Constitution of Kenya 2010, Art. 179–182; Fourth Schedule Part 2",
  },
  {
    id: "senator",
    title: "Senator",
    shortTitle: "Senator",
    ballotColour: "Yellow",
    accent: "#a16207",
    icon: "S",
    constituencyType: "Your county",
    howMany: "47 elected, plus 20 nominated members",
    termYears: 5,
    oneLiner:
      "Represents your county in the Senate and defends devolution and county money.",
    responsibilities: [
      "Represents the county and protects the interests of counties and their governments",
      "Debates and approves Bills concerning counties",
      "Determines the allocation of national revenue among counties",
      "Oversees national revenue allocated to county governments",
      "Hears and determines the removal from office of a County Governor by impeachment",
    ],
    notTheirJob:
      "Senators do not implement county projects — that is the Governor's executive role. The Senate's power over counties is legislative and oversight.",
    toStand:
      "Registered as a voter, satisfies any educational, moral and ethical requirements, and is nominated by a political party or is an independent candidate.",
    source: "Constitution of Kenya 2010, Art. 96, 98",
  },
  {
    id: "mp",
    title: "Member of the National Assembly",
    shortTitle: "MP",
    ballotColour: "Green",
    accent: "#15803d",
    icon: "MP",
    constituencyType: "Your constituency",
    howMany: "290 constituency seats, plus 47 county woman representatives and 12 nominated members",
    termYears: 5,
    oneLiner:
      "Makes national law, approves how national money is raised and spent, and represents your constituency.",
    responsibilities: [
      "Debates and passes national legislation",
      "Determines the allocation of national revenue between the national and county levels",
      "Appropriates funds for expenditure by the national government",
      "Reviews the conduct of the President, Deputy President and other State officers, and initiates removal proceedings where necessary",
      "Approves declarations of war and extensions of states of emergency",
    ],
    notTheirJob:
      "An MP is a legislator, not a contractor. Building classrooms and clinics is executive work — the MP's constitutional job is law-making and oversight.",
    toStand:
      "Registered as a voter in a constituency, satisfies moral and ethical requirements, and is nominated by a political party or is an independent candidate.",
    source: "Constitution of Kenya 2010, Art. 95, 97",
  },
  {
    id: "woman-rep",
    title: "County Woman Representative to the National Assembly",
    shortTitle: "Woman Rep",
    ballotColour: "Purple / lilac",
    accent: "#7e22ce",
    icon: "WR",
    constituencyType: "Your county, voted for county-wide",
    howMany: "47 — one per county",
    termYears: 5,
    oneLiner:
      "A full Member of the National Assembly elected county-wide, created to advance gender balance in Parliament.",
    responsibilities: [
      "Sits and votes in the National Assembly with the same legislative powers as any other member",
      "Represents the whole county rather than a single constituency",
      "Serves on parliamentary committees and participates in oversight of national spending",
      "In practice, champions legislation and programmes affecting women, children and vulnerable groups",
    ],
    notTheirJob:
      "This is a national legislative seat, not a county government post — it sits alongside your MP in the National Assembly, not in the county assembly.",
    toStand:
      "The same qualifications as any Member of the National Assembly. The seat is reserved for women and contested county-wide.",
    source: "Constitution of Kenya 2010, Art. 97(1)(b)",
  },
  {
    id: "mca",
    title: "Member of the County Assembly",
    shortTitle: "MCA",
    ballotColour: "Beige / light brown",
    accent: "#b45309",
    icon: "MCA",
    constituencyType: "Your ward — the smallest electoral unit",
    howMany: "One per ward, plus nominated members for gender and marginalised-group balance",
    termYears: 5,
    oneLiner:
      "Your closest elected representative — approves the county budget that funds your ward.",
    responsibilities: [
      "Makes laws necessary for the effective performance of county government functions",
      "Approves the county budget and expenditure, and vets county executive appointments",
      "Exercises oversight over the county executive committee and other county organs",
      "Approves county development plans, and in many counties administers ward-level bursary and development funds",
    ],
    notTheirJob:
      "MCAs approve and oversee county spending; they do not run county departments day to day.",
    toStand:
      "Registered as a voter in the ward, satisfies moral and ethical requirements, and is nominated by a political party or is an independent candidate.",
    source: "Constitution of Kenya 2010, Art. 177, 185",
  },
];

/** Quick lookup used by the detail routes on both platforms. */
export function getOffice(id: string): ElectiveOffice | undefined {
  return ELECTIVE_OFFICES.find((o) => o.id === id);
}

export const BALLOT_TIP =
  "Ballot paper colours have varied between election cycles. Always read the heading " +
  "printed on the paper rather than relying on colour alone, and ask the presiding " +
  "officer if anything is unclear — that is what they are there for.";
