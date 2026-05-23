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
  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Ryan Nawrocki",
    jobTitle: "State Delegate, Maryland House of Delegates",
    affiliation: {
      "@type": "GovernmentOrganization",
      name: "Maryland House of Delegates",
    },
    address: {
      "@type": "PostalAddress",
      addressRegion: "MD",
      addressCountry: "US",
    },
    url: site.url,
    sameAs: [
      site.social.facebook,
      site.social.x,
      site.social.instagram,
      site.social.linkedin,
      site.social.youtube,
    ],
  };

  const orgJsonLd = {
    "@context": "https://schema.org",
    "@type": "GovernmentOrganization",
    name: "Office of Delegate Ryan Nawrocki — District 7A",
    url: site.url,
    email: site.officeEmail,
    telephone: site.officePhone,
    areaServed: site.districtAreas.join(", "),
  };

  return (
    <html
      lang="en"
      className={`${display.variable} ${body.variable} ${mono.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
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
