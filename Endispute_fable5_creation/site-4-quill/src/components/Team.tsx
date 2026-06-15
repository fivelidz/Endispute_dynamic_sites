"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { team, inMemoriam } from "@/lib/content";
import { RuleFlourish } from "@/lib/flourishes";

const romanLower = [
  "i",
  "ii",
  "iii",
  "iv",
  "v",
  "vi",
  "vii",
  "viii",
  "ix",
  "x",
  "xi",
  "xii",
];

export default function Team() {
  const reduce = useReducedMotion();
  const t = team[0];

  return (
    <section id="team" className="mx-auto max-w-5xl px-5 py-28">
      <div className="mb-12 flex justify-center">
        <RuleFlourish className="h-8 w-[400px] max-w-full" />
      </div>

      <motion.div
        initial={reduce ? false : { opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7 }}
        className="mb-12 text-center"
      >
        <p className="smallcaps text-[15px] text-[#a8842c]">The director</p>
        <h2 className="mt-2 font-garamond text-3xl font-500 text-[#1f1c1b] md:text-4xl">
          {t.name}
        </h2>
        <p className="mt-1 font-garamond text-lg italic text-[#6b6b6b]">
          {t.role}
        </p>
      </motion.div>

      <div className="grid gap-12 md:grid-cols-[auto_1fr]">
        {/* Sepia portrait in double-line frame with gold corner ticks */}
        <motion.div
          initial={reduce ? false : { opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="relative mx-auto"
        >
          <div className="relative border border-[#1f1c1b]/50 p-2 outline outline-1 outline-offset-[4px] outline-[#a8842c]/45">
            <Image
              src={t.photo}
              alt={t.name}
              width={300}
              height={380}
              className="h-auto w-[260px] object-cover"
              style={{ filter: "sepia(0.35)" }}
            />
            {/* gold corner ticks */}
            {["left-[-6px] top-[-6px]", "right-[-6px] top-[-6px]", "left-[-6px] bottom-[-6px]", "right-[-6px] bottom-[-6px]"].map(
              (pos, ti) => (
                <span
                  key={ti}
                  className={`absolute ${pos} h-4 w-4 border-[#a8842c] ${
                    ti === 0
                      ? "border-l-2 border-t-2"
                      : ti === 1
                      ? "border-r-2 border-t-2"
                      : ti === 2
                      ? "border-b-2 border-l-2"
                      : "border-b-2 border-r-2"
                  }`}
                />
              )
            )}
          </div>
        </motion.div>

        <div>
          <motion.p
            initial={reduce ? false : { opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7 }}
            className="dropcap font-garamond text-lg leading-relaxed text-[#1f1c1b]"
          >
            {t.bio}
          </motion.p>

          <motion.div
            initial={reduce ? false : { opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mt-7"
          >
            <p className="smallcaps mb-3 text-[14px] text-[#a8842c]">
              Credentials of record
            </p>
            <ul className="space-y-2">
              {t.credentials.map((c, i) => (
                <li
                  key={i}
                  className="flex gap-3 font-garamond text-base leading-relaxed text-[#6b6b6b]"
                >
                  <span className="w-8 shrink-0 text-right font-mono-quill text-sm text-[#a8842c]">
                    {romanLower[i]}.
                  </span>
                  <span>{c}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>

      {/* In memoriam */}
      <motion.div
        initial={reduce ? false : { opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7 }}
        className="mx-auto mt-16 max-w-2xl border border-[#6b6b6b]/30 bg-[#efe6d2]/50 p-8 text-center"
      >
        <p className="smallcaps text-[13px] text-[#a8842c]">In memoriam</p>
        <h3 className="mt-2 font-garamond text-2xl font-600 text-[#1f1c1b]">
          {inMemoriam.name}
        </h3>
        <p className="font-mono-quill text-sm text-[#6b6b6b]">
          {inMemoriam.years}
        </p>
        <p className="mt-4 font-garamond text-base italic leading-relaxed text-[#1f1c1b]">
          {inMemoriam.note}
        </p>
      </motion.div>
    </section>
  );
}
