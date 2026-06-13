# Animation Notes — what each site uses, and why

A reference for which Motion features power each of the three sites.
Useful when picking which one to extend, or when stealing patterns
between them.

## Site 1 — Aurora

**Personality:** warm, premium, alive but calm. A modern law firm site
that doesn't feel stuffy.

**Motion features used:**
- `useTime` + `useTransform` → drifting aurora gradient blobs in the hero
- `useScroll` + `useTransform` → parallax on the photo card
- `whileInView` with viewport `{ once: true, margin: '-80px' }` → all
  section reveals
- Stagger children pattern with `staggerChildren: 0.08` → benefits bento,
  process steps, FAQ items
- `<motion.div animate={{ width }}>` driven by intersection ratio →
  number counters that count up when scrolled into view
- AnimatePresence on FAQ accordion (height auto, exit fade)
- `useAnimationFrame` → infinite marquee strip of expertise areas
- Spring config: `{ type: 'spring', stiffness: 200, damping: 25 }`

**Best moments to demo:**
1. Watch the aurora blobs drift in the hero
2. Scroll past the benefits — bento cards rise in stagger
3. Scroll into the team section — Tania's photo parallax-zooms

---

## Site 2 — Courtroom

**Personality:** editorial, literary, gravitas. A New York Times Magazine
profile of a courtroom drama.

**Motion features used:**
- **Word-by-word kinetic typography** in the hero — each word is its own
  `<motion.span>` with `y: 60 → 0` and `opacity: 0 → 1`, staggered ~80ms
- **Cursor spotlight** — `useMotionValue` for x/y, RAF-throttled, renders
  a fixed radial gradient that follows the mouse. Disabled on touch &
  reduced motion.
- **Horizontal sticky scroll** (the star animation) on the process
  section — `useScroll({ target, offset: ['start start', 'end end'] })`
  drives `translateX` across 4 full-screen panels, ~3 viewport heights
  of vertical scroll = 100vw of horizontal motion. Falls back to
  vertical grid if reduced motion.
- **Scramble counters** in stats — animate string-to-string, randomly
  picking characters until they settle on the target value
- `<motion.div layout>` + AnimatePresence on the dispute-processes grid
  — clicking a card expands it inline with a smooth height/width
  animation
- **Marquee bands** (two rows scrolling opposite directions) using
  CSS keyframes — falls back to static when reduced motion is on
- Parallax on Tania's photo (`scale` + `y` from useScroll)
- Spring config: slower, weightier — `{ stiffness: 80, damping: 20 }`

**Best moments to demo:**
1. The hero — watch the words land one-by-one
2. **Scroll through the process section** — vertical scroll becomes
   horizontal panel-flip
3. Click any dispute-process card — it expands inline with layout anim
4. Move your mouse around dark sections — see the gold spotlight

---

## Site 3 — Mosaic

**Personality:** AI-startup polish applied to a serious law firm. Bento
grids, magnetic cursor, draggable timeline.

**Motion features used:**
- **3D tilt on bento cells** — `useMotionValue` for x/y, then
  `useTransform` to map mouse position to `rotateX` / `rotateY` (-8° to
  +8°). Each cell tilts toward the cursor.
- **Magnetic buttons** — the button's `x`/`y` move toward the cursor when
  it's within ~100px. Clamped to 10px max displacement, smoothed with
  `useSpring(stiffness: 200, damping: 20)`.
- **Custom cursor** — small circle that springs to mouse position,
  grows + morphs to a square when hovering elements with
  `data-cursor="grow"`. `mix-blend-mode: difference` for visibility
  on any background. Hidden on touch.
- **Draggable horizontal timeline** for the process section —
  `<motion.div drag="x" dragConstraints={...}>`. User drags through
  steps, springs back to nearest snap point on release.
- **Layout-animated service cards** — click to expand, AnimatePresence
  reveals description with height/opacity animation
- **Ripple-on-hover** circular photo — concentric rings expand outward
  on hover, AnimatePresence cleans them up on exit
- **Morphing chevron** on FAQ — Plus icon rotates 45° to become an X
  via `animate={{ rotate: open ? 45 : 0 }}`
- Slow parallax mesh background (`useScroll` on the page, transform on
  a fixed gradient div)
- Spring config: `{ type: 'spring', stiffness: 150, damping: 22 }`

**Best moments to demo:**
1. Hover the hero bento cells — watch them tilt toward your cursor
2. Hover any CTA — feel the magnetic pull
3. **Drag the process timeline** sideways — flick through steps
4. Click any service card — it expands inline
5. Hover Tania's portrait — concentric ripples

---

## Cross-cutting patterns (used by all 3)

### Reduced-motion respect
Every animation either:
- Wraps with `useReducedMotion()` and shortens duration to 0.001s, OR
- Disables the effect entirely (cursor, marquee, scramble), OR
- Falls back to a static equivalent (horizontal scroll → vertical grid)

### Viewport-once reveals
```tsx
viewport={{ once: true, margin: '-80px' }}
```
Animations only run the first time a section enters the viewport. No
re-animating on scroll-up — feels less manic, more deliberate.

### Stagger as the universal "ensemble" tool
```tsx
variants={{ animate: { transition: { staggerChildren: 0.08 } } }}
```
Used wherever multiple elements should enter together but not at the
exact same moment. 80ms feels deliberate, 40ms feels wired.

### Hardware-accelerated where possible
Motion uses Web Animations API for `opacity`, `transform`, `filter`
where it can. JS only for spring physics, gestures, layout. This is
what keeps these sites at 60fps even on a Pixel 6.

---

*Read the source files in each `src/components/` folder to see exactly
how each pattern is wired up.*
