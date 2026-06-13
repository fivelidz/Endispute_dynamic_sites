import SeamProgress from "@/components/SeamProgress";
import Nav from "@/components/Nav";
import SplitHero from "@/components/SplitHero";
import About from "@/components/About";
import VsDivider from "@/components/VsDivider";
import Duality from "@/components/Duality";
import Spine from "@/components/Spine";
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
      <SeamProgress />
      <Nav />
      <main>
        <SplitHero />
        <About />
        <VsDivider />
        <Duality />
        <Spine />
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
