"use client";

import { motion } from "motion/react";
import { company } from "@/lib/content";
import Node from "./Node";

export default function About() {
  return (
    <section id="about" className="relative px-6 py-28">
      <div className="mx-auto max-w-7xl lg:pl-[8%]">
        <Node label="01 — Orientation" className="mb-8" />

        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl font-serif text-4xl font-light leading-tight tracking-tight text-[#e8ecf4] sm:text-5xl"
        >
          Charting a clear course through{" "}
          <span className="italic text-[#d4a843]">complex disputes.</span>
        </motion.h2>

        <div className="mt-14 grid gap-12 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-lg leading-relaxed text-[#b8c0d4]">
              {company.about}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <p className="text-lg leading-relaxed text-[#b8c0d4]">
              {company.whoWeAre}
            </p>
          </motion.div>
        </div>

        {/* mission panel */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mt-12 border-l-2 border-[#232c48] bg-[#141b30] p-8 sm:p-10"
        >
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#8a93a8]">
            Our mission
          </span>
          <p className="mt-4 max-w-4xl font-serif text-xl leading-relaxed text-[#e8ecf4] sm:text-2xl">
            {company.mission}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
