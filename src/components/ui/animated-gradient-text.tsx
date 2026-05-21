"use client";

import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export interface AnimatedGradientTextProps {
  children: ReactNode;
  className?: string;
}

export function AnimatedGradientText({ children, className }: AnimatedGradientTextProps) {
  return (
    <span
      className={cn(
        "inline-flex animate-gradient-shift bg-[length:200%_auto] bg-gradient-to-r from-emerald-400 via-amber-400 to-emerald-300 bg-clip-text text-transparent",
        className,
      )}
    >
      {children}
    </span>
  );
}
