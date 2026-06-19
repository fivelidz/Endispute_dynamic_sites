"use client";

/**
 * Process — the "how a matter moves" section, finalised on the SPOTLIGHT
 * treatment: as you scroll, the step nearest the centre of the viewport
 * brightens and lifts while the others recede, with a gold spine drawing down
 * the side. Cinematic but contained — it flows at the same pace as the rest of
 * the site and never hijacks the scroll.
 *
 * On phones / tablets and for prefers-reduced-motion, it falls back to a clean
 * vertical card sequence.
 */

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  useSpring,
  type MotionValue,
} from "motion/react";
import { processSteps } from "@/lib/content";

const STEP_COUNT = processSteps.length;

// ── shared bits ──────────────────────────────────────────────────────────
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

function StepLabel({ number }: { number: string }) {
  return (
    <span
      className="relative text-[10px] font-mono uppercase tracking-[0.3em] text-[#d4a14a] block mb-3"
      style={{ fontFamily: "var(--font-mono)" }}
    >
      Step {number} / {String(STEP_COUNT).padStart(2, "0")}
    </span>
  );
}

function Ghost({ number, className = "" }: { number: string; className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute font-light leading-none text-[#f4eedf]/[0.04] tabular-nums select-none ${className}`}
      style={{ fontFamily: "var(--font-display)" }}
    >
      {number}
    </div>
  );
}

function Detail({ d }: { d: string }) {
  return (
    <li className="flex gap-4 items-start text-sm text-[#c8bfa8]/80 leading-snug">
      <span
        className="text-[#d4a14a] shrink-0 mt-0.5 font-mono"
        style={{ fontFamily: "var(--font-mono)" }}
      >
        —
      </span>
      {d}
    </li>
  );
}

function Spine({ progress }: { progress: MotionValue<number> }) {
  return (
    <>
      <div
        aria-hidden="true"
        className="absolute left-0 top-3 bottom-3 w-px bg-[#2e2e2e]"
      />
      <motion.div
        aria-hidden="true"
        className="absolute left-0 top-3 w-px bg-[#d4a14a] origin-top"
        style={{ bottom: 12, scaleY: progress }}
      />
    </>
  );
}

// ── Spotlight row ────────────────────────────────────────────────────────
function SpotlightRow({ step }: { step: (typeof processSteps)[number] }) {
  const ref = useRef<HTMLDivElement>(null);
  // 0 at far edges, 1 when centred in viewport.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const focus = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0]);
  const smooth = useSpring(focus, { stiffness: 120, damping: 26 });
  const opacity = useTransform(smooth, [0, 1], [0.32, 1]);
  const x = useTransform(smooth, [0, 1], [-6, 0]);
  const nodeColor = useTransform(smooth, [0, 1], ["#3a3a3a", "#d4a14a"]);
  const nodeScale = useTransform(smooth, [0, 1], [0.85, 1.25]);
  const barScale = useTransform(smooth, [0, 1], [0, 1]);

  return (
    <div ref={ref} className="relative pl-16 lg:pl-24">
      <motion.span
        aria-hidden="true"
        className="absolute left-[1px] top-2 w-3.5 h-3.5 rounded-full -translate-x-1/2"
        style={{ background: nodeColor, scale: nodeScale }}
      />
      <motion.div
        style={{ opacity, x }}
        className="grid lg:grid-cols-[1fr_1.1fr] gap-6 lg:gap-16 items-start"
      >
        <div className="relative">
          <Ghost number={step.number} className="-top-8 -left-2 text-[7rem] lg:text-[9rem]" />
          <StepLabel number={step.number} />
          <h3
            className="relative text-[clamp(1.7rem,2.8vw,2.6rem)] font-light text-[#f4eedf] leading-[1.12] max-w-md"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {step.title}
          </h3>
          <motion.div
            className="h-px bg-[#d4a14a] mt-5 origin-left max-w-[8rem]"
            style={{ scaleX: barScale }}
            aria-hidden="true"
          />
        </div>
        <div>
          <p className="text-[#c8bfa8] text-base lg:text-lg mb-6 leading-relaxed">
            {step.summary}
          </p>
          <ul className="space-y-2.5">
            {step.details.map((d) => (
              <Detail key={d} d={d} />
            ))}
          </ul>
        </div>
      </motion.div>
    </div>
  );
}

function SpotlightProcess() {
  const railRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: railRef,
    offset: ["start 80%", "end 60%"],
  });
  const spine = useTransform(scrollYProgress, [0, 1], [0, 1], { clamp: true });

  return (
    <section id="process" className="py-24 lg:py-32 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto px-8 sm:px-12 lg:px-16">
        <div className="border-t border-[#2e2e2e] pt-4 mb-14 lg:mb-20">
          <SectionHeader subtitle="how a matter moves" />
        </div>
        <div ref={railRef} className="relative">
          <Spine progress={spine} />
          <div className="flex flex-col gap-20 lg:gap-28">
            {processSteps.map((s) => (
              <SpotlightRow key={s.number} step={s} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ── mobile / reduced-motion fallback ─────────────────────────────────────
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
                  {step.details.map((d) => (
                    <Detail key={d} d={d} />
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

export default function Process() {
  const reducedMotion = useReducedMotion();
  const isNarrow = useIsNarrow(1024);
  if (isNarrow || reducedMotion) return <VerticalProcess />;
  return <SpotlightProcess />;
}
