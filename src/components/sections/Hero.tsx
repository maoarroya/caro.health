import Image from "next/image";
import Link from "next/link";
import { images, brand } from "@/lib/content";
import { Reveal, TextReveal } from "@/components/Reveal";

export function Hero() {
  return (
    <section className="px-3 pt-20 lg:px-4 lg:pt-24">
      <div className="mx-auto max-w-[1600px]">
        {/* Big image-forward hero */}
        <div className="relative overflow-hidden rounded-3xl bg-taupe">
          <div className="relative aspect-3/4 w-full sm:aspect-video lg:aspect-16/8">
            <Image
              src={images.heroMain}
              alt="Caro practicando Pilates"
              fill
              priority
              sizes="100vw"
              className="animate-kenburns object-cover object-center"
            />
            <div className="absolute inset-0 bg-linear-to-r from-cream/85 via-cream/25 to-transparent" />
            <div className="absolute inset-0 bg-linear-to-t from-ink/25 via-transparent to-transparent" />
          </div>

          {/* Overlaid copy */}
          <div className="absolute inset-0 flex flex-col justify-between p-6 lg:p-12">
            <div>
              <Reveal>
                <p className="eyebrow flex items-center gap-3 text-oxblood">
                  <span className="h-2 w-2 rounded-full bg-oxblood" />
                  {brand.role} · @{brand.handle}
                </p>
              </Reveal>
              <h1 className="display mt-5 max-w-[13ch] text-[2.6rem] leading-[0.9] text-ink sm:text-7xl sm:leading-[0.86] lg:text-8xl">
                <TextReveal text="Tu estudio de Pilates, donde estés." delay={0.1} />
              </h1>
            </div>

            <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
              <Reveal delay={0.1}>
                <p className="max-w-sm text-base leading-relaxed text-ink/85 sm:text-lg">
                  Muévete con Caro y miles de personas en todo el mundo. Sin
                  prisa, sin postureo.
                </p>
              </Reveal>
              <Reveal delay={0.15}>
                <div className="flex flex-wrap gap-3">
                  <Link
                    href="/cursos"
                    className="mono rounded-full bg-ink px-6 py-4 text-xs uppercase tracking-wide text-cream transition-colors hover:bg-oxblood"
                  >
                    Empieza la semana gratis
                  </Link>
                  <Link
                    href="/#metodo"
                    className="mono inline-flex items-center gap-2 rounded-full bg-cream/90 px-6 py-4 text-xs uppercase tracking-wide text-ink backdrop-blur transition-colors hover:bg-cream"
                  >
                    El método →
                  </Link>
                </div>
              </Reveal>
            </div>
          </div>
        </div>

        {/* Decorative image strip — every frame a photo */}
        <div className="mt-3 grid grid-cols-2 gap-3 lg:grid-cols-4">
          {images.strip.map((src, i) => (
            <Reveal key={i} delay={0.05 * i}>
              <div className="relative aspect-square overflow-hidden rounded-2xl bg-taupe lg:aspect-4/5">
                <Image
                  src={src}
                  alt=""
                  fill
                  sizes="(max-width: 1024px) 50vw, 25vw"
                  className="object-cover"
                />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
