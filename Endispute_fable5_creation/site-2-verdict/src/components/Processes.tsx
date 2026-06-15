"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";
import { processes } from "@/lib/content";
import { cn } from "@/lib/cn";

export default function Processes() {
  const [selected, setSelected] = useState(0);
  const active = processes[selected];

  return (
    <section
      id="processes"
      className="relative bg-[#0a0a0a] px-6 py-20 text-[#cccccc] md:py-24"
    >
      <div className="measure">
        <p className="mono-label mb-5 text-[#cccccc]">05 — The range</p>
        <h2 className="display max-w-2xl text-[clamp(2rem,4.5vw,3.25rem)]">
          A multitude of <span className="text-[#fc1c46]">processes</span>.
        </h2>

        <div className="mt-12 grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          {/* List */}
          <ul className="flex flex-col">
            {processes.map((p, i) => {
              const isActive = i === selected;
              return (
                <li key={p.name}>
                  <button
                    onClick={() => setSelected(i)}
                    className="group relative flex w-full items-baseline gap-4 border-b border-[#4c4c4c] py-5 text-left"
                  >
                    <span className="mono-label w-7 shrink-0 text-[#cccccc]">
                      0{i + 1}
                    </span>
                    <span
                      className={cn(
                        "font-serif text-2xl transition-colors sm:text-3xl",
                        isActive
                          ? "text-[#fc1c46]"
                          : "text-white group-hover:text-[#cccccc]"
                      )}
                    >
                      {p.name}
                    </span>
                    {isActive && (
                      <motion.span
                        layoutId="proc-marker"
                        className="absolute left-0 top-1/2 h-7 w-[3px] -translate-y-1/2 bg-[#fc1c46]"
                      />
                    )}
                  </button>
                </li>
              );
            })}
          </ul>

          {/* Detail panel + diagram */}
          <div className="flex flex-col gap-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={active.name}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="border-l-2 border-[#fc1c46] pl-7"
              >
                <h3 className="font-serif text-3xl italic text-white">
                  {active.name}
                </h3>
                <p className="mt-3 text-[16px] font-medium text-white">
                  {active.short}
                </p>
                <p className="mt-5 text-[15px] leading-[1.5] text-[#cccccc]">
                  {active.description}
                </p>
              </motion.div>
            </AnimatePresence>

            <div className="border border-[#4c4c4c] bg-[#1a1a1a] p-4">
              <Image
                src="/The-Endispute-range-of-processes-5.png"
                alt="The Endispute range of processes"
                width={900}
                height={520}
                className="h-auto w-full"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
