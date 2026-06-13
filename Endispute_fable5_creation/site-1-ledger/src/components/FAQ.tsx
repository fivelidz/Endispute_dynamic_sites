"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Plus } from "lucide-react";
import { faqs } from "@/lib/content";
import { MaskReveal, Coord } from "./primitives";

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section
      id="faq"
      className="relative border-t border-[#d6d2c8] px-5 py-20 md:px-10 md:py-28"
    >
      <div className="mx-auto max-w-[1600px]">
        <div className="mb-10 flex items-start justify-between">
          <Coord label="A8 / 07 — FAQ" />
          <Coord label="§ Questions" />
        </div>

        <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
          <div className="md:col-span-4">
            <h2 className="font-display font-semibold text-[clamp(2.2rem,5vw,4rem)] uppercase leading-[0.9] tracking-[-0.02em] text-[#0a0a0a]">
              <MaskReveal>Common</MaskReveal>
              <MaskReveal delay={0.08}>
                Questions<span className="text-[#d92b1c]">.</span>
              </MaskReveal>
            </h2>
            <p className="mt-5 max-w-xs font-mono text-[12px] uppercase leading-relaxed tracking-[0.08em] text-[#8a877f]">
              {faqs.length} entries on process, cost, confidentiality and reach.
            </p>
          </div>

          <div className="md:col-span-8">
            <div className="border-t border-[#0a0a0a]">
              {faqs.map((f, i) => {
                const isOpen = open === i;
                return (
                  <div key={i} className="border-b border-[#d6d2c8]">
                    <button
                      type="button"
                      onClick={() => setOpen(isOpen ? null : i)}
                      aria-expanded={isOpen}
                      aria-controls={`faq-panel-${i}`}
                      className="group flex w-full items-start gap-4 py-6 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d92b1c] focus-visible:ring-offset-2 focus-visible:ring-offset-[#f4f2ed] md:gap-6"
                    >
                      <span className="shrink-0 pt-1 font-mono text-[12px] tabular-nums tracking-[0.1em] text-[#d92b1c]">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <h3
                        className={`flex-1 font-display text-lg font-medium leading-snug transition-colors md:text-xl ${
                          isOpen
                            ? "text-[#d92b1c]"
                            : "text-[#0a0a0a] group-hover:text-[#d92b1c]"
                        }`}
                      >
                        {f.q}
                      </h3>
                      <motion.span
                        animate={{ rotate: isOpen ? 45 : 0 }}
                        transition={{
                          type: "spring" as const,
                          stiffness: 400,
                          damping: 30,
                        }}
                        className="shrink-0 text-[#d92b1c]"
                      >
                        <Plus size={24} strokeWidth={1.5} />
                      </motion.span>
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          id={`faq-panel-${i}`}
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                          className="overflow-hidden"
                        >
                          <p className="max-w-3xl pb-7 pl-8 font-display text-base leading-relaxed text-[#8a877f] md:pl-10">
                            {f.a}
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
      </div>
    </section>
  );
}
