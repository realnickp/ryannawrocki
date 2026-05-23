"use client";

import { motion, type Variants } from "framer-motion";
import { cn } from "@/lib/cn";

type Props = {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  id?: string;
  as?: "div" | "section" | "article" | "header" | "aside" | "li";
};

const variants: Variants = {
  hidden: { opacity: 0, y: 12 },
  shown: { opacity: 1, y: 0 },
};

export function Reveal({
  children,
  delay = 0,
  className,
  id,
  as = "div",
}: Props) {
  const MotionTag = motion[as];
  return (
    <MotionTag
      id={id}
      initial="hidden"
      whileInView="shown"
      viewport={{ once: true, amount: 0.2 }}
      variants={variants}
      transition={{
        duration: 0.36,
        delay,
        ease: [0.2, 0.7, 0.2, 1],
      }}
      className={cn(className)}
    >
      {children}
    </MotionTag>
  );
}
