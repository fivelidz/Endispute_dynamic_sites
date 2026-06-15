import Image from 'next/image';
import { Phone, Mail } from 'lucide-react';
import { company, contact } from '@/lib/content';

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Process', href: '#process' },
  { label: 'Services', href: '#services' },
  { label: 'Panels', href: '#panels' },
  { label: 'Team', href: '#team' },
  { label: 'Contact', href: '#contact' },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#011821] text-white">
      <div className="container-x py-14 lg:py-16">
        <div className="grid lg:grid-cols-[2fr_1fr_1fr] gap-12 lg:gap-16 mb-12">
          {/* Brand column */}
          <div>
            <span className="inline-flex items-center rounded-lg bg-[#111a4a] px-3 py-2 mb-6">
              <Image
                src="/Endispute-Logo2.png"
                alt="Endispute"
                width={150}
                height={44}
                className="h-7 w-auto object-contain brightness-0 invert"
              />
            </span>
            <p className="text-white/55 leading-relaxed text-sm max-w-sm mb-6">
              {company.shortPitch}. Dispute resolution, advisory and management services
              for complex commercial disputes across Australia and internationally.
            </p>
            <div className="flex flex-col gap-2">
              <a
                href={`tel:${contact.phone}`}
                className="flex items-center gap-2 text-sm text-white/55 hover:text-white transition-colors"
              >
                <Phone className="w-3.5 h-3.5" />
                {contact.phone}
              </a>
              <a
                href={`mailto:${contact.email}`}
                className="flex items-center gap-2 text-sm text-white/55 hover:text-white transition-colors"
              >
                <Mail className="w-3.5 h-3.5" />
                {contact.email}
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4
              className="text-xs font-medium tracking-widest uppercase text-white/35 mb-5"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              Navigation
            </h4>
            <ul className="flex flex-col gap-2.5">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-white/55 hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4
              className="text-xs font-medium tracking-widest uppercase text-white/35 mb-5"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              Services
            </h4>
            <ul className="flex flex-col gap-2.5">
              {[
                'Dispute Resolution',
                'Dispute Advisory',
                'Dispute Management',
                'Mediation',
                'Arbitration',
                'Expert Referral',
              ].map((s) => (
                <li key={s}>
                  <span className="text-sm text-white/55">{s}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/35">
            © {year} {company.name}. All rights reserved. ABN available on request.
          </p>
          <p className="text-xs text-white/25" style={{ fontFamily: 'var(--font-mono)' }}>
            Australia &amp; International
          </p>
        </div>
      </div>
    </footer>
  );
}
