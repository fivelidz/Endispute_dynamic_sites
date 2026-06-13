"use client";

import { company, contact } from "@/lib/content";
import { RuleFlourish } from "@/lib/flourishes";

const links = [
  { href: "#about", label: "About" },
  { href: "#articles", label: "Process" },
  { href: "#processes", label: "Processes" },
  { href: "#team", label: "Director" },
  { href: "#contact", label: "Contact" },
];

export default function Footer() {
  return (
    <footer className="border-t border-[#2b2118]/20 px-5 py-16 text-center">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8 flex justify-center">
          <RuleFlourish className="h-8 w-[360px] max-w-full" />
        </div>

        <p className="font-garamond text-3xl font-600 text-[#2b2118]">
          {company.name}
          <span className="text-[#9e3b2b]">.</span>
        </p>
        <p className="mt-2 font-garamond text-lg italic text-[#7a6a55]">
          {company.tagline}
        </p>

        <ul className="mt-8 flex flex-wrap justify-center gap-x-7 gap-y-2">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="smallcaps text-[14px] text-[#2b2118] transition-colors hover:text-[#9e3b2b]"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <p className="mt-8 font-mono-quill text-sm text-[#7a6a55]">
          {contact.phone} · {contact.email}
        </p>

        <p className="mt-6 font-mono-quill text-xs text-[#7a6a55]">
          © 2026 Endispute Pty Ltd
        </p>
      </div>
    </footer>
  );
}
