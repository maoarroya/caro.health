"use client";

import { useState } from "react";
import Link from "next/link";
import { Frame } from "@/components/Frame";
import { Sprig } from "@/components/Sprig";
import { membership, images } from "@/lib/content";
import { Reveal } from "@/components/Reveal";

export function Pricing() {
  const [annual, setAnnual] = useState(false);
  const plan = annual ? membership.annual : membership.monthly;

  return (
    <section id="membresia" className="px-5 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="relative overflow-hidden rounded-4xl bg-espresso p-5 text-porcelain lg:p-6">
          <div className="grid gap-5 lg:grid-cols-2">
            <Reveal>
              <div className="veil relative aspect-4/5 overflow-hidden rounded-3xl lg:aspect-auto lg:h-full">
                <Frame
                  photo={images.hero.tall}
                  alt="Práctica en casa"
                  className="h-full w-full"
                  sizes="(max-width: 1024px) 90vw, 45vw"
                />
                <div className="absolute inset-0 bg-linear-to-t from-espresso/80 via-transparent to-transparent" />
                <div className="absolute inset-x-0 bottom-0 z-10 p-7">
                  <p className="eyebrow text-sand">
                    {membership.eyebrow}
                  </p>
                  <p className="display mt-3 text-4xl text-porcelain lg:text-5xl">
                    {membership.title}
                  </p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <div className="flex h-full flex-col rounded-3xl bg-porcelain p-8 text-espresso lg:p-10">
                <p className="text-slate">{membership.subtitle}</p>

                <div className="mono mt-7 flex items-center gap-1 self-start rounded-full bg-linen p-1 text-xs uppercase tracking-[0.12em]">
                  <button
                    onClick={() => setAnnual(false)}
                    className={`rounded-full px-4 py-2 transition-colors ${
                      !annual ? "bg-espresso text-porcelain" : "text-slate"
                    }`}
                  >
                    Mes a mes
                  </button>
                  <button
                    onClick={() => setAnnual(true)}
                    className={`rounded-full px-4 py-2 transition-colors ${
                      annual ? "bg-espresso text-porcelain" : "text-slate"
                    }`}
                  >
                    Anual
                  </button>
                </div>

                <div className="mt-7 flex items-end gap-2">
                  <span className="display text-7xl text-espresso">
                    {plan.price}
                  </span>
                  <span className="mono mb-3 text-sm text-slate">
                    {plan.period}
                  </span>
                </div>
                <p className="mono mt-1 text-xs uppercase tracking-[0.12em] text-cocoa">
                  {plan.note}
                </p>

                <ul className="mt-7 grid flex-1 gap-3 text-sm text-slate">
                  {membership.perks.map((perk) => (
                    <li key={perk} className="flex items-start gap-3">
                      <Sprig className="mt-0.5 h-4 w-4 shrink-0 text-cocoa" />
                      {perk}
                    </li>
                  ))}
                </ul>

                <Link
                  href="/virtual#biblioteca"
                  className="mono mt-9 rounded-full bg-espresso px-6 py-4 text-center text-xs uppercase tracking-[0.14em] text-porcelain transition-colors hover:bg-cocoa"
                >
                  Empezar a practicar
                </Link>
                <p className="mono mt-3 text-center text-xs text-slate/60">
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
