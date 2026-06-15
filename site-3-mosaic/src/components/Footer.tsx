import { company, contact } from '@/lib/content';
import Image from 'next/image';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line bg-canvas-2">
      <div className="max-w-6xl mx-auto px-6 md:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">

          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="relative w-32 h-9 mb-4">
              <Image
                src="/Endispute-Logo2.png"
                alt="Endispute"
                fill
                className="object-contain object-left"
              />
            </div>
            <p className="text-xs text-muted leading-relaxed">
              {company.shortPitch}
            </p>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold text-sm text-fg mb-3">Services</h4>
            <ul className="space-y-2">
              {['Facilitation', 'Mediation', 'Evaluation', 'Expert Referral', 'Arbitration'].map(
                (s) => (
                  <li key={s}>
                    <span className="text-xs text-muted cursor-default">{s}</span>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold text-sm text-fg mb-3">Company</h4>
            <ul className="space-y-2">
              {['About', 'Team', 'Process', 'Panels', 'FAQ'].map((l) => (
                <li key={l}>
                  <a
                    href={`#${l.toLowerCase()}`}
                    className="text-xs text-muted hover:text-fg transition-colors"
                  >
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-sm text-fg mb-3">Contact</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href={`tel:${contact.phone}`}
                  className="text-xs text-muted hover:text-fg transition-colors"
                >
                  {contact.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${contact.email}`}
                  className="text-xs text-muted hover:text-fg transition-colors break-all"
                >
                  {contact.email}
                </a>
              </li>
              <li className="text-xs text-muted">
                {contact.responseWindow}
              </li>
              <li className="text-xs text-muted">{contact.reach}</li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-line flex flex-col md:flex-row justify-between gap-4 items-center">
          <p className="text-xs text-muted">
            © {year} Endispute Pty Ltd. All rights reserved.
          </p>
          <p className="text-xs text-muted">Site&nbsp;3&nbsp;—&nbsp;Mosaic</p>
        </div>
      </div>
    </footer>
  );
}
