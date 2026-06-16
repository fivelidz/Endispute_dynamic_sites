"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
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

// ─── Desktop: continuous flowing timeline ────────────────────────────────
// No scroll-pinning, no discrete "active step" snapping. The section flows
// with the page at the SAME pacing as the rest of the site: a gold spine on the
// left draws itself continuously as you scroll past, and each step reveals with
// the same whileInView spring used elsewhere. Smooth, not jerky, and it never
// hijacks the scroll.
function StepRow({ step, idx }: { step: (typeof processSteps)[number]; idx: number }) {
  const ref = useRef<HTMLDivElement>(null);
  // Light up this step's node as it reaches the middle of the viewport.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 70%", "start 35%"],
  });
  const nodeColor = useTransform(scrollYProgress, [0, 1], ["#3a3a3a", "#d4a14a"]);
  const nodeShadow = useTransform(
    scrollYProgress,
    [0, 1],
    ["0 0 0 4px #0a0a0a", "0 0 0 4px rgba(212,161,74,0.18)"]
  );
  const nodeScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);

  return (
    <div ref={ref} className="relative pl-16 lg:pl-24">
      {/* node on the spine */}
      <motion.span
        aria-hidden="true"
        className="absolute left-[1px] top-2 w-3.5 h-3.5 rounded-full -translate-x-1/2"
        style={{ background: nodeColor, boxShadow: nodeShadow, scale: nodeScale }}
      />

      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-90px" }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="grid lg:grid-cols-[1fr_1.1fr] gap-6 lg:gap-16 items-start"
      >
        {/* left: number + title */}
        <div className="relative">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-8 -left-2 text-[7rem] lg:text-[9rem] font-light leading-none text-[#f4eedf]/[0.035] tabular-nums select-none"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {step.number}
          </div>
          <span
            className="relative text-[10px] font-mono uppercase tracking-[0.3em] text-[#d4a14a] block mb-3"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            Step {step.number} / {String(STEP_COUNT).padStart(2, "0")}
          </span>
          <h3
            className="relative text-[clamp(1.7rem,2.8vw,2.6rem)] font-light text-[#f4eedf] leading-[1.12] max-w-md"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {step.title}
          </h3>
        </div>

        {/* right: summary + details */}
        <div>
          <p className="text-[#c8bfa8] text-base lg:text-lg mb-6 leading-relaxed">
            {step.summary}
          </p>
          <ul className="space-y-2.5">
            {step.details.map((d) => (
              <li
                key={d}
                className="flex gap-4 items-start text-sm text-[#c8bfa8]/80 leading-snug"
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
        </div>
      </motion.div>
    </div>
  );
}

function FlowProcess() {
  const railRef = useRef<HTMLDivElement>(null);
  // The spine fill is driven by the section's own scroll position — continuous,
  // so it tracks the page exactly (no stepwise snapping).
  const { scrollYProgress } = useScroll({
    target: railRef,
    offset: ["start 80%", "end 60%"],
  });
  const spineScale = useTransform(scrollYProgress, [0, 1], [0, 1], { clamp: true });

  return (
    <section id="process" className="py-24 lg:py-32 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto px-8 sm:px-12 lg:px-16">
        <div className="border-t border-[#2e2e2e] pt-4 mb-14 lg:mb-20 flex items-center gap-6 flex-wrap">
          <SectionHeader subtitle="how a matter moves" />
        </div>

        <div ref={railRef} className="relative">
          {/* spine track */}
          <div
            aria-hidden="true"
            className="absolute left-0 top-3 bottom-3 w-px bg-[#2e2e2e]"
          />
          {/* spine fill (scroll-linked, smooth) */}
          <motion.div
            aria-hidden="true"
            className="absolute left-0 top-3 w-px bg-[#d4a14a] origin-top"
            style={{ bottom: 12, scaleY: spineScale }}
          />

          <div className="flex flex-col gap-16 lg:gap-24">
            {processSteps.map((step, idx) => (
              <StepRow key={step.number} step={step} idx={idx} />
            ))}
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
  return <FlowProcess />;
}
