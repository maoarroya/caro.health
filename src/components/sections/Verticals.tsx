import Link from "next/link";
import { home } from "@/lib/content";
import { Frame } from "@/components/Frame";
import { Reveal, RevealGroup, RevealItem, TextReveal } from "@/components/Reveal";

/** The five business verticals as one editorial index. */
export function Verticals() {
  const { verticals } = home;
  return (
    <section className="px-5 py-24 lg:px-8 lg:py-32">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <p className="eyebrow text-cocoa">{verticals.eyebrow}</p>
        </Reveal>
        <h2 className="display mt-6 max-w-2xl text-5xl text-espresso lg:text-7xl">
          <TextReveal text={verticals.title} />
        </h2>

        <RevealGroup className="mt-16 flex flex-col" stagger={0.08}>
          {verticals.items.map((item) => (
            <RevealItem key={item.href}>
              <Link
                href={item.href}
                className="group grid items-center gap-6 border-t border-line py-7 transition-colors hover:border-sand md:grid-cols-[4rem_1fr_1.1fr_3rem] md:gap-10"
              >
                <span className="mono text-xs uppercase tracking-[0.16em] text-gold-ink">
                  {item.no}
                </span>

                <h3 className="display text-4xl text-espresso transition-colors group-hover:text-cocoa lg:text-5xl">
                  {item.title}
                </h3>

                <div className="flex items-center gap-6">
                  <Frame
                    photo={item.photo}
                    className="hidden h-24 w-20 shrink-0 rounded-xl md:block"
                    imgClassName="transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
                    sizes="80px"
                  />
                  <p className="max-w-md leading-relaxed text-slate">
                    {item.text}
                  </p>
                </div>

                <span
                  aria-hidden
                  className="justify-self-start text-2xl text-cocoa transition-transform duration-500 group-hover:translate-x-2 md:justify-self-end"
                >
                  →
                </span>
              </Link>
            </RevealItem>
          ))}
        </RevealGroup>
        <div className="border-t border-line" />
      </div>
    </section>
  );
}
