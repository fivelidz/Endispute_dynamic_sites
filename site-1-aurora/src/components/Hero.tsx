'use client';

import { useRef } from 'react';
import {
  motion,
  useTime,
  useTransform,
  useReducedMotion,
} from 'motion/react';
import { ArrowRight, ChevronDown } from 'lucide-react';
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

const blobs: BlobConfig[] = [
  { color: 'rgba(14,74,74,0.18)', size: 700, baseX: 10, baseY: 5, rangeX: 18, rangeY: 12, speed: 12000, offset: 0 },
  { color: 'rgba(194,91,74,0.13)', size: 600, baseX: 65, baseY: 60, rangeX: 14, rangeY: 16, speed: 16000, offset: 3000 },
  { color: 'rgba(201,161,74,0.12)', size: 500, baseX: 80, baseY: 10, rangeX: 12, rangeY: 20, speed: 20000, offset: 6000 },
  { color: 'rgba(14,74,74,0.10)', size: 450, baseX: 30, baseY: 75, rangeX: 16, rangeY: 10, speed: 14000, offset: 9000 },
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
        filter: 'blur(1px)',
      }}
    />
  );
}

// Magnetic button
interface MagneticButtonProps {
  href: string;
  variant: 'primary' | 'ghost';
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}

function MagneticButton({ href, variant, children, onClick }: MagneticButtonProps) {
  const shouldReduce = useReducedMotion();
  const btnRef = useRef<HTMLAnchorElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (shouldReduce || !btnRef.current) return;
    const rect = btnRef.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) * 0.25;
    const dy = (e.clientY - cy) * 0.25;
    btnRef.current.style.transform = `translate(${dx}px, ${dy}px)`;
  };

  const handleMouseLeave = () => {
    if (!btnRef.current) return;
    btnRef.current.style.transform = 'translate(0,0)';
    btnRef.current.style.transition = 'transform 0.4s cubic-bezier(0.34,1.56,0.64,1)';
  };

  const base =
    'inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold select-none cursor-pointer';
  const styles = {
    primary: `${base} bg-[#c25b4a] text-white hover:bg-[#a84a3a] shadow-lg shadow-[#c25b4a]/20`,
    ghost: `${base} border-2 border-[#0e4a4a] text-[#0e4a4a] hover:bg-[#0e4a4a] hover:text-[#fbf7f0]`,
  };

  return (
    <a
      ref={btnRef}
      href={href}
      onClick={onClick}
      className={styles[variant]}
      style={{
        willChange: 'transform',
        transition: 'transform 0.1s, background-color 0.2s, color 0.2s, border-color 0.2s',
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </a>
  );
}

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  const scrollToAbout = () => {
    document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' });
  };

  const firstSentence = company.about.split('.')[0] + '.';

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-[#fbf7f0]"
      id="hero"
    >
      {/* Aurora blobs */}
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        {blobs.map((blob, i) => (
          <AuroraBlob key={i} blob={blob} />
        ))}
        <div
          className="absolute inset-0 opacity-[0.025]"
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
        className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 pt-28 pb-16 lg:pt-36 lg:pb-24"
      >
        {/* Pill badge */}
        <motion.div variants={heroItem} className="mb-8">
          <span
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#0e4a4a]/25 bg-[#0e4a4a]/6 text-[#0e4a4a] text-xs font-medium tracking-widest uppercase"
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            Dispute Resolution · Advisory · Management
          </span>
        </motion.div>

        {/* Heading */}
        <motion.h1
          variants={heroItem}
          className="max-w-4xl text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-semibold text-[#161614] leading-[1.05] tracking-tight mb-8"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          End Your Dispute{' '}
          <br className="hidden sm:block" />
          With{' '}
          <em className="text-[#0e4a4a]" style={{ fontStyle: 'italic' }}>
            Endispute
          </em>
        </motion.h1>

        {/* Sub-paragraph */}
        <motion.p
          variants={heroItem}
          className="max-w-2xl text-lg lg:text-xl text-[#6b6560] leading-relaxed mb-10"
        >
          {company.shortPitch} — {firstSentence}
        </motion.p>

        {/* CTAs */}
        <motion.div variants={heroItem} className="flex flex-wrap gap-4 mb-20">
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
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 pt-10 border-t border-[#e8e0d4]"
        >
          {stats.map((stat, i) => (
            <CounterStat key={i} stat={stat} index={i} />
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        onClick={scrollToAbout}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-[#6b6560] hover:text-[#0e4a4a] transition-colors"
        aria-label="Scroll to about"
      >
        <span
          className="text-xs tracking-widest uppercase"
          style={{ fontFamily: 'var(--font-mono)' }}
        >
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown className="w-4 h-4" />
        </motion.div>
      </motion.button>
    </section>
  );
}
