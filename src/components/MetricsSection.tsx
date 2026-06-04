import { RevealWrapper } from "./RevealWrapper";
import { MetricsGrid } from "./AnimatedCounter";

export default function MetricsSection() {
  return (
    <section id="metrics" className="relative py-32 md:py-40 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0B] via-[#0A0E17] to-[#0A0A0B]" />
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-500/[0.04] rounded-full blur-[150px]" />
        <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] bg-purple-500/[0.02] rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <RevealWrapper className="text-center mb-20">
          <p className="text-xs tracking-[0.4em] uppercase text-white/30 mb-4">By The Numbers</p>
          <h2 className="text-4xl md:text-6xl font-bold text-white">
            Measured <span className="text-gradient">Results</span>
          </h2>
        </RevealWrapper>

        <MetricsGrid />
      </div>
    </section>
  );
}
