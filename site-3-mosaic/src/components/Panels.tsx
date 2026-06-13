'use client';

import { motion } from 'motion/react';
import { panels, clients } from '@/lib/content';
import { Award, Globe } from 'lucide-react';

const tagColors = [
  'bg-navy text-paper hover:bg-navy-light',
  'bg-terracotta-pale text-terracotta hover:bg-terracotta hover:text-white',
  'bg-sage-pale text-sage hover:bg-sage hover:text-white',
  'bg-navy-pale text-navy hover:bg-navy hover:text-paper',
  'bg-terracotta-pale text-terracotta hover:bg-terracotta hover:text-white',
  'bg-sage-pale text-sage hover:bg-sage hover:text-white',
  'bg-navy text-paper hover:bg-navy-light',
  'bg-navy-pale text-navy hover:bg-navy hover:text-paper',
];

export default function Panels() {
  return (
    <section id="panels" className="py-24 px-4 md:px-8 max-w-7xl mx-auto">
      <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-start">

        {/* Left: Panel info */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-mono-jb text-xs text-terracotta uppercase tracking-widest mb-4"
          >
            Expert Panel
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold text-ink leading-[1.15] mb-6"
          >
            Specialists across{' '}
            <span className="font-serif-italic text-sage">every domain</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-muted leading-relaxed mb-8"
          >
            {panels.intro}
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-muted leading-relaxed text-sm"
          >
            {panels.expertNote}
          </motion.p>

          {/* NBN Callout */}
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.97 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, type: 'spring', stiffness: 200, damping: 24 }}
            className="mt-8 bento-cell p-6 bg-navy text-paper"
            data-cursor="grow"
          >
            <div className="flex items-start gap-4">
              <div className="p-2.5 bg-terracotta/20 rounded-xl flex-shrink-0">
                <Award size={22} className="text-terracotta" />
              </div>
              <div>
                <div className="font-mono-jb text-xs text-[#c9a87a] uppercase tracking-widest mb-2">
                  Featured Client
                </div>
                <h3 className="font-bold text-lg mb-2 text-[#f0e8d8]">{clients.featured.name}</h3>
                <p className="text-[#d4c9b4] text-sm leading-relaxed">
                  {clients.featured.detail}
                </p>
                <div className="mt-3 text-xs text-[#a89880] font-mono-jb">
                  {clients.featured.relation}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Privacy note */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="mt-4 flex items-center gap-2 text-xs text-muted"
          >
            <Globe size={12} />
            {clients.privacy}
          </motion.div>
        </div>

        {/* Right: Expertise tag cloud */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-mono-jb text-xs text-sage uppercase tracking-widest mb-6"
          >
            Areas of expertise
          </motion.div>

          <div className="flex flex-wrap gap-3">
            {panels.expertise.map((area, i) => (
              <motion.span
                key={area}
                initial={{ opacity: 0, scale: 0.85 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{
                  delay: i * 0.07,
                  type: 'spring',
                  stiffness: 280,
                  damping: 22,
                }}
                whileHover={{
                  scale: 1.08,
                  boxShadow: '0 8px 24px rgba(12,31,61,0.15)',
                }}
                data-cursor="grow"
                className={`
                  px-5 py-2.5 rounded-full font-semibold text-sm cursor-default
                  transition-colors duration-200
                  ${tagColors[i % tagColors.length]}
                `}
              >
                {area}
              </motion.span>
            ))}
          </div>

          {/* Decorative grid of features */}
          <div className="grid grid-cols-2 gap-3 mt-10">
            {[
              { label: 'High Court alumni', val: '✓' },
              { label: 'Supreme Court retired judiciary', val: '✓' },
              { label: 'Federal Court advisors', val: '✓' },
              { label: 'Commercial experts', val: '✓' },
            ].map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 + i * 0.07 }}
                className="bento-cell p-4 bg-paper"
              >
                <div className="text-sage font-mono-jb font-bold text-lg mb-1">
                  {item.val}
                </div>
                <div className="text-xs text-muted">{item.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
