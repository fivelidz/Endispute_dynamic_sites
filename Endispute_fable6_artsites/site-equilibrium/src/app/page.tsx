import ForceLattice from "@/components/ForceLattice";
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
      <ForceLattice />
      <div className="grade" aria-hidden="true" />

      {/* ---------- nav ---------- */}
      <nav className="layer fixed top-0 left-0 right-0 z-30 flex items-center justify-between px-6 md:px-12 py-5 backdrop-blur-sm">
        <div className="flex items-center gap-2.5 display text-xl" style={{ fontWeight: 500 }}>
          <span aria-hidden="true" className="inline-flex items-center gap-1">
            <span style={{ color: "#4fd1c5" }}>◗</span>
            <span style={{ color: "#f5a524" }}>◖</span>
          </span>
          Endispute
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm text-[var(--color-mist)]">
          <a href="#modes" className="hover:text-[var(--color-ink)] transition-colors">Modes</a>
          <a href="#process" className="hover:text-[var(--color-ink)] transition-colors">Process</a>
          <a href="#why" className="hover:text-[var(--color-ink)] transition-colors">Why Endispute</a>
          <a href="#faqs" className="hover:text-[var(--color-ink)] transition-colors">FAQs</a>
        </div>
        <a href="#contact" className="pill">Request consultation</a>
      </nav>

      <main className="layer">
        {/* ===== HERO — centered over the living lattice ===== */}
        <section className="hero">
          <div className="hero-inner hero-panel">
            <Reveal as="div" className="eyebrow">
              <span>Dispute resolution · advisory · management</span>
            </Reveal>
            <Reveal>
              <h1 className="display mt-7 text-[clamp(2.6rem,8vw,6rem)]">
                Two sides.<br />
                <span style={{ color: "#aeb6c2" }}>One </span>
                <span
                  style={{
                    background: "linear-gradient(90deg,#4fd1c5,#6366f1 55%,#f5a524)",
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    color: "transparent",
                  }}
                >
                  equilibrium
                </span>
                .
              </h1>
            </Reveal>
            <Reveal delay={1}>
              <p className="mt-7 text-[var(--color-mist)] text-[17px] leading-relaxed mx-auto" style={{ maxWidth: "52ch" }}>
                {company.about}
              </p>
            </Reveal>
            <Reveal delay={2}>
              <div className="mt-9 pill-row">
                <a href={`tel:${contact.phone.replace(/\s+/g, "")}`} className="pill">
                  Call {contact.phone}
                </a>
                <a href={`mailto:${contact.email}`} className="pill ghost">
                  Email in confidence
                </a>
              </div>
            </Reveal>
            <Reveal delay={3}>
              <p className="mt-12 eyebrow flex items-center gap-3 justify-center">
                <span>Scroll — watch the two sides resolve</span>
                <span aria-hidden="true">↓</span>
              </p>
            </Reveal>
          </div>
        </section>

        {/* ===== ABOUT — portrait + who we are ===== */}
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
              <div>
                <Reveal as="div" className="eyebrow">Who we are</Reveal>
                <Reveal>
                  <h2 className="display mt-4 text-[clamp(1.8rem,4vw,2.8rem)]">
                    The structured space between two sides.
                  </h2>
                </Reveal>
                <Reveal delay={1}>
                  <p className="mt-5 text-[var(--color-mist)] text-[16px] leading-relaxed" style={{ maxWidth: "56ch" }}>
                    {company.whoWeAre}
                  </p>
                </Reveal>
                <Reveal delay={2}>
                  <p className="mt-4 text-[var(--color-mist)] text-[16px] leading-relaxed" style={{ maxWidth: "56ch" }}>
                    {company.mission}
                  </p>
                </Reveal>
              </div>
            </div>
          </div>
        </section>

        {/* ===== MODES — the system's three modes ===== */}
        <section id="modes" className="section">
          <div className="wrap">
            <div className="section-head">
              <Reveal as="div" className="eyebrow">Three modes</Reveal>
              <Reveal>
                <h2 className="display mt-4 text-[clamp(2rem,5vw,3.4rem)]">
                  Every dispute meets one of three modes.
                </h2>
              </Reveal>
              <Reveal delay={1}>
                <p className="lede mt-5 text-[var(--color-mist)] text-[17px] leading-relaxed">
                  {company.whatWeDo}
                </p>
              </Reveal>
            </div>

            <div className="section-body cards three">
              {conflictResolutionCategories.map((c, i) => (
                <Reveal key={c.type} delay={((i % 3) + 1) as 1 | 2 | 3}>
                  <div className="card p-7 h-full">
                    <div className="flex items-center gap-3">
                      <span
                        className="text-xs font-semibold tracking-widest"
                        style={{ color: ["#4fd1c5", "#6366f1", "#f5a524"][i] }}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="hair flex-1" />
                    </div>
                    <h3 className="display mt-5 text-2xl" style={{ fontWeight: 400 }}>
                      {c.type}
                    </h3>
                    <p className="mt-4 text-[var(--color-mist)] text-[15px] leading-relaxed">
                      {c.description}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ===== PROCESS — the five processes ===== */}
        <section id="process" className="section">
          <div className="wrap">
            <div className="section-head">
              <Reveal as="div" className="eyebrow">The processes</Reveal>
              <Reveal>
                <h2 className="display mt-4 text-[clamp(2rem,5vw,3.4rem)]">
                  Five ways to weave a resolution.
                </h2>
              </Reveal>
              <Reveal delay={1}>
                <p className="lede mt-5 text-[var(--color-mist)] text-[17px] leading-relaxed">
                  {company.workingWithUs}
                </p>
              </Reveal>
            </div>

            <ol className="section-body col-center space-y-4">
              {processes.map((p, i) => (
                <Reveal key={p.name} as="li" delay={((i % 3) + 1) as 1 | 2 | 3}>
                  <div className="card p-6 flex gap-5">
                    <span
                      className="display text-2xl leading-none pt-0.5"
                      style={{ color: "#6366f1", fontWeight: 300 }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h3 className="display text-xl" style={{ fontWeight: 400 }}>
                        {p.name}
                      </h3>
                      <p className="mt-2 text-[var(--color-mist)] text-[15px] leading-relaxed">
                        {p.short}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </ol>
          </div>
        </section>

        {/* ===== DIAGRAM — the range of processes ===== */}
        <section className="section">
          <div className="wrap">
            <div className="section-head">
              <Reveal as="div" className="eyebrow">The full spectrum</Reveal>
              <Reveal>
                <h2 className="display mt-4 text-[clamp(1.8rem,4vw,2.8rem)]">
                  Facilitative. Advisory. Determinative.
                </h2>
              </Reveal>
              <Reveal delay={1}>
                <p className="lede mt-5 text-[var(--color-mist)] text-[16px] leading-relaxed">
                  Endispute’s range spans the full spectrum of dispute resolution. Each mode
                  carries its own character and its own processes, matched to the matter to
                  resolve it with the least cost to the relationship.
                </p>
              </Reveal>
            </div>
            <div className="card mt-12" style={{ padding: "clamp(1.5rem,3vw,2.5rem)" }}>
              <SpectrumMatrix
                theme={{
                  ink: "#f5f7fa", body: "#c7cdd6", muted: "#aeb6c2",
                  line: "var(--color-line)", rail: "#6366f1",
                  accentChar: "#4fd1c5", accentProc: "#f5a524",
                  panel: "rgba(14,20,31,0.6)",
                }}
              />
            </div>
          </div>
        </section>

        {/* ===== WHY — benefits ===== */}
        <section id="why" className="section">
          <div className="wrap">
            <div className="section-head">
              <Reveal as="div" className="eyebrow">Why Endispute</Reveal>
              <Reveal>
                <h2 className="display mt-4 text-[clamp(2rem,5vw,3.4rem)]">
                  Resolution that protects what matters.
                </h2>
              </Reveal>
              <Reveal delay={1}>
                <p className="lede mt-5 text-[var(--color-mist)] text-[17px] leading-relaxed">
                  {company.whoWeAre}
                </p>
              </Reveal>
            </div>

            <div className="section-body cards two three-lg">
              {benefits.map((b, i) => (
                <Reveal key={b.title} delay={((i % 3) + 1) as 1 | 2 | 3}>
                  <div className="card p-7 h-full">
                    <div
                      className="w-8 h-8 rounded-full mb-5"
                      style={{
                        background:
                          "radial-gradient(circle at 35% 35%, #4fd1c5, #6366f1 60%, #f5a524)",
                        opacity: 0.9,
                      }}
                      aria-hidden="true"
                    />
                    <h3 className="display text-lg" style={{ fontWeight: 500 }}>
                      {b.title}
                    </h3>
                    <p className="mt-3 text-[var(--color-mist)] text-[15px] leading-relaxed">
                      {b.detail}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ===== FAQs ===== */}
        <section id="faqs" className="section">
          <div className="wrap">
            <div className="section-head">
              <Reveal as="div" className="eyebrow">Questions</Reveal>
              <Reveal>
                <h2 className="display mt-4 text-[clamp(2rem,5vw,3.4rem)]">
                  What to expect.
                </h2>
              </Reveal>
            </div>
            <div className="section-body col-narrow">
              {faqs.map((f) => (
                <Reveal key={f.q}>
                  <details className="faq">
                    <summary>
                      <span>{f.q}</span>
                      <span className="mk" aria-hidden="true">+</span>
                    </summary>
                    <p>{f.a}</p>
                  </details>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ===== CONTACT ===== */}
        <section id="contact" className="section">
          <div className="wrap">
            <div className="section-head">
            <Reveal as="div" className="eyebrow">Begin in confidence</Reveal>
            <Reveal>
              <h2 className="display mt-5 text-[clamp(2.2rem,6vw,4.5rem)]">
                Bring both sides<br />to equilibrium.
              </h2>
            </Reveal>
            <Reveal delay={1}>
              <p className="lede mt-7 text-[var(--color-mist)] text-[17px] leading-relaxed">
                Reach us across {contact.reach}. We respond {contact.responseWindow}.
              </p>
            </Reveal>
            <Reveal delay={2}>
              <div className="mt-10 flex flex-wrap gap-4 justify-center">
                <a href={`tel:${contact.phone.replace(/\s+/g, "")}`} className="pill">
                  {contact.phone}
                </a>
                <a href={`mailto:${contact.email}`} className="pill ghost">
                  {contact.email}
                </a>
              </div>
            </Reveal>
            <Reveal delay={3}>
              <p className="mt-8 eyebrow">
                We respond {contact.responseWindow}
              </p>
            </Reveal>
            </div>
          </div>
        </section>

        {/* ===== FOOTER ===== */}
        <footer className="layer px-6 md:px-12 py-12 border-t border-[var(--color-line)]">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex items-center gap-2.5 display text-lg" style={{ fontWeight: 500 }}>
              <span aria-hidden="true" className="inline-flex items-center gap-1">
                <span style={{ color: "#4fd1c5" }}>◗</span>
                <span style={{ color: "#f5a524" }}>◖</span>
              </span>
              Endispute
            </div>
            <p className="text-[var(--color-faint)] text-sm max-w-md">
              {company.tagline} — {company.shortPitch}. Serving {contact.reach}.
            </p>
            <div className="flex gap-6 text-sm text-[var(--color-mist)]">
              <a href={`tel:${contact.phone.replace(/\s+/g, "")}`} className="hover:text-[var(--color-ink)] transition-colors">
                {contact.phone}
              </a>
              <a href={`mailto:${contact.email}`} className="hover:text-[var(--color-ink)] transition-colors">
                Email
              </a>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}
