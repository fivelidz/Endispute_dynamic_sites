"use client";

import { useReducedMotion } from "motion/react";
import { panels } from "@/lib/content";

const expertise = panels.expertise;

function MarqueeRow({
  reverse,
  speed,
}: {
  reverse: boolean;
  speed: number;
}) {
  const reducedMotion = useReducedMotion();
  // Triple the items to ensure seamless loop
  const items = [...expertise, ...expertise, ...expertise];

  return (
    <div className="overflow-hidden py-2">
      <div
        className="flex gap-10 whitespace-nowrap"
        style={
          reducedMotion
            ? {}
            : {
                animation: `marquee-${reverse ? "reverse" : "forward"} ${speed}s linear infinite`,
              }
        }
      >
        {items.map((item, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-4 shrink-0"
          >
            <span
              className="text-xs font-mono uppercase tracking-[0.2em] text-[#c8bfa8]/60"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              {item}
            </span>
            <span className="w-1 h-1 rounded-full bg-[#d4a14a]/40 inline-block" />
          </span>
        ))}
      </div>
    </div>
  );
}

export default function MarqueeBand() {
  return (
    <>
      <style>{`
        @keyframes marquee-forward {
          from { transform: translateX(0); }
          to { transform: translateX(-33.333%); }
        }
        @keyframes marquee-reverse {
          from { transform: translateX(-33.333%); }
          to { transform: translateX(0); }
        }
        @media (prefers-reduced-motion: reduce) {
          @keyframes marquee-forward { from {} to {} }
          @keyframes marquee-reverse { from {} to {} }
        }
      `}</style>
      <div
        className="w-full bg-[#1c1c1c] border-y border-[#2e2e2e] py-4 overflow-hidden"
        aria-label="Expertise areas marquee"
      >
        <MarqueeRow reverse={false} speed={28} />
        <MarqueeRow reverse={true} speed={22} />
      </div>
    </>
  );
}
