"use client";

import {
  motion,
  useInView,
  useReducedMotion,
  animate,
} from "motion/react";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

const EASE = [0.22, 1, 0.36, 1] as const;

/* ------------------------------------------------------------------ */
/* Reveal — subtle opacity + small translateY on scroll into view      */
/* ------------------------------------------------------------------ */

export function Reveal({
  children,
  className,
  delay = 0,
  as = "div",
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "p" | "span" | "li";
}) {
  const reduce = useReducedMotion();
  const MotionTag = motion[as];

  if (reduce) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay, ease: EASE }}
    >
      {children}
    </MotionTag>
  );
}

/* ------------------------------------------------------------------ */
/* MaskReveal — wraps a display line and slides it up under a mask     */
/* ------------------------------------------------------------------ */

export function MaskReveal({
  children,
  className,
  delay = 0,
  as = "div",
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "span";
}) {
  const reduce = useReducedMotion();
  const Wrapper = as;

  if (reduce) {
    return <Wrapper className={className}>{children}</Wrapper>;
  }

  return (
    <span className={cn("block overflow-hidden", as === "span" && "inline-block")}>
      <motion.span
        className={cn("block", className)}
        initial={{ y: "108%" }}
        whileInView={{ y: "0%" }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, delay, ease: EASE }}
      >
        {children}
      </motion.span>
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* DrawRule — hairline that scales in from the left on scroll          */
/* ------------------------------------------------------------------ */

export function DrawRule({
  className,
  color = "#e3e0d8",
  thickness = 1,
  delay = 0,
  vertical = false,
}: {
  className?: string;
  color?: string;
  thickness?: number;
  delay?: number;
  vertical?: boolean;
}) {
  const reduce = useReducedMotion();

  const style = vertical
    ? { width: thickness, backgroundColor: color }
    : { height: thickness, backgroundColor: color };

  if (reduce) {
    return (
      <div
        aria-hidden
        className={cn(vertical ? "h-full" : "w-full", className)}
        style={style}
      />
    );
  }

  return (
    <motion.div
      aria-hidden
      className={cn(vertical ? "h-full origin-top" : "w-full origin-left", className)}
      style={style}
      initial={vertical ? { scaleY: 0 } : { scaleX: 0 }}
      whileInView={vertical ? { scaleY: 1 } : { scaleX: 1 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.9, delay, ease: EASE }}
    />
  );
}

/* ------------------------------------------------------------------ */
/* CountUp — quietly counts to a target when in view                   */
/* ------------------------------------------------------------------ */

export function CountUp({
  value,
  className,
  suffix = "",
  prefix = "",
  duration = 1.1,
}: {
  value: number;
  className?: string;
  suffix?: string;
  prefix?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const reduce = useReducedMotion();
  const [display, setDisplay] = useState(reduce ? value : 0);

  useEffect(() => {
    if (!inView || reduce) {
      if (reduce) setDisplay(value);
      return;
    }
    const controls = animate(0, value, {
      duration,
      ease: EASE,
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, value, duration, reduce]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {display}
      {suffix}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* SnapIn — gentle reveal for callout cards                            */
/* ------------------------------------------------------------------ */

export function SnapIn({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduce = useReducedMotion();

  if (reduce) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* SectionHead — restrained eyebrow label + thin hairline              */
/* Replaces the cluttered coordinate-marker row.                       */
/* ------------------------------------------------------------------ */

export function SectionHead({
  label,
  className,
}: {
  label: string;
  className?: string;
}) {
  return (
    <div className={cn("mb-10 md:mb-14", className)}>
      <motion.span
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6 }}
        className="eyebrow block"
      >
        {label}
      </motion.span>
      <DrawRule className="mt-4" color="#e3e0d8" thickness={1} />
    </div>
  );
}
