"use client";

import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export interface AuroraBackgroundProps {
  children?: ReactNode;
  className?: string;
  showRadialGradient?: boolean;
}

export function AuroraBackground({
  children,
  className,
  showRadialGradient = true,
}: AuroraBackgroundProps) {
  return (
    <main
      className={cn(
        "relative isolate flex min-h-screen flex-col bg-background text-foreground overflow-hidden",
        className,
      )}
    >
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div
          className={cn(
            "absolute -inset-[10%] opacity-60 blur-3xl",
            showRadialGradient && "[mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_70%)]",
          )}
          style={{
            backgroundImage: `
              radial-gradient(circle at 25% 30%, rgba(34, 197, 94, 0.35) 0%, transparent 45%),
              radial-gradient(circle at 75% 70%, rgba(245, 158, 11, 0.30) 0%, transparent 45%),
              radial-gradient(circle at 50% 50%, rgba(56, 189, 248, 0.10) 0%, transparent 60%)
            `,
            animation: "aurora 16s linear infinite",
          }}
        />
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `
              linear-gradient(rgba(34, 197, 94, 0.06) 1px, transparent 1px),
              linear-gradient(90deg, rgba(34, 197, 94, 0.06) 1px, transparent 1px)
            `,
            backgroundSize: "44px 44px",
          }}
        />
      </div>
      {children}
    </main>
  );
}
