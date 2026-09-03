"use client";

import { useMemo, useState } from "react";
import { motion } from "motion/react";
import { Frame } from "@/components/Frame";
import { Reveal, TextReveal } from "@/components/Reveal";
import { virtual } from "@/lib/content";
import { disciplineDot } from "@/lib/accents";

const EASE = [0.22, 1, 0.36, 1] as const;

/** The brief asks for search filters by discipline and by duration. */
export function ClassLibrary() {
  const [discipline, setDiscipline] = useState<string>("todas");
  const [duration, setDuration] = useState<string>("cualquiera");

  const shown = useMemo(() => {
    const band = virtual.durations.find((d) => d.label === duration);
    return virtual.sessions.filter((s) => {
      const okDiscipline =
        discipline === "todas" || s.discipline === discipline;
      const okDuration = !band || (s.minutes >= band.min && s.minutes <= band.max);
      return okDiscipline && okDuration;
    });
  }, [discipline, duration]);

  const chip = (on: boolean) =>
    `mono shrink-0 rounded-full border px-5 py-2.5 text-xs uppercase tracking-[0.12em] transition-colors ${
      on
        ? "border-cocoa bg-cocoa text-porcelain"
        : "border-line-strong text-slate hover:border-cocoa"
    }`;

  return (
    <section id="biblioteca" className="px-5 py-24 lg:px-8 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <Reveal>
              <p className="eyebrow text-cocoa">La biblioteca</p>
            </Reveal>
            <h2 className="display mt-6 max-w-xl text-5xl text-espresso lg:text-6xl">
              <TextReveal text="Elige por disciplina o por el tiempo que hoy tienes." />
            </h2>
          </div>
          <Reveal delay={0.1}>
            <p className="mono text-xs uppercase tracking-[0.14em] text-slate/60">
              {shown.length === 1
                ? "1 clase disponible"
                : `${shown.length} clases disponibles`}
            </p>
          </Reveal>
        </div>

        {/* Filters */}
        <Reveal delay={0.05}>
          <div className="mt-12 space-y-4">
            <div>
              <p className="mono mb-3 text-[0.65rem] uppercase tracking-[0.16em] text-slate/50">
                Disciplina
              </p>
              <div className="no-bar flex gap-2 overflow-x-auto pb-1">
                <button
                  type="button"
                  onClick={() => setDiscipline("todas")}
                  aria-pressed={discipline === "todas"}
                  className={chip(discipline === "todas")}
                >
                  Todas
                </button>
                {virtual.disciplines.map((d) => (
                  <button
                    key={d.name}
                    type="button"
                    onClick={() => setDiscipline(d.name)}
                    aria-pressed={discipline === d.name}
                    className={chip(discipline === d.name)}
                  >
                    {d.name}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="mono mb-3 text-[0.65rem] uppercase tracking-[0.16em] text-slate/50">
                Duración
              </p>
              <div className="no-bar flex gap-2 overflow-x-auto pb-1">
                <button
                  type="button"
                  onClick={() => setDuration("cualquiera")}
                  aria-pressed={duration === "cualquiera"}
                  className={chip(duration === "cualquiera")}
                >
                  Cualquiera
                </button>
                {virtual.durations.map((d) => (
                  <button
                    key={d.label}
                    type="button"
                    onClick={() => setDuration(d.label)}
                    aria-pressed={duration === d.label}
                    className={chip(duration === d.label)}
                  >
                    {d.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </Reveal>

        {/* Results */}
        <motion.div
          key={`${discipline}-${duration}`}
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EASE }}
          className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
        >
          {shown.map((session) => (
            <article key={session.title} className="group">
              <div className="veil relative overflow-hidden rounded-3xl">
                <Frame
                  photo={session.photo}
                  alt={session.title}
                  className="aspect-3/4"
                  imgClassName="transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
                <span className="mono absolute right-4 top-4 z-10 rounded-full bg-porcelain/90 px-3 py-1 text-[0.65rem] uppercase tracking-[0.12em] text-espresso backdrop-blur">
                  {session.minutes} min
                </span>
              </div>
              <div className="mt-4 flex items-center gap-2">
                <span
                  className={`h-1.5 w-1.5 rounded-full ${disciplineDot[session.discipline]}`}
                />
                <span className="mono text-[0.65rem] uppercase tracking-[0.14em] text-slate/70">
                  {session.discipline} · {session.level}
                </span>
              </div>
              <h3 className="display mt-1 text-2xl text-espresso">
                {session.title}
              </h3>
            </article>
          ))}
        </motion.div>

        {shown.length === 0 && (
          <p className="mt-16 text-center text-slate">
            Nada con esa combinación todavía. Prueba con otra duración.
          </p>
        )}
      </div>
    </section>
  );
}
