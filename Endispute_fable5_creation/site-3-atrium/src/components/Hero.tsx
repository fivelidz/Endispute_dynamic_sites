"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { ArrowRight, Clock, Globe2, Network } from "lucide-react";
import { company } from "@/lib/content";

const EASE = [0.22, 1, 0.36, 1] as const;

const chips = [
  { icon: Clock, label: "Prompt, confidential response" },
  { icon: Globe2, label: "AU + INT'L" },
  { icon: Network, label: "NBN advisor" },
];

/**
 * Hero — GROUNDED.
 * Mouse-parallax depth layers and drifting orbs removed (the "floaty" cause).
 * Content sits on a firm baseline grid; restrained opacity + small-translateY
 * reveals only. Serif display headline, tight leading, orange used as an
 * underline accent (never a fill).
 */
export default function Hero() {
  const reduced = useReducedMotion() ?? false;
  const rise = (delay: number) =>
    reduced
      ? { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { duration: 0.4, delay } }
      : {
          initial: { opacity: 0, y: 12 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.6, delay, ease: EASE },
        };

  return (
    <section
      id="top"
      className="relative flex min-h-[88vh] items-center overflow-hidden border-b border-[#d9d6ce] px-4 pt-32 pb-16"
    >
      <div className="relative mx-auto grid w-full max-w-6xl items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
        {/* Headline + CTA */}
        <div className="relative z-20 lg:border-r lg:border-[#d9d6ce] lg:pr-12">
          <motion.span
            {...rise(0)}
            className="mb-6 inline-flex items-center gap-2 border border-[#d9d6ce] bg-white px-3 py-1.5 font-mono text-xs font-medium uppercase tracking-wider text-[#1f1c1b]"
            style={{ borderRadius: 2 }}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[#ff7714]" />
            Leaders in Conflict Resolution
          </motion.span>

          <motion.h1
            {...rise(0.05)}
            className="font-display text-5xl text-[#1f1c1b] sm:text-6xl lg:text-[5.25rem]"
            style={{ fontWeight: 350, letterSpacing: "-0.01em", lineHeight: 1.0 }}
          >
            Resolve with{" "}
            <span className="border-b-2 border-[#ff7714] pb-1">clarity.</span>
          </motion.h1>

          <motion.p
            {...rise(0.12)}
            className="mt-7 max-w-xl text-base leading-relaxed text-[#1f1c1b]/85"
          >
            {company.whatWeDo}
          </motion.p>

          <motion.div
            {...rise(0.18)}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <a href="#contact" className="btn-azure">
              Start your assessment
              <ArrowRight size={17} strokeWidth={2.2} />
            </a>
            <a href="#process" className="btn-outline">
              See how it works
            </a>
          </motion.div>

          <motion.p
            {...rise(0.26)}
            className="mt-7 font-mono text-xs uppercase tracking-wider text-[#a69b92]"
          >
            Complimentary intake · Prompt, confidential response
          </motion.p>
        </div>

        {/* Portrait — pinned in a flat hairline frame, no parallax */}
        <motion.div
          initial={reduced ? { opacity: 0 } : { opacity: 0, y: 12 }}
          animate={reduced ? { opacity: 1 } : { opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: EASE }}
          className="relative z-10 hidden lg:block"
        >
          <div className="relative border border-[#d9d6ce] bg-white p-2">
            <Image
              src="/Endispute-V1Taniafinal.jpg"
              alt="Professor Tania Sourdin, Director & Co-Founder of Endispute"
              width={940}
              height={673}
              priority
              className="h-auto w-full object-cover"
            />
            {/* structural corner brackets — orange outline accent */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute left-4 top-4 h-8 w-8 border-l-2 border-t-2 border-[#ff7714]"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute bottom-4 right-4 h-8 w-8 border-b-2 border-r-2 border-[#ff7714]"
            />
          </div>

          {/* anchored credibility chip — flat, pinned to the frame edge */}
          <div className="absolute -bottom-5 -left-5 w-56">
            <ChipCard icon={chips[2].icon} label={chips[2].label} />
          </div>
        </motion.div>

        {/* Mobile chips — simple row */}
        <div className="flex flex-wrap gap-3 lg:hidden">
          {chips.map((c) => (
            <div
              key={c.label}
              className="flex items-center gap-2 border border-[#d9d6ce] bg-white px-4 py-2.5"
              style={{ borderRadius: 2 }}
            >
              <c.icon size={16} className="text-[#ff7714]" strokeWidth={2} />
              <span className="text-sm font-semibold text-[#1f1c1b]">{c.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ChipCard({
  icon: Icon,
  label,
}: {
  icon: typeof Clock;
  label: string;
}) {
  return (
    <div className="flex items-center gap-3 border border-[#d9d6ce] bg-white px-5 py-4">
      <span className="flex h-10 w-10 items-center justify-center border border-[#d9d6ce]">
        <Icon size={18} className="text-[#ff7714]" strokeWidth={2.2} />
      </span>
      <span className="font-display text-base text-[#1f1c1b]" style={{ fontWeight: 400 }}>
        {label}
      </span>
    </div>
  );
}
