'use client';

import { motion, useReducedMotion } from 'motion/react';

interface Stat {
  readonly value: string;
  readonly label: string;
}

interface CounterStatProps {
  stat: Stat;
  index: number;
}

export default function CounterStat({ stat, index }: CounterStatProps) {
  const shouldReduce = useReducedMotion();

  return (
    <motion.div
      initial={shouldReduce ? false : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{
        delay: index * 0.08,
        type: 'spring',
        stiffness: 200,
        damping: 25,
      }}
      className="flex flex-col gap-1"
    >
      <span
        className="text-3xl lg:text-4xl font-semibold text-[#0e4a4a] tracking-tight"
        style={{ fontFamily: 'var(--font-display)' }}
      >
        {stat.value}
      </span>
      <span className="text-sm text-[#6b6560] leading-snug">{stat.label}</span>
    </motion.div>
  );
}
