import { cn } from "@/lib/cn";

type Props = {
  children: React.ReactNode;
  as?: "div" | "p" | "span";
  className?: string;
};

export function Eyebrow({ children, as: Tag = "div", className }: Props) {
  return <Tag className={cn("t-eyebrow", className)}>{children}</Tag>;
}
