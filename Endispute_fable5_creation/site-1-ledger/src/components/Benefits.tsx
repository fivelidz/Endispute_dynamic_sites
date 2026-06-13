"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { benefits } from "@/lib/content";
import { MaskReveal, DrawRule, Coord } from "./primitives";

export default function Benefits() {
  const [hover, setHover] = useState<number | null>(null);

  return (
    <section
      id="benefits"
      className="relative border-t border-[#d6d2c8] bg-[#f4f2ed] px-5 py-20 md:px-10 md:py-28"
    >
      <div className="mx-auto max-w-[1600px]">
        <div className="mb-10 flex items-start justify-between">
          <Coord label="A3 / 02 — Benefits" />
          <Coord label="§ Why Endispute" />
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-12">
          <div className="md:col-span-4">
            <h2 className="font-display font-semibold text-[clamp(2.2rem,5vw,4rem)] uppercase leading-[0.9] tracking-[-0.02em] text-[#0a0a0a]">
              <MaskReveal>Why</MaskReveal>
              <MaskReveal delay={0.08}>
                Resolve<span className="text-[#d92b1c]">.</span>
              </MaskReveal>
            </h2>
            <p className="mt-5 max-w-xs font-mono text-[12px] uppercase leading-relaxed tracking-[0.08em] text-[#8a877f]">
              Five reasons complex disputes belong in a managed process — not in
              public litigation.
            </p>
          </div>

          {/* Table-like list */}
          <div className="md:col-span-8">
            {benefits.map((b, i) => {
              const active = hover === i;
              return (
                <div
                  key={b.title}
                  onMouseEnter={() => setHover(i)}
                  onMouseLeave={() => setHover(null)}
                  className="group relative"
                >
                  <DrawRule
                    color={active ? "#d92b1c" : "#d6d2c8"}
                    thickness={active ? 2 : 1}
                    delay={i * 0.05}
                  />
                  <div className="grid grid-cols-12 items-baseline gap-3 py-6 transition-colors">
                    <span
                      className="col-span-2 font-mono text-sm tabular-nums tracking-[0.1em] text-[#d92b1c] md:col-span-1"
                    >
                      0{i + 1}
                    </span>
                    <h3
                      className={`col-span-10 font-display text-xl font-medium leading-snug transition-colors md:col-span-5 ${
                        active ? "text-[#d92b1c]" : "text-[#0a0a0a]"
                      }`}
                    >
                      {b.title}
                    </h3>
                    <p className="col-span-12 font-display text-base leading-snug text-[#8a877f] md:col-span-6">
                      {b.detail}
                    </p>
                  </div>
                </div>
              );
            })}
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.9, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="h-px w-full origin-left bg-[#d6d2c8]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
