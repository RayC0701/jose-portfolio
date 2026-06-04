import { RevealWrapper } from "./RevealWrapper";

const INFRA_ITEMS = [
  {
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
      </svg>
    ),
    title: "Docker Orchestration",
    description: "17+ containers managed across multi-service stacks with automated health monitoring and zero-downtime deployments.",
    accent: "from-blue-400/20 to-cyan-400/20",
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 14.25h13.5m-13.5 0a3 3 0 01-3-3m3 3a3 3 0 100 6h13.5a3 3 0 100-6m-16.5-3a3 3 0 013-3h13.5a3 3 0 013 3m-19.5 0a4.5 4.5 0 01.9-2.7L5.737 5.1a3.375 3.375 0 012.7-1.35h7.126c1.062 0 2.062.5 2.7 1.35l2.587 3.45a4.5 4.5 0 01.9 2.7m0 0a3 3 0 01-3 3m0 3h.008v.008h-.008v-.008zm0-6h.008v.008h-.008v-.008zm-3 6h.008v.008h-.008v-.008zm0-6h.008v.008h-.008v-.008z" />
      </svg>
    ),
    title: "GPU Compute Clusters",
    description: "Dedicated inference servers running XGBoost and LightGBM model pipelines at production scale.",
    accent: "from-purple-400/20 to-pink-400/20",
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5m.75-9l3-3 2.148 2.148A12.061 12.061 0 0116.5 7.605" />
      </svg>
    ),
    title: "Real-Time Monitoring",
    description: "62 automated health checks with Prometheus metrics, Grafana dashboards, and auto-fix playbooks.",
    accent: "from-emerald-400/20 to-green-400/20",
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
    title: "Security Hardening",
    description: "33+ security fixes across healthcare AI, with HIPAA-compliant deployment pipelines.",
    accent: "from-amber-400/20 to-orange-400/20",
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 010 3.75H5.625a1.875 1.875 0 010-3.75z" />
      </svg>
    ),
    title: "CI/CD Pipelines",
    description: "Automated test suites with 2,428 passing tests across multi-repo monorepo architectures.",
    accent: "from-sky-400/20 to-blue-400/20",
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z" />
      </svg>
    ),
    title: "AI Agent Architecture",
    description: "Event-driven Signal Bus connecting 11 autonomous agents with Supabase-backed state management.",
    accent: "from-violet-400/20 to-fuchsia-400/20",
  },
];

export default function EngineeringSection() {
  return (
    <section id="engineering" className="relative py-32 md:py-40 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0B] via-[#050710] to-[#0A0A0B]" />

      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-blue-500/10 to-transparent" />
        <div className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-transparent via-purple-500/10 to-transparent" />
        <div className="absolute top-0 left-1/2 w-px h-full bg-gradient-to-b from-transparent via-white/5 to-transparent" />
      </div>

      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-blue-500/[0.03] rounded-full blur-[200px]" />
      <div className="absolute top-1/3 right-1/4 w-[300px] h-[300px] bg-purple-500/[0.02] rounded-full blur-[100px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <RevealWrapper className="text-center mb-6">
          <h2 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold text-white tracking-tight">
            Engineering
          </h2>
        </RevealWrapper>

        <RevealWrapper className="text-center mb-6" delay={150}>
          <p className="text-[10px] md:text-xs tracking-[0.4em] uppercase text-white/30 max-w-3xl mx-auto">
            Built for those who demand production-grade
          </p>
        </RevealWrapper>

        <RevealWrapper className="flex justify-center mb-20" delay={300}>
          <div
            className="h-px w-24"
            style={{
              background: "linear-gradient(90deg, transparent, rgba(59,130,246,0.3), transparent)",
            }}
          />
        </RevealWrapper>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {INFRA_ITEMS.map((item, i) => (
            <RevealWrapper key={item.title} delay={300 + i * 100}>
              <div className="group relative h-full p-8 rounded-2xl glass-engineering transition-all duration-500 hover:-translate-y-2">
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${item.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-700`} />

                <div className="absolute -bottom-px left-1/2 -translate-x-1/2 w-0 h-px group-hover:w-3/4 transition-all duration-700 bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />

                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-2/3 h-8 bg-blue-500/0 group-hover:bg-blue-500/[0.06] rounded-full blur-xl transition-all duration-700" />

                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="text-white/30 group-hover:text-blue-400 transition-colors duration-500">
                      {item.icon}
                    </div>
                    <div className="h-px flex-1 bg-gradient-to-r from-white/5 to-transparent" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-3 group-hover:text-white transition-colors">{item.title}</h3>
                  <p className="text-sm text-white/35 leading-relaxed group-hover:text-white/50 transition-colors duration-500">{item.description}</p>
                </div>
              </div>
            </RevealWrapper>
          ))}
        </div>

        <RevealWrapper className="mt-20 text-center" delay={1000}>
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full glass">
            <div className="relative">
              <div className="w-2 h-2 rounded-full bg-emerald-400" />
              <div className="absolute inset-0 w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            </div>
            <span className="text-xs tracking-[0.2em] uppercase text-white/50">
              All Systems Operational
            </span>
          </div>
        </RevealWrapper>
      </div>

      <div
        className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none"
        style={{
          background: "linear-gradient(to top, rgba(10,10,11,0.95), transparent)",
        }}
      />
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-20 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at center, rgba(59,130,246,0.04), transparent 70%)",
        }}
      />
    </section>
  );
}
