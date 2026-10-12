import type { Metadata } from "next";
import Image from "next/image";
import { libro } from "@/lib/content";
import { formatCop } from "@/lib/format";
import { Frame } from "@/components/Frame";
import { BookCheckout } from "@/components/BookCheckout";
import { Sprig } from "@/components/Sprig";
import { Reveal, RevealGroup, RevealItem } from "@/components/Reveal";
import { SiteCta } from "@/components/sections/SiteCta";

export const metadata: Metadata = {
  title: "Libro",
  description:
    "Tú puedes ser libre, el libro de Carolina Velásquez (Caro Health): una guía para alcanzar la gloria a través de tus hábitos. 20 capítulos, en físico y digital.",
};

const { book, forWho } = libro;

export default function LibroPage() {
  return (
    <>
      <section className="px-5 pt-32 pb-16 lg:px-8 lg:pt-40">
        <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[1fr_1.05fr] lg:gap-20">
          {/* Portada real del libro */}
          <Reveal>
            <div className="relative mx-auto w-full max-w-sm">
              <div className="absolute -inset-6 rounded-[2.5rem] bg-linen/70" />
              <div className="relative overflow-hidden rounded-r-2xl rounded-l-md shadow-[0_40px_90px_-40px_rgba(42,32,51,0.75)]">
                <Image
                  src={book.cover.src}
                  alt={`Portada de ${book.title}`}
                  width={book.cover.w}
                  height={book.cover.h}
                  sizes="(max-width: 640px) 90vw, 384px"
                  priority
                  className="h-auto w-full"
                />
                <div className="pointer-events-none absolute inset-y-0 left-0 w-4 bg-linear-to-r from-black/30 to-transparent" />
              </div>
              <p className="mono mt-6 text-center text-[0.65rem] uppercase tracking-[0.16em] text-slate">
                {book.pages} páginas · ISBN {book.isbn}
              </p>
            </div>
          </Reveal>

          <div>
            <Reveal>
              <p className="eyebrow flex items-center gap-3 text-cocoa">
                <Sprig className="h-4 w-4" />
                {libro.eyebrow}
              </p>
            </Reveal>
            <Reveal delay={0.05}>
              <h1 className="display mt-7 text-5xl text-espresso lg:text-7xl">
                {book.title}
              </h1>
              <p className="display mt-4 text-2xl text-cocoa lg:text-3xl">
                <em>{book.subtitle}</em>
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-8 max-w-lg text-lg leading-relaxed text-slate">
                {book.synopsis}
              </p>
            </Reveal>

            <RevealGroup className="mt-10 grid gap-4 sm:grid-cols-2">
              {book.formats.map((format) => (
                <RevealItem key={format.id}>
                  <div className="flex h-full flex-col rounded-3xl border border-line bg-porcelain p-6">
                    <p className="mono text-[0.65rem] uppercase tracking-[0.14em] text-cocoa">
                      {format.name}
                    </p>
                    <p className="display mt-3 text-4xl text-espresso">{formatCop(format.priceCop)}</p>
                    <p className="mono mt-1 text-[0.65rem] uppercase tracking-[0.12em] text-slate/60">
                      {format.note}
                    </p>
                    <a
                      href="#comprar"
                      className="mono mt-6 rounded-full bg-espresso px-6 py-3.5 text-center text-xs uppercase tracking-[0.14em] text-porcelain transition-colors hover:bg-cocoa"
                    >
                      Comprar
                    </a>
                  </div>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </div>
      </section>

      {/* Índice */}
      <section className="px-5 py-16 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 rounded-4xl bg-linen/70 p-8 lg:grid-cols-[0.8fr_1.2fr] lg:p-14">
            <div>
              <Reveal>
                <p className="eyebrow text-cocoa">Dentro del libro</p>
              </Reveal>
              <h2 className="display mt-5 text-4xl text-espresso lg:text-5xl">
                Veinte capítulos, un camino de ascenso.
              </h2>
              <Reveal delay={0.05}>
                <p className="mt-5 max-w-sm leading-relaxed text-slate">
                  Primero el espíritu y la mente; después el cuerpo. Cada capítulo cierra con
                  un ejercicio, un reto o una reflexión.
                </p>
              </Reveal>
              <Reveal delay={0.1}>
                <div className="mt-8 max-w-xs">
                  <Frame
                    photo={book.photo}
                    alt={`Carolina Velásquez, autora de ${book.title}`}
                    className="aspect-4/5 rounded-3xl"
                    sizes="320px"
                  />
                </div>
              </Reveal>
            </div>

            <RevealGroup className="grid content-start gap-x-10 border-t border-line-strong md:grid-cols-2" stagger={0.03}>
              {book.chapters.map((chapter, i) => (
                <RevealItem key={chapter}>
                  <div className="flex gap-5 border-b border-line-strong py-4">
                    <span className="mono pt-1 text-xs uppercase tracking-[0.16em] text-gold-ink">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <p className="display text-xl leading-tight text-espresso lg:text-2xl">{chapter}</p>
                  </div>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </div>
      </section>

      {/* Cómo usar este libro */}
      <section className="px-5 py-8 lg:px-8 lg:py-16">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <p className="eyebrow text-cocoa">Cómo usar este libro</p>
          </Reveal>
          <h2 className="display mt-5 max-w-2xl text-4xl text-espresso lg:text-6xl">
            No busques terminarlo rápido. Busca que <em>termine de transformarte</em>.
          </h2>
          <RevealGroup className="mt-12 grid gap-px overflow-hidden rounded-4xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
            {book.howTo.map((step, i) => (
              <RevealItem key={step.title}>
                <div className="h-full bg-porcelain p-7">
                  <span className="mono text-xs uppercase tracking-[0.16em] text-gold-ink">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="display mt-5 text-2xl text-espresso lg:text-3xl">{step.title}</h3>
                  <p className="mt-3 leading-relaxed text-slate">{step.text}</p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* Para quién */}
      <section className="px-5 py-8 lg:px-8 lg:py-16">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1fr_1fr] lg:gap-20">
          <div>
            <Reveal>
              <p className="eyebrow text-cocoa">{forWho.eyebrow}</p>
            </Reveal>
            <h2 className="display mt-5 text-4xl text-espresso lg:text-6xl">
              {forWho.title}
            </h2>
            <RevealGroup className="mt-10 flex flex-col">
              {forWho.items.map((item) => (
                <RevealItem key={item.title}>
                  <div className="border-t border-line py-6">
                    <h3 className="display text-2xl text-espresso lg:text-3xl">
                      <em>{item.title}</em>
                    </h3>
                    <p className="mt-2 max-w-md leading-relaxed text-slate">{item.text}</p>
                  </div>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>

          <RevealGroup className="grid grid-cols-3 gap-3 self-center" stagger={0.1}>
            {book.author_photos.map((photo, i) => (
              <RevealItem key={photo.id}>
                <Frame
                  photo={photo}
                  alt="Caro"
                  className={`aspect-3/4 rounded-2xl ${i === 1 ? "translate-y-6" : ""}`}
                  sizes="(max-width: 1024px) 30vw, 15vw"
                />
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <BookCheckout />
      <SiteCta />
    </>
  );
}
