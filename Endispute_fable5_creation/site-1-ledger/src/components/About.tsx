"use client";

import { motion } from "motion/react";
import { company } from "@/lib/content";
import { MaskReveal, DrawRule, Coord } from "./primitives";

export default function About() {
  return (
    <section id="about" className="relative px-5 py-20 md:px-10 md:py-28">
      <div className="mx-auto max-w-[1600px]">
        {/* Section header */}
        <div className="mb-12 flex items-start justify-between">
          <Coord label="A2 / 01 — About" />
          <Coord label="§ Who We Are" />
        </div>

        <DrawRule className="mb-12" color="#0a0a0a" thickness={2} />

        <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-12">
          {/* Heading — left third */}
          <div className="md:col-span-4">
            <span className="mb-4 block font-mono text-[11px] uppercase tracking-[0.2em] text-[#d92b1c]">
              ▪ 01
            </span>
            <h2 className="font-display font-semibold text-[clamp(2.2rem,5vw,4rem)] uppercase leading-[0.9] tracking-[-0.02em] text-[#0a0a0a]">
              <MaskReveal>Leaders in</MaskReveal>
              <MaskReveal delay={0.08}>Conflict</MaskReveal>
              <MaskReveal delay={0.16}>Resolution</MaskReveal>
            </h2>
          </div>

          {/* Body — right two-thirds */}
          <div className="md:col-span-8">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              <div>
                <span className="mb-3 block font-mono text-[11px] uppercase tracking-[0.18em] text-[#8a877f]">
                  / What we do
                </span>
                <motion.p
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.7 }}
                  className="font-display text-lg leading-snug text-[#0a0a0a]"
                >
                  {company.about}
                </motion.p>
              </div>
              <div>
                <span className="mb-3 block font-mono text-[11px] uppercase tracking-[0.18em] text-[#8a877f]">
                  / Who we are
                </span>
                <motion.p
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.7, delay: 0.1 }}
                  className="font-display text-lg leading-snug text-[#0a0a0a]"
                >
                  {company.whoWeAre}
                </motion.p>
              </div>
            </div>

            <DrawRule className="my-8" delay={0.2} />

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="max-w-3xl font-display text-base leading-relaxed text-[#8a877f]"
            >
              {company.mission}
            </motion.p>
          </div>
        </div>
      </div>
    </section>
  );
}
