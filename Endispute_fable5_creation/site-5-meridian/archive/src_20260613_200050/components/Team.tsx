"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { team, inMemoriam } from "@/lib/content";
import Node from "./Node";

const tania = team[0];

export default function Team() {
  const reduce = useReducedMotion();

  return (
    <section id="team" className="relative px-6 py-28">
      <div className="mx-auto max-w-7xl lg:pl-[8%]">
        <Node label="05 — The Director" className="mb-8" />

        <div className="grid gap-14 lg:grid-cols-[auto_1fr] lg:items-start">
          {/* portrait in gold ring with rotating dashed outer ring */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7 }}
            className="relative mx-auto h-[280px] w-[280px] shrink-0 sm:h-[320px] sm:w-[320px]"
          >
            {/* rotating dashed outer ring */}
            <motion.div
              aria-hidden
              className="absolute inset-0 rounded-full"
              style={{
                border: "1px dashed rgba(212,168,67,0.45)",
              }}
              animate={reduce ? undefined : { rotate: 360 }}
              transition={
                reduce
                  ? undefined
                  : { duration: 40, repeat: Infinity, ease: "linear" }
              }
            />
            {/* thin gold inner ring + photo */}
            <div className="absolute inset-4 overflow-hidden rounded-full border border-[#d4a843] shadow-[0_0_40px_rgba(212,168,67,0.2)]">
              <Image
                src={tania.photo}
                alt={tania.name}
                fill
                sizes="320px"
                className="object-cover object-top"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-serif text-4xl font-light leading-tight text-[#e8ecf4]">
              {tania.name}
            </h2>
            <p className="mt-2 font-mono text-xs uppercase tracking-[0.25em] text-[#8a93a8]">
              {tania.role}
            </p>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-[#b8c0d4]">
              {tania.short}
            </p>
            <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-[#8a93a8]">
              {tania.bio}
            </p>

            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {tania.credentials.map((c) => (
                <li key={c} className="flex gap-3 text-sm leading-relaxed text-[#b8c0d4]">
                  <span className="mt-1.5 block h-1.5 w-1.5 shrink-0 rounded-full bg-[#b8c0d4]" />
                  <span>{c}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* in memoriam */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mt-16 border-l-2 border-[#232c48] bg-[#141b30] p-8 sm:p-10"
        >
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#8a93a8]">
            In memoriam
          </span>
          <h3 className="mt-3 font-serif text-2xl font-light text-[#e8ecf4]">
            {inMemoriam.name}{" "}
            <span className="text-[#8a93a8]">{inMemoriam.years}</span>
          </h3>
          <p className="mt-4 max-w-3xl text-[15px] leading-relaxed text-[#b8c0d4]">
            {inMemoriam.note}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
