"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Plus } from "lucide-react";
import { processes, conflictResolutionCategories } from "@/lib/content";
import Node from "./Node";

type Process = (typeof processes)[number];

// Fixed constellation patterns (dots + connecting line order) per card.
const constellations: { dots: [number, number][]; links: [number, number][] }[] = [
  { dots: [[14, 30], [44, 14], [70, 38], [90, 20]], links: [[0, 1], [1, 2], [2, 3]] },
  { dots: [[18, 18], [50, 40], [80, 16], [60, 8]], links: [[0, 1], [1, 2], [2, 3]] },
  { dots: [[12, 36], [40, 10], [68, 30], [92, 12]], links: [[0, 1], [1, 2], [2, 3]] },
  { dots: [[20, 12], [46, 34], [74, 20], [88, 40]], links: [[0, 1], [1, 2], [2, 3]] },
  { dots: [[16, 22], [42, 8], [62, 36], [86, 24]], links: [[0, 1], [1, 2], [2, 3]] },
];

function ConstellationSVG({ index, active }: { index: number; active: boolean }) {
  const c = constellations[index % constellations.length];
  const color = active ? "#d4a843" : "#8a93a8";
  return (
    <svg
      viewBox="0 0 104 48"
      className="h-12 w-full"
      style={{
        filter: active ? "drop-shadow(0 0 6px rgba(212,168,67,0.8))" : "none",
        transition: "filter 0.3s",
      }}
    >
      {c.links.map(([a, b], i) => (
        <line
          key={i}
          x1={c.dots[a][0]}
          y1={c.dots[a][1]}
          x2={c.dots[b][0]}
          y2={c.dots[b][1]}
          stroke={color}
          strokeWidth="1"
          strokeOpacity={active ? 0.9 : 0.5}
          style={{ transition: "stroke 0.3s, stroke-opacity 0.3s" }}
        />
      ))}
      {c.dots.map(([x, y], i) => (
        <circle
          key={i}
          cx={x}
          cy={y}
          r={active ? 2.6 : 2}
          fill={color}
          style={{ transition: "fill 0.3s, r 0.3s" }}
        />
      ))}
    </svg>
  );
}

function ConstellationCard({ process, index }: { process: Process; index: number }) {
  const [open, setOpen] = useState(false);
  const [hover, setHover] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: (index % 3) * 0.08 }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="flex flex-col rounded-2xl border border-[#232c48] bg-[#141b30] p-7 transition-colors hover:border-[#d4a843]/40"
    >
      <div className="mb-5">
        <ConstellationSVG index={index} active={hover} />
      </div>
      <h3 className="font-serif text-xl font-light text-[#e8ecf4]">
        {process.name}
      </h3>
      <p className="mt-2.5 flex-1 text-sm leading-relaxed text-[#b8c0d4]">
        {process.short}
      </p>

      <button
        onClick={() => setOpen((v) => !v)}
        className="mt-5 flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-[#d4a843] transition-colors hover:text-[#e8ecf4]"
      >
        <motion.span animate={{ rotate: open ? 45 : 0 }} transition={{ duration: 0.3 }}>
          <Plus size={14} />
        </motion.span>
        {open ? "Less" : "Read more"}
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="overflow-hidden"
          >
            <p className="mt-4 border-t border-[#232c48] pt-4 text-sm leading-relaxed text-[#8a93a8]">
              {process.description}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function Constellations() {
  return (
    <section id="approaches" className="relative px-6 py-28">
      <div className="mx-auto max-w-7xl lg:pl-[8%]">
        <Node label="03 — The Constellation" className="mb-8" />
        <h2 className="max-w-3xl font-serif text-4xl font-light leading-tight tracking-tight text-[#e8ecf4] sm:text-5xl">
          A constellation of <span className="italic text-[#d4a843]">resolution processes.</span>
        </h2>
        <p className="mt-4 max-w-2xl text-lg text-[#b8c0d4]">
          We offer a multitude of dispute resolution processes, each tailored to the unique shape of your matter.
        </p>

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {processes.map((p, i) => (
            <ConstellationCard key={p.name} process={p} index={i} />
          ))}
        </div>

        {/* categories framed as a dark diagram strip */}
        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {conflictResolutionCategories.map((cat) => (
            <motion.div
              key={cat.type}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5 }}
              className="rounded-2xl border border-[#232c48] bg-[#0b1020] p-6"
            >
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#8a93a8]">
                {cat.type}
              </span>
              <p className="mt-3 text-sm leading-relaxed text-[#8a93a8]">
                {cat.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
