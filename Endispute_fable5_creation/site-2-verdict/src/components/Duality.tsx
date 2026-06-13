"use client";

import { motion, useReducedMotion } from "motion/react";
import { conflictResolutionCategories } from "@/lib/content";
import { cn } from "@/lib/cn";

const ease = [0.22, 1, 0.36, 1] as const;

export default function Duality() {
  const reduce = useReducedMotion();
  return (
    <section
      id="duality"
      className="relative bg-[#f6f1e7] px-6 py-28 text-[#16191d] md:py-36"
    >
      <div className="mx-auto max-w-6xl">
        <p className="mono-label mb-5 text-[#6e6a60]">02 — Our approach</p>
        <h2 className="max-w-3xl font-serif text-4xl leading-tight sm:text-5xl">
          Three ways a third party can <span className="italic text-[#c8472b]">help</span>.
        </h2>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {conflictResolutionCategories.map((cat, i) => {
            const inverted = i === 1;
            return (
              <motion.article
                key={cat.type}
                initial={reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={
                  reduce
                    ? { duration: 0 }
                    : { duration: 0.65, delay: i * 0.12, ease }
                }
                whileHover={reduce ? undefined : { y: -4 }}
                className={cn(
                  "group flex flex-col border p-8 transition-colors duration-300",
                  inverted
                    ? "border-[#101418] bg-[#101418] text-[#efe9dc] hover:border-[#c8472b]"
                    : "border-[#16191d]/15 bg-[#efe9dc] text-[#16191d] hover:border-[#c8472b]"
                )}
              >
                <span
                  className={cn(
                    "mono-label",
                    inverted ? "text-[#b8ae98]" : "text-[#6e6a60]"
                  )}
                >
                  0{i + 1}
                </span>
                <h3 className="mt-6 font-serif text-3xl">
                  <span
                    className={cn(
                      "italic",
                      inverted ? "text-[#c8472b]" : "text-[#c8472b]"
                    )}
                  >
                    {cat.type}
                  </span>
                </h3>
                <p
                  className={cn(
                    "mt-5 text-[14px] leading-relaxed",
                    inverted ? "text-[#b8ae98]" : "text-[#6e6a60]"
                  )}
                >
                  {cat.description}
                </p>
                <div
                  className={cn(
                    "mt-auto pt-8",
                    "h-[2px] w-12 origin-left scale-x-100 bg-[#c8472b]"
                  )}
                />
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
