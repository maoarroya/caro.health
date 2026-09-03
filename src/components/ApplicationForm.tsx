"use client";

import { useState } from "react";
import { asesorias, brand } from "@/lib/content";
import { Reveal } from "@/components/Reveal";

const programs = asesorias.programs.map((p) => p.name);
const field =
  "mono w-full rounded-2xl border border-line-strong bg-porcelain px-5 py-4 text-sm text-espresso outline-none transition-colors placeholder:text-slate/40 focus:border-cocoa";

/**
 * High-ticket application. There is no backend yet, so the form composes a
 * fully-written email instead of pretending to submit — the lead still lands
 * in Caro's inbox, and nothing is silently lost.
 */
export function ApplicationForm() {
  const [sent, setSent] = useState(false);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const get = (k: string) => String(data.get(k) ?? "").trim();

    const body = [
      `Nombre: ${get("nombre")}`,
      `Email: ${get("email")}`,
      `Ciudad / país: ${get("ciudad")}`,
      `Programa de interés: ${get("programa")}`,
      "",
      "Dónde estoy hoy:",
      get("contexto"),
      "",
      "Qué quiero lograr:",
      get("objetivo"),
    ].join("\n");

    window.location.href = `mailto:${brand.email}?subject=${encodeURIComponent(
      `Postulación · ${get("programa")} · ${get("nombre")}`,
    )}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  return (
    <section id="postulacion" className="px-5 py-24 lg:px-8 lg:py-32">
      <div className="mx-auto max-w-4xl rounded-4xl border border-line bg-linen/60 p-8 lg:p-14">
        <Reveal>
          <p className="eyebrow text-cocoa">{asesorias.form.eyebrow}</p>
        </Reveal>
        <h2 className="display mt-6 text-4xl text-espresso lg:text-6xl">
          {asesorias.form.title}
        </h2>
        <p className="mt-5 max-w-xl leading-relaxed text-slate">
          {asesorias.form.body}
        </p>

        <form onSubmit={onSubmit} className="mt-10 grid gap-4 sm:grid-cols-2">
          <label className="grid gap-2">
            <span className="mono text-[0.65rem] uppercase tracking-[0.16em] text-slate/60">
              Nombre completo
            </span>
            <input name="nombre" required className={field} placeholder="Tu nombre" />
          </label>

          <label className="grid gap-2">
            <span className="mono text-[0.65rem] uppercase tracking-[0.16em] text-slate/60">
              Email
            </span>
            <input
              name="email"
              type="email"
              required
              className={field}
              placeholder="tu@email.com"
            />
          </label>

          <label className="grid gap-2">
            <span className="mono text-[0.65rem] uppercase tracking-[0.16em] text-slate/60">
              Ciudad y país
            </span>
            <input name="ciudad" required className={field} placeholder="Ciudad, país" />
          </label>

          <label className="grid gap-2">
            <span className="mono text-[0.65rem] uppercase tracking-[0.16em] text-slate/60">
              Programa de interés
            </span>
            <select name="programa" className={field} defaultValue={programs[0]}>
              {programs.map((name) => (
                <option key={name}>{name}</option>
              ))}
              <option>Todavía no lo sé</option>
            </select>
          </label>

          <label className="grid gap-2 sm:col-span-2">
            <span className="mono text-[0.65rem] uppercase tracking-[0.16em] text-slate/60">
              ¿Dónde estás hoy?
            </span>
            <textarea
              name="contexto"
              required
              rows={3}
              className={field}
              placeholder="Cómo te sientes, qué has intentado, qué te tiene atascada."
            />
          </label>

          <label className="grid gap-2 sm:col-span-2">
            <span className="mono text-[0.65rem] uppercase tracking-[0.16em] text-slate/60">
              ¿Qué quieres lograr en tres meses?
            </span>
            <textarea
              name="objetivo"
              required
              rows={3}
              className={field}
              placeholder="Sé concreta. Cuanto más clara seas, mejor puedo evaluarte."
            />
          </label>

          <div className="sm:col-span-2">
            <button
              type="submit"
              className="mono w-full rounded-full bg-espresso px-7 py-4 text-xs uppercase tracking-[0.14em] text-porcelain transition-colors hover:bg-cocoa sm:w-auto"
            >
              Enviar postulación
            </button>
            <p
              aria-live="polite"
              className="mono mt-4 text-xs uppercase tracking-[0.12em] text-slate/60"
            >
              {sent
                ? `Se abrió tu correo con la postulación lista para enviar a ${brand.email}.`
                : "Respondo personalmente en menos de 48 horas."}
            </p>
          </div>
        </form>
      </div>
    </section>
  );
}
