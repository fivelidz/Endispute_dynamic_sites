# The Pipeline — Building Dynamic Websites with Claude

A short, practical write-up of how this 3-site project came together,
the tools used, and the workflow that makes it repeatable.

## Goal

Take a complete content brief for a real client (Endispute.com.au) and
produce **three independently shippable, animated, modern websites** in
a single working session — each with its own visual personality but all
sharing the same source-of-truth content.

## The stack we chose, and why

| Tool | Purpose | Why this and not X |
|---|---|---|
| **Next.js 15** (App Router) | React framework + static export | Industry standard. `output: 'export'` gives us pure-static HTML+JS that drops into any host (Cloudflare Pages, Netlify, Vercel, S3). Server-rendered when we want, client-rendered when we need animations. |
| **TypeScript** strict | Type-safe content & props | A typed `content.ts` shared across 3 codebases means a typo in one site is caught at build time everywhere. |
| **Tailwind CSS v4** | Styling | v4 lets us declare the design system in `@theme {}` directly in CSS — no separate `tailwind.config.ts` needed. Way faster JIT. |
| **Motion** (`motion/react`) | Animations | Formerly Framer Motion. Hybrid engine — uses Web Animations API where possible (120fps, hardware-accelerated), falls back to JS for spring physics, gestures, layout, scroll. |
| **shadcn/ui patterns** | Component primitives | We don't `npm install` shadcn; we hand-write components in shadcn's style — accessible, owned, no lock-in. |
| **lucide-react** | Icons | Tree-shakeable, consistent stroke widths, ~9KB for the icons we use. |
| **Bun** | Package manager + runtime | ~10× faster than npm for installs. Drop-in replacement. |

## The workflow

### Phase 1 — Research (5 minutes)
Read the 21st.dev landing page, Motion docs, and identify what each
tool actually does:
- **21st.dev** — public registry of curated React+Tailwind components
  (free copy-paste). Their paid "Magic" MCP server generates components
  on demand inside Cursor/Windsurf — we don't need it; we hand-build
  using the same patterns.
- **Motion / Framer Motion** — the React animation library. New name,
  new package: `npm install motion`, import from `motion/react`.
- **"UI UX Pro Max skill"** — that's a Claude/Cursor system-prompt
  pattern, not a real package. We bake the equivalent design rules
  directly into our build prompts.

### Phase 2 — Single source of truth
Before writing any UI, write `shared/content.ts` — a TypeScript module
with every piece of content as exported constants. Honour all client
requirements (no "family law", no "expert mediator", no "neutral"
applied to people, etc.) once, here, and let all three sites import it.

### Phase 3 — Three parallel sub-agents
Each of the three sites is built by a separate sub-agent in parallel.
Each agent gets:
- A full visual identity brief (palette, typography, animation
  language, feel)
- The complete file list with exact paths
- The required `package.json`, `tsconfig.json`, `next.config.ts`,
  `postcss.config.mjs` content
- Per-component requirements (props, behaviour, animation specifics)
- Strict technical requirements (TypeScript strict, `'use client'` on
  Motion components, `useReducedMotion` everywhere)

This is the multiplier — three independent designs in roughly the time
of one.

### Phase 4 — Validation
Each sub-agent runs `bun install` then `bunx tsc --noEmit` and reports
back. The orchestrator (this conversation) then runs `bun run build`
on each site to confirm a real production build succeeds.

### Phase 5 — Documentation
This file plus `ANIMATION_NOTES.md` plus the top-level `README.md`.

## Why this beats hand-writing one site at a time

| Approach | Total time | Risk |
|---|---|---|
| One site at a time, 3 sites = 3× session | ~3 hours | Inconsistent content, drifting style decisions, mid-session fatigue |
| **3 parallel sub-agents** | ~30 minutes | Each agent has tight scope; main thread orchestrates and validates |

The sub-agent pattern works because:
1. Each site is **independent** (no shared runtime code, only shared
   content data)
2. The visual brief is **opinionated and complete** before the agent
   starts writing
3. The technical contract is **explicit** (exact files, exact deps,
   exact TypeScript strictness)

## What you need to run it yourself

```bash
# 1. Have Bun installed (or swap for pnpm / npm)
curl -fsSL https://bun.sh/install | bash

# 2. Pick a site
cd Endispute_dynamic_sites/site-1-aurora
bun install
bun dev                 # http://localhost:3000

# 3. Build for production
bun run build           # outputs ./out/ (static HTML+JS)
```

## Patterns worth keeping

### `cn` helper
```ts
// src/lib/cn.ts
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

### `useReducedMotion` guard
```tsx
'use client';
import { motion, useReducedMotion } from 'motion/react';

const reduced = useReducedMotion();
const transition = reduced
  ? { duration: 0 }
  : { type: 'spring' as const, stiffness: 200, damping: 25 };
```

### Scroll-linked transform
```tsx
const { scrollYProgress } = useScroll({ target: ref });
const y = useTransform(scrollYProgress, [0, 1], [0, -200]);
return <motion.div ref={ref} style={{ y }}>...</motion.div>;
```

### Stagger children
```tsx
<motion.section
  variants={{ animate: { transition: { staggerChildren: 0.08 } } }}
  initial="initial" whileInView="animate"
  viewport={{ once: true, margin: '-80px' }}>
  {items.map(item => (
    <motion.div key={item.id} variants={cardVariant}>...</motion.div>
  ))}
</motion.section>
```

### `'use client'` boundary discipline
- Pages and layouts default to **server components** (smaller bundles,
  better SEO).
- Anything using Motion, hooks, or DOM events gets `'use client'` at
  the top of the file.
- Footer / static text? **Keep it server.**

## Honest limitations

- **No CMS yet** — content lives in TypeScript. Easy to swap to
  Sanity/Contentlayer/MDX later, but for a 3-version comparison this is
  faster.
- **No real form backend** — submit handlers show a success state and
  reset. Wire to Resend, Formspree, or a Worker when ready.
- **No tests** — for a design exploration this is fine. Add Vitest +
  Playwright if any of these go to production.
- **Reduced motion**: respected on every animation, but a couple of
  decorative effects (custom cursor, marquee) just turn off rather than
  finding a graceful equivalent. Acceptable for now.

---

*Built April 2026 with Claude Sonnet 4.5 + parallel sub-agent pattern.*
