"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { team, inMemoriam } from "@/lib/content";
import { MaskReveal, Reveal, SectionHead } from "./primitives";

export default function Team() {
  const tania = team[0];

  return (
    <section
      id="director"
      className="relative border-t border-[#e3e0d8] px-5 py-24 md:px-10 md:py-32"
    >
      <div className="mx-auto max-w-[1240px]">
        <SectionHead label="Director — Leadership" />

        <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-16">
          {/* Photo */}
          <div className="md:col-span-5">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden rounded-[8px] border border-[#e3e0d8]"
            >
              <Image
                src={tania.photo}
                alt={tania.name}
                width={940}
                height={673}
                loading="lazy"
                className="h-auto w-full"
              />
            </motion.div>
          </div>

          {/* Bio + credentials */}
          <div className="md:col-span-7">
            <span className="eyebrow block">{tania.role}</span>
            <h2 className="mt-3 font-display text-[clamp(2rem,4.5vw,3.4rem)] font-light leading-[1.0] tracking-[-0.02em] text-[#0a0a0a]">
              <MaskReveal>{tania.name}</MaskReveal>
            </h2>
            <Reveal as="p" className="measure mt-6 text-[17px] leading-[1.65] text-[#0a0a0a]">
              {tania.short}
            </Reveal>
            <Reveal
              as="p"
              delay={0.1}
              className="measure mt-5 text-[15px] leading-[1.7] text-[#444444]"
            >
              {tania.bio}
            </Reveal>

            <span className="eyebrow mt-10 block">Credentials</span>
            <div className="mt-4 border-t border-[#e3e0d8]">
              {tania.credentials.map((c, i) => (
                <Reveal
                  key={i}
                  as="div"
                  delay={i * 0.02}
                  className="border-b border-[#e3e0d8] py-3.5 text-[15px] leading-[1.55] text-[#444444]"
                >
                  {c}
                </Reveal>
              ))}
            </div>
          </div>
        </div>

        {/* In memoriam */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mt-20 rounded-[8px] border border-[#e3e0d8] bg-[#fcfbf7] p-8 md:p-12"
        >
          <div className="grid grid-cols-1 gap-6 md:grid-cols-12">
            <div className="md:col-span-4">
              <span className="eyebrow block">In Memoriam</span>
              <h3 className="mt-3 font-display text-[1.5rem] font-medium leading-[1.15] tracking-[-0.01em] text-[#0a0a0a] md:text-[1.75rem]">
                {inMemoriam.name}
              </h3>
              <span className="mt-1 block text-[13px] text-[#6b6b6b]">
                {inMemoriam.years}
              </span>
            </div>
            <p className="measure text-[15px] leading-[1.7] text-[#444444] md:col-span-8">
              {inMemoriam.note}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
