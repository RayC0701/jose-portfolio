"use client";

import { useRef, useEffect, useState, type RefObject } from "react";

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
    description: "Real-time sepsis detection pipeline with FHIR R4 integration, XGBoost models, and 33 security hardening fixes.",
    gradient: "from-blue-600 to-cyan-500",
    icon: "S",
    tags: ["XGBoost", "FHIR R4", "FDA SaMD"],
  },
  {
    title: "Quant Platform",
    subtitle: "Multi-Domain Trading",
    description: "Signal-driven trading system with LightGBM models generating +$193K PnL across 2,428 passing tests.",
    gradient: "from-emerald-500 to-teal-600",
    icon: "Q",
    tags: ["LightGBM", "Signal Bus", "2,428 Tests"],
  },
  {
    title: "Friday AI + Brain",
    subtitle: "Neural Memory Assistant",
    description: "Personal AI with Hebbian learning-inspired memory architecture powered by Claude API.",
    gradient: "from-violet-600 to-purple-500",
    icon: "F",
    tags: ["Claude API", "Hebbian", "RAG"],
  },
  {
    title: "Ultron Overwatch",
    subtitle: "Self-Healing Infrastructure",
    description: "Autonomous monitoring with 62 health checks and auto-fix playbooks for zero-touch remediation.",
    gradient: "from-orange-500 to-red-600",
    icon: "U",
    tags: ["62 Checks", "Auto-Fix", "Docker"],
  },
  {
    title: "AI Agent Teams",
    subtitle: "Autonomous Agent Fleet",
    description: "11 specialized agents coordinating via Supabase CRM and event-driven Signal Bus architecture.",
    gradient: "from-pink-500 to-rose-600",
    icon: "A",
    tags: ["11 Agents", "Supabase", "Event Bus"],
  },
  {
    title: "Texas Rank & Rent",
    subtitle: "Lead-Gen Network",
    description: "270-site lead generation network built with Next.js and Turborepo monorepo architecture.",
    gradient: "from-amber-500 to-yellow-600",
    icon: "T",
    tags: ["Next.js", "Turborepo", "270 Sites"],
  },
];

function ProjectCard({
  project,
  index,
  isCenter,
  visible,
}: {
  project: (typeof PROJECTS)[0];
  index: number;
  isCenter: boolean;
  visible: boolean;
}) {
  return (
    <div
      className={`flex-shrink-0 w-[320px] md:w-[380px] transition-all duration-700 ${
        isCenter ? "scale-105 z-10" : "scale-95 opacity-70"
      } ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className="group relative rounded-2xl overflow-hidden glass hover:border-white/15 transition-all duration-500">
        <div
          className={`h-48 bg-gradient-to-br ${project.gradient} flex items-center justify-center relative overflow-hidden`}
        >
          <div className="absolute inset-0 bg-black/20" />
          <span className="text-5xl font-black text-white/30 relative z-10">{project.icon}</span>
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#111113] to-transparent" />
        </div>

        <div className="p-6">
          <p className="text-[10px] tracking-[0.3em] uppercase text-white/40 mb-2">
            {project.subtitle}
          </p>
          <h3 className="text-xl font-bold text-white mb-3">{project.title}</h3>
          <p className="text-sm text-white/50 leading-relaxed mb-4">{project.description}</p>
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="text-[10px] tracking-wider uppercase px-3 py-1 rounded-full bg-white/5 text-white/50 border border-white/5"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ProjectCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useIntersection(sectionRef);
  const [centerIdx, setCenterIdx] = useState(1);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const onScroll = () => {
      const scrollCenter = el.scrollLeft + el.clientWidth / 2;
      const cardWidth = el.clientWidth < 768 ? 320 : 380;
      const gap = 24;
      const idx = Math.round((scrollCenter - cardWidth / 2) / (cardWidth + gap));
      setCenterIdx(Math.max(0, Math.min(PROJECTS.length - 1, idx)));
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section id="work" ref={sectionRef} className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0B] via-[#0d1117] to-[#0A0A0B]" />

      <div className="relative z-10">
        <div
          className={`text-center mb-16 px-6 transition-all duration-800 ease-out ${
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
          }`}
        >
          <p className="text-xs tracking-[0.4em] uppercase text-white/30 mb-4">Featured Work</p>
          <h2 className="text-4xl md:text-6xl font-bold text-white">
            Focus on{" "}
            <span className="text-gradient">Impact</span>
          </h2>
        </div>

        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto scrollbar-hide px-[calc(50vw-190px)] md:px-[calc(50vw-190px)] snap-x snap-mandatory pb-8"
        >
          {PROJECTS.map((project, i) => (
            <div key={project.title} className="snap-center">
              <ProjectCard project={project} index={i} isCenter={i === centerIdx} visible={isInView} />
            </div>
          ))}
        </div>

        <div className="flex justify-center gap-2 mt-8">
          {PROJECTS.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                const el = scrollRef.current;
                if (!el) return;
                const cardWidth = el.clientWidth < 768 ? 320 : 380;
                el.scrollTo({ left: i * (cardWidth + 24), behavior: "smooth" });
              }}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                i === centerIdx ? "bg-blue-500 w-6" : "bg-white/20"
              }`}
              aria-label={`Go to project ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
