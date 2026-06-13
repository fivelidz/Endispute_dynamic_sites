"use client";

import { motion, useReducedMotion } from "motion/react";
import { company, contact, stats } from "@/lib/content";
import { UnderlineFlourish } from "@/lib/flourishes";

const headlineWords = ["Let", "it", "be", "resolved."];
const aboutFirstLine = company.about.split(". ")[0] + ".";

export default function Hero() {
  const reduce = useReducedMotion();

  return (
    <section
      id="top"
      className="relative mx-auto max-w-5xl px-5 pb-28 pt-24 text-center md:pt-32"
    >
      <motion.p
        initial={reduce ? false : { opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="smallcaps mb-7 text-[16px] text-[#7a6a55]"
      >
        In the matter of your dispute
      </motion.p>

      <h1 className="font-garamond text-5xl font-500 leading-[1.05] text-[#2b2118] sm:text-6xl md:text-7xl lg:text-8xl">
        {headlineWords.map((word, i) => (
          <motion.span
            key={i}
            className="inline-block"
            initial={
              reduce ? false : { opacity: 0, filter: "blur(4px)", y: 6 }
            }
            animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
            transition={{
              duration: 0.9,
              delay: 0.3 + i * 0.22,
              ease: "easeOut",
            }}
          >
            {word}
            {i < headlineWords.length - 1 ? "\u00A0" : ""}
          </motion.span>
        ))}
      </h1>

      <div className="mx-auto mt-3 flex justify-center">
        <UnderlineFlourish
          draw={!reduce}
          className="h-6 w-[320px] md:w-[420px]"
          duration={1.4}
        />
      </div>

      <motion.p
        initial={reduce ? false : { opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.3 }}
        className="mx-auto mt-8 max-w-2xl font-garamond text-xl italic leading-relaxed text-[#7a6a55] md:text-2xl"
      >
        {company.shortPitch}.
      </motion.p>

      <motion.p
        initial={reduce ? false : { opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.45 }}
        className="mx-auto mt-4 max-w-2xl font-garamond text-lg leading-relaxed text-[#2b2118]"
      >
        {aboutFirstLine}
      </motion.p>

      <motion.div
        initial={reduce ? false : { opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.6 }}
        className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
      >
        <a
          href="#contact"
          className="smallcaps rounded-sm bg-[#9e3b2b] px-8 py-3 text-[16px] text-[#f7f1e3] shadow-sm transition-colors hover:bg-[#86311f] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9e3b2b] focus-visible:ring-offset-2 focus-visible:ring-offset-[#f7f1e3]"
        >
          Begin a consultation
        </a>
        <a
          href="#articles"
          className="smallcaps rounded-sm border border-[#2b2118]/40 px-8 py-3 text-[16px] text-[#2b2118] transition-colors hover:border-[#2b2118] hover:bg-[#2b2118]/[0.04] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9e3b2b] focus-visible:ring-offset-2 focus-visible:ring-offset-[#f7f1e3]"
        >
          Read the process
        </a>
      </motion.div>

      {/* Stats row with small-caps labels and hairline rules */}
      <motion.div
        initial={reduce ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.9, delay: 1.8 }}
        className="mx-auto mt-16 grid max-w-3xl grid-cols-2 gap-px overflow-hidden border-y border-[#2b2118]/15 md:grid-cols-4"
      >
        {stats.map((s) => (
          <div key={s.label} className="px-3 py-5 text-center">
            <div className="font-garamond text-2xl font-600 text-[#2b2118] md:text-3xl">
              {s.value}
            </div>
            <div className="smallcaps mt-1 text-[12px] leading-tight text-[#7a6a55]">
              {s.label}
            </div>
          </div>
        ))}
      </motion.div>

      <motion.p
        initial={reduce ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.9, delay: 2 }}
        className="mt-6 font-mono-quill text-xs text-[#7a6a55]"
      >
        {contact.reach} · responses within {contact.responseWindow}
      </motion.p>
    </section>
  );
}
