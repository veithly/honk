"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useEffect, useId, useState, type RefObject } from "react";

export interface AnimatedBeamProps {
  className?: string;
  containerRef: RefObject<HTMLElement | null>;
  fromRef: RefObject<HTMLElement | null>;
  toRef: RefObject<HTMLElement | null>;
  curvature?: number;
  reverse?: boolean;
  duration?: number;
  delay?: number;
  pathColor?: string;
  pathWidth?: number;
  pathOpacity?: number;
  gradientStartColor?: string;
  gradientStopColor?: string;
  startXOffset?: number;
  startYOffset?: number;
  endXOffset?: number;
  endYOffset?: number;
}

export function AnimatedBeam({
  className,
  containerRef,
  fromRef,
  toRef,
  curvature = 0,
  reverse = false,
  duration = 5,
  delay = 0,
  pathColor = "rgba(255,255,255,0.1)",
  pathWidth = 2,
  pathOpacity = 0.4,
  gradientStartColor = "#facc15",
  gradientStopColor = "#f59e0b",
  startXOffset = 0,
  startYOffset = 0,
  endXOffset = 0,
  endYOffset = 0,
}: AnimatedBeamProps) {
  const id = useId();
  const [pathD, setPathD] = useState("");
  const [box, setBox] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const update = () => {
      const c = containerRef.current;
      const a = fromRef.current;
      const b = toRef.current;
      if (!c || !a || !b) return;
      const cr = c.getBoundingClientRect();
      const ar = a.getBoundingClientRect();
      const br = b.getBoundingClientRect();
      const w = cr.width;
      const h = cr.height;
      setBox({ width: w, height: h });
      const x1 = ar.left - cr.left + ar.width / 2 + startXOffset;
      const y1 = ar.top - cr.top + ar.height / 2 + startYOffset;
      const x2 = br.left - cr.left + br.width / 2 + endXOffset;
      const y2 = br.top - cr.top + br.height / 2 + endYOffset;
      const cx = (x1 + x2) / 2;
      const cy = (y1 + y2) / 2 - curvature;
      setPathD(`M ${x1},${y1} Q ${cx},${cy} ${x2},${y2}`);
    };
    update();
    const ro = new ResizeObserver(update);
    if (containerRef.current) ro.observe(containerRef.current);
    window.addEventListener("resize", update);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", update);
    };
  }, [containerRef, fromRef, toRef, curvature, startXOffset, startYOffset, endXOffset, endYOffset]);

  return (
    <svg
      fill="none"
      width={box.width}
      height={box.height}
      xmlns="http://www.w3.org/2000/svg"
      className={cn(
        "pointer-events-none absolute left-0 top-0 transform-gpu stroke-2 ",
        className,
      )}
      viewBox={`0 0 ${box.width} ${box.height}`}
    >
      <path d={pathD} stroke={pathColor} strokeOpacity={pathOpacity} strokeWidth={pathWidth} />
      <path d={pathD} strokeWidth={pathWidth} stroke={`url(#${id})`} strokeOpacity="1" strokeLinecap="round" />
      <defs>
        <motion.linearGradient
          id={id}
          gradientUnits="userSpaceOnUse"
          initial={{ x1: "0%", x2: "0%", y1: "0%", y2: "0%" }}
          animate={{
            x1: reverse ? ["90%", "-10%"] : ["-10%", "110%"],
            x2: reverse ? ["100%", "0%"] : ["0%", "120%"],
            y1: ["0%", "0%"],
            y2: ["0%", "0%"],
          }}
          transition={{ duration, repeat: Infinity, ease: "linear", delay }}
        >
          <stop stopColor={gradientStartColor} stopOpacity="0" />
          <stop stopColor={gradientStartColor} />
          <stop offset="32.5%" stopColor={gradientStopColor} />
          <stop offset="100%" stopColor={gradientStopColor} stopOpacity="0" />
        </motion.linearGradient>
      </defs>
    </svg>
  );
}
