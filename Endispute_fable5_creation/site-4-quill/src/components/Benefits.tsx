"use client";

import { motion, useReducedMotion } from "motion/react";
import { benefits } from "@/lib/content";

export default function Benefits() {
  const reduce = useReducedMotion();

  return (
    <section
      id="benefits"
      className="mx-auto max-w-4xl px-5 py-20"
    >
      <motion.div
        initial={reduce ? false : { opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7 }}
        className="mb-12 text-center"
      >
        <p className="smallcaps text-[15px] text-[#a8842c]">In your favour</p>
        <h2 className="mt-2 font-garamond text-3xl font-500 text-[#2b2118] md:text-4xl">
          Why parties choose Endispute
        </h2>
      </motion.div>

      <ul className="border-t border-[#7a6a55]/30">
        {benefits.map((b, i) => (
          <motion.li
            key={b.title}
            initial={reduce ? false : { opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55, delay: i * 0.08 }}
            className="flex gap-5 border-b border-[#7a6a55]/30 py-6"
          >
            <motion.span
              aria-hidden="true"
              initial={reduce ? false : { rotate: -120, opacity: 0, scale: 0.6 }}
              whileInView={{ rotate: 0, opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.08 + 0.1, ease: "easeOut" }}
              className="mt-1 select-none text-2xl leading-none text-[#a8842c]"
            >
              ✦
            </motion.span>
            <div>
              <h3 className="font-garamond text-xl font-600 text-[#2b2118]">
                {b.title}
              </h3>
              <p className="mt-1 font-garamond text-lg leading-relaxed text-[#7a6a55]">
                {b.detail}
              </p>
            </div>
          </motion.li>
        ))}
      </ul>
    </section>
  );
}
