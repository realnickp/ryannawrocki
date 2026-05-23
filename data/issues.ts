export type IssueSource = {
  label: string;
  href: string;
  /** Publication / outlet name, e.g. "Maryland Matters" or "Maryland General Assembly". */
  publisher?: string;
};

export type Issue = {
  slug: string;
  title: string;
  topic: string;
  date?: string;
  /** Byline; defaults to the delegate. */
  author?: string;
  /** e.g. "5 min read". */
  readTime?: string;
  excerpt: string;
  /** Standfirst / sub-headline shown under the title. */
  dek?: string;
  /** Article body — one string per paragraph. */
  body: string[];
  /** "Where Ryan Stands" key takeaways. */
  keyPoints?: string[];
  /** A highlighted pull-quote drawn from the piece. */
  pullQuote?: string;
  /** Legacy "Our Asks" action bullets. */
  bullets?: string[];
  /** Action / related links (campaign or government). */
  links?: { label: string; href: string }[];
  /** Cited news / official sources (real URLs). */
  sources?: IssueSource[];
  image?: { src: string; alt: string };
};

export const issues: Issue[] = [
  {
    slug: "inspector-general-reform",
    title: "A statewide watchdog for Maryland taxpayers.",
    topic: "Government Accountability",
    date: "2026-02",
    author: "Delegate Ryan Nawrocki",
    readTime: "5 min read",
    excerpt:
      "My bill creates an independent, statewide Office of the Inspector General — with real subpoena power to root out waste, fraud, and abuse of your tax dollars.",
    dek: "In the 2026 session I introduced HB1449 to give Maryland what it has never had at the state level: a truly independent watchdog with the authority to follow the money wherever it leads.",
    body: [
      "Every family in District 7A balances a budget. When money is tight, you account for every dollar — you do not simply ask for more. Maryland's government should be held to that same standard. That is why, in the 2026 legislative session, I introduced HB1449 to create an independent, statewide Office of the Inspector General: a permanent watchdog dedicated to protecting the taxpayers who fund every program in Annapolis.",
      "Here is the key difference my bill is built around. A traditional audit looks backward at the numbers on a page. An inspector general investigates. As I told my colleagues, inspectors general possess “investigative authority, including subpoena power, to uncover facts that numbers alone cannot reveal.” That power to demand documents and testimony is exactly what is missing from state oversight today.",
      "Just as important as the office's power is its independence. Under HB1449, an Inspector General Advisory Board — not the politicians being watched — would appoint the inspector general and conduct annual performance reviews. That structure, modeled on the offices that already exist in Pennsylvania and Virginia, keeps the watchdog accountable to results rather than to the very officials it is charged with scrutinizing.",
      "We already know this model works close to home. Baltimore County, Baltimore City, Montgomery County, and Howard County all operate inspectors general, and they routinely surface waste that would otherwise go unnoticed. Yet the state government — which spends far more of your money than any county — has no equivalent, fully independent watchdog of its own. That gap is indefensible.",
      "This matters most right now. With record-setting state budgets, looming deficits, and hundreds of new and increased taxes and fees already on the books, Marylanders deserve to know their money is being spent honestly before anyone in Annapolis asks them for another dime. As I put it, “Marylanders deserve a government that is accountable, transparent, and focused on responsible stewardship of taxpayer dollars.”",
      "HB1449 received its first hearing before the House Government, Labor, and Elections Committee, and I will keep fighting to get it across the finish line. Accountability shouldn't be a partisan idea — it's simply good government, and the people who pay the bills have earned it.",
    ],
    keyPoints: [
      "Creates an independent, statewide Office of the Inspector General (HB1449).",
      "Gives it subpoena power to investigate — not just audit — waste, fraud, and abuse.",
      "An Inspector General Advisory Board appoints the IG and reviews it annually, insulating the office from politics.",
      "Modeled on independent offices already working in Pennsylvania and Virginia.",
      "Accountability before new taxes: prove the dollars aren't wasted before asking for more.",
    ],
    pullQuote:
      "Before Annapolis asks you for another dollar, it should prove it isn't wasting the ones it already takes.",
    links: [
      {
        label: "HB1449 — official bill page (Maryland General Assembly)",
        href: "https://mgaleg.maryland.gov/mgawebsite/Legislation/Details/hb1449?ys=2026RS",
      },
    ],
    sources: [
      {
        label: "Delegate Nawrocki introduces statewide Inspector General legislation",
        href: "https://nottinghammd.com/2026/02/17/delegate-nawrocki-introduces-statewide-inspector-general-legislation-to-strengthen-government-accountability/",
        publisher: "Nottingham MD",
      },
      {
        label: "Nawrocki introduces statewide Inspector General legislation",
        href: "https://www.eastcountytimes.com/politics/nawrocki-introduces-statewide-inspector-general-legislation/",
        publisher: "East County Times",
      },
      {
        label: "Maryland 'Watchdog' bill moves forward: statewide IG proposal reaches House committee",
        href: "https://nottinghammd.com/2026/03/10/maryland-watchdog-bill-moves-forward-proposal-for-statewide-inspector-general-reaches-house-committee/",
        publisher: "Nottingham MD",
      },
    ],
    image: {
      src: "/images/priorities/accountable-transparent-government.png",
      alt: "The Maryland State House in Annapolis",
    },
  },
  {
    slug: "bcps-inspector-general-oversight",
    title: "Put Baltimore County's schools under the watchdog's eye.",
    topic: "Government Accountability",
    date: "2026-02",
    author: "Delegate Ryan Nawrocki",
    readTime: "5 min read",
    excerpt:
      "A $2.49 billion school budget deserves real, independent oversight. Our bipartisan bill lets the County's Inspector General follow those dollars to the classroom.",
    dek: "Sen. Carl Jackson and I — a Democrat and a Republican — agree on this: the largest line in Baltimore County's budget shouldn't be the one with the least independent scrutiny.",
    body: [
      "The proposed Fiscal Year 2027 budget for Baltimore County Public Schools is roughly $2.49 billion — by far the largest single expenditure in our county. And yet, today, that enormous sum sits almost entirely outside the reach of the Baltimore County Office of the Inspector General. That is the gap Senator Carl Jackson and I set out to close, together, across party lines.",
      "Our legislation does something deliberately modest: it authorizes the Baltimore County Council to extend the Inspector General's jurisdiction to the school system. It does not mandate it. The Council keeps the final say. This is local control done right — giving our elected county leaders the option to add a layer of independent accountability if they choose, rather than dictating it from Annapolis.",
      "Why an inspector general and not just the school system's own auditors? Because there is a fundamental difference between an internal audit and an independent investigation: subpoena power. An inspector general can compel outside documents and testimony, following the money beyond the four walls of the central office. Internal reviewers simply cannot.",
      "We know this approach delivers. In 2025 alone, Montgomery County's Inspector General identified $18.1 million in questioned costs. Every dollar an inspector general recovers or protects is a dollar that can go back where it belongs — into the classroom, the teacher's paycheck, and the student's education.",
      "This is not a partisan crusade, and it is not an attack on our schools or our teachers. The Baltimore County Council already requested this authority through Resolution 40-25, passed with bipartisan support, and even the Teachers Association of Baltimore County backs the idea — because educators understand that every misspent dollar is one diverted from learning. The estimated cost of oversight is about $800,000 a year, a rounding error against a $2.49 billion budget, and a bargain for the trust it would restore.",
      "Parents, teachers, and taxpayers all deserve confidence that school dollars reach students. I'll keep working — with Democrats and Republicans alike — to give Baltimore County the transparency its families have asked for.",
    ],
    keyPoints: [
      "Lets the County Inspector General oversee the ~$2.49B Baltimore County Public Schools budget.",
      "Authorizes — does not mandate — the County Council keeps the final decision (local control).",
      "Subpoena power means real investigations, not just internal audits.",
      "Montgomery County's IG found $18.1M in questioned costs in 2025 alone.",
      "Backed by the County Council (Resolution 40-25) and the teachers' union; oversight runs about $800K/year.",
    ],
    pullQuote:
      "Every dollar misspent downtown is a dollar that never reaches a classroom.",
    links: [
      {
        label:
          "Guest commentary — “Strengthened oversight of Baltimore County Public Schools is a no-brainer” (Baltimore Sun)",
        href: "https://www.baltimoresun.com/2026/02/04/bcps-ig-oversight/",
      },
    ],
    sources: [
      {
        label:
          "Strengthened oversight of Baltimore County Public Schools is a no-brainer | Guest Commentary (by Sen. Jackson & Del. Nawrocki)",
        href: "https://www.baltimoresun.com/2026/02/04/bcps-ig-oversight/",
        publisher: "The Baltimore Sun",
      },
      {
        label: "Bipartisan bill seeks to expand Inspector General oversight to Baltimore County Public Schools",
        href: "https://nottinghammd.com/2025/11/20/bipartisan-bill-seeks-to-expand-inspector-general-oversight-to-baltimore-county-public-schools/",
        publisher: "Nottingham MD",
      },
      {
        label: "Bipartisan push seeks inspector general oversight of Baltimore County schools",
        href: "https://www.wmar2news.com/local/bipartisan-push-seeks-inspector-general-oversight-of-baltimore-county-schools",
        publisher: "WMAR-2 News",
      },
    ],
    image: {
      src: "/images/priorities/strong-schools-opportunity.png",
      alt: "A Baltimore County public school classroom",
    },
  },
  {
    slug: "middle-river-fire-station",
    title: "A new home for Middle River's volunteer firefighters.",
    topic: "Public Safety & Local Wins",
    date: "2026-03",
    author: "Delegate Ryan Nawrocki",
    readTime: "3 min read",
    excerpt:
      "$9 million in federal funding will replace the aging Middle River Volunteer Fire & Rescue station with the modern facility our first responders have earned.",
    dek: "After years of advocacy, the Middle River Volunteer Fire & Rescue Company is finally getting the station its crews deserve — backed by $9 million secured in the federal transportation bill.",
    body: [
      "Few institutions hold our community together like the Middle River Volunteer Fire & Rescue Company. As a Middle River resident — and someone proud to serve on its board — I have seen up close what these volunteers give to their neighbors. So it is a genuine honor to share that they are getting a brand-new station, backed by $9 million in federal funding.",
      "The money was appropriated by Congress as part of the Fiscal Year 2026 Transportation Bill and secured by Congressman Andy Harris. Delegate Kathy Szeliga and I were glad to work alongside our federal and local partners to push it across the finish line. This is what it looks like when every level of government pulls in the same direction for a community.",
      "It matters because our volunteers have been answering calls out of aging infrastructure for far too long. As I said when the funding was announced, “these brave first responders will now have the facilities and resources necessary to respond quickly, safely, and effectively.” Delegate Szeliga put it well, too: the grant “will go a long way toward making Middle River safer by bringing modern infrastructure.”",
      "There is also a taxpayer story here. Volunteer companies save our community enormous sums every year compared with fully paid departments. Standing behind them with modern facilities isn't just the right thing to do for the people who run toward danger — it's a smart investment that keeps response times short and costs down. Funding core public-safety needs first is exactly where government should start.",
    ],
    keyPoints: [
      "$9 million in federal funding for a new Middle River Volunteer Fire & Rescue station.",
      "Secured by Rep. Andy Harris in the FY2026 Transportation Bill; championed locally by Nawrocki and Szeliga.",
      "Replaces aging infrastructure with modern facilities for faster, safer response.",
      "Backs the volunteers who save taxpayers money — public safety funded first.",
    ],
    pullQuote:
      "These brave first responders will now have the facilities and resources necessary to respond quickly, safely, and effectively.",
    sources: [
      {
        label: "Middle River Volunteer Fire & Rescue secures $9 million for new station",
        href: "https://nottinghammd.com/2026/03/03/middle-river-volunteer-fire-rescue-secures-9-million-for-new-station/",
        publisher: "Nottingham MD",
      },
      {
        label: "Middle River station to receive funding for new building",
        href: "https://www.eastcountytimes.com/middle-river/middle-river-station-to-receive-funding-for-new-building/",
        publisher: "East County Times",
      },
    ],
    image: {
      src: "/images/priorities/first-responders-volunteer-fire-ems.png",
      alt: "A volunteer fire engine in its station bay",
    },
  },
  {
    slug: "deer-management",
    title: "A real plan for Baltimore County's deer problem.",
    topic: "Local Issues",
    date: "2025-01",
    author: "Delegate Ryan Nawrocki",
    readTime: "3 min read",
    excerpt:
      "My bill, HB173, requires Baltimore County to adopt a comprehensive deer-management plan — to cut down on crashes, crop and garden loss, and tick-borne disease.",
    dek: "Deer overpopulation isn't just a nuisance — it's a public-safety, property, and public-health issue. HB173 directs Baltimore County to finally manage it with a real plan.",
    body: [
      "Talk to neighbors in Perry Hall, Kingsville, Glen Arm, or Baldwin and you will hear the same stories: totaled cars from deer darting across dark roads, vegetable gardens and landscaping stripped overnight, and a steady worry about ticks and Lyme disease. Deer overpopulation is a daily reality across District 7A, and for too long the response has been to do nothing.",
      "That is why I introduced HB173, the Baltimore County Deer Management Program — Establishment, cosponsored by Delegate Kathy Szeliga. The bill requires Baltimore County to create a comprehensive deer-management plan for the lands it controls, rather than leaving residents to absorb the damage on their own.",
      "This is a practical, three-part problem. There is a safety cost in vehicle collisions and the insurance bills and injuries that follow. There is a property cost as deer destroy gardens, crops, and landscaping that families pay good money to maintain. And there is a public-health cost in the tick-borne illnesses that track deer populations. A coordinated plan is simply better stewardship than pretending the problem will solve itself.",
      "This is common-sense, locally-driven government: let the county manage its own land responsibly, with a plan that reflects what residents are actually living with. It's a small bill, but it speaks to a bigger principle — government should take the everyday concerns of its citizens seriously.",
    ],
    keyPoints: [
      "HB173 requires Baltimore County to adopt a comprehensive deer-management plan for county lands.",
      "Targets the real costs: vehicle crashes, property and crop damage, and tick-borne disease.",
      "Cosponsored with Delegate Kathy Szeliga.",
      "Common-sense, locally-driven stewardship of county land.",
    ],
    pullQuote:
      "Deer overpopulation is a public-safety and property issue — and District 7A families have lived with it long enough.",
    links: [
      {
        label: "HB173 — official bill page (Maryland General Assembly)",
        href: "https://mgaleg.maryland.gov/mgawebsite/Legislation/Details/hb0173?ys=2025RS",
      },
    ],
    sources: [
      {
        label: "Baltimore County takes bold step toward addressing deer overpopulation",
        href: "https://nottinghammd.com/2025/01/29/now-you-know-baltimore-county-takes-bold-step-toward-addressing-deer-overpopulation/",
        publisher: "Nottingham MD",
      },
    ],
    image: {
      src: "/images/priorities/protecting-from-overdevelopment.png",
      alt: "Open farmland and trees in Baltimore County",
    },
  },
  {
    slug: "hb202-anti-squatters",
    title: "Maryland must protect property owners from squatters.",
    topic: "Housing & Property Rights",
    date: "2025-01",
    author: "Delegate Ryan Nawrocki",
    readTime: "5 min read",
    excerpt:
      "Common-sense legislation to protect Maryland homeowners, hold criminals accountable, and restore the rule of law.",
    dek: "During the 2025 Session I introduced HB202 to make organized squatting a crime — because a family should never have to fight in civil court for months to get strangers out of the home they own.",
    body: [
      "Maryland is facing a challenge that strikes at the very heart of what we hold dear — our homes, our neighborhoods, and our sense of security. During the 2025 Legislative Session, I introduced HB202 — Criminal Law – Fraud – Conveyance, Lease, or Possession of Residential Real Property, a bill designed to address the growing problem of squatting. It is a common-sense solution to protect property owners, hold criminals accountable, and restore faith in the rule of law.",
      "This is not an abstract problem here in Baltimore County. We have all heard the stories now — a homeowner travels for work or a family loses a loved one and leaves a house briefly empty, only to come home and find strangers living inside, claiming a lease that was never signed. In one case that drew statewide attention, squatters took over a Baltimore County home and the owners discovered just how little the law did to help them. Online schemes now coach people on how to move into someone else's property and manufacture paperwork to make the occupation look legitimate.",
      "Here is the part that outrages so many of my constituents: under the way our system works today, this is too often treated as a civil dispute rather than a crime. That means the rightful owner — who is still paying the mortgage, the property taxes, and the utilities — has to hire a lawyer and fight through the courts for weeks or months to remove people who broke in and never had any right to be there. Meanwhile the criminals who exploit the system face little to no consequence. That is backwards.",
      "HB202 fixes that imbalance. It targets the fraud at the center of these schemes — the fake leases and counterfeit documents that organized squatters use — and attaches real, clear penalties to creating and using them. With genuine consequences on the books, the law becomes a deterrent to anyone contemplating the unlawful occupancy of another person's home, and it gives law enforcement a tool to act instead of telling honest families that there is nothing they can do.",
      "I have heard the critics, and I take the concerns seriously. Some worried about the cost of prosecuting new cases and about protecting legitimate tenants. Those are fair points, and good legislation should be careful to distinguish a renter in a real dispute from a criminal who forged a lease. But the answer to that is to refine the bill, not to leave Maryland families defenseless. The status quo already has a cost — it is just paid by the victims instead of the offenders.",
      "This issue is bigger than any one bill. The sanctity of homeownership is a cornerstone of the American dream and a pillar of strong neighborhoods. When government fails to defend basic property rights, it erodes trust in the rule of law itself. I will keep fighting to give Maryland homeowners the protection they deserve, and I am encouraged that the broader effort to speed up the removal of fraudulent occupants has begun to win bipartisan support. We owe that to every family that has worked and saved to own a home in District 7A.",
    ],
    keyPoints: [
      "Organized squatting backed by forged leases should be treated as a crime, not a slow civil dispute.",
      "Honest homeowners — not criminals — currently bear the cost and burden of removal. That must be reversed.",
      "Clear penalties for counterfeit leases and documents will deter the schemes before they start.",
      "Property rights and homeownership are cornerstones of strong neighborhoods and the rule of law.",
      "Refine the bill to protect legitimate tenants, but never leave families defenseless.",
    ],
    pullQuote:
      "A family should never have to fight for months in civil court to remove strangers from the home they own and still pay the mortgage on.",
    links: [
      {
        label: "HB202 — official bill page (Maryland General Assembly)",
        href: "https://mgaleg.maryland.gov/mgawebsite/Legislation/Details/hb0202?ys=2025RS",
      },
      {
        label:
          "Baltimore Sun guest commentary — “Maryland must protect property owners from squatters.”",
        href: "https://www.baltimoresun.com/2025/01/19/maryland-must-protect-property-owners-from-squatters-guest-commentary/",
      },
    ],
    sources: [
      {
        label: "HB202: Criminal Law – Fraud – Conveyance, Lease, or Possession of Residential Real Property",
        href: "https://mgaleg.maryland.gov/mgawebsite/Legislation/Details/hb0202?ys=2025RS",
        publisher: "Maryland General Assembly",
      },
      {
        label: "Maryland must protect property owners from squatters | Guest Commentary",
        href: "https://www.baltimoresun.com/2025/01/19/maryland-must-protect-property-owners-from-squatters-guest-commentary/",
        publisher: "The Baltimore Sun",
      },
      {
        label: "Squatters took over a Baltimore County home. A proposed law could make it easier to get them out.",
        href: "https://www.cbsnews.com/baltimore/news/maryland-squatters-leasing-homes-law-legislation-scam/",
        publisher: "CBS News Baltimore",
      },
      {
        label: "Squatters in Baltimore County home inspire bill seeking reform",
        href: "https://patch.com/maryland/towson/squatters-baltimore-county-home-inspire-bill-seeking-reform-report",
        publisher: "Towson Patch",
      },
    ],
    image: {
      src: "/images/584546603_1262366352376382_7717335952773960812_n.jpg",
      alt: "Delegate Nawrocki at a press conference with the Maryland flag",
    },
  },
  {
    slug: "power-lines-and-brandon-shores",
    title: "Stop the power lines. Keep Brandon Shores open.",
    topic: "Energy & Environment",
    date: "2025-02",
    author: "Delegate Ryan Nawrocki",
    readTime: "6 min read",
    excerpt:
      "Power lines through our farmlands and the fight to keep our reliable energy infrastructure online.",
    dek: "Maryland created its own reliability crisis by shutting down dependable power generation — and now families are being asked to pay for it twice, with higher bills and high-voltage towers cutting across our land.",
    body: [
      "I strongly oppose the proposed massive expansion of high-voltage power lines through much of our region's rural and agricultural areas. The Maryland Piedmont Reliability Project (MPRP) — a roughly 70-mile, 500-kilovolt transmission line proposed by PSEG and routed through Baltimore, Carroll, and Frederick counties — would carve a permanent scar across working farmland, forest, and family property. Many landowners learned about it only when surveyors started asking to come onto their land. That is not how we should treat the people who feed our state and steward its open spaces.",
      "Here is what frustrates me most: this is a problem Maryland created for itself. The grid operator, PJM, says new transmission is needed because demand is climbing — driven in large part by enormous new data centers — at the very same time the state's energy policies are forcing reliable, in-state generation offline. The Brandon Shores plant near Baltimore is already being kept running past its planned retirement under a costly 'must-run' (RMR) arrangement precisely because the grid cannot afford to lose that power. We are paying premium rates to keep a plant we told to close, while being told we must also tear up farmland to import electricity from somewhere else.",
      "There is a simpler, more honest solution — keep Brandon Shores and our other dependable generation online. It's time to demand that energy in Maryland be a diversified portfolio of reliable, affordable options instead of a one-way bet that leaves us dependent on imports and vulnerable to blackouts. When you generate power close to where it's used, you don't need to bulldoze a 70-mile corridor to bring it in. Energy policy should keep the lights on and bills down for working families — not chase mandates that do the opposite.",
      "The stakes for District 7A and our neighbors are real. Independent estimates and PJM's own warnings make clear that ratepayers will shoulder the cost of these projects through higher electric bills, even as the reliability picture grows tighter. Families and seniors on fixed incomes in Middle River, Perry Hall, White Marsh, and across eastern Baltimore County already feel squeezed by the cost of living. They should not be the ones paying for Annapolis's energy mistakes.",
      "This fight is not over, and your voice matters. The project sits before the Maryland Public Service Commission as Case No. 9748, and the PSC must decide whether to grant the certificate the developer needs. Public comment is a real and impactful part of that process. I am urging every constituent — and your family, friends, and neighbors — to submit comments to the PSC stating your opposition. You can file and search public comments through the Commission's website and reference Case No. 9748 directly.",
      "I will continue to stand with the landowners, farmers, and ratepayers who are bearing the brunt of these decisions. Property rights, affordable energy, and local control are not competing values — they are the foundation of a state that works for the people who live in it. Let's protect our farmland, keep our reliable power online, and stop forcing families to pay more for less.",
    ],
    keyPoints: [
      "Oppose the 70-mile MPRP high-voltage line cutting through Baltimore, Carroll, and Frederick county farmland.",
      "Keep Brandon Shores and other reliable in-state generation online instead of importing power.",
      "Maryland's own energy mandates created this reliability crunch — don't make families pay for it twice.",
      "Protect property rights and farmland from forced surveys and a permanent transmission corridor.",
      "Demand a diversified, affordable, dependable energy portfolio that keeps the lights on.",
      "File public comments with the PSC on Case No. 9748 — your opposition is on the record.",
    ],
    pullQuote:
      "We're paying premium rates to keep open a plant we told to close — while being asked to tear up farmland to import the very power we already had.",
    bullets: [
      "Stop your electric bill from increasing.",
      "Stop this unnecessary high-voltage power line project.",
      "Protect the environment — our precious farmlands and forestry.",
      "Keep the lights on by stopping the closure of Brandon Shores.",
    ],
    links: [
      {
        label: "PSC — make a public comment (reference Case No. 9748)",
        href: "https://psc.maryland.gov/make-a-public-comment/",
      },
      {
        label: "PSC — Maryland Piedmont Reliability Project information page",
        href: "https://psc.maryland.gov/pseg-maryland-piedmont-reliability-project/",
      },
    ],
    sources: [
      {
        label: "Maryland Piedmont Reliability Project",
        href: "https://psc.maryland.gov/pseg-maryland-piedmont-reliability-project/",
        publisher: "Maryland Public Service Commission",
      },
      {
        label: "Piedmont power line developer wants regulators to move more quickly than planned",
        href: "https://marylandmatters.org/2025/10/13/piedmont-line-mprp-pseg-psc-review/",
        publisher: "Maryland Matters",
      },
      {
        label: "Maryland landowners speak out against controversial transmission line project",
        href: "https://www.cbsnews.com/baltimore/news/maryland-public-service-commission-piedmont-reliability-project/",
        publisher: "CBS News Baltimore",
      },
      {
        label: "Case 9748 — BGE Brandon Shores Project Fact Sheet",
        href: "https://dnr.maryland.gov/pprp/Documents/Case-9748-BGE-Brandon-Shores-Project-Fact-Sheet-8-30-24.pdf",
        publisher: "Maryland Dept. of Natural Resources (PPRP)",
      },
    ],
    image: {
      src: "/images/689020973_1387987659814250_6988994727670242851_n.jpg",
      alt: "Delegate Nawrocki touring a Baltimore County industrial facility",
    },
  },
  {
    slug: "war-on-drivers",
    title: "The War on Drivers — 338 new or increased taxes and fees.",
    topic: "Taxes",
    date: "2024-06",
    author: "Delegate Ryan Nawrocki",
    readTime: "5 min read",
    excerpt:
      "Tracking the 338 new or increased taxes and fees laid upon Marylanders by the Moore Administration.",
    dek: "When government taxes the cars working families depend on, it taxes the middle class itself — and far too much of it happens quietly through regulation, where you don't find out until the bill arrives.",
    body: [
      "The House Republican Caucus has tallied the total amount of taxes and fees laid upon Marylanders since Governor Moore took office: 338 new or increased taxes and fees. Of those, 38 were the direct product of the 2024 Legislative Session — including a new paint tax, a tax on rideshare trips, increases in the cigarette tax, and substantial increases in vehicle registration fees. I voted against each one of these bills, and I voted against the operating budget that fueled the spending behind them.",
      "Put this in perspective. From 2007 to 2014, the O'Malley Administration raised 84 taxes, tolls, and fees over a full eight years. We were barely halfway through the Moore Administration's second year and the count of new or increased taxes and fees had already climbed to nearly four times that number. This is not belt-tightening. It is a fundamental shift toward asking Maryland families to pay more, year after year, for a government that keeps growing.",
      "I call this the war on drivers because so much of the burden lands on the cars working people depend on to get to their jobs, drop their kids at school, and run their small businesses. When you wage a war on cars, you are really waging a war on the middle class — because the middle class is who drives those cars. A single mom commuting from Middle River, a contractor in Perry Hall, a senior in Parkville on a fixed income — none of them can simply opt out of registering their vehicle or filling their tank.",
      "What troubles me just as much as the dollar amount is how it's being done. The vast majority of these increases did not come through open votes on the House floor where the public can watch and hold us accountable. They came through regulation — quietly approved through state agencies and the Administrative, Executive, and Legislative Review (AELR) process. The Motor Vehicle Administration alone brought forward dozens of increases to driver's license charges and related fees. Under the way that process works, most Marylanders never learn a fee has gone up until they have to pay it.",
      "I want to be straight with my constituents about the debate around the number. Critics have pushed back on the 338 figure, noting that some items are recurring increases counted across multiple years rather than 338 brand-new taxes. That's a fair point worth understanding — but it doesn't change the core truth families feel every month: the cost of living under this government keeps rising, the budget has roughly doubled over the last decade, and the trajectory is unsustainable. Whether you count it one way or another, Marylanders are paying more.",
      "My answer is the conservative one, and it doesn't change with the political winds: curtail the spending, prioritize the budget around core services, and stop reaching into the pockets of working families to paper over Annapolis's appetite for growth. I will keep voting no on tax and fee hikes, keep demanding real spending discipline, and keep shining a light on the increases that the majority would rather slip through in regulation. Marylanders deserve a government that lives within its means — the same way every family in District 7A has to.",
    ],
    keyPoints: [
      "338 new or increased taxes and fees have been imposed since Governor Moore took office — 38 from the 2024 session alone.",
      "I voted against each of those tax-and-fee bills and against the operating budget driving the spending.",
      "Vehicle registration and driver's-license fee hikes hit the working families who can least avoid them.",
      "Most increases came quietly through regulation, not floor votes — families find out when the bill arrives.",
      "The state budget has roughly doubled in a decade; the answer is spending discipline, not higher fees.",
    ],
    pullQuote:
      "When you wage a war on cars, you wage a war on the middle class — because the middle class is who drives the cars.",
    sources: [
      {
        label: "Governor Wes Moore administration imposes 338 new or increased taxes and fees",
        href: "https://marylandreporter.com/2024/06/09/governor-wes-moore-administration-imposes-338-new-or-increased-taxes-and-fees/",
        publisher: "MarylandReporter.com",
      },
      {
        label: "House Republicans call on Moore to veto fee bills",
        href: "https://marylandmatters.org/briefs/house-republicans-call-on-moore-to-veto-fee-bills/",
        publisher: "Maryland Matters",
      },
      {
        label: "Republicans decry middle-class tax impacts of budget plan on Marylanders",
        href: "https://foxbaltimore.com/news/local/republicans-decry-middle-class-tax-impacts-of-budget-plan-on-marylanders",
        publisher: "FOX45 News Baltimore",
      },
    ],
    image: {
      src: "/images/672672916_1370489128230770_8338417330306756349_n.jpg",
      alt: "Delegate Nawrocki taking notes at his desk in the House of Delegates",
    },
  },
  {
    slug: "immigration-and-public-safety",
    title: "Public safety is not a political maneuver.",
    topic: "Immigration & Public Safety",
    date: "2024-06",
    author: "Delegate Ryan Nawrocki",
    readTime: "4 min read",
    excerpt:
      "When violent offenders are released without ICE cooperation, the public — and law enforcement — pay the price.",
    dek: "When a convicted offender is released in defiance of a federal detainer, it isn't a statement about immigration policy — it's a danger to our neighborhoods and to the officers who then have to find that person again.",
    body: [
      "I firmly believe that public safety is not something that should ever be subject to political maneuvering. When a violent offender or sex offender is released after being detained — without honoring a request to cooperate with federal immigration authorities — there is real potential not only to endanger the public but to create more dangerous encounters for the law enforcement officers who will then have to locate that individual, often under far more volatile circumstances.",
      "This is not a hypothetical for Baltimore County. In the spring of 2024, the county's Department of Corrections released a man who had pleaded guilty to a sexual offense and assault, even though Immigration and Customs Enforcement had lodged a detainer asking that he be held briefly so federal agents could take custody. He was let go, back into our community, instead of being held for the short window ICE requested. That case rightly alarmed families across the county.",
      "Together with Delegate Kathy Szeliga, I sent a letter to the County Executive asking for a clear explanation of the county's policies on ICE detainers. Our point was simple and practical: a corrections department should be more than capable of holding a person who poses a documented threat to the public for the short amount of time it takes for federal authorities to act. This is about basic coordination between agencies whose shared job is to keep people safe.",
      "The deeper problem is a set of policies that put the politics of immigration ahead of the safety of residents. Baltimore County's restrictions on cooperation trace back years, and the state has moved further in that direction — limiting the ability of local jurisdictions to work with ICE even in cases involving serious, convicted offenders. I understand the broader immigration debate is contentious. But there is a world of difference between that debate and the narrow, common-sense question of whether a county should hold a convicted violent or sexual offender for federal pickup. On that question, the answer should not be hard.",
      "Supporting the rule of law and standing with the men and women of law enforcement are core to who I am and who I represent. The officers and troopers who serve eastern Baltimore County put themselves in harm's way every day. We owe them policies that don't needlessly send them back out to re-apprehend dangerous individuals who could have been handed off safely the first time. And we owe every family in District 7A a government whose first duty — keeping them safe — is never traded away for a political point.",
    ],
    keyPoints: [
      "Honoring a federal detainer for a convicted violent or sex offender is a public-safety basic, not a policy statement.",
      "Releasing dangerous offenders forces officers to re-apprehend them later in far more dangerous situations.",
      "I joined Delegate Szeliga in demanding answers on Baltimore County's ICE-detainer policy after a 2024 release.",
      "A corrections department can easily hold a documented threat for the short window federal authorities need.",
      "Back the blue and uphold the rule of law — public safety must never be a political maneuver.",
    ],
    pullQuote:
      "A jail can hold a convicted offender for the short time federal authorities need — refusing to do so endangers the public and our officers alike.",
    sources: [
      {
        label: "ICE and Baltimore County modify policies after sex offender who entered U.S. illegally is released",
        href: "https://www.baltimoresun.com/2024/06/06/fox45-ice-and-baltimore-county-modify-policies-after-sex-offender-who-entered-u-s-illegally-is-released/",
        publisher: "The Baltimore Sun / FOX45",
      },
      {
        label: "Baltimore County ignored directive to check detainers for illegal immigrant child sex offender",
        href: "https://www.wjla.com/news/local/balt-county-ignored-directive-to-check-detainers-for-illegal-immigrant-child-sex-offender-johnny-olzsewski-jr-bmore-baltimore-unlawful-undocumented-crime-detainer-ice-immigration-border-maryland-news-rule-law-raul-calderon-interiano-jan-marshall-alexande",
        publisher: "WJLA / ABC7",
      },
      {
        label: "Baltimore County's sanctuary policy under fire after release of convicted offender",
        href: "https://foxbaltimore.com/news/local/baltimore-countys-sanctuary-policy-under-fire-after-release-of-convicted-offender",
        publisher: "FOX45 News Baltimore",
      },
    ],
    image: {
      src: "/images/686163538_1384120770200939_2104656477133690289_n.jpg",
      alt: "Delegate Nawrocki with Senator and a Maryland State Trooper",
    },
  },
  {
    slug: "housing-expansion-act",
    title: "Dangerous Baltimore County and State housing bills.",
    topic: "Housing",
    date: "2024-03",
    author: "Delegate Ryan Nawrocki",
    readTime: "5 min read",
    excerpt:
      "Why the Housing Expansion and Affordability Act removes protections counties have spent years requesting.",
    dek: "Annapolis wants to override local zoning and strip away the very guardrails that make sure schools, roads, and infrastructure can keep up with new development — exactly the protections our community has been fighting to strengthen.",
    body: [
      "Governor Moore testified before the Environment and Transportation Committee — the committee on which I serve — to support his administration's bill, the Housing Expansion and Affordability Act of 2024 (HB538). During a controversial hearing, the Governor and other proponents faced difficult questions and challenges from committee members on both sides of the aisle. I asked pointed questions about what this legislation does to the guardrails that accompany an Adequate Public Facilities Ordinance (APFO) — the local rules that tie new development to whether our schools, roads, and infrastructure can actually handle it.",
      "An APFO is not red tape for its own sake. It is the mechanism that protects families from overcrowded classrooms and gridlocked roads when builders want to put up more units than the surrounding infrastructure can support. In a fast-growing area like eastern and northeastern Baltimore County, those protections are essential. Strengthening them — not weakening them — is exactly what our community has been asking for.",
      "That's what makes this so frustrating. Removing or overriding APFO protections is the opposite of what the Baltimore County delegation and the County Council have been requesting for years. In February 2023, the delegates penned a letter on this very issue to then-County Executive Johnny Olszewski and former Council Chairman Julian Jones — and never received a response. We have been sounding the alarm about infrastructure keeping pace with growth for a long time, and Annapolis has now chosen to move in the wrong direction.",
      "The core problem with the state's approach is that it takes zoning and land-use decisions out of local hands and centralizes them in Annapolis. I believe deeply in local control. The people who live in Perry Hall, White Marsh, Middle River, and Kingsville — and the local officials they elect — understand their own neighborhoods far better than a state mandate ever could. A one-size-fits-all density requirement imposed from above ignores the real differences between communities and the real limits of local infrastructure.",
      "I am not against housing or against young families being able to afford a home — far from it. But you don't make housing more affordable by steamrolling the safeguards that keep growth responsible. Affordability comes from reducing the taxes, fees, and regulatory costs that drive up the price of everything, and from letting communities plan growth that their schools and roads can actually support. Stripping local guardrails just shifts the costs onto existing residents and the very families this is supposed to help.",
      "I will keep standing up for local control, for property owners, and for the principle that the people closest to a community should make the decisions that shape it. Our neighborhoods are not Annapolis's to redraw from a desk in the capital. I'll continue asking the hard questions in committee and pushing back on mandates that override the protections our families and our County have spent years working to secure.",
    ],
    keyPoints: [
      "Land-use and zoning decisions belong with local communities — not centralized in Annapolis.",
      "APFO guardrails tie new development to school, road, and infrastructure capacity — they protect families.",
      "The Baltimore County delegation has asked to strengthen these protections for years; the state weakened them instead.",
      "Real affordability comes from lower taxes, fees, and regulatory costs — not from overriding local safeguards.",
      "I serve on the Environment & Transportation Committee and questioned the bill directly at its hearing.",
    ],
    pullQuote:
      "You don't make housing more affordable by steamrolling the safeguards that keep our schools and roads from being overwhelmed by growth.",
    links: [
      {
        label: "HB538 — Housing Expansion and Affordability Act of 2024 (Maryland General Assembly)",
        href: "https://mgaleg.maryland.gov/mgawebsite/Legislation/Details/hb0538?ys=2024RS",
      },
    ],
    sources: [
      {
        label: "HB538: Land Use – Affordable Housing – Zoning Density and Permitting (Housing Expansion and Affordability Act of 2024)",
        href: "https://mgaleg.maryland.gov/mgawebsite/Legislation/Details/hb0538?ys=2024RS",
        publisher: "Maryland General Assembly",
      },
      {
        label: "Housing Expansion & Affordability Act (HB538) — guidance for county and municipal officials",
        href: "https://dhcd.maryland.gov/TurningTheKey/Documents/Housing-Expansion-Affordability-Act-HB538.pdf",
        publisher: "Maryland Dept. of Housing & Community Development",
      },
      {
        label: "Revisiting Adequate Public Facilities Ordinances (APFOs) in Maryland",
        href: "https://www.umdsmartgrowth.org/news/apfo-2025/",
        publisher: "National Center for Smart Growth, University of Maryland",
      },
    ],
    image: {
      src: "/images/645446748_1339363261343357_6092768245358700287_n.jpg",
      alt: "Delegate Nawrocki speaking on the floor of the Maryland House of Delegates",
    },
  },
  {
    slug: "air-national-guard-flying-mission",
    title: "Say NO to removing the flying mission of the Maryland Air National Guard.",
    topic: "National Security & Local Economy",
    date: "2024-09",
    author: "Delegate Ryan Nawrocki",
    readTime: "6 min read",
    excerpt:
      "Eliminating Maryland’s flying mission would erase 545 careers and the only joint-force fighter operation in the nation.",
    dek: "Stripping the Maryland Air National Guard of its flying mission would make us the only state in the nation without one — surrendering a unique national-security asset and the jobs that anchor Middle River.",
    body: [
      "The citizen airmen and airwomen of the Maryland Air National Guard have flown active missions since 1921, and they have answered the call in dozens of deployments around the world since September 11, 2001. Warfield Air National Guard Base at Martin State Airport is home to roughly 545 pilots and maintainers and has earned numerous Air Force awards for its readiness. The loss of the flying mission in Maryland could mean ending the direct careers of those 545 highly qualified military personnel — and thousands of indirect jobs that depend on the base.",
      "This threat is no longer abstract. The Air Force has moved to divest the 175th Wing's fleet of A-10C Thunderbolt II 'Warthog' aircraft, with the first jet departing for the boneyard at Davis-Monthan in Arizona in March 2025 and an inactivation ceremony for the storied 104th Fighter Squadron held that September as the final aircraft left. The proposed path forward would leave the wing with only a cyber mission unless a replacement flying mission is secured. State and military leaders have made clear that Maryland's airmen — and the state — should not be left as the only ones in the country without a flying mission.",
      "The economic stakes for our community are enormous. If the flight mission is taken away, Martin State Airport and the State of Maryland would suffer a substantial negative economic impact of tens of millions of dollars. This is felt right here at home — in Middle River and across eastern Baltimore County — in payroll, in local contracts, and in the skilled, good-paying careers that the base sustains for our neighbors.",
      "The history makes the stakes even clearer. The National Park Service has recognized Baltimore County for its contributions to America's World War II effort through its Heritage program, honoring the towns, counties, and citizens who stepped into the workforce to support the war. Middle River was central to that story: the Glenn L. Martin plant here built thousands of aircraft and employed tens of thousands of workers, helping arm the nation in its hour of need. This is hallowed ground in American aviation history, and the flying mission is a living continuation of that legacy.",
      "Most important is what Maryland's mission means to our national defense. In a briefing on the potential removal, leadership emphasized that Maryland's is the only location in the nation pairing a joint force of fighter operations with offensive and defensive full-spectrum intelligence operations. The long-term training and the exquisite skill set required to maintain that joint capability exist only here. In an era when modern warfare turns on swift, decisive action, walking away from that capability would weaken our national security. This is a strategic advantage we cannot afford to lose.",
      "I will keep fighting alongside our congressional delegation, state leaders, and the Guard's own command to secure a replacement flying mission and keep Maryland in the air. Standing with our military and the men and women who serve is not negotiable for me. We owe it to these airmen, to their families, to the local economy they support, and to a nation that is safer because of the unique capability based right here in District 7A.",
    ],
    keyPoints: [
      "Losing the flying mission would make Maryland the only state in the nation without one.",
      "Roughly 545 pilots and maintainers — plus thousands of indirect jobs — are at stake at Warfield/Martin State.",
      "Maryland uniquely pairs joint fighter operations with full-spectrum intelligence — a national-security asset.",
      "The economic hit to Martin State and Maryland would run into the tens of millions of dollars.",
      "Middle River's aviation heritage and the Guard's century of service demand we keep the mission here.",
      "Secure a replacement flying mission — don't relegate the 175th Wing to a cyber-only future.",
    ],
    pullQuote:
      "Surrendering this mission would make Maryland the only state without a flying wing — and throw away a national-security capability that exists nowhere else.",
    sources: [
      {
        label: "As Maryland ANG A-10 departs for the boneyard, its future flying mission is in doubt",
        href: "https://www.airandspaceforces.com/maryland-ang-farewell-first-a-10/",
        publisher: "Air & Space Forces Magazine",
      },
      {
        label: "Maryland Air National Guard hosts inactivation ceremony before departure of final A-10s",
        href: "https://www.175wg.ang.af.mil/News/Article-Display/Article/4313377/maryland-air-national-guard-hosts-inactivation-ceremony-before-departure-of-fin/",
        publisher: "175th Wing, Maryland Air National Guard",
      },
      {
        label: "End of an era: Maryland Air National Guard gives up treasured A-10C Thunderbolts",
        href: "https://www.wmar2news.com/local/end-of-an-era-maryland-air-national-guard-gives-up-treasured-a-10c-thunderbolts",
        publisher: "WMAR-2 News Baltimore",
      },
      {
        label: "Baltimore County, Maryland — World War II heritage",
        href: "https://www.nps.gov/articles/000/baltimore-county-maryland.htm",
        publisher: "U.S. National Park Service",
      },
    ],
    image: {
      src: "/images/588512414_1266055232007494_3344370248710133705_n.jpg",
      alt: "Delegate Nawrocki at Martin State Airport in front of the American flag",
    },
  },
  {
    slug: "eastern-avenue-traffic",
    title: "Eastern Avenue traffic — enough is enough.",
    topic: "Local Issues",
    date: "2025-07",
    author: "Delegate Ryan Nawrocki",
    readTime: "4 min read",
    excerpt:
      "Working with SHA, Senator Jennings, Councilman Marks, and Delegate Szeliga to slow down Eastern Boulevard.",
    dek: "The Eastern Boulevard corridor has become one of the most dangerous stretches of road in Baltimore County — and our families have waited long enough for the state to act.",
    body: [
      "I am deeply concerned about the dangerous traffic along the Eastern Boulevard corridor. This is one of the most hazardous roadways in Baltimore County, with far too many serious crashes — and tragically, fatalities — on this stretch. Speed has been identified again and again as a major factor. For the families who live, work, and walk along this road, this is not a statistic. It is their daily reality, and it has gone on too long.",
      "I have been working on this alongside Delegate Kathy Szeliga, Baltimore County Councilman David Marks, and Senator J.B. Jennings. After yet another crash in the corridor, we issued a joint statement urging the State Highway Administration to take immediate action rather than wait for the slow grind of bureaucracy. The community made its voice heard, too — residents turned out to a public meeting hosted by SHA at the local VFW to demand change.",
      "Our asks have been concrete and practical. We have pressed SHA to lower the speed limit on this corridor, to install measures that physically slow traffic, and to follow through on a full traffic safety study of the most dangerous segment. These are not exotic or expensive solutions — they are proven tools the state can deploy now to save lives, and there is no good reason to delay them.",
      "I want to be candid about the frustration here. Eastern Boulevard is a state road, which means the most important safety decisions rest with SHA, not the county. Local officials across party lines have been raising the alarm and gathering workgroups on this corridor — in some cases before a fatality occurred — and pushing for state funding and attention. Too often the response has been studies and timelines while the danger remains. Our residents deserve urgency that matches the risk.",
      "I will keep monitoring SHA's traffic study and keep the pressure on until we see real, physical changes in the road — not just promises. Public safety is a core responsibility of government, and that includes the roads our families travel every single day. I'll continue working with my colleagues, regardless of party, to make Eastern Boulevard safer for everyone in our community.",
    ],
    keyPoints: [
      "Eastern Boulevard is among the most dangerous corridors in Baltimore County — speed is a leading factor.",
      "Push SHA to lower the speed limit and install measures that physically slow traffic now.",
      "Follow through on a full traffic safety study of the most hazardous segment.",
      "Working across party lines with Del. Szeliga, Councilman Marks, and Sen. Jennings.",
      "Demand state urgency that matches the risk — our families have waited long enough.",
    ],
    pullQuote:
      "These aren't exotic fixes — lower speed limits and traffic-calming are proven tools the state can deploy now to save lives on Eastern Boulevard.",
    sources: [
      {
        label: "Delegates Nawrocki, Szeliga urge immediate action following Eastern Boulevard traffic meeting",
        href: "https://www.nottinghammd.com/2025/07/03/delegates-nawrocki-szeliga-urge-immediate-action-following-eastern-boulevard-traffic-meeting/",
        publisher: "Nottingham MD",
      },
      {
        label: "Eastern Boulevard traffic safety study the focus of a community meeting",
        href: "https://www.wmar2news.com/news/region/baltimore-county/eastern-boulevard-traffic-safety-study-the-focus-of-a-community-meeting",
        publisher: "WMAR-2 News Baltimore",
      },
      {
        label: "Councilman Marks pushes for state funding at three local corridors",
        href: "https://www.nottinghammd.com/2024/10/21/councilman-marks-pushes-for-state-funding-at-three-local-corridors/",
        publisher: "Nottingham MD",
      },
    ],
    image: {
      src: "/images/700625466_1394039969209019_537555043998327653_n.jpg",
      alt: "Delegate Nawrocki meeting with constituents alongside Delegate Szeliga",
    },
  },
  {
    slug: "rocket-lab-middle-river",
    title: "Rocket Lab Space Structures Complex — Middle River’s next chapter.",
    topic: "Economic Development",
    date: "2023-11-17",
    author: "Delegate Ryan Nawrocki",
    readTime: "4 min read",
    excerpt:
      "Honored to attend the announcement of the new Space Structures Complex in Middle River.",
    dek: "A global leader in space manufacturing chose Middle River — bringing skilled jobs and a new chapter that builds directly on our community's century of aviation heritage.",
    body: [
      "I was honored to be on hand for the announcement of Rocket Lab's new Space Structures Complex right here in Middle River. This is exactly the kind of economic news our community deserves — a world leader in the space industry choosing eastern Baltimore County as the place to build advanced products for spacecraft and rockets. It is a vote of confidence in our workforce, our location, and our future.",
      "The new complex is being established in roughly 113,000 square feet at the former Lockheed Martin Vertical Launch Building on Eastern Boulevard. There, Rocket Lab plans to manufacture carbon-composite spacecraft structures, satellite dispensers, panels and assemblies, pressure vessels, and more — including structures that will support the company's larger Neutron launch vehicle. The company anticipated creating dozens of permanent, full-time jobs as the operation ramps up, with room to grow.",
      "There is a powerful symmetry to this. Middle River was once the home of the Glenn L. Martin Company, where tens of thousands of workers built the aircraft that helped win World War II. That legacy of aerospace manufacturing is part of who we are. Now, a new generation of skilled men and women will once again build flight hardware in the very same community — this time for missions reaching into space. Our heritage isn't just history; it's a foundation for what comes next.",
      "This is what good economic development looks like: high-skill, good-paying private-sector jobs, capital investment in an existing facility, and an employer that strengthens the tax base instead of leaning on it. When we make Maryland a place where innovative companies actually want to locate and grow, our families win — with opportunity close to home and careers that let the next generation stay and thrive in the community they grew up in.",
      "My job is to keep working to make sure investments like this can take root and expand here. That means championing affordable energy, reasonable taxes and regulation, reliable infrastructure, and a skilled local workforce — the conditions that let employers like Rocket Lab succeed. I'm proud of what Middle River's next chapter looks like, and I'll keep fighting to write more chapters just like it for District 7A.",
    ],
    keyPoints: [
      "A global space-industry leader chose Middle River — a major win for eastern Baltimore County.",
      "The complex occupies ~113,000 sq ft at the former Lockheed Martin Vertical Launch Building.",
      "It brings skilled, good-paying private-sector manufacturing jobs and new capital investment.",
      "The site builds on Middle River's proud Glenn L. Martin aviation manufacturing heritage.",
      "Keep Maryland competitive — affordable energy, sensible taxes, and a skilled workforce attract employers.",
    ],
    pullQuote:
      "Tens of thousands once built warplanes here in Middle River — now a new generation will build flight hardware bound for space.",
    sources: [
      {
        label: "Rocket Lab to establish Space Structures Complex in Baltimore County",
        href: "https://commerce.maryland.gov/media/governor-moore-announces-rocket-lab-to-open-manufacturing-facility-in-baltimore-county",
        publisher: "Maryland Department of Commerce",
      },
      {
        label: "Rocket Lab brings manufacturing operations to Middle River",
        href: "https://business.maryland.gov/news/rocket-lab-brings-manufacturing-operations-to-middle-river/",
        publisher: "Maryland Department of Commerce",
      },
      {
        label: "Rocket Lab to open spacecraft manufacturing complex in Middle River, MD",
        href: "https://www.chesapeakebaymagazine.com/rocket-lab-to-open-spacecraft-manufacturing-complex-in-middle-river-md/",
        publisher: "Chesapeake Bay Magazine",
      },
      {
        label: "Rocket Lab to establish Space Structures Complex in Baltimore County",
        href: "https://www.businesswire.com/news/home/20231117375156/en/Rocket-Lab-to-Establish-Space-Structures-Complex-in-Baltimore-County-to-Supply-Advanced-Composite-Products-Internally-and-to-Broader-Space-Industry",
        publisher: "Business Wire",
      },
    ],
    image: {
      src: "/images/rocket-lab-space-complex.jpg",
      alt: "Delegate Nawrocki with officials outside the former Lockheed Martin plant, now Rocket Lab's Space Structures Complex in Middle River",
    },
  },
];

export const featuredIssueSlugs = [
  "inspector-general-reform",
  "bcps-inspector-general-oversight",
  "middle-river-fire-station",
  "power-lines-and-brandon-shores",
] as const;

export function issueBySlug(slug: string): Issue | undefined {
  return issues.find((i) => i.slug === slug);
}
