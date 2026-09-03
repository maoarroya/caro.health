import Link from "next/link";
import { Frame } from "@/components/Frame";
import { images, brand } from "@/lib/content";
import { Reveal, TextReveal } from "@/components/Reveal";

export function FinalCta() {
  return (
    <section className="px-5 py-16 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="relative overflow-hidden rounded-4xl bg-espresso">
          <div className="veil relative aspect-4/5 w-full sm:aspect-video">
            <Frame
              photo={images.cta}
              alt="Práctica con Caro"
              className="h-full w-full"
              imgClassName="animate-kenburns"
              sizes="(max-width: 1024px) 95vw, 1400px"
            />
            <div className="absolute inset-0 bg-linear-to-t from-espresso via-espresso/60 to-espresso/25" />
          </div>

          <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center text-porcelain">
            <Reveal>
              <p className="eyebrow text-sand">Empieza hoy</p>
            </Reveal>
            <h2 className="display mt-7 max-w-3xl text-5xl leading-[0.98] lg:text-8xl">
              <TextReveal text={brand.tagline} delay={0.05} />
            </h2>
            <Reveal delay={0.1}>
              <p className="mt-7 max-w-md text-lg text-porcelain/80">
                Practica hoy mismo desde casa, o postúlate a una asesoría
                si quieres el protocolo completo.
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <div className="mt-10 flex flex-wrap justify-center gap-3">
                <Link
                  href="/virtual"
                  className="mono rounded-full bg-porcelain px-7 py-4 text-xs uppercase tracking-[0.14em] text-espresso transition-colors hover:bg-sand"
                >
                  Practicar en casa
                </Link>
                <Link
                  href="/asesorias#postulacion"
                  className="mono inline-flex items-center gap-2 rounded-full border border-porcelain/40 px-7 py-4 text-xs uppercase tracking-[0.14em] text-porcelain transition-colors hover:border-porcelain"
                >
                  Postular a una asesoría
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
