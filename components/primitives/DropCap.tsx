import { cn } from "@/lib/cn";

type Props = { children: React.ReactNode; className?: string };

export function DropCap({ children, className }: Props) {
  return (
    <p className={cn("drop-cap t-body editorial-prose", className)}>
      {children}
    </p>
  );
}
