"use client";

import { motion, useReducedMotion } from "motion/react";
import { stats, company, contact } from "@/lib/content";

const ease = [0.22, 1, 0.36, 1] as const;

export default function SplitHero() {
  const reduce = useReducedMotion();

  const leftInit = reduce ? { x: 0 } : { x: "-100%" };
  const rightInit = reduce ? { x: 0 } : { x: "100%" };

  return (
    <section id="top" className="relative h-screen w-full overflow-hidden">
      {/* Split halves */}
      <div className="flex h-full w-full flex-col md:flex-row">
        {/* INK half */}
        <motion.div
          className="relative flex h-1/2 w-full flex-col justify-center bg-[#101418] px-7 py-12 md:h-full md:w-1/2 md:px-14 lg:px-20"
          initial={leftInit}
          animate={{ x: 0 }}
          transition={{ duration: 1, ease, delay: 0.1 }}
        >
          <p className="mono-label mb-5 text-[#b8ae98]">{company.shortPitch}</p>
          <h1 className="font-serif text-5xl leading-[0.95] text-[#efe9dc] sm:text-6xl lg:text-7xl">
            Two
            <br />
            <span className="italic text-[#c8472b]">sides.</span>
          </h1>
          <p className="mt-6 max-w-sm text-[15px] leading-relaxed text-[#b8ae98]">
            Every dispute has two sides. Endispute is the structured space between
            them — confidential, tailored, decisive.
          </p>
          <div className="mt-8">
            <a
              href="#contact"
              className="inline-block border border-[#efe9dc] px-7 py-3 font-mono text-xs uppercase tracking-[0.18em] text-[#efe9dc] transition-colors hover:bg-[#efe9dc] hover:text-[#16191d]"
            >
              Arrange a consultation
            </a>
          </div>
        </motion.div>

        {/* PAPER half */}
        <motion.div
          className="relative flex h-1/2 w-full flex-col justify-center bg-[#f6f1e7] px-7 py-12 md:h-full md:w-1/2 md:items-end md:px-14 md:text-right lg:px-20"
          initial={rightInit}
          animate={{ x: 0 }}
          transition={{ duration: 1, ease, delay: 0.1 }}
        >
          <p className="mono-label mb-5 text-[#6e6a60]">
            End Your Dispute With Endispute
          </p>
          <h1 className="font-serif text-5xl leading-[0.95] text-[#16191d] sm:text-6xl lg:text-7xl">
            One
            <br />
            <span className="italic text-[#c8472b]">resolution.</span>
          </h1>
          <p className="mt-6 max-w-sm text-[15px] leading-relaxed text-[#6e6a60]">
            Leaders in conflict resolution for complex commercial disputes —
            across Australia and internationally.
          </p>
          <div className="mt-8">
            <a
              href="#processes"
              className="inline-block border border-[#16191d] px-7 py-3 font-mono text-xs uppercase tracking-[0.18em] text-[#16191d] transition-colors hover:bg-[#16191d] hover:text-[#f6f1e7]"
            >
              Our processes
            </a>
          </div>
        </motion.div>
      </div>

      {/* Vermilion seam */}
      <motion.div
        className="pointer-events-none absolute left-0 right-0 top-1/2 z-20 h-[3px] -translate-y-1/2 md:left-1/2 md:right-auto md:top-0 md:h-full md:w-[3px] md:-translate-x-1/2 md:translate-y-0"
        style={{ background: "#c8472b" }}
        animate={{ opacity: reduce ? 1 : [0.45, 1, 0.45] }}
        transition={
          reduce
            ? undefined
            : { duration: 2.6, repeat: Infinity, ease: "easeInOut" }
        }
      />

      {/* Stats strip spanning both halves */}
      <div className="absolute inset-x-0 bottom-0 z-30 grid grid-cols-2 border-t border-[#c8472b]/40 bg-[#101418]/85 backdrop-blur-sm sm:grid-cols-4">
        {stats.map((s, i) => (
          <div
            key={s.label}
            className="border-r border-[#c8472b]/20 px-4 py-4 last:border-r-0"
          >
            <div className="font-serif text-xl text-[#c8472b]">{s.value}</div>
            <div className="mt-1 font-mono text-[12px] uppercase leading-tight tracking-[0.12em] text-[#b8ae98]">
              {s.label}
            </div>
            {i === 3 && (
              <span className="sr-only">{contact.reach}</span>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
