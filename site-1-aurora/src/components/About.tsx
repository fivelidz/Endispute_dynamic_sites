'use client';

import { motion, useReducedMotion } from 'motion/react';
import Image from 'next/image';
import { company } from '@/lib/content';
import { fadeUpContainer, fadeUpItem } from '@/lib/variants';

export default function About() {
  const shouldReduce = useReducedMotion();

  return (
    <section id="about" className="py-24 lg:py-36 bg-[#fbf7f0]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Text column */}
          <motion.div
            variants={fadeUpContainer}
            initial={shouldReduce ? false : 'hidden'}
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
          >
            {/* Eyebrow */}
            <motion.p
              variants={fadeUpItem}
              className="text-xs font-medium tracking-widest uppercase text-[#c25b4a] mb-4"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              About Endispute
            </motion.p>

            <motion.h2
              variants={fadeUpItem}
              className="text-4xl lg:text-5xl font-semibold text-[#161614] mb-6 leading-tight"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Leaders in Complex{' '}
              <em className="text-[#0e4a4a]" style={{ fontStyle: 'italic' }}>
                Dispute Resolution
              </em>
            </motion.h2>

            <motion.p
              variants={fadeUpItem}
              className="text-lg text-[#6b6560] leading-relaxed mb-6"
            >
              {company.about}
            </motion.p>

            <motion.p
              variants={fadeUpItem}
              className="text-base text-[#6b6560] leading-relaxed mb-8"
            >
              {company.whoWeAre}
            </motion.p>

            {/* Highlight block */}
            <motion.blockquote
              variants={fadeUpItem}
              className="border-l-4 border-[#0e4a4a] pl-6 py-2"
            >
              <p
                className="text-[#161614] font-medium leading-snug"
                style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic' }}
              >
                &ldquo;{company.mission}&rdquo;
              </p>
            </motion.blockquote>
          </motion.div>

          {/* Image column */}
          <motion.div
            initial={shouldReduce ? false : { opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ type: 'spring', stiffness: 120, damping: 20, delay: 0.2 }}
            className="relative"
          >
            {/* Decorative frame offset */}
            <div className="absolute -top-4 -right-4 w-full h-full rounded-2xl border-2 border-[#0e4a4a]/20 bg-transparent" />
            <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-[#0e4a4a]/10 aspect-[3/4]">
              <Image
                src="/Endispute-V1Taniafinal.jpg"
                alt="Professor Tania Sourdin — Director & Co-Founder, Endispute"
                fill
                className="object-cover object-top"
                sizes="(max-width: 1024px) 90vw, 45vw"
              />
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0e4a4a]/30 via-transparent to-transparent" />
            </div>

            {/* Floating credential badge */}
            <motion.div
              initial={shouldReduce ? false : { opacity: 0, scale: 0.85, y: 16 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ delay: 0.5, type: 'spring', stiffness: 200, damping: 25 }}
              className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-xl p-4 border border-[#e8e0d4] max-w-[220px]"
            >
              <p
                className="text-xs text-[#c25b4a] font-medium tracking-widest uppercase mb-1"
                style={{ fontFamily: 'var(--font-mono)' }}
              >
                Advanced Accredited
              </p>
              <p
                className="text-sm font-semibold text-[#161614]"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                Mediator · NBN Dispute Advisor
              </p>
              <p className="text-xs text-[#6b6560] mt-1">Appointed 2014 · LEADR Award 2014</p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
