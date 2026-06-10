import About from "@/components/about";
import Contact from "@/components/contact";
import FAQ from "@/components/faq";
import Footer from "@/components/footer";
import Hero from "@/components/hero";
import Services from "@/components/services";
import Testimonials from "@/components/testimonials";
import Header from "@/components/header";
import Team from "@/components/team";
import LatestBlogs from "@/components/latest-blogs";
import TrustStrip from "@/components/trust-strip";
import HashScroller from "@/components/hash-scroller";
import WelcomePreloader from "@/components/welcome-preloader";
import WhatsAppButton from "@/components/whatsapp-button";

export default function Home() {
  return (
    <>
      <WelcomePreloader />
      <HashScroller />
      <div className="hero__bg h-full w-full absolute inset-0 -z-10 bg-[radial-gradient(circle_at_85%_33%,rgba(0,255,235,0.075)_0%,hsla(0,0%,100%,0)_25%),radial-gradient(circle_at_12%_35%,rgba(108,99,255,0.15)_0%,hsla(0,0%,100%,0)_25%)]"></div>
      <Header calendlyUrl={process.env.NEXT_APP_CALENDLY_URL} />
      <main>
        <Hero calendlyUrl={process.env.NEXT_APP_CALENDLY_URL} />
        <TrustStrip />
        <About />
        <Services
          title="Our Services"
          description="Strategic financial solutions empowering confident decisions, sustainable growth, and future financial security."
        />
        <Team />
        <Testimonials />
        <LatestBlogs />
        <FAQ />
        <Contact />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
