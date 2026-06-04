"use client";

import { useRef, useEffect, useState } from "react";
import { useIntersection } from "./useIntersection";

const METRICS = [
  { value: 12, suffix: "+", label: "Production Systems", prefix: "" },
  { value: 193, suffix: "K", label: "Signal PnL", prefix: "+$" },
  { value: 2428, suffix: "", label: "Tests Passing", prefix: "" },
  { value: 62, suffix: "", label: "Monitoring Checks", prefix: "" },
  { value: 11, suffix: "", label: "Autonomous Agents", prefix: "" },
  { value: 17, suffix: "+", label: "Docker Containers", prefix: "" },
];

function AnimatedCounter({
  value,
  prefix,
  suffix,
  duration = 2000,
  start,
}: {
  value: number;
  prefix: string;
  suffix: string;
  duration?: number;
  start: boolean;
}) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!start) return;
    const startTime = performance.now();
    let raf: number;

    const step = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.floor(eased * value));
      if (progress < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [start, value, duration]);

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

  return (
    <section id="metrics" ref={ref} className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0B] via-[#0A0E17] to-[#0A0A0B]" />
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[120px]" />
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

        <div className="grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-12">
          {METRICS.map((metric, i) => (
            <div
              key={metric.label}
              className={`text-center group transition-all duration-700 ease-out ${
                isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div className="text-4xl sm:text-5xl md:text-7xl font-bold text-white mb-2 tabular-nums">
                <AnimatedCounter
                  value={metric.value}
                  prefix={metric.prefix}
                  suffix={metric.suffix}
                  start={isInView}
                  duration={2000 + i * 200}
                />
              </div>
              <div className="text-xs md:text-sm tracking-[0.2em] uppercase text-white/30 group-hover:text-white/50 transition-colors">
                {metric.label}
              </div>
              <div className="mt-4 mx-auto w-12 h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
