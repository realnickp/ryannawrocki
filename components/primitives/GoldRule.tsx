import { cn } from "@/lib/cn";

type Props = { className?: string };

export function GoldRule({ className }: Props) {
  return <hr aria-hidden className={cn("gold-rule border-0", className)} />;
}
