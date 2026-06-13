"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/cn";

const LINKS = [
  { index: "01", label: "About", href: "#about" },
  { index: "02", label: "Benefits", href: "#benefits" },
  { index: "03", label: "Process", href: "#process" },
  { index: "04", label: "Disputes", href: "#disputes" },
  { index: "05", label: "Panel", href: "#panel" },
  { index: "06", label: "Director", href: "#director" },
  { index: "07", label: "FAQ", href: "#faq" },
  { index: "08", label: "Contact", href: "#contact" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed left-0 top-0 z-50 w-full border-b border-[#d6d2c8] bg-[#f4f2ed]/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-[1600px] items-center justify-between px-5 py-4 md:px-10">
        {/* Logo */}
        <a href="#top" className="group flex items-baseline gap-2">
          <span className="font-heavy text-xl uppercase tracking-tight text-[#0a0a0a]">
            Endispute
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#d92b1c]">
            ▪ A1 / 00
          </span>
        </a>

        {/* Desktop links */}
        <nav className="hidden items-center gap-7 lg:flex">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="group flex items-baseline gap-1.5 font-mono text-[12px] uppercase tracking-[0.12em] text-[#0a0a0a] transition-colors hover:text-[#d92b1c] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d92b1c] focus-visible:ring-offset-2 focus-visible:ring-offset-[#f4f2ed]"
            >
              <span className="text-[10px] text-[#8a877f] transition-colors group-hover:text-[#d92b1c]">
                {l.index}
              </span>
              <span>{l.label}</span>
            </a>
          ))}
        </nav>

        {/* CTA + mobile toggle */}
        <div className="flex items-center gap-4">
          <a
            href="#contact"
            className="hidden bg-[#0a0a0a] px-4 py-2 font-mono text-[11px] uppercase tracking-[0.15em] text-[#f4f2ed] transition-colors hover:bg-[#d92b1c] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d92b1c] focus-visible:ring-offset-2 focus-visible:ring-offset-[#f4f2ed] md:block"
          >
            Start Intake →
          </a>
          <button
            type="button"
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
            className="flex h-9 w-9 items-center justify-center border border-[#0a0a0a] text-[#0a0a0a] transition-colors hover:bg-[#0a0a0a] hover:text-[#f4f2ed] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d92b1c] focus-visible:ring-offset-2 focus-visible:ring-offset-[#f4f2ed] lg:hidden"
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
            className="overflow-hidden border-t border-[#d6d2c8] bg-[#f4f2ed] lg:hidden"
          >
            <div className="flex flex-col px-5 py-2 md:px-10">
              {LINKS.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "flex items-baseline gap-3 border-b border-[#d6d2c8] py-3 font-mono text-sm uppercase tracking-[0.12em] text-[#0a0a0a] transition-colors last:border-b-0 hover:text-[#d92b1c] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d92b1c] focus-visible:ring-offset-2 focus-visible:ring-offset-[#f4f2ed]"
                  )}
                >
                  <span className="text-[11px] text-[#d92b1c]">{l.index}</span>
                  <span>{l.label}</span>
                </a>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
