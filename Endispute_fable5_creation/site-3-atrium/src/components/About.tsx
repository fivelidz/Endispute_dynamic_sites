"use client";

import { motion } from "motion/react";
import { Quote } from "lucide-react";
import { company } from "@/lib/content";

const spring = { type: "spring" as const, stiffness: 70, damping: 18 };

export default function About() {
  return (
    <section id="about" className="section-pad relative px-4">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mb-10 max-w-2xl"
        >
          <span className="font-mono text-xs font-medium uppercase tracking-wider text-[#2563ab]">
            Who we are
          </span>
          <h2
            className="mt-3 font-display text-4xl font-bold tracking-tight text-[#1c2530] sm:text-5xl"
            style={{ letterSpacing: "-0.02em" }}
          >
            A profession built on relationships.
          </h2>
        </motion.div>

        <div className="relative">
          {/* Large glass panel */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={spring}
            className="glass rounded-[2rem] bg-white/55 p-8 sm:p-12 lg:pr-72"
          >
            <p className="text-lg leading-relaxed text-[#1c2530]">
              {company.about}
            </p>
            <div className="mt-6 h-px w-full bg-[#1c2530]/10" />
            <p className="mt-6 text-base leading-relaxed text-[#1c2530]/85">
              {company.workingWithUs}
            </p>
          </motion.div>

          {/* Floating mission card — overlaps, copper left border */}
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.96 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ ...spring, delay: 0.15 }}
            className="glass copper-border-l relative z-10 mx-auto -mt-6 max-w-md rounded-2xl bg-white/70 p-6 sm:p-7 lg:absolute lg:-bottom-10 lg:right-0 lg:mt-0 lg:max-w-sm"
          >
            <Quote size={26} className="mb-3 text-[#b87545]" strokeWidth={2} />
            <p className="text-[15px] font-medium leading-relaxed text-[#1c2530]">
              {company.mission}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
