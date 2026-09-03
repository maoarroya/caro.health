import type { Metadata } from "next";
import { retiros, brand } from "@/lib/content";
import { Frame } from "@/components/Frame";
import { PageHero } from "@/components/PageHero";
import { Reveal, RevealGroup, RevealItem, TextReveal } from "@/components/Reveal";
import { Gallery } from "@/components/sections/Gallery";
import { FinalCta } from "@/components/sections/FinalCta";

export const metadata: Metadata = {
  title: "Retiros wellness y experiencias",
  description:
    "Retiros wellness VIP, experiencias de un día, masterclasses internacionales y jornadas corporativas de lujo alrededor del mundo.",
};

export default function RetirosPage() {
  const { day } = retiros;
  return (
    <>
      <PageHero
        eyebrow={retiros.eyebrow}
        title={
          <>
            Sube de frecuencia, <em>en persona</em>.
          </>
        }
        body={retiros.body}
      />

      <section className="px-5 lg:px-8">
        <RevealGroup
          className="mx-auto grid max-w-7xl gap-6 md:grid-cols-2 lg:grid-cols-4"
          stagger={0.1}
        >
          {retiros.retreats.map((retreat) => (
            <RevealItem key={retreat.name}>
              <article className="group flex h-full flex-col overflow-hidden rounded-4xl border border-line bg-porcelain">
                <div className="veil relative">
                  <Frame
                    photo={retreat.photo}
                    alt={retreat.name}
                    className="aspect-4/5"
                    imgClassName="transition-transform duration-[1000ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
                    sizes="(max-width: 768px) 90vw, (max-width: 1024px) 45vw, 25vw"
                  />
                  <span className="mono absolute left-5 top-5 z-10 rounded-full bg-porcelain/90 px-3 py-1 text-[0.65rem] uppercase tracking-[0.12em] text-espresso backdrop-blur">
                    {retreat.spots}
                  </span>
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <p className="mono text-[0.65rem] uppercase tracking-[0.14em] text-cocoa">
                    {retreat.place} · {retreat.date}
                  </p>
                  <h2 className="display mt-3 text-3xl text-espresso">{retreat.name}</h2>
                  <p className="mt-4 flex-1 text-sm leading-relaxed text-slate">{retreat.text}</p>
                  <a
                    href={`mailto:${brand.email}?subject=${encodeURIComponent(
                      `Reserva · ${retreat.name}`,
                    )}`}
                    className="mono mt-7 rounded-full border border-espresso/20 px-6 py-3.5 text-center text-xs uppercase tracking-[0.14em] text-espresso transition-colors hover:border-cocoa hover:bg-cocoa hover:text-porcelain"
                  >
                    Reservar cupo
                  </a>
                </div>
              </article>
            </RevealItem>
          ))}
        </RevealGroup>
      </section>

      {/* Un día en el retiro */}
      <section className="px-5 py-24 lg:px-8 lg:py-32">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <Reveal>
              <p className="eyebrow text-cocoa">{day.eyebrow}</p>
            </Reveal>
            <h2 className="display mt-6 text-5xl text-espresso lg:text-6xl">
              <TextReveal text={day.title} />
            </h2>
            <Reveal delay={0.1}>
              <div className="veil relative mt-8 overflow-hidden rounded-4xl">
                <Frame
                  photo={day.photo}
                  alt="Práctica al amanecer"
                  className="aspect-4/3"
                  sizes="(max-width: 1024px) 90vw, 40vw"
                />
              </div>
            </Reveal>
          </div>

          <RevealGroup className="flex flex-col">
            {day.items.map((item) => (
              <RevealItem key={item.time}>
                <div className="grid gap-3 border-t border-line py-7 sm:grid-cols-[5rem_1fr] sm:gap-8">
                  <span className="mono text-xs uppercase tracking-[0.16em] text-gold-ink">
                    {item.time}
                  </span>
                  <div>
                    <h3 className="display text-3xl text-espresso lg:text-4xl">{item.title}</h3>
                    <p className="mt-3 max-w-md leading-relaxed text-slate">{item.text}</p>
                  </div>
                </div>
              </RevealItem>
            ))}
            <div className="border-t border-line" />
          </RevealGroup>
        </div>
      </section>

      <div id="archivo" className="scroll-mt-24">
        <Gallery />
      </div>
      <FinalCta />
    </>
  );
}
