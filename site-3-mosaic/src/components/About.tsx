'use client';

import { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'motion/react';
import { company, benefits } from '@/lib/content';
import { CheckCircle } from 'lucide-react';

function CredentialCard({
  title,
  detail,
  index,
}: {
  title: string;
  detail: string;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const rotate = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [index % 2 === 0 ? -2 : 2, 0, index % 2 === 0 ? 1 : -1]
  );

  return (
    <motion.div
      ref={ref}
      style={{ rotate }}
      initial={{ opacity: 0, x: 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ delay: index * 0.1, type: 'spring', stiffness: 180, damping: 22 }}
      className="bento-cell p-5 bg-white"
      data-cursor="grow"
    >
      <div className="flex gap-3">
        <CheckCircle size={18} className="text-sage flex-shrink-0 mt-0.5" />
        <div>
          <div className="font-semibold text-navy text-sm mb-1">{title}</div>
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
    <section id="about" className="py-24 px-4 md:px-8 max-w-7xl mx-auto">
      <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-start">

        {/* Left column */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-mono-jb text-xs text-terracotta uppercase tracking-widest mb-4"
          >
            About Endispute
          </motion.div>

          <h2
            ref={headRef}
            className="text-4xl md:text-5xl font-bold text-ink leading-[1.15] mb-8"
          >
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="block"
            >
              Leading the way in
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="block font-serif-italic text-terracotta"
            >
              complex dispute resolution
            </motion.span>
          </h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-muted leading-relaxed mb-6 text-base"
          >
            {company.about}
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-muted leading-relaxed text-base"
          >
            {company.workingWithUs}
          </motion.p>

          {/* Who we work with */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="mt-8 bento-cell p-5 bg-navy text-paper"
          >
            <div className="font-mono-jb text-xs text-[#c9a87a] uppercase tracking-widest mb-3">
              Who we work with
            </div>
            <p className="text-sm text-[#e8e0d0] leading-relaxed">
              {company.whoWeAre}
            </p>
          </motion.div>
        </div>

        {/* Right column — rotating credential cards */}
        <div className="flex flex-col gap-3">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-mono-jb text-xs text-sage uppercase tracking-widest mb-2"
          >
            Why choose Endispute
          </motion.div>
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
