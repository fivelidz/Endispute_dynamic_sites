"use client";

import { useScroll, useTransform, useReducedMotion, motion } from "motion/react";

/**
 * THE MERIDIAN — the showpiece.
 * A single fixed SVG vertical path running down the whole page, drawn
 * progressively with scroll via useScroll().scrollYProgress mapped to pathLength.
 * Hidden below lg. pointer-events:none so it never blocks clicks.
 */
export default function Meridian() {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();

  // Drawn fraction follows scroll. Reduced motion -> always fully drawn.
  const pathLength = useTransform(scrollYProgress, [0, 1], [reduce ? 1 : 0, 1]);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 hidden lg:block"
      style={{ left: "8%" }}
    >
      <svg
        className="h-full w-[120px]"
        viewBox="0 0 120 1000"
        preserveAspectRatio="none"
        fill="none"
      >
        <defs>
          <linearGradient id="meridian-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#d4a843" stopOpacity="0.9" />
            <stop offset="50%" stopColor="#d4a843" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#3aa6a0" stopOpacity="0.8" />
          </linearGradient>
          <filter id="meridian-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* faint full guide track */}
        <path
          d="M60 0 C 30 200, 90 350, 60 500 C 30 650, 90 800, 60 1000"
          stroke="#232c48"
          strokeWidth="2"
          vectorEffect="non-scaling-stroke"
        />

        {/* the drawn meridian */}
        <motion.path
          d="M60 0 C 30 200, 90 350, 60 500 C 30 650, 90 800, 60 1000"
          stroke="url(#meridian-grad)"
          strokeWidth="2.5"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
          filter="url(#meridian-glow)"
          style={{ pathLength }}
        />
      </svg>
    </div>
  );
}
