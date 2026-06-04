"use client";

import Link from "next/link";
import Image from "next/image";
import { useRef, useState } from "react";
import { PROJECTS, type Project } from "@/lib/projects";
import { useIntersection } from "./useIntersection";

const ANIM_TRANSFORMS: Record<Project["animDir"], string> = {
  left: "translateX(-40px) translateY(20px)",
  right: "translateX(40px) translateY(20px)",
  bottom: "translateY(50px)",
};

function BentoCard({
  project,
  index,
  visible,
}: {
  project: Project;
  index: number;
  visible: boolean;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const hasStudy = !!project.caseStudy;

  const cardInner = (
    <div
      className={`relative rounded-2xl overflow-hidden ${project.large ? "h-full" : ""}`}
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
      <Image
        src={project.image}
        alt={project.title}
        fill
        className="object-cover transition-opacity duration-500"
        style={{ opacity: isHovered ? 0.35 : 0.2 }}
        sizes="(max-width: 768px) 100vw, 50vw"
      />
      <div
        className="absolute inset-0 transition-opacity duration-500"
        style={{
          background: project.gradient,
          opacity: isHovered ? 0.45 : 0.25,
        }}
      />

      <div className="grain-card absolute inset-0 pointer-events-none" />

      <div
        className="absolute inset-0 transition-opacity duration-500"
        style={{
          background: "linear-gradient(135deg, rgba(255,255,255,0.06) 0%, transparent 50%)",
          opacity: isHovered ? 1 : 0.4,
        }}
      />

      <div className={`relative z-10 p-7 flex flex-col ${project.large ? "h-full" : ""}`}>
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <span
              className="w-1.5 h-1.5 rounded-full transition-shadow duration-300"
              style={{
                backgroundColor: project.accentColor,
                boxShadow: isHovered
                  ? `0 0 8px ${project.accentColor}`
                  : `0 0 3px ${project.accentColor}80`,
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

        <h3 className={`font-bold text-white mb-3 ${project.large ? "text-3xl md:text-4xl" : "text-xl"}`}>
          {project.title}
        </h3>
        <p
          className={`text-white/45 leading-relaxed flex-grow ${project.large ? "text-base" : "text-sm"}`}
        >
          {project.longDescription}
        </p>

        <div className="flex flex-wrap gap-2 mt-5">
          {project.tech.map((t) => (
            <span
              key={t}
              className="text-[10px] tracking-wider uppercase px-3 py-1 rounded-full border transition-colors duration-300"
              style={{
                color: isHovered ? project.accentColor : "rgba(255,255,255,0.35)",
                borderColor: isHovered ? project.accentColor + "25" : "rgba(255,255,255,0.06)",
                backgroundColor: isHovered ? project.accentColor + "08" : "rgba(255,255,255,0.03)",
              }}
            >
              {t}
            </span>
          ))}
        </div>

        {hasStudy ? (
          <Link
            href={`/work/${project.slug}`}
            className="mt-5 w-full flex items-center justify-center py-3 rounded-lg text-xs tracking-[0.2em] uppercase font-semibold transition-colors duration-300 relative overflow-hidden min-h-[44px]"
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
          </Link>
        ) : (
          <div
            className="mt-5 w-full flex items-center justify-center py-3 rounded-lg text-xs tracking-[0.2em] uppercase font-semibold min-h-[44px]"
            style={{
              color: "rgba(255,255,255,0.35)",
              border: `1px solid rgba(255,255,255,0.08)`,
            }}
            aria-disabled="true"
          >
            Case Study Soon
          </div>
        )}
      </div>

      <div
        className="absolute bottom-0 left-0 right-0 h-px transition-opacity duration-500 pointer-events-none"
        style={{
          background: `linear-gradient(90deg, transparent, ${project.accentColor}, transparent)`,
          opacity: isHovered ? 0.6 : 0,
        }}
      />
    </div>
  );

  return (
    <div
      className={`group relative ${project.large ? "md:col-span-2 md:row-span-2" : ""}`}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateX(0) translateY(0)" : ANIM_TRANSFORMS[project.animDir],
        transition:
          "opacity 0.8s cubic-bezier(0.23, 1, 0.32, 1), transform 0.8s cubic-bezier(0.23, 1, 0.32, 1)",
        transitionDelay: `${index * 120}ms`,
        zIndex: isHovered ? 20 : 10 - index,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {cardInner}
    </div>
  );
}

export default function ProjectGrid() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useIntersection(sectionRef, "-80px");

  return (
    <section id="projects" ref={sectionRef} className="relative py-32">
      <div className="max-w-7xl mx-auto px-6">
        <div
          className={`mb-16 transition-all duration-700 ease-out ${
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
            <BentoCard key={project.slug} project={project} index={i} visible={isInView} />
          ))}
        </div>
      </div>
    </section>
  );
}
