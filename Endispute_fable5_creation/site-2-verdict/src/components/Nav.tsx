"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/cn";

const links = [
  { label: "About", href: "#about" },
  { label: "Approach", href: "#duality" },
  { label: "Benefits", href: "#benefits" },
  { label: "Process", href: "#process" },
  { label: "Processes", href: "#processes" },
  { label: "Panel", href: "#panel" },
  { label: "Team", href: "#team" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-40 transition-colors duration-500",
          scrolled
            ? "bg-[#101418] shadow-[0_1px_0_#c8472b]"
            : "bg-transparent"
        )}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <a
            href="#top"
            className="font-serif text-2xl tracking-tight text-[#efe9dc] mix-blend-difference"
          >
            En<span className="italic text-[#c8472b]">dispute</span>
          </a>

          <nav className="hidden items-center gap-7 lg:flex">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="mono-label text-[#b8ae98] transition-colors hover:text-[#c8472b]"
              >
                {l.label}
              </a>
            ))}
          </nav>

          <button
            aria-label="Open menu"
            onClick={() => setOpen(true)}
            className="text-[#efe9dc] mix-blend-difference lg:hidden"
          >
            <Menu size={26} />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-50 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div
              className="absolute inset-0 bg-black/50"
              onClick={() => setOpen(false)}
            />
            <motion.aside
              className="absolute right-0 top-0 flex h-full w-[78%] max-w-sm flex-col bg-[#f6f1e7] px-7 py-7"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="mb-10 flex items-center justify-between">
                <span className="font-serif text-xl text-[#16191d]">
                  En<span className="italic text-[#c8472b]">dispute</span>
                </span>
                <button
                  aria-label="Close menu"
                  onClick={() => setOpen(false)}
                  className="text-[#16191d]"
                >
                  <X size={26} />
                </button>
              </div>
              <nav className="flex flex-col gap-5">
                {links.map((l) => (
                  <a
                    key={l.href}
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="font-serif text-2xl text-[#16191d] transition-colors hover:text-[#c8472b]"
                  >
                    {l.label}
                  </a>
                ))}
              </nav>
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
