import type { ReactNode } from "react";
import { Sprig } from "@/components/Sprig";
import { Reveal } from "@/components/Reveal";

type PageHeroProps = {
  eyebrow: string;
  /** Pass JSX to italicise a word with <em>. */
  title: ReactNode;
  body?: string;
  children?: ReactNode;
  className?: string;
};

/** The opening block every section shares: sprig kicker, display title, lede. */
export function PageHero({
  eyebrow,
  title,
  body,
  children,
  className = "pb-12",
}: PageHeroProps) {
  return (
    <section className={`px-5 pt-32 lg:px-8 lg:pt-40 ${className}`}>
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <p className="eyebrow flex items-center gap-3 text-cocoa">
            <Sprig className="h-4 w-4" />
            {eyebrow}
          </p>
        </Reveal>
        <Reveal delay={0.05}>
          <h1 className="display mt-7 max-w-4xl text-6xl text-espresso sm:text-7xl lg:text-8xl">
            {title}
          </h1>
        </Reveal>
        {body && (
          <Reveal delay={0.1}>
            <p className="mt-9 max-w-xl text-lg leading-relaxed text-slate">
              {body}
            </p>
          </Reveal>
        )}
        {children}
      </div>
    </section>
  );
}
