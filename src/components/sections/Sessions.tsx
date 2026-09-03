"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useSpring, useTransform } from "motion/react";
import { Frame } from "@/components/Frame";
import { Reveal, TextReveal } from "@/components/Reveal";
import { virtual, type Session } from "@/lib/content";

const EASE = [0.22, 1, 0.36, 1] as const;

const featured = virtual.sessions.filter((_, i) => i % 2 === 0).slice(0, 8);

function Card({ item, i }: { item: Session; i: number }) {
  return (
    <article className="group relative w-[68vw] shrink-0 sm:w-[42vw] lg:w-[26vw]">
      <div className="veil relative overflow-hidden rounded-4xl">
        <Frame
          photo={item.photo}
          alt={item.title}
          className="aspect-3/4"
          imgClassName="transition-transform duration-[1100ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
          sizes="(max-width: 640px) 68vw, (max-width: 1024px) 42vw, 26vw"
        />
      </div>
      <div className="pointer-events-none absolute inset-0 rounded-4xl bg-linear-to-t from-espresso/80 via-espresso/10 to-transparent" />
      <span className="mono absolute left-5 top-5 rounded-full bg-porcelain/90 px-3 py-1 text-[0.65rem] uppercase tracking-[0.12em] text-espresso">
        {String(i + 1).padStart(2, "0")}
      </span>
      <div className="absolute inset-x-5 bottom-5 text-porcelain">
        <p className="mono text-[0.65rem] uppercase tracking-[0.14em] text-porcelain/75">
          {item.discipline} · {item.minutes} min
        </p>
        <h3 className="display mt-2 text-2xl leading-none lg:text-3xl">
          {item.title}
        </h3>
      </div>
    </article>
  );
}

/** Scroll-pinned rail: the page scrolls, the classes move sideways. */
export function Sessions() {
  const outer = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [distance, setDistance] = useState(0);

  useEffect(() => {
    const measure = () => {
      const el = track.current;
      if (!el) return;
      setDistance(Math.max(0, el.scrollWidth - window.innerWidth + 32));
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const { scrollYProgress } = useScroll({
    target: outer,
    offset: ["start start", "end end"],
  });
  const x = useTransform(scrollYProgress, [0, 1], [0, -distance]);
  const smoothX = useSpring(x, { stiffness: 140, damping: 30, mass: 0.35 });
  const progress = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <>
      <section
        ref={outer}
        className="relative hidden md:block"
        style={{ height: `calc(100svh + ${distance}px)` }}
      >
        <div className="sticky top-0 flex h-svh flex-col justify-center overflow-hidden">
          <div className="mx-auto flex w-full max-w-7xl items-end justify-between px-8 pb-8">
            <div>
              <Reveal>
                <p className="eyebrow text-cocoa">Empieza por aquí</p>
              </Reveal>
              <h2 className="display mt-4 text-5xl text-espresso lg:text-6xl">
                <TextReveal text="Las clases que abren el método." />
              </h2>
            </div>
            <Reveal delay={0.1}>
              <p className="mono text-xs uppercase tracking-[0.14em] text-slate/50">
                Desplaza para recorrerlas →
              </p>
            </Reveal>
          </div>

          <motion.div
            ref={track}
            style={{ x: smoothX }}
            className="flex w-max gap-5 px-8"
          >
            {featured.map((item, i) => (
              <Card key={item.title} item={item} i={i} />
            ))}
          </motion.div>

          <div className="mx-auto mt-10 h-px w-full max-w-7xl bg-line px-8">
            <motion.div
              style={{ width: progress }}
              className="h-px origin-left bg-cocoa"
            />
          </div>
        </div>
      </section>

      {/* Mobile: same cards, native snap scrolling. */}
      <section className="py-20 md:hidden">
        <div className="px-5">
          <Reveal>
            <p className="eyebrow text-cocoa">Empieza por aquí</p>
          </Reveal>
          <h2 className="display mt-4 text-4xl text-espresso">
            <TextReveal text="Las clases que abren el método." />
          </h2>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: EASE }}
          className="no-bar mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-2"
        >
          {featured.map((item, i) => (
            <div key={item.title} className="snap-center">
              <Card item={item} i={i} />
            </div>
          ))}
        </motion.div>
      </section>
    </>
  );
}
