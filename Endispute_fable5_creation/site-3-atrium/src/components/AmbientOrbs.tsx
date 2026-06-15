/**
 * AmbientOrbs — GROUNDED.
 * Formerly three drifting gradient orbs (the main "too floaty" offender).
 * Now a solid, static warm-cream backdrop with a faint architectural
 * hairline column grid. No motion, no blur drift — it anchors the page.
 * No "use client" needed: this is pure markup, zero hooks.
 */
export default function AmbientOrbs() {
  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 -z-10 overflow-hidden pointer-events-none"
    >
      {/* solid warm-paper canvas */}
      <div className="absolute inset-0 bg-[#ebe9e1]" />

      {/* faint vertical hairline column rules — visible architecture */}
      <div
        className="absolute inset-0 opacity-60"
        style={{
          backgroundImage:
            "repeating-linear-gradient(to right, rgba(31,28,27,0.045) 0, rgba(31,28,27,0.045) 1px, transparent 1px, transparent 6rem)",
        }}
      />

      {/* a single, barely-there warm glow at the top to give a sheet of light */}
      <div className="absolute inset-x-0 top-0 h-80 bg-[linear-gradient(to_bottom,rgba(245,244,240,0.8)_0%,rgba(245,244,240,0)_100%)]" />
    </div>
  );
}
