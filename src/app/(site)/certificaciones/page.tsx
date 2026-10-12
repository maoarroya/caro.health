import type { Metadata } from "next";
import { certificaciones, chMethod, brand } from "@/lib/content";
import { Frame } from "@/components/Frame";
import { Sprig } from "@/components/Sprig";
import { PageHero } from "@/components/PageHero";
import { PhotoRail } from "@/components/PhotoRail";
import { Reveal, RevealGroup, RevealItem } from "@/components/Reveal";
import { Testimonials } from "@/components/sections/Testimonials";
import { Faq } from "@/components/sections/Faq";

export const metadata: Metadata = {
  title: "Certificaciones de Pilates",
  description:
    "Fórmate como instructora de Pilates con el CH Method: Mat, Reformer & Cadillac, Chair & Barrel y Master Trainer. Práctica supervisada y certificado por evaluación.",
};

const mailto = (subject: string) =>
  `mailto:${brand.email}?subject=${encodeURIComponent(subject)}`;

export default function CertificacionesPage() {
  const { qualities, repertoire } = chMethod;
  return (
    <>
      <PageHero
        eyebrow={certificaciones.eyebrow}
        title={
          <>
            Conviértete en <em>instructora</em> del CH Method.
          </>
        }
        body={certificaciones.body}
        className="pb-10"
      />

      {/* Práctica supervisada — rail of the Cadillac / Reformer frames */}
      <PhotoRail
        photos={certificaciones.gallery}
        duration={60}
        className="py-4"
        itemClassName="aspect-4/5 w-44 rounded-2xl sm:w-56"
        sizes="240px"
      />

      {/* Programas */}
      <section className="px-5 pt-16 lg:px-8 lg:pt-24">
        <div className="mx-auto flex max-w-7xl flex-col gap-16 lg:gap-24">
          {certificaciones.programs.map((program, i) => {
            const reversed = i % 2 === 1;
            return (
              <article
                key={program.slug}
                id={program.slug}
                className="grid scroll-mt-28 items-center gap-8 lg:grid-cols-2 lg:gap-16"
              >
                <Reveal className={reversed ? "lg:order-2" : ""}>
                  <div className="veil relative overflow-hidden rounded-4xl">
                    <Frame
                      photo={program.photo}
                      alt={program.name}
                      className="aspect-4/5"
                      sizes="(max-width: 1024px) 90vw, 45vw"
                    />
                    <span className="mono absolute left-5 top-5 z-10 rounded-full bg-porcelain/90 px-3 py-1 text-[0.65rem] uppercase tracking-[0.12em] text-espresso backdrop-blur">
                      {program.level}
                    </span>
                  </div>
                </Reveal>

                <Reveal delay={0.08} className={reversed ? "lg:order-1" : ""}>
                  <p className="mono text-xs uppercase tracking-[0.16em] text-cocoa">
                    {program.hours} · {program.format}
                  </p>
                  <h2 className="display mt-4 text-5xl text-espresso lg:text-6xl">
                    {program.name}
                  </h2>
                  <p className="display mt-4 text-2xl text-cocoa lg:text-3xl">
                    {program.claim}
                  </p>
                  <p className="mt-6 text-lg leading-relaxed text-slate">{program.summary}</p>

                  <ul className="mt-8 space-y-3 border-t border-line pt-8">
                    {program.includes.map((item) => (
                      <li key={item} className="flex items-start gap-3 text-espresso">
                        <Sprig className="mt-1 h-4 w-4 shrink-0 text-cocoa" />
                        {item}
                      </li>
                    ))}
                  </ul>

                  <p className="mono mt-8 text-xs uppercase tracking-[0.12em] text-gold-ink">
                    {program.next}
                  </p>

                  <a
                    href={mailto(`Certificación · ${program.name}`)}
                    className="mono mt-8 inline-block rounded-full bg-espresso px-7 py-4 text-xs uppercase tracking-[0.14em] text-porcelain transition-colors hover:bg-cocoa"
                  >
                    Postularme a {program.name}
                  </a>
                </Reveal>
              </article>
            );
          })}
        </div>
      </section>

      {/* Cómo funciona */}
      <section className="px-5 py-24 lg:px-8 lg:py-32">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <p className="eyebrow text-cocoa">{certificaciones.steps.eyebrow}</p>
          </Reveal>
          <h2 className="display mt-5 max-w-2xl text-4xl text-espresso lg:text-6xl">
            {certificaciones.steps.title}
          </h2>
          <RevealGroup className="mt-12 grid gap-px overflow-hidden rounded-4xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
            {certificaciones.steps.items.map((step) => (
              <RevealItem key={step.no}>
                <div className="h-full bg-porcelain p-7">
                  <span className="mono text-xs uppercase tracking-[0.16em] text-gold-ink">
                    {step.no}
                  </span>
                  <h3 className="display mt-5 text-3xl text-espresso">{step.title}</h3>
                  <p className="mt-3 leading-relaxed text-slate">{step.text}</p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* Cualidades fundamentales — textuales del Manual del Instructor */}
      <section className="px-5 pb-20 lg:px-8 lg:pb-24">
        <div className="mx-auto max-w-7xl">
          <div className="rounded-4xl bg-linen/70 p-8 lg:p-14">
            <div className="text-center">
              <Reveal>
                <p className="eyebrow text-cocoa">{qualities.eyebrow}</p>
              </Reveal>
              <h2 className="display mx-auto mt-5 max-w-2xl text-4xl text-espresso lg:text-6xl">
                {qualities.title}
              </h2>
              <div className="rule-gold mx-auto mt-7 max-w-xs" />
              <Reveal delay={0.1}>
                <p className="mx-auto mt-7 max-w-2xl leading-relaxed text-slate">
                  {qualities.intro}
                </p>
              </Reveal>
            </div>

            <RevealGroup className="mt-14 grid gap-x-12 gap-y-10 md:grid-cols-2">
              {qualities.items.map((item) => (
                <RevealItem key={item.no}>
                  <div className="flex gap-5 border-t border-gold/40 pt-6">
                    <span className="mono text-xs uppercase tracking-[0.16em] text-gold-ink">
                      {item.no}
                    </span>
                    <div>
                      <h3 className="display text-2xl text-espresso lg:text-3xl">
                        <em>{item.title}</em>
                      </h3>
                      <p className="mt-2 leading-relaxed text-slate">{item.text}</p>
                    </div>
                  </div>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </div>
      </section>

      {/* Repertorio Cadillac / Chair / Barrel */}
      <section className="px-5 py-8 lg:px-8 lg:py-12">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <Reveal>
                <p className="eyebrow text-cocoa">{repertoire.eyebrow}</p>
              </Reveal>
              <h2 className="display mt-5 text-4xl text-espresso lg:text-6xl">
                {repertoire.title}
              </h2>
            </div>
            <Reveal delay={0.1}>
              <p className="mono max-w-xs text-xs uppercase leading-relaxed tracking-[0.12em] text-slate/60">
                {repertoire.note}
              </p>
            </Reveal>
          </div>

          <RevealGroup className="mt-12 grid gap-px overflow-hidden rounded-4xl border border-line bg-line md:grid-cols-2 lg:grid-cols-3">
            {repertoire.groups.map((group) => (
              <RevealItem key={group.family}>
                <div className="h-full bg-porcelain p-7">
                  <p className="mono text-[0.65rem] uppercase tracking-[0.16em] text-gold-ink">
                    {group.family}
                  </p>
                  <ul className="mt-5 space-y-2">
                    {group.moves.map((move) => (
                      <li key={move} className="display text-xl text-espresso lg:text-2xl">
                        {move}
                      </li>
                    ))}
                  </ul>
                </div>
              </RevealItem>
            ))}
            <RevealItem>
              <div className="flex h-full flex-col justify-center bg-linen p-7">
                <p className="display text-2xl text-cocoa lg:text-3xl">
                  <em>{brand.claim}</em>
                </p>
              </div>
            </RevealItem>
          </RevealGroup>
        </div>
      </section>

      {/* Postulación */}
      <section id="postulacion" className="scroll-mt-24 px-5 py-24 lg:px-8 lg:py-32">
        <div className="mx-auto max-w-4xl rounded-4xl border border-line bg-linen/60 p-8 text-center lg:p-14">
          <Reveal>
            <p className="eyebrow text-cocoa">{certificaciones.form.eyebrow}</p>
          </Reveal>
          <h2 className="display mt-6 text-4xl text-espresso lg:text-6xl">
            {certificaciones.form.title}
          </h2>
          <p className="mx-auto mt-5 max-w-xl leading-relaxed text-slate">
            {certificaciones.form.body}
          </p>
          <a
            href={mailto("Postulación · Certificación de Pilates")}
            className="mono mt-10 inline-block rounded-full bg-espresso px-7 py-4 text-xs uppercase tracking-[0.14em] text-porcelain transition-colors hover:bg-cocoa"
          >
            Escribir a {brand.email}
          </a>
        </div>
      </section>

      <Testimonials />
      <Faq />
    </>
  );
}
