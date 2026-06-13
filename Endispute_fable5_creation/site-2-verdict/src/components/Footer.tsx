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
    <footer className="border-t-2 border-[#c8472b] bg-[#efe9dc] px-6 py-16 text-[#16191d]">
      <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-3">
        <div>
          <span className="font-serif text-2xl">
            En<span className="italic text-[#c8472b]">dispute</span>
          </span>
          <p className="mt-4 max-w-xs font-mono text-[12px] leading-relaxed text-[#6e6a60]">
            {company.tagline}
          </p>
        </div>

        <div>
          <p className="mono-label mb-4 text-[#c8472b]">Navigate</p>
          <ul className="grid grid-cols-2 gap-2">
            {nav.map((n) => (
              <li key={n.href}>
                <a
                  href={n.href}
                  className="font-mono text-[12px] text-[#6e6a60] transition-colors hover:text-[#c8472b]"
                >
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="mono-label mb-4 text-[#c8472b]">Contact</p>
          <ul className="space-y-2 font-mono text-[12px] text-[#6e6a60]">
            <li>
              <a
                href={`tel:${contact.phone.replace(/\s/g, "")}`}
                className="transition-colors hover:text-[#c8472b]"
              >
                {contact.phone}
              </a>
            </li>
            <li>
              <a
                href={`mailto:${contact.email}`}
                className="transition-colors hover:text-[#c8472b]"
              >
                {contact.email}
              </a>
            </li>
            <li>{contact.reach}</li>
          </ul>
        </div>
      </div>

      <div className="mx-auto mt-14 max-w-6xl border-t border-[#16191d]/12 pt-6">
        <p className="font-mono text-[11px] tracking-[0.1em] text-[#6e6a60]">
          © {new Date().getFullYear()} {company.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
