"use client";

import { motion, useReducedMotion } from "motion/react";

type FlourishProps = {
  draw?: boolean;
  className?: string;
  color?: string;
  strokeWidth?: number;
  duration?: number;
};

/**
 * RuleFlourish — ornamental horizontal divider (~600x40 viewBox).
 * A central swash with a curly terminal on each side. Draws itself in.
 */
export function RuleFlourish({
  draw = true,
  className,
  color = "#a8842c",
  strokeWidth = 1.5,
  duration = 1.4,
}: FlourishProps) {
  const reduce = useReducedMotion();
  const animate = reduce ? { pathLength: 1 } : draw ? { pathLength: 1 } : { pathLength: 0 };

  return (
    <svg
      viewBox="0 0 600 40"
      fill="none"
      className={className}
      aria-hidden="true"
      preserveAspectRatio="xMidYMid meet"
    >
      <motion.path
        d="M40 20 C 120 20, 180 20, 240 20 M240 20 C 270 8, 300 8, 300 20 C 300 32, 330 32, 360 20 M360 20 C 420 20, 480 20, 560 20"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        initial={reduce ? false : { pathLength: 0 }}
        whileInView={animate}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration, ease: "easeInOut" }}
      />
      <motion.path
        d="M40 20 C 30 12, 20 12, 16 20 C 20 28, 30 28, 40 20 Z"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        initial={reduce ? false : { pathLength: 0 }}
        whileInView={animate}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: duration * 0.7, ease: "easeInOut", delay: duration * 0.5 }}
      />
      <motion.path
        d="M560 20 C 570 12, 580 12, 584 20 C 580 28, 570 28, 560 20 Z"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        initial={reduce ? false : { pathLength: 0 }}
        whileInView={animate}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: duration * 0.7, ease: "easeInOut", delay: duration * 0.5 }}
      />
      <motion.circle
        cx="300"
        cy="20"
        r="2.4"
        fill={color}
        initial={reduce ? false : { scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.4, delay: duration }}
      />
    </svg>
  );
}

/**
 * UnderlineFlourish — swash underline (~400x24 viewBox) for beneath headlines.
 */
export function UnderlineFlourish({
  draw = true,
  className,
  color = "#9e3b2b",
  strokeWidth = 1.8,
  duration = 1.4,
}: FlourishProps) {
  const reduce = useReducedMotion();

  return (
    <svg
      viewBox="0 0 400 24"
      fill="none"
      className={className}
      aria-hidden="true"
      preserveAspectRatio="xMidYMid meet"
    >
      <motion.path
        d="M8 14 C 80 6, 160 6, 220 12 C 280 18, 340 16, 392 8 C 360 14, 300 16, 240 14 C 180 12, 120 10, 60 16"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        initial={reduce ? false : { pathLength: 0 }}
        animate={reduce ? { pathLength: 1 } : draw ? { pathLength: 1 } : { pathLength: 0 }}
        transition={{ duration, ease: "easeInOut" }}
      />
    </svg>
  );
}

/**
 * CornerOrnament — corner curl (~80x80 viewBox). Place absolutely at a corner.
 */
export function CornerOrnament({
  draw = true,
  className,
  color = "#a8842c",
  strokeWidth = 1.5,
  duration = 1.2,
}: FlourishProps) {
  const reduce = useReducedMotion();
  const animate = reduce ? { pathLength: 1 } : draw ? { pathLength: 1 } : { pathLength: 0 };

  return (
    <svg
      viewBox="0 0 80 80"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <motion.path
        d="M6 6 L 40 6 M6 6 L 6 40 M6 6 C 24 8, 34 18, 36 36 C 18 34, 8 24, 6 6 Z"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        initial={reduce ? false : { pathLength: 0 }}
        whileInView={animate}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration, ease: "easeInOut" }}
      />
    </svg>
  );
}

/**
 * InkRule — a simple horizontal ink rule that draws in (for Articles).
 */
export function InkRule({
  draw = true,
  className,
  color = "#2b2118",
  strokeWidth = 1,
  duration = 1.1,
}: FlourishProps) {
  const reduce = useReducedMotion();

  return (
    <svg
      viewBox="0 0 600 6"
      fill="none"
      className={className}
      aria-hidden="true"
      preserveAspectRatio="none"
    >
      <motion.path
        d="M2 3 L 598 3"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        initial={reduce ? false : { pathLength: 0 }}
        whileInView={reduce ? { pathLength: 1 } : draw ? { pathLength: 1 } : { pathLength: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration, ease: "easeInOut" }}
      />
    </svg>
  );
}
