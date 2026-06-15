"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  MotionValue,
} from "motion/react";
import { processSteps } from "@/lib/content";

const PANEL_COUNT = processSteps.length; // 4

// ─── Extracted progress bar so it uses the MotionValue as a prop ──────────
// Calling useTransform inside JSX violates Rules of Hooks because the
// component renders it conditionally. Extract it into its own component
// that always receives the MotionValue and always calls the hook.
function ProgressBar({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) {
  const width = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  return (
    <motion.div
      className="absolute bottom-0 left-0 h-[2px] bg-[#d4a14a] z-10"
      style={{ width }}
    />
  );
}

// ─── Panel content always visible (no whileInView inside translated parent) ─
// whileInView relies on IntersectionObserver, which fires based on the
// element's *rendered* position in the viewport. Because the panels are
// inside a motion.div that is being translated horizontally, the panels
// beyond the first one are never "in view" — the observer sees them as
// outside the viewport the whole time and never triggers the animation.
// Fix: use animate={} with initial={} driven by a simple spring, not whileInView.
function Panel({ step, idx, scrollYProgress }: {
  step: typeof processSteps[number];
  idx: number;
  scrollYProgress: MotionValue<number>;
}) {
  // Each panel's content fades/slides in based on the scroll progress
  // reaching its own fraction of the travel. Panel 0 is visible from 0,
  // panel 1 from ~0.25, etc.
  const start = idx === 0 ? 0 : (idx - 0.4) / PANEL_COUNT;
  const end = idx === 0 ? 0.01 : (idx + 0.1) / PANEL_COUNT;

  const opacity = useTransform(
    scrollYProgress,
    [Math.max(0, start - 0.05), Math.min(1, end + 0.05)],
    [idx === 0 ? 1 : 0, 1]
  );
  const y = useTransform(
    scrollYProgress,
    [Math.max(0, start - 0.08), Math.min(1, end + 0.05)],
    [idx === 0 ? 0 : 30, 0]
  );

  return (
    <div
      className="relative h-screen w-screen flex flex-col justify-center shrink-0"
      style={{
        background: idx % 2 === 0 ? "#0a0a0a" : "#1c1c1c",
        borderRight: "1px solid #2e2e2e",
      }}
    >
      {/* Step number watermark */}
      <div
        className="absolute top-16 right-12 text-[20vw] font-light text-[#f4eedf]/[0.02] leading-none select-none pointer-events-none"
        style={{ fontFamily: "var(--font-display)" }}
        aria-hidden="true"
      >
        {step.number}
      </div>

      <motion.div
        style={{ opacity, y }}
        className="px-16 sm:px-24 max-w-3xl"
      >
        {/* Step label */}
        <div className="mb-8">
          <span
            className="text-[10px] font-mono uppercase tracking-[0.3em] text-[#d4a14a] block mb-3"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            Step {step.number}
          </span>
          <div className="w-12 h-px bg-[#d4a14a]" />
        </div>

        {/* Title */}
        <h2
          className="text-[clamp(2.2rem,5vw,4rem)] font-light text-[#f4eedf] mb-6 leading-[1.1]"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {step.title}
        </h2>

        {/* Summary */}
        <p className="text-[#c8bfa8] text-lg mb-10 leading-relaxed max-w-xl">
          {step.summary}
        </p>

        {/* Details */}
        <ul className="space-y-3">
          {step.details.map((detail, i) => (
            <li key={i} className="flex gap-4 items-start text-sm text-[#c8bfa8]/80">
              <span
                className="text-[#d4a14a] shrink-0 mt-0.5 font-mono"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                —
              </span>
              {detail}
            </li>
          ))}
        </ul>
      </motion.div>

      {/* Panel index dots */}
      <div className="absolute bottom-12 right-16 flex gap-2">
        {processSteps.map((_, dotIdx) => (
          <div
            key={dotIdx}
            className={`h-px transition-all duration-300 ${
              dotIdx === idx ? "w-8 bg-[#d4a14a]" : "w-4 bg-[#3a3a3a]"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

export default function HorizontalProcess() {
  const containerRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Map scroll 0→1 to translateX 0 → -(100vw × (panels-1)).
  //
  // The outer <section> is (PANEL_COUNT × 100vh) tall and its inner track is
  // pinned (sticky, 100vh). That gives exactly (PANEL_COUNT − 1) × 100vh of
  // scroll travel, which we map linearly onto (PANEL_COUNT − 1) × 100vw of
  // horizontal translation. `clamp` keeps the track from over-scrolling at the
  // extremes (e.g. during rubber-band / momentum scrolling).
  const translateX = useTransform(
    scrollYProgress,
    [0, 1],
    ["0vw", `-${(PANEL_COUNT - 1) * 100}vw`],
    { clamp: true }
  );

  // ─── Vertical fallback ───────────────────────────────────────────────
  if (reducedMotion) {
    return (
      <section id="process" className="py-28 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-8 sm:px-12 lg:px-16">
          <div className="border-t border-[#2e2e2e] mb-16 pt-4">
            <span
              className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#d4a14a]"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              § Process
            </span>
          </div>
          <div className="grid sm:grid-cols-2 gap-10">
            {processSteps.map((step) => (
              <div key={step.number} className="border border-[#2e2e2e] p-8">
                <div
                  className="text-6xl font-light text-[#d4a14a]/30 mb-4"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {step.number}
                </div>
                <h3
                  className="text-2xl font-medium text-[#f4eedf] mb-4"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {step.title}
                </h3>
                <p className="text-[#c8bfa8] text-sm leading-relaxed mb-6">
                  {step.summary}
                </p>
                <ul className="space-y-2">
                  {step.details.map((d, i) => (
                    <li key={i} className="flex gap-3 text-xs text-[#c8bfa8]/70">
                      <span className="text-[#d4a14a] shrink-0">—</span>
                      {d}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // ─── Horizontal sticky-scroll layout ────────────────────────────────
  return (
    // Outer container: tall enough for full scroll travel.
    // `overflow-x: clip` hides the off-screen panels' horizontal overflow
    // WITHOUT establishing a scroll container or a sticky clipping context —
    // so the inner `position: sticky` track pins to the viewport correctly and
    // releases cleanly at the end. (Plain `overflow: hidden` here can stop the
    // sticky child from releasing in some engines.)
    <section
      id="process"
      ref={containerRef}
      className="relative [overflow-x:clip]"
      style={{ height: `${PANEL_COUNT * 100}vh` }}
      aria-label="Dispute resolution process — horizontal scroll section"
    >
      {/* Sticky pinned viewport */}
      <div className="sticky top-0 h-screen overflow-hidden bg-[#0a0a0a]">

        {/* Section header */}
        <div className="absolute top-8 left-8 sm:left-16 z-10 flex items-center gap-6">
          <span
            className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#d4a14a]"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            § Process
          </span>
          <span
            className="text-[10px] font-mono text-[#c8bfa8]/40 tracking-widest hidden sm:inline"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            scroll to navigate →
          </span>
        </div>

        {/* Gold progress bar at the bottom */}
        <ProgressBar scrollYProgress={scrollYProgress} />

        {/* Horizontal strip — motion.div translate driven by scroll */}
        <motion.div
          className="flex h-full"
          style={{ x: translateX, width: `${PANEL_COUNT * 100}vw` }}
        >
          {processSteps.map((step, idx) => (
            <Panel
              key={step.number}
              step={step}
              idx={idx}
              scrollYProgress={scrollYProgress}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
