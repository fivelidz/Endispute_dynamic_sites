"use client";

import { useScroll, useTransform, useReducedMotion, motion } from "motion/react";

/**
 * Two fixed parallax star layers. Different scroll rates via useTransform.
 * Reduced motion: static (no transform).
 */
export default function StarField() {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();

  // far layer drifts slowly, near layer faster
  const yFar = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "-12%"]);
  const yNear = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "-28%"]);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {/* base radial wash to add depth */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 80% at 50% -10%, rgba(212,168,67,0.06), transparent 60%), radial-gradient(100% 60% at 80% 110%, rgba(58,166,160,0.05), transparent 60%)",
        }}
      />
      <motion.div
        className="starlayer-far absolute -inset-[20%]"
        style={{ y: yFar }}
      />
      <motion.div
        className="starlayer-near absolute -inset-[20%]"
        style={{ y: yNear }}
      />
    </div>
  );
}
