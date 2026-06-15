'use client';

import { motion } from 'motion/react';
import Image from 'next/image';
import { team, inMemoriam } from '@/lib/content';
import { CheckCircle, Heart } from 'lucide-react';

const EASE = [0.22, 1, 0.36, 1] as const;

function Portrait({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="relative w-64 h-64 md:w-80 md:h-80 mx-auto flex-shrink-0">
      <div className="relative w-full h-full rounded-full overflow-hidden border border-line-strong">
        <Image src={src} alt={alt} fill className="object-cover object-top" />
      </div>
      <div className="absolute -bottom-2 -right-2 btn-primary text-xs px-3 py-1.5 rounded-full">
        NBN Advisor 2014
      </div>
    </div>
  );
}

export default function Team() {
  const member = team[0];

  return (
    <section id="team" className="py-24 px-6 md:px-8 max-w-6xl mx-auto">
      <div className="eyebrow text-sapphire mb-4">Our team</div>

      <motion.h2
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: EASE }}
        className="text-3xl md:text-4xl font-bold text-fg leading-[1.12] tracking-[-0.02em] mb-12"
      >
        World-class expertise
      </motion.h2>

      {/* Team member card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.55, ease: EASE }}
        className="bento-cell p-8 md:p-12 bg-surface"
      >
        <div className="flex flex-col md:flex-row gap-10 md:gap-16 items-start">
          <Portrait src={member.photo} alt={member.name} />

          <div className="flex-1">
            <div className="eyebrow mb-3">{member.role}</div>

            <h3 className="text-2xl md:text-3xl font-bold text-fg mb-4 tracking-[-0.02em]">
              {member.name}
            </h3>

            <p className="text-fg-2 leading-relaxed mb-6 text-[15px]">
              {member.bio}
            </p>

            <div className="eyebrow text-sapphire mb-4">Credentials</div>

            <ul className="space-y-2">
              {member.credentials.map((c, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -8 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05, duration: 0.4, ease: EASE }}
                  className="flex gap-2.5 items-start text-sm text-fg-2"
                >
                  <CheckCircle size={14} className="text-sapphire flex-shrink-0 mt-0.5" />
                  {c}
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </motion.div>

      {/* In memoriam */}
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1, duration: 0.5, ease: EASE }}
        className="mt-8 bento-cell p-6 md:p-8 bg-surface-2"
      >
        <div className="flex gap-4 items-start">
          <Heart size={18} className="text-sapphire flex-shrink-0 mt-0.5" />
          <div>
            <div className="eyebrow mb-2">In Memoriam</div>
            <div className="font-semibold text-fg text-lg">{inMemoriam.name}</div>
            <div className="text-xs text-muted mb-3">{inMemoriam.years}</div>
            <p className="text-sm text-fg-2 leading-relaxed italic">
              &ldquo;{inMemoriam.note}&rdquo;
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
