"use client";

import { useMemo, useState } from "react";
import { motion } from "motion/react";
import { Frame } from "@/components/Frame";
import { Lightbox } from "@/components/Lightbox";
import { PhotoMarquee } from "@/components/PhotoMarquee";
import { Reveal, TextReveal } from "@/components/Reveal";
import { gallery, images } from "@/lib/content";
import type { Photo } from "@/lib/photos";

export function Gallery() {
  const [active, setActive] = useState(gallery.groups[0].id);
  const [index, setIndex] = useState<number | null>(null);

  const shown = useMemo(() => {
    const group = gallery.groups.find((g) => g.id === active);
    if (!group || group.sets.length === 0) return gallery.photos;
    return gallery.photos.filter((photo) => group.sets.includes(photo.set));
  }, [active]);

  // Frames arriving from the band may sit outside the active filter — fall back
  // to the full set so the lightbox always opens on the photo that was clicked.
  const openPhoto = (photo: Photo) => {
    const at = shown.findIndex((x) => x.id === photo.id);
    if (at >= 0) return setIndex(at);
    setActive(gallery.groups[0].id);
    setIndex(gallery.photos.findIndex((x) => x.id === photo.id));
  };

  return (
    <section id="galeria" className="py-16 lg:py-20">
      {/* Velocity band — drifts on its own, leans into your scroll */}
      <div className="flex flex-col gap-3 lg:gap-4">
        <PhotoMarquee
          photos={images.band[0]}
          baseVelocity={-1.6}
          height="h-52 lg:h-80"
          onSelect={openPhoto}
        />
        <PhotoMarquee
          photos={images.band[1]}
          baseVelocity={1.6}
          height="h-40 lg:h-60"
          onSelect={openPhoto}
        />
      </div>

      <div className="mx-auto mt-20 max-w-7xl px-5 lg:px-8">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div>
            <Reveal>
              <p className="eyebrow text-cocoa">{gallery.eyebrow}</p>
            </Reveal>
            <h2 className="display mt-5 max-w-2xl text-5xl text-espresso lg:text-6xl">
              <TextReveal text={gallery.title} />
            </h2>
          </div>
          <Reveal delay={0.1}>
            <p className="mono max-w-xs text-sm leading-relaxed text-slate/70">
              {shown.length} fotografías del estudio, la barra y la práctica en
              casa. Toca cualquiera para verla en grande.
            </p>
          </Reveal>
        </div>

        {/* Filters */}
        <Reveal delay={0.05}>
          <div className="no-bar mt-10 flex gap-2 overflow-x-auto pb-1">
            {gallery.groups.map((group) => {
              const on = group.id === active;
              return (
                <button
                  key={group.id}
                  type="button"
                  onClick={() => setActive(group.id)}
                  aria-pressed={on}
                  className={`mono shrink-0 rounded-full border px-5 py-2.5 text-xs uppercase tracking-[0.12em] transition-colors ${
                    on
                      ? "border-cocoa bg-cocoa text-porcelain"
                      : "border-line-strong text-slate hover:border-cocoa"
                  }`}
                >
                  {group.label}
                </button>
              );
            })}
          </div>
        </Reveal>

        {/* Masonry */}
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="mt-8 columns-2 gap-3 md:columns-3 lg:columns-4 lg:gap-4"
        >
          {shown.map((photo, i) => (
            <button
              key={photo.id}
              type="button"
              onClick={() => setIndex(i)}
              aria-label="Ampliar fotografía"
              className="group mb-3 block w-full break-inside-avoid lg:mb-4"
            >
              <div className="relative overflow-hidden rounded-2xl">
                <Frame
                  photo={photo}
                  className="w-full"
                  imgClassName="transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
                  sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 24vw"
                  style={{ aspectRatio: `${photo.w} / ${photo.h}` }}
                />
                <span className="pointer-events-none absolute inset-0 bg-espresso/0 transition-colors duration-500 group-hover:bg-espresso/15" />
                <span className="mono pointer-events-none absolute bottom-3 left-3 translate-y-2 rounded-full bg-porcelain/90 px-3 py-1 text-[0.65rem] uppercase tracking-[0.12em] text-espresso opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                  Ver ↗
                </span>
              </div>
            </button>
          ))}
        </motion.div>
      </div>

      <Lightbox
        photos={shown}
        index={index}
        onIndexChange={setIndex}
        onClose={() => setIndex(null)}
      />
    </section>
  );
}
