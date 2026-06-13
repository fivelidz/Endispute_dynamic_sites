"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Plus } from "lucide-react";
import { faqs } from "@/lib/content";

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="section-pad relative px-4">
      <div className="mx-auto max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <span className="font-mono text-xs font-medium uppercase tracking-wider text-[#2563ab]">
            Questions
          </span>
          <h2
            className="mt-3 font-display text-4xl font-bold tracking-tight text-[#1c2530] sm:text-5xl"
            style={{ letterSpacing: "-0.02em" }}
          >
            Frequently asked.
          </h2>
        </motion.div>

        <div className="flex flex-col gap-4">
          {faqs.map((faq, i) => {
            const isOpen = open === i;
            return (
              <motion.div
                key={faq.q}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.04 }}
                className="glass overflow-hidden rounded-2xl bg-white/55"
              >
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-panel-${i}`}
                  id={`faq-trigger-${i}`}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                >
                  <span className="font-display text-base font-bold text-[#1c2530]">
                    {faq.q}
                  </span>
                  <motion.span
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.25 }}
                    className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg bg-[#2563ab]/12 text-[#2563ab]"
                  >
                    <Plus size={16} strokeWidth={2.4} />
                  </motion.span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`faq-panel-${i}`}
                      role="region"
                      aria-labelledby={`faq-trigger-${i}`}
                      initial={{ height: 0, opacity: 0, filter: "blur(8px)" }}
                      animate={{ height: "auto", opacity: 1, filter: "blur(0px)" }}
                      exit={{ height: 0, opacity: 0, filter: "blur(8px)" }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="px-6 pb-6 text-[15px] leading-relaxed text-[#1c2530]/85">
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
