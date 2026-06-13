"use client";

import { motion, useReducedMotion } from "motion/react";

/**
 * Two angled panels meeting at a vermilion line — the "VS" motif
 * between About and Duality.
 */
export default function VsDivider() {
  const reduce = useReducedMotion();
  return (
    <div className="relative h-32 w-full overflow-hidden bg-[#f6f1e7] sm:h-44">
      {/* upper ink panel angled */}
      <div
        className="absolute inset-x-0 top-0 h-1/2 bg-[#101418]"
        style={{ clipPath: "polygon(0 0, 100% 0, 100% 60%, 0 100%)" }}
      />
      {/* lower paper handled by section bg */}
      {/* vermilion meeting line */}
      <motion.div
        className="absolute left-1/2 top-1/2 z-10 h-[2px] w-40 -translate-x-1/2 -translate-y-1/2 -rotate-[10deg] bg-[#c8472b] sm:w-64"
        initial={reduce ? { scaleX: 1 } : { scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={reduce ? { duration: 0 } : { duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      />
      <span className="absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2 font-serif text-2xl italic text-[#c8472b]">
        vs
      </span>
    </div>
  );
}
