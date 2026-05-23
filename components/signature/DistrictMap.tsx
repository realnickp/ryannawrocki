"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

type Town = {
  name: string;
  x: number;
  y: number;
};

// Approximate positions of District 7A communities — laid out on a
// 1000×600 canvas in roughly geographic order east-north of Baltimore.
const TOWNS: Town[] = [
  { name: "Baldwin", x: 420, y: 110 },
  { name: "Long Green", x: 360, y: 170 },
  { name: "Glen Arm", x: 290, y: 220 },
  { name: "Loch Raven", x: 200, y: 280 },
  { name: "Carney", x: 240, y: 330 },
  { name: "Perry Hall", x: 380, y: 310 },
  { name: "Kingsville", x: 480, y: 230 },
  { name: "White Marsh", x: 480, y: 380 },
  { name: "Middle River", x: 600, y: 450 },
];

const ROADS = [
  // Rough road network connecting communities
  "M 200 280 L 240 330 L 380 310 L 480 380 L 600 450",
  "M 200 280 L 290 220 L 360 170 L 420 110",
  "M 380 310 L 480 230 L 420 110",
  "M 480 380 L 600 450",
  "M 290 220 L 480 230",
];

type Props = {
  className?: string;
  /** Compact strip variant for the home page */
  variant?: "full" | "strip";
};

export function DistrictMap({ className, variant = "full" }: Props) {
  const [hover, setHover] = useState<string | null>(null);

  return (
    <div
      className={cn(
        "relative w-full overflow-hidden",
        variant === "strip" && "max-h-[260px]",
        className,
      )}
    >
      <svg
        role="img"
        aria-label="Maryland House of Delegates District 7A — communities"
        viewBox="0 0 1000 600"
        className="block h-auto w-full"
      >
        {/* District outline — approximated as a soft polygon */}
        <path
          d="M 100 240 Q 180 80 360 80 Q 540 80 620 140 Q 780 200 800 360 Q 740 520 600 540 Q 420 560 280 500 Q 140 440 100 240 Z"
          fill="rgba(255, 210, 0, 0.04)"
          stroke="var(--rule-dark)"
          strokeWidth={1}
        />

        {/* Roads */}
        {ROADS.map((d, i) => (
          <path
            key={i}
            d={d}
            stroke="var(--rule-dark)"
            strokeWidth={1}
            fill="none"
            strokeLinecap="round"
          />
        ))}

        {/* Town dots */}
        {TOWNS.map((t) => {
          const isHover = hover === t.name;
          return (
            <g
              key={t.name}
              onMouseEnter={() => setHover(t.name)}
              onMouseLeave={() => setHover(null)}
              onFocus={() => setHover(t.name)}
              onBlur={() => setHover(null)}
              tabIndex={0}
              role="button"
              aria-label={t.name}
            >
              {isHover ? (
                <circle
                  cx={t.x}
                  cy={t.y}
                  r={22}
                  fill="none"
                  stroke="var(--md-gold)"
                  strokeWidth={1}
                  opacity={0.5}
                />
              ) : null}
              <circle
                cx={t.x}
                cy={t.y}
                r={isHover ? 7 : 5}
                fill="var(--md-gold)"
                style={{ transition: "r 200ms cubic-bezier(0.4,0,0.2,1)" }}
              />
              <text
                x={t.x}
                y={t.y - 18}
                fontFamily="var(--font-mono), JetBrains Mono, monospace"
                fontSize={11}
                fill="var(--white)"
                textAnchor="middle"
                style={{
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  opacity: isHover ? 1 : 0,
                  transition: "opacity 200ms cubic-bezier(0.4,0,0.2,1)",
                }}
              >
                {t.name.toUpperCase()}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
