"use client";

import { motion } from "motion/react";
import { processSteps } from "@/lib/content";
import { MaskReveal, Coord } from "./primitives";

export default function ProcessSteps() {
  return (
    <section
      id="process"
      className="relative border-t border-[#d6d2c8] px-5 py-20 md:px-10 md:py-28"
    >
      <div className="mx-auto max-w-[1600px]">
        <div className="mb-10 flex items-start justify-between">
          <Coord label="A4 / 03 — Process" />
          <Coord label="§ Four Stages" />
        </div>

        <h2 className="mb-12 font-display font-semibold text-[clamp(2.2rem,6vw,5rem)] uppercase leading-[0.88] tracking-[-0.02em] text-[#0a0a0a]">
          <MaskReveal>The Process</MaskReveal>
          <MaskReveal delay={0.08}>
            Ledger<span className="text-[#d92b1c]">.</span>
          </MaskReveal>
        </h2>

        {/* 2x2 grid with visible grid lines */}
        <div className="grid grid-cols-1 border-l border-t border-[#d6d2c8] md:grid-cols-2">
          {processSteps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: (i % 2) * 0.08 }}
              className="group relative border-b border-r border-[#d6d2c8] p-7 transition-colors hover:bg-[#0a0a0a] md:p-10"
            >
              {/* Massive index */}
              <div className="mb-5 flex items-baseline justify-between">
                <span className="font-heavy text-[clamp(3rem,7vw,6rem)] leading-none text-[#d6d2c8] transition-colors group-hover:text-[#d92b1c]">
                  {step.number}
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#8a877f] transition-colors group-hover:text-[#f4f2ed]">
                  Stage {step.number}
                </span>
              </div>

              <h3 className="mb-3 font-display text-2xl font-semibold leading-tight text-[#0a0a0a] transition-colors group-hover:text-[#f4f2ed]">
                {step.title}
              </h3>
              <p className="mb-6 max-w-md font-display text-base leading-snug text-[#8a877f] transition-colors group-hover:text-[#c9c6bd]">
                {step.summary}
              </p>

              <ul className="space-y-2">
                {step.details.map((d, di) => (
                  <li
                    key={di}
                    className="flex gap-3 font-mono text-[12px] leading-snug text-[#0a0a0a] transition-colors group-hover:text-[#c9c6bd]"
                  >
                    <span className="shrink-0 text-[#d92b1c]">
                      {String(di + 1).padStart(2, "0")}
                    </span>
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
