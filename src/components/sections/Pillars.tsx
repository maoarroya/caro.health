import { Frame } from "@/components/Frame";
import { defaultLanding, type LandingData } from "@/lib/landing";
import { Reveal, TextReveal } from "@/components/Reveal";

/**
 * The five pillars, stacked. Each card sticks a little lower than the last, so
 * scrolling piles the method together instead of scrolling past it.
 */
export function Pillars({
  data: chMethod = defaultLanding.pillars,
}: {
  data?: LandingData["pillars"];
}) {
  return (
    <section id="pilares" className="px-5 py-24 lg:px-8 lg:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <Reveal>
              <p className="eyebrow text-cocoa">{chMethod.eyebrow}</p>
            </Reveal>
            <h2 className="display mt-6 text-5xl text-espresso lg:text-6xl">
              <TextReveal text={chMethod.title} />
            </h2>
            <Reveal delay={0.1}>
              <p className="mt-7 max-w-md text-lg leading-relaxed text-slate">
                {chMethod.body}
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <p className="mono mt-9 text-xs uppercase tracking-[0.14em] text-slate/50">
                {chMethod.note}
              </p>
            </Reveal>
          </div>

          <div className="flex flex-col gap-6 lg:gap-10">
            {chMethod.items.map((pillar, i) => (
              <article
                key={i}
                className="sticky overflow-hidden rounded-4xl border border-line bg-porcelain shadow-[0_24px_70px_-40px_rgba(42,32,51,0.5)]"
                style={{ top: `${6 + i * 1.4}rem` }}
              >
                <div className="veil relative">
                  <Frame
                    photo={pillar.photo}
                    alt={pillar.title}
                    className="aspect-16/10"
                    imgClassName={pillar.focus ?? ""}
                    sizes="(max-width: 1024px) 92vw, 55vw"
                  />
                </div>
                <div className="flex gap-5 p-6 lg:p-8">
                  <span className="mono pt-2 text-xs uppercase tracking-[0.16em] text-gold-ink">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="display text-3xl text-espresso lg:text-4xl">
                      {pillar.title}
                      {pillar.claim && <span className="accent"> — {pillar.claim}</span>}
                    </h3>
                    <p className="mt-3 leading-relaxed text-slate">
                      {pillar.text}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
