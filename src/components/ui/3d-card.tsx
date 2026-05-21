"use client";

import { cn } from "@/lib/utils";
import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

const MouseEnterContext = createContext<[boolean, (v: boolean) => void] | null>(null);

export interface CardContainerProps {
  children?: ReactNode;
  className?: string;
  containerClassName?: string;
}

export function CardContainer({ children, className, containerClassName }: CardContainerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isEntered, setIsEntered] = useState(false);

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const x = (e.clientX - left - width / 2) / 18;
    const y = (e.clientY - top - height / 2) / 18;
    ref.current.style.transform = `rotateY(${x}deg) rotateX(${-y}deg)`;
  };

  const onMouseLeave = () => {
    if (!ref.current) return;
    ref.current.style.transform = "rotateY(0deg) rotateX(0deg)";
    setIsEntered(false);
  };

  return (
    <MouseEnterContext.Provider value={[isEntered, setIsEntered]}>
      <div
        className={cn("py-2 flex items-center justify-center", containerClassName)}
        style={{ perspective: "1200px" }}
      >
        <div
          ref={ref}
          onMouseEnter={() => setIsEntered(true)}
          onMouseMove={onMouseMove}
          onMouseLeave={onMouseLeave}
          className={cn(
            "relative flex items-center justify-center transition-all duration-200 ease-linear",
            className,
          )}
          style={{ transformStyle: "preserve-3d" }}
        >
          {children}
        </div>
      </div>
    </MouseEnterContext.Provider>
  );
}

export interface CardBodyProps {
  children?: ReactNode;
  className?: string;
}

export function CardBody({ children, className }: CardBodyProps) {
  return (
    <div
      className={cn(
        "h-96 w-96 [transform-style:preserve-3d] [&>*]:[transform-style:preserve-3d]",
        className,
      )}
    >
      {children}
    </div>
  );
}

export interface CardItemProps {
  children?: ReactNode;
  className?: string;
  as?: React.ElementType;
  translateX?: number;
  translateY?: number;
  translateZ?: number;
  rotateX?: number;
  rotateY?: number;
  rotateZ?: number;
}

export function CardItem({
  children,
  className,
  as: Tag = "div",
  translateX = 0,
  translateY = 0,
  translateZ = 0,
  rotateX = 0,
  rotateY = 0,
  rotateZ = 0,
  ...rest
}: CardItemProps & React.HTMLAttributes<HTMLDivElement>) {
  const ref = useRef<HTMLDivElement>(null);
  const ctx = useContext(MouseEnterContext);
  const isEntered = ctx?.[0] ?? false;

  useEffect(() => {
    if (!ref.current) return;
    if (isEntered) {
      ref.current.style.transform = `translateX(${translateX}px) translateY(${translateY}px) translateZ(${translateZ}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) rotateZ(${rotateZ}deg)`;
    } else {
      ref.current.style.transform = `translateX(0) translateY(0) translateZ(0) rotateX(0) rotateY(0) rotateZ(0)`;
    }
  }, [isEntered, translateX, translateY, translateZ, rotateX, rotateY, rotateZ]);

  const Tag2 = Tag as React.ElementType;
  return (
    <Tag2
      ref={ref}
      className={cn("w-fit transition duration-200 ease-linear", className)}
      {...rest}
    >
      {children}
    </Tag2>
  );
}
