"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import type { LandingData } from "@/lib/landing";
import { Sprig } from "@/components/Sprig";
import { Reveal, TextReveal } from "@/components/Reveal";

// Clases vistas: se recuerdan en el navegador de cada visitante.
const WATCHED_KEY = "ch:clases-vistas";
const NONE: string[] = [];
const listeners = new Set<() => void>();
let watchedCache: string[] | null = null;

function readWatched(): string[] {
  if (watchedCache) return watchedCache;
  try {
    const stored: unknown = JSON.parse(localStorage.getItem(WATCHED_KEY) ?? "[]");
    watchedCache = Array.isArray(stored) ? stored.filter((v) => typeof v === "string") : [];
  } catch {
    watchedCache = [];
  }
  return watchedCache;
}

function markWatched(videoId: string) {
  const current = readWatched();
  if (current.includes(videoId)) return;
  watchedCache = [...current, videoId];
  try {
    localStorage.setItem(WATCHED_KEY, JSON.stringify(watchedCache));
  } catch {
    // Sin almacenamiento (modo privado): el progreso dura lo que dure la visita.
  }
  listeners.forEach((notify) => notify());
}

function subscribe(notify: () => void) {
  listeners.add(notify);
  return () => {
    listeners.delete(notify);
  };
}

const two = (n: number) => String(n).padStart(2, "0");

/** Carátula del video: la estándar siempre existe; la grande se usa solo si YouTube la tiene. */
function Poster({ videoId }: { videoId: string }) {
  const [large, setLarge] = useState(false);

  useEffect(() => {
    const probe = new Image();
    // La que falta llega como un marcador de 120 px, no como error.
    probe.onload = () => {
      if (probe.naturalWidth > 120) setLarge(true);
    };
    probe.src = `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`;
    return () => {
      probe.onload = null;
    };
  }, [videoId]);

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={`https://i.ytimg.com/vi/${videoId}/${large ? "maxresdefault" : "hqdefault"}.jpg`}
      alt=""
      className="absolute inset-0 h-full w-full object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]"
    />
  );
}

/**
 * Cursos en video: cada curso es una lista de clases de YouTube. El video no
 * carga hasta que se le da play, así la página no paga por reproductores que
 * nadie abrió.
 */
export function Courses({
  data,
  preview = false,
}: {
  data: LandingData["courses"];
  preview?: boolean;
}) {
  const [courseId, setCourseId] = useState<string | null>(null);
  const [lessonId, setLessonId] = useState<string | null>(null);
  const [playing, setPlaying] = useState<string | null>(null);
  const watched = useSyncExternalStore(subscribe, readWatched, () => NONE);

  // Solo se publica lo que se puede reproducir.
  const courses = data.courses
    .map((course) => ({ ...course, lessons: course.lessons.filter((l) => l.videoId) }))
    .filter((course) => course.lessons.length > 0);

  if (courses.length === 0) {
    if (!preview) return null;
    return (
      <section className="px-5 py-24 lg:px-8">
        <div className="mx-auto max-w-3xl rounded-4xl border border-dashed border-line-strong p-12 text-center">
          <p className="eyebrow text-cocoa">Cursos en video</p>
          <p className="display mt-5 text-4xl text-espresso">Aún no hay cursos.</p>
          <p className="mt-4 text-slate">
            Crea un curso en el panel y pega los enlaces de YouTube de cada clase. Mientras
            esté vacía, esta sección no aparece en el sitio.
          </p>
        </div>
      </section>
    );
  }

  const course = courses.find((c) => c.id === courseId) ?? courses[0];
  const index = Math.max(0, course.lessons.findIndex((l) => l.id === lessonId));
  const lesson = course.lessons[index];
  const next = course.lessons[index + 1];
  const seen = course.lessons.filter((l) => watched.includes(l.videoId)).length;
  const lessonTitle = lesson.title || `Clase ${index + 1}`;

  const play = (id: string, videoId: string) => {
    setLessonId(id);
    setPlaying(videoId);
    markWatched(videoId);
  };

  return (
    <section id="cursos" className="px-5 py-24 lg:px-8 lg:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            {data.eyebrow && (
              <Reveal>
                <p className="eyebrow flex items-center gap-3 text-cocoa">
                  <Sprig className="h-4 w-4" />
                  {data.eyebrow}
                </p>
              </Reveal>
            )}
            <h2 className="display mt-6 max-w-2xl text-5xl text-espresso lg:text-7xl">
              <TextReveal text={data.title} />
            </h2>
          </div>
          {data.body && (
            <Reveal delay={0.1}>
              <p className="max-w-md text-lg leading-relaxed text-slate">{data.body}</p>
            </Reveal>
          )}
        </div>

        {courses.length > 1 && (
          <div className="no-bar -mx-5 mt-12 flex gap-2 overflow-x-auto px-5 lg:mx-0 lg:flex-wrap lg:px-0">
            {courses.map((c) => {
              const active = c.id === course.id;
              return (
                <button
                  key={c.id}
                  type="button"
                  aria-pressed={active}
                  onClick={() => {
                    setCourseId(c.id);
                    setLessonId(null);
                    setPlaying(null);
                  }}
                  className={`mono shrink-0 rounded-full border px-5 py-3 text-xs uppercase tracking-[0.12em] transition-colors ${
                    active
                      ? "border-espresso bg-espresso text-porcelain"
                      : "border-line-strong text-slate hover:border-cocoa hover:text-espresso"
                  }`}
                >
                  {c.title || "Curso"}
                  <span className={active ? "ml-2 text-sand" : "ml-2 text-slate/50"}>
                    {c.lessons.length}
                  </span>
                </button>
              );
            })}
          </div>
        )}

        <div className="mt-10 grid gap-8 lg:grid-cols-[1.6fr_1fr] lg:gap-10">
          <div>
            <div className="relative aspect-video overflow-hidden rounded-3xl bg-espresso shadow-[0_24px_70px_-40px_rgba(42,32,51,0.6)] lg:rounded-4xl">
              {playing === lesson.videoId ? (
                <iframe
                  key={lesson.videoId}
                  src={`https://www.youtube-nocookie.com/embed/${lesson.videoId}?autoplay=1&rel=0&playsinline=1`}
                  title={lessonTitle}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="absolute inset-0 h-full w-full"
                />
              ) : (
                <button
                  type="button"
                  onClick={() => play(lesson.id, lesson.videoId)}
                  aria-label={`Reproducir: ${lessonTitle}`}
                  className="group absolute inset-0 h-full w-full"
                >
                  <Poster key={lesson.videoId} videoId={lesson.videoId} />
                  <span className="absolute inset-0 bg-linear-to-t from-espresso/80 via-espresso/15 to-transparent" />
                  <span className="absolute left-1/2 top-1/2 flex h-18 w-18 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-porcelain text-espresso transition-transform duration-500 group-hover:scale-110 lg:h-24 lg:w-24">
                    <svg viewBox="0 0 24 24" className="ml-1 h-6 w-6 lg:h-8 lg:w-8" fill="currentColor" aria-hidden>
                      <path d="M7 4.5v15l13-7.5z" />
                    </svg>
                  </span>
                  <span className="mono absolute bottom-5 left-5 text-[0.68rem] uppercase tracking-[0.16em] text-porcelain/90 lg:bottom-7 lg:left-7">
                    Clase {two(index + 1)}
                    {lesson.duration && ` · ${lesson.duration}`}
                  </span>
                </button>
              )}
            </div>

            <div className="mt-6 flex flex-wrap items-start justify-between gap-x-8 gap-y-4">
              <div className="max-w-xl">
                <h3 className="display text-3xl text-espresso lg:text-4xl">{lessonTitle}</h3>
                {course.description && (
                  <p className="mt-3 leading-relaxed text-slate">{course.description}</p>
                )}
              </div>
              {next && (
                <button
                  type="button"
                  onClick={() => play(next.id, next.videoId)}
                  className="mono rounded-full border border-espresso/20 px-6 py-3.5 text-xs uppercase tracking-[0.14em] text-espresso transition-colors hover:border-cocoa hover:text-cocoa"
                >
                  Siguiente clase →
                </button>
              )}
            </div>
          </div>

          <div className="flex flex-col self-start overflow-hidden rounded-3xl border border-line bg-porcelain lg:max-h-[42rem] lg:rounded-4xl">
            <div className="border-b border-line p-6">
              <p className="display text-2xl text-espresso">{course.title || "Curso"}</p>
              <p className="mono mt-2 text-[0.68rem] uppercase tracking-[0.14em] text-slate/70">
                {course.level && `${course.level} · `}
                {seen} de {course.lessons.length} clases vistas
              </p>
              <div className="mt-4 h-px w-full bg-line">
                <div
                  className="h-px bg-gold-ink transition-[width] duration-700"
                  style={{ width: `${(seen / course.lessons.length) * 100}%` }}
                />
              </div>
            </div>

            <ol data-lenis-prevent className="overflow-y-auto overscroll-contain">
              {course.lessons.map((item, i) => {
                const active = item.id === lesson.id;
                const done = watched.includes(item.videoId);
                return (
                  <li key={item.id} className="border-b border-line last:border-b-0">
                    <button
                      type="button"
                      aria-current={active}
                      onClick={() => play(item.id, item.videoId)}
                      className={`flex w-full items-center gap-4 p-4 text-left transition-colors ${
                        active ? "bg-linen/70" : "hover:bg-linen/40"
                      }`}
                    >
                      <span className="relative h-14 w-24 shrink-0 overflow-hidden rounded-lg bg-linen">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={`https://i.ytimg.com/vi/${item.videoId}/mqdefault.jpg`}
                          alt=""
                          loading="lazy"
                          className="h-full w-full object-cover"
                        />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="mono block text-[0.62rem] uppercase tracking-[0.16em] text-gold-ink">
                          {two(i + 1)}
                          {item.duration && ` · ${item.duration}`}
                        </span>
                        <span className="mt-1 block truncate text-sm text-espresso">
                          {item.title || `Clase ${i + 1}`}
                        </span>
                      </span>
                      <span
                        aria-label={done ? "Vista" : undefined}
                        className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-[0.7rem] ${
                          done
                            ? "border-cocoa bg-cocoa text-porcelain"
                            : "border-line-strong text-transparent"
                        }`}
                      >
                        ✓
                      </span>
                    </button>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
