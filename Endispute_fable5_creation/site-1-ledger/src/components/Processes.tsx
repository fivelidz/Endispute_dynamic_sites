"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { Plus } from "lucide-react";
import { processes } from "@/lib/content";
import { MaskReveal, Coord, DrawRule } from "./primitives";

export default function Processes() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section
      id="disputes"
      className="relative border-t border-[#d6d2c8] bg-[#f4f2ed] px-5 py-20 md:px-10 md:py-28"
    >
      <div className="mx-auto max-w-[1600px]">
        <div className="mb-10 flex items-start justify-between">
          <Coord label="A5 / 04 — Disputes" />
          <Coord label="§ Five Processes" />
        </div>

        <h2 className="mb-12 font-display font-semibold text-[clamp(2.2rem,6vw,5rem)] uppercase leading-[0.88] tracking-[-0.02em] text-[#0a0a0a]">
          <MaskReveal>Dispute</MaskReveal>
          <MaskReveal delay={0.08}>
            Processes<span className="text-[#d92b1c]">.</span>
          </MaskReveal>
        </h2>

        {/* Expandable full-width rows */}
        <div className="border-t border-[#0a0a0a]">
          {processes.map((p, i) => {
            const isOpen = open === i;
            return (
              <div key={p.name} className="border-b border-[#d6d2c8]">
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  aria-controls={`process-panel-${i}`}
                  className="group flex w-full items-center gap-4 py-6 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d92b1c] focus-visible:ring-offset-2 focus-visible:ring-offset-[#f4f2ed] md:gap-8"
                >
                  <span className="font-mono text-sm tabular-nums tracking-[0.1em] text-[#d92b1c]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3
                    className={`flex-1 font-heavy text-[clamp(1.3rem,3.5vw,2.6rem)] uppercase leading-none tracking-tight transition-colors ${
                      isOpen ? "text-[#d92b1c]" : "text-[#0a0a0a] group-hover:text-[#d92b1c]"
                    }`}
                  >
                    {p.name}
                  </h3>
                  <span className="hidden max-w-xs shrink-0 font-mono text-[11px] uppercase leading-snug tracking-[0.08em] text-[#8a877f] lg:block">
                    {p.short}
                  </span>
                  <motion.span
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ type: "spring" as const, stiffness: 400, damping: 30 }}
                    className="shrink-0 text-[#d92b1c]"
                  >
                    <Plus size={28} strokeWidth={1.5} />
                  </motion.span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`process-panel-${i}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="grid grid-cols-1 gap-6 pb-8 md:grid-cols-12">
                        <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#8a877f] md:col-span-3">
                          / Detail
                        </span>
                        <p className="font-display text-lg leading-relaxed text-[#0a0a0a] md:col-span-9">
                          {p.description}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Process diagram in a hairline frame */}
        <div className="mt-16">
          <div className="mb-4 flex items-center justify-between">
            <Coord label="Fig. 01 — The Endispute range of processes" />
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#d92b1c]">
              ▪ Diagram
            </span>
          </div>
          <DrawRule className="mb-6" color="#0a0a0a" thickness={2} />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7 }}
            className="border border-[#d6d2c8] bg-[#f4f2ed] p-4 md:p-8"
          >
            <Image
              src="/The-Endispute-range-of-processes-5.png"
              alt="The Endispute range of dispute resolution processes"
              width={869}
              height={869}
              loading="lazy"
              className="mx-auto h-auto w-full max-w-4xl"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
