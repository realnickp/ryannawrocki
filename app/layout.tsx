import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/shell/Header";
import { Footer } from "@/components/shell/Footer";
import { SmoothScroll } from "@/components/SmoothScroll";
import { DonateModal } from "@/components/DonateModal";
import { site } from "@/data/site";

const display = Inter({
  subsets: ["latin"],
  weight: ["700", "800", "900"],
  variable: "--font-display",
  display: "swap",
});

const body = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Ryan Nawrocki — Maryland State Delegate, District 7A",
    template: "%s · Ryan Nawrocki",
  },
  description:
    "Maryland State Delegate Ryan Nawrocki — fighting for Eastern Baltimore County in Annapolis. Public safety, economic growth, government accountability.",
  openGraph: {
    type: "website",
    siteName: "Ryan Nawrocki",
    url: site.url,
    title: "Ryan Nawrocki — State Delegate, District 7A",
    description:
      "Maryland's voice for Eastern Baltimore County. Public safety, economic growth, government accountability.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ryan Nawrocki — State Delegate, District 7A",
    description:
      "Maryland's voice for Eastern Baltimore County. Public safety, economic growth, government accountability.",
  },
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#f7f8fa",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // One linked entity graph: Person (the delegate) + Organization (the
  // campaign committee) + WebSite. Value is Knowledge-Graph disambiguation
  // and AI-search citation grounding, not rich snippets.
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": `${site.url}/#person`,
        name: "Ryan Nawrocki",
        honorificPrefix: "Delegate",
        url: `${site.url}/`,
        image: `${site.url}/images/ryan-headshot-flag.jpg`,
        jobTitle: "Maryland State Delegate, District 7A",
        description:
          "Ryan Nawrocki is a Maryland State Delegate representing District 7A in Baltimore County — a husband, father of six, and small-business owner focused on public safety, lower costs, and government accountability.",
        memberOf: {
          "@type": "GovernmentOrganization",
          name: "Maryland House of Delegates",
          url: "https://mgaleg.maryland.gov/",
        },
        address: {
          "@type": "PostalAddress",
          addressLocality: "Middle River",
          addressRegion: "MD",
          addressCountry: "US",
        },
        sameAs: [
          site.social.facebook,
          site.social.x,
          site.social.instagram,
          site.social.linkedin,
          site.social.youtube,
        ],
      },
      {
        "@type": "Organization",
        "@id": `${site.url}/#organization`,
        name: site.campaignName,
        url: `${site.url}/`,
        founder: { "@id": `${site.url}/#person` },
        email: site.campaignEmail,
        telephone: site.campaignPhone,
        address: {
          "@type": "PostalAddress",
          postOfficeBoxNumber: "18194",
          addressLocality: "Middle River",
          addressRegion: "MD",
          postalCode: "21220",
          addressCountry: "US",
        },
      },
      {
        "@type": "WebSite",
        "@id": `${site.url}/#website`,
        url: `${site.url}/`,
        name: "Ryan Nawrocki — Maryland State Delegate, District 7A",
        publisher: { "@id": `${site.url}/#organization` },
        about: { "@id": `${site.url}/#person` },
        inLanguage: "en-US",
      },
    ],
  };

  return (
    <html
      lang="en"
      className={`${display.variable} ${body.variable} ${mono.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-brand-paper text-brand-navy antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-md-gold focus:px-4 focus:py-2 focus:text-sm focus:text-ink"
        >
          Skip to content
        </a>
        <SmoothScroll>
          <Header />
          <main id="main" className="relative">
            {children}
          </main>
          <Footer />
        </SmoothScroll>
        <DonateModal />
      </body>
    </html>
  );
}
