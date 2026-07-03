import Image from "next/image";
import { ways } from "@/lib/content";
import { accentBg } from "@/lib/accents";
import { Reveal, RevealGroup, RevealItem, TextReveal } from "@/components/Reveal";

export function Ways() {
  return (
    <section className="px-5 py-24 lg:px-8 lg:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <Reveal>
              <p className="eyebrow text-oxblood">{ways.eyebrow}</p>
            </Reveal>
            <h2 className="display mt-5 max-w-xl text-5xl text-ink lg:text-6xl">
              <TextReveal text={ways.title} />
            </h2>
          </div>
          <Reveal delay={0.1}>
            <p className="mono max-w-xs text-sm leading-relaxed text-ink/60">
              {ways.note}
            </p>
          </Reveal>
        </div>

        <RevealGroup className="mt-14 grid gap-6 md:grid-cols-3">
          {ways.items.map((w) => (
            <RevealItem key={w.title}>
              <div className="flex h-full flex-col">
                <div className="relative aspect-4/5 overflow-hidden rounded-2xl bg-taupe">
                  <Image
                    src={w.image}
                    alt={w.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover"
                  />
                  <span className="mono absolute left-4 top-4 rounded-full bg-cream/90 px-3 py-1 text-xs uppercase tracking-wide text-ink">
                    {w.k}
                  </span>
                </div>
                <div className="mt-5 flex items-center gap-2">
                  <span className={`h-2 w-2 rounded-full ${accentBg[w.accent]}`} />
                  <h3 className="display text-2xl text-ink">{w.title}</h3>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-ink/70">
                  {w.text}
                </p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
