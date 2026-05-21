"use client";

import { cn } from "@/lib/utils";
import { useEffect, useRef } from "react";

export interface SpotlightProps {
  className?: string;
  fill?: string;
}

export function Spotlight({ className, fill = "#facc15" }: SpotlightProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const onMove = (e: MouseEvent) => {
      const rect = node.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      node.style.setProperty("--spot-x", `${x}px`);
      node.style.setProperty("--spot-y", `${y}px`);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <div
      ref={ref}
      className={cn(
        "pointer-events-none absolute inset-0 z-10 transition-opacity",
        className,
      )}
      style={{
        background: `radial-gradient(360px circle at var(--spot-x, 50%) var(--spot-y, 50%), ${fill}22, transparent 60%)`,
      }}
      aria-hidden
    />
  );
}
