import Navbar      from "@/components/Navbar";
import BackgroundJourney from "@/components/BackgroundJourney";
import Hero        from "@/components/Hero";
import Marquee     from "@/components/Marquee";
import About       from "@/components/About";
import Work        from "@/components/Work";
import Services    from "@/components/Services";
import Process      from "@/components/Process";
// import Testimonials from "@/components/Testimonials"; // temporarily removed — add back later
import Contact      from "@/components/Contact";
import Footer       from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <BackgroundJourney />
      <Navbar />
      <Hero />
      <Marquee />
      <About />
      <Work />
      <Services />
      <Process />
      {/* <Testimonials /> temporarily removed — add back later */}
      <Contact />
      <Footer />
    </main>
  );
}
