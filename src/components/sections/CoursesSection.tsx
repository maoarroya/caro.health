import Link from "next/link";
import { courses } from "@/lib/content";
import { CourseCard } from "@/components/CourseCard";
import { Reveal, RevealGroup, RevealItem, TextReveal } from "@/components/Reveal";

export function CoursesSection() {
  return (
    <section id="cursos" className="px-5 py-20 lg:px-8 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <Reveal>
              <p className="eyebrow text-oxblood">Cursos & colecciones</p>
            </Reveal>
            <h2 className="display mt-5 max-w-2xl text-5xl text-ink lg:text-7xl">
              <TextReveal text="Encuentra el estilo que encaja en tu vida." />
            </h2>
          </div>
          <Reveal delay={0.1}>
            <Link
              href="/cursos"
              className="mono group inline-flex shrink-0 items-center gap-2 rounded-full border border-ink/25 px-6 py-3 text-xs uppercase tracking-wide text-ink transition-colors hover:border-ink"
            >
              Ver los {courses.length} programas
              <span className="transition-transform group-hover:translate-x-1">
                →
              </span>
            </Link>
          </Reveal>
        </div>

        <RevealGroup
          className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
          stagger={0.1}
        >
          {courses.map((course) => (
            <RevealItem key={course.slug}>
              <CourseCard course={course} />
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
