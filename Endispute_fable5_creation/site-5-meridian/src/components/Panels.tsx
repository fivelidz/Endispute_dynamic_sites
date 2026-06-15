"use client";

import { motion, useReducedMotion } from "motion/react";
import { panels, clients } from "@/lib/content";
import Node from "./Node";
import MouseGlow from "./MouseGlow";

function OrbitChip({ label, index }: { label: string; index: number }) {
  const reduce = useReducedMotion();
  const delay = (index % 4) * 0.4;
  const dir = index % 2 === 0 ? -5 : 5;
  const className =
    "rounded-full border border-[#26262e] bg-[#000000] px-4 py-2 font-mono text-xs uppercase tracking-wider text-[#bdbdbd]";

  if (reduce) {
    return <span className={className}>{label}</span>;
  }

  return (
    <motion.span
      animate={{ y: [0, dir, 0] }}
      transition={{ duration: 4 + (index % 3), repeat: Infinity, ease: "easeInOut", delay }}
      className={className}
    >
      {label}
    </motion.span>
  );
}

export default function Panels() {
  return (
    <section id="panel" className="relative px-6 py-20">
      <div className="mx-auto max-w-[1200px] lg:pl-[8%]">
        <Node label="04 — The Panel" className="mb-8" />
        <h2 className="max-w-3xl font-serif text-4xl font-light leading-tight tracking-tight text-[#ffffff] sm:text-5xl">
          Specialist experts in <span className="italic text-[#8052ff]">orbit.</span>
        </h2>
        <p className="mt-4 max-w-3xl text-lg leading-relaxed text-[#bdbdbd]">
          {panels.intro}
        </p>

        <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:items-center">
          {/* NBN highlight card */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
          >
            <MouseGlow className="rounded-3xl border border-[#26262e] bg-[#0c0c12]">
              <div className="p-9">
                <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#9a9a9a]">
                  {clients.featured.relation}
                </span>
                <h3 className="mt-4 font-serif text-3xl font-light leading-tight text-[#ffffff]">
                  {clients.featured.name}
                </h3>
                <p className="mt-4 text-[15px] leading-relaxed text-[#bdbdbd]">
                  {clients.featured.detail}
                </p>
                <p className="mt-6 border-t border-[#26262e] pt-5 text-sm leading-relaxed text-[#9a9a9a]">
                  {clients.privacy}
                </p>
              </div>
            </MouseGlow>
          </motion.div>

          {/* orbit chips cloud */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#9a9a9a]">
              Areas of expertise
            </span>
            <div className="mt-5 flex flex-wrap gap-3">
              {panels.expertise.map((e, i) => (
                <OrbitChip key={e} label={e} index={i} />
              ))}
            </div>
            <p className="mt-8 text-[15px] leading-relaxed text-[#9a9a9a]">
              {panels.expertNote}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
