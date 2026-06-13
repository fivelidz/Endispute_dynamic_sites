import Nav from "@/components/Nav";
import StarField from "@/components/StarField";
import Meridian from "@/components/Meridian";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Waypoints from "@/components/Waypoints";
import Constellations from "@/components/Constellations";
import Panels from "@/components/Panels";
import Team from "@/components/Team";
import FAQ from "@/components/FAQ";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <StarField />
      <Nav />
      <main className="relative">
        {/* The Meridian line spans the full page wrapper */}
        <Meridian />
        <div className="relative z-10">
          <Hero />
          <About />
          <Waypoints />
          <Constellations />
          <Panels />
          <Team />
          <FAQ />
          <Contact />
        </div>
      </main>
      <Footer />
    </>
  );
}
