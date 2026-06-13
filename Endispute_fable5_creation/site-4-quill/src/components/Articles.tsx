"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Plus, Minus } from "lucide-react";
import { processSteps } from "@/lib/content";
import { InkRule } from "@/lib/flourishes";

const roman = ["I", "II", "III", "IV", "V", "VI"];

export default function Articles() {
  const reduce = useReducedMotion();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="articles" className="mx-auto max-w-3xl px-5 py-20">
      <motion.div
        initial={reduce ? false : { opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7 }}
        className="mb-14 text-center"
      >
        <p className="smallcaps text-[15px] text-[#a8842c]">The instrument</p>
        <h2 className="mt-2 font-garamond text-3xl font-500 text-[#2b2118] md:text-4xl">
          How a matter proceeds
        </h2>
      </motion.div>

      <div className="space-y-10">
        {processSteps.map((step, i) => {
          const open = openIndex === i;
          return (
            <motion.article
              key={step.number}
              initial={reduce ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-70px" }}
              transition={{ duration: 0.6 }}
            >
              <p className="smallcaps text-[15px] text-[#9e3b2b]">
                Article {roman[i]}
              </p>
              <div className="my-3 h-[6px]">
                <InkRule className="h-[6px] w-full" />
              </div>

              <button
                onClick={() => setOpenIndex(open ? null : i)}
                className="flex w-full items-start justify-between gap-4 text-left"
                aria-expanded={open}
              >
                <h3 className="font-garamond text-2xl font-600 text-[#2b2118]">
                  {step.title}
                </h3>
                <span className="mt-1 shrink-0 text-[#7a6a55]">
                  {open ? <Minus size={20} /> : <Plus size={20} />}
                </span>
              </button>

              <p className="mt-2 font-garamond text-lg leading-relaxed text-[#7a6a55]">
                {step.summary}
              </p>

              <AnimatePresence initial={false}>
                {open && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <ul className="mt-5 space-y-3 border-l border-[#a8842c]/40 pl-5">
                      {step.details.map((d, di) => (
                        <li
                          key={di}
                          className="flex gap-3 font-garamond text-base leading-relaxed text-[#2b2118]"
                        >
                          <span className="select-none text-[#a8842c]">·</span>
                          <span>{d}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.article>
          );
        })}
      </div>
    </section>
  );
}
