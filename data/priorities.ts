export type Priority = {
  /** Position in the platform, e.g. "01", "02" — used for numbering and anchors */
  numeral: string;
  slug: string;
  /** Short banner-ready headline, sentence case */
  title: string;
  /** 2–4 sentence summary, plainspoken, what Ryan stands FOR */
  summary: string;
  /** Concrete things delivered already */
  delivered: string[];
  /** What's next — what Ryan will keep fighting for */
  next: string[];
};

export const priorities: Priority[] = [
  {
    numeral: "01",
    slug: "lowering-the-cost-of-living",
    title: "Lowering the cost of living.",
    summary:
      "Families across District 7A are stretched thin by rising prices, taxes, and fees. Ryan is committed to spending discipline in Annapolis and to protecting paychecks, retirees, and small businesses from new tax hikes.",
    delivered: [
      "Voted against the FY25 operating budget and every new or increased tax and fee in the 2024 session.",
      "Backed targeted relief for veterans, retirees, and working families.",
      "Pushed for a two-thirds supermajority requirement on any new statewide tax or fee.",
    ],
    next: [
      "Keep fighting any new gas tax hikes or vehicle fee increases.",
      "Demand spending discipline — line-by-line scrutiny of the operating budget.",
      "Continue working to expand Maryland’s standard deduction and protect retirement income.",
    ],
  },
  {
    numeral: "02",
    slug: "affordable-reliable-energy",
    title: "Affordable & reliable energy.",
    summary:
      "Marylanders shouldn’t have to choose between paying the BGE bill and putting food on the table. Ryan stands for a diversified, reliable energy portfolio and against policies that push utility costs higher than families can handle.",
    delivered: [
      "Led the fight against the Piedmont and Brandon Shores power-line projects routed through District 7A farmland.",
      "Demanded the Maryland Public Service Commission hear from rural and suburban Baltimore County residents.",
      "Advocated for keeping Brandon Shores online to preserve grid reliability.",
    ],
    next: [
      "Push for energy policy that protects ratepayers first.",
      "Keep up the pressure to stop power-line expansion through Baltimore County farms.",
      "Make sure mandates and timelines reflect what the grid — and family budgets — can actually absorb.",
    ],
  },
  {
    numeral: "03",
    slug: "safe-streets-public-safety",
    title: "Safe streets & strong public safety.",
    summary:
      "Public safety is the foundation of everything else. Ryan stands with the men and women in uniform, supports tougher consequences for repeat violent offenders, and is working to restore real accountability in the juvenile justice system.",
    delivered: [
      "Rode along with Baltimore County Precinct units to hear directly from officers on the front line.",
      "Backed legislation strengthening penalties for repeat offenders and juvenile carjackers.",
      "Joined the Eastern Avenue safety push alongside Delegate Szeliga.",
      "Secured $15M for a new Middle River fire department, $2.5M in new equipment for Long Green, and more than $1M for the Bowleys Quarters Volunteer Fire Department.",
    ],
    next: [
      "Fully fund local police and Sheriff’s deputies.",
      "Restore accountability in the juvenile justice system so repeat offenders see real consequences.",
      "Protect small businesses from organized retail theft and repeat property crime.",
    ],
  },
  {
    numeral: "04",
    slug: "strong-schools-opportunity",
    title: "Strong schools & opportunity for students.",
    summary:
      "Every child in District 7A deserves a school that prepares them for life — whether that’s a four-year college, a trade, a career, or the military. Ryan supports high standards, strong career & technical education, real facility investment, and parents’ rightful place in their children’s education.",
    delivered: [
      "Awarded more than $100,000 in Maryland Legislative Scholarships every year — and more than 250 scholarships to District 7 students to date. [TODO: confirm cumulative vs. annual count]",
      "Pushed for capital funding to address overcrowding at schools like Perry Hall High.",
      "Backed expanded career and technical education in Baltimore County schools.",
    ],
    next: [
      "Keep growing investment in CTE and workforce-ready high school pathways.",
      "Fight to fix and replace crumbling school facilities — including a long-overdue plan for Perry Hall.",
      "Defend parental rights in curriculum, classrooms, and medical decisions.",
    ],
  },
  {
    numeral: "05",
    slug: "first-responders-volunteer-fire-ems",
    title: "Standing with first responders & volunteer fire/EMS.",
    summary:
      "From the Middle River Volunteer Fire & Rescue Company to every career firefighter, EMS provider, and police officer in District 7A — Ryan is committed to making sure they have the funding, recruitment support, and recognition they’ve earned.",
    delivered: [
      "Secured $15M for a new Middle River fire department, $2.5M in new equipment for Long Green, and more than $1M for the Bowleys Quarters Volunteer Fire Department.",
      "Serves on the Board of Directors for the Middle River Volunteer Fire & Rescue Company.",
      "Worked alongside the White Marsh Police & Community Relations Council and other community-policing efforts.",
      "Advocated for state matching funds for volunteer companies and recruitment incentives.",
    ],
    next: [
      "Push for sustained state support for volunteer fire and EMS — including recruitment, training, and equipment.",
      "Champion mental-health support and recognition for career first-responders.",
      "Make sure local public safety budgets are protected — not cut.",
    ],
  },
  {
    numeral: "06",
    slug: "growing-the-local-economy",
    title: "Growing the local economy.",
    summary:
      "From the Port of Baltimore to Tradepoint Atlantic, from small business owners on Eastern Avenue to the tradespeople who build and maintain the district — Ryan is fighting for the jobs and industries that anchor eastern Baltimore County.",
    delivered: [
      "Advocated for federal and state cooperation to restore Port of Baltimore operations after the Key Bridge collapse.",
      "Supported workforce and training programs aligned with the trades and logistics sectors.",
      "Backed small-business tax relief and regulatory simplification.",
    ],
    next: [
      "Champion the Port of Baltimore and Tradepoint Atlantic as engines of growth for the region.",
      "Press for a small-business tax holiday and meaningful relief for new owners.",
      "Cut red tape that crushes Maryland tradespeople, contractors, and family-owned shops.",
    ],
  },
  {
    numeral: "07",
    slug: "accountable-transparent-government",
    title: "Accountable, transparent government.",
    summary:
      "Government works for the people — not the other way around. Ryan has consistently pushed to strengthen oversight, empower Inspectors General, and end the abuse of “emergency” legislation that bypasses public scrutiny.",
    delivered: [
      "Championed bipartisan legislation strengthening the authority of Maryland’s Inspectors General. [TODO: confirm bill numbers]",
      "Voted against the routine use of “emergency” designations on non-emergency bills.",
      "Pushed for a statewide transparency audit to root out waste, fraud, and abuse.",
    ],
    next: [
      "Codify stronger independence for Inspectors General across state agencies.",
      "Reform the legislative “emergency” bill process so it’s reserved for true emergencies.",
      "Continue calling for ethics and oversight reforms in both branches.",
    ],
  },
  {
    numeral: "08",
    slug: "election-integrity",
    title: "Election integrity.",
    summary:
      "Every Marylander deserves an election system they can trust. Ryan supports commonsense ballot verification, transparent processes, and the same standards we apply to nearly every other part of public life.",
    delivered: [
      "Co-sponsored legislation to tighten signature verification on mail-in ballots.",
      "Voted for stronger chain-of-custody requirements at drop boxes.",
      "Supported audits and transparency reforms in the State Board of Elections.",
    ],
    next: [
      "Continue pushing for photo-ID at the polls — making it easier to vote and harder to cheat.",
      "Demand cleaner, more accurate voter rolls.",
      "Champion clear, public reporting of election results and procedures.",
    ],
  },
  {
    numeral: "09",
    slug: "protecting-from-overdevelopment",
    title: "Protecting our communities from overdevelopment.",
    summary:
      "Eastern and northeastern Baltimore County is what it is because of its neighborhoods, its farmland, and its small-town character. Ryan stands for sensible guardrails on data-center sprawl, against state-mandated housing and transit overrides, and for the community’s right to plan its own future.",
    delivered: [
      "Spoke out against the Housing Expansion and Affordability Act and its preemption of local planning.",
      "Pressed for guardrails on large-scale data-center development in residential corridors.",
      "Opposed the proposed extension of Baltimore-region transit into rural District 7A.",
    ],
    next: [
      "Codify protections for residential and rural areas against data-center buildout that strains the grid and disrupts neighborhoods.",
      "Defend Adequate Public Facilities Ordinances and the County Council’s authority to plan growth.",
      "Insist that any transit decisions affecting Baltimore County include Baltimore County voices.",
    ],
  },
  {
    numeral: "10",
    slug: "faith-family-community",
    title: "Faith, family & community.",
    summary:
      "The institutions that build strong communities — families, churches, civic groups, volunteer companies, neighborhood associations — are worth defending. Ryan stands for the values and traditions that make District 7A what it is.",
    delivered: [
      "Active member of the Knights of Columbus, Pope John Paul the Great Council at Our Lady Queen of Peace Church.",
      "Member of the Sons of the American Legion (Post No. 180, Rosedale) and multiple neighborhood associations across District 7A.",
      "Present and engaged at parish events, civic dinners, neighborhood meetings, parades, and community celebrations across the district.",
    ],
    next: [
      "Continue defending First Amendment rights — religious freedom, free speech, and conscience protections.",
      "Stand with families on the issues that matter most to them.",
      "Keep showing up where it counts — across every community in 7A.",
    ],
  },
];
