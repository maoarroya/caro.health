import Image from "next/image";
import { testimonials, images } from "@/lib/content";
import { Reveal, RevealGroup, RevealItem, TextReveal } from "@/components/Reveal";

export function Testimonials() {
  const [featured, ...rest] = testimonials;
  return (
    <section id="historias" className="px-5 py-24 lg:px-8 lg:py-32">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <p className="eyebrow text-oxblood">Lo que dicen las alumnas</p>
        </Reveal>
        <h2 className="display mt-5 max-w-3xl text-5xl text-ink lg:text-7xl">
          <TextReveal text="Muévete con Caro y miles de personas en todo el mundo." />
        </h2>

        <div className="mt-14 grid gap-6 lg:grid-cols-[1.15fr_1fr]">
          {/* Featured quote over image */}
          <Reveal>
            <figure className="relative flex min-h-[26rem] flex-col justify-end overflow-hidden rounded-3xl bg-ink p-8 text-cream lg:p-12">
              <Image
                src={images.testimonials[0]}
                alt=""
                fill
                sizes="(max-width: 1024px) 90vw, 55vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-linear-to-t from-ink via-ink/50 to-ink/10" />
              <blockquote className="relative">
                <p className="text-amber">★★★★★</p>
                <p className="display mt-4 text-3xl leading-[1.05] lg:text-4xl">
                  “{featured.quote}”
                </p>
                <figcaption className="mono mt-6 text-xs uppercase tracking-wide text-cream/70">
                  {featured.name}
                </figcaption>
              </blockquote>
            </figure>
          </Reveal>

          {/* Right: quote cards with thumbnails */}
          <RevealGroup className="flex flex-col gap-6">
            {rest.slice(0, 3).map((t, i) => (
              <RevealItem key={t.name}>
                <figure className="flex gap-5 rounded-2xl border border-line bg-cream p-5">
                  <div className="relative h-24 w-20 shrink-0 overflow-hidden rounded-xl bg-taupe">
                    <Image
                      src={images.testimonials[(i % 2) + 1]}
                      alt=""
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                  </div>
                  <div className="flex flex-col justify-between">
                    <blockquote className="text-[15px] leading-relaxed text-ink">
                      “{t.quote}”
                    </blockquote>
                    <figcaption className="mono mt-3 text-xs uppercase tracking-wide text-ink/60">
                      {t.name}
                    </figcaption>
                  </div>
                </figure>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </div>
    </section>
  );
}
