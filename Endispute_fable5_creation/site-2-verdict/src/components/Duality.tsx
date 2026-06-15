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
      className="relative bg-[#0a0a0a] px-6 py-20 text-[#cccccc] md:py-24"
    >
      <div className="measure">
        <p className="mono-label mb-5 text-[#cccccc]">02 — Our approach</p>
        <h2 className="display max-w-3xl text-[clamp(2rem,4.5vw,3.25rem)]">
          Three ways a third party can{" "}
          <span className="text-[#fc1c46]">help</span>.
        </h2>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
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
                    : { duration: 0.65, delay: i * 0.1, ease }
                }
                whileHover={reduce ? undefined : { y: -4 }}
                className={cn(
                  "group flex flex-col border p-8 transition-colors duration-300",
                  inverted
                    ? "border-[#4c4c4c] bg-[#2a2a2a] hover:border-[#fc1c46]"
                    : "border-[#4c4c4c] bg-[#1a1a1a] hover:border-[#fc1c46]"
                )}
              >
                <span className="mono-label text-[#cccccc]">0{i + 1}</span>
                <h3 className="mt-6 font-serif text-3xl italic text-white">
                  {cat.type}
                </h3>
                <p className="mt-5 text-[15px] leading-[1.5] text-[#cccccc]">
                  {cat.description}
                </p>
                <div className="mt-8 h-[2px] w-12 bg-[#fc1c46]" />
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
