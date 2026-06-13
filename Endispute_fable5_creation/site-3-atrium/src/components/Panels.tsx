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
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mb-12 max-w-2xl"
        >
          <span className="font-mono text-xs font-medium uppercase tracking-wider text-[#2563ab]">
            Expertise
          </span>
          <h2
            className="mt-3 font-display text-4xl font-bold tracking-tight text-[#1c2530] sm:text-5xl"
            style={{ letterSpacing: "-0.02em" }}
          >
            Panels of specialist experts.
          </h2>
        </motion.div>

        <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          {/* Intro + expertise pills */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ type: "spring", stiffness: 70, damping: 18 }}
            className="glass rounded-[2rem] bg-white/55 p-8"
          >
            <p className="text-base leading-relaxed text-[#1c2530]/90">
              {panels.intro}
            </p>

            <div className="mt-7 flex flex-wrap gap-2.5">
              {panels.expertise.map((e) => (
                <span
                  key={e}
                  className="group glass cursor-default rounded-full bg-white/60 px-4 py-2 text-sm font-medium text-[#1c2530] transition-colors hover:border-[#b87545]/60 hover:text-[#b87545]"
                >
                  {e}
                </span>
              ))}
            </div>

            <div className="mt-7 flex gap-3 rounded-2xl bg-[#b87545]/8 p-5">
              <Sparkles
                size={20}
                className="mt-0.5 flex-shrink-0 text-[#b87545]"
                strokeWidth={2}
              />
              <p className="text-sm leading-relaxed text-[#1c2530]/85">
                {panels.expertNote}
              </p>
            </div>
          </motion.div>

          {/* NBN dark slate glass card — explicit high-contrast hex */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ type: "spring", stiffness: 70, damping: 18, delay: 0.1 }}
            className="glass-dark flex flex-col rounded-[2rem] bg-[#16243a]/90 p-8"
          >
            <span className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-white/12">
              <Building2 size={22} className="text-[#dce6f2]" strokeWidth={2} />
            </span>
            <span className="font-mono text-xs font-medium uppercase tracking-wider text-[#b87545]">
              {clients.featured.relation}
            </span>
            <h3 className="mt-3 font-display text-2xl font-bold text-[#dce6f2]">
              {clients.featured.name}
            </h3>
            <p className="mt-4 text-[15px] leading-relaxed text-[#dce6f2]/85">
              {clients.featured.detail}
            </p>
            <div className="mt-auto pt-6">
              <p className="border-t border-white/12 pt-5 text-sm leading-relaxed text-[#dce6f2]/70">
                {clients.privacy}
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
