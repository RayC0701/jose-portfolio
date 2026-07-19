"use client";

import { useRef, useEffect, useState, useCallback, useMemo } from "react";
import { useIntersection, useIsIntersecting } from "./useIntersection";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";

/* ─── Real system data captured from production GPU host ─── */

interface TerminalStep {
  command: string;
  output: string[];
}

const STEPS: TerminalStep[] = [
  {
    command: "ssh andraia",
    output: [
      "\x1b[32mWelcome to andraia — GPU Compute Host\x1b[0m",
      "Ubuntu 22.04.5 LTS | Kernel 6.8.0 | NVIDIA RTX A4000",
      "Uptime: 4 days, 10:17 | Load: 2.08, 2.25, 2.18",
      "Last login: Wed Jun  4 09:01:37 2026 from 100.89.x.x",
      "",
    ],
  },
  {
    command: "docker ps --format 'table {{.Names}}\\t{{.Status}}' | head -20",
    output: [
      "NAMES                    STATUS",
      "quant-engine             Up 2 days (healthy)",
      "friday                   Up 4 days (healthy)",
      "btc-dormancy-scanner     Up 4 days (healthy)",
      "it-agent-phone-service   Up 4 days (healthy)",
      "infra-n8n-1              Up 3 days (healthy)",
      "friday-neo4j             Up 4 days (healthy)",
      "quant-postgres           Up 4 days (healthy)",
      "quant-redis              Up 4 days (healthy)",
      "nvidia-gpu-exporter      Up 4 days",
      "host-stats-exporter      Up 4 days",
      "watchtower               Up 4 days (healthy)",
      "homeassistant            Up 4 days",
      "plex                     Up 4 days (healthy)",
      "gluetun                  Up 4 days (healthy)",
      "infra-postgres-1         Up 4 days (healthy)",
      "... +11 more containers",
      "",
    ],
  },
  {
    command: "ultron --status",
    output: [
      "\x1b[36m[INFO]\x1b[0m Signal pipeline healthy: 43 signals/1h, 757 signals/24h",
      "\x1b[36m[INFO]\x1b[0m Finnhub API key valid (AAPL current=$312.20)",
      "\x1b[33m[WARN]\x1b[0m Model artifact is 31 days old (retrain expected weekly)",
      "\x1b[36m[INFO]\x1b[0m Cron jobs: signal_resolver ✓ circuit_breaker ✓ pg_backup ✓",
      "\x1b[36m[INFO]\x1b[0m trading_intel_collector ✓ vault_sync_heartbeat ✓",
      "\x1b[33m[WARN]\x1b[0m 4 n8n workflow failures in last 60min (31% failure rate)",
      "",
      "\x1b[32m━━━ Ultron sweep: 60 checks — 54 ok, 4 warn, 0 crit ━━━\x1b[0m",
      "",
    ],
  },
  {
    command: "nvidia-smi --query-gpu=utilization.gpu,memory.used,memory.total,temperature.gpu --format=csv",
    output: [
      "utilization.gpu, memory.used, memory.total, temperature.gpu",
      "0 %, 2445 MiB, 16376 MiB, 34 °C",
      "",
      "\x1b[90m# GPU idle — inference runs on-demand via quant-engine\x1b[0m",
      "",
    ],
  },
  {
    command: "git log --oneline -5",
    output: [
      "\x1b[33mdd388c8\x1b[0m feat(content): publishing last-mile — trends bridge, publisher reliability",
      "\x1b[33m4402644\x1b[0m feat(quant): VolTarget idle-cash sweep (SGOV/BIL) — opt-in",
      "\x1b[33mc246aac\x1b[0m feat(quant): go-live hardening — full VolTarget gate monitors",
      "\x1b[33ma63ce9e\x1b[0m docs(quant): correct baked-vs-bind-mounted deploy reality",
      "\x1b[33m00a020f\x1b[0m fix(quant): normalize dotted tickers for yfinance (D5)",
      "",
    ],
  },
  {
    command: "cat /srv/agent-hub/logs/orchestrator.log | tail -5",
    output: [
      "[2026-06-04T13:45:01Z] [INFO] === Orchestrator cycle start ===",
      "[2026-06-04T13:45:01Z] [INFO] === Orchestrator cycle complete ===",
      "[2026-06-04T13:50:01Z] [INFO] === Orchestrator cycle start ===",
      "[2026-06-04T13:50:01Z] [INFO] === Orchestrator cycle complete ===",
      "[2026-06-04T13:55:01Z] [INFO] === Orchestrator cycle start ===",
      "[2026-06-04T13:55:01Z] [INFO] === Orchestrator cycle complete ===",
      "",
      "\x1b[90m# Agent hub: 2 completed tasks, orchestrator cycling every 5m\x1b[0m",
      "",
    ],
  },
];

/* ─── ANSI-to-JSX renderer ─── */

const ANSI_COLORS: Record<string, string> = {
  "30": "#4B5563",
  "31": "#EF4444",
  "32": "#22C55E",
  "33": "#EAB308",
  "34": "#3B82F6",
  "35": "#A855F7",
  "36": "#06B6D4",
  "37": "#E5E7EB",
  "90": "#6B7280",
};

function parseAnsi(text: string): React.ReactNode[] {
  const parts: React.ReactNode[] = [];
  const regex = /\x1b\[(\d+)m(.*?)(?=\x1b\[|$)/g;
  let lastIndex = 0;
  let match;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }
    const code = match[1];
    const content = match[2];
    if (code === "0") {
      parts.push(content);
    } else {
      parts.push(
        <span key={`${match.index}`} style={{ color: ANSI_COLORS[code] || "#E5E7EB" }}>
          {content}
        </span>
      );
    }
    lastIndex = regex.lastIndex;
  }

  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return parts.length > 0 ? parts : [text];
}

/* ─── Component ─── */

const CHAR_DELAY = 35;
const LINE_DELAY = 25;
const COMMAND_PAUSE = 600;
const STEP_PAUSE = 1200;

export default function LiveTerminal() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const termRef = useRef<HTMLDivElement>(null);
  const isInView = useIntersection(sectionRef);
  const isOnscreen = useIsIntersecting(sectionRef, "-50px");
  const reducedMotion = usePrefersReducedMotion();
  const [lines, setLines] = useState<React.ReactNode[]>([]);
  const [currentTyping, setCurrentTyping] = useState("");
  const [showCursor, setShowCursor] = useState(true);
  const cancelRef = useRef(false);

  const staticLines = useMemo(() => {
    const result: React.ReactNode[] = [];
    STEPS.forEach((step) => {
      result.push(
        <span key={`cmd-${result.length}`}>
          <span style={{ color: "#22C55E" }}>jose@andraia</span>
          <span style={{ color: "#6B7280" }}>:</span>
          <span style={{ color: "#3B82F6" }}>~</span>
          <span style={{ color: "#6B7280" }}>$ </span>
          {step.command}
        </span>
      );
      step.output.forEach((line) => {
        result.push(<span key={`out-${result.length}`}>{parseAnsi(line)}</span>);
      });
    });
    return result;
  }, []);

  const sleep = useCallback(
    (ms: number) =>
      new Promise<void>((resolve) => {
        const id = setTimeout(resolve, ms);
        const check = setInterval(() => {
          if (cancelRef.current) {
            clearTimeout(id);
            clearInterval(check);
            resolve();
          }
        }, 50);
      }),
    []
  );

  /* Auto-scroll terminal to bottom */
  useEffect(() => {
    if (termRef.current) {
      termRef.current.scrollTop = termRef.current.scrollHeight;
    }
  }, [lines, currentTyping]);

  /* Run the animation — restarts whenever section comes back into view */
  useEffect(() => {
    if (!isOnscreen || reducedMotion) return;

    cancelRef.current = false;

    async function run() {
      while (!cancelRef.current) {
        setLines([]);
        setCurrentTyping("");

        for (const step of STEPS) {
          if (cancelRef.current) return;

          /* Type the prompt + command */
          const prompt = (
            <>
              <span style={{ color: "#22C55E" }}>jose@andraia</span>
              <span style={{ color: "#6B7280" }}>:</span>
              <span style={{ color: "#3B82F6" }}>~</span>
              <span style={{ color: "#6B7280" }}>$ </span>
            </>
          );

          for (let i = 0; i <= step.command.length; i++) {
            if (cancelRef.current) return;
            setCurrentTyping(step.command.slice(0, i));
            await sleep(CHAR_DELAY);
          }

          await sleep(COMMAND_PAUSE);

          /* Move typed command into lines */
          setLines((prev) => [
            ...prev,
            <span key={`cmd-${Date.now()}`}>
              {prompt}
              {step.command}
            </span>,
          ]);
          setCurrentTyping("");

          /* Print output lines */
          for (const line of step.output) {
            if (cancelRef.current) return;
            await sleep(LINE_DELAY);
            setLines((prev) => [
              ...prev,
              <span key={`out-${Date.now()}-${Math.random()}`}>
                {parseAnsi(line)}
              </span>,
            ]);
          }

          await sleep(STEP_PAUSE);
        }

        /* Pause before loop */
        await sleep(3000);
      }
    }

    run();

    return () => {
      cancelRef.current = true;
    };
  }, [isOnscreen, reducedMotion, sleep]);

  /* Cursor blink — only while section is onscreen */
  useEffect(() => {
    if (!isOnscreen) return;
    const id = setInterval(() => setShowCursor((c) => !c), 530);
    return () => clearInterval(id);
  }, [isOnscreen]);

  const prompt = (
    <>
      <span style={{ color: "#22C55E" }}>jose@andraia</span>
      <span style={{ color: "#6B7280" }}>:</span>
      <span style={{ color: "#3B82F6" }}>~</span>
      <span style={{ color: "#6B7280" }}>$ </span>
    </>
  );

  return (
    <section
      id="under-the-hood"
      ref={sectionRef}
      className="relative py-32 md:py-40 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0B] via-[#030508] to-[#0A0A0B]" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-emerald-500/[0.02] rounded-full blur-[200px]" />

      <div className="relative z-10 max-w-5xl mx-auto px-6">
        {/* Section header */}
        <div
          className={`text-center mb-6 transition-all duration-800 ease-out ${
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
          }`}
        >
          <h2 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold text-white tracking-tight">
            Under the Hood
          </h2>
        </div>

        <div
          className={`text-center mb-6 transition-all duration-800 ease-out ${
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
          }`}
          style={{ transitionDelay: "150ms" }}
        >
          <p className="text-[10px] md:text-xs tracking-[0.4em] uppercase text-white/50 max-w-3xl mx-auto">
            Real output from production systems running right now
          </p>
        </div>

        <div
          className={`mx-auto mb-16 h-px transition-all duration-1000 ease-out origin-center ${
            isInView ? "w-24 opacity-100" : "w-0 opacity-0"
          }`}
          style={{
            transitionDelay: "300ms",
            background:
              "linear-gradient(90deg, transparent, rgba(34,197,94,0.3), transparent)",
          }}
        />

        {/* Terminal window */}
        <div
          className={`transition-all duration-1000 ease-out ${
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
          style={{ transitionDelay: "400ms" }}
        >
          <div className="relative rounded-xl overflow-hidden border border-white/[0.06] shadow-2xl shadow-black/50">
            {/* LIVE badge */}
            <div className="absolute top-3 right-4 z-20 flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
              <div className="relative">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <div className="absolute inset-0 w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              </div>
              <span className="text-[9px] tracking-[0.25em] uppercase text-emerald-400/80 font-bold">
                Live System
              </span>
            </div>

            {/* Title bar */}
            <div className="flex items-center gap-2 px-4 py-3 bg-[#1C1C1E] border-b border-white/[0.06]">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-[#FF5F57]" />
                <div className="w-3 h-3 rounded-full bg-[#FEBC2E]" />
                <div className="w-3 h-3 rounded-full bg-[#28C840]" />
              </div>
              <div className="flex-1 text-center">
                <span className="text-xs text-white/45 font-mono">
                  jose@andraia — zsh — 120×40
                </span>
              </div>
            </div>

            {/* Terminal body */}
            <div
              ref={termRef}
              className="bg-[#0D1117] p-5 md:p-6 font-mono text-[11px] md:text-[13px] leading-[1.6] text-[#C9D1D9] h-[420px] md:h-[480px] overflow-y-auto"
              style={{
                scrollbarWidth: "thin",
                scrollbarColor: "rgba(255,255,255,0.1) transparent",
              }}
            >
              {(reducedMotion ? staticLines : lines).map((line, i) => (
                <div key={i} className="min-h-[1.6em]">
                  {line}
                </div>
              ))}

              {/* Current typing line */}
              {!reducedMotion && (
                <div className="min-h-[1.6em]">
                  {prompt}
                  <span>{currentTyping}</span>
                  <span
                    className="inline-block w-[7px] h-[15px] ml-px align-middle"
                    style={{
                      background: showCursor ? "#22C55E" : "transparent",
                      transition: "background 0.1s",
                    }}
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Stats badges below terminal */}
        <div
          className={`flex flex-wrap justify-center gap-3 mt-8 transition-all duration-800 ease-out ${
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
          }`}
          style={{ transitionDelay: "600ms" }}
        >
          {[
            { label: "Containers", value: "26" },
            { label: "Uptime", value: "4d 10h" },
            { label: "Memory", value: "23/62 GB" },
            { label: "GPU VRAM", value: "2.4/16 GB" },
            { label: "Disk", value: "881G/1.8T" },
            { label: "Signals/24h", value: "757" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/[0.06] bg-white/[0.02]"
            >
              <span className="text-[10px] tracking-wider uppercase text-white/45">
                {stat.label}
              </span>
              <span className="text-[10px] font-mono text-emerald-400/70 font-bold">
                {stat.value}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none"
        style={{
          background:
            "linear-gradient(to top, rgba(10,10,11,0.95), transparent)",
        }}
      />
    </section>
  );
}
