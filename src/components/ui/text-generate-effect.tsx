"use client";

import { cn } from "@/lib/utils";
import { motion, useAnimate, stagger } from "framer-motion";
import { useEffect } from "react";

export interface TextGenerateEffectProps {
  words: string;
  className?: string;
  filter?: boolean;
  duration?: number;
}

export function TextGenerateEffect({
  words,
  className,
  filter = true,
  duration = 0.5,
}: TextGenerateEffectProps) {
  const [scope, animate] = useAnimate();
  const wordsArr = words.split(" ");

  useEffect(() => {
    animate(
      "span",
      {
        opacity: 1,
        filter: filter ? "blur(0px)" : "none",
      },
      {
        duration,
        delay: stagger(0.08),
      },
    );
  }, [animate, duration, filter]);

  return (
    <motion.span ref={scope} className={cn(className)}>
      {wordsArr.map((word, i) => (
        <span key={`${word}-${i}`}>
          <motion.span
            className="opacity-0 inline"
            style={{ filter: filter ? "blur(8px)" : "none" }}
          >
            {word}
          </motion.span>
          {i < wordsArr.length - 1 ? " " : ""}
        </span>
      ))}
    </motion.span>
  );
}
