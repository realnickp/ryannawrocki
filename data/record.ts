export type RecordEntry = {
  slug: string;
  category:
    | "Accountability"
    | "Public Safety"
    | "Sportsmen & Outdoors"
    | "Education"
    | "Community"
    | "Energy & Land Use"
    | "Constituent Service";
  title: string;
  /** One-line summary of the win */
  summary: string;
  /** Optional paragraph with more context */
  detail?: string;
  /** Optional bill numbers, e.g. "HB 1063" */
  billRef?: string;
  /** Optional date stamp, e.g. "2024" or "2025-04" */
  date?: string;
};

export const record: RecordEntry[] = [
  {
    slug: "inspectors-general",
    category: "Accountability",
    title: "Bipartisan reform to strengthen Maryland's Inspectors General.",
    summary:
      "Helped lead bipartisan legislation expanding the authority and independence of Inspectors General across state agencies — empowering watchdogs to root out waste, fraud, and abuse.",
    detail:
      "Worked across the aisle to make sure Maryland's Inspectors General have the tools and protection they need to do their jobs without political interference. Accountability and transparency aren't partisan — they're the foundation of trust in government.",
    billRef: "[TODO: confirm bill number(s) and session year]",
  },
  {
    slug: "hb1063-sportsmen",
    category: "Sportsmen & Outdoors",
    title: "HB 1063 — protecting Maryland's sportsmen.",
    summary:
      "Served on the conference committee that produced the final version of HB 1063, defending hunting, fishing, and outdoor traditions that anchor Maryland's rural and suburban communities.",
    detail:
      "Worked alongside colleagues from both chambers to negotiate language that protected sportsmen's rights and Maryland's outdoor economy.",
    billRef: "HB 1063 — [TODO: confirm full title and final session year]",
  },
  {
    slug: "scholarships-awarded",
    category: "Education",
    title: "More than 250 scholarships to District 7 students.",
    summary:
      "Awarded over $100,000 in Maryland Legislative Scholarships every year — totaling more than 250 awards to District 7 students pursuing higher education.",
    detail:
      "These scholarships make a real difference for the families they reach. The committee reviews every application personally and works to direct funds to the students and programs that need them most. [TODO: confirm whether 250 is annual or cumulative]",
  },
  {
    slug: "data-centers-rural-transit",
    category: "Energy & Land Use",
    title: "Standing up to data-center sprawl and forced rural transit.",
    summary:
      "Led public advocacy against large-scale data-center development in residential corridors and against state proposals to extend Baltimore-region transit into rural District 7A communities.",
    detail:
      "From neighborhood meetings to county council testimony, Ryan has consistently said the same thing: Baltimore County deserves a real voice in how it grows. Data centers don't belong in our backyards without grid, water, and neighborhood-impact guardrails — and transit decisions affecting rural District 7A need rural District 7A at the table.",
  },
  {
    slug: "police-ride-alongs",
    category: "Public Safety",
    title: "Riding along with Baltimore County police.",
    summary:
      "Logged ride-alongs with Baltimore County Precinct officers — not for show, but to listen, learn, and bring what officers say back to Annapolis.",
    detail:
      "Public safety policy gets better when the people writing it actually spend time with the people enforcing it. Ryan's relationships with local law enforcement — from patrol officers to leadership — inform every public-safety vote he takes.",
  },
  {
    slug: "community-presence",
    category: "Community",
    title: "Present at every major community event in District 7A.",
    summary:
      "From Middle River Volunteer Fire & Rescue events to parish celebrations, neighborhood associations, civic dinners, and community parades — Ryan shows up.",
    detail:
      "Being a delegate isn't a 90-day job in Annapolis. It's a year-round commitment to the neighborhoods, families, and institutions that built District 7A.",
  },
  {
    slug: "constituent-service-record",
    category: "Constituent Service",
    title: "Real help with the MVA, BGE, SHA, and Department of Labor.",
    summary:
      "Ryan's office handles constituent cases every week — helping District 7A residents cut through bureaucracy at the MVA, State Highway Administration, BGE, water billing, and Maryland Department of Labor unemployment cases.",
    detail:
      "When a state agency isn't working, the office picks up the phone. That's the job, and it doesn't make the news — but it makes a difference for the people who needed help.",
  },
];

export const recordCategories: RecordEntry["category"][] = [
  "Accountability",
  "Public Safety",
  "Sportsmen & Outdoors",
  "Education",
  "Community",
  "Energy & Land Use",
  "Constituent Service",
];
