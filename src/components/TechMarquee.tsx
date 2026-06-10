import { PROJECTS } from "@/lib/projects";

const TECH = Array.from(new Set(PROJECTS.flatMap((p) => [...p.tech, ...p.tags])));

function MarqueeList({ hidden }: { hidden?: boolean }) {
  return (
    <ul className="flex items-center gap-10 pr-10" aria-hidden={hidden || undefined}>
      {TECH.map((item) => (
        <li key={item} className="flex items-center gap-10">
          <span className="text-xs tracking-[0.3em] uppercase text-white/25 whitespace-nowrap">
            {item}
          </span>
          <span className="w-1 h-1 rounded-full bg-blue-500/40" aria-hidden="true" />
        </li>
      ))}
    </ul>
  );
}

export default function TechMarquee() {
  return (
    <section
      aria-label="Technology stack"
      className="relative py-8 overflow-hidden border-y border-white/[0.04]"
    >
      <div className="absolute inset-y-0 left-0 w-24 md:w-40 z-10 bg-gradient-to-r from-[#0A0A0B] to-transparent pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-24 md:w-40 z-10 bg-gradient-to-l from-[#0A0A0B] to-transparent pointer-events-none" />

      <div className="marquee">
        <div className="marquee-track flex w-max">
          <MarqueeList />
          <MarqueeList hidden />
        </div>
      </div>
    </section>
  );
}
