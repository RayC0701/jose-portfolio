# Portfolio Code Review and UX Audit

Date: 2026-06-04  
Project: `jose-portfolio`  
Framework: Next.js 16.2.7, React 19.2.4, Tailwind CSS 4

## Audit Scope

I reviewed every project-authored file in the repository: app routes, all components, global CSS, config files, README, AGENTS/CLAUDE instructions, package manifest and lockfile, public assets, `.gitignore`, and `.claude/launch.json`. I treated `node_modules` and `.next` as dependency/generated output, except I read the relevant local Next.js docs in `node_modules/next/dist/docs/` per `AGENTS.md`, including App Router, accessibility, and the Next 16 upgrade notes.

Verification:

- `npx tsc --noEmit`: passes.
- `npm run lint`: fails with 2 React lint errors.
- `npm run build`: blocked before compilation by an existing `.next/dev/lock`. Next 16 docs confirm a new lockfile mechanism prevents multiple `next dev` or `next build` instances on the same project. The lock points to `localhost:3001`, but that port was not reachable from this sandbox. I did not remove generated `.next` state during this review-only task.

## Executive Summary

This is a visually ambitious, compact portfolio with a strong first impression: dark cinematic styling, a WebGL hero, animated project cards, metrics, and a clear AI/infrastructure positioning. The problem is that the implementation and content currently read more like a polished prototype than a senior, proof-driven portfolio. The site has no real case-study pages, no project visuals, no proof links, no customized public assets, failing lint, and several always-running animation loops.

The current site can make someone pause briefly, especially on the hero. It is not yet at the level where a hiring manager or client would stop scrolling and feel confident. It sells intensity, but not enough evidence.

Overall grade: **C+**

---

## 1. Code Quality

Grade: **C+**

What works well:

- `src/app/page.tsx` is simple and readable. The section order is easy to understand.
- `src/app/layout.tsx` uses `next/font/google` correctly for Geist, Geist Mono, and Oswald, and has basic metadata.
- TypeScript strict mode is enabled in `tsconfig.json`, and `npx tsc --noEmit` passes.
- `src/components/useIntersection.ts` is a small, focused hook with cleanup.
- The project is intentionally dependency-light: only Next, React, React DOM, Tailwind, ESLint, and TypeScript.

What needs improvement:

- Lint currently fails. `src/components/Navbar.tsx:18-22` calls `setMounted(true)` synchronously in an effect, and `src/components/DramaticSection.tsx:126-128` mirrors `isInView` into `revealed` through another synchronous state update.
- Almost every major section is a client component. `ProjectGrid`, `EngineeringSection`, `ContactSection`, and most static content could be server-rendered with small client wrappers for reveal behavior.
- `useIntersection` is duplicated inside `src/components/ProjectCarousel.tsx:5-18` and `src/components/ProjectGrid.tsx:5-18` even though `src/components/useIntersection.ts` exists.
- Project data is duplicated between `ProjectCarousel.tsx:20-87` and `ProjectGrid.tsx:20-87`, with inconsistencies such as `Texas Rank & Rent` in the carousel versus `Roblox Portfolio` in the grid. This is a content integrity risk.
- There is no central typed content model. Components own both data and presentation, which will make case-study pages, filtering, external links, or CMS migration harder.
- Inline style blocks and magic numbers are everywhere: card transforms in `ProjectCarousel.tsx:130-160`, hover styles in `ProjectGrid.tsx:121-129`, large background effects in multiple sections, and hard-coded color strings throughout.
- Many interactive-looking elements are inert. `View Case Study` is a `<button>` with no handler in `ProjectCarousel.tsx:214-226` and `ProjectGrid.tsx:216-228`.
- `next.config.ts` is still a placeholder. There is no intentional image policy, security headers, bundle analysis toggle, or other production hardening.
- `README.md` is still the create-next-app default and even points to `app/page.tsx` instead of `src/app/page.tsx`.

Highest-impact priority fix:

Extract a typed `projects` content module, reuse the shared `useIntersection` hook, convert static sections back to server components where possible, and fix the lint failures. This would immediately improve maintainability, consistency, and build confidence.

---

## 2. Visual Design

Grade: **B-**

What works well:

- The overall direction is coherent: black background, glass panels, glow accents, large display typography, and cinematic spacing.
- `HeroSection.tsx` has the strongest visual moment. The WebGL background plus word reveal gives the page an immediate identity.
- `ProjectCarousel.tsx` creates a credible 3D-gallery impression without bringing in a heavy library.
- `MetricsSection.tsx` has good information hierarchy and uses tabular numeric emphasis effectively.
- The use of `next/font` in `layout.tsx` is a good baseline for typography performance and consistency.

What needs improvement:

- It still reads like an AI portfolio template more than an award-level bespoke site. The visual language relies heavily on blue/purple gradients, blurred blobs, glass cards, glow borders, and all-caps microcopy.
- There are no real project images, product screenshots, 3D models, diagrams, videos, or artifacts. The cards use gradient headers and single-letter icons (`ProjectCarousel.tsx:163-176`), which weakens the luxury/product-gallery ambition.
- The typography system is not disciplined enough. Geist + Oswald is workable, but `EngineeringSection.tsx:92` introduces inline Georgia, which feels disconnected from the rest of the system.
- The palette is overly familiar: dark base plus blue, cyan, purple, amber. It is attractive, but not distinctive enough for an Awwwards-level nomination.
- Border radii are consistently large (`rounded-2xl`, `rounded-full`). That creates a SaaS dashboard feel rather than Lamborghini-style editorial luxury.
- Default scaffold assets remain in `public/` (`next.svg`, `vercel.svg`, etc.) and the default favicon is still present in `src/app/favicon.ico`.
- The Open Graph metadata in `layout.tsx:21-30` has no image, URL, or richer social preview, so the brand does not extend outside the page.

Highest-impact priority fix:

Replace gradient placeholders with a bespoke visual asset system: real project screenshots, cinematic mockups, 3D card renders, technical diagrams, and a custom favicon/OG image. The site needs ownable imagery, not just atmospheric styling.

---

## 3. Animation and Interaction

Grade: **C**

What works well:

- The hero shader is technically interesting and intentionally capped at `devicePixelRatio <= 1.5` in `HeroSection.tsx:126-130`.
- Intersection-triggered reveals are simple and clean in the shared hook.
- The carousel supports pointer drag, arrow buttons, dots, and keyboard navigation.
- The word reveal, light sweep, and count-up moments have a clear intent rather than being random motion.

What needs improvement:

- There is no `prefers-reduced-motion` handling. Global animations in `globals.css:47-78`, `globals.css:184-194`, and `globals.css:220-289` always run.
- The hero has two perpetual `requestAnimationFrame` loops: one WebGL render loop in `HeroSection.tsx:141-152`, and one DOM text parallax loop in `HeroSection.tsx:197-205`. They run even when the user scrolls past the hero.
- `DramaticSection.tsx:25-108` runs a CPU-heavy 2D canvas loop across a grid of points and lines for the full lifetime of the section component, not just while visible.
- `ProjectCarousel.tsx:114-120` calls `setTilt` on every mouse move over the center card, causing React re-renders during pointer motion. This should be a ref-driven transform or animation library value.
- `ProjectCarousel.tsx:279-286` installs global arrow-key handlers regardless of focus or whether the carousel is in view. That can hijack page-level keyboard behavior.
- Pointer capture uses `(e.target as HTMLElement).setPointerCapture(e.pointerId)` in `ProjectCarousel.tsx:256-261`. If the pointerdown starts on an inner child, capture is applied to that child rather than the intended track.
- No focus management exists for the mobile menu in `Navbar.tsx:79-91`. There is no Escape close behavior and no focus trap.
- The inactive card blur in `ProjectCarousel.tsx:138` and repeated backdrop blurs across cards are visually expensive.
- Shader compile/link failures silently return in `HeroSection.tsx:87-103`; there is no fallback visual or diagnostics.

Highest-impact priority fix:

Add a motion runtime policy: respect `prefers-reduced-motion`, pause canvases when offscreen or hidden, move pointer-follow transforms out of React state, and scope keyboard handlers to focused/in-view interactive regions.

---

## 4. Performance

Grade: **C**

What works well:

- The dependency graph is small. `package-lock.json` confirms only 3 runtime dependencies and 432 packages total after dev tooling.
- `next/font` avoids layout-shifting external font requests.
- There are no oversized image assets today.
- The hero shader makes a reasonable DPR tradeoff instead of blindly rendering at full device pixel ratio.

What needs improvement:

- Client JavaScript is larger than it needs to be because every section is a client component. Much of the page is static content.
- Animation work continues when offscreen. The WebGL hero, DOM parallax, and 2D perspective grid are the largest risks for battery and main-thread time.
- Heavy CSS effects are stacked: animated grain overlays, blur filters, `backdrop-filter`, box shadows, gradient text animations, and conic gradient borders.
- Build verification is currently blocked by `.next/dev/lock`, and lint fails. A site cannot be considered production-ready until these are clean.
- There is no bundle analysis script, no Lighthouse/Playwright/performance budget setup, and no automated regression check for animation jank.
- There is no image optimization story because there are no meaningful images yet. When real assets are added, the site will need `next/image`, responsive sizes, preload strategy, and image policy in `next.config.ts`.
- `MetricsSection.tsx:93-113` updates React state every animation frame for each counter. Six counters is manageable, but it is still unnecessary React work.

Highest-impact priority fix:

Server-render static sections, dynamically load or lazy-hydrate canvas-heavy sections, and pause all animation loops outside the viewport. Then add a build/lint/Lighthouse check as the baseline quality gate.

---

## 5. Responsive

Grade: **C**

What works well:

- The main section grids collapse to one column on small screens.
- The nav has a mobile menu path.
- The hero type uses responsive sizes, and the content generally has mobile padding.
- Metrics switch from 2 columns to 3 columns, which is a sensible pattern.

What needs improvement:

- The carousel is not truly mobile-designed. Cards are fixed at `360px` wide in `ProjectCarousel.tsx:136`, with `translateX = offset * 390` in `ProjectCarousel.tsx:109`. On small screens this risks clipping, awkward centering, and hidden context.
- The mobile menu button is `w-8 h-8` in `Navbar.tsx:60-63`, below the common 44px touch-target baseline.
- The mobile overlay in `Navbar.tsx:79-91` does not lock body scroll, trap focus, provide Escape behavior, or expose an expanded state through `aria-expanded`.
- Social links in `ContactSection.tsx:146-160` are a single flex row with no wrapping classes. On narrow screens, GitHub + LinkedIn + Email can crowd or overflow.
- Several interactions are hover-first. Project card affordances, glow states, and arrow cues do not translate meaningfully to touch.
- Very large display blocks such as `DramaticSection.tsx:155` can become fragile on small screens, especially with long words like `BATTLE-TESTED`.
- CTA and social links use heavy tracking. On mobile, letter spacing plus uppercase reduces legibility.

Highest-impact priority fix:

Design a real mobile carousel/list experience with fluid card widths, 44px controls, visible swipe affordances, focus-safe navigation, and a non-hover way to open case studies.

---

## 6. Content and Copy

Grade: **B-**

What works well:

- The positioning is clear: AI engineer, technical founder, infrastructure architect.
- Specific metrics such as `+$193K`, `2,428 tests`, `62 checks`, `11 agents`, and `12+ production systems` are more compelling than generic "I build apps" language.
- The project categories are commercially relevant: healthcare AI, trading systems, infrastructure, multi-agent systems, lead generation.
- The engagement models in `ContactSection.tsx:6-38` make it clear how someone could hire Jose.

What needs improvement:

- The claims lack proof. There are no case-study pages, screenshots, GitHub links per project, demos, architecture diagrams, customer context, testimonials, or quantified before/after narratives.
- Some claims are high-stakes and need grounding. Healthcare AI, FDA SaMD, HIPAA, PnL, and zero downtime are credible only if backed by detail.
- The hero copy is intense, but generic: "Where deep tech meets relentless execution" and "production-grade AI systems that ship, scale, and survive" sound polished but could describe many AI consultants.
- "View Case Study" appears repeatedly but does nothing, which is a trust hit.
- Footer copyright says 2025 in `ContactSection.tsx:167-169`; the current date is 2026-06-04.
- The README is still default create-next-app copy, so the repository itself does not reinforce the portfolio story.
- There is no "about" section, personal narrative, role history, constraints solved, or explanation of how Jose works.

Highest-impact priority fix:

Create real case studies. Each project should have a page or expandable panel with problem, constraints, architecture, shipped outcome, proof links, screenshots/diagrams, and what Jose personally did.

---

## 7. Versus Reference Direction

Grade: **C-**

Reference target: luxury brand sites, Lamborghini-style dark cinematic aesthetic, 3D card galleries, dramatic scroll reveals.

What works well:

- The site understands some surface traits of the reference: dark atmosphere, strong contrast, slow reveal pacing, 3D-ish card arrangement, and dramatic section breaks.
- `HeroSection.tsx` and `ProjectCarousel.tsx` are the closest pieces to the reference ambition.
- The site avoids looking like a plain developer resume.

What needs improvement:

- Luxury automotive sites are built around real objects: product photography, materials, macro detail, cinematic cuts, motion direction, and restraint. This site has gradients, glow cards, and letters.
- The carousel is mathematically 3D but not visually premium yet. It needs actual artifacts inside the cards: product UI, code/infra diagrams, rendered device frames, or interactive 3D scenes.
- The scroll story is not choreographed. Sections reveal independently, but there is no narrative progression, pinned sequence, or transformation that builds drama.
- The palette is closer to generic AI/SaaS than Lamborghini. The current blue/purple gradients dilute the luxury reference.
- The copy is loud where the reference would be precise. Premium sites often use fewer words, stronger imagery, and more confidence in pacing.

Highest-impact priority fix:

Build one signature section: a cinematic case-study gallery where each project has a real visual artifact, depth/parallax, editorial typography, and a scroll-led reveal. Nail one unforgettable moment before adding more decorative effects.

---

## Top 5 Changes To Make This Genuinely Impressive

1. **Add proof-driven case studies.** Replace inert `View Case Study` buttons with real pages or panels that include architecture diagrams, screenshots, demos, repo links where possible, exact role, constraints, and measurable outcomes.

2. **Create a bespoke visual system.** Replace default assets and gradient placeholders with custom project imagery, 3D mockups, technical diagrams, OG image, favicon, and a stricter color/type system.

3. **Fix motion and performance architecture.** Add reduced-motion support, pause RAF loops offscreen, lazy-load heavy canvas/WebGL work, move pointer transforms out of React state, and remove global keyboard hijacking.

4. **Clean the codebase structure.** Centralize typed project/content data, remove duplicated hooks and duplicated project arrays, convert static sections to server components, and clear lint/build blockers.

5. **Rework mobile and accessibility.** Build a mobile-native project browsing pattern, improve touch targets, add focus management and Escape behavior to the menu, ensure social links wrap, and make every interactive element keyboard/touch meaningful.

## Honest Hiring/Client Assessment

Would this make someone stop scrolling? **Briefly, yes.** The hero and dark cinematic direction are enough to catch attention.

Would it make a serious hiring manager or potential client feel convinced? **Not yet.** The site currently creates curiosity but does not close the credibility gap. The missing evidence is the main issue: no real case studies, no visuals from the work, no proof links, no technical deep dives, and failing lint. The strongest next move is not more glow or more animation. It is making the work undeniable.

## File-Level Notes

- `src/app/page.tsx`: Clean section composition, but it imports a fully client-heavy page.
- `src/app/layout.tsx`: Good font setup and baseline metadata; needs richer OG metadata, custom image, and possibly `metadataBase`.
- `src/app/globals.css`: Good start on tokens and cinematic utilities; too many always-on animations, no reduced-motion policy, and several unused keyframes/classes (`float`, `pulse-glow`, `count-up`, `accent-line-expand`, `card-glow-pulse`, `reflection`, `card-shine`, `scrollbar-hide`).
- `src/components/Navbar.tsx`: Functional nav, but lint failure, small mobile tap target, no focus trap, no Escape handling, no `aria-expanded`.
- `src/components/HeroSection.tsx`: Strongest brand moment; needs shader fallback, offscreen pause, reduced-motion support, and fewer simultaneous RAF loops.
- `src/components/ProjectCarousel.tsx`: Good ambition; needs shared data, mobile redesign, real links, focus-scoped keyboard handling, and non-React pointer animation.
- `src/components/ProjectGrid.tsx`: Useful bento layout; duplicates hook/data and uses inert case-study buttons.
- `src/components/DramaticSection.tsx`: Strong typographic break; expensive canvas loop and lint failure from derived reveal state.
- `src/components/MetricsSection.tsx`: Compelling metrics; should avoid per-frame React updates where possible and needs proof/context for claims.
- `src/components/EngineeringSection.tsx`: Clear capability grid; inline Georgia breaks the type system and cards feel generic without evidence.
- `src/components/ContactSection.tsx`: Clear engagement paths and CTA; `mailto` is opened with `target="_blank"` through the shared social link mapping, footer year is stale, and social row should wrap on mobile.
- `src/components/useIntersection.ts`: Good shared hook; should be the only implementation.
- `next.config.ts`: Placeholder only.
- `eslint.config.mjs`: Good use of Next core-vitals and TypeScript config; currently surfaces real issues.
- `tsconfig.json`: Strict mode is good; `allowJs` is unnecessary for this all-TS project unless planned.
- `package.json`: Clean dependency set; missing scripts for typecheck, format, test, and analyze.
- `package-lock.json`: Parsed for dependency graph; no unexpected runtime packages.
- `README.md`: Still default scaffold copy; should be replaced with project-specific setup, architecture, and quality commands.
- `AGENTS.md` / `CLAUDE.md`: Clear local instruction to read Next docs; `CLAUDE.md` only delegates.
- `.gitignore`: Standard and appropriate.
- `.claude/launch.json`: Untracked local dev config for `npx next dev`; fine locally, but decide whether it belongs in source control.
- `public/*.svg`: Default create-next-app assets, apparently unused. Replace or delete.
- `src/app/favicon.ico`: Default scaffold favicon. Replace with Jose-specific branding.
