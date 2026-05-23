import { cn } from "@/lib/cn";

/**
 * Premium line-icon set for the homepage — 24×24 viewBox, 1.6px stroke,
 * round caps/joins, `currentColor` so they inherit navy/gold/maroon.
 * One glyph per priority (keyed by slug) plus a few credential/utility marks.
 */

type GlyphProps = {
  className?: string;
  size?: number;
};

const base = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

function Svg({
  className,
  size = 24,
  children,
}: GlyphProps & { children: React.ReactNode }) {
  return (
    <svg
      aria-hidden
      width={size}
      height={size}
      viewBox="0 0 24 24"
      className={cn(className)}
    >
      {children}
    </svg>
  );
}

/* ── Priority glyphs ─────────────────────────────────── */

export function CostGlyph(p: GlyphProps) {
  return (
    <Svg {...p}>
      <path {...base} d="M12 3v18" />
      <path
        {...base}
        d="M16 7.2C16 5.4 14.2 4.3 12 4.3S8 5.4 8 7.2s1.8 2.9 4 2.9 4 1.1 4 2.9-1.8 2.9-4 2.9-4-1.1-4-2.9"
      />
    </Svg>
  );
}

export function EnergyGlyph(p: GlyphProps) {
  return (
    <Svg {...p}>
      <path {...base} d="M13 2.5 4.5 13.5H11l-1 8 8.5-11H12l1-8z" />
    </Svg>
  );
}

export function SafetyGlyph(p: GlyphProps) {
  return (
    <Svg {...p}>
      <path {...base} d="M12 2.8l7 2.6v5.1c0 4.6-3 7.7-7 9.1-4-1.4-7-4.5-7-9.1V5.4l7-2.6z" />
      <path {...base} d="M9 11.6l2.2 2.2L15.2 9.4" />
    </Svg>
  );
}

export function ElectionGlyph(p: GlyphProps) {
  return (
    <Svg {...p}>
      <rect {...base} x="4" y="4" width="16" height="16" rx="2.5" />
      <path {...base} d="M8 12l2.8 2.8L16.4 9" />
    </Svg>
  );
}

export function CommunityShieldGlyph(p: GlyphProps) {
  // Protecting communities from overdevelopment — leaf / green space.
  return (
    <Svg {...p}>
      <path {...base} d="M12 3.2c3.4 2.1 5 4.8 5 7.6a5 5 0 0 1-10 0c0-2.8 1.6-5.5 5-7.6z" />
      <path {...base} d="M12 21v-8M12 16l-2.4-2.2M12 14.5l2.4-2.2" />
    </Svg>
  );
}

export function EconomyGlyph(p: GlyphProps) {
  return (
    <Svg {...p}>
      <path {...base} d="M3 16.5l6-6 4 4 7.5-7.5" />
      <path {...base} d="M16 6.5h4.5V11" />
    </Svg>
  );
}

export function GovernmentGlyph(p: GlyphProps) {
  return (
    <Svg {...p}>
      <path {...base} d="M3 9l9-5 9 5" />
      <path {...base} d="M5 9.5v8M9.6 9.5v8M14.4 9.5v8M19 9.5v8" />
      <path {...base} d="M3 20.5h18M4 17.5h16" />
    </Svg>
  );
}

export function SchoolsGlyph(p: GlyphProps) {
  return (
    <Svg {...p}>
      <path {...base} d="M2.5 8.5L12 4l9.5 4.5L12 13 2.5 8.5z" />
      <path {...base} d="M7 10.6V15c0 1.5 2.2 2.7 5 2.7s5-1.2 5-2.7v-4.4" />
      <path {...base} d="M21.5 8.5v5" />
    </Svg>
  );
}

export function ResponderGlyph(p: GlyphProps) {
  // First responders / volunteer fire & EMS — flame.
  return (
    <Svg {...p}>
      <path
        {...base}
        d="M12 2.6c2.1 3 5 4.6 5 8.4a5 5 0 0 1-10 0c0-1.6.7-2.9 1.7-4 .6 1 1.5 1.6 2.3 1.6-.6-2.2.3-4.6 1-6z"
      />
    </Svg>
  );
}

export function FaithGlyph(p: GlyphProps) {
  return (
    <Svg {...p}>
      <path {...base} d="M12 20.5S4.5 15.8 4.5 10.3A3.9 3.9 0 0 1 12 8a3.9 3.9 0 0 1 7.5 2.3c0 5.5-7.5 10.2-7.5 10.2z" />
    </Svg>
  );
}

const PRIORITY_GLYPHS: Record<string, (p: GlyphProps) => JSX.Element> = {
  "lowering-the-cost-of-living": CostGlyph,
  "affordable-reliable-energy": EnergyGlyph,
  "safe-streets-public-safety": SafetyGlyph,
  "election-integrity": ElectionGlyph,
  "protecting-from-overdevelopment": CommunityShieldGlyph,
  "growing-the-local-economy": EconomyGlyph,
  "accountable-transparent-government": GovernmentGlyph,
  "strong-schools-opportunity": SchoolsGlyph,
  "first-responders-volunteer-fire-ems": ResponderGlyph,
  "faith-family-community": FaithGlyph,
};

export function PriorityGlyph({
  slug,
  className,
  size,
}: GlyphProps & { slug: string }) {
  const Glyph = PRIORITY_GLYPHS[slug] ?? GovernmentGlyph;
  return <Glyph className={className} size={size} />;
}

/* ── Credential / utility glyphs ─────────────────────── */

export function PeopleGlyph(p: GlyphProps) {
  return (
    <Svg {...p}>
      <circle {...base} cx="9" cy="8" r="3" />
      <path {...base} d="M3.5 19.5c0-3 2.5-5.5 5.5-5.5s5.5 2.5 5.5 5.5" />
      <circle {...base} cx="17" cy="9" r="2.2" />
      <path {...base} d="M16.4 14.2c2.3.5 4.1 2.6 4.1 5.3" />
    </Svg>
  );
}

export function BriefcaseGlyph(p: GlyphProps) {
  return (
    <Svg {...p}>
      <rect {...base} x="3" y="7.5" width="18" height="12.5" rx="2" />
      <path {...base} d="M8.5 7.5V5.8A2 2 0 0 1 10.5 3.8h3a2 2 0 0 1 2 2v1.7" />
      <path {...base} d="M3 12.5h18" />
    </Svg>
  );
}

export function PinGlyph(p: GlyphProps) {
  return (
    <Svg {...p}>
      <path {...base} d="M12 21s-7-6.1-7-11a7 7 0 0 1 14 0c0 4.9-7 11-7 11z" />
      <circle {...base} cx="12" cy="10" r="2.6" />
    </Svg>
  );
}

export function CheckGlyph(p: GlyphProps) {
  return (
    <Svg {...p}>
      <path {...base} d="M5 12.5l4.2 4.2L19 7" />
    </Svg>
  );
}

export function StarGlyph(p: GlyphProps) {
  return (
    <Svg {...p}>
      <path {...base} d="M12 3.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 17l-5.2 2.6 1-5.8-4.3-4.1 5.9-.9L12 3.5z" />
    </Svg>
  );
}
