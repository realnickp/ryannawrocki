import { cn } from "@/lib/cn";

type Props = {
  number: string;
  label: string;
  className?: string;
};

/**
 * Dossier-style "01 — PLATFORM" label.
 * Number in white, em-dash in deep gold, label in MD gold.
 */
export function SectionLabel({ number, label, className }: Props) {
  return (
    <p className={cn("section-label", className)}>
      <span className="section-label__number">{number}</span>
      <span className="section-label__divider">—</span>
      <span>{label}</span>
    </p>
  );
}
