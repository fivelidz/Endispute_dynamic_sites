'use client';

import { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { company, benefits } from '@/lib/content';
import { CheckCircle } from 'lucide-react';

const EASE = [0.22, 1, 0.36, 1] as const;

function CredentialCard({
  title,
  detail,
  index,
}: {
  title: string;
  detail: string;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ delay: index * 0.06, duration: 0.5, ease: EASE }}
      className="bento-cell hover-lift p-5 bg-surface"
    >
      <div className="flex gap-3">
        <CheckCircle size={18} className="text-sapphire flex-shrink-0 mt-0.5" />
        <div>
          <div className="font-semibold text-fg text-sm mb-1">{title}</div>
          <div className="text-muted text-xs leading-relaxed">{detail}</div>
        </div>
      </div>
    </motion.div>
  );
}

export default function About() {
  const headRef = useRef<HTMLHeadingElement>(null);
  const inView = useInView(headRef, { once: true, margin: '-80px' });

  return (
    <section id="about" className="py-24 px-6 md:px-8 max-w-6xl mx-auto">
      <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-start">

        {/* Left column */}
        <div>
          <div className="eyebrow text-sapphire mb-4">About Endispute</div>

          <h2
            ref={headRef}
            className="text-3xl md:text-4xl font-bold text-fg leading-[1.12] tracking-[-0.02em] mb-8"
          >
            <motion.span
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, ease: EASE }}
              className="block"
            >
              Leading the way in
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1, ease: EASE }}
              className="block text-fg-2"
            >
              complex dispute resolution
            </motion.span>
          </h2>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5, ease: EASE }}
            className="text-fg-2 leading-relaxed mb-6 text-[15px] md:text-base"
          >
            {company.about}
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.28, duration: 0.5, ease: EASE }}
            className="text-fg-2 leading-relaxed text-[15px] md:text-base"
          >
            {company.workingWithUs}
          </motion.p>

          {/* Who we work with */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.36, duration: 0.5, ease: EASE }}
            className="mt-8 bento-cell p-5 bg-surface-2"
          >
            <div className="eyebrow mb-3">Who we work with</div>
            <p className="text-sm text-fg-2 leading-relaxed">
              {company.whoWeAre}
            </p>
          </motion.div>
        </div>

        {/* Right column — credential cards */}
        <div className="flex flex-col gap-3">
          <div className="eyebrow mb-2">Why choose Endispute</div>
          {benefits.map((b, i) => (
            <CredentialCard
              key={b.title}
              title={b.title}
              detail={b.detail}
              index={i}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
