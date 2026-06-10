"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";

function subscribePointerFine(callback: () => void): () => void {
  const mq = window.matchMedia("(pointer: fine)");
  mq.addEventListener("change", callback);
  return () => mq.removeEventListener("change", callback);
}

function getPointerFine(): boolean {
  return window.matchMedia("(pointer: fine)").matches;
}

function getPointerFineServer(): boolean {
  return false;
}

export default function CustomCursor() {
  const ringRef = useRef<HTMLDivElement>(null);
  const enabled = useSyncExternalStore(subscribePointerFine, getPointerFine, getPointerFineServer);
  const reduceMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (!enabled || reduceMotion) return;
    const ring = ringRef.current;
    if (!ring) return;

    let mx = -100;
    let my = -100;
    let rx = -100;
    let ry = -100;
    let scale = 1;
    let hovering = false;
    let visible = false;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      if (!visible) {
        visible = true;
        ring.style.opacity = "1";
      }
      const target = e.target as Element | null;
      hovering = !!target?.closest?.("a, button, [role='button']");
    };

    const onLeave = () => {
      visible = false;
      ring.style.opacity = "0";
    };

    const tick = () => {
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      scale += ((hovering ? 1.8 : 1) - scale) * 0.15;
      ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%) scale(${scale})`;
      ring.style.borderColor = hovering
        ? "rgba(59, 130, 246, 0.6)"
        : "rgba(255, 255, 255, 0.25)";
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    window.addEventListener("mousemove", onMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      document.documentElement.removeEventListener("mouseleave", onLeave);
    };
  }, [enabled, reduceMotion]);

  if (!enabled || reduceMotion) return null;

  return (
    <div
      ref={ringRef}
      aria-hidden="true"
      className="fixed top-0 left-0 z-[70] w-8 h-8 rounded-full border pointer-events-none opacity-0 transition-opacity duration-300"
      style={{ borderColor: "rgba(255, 255, 255, 0.25)" }}
    />
  );
}
