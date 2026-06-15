"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { Check, Heart } from "lucide-react";
import { team, inMemoriam } from "@/lib/content";

const spring = { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const };

export default function Team() {
  const tania = team[0];

  return (
    <section id="team" className="section-pad relative px-4">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mb-12 max-w-2xl"
        >
          <span className="font-mono text-xs font-medium uppercase tracking-wider text-[#a69b92]">
            Leadership
          </span>
          <h2
            className="mt-3 font-display text-4xl text-[#1f1c1b] sm:text-5xl"
            style={{ fontWeight: 350, letterSpacing: "-0.01em", lineHeight: 1.0 }}
          >
            Led by recognised authorities.
          </h2>
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          {/* Portrait in rotating-glow glass ring frame */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={spring}
            className="flex flex-col items-center lg:sticky lg:top-28"
          >
            <div className="relative h-72 w-72">
              {/* Static thin orange outline ring — anchored, no rotation */}
              <div className="absolute -inset-2 rounded-full border border-[#ff7714]" />
              {/* Flat white frame */}
              <div className="absolute inset-0 overflow-hidden rounded-full border border-[#d9d6ce] bg-white p-2">
                <Image
                  src={tania.photo}
                  alt={`${tania.name}, ${tania.role} of Endispute`}
                  width={288}
                  height={288}
                  className="h-full w-full rounded-full object-cover"
                />
              </div>
            </div>
            <h3 className="mt-6 font-display text-2xl text-[#1f1c1b]" style={{ fontWeight: 400 }}>
              {tania.name}
            </h3>
            <p className="mt-1 font-mono text-sm text-[#ff7714]">{tania.role}</p>
          </motion.div>

          {/* Credentials + bio */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ ...spring, delay: 0.1 }}
            className="glass rounded-[2rem] bg-white/55 p-8"
          >
            <p className="text-base leading-relaxed text-[#1f1c1b]/90">
              {tania.short}
            </p>
            <p className="mt-4 text-[15px] leading-relaxed text-[#1f1c1b]/80">
              {tania.bio}
            </p>

            <div className="mt-7 h-px w-full bg-[#1f1c1b]/10" />

            <h4 className="mt-6 mb-4 font-mono text-xs font-medium uppercase tracking-wider text-[#a69b92]">
              Credentials & honours
            </h4>
            <div className="grid gap-x-6 gap-y-3 sm:grid-cols-2">
              {tania.credentials.map((c) => (
                <div key={c} className="flex gap-2.5">
                  <Check
                    size={16}
                    className="mt-0.5 flex-shrink-0 text-[#ff7714]"
                    strokeWidth={2.4}
                  />
                  <span className="text-sm leading-snug text-[#1f1c1b]/85">{c}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* In Memoriam */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={spring}
          className="glass copper-border-l mt-8 rounded-2xl bg-white/55 p-7 sm:p-8"
        >
          <div className="flex items-start gap-4">
            <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-[#ff7714]/12">
              <Heart size={20} className="text-[#ff7714]" strokeWidth={2} />
            </span>
            <div>
              <div className="flex flex-wrap items-baseline gap-x-3">
                <h3 className="font-display text-lg font-medium text-[#1f1c1b]">
                  In memoriam — {inMemoriam.name}
                </h3>
                <span className="font-mono text-sm text-[#1f1c1b]/70">
                  {inMemoriam.years}
                </span>
              </div>
              <p className="mt-2.5 text-[15px] leading-relaxed text-[#1f1c1b]/85">
                {inMemoriam.note}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
