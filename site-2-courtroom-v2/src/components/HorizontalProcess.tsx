"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  useMotionValueEvent,
} from "motion/react";
import { processSteps } from "@/lib/content";

const STEP_COUNT = processSteps.length; // 4

// ─── Hook: is the viewport below the desktop breakpoint? ─────────────────
// The sticky split-view reads best on wide viewports. On phones and tablets we
// render a clean vertical sequence instead. Defaults to `true` (mobile) so the
// SSR / first paint is the safe layout, then corrects on mount.
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

// ─── Section header (shared) ─────────────────────────────────────────────
function SectionHeader({ subtitle }: { subtitle?: string }) {
  return (
    <div className="flex items-center gap-6 flex-wrap">
      <span
        className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#d4a14a]"
        style={{ fontFamily: "var(--font-mono)" }}
      >
        § Process
      </span>
      {subtitle && (
        <span
          className="text-[10px] font-mono text-[#c8bfa8]/40 tracking-widest"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          {subtitle}
        </span>
      )}
    </div>
  );
}

// ─── Vertical stacked layout (mobile + reduced-motion) ───────────────────
function VerticalProcess() {
  return (
    <section id="process" className="py-24 sm:py-28 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        <div className="border-t border-[#2e2e2e] mb-12 sm:mb-16 pt-4">
          <SectionHeader subtitle="01 — 04" />
        </div>

        <div className="relative">
          <div
            aria-hidden="true"
            className="absolute left-0 top-2 bottom-2 w-px bg-[#d4a14a]/30 hidden sm:block"
          />
          <div className="flex flex-col gap-8 sm:gap-10 sm:pl-10">
            {processSteps.map((step) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="relative border border-[#2e2e2e] bg-[#141414] p-7 sm:p-9"
              >
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
                    Step {step.number} / {String(STEP_COUNT).padStart(2, "0")}
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

// ─── Desktop: compact sticky split-view ──────────────────────────────────
// A single contained section (~200vh of scroll, not 400vh of full-screen
// slabs). A sticky left index with a self-drawing progress spine tracks the
// active step; the right column cross-fades / slides between step details as
// you scroll. Stays inside the page's editorial column — it never takes the
// whole screen hostage, so the site keeps flowing.
function StickyProcess() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Spine fill height tracks scroll progress.
  const spineScale = useTransform(scrollYProgress, [0.02, 0.95], [0, 1], {
    clamp: true,
  });

  // Derive the active step from scroll progress (with a little lead-in so the
  // first step is active immediately and the last lingers).
  useMotionValueEvent(scrollYProgress, "change", (p) => {
    const idx = Math.min(
      STEP_COUNT - 1,
      Math.max(0, Math.floor(p * STEP_COUNT - 0.0001 + 0.15))
    );
    setActive((prev) => (prev === idx ? prev : idx));
  });

  const step = processSteps[active];

  return (
    <section
      id="process"
      ref={containerRef}
      className="relative bg-[#0a0a0a]"
      style={{ height: `${STEP_COUNT * 62}vh` }} // ~248vh for 4 steps — far less dominant than 400vh
      aria-label="Dispute resolution process"
    >
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        <div className="w-full max-w-7xl mx-auto px-8 sm:px-12 lg:px-16">
          <div className="border-t border-[#2e2e2e] pt-4 mb-10 lg:mb-14">
            <SectionHeader subtitle="how a matter moves" />
          </div>

          <div className="grid lg:grid-cols-[20rem_1fr] gap-10 lg:gap-20 items-start">
            {/* ── Left: sticky index with progress spine ── */}
            <div className="relative">
              {/* track */}
              <div
                aria-hidden="true"
                className="absolute left-[6px] top-3 bottom-3 w-px bg-[#2e2e2e]"
              />
              {/* fill */}
              <motion.div
                aria-hidden="true"
                className="absolute left-[6px] top-3 w-px bg-[#d4a14a] origin-top"
                style={{ bottom: 12, scaleY: spineScale }}
              />

              <ul className="flex flex-col gap-6 lg:gap-8 pl-8">
                {processSteps.map((s, i) => {
                  const isActive = i === active;
                  const isDone = i < active;
                  return (
                    <li key={s.number} className="relative">
                      {/* node */}
                      <span
                        aria-hidden="true"
                        className="absolute -left-8 top-1.5 w-3 h-3 rounded-full transition-all duration-500"
                        style={{
                          background: isActive || isDone ? "#d4a14a" : "#3a3a3a",
                          boxShadow: isActive
                            ? "0 0 0 4px rgba(212,161,74,0.18)"
                            : "0 0 0 4px #0a0a0a",
                          transform: isActive ? "scale(1.15)" : "scale(1)",
                        }}
                      />
                      <button
                        type="button"
                        className="text-left w-full group"
                        aria-current={isActive ? "step" : undefined}
                      >
                        <span
                          className="block text-[10px] font-mono uppercase tracking-[0.25em] mb-1 transition-colors duration-300"
                          style={{
                            fontFamily: "var(--font-mono)",
                            color: isActive ? "#d4a14a" : "#6f6a5c",
                          }}
                        >
                          Step {s.number}
                        </span>
                        <span
                          className="block font-light leading-snug transition-all duration-500"
                          style={{
                            fontFamily: "var(--font-display)",
                            fontSize: isActive ? "1.35rem" : "1.1rem",
                            color: isActive
                              ? "#f4eedf"
                              : isDone
                              ? "#9a917c"
                              : "#6f6a5c",
                          }}
                        >
                          {s.title}
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* ── Right: active step detail, cross-faded ── */}
            <div className="relative min-h-[24rem] lg:min-h-[22rem]">
              {/* giant ghost numeral */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -top-6 right-0 text-[12rem] xl:text-[15rem] font-light leading-none text-[#f4eedf]/[0.04] tabular-nums select-none"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {step.number}
              </div>

              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="relative max-w-2xl"
              >
                <div className="w-12 h-px bg-[#d4a14a] mb-6" />
                <h3
                  className="text-[clamp(1.8rem,3.2vw,2.9rem)] font-light text-[#f4eedf] mb-5 leading-[1.1]"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {step.title}
                </h3>
                <p className="text-[#c8bfa8] text-base lg:text-lg mb-7 leading-relaxed">
                  {step.summary}
                </p>
                <ul className="space-y-2.5">
                  {step.details.map((d, i) => (
                    <motion.li
                      key={d}
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: 0.06 * i + 0.1 }}
                      className="flex gap-4 items-start text-sm text-[#c8bfa8]/80 leading-snug"
                    >
                      <span
                        className="text-[#d4a14a] shrink-0 mt-0.5 font-mono"
                        style={{ fontFamily: "var(--font-mono)" }}
                      >
                        —
                      </span>
                      {d}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function HorizontalProcess() {
  const reducedMotion = useReducedMotion();
  const isNarrow = useIsNarrow(1024);

  // Vertical sequence for phones/tablets and reduced-motion users.
  if (isNarrow || reducedMotion) {
    return <VerticalProcess />;
  }
  return <StickyProcess />;
}
