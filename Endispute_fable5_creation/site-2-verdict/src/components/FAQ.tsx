"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ChevronDown } from "lucide-react";
import { faqs } from "@/lib/content";

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section
      id="faq"
      className="relative bg-[#f6f1e7] px-6 py-28 text-[#16191d] md:py-36"
    >
      <div className="mx-auto max-w-4xl">
        <p className="mono-label mb-5 text-[#6e6a60]">08 — Questions</p>
        <h2 className="font-serif text-4xl leading-tight sm:text-5xl">
          Common <span className="italic text-[#c8472b]">questions</span>.
        </h2>

        <div className="mt-12 divide-y divide-[#16191d]/15 border-y border-[#16191d]/15">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={f.q}>
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-panel-${i}`}
                  id={`faq-toggle-${i}`}
                  className="flex w-full items-center justify-between gap-6 py-6 text-left"
                >
                  <span className="font-serif text-lg sm:text-xl">{f.q}</span>
                  <motion.span
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="shrink-0 text-[#c8472b]"
                  >
                    <ChevronDown size={22} />
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`faq-panel-${i}`}
                      role="region"
                      aria-labelledby={`faq-toggle-${i}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="max-w-2xl pb-7 text-[14px] leading-relaxed text-[#6e6a60]">
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
    </section>
  );
}
