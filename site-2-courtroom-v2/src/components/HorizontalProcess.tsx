"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  MotionValue,
} from "motion/react";
import { processSteps } from "@/lib/content";

const PANEL_COUNT = processSteps.length; // 4

// ─── Hook: is the viewport below the desktop breakpoint? ─────────────────
// The horizontal sticky-scroll only works well on wide viewports. On phones
// and tablets it produced clipped, overlapping panels, so we render a clean
// vertical stack there instead. Defaults to `true` (mobile) so SSR/first
// paint is the safe layout, then corrects on mount.
function useIsNarrow(breakpoint = 1024) {
  const [narrow, setNarrow] = useState(true);
  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${breakpoint - 1}px)`);
    const update = () => setNarrow(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, [breakpoint]);
  return narrow;
}

// ─── Gold progress bar (always calls the hook — Rules of Hooks safe) ──────
function ProgressBar({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) {
  const width = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  return (
    <motion.div
      className="absolute bottom-0 left-0 h-[2px] bg-[#d4a14a] z-10"
      style={{ width }}
    />
  );
}

// ─── Section header (shared) ─────────────────────────────────────────────
function SectionHeader({ withHint }: { withHint?: boolean }) {
  return (
    <div className="flex items-center gap-6">
      <span
        className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#d4a14a]"
        style={{ fontFamily: "var(--font-mono)" }}
      >
        § Process
      </span>
      {withHint && (
        <span
          className="text-[10px] font-mono text-[#c8bfa8]/40 tracking-widest hidden lg:inline"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          scroll to navigate →
        </span>
      )}
    </div>
  );
}

// ─── A single horizontal panel (desktop pinned mode) ─────────────────────
// Content is ALWAYS visible — the horizontal translate provides the motion.
// (Previously panels faded in/out on scroll progress, which left blank panels
// mid-transition when the fade window and the on-screen position disagreed.)
function Panel({
  step,
  idx,
}: {
  step: (typeof processSteps)[number];
  idx: number;
}) {
  return (
    <div
      className="relative h-screen w-screen shrink-0 flex items-center overflow-hidden"
      style={{
        background: idx % 2 === 0 ? "#0a0a0a" : "#141414",
        borderRight: "1px solid #2e2e2e",
      }}
    >
      {/* Step number watermark — confined so it can't push content or overflow */}
      <div
        className="absolute top-1/2 -translate-y-1/2 right-[5vw] text-[24vh] font-light text-[#f4eedf]/[0.035] leading-none select-none pointer-events-none tabular-nums z-0"
        style={{ fontFamily: "var(--font-display)" }}
        aria-hidden="true"
      >
        {step.number}
      </div>

      {/* Content column — capped width, generous side padding, never overflows */}
      <div className="relative z-[1] w-full px-12 sm:px-20 lg:px-28 xl:px-36">
        <div className="max-w-[42rem]">
          <div className="mb-7">
            <span
              className="text-[10px] font-mono uppercase tracking-[0.3em] text-[#d4a14a] block mb-3"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              Step {step.number} / {String(PANEL_COUNT).padStart(2, "0")}
            </span>
            <div className="w-12 h-px bg-[#d4a14a]" />
          </div>

          <h2
            className="text-[clamp(1.9rem,3.4vw,3.2rem)] font-light text-[#f4eedf] mb-5 leading-[1.1]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {step.title}
          </h2>

          <p className="text-[#c8bfa8] text-base lg:text-lg mb-8 leading-relaxed">
            {step.summary}
          </p>

          <ul className="space-y-2.5">
            {step.details.map((detail, i) => (
              <li
                key={i}
                className="flex gap-4 items-start text-sm text-[#c8bfa8]/80 leading-snug"
              >
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
        </div>
      </div>

      {/* Panel index dots */}
      <div className="absolute bottom-12 right-12 lg:right-20 flex gap-2 z-[1]">
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

// ─── Vertical stacked layout (mobile + reduced-motion) ───────────────────
function VerticalProcess() {
  return (
    <section id="process" className="py-24 sm:py-28 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        <div className="border-t border-[#2e2e2e] mb-12 sm:mb-16 pt-4">
          <SectionHeader />
        </div>

        <div className="relative">
          {/* continuum rail */}
          <div
            aria-hidden="true"
            className="absolute left-0 top-2 bottom-2 w-px bg-[#d4a14a]/30 hidden sm:block"
          />
          <div className="flex flex-col gap-8 sm:gap-10 sm:pl-10">
            {processSteps.map((step, idx) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="relative border border-[#2e2e2e] bg-[#141414] p-7 sm:p-9"
              >
                {/* rail node */}
                <span
                  aria-hidden="true"
                  className="absolute -left-[10px] top-9 w-3 h-3 rounded-full bg-[#d4a14a] hidden sm:block"
                  style={{ boxShadow: "0 0 0 4px #0a0a0a", marginLeft: "-2.5rem" }}
                />
                <div className="flex items-baseline gap-4 mb-4">
                  <span
                    className="text-4xl sm:text-5xl font-light text-[#d4a14a]/40 leading-none tabular-nums"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {step.number}
                  </span>
                  <span
                    className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#d4a14a]"
                    style={{ fontFamily: "var(--font-mono)" }}
                  >
                    Step {step.number} / {String(PANEL_COUNT).padStart(2, "0")}
                  </span>
                </div>

                <h3
                  className="text-2xl sm:text-3xl font-light text-[#f4eedf] mb-3 leading-tight"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {step.title}
                </h3>
                <p className="text-[#c8bfa8] text-sm sm:text-base leading-relaxed mb-6">
                  {step.summary}
                </p>
                <ul className="space-y-2.5">
                  {step.details.map((d, i) => (
                    <li
                      key={i}
                      className="flex gap-3 text-sm text-[#c8bfa8]/80 leading-snug"
                    >
                      <span
                        className="text-[#d4a14a] shrink-0 mt-0.5 font-mono"
                        style={{ fontFamily: "var(--font-mono)" }}
                      >
                        —
                      </span>
                      {d}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Horizontal sticky-scroll layout (desktop only) ──────────────────────
function HorizontalScroll() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Map scroll 0→1 onto translateX 0 → -(100vw × (panels-1)).
  const translateX = useTransform(
    scrollYProgress,
    [0, 1],
    ["0vw", `-${(PANEL_COUNT - 1) * 100}vw`],
    { clamp: true }
  );

  return (
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
        <div className="absolute top-8 left-10 lg:left-16 z-10">
          <SectionHeader withHint />
        </div>

        {/* Gold progress bar */}
        <ProgressBar scrollYProgress={scrollYProgress} />

        {/* Horizontal strip */}
        <motion.div
          className="flex h-full"
          style={{ x: translateX, width: `${PANEL_COUNT * 100}vw` }}
        >
          {processSteps.map((step, idx) => (
            <Panel key={step.number} step={step} idx={idx} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default function HorizontalProcess() {
  const reducedMotion = useReducedMotion();
  const isNarrow = useIsNarrow(1024);

  // Vertical stack for phones/tablets and for users who prefer reduced motion.
  if (isNarrow || reducedMotion) {
    return <VerticalProcess />;
  }
  return <HorizontalScroll />;
}
