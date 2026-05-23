export type EventItem = {
  slug: string;
  /** ISO date string (YYYY-MM-DD) — used for sorting and display */
  date: string;
  /** Optional time string, e.g. "6:00 PM – 9:00 PM" */
  time?: string;
  title: string;
  /** Venue name */
  venue: string;
  /** Street + city + zip */
  address: string;
  /** Short blurb */
  summary: string;
  /** Optional RSVP / ticket URL */
  rsvpUrl?: string;
  /** "fundraiser" | "town-hall" | "community" | "volunteer" */
  type: "fundraiser" | "town-hall" | "community" | "volunteer";
  /** Admission / suggested contribution levels, if applicable */
  contributions?: string[];
  /** Sponsorship tiers, e.g. "Red — $250" */
  sponsorLevels?: string[];
  /** RSVP deadline, e.g. "May 25" */
  rsvpBy?: string;
  /** Event inquiries contact */
  contact?: { name?: string; email?: string; phone?: string };
  /** Marks the headline event for the moment */
  featured?: boolean;
};

/**
 * NOTE: Confirm date/time/URL/host-committee with the campaign team before
 * publication. Items below are placeholders for the campaign to overwrite.
 */
export const events: EventItem[] = [
  {
    slug: "pooles-island-brewery-fundraiser",
    title: "Brewery Fundraiser at Poole's Island Brewing Company",
    date: "2026-05-28",
    time: "5:00 – 7:00 PM",
    venue: "Poole's Island Brewing Company",
    address: "11695 Crossroads Circle, Suite A, Middle River, MD 21220",
    summary:
      "Please join Friends of Ryan Nawrocki for craft beer, pizza, pasta, salads, and dessert in support of Delegate Ryan Nawrocki. Food provided by Geresbeck's, Carson's Creekside, Vince's Crabhouse, Tavern in the Quarters, Silver Spring of Perry Hall, Taco Love, Potomac Pizza, and Middle River Pizzeria.",
    rsvpUrl: "https://secure.anedot.com/nawrocki/0528event",
    type: "fundraiser",
    contributions: ["$50 per person", "$75 per couple", "$40 seniors"],
    sponsorLevels: [
      "Red — $250",
      "Blue — $500",
      "Stars — $1,000",
      "Stripes — $2,500",
      "Co-Host — $6,000",
    ],
    rsvpBy: "May 25",
    contact: {
      name: "Nicole · Ossola Consulting",
      email: "Nicole@OssolaConsulting.com",
      phone: "(443) 875-3886",
    },
    featured: true,
  },
];

export const upcomingEvents = (): EventItem[] =>
  events
    .filter((e) => e.date >= new Date().toISOString().slice(0, 10) || e.date.startsWith("[TODO"))
    .sort((a, b) => a.date.localeCompare(b.date));

export const pastEvents = (): EventItem[] =>
  events
    .filter((e) => e.date < new Date().toISOString().slice(0, 10) && !e.date.startsWith("[TODO"))
    .sort((a, b) => b.date.localeCompare(a.date));
