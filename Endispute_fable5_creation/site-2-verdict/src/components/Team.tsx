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
      className="relative bg-[#1a1a1a] px-6 py-20 text-[#cccccc] md:py-24"
    >
      <div className="measure">
        <p className="mono-label mb-5 text-[#cccccc]">07 — Leadership</p>
        <h2 className="display max-w-2xl text-[clamp(2rem,4.5vw,3.25rem)]">
          The mind behind <span className="text-[#fc1c46]">Endispute</span>.
        </h2>

        <div className="mt-12 grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          {/* Duotone portrait */}
          <motion.div
            initial={reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={reduce ? { duration: 0 } : { duration: 0.8, ease }}
            className="relative aspect-[4/5] w-full overflow-hidden border border-[#4c4c4c]"
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
              style={{ backgroundColor: "#fc1c46" }}
              animate={{ opacity: hover ? 0 : 0.45 }}
              transition={{ duration: reduce ? 0 : 0.6 }}
            />
          </motion.div>

          {/* Details */}
          <div>
            <h3 className="font-serif text-3xl text-white">{member.name}</h3>
            <p className="mt-1 font-mono text-xs uppercase tracking-[0.16em] text-[#fc1c46]">
              {member.role}
            </p>
            <p className="mt-5 max-w-xl text-[16px] leading-[1.5] text-[#cccccc]">
              {member.short}
            </p>
            <p className="mt-4 max-w-xl text-[15px] leading-[1.5] text-[#cccccc]">
              {member.bio}
            </p>

            <ul className="mt-8 grid gap-2.5 sm:grid-cols-2">
              {member.credentials.map((c) => (
                <li
                  key={c}
                  className="flex gap-3 font-mono text-[12px] leading-[1.5] text-[#cccccc]"
                >
                  <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-[#fc1c46]" />
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
          className="mt-12 border border-[#4c4c4c] p-9"
        >
          <p className="mono-label text-[#cccccc]">In memoriam</p>
          <h4 className="mt-4 font-serif text-2xl italic text-white">
            {inMemoriam.name}
          </h4>
          <p className="mt-1 font-mono text-xs tracking-[0.14em] text-[#cccccc]">
            {inMemoriam.years}
          </p>
          <p className="mt-5 max-w-3xl text-[15px] leading-[1.5] text-[#cccccc]">
            {inMemoriam.note}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
