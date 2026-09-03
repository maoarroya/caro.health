"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { faqs, images } from "@/lib/content";
import { Frame } from "@/components/Frame";
import { Reveal } from "@/components/Reveal";

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="px-5 py-24 lg:px-8 lg:py-32">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <Reveal>
            <p className="eyebrow text-cocoa">Preguntas frecuentes</p>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="display mt-5 text-5xl text-espresso lg:text-6xl">
              ¿Aún lo dudas?
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 text-slate">
              Todo lo que quieres saber antes de empezar. ¿Sigues con dudas?
              Escríbeme y lo hablamos sin compromiso.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <Frame
              photo={images.faq}
              alt="Práctica de Pilates"
              className="mt-8 hidden aspect-4/5 rounded-2xl lg:block"
              sizes="35vw"
            />
          </Reveal>
        </div>

        <div className="divide-y divide-line border-y border-line">
          {faqs.map((item, i) => {
            const isOpen = open === i;
            return (
              <div key={item.q}>
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-6 py-6 text-left"
                >
                  <span className="display text-2xl text-espresso lg:text-3xl">
                    {item.q}
                  </span>
                  <span
                    className={`grid h-8 w-8 shrink-0 place-items-center rounded-full border border-line-strong text-espresso transition-transform duration-300 ${
                      isOpen ? "rotate-45 bg-espresso text-porcelain" : ""
                    }`}
                  >
                    +
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="max-w-xl pb-7 leading-relaxed text-slate">
                        {item.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
