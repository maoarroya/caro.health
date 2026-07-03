import Image from "next/image";
import { images, brand } from "@/lib/content";
import { Reveal, Counter } from "@/components/Reveal";

const aboutStats = [
  { to: 12, suffix: "", format: false, label: "años" },
  { to: 8000, suffix: "+", format: true, label: "alumnas" },
  { to: 40, suffix: "", format: false, label: "países" },
];

export function About() {
  return (
    <section id="sobre-mi" className="px-5 py-20 lg:px-8 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Images */}
          <div className="relative order-2 lg:order-1">
            <Reveal>
              <div className="relative aspect-4/5 overflow-hidden rounded-2xl bg-peri">
                <Image
                  src={images.aboutPortrait}
                  alt="Caro guiando una sesión de Pilates"
                  fill
                  sizes="(max-width: 1024px) 90vw, 45vw"
                  className="duotone object-cover"
                />
              </div>
            </Reveal>
            <div className="absolute -bottom-6 -right-3 hidden w-48 overflow-hidden rounded-xl border-4 border-cream bg-amber md:block lg:-right-8 lg:w-56">
              <div className="relative aspect-4/3">
                <Image
                  src={images.aboutDetail}
                  alt=""
                  fill
                  sizes="224px"
                  className="duotone object-cover"
                />
              </div>
            </div>
          </div>

          {/* Text */}
          <div className="order-1 lg:order-2">
            <Reveal>
              <p className="eyebrow text-oxblood">Hola, soy {brand.name}</p>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="display mt-5 text-5xl text-ink lg:text-7xl">
                Siéntete en casa en tu cuerpo.
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="mt-7 space-y-5 text-lg leading-relaxed text-ink/80">
                <p>
                  Soy instructora <em>master</em> de Pilates y llevo más de una
                  década ayudando a personas a habitar su cuerpo con más fuerza,
                  conciencia y calma. Me formé en el método clásico y lo he
                  refinado junto a miles de alumnas.
                </p>
                <p>
                  Creo en un movimiento amable pero exigente: sin prisa, sin
                  postureo, con la precisión como brújula. Que el Pilates deje de
                  ser una clase en tu agenda y se vuelva una forma de estar.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.15}>
              <div className="mt-8 grid grid-cols-3 gap-4 border-t border-line pt-8">
                {aboutStats.map((s) => (
                  <div key={s.label}>
                    <Counter
                      to={s.to}
                      suffix={s.suffix}
                      format={s.format}
                      className="display text-4xl text-oxblood"
                    />
                    <p className="mono mt-1 text-xs uppercase tracking-wide text-ink/70">
                      {s.label}
                    </p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
