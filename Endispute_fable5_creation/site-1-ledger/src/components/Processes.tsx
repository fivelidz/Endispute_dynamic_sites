"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { Plus } from "lucide-react";
import { processes } from "@/lib/content";
import { MaskReveal, SectionHead } from "./primitives";

export default function Processes() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section
      id="disputes"
      className="relative border-t border-[#e3e0d8] px-5 py-24 md:px-10 md:py-32"
    >
      <div className="mx-auto max-w-[1240px]">
        <SectionHead label="Disputes — Five Processes" />

        <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-4">
            <h2 className="font-display text-[clamp(2.6rem,6vw,4.4rem)] font-light leading-[0.98] tracking-[-0.02em] text-[#0a0a0a]">
              <MaskReveal>Dispute</MaskReveal>
              <MaskReveal delay={0.08}>processes.</MaskReveal>
            </h2>
            <p className="measure-tight mt-6 text-[15px] leading-[1.65] text-[#6b6b6b]">
              A range of facilitative, advisory and determinative processes,
              selected to suit the matter.
            </p>
          </div>

          {/* Expandable rows */}
          <div className="md:col-span-8">
            <div className="border-t border-[#0a0a0a]">
              {processes.map((p, i) => {
                const isOpen = open === i;
                return (
                  <div key={p.name} className="border-b border-[#e3e0d8]">
                    <button
                      type="button"
                      onClick={() => setOpen(isOpen ? null : i)}
                      aria-expanded={isOpen}
                      aria-controls={`process-panel-${i}`}
                      className="group flex w-full items-center gap-5 py-6 text-left"
                    >
                      <h3 className="flex-1 font-display text-[1.5rem] font-medium leading-[1.15] tracking-[-0.01em] text-[#0a0a0a] md:text-[1.75rem]">
                        {p.name}
                      </h3>
                      <motion.span
                        animate={{ rotate: isOpen ? 45 : 0 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        className="shrink-0 text-[#444444]"
                      >
                        <Plus size={22} strokeWidth={1.5} />
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
                          <p className="measure pb-7 text-[16px] leading-[1.7] text-[#444444]">
                            {p.description}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Process diagram */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mt-20"
        >
          <span className="eyebrow mb-5 block">The Endispute range of processes</span>
          <div className="rounded-[8px] border border-[#e3e0d8] bg-[#fefefc] p-6 md:p-10">
            <Image
              src="/The-Endispute-range-of-processes-5.png"
              alt="The Endispute range of dispute resolution processes"
              width={869}
              height={869}
              loading="lazy"
              className="mx-auto h-auto w-full max-w-3xl"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
