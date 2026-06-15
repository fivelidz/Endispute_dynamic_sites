'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import Image from 'next/image';
import { Menu, X, Phone } from 'lucide-react';
import { contact } from '@/lib/content';
import { cn } from '@/lib/cn';

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Process', href: '#process' },
  { label: 'Services', href: '#services' },
  { label: 'Panels', href: '#panels' },
  { label: 'Team', href: '#team' },
  { label: 'Contact', href: '#contact' },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const shouldReduce = useReducedMotion();
  const prevScrollY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      prevScrollY.current = window.scrollY;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleLinkClick = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: shouldReduce ? 'auto' : 'smooth' });
    }
  };

  return (
    <>
      <motion.header
        initial={false}
        animate={{
          backgroundColor: scrolled ? 'rgba(246,246,248,0.85)' : 'rgba(246,246,248,0)',
          boxShadow: scrolled
            ? '0 1px 2px rgba(17,26,74,0.04), 0 8px 24px rgba(17,26,74,0.08)'
            : '0 0 0 0 transparent',
          borderColor: scrolled ? 'rgba(227,228,232,1)' : 'rgba(227,228,232,0)',
        }}
        transition={{ duration: 0.3 }}
        style={{ backdropFilter: scrolled ? 'blur(12px)' : 'blur(0px)' }}
        className="fixed top-0 left-0 right-0 z-50 border-b"
      >
        <div className="container-x flex items-center justify-between h-14 lg:h-16">
          {/* Logo — placed on a dark indigo chip so the light logo always reads */}
          <a
            href="#"
            onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="flex-shrink-0 inline-flex items-center rounded-lg bg-[#111a4a] px-3 py-2 shadow-sm"
            aria-label="Endispute — home"
          >
            <Image
              src="/Endispute-Logo2.png"
              alt="Endispute"
              width={150}
              height={44}
              className="h-7 w-auto object-contain brightness-0 invert"
              priority
            />
          </a>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => { e.preventDefault(); handleLinkClick(link.href); }}
                className="text-sm font-medium tracking-tight text-[#011821] hover:text-[#111a4a] transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Phone CTA — deep indigo primary */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href={`tel:${contact.phone}`}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#111a4a] text-white text-sm font-medium hover:bg-[#1c2a6e] transition-colors duration-200"
            >
              <Phone className="w-3.5 h-3.5" />
              {contact.phone}
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden p-2 rounded-lg text-[#011821]"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </motion.header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile-menu"
            initial={shouldReduce ? { opacity: 1 } : { opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={shouldReduce ? { opacity: 0 } : { opacity: 0, y: -16 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-x-0 top-14 z-40 bg-[#f6f6f8] border-b border-[#e3e4e8] shadow-xl px-6 py-6 lg:hidden"
          >
            <nav className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => { e.preventDefault(); handleLinkClick(link.href); }}
                  className="text-base font-medium text-[#011821] hover:text-[#111a4a] transition-colors py-1"
                >
                  {link.label}
                </a>
              ))}
              <a
                href={`tel:${contact.phone}`}
                className="mt-2 flex items-center gap-2 px-4 py-3 rounded-lg bg-[#111a4a] text-white font-medium justify-center hover:bg-[#1c2a6e] transition-colors"
              >
                <Phone className="w-4 h-4" />
                {contact.phone}
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
