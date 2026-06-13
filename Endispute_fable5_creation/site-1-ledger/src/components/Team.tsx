"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { team, inMemoriam } from "@/lib/content";
import { MaskReveal, Coord, DrawRule } from "./primitives";

export default function Team() {
  const tania = team[0];

  return (
    <section
      id="director"
      className="relative border-t border-[#d6d2c8] bg-[#f4f2ed] px-5 py-20 md:px-10 md:py-28"
    >
      <div className="mx-auto max-w-[1600px]">
        <div className="mb-10 flex items-start justify-between">
          <Coord label="A7 / 06 — Director" />
          <Coord label="§ Leadership" />
        </div>

        <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-12">
          {/* Photo in hairline frame */}
          <div className="md:col-span-5">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7 }}
              className="group border border-[#d6d2c8] bg-[#f4f2ed] p-3"
            >
              <Image
                src={tania.photo}
                alt={tania.name}
                width={940}
                height={673}
                loading="lazy"
                className="h-auto w-full grayscale transition-all duration-500 group-hover:grayscale-0"
              />
              <div className="flex items-center justify-between border-t border-[#d6d2c8] px-1 pt-3">
                <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#8a877f]">
                  Fig. 02 — Director
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#d92b1c]">
                  Greyscale → Colour
                </span>
              </div>
            </motion.div>
          </div>

          {/* Bio + credentials */}
          <div className="md:col-span-7">
            <span className="mb-3 block font-mono text-[11px] uppercase tracking-[0.2em] text-[#d92b1c]">
              ▪ {tania.role}
            </span>
            <h2 className="font-display font-semibold text-[clamp(2rem,4.5vw,3.6rem)] uppercase leading-[0.9] tracking-[-0.02em] text-[#0a0a0a]">
              <MaskReveal>{tania.name}</MaskReveal>
            </h2>
            <p className="mt-5 max-w-2xl font-display text-lg leading-snug text-[#0a0a0a]">
              {tania.short}
            </p>
            <p className="mt-4 max-w-2xl font-display text-base leading-relaxed text-[#8a877f]">
              {tania.bio}
            </p>

            <DrawRule className="my-8" color="#0a0a0a" thickness={2} />

            <span className="mb-4 block font-mono text-[11px] uppercase tracking-[0.18em] text-[#8a877f]">
              / Credentials — {tania.credentials.length} entries
            </span>
            <div>
              {tania.credentials.map((c, i) => (
                <div key={i}>
                  <DrawRule delay={i * 0.03} />
                  <div className="flex gap-4 py-3.5">
                    <span className="shrink-0 font-mono text-[12px] tabular-nums tracking-[0.1em] text-[#d92b1c]">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="font-display text-[15px] leading-snug text-[#0a0a0a]">
                      {c}
                    </span>
                  </div>
                </div>
              ))}
              <DrawRule delay={0.2} />
            </div>
          </div>
        </div>

        {/* In memoriam block */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="mt-16 border border-[#d6d2c8] bg-[#f4f2ed] p-7 md:p-10"
        >
          <div className="grid grid-cols-1 gap-6 md:grid-cols-12">
            <div className="md:col-span-3">
              <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#d92b1c]">
                ▪ In Memoriam
              </span>
            </div>
            <div className="md:col-span-9">
              <h3 className="font-heavy text-xl uppercase leading-tight text-[#0a0a0a] md:text-2xl">
                {inMemoriam.name}
              </h3>
              <span className="mt-1 block font-mono text-[12px] tracking-[0.15em] text-[#8a877f]">
                {inMemoriam.years}
              </span>
              <p className="mt-4 max-w-2xl font-display text-base leading-relaxed text-[#8a877f]">
                {inMemoriam.note}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
