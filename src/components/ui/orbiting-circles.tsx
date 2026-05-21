"use client";

import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export interface OrbitingCirclesProps {
  className?: string;
  children?: ReactNode;
  reverse?: boolean;
  duration?: number;
  delay?: number;
  radius?: number;
  path?: boolean;
}

export function OrbitingCircles({
  className,
  children,
  reverse = false,
  duration = 20,
  delay = 0,
  radius = 80,
  path = true,
}: OrbitingCirclesProps) {
  return (
    <>
      {path && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
          className="pointer-events-none absolute inset-0 size-full"
        >
          <circle
            className="stroke-border/40 stroke-1"
            cx="50%"
            cy="50%"
            r={radius}
            fill="none"
          />
        </svg>
      )}
      <div
        style={
          {
            "--duration": `${duration}s`,
            "--delay": `-${delay}s`,
            "--radius": `${radius}px`,
          } as React.CSSProperties
        }
        className={cn(
          "absolute left-1/2 top-1/2 flex size-full transform-gpu animate-orbit items-center justify-center rounded-full border border-border/0 [animation-delay:var(--delay)]",
          reverse && "[animation-direction:reverse]",
          className,
        )}
      >
        {children}
      </div>
    </>
  );
}
