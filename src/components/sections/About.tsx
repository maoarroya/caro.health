import { Frame } from "@/components/Frame";
import { Sprig } from "@/components/Sprig";
import { images, home } from "@/lib/content";
import { Reveal, TextReveal } from "@/components/Reveal";

/** Founder authority: the clinical credential is the product here. */
export function About() {
  const { authority } = home;
  return (
    <section id="sobre-mi" className="bg-linen/50 px-5 py-24 lg:px-8 lg:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <div className="relative order-2 lg:order-1">
            <Reveal>
              <Frame
                photo={images.founder.portrait}
                alt="Caro, nutricionista y creadora del CH Method"
                className="aspect-4/5 rounded-4xl"
                imgClassName="duotone"
                sizes="(max-width: 1024px) 90vw, 45vw"
              />
            </Reveal>
            <div className="absolute -bottom-6 -right-3 hidden w-48 overflow-hidden rounded-2xl border-4 border-porcelain md:block lg:-right-8 lg:w-56">
              <Frame
                photo={images.founder.detail}
                className="aspect-4/3"
                imgClassName="duotone"
                sizes="224px"
              />
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <Reveal>
              <p className="eyebrow flex items-center gap-3 text-cocoa">
                <Sprig className="h-4 w-4" />
                {authority.eyebrow}
              </p>
            </Reveal>
            <h2 className="display mt-6 text-5xl text-espresso lg:text-7xl">
              <TextReveal text={authority.title} />
            </h2>
            <Reveal delay={0.1}>
              <div className="mt-8 space-y-5 text-lg leading-relaxed text-slate">
                {authority.body.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </Reveal>
            <Reveal delay={0.15}>
              <ul className="mt-10 grid gap-3 border-t border-line pt-8 sm:grid-cols-2">
                {authority.credentials.map((credential) => (
                  <li
                    key={credential}
                    className="mono flex items-start gap-3 text-xs uppercase tracking-[0.12em] text-slate"
                  >
                    <Sprig className="mt-px h-3.5 w-3.5 shrink-0 text-cocoa" />
                    {credential}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
