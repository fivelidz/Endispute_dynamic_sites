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

const spring = { type: "spring" as const, stiffness: 70, damping: 18 };

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
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mb-12 max-w-2xl"
        >
          <span className="font-mono text-xs font-medium uppercase tracking-wider text-[#2563ab]">
            Why Endispute
          </span>
          <h2
            className="mt-3 font-display text-4xl font-bold tracking-tight text-[#1c2530] sm:text-5xl"
            style={{ letterSpacing: "-0.02em" }}
          >
            Outcomes that protect what matters.
          </h2>
        </motion.div>

        {/* Staggered masonry-ish grid: 2-3-2 rhythm via offsets */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map((b, i) => {
            const Icon = icons[i] ?? Target;
            // Visual rhythm — push some cards down for atrium float
            const offset =
              i === 1 ? "lg:mt-10" : i === 3 ? "lg:mt-10" : "";
            return (
              <motion.div
                key={b.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ ...spring, delay: i * 0.06 }}
                whileHover={{ y: -6 }}
                className={`group glass rounded-2xl bg-white/55 p-7 transition-shadow duration-300 hover:shadow-[0_16px_50px_rgba(37,99,171,0.18)] ${offset}`}
              >
                <span className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-[#2563ab]/12 transition-colors group-hover:bg-[#2563ab]/20">
                  <Icon size={22} className="text-[#2563ab]" strokeWidth={2} />
                </span>
                <h3 className="font-display text-lg font-bold leading-snug text-[#1c2530]">
                  {b.title}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-[#1c2530]/80">
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
