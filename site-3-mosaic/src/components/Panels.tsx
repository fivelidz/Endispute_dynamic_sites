'use client';

import { motion } from 'motion/react';
import { panels, clients } from '@/lib/content';
import { Award, Globe } from 'lucide-react';

const EASE = [0.22, 1, 0.36, 1] as const;

export default function Panels() {
  return (
    <section id="panels" className="py-24 px-6 md:px-8 max-w-6xl mx-auto">
      <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-start">

        {/* Left: Panel info */}
        <div>
          <div className="eyebrow text-sapphire mb-4">Expert Panel</div>

          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: EASE }}
            className="text-3xl md:text-4xl font-bold text-fg leading-[1.12] tracking-[-0.02em] mb-6"
          >
            Specialists across every domain
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.5, ease: EASE }}
            className="text-fg-2 leading-relaxed mb-8 text-[15px]"
          >
            {panels.intro}
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.18, duration: 0.5, ease: EASE }}
            className="text-muted leading-relaxed text-sm"
          >
            {panels.expertNote}
          </motion.p>

          {/* NBN Callout */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.26, duration: 0.5, ease: EASE }}
            className="mt-8 bento-cell p-6 bg-surface-2"
          >
            <div className="flex items-start gap-4">
              <div className="p-2.5 bg-sapphire-soft rounded-xl flex-shrink-0">
                <Award size={22} className="text-sapphire" />
              </div>
              <div>
                <div className="eyebrow mb-2">Featured Client</div>
                <h3 className="font-semibold text-lg mb-2 text-fg">
                  {clients.featured.name}
                </h3>
                <p className="text-fg-2 text-sm leading-relaxed">
                  {clients.featured.detail}
                </p>
                <div className="mt-3 text-xs text-muted">
                  {clients.featured.relation}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Privacy note */}
          <div className="mt-4 flex items-center gap-2 text-xs text-muted">
            <Globe size={12} />
            {clients.privacy}
          </div>
        </div>

        {/* Right: Expertise tag cloud */}
        <div>
          <div className="eyebrow mb-6">Areas of expertise</div>

          <div className="flex flex-wrap gap-3">
            {panels.expertise.map((area, i) => (
              <motion.span
                key={area}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04, duration: 0.4, ease: EASE }}
                className="px-5 py-2.5 rounded-full font-medium text-sm cursor-default
                  bg-surface border border-line text-fg-2
                  hover:border-line-strong hover:text-fg transition-colors duration-200"
              >
                {area}
              </motion.span>
            ))}
          </div>

          {/* Feature grid */}
          <div className="grid grid-cols-2 gap-3 mt-10">
            {[
              { label: 'High Court alumni' },
              { label: 'Supreme Court retired judiciary' },
              { label: 'Federal Court advisors' },
              { label: 'Commercial experts' },
            ].map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + i * 0.06, duration: 0.45, ease: EASE }}
                className="bento-cell hover-lift p-4 bg-surface"
              >
                <div className="text-sapphire font-bold text-lg mb-1">✓</div>
                <div className="text-xs text-muted">{item.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
