import Image from "next/image";
import Link from "next/link";
import { images, brand } from "@/lib/content";
import { Reveal, TextReveal } from "@/components/Reveal";

export function FinalCta() {
  return (
    <section className="px-5 py-16 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="relative overflow-hidden rounded-3xl bg-ink">
          <div className="relative aspect-4/5 w-full sm:aspect-video lg:aspect-16/9">
            <Image
              src={images.cta}
              alt="Práctica de Pilates con Caro"
              fill
              sizes="(max-width: 1024px) 95vw, 1400px"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-linear-to-t from-ink via-ink/55 to-ink/20" />
          </div>

          <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center text-cream">
            <Reveal>
              <p className="eyebrow text-amber">Tu práctica empieza hoy</p>
            </Reveal>
            <h2 className="display mt-6 max-w-3xl text-6xl leading-[0.88] lg:text-8xl">
              <TextReveal text="Empieza con una semana gratis." delay={0.05} />
            </h2>
            <Reveal delay={0.1}>
              <p className="mt-6 max-w-md text-lg text-cream/80">
                Únete a miles de personas que ya se mueven con más fuerza, calma
                e intención. Da el primer paso con Caro.
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <div className="mt-9 flex flex-wrap justify-center gap-3">
                <Link
                  href="/cursos"
                  className="mono rounded-full bg-cream px-6 py-4 text-xs uppercase tracking-wide text-ink transition-colors hover:bg-amber"
                >
                  Explorar cursos
                </Link>
                <a
                  href={brand.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mono inline-flex items-center gap-2 rounded-full border border-cream/40 px-6 py-4 text-xs uppercase tracking-wide text-cream transition-colors hover:border-cream"
                >
                  @{brand.handle} ↗
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
