import CursorSpotlight from "@/components/CursorSpotlight";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import MarqueeBand from "@/components/MarqueeBand";
import About from "@/components/About";
import HorizontalProcess from "@/components/HorizontalProcess";
import DisputeProcesses from "@/components/DisputeProcesses";
import Panels from "@/components/Panels";
import Team from "@/components/Team";
import FAQ from "@/components/FAQ";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Page() {
  return (
    <>
      {/* Cursor spotlight — fixed overlay, client-only */}
      <CursorSpotlight />

      {/* Navigation */}
      <Nav />

      <main>
        {/* 01 — Hero with kinetic typography */}
        <Hero />

        {/* 02 — Marquee of expertise */}
        <MarqueeBand />

        {/* 03 — About editorial layout */}
        <About />

        {/* 04 — Horizontal scroll process (THE STAR) */}
        <HorizontalProcess />

        {/* 05 — Dispute process services grid */}
        <DisputeProcesses />

        {/* 06 — Panel expertise */}
        <Panels />

        {/* 07 — Team with parallax portrait */}
        <Team />

        {/* 08 — FAQ accordion */}
        <FAQ />

        {/* 09 — Contact form */}
        <Contact />
      </main>

      <Footer />
    </>
  );
}
