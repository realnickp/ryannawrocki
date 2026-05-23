import { cn } from "@/lib/cn";

type FactProps = {
  label: string;
  value: string;
  kicker?: string;
  accent?: boolean;
};

export function Fact({ label, value, kicker, accent = false }: FactProps) {
  return (
    <div className="fact-item">
      {kicker ? <div className="fact-kicker">{kicker}</div> : null}
      <div className={cn("fact-value tabular", accent && "fact-value-accent")}>
        {value}
      </div>
      <p className="fact-label">{label}</p>
    </div>
  );
}

type ListProps = { children: React.ReactNode; className?: string };

export function FactList({ children, className }: ListProps) {
  return <div className={cn("fact-list", className)}>{children}</div>;
}
