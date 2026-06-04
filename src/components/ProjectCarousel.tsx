"use client";

import { useRef, useEffect, useState, useCallback, type RefObject, type MouseEvent } from "react";

function useIntersection(ref: RefObject<HTMLElement | null>, margin = "-100px") {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { rootMargin: margin }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [ref, margin]);
  return visible;
}

const PROJECTS = [
  {
    title: "SepsisAI",
    subtitle: "Healthcare AI / FDA SaMD",
    category: "Healthcare AI",
    description: "Real-time sepsis detection pipeline with FHIR R4 integration, XGBoost models, and 33 security hardening fixes.",
    gradient: "linear-gradient(135deg, #0f2847 0%, #1a4a7a 30%, #0e7490 70%, #164e63 100%)",
    glowColor: "rgba(14, 116, 144, 0.6)",
    accentColor: "#22d3ee",
    icon: "S",
    tags: ["XGBoost", "FHIR R4", "FDA SaMD"],
  },
  {
    title: "Quant Platform",
    subtitle: "Multi-Domain Trading",
    category: "Trading Systems",
    description: "Signal-driven trading system with LightGBM models generating +$193K PnL across 2,428 passing tests.",
    gradient: "linear-gradient(135deg, #052e16 0%, #14532d 30%, #a16207 70%, #422006 100%)",
    glowColor: "rgba(161, 98, 7, 0.6)",
    accentColor: "#fbbf24",
    icon: "Q",
    tags: ["LightGBM", "Signal Bus", "2,428 Tests"],
  },
  {
    title: "Friday AI + Brain",
    subtitle: "Neural Memory Assistant",
    category: "AI Assistant",
    description: "Personal AI with Hebbian learning-inspired memory architecture powered by Claude API.",
    gradient: "linear-gradient(135deg, #2e1065 0%, #4c1d95 30%, #7c3aed 70%, #581c87 100%)",
    glowColor: "rgba(124, 58, 237, 0.6)",
    accentColor: "#a78bfa",
    icon: "F",
    tags: ["Claude API", "Hebbian", "RAG"],
  },
  {
    title: "Ultron Overwatch",
    subtitle: "Self-Healing Infrastructure",
    category: "Infrastructure",
    description: "Autonomous monitoring with 62 health checks and auto-fix playbooks for zero-touch remediation.",
    gradient: "linear-gradient(135deg, #431407 0%, #9a3412 30%, #dc2626 70%, #7f1d1d 100%)",
    glowColor: "rgba(220, 38, 38, 0.5)",
    accentColor: "#fb923c",
    icon: "U",
    tags: ["62 Checks", "Auto-Fix", "Docker"],
  },
  {
    title: "AI Agent Teams",
    subtitle: "Autonomous Agent Fleet",
    category: "Multi-Agent Systems",
    description: "11 specialized agents coordinating via Supabase CRM and event-driven Signal Bus architecture.",
    gradient: "linear-gradient(135deg, #042f2e 0%, #115e59 30%, #0891b2 70%, #155e75 100%)",
    glowColor: "rgba(8, 145, 178, 0.6)",
    accentColor: "#2dd4bf",
    icon: "A",
    tags: ["11 Agents", "Supabase", "Event Bus"],
  },
  {
    title: "Texas Rank & Rent",
    subtitle: "Lead-Gen Network",
    category: "Lead Generation",
    description: "270-site lead generation network built with Next.js and Turborepo monorepo architecture.",
    gradient: "linear-gradient(135deg, #451a03 0%, #78350f 30%, #d97706 70%, #92400e 100%)",
    glowColor: "rgba(217, 119, 6, 0.5)",
    accentColor: "#fcd34d",
    icon: "T",
    tags: ["Next.js", "Turborepo", "270 Sites"],
  },
];

function ProjectCard({
  project,
  index,
  offset,
  visible,
  onSelect,
}: {
  project: (typeof PROJECTS)[0];
  index: number;
  offset: number;
  visible: boolean;
  onSelect: () => void;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const isCenter = Math.abs(offset) < 0.5;
  const absOffset = Math.abs(offset);
  const scale = isCenter ? 1.05 : Math.max(0.78, 1 - absOffset * 0.12);
  const translateX = offset * 390;
  const translateZ = isCenter ? 40 : -absOffset * 60;
  const rotateY = offset * -6;
  const opacity = Math.max(0.25, 1 - absOffset * 0.3);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || !isCenter) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: y * -12, y: x * 12 });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setIsHovered(false);
  };

  return (
    <div
      className="absolute left-1/2 top-0"
      style={{
        transform: `translateX(calc(-50% + ${translateX}px)) perspective(1200px) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
        opacity: visible ? opacity : 0,
        transition: "transform 0.6s cubic-bezier(0.23, 1, 0.32, 1), opacity 0.6s ease",
        transitionDelay: visible ? `${index * 80}ms` : "0ms",
        zIndex: isCenter ? 20 : 10 - Math.round(absOffset),
        width: "360px",
        pointerEvents: absOffset > 3 ? "none" : "auto",
        filter: isCenter ? "none" : `blur(${Math.min(absOffset * 1.5, 3)}px)`,
        cursor: isCenter ? "default" : "pointer",
      }}
      onClick={!isCenter ? onSelect : undefined}
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        className="relative rounded-2xl overflow-hidden cursor-pointer"
        style={{
          transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          transition: isHovered ? "transform 0.1s ease-out" : "transform 0.5s ease-out",
          transformStyle: "preserve-3d",
          background: "rgba(17, 17, 19, 0.7)",
          backdropFilter: "blur(24px)",
          border: `1px solid ${isHovered && isCenter ? project.accentColor + "50" : "rgba(255,255,255,0.06)"}`,
          boxShadow: isHovered && isCenter
            ? `0 0 30px ${project.glowColor}, 0 25px 50px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.08)`
            : isCenter
              ? "0 25px 50px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.06)"
              : "0 10px 30px rgba(0,0,0,0.3)",
        }}
      >
        {/* Dramatic gradient header */}
        <div
          className="h-44 flex items-center justify-center relative overflow-hidden"
          style={{ background: project.gradient }}
        >
          <div className="absolute inset-0 bg-black/10" />
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: "radial-gradient(circle at 30% 40%, rgba(255,255,255,0.2) 0%, transparent 60%)",
            }}
          />
          <span className="text-6xl font-black text-white/20 relative z-10 select-none">{project.icon}</span>
          <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-[#111113] to-transparent" />
        </div>

        {/* Card body */}
        <div className="p-6 relative">
          {/* Category with accent dot */}
          <div className="flex items-center gap-2 mb-3">
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{ backgroundColor: project.accentColor, boxShadow: `0 0 6px ${project.accentColor}` }}
            />
            <span className="text-[10px] tracking-[0.3em] uppercase text-white/40 font-medium">
              {project.category}
            </span>
          </div>

          <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
          <p className="text-sm text-white/45 leading-relaxed mb-4">{project.description}</p>

          {/* Tech pills with glow */}
          <div className="flex flex-wrap gap-2 mb-5">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="text-[10px] tracking-wider uppercase px-3 py-1 rounded-full border transition-all duration-300"
                style={{
                  color: isHovered && isCenter ? project.accentColor : "rgba(255,255,255,0.4)",
                  borderColor: isHovered && isCenter ? project.accentColor + "30" : "rgba(255,255,255,0.06)",
                  backgroundColor: isHovered && isCenter ? project.accentColor + "10" : "rgba(255,255,255,0.03)",
                  boxShadow: isHovered && isCenter ? `0 0 12px ${project.accentColor}15` : "none",
                }}
              >
                {tag}
              </span>
            ))}
          </div>

          {/* View Case Study CTA */}
          <button
            className="w-full py-2.5 rounded-lg text-xs tracking-[0.2em] uppercase font-semibold transition-all duration-400 relative overflow-hidden group/btn"
            style={{
              color: isHovered && isCenter ? "#fff" : project.accentColor,
              border: `1px solid ${project.accentColor}30`,
              background: isHovered && isCenter
                ? `linear-gradient(135deg, ${project.accentColor}25, ${project.accentColor}10)`
                : "transparent",
              boxShadow: isHovered && isCenter ? `0 0 20px ${project.accentColor}20` : "none",
            }}
          >
            View Case Study
          </button>
        </div>

        {/* Top glassmorphism shine line */}
        <div
          className="absolute top-0 left-0 right-0 h-px"
          style={{
            background: `linear-gradient(90deg, transparent, ${isHovered && isCenter ? project.accentColor + "60" : "rgba(255,255,255,0.1)"}, transparent)`,
            transition: "background 0.4s ease",
          }}
        />
      </div>
    </div>
  );
}

export default function ProjectCarousel() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const isInView = useIntersection(sectionRef);
  const [activeIdx, setActiveIdx] = useState(0);

  const isDragging = useRef(false);
  const dragStart = useRef(0);
  const dragOffset = useRef(0);

  const goTo = useCallback((idx: number) => {
    setActiveIdx(Math.max(0, Math.min(PROJECTS.length - 1, idx)));
  }, []);

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    isDragging.current = true;
    dragStart.current = e.clientX;
    dragOffset.current = 0;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  }, []);

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (!isDragging.current) return;
    dragOffset.current = e.clientX - dragStart.current;
  }, []);

  const handlePointerUp = useCallback(() => {
    if (!isDragging.current) return;
    isDragging.current = false;
    const threshold = 60;
    if (dragOffset.current < -threshold) {
      goTo(activeIdx + 1);
    } else if (dragOffset.current > threshold) {
      goTo(activeIdx - 1);
    }
  }, [activeIdx, goTo]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") goTo(activeIdx + 1);
      if (e.key === "ArrowLeft") goTo(activeIdx - 1);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeIdx, goTo]);

  return (
    <section id="work" ref={sectionRef} className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0B] via-[#0d1117] to-[#0A0A0B]" />

      {/* Ambient glow behind active card */}
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full blur-[120px] transition-all duration-1000 opacity-20 pointer-events-none"
        style={{ background: PROJECTS[activeIdx].glowColor }}
      />

      <div className="relative z-10">
        <div
          className={`text-center mb-20 px-6 transition-all duration-800 ease-out ${
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
          }`}
        >
          <p className="text-xs tracking-[0.4em] uppercase text-white/30 mb-4">Featured Work</p>
          <h2 className="text-4xl md:text-6xl font-bold text-white">
            Focus on{" "}
            <span className="text-gradient-impact">Impact</span>
          </h2>
        </div>

        {/* 3D Carousel track */}
        <div
          ref={trackRef}
          className="relative h-[520px] mx-auto max-w-5xl select-none touch-pan-y"
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          style={{ perspective: "1200px" }}
        >
          {PROJECTS.map((project, i) => (
            <ProjectCard
              key={project.title}
              project={project}
              index={i}
              offset={i - activeIdx}
              visible={isInView}
              onSelect={() => goTo(i)}
            />
          ))}
        </div>

        {/* Navigation dots */}
        <div className="flex justify-center items-center gap-3 mt-10">
          <button
            onClick={() => goTo(activeIdx - 1)}
            disabled={activeIdx === 0}
            className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-white/80 hover:border-white/30 transition-all disabled:opacity-20 disabled:cursor-not-allowed"
            aria-label="Previous project"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>

          {PROJECTS.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className="relative h-2 rounded-full transition-all duration-500"
              style={{
                width: i === activeIdx ? "32px" : "8px",
                background: i === activeIdx ? PROJECTS[activeIdx].accentColor : "rgba(255,255,255,0.15)",
                boxShadow: i === activeIdx ? `0 0 10px ${PROJECTS[activeIdx].accentColor}50` : "none",
              }}
              aria-label={`Go to project ${i + 1}`}
            />
          ))}

          <button
            onClick={() => goTo(activeIdx + 1)}
            disabled={activeIdx === PROJECTS.length - 1}
            className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-white/80 hover:border-white/30 transition-all disabled:opacity-20 disabled:cursor-not-allowed"
            aria-label="Next project"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
