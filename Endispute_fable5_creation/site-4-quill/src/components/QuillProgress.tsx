"use client";

import { motion, useScroll, useSpring, useTransform } from "motion/react";
import { Feather } from "lucide-react";

export default function QuillProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });
  const left = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <div className="fixed left-0 top-0 z-[60] h-[2px] w-full">
      <motion.div
        className="h-full origin-left bg-[#a8842c]"
        style={{ scaleX }}
      />
      <motion.div
        className="pointer-events-none absolute top-[-9px] -translate-x-1/2"
        style={{ left }}
      >
        <Feather size={16} className="text-[#9e3b2b]" strokeWidth={1.8} />
      </motion.div>
    </div>
  );
}
