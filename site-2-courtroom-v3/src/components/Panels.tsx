"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { panels, clients, conflictResolutionCategories } from "@/lib/content";

export default function Panels() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section
      id="panel"
      ref={sectionRef}
      className="py-28 bg-[#0a0a0a]"
    >
      <div className="max-w-7xl mx-auto px-8 sm:px-12 lg:px-16">
        <div className="border-t border-[#2e2e2e] mb-16 pt-4 flex justify-between items-center">
          <span
            className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#d4a14a]"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            § The Panel
          </span>
          <span
            className="text-[10px] font-mono text-[#c8bfa8]/30 tracking-widest"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            V
          </span>
        </div>

        <div className="grid lg:grid-cols-[1fr_1fr] gap-20 mb-20">
          {/* Left: Panel intro */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <h2
              className="text-[clamp(2rem,4.5vw,3.5rem)] font-light text-[#f4eedf] leading-[1.1] mb-8"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Specialist experts.<br />
              <em className="text-[#d4a14a]">Every field.</em>
            </h2>
            <p className="text-[#c8bfa8] text-lg leading-relaxed mb-8">
              {panels.intro}
            </p>
            <p className="text-[#c8bfa8]/70 text-sm leading-relaxed border-l-2 border-[#8b2e2e] pl-5">
              {panels.expertNote}
            </p>
          </motion.div>

          {/* Right: Expertise grid */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.15 }}
          >
            <div className="grid grid-cols-2 gap-3">
              {panels.expertise.map((area, i) => (
                <motion.div
                  key={area}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.4, delay: 0.2 + i * 0.07 }}
                  className="border border-[#2e2e2e] p-5 hover:border-[#d4a14a]/40 transition-colors duration-300"
                >
                  <span
                    className="text-[10px] font-mono text-[#d4a14a]/50 block mb-2 tabular-nums"
                    style={{ fontFamily: "var(--font-mono)" }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="text-[#f4eedf] text-sm font-medium">{area}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Conflict resolution categories */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="border-t border-[#2e2e2e] pt-16 mb-16"
        >
          <h3
            className="text-lg font-light text-[#c8bfa8] mb-10 tracking-wide"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Categories of conflict resolution
          </h3>
          <div className="grid sm:grid-cols-3 gap-6">
            {conflictResolutionCategories.map((cat, i) => (
              <motion.div
                key={cat.type}
                initial={{ opacity: 0, y: 15 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.5 + i * 0.12 }}
                className="border-t-2 border-[#d4a14a] pt-6"
              >
                <h4
                  className="text-[#f4eedf] font-medium mb-3"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {cat.type}
                </h4>
                <p className="text-[#c8bfa8]/70 text-sm leading-relaxed">
                  {cat.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* NBN client highlight */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="relative border border-[#8b2e2e] p-10 overflow-hidden"
        >
          {/* Background accent */}
          <div
            className="absolute inset-0 bg-[#8b2e2e]/5"
            aria-hidden="true"
          />
          <div className="relative">
            <span
              className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#8b2e2e] block mb-5"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              ◆ Featured Client
            </span>
            <h3
              className="text-2xl font-medium text-[#f4eedf] mb-3"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {clients.featured.name}
            </h3>
            <p
              className="text-[#d4a14a] text-sm font-mono mb-4"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              {clients.featured.relation}
            </p>
            <p className="text-[#c8bfa8] text-base leading-relaxed max-w-2xl">
              {clients.featured.detail}
            </p>
            <p className="mt-6 text-xs text-[#c8bfa8]/40 italic">
              {clients.privacy}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
