'use client';

import { useState } from 'react';
import { motion, AnimatePresence, LayoutGroup } from 'motion/react';
import { processes } from '@/lib/content';
import { ArrowRight, Layers } from 'lucide-react';

const cellColors = [
  // navy bg: use explicit light colours — opacity modifiers on paper don't always resolve
  { bg: 'bg-[#0c1f3d]', text: 'text-[#f0e8d8]', accent: 'text-[#d4825e]', sub: 'text-[#c4b89a]', border: 'border-[rgba(255,255,255,0.1)]' },
  // terracotta pale: dark text is fine
  { bg: 'bg-[#f5e8e3]', text: 'text-[#1a1a1a]', accent: 'text-[#c46442]', sub: 'text-[#5a4a44]', border: 'border-[#e0c8be]' },
  // sage pale: dark text fine
  { bg: 'bg-[#e8f0e8]', text: 'text-[#1a1a1a]', accent: 'text-[#3d6e3e]', sub: 'text-[#3a5a3a]', border: 'border-[#b8d0b8]' },
  // navy pale: use deep navy for text to contrast with light blue
  { bg: 'bg-[#e8edf5]', text: 'text-[#0c1f3d]', accent: 'text-[#0c1f3d]', sub: 'text-[#2a4070]', border: 'border-[#b8cce0]' },
  // pure white bg: standard dark text
  { bg: 'bg-white', text: 'text-[#1a1a1a]', accent: 'text-[#c46442]', sub: 'text-[#6b7280]', border: 'border-[#e5e7eb]' },
];

interface ServiceCardProps {
  name: string;
  short: string;
  description: string;
  index: number;
}

function ServiceCard({ name, short, description, index }: ServiceCardProps) {
  const [expanded, setExpanded] = useState(false);
  const colors = cellColors[index % cellColors.length];

  return (
    <motion.div
      layout
      onClick={() => setExpanded((v) => !v)}
      data-cursor="grow"
      initial={{ opacity: 0, y: 20, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ delay: index * 0.08, type: 'spring', stiffness: 200, damping: 24 }}
      className={`bento-cell p-6 cursor-pointer flex flex-col gap-3 border ${colors.bg} ${colors.border} min-h-[160px]`}
      style={{ gridRow: expanded ? 'span 2' : 'span 1' }}
    >
      <motion.div layout className="flex items-start justify-between gap-3">
        <div>
          <div className={`font-mono-jb text-xs uppercase tracking-widest mb-2 ${colors.accent}`}>
            Process {String(index + 1).padStart(2, '0')}
          </div>
          <h3 className={`font-bold text-lg leading-snug ${colors.text}`}>
            {name}
          </h3>
        </div>
        <motion.div
          animate={{ rotate: expanded ? 90 : 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          className={`flex-shrink-0 mt-1 ${colors.accent}`}
        >
          <ArrowRight size={18} />
        </motion.div>
      </motion.div>

      <motion.p layout className={`text-sm leading-relaxed ${colors.sub}`}>
        {short}
      </motion.p>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ type: 'spring', stiffness: 280, damping: 30 }}
            className="overflow-hidden"
          >
            <div className={`text-sm leading-relaxed pt-2 border-t ${colors.border} ${colors.sub}`}>
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
    <section id="services" className="py-24 px-4 md:px-8 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="font-mono-jb text-xs text-terracotta uppercase tracking-widest mb-4"
      >
        Dispute Processes
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="text-4xl md:text-5xl font-bold text-ink leading-[1.15] mb-4"
      >
        The right process for{' '}
        <span className="font-serif-italic text-terracotta">your</span> dispute
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        className="text-muted max-w-2xl mb-12 leading-relaxed"
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
            initial={{ opacity: 0, y: 20, scale: 0.97 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, type: 'spring', stiffness: 200, damping: 24 }}
            className="bento-cell p-6 bg-[#1a1a1a] flex flex-col justify-between min-h-[160px]"
            data-cursor="grow"
          >
            <Layers size={22} className="text-terracotta" />
            <div>
              <div className="font-bold text-lg mb-2 text-[#f0e8d8]">All of the above</div>
              <p className="text-[#c4b89a] text-sm leading-relaxed">
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
