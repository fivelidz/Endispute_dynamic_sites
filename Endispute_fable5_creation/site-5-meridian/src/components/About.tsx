"use client";

import { motion } from "motion/react";
import { company } from "@/lib/content";
import Node from "./Node";

export default function About() {
  return (
    <section id="about" className="relative px-6 py-20">
      <div className="mx-auto max-w-[1200px] lg:pl-[8%]">
        <Node label="01 — Orientation" className="mb-8" />

        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl font-serif text-4xl font-light leading-tight tracking-tight text-[#ffffff] sm:text-5xl"
        >
          Charting a clear course through{" "}
          <span className="italic text-[#8052ff]">complex disputes.</span>
        </motion.h2>

        <div className="mt-10 grid gap-12 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-lg leading-relaxed text-[#bdbdbd]">
              {company.about}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <p className="text-lg leading-relaxed text-[#bdbdbd]">
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
          className="mt-12 border-l-2 border-[#26262e] bg-[#0c0c12] p-8 sm:p-10"
        >
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#9a9a9a]">
            Our mission
          </span>
          <p className="mt-4 max-w-4xl font-serif text-xl leading-relaxed text-[#ffffff] sm:text-2xl">
            {company.mission}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
