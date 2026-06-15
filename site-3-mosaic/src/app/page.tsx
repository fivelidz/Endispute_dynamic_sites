import CustomCursor from '@/components/CustomCursor';
import Nav from '@/components/Nav';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Services from '@/components/Services';
import Process from '@/components/Process';
import Panels from '@/components/Panels';
import Team from '@/components/Team';
import FAQ from '@/components/FAQ';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <>
      <CustomCursor />
      <div className="relative min-h-screen bg-canvas">
        {/* Restrained sapphire atmosphere — fixed, GPU-cheap */}
        <div className="atlas-glow fixed inset-0 pointer-events-none z-0" />

        <div className="relative z-10">
          <Nav />
          <main>
            <Hero />
            <About />
            <Services />
            <Process />
            <Panels />
            <Team />
            <FAQ />
            <Contact />
          </main>
          <Footer />
        </div>
      </div>
    </>
  );
}
