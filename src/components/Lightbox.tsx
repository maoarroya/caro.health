"use client";

import { useCallback, useEffect } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import type { Photo } from "@/lib/photos";
import { lockScroll, unlockScroll } from "@/lib/scroll-lock";

const EASE = [0.22, 1, 0.36, 1] as const;

export function Lightbox({
  photos,
  index,
  onIndexChange,
  onClose,
}: {
  photos: Photo[];
  /** null closes the overlay. */
  index: number | null;
  onIndexChange: (next: number) => void;
  onClose: () => void;
}) {
  const open = index !== null;

  const step = useCallback(
    (delta: number) => {
      if (index === null || photos.length === 0) return;
      onIndexChange((index + delta + photos.length) % photos.length);
    },
    [index, photos.length, onIndexChange],
  );

  useEffect(() => {
    if (!open) return;
    lockScroll();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      unlockScroll();
    };
  }, [open, onClose, step]);

  const photo = index === null ? null : photos[index];

  return (
    <AnimatePresence>
      {photo && (
        <motion.div
          className="fixed inset-0 z-[80] flex flex-col bg-espresso/95 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.28 }}
          role="dialog"
          aria-modal="true"
          aria-label="Galería"
          onClick={onClose}
        >
          {/* Top bar */}
          <div className="flex items-center justify-between px-5 py-5 text-porcelain lg:px-8">
            <span className="mono text-xs uppercase tracking-[0.14em] text-porcelain/60">
              {String((index ?? 0) + 1).padStart(2, "0")} /{" "}
              {String(photos.length).padStart(2, "0")}
            </span>
            <button
              type="button"
              onClick={onClose}
              className="mono rounded-full border border-porcelain/25 px-4 py-2 text-xs uppercase tracking-[0.14em] transition-colors hover:border-porcelain hover:bg-porcelain hover:text-espresso"
            >
              Cerrar ✕
            </button>
          </div>

          {/* Stage */}
          <div className="relative flex min-h-0 flex-1 items-center justify-center px-4 pb-6 lg:px-20">
            <AnimatePresence mode="wait">
              <motion.div
                key={photo.id}
                className="relative flex h-full w-full items-center justify-center"
                initial={{ opacity: 0, scale: 0.98, filter: "blur(8px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 0.99, filter: "blur(6px)" }}
                transition={{ duration: 0.45, ease: EASE }}
                onClick={(e) => e.stopPropagation()}
              >
                <Image
                  src={photo.src}
                  alt=""
                  width={photo.w}
                  height={photo.h}
                  placeholder="blur"
                  blurDataURL={photo.blur}
                  sizes="92vw"
                  className="max-h-full w-auto rounded-xl object-contain shadow-2xl"
                />
              </motion.div>
            </AnimatePresence>

            <button
              type="button"
              aria-label="Anterior"
              onClick={(e) => {
                e.stopPropagation();
                step(-1);
              }}
              className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-porcelain/10 px-4 py-5 text-porcelain backdrop-blur transition-colors hover:bg-porcelain hover:text-espresso lg:left-6"
            >
              ←
            </button>
            <button
              type="button"
              aria-label="Siguiente"
              onClick={(e) => {
                e.stopPropagation();
                step(1);
              }}
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-porcelain/10 px-4 py-5 text-porcelain backdrop-blur transition-colors hover:bg-porcelain hover:text-espresso lg:right-6"
            >
              →
            </button>
          </div>

          {/* Filmstrip */}
          <div
            className="no-bar flex gap-2 overflow-x-auto px-5 pb-6 lg:px-8"
            onClick={(e) => e.stopPropagation()}
          >
            {photos.map((thumb, i) => (
              <button
                key={thumb.id}
                type="button"
                onClick={() => onIndexChange(i)}
                aria-label={`Ver fotografía ${i + 1}`}
                className={`relative h-14 w-11 shrink-0 overflow-hidden rounded-md transition-opacity ${
                  i === index
                    ? "opacity-100 ring-2 ring-porcelain"
                    : "opacity-40 hover:opacity-80"
                }`}
              >
                <Image
                  src={thumb.src}
                  alt=""
                  fill
                  sizes="44px"
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
