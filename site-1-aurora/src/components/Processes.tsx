'use client';

import { motion, useReducedMotion } from 'motion/react';
import Image from 'next/image';
import { processes } from '@/lib/content';
import { fadeUpContainer, fadeUpItem } from '@/lib/variants';

const processColors = [
  { accent: '#ec652b', bg: 'rgba(236,101,43,0.05)' },
  { accent: '#111a4a', bg: 'rgba(17,26,74,0.035)' },
  { accent: '#111a4a', bg: 'rgba(17,26,74,0.035)' },
  { accent: '#111a4a', bg: 'rgba(17,26,74,0.035)' },
  { accent: '#111a4a', bg: 'rgba(17,26,74,0.035)' },
];

export default function Processes() {
  const shouldReduce = useReducedMotion();

  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="container-x">
        {/* Header */}
        <motion.div
          initial={shouldReduce ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-12"
        >
          <p
            className="text-xs font-medium tracking-widest uppercase text-[#ec652b] mb-4"
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            Dispute Resolution Processes
          </p>
          <h2
            className="text-3xl lg:text-[40px] font-medium text-[#011821] max-w-2xl leading-tight"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            The right process for{' '}
            <em className="text-[#111a4a]" style={{ fontStyle: 'italic' }}>
              every dispute
            </em>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-12 items-start">
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
                  className="rounded-lg border border-[#e3e4e8] p-6 flex flex-col gap-3 cursor-default"
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
                  <p className="text-sm text-[#7c7f88] leading-relaxed">{process.short}</p>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Process diagram image */}
          <motion.div
            initial={shouldReduce ? false : { opacity: 0, x: 32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            className="sticky top-24"
          >
            <div className="rounded-lg overflow-hidden border border-[#e3e4e8] shadow-xl shadow-[#111a4a]/6 bg-white p-4">
              <Image
                src="/The-Endispute-range-of-processes-5.png"
                alt="The Endispute Range of Dispute Resolution Processes"
                width={700}
                height={500}
                className="w-full h-auto rounded-xl"
              />
            </div>
            <p className="mt-4 text-sm text-center text-[#7c7f88]">
              Endispute offers tailored processes across the full spectrum of dispute resolution
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
