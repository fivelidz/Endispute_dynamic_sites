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
      className="relative bg-[#0a0a0a] px-6 py-20 text-[#cccccc] md:py-24"
    >
      <div className="measure max-w-5xl">
        <p className="mono-label mb-8 text-[#cccccc]">01 — Who we are</p>

        <h2 className="display text-[clamp(2.25rem,5vw,3.75rem)]">
          <MaskReveal lines={["A leading provider of", "dispute resolution."]} />
        </h2>

        {/* Pull-quote from mission — red seam on the left edge */}
        <motion.blockquote
          {...reveal()}
          className="mt-12 border-l-2 border-[#fc1c46] pl-7 font-serif text-2xl italic leading-snug text-white sm:text-3xl"
        >
          {company.mission}
        </motion.blockquote>

        <div className="mt-12 grid gap-10 md:grid-cols-2">
          <motion.p
            {...reveal()}
            className="text-[16px] leading-[1.5] text-[#cccccc]"
          >
            {company.about}
          </motion.p>
          <motion.p
            {...reveal(0.1)}
            className="text-[16px] leading-[1.5] text-[#cccccc]"
          >
            {company.whoWeAre}
          </motion.p>
        </div>
      </div>
    </section>
  );
}
