import Constellation from "@/components/Constellation";
import Reveal from "@/components/Reveal";
import SpectrumMatrix from "@/components/SpectrumMatrix";
import {
  company,
  contact,
  processes,
  conflictResolutionCategories,
  benefits,
  faqs,
} from "@/lib/content";

export default function Page() {
  return (
    <>
      {/* the living art — fixed behind everything */}
      <Constellation />

      {/* ---------- nav ---------- */}
      <nav className="layer fixed top-0 left-0 right-0 z-30 flex items-center justify-between px-6 md:px-12 py-5">
        <div className="flex items-center gap-2 display text-xl" style={{ fontWeight: 500 }}>
          <span style={{ color: "#8052ff" }}>◆</span> Endispute
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm text-[var(--color-ash)]">
          <a href="#process" className="hover:text-white transition-colors">Process</a>
          <a href="#approaches" className="hover:text-white transition-colors">Approaches</a>
          <a href="#why" className="hover:text-white transition-colors">Why Endispute</a>
        </div>
        <a href="#contact" className="pill">Request consultation</a>
      </nav>

      <main className="layer">
        {/* ===== ACT I — CHAOS / hero ===== */}
        <section className="min-h-screen flex items-center">
          <div className="wrap w-full">
          <div className="max-w-2xl scrim">
            <Reveal as="div" className="eyebrow">
              <span style={{ color: "#8052ff" }}>Dispute resolution · advisory · management</span>
            </Reveal>
            <Reveal>
              <h1 className="display mt-6 text-[clamp(2.8rem,9vw,7rem)]">
                From conflict<br />to resolution.
              </h1>
            </Reveal>
            <Reveal delay={1}>
              <p className="mt-8 text-[var(--color-ash)] text-lg max-w-xl leading-relaxed">
                {company.about}
              </p>
            </Reveal>
            <Reveal delay={2}>
              <div className="mt-10 flex flex-wrap gap-4">
                <a href="#contact" className="pill">Start a confidential conversation</a>
                <a href="#process" className="pill ghost">See the process</a>
              </div>
            </Reveal>
            <Reveal delay={3}>
              <p className="mt-12 text-xs tracking-[0.2em] uppercase text-[var(--color-smoke)]">
                Scroll — watch the dispute resolve ↓
              </p>
            </Reveal>
          </div>
          </div>
        </section>

        {/* ===== ACT II — SCALES / balance ===== */}
        <section id="process" className="min-h-screen flex items-center justify-end">
          <div className="wrap w-full flex justify-end">
          <div className="max-w-xl text-right scrim">
            <Reveal as="div" className="eyebrow text-[var(--color-amber)]">The balance</Reveal>
            <Reveal>
              <h2 className="display mt-5 text-[clamp(2rem,5vw,3.6rem)]">
                Every dispute<br />seeks its balance.
              </h2>
            </Reveal>
            <Reveal delay={1}>
              <p className="mt-6 text-[var(--color-ash)] text-[16px] leading-[1.7]">
                {company.whatWeDo}
              </p>
            </Reveal>
            <Reveal delay={2}>
              <div className="mt-8 flex flex-wrap justify-end gap-3">
                {conflictResolutionCategories.map((c) => (
                  <span key={c.type} className="text-xs tracking-wider uppercase border border-white/15 rounded-full px-4 py-2 text-[var(--color-ash)]">
                    {c.type}
                  </span>
                ))}
              </div>
            </Reveal>
          </div>
          </div>
        </section>

        {/* the four steps — quiet cards over the void */}
        <section className="section">
          <div className="wrap-narrow">
            <Reveal as="div" className="eyebrow text-[var(--color-smoke)] text-center">The path · four movements</Reveal>
            <div className="grid md:grid-cols-2 gap-px mt-10 bg-white/10 border border-white/10">
              {processes.slice(0, 4).map((p, i) => (
                <Reveal key={p.name} delay={(i % 2 === 0 ? 1 : 2) as 1 | 2}>
                  <div className="bg-black p-8 h-full">
                    <div className="flex items-baseline gap-3">
                      <span className="display text-2xl" style={{ color: "#8052ff" }}>
                        0{i + 1}
                      </span>
                      <h3 className="display text-xl" style={{ fontWeight: 400 }}>{p.name}</h3>
                    </div>
                    <p className="mt-4 text-[16px] text-[var(--color-ash)] leading-[1.7]">{p.short}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ===== ACT III — HANDSHAKE / agreement ===== */}
        <section id="approaches" className="min-h-screen flex items-center">
          <div className="wrap w-full">
          <div className="max-w-xl scrim">
            <Reveal as="div" className="eyebrow text-[var(--color-lichen)]">The meeting</Reveal>
            <Reveal>
              <h2 className="display mt-5 text-[clamp(2rem,5vw,3.6rem)]">
                Two sides,<br />one table.
              </h2>
            </Reveal>
            <Reveal delay={1}>
              <p className="mt-6 text-[var(--color-ash)] text-[16px] leading-[1.7]">
                {company.workingWithUs}
              </p>
            </Reveal>
            <Reveal delay={2}>
              <ul className="mt-8 space-y-4">
                {processes.slice(0, 5).map((p) => (
                  <li key={p.name} className="flex gap-4 border-b border-white/10 pb-4">
                    <span style={{ color: "#8052ff" }} className="mt-1">◆</span>
                    <div>
                      <div className="display text-lg" style={{ fontWeight: 400 }}>{p.name}</div>
                      <div className="text-[15px] text-[var(--color-smoke)] mt-1 leading-relaxed">{p.short}</div>
                    </div>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
          </div>
        </section>

        {/* ===== ABOUT — portrait + diagram imagery ===== */}
        <section className="section">
          <div className="wrap">
            <div className="split lean">
              <Reveal>
                <div className="frame-img portrait">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/Endispute-V1Taniafinal.jpg" alt="Endispute — Director" />
                  <span className="cap">Endispute · Leaders in Conflict Resolution</span>
                </div>
              </Reveal>
              <div className="scrim">
                <Reveal as="div" className="eyebrow text-[var(--color-plum-soft)]">Who we are</Reveal>
                <Reveal>
                  <h2 className="display mt-4 text-[clamp(1.8rem,4vw,2.8rem)]">
                    A professional approach to complex disputes.
                  </h2>
                </Reveal>
                <Reveal delay={1}>
                  <p className="mt-5 text-[var(--color-ash)] text-[16px] leading-relaxed" style={{ maxWidth: "54ch" }}>
                    {company.whoWeAre}
                  </p>
                </Reveal>
                <Reveal delay={2}>
                  <p className="mt-4 text-[var(--color-ash)] text-[16px] leading-relaxed" style={{ maxWidth: "54ch" }}>
                    {company.mission}
                  </p>
                </Reveal>
              </div>
            </div>

            <div className="mt-20 scrim" style={{ padding: "clamp(1.75rem,3vw,2.75rem)" }}>
              <Reveal as="div" className="eyebrow text-[var(--color-amber)]">The full spectrum</Reveal>
              <Reveal>
                <h2 className="display mt-4 text-[clamp(1.8rem,4vw,2.8rem)]">
                  Facilitative. Advisory. Determinative.
                </h2>
              </Reveal>
              <Reveal delay={1}>
                <p className="mt-5 text-[var(--color-ash)] text-[16px] leading-relaxed" style={{ maxWidth: "60ch" }}>
                  Endispute’s range spans the full spectrum of dispute resolution — from
                  impartial facilitation, through advisory evaluation, to binding
                  determination. Each mode carries its own character and its own
                  processes, matched to the matter to resolve it with the least cost to
                  the relationship.
                </p>
              </Reveal>
              <div className="mt-10">
                <SpectrumMatrix
                  theme={{
                    ink: "#ffffff", body: "#cfcfd6", muted: "#9a9a9a",
                    line: "rgba(255,255,255,0.12)", rail: "#8052ff",
                    accentChar: "#ffb829", accentProc: "#a487ff",
                    panel: "rgba(0,0,0,0.4)",
                  }}
                />
              </div>
            </div>
          </div>
        </section>

        {/* ===== ACT IV — RING / resolution ===== */}
        <section id="why" className="min-h-screen flex flex-col items-center justify-center text-center">
          <div className="wrap w-full flex flex-col items-center">
          <Reveal as="div" className="eyebrow text-[var(--color-plum-soft)]">The resolution</Reveal>
          <Reveal>
            <h2 className="display mt-5 text-[clamp(2.2rem,6vw,4.5rem)] max-w-3xl">
              A dispute, closed —<br />a relationship, kept.
            </h2>
          </Reveal>
          <div className="grid md:grid-cols-3 gap-8 mt-16 max-w-4xl w-full">
            {benefits.slice(0, 3).map((b, i) => (
              <Reveal key={b.title} delay={((i + 1) as 1 | 2 | 3)}>
                <div className="border border-white/10 rounded-2xl p-7 text-left bg-black/55 backdrop-blur-sm">
                  <h3 className="display text-lg" style={{ fontWeight: 400 }}>{b.title}</h3>
                  <p className="mt-3 text-[16px] text-[var(--color-ash)] leading-[1.7]">{b.detail}</p>
                </div>
              </Reveal>
            ))}
          </div>
          </div>
        </section>

        {/* FAQ — restrained */}
        <section className="section">
          <div className="wrap-narrow scrim">
          <Reveal as="div" className="eyebrow text-[var(--color-smoke)]">Questions</Reveal>
          <div className="mt-10 divide-y divide-white/10">
            {faqs.slice(0, 5).map((f, i) => (
              <Reveal key={i}>
                <details className="group py-8">
                  <summary className="cursor-pointer list-none flex justify-between gap-6 display text-xl md:text-2xl leading-snug" style={{ fontWeight: 400 }}>
                    {f.q}
                    <span style={{ color: "#8052ff" }} className="transition-transform group-open:rotate-45 text-2xl">+</span>
                  </summary>
                  <p className="mt-5 text-[17px] text-[var(--color-ash)] leading-[1.7]" style={{ maxWidth: "62ch" }}>{f.a}</p>
                </details>
              </Reveal>
            ))}
          </div>
          </div>
        </section>

        {/* ===== contact ===== */}
        <section id="contact" className="section text-center">
          <div className="wrap-narrow scrim center">
          <Reveal>
            <h2 className="display text-[clamp(2rem,6vw,4rem)]">{company.tagline}.</h2>
          </Reveal>
          <Reveal delay={1}>
            <p className="mt-6 text-[var(--color-ash)]">
              {contact.reach} · We respond {contact.responseWindow}.
            </p>
          </Reveal>
          <Reveal delay={2}>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <a href={`tel:${contact.phone.replace(/\s/g, "")}`} className="pill">{contact.phone}</a>
              <a href={`mailto:${contact.email}`} className="pill ghost">{contact.email}</a>
            </div>
          </Reveal>
          </div>
        </section>

        <footer className="layer border-t border-white/10 px-6 md:px-12 py-10 flex flex-wrap justify-between gap-4 text-xs text-[var(--color-smoke)]">
          <span className="display" style={{ fontWeight: 500 }}>
            <span style={{ color: "#8052ff" }}>◆</span> Endispute — Constellation
          </span>
          <span>{company.shortPitch} · {contact.reach}</span>
        </footer>
      </main>
    </>
  );
}
