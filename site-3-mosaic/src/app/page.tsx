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
      <div className="relative min-h-screen mesh-bg">
        {/* Parallax gradient mesh — scrolls slower via CSS */}
        <div
          className="fixed inset-0 pointer-events-none z-0"
          style={{
            background: `
              radial-gradient(ellipse 70% 50% at 10% 15%, rgba(90,122,91,0.10) 0%, transparent 55%),
              radial-gradient(ellipse 55% 70% at 90% 85%, rgba(196,100,66,0.08) 0%, transparent 55%),
              radial-gradient(ellipse 40% 40% at 55% 45%, rgba(12,31,61,0.04) 0%, transparent 65%)
            `,
          }}
        />

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
