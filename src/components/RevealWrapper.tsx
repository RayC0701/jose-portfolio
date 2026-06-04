"use client";

import { useRef, type ReactNode } from "react";
import { useIntersection } from "./useIntersection";

export function RevealWrapper({
  children,
  className = "",
  delay = 0,
  margin,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  margin?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const visible = useIntersection(ref, margin);
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      } ${className}`}
      style={delay > 0 ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}
