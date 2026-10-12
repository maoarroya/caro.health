import { Fragment, type ReactNode } from "react";
import type { LandingData, SectionId } from "@/lib/landing";
import { Hero } from "@/components/sections/Hero";
import { Band } from "@/components/sections/Band";
import { Manifesto } from "@/components/sections/Manifesto";
import { Pillars } from "@/components/sections/Pillars";
import { Verticals } from "@/components/sections/Verticals";
import { Courses } from "@/components/sections/Courses";
import { About } from "@/components/sections/About";
import { FinalCta } from "@/components/sections/FinalCta";

/**
 * La home, sección por sección, en el orden y con el contenido que define el
 * builder. `preview` la pinta dentro del editor: cada sección queda marcada
 * para poder seleccionarla con un clic.
 */
export function Landing({ data, preview = false }: { data: LandingData; preview?: boolean }) {
  const render: Record<SectionId, () => ReactNode> = {
    hero: () => <Hero data={data.hero} />,
    band: () => <Band data={data.band} />,
    manifesto: () => <Manifesto data={data.manifesto} />,
    pillars: () => <Pillars data={data.pillars} />,
    verticals: () => <Verticals data={data.verticals} />,
    courses: () => <Courses data={data.courses} preview={preview} />,
    about: () => <About data={data.about} />,
    cta: () => <FinalCta data={data.cta} />,
  };

  return data.order
    .filter((id) => !data.hidden.includes(id))
    .map((id) =>
      preview ? (
        <div
          key={id}
          data-section={id}
          className="outline-2 -outline-offset-2 outline-transparent transition-[outline-color] hover:outline-gold"
        >
          {render[id]()}
        </div>
      ) : (
        <Fragment key={id}>{render[id]()}</Fragment>
      ),
    );
}
