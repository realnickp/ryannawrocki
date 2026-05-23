import type { Metadata } from "next";
import { SectionLabel } from "@/components/signature/SectionLabel";
import { RuleMark } from "@/components/signature/RuleMark";
import { FlagMark } from "@/components/signature/FlagMark";
import { HeadlineReveal } from "@/components/signature/HeadlineReveal";
import { MarqueeTicker } from "@/components/signature/MarqueeTicker";
import { BigNumber, BigNumberGrid } from "@/components/signature/BigNumber";
import { PullCallout } from "@/components/signature/PullCallout";
import { NewsTicker } from "@/components/signature/NewsTicker";
import { DistrictMap } from "@/components/signature/DistrictMap";

export const metadata: Metadata = {
  title: "Style Guide",
  description: "Internal design QA — Maryland Steel.",
  robots: { index: false, follow: false },
};

export default function Styleguide() {
  return (
    <div className="panel-ink pt-28">
      <div className="shell py-16">
        <SectionLabel number="QA" label="Style Guide — Maryland Steel" />
        <h1 className="t-h1 mt-6 text-white">Brand QA.</h1>
        <p className="t-lede mt-6 max-w-[44ch]">
          Tokens, components, and motion specs rendered live. If anything
          below fails, do not ship.
        </p>

        <Section title="Do Not Ship If Any Of These Fail">
          <ul className="prose-dark mt-2">
            <li>Headline mask-reveal is smooth on initial load</li>
            <li>Marquee pauses on hover/focus and never stutters</li>
            <li>Reduced motion disables Lenis, parallax, reveals, marquee</li>
            <li>Focus rings visible on every interactive element</li>
            <li>Grain renders on dark surfaces only, never on inversion</li>
            <li>Fonts load without FOUT (preloaded display + body)</li>
            <li>Hero CTA hover wipes left-to-right, no flicker</li>
          </ul>
        </Section>

        <Section title="Color Tokens">
          <div className="mt-2 grid grid-cols-2 gap-3 md:grid-cols-5">
            {[
              ["ink", "#0B0B0F"],
              ["ink-2", "#15151B"],
              ["ink-3", "#1F1F27"],
              ["maroon", "#6E1E26"],
              ["maroon-2", "#4A1218"],
              ["md-red", "#D20921"],
              ["md-red-hot", "#E11D2E"],
              ["red-blood", "#6E0014"],
              ["md-gold", "#FFD200"],
              ["gold-hot", "#FFE25A"],
              ["gold-deep", "#B88C00"],
              ["white", "#FFFFFF"],
              ["mute", "#9A8A8E"],
              ["rule", "#2A1A1E"],
              ["rule-dark", "#2A2A33"],
            ].map(([name, hex]) => (
              <div key={name} className="border border-rule-dark bg-ink-2">
                <div className="h-16" style={{ background: hex }} />
                <div className="p-3">
                  <p className="t-mono text-xs text-white">{name}</p>
                  <p className="t-mono mt-1 text-xs text-mute">{hex}</p>
                </div>
              </div>
            ))}
          </div>
        </Section>

        <Section title="Typography">
          <div className="space-y-6">
            <p className="t-hero">Hero · Inter 900</p>
            <p className="t-h1">H1 · Inter 800</p>
            <p className="t-h2">H2 · Inter 700</p>
            <p className="t-h3">H3 · Inter 600</p>
            <p className="t-lede max-w-[44ch]">
              Lede — Inter 400, larger reading text used as opening paragraphs
              and oversized intros.
            </p>
            <p className="t-body max-w-[64ch]">
              Body — Inter 400, 17/27. Used for paragraphs and long-form
              reading.
            </p>
            <p className="t-mono text-sm text-md-gold">
              MONO · JetBrains Mono · 500 · BILL #s, FILE LABELS, ADDRESSES
            </p>
            <p className="t-eyebrow">Eyebrow · 12px · 0.22em tracking</p>
            <p className="t-caption">Caption · 13px · mute color</p>
          </div>
        </Section>

        <Section title="Buttons">
          <div className="flex flex-wrap gap-4">
            <button className="btn-primary">Primary</button>
            <button className="btn-secondary">Secondary</button>
            <a className="link-editorial">
              Editorial Link →
            </a>
          </div>
        </Section>

        <Section title="Marks">
          <div className="flex flex-wrap items-center gap-12">
            <div>
              <p className="t-eyebrow mb-3 text-mute">FlagMark</p>
              <FlagMark size={64} />
            </div>
            <div>
              <p className="t-eyebrow mb-3 text-mute">RuleMark</p>
              <RuleMark />
            </div>
            <div>
              <p className="t-eyebrow mb-3 text-mute">SectionLabel</p>
              <SectionLabel number="01" label="Platform" />
            </div>
          </div>
        </Section>

        <Section title="Headline Reveal">
          <HeadlineReveal
            as="h3"
            text="A district worth fighting for."
            accent="fighting"
            className="t-h2 text-white"
          />
        </Section>

        <Section title="Marquee">
          <MarqueeTicker
            items={["Showing Up", "Speaking Up", "Following Through", "District 7A"]}
          />
        </Section>

        <Section title="BigNumber Grid">
          <BigNumberGrid>
            <BigNumber value="338" label="Fees & taxes tracked" countTo={338} />
            <BigNumber value="$100K" label="Awarded each year" countTo={100} prefix="$" suffix="K" />
            <BigNumber value="6" label="Kids at home" countTo={6} />
            <BigNumber value="1" label="Lifelong resident" countTo={1} />
          </BigNumberGrid>
        </Section>

        <Section title="News Ticker">
          <NewsTicker
            items={[
              { date: "Jan 2025", topic: "Housing", title: "HB 202 introduced.", href: "/issues/hb202-anti-squatters" },
              { date: "Feb 2025", topic: "Energy", title: "Power-line opposition campaign.", href: "/issues/power-lines-and-brandon-shores" },
              { date: "Apr 2024", topic: "Taxes", title: "338 fee increases tracked.", href: "/issues/war-on-drivers" },
            ]}
          />
        </Section>

        <Section title="District Map">
          <div className="border border-rule-dark bg-ink-2 p-6">
            <DistrictMap />
          </div>
        </Section>
      </div>

      <PullCallout
        attribution="Delegate Ryan Nawrocki"
        variant="maroon"
      >
        Show up, listen, and bring Eastern Baltimore County&rsquo;s voice to
        Annapolis.
      </PullCallout>
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-16">
      <div className="mb-6 flex items-center gap-4">
        <RuleMark />
        <p className="t-eyebrow text-md-gold">{title}</p>
      </div>
      {children}
    </section>
  );
}
