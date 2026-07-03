import { Hero } from "@/components/sections/Hero";
import { Marquee } from "@/components/Marquee";
import { Ways } from "@/components/sections/Ways";
import { CoursesSection } from "@/components/sections/CoursesSection";
import { Manifesto } from "@/components/sections/Manifesto";
import { About } from "@/components/sections/About";
import { Method } from "@/components/sections/Method";
import { Testimonials } from "@/components/sections/Testimonials";
import { Pricing } from "@/components/sections/Pricing";
import { Faq } from "@/components/sections/Faq";
import { FinalCta } from "@/components/sections/FinalCta";

export default function Home() {
  return (
    <>
      <Hero />
      <Marquee />
      <Ways />
      <CoursesSection />
      <Manifesto />
      <About />
      <Method />
      <Testimonials />
      <Pricing />
      <Faq />
      <FinalCta />
    </>
  );
}
