"use client";

import { motion, useReducedMotion } from "motion/react";
import { company } from "@/lib/content";
import MaskReveal from "./MaskReveal";

const ease = [0.22, 1, 0.36, 1] as const;

export default function About() {
  const reduce = useReducedMotion();
  const reveal = (delay = 0) =>
    reduce
      ? {
          initial: { opacity: 1, y: 0 },
          transition: { duration: 0 },
        }
      : {
          initial: { opacity: 0, y: 24 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, margin: "-80px" },
          transition: { duration: 0.8, delay, ease },
        };

  return (
    <section
      id="about"
      className="relative bg-[#f6f1e7] px-6 py-28 text-[#16191d] md:py-36"
    >
      <div className="mx-auto max-w-5xl">
        <p className="mono-label mb-8 text-[#6e6a60]">01 — Who we are</p>

        <h2 className="font-serif text-4xl leading-tight sm:text-5xl lg:text-6xl">
          <MaskReveal lines={["A leading provider of", "dispute resolution."]} />
        </h2>

        {/* Big serif pull-quote from mission */}
        <motion.blockquote
          {...reveal()}
          className="mt-14 border-l-2 border-[#c8472b] pl-7 font-serif text-2xl italic leading-snug sm:text-3xl lg:text-[2.1rem]"
        >
          {company.mission}
        </motion.blockquote>

        <div className="mt-16 grid gap-10 md:grid-cols-2">
          <motion.p
            {...reveal()}
            className="text-[15px] leading-relaxed text-[#6e6a60]"
          >
            {company.about}
          </motion.p>
          <motion.p
            {...reveal(0.1)}
            className="text-[15px] leading-relaxed text-[#6e6a60]"
          >
            {company.whoWeAre}
          </motion.p>
        </div>
      </div>
    </section>
  );
}
