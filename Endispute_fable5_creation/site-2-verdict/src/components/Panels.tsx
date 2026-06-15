"use client";

import { motion, useReducedMotion } from "motion/react";
import { panels, clients } from "@/lib/content";

const ease = [0.22, 1, 0.36, 1] as const;

export default function Panels() {
  const reduce = useReducedMotion();
  return (
    <section
      id="panel"
      className="relative bg-[#0a0a0a] px-6 py-20 text-[#cccccc] md:py-24"
    >
      <div className="measure">
        <p className="mono-label mb-5 text-[#cccccc]">06 — The Panel</p>
        <h2 className="display max-w-3xl text-[clamp(2rem,4.5vw,3.25rem)]">
          Specialist experts &amp;{" "}
          <span className="text-[#fc1c46]">retired judiciary</span>.
        </h2>

        <div className="mt-12 grid gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <motion.p
              initial={reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={reduce ? { duration: 0 } : { duration: 0.7, ease }}
              className="max-w-xl text-[16px] leading-[1.5] text-[#cccccc]"
            >
              {panels.intro}
            </motion.p>

            <div className="mt-9 flex flex-wrap gap-2.5">
              {panels.expertise.map((e, i) => (
                <motion.span
                  key={e}
                  initial={reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={reduce ? { duration: 0 } : { duration: 0.4, delay: i * 0.04 }}
                  className="border border-[#4c4c4c] px-4 py-2 font-mono text-[11px] uppercase tracking-[0.1em] text-[#cccccc]"
                >
                  {e}
                </motion.span>
              ))}
            </div>

            <p className="mt-9 max-w-xl text-[15px] leading-[1.5] text-[#cccccc]">
              {panels.expertNote}
            </p>
          </div>

          {/* NBN highlight — ink card with vermilion seam on left edge */}
          <motion.aside
            initial={reduce ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={reduce ? { duration: 0 } : { duration: 0.8, ease }}
            className="relative overflow-hidden border border-[#4c4c4c] bg-[#1a1a1a] p-9 text-[#cccccc]"
          >
            <span className="absolute left-0 top-0 h-full w-[3px] bg-[#fc1c46]" />
            <p className="mono-label text-[#cccccc]">{clients.featured.relation}</p>
            <h3 className="mt-5 font-serif text-3xl italic text-white">
              {clients.featured.name}
            </h3>
            <p className="mt-5 text-[15px] leading-[1.5] text-[#cccccc]">
              {clients.featured.detail}
            </p>
            <p className="mt-8 border-t border-[#4c4c4c] pt-6 text-[14px] leading-[1.5] text-[#cccccc]">
              {clients.privacy}
            </p>
          </motion.aside>
        </div>
      </div>
    </section>
  );
}
