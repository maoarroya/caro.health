"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { membership, images } from "@/lib/content";
import { Reveal } from "@/components/Reveal";

export function Pricing() {
  const [annual, setAnnual] = useState(false);
  const plan = annual ? membership.annual : membership.monthly;

  return (
    <section id="precios" className="px-5 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="relative overflow-hidden rounded-3xl bg-ink p-5 text-cream lg:p-6">
          <div className="grid gap-5 lg:grid-cols-[1fr_1fr]">
            {/* Image panel */}
            <Reveal>
              <div className="relative aspect-4/5 overflow-hidden rounded-2xl bg-taupe lg:aspect-auto lg:h-full">
                <Image
                  src={images.pricing}
                  alt="Práctica de Pilates con Caro"
                  fill
                  sizes="(max-width: 1024px) 90vw, 45vw"
                  className="object-cover"
                />
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <p className="eyebrow text-cream/80">{membership.eyebrow}</p>
                  <p className="display mt-3 text-4xl text-cream lg:text-5xl">
                    {membership.title}
                  </p>
                </div>
                <div className="absolute inset-0 bg-linear-to-t from-ink/70 via-transparent to-transparent" />
              </div>
            </Reveal>

            {/* Price card */}
            <Reveal delay={0.08}>
              <div className="flex h-full flex-col rounded-2xl bg-cream p-8 text-ink lg:p-10">
                <p className="text-ink/70">{membership.subtitle}</p>

                {/* Toggle */}
                <div className="mono mt-6 flex items-center gap-1 self-start rounded-full bg-ink/5 p-1 text-xs uppercase tracking-wide">
                  <button
                    onClick={() => setAnnual(false)}
                    className={`rounded-full px-4 py-2 transition-colors ${
                      !annual ? "bg-ink text-cream" : "text-ink/60"
                    }`}
                  >
                    Mes a mes
                  </button>
                  <button
                    onClick={() => setAnnual(true)}
                    className={`rounded-full px-4 py-2 transition-colors ${
                      annual ? "bg-ink text-cream" : "text-ink/60"
                    }`}
                  >
                    Anual
                  </button>
                </div>

                <div className="mt-6 flex items-end gap-2">
                  <span className="display text-7xl text-ink">{plan.price}</span>
                  <span className="mono mb-2 text-sm text-ink/60">
                    {plan.period}
                  </span>
                </div>
                <p className="mono mt-1 text-xs uppercase tracking-wide text-oxblood">
                  {plan.note}
                </p>

                <ul className="mt-6 grid flex-1 gap-2.5 text-sm text-ink/80">
                  {membership.perks.map((f) => (
                    <li key={f} className="flex items-start gap-3">
                      <span className="mt-0.5 text-oxblood">✦</span>
                      {f}
                    </li>
                  ))}
                </ul>

                <Link
                  href="/cursos"
                  className="mono mt-8 rounded-full bg-ink px-6 py-4 text-center text-xs uppercase tracking-wide text-cream transition-colors hover:bg-oxblood"
                >
                  Empieza con una semana gratis
                </Link>
                <p className="mono mt-3 text-center text-xs text-ink/50">
                  Sin permanencia · Cancela cuando quieras
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
