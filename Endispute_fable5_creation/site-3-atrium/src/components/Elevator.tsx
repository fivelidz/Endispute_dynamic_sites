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

  // Smooth the indicator travel
  const smooth = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 22,
    mass: 0.5,
  });

  // Indicator top position as a percentage of the track (4% → 96%)
  const indicatorTop = useTransform(smooth, [0, 1], ["3%", "97%"]);

  const count = processSteps.length;

  return (
    <section id="process" className="section-pad relative px-4">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mb-14 max-w-2xl"
        >
          <span className="font-mono text-xs font-medium uppercase tracking-wider text-[#2563ab]">
            How it works
          </span>
          <h2
            className="mt-3 font-display text-4xl font-bold tracking-tight text-[#1c2530] sm:text-5xl"
            style={{ letterSpacing: "-0.02em" }}
          >
            Four floors to resolution.
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-[#1c2530]/80">
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
                <div className="relative mx-auto h-[30rem] w-1.5 rounded-full bg-[#1c2530]/10">
                  {/* Node markers */}
                  {processSteps.map((_, i) => {
                    const pct = (i / (count - 1)) * 94 + 3;
                    return (
                      <div
                        key={i}
                        className="absolute left-1/2 h-3 w-3 -translate-x-1/2 rounded-full border-2 border-[#eef1f4] bg-[#2563ab]/40"
                        style={{ top: `${pct}%` }}
                      />
                    );
                  })}

                  {/* Glowing azure indicator */}
                  <motion.div
                    style={{ top: indicatorTop }}
                    className="absolute left-1/2 z-10 -translate-x-1/2 -translate-y-1/2"
                  >
                    <span className="block h-6 w-6 rounded-full bg-[#2563ab] shadow-[0_0_22px_6px_rgba(37,99,171,0.55)]">
                      <span className="block h-full w-full rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.9)_0%,rgba(37,99,171,0)_60%)]" />
                    </span>
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
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="glass rounded-2xl bg-white/60 p-6"
            >
              <div className="flex items-center gap-3">
                <span className="font-mono text-sm font-semibold text-[#2563ab]">
                  {step.number}
                </span>
                <h3 className="font-display text-lg font-bold text-[#1c2530]">
                  {step.title}
                </h3>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-[#1c2530]/80">
                {step.summary}
              </p>
              <ul className="mt-4 space-y-2">
                {step.details.map((d) => (
                  <li key={d} className="flex gap-2.5 text-sm text-[#1c2530]/85">
                    <Check
                      size={16}
                      className="mt-0.5 flex-shrink-0 text-[#2563ab]"
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

  // Brighten as indicator passes: dim → full → stays bright.
  const opacity = useTransform(
    progress,
    [start - span * 0.5, start, end],
    [0.5, 1, 1]
  );
  const scale = useTransform(
    progress,
    [start - span * 0.5, center, end + span * 0.5],
    [0.97, 1, 1]
  );
  const glow = useTransform(
    progress,
    [start, center, end],
    [
      "0 8px 40px rgba(20,30,50,0.06)",
      "0 16px 50px rgba(37,99,171,0.20)",
      "0 8px 40px rgba(20,30,50,0.06)",
    ]
  );

  return (
    <motion.div
      style={{ opacity, scale, boxShadow: glow }}
      className="glass min-h-[7rem] rounded-2xl bg-white/60 p-7"
    >
      <div className="flex items-center gap-3">
        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#2563ab]/12 font-mono text-sm font-bold text-[#2563ab]">
          {number}
        </span>
        <h3 className="font-display text-xl font-bold text-[#1c2530]">{title}</h3>
      </div>
      <p className="mt-3.5 text-[15px] leading-relaxed text-[#1c2530]/85">
        {summary}
      </p>
      <ul className="mt-4 grid gap-2 sm:grid-cols-2">
        {details.map((d) => (
          <li key={d} className="flex gap-2.5 text-sm text-[#1c2530]/80">
            <Check
              size={15}
              className="mt-0.5 flex-shrink-0 text-[#2563ab]"
              strokeWidth={2.4}
            />
            <span>{d}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}
