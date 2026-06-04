export type CaseStudyOutcome = {
  label: string;
  value: string;
};

export type CaseStudyStack = {
  category: string;
  items: string[];
};

export type CaseStudy = {
  problem: string;
  role: string;
  constraints: string[];
  outcomes: CaseStudyOutcome[];
  techStack: CaseStudyStack[];
  diagramId: "sepsis" | "quant" | "friday";
};

export type Project = {
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  description: string;
  longDescription: string;
  gradient: string;
  glowColor: string;
  accentColor: string;
  icon: string;
  tags: string[];
  tech: string[];
  large: boolean;
  animDir: "left" | "right" | "bottom";
  caseStudy?: CaseStudy;
};

export const PROJECTS: Project[] = [
  {
    slug: "sepsis-ai",
    title: "SepsisAI",
    subtitle: "Healthcare AI / FDA SaMD",
    category: "Healthcare AI",
    description:
      "Real-time sepsis detection pipeline with FHIR R4 integration, XGBoost models, and 33 security hardening fixes.",
    longDescription:
      "FDA SaMD-class real-time sepsis detection. FHIR R4 ingestion, XGBoost ensemble, 33 security fixes hardened for clinical deployment.",
    gradient:
      "linear-gradient(135deg, #0f2847 0%, #1a4a7a 30%, #0e7490 70%, #164e63 100%)",
    glowColor: "rgba(14, 116, 144, 0.6)",
    accentColor: "#22d3ee",
    icon: "S",
    tags: ["XGBoost", "FHIR R4", "FDA SaMD"],
    tech: ["Python", "XGBoost", "FHIR R4", "Docker"],
    large: true,
    animDir: "left",
    caseStudy: {
      problem:
        "Sepsis kills 270,000 Americans every year and time-to-detection is the single largest predictor of mortality. Clinical EHRs surface alerts too late, generate alarm fatigue, and rarely meet the evidentiary bar required for FDA Software as a Medical Device (SaMD) classification.",
      role:
        "Lead engineer and architect. Owned data pipeline, model training, security hardening, and the FHIR R4 interoperability layer end-to-end.",
      constraints: [
        "HIPAA-compliant data handling end-to-end, including audit logs and PHI redaction",
        "FDA SaMD evidentiary standards: traceable training data, reproducible model artifacts, and a controlled release pipeline",
        "Sub-second inference budget per patient on commodity GPU infrastructure",
        "FHIR R4 native: no proprietary data formats, no flat-file shortcuts",
      ],
      outcomes: [
        { label: "Security Fixes Shipped", value: "33" },
        { label: "Inference Latency (p95)", value: "<800ms" },
        { label: "Data Standard", value: "FHIR R4" },
        { label: "Release Class", value: "SaMD-ready" },
      ],
      techStack: [
        { category: "Models", items: ["XGBoost ensemble", "Calibrated logistic baseline"] },
        { category: "Pipeline", items: ["Python", "Pandas", "Pydantic"] },
        { category: "Interop", items: ["FHIR R4", "HL7 Bundles", "OAuth2"] },
        { category: "Infrastructure", items: ["Docker", "PostgreSQL", "Audit Log Store"] },
      ],
      diagramId: "sepsis",
    },
  },
  {
    slug: "quant-platform",
    title: "Quant Platform",
    subtitle: "Multi-Domain Trading",
    category: "Trading Systems",
    description:
      "Signal-driven trading system with LightGBM models generating +$193K PnL across 2,428 passing tests.",
    longDescription:
      "Multi-domain signal platform. LightGBM feature pipelines, live order routing, +$193K verified PnL.",
    gradient:
      "linear-gradient(135deg, #052e16 0%, #14532d 30%, #a16207 70%, #422006 100%)",
    glowColor: "rgba(161, 98, 7, 0.6)",
    accentColor: "#fbbf24",
    icon: "Q",
    tags: ["LightGBM", "Signal Bus", "2,428 Tests"],
    tech: ["Python", "LightGBM", "PostgreSQL", "Redis"],
    large: true,
    animDir: "right",
    caseStudy: {
      problem:
        "Discretionary trading does not scale: signals get crowded, judgment drifts, and post-mortems live in spreadsheets. The opportunity was a single venue-agnostic platform that turns ideas into testable, versioned strategies and routes the survivors to live execution.",
      role:
        "Solo architect and engineer. Built the signal bus, the feature pipelines, the test harness, and the order-router gateway from a blank repo.",
      constraints: [
        "Every signal had to be reproducible from raw data with no manual cleanup",
        "Live order paths could never share code with backtests — only contracts",
        "Risk caps and kill switches had to be enforced server-side, not in client logic",
        "The test suite had to be the source of truth before any live capital touched the venue",
      ],
      outcomes: [
        { label: "Verified PnL", value: "+$193K" },
        { label: "Tests Passing", value: "2,428" },
        { label: "Live Markets", value: "Multi-Domain" },
        { label: "Manual Interventions", value: "0 in production" },
      ],
      techStack: [
        { category: "Models", items: ["LightGBM", "Feature pipelines", "Walk-forward CV"] },
        { category: "Data", items: ["PostgreSQL", "Redis", "Parquet snapshots"] },
        { category: "Execution", items: ["Order Router", "Risk Engine", "Kill Switch"] },
        { category: "Quality", items: ["2,428 tests", "Backtest harness", "Live shadow mode"] },
      ],
      diagramId: "quant",
    },
  },
  {
    slug: "friday-ai",
    title: "Friday AI + Brain",
    subtitle: "Neural Memory Assistant",
    category: "AI Assistant",
    description:
      "Personal AI with Hebbian learning-inspired memory architecture powered by Claude API.",
    longDescription:
      "Neural memory system with Hebbian-inspired learning and Claude API integration.",
    gradient:
      "linear-gradient(135deg, #2e1065 0%, #4c1d95 30%, #7c3aed 70%, #581c87 100%)",
    glowColor: "rgba(124, 58, 237, 0.6)",
    accentColor: "#a78bfa",
    icon: "F",
    tags: ["Claude API", "Hebbian", "RAG"],
    tech: ["TypeScript", "Claude API", "Supabase"],
    large: false,
    animDir: "bottom",
    caseStudy: {
      problem:
        "Off-the-shelf LLM chat loses everything between sessions. The result is a brilliant amnesiac. The goal of Friday was a personal assistant whose memory consolidates over time and whose recall actually reflects what matters, not just what was said most recently.",
      role:
        "Sole designer and builder. Drove the memory model, the embedding store, the Claude tool layer, and the front-end surface.",
      constraints: [
        "Memory writes had to be cheap and incremental — no batch reindexing",
        "Recall had to prefer recently-reinforced concepts (Hebbian-style) without drowning out long-term facts",
        "Every tool call needed to be auditable and reversible",
        "Local-first by default: nothing leaves the device without an explicit handshake",
      ],
      outcomes: [
        { label: "Memory Model", value: "Hebbian-inspired" },
        { label: "Model Surface", value: "Claude API" },
        { label: "Retrieval", value: "Hybrid RAG" },
        { label: "Session Persistence", value: "Persistent" },
      ],
      techStack: [
        { category: "Intelligence", items: ["Claude API", "Tool use", "Structured outputs"] },
        { category: "Memory", items: ["Embeddings store", "Hebbian reinforcement", "Decay schedule"] },
        { category: "Stack", items: ["TypeScript", "Supabase", "Edge functions"] },
        { category: "Surfaces", items: ["Web UI", "CLI", "Background daemon"] },
      ],
      diagramId: "friday",
    },
  },
  {
    slug: "ultron-overwatch",
    title: "Ultron Overwatch",
    subtitle: "Self-Healing Infrastructure",
    category: "Infrastructure",
    description:
      "Autonomous monitoring with 62 health checks and auto-fix playbooks for zero-touch remediation.",
    longDescription:
      "Self-healing monitoring with 62 checks and automated remediation playbooks.",
    gradient:
      "linear-gradient(135deg, #431407 0%, #9a3412 30%, #dc2626 70%, #7f1d1d 100%)",
    glowColor: "rgba(220, 38, 38, 0.5)",
    accentColor: "#fb923c",
    icon: "U",
    tags: ["62 Checks", "Auto-Fix", "Docker"],
    tech: ["Go", "Docker", "Prometheus", "Grafana"],
    large: false,
    animDir: "left",
  },
  {
    slug: "ai-agent-teams",
    title: "AI Agent Teams",
    subtitle: "Autonomous Agent Fleet",
    category: "Multi-Agent Systems",
    description:
      "11 specialized agents coordinating via Supabase CRM and event-driven Signal Bus architecture.",
    longDescription:
      "11 autonomous agents coordinating via event-driven Signal Bus and Supabase CRM.",
    gradient:
      "linear-gradient(135deg, #042f2e 0%, #115e59 30%, #0891b2 70%, #155e75 100%)",
    glowColor: "rgba(8, 145, 178, 0.6)",
    accentColor: "#2dd4bf",
    icon: "A",
    tags: ["11 Agents", "Supabase", "Event Bus"],
    tech: ["TypeScript", "Supabase", "OpenAI", "Claude"],
    large: false,
    animDir: "right",
  },
  {
    slug: "texas-rank-rent",
    title: "Texas Rank & Rent",
    subtitle: "Lead-Gen Network",
    category: "Lead Generation",
    description:
      "270-site lead generation network built with Next.js and Turborepo monorepo architecture.",
    longDescription:
      "270-site lead-gen network on a single Turborepo, with shared design tokens and a per-vertical content layer.",
    gradient:
      "linear-gradient(135deg, #451a03 0%, #78350f 30%, #d97706 70%, #92400e 100%)",
    glowColor: "rgba(217, 119, 6, 0.5)",
    accentColor: "#fcd34d",
    icon: "T",
    tags: ["Next.js", "Turborepo", "270 Sites"],
    tech: ["Next.js", "Turborepo", "Vercel", "Markdown"],
    large: false,
    animDir: "bottom",
  },
];

export function getProject(slug: string): Project | undefined {
  return PROJECTS.find((p) => p.slug === slug);
}

export function getCaseStudySlugs(): string[] {
  return PROJECTS.filter((p) => p.caseStudy).map((p) => p.slug);
}
