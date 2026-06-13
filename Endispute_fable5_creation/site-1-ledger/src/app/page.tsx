import ScrollProgress from "@/components/ScrollProgress";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import About from "@/components/About";
import Benefits from "@/components/Benefits";
import ProcessSteps from "@/components/ProcessSteps";
import Processes from "@/components/Processes";
import Panels from "@/components/Panels";
import Team from "@/components/Team";
import FAQ from "@/components/FAQ";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <ScrollProgress />
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <About />
        <Benefits />
        <ProcessSteps />
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
