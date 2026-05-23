import { cn } from "@/lib/cn";

type Props = { children: React.ReactNode; className?: string };

export function TopicTag({ children, className }: Props) {
  return <span className={cn("topic-tag", className)}>{children}</span>;
}
