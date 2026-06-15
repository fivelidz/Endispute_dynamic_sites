'use client';

import { useState } from 'react';
import { motion, AnimatePresence, LayoutGroup } from 'motion/react';
import { processes } from '@/lib/content';
import { ArrowRight, Layers } from 'lucide-react';

const EASE = [0.22, 1, 0.36, 1] as const;

interface ServiceCardProps {
  name: string;
  short: string;
  description: string;
  index: number;
}

function ServiceCard({ name, short, description, index }: ServiceCardProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      layout
      onClick={() => setExpanded((v) => !v)}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ delay: index * 0.06, duration: 0.5, ease: EASE }}
      className="bento-cell hover-lift p-6 cursor-pointer flex flex-col gap-3 bg-surface min-h-[170px]"
      style={{ gridRow: expanded ? 'span 2' : 'span 1' }}
    >
      <motion.div layout className="flex items-start justify-between gap-3">
        <div>
          <div className="eyebrow text-sapphire mb-2">
            Process {String(index + 1).padStart(2, '0')}
          </div>
          <h3 className="font-semibold text-lg leading-snug text-fg">{name}</h3>
        </div>
        <motion.div
          animate={{ rotate: expanded ? 90 : 0 }}
          transition={{ duration: 0.3, ease: EASE }}
          className="flex-shrink-0 mt-1 text-sapphire"
        >
          <ArrowRight size={18} />
        </motion.div>
      </motion.div>

      <motion.p layout className="text-sm leading-relaxed text-muted">
        {short}
      </motion.p>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: EASE }}
            className="overflow-hidden"
          >
            <div className="text-sm leading-relaxed pt-3 border-t border-line text-fg-2">
              {description}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function Services() {
  return (
    <section id="services" className="py-24 px-6 md:px-8 max-w-6xl mx-auto">
      <div className="eyebrow text-sapphire mb-4">Dispute Processes</div>

      <motion.h2
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: EASE }}
        className="text-3xl md:text-4xl font-bold text-fg leading-[1.12] tracking-[-0.02em] mb-4"
      >
        The right process for your dispute
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1, duration: 0.5, ease: EASE }}
        className="text-fg-2 max-w-2xl mb-12 leading-relaxed text-[15px]"
      >
        Click any process to reveal the full description. We tailor the process
        to meet your unique dispute requirements.
      </motion.p>

      <LayoutGroup>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-auto">
          {processes.map((p, i) => (
            <ServiceCard
              key={p.name}
              name={p.name}
              short={p.short}
              description={p.description}
              index={i}
            />
          ))}

          {/* Connector cell */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.5, ease: EASE }}
            className="bento-cell hover-lift p-6 bg-surface-2 flex flex-col justify-between min-h-[170px]"
          >
            <Layers size={22} className="text-sapphire" />
            <div>
              <div className="font-semibold text-lg mb-2 text-fg">All of the above</div>
              <p className="text-muted text-sm leading-relaxed">
                Complex disputes often benefit from multi-layered processes.
                Endispute designs bespoke combinations.
              </p>
            </div>
          </motion.div>
        </div>
      </LayoutGroup>
    </section>
  );
}
