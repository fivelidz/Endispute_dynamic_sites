'use client';

import { motion, useReducedMotion } from 'motion/react';
import Image from 'next/image';
import { processes } from '@/lib/content';
import { fadeUpContainer, fadeUpItem } from '@/lib/variants';

const processColors = [
  { accent: '#0e4a4a', bg: 'rgba(14,74,74,0.06)' },
  { accent: '#c25b4a', bg: 'rgba(194,91,74,0.06)' },
  { accent: '#c9a14a', bg: 'rgba(201,161,74,0.06)' },
  { accent: '#0e4a4a', bg: 'rgba(14,74,74,0.06)' },
  { accent: '#c25b4a', bg: 'rgba(194,91,74,0.06)' },
];

export default function Processes() {
  const shouldReduce = useReducedMotion();

  return (
    <section className="py-24 lg:py-36 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={shouldReduce ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ type: 'spring', stiffness: 200, damping: 25 }}
          className="mb-16"
        >
          <p
            className="text-xs font-medium tracking-widest uppercase text-[#c25b4a] mb-4"
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            Dispute Resolution Processes
          </p>
          <h2
            className="text-4xl lg:text-5xl font-semibold text-[#161614] max-w-2xl leading-tight"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            The right process for{' '}
            <em className="text-[#0e4a4a]" style={{ fontStyle: 'italic' }}>
              every dispute
            </em>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Cards grid */}
          <motion.div
            variants={fadeUpContainer}
            initial={shouldReduce ? false : 'hidden'}
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="grid sm:grid-cols-2 gap-4"
          >
            {processes.map((process, i) => {
              const colors = processColors[i] ?? processColors[0];
              return (
                <motion.div
                  key={i}
                  variants={fadeUpItem}
                  whileHover={
                    shouldReduce
                      ? {}
                      : { scale: 1.025, boxShadow: `0 16px 32px ${colors.accent}22` }
                  }
                  className="rounded-2xl border border-[#e8e0d4] p-6 flex flex-col gap-3 cursor-default"
                  style={{
                    backgroundColor: colors.bg,
                    transition: 'transform 0.2s, box-shadow 0.2s',
                  }}
                >
                  <div
                    className="text-xs font-medium tracking-widest uppercase mb-1"
                    style={{ color: colors.accent, fontFamily: 'var(--font-mono)' }}
                  >
                    0{i + 1}
                  </div>
                  <h3
                    className="text-xl font-semibold leading-tight"
                    style={{ fontFamily: 'var(--font-display)', color: colors.accent }}
                  >
                    {process.name}
                  </h3>
                  <p className="text-sm text-[#6b6560] leading-relaxed">{process.short}</p>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Process diagram image */}
          <motion.div
            initial={shouldReduce ? false : { opacity: 0, x: 32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ type: 'spring', stiffness: 120, damping: 20, delay: 0.2 }}
            className="sticky top-24"
          >
            <div className="rounded-2xl overflow-hidden border border-[#e8e0d4] shadow-xl shadow-[#0e4a4a]/6 bg-white p-4">
              <Image
                src="/The-Endispute-range-of-processes-5.png"
                alt="The Endispute Range of Dispute Resolution Processes"
                width={700}
                height={500}
                className="w-full h-auto rounded-xl"
              />
            </div>
            <p className="mt-4 text-sm text-center text-[#6b6560]">
              Endispute offers tailored processes across the full spectrum of dispute resolution
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
