"use client";

import { motion } from "motion/react";
import {
  Handshake,
  ShieldCheck,
  TrendingDown,
  Target,
  Award,
  type LucideIcon,
} from "lucide-react";
import { benefits } from "@/lib/content";

const icons: LucideIcon[] = [Handshake, ShieldCheck, TrendingDown, Target, Award];

const spring = { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const };

export default function Benefits() {
  return (
    <section className="section-pad relative px-4">
      {/* Architectural blueprint backdrop — faint structural column gridlines */}
      <div
        aria-hidden="true"
        className="blueprint-grid pointer-events-none absolute inset-0 -z-10 mx-auto max-w-6xl opacity-70"
      />
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mb-12 max-w-2xl"
        >
          <span className="font-mono text-xs font-medium uppercase tracking-wider text-[#a69b92]">
            Why Endispute
          </span>
          <h2
            className="mt-3 font-display text-4xl text-[#1f1c1b] sm:text-5xl"
            style={{ fontWeight: 350, letterSpacing: "-0.01em", lineHeight: 1.0 }}
          >
            Outcomes that protect what matters.
          </h2>
        </motion.div>

        {/* Staggered masonry-ish grid: 2-3-2 rhythm via offsets */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map((b, i) => {
            const Icon = icons[i] ?? Target;
            return (
              <motion.div
                key={b.title}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                className="group glass bg-white p-7 transition-colors duration-200 hover:border-[#ff7714]"
              >
                <span className="mb-5 flex h-12 w-12 items-center justify-center border border-[#d9d6ce] transition-colors group-hover:border-[#ff7714]">
                  <Icon size={22} className="text-[#ff7714]" strokeWidth={2} />
                </span>
                <h3 className="font-display text-lg font-medium leading-snug text-[#1f1c1b]">
                  {b.title}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-[#1f1c1b]/80">
                  {b.detail}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
