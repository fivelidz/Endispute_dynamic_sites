import AmbientOrbs from "@/components/AmbientOrbs";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import TrustBar from "@/components/TrustBar";
import About from "@/components/About";
import Benefits from "@/components/Benefits";
import Elevator from "@/components/Elevator";
import Processes from "@/components/Processes";
import Panels from "@/components/Panels";
import Team from "@/components/Team";
import FAQ from "@/components/FAQ";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <AmbientOrbs />
      <Nav />
      <main className="relative">
        <Hero />
        <TrustBar />
        <About />
        <Benefits />
        <Elevator />
        <Processes />
        <Panels />
        <Team />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
