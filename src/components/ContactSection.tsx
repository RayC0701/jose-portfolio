import { RevealWrapper } from "./RevealWrapper";
import MagneticButton from "./MagneticButton";

const ENGAGEMENT_MODELS = [
  {
    title: "Technical Advisory",
    description: "Architecture reviews, tech stack decisions, and strategic technical guidance for your team.",
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    num: "01",
  },
  {
    title: "Hands-On Build",
    description: "End-to-end development of production AI systems, from proof of concept to deployment.",
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
      </svg>
    ),
    num: "02",
  },
  {
    title: "Fractional CTO",
    description: "Embedded technical leadership for startups and scale-ups navigating complex engineering challenges.",
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      </svg>
    ),
    num: "03",
  },
];

const SOCIAL_LINKS = [
  {
    label: "GitHub",
    href: "https://github.com/RayC0701",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/josecanales",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: "Email",
    href: "mailto:jcanales07@gmail.com",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
      </svg>
    ),
  },
];

export default function ContactSection() {
  return (
    <section id="contact" className="relative py-32 md:py-40">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0B] via-[#06060A] to-[#040406]" />

      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-blue-500/[0.02] rounded-full blur-[150px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <RevealWrapper className="text-center mb-20">
          <p className="text-xs tracking-[0.4em] uppercase text-white/30 mb-4">Engagement</p>
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Let&apos;s Build <span className="text-gradient">Together</span>
          </h2>
          <p className="text-lg text-white/40 max-w-2xl mx-auto font-light">
            Whether you need a technical co-founder, a production AI system, or an architecture that scales.
          </p>
        </RevealWrapper>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-20">
          {ENGAGEMENT_MODELS.map((model, i) => (
            <RevealWrapper key={model.title} delay={i * 120}>
              <div className="relative h-full p-8 rounded-2xl glass hover:border-white/15 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_60px_-10px_rgba(0,0,0,0.5)] group">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-white/[0.03] group-hover:bg-blue-500/10 text-white/30 group-hover:text-blue-400 transition-all duration-500">
                      {model.icon}
                    </div>
                    <span className="text-4xl font-bold text-white/[0.04] group-hover:text-blue-500/10 transition-colors duration-500">
                      {model.num}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{model.title}</h3>
                  <p className="text-sm text-white/40 leading-relaxed group-hover:text-white/50 transition-colors duration-500">{model.description}</p>
                </div>
              </div>
            </RevealWrapper>
          ))}
        </div>

        <RevealWrapper className="text-center" delay={500}>
          <MagneticButton>
          <a
            href="https://cal.com/josecanales/ai-consulting"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center gap-3 px-12 py-5 rounded-full cta-gradient-border text-white font-bold text-sm tracking-[0.2em] uppercase transition-all duration-500 hover:shadow-[0_0_50px_rgba(59,130,246,0.15)]"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <rect x="3" y="4" width="18" height="18" rx="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
            <span>Book a Discovery Call</span>
            <svg
              className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </a>
          </MagneticButton>

          <div className="mt-16 flex flex-wrap items-center justify-center gap-3 sm:gap-6">
            {SOCIAL_LINKS.map((link) => {
              const isMail = link.href.startsWith("mailto:");
              return (
                <a
                  key={link.label}
                  href={link.href}
                  target={isMail ? undefined : "_blank"}
                  rel={isMail ? undefined : "noopener noreferrer"}
                  className="group/social flex items-center gap-2.5 px-4 py-2.5 rounded-full border border-white/5 hover:border-white/15 text-white/30 hover:text-white/70 transition-all duration-300 hover:bg-white/[0.03] min-h-[44px]"
                >
                  <span className="transition-colors duration-300">{link.icon}</span>
                  <span className="text-xs tracking-[0.15em] uppercase">{link.label}</span>
                </a>
              );
            })}
          </div>
        </RevealWrapper>
      </div>

      <div className="relative z-10 mt-32 border-t border-white/5 pt-8 max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/20 tracking-wider">
            &copy; {new Date().getFullYear()} Jose Canales. All rights reserved.
          </p>
          <p className="text-xs text-white/20 tracking-wider">
            Designed &amp; engineered by <span className="text-white/30">@canales.md</span>
          </p>
        </div>
      </div>
    </section>
  );
}
