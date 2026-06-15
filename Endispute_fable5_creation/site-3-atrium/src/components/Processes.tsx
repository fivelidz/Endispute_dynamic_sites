"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { X, Plus } from "lucide-react";
import { processes } from "@/lib/content";

export default function Processes() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <section id="processes" className="section-pad relative px-4">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mb-12 max-w-2xl"
        >
          <span className="font-mono text-xs font-medium uppercase tracking-wider text-[#a69b92]">
            Our processes
          </span>
          <h2
            className="mt-3 font-display text-4xl text-[#1f1c1b] sm:text-5xl"
            style={{ fontWeight: 350, letterSpacing: "-0.01em", lineHeight: 1.0 }}
          >
            A process for every dispute.
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-[#1f1c1b]/80">
            From facilitation to arbitration — we match the right approach to the
            shape of your matter.
          </p>
        </motion.div>

        <div className="grid gap-6 lg:grid-cols-[1fr_1.15fr] lg:items-start">
          {/* Process cards grid */}
          <div className="grid gap-4 sm:grid-cols-2">
            {processes.map((p, i) => (
              <motion.button
                key={p.name}
                layoutId={`proc-${i}`}
                onClick={() => setActive(i)}
                aria-expanded={active === i}
                aria-controls="process-detail-dialog"
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                
                className="glass group flex flex-col rounded-2xl bg-white/55 p-6 text-left transition-colors duration-200 hover:border-[#ff7714]"
              >
                <div className="flex items-start justify-between gap-3">
                  <motion.h3
                    layoutId={`proc-title-${i}`}
                    className="font-display text-lg font-medium text-[#1f1c1b]"
                  >
                    {p.name}
                  </motion.h3>
                  <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg border border-[#d9d6ce] text-[#ff7714] transition-colors group-hover:border-[#ff7714]">
                    <Plus size={15} strokeWidth={2.4} />
                  </span>
                </div>
                <p className="mt-2.5 text-sm leading-relaxed text-[#1f1c1b]/80">
                  {p.short}
                </p>
              </motion.button>
            ))}
          </div>

          {/* Signature processes diagram — enlarged, in architectural glass frame */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="glass relative rounded-[2rem] bg-white/65 p-6 sm:p-7 lg:sticky lg:top-28"
          >
            <p className="mb-4 px-1 font-mono text-xs uppercase tracking-wider text-[#ff7714]">
              The Endispute range of processes
            </p>
            <Image
              src="/The-Endispute-range-of-processes-5.png"
              alt="Diagram of the Endispute range of dispute resolution processes — from facilitative through advisory to determinative approaches"
              width={869}
              height={869}
              className="h-auto w-full rounded-2xl"
            />
            {/* structural corner brackets — architectural accent */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute left-4 top-4 h-7 w-7 border-l-2 border-t-2 border-[#ff7714]"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute bottom-4 right-4 h-7 w-7 border-b-2 border-r-2 border-[#ff7714]"
            />
          </motion.div>
        </div>
      </div>

      {/* Expanded modal-style card */}
      <AnimatePresence>
        {active !== null && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActive(null)}
              className="fixed inset-0 z-50 bg-[#1f1c1b]/40 backdrop-blur-sm"
            />
            <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
              <motion.div
                layoutId={`proc-${active}`}
                id="process-detail-dialog"
                role="dialog"
                aria-modal="true"
                aria-labelledby="process-detail-title"
                className="glass relative w-full max-w-lg rounded-[2rem] bg-white/85 p-8"
              >
                <button
                  aria-label="Close"
                  onClick={() => setActive(null)}
                  className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-lg text-[#1f1c1b] transition-colors hover:bg-[#1f1c1b]/8"
                >
                  <X size={18} />
                </button>
                <motion.h3
                  layoutId={`proc-title-${active}`}
                  id="process-detail-title"
                  className="font-display text-2xl font-medium text-[#1f1c1b]"
                >
                  {processes[active].name}
                </motion.h3>
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15, duration: 0.4 }}
                  className="mt-4 text-[15px] leading-relaxed text-[#1f1c1b]/90"
                >
                  {processes[active].description}
                </motion.p>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}
