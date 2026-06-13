"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { processes } from "@/lib/content";
import { RuleFlourish } from "@/lib/flourishes";

export default function Processes() {
  const reduce = useReducedMotion();

  return (
    <section
      id="processes"
      className="bg-[#efe6d2]/60 px-5 py-28"
    >
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="mb-12 text-center"
        >
          <p className="smallcaps text-[15px] text-[#a8842c]">The range of remedies</p>
          <h2 className="mt-2 font-garamond text-3xl font-500 text-[#2b2118] md:text-4xl">
            Our dispute resolution processes
          </h2>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2">
          {processes.map((p, i) => (
            <motion.div
              key={p.name}
              initial={reduce ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: (i % 2) * 0.08 }}
              className="group relative border border-[#2b2118]/25 bg-[#f7f1e3] p-7 transition-colors hover:border-[#9e3b2b]/60"
            >
              {/* Gold corner ticks fade in on hover */}
              {["left-2 top-2", "right-2 top-2", "left-2 bottom-2", "right-2 bottom-2"].map(
                (pos, ti) => (
                  <span
                    key={ti}
                    className={`pointer-events-none absolute ${pos} h-3 w-3 border-[#a8842c] opacity-0 transition-opacity duration-300 group-hover:opacity-100 ${
                      ti === 0
                        ? "border-l border-t"
                        : ti === 1
                        ? "border-r border-t"
                        : ti === 2
                        ? "border-b border-l"
                        : "border-b border-r"
                    }`}
                  />
                )
              )}

              <h3 className="font-garamond text-2xl font-600 text-[#2b2118]">
                {p.name}
              </h3>
              <p className="mt-1 font-garamond text-lg italic text-[#9e3b2b]">
                {p.short}
              </p>
              <p className="mt-3 font-garamond text-base leading-relaxed text-[#7a6a55]">
                {p.description}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="my-14 flex justify-center">
          <RuleFlourish className="h-8 w-[400px] max-w-full" />
        </div>

        {/* Diagram framed with double-line border */}
        <motion.figure
          initial={reduce ? false : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7 }}
          className="mx-auto max-w-3xl border border-[#2b2118]/30 bg-[#f7f1e3] p-4"
        >
          <Image
            src="/The-Endispute-range-of-processes-5.png"
            alt="The Endispute range of dispute resolution processes"
            width={1200}
            height={800}
            className="h-auto w-full"
          />
          <figcaption className="smallcaps mt-4 text-center text-[13px] text-[#7a6a55]">
            The Endispute range of processes — facilitative to determinative
          </figcaption>
        </motion.figure>
      </div>
    </section>
  );
}
