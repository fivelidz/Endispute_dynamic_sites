"use client";

import { useReducedMotion } from "motion/react";

const WORDS = [
  "Facilitation",
  "Structured Mediation",
  "Evaluative Processes",
  "Expert Referral",
  "Arbitration",
];

function Strip() {
  return (
    <div className="flex shrink-0 items-center">
      {WORDS.map((w) => (
        <span key={w} className="flex items-center">
          <span className="px-8 font-display text-[clamp(1.6rem,4vw,3rem)] font-light leading-none tracking-[-0.01em] text-[#0a0a0a]">
            {w}
          </span>
          <span
            aria-hidden
            className="font-display text-[clamp(1.6rem,4vw,3rem)] font-light leading-none text-[#c4c0b6]"
          >
            /
          </span>
        </span>
      ))}
    </div>
  );
}

export default function Marquee() {
  const reduce = useReducedMotion();

  return (
    <section
      aria-hidden
      className="overflow-hidden border-y border-[#e3e0d8] bg-[#fefefc] py-10"
    >
      <div className="flex w-max flex-nowrap">
        <div
          className={reduce ? "flex flex-nowrap" : "marquee-track flex flex-nowrap"}
        >
          <Strip />
          <Strip />
        </div>
      </div>
    </section>
  );
}
