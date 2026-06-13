"use client";

import { useReducedMotion } from "motion/react";

const WORDS = ["Dispute Resolution", "Advisory", "Management"];

function Strip() {
  return (
    <div className="flex shrink-0 items-center">
      {WORDS.map((w) => (
        <span key={w} className="flex items-center">
          <span className="outline-text px-6 font-heavy text-[clamp(2.5rem,7vw,6rem)] uppercase leading-none tracking-tight">
            {w}
          </span>
          <span className="outline-text-signal px-6 font-heavy text-[clamp(2.5rem,7vw,6rem)] uppercase leading-none">
            —
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
      className="overflow-hidden border-y border-[#d6d2c8] bg-[#f4f2ed] py-8"
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
