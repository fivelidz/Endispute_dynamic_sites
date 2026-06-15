"use client";

import { motion, useReducedMotion } from "motion/react";
import { stats, company, contact } from "@/lib/content";

const ease = [0.22, 1, 0.36, 1] as const;

export default function SplitHero() {
  const reduce = useReducedMotion();

  const leftInit = reduce ? { x: 0 } : { x: "-100%" };
  const rightInit = reduce ? { x: 0 } : { x: "100%" };

  return (
    <section id="top" className="relative min-h-screen w-full overflow-hidden">
      {/* Split halves — full-bleed background, capped text inside */}
      <div className="flex min-h-screen w-full flex-col md:flex-row">
        {/* SIDE ONE — deepest obsidian */}
        <motion.div
          className="relative flex w-full flex-col justify-center bg-[#0a0a0a] px-7 py-20 md:min-h-screen md:w-1/2 md:py-12 md:pr-12 lg:pr-16"
          initial={leftInit}
          animate={{ x: 0 }}
          transition={{ duration: reduce ? 0 : 0.9, ease, delay: 0.05 }}
        >
          <div className="split-left-inner">
            <p className="mono-label mb-5 text-[#cccccc]">{company.shortPitch}</p>
            <h1 className="display text-[clamp(3.5rem,11vw,7rem)]">
              Two
              <br />
              <span className="text-[#fc1c46]">sides.</span>
            </h1>
            <p className="mt-6 max-w-md text-[16px] leading-[1.5] text-[#cccccc]">
              Every dispute has two sides. Endispute is the structured space
              between them — confidential, tailored, decisive.
            </p>
            <div className="mt-8">
              <a
                href="#contact"
                className="inline-block rounded-full bg-[#fc1c46] px-7 py-3 font-mono text-xs uppercase tracking-[0.18em] text-white transition-opacity hover:opacity-90"
              >
                Arrange a consultation
              </a>
            </div>
          </div>
        </motion.div>

        {/* SIDE TWO — one tonal step up */}
        <motion.div
          className="relative flex w-full flex-col justify-center bg-[#1a1a1a] px-7 py-20 md:min-h-screen md:w-1/2 md:py-12 md:pl-12 lg:pl-16"
          initial={rightInit}
          animate={{ x: 0 }}
          transition={{ duration: reduce ? 0 : 0.9, ease, delay: 0.05 }}
        >
          <div className="split-right-inner">
            <p className="mono-label mb-5 text-[#cccccc]">
              End Your Dispute With Endispute
            </p>
            <h1 className="display text-[clamp(3.5rem,11vw,7rem)]">
              One
              <br />
              <span className="text-[#fc1c46]">resolution.</span>
            </h1>
            <p className="mt-6 max-w-md text-[16px] leading-[1.5] text-[#cccccc]">
              Leaders in conflict resolution for complex commercial disputes —
              across Australia and internationally.
            </p>
            <div className="mt-8">
              <a
                href="#processes"
                className="inline-block border border-[#4c4c4c] px-7 py-3 font-mono text-xs uppercase tracking-[0.18em] text-white transition-colors hover:border-white"
              >
                Our processes
              </a>
            </div>
          </div>
        </motion.div>
      </div>

      {/* The seam — the single red accent for this viewport */}
      <motion.div
        className="pointer-events-none absolute left-0 right-0 top-1/2 z-20 h-[2px] -translate-y-1/2 md:left-1/2 md:right-auto md:top-0 md:h-full md:w-[2px] md:-translate-x-1/2 md:translate-y-0"
        style={{ background: "#fc1c46" }}
        animate={{ opacity: reduce ? 1 : [0.5, 1, 0.5] }}
        transition={
          reduce
            ? undefined
            : { duration: 2.8, repeat: Infinity, ease: "easeInOut" }
        }
      />

      {/* Stats strip — capped to the measure, hairline dividers */}
      <div className="absolute inset-x-0 bottom-0 z-30 border-t border-[#4c4c4c] bg-[#0a0a0a]/90 backdrop-blur-sm">
        <div className="measure grid grid-cols-2 px-7 sm:grid-cols-4">
          {stats.map((s, i) => (
            <div
              key={s.label}
              className="border-r border-[#4c4c4c] px-4 py-4 last:border-r-0"
            >
              <div className="font-serif text-xl text-white">{s.value}</div>
              <div className="mt-1 font-mono text-[12px] uppercase leading-tight tracking-[0.12em] text-[#cccccc]">
                {s.label}
              </div>
              {i === 3 && <span className="sr-only">{contact.reach}</span>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
