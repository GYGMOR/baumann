import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import About from "@/components/About";
import Benefits from "@/components/Benefits";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1 w-full relative">
        <Hero />
        <Services />
        <About />
        <Benefits />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
