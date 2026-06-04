"use client";

import { useRef, useEffect } from "react";
import { useIntersection, useIsIntersecting } from "./useIntersection";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";

function PerspectiveGrid({
  active,
  reduceMotion,
}: {
  active: boolean;
  reduceMotion: boolean;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const runningRef = useRef(false);

  useEffect(() => {
    if (reduceMotion) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId = 0;
    let time = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = canvas.parentElement?.clientHeight || 900;
    };
    resize();
    window.addEventListener("resize", resize);

    const draw = () => {
      if (!runningRef.current) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      time += 0.003;

      const cx = canvas.width / 2;
      const cy = canvas.height / 2;
      const spacing = 50;
      const cols = Math.ceil(canvas.width / spacing) + 2;
      const rows = Math.ceil(canvas.height / spacing) + 2;

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const baseX = i * spacing;
          const baseY = j * spacing;
          const dx = baseX - cx;
          const dy = baseY - cy;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const maxDist = Math.sqrt(cx * cx + cy * cy);
          const normalizedDist = dist / maxDist;

          const warpStrength = Math.sin(dist * 0.003 - time * 2) * 15;
          const angle = Math.atan2(dy, dx);
          const warpX = baseX + Math.cos(angle + time) * warpStrength * normalizedDist;
          const warpY = baseY + Math.sin(angle + time) * warpStrength * normalizedDist;

          const wave = Math.sin(dist * 0.005 - time * 1.5) * 0.5 + 0.5;
          const alpha = wave * 0.12 * (1 - normalizedDist * 0.5);

          ctx.beginPath();
          ctx.arc(warpX, warpY, 1.2, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(59, 130, 246, ${alpha})`;
          ctx.fill();

          if (i < cols - 1) {
            const nextX = (i + 1) * spacing;
            const ndx = nextX - cx;
            const nDist = Math.sqrt(ndx * ndx + dy * dy);
            const nNorm = nDist / maxDist;
            const nWarp = Math.sin(nDist * 0.003 - time * 2) * 15;
            const nAngle = Math.atan2(dy, ndx);
            const nWarpX = nextX + Math.cos(nAngle + time) * nWarp * nNorm;
            const nWarpY = baseY + Math.sin(nAngle + time) * nWarp * nNorm;

            const lineAlpha = alpha * 0.3;
            if (lineAlpha > 0.005) {
              ctx.beginPath();
              ctx.moveTo(warpX, warpY);
              ctx.lineTo(nWarpX, nWarpY);
              ctx.strokeStyle = `rgba(59, 130, 246, ${lineAlpha})`;
              ctx.lineWidth = 0.5;
              ctx.stroke();
            }
          }

          if (j < rows - 1) {
            const nextY = (j + 1) * spacing;
            const ndy = nextY - cy;
            const nDist = Math.sqrt(dx * dx + ndy * ndy);
            const nNorm = nDist / maxDist;
            const nWarp = Math.sin(nDist * 0.003 - time * 2) * 15;
            const nAngle = Math.atan2(ndy, dx);
            const nWarpX = baseX + Math.cos(nAngle + time) * nWarp * nNorm;
            const nWarpY = nextY + Math.sin(nAngle + time) * nWarp * nNorm;

            const lineAlpha = alpha * 0.3;
            if (lineAlpha > 0.005) {
              ctx.beginPath();
              ctx.moveTo(warpX, warpY);
              ctx.lineTo(nWarpX, nWarpY);
              ctx.strokeStyle = `rgba(59, 130, 246, ${lineAlpha})`;
              ctx.lineWidth = 0.5;
              ctx.stroke();
            }
          }
        }
      }

      const glowGradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, 300);
      glowGradient.addColorStop(0, `rgba(59, 130, 246, ${0.03 + Math.sin(time) * 0.01})`);
      glowGradient.addColorStop(1, "transparent");
      ctx.fillStyle = glowGradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      animationId = requestAnimationFrame(draw);
    };

    if (active) {
      runningRef.current = true;
      animationId = requestAnimationFrame(draw);
    }

    return () => {
      runningRef.current = false;
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, [active, reduceMotion]);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" aria-hidden="true" />;
}

export default function DramaticSection() {
  const ref = useRef<HTMLDivElement>(null);
  const revealed = useIntersection(ref, "-200px");
  const active = useIsIntersecting(ref, "200px");
  const reduceMotion = usePrefersReducedMotion();

  const lines = [
    { text: "PRODUCTION", gradient: false, delay: 200 },
    { text: "CODE.", gradient: true, warm: false, delay: 400 },
    { text: "BATTLE-TESTED", gradient: false, delay: 700 },
    { text: "SYSTEMS.", gradient: true, warm: true, delay: 1000 },
  ];

  return (
    <section ref={ref} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0B] via-[#050710] to-[#0A0A0B]" />
      <PerspectiveGrid active={active} reduceMotion={reduceMotion} />
      <div className="absolute inset-0 grain-overlay" />

      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-blue-500/[0.03] rounded-full blur-[150px]" />

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <p
          className={`text-xs tracking-[0.5em] uppercase text-blue-400/60 mb-10 transition-all duration-1000 ease-out ${
            revealed ? "opacity-100 translate-y-0 blur-0" : "opacity-0 translate-y-4 blur-sm"
          }`}
          style={{ transitionDelay: "100ms" }}
        >
          The Philosophy
        </p>

        <h2 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold leading-[0.85] tracking-tight mb-10">
          {lines.map((line, i) => (
            <span
              key={i}
              className={`block transition-all duration-1000 ease-out ${
                line.gradient
                  ? line.warm
                    ? "text-gradient-warm"
                    : "text-gradient"
                  : "text-white/90"
              } ${
                revealed ? "opacity-100 translate-y-0 blur-0" : "opacity-0 translate-y-6 blur-md"
              }`}
              style={{ transitionDelay: `${line.delay}ms` }}
            >
              {line.text}
            </span>
          ))}
        </h2>

        <div
          className={`mx-auto mb-10 h-px transition-all duration-1000 ease-out origin-center ${
            revealed ? "w-40 opacity-100" : "w-0 opacity-0"
          }`}
          style={{
            transitionDelay: "1200ms",
            background:
              "linear-gradient(90deg, transparent, rgba(59,130,246,0.5), rgba(139,92,246,0.5), transparent)",
          }}
        />

        <p
          className={`text-lg md:text-xl text-white/40 max-w-2xl mx-auto font-light transition-all duration-1000 ease-out ${
            revealed ? "opacity-50 translate-y-0 blur-0" : "opacity-0 translate-y-5 blur-sm"
          }`}
          style={{ transitionDelay: "1400ms" }}
        >
          Every line of code is written to survive production. Every system is built to outlast the hype cycle.
        </p>
      </div>
    </section>
  );
}
