# Endispute — Dynamic Website Concepts

Production-grade website design concepts for **[Endispute.com.au](https://endispute.com.au)**,
a dispute resolution, advisory & management practice.

Every concept is a **fully built, animated Next.js site** — not a flat mockup —
and **all of them share one content source of truth**, so the wording stays
identical and only the design personality changes.

> ### 🔗 Review every site live, side by side
> ## **[qalarc.com/projects/demos/endispute-sites](https://qalarc.com/projects/demos/endispute-sites/)**
>
> One shareable gallery page that links to all eight live, interactive designs.
> Also listed on the portfolio at **[qalarc.com/projects](https://qalarc.com/projects/)**.

---

## The eight concepts

Two rounds of exploration. Round 1 established three broad directions; Round 2
refined into five tighter, more editorial concepts.

### Round 1 — the first three

| Site | Personality | Signature interactions | Live |
|---|---|---|---|
| **Aurora** | Warm, premium, alive but calm — a modern firm that isn't stuffy | Drifting aurora gradient hero, scroll-orchestrated reveals, count-up stats, infinite marquee | [↗](https://qalarc.com/projects/demos/endispute-sites/aurora/) |
| **Courtroom** | Editorial, literary, gravitas — an NYT-Magazine profile of a courtroom drama | Word-by-word kinetic headlines, gold cursor spotlight, **sticky horizontal-scroll** process section, scramble counters | [↗](https://qalarc.com/projects/demos/endispute-sites/courtroom/) |
| **Mosaic** | AI-startup polish on a serious firm | 3D-tilt bento cells, magnetic buttons, blend-mode custom cursor, **draggable** horizontal timeline | [↗](https://qalarc.com/projects/demos/endispute-sites/mosaic/) |

### Round 2 — the refined five

| Site | Voice / metaphor | Live |
|---|---|---|
| **Ledger** | *"End Your Dispute."* — an archival, indexed case-file layout (numbered sections 00–08, coordinate markers, monospace accents) | [↗](https://qalarc.com/projects/demos/endispute-sites/ledger/) |
| **Verdict** | *"Two sides. One resolution."* — a split-screen duality hero resolving into the structured space between two parties | [↗](https://qalarc.com/projects/demos/endispute-sites/verdict/) |
| **Atrium** | *"Resolve with clarity."* — light, open, architectural; airy spacing emphasising clarity and preserving relationships | [↗](https://qalarc.com/projects/demos/endispute-sites/atrium/) |
| **Quill** | *"In the matter of your dispute… let it be resolved."* — the most formal voice, serif gravitas, legal-document phrasing | [↗](https://qalarc.com/projects/demos/endispute-sites/quill/) |
| **Meridian** | *"From conflict to resolution."* — a directional, journey-driven layout, CTA-forward with the phone number front and centre | [↗](https://qalarc.com/projects/demos/endispute-sites/meridian/) |

---

## The stack

| Layer | Tool | Why |
|---|---|---|
| Framework | **Next.js 15** (App Router) | static-export friendly, SSR-ready, best DX |
| Language | **TypeScript** | type-safe content schema reused across every site |
| Styling | **Tailwind CSS v4** | utility-first, inline arbitrary values, JIT |
| Animation | **Motion** (Framer Motion) `motion/react` | spring physics, gestures, scroll, layout animations |
| Components | **shadcn/ui** patterns + 21st.dev community patterns | hand-tuned, copy-owned, accessible primitives |
| Icons | **lucide-react** | clean, consistent, tree-shakeable |
| Runtime | **Bun** | fast install + dev server |

---

## Repository layout

```
Endispute_dynamic_sites/
├── shared/
│   └── content.ts                     ← single source of truth (Round 1 sites)
├── site-1-aurora/                     ← Round 1 · warm modern firm
├── site-2-courtroom/                  ← Round 1 · editorial / kinetic
├── site-3-mosaic/                     ← Round 1 · bento + magnetic cursor
│
├── Endispute_fable5_creation/         ← Round 2 (the refined five)
│   ├── shared/content.ts              ← shared content for Round 2
│   ├── site-1-ledger/
│   ├── site-2-verdict/
│   ├── site-3-atrium/
│   ├── site-4-quill/
│   └── site-5-meridian/
│
├── docs/
│   ├── PIPELINE.md                    ← how the pipeline is built
│   ├── ANIMATION_NOTES.md             ← which Motion features each site uses + why
│   ├── HOW_TO_BUILD_DYNAMIC_WEBSITES.md
│   └── REFERENCE_refero_design.md
│
└── archive/                           ← timestamped backups (never deleted)
```

Each `site-*` folder is an **independent Next.js app** with its own
`package.json` — clone any one out and ship it standalone.

---

## One content source of truth

The defining architectural choice: every site imports its copy from a shared
`content.ts`. Edit the words **once** and the change propagates across every
design — the only thing that differs between sites is the visual and motion
language. This makes it trivial to keep all concepts in sync while a client is
still choosing a direction.

---

## Run a site locally

```bash
cd site-1-aurora            # or any other site folder
bun install
bun dev                     # http://localhost:3000
```

## Build a static export

```bash
cd site-1-aurora
bun run build               # next build with output: 'export'
# Static HTML+JS lands in ./out/ — drop into any static host
```

---

## Deploying to the qalarc.com review gallery

The built `out/` folders are copied into
`qalarc.ai/projects/demos/endispute-sites/<slug>/` and served under a subpath.
Because Next.js static exports use absolute asset paths (`/_next/...`), a
deploy script rewrites those references to the subpath so each site is
self-contained:

- Script: `qalarc.ai/projects/scripts/deploy_endispute_sites.py`
- It is idempotent (a sentinel guard prevents double-prefixing) and re-runnable.

After rebuilding any site, re-run the deploy script and push `qalarc.ai`.

---

## Client content rules (honoured across all eight builds)

- ❌ No "family law" anywhere
- ❌ No "expert mediator" phrasing
- ❌ No use of "neutral" applied to people
- ✅ Original site language reused
- ✅ Focus on dispute management & resolution services
- ✅ Assessment, registration, follow-up emphasised
- ✅ Phone: `+61 2 8006 0425` everywhere
- ✅ Andrew Rogers in-memoriam, Tania as principal

---

## Accessibility & motion

Every animation either respects `prefers-reduced-motion` (shortening or
disabling the effect) or falls back to a static equivalent (e.g. the
horizontal-scroll process section becomes a vertical grid). Focus-visible
rings and AA-minimum contrast throughout. See `docs/ANIMATION_NOTES.md` for the
per-site breakdown.

---

*Built April–June 2026.*
