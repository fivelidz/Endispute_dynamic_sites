"use client";

import { motion, useReducedMotion } from "motion/react";
import { company, stats } from "@/lib/content";
import { MaskReveal, CountUp } from "./primitives";

/* Parse a stat value into a numeric part + prefix/suffix so we can count up
   where it makes sense, otherwise just render the string. */
function StatValue({ value }: { value: string }) {
  const match = value.match(/^([^\d]*)(\d+)(.*)$/);
  if (match) {
    const [, prefix, num, suffix] = match;
    return (
      <CountUp
        value={parseInt(num, 10)}
        prefix={prefix}
        suffix={suffix}
        className="font-display text-4xl font-light leading-none tracking-[-0.02em] text-[#0a0a0a] md:text-5xl"
      />
    );
  }
  return (
    <span className="font-display text-3xl font-light leading-none tracking-[-0.01em] text-[#0a0a0a] md:text-4xl">
      {value}
    </span>
  );
}

export default function Hero() {
  const reduce = useReducedMotion();

  return (
    <section
      id="top"
      className="relative border-b border-[#e3e0d8] px-5 pb-16 pt-32 md:px-10 md:pb-24 md:pt-44"
    >
      <div className="mx-auto max-w-[1240px]">
        {/* Eyebrow */}
        <motion.span
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="eyebrow mb-8 block"
        >
          {company.shortPitch} — Australia &amp; Internationally
        </motion.span>

        {/* Display heading — thin serif */}
        <h1 className="font-display font-light leading-[0.95] tracking-[-0.02em] text-[#0a0a0a]">
          <span className="block text-[clamp(3.4rem,11vw,7.5rem)]">
            <MaskReveal>End Your</MaskReveal>
          </span>
          <span className="block text-[clamp(3.4rem,11vw,7.5rem)]">
            <MaskReveal delay={0.1}>Dispute.</MaskReveal>
          </span>
        </h1>

        {/* Pitch + CTA */}
        <div className="mt-12 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <motion.p
            initial={reduce ? false : { opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="measure text-[17px] leading-[1.65] text-[#444444]"
          >
            Dispute resolution, advisory and management for complex disputes —
            tailored to industry, commercial corporations and all who do
            business with them.
          </motion.p>
          <a
            href="#contact"
            className="inline-block shrink-0 rounded-[2px] bg-[#0a0a0a] px-6 py-3.5 text-[13px] font-medium tracking-[0.02em] text-[#fefefc] transition-opacity hover:opacity-85"
          >
            Complimentary Intake
          </a>
        </div>

        {/* Stats row */}
        <div className="mt-16 grid grid-cols-2 gap-x-8 gap-y-10 border-t border-[#e3e0d8] pt-10 md:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="flex flex-col gap-2.5">
              <StatValue value={s.value} />
              <span className="text-[12px] leading-[1.5] text-[#6b6b6b]">
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
