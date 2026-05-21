"use client";

import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export interface BentoGridProps {
  children?: ReactNode;
  className?: string;
}

export function BentoGrid({ children, className }: BentoGridProps) {
  return (
    <div
      className={cn(
        "mx-auto grid max-w-6xl grid-cols-1 gap-4 md:grid-cols-3 md:auto-rows-[minmax(160px,auto)]",
        className,
      )}
    >
      {children}
    </div>
  );
}

export interface BentoGridItemProps {
  className?: string;
  title?: ReactNode;
  description?: ReactNode;
  header?: ReactNode;
  icon?: ReactNode;
  footer?: ReactNode;
  href?: string;
  onClick?: () => void;
}

export function BentoGridItem({
  className,
  title,
  description,
  header,
  icon,
  footer,
  href,
  onClick,
}: BentoGridItemProps) {
  const inner = (
    <div
      className={cn(
        "group/bento relative flex flex-col justify-between rounded-2xl border border-border bg-panel/60 p-4 backdrop-blur transition-all hover:border-accent/40 hover:bg-panel hover:shadow-[0_0_0_1px_rgba(34,197,94,0.18),0_18px_44px_-12px_rgba(34,197,94,0.45)]",
        className,
      )}
    >
      {header ? <div className="mb-3">{header}</div> : null}
      <div className="transition duration-200 group-hover/bento:translate-x-1">
        <div className="flex items-center gap-2">
          {icon}
          {title ? <div className="text-base font-semibold">{title}</div> : null}
        </div>
        {description ? <div className="mt-1 text-sm text-muted">{description}</div> : null}
      </div>
      {footer ? <div className="mt-4">{footer}</div> : null}
    </div>
  );

  if (href) {
    return (
      <a href={href} className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-2xl">
        {inner}
      </a>
    );
  }
  if (onClick) {
    return (
      <button onClick={onClick} className="block text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-2xl">
        {inner}
      </button>
    );
  }
  return inner;
}
