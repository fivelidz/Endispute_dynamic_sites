"use client";

import { motion, useReducedMotion } from "motion/react";
import { company, stats } from "@/lib/content";
import { MaskReveal, CountUp } from "./primitives";

/* Parse a stat value into a numeric part + prefix/suffix so we can count up
   where it makes sense, otherwise just render the string. */
function StatValue({ value }: { value: string }) {
  // $2B+  -> prefix "$", number 2, suffix "B+"
  // 48hr  -> number 48, suffix "hr"
  const match = value.match(/^([^\d]*)(\d+)(.*)$/);
  if (match) {
    const [, prefix, num, suffix] = match;
    return (
      <CountUp
        value={parseInt(num, 10)}
        prefix={prefix}
        suffix={suffix}
        className="font-heavy text-3xl leading-none text-[#0a0a0a] md:text-4xl"
      />
    );
  }
  return (
    <span className="font-heavy text-2xl leading-none text-[#0a0a0a] md:text-3xl">
      {value}
    </span>
  );
}

export default function Hero() {
  const reduce = useReducedMotion();

  return (
    <section
      id="top"
      className="relative border-b border-[#d6d2c8] px-5 pb-12 pt-32 md:px-10 md:pt-40"
    >
      <div className="mx-auto max-w-[1600px]">
        {/* Top coordinate row */}
        <div className="mb-10 flex items-start justify-between border-b border-[#d6d2c8] pb-4">
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#8a877f]">
            Endispute — Index 00 / Hero
          </span>
          <span className="hidden text-right font-mono text-[11px] uppercase leading-relaxed tracking-[0.2em] text-[#8a877f] md:block">
            A1 / 04
            <br />
            Lat. 33°S — Sydney, AU
          </span>
        </div>

        {/* Massive heading */}
        <h1 className="font-heavy uppercase leading-[0.86] tracking-[-0.02em] text-[#0a0a0a]">
          <span className="block text-[clamp(3.2rem,13vw,12rem)]">
            <MaskReveal>End Your</MaskReveal>
          </span>
          <span className="block text-[clamp(3.2rem,13vw,12rem)]">
            <MaskReveal delay={0.1}>
              Dispute<span className="text-[#d92b1c]">.</span>
            </MaskReveal>
          </span>
        </h1>

        {/* Sub row: pitch + tagline */}
        <div className="mt-10 grid grid-cols-1 gap-6 border-t border-[#d6d2c8] pt-6 md:grid-cols-12">
          <div className="md:col-span-3">
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#d92b1c]">
              ▪ {company.shortPitch}
            </span>
          </div>
          <motion.p
            initial={reduce ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="max-w-2xl font-display text-lg leading-snug text-[#0a0a0a] md:col-span-6 md:text-xl"
          >
            Dispute resolution, advisory and management for complex disputes —
            tailored to industry, commercial corporations and all who do
            business with them.
          </motion.p>
          <div className="md:col-span-3 md:text-right">
            <a
              href="#contact"
              className="inline-block bg-[#0a0a0a] px-5 py-3 font-mono text-[12px] uppercase tracking-[0.15em] text-[#f4f2ed] transition-colors hover:bg-[#d92b1c] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d92b1c] focus-visible:ring-offset-2 focus-visible:ring-offset-[#f4f2ed]"
            >
              Complimentary Intake →
            </a>
          </div>
        </div>

        {/* Stats row */}
        <div className="mt-12 grid grid-cols-2 border-t border-[#d6d2c8] md:grid-cols-4">
          {stats.map((s, i) => (
            <div
              key={s.label}
              className="flex flex-col gap-2 border-[#d6d2c8] px-0 py-6 md:px-6 md:[&:not(:first-child)]:border-l"
            >
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#d92b1c]">
                0{i + 1}
              </span>
              <StatValue value={s.value} />
              <span className="font-mono text-[11px] uppercase leading-snug tracking-[0.08em] text-[#8a877f]">
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
