import type { Metadata } from "next";
import Link from "next/link";
import { asesorias } from "@/lib/content";
import { Frame } from "@/components/Frame";
import { Sprig } from "@/components/Sprig";
import { Reveal } from "@/components/Reveal";
import { ApplicationForm } from "@/components/ApplicationForm";
import { Testimonials } from "@/components/sections/Testimonials";
import { Faq } from "@/components/sections/Faq";

export const metadata: Metadata = {
  title: "Asesorías",
  description:
    "Active Glow y Healthy Legacy: programas de tres meses de nutrición clínica de alta gama, individuales y familiares. Se trabaja por postulación.",
};

export default function AsesoriasPage() {
  return (
    <>
      <section className="px-5 pt-32 pb-12 lg:px-8 lg:pt-40">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <p className="eyebrow flex items-center gap-3 text-cocoa">
              <Sprig className="h-4 w-4" />
              {asesorias.eyebrow}
            </p>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="display mt-7 max-w-4xl text-6xl text-espresso sm:text-7xl lg:text-8xl">
              Acompañamiento clínico, <em>no un PDF</em> con un menú.
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-9 max-w-xl text-lg leading-relaxed text-slate">
              {asesorias.body}
            </p>
          </Reveal>
        </div>
      </section>

      <section className="px-5 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-16 lg:gap-24">
          {asesorias.programs.map((program, i) => {
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
                  </div>
                </Reveal>

                <Reveal delay={0.08} className={reversed ? "lg:order-1" : ""}>
                  <p className="mono text-xs uppercase tracking-[0.16em] text-cocoa">
                    {program.kind} · {program.duration}
                  </p>
                  <h2 className="display mt-4 text-5xl text-espresso lg:text-6xl">
                    {program.name}
                  </h2>
                  <p className="display mt-4 text-2xl text-cocoa lg:text-3xl">
                    {program.claim}
                  </p>
                  <p className="mt-6 text-lg leading-relaxed text-slate">
                    {program.summary}
                  </p>

                  <ul className="mt-8 space-y-3 border-t border-line pt-8">
                    {program.includes.map((item) => (
                      <li key={item} className="flex items-start gap-3 text-espresso">
                        <Sprig className="mt-1 h-4 w-4 shrink-0 text-cocoa" />
                        {item}
                      </li>
                    ))}
                  </ul>

                  <p className="mono mt-8 text-xs uppercase tracking-[0.12em] text-slate/60">
                    Para quién · {program.forWho}
                  </p>

                  <Link
                    href="#postulacion"
                    className="mono mt-8 inline-block rounded-full bg-espresso px-7 py-4 text-xs uppercase tracking-[0.14em] text-porcelain transition-colors hover:bg-cocoa"
                  >
                    Postularme a {program.name}
                  </Link>
                </Reveal>
              </article>
            );
          })}
        </div>
      </section>

      <ApplicationForm />
      <Testimonials />
      <Faq />
    </>
  );
}
