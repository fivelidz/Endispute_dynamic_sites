'use client';

import { useRef } from 'react';
import {
  motion,
  useTime,
  useTransform,
  useReducedMotion,
} from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { company, stats } from '@/lib/content';
import { heroContainer, heroItem } from '@/lib/variants';
import CounterStat from './CounterStat';

interface BlobConfig {
  color: string;
  size: number;
  baseX: number;
  baseY: number;
  rangeX: number;
  rangeY: number;
  speed: number;
  offset: number;
}

// Signature aurora blobs — kept, but very subtle/soft so the hero stays calm & premium.
const blobs: BlobConfig[] = [
  { color: 'rgba(17,26,74,0.06)',  size: 620, baseX: 12, baseY: 8,  rangeX: 14, rangeY: 10, speed: 16000, offset: 0 },
  { color: 'rgba(236,101,43,0.045)', size: 520, baseX: 70, baseY: 58, rangeX: 12, rangeY: 14, speed: 20000, offset: 3000 },
  { color: 'rgba(17,26,74,0.045)', size: 460, baseX: 82, baseY: 12, rangeX: 10, rangeY: 16, speed: 24000, offset: 6000 },
  { color: 'rgba(17,26,74,0.035)', size: 420, baseX: 30, baseY: 78, rangeX: 14, rangeY: 9,  speed: 18000, offset: 9000 },
];

function AuroraBlob({ blob }: { blob: BlobConfig }) {
  const shouldReduce = useReducedMotion();
  const time = useTime();

  const x = useTransform(time, (t) => {
    if (shouldReduce) return `${blob.baseX}%`;
    const angle = ((t + blob.offset) / blob.speed) * Math.PI * 2;
    return `${blob.baseX + Math.sin(angle) * blob.rangeX}%`;
  });

  const y = useTransform(time, (t) => {
    if (shouldReduce) return `${blob.baseY}%`;
    const angle = ((t + blob.offset) / blob.speed) * Math.PI * 2;
    return `${blob.baseY + Math.cos(angle * 0.7) * blob.rangeY}%`;
  });

  return (
    <motion.div
      style={{
        left: x,
        top: y,
        width: blob.size,
        height: blob.size,
        background: `radial-gradient(circle, ${blob.color} 0%, transparent 70%)`,
        transform: 'translate(-50%, -50%)',
        borderRadius: '50%',
        position: 'absolute',
        pointerEvents: 'none',
        filter: 'blur(8px)',
      }}
    />
  );
}

// Button — primary is deep-indigo fill, ghost is hairline outline.
interface MagneticButtonProps {
  href: string;
  variant: 'primary' | 'ghost';
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}

function MagneticButton({ href, variant, children, onClick }: MagneticButtonProps) {
  const base =
    'inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium select-none cursor-pointer transition-colors duration-200';
  const styles = {
    primary: `${base} bg-[#111a4a] text-white hover:bg-[#1c2a6e]`,
    ghost: `${base} border border-[#e3e4e8] text-[#011821] hover:border-[#111a4a] hover:text-[#111a4a] bg-white`,
  };

  return (
    <a href={href} onClick={onClick} className={styles[variant]}>
      {children}
    </a>
  );
}

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  const firstSentence = company.about.split('.')[0] + '.';

  return (
    <section
      ref={sectionRef}
      className="relative flex flex-col justify-center overflow-hidden bg-[#f6f6f8]"
      id="hero"
    >
      {/* Aurora blobs — subtle, behind content */}
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        {blobs.map((blob, i) => (
          <AuroraBlob key={i} blob={blob} />
        ))}
        <div
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
            backgroundRepeat: 'repeat',
          }}
        />
      </div>

      {/* Content */}
      <motion.div
        variants={heroContainer}
        initial="hidden"
        animate="visible"
        className="container-x relative z-10 pt-28 pb-16 lg:pt-32 lg:pb-20"
      >
        {/* Pill badge — single rationed ember accent */}
        <motion.div variants={heroItem} className="mb-7">
          <span
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#ec652b]/30 bg-[#ec652b]/8 text-[#d2531f] text-xs font-medium tracking-widest uppercase"
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            Dispute Resolution · Advisory · Management
          </span>
        </motion.div>

        {/* Heading — engineered, ~48–60px max */}
        <motion.h1
          variants={heroItem}
          className="max-w-3xl font-light text-[#011821] mb-6"
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            lineHeight: 1.08,
            letterSpacing: '-0.02em',
          }}
        >
          End Your Dispute{' '}
          <br className="hidden sm:block" />
          With{' '}
          <span className="text-[#111a4a] font-normal">Endispute</span>
        </motion.h1>

        {/* Sub-paragraph */}
        <motion.p
          variants={heroItem}
          className="max-w-xl text-base text-[#7c7f88] leading-relaxed mb-8"
        >
          {company.shortPitch} — {firstSentence}
        </motion.p>

        {/* CTAs */}
        <motion.div variants={heroItem} className="flex flex-wrap gap-3 mb-16">
          <MagneticButton
            href="#contact"
            variant="primary"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Arrange a consultation
            <ArrowRight className="w-4 h-4" />
          </MagneticButton>
          <MagneticButton
            href="#process"
            variant="ghost"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector('#process')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Our process
          </MagneticButton>
        </motion.div>

        {/* Stats row */}
        <motion.div
          variants={heroItem}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 pt-10 border-t border-[#e3e4e8]"
        >
          {stats.map((stat, i) => (
            <CounterStat key={i} stat={stat} index={i} />
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
