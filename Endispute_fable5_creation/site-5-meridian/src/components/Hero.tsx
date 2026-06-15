"use client";

import { motion, useReducedMotion } from "motion/react";
import { ChevronDown } from "lucide-react";
import { company } from "@/lib/content";

// Override the placeholder numeric stats from content (e.g. "$0B+", "48hr")
// with credible, non-numeric value propositions that actually sell the service.
const valueProps = [
  "Senior, independent panel members",
  "Confidential & without prejudice",
  "Facilitative, advisory & determinative",
  "A cost-effective alternative to litigation",
] as const;

export default function Hero() {
  const reduce = useReducedMotion();
  return (
    <section
      id="top"
      className="relative flex min-h-screen items-center overflow-hidden px-6 pt-28 pb-16"
    >
      <div className="mx-auto w-full max-w-[1200px] lg:pl-[8%]">
        <div className="max-w-3xl">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.3em] text-[#9a9a9a]"
          >
            <span className="relative flex h-2.5 w-2.5">
              {!reduce && (
                <motion.span
                  className="absolute inline-flex h-full w-full rounded-full bg-[#ffffff]"
                  animate={{ scale: [1, 2.4, 1], opacity: [0.7, 0, 0.7] }}
                  transition={{ duration: 2.4, repeat: Infinity, ease: "easeOut" }}
                />
              )}
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#ffffff] shadow-[0_0_10px_rgba(255,255,255,0.9)]" />
            </span>
            {company.shortPitch}
          </motion.p>

          {/* mask-reveal headline */}
          <h1 className="font-serif text-5xl font-light leading-[1.05] tracking-tight text-[#ffffff] sm:text-6xl lg:text-7xl">
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
                <span className="italic text-[#8052ff]" style={{ textShadow: "0 0 30px rgba(128,82,255,0.4)" }}>
                  resolution.
                </span>
              </motion.span>
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="mt-6 max-w-xl text-[17px] leading-relaxed text-[#bdbdbd]"
          >
            When a complex dispute threatens your commercial relationships,
            Endispute charts the fastest, most discreet course to resolution —
            led by senior, independent panel members across Australia and
            internationally.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.55 }}
            className="mt-8 flex flex-wrap items-center gap-4"
          >
            <a
              href="#contact"
              className="rounded-full bg-[#8052ff] px-7 py-3 font-sans text-sm font-semibold text-[#ffffff] transition-transform hover:scale-[1.03] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8052ff] focus-visible:ring-offset-2 focus-visible:ring-offset-[#000000]"
            >
              Start a confidential conversation
            </a>
            <a
              href="#process"
              className="rounded-full border border-[#26262e] px-7 py-3 font-sans text-sm font-semibold text-[#ffffff] transition-colors hover:bg-[#0c0c12] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8052ff] focus-visible:ring-offset-2 focus-visible:ring-offset-[#000000]"
            >
              See the process
            </a>
          </motion.div>

          {/* value props — qualitative strengths that sell (no fabricated numbers) */}
          <motion.ul
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.7 }}
            className="mt-11 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-3 sm:grid-cols-2"
          >
            {valueProps.map((v) => (
              <li key={v} className="flex items-start gap-3 text-[15px] leading-snug text-[#bdbdbd]">
                <span
                  aria-hidden
                  className="mt-[7px] block h-1.5 w-1.5 shrink-0 rounded-full bg-[#8052ff]"
                />
                {v}
              </li>
            ))}
          </motion.ul>
        </div>
      </div>

      {/* scroll hint */}
      <motion.a
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-1 font-mono text-[10px] uppercase tracking-[0.3em] text-[#9a9a9a]"
      >
        Scroll the journey
        {reduce ? (
          <ChevronDown size={18} className="text-[#9a9a9a]" />
        ) : (
          <motion.span
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronDown size={18} className="text-[#9a9a9a]" />
          </motion.span>
        )}
      </motion.a>
    </section>
  );
}
