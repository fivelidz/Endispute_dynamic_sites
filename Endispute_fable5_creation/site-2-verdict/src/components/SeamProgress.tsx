"use client";

import { motion, useScroll, useSpring, useReducedMotion } from "motion/react";

export default function SeamProgress() {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const smooth = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });
  const scaleY = reduce ? scrollYProgress : smooth;

  return (
    <div className="fixed right-0 top-0 z-50 hidden h-screen w-[2px] bg-[#4c4c4c]/40 md:block">
      <motion.div
        className="h-full w-full origin-top bg-[#fc1c46]"
        style={{ scaleY }}
      />
    </div>
  );
}
