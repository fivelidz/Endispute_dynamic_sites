"use client";

import { motion, useReducedMotion } from "motion/react";
import { company } from "@/lib/content";
import { RuleFlourish, CornerOrnament } from "@/lib/flourishes";

export default function About() {
  const reduce = useReducedMotion();

  return (
    <section id="about" className="relative mx-auto max-w-5xl px-5 py-24">
      {/* Corner ornaments */}
      <CornerOrnament className="absolute left-2 top-2 h-12 w-12 opacity-70" />
      <CornerOrnament className="absolute right-2 top-2 h-12 w-12 -scale-x-100 opacity-70" />

      <div className="mb-12 flex justify-center">
        <RuleFlourish className="h-8 w-[400px] max-w-full" />
      </div>

      <motion.h2
        initial={reduce ? false : { opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7 }}
        className="mb-12 text-center font-garamond text-3xl font-500 text-[#2b2118] md:text-4xl"
      >
        <span className="smallcaps mr-3 text-[15px] align-middle text-[#a8842c]">
          On the record
        </span>
        <br className="md:hidden" />
        Who we are
      </motion.h2>

      <div className="grid gap-12 md:grid-cols-2">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
        >
          <p className="dropcap font-garamond text-lg leading-relaxed text-[#2b2118]">
            {company.about}
          </p>
        </motion.div>

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, delay: 0.12 }}
        >
          <p className="dropcap font-garamond text-lg leading-relaxed text-[#2b2118]">
            {company.whoWeAre}
          </p>
        </motion.div>
      </div>

      {/* Mission blockquote with gold ornaments */}
      <motion.blockquote
        initial={reduce ? false : { opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.8, delay: 0.1 }}
        className="mx-auto mt-16 max-w-3xl text-center"
      >
        <span className="mb-4 block text-2xl text-[#a8842c]">✦</span>
        <p className="font-garamond text-2xl italic leading-relaxed text-[#2b2118] md:text-[28px]">
          {company.mission}
        </p>
        <span className="mt-4 block text-2xl text-[#a8842c]">✦</span>
      </motion.blockquote>
    </section>
  );
}
