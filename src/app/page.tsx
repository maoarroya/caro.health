import { Hero } from "@/components/sections/Hero";
import { Band } from "@/components/sections/Band";
import { Manifesto } from "@/components/sections/Manifesto";
import { Pillars } from "@/components/sections/Pillars";
import { Verticals } from "@/components/sections/Verticals";
import { About } from "@/components/sections/About";
import { FinalCta } from "@/components/sections/FinalCta";

export default function Home() {
  return (
    <>
      <Hero />
      <Band />
      <Manifesto />
      <Pillars />
      <Verticals />
      <About />
      <FinalCta />
    </>
  );
}
