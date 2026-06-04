"use client";

import { useRef, useState, useEffect, type RefObject } from "react";

function useIntersection(ref: RefObject<HTMLElement | null>, margin = "-80px") {
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
    category: "Healthcare AI",
    description: "FDA SaMD-class real-time sepsis detection. FHIR R4 ingestion, XGBoost ensemble, 33 security fixes hardened for clinical deployment.",
    tech: ["Python", "XGBoost", "FHIR R4", "Docker"],
    gradient: "linear-gradient(135deg, #0f2847 0%, #1a4a7a 40%, #0e7490 100%)",
    accentColor: "#22d3ee",
    glowColor: "rgba(14, 116, 144, 0.4)",
    large: true,
    animDir: "left" as const,
  },
  {
    title: "Quant Platform",
    category: "Trading Systems",
    description: "Multi-domain signal platform. LightGBM feature pipelines, live order routing, +$193K verified PnL.",
    tech: ["Python", "LightGBM", "PostgreSQL", "Redis"],
    gradient: "linear-gradient(135deg, #052e16 0%, #14532d 40%, #a16207 100%)",
    accentColor: "#fbbf24",
    glowColor: "rgba(161, 98, 7, 0.4)",
    large: true,
    animDir: "right" as const,
  },
  {
    title: "Friday AI + Brain",
    category: "AI Assistant",
    description: "Neural memory system with Hebbian-inspired learning and Claude API integration.",
    tech: ["TypeScript", "Claude API", "Supabase"],
    gradient: "linear-gradient(135deg, #2e1065 0%, #4c1d95 40%, #7c3aed 100%)",
    accentColor: "#a78bfa",
    glowColor: "rgba(124, 58, 237, 0.4)",
    large: false,
    animDir: "bottom" as const,
  },
  {
    title: "Ultron Overwatch",
    category: "Infrastructure",
    description: "Self-healing monitoring with 62 checks and automated remediation playbooks.",
    tech: ["Go", "Docker", "Prometheus", "Grafana"],
    gradient: "linear-gradient(135deg, #431407 0%, #9a3412 40%, #dc2626 100%)",
    accentColor: "#fb923c",
    glowColor: "rgba(220, 38, 38, 0.4)",
    large: false,
    animDir: "left" as const,
  },
  {
    title: "AI Agent Teams",
    category: "Multi-Agent Systems",
    description: "11 autonomous agents coordinating via event-driven Signal Bus and Supabase CRM.",
    tech: ["TypeScript", "Supabase", "OpenAI", "Claude"],
    gradient: "linear-gradient(135deg, #042f2e 0%, #115e59 40%, #0891b2 100%)",
    accentColor: "#2dd4bf",
    glowColor: "rgba(8, 145, 178, 0.4)",
    large: false,
    animDir: "right" as const,
  },
  {
    title: "Roblox Portfolio",
    category: "Game Development",
    description: "6 educational games with 245+ custom 3D assets built in Roblox Studio.",
    tech: ["Lua", "Roblox Studio", "Blender", "3D Assets"],
    gradient: "linear-gradient(135deg, #0c1f3f 0%, #1e3a5f 40%, #3b82f6 100%)",
    accentColor: "#60a5fa",
    glowColor: "rgba(59, 130, 246, 0.4)",
    large: false,
    animDir: "bottom" as const,
  },
];

const ANIM_TRANSFORMS: Record<string, string> = {
  left: "translateX(-40px) translateY(20px)",
  right: "translateX(40px) translateY(20px)",
  bottom: "translateY(50px)",
};

function BentoCard({
  project,
  index,
  visible,
}: {
  project: (typeof PROJECTS)[0];
  index: number;
  visible: boolean;
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`group relative ${project.large ? "md:col-span-2 md:row-span-2" : ""}`}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateX(0) translateY(0)" : ANIM_TRANSFORMS[project.animDir],
        transition: `opacity 0.8s cubic-bezier(0.23, 1, 0.32, 1), transform 0.8s cubic-bezier(0.23, 1, 0.32, 1)`,
        transitionDelay: `${index * 120}ms`,
        zIndex: isHovered ? 20 : 10 - index,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`relative rounded-2xl overflow-hidden cursor-pointer ${project.large ? "h-full" : ""}`}
        style={{
          background: "rgba(17, 17, 19, 0.75)",
          backdropFilter: "blur(24px)",
          border: `1px solid ${isHovered ? project.accentColor + "40" : "rgba(255,255,255,0.06)"}`,
          transform: isHovered ? "translateY(-4px) scale(1.02)" : "translateY(0) scale(1)",
          boxShadow: isHovered
            ? `0 0 30px ${project.glowColor}, 0 20px 40px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.08)`
            : "0 4px 20px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.04)",
          transition: "all 0.5s cubic-bezier(0.23, 1, 0.32, 1)",
        }}
      >
        {/* Gradient overlay */}
        <div
          className="absolute inset-0 opacity-30 transition-opacity duration-500"
          style={{
            background: project.gradient,
            opacity: isHovered ? 0.45 : 0.25,
          }}
        />

        {/* Grain texture */}
        <div className="grain-card absolute inset-0 pointer-events-none" />

        {/* Shine */}
        <div
          className="absolute inset-0 transition-opacity duration-500"
          style={{
            background: "linear-gradient(135deg, rgba(255,255,255,0.06) 0%, transparent 50%)",
            opacity: isHovered ? 1 : 0.4,
          }}
        />

        {/* Content */}
        <div className={`relative z-10 p-7 flex flex-col ${project.large ? "h-full" : ""}`}>
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2">
              <span
                className="w-1.5 h-1.5 rounded-full transition-shadow duration-300"
                style={{
                  backgroundColor: project.accentColor,
                  boxShadow: isHovered ? `0 0 8px ${project.accentColor}` : `0 0 3px ${project.accentColor}80`,
                }}
              />
              <span
                className="text-[10px] tracking-[0.3em] uppercase font-medium px-3 py-1 rounded-full border transition-all duration-300"
                style={{
                  color: project.accentColor,
                  borderColor: project.accentColor + "25",
                  backgroundColor: project.accentColor + "08",
                }}
              >
                {project.category}
              </span>
            </div>
            <svg
              className="w-4 h-4 text-white/20 group-hover:text-white/60 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7V17" />
            </svg>
          </div>

          <h3
            className={`font-bold text-white mb-3 ${project.large ? "text-3xl md:text-4xl" : "text-xl"}`}
          >
            {project.title}
          </h3>
          <p
            className={`text-white/45 leading-relaxed flex-grow ${project.large ? "text-base" : "text-sm"}`}
          >
            {project.description}
          </p>

          {/* Tech pills */}
          <div className="flex flex-wrap gap-2 mt-5">
            {project.tech.map((t) => (
              <span
                key={t}
                className="text-[10px] tracking-wider uppercase px-3 py-1 rounded-full border transition-all duration-300"
                style={{
                  color: isHovered ? project.accentColor : "rgba(255,255,255,0.35)",
                  borderColor: isHovered ? project.accentColor + "25" : "rgba(255,255,255,0.06)",
                  backgroundColor: isHovered ? project.accentColor + "08" : "rgba(255,255,255,0.03)",
                  boxShadow: isHovered ? `0 0 10px ${project.accentColor}10` : "none",
                }}
              >
                {t}
              </span>
            ))}
          </div>

          {/* View Case Study CTA */}
          <button
            className="mt-5 w-full py-2.5 rounded-lg text-xs tracking-[0.2em] uppercase font-semibold transition-all duration-400 relative overflow-hidden"
            style={{
              color: isHovered ? "#fff" : project.accentColor,
              border: `1px solid ${project.accentColor}30`,
              background: isHovered
                ? `linear-gradient(135deg, ${project.accentColor}20, ${project.accentColor}08)`
                : "transparent",
              boxShadow: isHovered ? `0 0 20px ${project.accentColor}15` : "none",
            }}
          >
            View Case Study
          </button>
        </div>

        {/* Bottom glow line */}
        <div
          className="absolute bottom-0 left-0 right-0 h-px transition-opacity duration-500"
          style={{
            background: `linear-gradient(90deg, transparent, ${project.accentColor}, transparent)`,
            opacity: isHovered ? 0.6 : 0,
          }}
        />
      </div>
    </div>
  );
}

export default function ProjectGrid() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useIntersection(sectionRef);

  return (
    <section id="projects" ref={sectionRef} className="relative py-32">
      <div className="max-w-7xl mx-auto px-6">
        <div
          className={`mb-16 transition-all duration-800 ease-out ${
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
          }`}
        >
          <p className="text-xs tracking-[0.4em] uppercase text-white/30 mb-4">The Portfolio</p>
          <h2 className="text-4xl md:text-6xl font-bold text-white">
            Systems That <span className="text-gradient">Ship</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-5 md:grid-rows-[280px_280px_auto]">
          {PROJECTS.map((project, i) => (
            <BentoCard key={project.title} project={project} index={i} visible={isInView} />
          ))}
        </div>
      </div>
    </section>
  );
}
