"use client";

import { motion } from "motion/react";
import { panels, clients } from "@/lib/content";
import { MaskReveal, Coord, DrawRule, SnapIn } from "./primitives";

export default function Panels() {
  return (
    <section
      id="panel"
      className="relative border-t border-[#d6d2c8] px-5 py-20 md:px-10 md:py-28"
    >
      <div className="mx-auto max-w-[1600px]">
        <div className="mb-10 flex items-start justify-between">
          <Coord label="A6 / 05 — Panel" />
          <Coord label="§ Expertise" />
        </div>

        <div className="grid grid-cols-1 gap-12 md:grid-cols-12">
          {/* Heading + intro */}
          <div className="md:col-span-5">
            <h2 className="font-display font-semibold text-[clamp(2.2rem,5vw,4rem)] uppercase leading-[0.9] tracking-[-0.02em] text-[#0a0a0a]">
              <MaskReveal>Specialist</MaskReveal>
              <MaskReveal delay={0.08}>
                Panel<span className="text-[#d92b1c]">.</span>
              </MaskReveal>
            </h2>
            <DrawRule className="my-7" color="#0a0a0a" thickness={2} />
            <p className="font-display text-lg leading-snug text-[#0a0a0a]">
              {panels.intro}
            </p>
            <p className="mt-5 font-display text-base leading-relaxed text-[#8a877f]">
              {panels.expertNote}
            </p>
          </div>

          {/* Expertise tags + NBN card */}
          <div className="md:col-span-7">
            <span className="mb-4 block font-mono text-[11px] uppercase tracking-[0.18em] text-[#8a877f]">
              / Areas of expertise — {panels.expertise.length} fields
            </span>
            <div className="grid grid-cols-2 border-l border-t border-[#d6d2c8] sm:grid-cols-3">
              {panels.expertise.map((e, i) => (
                <motion.div
                  key={e}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.4, delay: i * 0.04 }}
                  className="group flex flex-col gap-2 border-b border-r border-[#d6d2c8] p-5 transition-colors hover:bg-[#0a0a0a]"
                >
                  <span className="font-mono text-[10px] tracking-[0.2em] text-[#d92b1c]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="font-mono text-[13px] uppercase leading-tight tracking-[0.06em] text-[#0a0a0a] transition-colors group-hover:text-[#f4f2ed]">
                    {e}
                  </span>
                </motion.div>
              ))}
            </div>

            {/* NBN callout — black card */}
            <SnapIn className="mt-8">
              <div className="relative bg-[#0a0a0a] p-7 md:p-9">
                <span className="absolute right-6 top-6 font-heavy text-5xl leading-none text-[#d92b1c]">
                  ▪
                </span>
                <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#d92b1c]">
                  ▪ Featured Appointment — {clients.featured.relation}
                </span>
                <h3 className="mt-4 font-heavy text-2xl uppercase leading-tight text-[#f4f2ed] md:text-3xl">
                  {clients.featured.name}
                </h3>
                <p className="mt-4 max-w-xl font-display text-base leading-snug text-[#c9c6bd]">
                  {clients.featured.detail}
                </p>
                <p className="mt-6 border-t border-[#3a3a37] pt-4 font-mono text-[11px] uppercase leading-relaxed tracking-[0.08em] text-[#8a877f]">
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
