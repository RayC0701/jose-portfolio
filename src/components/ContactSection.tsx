"use client";

import { useRef } from "react";
import { useIntersection } from "./useIntersection";

const ENGAGEMENT_MODELS = [
  {
    title: "Technical Advisory",
    description: "Architecture reviews, tech stack decisions, and strategic technical guidance for your team.",
    icon: "01",
  },
  {
    title: "Hands-On Build",
    description: "End-to-end development of production AI systems, from proof of concept to deployment.",
    icon: "02",
  },
  {
    title: "Fractional CTO",
    description: "Embedded technical leadership for startups and scale-ups navigating complex engineering challenges.",
    icon: "03",
  },
];

const SOCIAL_LINKS = [
  { label: "GitHub", href: "https://github.com/RayC0701" },
  { label: "LinkedIn", href: "https://linkedin.com/in/josecanales" },
  { label: "Email", href: "mailto:jcanales07@gmail.com" },
];

export default function ContactSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useIntersection(ref);

  return (
    <section id="contact" ref={ref} className="relative py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0B] to-[#06060A]" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div
          className={`text-center mb-20 transition-all duration-800 ease-out ${
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
          }`}
        >
          <p className="text-xs tracking-[0.4em] uppercase text-white/30 mb-4">Engagement</p>
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Let&apos;s Build <span className="text-gradient">Together</span>
          </h2>
          <p className="text-lg text-white/40 max-w-2xl mx-auto font-light">
            Whether you need a technical co-founder, a production AI system, or an architecture that scales.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          {ENGAGEMENT_MODELS.map((model, i) => (
            <div
              key={model.title}
              className={`group transition-all duration-700 ease-out ${
                isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div className="relative h-full p-8 rounded-2xl glass hover:border-white/15 transition-all duration-500">
                <span className="text-5xl font-bold text-white/5 group-hover:text-blue-500/10 transition-colors duration-500">
                  {model.icon}
                </span>
                <h3 className="text-xl font-bold text-white mt-4 mb-3">{model.title}</h3>
                <p className="text-sm text-white/40 leading-relaxed">{model.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div
          className={`text-center transition-all duration-800 ease-out ${
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
          }`}
          style={{ transitionDelay: "500ms" }}
        >
          <a
            href="mailto:jcanales07@gmail.com"
            className="inline-flex items-center gap-3 px-10 py-4 rounded-full bg-white text-black font-bold text-sm tracking-[0.15em] uppercase hover:bg-white/90 transition-all duration-300 hover:shadow-[0_0_40px_rgba(255,255,255,0.1)]"
          >
            <span>Start a Conversation</span>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </a>

          <div className="mt-12 flex items-center justify-center gap-8">
            {SOCIAL_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs tracking-[0.2em] uppercase text-white/30 hover:text-white/70 transition-colors duration-300"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="relative z-10 mt-32 border-t border-white/5 pt-8 max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/20 tracking-wider">
            &copy; 2025 Jose Canales. All rights reserved.
          </p>
          <p className="text-xs text-white/20 tracking-wider">@canales.md</p>
        </div>
      </div>
    </section>
  );
}
