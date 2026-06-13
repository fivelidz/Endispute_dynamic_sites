"use client";

import { motion, useReducedMotion } from "motion/react";
import { panels, clients } from "@/lib/content";

const ease = [0.22, 1, 0.36, 1] as const;

export default function Panels() {
  const reduce = useReducedMotion();
  return (
    <section
      id="panel"
      className="relative bg-[#f6f1e7] px-6 py-28 text-[#16191d] md:py-36"
    >
      <div className="mx-auto max-w-6xl">
        <p className="mono-label mb-5 text-[#6e6a60]">06 — The Panel</p>
        <h2 className="max-w-3xl font-serif text-4xl leading-tight sm:text-5xl">
          Specialist experts &amp; <span className="italic text-[#c8472b]">retired judiciary</span>.
        </h2>

        <div className="mt-14 grid gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <motion.p
              initial={reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={reduce ? { duration: 0 } : { duration: 0.7, ease }}
              className="max-w-xl text-[15px] leading-relaxed text-[#6e6a60]"
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
                  className="border border-[#16191d]/20 px-4 py-2 font-mono text-[11px] uppercase tracking-[0.1em] text-[#16191d]"
                >
                  {e}
                </motion.span>
              ))}
            </div>

            <p className="mt-9 max-w-xl text-[14px] leading-relaxed text-[#6e6a60]">
              {panels.expertNote}
            </p>
          </div>

          {/* NBN highlight — ink card with vermilion seam on left edge */}
          <motion.aside
            initial={reduce ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={reduce ? { duration: 0 } : { duration: 0.8, ease }}
            className="relative overflow-hidden bg-[#101418] p-9 text-[#efe9dc]"
          >
            <span className="absolute left-0 top-0 h-full w-[4px] bg-[#c8472b]" />
            <p className="mono-label text-[#b8ae98]">{clients.featured.relation}</p>
            <h3 className="mt-5 font-serif text-3xl italic text-[#c8472b]">
              {clients.featured.name}
            </h3>
            <p className="mt-5 text-[14px] leading-relaxed text-[#b8ae98]">
              {clients.featured.detail}
            </p>
            <p className="mt-8 border-t border-[#efe9dc]/12 pt-6 text-[13px] leading-relaxed text-[#b8ae98]">
              {clients.privacy}
            </p>
          </motion.aside>
        </div>
      </div>
    </section>
  );
}
