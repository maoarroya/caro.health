import type { Metadata } from "next";
import { virtual } from "@/lib/content";
import { Frame } from "@/components/Frame";
import { PageHero } from "@/components/PageHero";
import { Reveal, RevealGroup, RevealItem } from "@/components/Reveal";
import { Sessions } from "@/components/sections/Sessions";
import { ClassLibrary } from "@/components/sections/ClassLibrary";
import { Pricing } from "@/components/sections/Pricing";
import { Faq } from "@/components/sections/Faq";

export const metadata: Metadata = {
  title: "Pilates, Barre y Yoga virtual en casa",
  description:
    "Clases de Pilates, Barre, Yoga y Meditación bajo demanda para practicar en casa. Filtra por disciplina y duración. Membresía mensual o anual.",
};

export default function VirtualPage() {
  const { equipment } = virtual;
  return (
    <>
      <PageHero
        eyebrow={virtual.eyebrow}
        title={
          <>
            Tu estudio, <em>en tu casa</em>.
          </>
        }
        body={virtual.body}
      >
        <RevealGroup className="mt-16 grid gap-px overflow-hidden rounded-4xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {virtual.disciplines.map((discipline) => (
            <RevealItem key={discipline.name}>
              <div className="h-full bg-porcelain p-7">
                <p className="display text-3xl text-espresso">{discipline.name}</p>
                <p className="mono mt-2 text-[0.65rem] uppercase tracking-[0.14em] text-cocoa">
                  {discipline.claim}
                </p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </PageHero>

      <Sessions />

      {/* Lo que necesitas en casa */}
      <section className="px-5 py-20 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <Reveal>
                <p className="eyebrow text-cocoa">{equipment.eyebrow}</p>
              </Reveal>
              <h2 className="display mt-5 max-w-xl text-4xl text-espresso lg:text-6xl">
                {equipment.title}
              </h2>
            </div>
            <Reveal delay={0.1}>
              <p className="max-w-sm leading-relaxed text-slate">{equipment.body}</p>
            </Reveal>
          </div>

          <RevealGroup className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4" stagger={0.08}>
            {equipment.items.map((item) => (
              <RevealItem key={item.name}>
                <article className="group">
                  <div className="veil relative overflow-hidden rounded-3xl">
                    <Frame
                      photo={item.photo}
                      alt={item.name}
                      className="aspect-4/5"
                      imgClassName="transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                  </div>
                  <h3 className="display mt-4 text-2xl text-espresso">{item.name}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-slate">{item.text}</p>
                </article>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <ClassLibrary />
      <Pricing />
      <Faq />
    </>
  );
}
