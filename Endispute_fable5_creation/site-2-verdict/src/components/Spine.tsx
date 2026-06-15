"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  type MotionValue,
} from "motion/react";
import { benefits } from "@/lib/content";
import { cn } from "@/lib/cn";

interface RowProps {
  index: number;
  total: number;
  title: string;
  detail: string;
  progress: MotionValue<number>;
  reduce: boolean;
}

function SpineRow({ index, total, title, detail, progress, reduce }: RowProps) {
  const left = index % 2 === 0;
  // window for this row inside the section scroll progress
  const start = 0.08 + (index / total) * 0.7;
  const end = start + 0.18;

  const opacity = useTransform(
    progress,
    [start, end],
    [reduce ? 1 : 0, 1]
  );
  const x = useTransform(
    progress,
    [start, end],
    [reduce ? 0 : left ? -40 : 40, 0]
  );

  return (
    <div
      className={cn(
        "relative grid grid-cols-1 items-center gap-6 md:grid-cols-2",
        "py-5"
      )}
    >
      {/* spine node */}
      <div className="absolute left-1/2 top-1/2 z-20 hidden h-3 w-3 -translate-x-1/2 -translate-y-1/2 rotate-45 bg-[#fc1c46] md:block" />

      <motion.div
        style={{ opacity, x }}
        className={cn(
          "md:col-start-1",
          left ? "md:pr-12" : "md:order-2 md:col-start-2 md:pl-12"
        )}
      >
        <div className="border border-[#4c4c4c] bg-[#1a1a1a] p-7 text-[#cccccc]">
          <span className="mono-label text-[#cccccc]">0{index + 1}</span>
          <h3 className="mt-3 font-serif text-2xl leading-snug text-white">
            {title}
          </h3>
          <p className="mt-3 text-[15px] leading-[1.5] text-[#cccccc]">
            {detail}
          </p>
        </div>
      </motion.div>
      {/* empty opposite cell keeps grid balance */}
      <div className={cn("hidden md:block", left ? "md:col-start-2" : "md:col-start-1 md:order-1")} />
    </div>
  );
}

export default function Spine() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion() ?? false;

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "end 0.4"],
  });

  const spineScale = useTransform(
    scrollYProgress,
    [0.05, 0.85],
    [reduce ? 1 : 0, 1]
  );

  return (
    <section
      id="benefits"
      ref={ref}
      className="relative bg-[#0a0a0a] px-6 py-20 text-[#cccccc] md:py-24"
    >
      <div className="measure max-w-5xl">
        <p className="mono-label mb-5 text-[#cccccc]">03 — Why Endispute</p>
        <h2 className="display max-w-2xl text-[clamp(2rem,4.5vw,3.25rem)]">
          The balance of <span className="text-[#fc1c46]">advantage</span>.
        </h2>

        <div className="relative mt-12">
          {/* central spine line */}
          <motion.div
            className="absolute left-1/2 top-0 hidden h-full w-[2px] origin-top -translate-x-1/2 bg-[#fc1c46] md:block"
            style={{ scaleY: spineScale }}
          />

          <div className="relative">
            {benefits.map((b, i) => (
              <SpineRow
                key={b.title}
                index={i}
                total={benefits.length}
                title={b.title}
                detail={b.detail}
                progress={scrollYProgress}
                reduce={reduce}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
