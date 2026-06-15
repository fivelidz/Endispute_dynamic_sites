"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/cn";

const LINKS = [
  { label: "About", href: "#about" },
  { label: "Benefits", href: "#benefits" },
  { label: "Process", href: "#process" },
  { label: "Disputes", href: "#disputes" },
  { label: "Panel", href: "#panel" },
  { label: "Director", href: "#director" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed left-0 top-0 z-50 w-full border-b border-[#e3e0d8] bg-[#fefefc]/90 backdrop-blur-sm">
      <div className="mx-auto flex max-w-[1240px] items-center justify-between px-5 py-4 md:px-10">
        {/* Logo */}
        <a href="#top" className="group">
          <span className="font-display text-2xl font-medium tracking-[-0.01em] text-[#0a0a0a]">
            Endispute
          </span>
        </a>

        {/* Desktop links */}
        <nav className="hidden items-center gap-8 lg:flex">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-[13px] font-medium tracking-[-0.01em] text-[#444444] transition-colors hover:text-[#0a0a0a]"
            >
              {l.label}
            </a>
          ))}
        </nav>

        {/* CTA + mobile toggle */}
        <div className="flex items-center gap-4">
          <a
            href="#contact"
            className="hidden rounded-[2px] bg-[#0a0a0a] px-4 py-2 text-[12px] font-medium tracking-[0.02em] text-[#fefefc] transition-opacity hover:opacity-85 md:block"
          >
            Start Intake
          </a>
          <button
            type="button"
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
            className="flex h-9 w-9 items-center justify-center rounded-[2px] border border-[#e3e0d8] text-[#0a0a0a] transition-colors hover:bg-[#0a0a0a] hover:text-[#fefefc] lg:hidden"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-[#e3e0d8] bg-[#fefefc] lg:hidden"
          >
            <div className="flex flex-col px-5 py-2 md:px-10">
              {LINKS.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "border-b border-[#e3e0d8] py-3.5 text-[15px] font-medium text-[#0a0a0a] transition-colors last:border-b-0 hover:text-[#444444]"
                  )}
                >
                  {l.label}
                </a>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
