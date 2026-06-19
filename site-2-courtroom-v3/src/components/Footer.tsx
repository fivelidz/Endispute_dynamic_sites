import { company, contact } from "@/lib/content";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#0a0a0a] border-t border-[#2e2e2e]">
      <div className="max-w-7xl mx-auto px-8 sm:px-12 lg:px-16 py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="lg:col-span-2">
            {/* Official wordmark asset (white-on-transparent, suits the dark footer) */}
            <img
              src="/Endispute-Logo2.png"
              alt="Endispute"
              width={385}
              height={100}
              loading="eager"
              decoding="async"
              className="mb-5 h-9 w-auto opacity-90"
            />
            <p
              className="text-3xl font-light text-[#f4eedf] mb-4 sr-only"
              style={{ fontFamily: "var(--font-display)" }}
            >
              <span className="italic text-[#d4a14a]">En</span>dispute
            </p>
            <p className="text-[#c8bfa8]/70 text-sm leading-relaxed max-w-sm">
              {company.shortPitch}. Complex dispute resolution for industry,
              commerce and government — across Australia and internationally.
            </p>
          </div>

          {/* Contact */}
          <div>
            <h4
              className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#d4a14a] mb-5"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              Contact
            </h4>
            <ul className="space-y-3 text-sm text-[#c8bfa8]/70">
              <li>
                <a
                  href={`tel:${contact.phone}`}
                  className="hover:text-[#f4eedf] transition-colors"
                >
                  {contact.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${contact.email}`}
                  className="hover:text-[#f4eedf] transition-colors break-all"
                >
                  {contact.email}
                </a>
              </li>
              <li className="text-[#c8bfa8]/40">{contact.reach}</li>
            </ul>
          </div>

          {/* Navigation */}
          <div>
            <h4
              className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#d4a14a] mb-5"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              Navigate
            </h4>
            <ul className="space-y-2 text-sm">
              {[
                ["About", "#about"],
                ["Process", "#process"],
                ["Services", "#services"],
                ["Panel", "#panel"],
                ["Team", "#team"],
                ["FAQ", "#faq"],
                ["Contact", "#contact"],
              ].map(([label, href]) => (
                <li key={href}>
                  <a
                    href={href}
                    className="text-[#c8bfa8]/70 hover:text-[#f4eedf] transition-colors duration-200"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-[#2e2e2e] pt-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <p
            className="text-[10px] font-mono text-[#c8bfa8]/30 tracking-widest uppercase"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            © {year} {company.name} Pty Ltd. All rights reserved.
          </p>
          <p
            className="text-[10px] font-mono text-[#c8bfa8]/20 tracking-widest"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            ABN · Australia
          </p>
        </div>
      </div>
    </footer>
  );
}
