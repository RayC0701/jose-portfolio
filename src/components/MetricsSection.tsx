"use client";

import { useRef, useEffect, useState } from "react";
import { useIntersection } from "./useIntersection";

const METRICS = [
  {
    value: 193,
    suffix: "K",
    label: "Signal PnL",
    prefix: "+$",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
      </svg>
    ),
  },
  {
    value: 2428,
    suffix: "",
    label: "Tests Passing",
    prefix: "",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    value: 62,
    suffix: "",
    label: "Monitoring Checks",
    prefix: "",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5m.75-9l3-3 2.148 2.148A12.061 12.061 0 0116.5 7.605" />
      </svg>
    ),
  },
  {
    value: 11,
    suffix: "",
    label: "Autonomous Agents",
    prefix: "",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
      </svg>
    ),
  },
  {
    value: 17,
    suffix: "+",
    label: "Docker Containers",
    prefix: "",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
      </svg>
    ),
  },
  {
    value: 12,
    suffix: "+",
    label: "Production Systems",
    prefix: "",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 14.25h13.5m-13.5 0a3 3 0 01-3-3m3 3a3 3 0 100 6h13.5a3 3 0 100-6m-16.5-3a3 3 0 013-3h13.5a3 3 0 013 3m-19.5 0a4.5 4.5 0 01.9-2.7L5.737 5.1a3.375 3.375 0 012.7-1.35h7.126c1.062 0 2.062.5 2.7 1.35l2.587 3.45a4.5 4.5 0 01.9 2.7m0 0a3 3 0 01-3 3m0 3h.008v.008h-.008v-.008zm0-6h.008v.008h-.008v-.008zm-3 6h.008v.008h-.008v-.008zm0-6h.008v.008h-.008v-.008z" />
      </svg>
    ),
  },
];

function AnimatedCounter({
  value,
  prefix,
  suffix,
  duration = 2000,
  start,
  onComplete,
}: {
  value: number;
  prefix: string;
  suffix: string;
  duration?: number;
  start: boolean;
  onComplete?: () => void;
}) {
  const [display, setDisplay] = useState(0);
  const completedRef = useRef(false);

  useEffect(() => {
    if (!start) return;
    completedRef.current = false;
    const startTime = performance.now();
    let raf: number;

    const step = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.floor(eased * value));
      if (progress < 1) {
        raf = requestAnimationFrame(step);
      } else if (!completedRef.current) {
        completedRef.current = true;
        onComplete?.();
      }
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [start, value, duration, onComplete]);

  return (
    <span>
      {prefix}
      {display.toLocaleString()}
      {suffix}
    </span>
  );
}

export default function MetricsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useIntersection(ref);
  const [completedMetrics, setCompletedMetrics] = useState<Set<number>>(new Set());

  return (
    <section id="metrics" ref={ref} className="relative py-32 md:py-40 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0B] via-[#0A0E17] to-[#0A0A0B]" />
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-500/[0.04] rounded-full blur-[150px]" />
        <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] bg-purple-500/[0.02] rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div
          className={`text-center mb-20 transition-all duration-800 ease-out ${
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
          }`}
        >
          <p className="text-xs tracking-[0.4em] uppercase text-white/30 mb-4">By The Numbers</p>
          <h2 className="text-4xl md:text-6xl font-bold text-white">
            Measured <span className="text-gradient">Results</span>
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-10 lg:gap-14">
          {METRICS.map((metric, i) => {
            const isComplete = completedMetrics.has(i);
            return (
              <div
                key={metric.label}
                className={`text-center group transition-all duration-700 ease-out ${
                  isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}
                style={{ transitionDelay: `${150 + i * 120}ms` }}
              >
                <div className={`inline-flex items-center justify-center w-10 h-10 rounded-full mb-4 transition-all duration-500 ${
                  isComplete
                    ? "bg-blue-500/10 text-blue-400"
                    : "bg-white/[0.03] text-white/20"
                }`}>
                  {metric.icon}
                </div>

                <div
                  className={`text-4xl sm:text-5xl md:text-7xl font-bold text-white mb-3 tabular-nums transition-all duration-700 ${
                    isComplete ? "metric-glow-active" : ""
                  }`}
                  style={
                    isComplete
                      ? { textShadow: "0 0 20px rgba(59,130,246,0.2), 0 0 40px rgba(59,130,246,0.08)" }
                      : undefined
                  }
                >
                  <AnimatedCounter
                    value={metric.value}
                    prefix={metric.prefix}
                    suffix={metric.suffix}
                    start={isInView}
                    duration={2000 + i * 200}
                    onComplete={() =>
                      setCompletedMetrics((prev) => new Set(prev).add(i))
                    }
                  />
                </div>

                <div className="text-[10px] sm:text-xs md:text-sm tracking-[0.2em] uppercase text-white/30 group-hover:text-white/50 transition-colors duration-300">
                  {metric.label}
                </div>

                <div
                  className={`mt-4 mx-auto h-px transition-all duration-1000 ease-out ${
                    isComplete ? "w-16 opacity-100" : "w-0 opacity-0"
                  }`}
                  style={{
                    background: "linear-gradient(90deg, transparent, rgba(59,130,246,0.4), rgba(139,92,246,0.4), transparent)",
                  }}
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
