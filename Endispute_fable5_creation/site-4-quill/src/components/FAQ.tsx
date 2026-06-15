"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ChevronDown } from "lucide-react";
import { faqs } from "@/lib/content";

export default function FAQ() {
  const reduce = useReducedMotion();
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="faq" className="mx-auto max-w-3xl px-5 py-20">
      <motion.div
        initial={reduce ? false : { opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7 }}
        className="mb-12 text-center"
      >
        <p className="smallcaps text-[15px] text-[#a8842c]">Points of inquiry</p>
        <h2 className="mt-2 font-garamond text-3xl font-500 text-[#1f1c1b] md:text-4xl">
          Questions answered
        </h2>
      </motion.div>

      <div className="border-t border-[#6b6b6b]/30">
        {faqs.map((f, i) => {
          const isOpen = open === i;
          return (
            <div key={i} className="border-b border-[#6b6b6b]/30">
              <button
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex w-full items-center justify-between gap-4 py-5 text-left"
                aria-expanded={isOpen}
              >
                <span className="font-garamond text-xl italic text-[#1f1c1b]">
                  {f.q}
                </span>
                <motion.span
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="shrink-0 text-[#9e3b2b]"
                >
                  <ChevronDown size={20} />
                </motion.span>
              </button>

              <div className="perspective-1200">
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0, rotateX: -8 }}
                      animate={{ height: "auto", opacity: 1, rotateX: 0 }}
                      exit={{ height: 0, opacity: 0, rotateX: -8 }}
                      transition={{ duration: 0.45, ease: "easeInOut" }}
                      style={{ transformOrigin: "top" }}
                      className="overflow-hidden"
                    >
                      <p className="pb-6 font-garamond text-lg leading-relaxed text-[#6b6b6b]">
                        {f.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
