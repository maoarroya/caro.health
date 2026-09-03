import Link from "next/link";
import { images, home, brand } from "@/lib/content";
import { Frame } from "@/components/Frame";
import { Sprig } from "@/components/Sprig";
import { Reveal, TextReveal } from "@/components/Reveal";

export function Hero() {
  return (
    <section className="relative h-[94svh] min-h-136 w-full overflow-hidden">
      <Frame
        photo={images.hero.tall}
        alt="Caro en el estudio"
        className="absolute inset-0 h-full w-full lg:hidden"
        imgClassName="animate-kenburns"
        sizes="100vw"
      />
      <Frame
        photo={images.hero.wide}
        alt="Caro en el estudio"
        className="absolute inset-0 hidden h-full w-full lg:block"
        imgClassName="animate-kenburns"
        sizes="100vw"
      />

      {/* Warm veil + reading scrim: phones read from the bottom, desktop
          from the left. Both stop short so the frame keeps its air. */}
      <div className="absolute inset-0 bg-linear-to-br from-mocha/25 via-transparent to-mocha/10 mix-blend-multiply" />
      <div className="absolute inset-0 bg-linear-to-t from-porcelain from-20% via-porcelain/70 via-52% to-transparent to-82% lg:hidden" />
      <div className="absolute inset-0 hidden bg-linear-to-r from-porcelain from-8% via-porcelain/60 via-48% to-transparent to-88% lg:block" />

      {/* pt clears the fixed header at every size — the block never rides under it. */}
      <div className="relative flex h-full items-end px-6 pb-14 pt-24 lg:items-center lg:px-16 lg:pb-0 lg:pt-20">
        <div className="max-w-2xl">
          <Reveal>
            <p className="eyebrow flex items-start gap-3 text-cocoa">
              <Sprig className="mt-px h-4 w-4 shrink-0" />
              {home.hero.eyebrow}
            </p>
          </Reveal>

          <h1 className="display mt-6 max-w-[14ch] text-[2.9rem] leading-[1.02] text-espresso sm:text-6xl lg:mt-7 lg:text-[5.4rem]">
            <TextReveal text={home.hero.title} delay={0.05} />
          </h1>

          <Reveal delay={0.14}>
            <p className="mt-7 max-w-md text-base leading-relaxed text-slate lg:text-lg">
              {home.hero.body}
            </p>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="mt-8 flex flex-wrap gap-3 lg:mt-10">
              <Link
                href={home.hero.primary.href}
                className="mono rounded-full bg-espresso px-7 py-4 text-xs uppercase tracking-[0.14em] text-porcelain transition-colors hover:bg-cocoa"
              >
                {home.hero.primary.label}
              </Link>
              <Link
                href={home.hero.secondary.href}
                className="mono inline-flex items-center gap-2 rounded-full border border-espresso/20 px-7 py-4 text-xs uppercase tracking-[0.14em] text-espresso transition-colors hover:border-cocoa hover:text-cocoa"
              >
                {home.hero.secondary.label} →
              </Link>
            </div>
          </Reveal>

          <Reveal delay={0.26}>
            <p className="mono mt-8 hidden text-[0.68rem] uppercase tracking-[0.16em] text-slate/60 sm:block lg:mt-10">
              {brand.role}
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
