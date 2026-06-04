"use client";

import { useRef } from "react";
import { useIntersection } from "./useIntersection";

const PROJECTS = [
  {
    title: "SepsisAI",
    category: "Healthcare AI",
    description:
      "FDA SaMD-class real-time sepsis detection. FHIR R4 ingestion, XGBoost ensemble, 33 security fixes hardened for clinical deployment.",
    tech: ["Python", "XGBoost", "FHIR R4", "Docker"],
    gradient: "from-blue-600/20 to-cyan-600/20",
    accent: "#3B82F6",
    large: true,
  },
  {
    title: "Quant Platform",
    category: "Trading Systems",
    description:
      "Multi-domain signal platform. LightGBM feature pipelines, live order routing, +$193K verified PnL.",
    tech: ["Python", "LightGBM", "PostgreSQL", "Redis"],
    gradient: "from-emerald-600/20 to-teal-600/20",
    accent: "#10B981",
    large: true,
  },
  {
    title: "Friday AI + Brain",
    category: "AI Assistant",
    description:
      "Neural memory system with Hebbian-inspired learning and Claude API integration.",
    tech: ["TypeScript", "Claude API", "Supabase"],
    gradient: "from-violet-600/20 to-purple-600/20",
    accent: "#8B5CF6",
    large: false,
  },
  {
    title: "Ultron Overwatch",
    category: "Infrastructure",
    description:
      "Self-healing monitoring with 62 checks and automated remediation playbooks.",
    tech: ["Go", "Docker", "Prometheus", "Grafana"],
    gradient: "from-orange-600/20 to-red-600/20",
    accent: "#F59E0B",
    large: false,
  },
  {
    title: "AI Agent Teams",
    category: "Multi-Agent Systems",
    description:
      "11 autonomous agents coordinating via event-driven Signal Bus and Supabase CRM.",
    tech: ["TypeScript", "Supabase", "OpenAI", "Claude"],
    gradient: "from-pink-600/20 to-rose-600/20",
    accent: "#EC4899",
    large: false,
  },
  {
    title: "Roblox Portfolio",
    category: "Game Development",
    description:
      "6 educational games with 245+ custom 3D assets built in Roblox Studio.",
    tech: ["Lua", "Roblox Studio", "Blender", "3D Assets"],
    gradient: "from-sky-600/20 to-indigo-600/20",
    accent: "#0EA5E9",
    large: false,
  },
];

function GridCard({
  project,
  index,
  visible,
}: {
  project: (typeof PROJECTS)[0];
  index: number;
  visible: boolean;
}) {
  return (
    <div
      className={`group relative transition-all duration-700 ease-out ${
        project.large ? "md:col-span-2 md:row-span-2" : ""
      } ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className="relative h-full rounded-2xl overflow-hidden glass hover:border-white/15 transition-all duration-500">
        <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-40`} />
        <div className="absolute inset-0 card-shine" />

        <div className="relative z-10 p-8 h-full flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <span
              className="text-[10px] tracking-[0.3em] uppercase font-medium px-3 py-1 rounded-full border"
              style={{
                color: project.accent,
                borderColor: `${project.accent}33`,
                backgroundColor: `${project.accent}0D`,
              }}
            >
              {project.category}
            </span>
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
            className={`font-bold text-white mb-3 ${
              project.large ? "text-3xl md:text-4xl" : "text-xl"
            }`}
          >
            {project.title}
          </h3>
          <p
            className={`text-white/50 leading-relaxed flex-grow ${
              project.large ? "text-base" : "text-sm"
            }`}
          >
            {project.description}
          </p>

          <div className="flex flex-wrap gap-2 mt-6">
            {project.tech.map((t) => (
              <span
                key={t}
                className="text-[10px] tracking-wider uppercase px-3 py-1 rounded-full bg-white/5 text-white/40 border border-white/5"
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        <div
          className="absolute bottom-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: `linear-gradient(90deg, transparent, ${project.accent}, transparent)`,
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[200px] md:auto-rows-[220px]">
          {PROJECTS.map((project, i) => (
            <GridCard key={project.title} project={project} index={i} visible={isInView} />
          ))}
        </div>
      </div>
    </section>
  );
}
