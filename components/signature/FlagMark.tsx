import { cn } from "@/lib/cn";

type Props = {
  className?: string;
  /** Visual size; defaults to 48px square */
  size?: number;
  ariaLabel?: string;
};

/**
 * FlagMark — geometric reinterpretation of the Maryland flag as a single
 * SVG. Used at most once per page: favicon, footer lockup, loading state.
 *
 * Renders the four heraldic quarters in a 2×2 grid: Calvert (gold/black
 * bend) opposite Crossland (red/white cross bottony).
 */
export function FlagMark({
  className,
  size = 48,
  ariaLabel = "Maryland",
}: Props) {
  return (
    <svg
      role="img"
      aria-label={ariaLabel}
      viewBox="0 0 64 64"
      width={size}
      height={size}
      className={cn(className)}
    >
      {/* Top-left: Calvert (gold + black diagonals) */}
      <g clipPath="url(#fm-tl)">
        <rect x={0} y={0} width={32} height={32} fill="var(--md-gold)" />
        <g transform="translate(16 16) rotate(45)">
          {Array.from({ length: 6 }).map((_, i) => (
            <rect
              key={i}
              x={-40}
              y={(i - 3) * 11}
              width={80}
              height={11}
              fill={i % 2 === 0 ? "var(--md-gold)" : "var(--ink)"}
            />
          ))}
        </g>
      </g>

      {/* Top-right: Crossland — red field with white cross */}
      <g>
        <rect x={32} y={0} width={32} height={32} fill="var(--md-red)" />
        {/* cross arms */}
        <rect x={45} y={4} width={6} height={24} fill="#ffffff" />
        <rect x={36} y={13} width={24} height={6} fill="#ffffff" />
        {/* trefoil end stubs at each arm */}
        <circle cx={48} cy={4} r={3} fill="#ffffff" />
        <circle cx={48} cy={28} r={3} fill="#ffffff" />
        <circle cx={36} cy={16} r={3} fill="#ffffff" />
        <circle cx={60} cy={16} r={3} fill="#ffffff" />
      </g>

      {/* Bottom-left: Crossland — white field with red cross */}
      <g>
        <rect x={0} y={32} width={32} height={32} fill="#ffffff" />
        <rect x={13} y={36} width={6} height={24} fill="var(--md-red)" />
        <rect x={4} y={45} width={24} height={6} fill="var(--md-red)" />
        <circle cx={16} cy={36} r={3} fill="var(--md-red)" />
        <circle cx={16} cy={60} r={3} fill="var(--md-red)" />
        <circle cx={4} cy={48} r={3} fill="var(--md-red)" />
        <circle cx={28} cy={48} r={3} fill="var(--md-red)" />
      </g>

      {/* Bottom-right: Calvert reversed */}
      <g clipPath="url(#fm-br)">
        <rect x={32} y={32} width={32} height={32} fill="var(--md-gold)" />
        <g transform="translate(48 48) rotate(-45)">
          {Array.from({ length: 6 }).map((_, i) => (
            <rect
              key={i}
              x={-40}
              y={(i - 3) * 11}
              width={80}
              height={11}
              fill={i % 2 === 0 ? "var(--md-gold)" : "var(--ink)"}
            />
          ))}
        </g>
      </g>

      <defs>
        <clipPath id="fm-tl">
          <rect x={0} y={0} width={32} height={32} />
        </clipPath>
        <clipPath id="fm-br">
          <rect x={32} y={32} width={32} height={32} />
        </clipPath>
      </defs>
    </svg>
  );
}
