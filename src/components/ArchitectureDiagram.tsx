import type { CaseStudy } from "@/lib/projects";

type Props = {
  diagramId: CaseStudy["diagramId"];
  accentColor: string;
};

export default function ArchitectureDiagram({ diagramId, accentColor }: Props) {
  if (diagramId === "sepsis") return <SepsisDiagram accentColor={accentColor} />;
  if (diagramId === "quant") return <QuantDiagram accentColor={accentColor} />;
  if (diagramId === "ultron") return <UltronDiagram accentColor={accentColor} />;
  if (diagramId === "agents") return <AgentsDiagram accentColor={accentColor} />;
  return <FridayDiagram accentColor={accentColor} />;
}

function Box({
  x,
  y,
  w,
  h,
  label,
  sub,
  accent,
  highlight,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  label: string;
  sub?: string;
  accent: string;
  highlight?: boolean;
}) {
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        rx={10}
        fill="rgba(17,17,19,0.85)"
        stroke={highlight ? accent : "rgba(255,255,255,0.12)"}
        strokeWidth={highlight ? 1.5 : 1}
      />
      <text
        x={x + w / 2}
        y={sub ? y + h / 2 - 4 : y + h / 2 + 4}
        textAnchor="middle"
        fill="rgba(255,255,255,0.92)"
        fontSize={13}
        fontWeight={600}
        fontFamily="var(--font-geist-sans), system-ui"
      >
        {label}
      </text>
      {sub && (
        <text
          x={x + w / 2}
          y={y + h / 2 + 13}
          textAnchor="middle"
          fill="rgba(255,255,255,0.62)"
          fontSize={10}
          letterSpacing={1.5}
          fontFamily="var(--font-geist-mono), monospace"
        >
          {sub.toUpperCase()}
        </text>
      )}
    </g>
  );
}

function Arrow({
  x1,
  y1,
  x2,
  y2,
  accent,
  label,
  dashed,
}: {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  accent: string;
  label?: string;
  dashed?: boolean;
}) {
  const midX = (x1 + x2) / 2;
  const midY = (y1 + y2) / 2;
  return (
    <g>
      <line
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        stroke={accent}
        strokeWidth={1.2}
        strokeOpacity={0.6}
        strokeDasharray={dashed ? "4 4" : undefined}
        markerEnd="url(#arrow)"
      />
      {label && (
        <text
          x={midX}
          y={midY - 6}
          textAnchor="middle"
          fill="rgba(255,255,255,0.55)"
          fontSize={9}
          letterSpacing={1.2}
          fontFamily="var(--font-geist-mono), monospace"
        >
          {label.toUpperCase()}
        </text>
      )}
    </g>
  );
}

function Defs({ accent }: { accent: string }) {
  return (
    <defs>
      <marker
        id="arrow"
        viewBox="0 0 10 10"
        refX="8"
        refY="5"
        markerWidth="6"
        markerHeight="6"
        orient="auto-start-reverse"
      >
        <path d="M0,0 L10,5 L0,10 z" fill={accent} fillOpacity={0.75} />
      </marker>
      <linearGradient id="diagram-bg" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="rgba(255,255,255,0.02)" />
        <stop offset="100%" stopColor="rgba(0,0,0,0)" />
      </linearGradient>
    </defs>
  );
}

function Frame({ children, accent }: { children: React.ReactNode; accent: string }) {
  return (
    <div
      className="relative w-full overflow-x-auto rounded-2xl border"
      style={{
        background: "rgba(10,10,11,0.6)",
        borderColor: "rgba(255,255,255,0.08)",
      }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at center, ${accent}10, transparent 70%)`,
        }}
      />
      <div className="relative min-w-[600px]">{children}</div>
    </div>
  );
}

function SepsisDiagram({ accentColor }: { accentColor: string }) {
  const a = accentColor;
  return (
    <Frame accent={a}>
      <svg viewBox="0 0 760 420" className="w-full h-auto" role="img" aria-label="SepsisAI architecture diagram">
        <Defs accent={a} />
        <rect x="0" y="0" width="760" height="420" fill="url(#diagram-bg)" />

        <Box x={30} y={40} w={150} h={60} label="EHR Source" sub="Hospital HL7" accent={a} />
        <Box x={30} y={130} w={150} h={60} label="HL7 → FHIR R4" sub="Bundle Adapter" accent={a} />
        <Box x={30} y={220} w={150} h={60} label="PHI Redactor" sub="Audit Logged" accent={a} />

        <Box x={240} y={130} w={170} h={60} label="Feature Store" sub="Pydantic Contracts" accent={a} highlight />
        <Box x={240} y={40} w={170} h={60} label="Streaming Buffer" sub="Per-Patient Window" accent={a} />
        <Box x={240} y={220} w={170} h={60} label="Vital Signal Joiner" sub="Bedside Telemetry" accent={a} />

        <Box x={460} y={40} w={170} h={60} label="XGBoost Ensemble" sub="Primary Model" accent={a} highlight />
        <Box x={460} y={130} w={170} h={60} label="Calibration Layer" sub="Platt Scaling" accent={a} />
        <Box x={460} y={220} w={170} h={60} label="Threshold Policy" sub="Clinical Rules" accent={a} />

        <Box x={655} y={130} w={90} h={150} label="Alert" sub="<800ms p95" accent={a} highlight />

        <Box x={240} y={320} w={390} h={60} label="Audit + Reproducibility Log" sub="SaMD Evidence" accent={a} />

        <Arrow x1={180} y1={70} x2={240} y2={70} accent={a} />
        <Arrow x1={180} y1={160} x2={240} y2={160} accent={a} />
        <Arrow x1={180} y1={250} x2={240} y2={250} accent={a} />
        <Arrow x1={410} y1={70} x2={460} y2={70} accent={a} label="features" />
        <Arrow x1={410} y1={160} x2={460} y2={160} accent={a} />
        <Arrow x1={410} y1={250} x2={460} y2={250} accent={a} />
        <Arrow x1={630} y1={130} x2={655} y2={170} accent={a} />
        <Arrow x1={630} y1={160} x2={655} y2={200} accent={a} />
        <Arrow x1={630} y1={250} x2={655} y2={230} accent={a} />
        <Arrow x1={325} y1={280} x2={325} y2={320} accent={a} dashed />
        <Arrow x1={545} y1={280} x2={545} y2={320} accent={a} dashed label="trace" />
      </svg>
    </Frame>
  );
}

function QuantDiagram({ accentColor }: { accentColor: string }) {
  const a = accentColor;
  return (
    <Frame accent={a}>
      <svg viewBox="0 0 760 420" className="w-full h-auto" role="img" aria-label="Quant Platform architecture diagram">
        <Defs accent={a} />
        <rect x="0" y="0" width="760" height="420" fill="url(#diagram-bg)" />

        <Box x={30} y={40} w={140} h={56} label="Market Data" sub="Tick + Book" accent={a} />
        <Box x={30} y={120} w={140} h={56} label="Alt Data" sub="On-chain + Macro" accent={a} />
        <Box x={30} y={200} w={140} h={56} label="Reference" sub="Symbols, Calendars" accent={a} />

        <Box x={210} y={40} w={170} h={56} label="Feature Pipeline" sub="Walk-Forward CV" accent={a} highlight />
        <Box x={210} y={120} w={170} h={56} label="LightGBM Models" sub="Per-Domain" accent={a} highlight />
        <Box x={210} y={200} w={170} h={56} label="Signal Store" sub="Versioned" accent={a} />

        <Box x={420} y={40} w={150} h={56} label="Backtest Harness" sub="2,428 Tests" accent={a} highlight />
        <Box x={420} y={120} w={150} h={56} label="Live Shadow" sub="Side-by-Side" accent={a} />
        <Box x={420} y={200} w={150} h={56} label="Risk Engine" sub="Server-Side Caps" accent={a} highlight />

        <Box x={605} y={40} w={130} h={56} label="Strategy Mux" sub="Promote on Pass" accent={a} />
        <Box x={605} y={120} w={130} h={56} label="Order Router" sub="Multi-Venue" accent={a} highlight />
        <Box x={605} y={200} w={130} h={56} label="Kill Switch" sub="Trip on Drift" accent={a} />

        <Box x={210} y={300} w={360} h={70} label="+$193K Verified PnL" sub="Reproducible from raw data" accent={a} highlight />

        <Arrow x1={170} y1={68} x2={210} y2={68} accent={a} />
        <Arrow x1={170} y1={148} x2={210} y2={148} accent={a} />
        <Arrow x1={170} y1={228} x2={210} y2={228} accent={a} />
        <Arrow x1={380} y1={68} x2={420} y2={68} accent={a} label="contract" />
        <Arrow x1={380} y1={148} x2={420} y2={148} accent={a} />
        <Arrow x1={380} y1={228} x2={420} y2={228} accent={a} />
        <Arrow x1={570} y1={68} x2={605} y2={68} accent={a} />
        <Arrow x1={570} y1={148} x2={605} y2={148} accent={a} />
        <Arrow x1={570} y1={228} x2={605} y2={228} accent={a} />
        <Arrow x1={670} y1={176} x2={670} y2={200} accent={a} dashed label="kill" />
        <Arrow x1={390} y1={256} x2={390} y2={300} accent={a} dashed />
      </svg>
    </Frame>
  );
}

function FridayDiagram({ accentColor }: { accentColor: string }) {
  const a = accentColor;
  return (
    <Frame accent={a}>
      <svg viewBox="0 0 760 420" className="w-full h-auto" role="img" aria-label="Friday AI architecture diagram">
        <Defs accent={a} />
        <rect x="0" y="0" width="760" height="420" fill="url(#diagram-bg)" />

        <Box x={30} y={40} w={140} h={60} label="Web UI" sub="Chat Surface" accent={a} />
        <Box x={30} y={130} w={140} h={60} label="CLI" sub="Local Daemon" accent={a} />
        <Box x={30} y={220} w={140} h={60} label="Background" sub="Watchers" accent={a} />

        <Box x={210} y={130} w={170} h={60} label="Friday Core" sub="Tool Router" accent={a} highlight />

        <Box x={420} y={40} w={150} h={60} label="Claude API" sub="Tool Use" accent={a} highlight />
        <Box x={420} y={130} w={150} h={60} label="Embedding Store" sub="Hybrid RAG" accent={a} />
        <Box x={420} y={220} w={150} h={60} label="Hebbian Memory" sub="Reinforcement" accent={a} highlight />
        <Box x={420} y={310} w={150} h={60} label="Decay Scheduler" sub="Forget Curve" accent={a} />

        <Box x={605} y={130} w={130} h={60} label="Supabase" sub="Source of Truth" accent={a} />
        <Box x={605} y={220} w={130} h={60} label="Audit Log" sub="Reversible Ops" accent={a} />

        <Arrow x1={170} y1={70} x2={210} y2={150} accent={a} />
        <Arrow x1={170} y1={160} x2={210} y2={160} accent={a} />
        <Arrow x1={170} y1={250} x2={210} y2={170} accent={a} />

        <Arrow x1={380} y1={150} x2={420} y2={70} accent={a} label="prompt" />
        <Arrow x1={380} y1={160} x2={420} y2={160} accent={a} label="recall" />
        <Arrow x1={380} y1={170} x2={420} y2={250} accent={a} label="write" />

        <Arrow x1={570} y1={160} x2={605} y2={160} accent={a} />
        <Arrow x1={570} y1={250} x2={605} y2={250} accent={a} />
        <Arrow x1={495} y1={280} x2={495} y2={310} accent={a} dashed label="decay" />
        <Arrow x1={495} y1={70} x2={495} y2={130} accent={a} dashed />
      </svg>
    </Frame>
  );
}

function UltronDiagram({ accentColor }: { accentColor: string }) {
  const a = accentColor;
  return (
    <Frame accent={a}>
      <svg viewBox="0 0 760 420" className="w-full h-auto" role="img" aria-label="Ultron Overwatch architecture diagram">
        <Defs accent={a} />
        <rect x="0" y="0" width="760" height="420" fill="url(#diagram-bg)" />

        <Box x={30} y={40} w={140} h={56} label="Cron Trigger" sub="Every 5 min" accent={a} />
        <Box x={30} y={130} w={140} h={56} label="CLI Entry" sub="ultron --sweep" accent={a} />

        <Box x={210} y={40} w={160} h={56} label="Docker Checks" sub="Container Health" accent={a} highlight />
        <Box x={210} y={120} w={160} h={56} label="GPU Checks" sub="NVIDIA SMI" accent={a} />
        <Box x={210} y={200} w={160} h={56} label="DB Checks" sub="PG + Redis" accent={a} />
        <Box x={210} y={280} w={160} h={56} label="Cron Checks" sub="Schedule Verify" accent={a} />

        <Box x={420} y={40} w={150} h={56} label="Check Runner" sub="62 Probes" accent={a} highlight />
        <Box x={420} y={130} w={150} h={56} label="Result Classifier" sub="OK / Warn / Crit" accent={a} />
        <Box x={420} y={220} w={150} h={56} label="Auto-Fix Engine" sub="14 Playbooks" accent={a} highlight />

        <Box x={610} y={40} w={130} h={56} label="Prometheus" sub="Metrics Export" accent={a} />
        <Box x={610} y={130} w={130} h={56} label="Alertmanager" sub="Notification" accent={a} />
        <Box x={610} y={220} w={130} h={56} label="Grafana" sub="Dashboard" accent={a} />

        <Box x={420} y={320} w={320} h={60} label="Systemd Watchdog" sub="Self-Monitoring" accent={a} />

        <Arrow x1={170} y1={68} x2={210} y2={68} accent={a} />
        <Arrow x1={170} y1={158} x2={210} y2={148} accent={a} />
        <Arrow x1={370} y1={68} x2={420} y2={68} accent={a} />
        <Arrow x1={370} y1={148} x2={420} y2={68} accent={a} />
        <Arrow x1={370} y1={228} x2={420} y2={68} accent={a} />
        <Arrow x1={370} y1={308} x2={420} y2={68} accent={a} />
        <Arrow x1={570} y1={68} x2={610} y2={68} accent={a} label="metrics" />
        <Arrow x1={570} y1={158} x2={610} y2={158} accent={a} label="alerts" />
        <Arrow x1={420} y1={158} x2={420} y2={220} accent={a} />
        <Arrow x1={675} y1={96} x2={675} y2={130} accent={a} />
        <Arrow x1={675} y1={186} x2={675} y2={220} accent={a} />
        <Arrow x1={570} y1={248} x2={580} y2={320} accent={a} dashed label="restart" />
      </svg>
    </Frame>
  );
}

function AgentsDiagram({ accentColor }: { accentColor: string }) {
  const a = accentColor;
  return (
    <Frame accent={a}>
      <svg viewBox="0 0 760 420" className="w-full h-auto" role="img" aria-label="AI Agent Teams architecture diagram">
        <Defs accent={a} />
        <rect x="0" y="0" width="760" height="420" fill="url(#diagram-bg)" />

        <Box x={30} y={40} w={140} h={56} label="Content Agent" sub="Research + Draft" accent={a} />
        <Box x={30} y={120} w={140} h={56} label="Outreach Agent" sub="Email Sequences" accent={a} />
        <Box x={30} y={200} w={140} h={56} label="Analytics Agent" sub="Metrics + Reports" accent={a} />
        <Box x={30} y={280} w={140} h={56} label="8 More Agents" sub="Domain-Specific" accent={a} />

        <Box x={220} y={130} w={160} h={60} label="Signal Bus" sub="Event-Driven" accent={a} highlight />
        <Box x={220} y={40} w={160} h={56} label="Token Enforcer" sub="Budget per Cycle" accent={a} />
        <Box x={220} y={280} w={160} h={56} label="Cron Scheduler" sub="5 min Cycles" accent={a} />

        <Box x={430} y={40} w={150} h={56} label="Orchestrator" sub="Dispatch + Route" accent={a} highlight />
        <Box x={430} y={130} w={150} h={56} label="Claude API" sub="Structured Output" accent={a} highlight />
        <Box x={430} y={220} w={150} h={56} label="OpenAI API" sub="Embeddings" accent={a} />

        <Box x={620} y={40} w={120} h={56} label="Supabase" sub="CRM + State" accent={a} highlight />
        <Box x={620} y={130} w={120} h={56} label="Realtime Sub" sub="Change Feed" accent={a} />
        <Box x={620} y={220} w={120} h={56} label="n8n Workflows" sub="Integrations" accent={a} />

        <Box x={220} y={360} w={390} h={40} label="~750 signals/day · 99.9% uptime · <5 min avg cycle" accent={a} highlight />

        <Arrow x1={170} y1={68} x2={220} y2={155} accent={a} />
        <Arrow x1={170} y1={148} x2={220} y2={160} accent={a} />
        <Arrow x1={170} y1={228} x2={220} y2={165} accent={a} />
        <Arrow x1={170} y1={308} x2={220} y2={170} accent={a} />
        <Arrow x1={380} y1={155} x2={430} y2={68} accent={a} label="dispatch" />
        <Arrow x1={380} y1={160} x2={430} y2={158} accent={a} />
        <Arrow x1={380} y1={165} x2={430} y2={248} accent={a} />
        <Arrow x1={580} y1={68} x2={620} y2={68} accent={a} />
        <Arrow x1={580} y1={158} x2={620} y2={158} accent={a} />
        <Arrow x1={580} y1={248} x2={620} y2={248} accent={a} />
        <Arrow x1={300} y1={190} x2={300} y2={280} accent={a} dashed />
        <Arrow x1={300} y1={130} x2={300} y2={96} accent={a} dashed label="cap" />
        <Arrow x1={415} y1={336} x2={415} y2={360} accent={a} dashed />
      </svg>
    </Frame>
  );
}
