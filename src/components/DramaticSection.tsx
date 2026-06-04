"use client";

import { useRef, useEffect } from "react";
import { useIntersection } from "./useIntersection";

function GridBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let time = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = canvas.parentElement?.clientHeight || 800;
    };
    resize();
    window.addEventListener("resize", resize);

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      time += 0.005;

      const spacing = 60;
      const cols = Math.ceil(canvas.width / spacing) + 1;
      const rows = Math.ceil(canvas.height / spacing) + 1;

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const x = i * spacing;
          const y = j * spacing;
          const dist = Math.sqrt(
            Math.pow(x - canvas.width / 2, 2) + Math.pow(y - canvas.height / 2, 2)
          );
          const wave = Math.sin(dist * 0.005 - time) * 0.5 + 0.5;
          const alpha = wave * 0.08;

          ctx.beginPath();
          ctx.arc(x, y, 1, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(59, 130, 246, ${alpha})`;
          ctx.fill();
        }
      }

      animationId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />;
}

export default function DramaticSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useIntersection(ref, "-200px");

  return (
    <section ref={ref} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0B] via-[#070810] to-[#0A0A0B]" />
      <GridBackground />
      <div className="absolute inset-0 grain-overlay" />

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <div
          className={`transition-all duration-1000 ease-out ${
            isInView ? "opacity-100 scale-100" : "opacity-0 scale-95"
          }`}
        >
          <p className="text-xs tracking-[0.5em] uppercase text-blue-400/60 mb-8">The Philosophy</p>

          <h2 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold leading-[0.85] tracking-tight mb-8">
            <span
              className={`block text-white/90 transition-all duration-800 ease-out ${
                isInView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
              }`}
              style={{ transitionDelay: "200ms" }}
            >
              PRODUCTION
            </span>
            <span
              className={`block text-gradient transition-all duration-800 ease-out ${
                isInView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
              }`}
              style={{ transitionDelay: "400ms" }}
            >
              CODE.
            </span>
            <span
              className={`block text-white/90 transition-all duration-800 ease-out ${
                isInView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
              }`}
              style={{ transitionDelay: "600ms" }}
            >
              BATTLE-TESTED
            </span>
            <span
              className={`block text-gradient-warm transition-all duration-800 ease-out ${
                isInView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
              }`}
              style={{ transitionDelay: "800ms" }}
            >
              SYSTEMS.
            </span>
          </h2>

          <p
            className={`text-lg md:text-xl text-white/40 max-w-2xl mx-auto font-light transition-all duration-800 ease-out ${
              isInView ? "opacity-50 translate-y-0" : "opacity-0 translate-y-5"
            }`}
            style={{ transitionDelay: "1000ms" }}
          >
            Every line of code is written to survive production. Every system is built to outlast the hype cycle.
          </p>
        </div>
      </div>
    </section>
  );
}
