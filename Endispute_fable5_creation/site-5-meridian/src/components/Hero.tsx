"use client";

import { motion, useReducedMotion } from "motion/react";
import { ChevronDown } from "lucide-react";
import { company, stats } from "@/lib/content";
import CountUp from "./CountUp";

const firstSentence = company.about.split(". ")[0] + ".";

export default function Hero() {
  const reduce = useReducedMotion();
  return (
    <section
      id="top"
      className="relative flex min-h-screen items-center overflow-hidden px-6 pt-28 pb-16"
    >
      <div className="mx-auto w-full max-w-7xl lg:pl-[8%]">
        <div className="max-w-3xl">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.3em] text-[#8a93a8]"
          >
            <span className="relative flex h-2.5 w-2.5">
              {!reduce && (
                <motion.span
                  className="absolute inline-flex h-full w-full rounded-full bg-[#e8ecf4]"
                  animate={{ scale: [1, 2.4, 1], opacity: [0.7, 0, 0.7] }}
                  transition={{ duration: 2.4, repeat: Infinity, ease: "easeOut" }}
                />
              )}
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#e8ecf4] shadow-[0_0_10px_rgba(232,236,244,0.9)]" />
            </span>
            {company.shortPitch}
          </motion.p>

          {/* mask-reveal headline */}
          <h1 className="font-serif text-5xl font-light leading-[1.05] tracking-tight text-[#e8ecf4] sm:text-6xl lg:text-7xl">
            <span className="block overflow-hidden">
              <motion.span
                initial={{ y: "110%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="block"
              >
                From conflict
              </motion.span>
            </span>
            <span className="block overflow-hidden">
              <motion.span
                initial={{ y: "110%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.12 }}
                className="block"
              >
                to{" "}
                <span className="italic text-[#d4a843]" style={{ textShadow: "0 0 30px rgba(212,168,67,0.4)" }}>
                  resolution.
                </span>
              </motion.span>
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="mt-7 max-w-xl text-lg leading-relaxed text-[#b8c0d4]"
          >
            {firstSentence}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.55 }}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <a
              href="#contact"
              className="rounded-full bg-[#d4a843] px-7 py-3 font-sans text-sm font-semibold text-[#0b1020] shadow-[0_0_30px_rgba(212,168,67,0.3)] transition-transform hover:scale-[1.03] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d4a843] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0b1020]"
            >
              Begin the journey
            </a>
            <a
              href="#process"
              className="rounded-full border border-[#232c48] px-7 py-3 font-sans text-sm font-semibold text-[#e8ecf4] transition-colors hover:bg-[#141b30] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d4a843] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0b1020]"
            >
              See the process
            </a>
          </motion.div>

          {/* stats row */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.7 }}
            className="mt-14 grid grid-cols-2 gap-x-8 gap-y-6 sm:grid-cols-4"
          >
            {stats.map((s) => (
              <div key={s.label}>
                <div className="font-serif text-3xl font-semibold text-[#e8ecf4]">
                  <CountUp value={s.value} />
                </div>
                <div className="mt-1.5 text-xs leading-snug text-[#8a93a8]">
                  {s.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* scroll hint */}
      <motion.a
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-1 font-mono text-[10px] uppercase tracking-[0.3em] text-[#8a93a8]"
      >
        Begin the journey
        {reduce ? (
          <ChevronDown size={18} className="text-[#8a93a8]" />
        ) : (
          <motion.span
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronDown size={18} className="text-[#8a93a8]" />
          </motion.span>
        )}
      </motion.a>
    </section>
  );
}
