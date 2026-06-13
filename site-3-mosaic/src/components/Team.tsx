'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Image from 'next/image';
import { team, inMemoriam } from '@/lib/content';
import { CheckCircle, Heart } from 'lucide-react';

function RipplePhoto({ src, alt }: { src: string; alt: string }) {
  const [rippling, setRippling] = useState(false);

  return (
    <div
      className="relative w-64 h-64 md:w-80 md:h-80 mx-auto cursor-pointer flex-shrink-0"
      onMouseEnter={() => setRippling(true)}
      onMouseLeave={() => setRippling(false)}
      data-cursor="grow"
    >
      {/* Ripple rings */}
      <AnimatePresence>
        {rippling && (
          <>
            {[0, 0.3, 0.6].map((delay) => (
              <motion.div
                key={delay}
                initial={{ scale: 1, opacity: 0.35 }}
                animate={{ scale: 1.45, opacity: 0 }}
                exit={{ opacity: 0 }}
                transition={{
                  duration: 1.5,
                  delay,
                  ease: 'easeOut',
                  repeat: Infinity,
                  repeatDelay: 0.3,
                }}
                className="absolute inset-0 rounded-full border-2 border-terracotta pointer-events-none"
              />
            ))}
          </>
        )}
      </AnimatePresence>

      {/* Photo */}
      <motion.div
        whileHover={{ scale: 1.04 }}
        transition={{ type: 'spring', stiffness: 280, damping: 24 }}
        className="relative w-full h-full rounded-full overflow-hidden border-4 border-white shadow-2xl shadow-navy/20"
      >
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover object-top"
        />
      </motion.div>

      {/* Decorative arc badge */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4, type: 'spring', stiffness: 240, damping: 22 }}
        className="absolute -bottom-3 -right-3 bg-terracotta text-white text-xs font-mono-jb px-3 py-1.5 rounded-full shadow-lg"
      >
        NBN Advisor 2014
      </motion.div>
    </div>
  );
}

export default function Team() {
  const member = team[0];

  return (
    <section id="team" className="py-24 px-4 md:px-8 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="font-mono-jb text-xs text-terracotta uppercase tracking-widest mb-4"
      >
        Our team
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="text-4xl md:text-5xl font-bold text-ink leading-[1.15] mb-12"
      >
        World-class{' '}
        <span className="font-serif-italic text-terracotta">expertise</span>
      </motion.h2>

      {/* Team member card */}
      <div className="bento-cell p-8 md:p-12 bg-white">
        <div className="flex flex-col md:flex-row gap-10 md:gap-16 items-start">

          {/* Photo */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 200, damping: 24 }}
          >
            <RipplePhoto src={member.photo} alt={member.name} />
          </motion.div>

          {/* Info */}
          <div className="flex-1">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-mono-jb text-xs text-sage uppercase tracking-widest mb-3"
            >
              {member.role}
            </motion.div>

            <motion.h3
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-2xl md:text-3xl font-bold text-navy mb-4"
            >
              {member.name}
            </motion.h3>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
              className="text-muted leading-relaxed mb-6"
            >
              {member.bio}
            </motion.p>

            {/* Credentials */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="font-mono-jb text-xs text-terracotta uppercase tracking-widest mb-4"
            >
              Credentials
            </motion.div>

            <ul className="space-y-2">
              {member.credentials.map((c, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.25 + i * 0.06 }}
                  className="flex gap-2.5 items-start text-sm text-ink/80"
                >
                  <CheckCircle
                    size={14}
                    className="text-sage flex-shrink-0 mt-0.5"
                  />
                  {c}
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* In memoriam */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        className="mt-8 bento-cell p-6 md:p-8 bg-navy-pale border border-navy/10"
      >
        <div className="flex gap-4 items-start">
          <Heart size={18} className="text-terracotta flex-shrink-0 mt-0.5" />
          <div>
            <div className="font-mono-jb text-xs text-muted uppercase tracking-widest mb-2">
              In Memoriam
            </div>
            <div className="font-bold text-navy text-lg">
              {inMemoriam.name}
            </div>
            <div className="font-mono-jb text-xs text-muted mb-3">
              {inMemoriam.years}
            </div>
            <p className="text-sm text-ink/70 leading-relaxed italic">
              &ldquo;{inMemoriam.note}&rdquo;
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
