"use client";

import {
  motion,
  useInView,
  useScroll,
  useTransform,
  animate,
  type Variants,
} from "motion/react";
import { useEffect, useRef, useState, type ReactNode } from "react";

const EASE = [0.22, 1, 0.36, 1] as const;

const variants: Variants = {
  hidden: { opacity: 0, y: 26, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.9, ease: EASE },
  },
};

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "span" | "li" | "section";
};

export function Reveal({ children, className, delay = 0, as = "div" }: RevealProps) {
  const MotionTag = motion[as];
  return (
    <MotionTag
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      transition={{ delay }}
    >
      {children}
    </MotionTag>
  );
}

export function RevealGroup({
  children,
  className,
  stagger = 0.12,
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
}) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: stagger } },
      }}
    >
      {children}
    </motion.div>
  );
}

export function RevealItem({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div className={className} variants={variants}>
      {children}
    </motion.div>
  );
}

/** Headline mask reveal — words rise up from behind a mask.
 *  A single container drives the reveal + stagger, so every word is guaranteed
 *  to animate in (no per-word observer that could leave text hidden). */
const wordVariants: Variants = {
  hidden: { y: "115%" },
  visible: { y: 0, transition: { duration: 0.85, ease: EASE } },
};

export function TextReveal({
  text,
  className,
  delay = 0,
  stagger = 0.045,
}: {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
}) {
  const words = text.split(" ");
  return (
    <motion.span
      className={className}
      aria-label={text}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px", amount: 0.1 }}
      variants={{
        hidden: {},
        visible: {
          transition: { staggerChildren: stagger, delayChildren: delay },
        },
      }}
    >
      {words.map((w, i) => (
        <span
          key={i}
          aria-hidden
          className={`inline-flex overflow-hidden pb-[0.08em] align-bottom ${
            i < words.length - 1 ? "mr-[0.25em]" : ""
          }`}
          style={{ marginBottom: "-0.08em" }}
        >
          <motion.span
            variants={wordVariants}
            className="inline-block will-change-transform"
          >
            {w}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}

/** Count-up number that animates when scrolled into view. */
export function Counter({
  to,
  suffix = "",
  className,
  format = false,
}: {
  to: number;
  suffix?: string;
  className?: string;
  format?: boolean;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, to, {
      duration: 1.4,
      ease: EASE,
      onUpdate: (v) => setVal(v),
    });
    return () => controls.stop();
  }, [inView, to]);

  const display = format
    ? Math.round(val).toLocaleString("es-ES")
    : Math.round(val).toString();

  return (
    <span ref={ref} className={className}>
      {display}
      {suffix}
    </span>
  );
}

/** Subtle vertical parallax as the element scrolls through the viewport. */
export function Parallax({
  children,
  className,
  amount = 60,
}: {
  children: ReactNode;
  className?: string;
  amount?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [amount, -amount]);
  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  );
}
