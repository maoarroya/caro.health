"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { Frame } from "@/components/Frame";
import { Reveal } from "@/components/Reveal";
import { blog, type Post } from "@/lib/content";
import { formatDate } from "@/lib/format";

const EASE = [0.22, 1, 0.36, 1] as const;

function PostCard({ post }: { post: Post }) {
  return (
    <Link href={`/blog/${post.slug}`} className="group block">
      <div className="veil relative overflow-hidden rounded-3xl">
        <Frame
          photo={post.photo}
          alt={post.title}
          className="aspect-4/5"
          imgClassName="transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <span className="mono absolute left-4 top-4 z-10 rounded-full bg-porcelain/90 px-3 py-1 text-[0.65rem] uppercase tracking-[0.12em] text-espresso backdrop-blur">
          {post.category}
        </span>
      </div>
      <p className="mono mt-4 text-[0.65rem] uppercase tracking-[0.14em] text-slate/70">
        {formatDate(post.date)} · {post.readTime}
      </p>
      <h3 className="display mt-1 text-2xl leading-tight text-espresso transition-colors group-hover:text-cocoa lg:text-3xl">
        {post.title}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-slate">{post.excerpt}</p>
    </Link>
  );
}

/** Featured post on top, then the archive filtered by category. */
export function BlogGrid() {
  const [category, setCategory] = useState<string>("todas");
  const [featured, ...rest] = blog.posts;

  const shown = useMemo(
    () => rest.filter((post) => category === "todas" || post.category === category),
    [category, rest],
  );

  const chip = (on: boolean) =>
    `mono shrink-0 rounded-full border px-5 py-2.5 text-xs uppercase tracking-[0.12em] transition-colors ${
      on ? "border-cocoa bg-cocoa text-porcelain" : "border-line-strong text-slate hover:border-cocoa"
    }`;

  return (
    <>
      {/* Featured */}
      <section className="px-5 lg:px-8">
        <Reveal>
          <Link
            href={`/blog/${featured.slug}`}
            className="group mx-auto grid max-w-7xl items-center gap-8 overflow-hidden rounded-4xl border border-line bg-porcelain lg:grid-cols-2"
          >
            <div className="veil relative">
              <Frame
                photo={featured.photo}
                alt={featured.title}
                className="aspect-4/3 lg:aspect-4/5"
                imgClassName="object-top transition-transform duration-[1000ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
                sizes="(max-width: 1024px) 95vw, 50vw"
                priority
              />
            </div>
            <div className="p-7 pt-0 lg:p-12">
              <p className="mono text-[0.65rem] uppercase tracking-[0.14em] text-cocoa">
                Destacado · {featured.category}
              </p>
              <h2 className="display mt-4 text-4xl leading-tight text-espresso transition-colors group-hover:text-cocoa lg:text-6xl">
                {featured.title}
              </h2>
              <p className="mt-5 max-w-md text-lg leading-relaxed text-slate">{featured.excerpt}</p>
              <p className="mono mt-8 text-[0.65rem] uppercase tracking-[0.14em] text-slate/60">
                {formatDate(featured.date)} · {featured.readTime} de lectura
              </p>
              <span className="mono mt-8 inline-block text-xs uppercase tracking-[0.14em] text-espresso">
                Leer artículo →
              </span>
            </div>
          </Link>
        </Reveal>
      </section>

      {/* Archive */}
      <section className="px-5 py-24 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <Reveal>
                <p className="eyebrow text-cocoa">Todos los artículos</p>
              </Reveal>
              <h2 className="display mt-5 text-4xl text-espresso lg:text-5xl">Elige por tema.</h2>
            </div>
            <Reveal delay={0.05}>
              <div className="no-bar flex gap-2 overflow-x-auto pb-1">
                <button
                  type="button"
                  onClick={() => setCategory("todas")}
                  aria-pressed={category === "todas"}
                  className={chip(category === "todas")}
                >
                  Todas
                </button>
                {blog.categories.map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setCategory(c)}
                    aria-pressed={category === c}
                    className={chip(category === c)}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </Reveal>
          </div>

          <motion.div
            key={category}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="mt-12 grid gap-x-5 gap-y-12 sm:grid-cols-2 lg:grid-cols-3"
          >
            {shown.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </motion.div>

          {shown.length === 0 && (
            <p className="mt-16 text-center text-slate">
              Todavía no hay más artículos en este tema. Pronto.
            </p>
          )}
        </div>
      </section>
    </>
  );
}
