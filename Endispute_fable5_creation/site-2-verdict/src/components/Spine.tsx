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
        "py-8"
      )}
    >
      {/* spine node */}
      <div className="absolute left-1/2 top-1/2 z-20 hidden h-3 w-3 -translate-x-1/2 -translate-y-1/2 rotate-45 bg-[#c8472b] md:block" />

      <motion.div
        style={{ opacity, x }}
        className={cn(
          "md:col-start-1",
          left ? "md:pr-12" : "md:order-2 md:col-start-2 md:pl-12"
        )}
      >
        <div className="border border-[#16191d]/15 bg-[#efe9dc] p-7 text-[#16191d] shadow-sm">
          <span className="mono-label text-[#c8472b]">0{index + 1}</span>
          <h3 className="mt-3 font-serif text-2xl leading-snug">{title}</h3>
          <p className="mt-3 text-[14px] leading-relaxed text-[#6e6a60]">
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
      className="relative bg-[#f6f1e7] px-6 py-28 text-[#16191d] md:py-36"
    >
      <div className="mx-auto max-w-5xl">
        <p className="mono-label mb-5 text-[#6e6a60]">03 — Why Endispute</p>
        <h2 className="max-w-2xl font-serif text-4xl leading-tight text-[#16191d] sm:text-5xl">
          The balance of <span className="italic text-[#c8472b]">advantage</span>.
        </h2>

        <div className="relative mt-16">
          {/* central spine line */}
          <motion.div
            className="absolute left-1/2 top-0 hidden h-full w-[2px] origin-top -translate-x-1/2 bg-[#c8472b] md:block"
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
