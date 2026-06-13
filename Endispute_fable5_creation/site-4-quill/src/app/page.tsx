import QuillProgress from "@/components/QuillProgress";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Benefits from "@/components/Benefits";
import Articles from "@/components/Articles";
import Processes from "@/components/Processes";
import Seal from "@/components/Seal";
import Team from "@/components/Team";
import FAQ from "@/components/FAQ";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <QuillProgress />
      <Nav />
      <main>
        <Hero />
        <About />
        <Benefits />
        <Articles />
        <Processes />
        <Seal />
        <Team />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
