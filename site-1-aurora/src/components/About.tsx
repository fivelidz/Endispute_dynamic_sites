'use client';

import { motion, useReducedMotion } from 'motion/react';
import Image from 'next/image';
import { company } from '@/lib/content';
import { fadeUpContainer, fadeUpItem } from '@/lib/variants';

export default function About() {
  const shouldReduce = useReducedMotion();

  return (
    <section id="about" className="py-16 lg:py-24 bg-[#f6f6f8]">
      <div className="container-x">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-12 items-center">
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
              className="text-xs font-medium tracking-widest uppercase text-[#ec652b] mb-4"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              About Endispute
            </motion.p>

            <motion.h2
              variants={fadeUpItem}
              className="text-3xl lg:text-[40px] font-medium text-[#011821] mb-6 leading-tight"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Leaders in Complex{' '}
              <em className="text-[#111a4a]" style={{ fontStyle: 'italic' }}>
                Dispute Resolution
              </em>
            </motion.h2>

            <motion.p
              variants={fadeUpItem}
              className="text-lg text-[#7c7f88] leading-relaxed mb-6"
            >
              {company.about}
            </motion.p>

            <motion.p
              variants={fadeUpItem}
              className="text-base text-[#7c7f88] leading-relaxed mb-8"
            >
              {company.whoWeAre}
            </motion.p>

            {/* Highlight block */}
            <motion.blockquote
              variants={fadeUpItem}
              className="border-l-4 border-[#111a4a] pl-6 py-2"
            >
              <p
                className="text-[#011821] font-medium leading-snug"
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
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            className="relative"
          >
            {/* Decorative frame offset */}
            <div className="absolute -top-4 -right-4 w-full h-full rounded-lg border-2 border-[#111a4a]/20 bg-transparent" />
            <div className="relative rounded-lg overflow-hidden shadow-2xl shadow-[#111a4a]/10 aspect-[3/4]">
              <Image
                src="/Endispute-V1Taniafinal.jpg"
                alt="Professor Tania Sourdin — Director & Co-Founder, Endispute"
                fill
                className="object-cover object-top"
                sizes="(max-width: 1024px) 90vw, 45vw"
              />
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#111a4a]/30 via-transparent to-transparent" />
            </div>

            {/* Floating credential badge */}
            <motion.div
              initial={shouldReduce ? false : { opacity: 0, scale: 0.85, y: 16 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ delay: 0.5, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-xl p-4 border border-[#e3e4e8] max-w-[220px]"
            >
              <p
                className="text-xs text-[#ec652b] font-medium tracking-widest uppercase mb-1"
                style={{ fontFamily: 'var(--font-mono)' }}
              >
                Advanced Accredited
              </p>
              <p
                className="text-sm font-medium text-[#011821]"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                Mediator · NBN Dispute Advisor
              </p>
              <p className="text-xs text-[#7c7f88] mt-1">Appointed 2014 · LEADR Award 2014</p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
