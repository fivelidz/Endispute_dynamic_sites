'use client';

/**
 * CustomCursor — DISABLED.
 *
 * The previous implementation caused janky cursor lag: it ran a React-state
 * `useSpring` chain plus a `document.querySelector(':hover')` DOM walk on EVERY
 * mousemove, and rendered a large `mix-blend-difference` element over the whole
 * page (a known compositor-thrashing pattern). Rather than ship a custom cursor
 * at all, we restore the native cursor (smooth, zero JS cost) and rely on cheap
 * CSS hover micro-interactions (.hover-lift, .btn-primary) for feedback.
 *
 * Kept as a no-op component so the import in page.tsx stays valid and the source
 * is preserved per project conventions.
 */
export default function CustomCursor() {
  return null;
}
