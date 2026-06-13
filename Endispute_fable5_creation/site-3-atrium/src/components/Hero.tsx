"use client";

import { useEffect } from "react";
import Image from "next/image";
import {
  motion,
  useMotionValue,
  useSpring,
  useReducedMotion,
  type MotionValue,
} from "motion/react";
import { ArrowRight, Clock, Globe2, Network } from "lucide-react";
import { company, contact } from "@/lib/content";

/**
 * useMouseParallax — declared INSIDE the component file, hooks called
 * unconditionally. Returns spring-smoothed x/y motion values scaled by `rate`.
 */
function useMouseParallax(
  rate: number,
  reduced: boolean
): { x: MotionValue<number>; y: MotionValue<number> } {
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, { stiffness: 60, damping: 18, mass: 0.6 });
  const y = useSpring(rawY, { stiffness: 60, damping: 18, mass: 0.6 });

  useEffect(() => {
    if (reduced) return;
    const onMove = (e: MouseEvent) => {
      const offsetX = e.clientX - window.innerWidth / 2;
      const offsetY = e.clientY - window.innerHeight / 2;
      rawX.set(offsetX * rate);
      rawY.set(offsetY * rate);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [rate, reduced, rawX, rawY]);

  return { x, y };
}

const chips = [
  { icon: Clock, label: "48hr response", bob: "bob-a" },
  { icon: Globe2, label: "AU + INT'L", bob: "bob-b" },
  { icon: Network, label: "NBN advisor", bob: "bob-c" },
];

export default function Hero() {
  const reduced = useReducedMotion() ?? false;

  // Three depth layers — different rates. Hooks always called.
  const bg = useMouseParallax(0.02, reduced);
  const mid = useMouseParallax(0.05, reduced);
  const fg = useMouseParallax(0.08, reduced);

  return (
    <section
      id="top"
      className="relative flex min-h-screen items-center overflow-hidden px-4 pt-32 pb-20"
    >
      {/* BACK LAYER — offset accent orbs */}
      <motion.div
        aria-hidden="true"
        style={reduced ? undefined : { x: bg.x, y: bg.y }}
        className="pointer-events-none absolute inset-0"
      >
        <div className="absolute left-[10%] top-[20%] h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(37,99,171,0.18)_0%,rgba(37,99,171,0)_70%)] blur-2xl" />
        <div className="absolute right-[12%] bottom-[18%] h-80 w-80 rounded-full bg-[radial-gradient(circle,rgba(184,117,69,0.16)_0%,rgba(184,117,69,0)_70%)] blur-2xl" />
      </motion.div>

      <div className="relative mx-auto grid w-full max-w-6xl items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
        {/* FOREGROUND LAYER — headline + CTA */}
        <motion.div
          style={reduced ? undefined : { x: fg.x, y: fg.y }}
          className="relative z-20"
        >
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="glass mb-6 inline-flex items-center gap-2 rounded-full bg-white/60 px-4 py-1.5 font-mono text-xs font-medium uppercase tracking-wider text-[#2563ab]"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[#b87545]" />
            Leaders in Conflict Resolution
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.05 }}
            className="font-display text-5xl font-extrabold leading-[1.04] tracking-tight text-[#1c2530] sm:text-6xl lg:text-7xl"
            style={{ letterSpacing: "-0.03em" }}
          >
            Resolve with{" "}
            <span className="bg-[linear-gradient(110deg,#2563ab_0%,#3b82f6_55%,#2563ab_100%)] bg-clip-text text-transparent">
              clarity.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="mt-6 max-w-xl text-lg leading-relaxed text-[#1c2530]/85"
          >
            {company.whatWeDo}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
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
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="mt-7 font-mono text-xs uppercase tracking-wider text-[#1c2530]/75"
          >
            Complimentary intake · Response within {contact.responseWindow}
          </motion.p>
        </motion.div>

        {/* MID LAYER — IMAGE-FORWARD: Tania portrait in an architectural glass frame */}
        <motion.div
          style={reduced ? undefined : { x: mid.x, y: mid.y }}
          className="relative z-10 hidden lg:block"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            {/* faint blueprint column rules behind the frame — architectural motif */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -inset-6 -z-10 rounded-[2.5rem] opacity-[0.5]"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(to right, rgba(37,99,171,0.08) 0, rgba(37,99,171,0.08) 1px, transparent 1px, transparent 3rem)",
              }}
            />
            {/* Glass architectural frame */}
            <div className="glass relative overflow-hidden rounded-[2rem] bg-white/40 p-3">
              <Image
                src="/Endispute-V1Taniafinal.jpg"
                alt="Professor Tania Sourdin, Director & Co-Founder of Endispute"
                width={940}
                height={673}
                priority
                className="h-auto w-full rounded-[1.4rem] object-cover"
              />
              {/* ruled section marker / corner bracket — structural accent */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute left-5 top-5 h-8 w-8 border-l-2 border-t-2 border-[#2563ab]/40"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute bottom-5 right-5 h-8 w-8 border-b-2 border-r-2 border-[#b87545]/45"
              />
            </div>

            {/* single bobbing credibility chip anchored to the frame */}
            <div className="absolute -bottom-6 -left-6 w-56">
              <ChipCard
                icon={chips[2].icon}
                label={chips[2].label}
                bob={chips[2].bob}
                reduced={reduced}
                delay={0.5}
              />
            </div>
          </motion.div>
        </motion.div>

        {/* Mobile chips — simple row */}
        <div className="flex flex-wrap gap-3 lg:hidden">
          {chips.map((c) => (
            <div
              key={c.label}
              className="glass flex items-center gap-2 rounded-xl bg-white/60 px-4 py-2.5"
            >
              <c.icon size={16} className="text-[#2563ab]" strokeWidth={2} />
              <span className="text-sm font-semibold text-[#1c2530]">{c.label}</span>
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
  bob,
  reduced,
  delay,
}: {
  icon: typeof Clock;
  label: string;
  bob: string;
  reduced: boolean;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
    >
      <div className={reduced ? "" : bob}>
        <div className="glass flex items-center gap-3 rounded-2xl bg-white/65 px-5 py-4">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#2563ab]/12">
            <Icon size={18} className="text-[#2563ab]" strokeWidth={2.2} />
          </span>
          <span className="font-display text-base font-bold text-[#1c2530]">
            {label}
          </span>
        </div>
      </div>
    </motion.div>
  );
}
