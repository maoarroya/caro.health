import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { blog, brand } from "@/lib/content";
import { formatDate } from "@/lib/format";
import { Frame } from "@/components/Frame";
import { Sprig } from "@/components/Sprig";
import { Reveal, RevealGroup, RevealItem } from "@/components/Reveal";

type Params = Promise<{ slug: string }>;

const find = (slug: string) => blog.posts.find((post) => post.slug === slug);

export function generateStaticParams() {
  return blog.posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const post = find((await params).slug);
  if (!post) return { title: "Blog" };
  return { title: post.title, description: post.excerpt };
}

export default async function PostPage({ params }: { params: Params }) {
  const post = find((await params).slug);
  if (!post) notFound();

  const related = blog.posts.filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <>
      <article className="px-5 pt-32 lg:px-8 lg:pt-40">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <Link
              href="/blog"
              className="mono link-underline text-xs uppercase tracking-[0.14em] text-slate hover:text-espresso"
            >
              ← Volver al blog
            </Link>
          </Reveal>
          <Reveal delay={0.05}>
            <p className="eyebrow mt-10 flex items-center gap-3 text-cocoa">
              <Sprig className="h-4 w-4" />
              {post.category} · {post.readTime} de lectura
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="display mt-7 max-w-4xl text-5xl leading-[1.02] text-espresso sm:text-6xl lg:text-8xl">
              {post.title}
            </h1>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mono mt-8 text-xs uppercase tracking-[0.14em] text-slate/60">
              {formatDate(post.date)} · Por Caro
            </p>
          </Reveal>

          <div className="mt-14 grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
            <Reveal className="lg:sticky lg:top-28 lg:self-start">
              <div className="veil relative overflow-hidden rounded-4xl">
                <Frame
                  photo={post.photo}
                  alt={post.title}
                  className="aspect-4/5"
                  sizes="(max-width: 1024px) 90vw, 40vw"
                  priority
                />
              </div>
            </Reveal>

            <div>
              <Reveal delay={0.1}>
                <p className="display text-3xl leading-snug text-cocoa lg:text-4xl">
                  <em>{post.excerpt}</em>
                </p>
              </Reveal>
              <div className="rule-gold mt-8 max-w-xs" />
              <RevealGroup className="mt-8 space-y-6 text-lg leading-relaxed text-slate">
                {post.body.map((paragraph) => (
                  <RevealItem key={paragraph}>
                    <p>{paragraph}</p>
                  </RevealItem>
                ))}
              </RevealGroup>

              <Reveal delay={0.1}>
                <div className="mt-12 rounded-3xl border border-line bg-linen/60 p-7">
                  <p className="mono text-[0.65rem] uppercase tracking-[0.16em] text-cocoa">
                    ¿Quieres llevarlo a la práctica?
                  </p>
                  <p className="display mt-3 text-2xl text-espresso lg:text-3xl">
                    Practica en casa o postúlate a una asesoría.
                  </p>
                  <div className="mt-6 flex flex-wrap gap-3">
                    <Link
                      href="/virtual"
                      className="mono rounded-full bg-espresso px-6 py-3.5 text-xs uppercase tracking-[0.14em] text-porcelain transition-colors hover:bg-cocoa"
                    >
                      Clases virtuales
                    </Link>
                    <Link
                      href="/asesorias#postulacion"
                      className="mono rounded-full border border-espresso/20 px-6 py-3.5 text-xs uppercase tracking-[0.14em] text-espresso transition-colors hover:border-cocoa hover:text-cocoa"
                    >
                      Asesorías
                    </Link>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </article>

      {/* Más del blog */}
      <section className="px-5 py-24 lg:px-8 lg:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-end justify-between gap-6">
            <div>
              <Reveal>
                <p className="eyebrow text-cocoa">Sigue leyendo</p>
              </Reveal>
              <h2 className="display mt-5 text-4xl text-espresso lg:text-5xl">Más del blog.</h2>
            </div>
            <Link
              href="/blog"
              className="mono link-underline hidden text-xs uppercase tracking-[0.14em] text-slate hover:text-espresso sm:block"
            >
              Ver todos →
            </Link>
          </div>
          <RevealGroup className="mt-12 grid gap-x-5 gap-y-10 sm:grid-cols-3" stagger={0.08}>
            {related.map((item) => (
              <RevealItem key={item.slug}>
                <Link href={`/blog/${item.slug}`} className="group block">
                  <div className="veil relative overflow-hidden rounded-3xl">
                    <Frame
                      photo={item.photo}
                      alt={item.title}
                      className="aspect-4/3"
                      imgClassName="transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, 33vw"
                    />
                  </div>
                  <p className="mono mt-4 text-[0.65rem] uppercase tracking-[0.14em] text-slate/70">
                    {item.category} · {item.readTime}
                  </p>
                  <h3 className="display mt-1 text-2xl leading-tight text-espresso transition-colors group-hover:text-cocoa">
                    {item.title}
                  </h3>
                </Link>
              </RevealItem>
            ))}
          </RevealGroup>
          <p className="mono mt-12 text-xs uppercase tracking-[0.12em] text-slate/50">
            Escrito por Caro · {brand.role}
          </p>
        </div>
      </section>
    </>
  );
}
