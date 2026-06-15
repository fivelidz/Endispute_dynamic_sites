"use client";

import { motion } from "motion/react";
import { Sparkles, Building2 } from "lucide-react";
import { panels, clients } from "@/lib/content";

export default function Panels() {
  return (
    <section id="panels" className="section-pad relative px-4">
      {/* Architectural blueprint backdrop — faint structural column gridlines */}
      <div
        aria-hidden="true"
        className="blueprint-grid pointer-events-none absolute inset-0 -z-10 mx-auto max-w-6xl opacity-70"
      />
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mb-12 max-w-2xl"
        >
          <span className="font-mono text-xs font-medium uppercase tracking-wider text-[#a69b92]">
            Expertise
          </span>
          <h2
            className="mt-3 font-display text-4xl text-[#1f1c1b] sm:text-5xl"
            style={{ fontWeight: 350, letterSpacing: "-0.01em", lineHeight: 1.0 }}
          >
            Panels of specialist experts.
          </h2>
        </motion.div>

        <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          {/* Intro + expertise pills */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="glass rounded-[2rem] bg-white/55 p-8"
          >
            <p className="text-base leading-relaxed text-[#1f1c1b]/90">
              {panels.intro}
            </p>

            <div className="mt-7 flex flex-wrap gap-2.5">
              {panels.expertise.map((e) => (
                <span
                  key={e}
                  className="group glass cursor-default rounded-full bg-white/60 px-4 py-2 text-sm font-medium text-[#1f1c1b] transition-colors hover:border-[#ff7714]/60 hover:text-[#ff7714]"
                >
                  {e}
                </span>
              ))}
            </div>

            <div className="mt-7 flex gap-3 rounded-2xl bg-[#ff7714]/8 p-5">
              <Sparkles
                size={20}
                className="mt-0.5 flex-shrink-0 text-[#ff7714]"
                strokeWidth={2}
              />
              <p className="text-sm leading-relaxed text-[#1f1c1b]/85">
                {panels.expertNote}
              </p>
            </div>
          </motion.div>

          {/* NBN dark slate glass card — explicit high-contrast hex */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="glass-dark flex flex-col rounded-[2rem] bg-[#1f1c1b]/90 p-8"
          >
            <span className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-white/12">
              <Building2 size={22} className="text-[#f5f4f0]" strokeWidth={2} />
            </span>
            <span className="font-mono text-xs font-medium uppercase tracking-wider text-[#ff7714]">
              {clients.featured.relation}
            </span>
            <h3 className="mt-3 font-display text-2xl font-medium text-[#f5f4f0]">
              {clients.featured.name}
            </h3>
            <p className="mt-4 text-[15px] leading-relaxed text-[#f5f4f0]/85">
              {clients.featured.detail}
            </p>
            <div className="mt-auto pt-6">
              <p className="border-t border-white/12 pt-5 text-sm leading-relaxed text-[#f5f4f0]/70">
                {clients.privacy}
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
