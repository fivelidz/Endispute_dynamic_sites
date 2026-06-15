"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  type MotionValue,
} from "motion/react";
import { Check } from "lucide-react";
import { processSteps } from "@/lib/content";

/**
 * Elevator — THE SHOWPIECE.
 * A vertical glass stepper with a left track + 4 nodes. A glowing azure
 * indicator dot slides down the track linked to section scroll progress.
 * Each step card brightens (opacity/scale) as the indicator passes it.
 *
 * Hooks rule: useScroll on the section once; per-card transforms extracted
 * into <ElevatorCard> children. No inline useTransform in JSX.
 */
export default function Elevator() {
  const sectionRef = useRef<HTMLDivElement>(null);

  // Track scroll through the section. Indicator maps to the active range.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 60%", "end 70%"],
  });

  // Smooth the indicator travel — softer spring, calmer settle.
  const smooth = useSpring(scrollYProgress, {
    stiffness: 50,
    damping: 28,
    mass: 0.6,
  });

  // Indicator top position as a percentage of the track (4% → 96%)
  const indicatorTop = useTransform(smooth, [0, 1], ["3%", "97%"]);

  const count = processSteps.length;

  return (
    <section id="process" className="section-pad relative px-4">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-12 max-w-2xl border-l-2 border-[#ff7714] pl-6"
        >
          <span className="font-mono text-xs font-medium uppercase tracking-wider text-[#a69b92]">
            How it works
          </span>
          <h2
            className="mt-3 font-display text-4xl text-[#1f1c1b] sm:text-5xl"
            style={{ fontWeight: 350, letterSpacing: "-0.01em", lineHeight: 1.0 }}
          >
            Four floors to resolution.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-[#1f1c1b]/80">
            A managed process that takes a complex dispute from intake to a
            durable outcome — with you supported at every level.
          </p>
        </motion.div>

        {/* DESKTOP: glass elevator with scroll-linked indicator */}
        <div ref={sectionRef} className="relative hidden lg:block">
          <div className="grid grid-cols-[88px_1fr] gap-8">
            {/* Track column */}
            <div className="relative">
              <div className="sticky top-32">
                <div className="relative mx-auto h-[30rem] w-px bg-[#d9d6ce]">
                  {/* Node markers — sharp squares on the rule */}
                  {processSteps.map((_, i) => {
                    const pct = (i / (count - 1)) * 94 + 3;
                    return (
                      <div
                        key={i}
                        className="absolute left-1/2 h-2 w-2 -translate-x-1/2 -rotate-45 border border-[#a69b92] bg-[#ebe9e1]"
                        style={{ top: `${pct}%` }}
                      />
                    );
                  })}

                  {/* Indicator — small flat orange diamond, no glow */}
                  <motion.div
                    style={{ top: indicatorTop }}
                    className="absolute left-1/2 z-10 -translate-x-1/2 -translate-y-1/2"
                  >
                    <span className="block h-2.5 w-2.5 -rotate-45 bg-[#ff7714]" />
                  </motion.div>
                </div>
              </div>
            </div>

            {/* Cards column */}
            <div className="flex flex-col gap-8">
              {processSteps.map((step, i) => (
                <ElevatorCard
                  key={step.number}
                  index={i}
                  count={count}
                  progress={smooth}
                  number={step.number}
                  title={step.title}
                  summary={step.summary}
                  details={step.details}
                />
              ))}
            </div>
          </div>
        </div>

        {/* MOBILE: simple vertical list */}
        <div className="flex flex-col gap-5 lg:hidden">
          {processSteps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
              className="glass bg-white p-6"
            >
              <div className="flex items-center gap-3">
                <span className="font-mono text-sm font-semibold text-[#ff7714]">
                  {step.number}
                </span>
                <h3 className="font-display text-lg text-[#1f1c1b]" style={{ fontWeight: 400 }}>
                  {step.title}
                </h3>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-[#1f1c1b]/80">
                {step.summary}
              </p>
              <ul className="mt-4 space-y-2">
                {step.details.map((d) => (
                  <li key={d} className="flex gap-2.5 text-sm text-[#1f1c1b]/85">
                    <Check
                      size={16}
                      className="mt-0.5 flex-shrink-0 text-[#ff7714]"
                      strokeWidth={2.4}
                    />
                    <span>{d}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ElevatorCard({
  index,
  count,
  progress,
  number,
  title,
  summary,
  details,
}: {
  index: number;
  count: number;
  progress: MotionValue<number>;
  number: string;
  title: string;
  summary: string;
  details: readonly string[];
}) {
  // Compute the scroll-window during which this card is "active".
  const center = index / (count - 1);
  const span = 1 / (count - 1);
  const start = Math.max(0, center - span * 0.7);
  const end = Math.min(1, center + span * 0.7);

  // Brighten gently as indicator passes — opacity only, no scale/glow drift.
  const opacity = useTransform(
    progress,
    [start - span * 0.5, start, end],
    [0.6, 1, 1]
  );
  // Active step gets an orange left edge as the indicator passes it.
  const borderColor = useTransform(
    progress,
    [start - span * 0.5, start, end, end + span * 0.5],
    ["#d9d6ce", "#ff7714", "#ff7714", "#d9d6ce"]
  );

  return (
    <motion.div
      style={{ opacity, borderLeftColor: borderColor }}
      className="glass min-h-[7rem] border-l-2 bg-white p-7"
    >
      <div className="flex items-center gap-3">
        <span className="flex h-9 w-9 items-center justify-center border border-[#d9d6ce] font-mono text-sm font-bold text-[#ff7714]">
          {number}
        </span>
        <h3 className="font-display text-xl text-[#1f1c1b]" style={{ fontWeight: 400 }}>{title}</h3>
      </div>
      <p className="mt-3.5 text-[15px] leading-relaxed text-[#1f1c1b]/85">
        {summary}
      </p>
      <ul className="mt-4 grid gap-2 sm:grid-cols-2">
        {details.map((d) => (
          <li key={d} className="flex gap-2.5 text-sm text-[#1f1c1b]/80">
            <Check
              size={15}
              className="mt-0.5 flex-shrink-0 text-[#ff7714]"
              strokeWidth={2.4}
            />
            <span>{d}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}
