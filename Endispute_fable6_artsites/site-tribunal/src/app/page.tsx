import Image from "next/image";
import Scales from "@/components/Scales";
import Reveal from "@/components/Reveal";
import SpectrumMatrix from "@/components/SpectrumMatrix";
import {
  company,
  contact,
  processes,
  conflictResolutionCategories,
  benefits,
  team,
  faqs,
} from "@/lib/content";

const tel = `tel:${contact.phone.replace(/\s/g, "")}`;
const mail = `mailto:${contact.email}`;
const director = team[0];

export default function Page() {
  return (
    <>
      {/* ---------- nav ---------- */}
      <nav className="fixed top-0 left-0 right-0 z-30 bg-gradient-to-b from-[#0a0a0a] via-[#0a0a0a]/85 to-transparent">
        <div className="shell flex items-center justify-between py-4">
          <a href="#top" className="flex items-center">
            <Image
              src="/Endispute-Logo2.png"
              alt="Endispute"
              width={150}
              height={34}
              className="h-7 w-auto"
              priority
            />
          </a>
          <div className="hidden md:flex items-center gap-9 text-sm text-[var(--color-ash)]">
            <a href="#director" className="hover:text-white transition-colors">Director</a>
            <a href="#approaches" className="hover:text-white transition-colors">Approaches</a>
            <a href="#process" className="hover:text-white transition-colors">Process</a>
            <a href="#why" className="hover:text-white transition-colors">Why Endispute</a>
            <a href="#faqs" className="hover:text-white transition-colors">Questions</a>
          </div>
          <a href="#contact" className="btn">Request consultation</a>
        </div>
      </nav>

      <main id="top">
        {/* ===== HERO — two-column: text | scales ===== */}
        <section className="shell section section--hero">
          <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-x-16 gap-y-14 items-center">
            {/* LEFT — headline + intro + buttons */}
            <div>
              <Reveal as="div" className="eyebrow">
                <span style={{ color: "var(--color-brass)" }}>
                  Dispute resolution · advisory · management
                </span>
              </Reveal>
              <Reveal>
                <h1 className="display mt-6 text-[clamp(2.8rem,6.5vw,5.25rem)]">
                  Where every dispute
                  <br />
                  finds its balance.
                </h1>
              </Reveal>
              <Reveal delay={1}>
                <p className="lead">{company.about}</p>
              </Reveal>
              <Reveal delay={2}>
                <div className="mt-10 flex flex-wrap gap-4">
                  <a href={tel} className="btn">Call the practice</a>
                  <a href={mail} className="btn ghost">Start in confidence</a>
                </div>
              </Reveal>
              <Reveal delay={3}>
                <p className="mt-12 text-xs tracking-[0.22em] uppercase text-[var(--color-smoke)]">
                  Scroll — watch the scales settle into balance ↓
                </p>
              </Reveal>
            </div>

            {/* RIGHT — the scales, in their own bounded panel */}
            <Reveal delay={1} className="w-full">
              <Scales />
            </Reveal>
          </div>
        </section>

        {/* ===== DIRECTOR / ABOUT ===== */}
        <section id="director" className="border-t border-[var(--color-line)]">
          <div className="shell section">
            <div className="grid lg:grid-cols-[0.8fr_1.2fr] gap-x-16 gap-y-12 items-start">
              <Reveal className="w-full max-w-sm mx-auto lg:mx-0 lg:sticky lg:top-28">
                <div className="frame-brass">
                  <Image
                    src={director.photo}
                    alt={director.name}
                    width={640}
                    height={800}
                    className="w-full h-auto"
                  />
                </div>
              </Reveal>
              <div className="section-head" style={{ maxWidth: "100%" }}>
                <Reveal as="div" className="eyebrow text-[var(--color-brass)]">Who we are</Reveal>
                <Reveal>
                  <h2 className="heading mt-[1.1rem] max-w-2xl">
                    Led by an internationally-recognised authority in resolution.
                  </h2>
                </Reveal>
                <Reveal delay={1}>
                  <p className="lead max-w-2xl">{company.whoWeAre}</p>
                </Reveal>
                <Reveal delay={2}>
                  <div className="hair my-10" />
                </Reveal>
                <Reveal delay={2}>
                  <h3 className="display text-[1.65rem]" style={{ fontWeight: 400 }}>
                    {director.name}
                  </h3>
                  <p className="mt-2 text-sm tracking-wide text-[var(--color-brass)]">{director.role}</p>
                  <p className="mt-5 text-[var(--color-ash)] leading-relaxed max-w-2xl">
                    {director.bio}
                  </p>
                </Reveal>
              </div>
            </div>
          </div>
        </section>

        {/* ===== APPROACHES — three categories ===== */}
        <section id="approaches" className="border-t border-[var(--color-line)]">
          <div className="shell section">
            <div className="section-head center">
              <Reveal as="div" className="eyebrow">Three ways to resolve</Reveal>
              <Reveal>
                <h2 className="heading mt-[1.1rem]">
                  Facilitative. Advisory. Determinative.
                </h2>
              </Reveal>
            </div>
            <div className="grid md:grid-cols-3 gap-px mt-16 bg-[var(--color-line)] border border-[var(--color-line)]">
              {conflictResolutionCategories.map((c, i) => (
                <Reveal key={c.type} delay={((i + 1) as 1 | 2 | 3)}>
                  <div className="bg-[var(--color-ink)] p-10 h-full">
                    <span className="display text-2xl" style={{ color: "var(--color-brass)" }}>
                      0{i + 1}
                    </span>
                    <h3 className="display text-[1.6rem] mt-3" style={{ fontWeight: 400 }}>{c.type}</h3>
                    <div className="hair my-6" />
                    <p className="text-sm text-[var(--color-ash)] leading-relaxed">{c.description}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ===== PROCESS — five instruments ===== */}
        <section id="process" className="border-t border-[var(--color-line)]">
          <div className="shell section">
            <Reveal as="div" className="eyebrow text-[var(--color-brass)]">The panel’s instruments</Reveal>
            <Reveal>
              <h2 className="heading mt-[1.1rem] max-w-xl">
                Five processes, chosen to fit the matter.
              </h2>
            </Reveal>
            <Reveal delay={1}>
              <p className="lead max-w-2xl">{company.whatWeDo}</p>
            </Reveal>
            <div className="mt-14 grid md:grid-cols-2 gap-x-16 gap-y-2 divide-y divide-[var(--color-line)] md:divide-y-0 border-t border-[var(--color-line)]">
              {processes.map((p, i) => (
                <Reveal key={p.name}>
                  <div className="grid grid-cols-[3.5rem_1fr] gap-x-6 py-8 group border-b border-[var(--color-line)]">
                    <span className="display text-3xl text-[var(--color-smoke)] group-hover:text-[var(--color-brass)] transition-colors">
                      0{i + 1}
                    </span>
                    <div>
                      <h3 className="display text-[1.5rem]" style={{ fontWeight: 400 }}>{p.name}</h3>
                      <p className="mt-3 text-[0.95rem] text-[var(--color-ash)] leading-[1.7]">{p.short}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>

            {/* the full range — content-rich spectrum matrix, full width */}
            <div className="mt-20">
              <Reveal as="div" className="eyebrow text-[var(--color-brass)]">The full range</Reveal>
              <Reveal>
                <h2 className="heading mt-[1.1rem] max-w-2xl">
                  From facilitative to determinative.
                </h2>
              </Reveal>
              <div className="mt-10 rounded-2xl" style={{ border: "1px solid var(--color-line)", padding: "clamp(1.5rem,3vw,2.5rem)", background: "rgba(20,18,14,0.5)" }}>
                <SpectrumMatrix
                  theme={{
                    ink: "#f3ead4", body: "#cfc6b2", muted: "#9a8f76",
                    line: "var(--color-line)", rail: "#c9a24b",
                    accentChar: "#c9a24b", accentProc: "#6b8fb0",
                    panel: "rgba(20,18,14,0.6)",
                  }}
                />
              </div>
            </div>
          </div>
        </section>

        {/* ===== WHY — benefits ===== */}
        <section id="why" className="border-t border-[var(--color-line)]">
          <div className="shell section">
            <div className="section-head center">
              <Reveal as="div" className="eyebrow">Why Endispute</Reveal>
              <Reveal>
                <h2 className="heading mt-[1.1rem]">
                  A dispute, closed — a relationship, kept.
                </h2>
              </Reveal>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px mt-16 bg-[var(--color-line)] border border-[var(--color-line)]">
              {benefits.slice(0, 4).map((b, i) => (
                <Reveal key={b.title} delay={(((i % 3) + 1) as 1 | 2 | 3)}>
                  <div className="bg-[var(--color-surface)] p-9 h-full">
                    <span style={{ color: "var(--color-brass)" }} className="text-lg">⚖</span>
                    <h3 className="display text-[1.35rem] mt-5" style={{ fontWeight: 400 }}>{b.title}</h3>
                    <p className="mt-3 text-sm text-[var(--color-ash)] leading-relaxed">{b.detail}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ===== FAQ ===== */}
        <section id="faqs" className="border-t border-[var(--color-line)]">
          <div className="shell section">
            <div className="max-w-3xl mx-auto">
              <div className="section-head">
                <Reveal as="div" className="eyebrow">Questions</Reveal>
                <Reveal>
                  <h2 className="heading mt-[1.1rem]">
                    What clients ask first.
                  </h2>
                </Reveal>
              </div>
              <div className="mt-12 divide-y divide-[var(--color-line)] border-t border-[var(--color-line)]">
                {faqs.map((f, i) => (
                  <Reveal key={i}>
                    <details className="group py-7">
                      <summary className="cursor-pointer list-none flex justify-between gap-6 display text-xl" style={{ fontWeight: 400 }}>
                        {f.q}
                        <span style={{ color: "var(--color-brass)" }} className="transition-transform group-open:rotate-45 shrink-0">+</span>
                      </summary>
                      <p className="mt-4 text-sm text-[var(--color-ash)] leading-relaxed max-w-2xl">{f.a}</p>
                    </details>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ===== CONTACT ===== */}
        <section id="contact" className="border-t border-[var(--color-line)]">
          <div className="shell section">
            <div className="section-head center">
              <Reveal as="div" className="eyebrow text-[var(--color-brass)]">{company.shortPitch}</Reveal>
              <Reveal>
                <h2 className="heading mt-[1.1rem] text-[clamp(2.4rem,6vw,4.5rem)]">{company.tagline}.</h2>
              </Reveal>
              <Reveal delay={1}>
                <p className="lead">
                  {contact.reach}. We respond {contact.responseWindow}.
                </p>
              </Reveal>
              <Reveal delay={2}>
                <div className="mt-10 flex flex-wrap justify-center gap-4">
                  <a href={tel} className="btn">{contact.phone}</a>
                  <a href={mail} className="btn ghost">{contact.email}</a>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        <footer className="border-t border-[var(--color-line)]">
          <div className="shell py-10 flex flex-wrap items-center justify-between gap-4 text-xs text-[var(--color-smoke)]">
            <Image
              src="/Endispute-Logo2.png"
              alt="Endispute"
              width={130}
              height={30}
              className="h-6 w-auto opacity-80"
            />
            <span>{company.shortPitch} · {contact.reach}</span>
          </div>
        </footer>
      </main>
    </>
  );
}
