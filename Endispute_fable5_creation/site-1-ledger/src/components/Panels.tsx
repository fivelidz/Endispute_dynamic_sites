"use client";

import { motion } from "motion/react";
import { panels, clients } from "@/lib/content";
import { MaskReveal, Reveal, SectionHead, SnapIn } from "./primitives";

export default function Panels() {
  return (
    <section
      id="panel"
      className="relative border-t border-[#e3e0d8] px-5 py-24 md:px-10 md:py-32"
    >
      <div className="mx-auto max-w-[1240px]">
        <SectionHead label="Panel — Expertise" />

        <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-16">
          {/* Heading + intro */}
          <div className="md:col-span-5">
            <h2 className="font-display text-[clamp(2.4rem,5vw,4rem)] font-light leading-[0.98] tracking-[-0.02em] text-[#0a0a0a]">
              <MaskReveal>Specialist</MaskReveal>
              <MaskReveal delay={0.08}>panel.</MaskReveal>
            </h2>
            <Reveal as="p" className="measure mt-8 text-[16px] leading-[1.7] text-[#0a0a0a]">
              {panels.intro}
            </Reveal>
            <Reveal
              as="p"
              delay={0.1}
              className="measure mt-6 text-[15px] leading-[1.7] text-[#6b6b6b]"
            >
              {panels.expertNote}
            </Reveal>
          </div>

          {/* Expertise tags + NBN card */}
          <div className="md:col-span-7">
            <span className="eyebrow mb-5 block">Areas of expertise</span>
            <div className="flex flex-wrap gap-2.5">
              {panels.expertise.map((e, i) => (
                <motion.span
                  key={e}
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.4, delay: i * 0.04, ease: [0.22, 1, 0.36, 1] }}
                  className="rounded-[2px] border border-[#e3e0d8] px-4 py-2 text-[13px] leading-none text-[#444444]"
                >
                  {e}
                </motion.span>
              ))}
            </div>

            {/* NBN callout — black card */}
            <SnapIn className="mt-10">
              <div className="rounded-[8px] bg-[#0a0a0a] p-8 md:p-10">
                <span className="block text-[12px] font-medium uppercase tracking-[0.14em] text-[#9a9a9a]">
                  Featured Appointment — {clients.featured.relation}
                </span>
                <h3 className="mt-4 font-display text-[1.75rem] font-medium leading-[1.15] tracking-[-0.01em] text-[#fefefc] md:text-[2.1rem]">
                  {clients.featured.name}
                </h3>
                <p className="measure mt-4 text-[15px] leading-[1.7] text-[#c9c6bd]">
                  {clients.featured.detail}
                </p>
                <p className="mt-7 border-t border-[#2a2a28] pt-5 text-[13px] leading-[1.6] text-[#9a9a9a]">
                  {clients.privacy}
                </p>
              </div>
            </SnapIn>
          </div>
        </div>
      </div>
    </section>
  );
}
