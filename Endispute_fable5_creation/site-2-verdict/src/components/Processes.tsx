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
      className="relative bg-[#f6f1e7] px-6 py-28 text-[#16191d] md:py-36"
    >
      <div className="mx-auto max-w-6xl">
        <p className="mono-label mb-5 text-[#6e6a60]">05 — The range</p>
        <h2 className="max-w-2xl font-serif text-4xl leading-tight sm:text-5xl">
          A multitude of <span className="italic text-[#c8472b]">processes</span>.
        </h2>

        <div className="mt-14 grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          {/* List */}
          <ul className="flex flex-col">
            {processes.map((p, i) => {
              const isActive = i === selected;
              return (
                <li key={p.name}>
                  <button
                    onClick={() => setSelected(i)}
                    className="group relative flex w-full items-baseline gap-4 border-b border-[#16191d]/12 py-5 text-left"
                  >
                    <span className="mono-label w-7 shrink-0 text-[#6e6a60]">
                      0{i + 1}
                    </span>
                    <span
                      className={cn(
                        "font-serif text-2xl transition-colors sm:text-3xl",
                        isActive
                          ? "text-[#c8472b]"
                          : "text-[#16191d] group-hover:text-[#6e6a60]"
                      )}
                    >
                      {p.name}
                    </span>
                    {isActive && (
                      <motion.span
                        layoutId="proc-marker"
                        className="absolute left-0 top-1/2 h-7 w-[3px] -translate-y-1/2 bg-[#c8472b]"
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
                className="border-l-2 border-[#c8472b] pl-7"
              >
                <h3 className="font-serif text-3xl italic text-[#c8472b]">
                  {active.name}
                </h3>
                <p className="mt-3 text-[15px] font-medium text-[#16191d]">
                  {active.short}
                </p>
                <p className="mt-5 text-[14px] leading-relaxed text-[#6e6a60]">
                  {active.description}
                </p>
              </motion.div>
            </AnimatePresence>

            <div className="border border-[#16191d]/15 bg-[#efe9dc] p-4">
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
