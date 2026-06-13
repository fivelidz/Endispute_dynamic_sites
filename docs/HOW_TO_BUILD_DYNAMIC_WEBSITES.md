# How to Build Dynamic Websites — The Full Pipeline

A practical, repeatable guide based on building the 3 Endispute dynamic sites.
Use this as your starting point for any new animated website project.

---

## 1. The Stack

Every project uses this same foundation. Don't change it unless you have a
specific reason.

| Layer | Tool | Install |
|---|---|---|
| Framework | **Next.js 15** (App Router) | `bunx create-next-app@latest` or scaffold manually |
| Language | **TypeScript** (strict) | always — catches bugs before runtime |
| Styling | **Tailwind CSS v4** | `bun add tailwindcss @tailwindcss/postcss` |
| Animations | **Motion** (`motion/react`) | `bun add motion` |
| Icons | **lucide-react** | `bun add lucide-react` |
| Utilities | **clsx + tailwind-merge** | `bun add clsx tailwind-merge` |
| Runtime | **Bun** | fastest installs and dev server |

### Minimum `package.json` dependencies
```json
{
  "dependencies": {
    "next": "^15.1.0",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "motion": "^12.0.0",
    "lucide-react": "^0.468.0",
    "clsx": "^2.1.1",
    "tailwind-merge": "^2.5.5"
  },
  "devDependencies": {
    "@types/node": "^22.0.0",
    "@types/react": "^19.0.0",
    "@types/react-dom": "^19.0.0",
    "@tailwindcss/postcss": "^4.0.0",
    "tailwindcss": "^4.0.0",
    "postcss": "^8.4.0",
    "typescript": "^5.7.0"
  }
}
```

### `next.config.ts` — always use static export
```ts
import type { NextConfig } from 'next';
const nextConfig: NextConfig = {
  output: 'export',        // static HTML+JS into ./out/
  images: { unoptimized: true },
  trailingSlash: true,
};
export default nextConfig;
```

### `postcss.config.mjs` — Tailwind v4
```js
export default { plugins: { '@tailwindcss/postcss': {} } };
```

### `src/lib/cn.ts` — always include this
```ts
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

---

## 2. Content First — Single Source of Truth

Before writing a single component, create `src/lib/content.ts`.

Put **everything** in it: strings, arrays, nested objects. No text should
live inside a component. This means:

- Updating copy = edit one file, all components reflect it instantly
- Multiple site variants = copy the content file across, each can diverge
- Type safety = if a component expects `string` and you pass `undefined`, TypeScript catches it

```ts
// src/lib/content.ts

export const company = {
  name: "Acme Corp",
  tagline: "Your tagline here",
  about: "Full about paragraph...",
};

export const benefits = [
  { title: "Benefit One", detail: "Explanation..." },
] as const;  // ← `as const` gives you readonly tuple types (great for arrays)
```

---

## 3. Design System in `globals.css`

Tailwind v4 uses `@theme {}` to declare all design tokens. Do this once,
then every component can reference the tokens as Tailwind utilities.

```css
@import "tailwindcss";

/* Google Fonts — load at top */
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap");

@theme {
  /* ── Colours ── */
  --color-paper:      #fafaf7;   /* page background */
  --color-ink:        #1a1a1a;   /* default text */
  --color-navy:       #0c1f3d;   /* primary dark */
  --color-terracotta: #c46442;   /* accent */
  --color-muted:      #6b7280;   /* secondary text */
  --color-border:     #e5e7eb;   /* dividers */

  /* ── Typography ── */
  --font-display: "Inter", sans-serif;
  --font-body:    "Inter", sans-serif;
  --font-mono:    "JetBrains Mono", monospace;

  /* ── Radii ── */
  --radius-card: 1.25rem;
  --radius-pill: 9999px;
}

body {
  background-color: #fafaf7;
  color: #1a1a1a;
  font-family: "Inter", sans-serif;
  overflow-x: hidden;
}
```

**Critical rule:** Do NOT set `background` in shared CSS classes (like `.card`)
if you intend to override it with Tailwind's `bg-*` utilities on individual
instances. The CSS specificity will beat Tailwind and your colour won't show.

---

## 4. Component Structure

Every page is composed from small, focused components. Follow this pattern:

```
src/
  app/
    globals.css        ← theme + base styles
    layout.tsx         ← root layout + metadata (SERVER component)
    page.tsx           ← composes all sections (SERVER component)
  components/
    Nav.tsx            ← 'use client' (has scroll listener)
    Hero.tsx           ← 'use client' (has animations)
    About.tsx          ← 'use client' (has scroll animations)
    ...
    Footer.tsx         ← no client needed (pure markup)
  lib/
    content.ts         ← all text/data
    cn.ts              ← className utility
```

### Server vs Client components

| Component type | Use `'use client'?` | Why |
|---|---|---|
| Nav, Hero, animated sections | **Yes** | Uses `useState`, `useEffect`, `useScroll`, Motion |
| Footer, static text blocks | **No** | Pure JSX, smaller bundle |
| Layout, page.tsx | **No** | Composes client components but itself is server |

---

## 5. The Animation Toolkit

### Import (always from `motion/react`, not `framer-motion`)
```tsx
import { motion, AnimatePresence, useScroll, useTransform,
         useMotionValue, useSpring, useReducedMotion, useInView } from 'motion/react';
```

### Pattern 1: Scroll-reveal (most common)
```tsx
<motion.div
  initial={{ opacity: 0, y: 24 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, margin: '-80px' }}
  transition={{ type: 'spring', stiffness: 200, damping: 25 }}
>
```
Use `once: true` — elements don't re-animate on scroll-back. Use `margin: '-80px'`
so the animation starts slightly before the element reaches the viewport edge.

### Pattern 2: Stagger children
```tsx
const container = {
  animate: { transition: { staggerChildren: 0.08 } },
};
const item = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
};

<motion.ul variants={container} initial="initial" whileInView="animate" viewport={{ once: true }}>
  {items.map(item => <motion.li variants={item} key={item.id} />)}
</motion.ul>
```

### Pattern 3: Hover effects
```tsx
<motion.div
  whileHover={{ scale: 1.03, y: -4 }}
  whileTap={{ scale: 0.97 }}
  transition={{ type: 'spring', stiffness: 300, damping: 22 }}
>
```

### Pattern 4: Scroll-linked parallax
```tsx
const ref = useRef(null);
const { scrollYProgress } = useScroll({
  target: ref,
  offset: ['start end', 'end start'],
});
const y = useTransform(scrollYProgress, [0, 1], [60, -60]);

<section ref={ref}>
  <motion.div style={{ y }}>
```

### Pattern 5: Horizontal sticky scroll
The sticky-scroll-to-horizontal trick. A tall outer container pins a
viewport-height sticky inner panel. Scroll progress drives translateX.

```tsx
// Outer: height = panels × 100vh, overflow-hidden (critical!)
<section ref={containerRef} style={{ height: `${panels * 100}vh` }} className="overflow-hidden">
  {/* Sticky inner */}
  <div className="sticky top-0 h-screen overflow-hidden">
    {/* Horizontal strip */}
    <motion.div className="flex h-full" style={{ x: translateX, width: `${panels * 100}vw` }}>
      {/* Each panel: w-screen h-screen shrink-0 */}
    </motion.div>
  </div>
</section>
```

⚠️ **Known pitfall:** Don't use `whileInView` on content inside this horizontal
strip. The IntersectionObserver fires based on rendered viewport position —
off-screen panels will never trigger. Instead, pass `scrollYProgress` down and
derive `opacity`/`y` from `useTransform` keyed to each panel's scroll range.

### Pattern 6: Exit animations (AnimatePresence)
```tsx
<AnimatePresence mode="wait">
  {isOpen && (
    <motion.div
      key="panel"
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: 'auto', opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
      transition={{ type: 'spring', stiffness: 280, damping: 30 }}
      className="overflow-hidden"
    >
```

### Pattern 7: Magnetic button
```tsx
const x = useMotionValue(0);
const y = useMotionValue(0);
const springX = useSpring(x, { stiffness: 200, damping: 20 });
const springY = useSpring(y, { stiffness: 200, damping: 20 });

const handleMouseMove = (e) => {
  const rect = ref.current.getBoundingClientRect();
  const dist = Math.hypot(e.clientX - rect.left - rect.width/2,
                          e.clientY - rect.top  - rect.height/2);
  if (dist < 100) {
    x.set((e.clientX - rect.left - rect.width/2)  * 0.3);
    y.set((e.clientY - rect.top  - rect.height/2) * 0.3);
  }
};
```

### Pattern 8: Reduced motion (always include)
```tsx
const reduced = useReducedMotion();

// Option A: skip the whole animation
if (reduced) return <div>{children}</div>;

// Option B: instant transition
const transition = reduced
  ? { duration: 0 }
  : { type: 'spring' as const, stiffness: 200, damping: 25 };
```

---

## 6. Contrast & Colour Rules (learned from debugging)

Contrast issues are the most common visual bug. Follow these rules:

### Rule 1: Never use opacity modifiers on dark backgrounds
```tsx
// ❌ BAD — text-paper/40 on navy = nearly invisible (~1.5:1 contrast)
<div className="bg-navy">
  <p className="text-paper/40">Label text</p>
</div>

// ✅ GOOD — use explicit mid-tone hex
<div className="bg-[#0c1f3d]">
  <p className="text-[#c9a87a]">Label text</p>
</div>
```

### Rule 2: Don't set background in shared CSS utility classes
```css
/* ❌ BAD — this beats Tailwind's bg-* utilities */
.card { background: white; }

/* Then in JSX: */
<div className="card bg-navy"> ← navy never shows, white wins
```

```css
/* ✅ GOOD — omit background from shared class */
.card { border-radius: 1rem; border: 1px solid rgba(0,0,0,0.08); }
/* Each instance sets its own bg: */
<div className="card bg-navy">  ← works correctly
<div className="card bg-white"> ← works correctly
```

### Rule 3: Minimum contrast ratios to target
| Use case | Min ratio | Notes |
|---|---|---|
| Body text | **4.5:1** | WCAG AA |
| Large headings (18pt+) | **3:1** | WCAG AA Large |
| UI labels / eyebrows | **3:1** | WCAG AA Large |
| Decorative / watermark text | No limit | Must be clearly non-informational |

### Rule 4: Test dark and light cards
When you have a component that renders on different background colours
(e.g. service cards with 5 different `bg-*` classes), define a colour
map per variant and use explicit hex values:

```ts
const variants = [
  { bg: 'bg-[#0c1f3d]', text: 'text-[#f0e8d8]', sub: 'text-[#c4b89a]' },
  { bg: 'bg-[#f5e8e3]', text: 'text-[#1a1a1a]', sub: 'text-[#5a4a44]' },
];
```

### Rule 5: Tailwind v4 token classes
In Tailwind v4, `text-navy` resolves from `--color-navy` in `@theme`, but
**only if Tailwind can scan the file and generate the class**. If in doubt,
use explicit hex: `text-[#0c1f3d]`. This is safe and always works.

---

## 7. Spring Physics Cheat Sheet

These settings are battle-tested. Choose based on the feel you want:

| Feel | stiffness | damping | Use for |
|---|---|---|---|
| Snappy / responsive | 300 | 25 | Hover, tap feedback, menus |
| Standard UI | 200 | 25 | Cards, scroll reveals, nav |
| Smooth / deliberate | 150 | 22 | Parallax, page transitions |
| Editorial / weighty | 80 | 20 | Word-by-word reveals, hero text |

**Never use `ease: 'linear'` for UI motion.** It looks mechanical.
Use `ease: 'easeOut'` for CSS keyframes (marquee, loaders).

---

## 8. The Parallel Sub-Agent Build Pattern

When building multiple sites (or many components), you can dramatically
speed up the process by spawning parallel sub-agents:

### How to use it
1. Write `shared/content.ts` first — the single source of truth
2. Write one detailed visual brief per site (palette, typography, animation language)
3. Spawn one sub-agent per site simultaneously
4. Each agent gets: exact file paths, exact package.json, component list, technical requirements
5. Each agent runs `bun install` + `bunx tsc --noEmit` and reports back
6. Main thread then runs `bun run build` to confirm production compile

### What makes an agent brief effective
- **Be explicit about file paths** — `src/components/Hero.tsx` not just "Hero component"
- **Be explicit about dependencies** — paste the full `package.json` dependencies block
- **Give a colour palette as hex** — don't say "dark blue", say `#0c1f3d`
- **Describe animations concretely** — not "nice animations" but "whileInView fade-up with stagger 0.08"
- **State the TypeScript rules** — strict mode, no `any`, `'use client'` on Motion components

---

## 9. Files to Create for Every New Site

Minimum set — write these first, in order:

```
1. package.json              ← deps
2. tsconfig.json             ← strict TS + @/* alias
3. next.config.ts            ← output: export
4. postcss.config.mjs        ← Tailwind v4
5. src/app/globals.css       ← @theme palette + fonts
6. src/lib/content.ts        ← ALL text/data
7. src/lib/cn.ts             ← className helper
8. src/app/layout.tsx        ← metadata, fonts, body
9. src/app/page.tsx          ← compose sections
10. src/components/Nav.tsx   ← sticky nav
11. src/components/Hero.tsx  ← hero section
12. src/components/Footer.tsx ← footer
13. ... section components
```

Run after each major block of files:
```bash
bunx tsc --noEmit   # fast type check (< 5 seconds)
bun run build       # full build check (< 20 seconds)
```

---

## 10. Running the Sites

```bash
# Dev (hot reload, no build needed)
cd site-name && bun dev --port 3001

# Production build (outputs ./out/)
cd site-name && bun run build

# Run all 3 on different ports simultaneously
cd site-1-aurora      && nohup bun dev --port 3001 > /tmp/s1.log 2>&1 &
cd site-2-courtroom   && nohup bun dev --port 3002 > /tmp/s2.log 2>&1 &
cd site-3-mosaic      && nohup bun dev --port 3003 > /tmp/s3.log 2>&1 &

# Check they're up
ss -tlnp | grep -E '3001|3002|3003'

# Kill all
kill $(lsof -ti:3001) $(lsof -ti:3002) $(lsof -ti:3003)
```

---

## 11. Deploying

Because we use `output: 'export'`, the `./out/` folder is a self-contained
static site. Deploy to:

- **Cloudflare Pages** — drag the `out/` folder in the dashboard, or `wrangler pages deploy out/`
- **Netlify** — `netlify deploy --dir out/`
- **Vercel** — it auto-detects Next.js and handles everything, even without `output: 'export'`
- **Any static host** — Apache, nginx, S3+CloudFront — just serve the `out/` directory

---

## 12. Common Bugs & Fixes

| Bug | Cause | Fix |
|---|---|---|
| `whileInView` never fires inside horizontal scroll | IntersectionObserver sees element as always off-screen | Use `useTransform` on `scrollYProgress` to drive opacity/y per panel |
| `useTransform` called inline in JSX | Rules of Hooks: can't call hooks conditionally or in render | Extract into a child component that always calls the hook |
| Background colour not showing on bento card | CSS `.bento-cell { background: white }` overrides Tailwind | Remove `background` from the shared CSS class |
| `text-navy` shows as black | Tailwind v4 class not generated (token not scanned) | Use explicit hex: `text-[#0c1f3d]` |
| Text invisible on dark bg | Low-opacity modifier e.g. `text-paper/40` on `bg-navy` | Use a purpose-designed mid-tone hex instead |
| Horizontal scrollbar appears | Off-screen panels in translateX section | Add `overflow-hidden` to the outer `<section>` |
| Dev server freezes with high CPU | `rg --follow` or `find -L` hitting symlink loop in node_modules | Always prefix long searches with `timeout 10` |
| AnimatePresence exit doesn't run | Key not set on child | Add unique `key` prop to the AnimatePresence child |
| Layout animation jumps | Parent missing `layout` prop | Add `layout` to any container whose size changes |

---

*Built April 2026 · Next.js 15 · Motion 12 · Tailwind v4 · TypeScript 5.7 · Bun 1.3*
