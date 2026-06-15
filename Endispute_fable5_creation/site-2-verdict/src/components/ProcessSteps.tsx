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
      className="relative bg-[#0a0a0a] px-6 py-20 text-[#cccccc] md:py-24"
    >
      <div className="measure max-w-5xl">
        <p className="mono-label mb-5 text-[#cccccc]">04 — How it works</p>
        <h2 className="display max-w-2xl text-[clamp(2rem,4.5vw,3.25rem)]">
          Four chapters, <span className="text-[#fc1c46]">one matter</span>.
        </h2>

        <div className="mt-12 divide-y divide-[#4c4c4c] border-y border-[#4c4c4c]">
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
                  <span className="w-16 shrink-0 font-serif text-4xl italic text-[#fc1c46] sm:text-5xl">
                    {roman[i]}
                  </span>
                  <span className="flex-1 font-serif text-xl text-white sm:text-2xl">
                    {step.title}
                  </span>
                  <span className="shrink-0 text-[#fc1c46]">
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
                        <p className="max-w-2xl text-[15px] leading-[1.5] text-[#cccccc]">
                          {step.summary}
                        </p>
                        <ul className="mt-5 space-y-2.5">
                          {step.details.map((d) => (
                            <li
                              key={d}
                              className="flex gap-3 text-[15px] leading-[1.5] text-[#cccccc]"
                            >
                              <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[#fc1c46]" />
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
