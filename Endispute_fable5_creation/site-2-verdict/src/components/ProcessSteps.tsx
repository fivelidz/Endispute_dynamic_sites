"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Plus, Minus } from "lucide-react";
import { processSteps } from "@/lib/content";

const roman = ["I", "II", "III", "IV"];

export default function ProcessSteps() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section
      id="process"
      className="relative bg-[#f6f1e7] px-6 py-28 text-[#16191d] md:py-36"
    >
      <div className="mx-auto max-w-5xl">
        <p className="mono-label mb-5 text-[#6e6a60]">04 — How it works</p>
        <h2 className="max-w-2xl font-serif text-4xl leading-tight sm:text-5xl">
          Four chapters, <span className="italic text-[#c8472b]">one matter</span>.
        </h2>

        <div className="mt-14 divide-y divide-[#16191d]/15 border-y border-[#16191d]/15">
          {processSteps.map((step, i) => {
            const isOpen = open === i;
            return (
              <div key={step.number}>
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  aria-controls={`process-panel-${i}`}
                  id={`process-toggle-${i}`}
                  className="flex w-full items-center gap-6 py-7 text-left"
                >
                  <span className="w-16 shrink-0 font-serif text-4xl italic text-[#c8472b] sm:text-5xl">
                    {roman[i]}
                  </span>
                  <span className="flex-1 font-serif text-xl sm:text-2xl">
                    {step.title}
                  </span>
                  <span className="shrink-0 text-[#c8472b]">
                    {isOpen ? <Minus size={22} /> : <Plus size={22} />}
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`process-panel-${i}`}
                      role="region"
                      aria-labelledby={`process-toggle-${i}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="pb-8 pl-0 sm:pl-[5.5rem]">
                        <p className="max-w-2xl text-[15px] leading-relaxed text-[#6e6a60]">
                          {step.summary}
                        </p>
                        <ul className="mt-5 space-y-2.5">
                          {step.details.map((d) => (
                            <li
                              key={d}
                              className="flex gap-3 text-[14px] leading-relaxed text-[#6e6a60]"
                            >
                              <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[#c8472b]" />
                              {d}
                            </li>
                          ))}
                        </ul>
                      </div>
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
