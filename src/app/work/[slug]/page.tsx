import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getCaseStudySlugs, getProject } from "@/lib/projects";
import ArchitectureDiagram from "@/components/ArchitectureDiagram";
import { RevealWrapper } from "@/components/RevealWrapper";

type RouteParams = { slug: string };

export function generateStaticParams(): RouteParams[] {
  return getCaseStudySlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<RouteParams>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project?.caseStudy) return {};
  return {
    title: `${project.title} — Case Study | Jose Canales`,
    description: project.description,
    openGraph: {
      title: `${project.title} — Case Study`,
      description: project.description,
      type: "article",
    },
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<RouteParams>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project || !project.caseStudy) notFound();

  const { caseStudy: cs, accentColor: accent } = project;

  return (
    <main className="relative min-h-screen pb-32">
      <div
        className="absolute top-0 left-0 right-0 h-[420px] pointer-events-none"
        style={{ background: project.gradient, opacity: 0.18 }}
      />
      <div className="absolute inset-0 grain-overlay pointer-events-none" />

      <div className="relative max-w-5xl mx-auto px-6 pt-28">
        <Link
          href="/#work"
          className="inline-flex items-center gap-2 text-xs tracking-[0.3em] uppercase text-white/40 hover:text-white/80 transition-colors mb-12 min-h-[44px]"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <path d="M15 18l-6-6 6-6" />
          </svg>
          Back to Work
        </Link>

        <header className="mb-16">
          <div className="flex items-center gap-2 mb-6">
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{ backgroundColor: accent, boxShadow: `0 0 8px ${accent}` }}
            />
            <span className="text-[10px] tracking-[0.4em] uppercase text-white/45 font-medium">
              {project.category}
            </span>
          </div>
          <h1 className="font-display text-5xl md:text-7xl font-bold leading-[0.95] tracking-tight mb-5 text-white">
            {project.title}
          </h1>
          <p className="text-lg md:text-xl text-white/55 max-w-3xl leading-relaxed font-light">
            {project.description}
          </p>
        </header>

        <RevealWrapper>
        <section className="mb-20">
          <SectionHeading accent={accent} eyebrow="01 — Problem">
            The Situation
          </SectionHeading>
          <p className="text-white/65 leading-relaxed text-base md:text-lg max-w-3xl">
            {cs.problem}
          </p>
        </section>
        </RevealWrapper>

        <RevealWrapper>
        <section className="mb-20">
          <SectionHeading accent={accent} eyebrow="02 — Role">
            What I Owned
          </SectionHeading>
          <p className="text-white/65 leading-relaxed text-base md:text-lg max-w-3xl">
            {cs.role}
          </p>
        </section>
        </RevealWrapper>

        <RevealWrapper>
        <section className="mb-20">
          <SectionHeading accent={accent} eyebrow="03 — Constraints">
            The Bar
          </SectionHeading>
          <ul className="space-y-3 max-w-3xl">
            {cs.constraints.map((c) => (
              <li key={c} className="flex items-start gap-4 text-white/65 leading-relaxed">
                <span
                  className="mt-2 inline-block w-1.5 h-1.5 rounded-full flex-shrink-0"
                  style={{ backgroundColor: accent }}
                />
                <span>{c}</span>
              </li>
            ))}
          </ul>
        </section>
        </RevealWrapper>

        <RevealWrapper>
        <section className="mb-20">
          <SectionHeading accent={accent} eyebrow="04 — Architecture">
            How It Works
          </SectionHeading>
          <ArchitectureDiagram diagramId={cs.diagramId} accentColor={accent} />
        </section>
        </RevealWrapper>

        <RevealWrapper>
        <section className="mb-20">
          <SectionHeading accent={accent} eyebrow="05 — Stack">
            Engineering Choices
          </SectionHeading>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {cs.techStack.map((group) => (
              <div
                key={group.category}
                className="rounded-2xl p-6 glass"
                style={{ borderColor: "rgba(255,255,255,0.08)" }}
              >
                <p className="text-[10px] tracking-[0.3em] uppercase text-white/40 mb-4">
                  {group.category}
                </p>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className="text-[11px] tracking-wider uppercase px-3 py-1.5 rounded-full border"
                      style={{
                        color: accent,
                        borderColor: accent + "30",
                        backgroundColor: accent + "08",
                      }}
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
        </RevealWrapper>

        <RevealWrapper>
        <section className="mb-20">
          <SectionHeading accent={accent} eyebrow="06 — Outcomes">
            What Shipped
          </SectionHeading>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {cs.outcomes.map((o) => (
              <div
                key={o.label}
                className="rounded-2xl p-6 glass text-center"
                style={{ borderColor: "rgba(255,255,255,0.08)" }}
              >
                <div
                  className="text-2xl md:text-3xl font-bold mb-2 tabular-nums"
                  style={{ color: accent }}
                >
                  {o.value}
                </div>
                <p className="text-[10px] tracking-[0.25em] uppercase text-white/45">
                  {o.label}
                </p>
              </div>
            ))}
          </div>
        </section>
        </RevealWrapper>

        <div className="mt-24 border-t border-white/10 pt-10 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <Link
            href="/#work"
            className="inline-flex items-center gap-3 text-sm tracking-[0.2em] uppercase text-white/60 hover:text-white transition-colors min-h-[44px]"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <path d="M15 18l-6-6 6-6" />
            </svg>
            All Work
          </Link>
          <Link
            href="/#contact"
            className="inline-flex items-center gap-3 px-8 py-3 rounded-full border text-sm tracking-[0.2em] uppercase font-semibold transition-all min-h-[44px]"
            style={{
              borderColor: accent + "60",
              color: accent,
              backgroundColor: accent + "10",
            }}
          >
            Discuss a Project
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <path d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </Link>
        </div>
      </div>
    </main>
  );
}

function SectionHeading({
  accent,
  eyebrow,
  children,
}: {
  accent: string;
  eyebrow: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-8">
      <p
        className="text-[10px] tracking-[0.4em] uppercase mb-3 font-medium"
        style={{ color: accent }}
      >
        {eyebrow}
      </p>
      <h2 className="font-display text-3xl md:text-4xl font-bold text-white tracking-tight">
        {children}
      </h2>
    </div>
  );
}
