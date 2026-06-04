# Jose Canales — Portfolio

Personal portfolio for Jose Canales: AI Engineer, Technical Founder, and Infrastructure Architect.

The site is intentionally compact, dark, cinematic, and proof-driven. It highlights production AI systems (SepsisAI, Quant Platform, Friday AI), self-healing infrastructure (Ultron Overwatch), and autonomous agent fleets, with case studies that include architecture diagrams, constraints, and shipped outcomes.

## Stack

- Next.js 16 (App Router) + React 19 + TypeScript (strict)
- Tailwind CSS v4 with custom CSS tokens in `src/app/globals.css`
- WebGL fragment shader hero (`HeroSection.tsx`) with a static fallback
- 2D canvas perspective grid (`DramaticSection.tsx`) paused offscreen
- Geist Sans, Geist Mono, and Oswald via `next/font/google`

No runtime dependencies beyond Next, React, and React DOM. No analytics, no third-party widgets.

## Project Layout

```
src/
  app/
    layout.tsx          Root layout: fonts, metadata
    page.tsx            Home: composed of section components
    globals.css         Tokens, gradients, animations, reduced-motion overrides
    work/[slug]/        Case study pages (SepsisAI, Quant, Friday)
  components/           Section components and shared hooks
  lib/projects.ts       Single source of truth for project + case-study data
```

Project data lives in `src/lib/projects.ts`. Both the carousel and the bento grid read from it, so descriptions, slugs, and tags stay in sync.

## Scripts

```bash
npm run dev      # local dev server
npm run lint     # eslint
npm run build    # production build
npm run start    # serve the production build
```

The codebase is set up so `npm run lint` and `npm run build` both pass cleanly on `main`.

## Accessibility & Motion

- Respects `prefers-reduced-motion`: WebGL hero falls back to a static gradient, perspective grid stops drawing, marquee gradient animations freeze, and CSS transitions collapse.
- Heavy `requestAnimationFrame` loops (WebGL hero, hero text parallax, perspective grid canvas) pause when their section is offscreen.
- Mobile menu has a 44px+ touch target, traps body scroll, closes on Escape, and exposes `aria-expanded` / `aria-controls`.
- Carousel keyboard handlers are scoped to the carousel region (no global arrow-key hijack).

## Case Studies

Three projects ship with full case-study pages and bespoke SVG architecture diagrams:

- `/work/sepsis-ai` — Healthcare AI, FDA SaMD-class
- `/work/quant-platform` — Multi-domain trading, +$193K verified PnL
- `/work/friday-ai` — Hebbian-style neural memory assistant on Claude API

Diagrams are inline SVG (`src/components/ArchitectureDiagram.tsx`), no external image assets.

## Editing Content

To change copy or add a project, edit `src/lib/projects.ts`. Adding a `caseStudy` block to a project automatically generates its `/work/[slug]` route via `generateStaticParams`.

## License

All rights reserved. The code is published for review and demonstration only.
