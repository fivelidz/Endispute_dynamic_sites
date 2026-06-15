"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "motion/react";
import { processes } from "@/lib/content";
import SpectrumMatrix from "@/components/SpectrumMatrix";

type Process = (typeof processes)[number];

export default function DisputeProcesses() {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-100px" });

  const toggle = (name: string) => {
    setExpandedId((prev) => (prev === name ? null : name));
  };

  return (
    <section
      id="services"
      ref={sectionRef}
      className="py-28 bg-[#1c1c1c]"
    >
      <div className="max-w-7xl mx-auto px-8 sm:px-12 lg:px-16">
        <div className="border-t border-[#2e2e2e] mb-16 pt-4 flex justify-between items-center">
          <span
            className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#d4a14a]"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            § Dispute Resolution Services
          </span>
          <span
            className="text-[10px] font-mono text-[#c8bfa8]/30 tracking-widest"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            IV
          </span>
        </div>

        <div className="mb-12 max-w-2xl">
          <h2
            className="text-[clamp(2rem,4.5vw,3.5rem)] font-light text-[#f4eedf] leading-[1.1] mb-4"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Tailored resolution <em className="text-[#d4a14a]">for every</em> dispute
          </h2>
          <p className="text-[#c8bfa8] text-base leading-relaxed">
            Select a process to explore how it works. Each can be used alone or
            layered in multi-step approaches.
          </p>
        </div>

        {/* Grid of cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {processes.map((proc: Process, i: number) => {
            const isExpanded = expandedId === proc.name;
            return (
              <motion.div
                key={proc.name}
                layout
                layoutId={`card-${proc.name}`}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  layout: { type: "spring", stiffness: 80, damping: 20 },
                  opacity: { duration: 0.5, delay: i * 0.08 },
                  y: { duration: 0.5, delay: i * 0.08 },
                }}
                onClick={() => toggle(proc.name)}
                className={`relative cursor-pointer border transition-colors duration-300 p-7 ${
                  isExpanded
                    ? "border-[#d4a14a] bg-[#0a0a0a] col-span-1 sm:col-span-2 lg:col-span-2"
                    : "border-[#2e2e2e] bg-[#1c1c1c] hover:border-[#d4a14a]/40"
                }`}
                role="button"
                tabIndex={0}
                aria-expanded={isExpanded}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") toggle(proc.name);
                }}
              >
                {/* Card index */}
                <span
                  className="text-[10px] font-mono text-[#d4a14a]/60 block mb-4 tabular-nums"
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>

                {/* Title */}
                <motion.h3
                  layout="position"
                  className="text-xl font-medium text-[#f4eedf] mb-3 leading-tight"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {proc.name}
                </motion.h3>

                {/* Short description always visible */}
                <motion.p layout="position" className="text-sm text-[#c8bfa8] leading-relaxed">
                  {proc.short}
                </motion.p>

                {/* Expanded description */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="mt-5 pt-5 border-t border-[#2e2e2e]">
                        <p className="text-[#c8bfa8] text-sm leading-relaxed">
                          {proc.description}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Expand/collapse indicator */}
                <div className="absolute top-7 right-7">
                  <motion.span
                    animate={{ rotate: isExpanded ? 45 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="block text-[#d4a14a]/60 text-xl leading-none"
                    aria-hidden="true"
                  >
                    +
                  </motion.span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* The Endispute range of processes — structured matrix (replaces the
            old flat diagram PNG). Facilitative → Advisory → Determinative, each
            with its characteristics and example processes. */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-20 border border-[#2e2e2e] p-6 sm:p-8 lg:p-10 bg-[#161616]"
        >
          <SpectrumMatrix />
        </motion.div>
      </div>
    </section>
  );
}
