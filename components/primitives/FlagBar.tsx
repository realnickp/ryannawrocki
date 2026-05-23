import { cn } from "@/lib/cn";

type Props = {
  className?: string;
  crosslandShare?: number;
};

/**
 * The horizontal Maryland flag bar from the official Ryan Nawrocki logo —
 * Calvert (gold/black diagonals) running across the left, Crossland
 * (red/white botoné cross) capping the right end.
 */
export function FlagBar({ className, crosslandShare = 0.24 }: Props) {
  const W = 1000;
  const H = 100;
  const xSplit = Math.round(W * (1 - crosslandShare));
  const calvertStripeW = (W * (1 - crosslandShare) + H) / 7;

  // Crossland cross geometry
  const cx = xSplit + (W - xSplit) * 0.42;
  const cy = H / 2;
  const armT = H * 0.32;
  const halfV = H * 0.6;
  const halfH = (W - xSplit) * 0.32;
  const bud = armT * 0.5;

  return (
    <svg
      role="img"
      aria-label="Maryland flag bar"
      viewBox={`0 ${-H * 0.45} ${W} ${H * 1.9}`}
      preserveAspectRatio="none"
      className={cn(className)}
      style={{ overflow: "visible" }}
    >
      <defs>
        <clipPath id="flagbar-calvert">
          <rect x={0} y={0} width={xSplit} height={H} />
        </clipPath>
      </defs>

      {/* Calvert: gold/black diagonals clipped to band */}
      <g clipPath="url(#flagbar-calvert)">
        <rect x={0} y={0} width={xSplit} height={H} fill="var(--gold)" />
        <g transform={`translate(${xSplit / 2} ${H / 2}) rotate(45)`}>
          {Array.from({ length: 20 }).map((_, i) => (
            <rect
              key={i}
              x={-W}
              y={(i - 10) * calvertStripeW}
              width={W * 2}
              height={calvertStripeW}
              fill={i % 2 === 0 ? "var(--gold)" : "var(--ink)"}
            />
          ))}
        </g>
      </g>

      {/* Crossland: split red-on-top / white-on-bottom field */}
      <rect x={xSplit} y={0} width={W - xSplit} height={H / 2} fill="var(--red)" />
      <rect
        x={xSplit}
        y={H / 2}
        width={W - xSplit}
        height={H / 2}
        fill="#ffffff"
      />

      {/* Top half of cross — white on red */}
      <rect
        x={cx - armT / 2}
        y={cy - halfV}
        width={armT}
        height={halfV}
        fill="#ffffff"
      />
      <rect
        x={cx - halfH}
        y={cy - armT / 2}
        width={halfH * 2}
        height={armT / 2}
        fill="#ffffff"
      />
      {/* Trefoil top */}
      <Trefoil cx={cx} cy={cy - halfV} bud={bud} fill="#ffffff" />

      {/* Bottom half of cross — red on white */}
      <rect
        x={cx - armT / 2}
        y={cy}
        width={armT}
        height={halfV}
        fill="var(--red)"
      />
      <rect
        x={cx - halfH}
        y={cy}
        width={halfH * 2}
        height={armT / 2}
        fill="var(--red)"
      />
      {/* Trefoil bottom */}
      <Trefoil cx={cx} cy={cy + halfV} bud={bud} fill="var(--red)" />

      {/* Side trefoil caps — split by horizontal mid */}
      <SideCap cx={cx - halfH} cy={cy} bud={bud} topFill="#ffffff" botFill="var(--red)" />
      <SideCap cx={cx + halfH} cy={cy} bud={bud} topFill="#ffffff" botFill="var(--red)" />
    </svg>
  );
}

function Trefoil({
  cx,
  cy,
  bud,
  fill,
}: {
  cx: number;
  cy: number;
  bud: number;
  fill: string;
}) {
  return (
    <g>
      <circle cx={cx} cy={cy} r={bud} fill={fill} />
      <circle cx={cx - bud * 0.9} cy={cy} r={bud * 0.85} fill={fill} />
      <circle cx={cx + bud * 0.9} cy={cy} r={bud * 0.85} fill={fill} />
    </g>
  );
}

function SideCap({
  cx,
  cy,
  bud,
  topFill,
  botFill,
}: {
  cx: number;
  cy: number;
  bud: number;
  topFill: string;
  botFill: string;
}) {
  return (
    <g>
      <circle cx={cx} cy={cy - bud * 0.5} r={bud * 0.85} fill={topFill} />
      <circle cx={cx} cy={cy + bud * 0.5} r={bud * 0.85} fill={botFill} />
    </g>
  );
}
