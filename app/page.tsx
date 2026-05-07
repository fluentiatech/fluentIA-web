import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import LogoBand from "@/components/LogoBand";
import Benefits from "@/components/Benefits";
import Solutions from "@/components/Solutions";
import Testimonials from "@/components/Testimonials";
import CTABanner from "@/components/CTABanner";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <LogoBand />
        <Benefits />
        <Solutions />
        <Testimonials />
        <CTABanner />
      </main>
      <Footer />
    </>
  );
}
