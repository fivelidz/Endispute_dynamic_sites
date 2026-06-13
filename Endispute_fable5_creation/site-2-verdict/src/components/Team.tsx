"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import { team, inMemoriam } from "@/lib/content";

const ease = [0.22, 1, 0.36, 1] as const;

export default function Team() {
  const member = team[0];
  const [hover, setHover] = useState(false);
  const reduce = useReducedMotion();

  return (
    <section
      id="team"
      className="relative bg-[#101418] px-6 py-28 text-[#efe9dc] md:py-36"
    >
      <div className="mx-auto max-w-6xl">
        <p className="mono-label mb-5 text-[#b8ae98]">07 — Leadership</p>
        <h2 className="max-w-2xl font-serif text-4xl leading-tight sm:text-5xl">
          The mind behind <span className="italic text-[#c8472b]">Endispute</span>.
        </h2>

        <div className="mt-14 grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          {/* Duotone portrait */}
          <motion.div
            initial={reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={reduce ? { duration: 0 } : { duration: 0.8, ease }}
            className="relative aspect-[4/5] w-full overflow-hidden border border-[#efe9dc]/15"
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
          >
            <Image
              src={member.photo}
              alt={member.name}
              fill
              className="object-cover transition-all duration-700"
              style={{ filter: hover ? "grayscale(0)" : "grayscale(1)" }}
            />
            {/* vermilion multiply overlay fading out on hover */}
            <motion.div
              className="pointer-events-none absolute inset-0 mix-blend-multiply"
              style={{ backgroundColor: "#c8472b" }}
              animate={{ opacity: hover ? 0 : 0.55 }}
              transition={{ duration: reduce ? 0 : 0.6 }}
            />
          </motion.div>

          {/* Details */}
          <div>
            <h3 className="font-serif text-3xl text-[#efe9dc]">{member.name}</h3>
            <p className="mt-1 font-mono text-xs uppercase tracking-[0.16em] text-[#c8472b]">
              {member.role}
            </p>
            <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-[#b8ae98]">
              {member.short}
            </p>
            <p className="mt-4 max-w-xl text-[14px] leading-relaxed text-[#b8ae98]">
              {member.bio}
            </p>

            <ul className="mt-8 grid gap-2.5 sm:grid-cols-2">
              {member.credentials.map((c) => (
                <li
                  key={c}
                  className="flex gap-3 font-mono text-[12px] leading-relaxed text-[#b8ae98]"
                >
                  <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-[#c8472b]" />
                  {c}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* In memoriam — cream-on-ink bordered block */}
        <motion.div
          initial={reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={reduce ? { duration: 0 } : { duration: 0.8, ease }}
          className="mt-16 border border-[#b8ae98]/40 p-9"
        >
          <p className="mono-label text-[#c8472b]">In memoriam</p>
          <h4 className="mt-4 font-serif text-2xl italic text-[#efe9dc]">
            {inMemoriam.name}
          </h4>
          <p className="mt-1 font-mono text-xs tracking-[0.14em] text-[#b8ae98]">
            {inMemoriam.years}
          </p>
          <p className="mt-5 max-w-3xl text-[14px] leading-relaxed text-[#b8ae98]">
            {inMemoriam.note}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
