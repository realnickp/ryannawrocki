import { cn } from "@/lib/cn";

type Props = {
  title?: string;
  tone?: "gold" | "red" | "neutral";
  children: React.ReactNode;
  className?: string;
};

export function CalloutCard({
  title,
  tone = "neutral",
  children,
  className,
}: Props) {
  return (
    <aside
      className={cn(
        "callout",
        tone === "gold" && "tone-gold",
        tone === "red" && "tone-red",
        className,
      )}
    >
      {title ? <p className="callout-title">{title}</p> : null}
      {children}
    </aside>
  );
}
