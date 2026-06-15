"use client";

import { company, contact } from "@/lib/content";

const nav = [
  { label: "About", href: "#about" },
  { label: "Approach", href: "#duality" },
  { label: "Benefits", href: "#benefits" },
  { label: "Process", href: "#process" },
  { label: "Processes", href: "#processes" },
  { label: "Panel", href: "#panel" },
  { label: "Team", href: "#team" },
  { label: "FAQ", href: "#faq" },
];

export default function Footer() {
  return (
    <footer className="border-t border-[#4c4c4c] bg-[#0a0a0a] px-6 py-14 text-[#cccccc]">
      <div className="measure grid gap-12 md:grid-cols-3">
        <div>
          <span className="font-serif text-2xl text-white">
            En<span className="italic text-[#fc1c46]">dispute</span>
          </span>
          <p className="mt-4 max-w-xs font-mono text-[12px] leading-[1.5] text-[#cccccc]">
            {company.tagline}
          </p>
        </div>

        <div>
          <p className="mono-label mb-4 text-[#cccccc]">Navigate</p>
          <ul className="grid grid-cols-2 gap-2">
            {nav.map((n) => (
              <li key={n.href}>
                <a
                  href={n.href}
                  className="font-mono text-[12px] text-[#cccccc] transition-colors hover:text-white"
                >
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="mono-label mb-4 text-[#cccccc]">Contact</p>
          <ul className="space-y-2 font-mono text-[12px] text-[#cccccc]">
            <li>
              <a
                href={`tel:${contact.phone.replace(/\s/g, "")}`}
                className="transition-colors hover:text-white"
              >
                {contact.phone}
              </a>
            </li>
            <li>
              <a
                href={`mailto:${contact.email}`}
                className="transition-colors hover:text-white"
              >
                {contact.email}
              </a>
            </li>
            <li>{contact.reach}</li>
          </ul>
        </div>
      </div>

      <div className="measure mt-12 border-t border-[#4c4c4c] pt-6">
        <p className="font-mono text-[11px] tracking-[0.1em] text-[#cccccc]">
          © {new Date().getFullYear()} {company.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
