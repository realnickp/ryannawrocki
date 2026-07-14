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
  /** Real campaign photo for the card/hero. Falls back to /images/priorities/<slug>.png */
  image?: string;
  /** object-position for the card image so faces aren't cropped */
  imagePosition?: string;
};

export const priorities: Priority[] = [
  {
    numeral: "01",
    slug: "lowering-the-cost-of-living",
    title: "Lowering the cost of living.",
    summary:
      "Families across District 7A are stretched thin by rising prices, taxes, and fees. Ryan is committed to spending discipline in Annapolis and to protecting paychecks, retirees, and small businesses from new tax hikes.",
    delivered: [
      "Voted against taxes and fee increases that have left Maryland families struggling.",
      "Backed targeted relief for veterans, retirees, and working families.",
      "Fought against the Moore energy bill rate increases.",
    ],
    next: [
      "Keep fighting against any new gas tax hikes or vehicle fee increases.",
      "Demand spending discipline — line-by-line scrutiny of the operating budget.",
      "Continue working to expand Maryland's standard deduction and protect retirement income.",
    ],
    image: "/images/645446748_1339363261343357_6092768245358700287_n.jpg",
    imagePosition: "center 16%",
  },
  {
    numeral: "02",
    slug: "affordable-reliable-energy",
    title: "Affordable & reliable energy.",
    summary:
      "Marylanders shouldn't have to choose between paying the BGE bill and putting food on the table. Ryan stands for a diversified, reliable energy portfolio and against policies that push utility costs higher than families can handle.",
    delivered: [
      "Led the fight against the Piedmont and Brandon Shores power-line projects routed through District 7A farmland.",
      "Fought against expensive and reckless solar farms on agricultural land.",
      "Advocated for keeping Brandon Shores online to preserve grid reliability.",
    ],
    next: [
      "Advance clean, efficient energy sources like nuclear energy.",
      "Advocate for the use of natural gas to meet our energy needs.",
      "Work towards permitting reform to allow energy plants to come online faster.",
    ],
    image: "/images/642865957_1334736615139355_8979806438955097043_n.jpg",
    imagePosition: "center 22%",
  },
  {
    numeral: "03",
    slug: "safe-streets-public-safety",
    title: "Safe streets & strong public safety.",
    summary:
      "Public safety is the foundation of everything else. Ryan stands with the men and women in uniform, supports tougher consequences for repeat violent offenders, and is working to restore real accountability in the juvenile justice system.",
    delivered: [
      "Fought for tougher sentencing for repeat violent juvenile offenders.",
      "Fought against allowing convicted murderers to get out of prison early.",
      "Secured $15M for a new Middle River fire department, $2.5M in new equipment for Long Green, and more than $1M for the Bowleys Quarters Volunteer Fire Department.",
    ],
    next: [
      "Restore accountability in the juvenile justice system so repeat offenders see real consequences.",
      "Protect small businesses from organized retail theft and repeat property crime.",
      "Allow cooperation between federal agents and local law enforcement to keep the most violent offenders off our streets.",
    ],
    image: "/images/699852105_1396404318972584_3292790474692568326_n.jpg",
    imagePosition: "center 32%",
  },
  {
    numeral: "04",
    slug: "strong-schools-opportunity",
    title: "Strong schools & opportunity for students.",
    summary:
      "Every child in District 7A deserves a school that prepares them for life — whether that's a four-year college, a trade, a career, or the military. Ryan supports high standards, real facility investment, accountability for every dollar, and parents' rightful place in their children's education.",
    delivered: [
      "Advanced legislation to promote transparency and accountability of BCPS by expanding the Baltimore County Inspector General's oversight.",
      "Pushed for capital funding to address overcrowding at Pine Grove Middle School and the completion of the new Nottingham Middle School.",
      "Supported funding projects for school facilities, ranging from new signage to a new track.",
    ],
    next: [
      "Expand accountability in public school funding to ensure that every dollar the system spends directly benefits student outcomes.",
      "Continue fighting for infrastructure improvements so that students have safe and functional learning environments.",
      "Defend parental rights in curriculum, classrooms, and medical decisions.",
    ],
    image: "/images/705718156_1401249808488035_8856221599365063656_n.jpg",
    imagePosition: "center 42%",
  },
  {
    numeral: "05",
    slug: "first-responders-volunteer-fire-ems",
    title: "Standing with first responders & volunteer fire/EMS.",
    summary:
      "Ryan is committed to making sure that every firefighter, EMS personnel, and law enforcement officer has the funding, recruitment support, and recognition they've earned.",
    delivered: [
      "Secured $15M for a new Middle River fire department, $2.5M in new equipment for Long Green, and more than $1M for the Bowleys Quarters Volunteer Fire Department.",
      "Supported legislation that ensured fair overtime compensation for all firefighters in Baltimore County.",
      "Passed legislation to eliminate property taxes for all volunteer fire companies in Baltimore County.",
    ],
    next: [
      "Push for sustained state support for volunteer fire and EMS, including recruitment, training, and equipment.",
      "Champion mental-health support and recognition for career first-responders.",
      "Make sure local public safety budgets are protected — not cut.",
    ],
    image: "/images/685159083_1383746306905052_5733952956081640845_n.jpg",
    imagePosition: "center 8%",
  },
  {
    numeral: "06",
    slug: "growing-the-local-economy",
    title: "Growing the local economy.",
    summary:
      "As a small business owner, Ryan knows firsthand the importance of an effective local economy. Ryan fights for the businesses, industries, and jobs that provide prosperity for Baltimore County.",
    delivered: [
      "Advocated for federal and state cooperation to restore Port of Baltimore operations after the Key Bridge collapse.",
      "Supported workforce and training programs aligned with the trades and logistics sectors.",
      "Backed small-business tax relief and regulatory simplification.",
    ],
    next: [
      "Cut red tape that crushes Maryland tradespeople, contractors, and family-owned shops.",
      "Eliminate burdensome small business fees that make it harder to prosper.",
      "Push for agencies to conduct small business analyses before adopting new regulations.",
    ],
    image: "/images/685859071_1384799276799755_5471403026795356875_n.jpg",
    imagePosition: "center 70%",
  },
  {
    numeral: "07",
    slug: "accountable-transparent-government",
    title: "Accountable, transparent government.",
    summary:
      "Government works for the people — not the other way around. Ryan has consistently pushed to strengthen oversight, empower Inspectors General, and root out waste, fraud, and abuse across state and local government.",
    delivered: [
      "Championed bipartisan legislation strengthening the authority of Baltimore County's Inspector General.",
      "Introduced legislation for inspectors general to access any documents necessary for investigations.",
      "Pushed for a statewide transparency audit to root out waste, fraud, and abuse.",
    ],
    next: [
      "Codify a statewide office of the Inspector General.",
      "Increase overall accountability and transparency in state and local government.",
      "Continue calling for ethics and oversight reforms in all branches of state and local government.",
    ],
    image: "/images/585340610_1262366382376379_126256103555317218_n.jpg",
    imagePosition: "center 25%",
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
    image: "/images/638311408_1330022062277477_3320982621272389921_n.jpg",
    imagePosition: "center 44%",
  },
  {
    numeral: "09",
    slug: "championing-marylands-agriculture",
    title: "Championing Maryland's agriculture.",
    summary:
      "Ryan fights to protect farmers under Maryland's burdensome regulatory environment. We need common-sense policies that allow farmers to grow the crops the community depends upon while protecting our environment at the same time.",
    delivered: [
      "Fought against placing solar panels on productive agricultural land.",
      "Worked to strengthen land preservation.",
      "Championed legislation to expand hunting to reduce the deer population that destroys crops.",
    ],
    next: [
      "Fight to lower the rising costs affecting farmers in every aspect — from resources and transportation to rising energy bills and consumer behaviors.",
      "Oppose all taxes and fees that directly harm farms.",
      "Eliminate burdensome overregulation that creates additional barriers to entry into the agricultural community.",
    ],
    image: "/images/ryan-farm-couple.jpg",
    imagePosition: "center 52%",
  },
  {
    numeral: "10",
    slug: "protecting-from-overdevelopment",
    title: "Opposing overdevelopment.",
    summary:
      "Baltimore County is known for its wide variety of rural, suburban, and urban communities. Annapolis is stripping local zoning control so that our beloved neighborhoods lose their charm to high-density housing sanctioned by state bureaucrats. Ryan is fighting to preserve the community as we know it.",
    delivered: [
      "Fought for a stronger, adequate public facilities ordinance to require school and road capacity to be considered before development occurs.",
      "Advocated for a historic amount of downzoning in Baltimore County to limit overdevelopment.",
      "Stopped high-density development near mass-transit facilities in Baltimore County.",
    ],
    next: [
      "Support land preservation efforts, particularly in rural Baltimore County.",
      "Fight against the expansion of mass transit services into additional parts of Baltimore County.",
      "Expand public input prior to large development projects along state roadways.",
    ],
    image: "/images/ryan-farm-tractor.jpg",
    imagePosition: "center 55%",
  },
];
