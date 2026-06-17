"use client";

/**
 * ProcessVariants — five interchangeable scroll-animation treatments for the
 * "how a matter moves" process section, plus a shared mobile/reduced-motion
 * fallback. The active variant is chosen by <ProcessSwitcher>, which writes to
 * localStorage + a ?process= URL param so options can be compared and shared.
 *
 * All variants share the same content (processSteps) and the same editorial
 * Courtroom styling — only the motion differs.
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

export type ProcessVariant =
  | "flow"
  | "stagger"
  | "spotlight"
  | "slide"
  | "pinned";

export const PROCESS_VARIANTS: { id: ProcessVariant; label: string; blurb: string }[] = [
  { id: "flow", label: "Flow — drawing spine", blurb: "Continuous timeline, a gold spine draws as you scroll. Calm." },
  { id: "stagger", label: "Stagger — line by line", blurb: "Each detail line slides in one after another. Kinetic, editorial." },
  { id: "spotlight", label: "Spotlight — focus follows scroll", blurb: "The step nearest centre brightens; the rest dim back. Cinematic." },
  { id: "slide", label: "Slide — alternating", blurb: "Steps glide in from alternating sides, numbers counter-sliding." },
  { id: "pinned", label: "Pinned — cross-fade panel", blurb: "One pinned panel; the step content cross-fades as you scroll." },
];

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

function SectionShell({
  children,
  railRef,
}: {
  children: React.ReactNode;
  railRef?: React.Ref<HTMLDivElement>;
}) {
  return (
    <section id="process" className="py-24 lg:py-32 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto px-8 sm:px-12 lg:px-16">
        <div className="border-t border-[#2e2e2e] pt-4 mb-14 lg:mb-20">
          <SectionHeader subtitle="how a matter moves" />
        </div>
        <div ref={railRef} className="relative">
          {children}
        </div>
      </div>
    </section>
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

// ════════════════════════════════════════════════════════════════════════
// VARIANT 1 — FLOW (drawing spine, gentle reveals)
// ════════════════════════════════════════════════════════════════════════
function FlowRow({ step }: { step: (typeof processSteps)[number] }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 70%", "start 35%"],
  });
  const nodeColor = useTransform(scrollYProgress, [0, 1], ["#3a3a3a", "#d4a14a"]);
  const nodeScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  return (
    <div ref={ref} className="relative pl-16 lg:pl-24">
      <motion.span
        aria-hidden="true"
        className="absolute left-[1px] top-2 w-3.5 h-3.5 rounded-full -translate-x-1/2"
        style={{ background: nodeColor, scale: nodeScale }}
      />
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-90px" }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="grid lg:grid-cols-[1fr_1.1fr] gap-6 lg:gap-16 items-start"
      >
        <div className="relative">
          <Ghost number={step.number} className="-top-8 -left-2 text-[7rem] lg:text-[9rem]" />
          <StepLabel number={step.number} />
          <h3 className="relative text-[clamp(1.7rem,2.8vw,2.6rem)] font-light text-[#f4eedf] leading-[1.12] max-w-md" style={{ fontFamily: "var(--font-display)" }}>
            {step.title}
          </h3>
        </div>
        <div>
          <p className="text-[#c8bfa8] text-base lg:text-lg mb-6 leading-relaxed">{step.summary}</p>
          <ul className="space-y-2.5">{step.details.map((d) => <Detail key={d} d={d} />)}</ul>
        </div>
      </motion.div>
    </div>
  );
}

function FlowProcess() {
  const railRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: railRef, offset: ["start 80%", "end 60%"] });
  const spine = useTransform(scrollYProgress, [0, 1], [0, 1], { clamp: true });
  return (
    <SectionShell railRef={railRef}>
      <Spine progress={spine} />
      <div className="flex flex-col gap-16 lg:gap-24">
        {processSteps.map((s) => <FlowRow key={s.number} step={s} />)}
      </div>
    </SectionShell>
  );
}

// ════════════════════════════════════════════════════════════════════════
// VARIANT 2 — STAGGER (detail lines cascade in one by one)
// ════════════════════════════════════════════════════════════════════════
function StaggerRow({ step }: { step: (typeof processSteps)[number] }) {
  return (
    <div className="relative pl-16 lg:pl-24">
      <motion.span
        aria-hidden="true"
        className="absolute left-[1px] top-2 w-3.5 h-3.5 rounded-full -translate-x-1/2 bg-[#3a3a3a]"
        whileInView={{ backgroundColor: "#d4a14a", scale: 1.15 }}
        viewport={{ once: true, margin: "-120px" }}
        transition={{ duration: 0.5 }}
      />
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        variants={{ show: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } } }}
        className="grid lg:grid-cols-[1fr_1.1fr] gap-6 lg:gap-16 items-start"
      >
        <div className="relative">
          <Ghost number={step.number} className="-top-8 -left-2 text-[7rem] lg:text-[9rem]" />
          <motion.div variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }} transition={{ duration: 0.5 }}>
            <StepLabel number={step.number} />
            <h3 className="relative text-[clamp(1.7rem,2.8vw,2.6rem)] font-light text-[#f4eedf] leading-[1.12] max-w-md" style={{ fontFamily: "var(--font-display)" }}>
              {step.title}
            </h3>
          </motion.div>
        </div>
        <div>
          <motion.p variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } }} transition={{ duration: 0.5 }} className="text-[#c8bfa8] text-base lg:text-lg mb-6 leading-relaxed">
            {step.summary}
          </motion.p>
          <ul className="space-y-2.5">
            {step.details.map((d) => (
              <motion.li
                key={d}
                variants={{ hidden: { opacity: 0, x: 18 }, show: { opacity: 1, x: 0 } }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="flex gap-4 items-start text-sm text-[#c8bfa8]/80 leading-snug"
              >
                <span className="text-[#d4a14a] shrink-0 mt-0.5 font-mono" style={{ fontFamily: "var(--font-mono)" }}>—</span>
                {d}
              </motion.li>
            ))}
          </ul>
        </div>
      </motion.div>
    </div>
  );
}

function StaggerProcess() {
  const railRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: railRef, offset: ["start 80%", "end 60%"] });
  const spine = useTransform(scrollYProgress, [0, 1], [0, 1], { clamp: true });
  return (
    <SectionShell railRef={railRef}>
      <Spine progress={spine} />
      <div className="flex flex-col gap-16 lg:gap-24">
        {processSteps.map((s) => <StaggerRow key={s.number} step={s} />)}
      </div>
    </SectionShell>
  );
}

// ════════════════════════════════════════════════════════════════════════
// VARIANT 3 — SPOTLIGHT (row nearest centre brightens, others dim)
// ════════════════════════════════════════════════════════════════════════
function SpotlightRow({ step }: { step: (typeof processSteps)[number] }) {
  const ref = useRef<HTMLDivElement>(null);
  // 0 at far edges, 1 when centred in viewport.
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
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
      <motion.div style={{ opacity, x }} className="grid lg:grid-cols-[1fr_1.1fr] gap-6 lg:gap-16 items-start">
        <div className="relative">
          <Ghost number={step.number} className="-top-8 -left-2 text-[7rem] lg:text-[9rem]" />
          <StepLabel number={step.number} />
          <h3 className="relative text-[clamp(1.7rem,2.8vw,2.6rem)] font-light text-[#f4eedf] leading-[1.12] max-w-md" style={{ fontFamily: "var(--font-display)" }}>
            {step.title}
          </h3>
          <motion.div className="h-px bg-[#d4a14a] mt-5 origin-left max-w-[8rem]" style={{ scaleX: barScale }} aria-hidden="true" />
        </div>
        <div>
          <p className="text-[#c8bfa8] text-base lg:text-lg mb-6 leading-relaxed">{step.summary}</p>
          <ul className="space-y-2.5">{step.details.map((d) => <Detail key={d} d={d} />)}</ul>
        </div>
      </motion.div>
    </div>
  );
}

function SpotlightProcess() {
  const railRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: railRef, offset: ["start 80%", "end 60%"] });
  const spine = useTransform(scrollYProgress, [0, 1], [0, 1], { clamp: true });
  return (
    <SectionShell railRef={railRef}>
      <Spine progress={spine} />
      <div className="flex flex-col gap-20 lg:gap-28">
        {processSteps.map((s) => <SpotlightRow key={s.number} step={s} />)}
      </div>
    </SectionShell>
  );
}

// ════════════════════════════════════════════════════════════════════════
// VARIANT 4 — SLIDE (alternating sides, numbers counter-slide)
// ════════════════════════════════════════════════════════════════════════
function SlideRow({ step, idx }: { step: (typeof processSteps)[number]; idx: number }) {
  const fromLeft = idx % 2 === 0;
  return (
    <motion.div
      initial={{ opacity: 0, x: fromLeft ? -70 : 70 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ type: "spring", stiffness: 70, damping: 18 }}
      className="relative"
    >
      <div className={`grid lg:grid-cols-2 gap-6 lg:gap-16 items-center ${fromLeft ? "" : "lg:[direction:rtl]"}`}>
        {/* number / title block */}
        <div className={`relative ${fromLeft ? "" : "lg:[direction:ltr]"}`}>
          <motion.div
            aria-hidden="true"
            initial={{ x: fromLeft ? 40 : -40, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="pointer-events-none absolute -top-10 -left-3 text-[8rem] lg:text-[11rem] font-light leading-none text-[#f4eedf]/[0.05] tabular-nums select-none"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {step.number}
          </motion.div>
          <StepLabel number={step.number} />
          <h3 className="relative text-[clamp(1.7rem,3vw,2.8rem)] font-light text-[#f4eedf] leading-[1.1]" style={{ fontFamily: "var(--font-display)" }}>
            {step.title}
          </h3>
          <div className="w-12 h-px bg-[#d4a14a] mt-5" />
        </div>
        {/* detail block */}
        <div className={fromLeft ? "" : "lg:[direction:ltr]"}>
          <p className="text-[#c8bfa8] text-base lg:text-lg mb-6 leading-relaxed">{step.summary}</p>
          <ul className="space-y-2.5">{step.details.map((d) => <Detail key={d} d={d} />)}</ul>
        </div>
      </div>
    </motion.div>
  );
}

function SlideProcess() {
  return (
    <SectionShell>
      <div className="flex flex-col gap-20 lg:gap-32">
        {processSteps.map((s, i) => <SlideRow key={s.number} step={s} idx={i} />)}
      </div>
    </SectionShell>
  );
}

// ════════════════════════════════════════════════════════════════════════
// VARIANT 5 — PINNED (one sticky panel; content cross-fades on scroll)
// ════════════════════════════════════════════════════════════════════════
function PinnedProcess() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });
  const spine = useTransform(scrollYProgress, [0.02, 0.95], [0, 1], { clamp: true });

  useEffect(() => {
    const unsub = scrollYProgress.on("change", (p) => {
      const idx = Math.min(STEP_COUNT - 1, Math.max(0, Math.floor(p * STEP_COUNT - 0.0001 + 0.15)));
      setActive((prev) => (prev === idx ? prev : idx));
    });
    return () => unsub();
  }, [scrollYProgress]);

  const step = processSteps[active];

  return (
    <section
      id="process"
      ref={containerRef}
      className="relative bg-[#0a0a0a]"
      style={{ height: `${STEP_COUNT * 70}vh` }}
    >
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        <div className="w-full max-w-7xl mx-auto px-8 sm:px-12 lg:px-16">
          <div className="border-t border-[#2e2e2e] pt-4 mb-10 lg:mb-14">
            <SectionHeader subtitle="how a matter moves" />
          </div>
          <div className="grid lg:grid-cols-[18rem_1fr] gap-10 lg:gap-20 items-start">
            {/* index */}
            <div className="relative">
              <div aria-hidden="true" className="absolute left-[6px] top-3 bottom-3 w-px bg-[#2e2e2e]" />
              <motion.div aria-hidden="true" className="absolute left-[6px] top-3 w-px bg-[#d4a14a] origin-top" style={{ bottom: 12, scaleY: spine }} />
              <ul className="flex flex-col gap-6 lg:gap-7 pl-8">
                {processSteps.map((s, i) => {
                  const on = i <= active;
                  const cur = i === active;
                  return (
                    <li key={s.number} className="relative">
                      <span aria-hidden="true" className="absolute -left-8 top-1.5 w-3 h-3 rounded-full transition-all duration-500" style={{ background: on ? "#d4a14a" : "#3a3a3a", transform: cur ? "scale(1.2)" : "scale(1)", boxShadow: cur ? "0 0 0 4px rgba(212,161,74,0.18)" : "0 0 0 4px #0a0a0a" }} />
                      <span className="block text-[10px] font-mono uppercase tracking-[0.25em] mb-1 transition-colors duration-300" style={{ fontFamily: "var(--font-mono)", color: cur ? "#d4a14a" : "#6f6a5c" }}>Step {s.number}</span>
                      <span className="block font-light leading-snug transition-all duration-500" style={{ fontFamily: "var(--font-display)", fontSize: cur ? "1.3rem" : "1.05rem", color: cur ? "#f4eedf" : on ? "#9a917c" : "#6f6a5c" }}>{s.title}</span>
                    </li>
                  );
                })}
              </ul>
            </div>
            {/* detail */}
            <div className="relative min-h-[22rem]">
              <Ghost number={step.number} className="-top-6 right-0 text-[12rem] xl:text-[15rem]" />
              <motion.div key={step.number} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }} className="relative max-w-2xl">
                <div className="w-12 h-px bg-[#d4a14a] mb-6" />
                <h3 className="text-[clamp(1.8rem,3.2vw,2.9rem)] font-light text-[#f4eedf] mb-5 leading-[1.1]" style={{ fontFamily: "var(--font-display)" }}>{step.title}</h3>
                <p className="text-[#c8bfa8] text-base lg:text-lg mb-7 leading-relaxed">{step.summary}</p>
                <ul className="space-y-2.5">{step.details.map((d) => <Detail key={d} d={d} />)}</ul>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── shared mobile / reduced-motion fallback ──────────────────────────────
function VerticalProcess() {
  return (
    <section id="process" className="py-24 sm:py-28 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        <div className="border-t border-[#2e2e2e] mb-12 sm:mb-16 pt-4">
          <SectionHeader subtitle="01 — 04" />
        </div>
        <div className="relative">
          <div aria-hidden="true" className="absolute left-0 top-2 bottom-2 w-px bg-[#d4a14a]/30 hidden sm:block" />
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
                <span aria-hidden="true" className="absolute -left-[10px] top-9 w-3 h-3 rounded-full bg-[#d4a14a] hidden sm:block" style={{ boxShadow: "0 0 0 4px #0a0a0a", marginLeft: "-2.5rem" }} />
                <div className="flex items-baseline gap-4 mb-4">
                  <span className="text-4xl sm:text-5xl font-light text-[#d4a14a]/40 leading-none tabular-nums" style={{ fontFamily: "var(--font-display)" }}>{step.number}</span>
                  <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#d4a14a]" style={{ fontFamily: "var(--font-mono)" }}>Step {step.number} / {String(STEP_COUNT).padStart(2, "0")}</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-light text-[#f4eedf] mb-3 leading-tight" style={{ fontFamily: "var(--font-display)" }}>{step.title}</h3>
                <p className="text-[#c8bfa8] text-sm sm:text-base leading-relaxed mb-6">{step.summary}</p>
                <ul className="space-y-2.5">{step.details.map((d) => <Detail key={d} d={d} />)}</ul>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ── hook + dispatcher ────────────────────────────────────────────────────
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

export default function ProcessVariants({ variant }: { variant: ProcessVariant }) {
  const reducedMotion = useReducedMotion();
  const isNarrow = useIsNarrow(1024);

  if (isNarrow || reducedMotion) return <VerticalProcess />;

  switch (variant) {
    case "stagger":
      return <StaggerProcess />;
    case "spotlight":
      return <SpotlightProcess />;
    case "slide":
      return <SlideProcess />;
    case "pinned":
      return <PinnedProcess />;
    case "flow":
    default:
      return <FlowProcess />;
  }
}
