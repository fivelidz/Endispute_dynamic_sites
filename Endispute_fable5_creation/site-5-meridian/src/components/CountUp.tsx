"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "motion/react";

/**
 * Eased count-up for the numeric portion of a stat value.
 * Preserves prefix/suffix. Non-numeric values render as-is.
 *
 * Guarded: only animates when the parsed target is a real, finite, > 0 number.
 * Never renders a placeholder zero (the old code showed "$0B+" before scroll).
 * If there is no valid number it renders the original string verbatim.
 */
export default function CountUp({ value }: { value: string }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const match = value.match(/^(\D*)(\d[\d,.]*)(.*)$/);
  const target = match ? parseFloat(match[2].replace(/,/g, "")) : NaN;
  const animatable = !!match && Number.isFinite(target) && target > 0;

  // Start on the final string so 0/NaN can never flash before scroll.
  const [display, setDisplay] = useState<string>(value);

  useEffect(() => {
    if (!animatable || reduce || !inView) {
      setDisplay(value);
      return;
    }
    const [, prefix, numStr, suffix] = match!;
    const decimals = numStr.includes(".") ? (numStr.split(".")[1]?.length ?? 0) : 0;

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
  }, [inView, reduce, value, animatable]); // eslint-disable-line react-hooks/exhaustive-deps

  return <span ref={ref}>{display}</span>;
}
