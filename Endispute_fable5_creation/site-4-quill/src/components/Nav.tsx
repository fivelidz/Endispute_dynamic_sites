"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Menu, X } from "lucide-react";
import { company } from "@/lib/content";

const links = [
  { href: "#about", label: "About" },
  { href: "#benefits", label: "Benefits" },
  { href: "#articles", label: "Process" },
  { href: "#processes", label: "Processes" },
  { href: "#team", label: "Director" },
  { href: "#faq", label: "Questions" },
  { href: "#contact", label: "Contact" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-[#2b2118]/25 bg-[#f7f1e3]/90 backdrop-blur-sm">
      {/* Double-line bottom border accent */}
      <div className="absolute inset-x-0 -bottom-[3px] h-px bg-[#2b2118]/15" />
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
        <a href="#top" className="font-garamond text-2xl font-600 tracking-wide text-[#2b2118]">
          {company.name}
          <span className="ml-1 text-[#9e3b2b]">.</span>
        </a>

        <ul className="hidden items-center gap-7 md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="smallcaps text-[15px] text-[#2b2118] transition-colors hover:text-[#9e3b2b]"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <button
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
          className="text-[#2b2118] md:hidden"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0, rotateX: -8 }}
            animate={{ height: "auto", opacity: 1, rotateX: 0 }}
            exit={{ height: 0, opacity: 0, rotateX: -8 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            style={{ transformOrigin: "top", perspective: 1200 }}
            className="overflow-hidden border-t border-[#2b2118]/15 bg-[#f7f1e3] md:hidden"
          >
            <ul className="flex flex-col gap-1 px-5 py-4">
              {links.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="smallcaps block py-2 text-[16px] text-[#2b2118] transition-colors hover:text-[#9e3b2b]"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
