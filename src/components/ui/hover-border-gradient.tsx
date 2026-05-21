"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useEffect, useState, type ReactNode } from "react";

type Direction = "TOP" | "LEFT" | "BOTTOM" | "RIGHT";

const movingMap: Record<Direction, string> = {
  TOP: "radial-gradient(20.7% 50% at 50% 0%, hsl(0,0%,100%) 0%, rgba(255,255,255,0) 100%)",
  LEFT: "radial-gradient(16.6% 43.1% at 0% 50%, hsl(0,0%,100%) 0%, rgba(255,255,255,0) 100%)",
  BOTTOM: "radial-gradient(20.7% 50% at 50% 100%, hsl(0,0%,100%) 0%, rgba(255,255,255,0) 100%)",
  RIGHT: "radial-gradient(16.2% 41.2% at 100% 50%, hsl(0,0%,100%) 0%, rgba(255,255,255,0) 100%)",
};

const highlight =
  "radial-gradient(75% 181.16% at 50% 50%, #facc15 0%, rgba(34,197,94,0) 100%)";

export interface HoverBorderGradientProps {
  children?: ReactNode;
  containerClassName?: string;
  className?: string;
  as?: React.ElementType;
  duration?: number;
  clockwise?: boolean;
  onClick?: () => void;
  href?: string;
  target?: string;
  rel?: string;
}

export function HoverBorderGradient({
  children,
  containerClassName,
  className,
  as: Tag = "button",
  duration = 1,
  clockwise = true,
  onClick,
  ...rest
}: HoverBorderGradientProps & Record<string, unknown>) {
  const [hovered, setHovered] = useState(false);
  const [direction, setDirection] = useState<Direction>("TOP");

  useEffect(() => {
    if (hovered) return;
    const order: Direction[] = clockwise
      ? ["TOP", "LEFT", "BOTTOM", "RIGHT"]
      : ["TOP", "RIGHT", "BOTTOM", "LEFT"];
    const id = setInterval(() => {
      setDirection((prev) => {
        const idx = order.indexOf(prev);
        return order[(idx + 1) % order.length];
      });
    }, duration * 1000);
    return () => clearInterval(id);
  }, [hovered, clockwise, duration]);

  const Tag2 = Tag as React.ElementType;
  return (
    <Tag2
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
      className={cn(
        "relative inline-flex h-min w-fit flex-col flex-nowrap content-center items-center justify-center gap-10 overflow-visible rounded-full border border-border p-px decoration-clone",
        containerClassName,
      )}
      {...rest}
    >
      <div
        className={cn(
          "z-10 w-auto rounded-[inherit] bg-panel px-5 py-2 text-sm text-foreground",
          className,
        )}
      >
        {children}
      </div>
      <motion.div
        className="absolute inset-0 z-0 flex-none rounded-[inherit] overflow-hidden"
        style={{ filter: "blur(2px)", position: "absolute" }}
        initial={{ background: movingMap[direction] }}
        animate={{ background: hovered ? [movingMap[direction], highlight] : movingMap[direction] }}
        transition={{ ease: "linear", duration }}
      />
      <div className="absolute inset-[2px] z-[1] rounded-[100px] bg-panel" />
    </Tag2>
  );
}
