"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/cn";

interface MaskRevealProps {
  lines: string[];
  className?: string;
  delayBase?: number;
}

/**
 * Mask-reveal for headings: each line lives in an overflow-hidden wrapper
 * and animates y: 110% -> 0 with a per-line stagger.
 */
export default function MaskReveal({
  lines,
  className,
  delayBase = 0,
}: MaskRevealProps) {
  return (
    <span className="block">
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden">
          <motion.span
            className={cn("block", className)}
            initial={{ y: "110%" }}
            whileInView={{ y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{
              duration: 0.7,
              ease: [0.22, 1, 0.36, 1],
              delay: delayBase + i * 0.09,
            }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </span>
  );
}
