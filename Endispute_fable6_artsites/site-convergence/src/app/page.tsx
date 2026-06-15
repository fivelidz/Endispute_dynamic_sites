import ForceLattice from "@/components/ForceLattice";
import Reveal from "@/components/Reveal";
import SpectrumMatrix from "@/components/SpectrumMatrix";
import {
  company,
  contact,
  conflictResolutionCategories,
  benefits,
  processes,
  faqs,
  team,
} from "@/lib/content";

const tel = `tel:${contact.phone.replace(/\s+/g, "")}`;
const mailto = `mailto:${contact.email}`;

export default function Page() {
  return (
    <>
      {/* the living force-lattice — two sides weaving into one */}
      <ForceLattice />
      <div className="grade" aria-hidden="true" />

      {/* ---------- nav ---------- */}
      <nav className="layer fixed top-0 left-0 right-0 z-30">
        <div className="measure flex items-center justify-between px-6 py-5">
          <a href="#top" className="text-xl tracking-tight" style={{ fontWeight: 600 }}>
            En<span style={{ color: "#fc1c46" }}>dispute</span>
          </a>
          <div className="hidden md:flex items-center gap-8 mono-label text-[var(--color-body)]">
            <a href="#about" className="hover:text-white transition-colors">About</a>
            <a href="#duality" className="hover:text-white transition-colors">Approaches</a>
            <a href="#balance" className="hover:text-white transition-colors">Why</a>
            <a href="#process" className="hover:text-white transition-colors">Process</a>
          </div>
          <a href="#contact" className="cta">Arrange a consultation</a>
        </div>
      </nav>

      <main id="top" className="layer">
        {/* ===== SPLIT HERO — two sides, one resolution ===== */}
        <section className="relative min-h-screen w-full overflow-hidden flex items-center">
          {/* center seam */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-1/2 z-20 hidden md:block h-[60%] w-[2px] -translate-x-1/2 -translate-y-1/2"
            style={{ background: "linear-gradient(180deg, transparent, #fc1c46 18%, #fc1c46 82%, transparent)" }}
          />
          <div className="measure w-full px-6 grid md:grid-cols-2 gap-10 md:gap-0 pt-24 pb-16">
            {/* left side */}
            <div className="md:pr-12 lg:pr-16 flex">
              <div className="split-left-inner scrim p-8 md:p-10">
                <Reveal as="div" className="mono-label text-[var(--color-body)]">
                  {company.shortPitch}
                </Reveal>
                <Reveal>
                  <h1 className="display mt-6 text-[clamp(2.6rem,6.5vw,5rem)]">
                    Two<br />sides<span style={{ color: "#fc1c46" }}>.</span>
                  </h1>
                </Reveal>
                <Reveal delay={1}>
                  <p className="mt-6 text-[var(--color-body)] text-[16px] leading-relaxed">
                    Every dispute has two sides. Endispute is the structured, confidential
                    space between them — facilitative, advisory and determinative processes
                    led by senior, independent panel members.
                  </p>
                </Reveal>
                <Reveal delay={2}>
                  <a href="#contact" className="cta mt-8">Arrange a consultation</a>
                </Reveal>
              </div>
            </div>
            {/* right side */}
            <div className="md:pl-12 lg:pl-16 flex md:justify-end">
              <div className="split-right-inner scrim p-8 md:p-10 md:text-right">
                <Reveal as="div" className="mono-label text-[var(--color-body)]">
                  End your dispute with Endispute
                </Reveal>
                <Reveal>
                  <h1 className="display mt-6 text-[clamp(2.6rem,6.5vw,5rem)]">
                    One<br />resolution<span style={{ color: "#fc1c46" }}>.</span>
                  </h1>
                </Reveal>
                <Reveal delay={1}>
                  <p className="mt-6 text-[var(--color-body)] text-[16px] leading-relaxed">
                    Out of court, in confidence, with the commercial relationship kept intact —
                    across Australia and internationally.
                  </p>
                </Reveal>
                <Reveal delay={2}>
                  <a href="#process" className="cta ghost mt-8">Our processes</a>
                </Reveal>
              </div>
            </div>
          </div>
        </section>

        {/* ===== 01 — ABOUT ===== */}
        <section id="about" className="relative px-6 py-24 md:py-32">
          <div className="measure" style={{ maxWidth: "62rem" }}>
            <Reveal as="div" className="mono-label text-[var(--color-body)]">01 — A leading provider</Reveal>
            <Reveal>
              <h2 className="display mt-6 text-[clamp(2rem,4.5vw,3.25rem)] max-w-3xl">
                A leading provider of<br />dispute <span style={{ color: "#fc1c46" }}>resolution</span>.
              </h2>
            </Reveal>
            <Reveal delay={1}>
              <blockquote
                className="mt-10 pl-7 font-serif italic text-[clamp(1.15rem,2.4vw,1.6rem)] leading-snug text-white"
                style={{ borderLeft: "2px solid #fc1c46", maxWidth: "44ch" }}
              >
                {company.mission}
              </blockquote>
            </Reveal>
            <div className="mt-12 grid md:grid-cols-2 gap-10">
              <Reveal delay={1}>
                <p className="text-[var(--color-body)] text-[16px] leading-[1.8]">{company.about}</p>
              </Reveal>
              <Reveal delay={2}>
                <p className="text-[var(--color-body)] text-[16px] leading-[1.8]">{company.whoWeAre}</p>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ===== DIRECTOR — portrait imagery ===== */}
        <section className="relative px-6 pb-8 md:pb-12">
          <div className="measure grid lg:grid-cols-[0.85fr_1.15fr] gap-12 items-center">
            <Reveal>
              <figure className="relative">
                <div
                  className="overflow-hidden"
                  style={{ border: "1px solid var(--color-hairline)", borderRadius: 14, aspectRatio: "4 / 5" }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={team[0].photo}
                    alt={team[0].name}
                    style={{ width: "100%", height: "100%", objectFit: "cover", filter: "grayscale(0.35) contrast(1.05)" }}
                  />
                </div>
                <figcaption className="mt-4 mono-label text-[var(--color-muted)]">
                  {team[0].name} — {team[0].role}
                </figcaption>
              </figure>
            </Reveal>
            <div className="scrim p-8 md:p-10">
              <Reveal as="div" className="mono-label text-[var(--color-body)]">The mind behind Endispute</Reveal>
              <Reveal>
                <h2 className="display mt-5 text-[clamp(1.8rem,3.6vw,2.8rem)]">
                  An internationally-recognised authority in <span style={{ color: "#fc1c46" }}>resolution</span>.
                </h2>
              </Reveal>
              <Reveal delay={1}>
                <p className="mt-6 text-[var(--color-body)] text-[16px] leading-[1.8]">{team[0].bio}</p>
              </Reveal>
              <Reveal delay={2}>
                <ul className="mt-7 grid sm:grid-cols-2 gap-x-8 gap-y-3">
                  {team[0].credentials.slice(0, 6).map((c) => (
                    <li key={c} className="flex gap-3 text-[14px] text-[var(--color-muted)] leading-relaxed">
                      <span style={{ color: "#fc1c46" }} aria-hidden="true" className="mt-[2px]">—</span>
                      <span>{c}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>
          </div>
        </section>

        {/* seam divider with serif "vs" */}
        <div className="relative h-20 flex items-center justify-center">
          <div className="measure flex items-center justify-center gap-5 px-6 w-full">
            <span className="h-[2px] flex-1 max-w-[18rem]" style={{ background: "linear-gradient(90deg, transparent, #fc1c46)" }} />
            <span className="font-serif italic text-[var(--color-muted)] text-lg">vs</span>
            <span className="h-[2px] flex-1 max-w-[18rem]" style={{ background: "linear-gradient(90deg, #fc1c46, transparent)" }} />
          </div>
        </div>

        {/* ===== 02 — DUALITY / three approaches ===== */}
        <section id="duality" className="relative px-6 py-24 md:py-32">
          <div className="measure">
            <Reveal as="div" className="mono-label text-[var(--color-body)]">02 — How a third party can help</Reveal>
            <Reveal>
              <h2 className="display mt-6 text-[clamp(2rem,4.5vw,3.25rem)] max-w-2xl">
                Three ways to bring two sides <span style={{ color: "#fc1c46" }}>together</span>.
              </h2>
            </Reveal>
            <div className="mt-14 grid gap-6 md:grid-cols-3">
              {conflictResolutionCategories.map((c, i) => (
                <Reveal key={c.type} delay={((i % 3) + 1) as 1 | 2 | 3}>
                  <div className="card p-8 h-full">
                    <span className="mono-label" style={{ color: "#fc1c46" }}>0{i + 1}</span>
                    <h3 className="font-serif italic text-2xl mt-5 text-white">{c.type}</h3>
                    <span className="block h-[2px] w-12 mt-4" style={{ background: "#fc1c46" }} />
                    <p className="mt-5 text-[var(--color-body)] text-[15px] leading-[1.75]">{c.description}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ===== 03 — BALANCE / benefits (spine) ===== */}
        <section id="balance" className="relative px-6 py-24 md:py-32">
          <div className="measure" style={{ maxWidth: "62rem" }}>
            <div className="text-center">
              <Reveal as="div" className="mono-label text-[var(--color-body)]">03 — The balance of advantage</Reveal>
              <Reveal>
                <h2 className="display mt-6 text-[clamp(2rem,4.5vw,3.25rem)] mx-auto" style={{ maxWidth: "20ch" }}>
                  Resolution that protects what <span style={{ color: "#fc1c46" }}>matters</span>.
                </h2>
              </Reveal>
            </div>
            <div className="relative mt-16">
              {/* central spine line */}
              <div aria-hidden="true" className="absolute left-1/2 top-0 bottom-0 hidden md:block w-[2px] -translate-x-1/2" style={{ background: "linear-gradient(180deg,#fc1c46,transparent)" }} />
              <div className="grid gap-6 md:gap-y-10">
                {benefits.map((b, i) => (
                  <Reveal key={b.title} delay={((i % 3) + 1) as 1 | 2 | 3}>
                    <div className={`md:w-1/2 ${i % 2 === 0 ? "md:pr-12" : "md:ml-auto md:pl-12"}`}>
                      <div className="card p-7">
                        <h3 className="text-lg text-white" style={{ fontWeight: 500 }}>{b.title}</h3>
                        <p className="mt-3 text-[var(--color-body)] text-[15px] leading-[1.75]">{b.detail}</p>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ===== 04 — PROCESS ===== */}
        <section id="process" className="relative px-6 py-24 md:py-32">
          <div className="measure">
            <Reveal as="div" className="mono-label text-[var(--color-body)]">04 — A multitude of processes</Reveal>
            <Reveal>
              <h2 className="display mt-6 text-[clamp(2rem,4.5vw,3.25rem)] max-w-2xl">
                The right process for the <span style={{ color: "#fc1c46" }}>matter</span>.
              </h2>
            </Reveal>
            <div className="mt-12" style={{ borderTop: "1px solid var(--color-hairline)" }}>
              {processes.map((p, i) => (
                <Reveal key={p.name}>
                  <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-8 py-7" style={{ borderBottom: "1px solid var(--color-hairline)" }}>
                    <span className="font-serif italic text-xl w-12 flex-none" style={{ color: "#fc1c46" }}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="font-serif text-2xl text-white md:w-72 flex-none">{p.name}</h3>
                    <p className="text-[var(--color-body)] text-[15px] leading-[1.7]">{p.short}</p>
                  </div>
                </Reveal>
              ))}
            </div>

            {/* the full range — content-rich spectrum matrix */}
            <div className="mt-16 card p-7 md:p-10">
              <SpectrumMatrix
                theme={{
                  ink: "#ffffff", body: "#cccccc", muted: "#8a8a8a",
                  line: "var(--color-hairline)", rail: "#fc1c46",
                  accentChar: "#e6e6ee", accentProc: "#fc1c46",
                  panel: "rgba(20,20,20,0.66)",
                }}
              />
            </div>
          </div>
        </section>

        {/* ===== FAQ ===== */}
        <section id="faq" className="relative px-6 py-24 md:py-32">
          <div className="measure" style={{ maxWidth: "52rem" }}>
            <Reveal as="div" className="mono-label text-[var(--color-body)]">Common questions</Reveal>
            <Reveal>
              <h2 className="display mt-6 text-[clamp(2rem,4.5vw,3.25rem)]">
                What to <span style={{ color: "#fc1c46" }}>expect</span>.
              </h2>
            </Reveal>
            <div className="mt-10">
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

        {/* ===== CONTACT — split ===== */}
        <section id="contact" className="relative w-full overflow-hidden">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-1/2 z-20 hidden md:block h-[55%] w-[2px] -translate-x-1/2 -translate-y-1/2"
            style={{ background: "linear-gradient(180deg, transparent, #fc1c46 18%, #fc1c46 82%, transparent)" }}
          />
          <div className="measure w-full px-6 grid md:grid-cols-2 gap-10 md:gap-0 py-24 md:py-32">
            <div className="md:pr-12 lg:pr-16 flex">
              <div className="split-left-inner scrim p-8 md:p-10">
                <Reveal as="div" className="mono-label text-[var(--color-body)]">09 — Get in touch</Reveal>
                <Reveal>
                  <h2 className="display mt-6 text-[clamp(2rem,5vw,3.6rem)]">
                    End your <span style={{ color: "#fc1c46" }}>dispute</span>.
                  </h2>
                </Reveal>
                <Reveal delay={1}>
                  <p className="mt-6 text-[var(--color-body)] text-[16px] leading-relaxed">{company.workingWithUs}</p>
                </Reveal>
                <Reveal delay={2}>
                  <div className="mt-8 flex flex-col gap-3">
                    <a href={tel} className="cta">{contact.phone}</a>
                    <a href={mailto} className="cta ghost">{contact.email}</a>
                  </div>
                </Reveal>
              </div>
            </div>
            <div className="md:pl-12 lg:pl-16 flex md:justify-end">
              <div className="split-right-inner scrim p-8 md:p-10">
                <Reveal as="div" className="mono-label text-[var(--color-body)]">Begin in confidence</Reveal>
                <Reveal delay={1}>
                  <p className="mt-6 font-serif italic text-[clamp(1.3rem,3vw,2rem)] leading-snug text-white">
                    “Two sides. One resolution.”
                  </p>
                </Reveal>
                <Reveal delay={2}>
                  <p className="mt-6 text-[var(--color-body)] text-[15px] leading-relaxed">
                    Reach us across {contact.reach}. We respond {contact.responseWindow}.
                  </p>
                </Reveal>
              </div>
            </div>
          </div>
        </section>

        <footer className="layer border-t px-6 py-12" style={{ borderColor: "var(--color-hairline)" }}>
          <div className="measure flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <span className="text-lg" style={{ fontWeight: 600 }}>
              En<span style={{ color: "#fc1c46" }}>dispute</span> — Convergence
            </span>
            <span className="text-sm text-[var(--color-muted)]">{company.tagline} · {contact.reach}</span>
          </div>
        </footer>
      </main>
    </>
  );
}
