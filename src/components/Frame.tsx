import Image from "next/image";
import type { CSSProperties } from "react";

type FrameProps = {
  /** Solo `src` y `blur`: sirve una foto del archivo o una subida desde el builder. */
  photo: { src: string; blur?: string };
  alt?: string;
  /** Sizes hint — always pass one, every frame is rendered with `fill`. */
  sizes?: string;
  /** Classes for the crop box (aspect ratio, radius, placement). */
  className?: string;
  /** Classes for the <img> itself (object-position, transforms, filters). */
  imgClassName?: string;
  /** Inline styles for the crop box — for per-photo aspect ratios. */
  style?: CSSProperties;
  priority?: boolean;
};

/**
 * The single way an image enters the page: cropped box + blur-up placeholder
 * generated from the source frame at build time.
 */
export function Frame({
  photo,
  alt = "",
  sizes = "100vw",
  className = "",
  imgClassName = "",
  style,
  priority = false,
}: FrameProps) {
  // `fill` needs a positioned box, so the crop defaults to `relative`. Tailwind
  // emits `relative` after `absolute`, so a caller's own positioning would lose
  // the specificity race — step aside when they bring their own.
  const positioned = /(?:^|\s)(?:absolute|fixed|sticky)(?:\s|$)/.test(className);

  return (
    <div
      className={`${positioned ? "" : "relative"} overflow-hidden bg-linen ${className}`}
      style={style}
    >
      <Image
        src={photo.src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        placeholder={photo.blur ? "blur" : "empty"}
        blurDataURL={photo.blur}
        className={`object-cover ${imgClassName}`}
      />
    </div>
  );
}
