"use client";

import { motion } from "motion/react";
import { Check } from "lucide-react";
import { processSteps } from "@/lib/content";
import Node from "./Node";
import MouseGlow from "./MouseGlow";

type Step = (typeof processSteps)[number];

function Waypoint({ step, index }: { step: Step; index: number }) {
  // Alternate left/right on desktop. The "line side" is center.
  const isLeft = index % 2 === 0;

  return (
    <div
      className={`relative flex flex-col lg:flex-row ${
        isLeft ? "lg:justify-start" : "lg:justify-end"
      }`}
    >
      {/* connector line drawing in from the meridian side */}
      <motion.div
        aria-hidden
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`absolute top-10 hidden h-px w-[8%] bg-gradient-to-r from-[#8a93a8] to-transparent lg:block ${
          isLeft
            ? "right-1/2 origin-right"
            : "left-1/2 origin-left bg-gradient-to-l"
        }`}
      />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6 }}
        className="lg:w-[46%]"
      >
        <MouseGlow className="h-full rounded-2xl border border-[#232c48] bg-[#141b30]">
          <div className="p-8">
            <div className="flex items-center gap-4">
              <span className="font-mono text-3xl font-semibold text-[#b8c0d4]">
                {step.number}
              </span>
              <span className="h-px flex-1 bg-[#232c48]" />
            </div>
            <h3 className="mt-4 font-serif text-2xl font-light leading-snug text-[#e8ecf4]">
              {step.title}
            </h3>
            <p className="mt-3 text-[15px] leading-relaxed text-[#b8c0d4]">
              {step.summary}
            </p>
            <ul className="mt-5 space-y-2.5">
              {step.details.map((d) => (
                <li key={d} className="flex gap-3 text-sm leading-relaxed text-[#8a93a8]">
                  <Check
                    size={16}
                    className="mt-0.5 shrink-0 text-[#8a93a8]"
                  />
                  <span>{d}</span>
                </li>
              ))}
            </ul>
          </div>
        </MouseGlow>
      </motion.div>
    </div>
  );
}

export default function Waypoints() {
  return (
    <section id="process" className="relative px-6 py-28">
      <div className="mx-auto max-w-7xl lg:pl-[8%]">
        <Node label="02 — The Journey" className="mb-8" />
        <h2 className="max-w-3xl font-serif text-4xl font-light leading-tight tracking-tight text-[#e8ecf4] sm:text-5xl">
          Four waypoints from <span className="italic text-[#d4a843]">intake to resolution.</span>
        </h2>
        <p className="mt-4 max-w-2xl text-lg text-[#b8c0d4]">
          Every dispute follows a charted course. We manage each stage so the process stays efficient, transparent and effective.
        </p>

        <div className="mt-16 space-y-14">
          {processSteps.map((step, i) => (
            <Waypoint key={step.number} step={step} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
