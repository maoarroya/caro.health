import { defaultLanding, type LandingData } from "@/lib/landing";
import { Frame } from "@/components/Frame";
import { Parallax, Reveal, TextReveal } from "@/components/Reveal";

export function Manifesto({
  data: manifesto = defaultLanding.manifesto,
}: {
  data?: LandingData["manifesto"];
}) {
  return (
    <section className="px-5 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="relative overflow-hidden rounded-4xl bg-espresso">
          {/* The frame drifts slower than the page — the type floats over it. */}
          <div className="veil relative aspect-4/5 w-full overflow-hidden sm:aspect-video">
            <Parallax amount={70} className="absolute -inset-y-24 inset-x-0">
              <Frame
                photo={manifesto.photo}
                alt="Práctica consciente"
                className="h-full w-full"
                sizes="(max-width: 1024px) 95vw, 1400px"
              />
            </Parallax>
            <div className="absolute inset-0 bg-linear-to-r from-espresso/92 via-espresso/55 to-transparent" />
          </div>

          <div className="absolute inset-0 flex flex-col justify-center p-8 text-porcelain lg:p-16">
            <Reveal>
              <p className="eyebrow text-sand">{manifesto.eyebrow}</p>
            </Reveal>
            <h2 className="display mt-7 text-6xl leading-[0.95] text-porcelain lg:text-8xl">
              {manifesto.lines.map((line, i) => (
                <span key={i} className="block">
                  <TextReveal text={line} delay={0.05 + i * 0.12} />
                </span>
              ))}
            </h2>
            <Reveal delay={0.1}>
              <p className="mt-8 max-w-md text-lg leading-relaxed text-porcelain/80">
                {manifesto.body}
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
