import Image from "next/image";
import { method, images } from "@/lib/content";
import { Reveal, RevealGroup, RevealItem, TextReveal } from "@/components/Reveal";

export function Method() {
  return (
    <section id="metodo" className="px-5 py-24 lg:px-8 lg:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
          {/* Left: tall image + heading */}
          <div>
            <Reveal>
              <p className="eyebrow text-oxblood">{method.eyebrow}</p>
            </Reveal>
            <h2 className="display mt-5 text-5xl text-ink lg:text-6xl">
              <TextReveal text={method.title} />
            </h2>
            <Reveal delay={0.1}>
              <p className="mt-6 max-w-md text-lg leading-relaxed text-ink/70">
                {method.body}
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <div className="relative mt-9 aspect-4/5 overflow-hidden rounded-2xl bg-peri">
                <Image
                  src={images.method}
                  alt="Detalle de una sesión de Pilates"
                  fill
                  sizes="(max-width: 1024px) 90vw, 45vw"
                  className="object-cover"
                />
              </div>
            </Reveal>
          </div>

          {/* Right: pillars */}
          <RevealGroup className="flex flex-col lg:pt-2">
            {method.pillars.map((p) => (
              <RevealItem key={p.no}>
                <div className="flex gap-6 border-b border-line py-8 first:border-t">
                  <span className="mono text-lg text-oxblood">{p.no}</span>
                  <div>
                    <h3 className="display text-3xl text-ink">{p.title}</h3>
                    <p className="mt-2 leading-relaxed text-ink/70">{p.text}</p>
                  </div>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </div>
    </section>
  );
}
