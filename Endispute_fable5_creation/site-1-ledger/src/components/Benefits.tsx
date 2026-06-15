"use client";

import { motion } from "motion/react";
import { benefits } from "@/lib/content";
import { MaskReveal, SectionHead } from "./primitives";

export default function Benefits() {
  return (
    <section
      id="benefits"
      className="relative border-t border-[#e3e0d8] px-5 py-24 md:px-10 md:py-32"
    >
      <div className="mx-auto max-w-[1240px]">
        <SectionHead label="Benefits — Why Endispute" />

        <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-4">
            <h2 className="font-display text-[clamp(2.4rem,5vw,4rem)] font-light leading-[0.98] tracking-[-0.02em] text-[#0a0a0a]">
              <MaskReveal>Why</MaskReveal>
              <MaskReveal delay={0.08}>resolve.</MaskReveal>
            </h2>
            <p className="measure-tight mt-6 text-[15px] leading-[1.65] text-[#6b6b6b]">
              Five reasons complex disputes belong in a managed process — not in
              public litigation.
            </p>
          </div>

          {/* List */}
          <div className="md:col-span-8">
            <div className="border-t border-[#e3e0d8]">
              {benefits.map((b, i) => (
                <motion.div
                  key={b.title}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.5, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
                  className="grid grid-cols-1 gap-2 border-b border-[#e3e0d8] py-7 md:grid-cols-12 md:gap-6"
                >
                  <h3 className="font-display text-[1.45rem] font-medium leading-[1.15] tracking-[-0.01em] text-[#0a0a0a] md:col-span-5">
                    {b.title}
                  </h3>
                  <p className="text-[15px] leading-[1.65] text-[#6b6b6b] md:col-span-7">
                    {b.detail}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
