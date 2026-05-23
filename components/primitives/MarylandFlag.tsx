import { cn } from "@/lib/cn";

type Props = {
  className?: string;
  /** Aspect: "full" = 3:2 flag; "block" = square heraldic block (one quarter set) */
  variant?: "full" | "block";
  ariaLabel?: string;
};

/**
 * Maryland state flag rendered as proper heraldic SVG —
 *   • Top-left / bottom-right (Calvert): gold-and-black "paly of six bendy"
 *   • Top-right / bottom-left (Crossland): red-and-white quadrants split by a
 *     white botoné cross over a red field (and the reverse), in the canonical
 *     diagonal opposition.
 *
 * This is the brand element. Used hard, not as a stripe.
 */
export function MarylandFlag({
  className,
  variant = "full",
  ariaLabel = "Flag of Maryland",
}: Props) {
  const w = 300;
  const h = variant === "full" ? 200 : 200;
  const half = w / 2;
  const halfH = h / 2;

  return (
    <svg
      role="img"
      aria-label={ariaLabel}
      viewBox={`0 0 ${w} ${h}`}
      className={cn(className)}
    >
      {/* Top-left: Calvert (gold/black diagonal bands, descending →) */}
      <CalvertQuarter x={0} y={0} w={half} h={halfH} reverse={false} />
      {/* Top-right: Crossland (red field with white bottony cross) */}
      <CrosslandQuarter
        x={half}
        y={0}
        w={half}
        h={halfH}
        bg="var(--red)"
        fg="#ffffff"
      />
      {/* Bottom-left: Crossland (mirrored — white field with red bottony cross) */}
      <CrosslandQuarter
        x={0}
        y={halfH}
        w={half}
        h={halfH}
        bg="#ffffff"
        fg="var(--red)"
      />
      {/* Bottom-right: Calvert (reversed direction) */}
      <CalvertQuarter x={half} y={halfH} w={half} h={halfH} reverse={true} />
    </svg>
  );
}

function CalvertQuarter({
  x,
  y,
  w,
  h,
  reverse,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  reverse: boolean;
}) {
  // Six diagonal bands of gold/black. We tile with rotated stripes via a clipPath.
  const id = `calvert-${x}-${y}-${reverse ? "r" : "f"}`;
  // Diagonal stripe width chosen so 6 stripes span the quarter diagonal
  const stripeW = (w + h) / 6;
  const rotate = reverse ? -45 : 45;

  return (
    <g clipPath={`url(#${id})`}>
      <defs>
        <clipPath id={id}>
          <rect x={x} y={y} width={w} height={h} />
        </clipPath>
      </defs>
      <g
        transform={`translate(${x + w / 2} ${y + h / 2}) rotate(${rotate})`}
      >
        {Array.from({ length: 14 }).map((_, i) => {
          const offset = (i - 7) * stripeW;
          const fill = i % 2 === 0 ? "var(--gold)" : "var(--ink)";
          return (
            <rect
              key={i}
              x={-w}
              y={offset}
              width={w * 2}
              height={stripeW}
              fill={fill}
            />
          );
        })}
      </g>
    </g>
  );
}

function CrosslandQuarter({
  x,
  y,
  w,
  h,
  bg,
  fg,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  bg: string;
  fg: string;
}) {
  // The botoné cross: a Greek cross with trefoil ends.
  const cx = x + w / 2;
  const cy = y + h / 2;
  const armT = h * 0.22; // arm thickness
  const armL = Math.min(w, h) * 0.46; // half arm length (from center)
  const bud = armT * 0.55;

  // Cross arms as a single union polygon (approx) — use rects + circles for the trefoil ends.
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} fill={bg} />
      {/* Cross arms */}
      <rect
        x={cx - armT / 2}
        y={cy - armL}
        width={armT}
        height={armL * 2}
        fill={fg}
      />
      <rect
        x={cx - armL}
        y={cy - armT / 2}
        width={armL * 2}
        height={armT}
        fill={fg}
      />
      {/* Trefoil buds at each arm end (botoné) */}
      {[
        [cx, cy - armL], // top
        [cx, cy + armL], // bottom
        [cx - armL, cy], // left
        [cx + armL, cy], // right
      ].map((pt, i) => {
        const px = pt[0] ?? 0;
        const py = pt[1] ?? 0;
        const buds: Array<[number, number, number]> = [
          [px, py, bud],
          [px - bud * 0.85, py, bud * 0.85],
          [px + bud * 0.85, py, bud * 0.85],
        ];
        return (
          <g key={i}>
            {buds.map((b, j) => (
              <circle key={j} cx={b[0]} cy={b[1]} r={b[2]} fill={fg} />
            ))}
          </g>
        );
      })}
    </g>
  );
}

/**
 * Tight block variant: shows only the Calvert+Crossland heraldic block (a single
 * upper-right corner from the full flag) — used in the masthead, hero accents,
 * and section dividers as a graphic stamp.
 */
export function MarylandStamp({ className }: { className?: string }) {
  return (
    <svg
      role="img"
      aria-label="Maryland heraldic stamp"
      viewBox="0 0 200 200"
      className={cn(className)}
    >
      <CalvertQuarter x={0} y={0} w={100} h={100} reverse={false} />
      <CrosslandQuarter
        x={100}
        y={0}
        w={100}
        h={100}
        bg="var(--red)"
        fg="#ffffff"
      />
      <CrosslandQuarter
        x={0}
        y={100}
        w={100}
        h={100}
        bg="#ffffff"
        fg="var(--red)"
      />
      <CalvertQuarter x={100} y={100} w={100} h={100} reverse={true} />
    </svg>
  );
}
