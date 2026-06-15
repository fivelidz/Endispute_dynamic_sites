"use client";

import { motion } from "motion/react";

const items = [
  "NBN Resolution Advisor",
  "High Court alumni panels",
  "Senior independent panel",
  "Since 2009",
];

export default function TrustBar() {
  return (
    <section className="relative px-4 pb-4">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="glass mx-auto flex max-w-5xl flex-wrap items-center justify-center gap-x-6 gap-y-3 rounded-2xl bg-white/55 px-6 py-4"
      >
        {items.map((item, i) => (
          <div key={item} className="flex items-center gap-6">
            <span className="text-sm font-semibold text-[#1f1c1b]">{item}</span>
            {i < items.length - 1 && (
              <span className="hidden h-4 w-px bg-[#d9d6ce] sm:inline-block" />
            )}
          </div>
        ))}
      </motion.div>
    </section>
  );
}
