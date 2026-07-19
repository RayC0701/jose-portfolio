import { RevealWrapper } from "./RevealWrapper";

export default function AriaDemo() {
  return (
    <RevealWrapper className="relative max-w-5xl mx-auto px-6 pb-20" margin="-100px">
      <div className="relative rounded-2xl overflow-hidden border border-white/[0.06] bg-[#0D1117]/80 backdrop-blur-xl">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-500/[0.04] to-blue-500/[0.04]" />

        <div className="relative z-10 p-8 md:p-12 flex flex-col md:flex-row items-center gap-8 md:gap-12">
          {/* Preview illustration */}
          <div className="flex-shrink-0 w-full md:w-[340px] h-[200px] md:h-[220px] rounded-xl overflow-hidden border border-white/[0.06] bg-[#0A0A0B] relative">
            {/* Simulated phone UI */}
            <div className="absolute inset-0 flex flex-col">
              <div className="flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-violet-500/20 to-blue-500/20 border-b border-white/[0.06]">
                <div className="w-6 h-6 rounded-full bg-violet-500/30 flex items-center justify-center">
                  <svg className="w-3.5 h-3.5 text-violet-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
                  </svg>
                </div>
                <span className="text-xs font-bold text-white/80 tracking-wider">ARIA IT AGENT</span>
              </div>
              <div className="flex-1 p-4 space-y-3">
                <div className="flex gap-2">
                  <div className="w-6 h-6 rounded-full bg-violet-500/20 flex-shrink-0" />
                  <div className="bg-white/[0.05] rounded-lg rounded-tl-none px-3 py-2 text-[10px] text-white/50">
                    Hi! I&apos;m Aria, your IT support agent. How can I help?
                  </div>
                </div>
                <div className="flex gap-2 justify-end">
                  <div className="bg-violet-500/20 rounded-lg rounded-tr-none px-3 py-2 text-[10px] text-white/60">
                    I can&apos;t connect to the VPN
                  </div>
                </div>
                <div className="flex gap-2">
                  <div className="w-6 h-6 rounded-full bg-violet-500/20 flex-shrink-0" />
                  <div className="bg-white/[0.05] rounded-lg rounded-tl-none px-3 py-2 text-[10px] text-white/50">
                    Let me check your VPN service status and run diagnostics...
                  </div>
                </div>
                <div className="flex items-center gap-1.5 ml-8">
                  <div className="w-1 h-1 rounded-full bg-violet-400 animate-bounce" style={{ animationDelay: "0ms" }} />
                  <div className="w-1 h-1 rounded-full bg-violet-400 animate-bounce" style={{ animationDelay: "150ms" }} />
                  <div className="w-1 h-1 rounded-full bg-violet-400 animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="flex-1 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 mb-4">
              <svg className="w-3 h-3 text-violet-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
              </svg>
              <span className="text-[9px] tracking-[0.25em] uppercase text-violet-400/80 font-bold">
                AI Agent Demo
              </span>
            </div>

            <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
              Aria — IT Support Agent
            </h3>
            <p className="text-sm text-white/60 leading-relaxed mb-6 max-w-lg">
              Voice-enabled AI agent that handles IT support calls autonomously.
              Built with a multi-agent architecture: phone service, Redis-backed state,
              and intelligent escalation — running live in Docker on the same GPU host
              you see above.
            </p>

            <div className="flex flex-wrap gap-2 justify-center md:justify-start mb-6">
              {["Twilio Voice", "Redis State", "Docker", "Multi-Agent", "RAG Pipeline"].map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 rounded-md bg-white/[0.03] border border-white/[0.06] text-[10px] text-white/50 tracking-wider"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="flex flex-wrap gap-3 justify-center md:justify-start">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/[0.06] bg-white/[0.02] text-xs text-white/50">
                <div className="relative">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <div className="absolute inset-0 w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                </div>
                Running on andraia
              </span>
              <span className="inline-flex items-center gap-1 text-[10px] text-white/45 tracking-wider">
                it-agent-phone-service &middot; it-agent-redis
              </span>
            </div>
          </div>
        </div>
      </div>
    </RevealWrapper>
  );
}
