import Reveal from "@/components/Reveal";
import QuillTrail from "@/components/QuillTrail";
import LivingContract from "@/components/LivingContract";
import InkUnderline from "@/components/InkUnderline";
import ProcessDiagram from "@/components/ProcessDiagram";
import {
  company,
  contact,
  processes,
  processSteps,
  conflictResolutionCategories,
  benefits,
  team,
  faqs,
} from "@/lib/content";

const tel = `tel:${contact.phone.replace(/\s/g, "")}`;
const mailto = `mailto:${contact.email}`;
const director = team[0];

export default function Page() {
  return (
    <>
      {/* cursor-reactive ink flourish — fixed behind content */}
      <QuillTrail />

      {/* ---------- nav ---------- */}
      <nav className="layer sticky top-0 z-30 backdrop-blur-[2px] bg-[var(--color-parchment)]/82 border-b border-[var(--color-rule)]">
        <div className="wrap flex items-center justify-between py-4">
          <a href="#top" className="flex items-baseline gap-2 display text-2xl" style={{ fontWeight: 500 }}>
            <span style={{ color: "var(--color-oxblood)" }}>§</span> Endispute
          </a>
          <div className="hidden md:flex items-center gap-8 label text-[0.62rem]">
            <a href="#director" className="hover:text-[var(--color-ink)] transition-colors">Director</a>
            <a href="#articles" className="hover:text-[var(--color-ink)] transition-colors">Articles</a>
            <a href="#processes" className="hover:text-[var(--color-ink)] transition-colors">Processes</a>
            <a href="#exhibit" className="hover:text-[var(--color-ink)] transition-colors">Exhibit</a>
            <a href="#why" className="hover:text-[var(--color-ink)] transition-colors">Why</a>
          </div>
          <a href="#contact" className="btn btn-seal">Request consultation</a>
        </div>
      </nav>

      <main id="top" className="layer">
        {/* ===== HERO — the living contract ===== */}
        <section className="section">
          <div className="wrap hero-grid">
            {/* statement */}
            <div>
              <Reveal as="div" className="label">
                Dispute resolution · advisory · management
              </Reveal>
              <Reveal>
                <h1 className="hero-h1 display gap-head text-[clamp(2.6rem,5.6vw,4.8rem)]" style={{ lineHeight: 1.02 }}>
                  End your dispute{" "}
                  <span style={{ fontStyle: "italic", fontWeight: 300 }}>with</span>{" "}
                  <InkUnderline>Endispute</InkUnderline>.
                </h1>
              </Reveal>
              <Reveal delay={1}>
                <p className="hero-lede measure text-[var(--color-ink-soft)] text-[1.14rem]">
                  {company.about}
                </p>
              </Reveal>
              <Reveal delay={2}>
                <div className="gap-body flex flex-wrap gap-4">
                  <a href={tel} className="btn btn-seal">Call {contact.phone}</a>
                  <a href={mailto} className="btn">Write to us</a>
                </div>
              </Reveal>
              <Reveal delay={3}>
                <div className="gap-body flex flex-wrap gap-x-8 gap-y-3 label text-[0.6rem]">
                  <span>{company.shortPitch}</span>
                  <span>{contact.reach}</span>
                  <span>Out of court · in confidence</span>
                </div>
              </Reveal>
            </div>

            {/* the centerpiece art — fills the right column */}
            <div className="w-full">
              <LivingContract />
            </div>
          </div>
        </section>

        {/* ===== DIRECTOR / ABOUT — portrait photo ===== */}
        <section id="director" className="section bg-[var(--color-parchment-light)] border-y border-[var(--color-rule)]">
          <div className="wrap">
            <Reveal as="div" className="article-head">
              <span className="article-mark">Recital · The Practice</span>
              <span className="label text-[0.56rem]">Who we are</span>
            </Reveal>

            <div className="gap-block split-director">
              {/* portrait plate */}
              <Reveal>
                <figure className="plate plate-photo">
                  <span className="plate-seal" aria-hidden="true">E</span>
                  <div className="plate-inner">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={director.photo} alt={`${director.name}, ${director.role}`} />
                  </div>
                  <figcaption className="plate-caption">
                    <span>{director.name}</span>
                    <span>{director.role}</span>
                  </figcaption>
                </figure>
              </Reveal>

              {/* about copy */}
              <Reveal delay={1}>
                <div>
                  <h2 className="display text-[clamp(2rem,4vw,3.2rem)]" style={{ fontWeight: 400 }}>
                    A practice built on{" "}
                    <span style={{ fontStyle: "italic" }}>resolution</span>.
                  </h2>
                  <p className="lead-drop gap-head measure text-[1.06rem] text-[var(--color-ink-soft)]">
                    {company.whoWeAre}
                  </p>
                  <div className="hair-gold" style={{ marginBlock: "var(--space-body)" }} />
                  <blockquote className="pullquote">
                    {director.short}
                    <cite>{director.name} · {director.role}</cite>
                  </blockquote>
                  <p className="gap-body measure text-[1rem] text-[var(--color-ink-soft)]">
                    {director.bio}
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ===== ARTICLES — processSteps as numbered articles ===== */}
        <section id="articles" className="section">
          <div className="wrap">
            <Reveal as="div" className="article-head">
              <span className="article-mark">The Articles · four movements</span>
              <span className="label text-[0.56rem]">How a matter is conducted</span>
            </Reveal>
            <Reveal>
              <h2 className="display gap-eyebrow text-[clamp(2rem,4.5vw,3.4rem)] max-w-3xl" style={{ fontWeight: 400 }}>
                How the matter is conducted.
              </h2>
            </Reveal>
            <Reveal delay={1}>
              <p className="gap-head measure text-[var(--color-ink-soft)]">{company.mission}</p>
            </Reveal>
            <div className="gap-block grid md:grid-cols-2 gap-px bg-[var(--color-rule)] border border-[var(--color-rule)]">
              {processSteps.map((s, i) => (
                <Reveal key={s.number} delay={(i % 2 === 0 ? 1 : 2) as 1 | 2}>
                  <article className="bg-[var(--color-parchment-light)] ledger p-10 md:p-12 h-full">
                    <div className="flex items-baseline gap-4">
                      <span className="clause-no text-[1.7rem]">{s.number}</span>
                      <h3 className="display text-[1.42rem]" style={{ fontWeight: 400 }}>{s.title}</h3>
                    </div>
                    <p className="mt-7 measure text-[1rem] leading-relaxed text-[var(--color-ink-soft)]">{s.summary}</p>
                    <ul className="mt-8 space-y-4">
                      {s.details.slice(0, 3).map((d, di) => (
                        <li key={di} className="flex gap-4 text-[0.96rem] leading-[1.7] text-[var(--color-ink-faint)]">
                          <span className="clause-no text-[0.62rem] pt-[0.3rem]">§</span>
                          <span>{d}</span>
                        </li>
                      ))}
                    </ul>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ===== PROCESSES — margin-numbered instruments ===== */}
        <section id="processes" className="section bg-[var(--color-parchment-light)] border-y border-[var(--color-rule)]">
          <div className="wrap split-processes">
            <div>
              <Reveal as="div" className="article-head">
                <span className="article-mark">The Processes · five instruments</span>
              </Reveal>
              <Reveal>
                <h2 className="display gap-eyebrow text-[clamp(2rem,4.5vw,3.2rem)]" style={{ fontWeight: 400 }}>
                  A multitude of ways to resolve.
                </h2>
              </Reveal>
              <Reveal delay={1}>
                <p className="gap-head measure text-[var(--color-ink-soft)]">{company.whatWeDo}</p>
              </Reveal>
              <Reveal delay={2}>
                <blockquote className="pullquote gap-block">
                  Resolve disputes without burning the bridges that took years to build.
                  <cite>On preserving commercial relationships</cite>
                </blockquote>
              </Reveal>
            </div>

            <ul className="border-t border-[var(--color-rule)]">
              {processes.map((p, i) => (
                <Reveal as="li" key={p.name}>
                  <div className="flex gap-5 md:gap-8 py-9 border-b border-[var(--color-rule)] items-baseline">
                    <span className="margin-no shrink-0 w-[2.4rem]">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h3 className="display text-[1.4rem]" style={{ fontWeight: 400 }}>{p.name}</h3>
                      <p className="mt-4 measure text-[0.98rem] leading-relaxed text-[var(--color-ink-soft)]">{p.short}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </ul>
          </div>
        </section>

        {/* ===== CATEGORIES — three modes ===== */}
        <section id="categories" className="section">
          <div className="wrap">
            <Reveal as="div" className="article-head">
              <span className="article-mark">Approaches · the third party&apos;s role</span>
            </Reveal>
            <Reveal>
              <h2 className="display gap-eyebrow text-[clamp(2rem,4.5vw,3.4rem)]" style={{ fontWeight: 400 }}>Three modes of resolution.</h2>
            </Reveal>
            <div className="gap-block grid md:grid-cols-3 gap-6">
              {conflictResolutionCategories.map((c, i) => (
                <Reveal key={c.type} delay={((i + 1) as 1 | 2 | 3)}>
                  <div className="sheet ruled p-10 md:p-12 h-full">
                    <span className="clause-no text-[0.7rem]">{String(i + 1).padStart(2, "0")}</span>
                    <h3 className="display text-[1.55rem] mt-5" style={{ fontWeight: 400 }}>{c.type}</h3>
                    <div className="hair my-7" />
                    <p className="text-[0.98rem] leading-relaxed text-[var(--color-ink-soft)]">{c.description}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ===== EXHIBIT — the process diagram ===== */}
        <section id="exhibit" className="section bg-[var(--color-parchment-light)] border-y border-[var(--color-rule)]">
          <div className="wrap-mid">
            <Reveal as="div" className="article-head">
              <span className="article-mark">Exhibit A · Schedule of Processes</span>
              <span className="label text-[0.56rem]">Annexed hereto</span>
            </Reveal>
            <Reveal>
              <h2 className="display gap-eyebrow text-[clamp(2rem,4.5vw,3.2rem)] text-center" style={{ fontWeight: 400 }}>
                The Endispute range of processes.
              </h2>
            </Reveal>
            <Reveal delay={1}>
              <figure className="plate gap-block">
                <span className="plate-seal" aria-hidden="true">A</span>
                <div className="plate-inner" style={{ padding: "clamp(1rem, 3vw, 2.4rem)" }}>
                  <ProcessDiagram />
                </div>
                <figcaption className="plate-caption">
                  <span>Exhibit A — range of processes</span>
                  <span>Facilitative · Advisory · Determinative</span>
                </figcaption>
              </figure>
            </Reveal>
          </div>
        </section>

        {/* ===== WHY — benefits ===== */}
        <section id="why" className="section">
          <div className="wrap">
            <Reveal as="div" className="article-head">
              <span className="article-mark">Why Endispute</span>
            </Reveal>
            <Reveal>
              <h2 className="display gap-eyebrow text-[clamp(2rem,4.5vw,3.4rem)] max-w-2xl" style={{ fontWeight: 400 }}>
                A dispute, closed — a relationship, <span style={{ fontStyle: "italic" }}>kept</span>.
              </h2>
            </Reveal>
            <div className="gap-block grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-[var(--color-rule)] border border-[var(--color-rule)]">
              {benefits.slice(0, 4).map((b, i) => (
                <Reveal key={b.title} delay={((i % 3 + 1) as 1 | 2 | 3)}>
                  <div className="bg-[var(--color-parchment-light)] p-10 md:p-12 h-full">
                    <span className="margin-no">{String(i + 1).padStart(2, "0")}</span>
                    <h3 className="display text-[1.22rem] mt-5" style={{ fontWeight: 400 }}>{b.title}</h3>
                    <p className="mt-5 text-[0.96rem] leading-relaxed text-[var(--color-ink-soft)]">{b.detail}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ===== FAQ — marginalia accordions ===== */}
        <section className="section bg-[var(--color-parchment-light)] border-y border-[var(--color-rule)]">
          <div className="wrap-narrow">
            <Reveal as="div" className="article-head">
              <span className="article-mark">Questions · marginalia</span>
            </Reveal>
            <Reveal>
              <h2 className="display gap-eyebrow text-[clamp(2rem,4.5vw,3.2rem)]" style={{ fontWeight: 400 }}>In the margin.</h2>
            </Reveal>
            <div className="gap-block">
              {faqs.map((f, i) => (
                <Reveal key={i}>
                  <details className="group border-b border-[var(--color-rule)] py-7">
                    <summary className="cursor-pointer list-none flex justify-between gap-6 items-baseline">
                      <span className="display text-[1.24rem]" style={{ fontWeight: 400 }}>{f.q}</span>
                      <span className="clause-no text-[1.3rem] leading-none transition-transform group-open:rotate-45">+</span>
                    </summary>
                    <p className="mt-6 measure text-[1rem] leading-relaxed text-[var(--color-ink-soft)]">{f.a}</p>
                  </details>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ===== CONTACT ===== */}
        <section id="contact" className="section text-center">
          <div className="wrap-narrow">
            <Reveal as="div" className="label">Execute the deed</Reveal>
            <Reveal>
              <h2 className="display gap-eyebrow text-[clamp(2.2rem,6vw,4.4rem)]" style={{ fontWeight: 400 }}>{company.tagline}.</h2>
            </Reveal>
            <Reveal delay={1}>
              <p className="gap-head measure mx-auto text-[var(--color-ink-soft)]">
                {company.workingWithUs}
              </p>
            </Reveal>
            <Reveal delay={2}>
              <div className="gap-body flex flex-wrap justify-center gap-4">
                <a href={tel} className="btn btn-seal">{contact.phone}</a>
                <a href={mailto} className="btn">{contact.email}</a>
              </div>
            </Reveal>
            <Reveal delay={3}>
              <p className="gap-body label text-[0.62rem]">
                {contact.reach} · We respond {contact.responseWindow}
              </p>
            </Reveal>
          </div>
        </section>

        {/* ===== FOOTER ===== */}
        <footer className="layer py-10 border-t border-[var(--color-rule)] bg-[var(--color-parchment-light)]">
          <div className="wrap flex flex-wrap justify-between gap-4 items-center">
            <span className="display text-lg" style={{ fontWeight: 500 }}>
              <span style={{ color: "var(--color-oxblood)" }}>§</span> Endispute — Clause
            </span>
            <span className="label text-[0.58rem]">{company.shortPitch} · {contact.reach}</span>
          </div>
        </footer>
      </main>
    </>
  );
}
