'use client';

import { motion, useReducedMotion } from 'motion/react';
import Image from 'next/image';
import { CheckCircle2 } from 'lucide-react';
import { team, inMemoriam } from '@/lib/content';
import { fadeUpContainer, fadeUpItemFast } from '@/lib/variants';

export default function Team() {
  const shouldReduce = useReducedMotion();
  const tania = team[0];

  return (
    <section id="team" className="py-16 lg:py-24 bg-[#f6f6f8]">
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
            Our Team
          </p>
          <h2
            className="text-3xl lg:text-[40px] font-medium text-[#011821] leading-tight"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Led by a world-renowned{' '}
            <em className="text-[#111a4a]" style={{ fontStyle: 'italic' }}>
              practitioner
            </em>
          </h2>
        </motion.div>

        {/* Team card — Tania */}
        <motion.div
          initial={shouldReduce ? false : { opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="rounded-lg border border-[#e3e4e8] bg-white overflow-hidden shadow-xl shadow-[#111a4a]/6 mb-8"
        >
          <div className="grid lg:grid-cols-[380px_1fr]">
            {/* Photo */}
            <div className="relative h-72 lg:h-auto min-h-[420px] bg-[#111a4a]/5">
              <Image
                src={tania.photo}
                alt={tania.name}
                fill
                className="object-cover object-top"
                sizes="(max-width: 1024px) 100vw, 380px"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/20 hidden lg:block" />
            </div>

            {/* Info */}
            <div className="p-8 lg:p-12">
              <div className="mb-2">
                <span
                  className="text-xs font-medium tracking-widest uppercase text-[#ec652b]"
                  style={{ fontFamily: 'var(--font-mono)' }}
                >
                  {tania.role}
                </span>
              </div>
              <h3
                className="text-xl lg:text-2xl font-medium text-[#011821] mb-3"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                {tania.name}
              </h3>
              <p
                className="text-[#7c7f88] mb-8 text-lg"
                style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic' }}
              >
                {tania.short}
              </p>

              {/* Bio */}
              <p className="text-[#7c7f88] leading-relaxed mb-8 text-sm">{tania.bio}</p>

              {/* Credentials */}
              <motion.ul
                variants={fadeUpContainer}
                initial={shouldReduce ? false : 'hidden'}
                whileInView="visible"
                viewport={{ once: true, margin: '-80px' }}
                className="grid sm:grid-cols-2 gap-2.5"
              >
                {tania.credentials.map((cred, i) => (
                  <motion.li
                    key={i}
                    variants={fadeUpItemFast}
                    className="flex items-start gap-2 text-sm text-[#7c7f88]"
                  >
                    <CheckCircle2 className="w-4 h-4 text-[#111a4a] mt-0.5 flex-shrink-0" />
                    <span>{cred}</span>
                  </motion.li>
                ))}
              </motion.ul>
            </div>
          </div>
        </motion.div>

        {/* In Memoriam card */}
        <motion.div
          initial={shouldReduce ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          className="rounded-lg border border-[#e3e4e8] bg-white p-8 lg:p-10 flex items-start gap-6"
        >
          <div className="w-12 h-12 rounded-xl bg-[#111a4a]/8 flex items-center justify-center flex-shrink-0">
            <span className="text-2xl" aria-hidden="true">✦</span>
          </div>
          <div>
            <p
              className="text-xs font-medium tracking-widest uppercase text-[#7c7f88] mb-2"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              In Memoriam
            </p>
            <h4
              className="text-2xl font-medium text-[#011821] mb-1"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              {inMemoriam.name}
            </h4>
            <p className="text-sm text-[#7c7f88] mb-4">{inMemoriam.years}</p>
            <p className="text-[#7c7f88] leading-relaxed" style={{ fontStyle: 'italic' }}>
              &ldquo;{inMemoriam.note}&rdquo;
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
