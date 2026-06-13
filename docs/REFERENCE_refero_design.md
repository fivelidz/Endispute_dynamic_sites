# Design Reference — refero.design (DESIGN.md examples for AI agents)

> Captured 2026-06-13 for the Endispute dynamic-sites project.
> Source: https://styles.refero.design/  — a library of 2,000+ AI-readable
> `DESIGN.md` design systems extracted from real product websites. Each entry
> gives colors, typography, spacing, component specs, do's/don'ts, surfaces,
> elevation, imagery notes, and a copy-paste **Tailwind v4 `@theme`** block +
> CSS variables. There is also a **Refero MCP** (https://refero.design/mcp)
> that plugs into Cursor / Claude Code / Windsurf so an agent can *search* the
> library before building.

## Why this matters for us

Our fable5 Endispute sites use exactly the stack refero targets: **Next.js 15 +
Tailwind v4 `@theme` + Motion + lucide**. So a refero DESIGN.md drops in almost
verbatim as the `@theme` block in `src/app/globals.css`. Use these as taste
references and as ready-made token systems when spinning up a new variant or
tightening an existing one.

### How to use a refero style in our project
1. Open a style on refero, click the **Tailwind v4** tab, **Copy.md**.
2. Paste the `@theme { … }` block into the site's `src/app/globals.css`.
3. Map our content (`shared/content.ts`) onto its component specs.
4. Keep the **Do/Don't** list visible while building — it is the guardrail that
   keeps the design coherent (single accent, no rogue shadows, pill radii, etc.).

---

## Mapping refero exemplars → our 5 sites

| Our site | Concept | Closest refero exemplar(s) |
|----------|---------|----------------------------|
| **site-5-meridian** | Dark space / constellation command-center, gold accent | **Mercury** ("Mountain Top Command Center"), Linear, Fey, Warp, Galileo |
| **site-2-verdict** | Editorial broadsheet, cream + editorial red, two-sides | **Midday** ("Editorial broadsheet on parchment"), Browserbase, Column |
| **site-4-quill** | Parchment + ink heritage, serif/mono, gold + oxblood | **Monad** ("Monospaced technical journal on cream paper"), Claude, Compound, Cohere |
| **site-3-atrium** | Light architectural / glass institutional | Inthememory ("Architectural blueprint"), Ghost, Ballpark, OpenServ |
| **site-1-ledger** | Structured ledger / management, columns | Column ("Swiss ledger"), Monad, Panxo |

---

## Exemplar 1 — Mercury (dark command-center)  → reference for MERIDIAN

**Theme:** dark. Near-black neutrals, glowing off-white text, ONE vivid accent
reserved strictly for primary CTAs. Headlines in a light-weight (360) display
face — "authority through restraint, not volume." Spacious (80px+ section gaps),
pill buttons (32–40px radius), elevation via light/color not shadow.

```css
@theme {
  --color-mercury-blue:   #5266eb; /* primary CTA ONLY */
  --color-ghost-blue:     #cdddff; /* secondary btn bg / hover */
  --color-deep-space:     #171721; /* outermost bg */
  --color-midnight-slate: #1e1e2a; /* section bg */
  --color-graphite:       #272735; /* interactive surface */
  --color-lead:           #70707d; /* borders/dividers */
  --color-starlight:      #ededf3; /* primary text */
  --color-silver:         #c3c3cc; /* secondary text */
  --text-display: 65px; --leading-display: 1.1;   /* hl weight 360 */
  --text-heading-lg: 49px; --text-heading: 32px;
}
```
**Do:** single accent for CTAs only; deep neutral bg; light font weights;
generous vertical rhythm; 1px bottom-border list items.
**Don't:** accent as text/decoration; heavy weights (>530); shadows for elevation.
Similar: Linear, Stripe, Ramp, Vercel.

---

## Exemplar 2 — Monad (cream editorial / mono+serif)  → reference for QUILL / ATRIUM

**Theme:** light. Warm **parchment cream `#f6f3f1`** canvas (never pure white),
charcoal ink, a single lavender card tint. Signature = **humanist serif at 400
weight** for headlines (never bold) + **monospace for ALL functional UI text**
(nav, buttons, tags, body). Flat & confident: 100px pill buttons, 40px-radius
cards, 1px near-black hairlines, ONE soft ambient shadow.

```css
@theme {
  --color-parchment-cream: #f6f3f1; /* canvas — never white */
  --color-ink-black:       #000000; /* text, hairline borders */
  --color-charcoal:        #242424; /* filled CTA */
  --color-graphite:        #4e4d4d; /* body text lower contrast */
  --color-warm-stone:      #797776; /* muted helper text */
  --color-lavender-mist:   #cfdaf5; /* the only tinted surface */
  --font-untitled-serif: 'Source Serif 4', Georgia, serif; /* hl wght 400 */
  --font-abc-diatype-mono: 'IBM Plex Mono', ui-monospace, monospace;
  --text-display: 80px; --leading-display: 1.2; --tracking-display: -1.6px;
  --radius-buttons: 100px; --radius-cards: 40px;
  --shadow-md: rgba(0,0,0,0.1) 0 0 10px 0;
}
```
**Do:** serif headlines at 400 only; mono for every UI label; pill buttons;
keep cream warmth at every layer; confine color to decorative illustrations.
**Don't:** bold serif headlines; proportional sans for body/nav; saturated
accents; square/4–8px radii on interactive elements; white surfaces.
Similar: Linear, Stripe, Vercel, Resend, Cursor, Claude, Compound, Cohere.

---

## General refero patterns worth internalising (apply to any site)

- **One accent, ruthlessly.** A single saturated color reserved for primary
  CTAs; everything else neutral. This is the most repeated rule across exemplars.
- **Type carries the brand.** Distinctive type pairing (light-weight display, or
  serif+mono) does more for identity than color. Restraint reads as authority.
- **Generous vertical rhythm.** 80–120px section gaps; max-width ~1200px;
  centered single-column stacks for editorial feel.
- **Elevation without heaviness.** Either no shadow (light/color shift on hover)
  or exactly one soft ambient shadow. Never stacked drop-shadows.
- **Radius is a signature.** Pick a radius language (pills 100px + cards 40px, or
  sharp 0–4px) and apply it consistently. Mixed radii read as sloppy.
- **Warm off-white > pure white** for editorial/legal trust themes.
- **Imagery is atmospheric, not decorative clutter** — one strong hero motif,
  then let type and space carry the rest.

## Other exemplars to browse by mood
- Dark command-center: Mercury, Fey, Warp, Galileo, Twingate, Axiom, Tatem
- Cream editorial: Monad, Midday, Claude, Compound, Cohere, Loops, Ditto, Coda
- Architectural/blueprint: Inthememory, OpenServ, Moving Parts, Antimetal, Sequence
- Monumental type on white: Ghost, Ballpark

---
*This file is a captured snapshot for offline reference. For live search and the
full 2,000+ library, use the site or the Refero MCP.*
