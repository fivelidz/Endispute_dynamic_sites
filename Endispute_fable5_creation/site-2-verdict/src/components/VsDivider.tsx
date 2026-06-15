"use client";

import { motion, useReducedMotion } from "motion/react";

/**
 * Slim seam transition — the red "vs" meeting line between two sides.
 * Kept short and width-constrained to avoid adding dead vertical length.
 */
export default function VsDivider() {
  const reduce = useReducedMotion();
  return (
    <div className="relative h-16 w-full overflow-hidden bg-[#0a0a0a]">
      <div className="measure relative flex h-full items-center justify-center px-6">
        {/* meeting seam line */}
        <motion.div
          className="absolute left-1/2 top-1/2 h-[2px] w-48 -translate-x-1/2 -translate-y-1/2 bg-[#fc1c46] sm:w-72"
          initial={reduce ? { scaleX: 1 } : { scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={
            reduce ? { duration: 0 } : { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
          }
        />
        <span className="relative z-10 bg-[#0a0a0a] px-4 font-serif text-xl italic text-white">
          vs
        </span>
      </div>
    </div>
  );
}
