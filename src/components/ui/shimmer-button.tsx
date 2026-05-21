"use client";

import { cn } from "@/lib/utils";
import { forwardRef, type ButtonHTMLAttributes, type CSSProperties } from "react";

export interface ShimmerButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  shimmerColor?: string;
  shimmerSize?: string;
  borderRadius?: string;
  shimmerDuration?: string;
  background?: string;
}

export const ShimmerButton = forwardRef<HTMLButtonElement, ShimmerButtonProps>(
  (
    {
      shimmerColor = "#bbf7d0",
      shimmerSize = "0.05em",
      borderRadius = "100px",
      shimmerDuration = "3s",
      background = "linear-gradient(135deg, #facc15 0%, #facc15 50%, #4ade80 100%)",
      className,
      children,
      ...props
    },
    ref,
  ) => (
    <button
      ref={ref}
      style={
        {
          "--spread": "90deg",
          "--shimmer-color": shimmerColor,
          "--radius": borderRadius,
          "--speed": shimmerDuration,
          "--cut": shimmerSize,
          "--bg": background,
        } as CSSProperties
      }
      className={cn(
        "group relative z-0 flex cursor-pointer items-center justify-center overflow-hidden whitespace-nowrap border border-white/10 px-6 py-3 text-sm font-medium text-background [background:var(--bg)] [border-radius:var(--radius)]",
        "transform-gpu transition-transform duration-300 hover:scale-[1.02] active:translate-y-[1px]",
        "shadow-[inset_0_-8px_10px_rgba(255,255,255,0.12)] before:absolute before:inset-0 before:-z-10 before:rounded-[inherit]",
        className,
      )}
      {...props}
    >
      <span className="pointer-events-none absolute inset-0 overflow-hidden rounded-[inherit]">
        <span
          className="absolute inset-[-100%] animate-shimmer-spin"
          style={{
            background:
              "conic-gradient(from calc(270deg - (var(--spread) * 0.5)), transparent 0, var(--shimmer-color) var(--spread), transparent var(--spread))",
          }}
        />
      </span>
      <span className="z-10 inline-flex items-center gap-2">{children}</span>
      <span
        className="pointer-events-none absolute inset-px rounded-[calc(var(--radius)-1px)] [background:var(--bg)]"
        aria-hidden
      />
      <span className="relative z-10 inline-flex items-center gap-2">{children}</span>
    </button>
  ),
);
ShimmerButton.displayName = "ShimmerButton";
