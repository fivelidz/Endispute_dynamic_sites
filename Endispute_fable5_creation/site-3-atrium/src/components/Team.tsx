"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { Check, Heart } from "lucide-react";
import { team, inMemoriam } from "@/lib/content";

const spring = { type: "spring" as const, stiffness: 70, damping: 18 };

export default function Team() {
  const tania = team[0];

  return (
    <section id="team" className="section-pad relative px-4">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mb-12 max-w-2xl"
        >
          <span className="font-mono text-xs font-medium uppercase tracking-wider text-[#2563ab]">
            Leadership
          </span>
          <h2
            className="mt-3 font-display text-4xl font-bold tracking-tight text-[#1c2530] sm:text-5xl"
            style={{ letterSpacing: "-0.02em" }}
          >
            Led by recognised authorities.
          </h2>
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          {/* Portrait in rotating-glow glass ring frame */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={spring}
            className="flex flex-col items-center lg:sticky lg:top-28"
          >
            <div className="relative h-72 w-72">
              {/* Rotating conic copper glow ring */}
              <div className="ring-rotate absolute -inset-2 rounded-full bg-[conic-gradient(from_0deg,rgba(184,117,69,0.7),rgba(37,99,171,0.3),rgba(184,117,69,0)_60%,rgba(184,117,69,0.7))] blur-[2px]" />
              {/* Glass frame */}
              <div className="glass absolute inset-0 overflow-hidden rounded-full bg-white/40 p-2">
                <Image
                  src={tania.photo}
                  alt={`${tania.name}, ${tania.role} of Endispute`}
                  width={288}
                  height={288}
                  className="h-full w-full rounded-full object-cover"
                />
              </div>
            </div>
            <h3 className="mt-6 font-display text-2xl font-bold text-[#1c2530]">
              {tania.name}
            </h3>
            <p className="mt-1 font-mono text-sm text-[#2563ab]">{tania.role}</p>
          </motion.div>

          {/* Credentials + bio */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ ...spring, delay: 0.1 }}
            className="glass rounded-[2rem] bg-white/55 p-8"
          >
            <p className="text-base leading-relaxed text-[#1c2530]/90">
              {tania.short}
            </p>
            <p className="mt-4 text-[15px] leading-relaxed text-[#1c2530]/80">
              {tania.bio}
            </p>

            <div className="mt-7 h-px w-full bg-[#1c2530]/10" />

            <h4 className="mt-6 mb-4 font-mono text-xs font-medium uppercase tracking-wider text-[#2563ab]">
              Credentials & honours
            </h4>
            <div className="grid gap-x-6 gap-y-3 sm:grid-cols-2">
              {tania.credentials.map((c) => (
                <div key={c} className="flex gap-2.5">
                  <Check
                    size={16}
                    className="mt-0.5 flex-shrink-0 text-[#2563ab]"
                    strokeWidth={2.4}
                  />
                  <span className="text-sm leading-snug text-[#1c2530]/85">{c}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* In Memoriam */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={spring}
          className="glass copper-border-l mt-8 rounded-2xl bg-white/55 p-7 sm:p-8"
        >
          <div className="flex items-start gap-4">
            <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-[#b87545]/12">
              <Heart size={20} className="text-[#b87545]" strokeWidth={2} />
            </span>
            <div>
              <div className="flex flex-wrap items-baseline gap-x-3">
                <h3 className="font-display text-lg font-bold text-[#1c2530]">
                  In memoriam — {inMemoriam.name}
                </h3>
                <span className="font-mono text-sm text-[#1c2530]/70">
                  {inMemoriam.years}
                </span>
              </div>
              <p className="mt-2.5 text-[15px] leading-relaxed text-[#1c2530]/85">
                {inMemoriam.note}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
