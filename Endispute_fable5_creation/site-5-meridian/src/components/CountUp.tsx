"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "motion/react";

/**
 * Eased count-up for the numeric portion of a stat value.
 * Preserves prefix/suffix (e.g. "$2B+", "48hr"). Non-numeric values render as-is.
 */
export default function CountUp({ value }: { value: string }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [display, setDisplay] = useState<string>(value);

  const match = value.match(/^(\D*)(\d[\d,.]*)(.*)$/);

  useEffect(() => {
    if (!match) {
      setDisplay(value);
      return;
    }
    const [, prefix, numStr, suffix] = match;
    const target = parseFloat(numStr.replace(/,/g, ""));
    const decimals = numStr.includes(".") ? (numStr.split(".")[1]?.length ?? 0) : 0;

    if (reduce || !inView) {
      if (reduce) setDisplay(value);
      else setDisplay(`${prefix}0${suffix}`);
      return;
    }

    let raf = 0;
    const duration = 1400;
    const start = performance.now();
    const ease = (t: number) => 1 - Math.pow(1 - t, 3);

    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      const current = target * ease(t);
      setDisplay(`${prefix}${current.toFixed(decimals)}${suffix}`);
      if (t < 1) raf = requestAnimationFrame(tick);
      else setDisplay(value);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, reduce, value, match]);

  return (
    <span
      ref={ref}
      style={{ textShadow: "0 0 18px rgba(212,168,67,0.45)" }}
    >
      {display}
    </span>
  );
}
