"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { team, inMemoriam } from "@/lib/content";
import Node from "./Node";

const tania = team[0];

export default function Team() {
  const reduce = useReducedMotion();

  return (
    <section id="team" className="relative px-6 py-20">
      <div className="mx-auto max-w-[1200px] lg:pl-[8%]">
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
                border: "1px dashed rgba(128,82,255,0.45)",
              }}
              animate={reduce ? undefined : { rotate: 360 }}
              transition={
                reduce
                  ? undefined
                  : { duration: 40, repeat: Infinity, ease: "linear" }
              }
            />
            {/* thin gold inner ring + photo */}
            <div className="absolute inset-4 overflow-hidden rounded-full border border-[#8052ff] shadow-[0_0_40px_rgba(128,82,255,0.2)]">
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
            <h2 className="font-serif text-4xl font-light leading-tight text-[#ffffff]">
              {tania.name}
            </h2>
            <p className="mt-2 font-mono text-xs uppercase tracking-[0.25em] text-[#9a9a9a]">
              {tania.role}
            </p>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-[#bdbdbd]">
              {tania.short}
            </p>
            <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-[#9a9a9a]">
              {tania.bio}
            </p>

            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {tania.credentials.map((c) => (
                <li key={c} className="flex gap-3 text-sm leading-relaxed text-[#bdbdbd]">
                  <span className="mt-1.5 block h-1.5 w-1.5 shrink-0 rounded-full bg-[#bdbdbd]" />
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
          className="mt-12 border-l-2 border-[#26262e] bg-[#0c0c12] p-8 sm:p-10"
        >
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#9a9a9a]">
            In memoriam
          </span>
          <h3 className="mt-3 font-serif text-2xl font-light text-[#ffffff]">
            {inMemoriam.name}{" "}
            <span className="text-[#9a9a9a]">{inMemoriam.years}</span>
          </h3>
          <p className="mt-4 max-w-3xl text-[15px] leading-relaxed text-[#bdbdbd]">
            {inMemoriam.note}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
