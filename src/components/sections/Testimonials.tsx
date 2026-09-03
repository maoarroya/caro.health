"use client";

import { useEffect, useRef, useState } from "react";
import { animate, motion, useMotionValue } from "motion/react";
import { Frame } from "@/components/Frame";
import { Reveal, TextReveal } from "@/components/Reveal";
import { testimonials } from "@/lib/content";

const EASE = [0.22, 1, 0.36, 1] as const;

export function Testimonials() {
  const viewport = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [limit, setLimit] = useState(0);
  const x = useMotionValue(0);

  useEffect(() => {
    const measure = () => {
      if (!viewport.current || !track.current) return;
      setLimit(
        Math.max(
          0,
          track.current.scrollWidth - viewport.current.offsetWidth + 20,
        ),
      );
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  // The arrows drive the same motion value the drag gesture writes to, so the
  // two input methods can never disagree about where the rail is.
  const nudge = (dir: number) => {
    const next = Math.min(0, Math.max(-limit, x.get() - dir * 420));
    animate(x, next, { duration: 0.7, ease: EASE });
  };

  return (
    <section id="historias" className="py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <Reveal>
              <p className="eyebrow text-cocoa">Transformaciones</p>
            </Reveal>
            <h2 className="display mt-6 max-w-3xl text-5xl text-espresso lg:text-7xl">
              <TextReveal text="Lo que pasa cuando el plato y la práctica van juntos." />
            </h2>
          </div>

          <Reveal delay={0.1}>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => nudge(-1)}
                aria-label="Anterior"
                className="mono h-12 w-12 rounded-full border border-line-strong text-espresso transition-colors hover:border-cocoa hover:bg-cocoa hover:text-porcelain"
              >
                ←
              </button>
              <button
                type="button"
                onClick={() => nudge(1)}
                aria-label="Siguiente"
                className="mono h-12 w-12 rounded-full border border-line-strong text-espresso transition-colors hover:border-cocoa hover:bg-cocoa hover:text-porcelain"
              >
                →
              </button>
            </div>
          </Reveal>
        </div>
      </div>

      {/* Drag or throw it — constraints are measured, so it never runs dry. */}
      <div
        ref={viewport}
        className="mt-14 overflow-hidden pl-5 lg:pl-[max(2rem,calc((100vw-80rem)/2+2rem))]"
      >
        <motion.div
          ref={track}
          style={{ x }}
          drag="x"
          dragConstraints={{ left: -limit, right: 0 }}
          dragElastic={0.08}
          dragTransition={{ power: 0.25, timeConstant: 320 }}
          className="grab flex w-max gap-5 pr-5"
        >
          {testimonials.map((t, i) => (
            <motion.figure
              key={t.name}
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, ease: EASE, delay: (i % 3) * 0.08 }}
              className="flex w-[80vw] shrink-0 flex-col overflow-hidden rounded-4xl border border-line bg-porcelain sm:w-104"
            >
              <Frame
                photo={t.photo}
                alt={t.name}
                className="aspect-4/3"
                imgClassName="object-top"
                sizes="(max-width: 640px) 80vw, 420px"
              />
              <div className="flex flex-1 flex-col justify-between p-7">
                <blockquote>
                  <p className="display text-2xl leading-snug text-espresso">
                    “{t.quote}”
                  </p>
                </blockquote>
                <figcaption className="mono mt-6 text-xs uppercase tracking-[0.14em] text-slate">
                  {t.name}
                  <span className="block text-cocoa">{t.detail}</span>
                </figcaption>
              </div>
            </motion.figure>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
