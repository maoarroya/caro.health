"use client";

import { useRef } from "react";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
  wrap,
} from "motion/react";
import { Frame } from "@/components/Frame";
import type { Photo } from "@/lib/photos";

/**
 * A rail that drifts on its own and then leans into the page's scroll velocity —
 * scroll down and it speeds up, scroll up and it runs the other way.
 *
 * `uniform` crops every frame to the same portrait ratio, which is what the
 * homepage wants: one calm rhythm instead of a collage.
 */
export function PhotoMarquee({
  photos,
  baseVelocity = 1.4,
  height = "h-72 lg:h-[26rem]",
  uniform = false,
  onSelect,
  className = "",
}: {
  photos: Photo[];
  baseVelocity?: number;
  height?: string;
  uniform?: boolean;
  onSelect?: (photo: Photo) => void;
  className?: string;
}) {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  });
  const velocityFactor = useTransform(smoothVelocity, [0, 1200], [0, 4], {
    clamp: false,
  });
  const reduced = useReducedMotion();

  // Two identical halves: wrapping at -50% lands exactly on the seam.
  const x = useTransform(baseX, (v) => `${wrap(-50, 0, v)}%`);
  const direction = useRef(1);

  useAnimationFrame((_, delta) => {
    if (reduced) return;
    let moveBy = direction.current * baseVelocity * (delta / 1000);

    const factor = velocityFactor.get();
    if (factor < 0) direction.current = -1;
    else if (factor > 0) direction.current = 1;

    moveBy += moveBy * Math.abs(factor);
    baseX.set(baseX.get() + moveBy);
  });

  const items = [...photos, ...photos];

  return (
    <div className={`fade-x overflow-hidden ${className}`}>
      <motion.div className="flex w-max" style={{ x }}>
        {items.map((photo, i) => {
          const shell = `group mr-3 shrink-0 lg:mr-4 ${height}`;
          const style = uniform
            ? { aspectRatio: "3 / 4" }
            : { aspectRatio: `${photo.w} / ${photo.h}` };
          const frame = (
            <Frame
              photo={photo}
              className="h-full w-full rounded-2xl"
              imgClassName="transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05]"
              sizes="(max-width: 1024px) 55vw, 420px"
            />
          );

          return onSelect ? (
            <button
              key={i}
              type="button"
              onClick={() => onSelect(photo)}
              aria-label="Ampliar fotografía"
              className={shell}
              style={style}
            >
              {frame}
            </button>
          ) : (
            <div key={i} className={shell} style={style}>
              {frame}
            </div>
          );
        })}
      </motion.div>
    </div>
  );
}
