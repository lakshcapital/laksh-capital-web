import { SlidersHorizontal, Target, UserRoundCheck, Zap } from "lucide-react";
import About from "@/components/about";
import Contact from "@/components/contact";
import FAQ from "@/components/faq";
import Footer from "@/components/footer";
import Hero from "@/components/hero";
import Services from "@/components/services";
import Testimonials from "@/components/testimonials";
import Header from "@/components/header";
import Team from "@/components/team";
import { HERO, SERVICES } from "@/data";
import ScrollToTop from "@/components/scroll-to-top";
import LatestBlogs from "@/components/latest-blogs";
import TrustStrip from "@/components/trust-strip";

export default function Home() {
  return (
    <>
      <ScrollToTop />
      <div className="hero__bg h-full w-full absolute inset-0 -z-10 bg-[radial-gradient(circle_at_85%_33%,rgba(0,255,235,0.075)_0%,hsla(0,0%,100%,0)_25%),radial-gradient(circle_at_12%_35%,rgba(108,99,255,0.15)_0%,hsla(0,0%,100%,0)_25%)]"></div>
      <Header calendlyUrl={process.env.NEXT_APP_CALENDLY_URL} />
      <main>
        <Hero
          heading={HERO.heading}
          description={HERO.description}
          buttons={{
            primary: {
              text: HERO.buttonPrimaryText,
              icon: <Zap className="size-4" />,
              url: process.env.NEXT_APP_CALENDLY_URL || "#",
            },
          }}
          badge={HERO.badge}
        />
        <TrustStrip />
        <About
          description="We offer wealth management solutions, furnishing accurate information to investors and providing impartial guidance to achieve their financial objectives. Our dedicated team is focused on generating wealth for clients in alignment with their individual needs and aspirations, all aimed at attaining their financial milestones."
          missionText="To be the trusted partner in shaping our client's financial success and security and provide unbiased, ethical and personalized wealth management solutions."
          heading2="Our Investment Framework"
          description2="We conduct extensive research across all financial products and asset classes. Our team continuously evaluates market opportunities to shortlist only the best and most reliable options"
          cards={[
            {
              icon: <UserRoundCheck className="size-4" />,
              title: "Client-Centric Approach",
              description:
                "Every investor is unique. We assess your financial profile, risk appetite, and goals to provide truly personalized recommendations.",
            },
            {
              icon: <Target className="size-4" />,
              title: "Goal-Based Planning",
              description:
                "Wealth works when it meets life goals. We align investments with milestones like child education, retirement, legacy planning etc.",
            },
            {
              icon: <SlidersHorizontal className="size-4" />,
              title: "Tailored Investment Solutions",
              description:
                "We recommend investment products - mutual funds, AIFs, PMS, and more - aligned with your goals to maximize returns while protecting capital.",
            },
          ]}
        />
        <Services
          title="Our Services"
          description="Strategic financial solutions empowering confident decisions, sustainable growth, and future financial security."
          service1={SERVICES[0]}
          service2={SERVICES[1]}
          service3={SERVICES[2]}
          service4={SERVICES[3]}
          service5={SERVICES[4]}
          service6={SERVICES[5]}
        />
        <Team />
        <Testimonials />
        <LatestBlogs />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
