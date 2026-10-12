import type { Metadata } from "next";
import { conferencias, brand } from "@/lib/content";
import { Frame } from "@/components/Frame";
import { Sprig } from "@/components/Sprig";
import { Reveal, RevealGroup, RevealItem, TextReveal } from "@/components/Reveal";
import { Marquee } from "@/components/Marquee";

export const metadata: Metadata = {
  title: "Conferencias",
  description:
    "Conferencias, talleres y jornadas de bienestar con Caro: nutrición de alta vibración y movimiento consciente para empresas, universidades, congresos y eventos.",
};

const mailto = (subject: string) =>
  `mailto:${brand.email}?subject=${encodeURIComponent(subject)}`;

export default function ConferenciasPage() {
  return (
    <>
      {/* Hero: text + portrait, the speaker is the product */}
      <section className="px-5 pt-32 pb-16 lg:px-8 lg:pt-40">
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-20">
          <div>
            <Reveal>
              <p className="eyebrow flex items-center gap-3 text-cocoa">
                <Sprig className="h-4 w-4" />
                {conferencias.eyebrow}
              </p>
            </Reveal>
            <Reveal delay={0.05}>
              <h1 className="display mt-7 max-w-3xl text-6xl text-espresso sm:text-7xl lg:text-8xl">
                Llevo la alta vibración <em>a tu escenario</em>.
              </h1>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-9 max-w-xl text-lg leading-relaxed text-slate">
                {conferencias.body}
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <div className="mt-10 flex flex-wrap gap-3">
                <a
                  href="#reserva"
                  className="mono rounded-full bg-espresso px-7 py-4 text-xs uppercase tracking-[0.14em] text-porcelain transition-colors hover:bg-cocoa"
                >
                  Reservar fecha
                </a>
                <a
                  href="#temas"
                  className="mono inline-flex items-center gap-2 rounded-full border border-espresso/20 px-7 py-4 text-xs uppercase tracking-[0.14em] text-espresso transition-colors hover:border-cocoa hover:text-cocoa"
                >
                  Ver temas →
                </a>
              </div>
            </Reveal>
          </div>

          <div className="relative">
            <Reveal>
              <Frame
                photo={conferencias.portrait}
                alt="Caro, conferencista"
                className="aspect-3/4 rounded-4xl"
                imgClassName="duotone"
                sizes="(max-width: 1024px) 90vw, 40vw"
                priority
              />
            </Reveal>
            <div className="absolute -bottom-6 -left-3 hidden w-40 overflow-hidden rounded-2xl border-4 border-porcelain md:block lg:-left-8 lg:w-48">
              <Frame
                photo={conferencias.detail}
                alt="Caro en el estudio"
                className="aspect-4/5"
                sizes="192px"
              />
            </div>
          </div>
        </div>
      </section>

      <Marquee items={conferencias.audiences} />

      {/* Temas */}
      <section id="temas" className="scroll-mt-24 px-5 py-24 lg:px-8 lg:py-32">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <p className="eyebrow text-cocoa">Temas</p>
          </Reveal>
          <h2 className="display mt-6 max-w-2xl text-5xl text-espresso lg:text-7xl">
            <TextReveal text="Cuatro charlas, una misma frecuencia." />
          </h2>

          <RevealGroup className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4" stagger={0.08}>
            {conferencias.talks.map((talk) => (
              <RevealItem key={talk.no}>
                <article className="group flex h-full flex-col overflow-hidden rounded-4xl border border-line bg-porcelain">
                  <div className="veil relative">
                    <Frame
                      photo={talk.photo}
                      alt={talk.title}
                      className="aspect-4/5"
                      imgClassName="object-top transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                    <span className="mono absolute left-5 top-5 z-10 rounded-full bg-porcelain/90 px-3 py-1 text-[0.65rem] uppercase tracking-[0.12em] text-espresso backdrop-blur">
                      {talk.kind}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <span className="mono text-xs uppercase tracking-[0.16em] text-gold-ink">
                      {talk.no}
                    </span>
                    <h3 className="display mt-3 text-2xl leading-tight text-espresso lg:text-3xl">
                      {talk.title}
                    </h3>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-slate">{talk.text}</p>
                  </div>
                </article>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* Formatos */}
      <section className="px-5 pb-24 lg:px-8 lg:pb-32">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 rounded-4xl bg-linen/70 p-8 lg:grid-cols-[0.8fr_1.2fr] lg:p-14">
            <div>
              <Reveal>
                <p className="eyebrow text-cocoa">Formatos</p>
              </Reveal>
              <h2 className="display mt-5 text-4xl text-espresso lg:text-5xl">
                A la medida del evento.
              </h2>
              <Reveal delay={0.1}>
                <p className="mt-6 max-w-sm leading-relaxed text-slate">
                  Todas las charlas pueden incluir una práctica guiada de respiración
                  o movimiento para que el público se lo lleve en el cuerpo, no solo en
                  las notas.
                </p>
              </Reveal>
            </div>
            <RevealGroup className="flex flex-col">
              {conferencias.formats.map((format) => (
                <RevealItem key={format.name}>
                  <div className="flex flex-col gap-2 border-b border-line-strong py-5 first:border-t sm:flex-row sm:items-baseline sm:justify-between">
                    <p className="display text-2xl text-espresso lg:text-3xl">{format.name}</p>
                    <p className="mono text-[0.65rem] uppercase tracking-[0.14em] text-cocoa">
                      {format.detail}
                    </p>
                  </div>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </div>
      </section>

      {/* Reserva */}
      <section id="reserva" className="scroll-mt-24 px-5 pb-24 lg:px-8 lg:pb-32">
        <div className="mx-auto max-w-7xl">
          <div className="relative overflow-hidden rounded-4xl bg-espresso px-6 py-20 text-center text-porcelain lg:py-28">
            <Sprig className="absolute -right-10 -top-10 h-64 w-64 text-porcelain/5" />
            <Reveal>
              <p className="eyebrow text-sand">{conferencias.cta.eyebrow}</p>
            </Reveal>
            <h2 className="display mx-auto mt-7 max-w-3xl text-5xl leading-[0.98] lg:text-7xl">
              <TextReveal text={conferencias.cta.title} delay={0.05} />
            </h2>
            <Reveal delay={0.1}>
              <p className="mx-auto mt-7 max-w-md text-lg text-porcelain/80">
                {conferencias.cta.body}
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <a
                href={mailto("Conferencia · Solicitud de fecha")}
                className="mono mt-10 inline-block rounded-full bg-porcelain px-7 py-4 text-xs uppercase tracking-[0.14em] text-espresso transition-colors hover:bg-sand"
              >
                Escribir a {brand.email}
              </a>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
