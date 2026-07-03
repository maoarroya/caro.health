import Image from "next/image";
import { manifesto, images } from "@/lib/content";
import { Reveal, TextReveal } from "@/components/Reveal";

export function Manifesto() {
  return (
    <section className="px-5 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="relative overflow-hidden rounded-3xl bg-ink">
          <div className="relative aspect-4/5 w-full sm:aspect-video lg:aspect-16/9">
            <Image
              src={images.manifesto}
              alt="Práctica de Pilates en calma"
              fill
              sizes="(max-width: 1024px) 95vw, 1400px"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-linear-to-r from-oxblood/90 via-oxblood/50 to-transparent" />
          </div>

          <div className="absolute inset-0 flex flex-col justify-center p-8 text-cream lg:p-16">
            <Reveal>
              <p className="eyebrow text-amber">{manifesto.eyebrow}</p>
            </Reveal>
            <h2 className="display mt-6 text-6xl leading-[0.86] text-cream lg:text-8xl">
              {manifesto.lines.map((l, i) => (
                <span key={i} className="block">
                  <TextReveal text={l} delay={0.05 + i * 0.12} />
                </span>
              ))}
            </h2>
            <Reveal delay={0.1}>
              <p className="mt-8 max-w-md text-lg leading-relaxed text-cream/85">
                {manifesto.body}
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
