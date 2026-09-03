import type { CSSProperties } from "react";
import { Frame } from "@/components/Frame";
import type { Photo } from "@/lib/photos";

/**
 * A quiet ribbon of frames that loops forever — CSS only, so it costs no JS and
 * keeps running while the main thread is busy. Items carry their own trailing
 * margin (never `gap`) so the duplicated half is pixel-identical.
 */
export function PhotoRail({
  photos,
  duration = 55,
  reverse = false,
  itemClassName = "aspect-3/4 w-40 rounded-2xl sm:w-52",
  className = "",
  sizes = "(max-width: 640px) 40vw, 220px",
}: {
  photos: Photo[];
  duration?: number;
  reverse?: boolean;
  itemClassName?: string;
  className?: string;
  sizes?: string;
}) {
  return (
    <div className={`loop-hold fade-x overflow-hidden ${className}`}>
      <div
        className={`loop-x flex w-max ${reverse ? "loop-reverse" : ""}`}
        style={{ "--dur": `${duration}s` } as CSSProperties}
      >
        {[...photos, ...photos].map((photo, i) => (
          <Frame
            key={i}
            photo={photo}
            className={`mr-3 shrink-0 ${itemClassName}`}
            sizes={sizes}
          />
        ))}
      </div>
    </div>
  );
}
