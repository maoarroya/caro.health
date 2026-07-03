import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { courses } from "@/lib/content";
import { accentBg } from "@/lib/accents";
import { Reveal } from "@/components/Reveal";
import { Pricing } from "@/components/sections/Pricing";
import { Faq } from "@/components/sections/Faq";

export const metadata: Metadata = {
  title: "Cursos & Programas",
  description:
    "Todos los cursos y programas de Pilates online de Caro: fundamentos, fuerza, reformer, pre & postnatal, restaurativo y formación para instructores.",
};

export default function CoursesPage() {
  return (
    <>
      {/* Header */}
      <section className="px-5 pt-28 pb-12 lg:px-8 lg:pt-36">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <p className="eyebrow text-oxblood">Cursos & colecciones</p>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="display mt-6 max-w-4xl text-6xl text-ink sm:text-8xl">
              Encuentra tu próximo programa.
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-8 max-w-xl text-lg leading-relaxed text-ink/70">
              Seis programas con la misma filosofía: precisión, calma y progreso
              sostenible. Elige por objetivo, por nivel o por el momento en el
              que estás.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Detailed course rows */}
      <section className="px-5 pb-8 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col gap-16 lg:gap-24">
            {courses.map((course, i) => {
              const reversed = i % 2 === 1;
              return (
                <article
                  key={course.slug}
                  id={course.slug}
                  className="grid scroll-mt-28 items-center gap-8 lg:grid-cols-2 lg:gap-14"
                >
                  <Reveal className={reversed ? "lg:order-2" : ""}>
                    <div
                      className={`relative aspect-4/5 overflow-hidden rounded-3xl ${accentBg[course.accent]}`}
                    >
                      <Image
                        src={course.image}
                        alt={course.title}
                        fill
                        sizes="(max-width: 1024px) 90vw, 45vw"
                        className="object-cover"
                      />
                      {course.tag && (
                        <span className="mono absolute left-5 top-5 rounded-full bg-cream/90 px-4 py-1.5 text-xs uppercase tracking-wide text-ink">
                          {course.tag}
                        </span>
                      )}
                    </div>
                  </Reveal>

                  <Reveal delay={0.08} className={reversed ? "lg:order-1" : ""}>
                    <div className="mono flex flex-wrap items-center gap-2 text-xs uppercase tracking-wide text-ink/70">
                      <span>{course.level}</span>
                      <span aria-hidden>·</span>
                      <span>{course.duration}</span>
                      <span aria-hidden>·</span>
                      <span>{course.sessions}</span>
                    </div>
                    <h2 className="display mt-4 text-5xl text-ink lg:text-6xl">
                      {course.title}
                    </h2>
                    <p className="mt-5 text-lg leading-relaxed text-ink/80">
                      {course.summary}
                    </p>

                    <ul className="mt-7 space-y-3">
                      {course.outcomes.map((o) => (
                        <li key={o} className="flex items-start gap-3 text-ink">
                          <span className="mt-0.5 text-oxblood">✦</span>
                          {o}
                        </li>
                      ))}
                    </ul>

                    <div className="mt-9 flex flex-wrap items-center gap-5">
                      <p className="display text-5xl text-ink">{course.price}</p>
                      <Link
                        href="/#precios"
                        className="mono rounded-full bg-ink px-6 py-3.5 text-xs uppercase tracking-wide text-cream transition-colors hover:bg-oxblood"
                      >
                        Inscribirme
                      </Link>
                      <span className="mono text-xs uppercase tracking-wide text-ink/60">
                        o en la membresía
                      </span>
                    </div>
                  </Reveal>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <div className="mt-12">
        <Pricing />
      </div>
      <Faq />
    </>
  );
}
