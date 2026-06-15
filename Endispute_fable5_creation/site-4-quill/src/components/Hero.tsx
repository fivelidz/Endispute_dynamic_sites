"use client";

import { motion, useReducedMotion } from "motion/react";
import { company, contact, stats } from "@/lib/content";

const aboutFirstLine = company.about.split(". ")[0] + ".";

export default function Hero() {
  const reduce = useReducedMotion();

  // Fast, single, GPU-friendly reveal so the hero paints immediately.
  // Content is fully visible almost instantly — no long staggered delays.
  const reveal = (delay = 0) => ({
    initial: reduce ? false : { opacity: 0, y: 8 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.45, delay, ease: "easeOut" as const },
  });

  return (
    <section
      id="top"
      className="relative mx-auto max-w-5xl px-5 pb-28 pt-24 text-center md:pt-32"
    >
      <motion.p
        {...reveal(0)}
        className="smallcaps mb-7 text-[16px] text-[#6b6b6b]"
      >
        In the matter of your dispute
      </motion.p>

      {/* Headline paints immediately — letterpress serif, no blur stagger */}
      <motion.h1
        {...reveal(0.04)}
        className="font-garamond text-5xl font-500 leading-[1.04] tracking-[-0.01em] text-[#1f1c1b] letterpress sm:text-6xl md:text-7xl lg:text-8xl"
      >
        Let it be resolved.
      </motion.h1>

      {/* Thin ruled accent rather than a heavy animated SVG flourish */}
      <div className="mx-auto mt-6 h-px w-[220px] max-w-[60%] bg-[#1f1c1b]/25 md:w-[300px]" />

      <motion.p
        {...reveal(0.1)}
        className="mx-auto mt-8 max-w-2xl font-garamond text-xl italic leading-relaxed text-[#6b6b6b] md:text-2xl"
      >
        {company.shortPitch}.
      </motion.p>

      <motion.p
        {...reveal(0.14)}
        className="mx-auto mt-4 max-w-[60ch] font-garamond text-lg leading-[1.7] text-[#1f1c1b]"
      >
        {aboutFirstLine}
      </motion.p>

      <motion.div
        {...reveal(0.18)}
        className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
      >
        <a
          href="#contact"
          className="btn-ink smallcaps px-8 py-3 text-[16px]"
        >
          Begin a consultation
        </a>
        <a
          href="#articles"
          className="btn-outline smallcaps px-8 py-3 text-[16px]"
        >
          Read the process
        </a>
      </motion.div>

      {/* Stats row — ledger lines, small-caps labels */}
      <motion.div
        {...reveal(0.24)}
        className="mx-auto mt-16 grid max-w-3xl grid-cols-2 gap-px overflow-hidden border-y border-[#1f1c1b]/15 md:grid-cols-4"
      >
        {stats.map((s) => (
          <div key={s.label} className="px-3 py-5 text-center">
            <div className="font-garamond text-2xl font-600 text-[#1f1c1b] md:text-3xl">
              {s.value}
            </div>
            <div className="smallcaps mt-1 text-[12px] leading-tight text-[#6b6b6b]">
              {s.label}
            </div>
          </div>
        ))}
      </motion.div>

      <motion.p
        {...reveal(0.3)}
        className="mt-6 font-mono-quill text-xs text-[#6b6b6b]"
      >
        {contact.reach} · prompt, confidential responses
      </motion.p>
    </section>
  );
}
