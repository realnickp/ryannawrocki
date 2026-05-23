import { cn } from "@/lib/cn";

/**
 * Brand mark — 12px red square + 96px gold line.
 * Sits above every major section headline.
 */
export function RuleMark({ className }: { className?: string }) {
  return (
    <span aria-hidden className={cn("rule-mark", className)}>
      <span className="rule-mark__square" />
      <span className="rule-mark__line" />
    </span>
  );
}
