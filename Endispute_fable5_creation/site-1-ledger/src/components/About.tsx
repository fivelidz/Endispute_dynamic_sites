"use client";

import { company } from "@/lib/content";
import { MaskReveal, Reveal, SectionHead } from "./primitives";

export default function About() {
  return (
    <section id="about" className="relative px-5 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-[1240px]">
        <SectionHead label="About — Who We Are" />

        <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-16">
          {/* Heading — left */}
          <div className="md:col-span-5">
            <h2 className="font-display text-[clamp(2.4rem,5vw,4rem)] font-light leading-[0.98] tracking-[-0.02em] text-[#0a0a0a]">
              <MaskReveal>Leaders in</MaskReveal>
              <MaskReveal delay={0.08}>conflict</MaskReveal>
              <MaskReveal delay={0.16}>resolution.</MaskReveal>
            </h2>
          </div>

          {/* Body — right */}
          <div className="md:col-span-7">
            <Reveal as="p" className="measure text-[17px] leading-[1.7] text-[#0a0a0a]">
              {company.about}
            </Reveal>

            <Reveal
              as="p"
              delay={0.1}
              className="measure mt-8 text-[16px] leading-[1.7] text-[#444444]"
            >
              {company.whoWeAre}
            </Reveal>

            <Reveal
              as="p"
              delay={0.18}
              className="measure mt-8 border-t border-[#e3e0d8] pt-8 text-[15px] leading-[1.7] text-[#6b6b6b]"
            >
              {company.mission}
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
