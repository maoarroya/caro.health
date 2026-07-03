import Image from "next/image";
import Link from "next/link";
import type { Course } from "@/lib/content";
import { accentBg } from "@/lib/accents";

export function CourseCard({ course }: { course: Course }) {
  return (
    <Link
      href={`/cursos#${course.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-line bg-cream transition-transform duration-500 hover:-translate-y-1"
    >
      <div className="relative aspect-4/5 overflow-hidden bg-taupe">
        <Image
          src={course.image}
          alt={course.title}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
        />
        {course.tag && (
          <span className="mono absolute left-4 top-4 rounded-full bg-cream/90 px-3 py-1 text-xs uppercase tracking-wide text-ink">
            {course.tag}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-6 text-ink">
        <div className="mono flex items-center gap-2 text-xs uppercase tracking-wide text-ink/60">
          <span className={`h-2 w-2 rounded-full ${accentBg[course.accent]}`} />
          <span>{course.level}</span>
          <span aria-hidden>·</span>
          <span>{course.sessions}</span>
        </div>
        <h3 className="display mt-3 text-3xl">{course.title}</h3>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-ink/70">
          {course.summary}
        </p>
        <div className="mt-5 flex items-center justify-between border-t border-line pt-4">
          <span className="display text-2xl">{course.price}</span>
          <span className="mono inline-flex items-center gap-1 text-xs uppercase tracking-wide">
            Ver programa
            <span className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </span>
        </div>
      </div>
    </Link>
  );
}
