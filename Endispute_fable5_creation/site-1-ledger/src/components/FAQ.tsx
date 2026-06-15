"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Plus } from "lucide-react";
import { faqs } from "@/lib/content";
import { MaskReveal, SectionHead } from "./primitives";

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section
      id="faq"
      className="relative border-t border-[#e3e0d8] px-5 py-24 md:px-10 md:py-32"
    >
      <div className="mx-auto max-w-[1240px]">
        <SectionHead label="FAQ — Questions" />

        <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-4">
            <h2 className="font-display text-[clamp(2.4rem,5vw,4rem)] font-light leading-[0.98] tracking-[-0.02em] text-[#0a0a0a]">
              <MaskReveal>Common</MaskReveal>
              <MaskReveal delay={0.08}>questions.</MaskReveal>
            </h2>
            <p className="measure-tight mt-6 text-[15px] leading-[1.65] text-[#6b6b6b]">
              On process, cost, confidentiality and reach.
            </p>
          </div>

          <div className="md:col-span-8">
            <div className="border-t border-[#0a0a0a]">
              {faqs.map((f, i) => {
                const isOpen = open === i;
                return (
                  <div key={i} className="border-b border-[#e3e0d8]">
                    <button
                      type="button"
                      onClick={() => setOpen(isOpen ? null : i)}
                      aria-expanded={isOpen}
                      aria-controls={`faq-panel-${i}`}
                      className="group flex w-full items-start gap-5 py-6 text-left"
                    >
                      <h3 className="flex-1 font-display text-[1.3rem] font-medium leading-[1.25] tracking-[-0.01em] text-[#0a0a0a] md:text-[1.5rem]">
                        {f.q}
                      </h3>
                      <motion.span
                        animate={{ rotate: isOpen ? 45 : 0 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        className="mt-1 shrink-0 text-[#444444]"
                      >
                        <Plus size={20} strokeWidth={1.5} />
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
                          <p className="measure pb-7 text-[15px] leading-[1.75] text-[#444444]">
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
