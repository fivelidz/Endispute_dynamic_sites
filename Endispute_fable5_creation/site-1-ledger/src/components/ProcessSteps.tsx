"use client";

import { motion } from "motion/react";
import { processSteps } from "@/lib/content";
import { MaskReveal, SectionHead } from "./primitives";

export default function ProcessSteps() {
  return (
    <section
      id="process"
      className="relative border-t border-[#e3e0d8] px-5 py-24 md:px-10 md:py-32"
    >
      <div className="mx-auto max-w-[1240px]">
        <SectionHead label="Process — Four Stages" />

        <h2 className="mb-16 font-display text-[clamp(2.6rem,6vw,5rem)] font-light leading-[0.95] tracking-[-0.02em] text-[#0a0a0a]">
          <MaskReveal>How a dispute</MaskReveal>
          <MaskReveal delay={0.08}>is managed.</MaskReveal>
        </h2>

        {/* Stacked stages with hairline separation */}
        <div className="border-t border-[#0a0a0a]">
          {processSteps.map((step) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
              className="grid grid-cols-1 gap-6 border-b border-[#e3e0d8] py-10 md:grid-cols-12 md:gap-10 md:py-14"
            >
              {/* Number + title */}
              <div className="md:col-span-4">
                <span className="font-display text-[1.6rem] font-light leading-none text-[#6b6b6b]">
                  {step.number}
                </span>
                <h3 className="mt-3 font-display text-[1.75rem] font-medium leading-[1.1] tracking-[-0.01em] text-[#0a0a0a]">
                  {step.title}
                </h3>
              </div>

              {/* Summary + key points */}
              <div className="md:col-span-8">
                <p className="measure text-[16px] leading-[1.7] text-[#444444]">
                  {step.summary}
                </p>
                <ul className="mt-6 space-y-3">
                  {step.details.map((d, di) => (
                    <li
                      key={di}
                      className="flex gap-3 text-[14px] leading-[1.6] text-[#6b6b6b]"
                    >
                      <span aria-hidden className="mt-[0.55em] h-px w-3 shrink-0 bg-[#c4c0b6]" />
                      <span className="measure">{d}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
