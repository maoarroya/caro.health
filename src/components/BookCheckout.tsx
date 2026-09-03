"use client";

import { useState } from "react";
import { libro, brand, type BookFormatId } from "@/lib/content";
import { formatCop } from "@/lib/format";
import { Sprig } from "@/components/Sprig";
import { Reveal } from "@/components/Reveal";

const field =
  "mono w-full rounded-2xl border border-line-strong bg-porcelain px-5 py-4 text-sm text-espresso outline-none transition-colors placeholder:text-slate/40 focus:border-cocoa";
const label = "mono text-[0.65rem] uppercase tracking-[0.16em] text-slate/60";

/**
 * Book checkout. Collects buyer data, asks the server for a signed Wompi
 * link and hands the browser to Wompi. Wompi sends the buyer back to
 * /libro/gracias, which verifies the payment and delivers the PDF.
 */
export function BookCheckout({ initial = "digital" }: { initial?: BookFormatId }) {
  const [formatId, setFormatId] = useState<BookFormatId>(initial);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const format = libro.book.formats.find((f) => f.id === formatId)!;

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setBusy(true);
    const data = Object.fromEntries(new FormData(e.currentTarget).entries());
    try {
      const res = await fetch("/api/wompi/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, format: formatId }),
      });
      const json = (await res.json()) as { url?: string; error?: string };
      if (!res.ok || !json.url) throw new Error(json.error || "No pudimos iniciar el pago.");
      window.location.assign(json.url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "No pudimos iniciar el pago.");
      setBusy(false);
    }
  };

  return (
    <section id="comprar" className="scroll-mt-24 px-5 py-24 lg:px-8 lg:py-32">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <Reveal>
            <p className="eyebrow flex items-center gap-3 text-cocoa">
              <Sprig className="h-4 w-4" />
              Compra el libro
            </p>
          </Reveal>
          <h2 className="display mt-6 text-5xl text-espresso lg:text-6xl">
            Elige tu formato y <em>paga con Wompi</em>.
          </h2>
          <Reveal delay={0.1}>
            <p className="mt-7 max-w-md text-lg leading-relaxed text-slate">
              Pago seguro en pesos colombianos con tarjeta, PSE, Nequi o Bancolombia. El
              digital se descarga al instante; la tapa dura llega a tu casa.
            </p>
          </Reveal>

          <div className="mt-10 grid gap-3">
            {libro.book.formats.map((f) => {
              const on = f.id === formatId;
              return (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => setFormatId(f.id)}
                  aria-pressed={on}
                  className={`flex items-center justify-between gap-6 rounded-3xl border p-6 text-left transition-colors ${
                    on ? "border-cocoa bg-porcelain" : "border-line bg-porcelain/50 hover:border-line-strong"
                  }`}
                >
                  <span>
                    <span className="display block text-3xl text-espresso">{f.name}</span>
                    <span className="mono mt-1 block text-[0.65rem] uppercase tracking-[0.12em] text-slate/60">
                      {f.note}
                    </span>
                  </span>
                  <span className="display shrink-0 text-3xl text-espresso">{formatCop(f.priceCop)}</span>
                </button>
              );
            })}
          </div>
        </div>

        <form
          onSubmit={onSubmit}
          className="grid gap-4 rounded-4xl border border-line bg-linen/60 p-8 sm:grid-cols-2 lg:p-12"
        >
          <p className="mono sm:col-span-2 text-[0.65rem] uppercase tracking-[0.16em] text-cocoa">
            {format.name} · {formatCop(format.priceCop)}
          </p>

          <label className="grid gap-2">
            <span className={label}>Nombre completo</span>
            <input name="fullName" required minLength={3} className={field} placeholder="Tu nombre" autoComplete="name" />
          </label>
          <label className="grid gap-2">
            <span className={label}>Email</span>
            <input name="email" type="email" required className={field} placeholder="tu@email.com" autoComplete="email" />
          </label>

          {format.needsShipping ? (
            <>
              <label className="grid gap-2 sm:col-span-2">
                <span className={label}>Dirección de envío</span>
                <input name="address" required className={field} placeholder="Calle, número, apto" autoComplete="street-address" />
              </label>
              <label className="grid gap-2">
                <span className={label}>Ciudad</span>
                <input name="city" required className={field} placeholder="Ciudad" autoComplete="address-level2" />
              </label>
              <label className="grid gap-2">
                <span className={label}>Departamento</span>
                <input name="region" required className={field} placeholder="Departamento" autoComplete="address-level1" />
              </label>
              <label className="grid gap-2">
                <span className={label}>Teléfono</span>
                <input name="phone" type="tel" required className={field} placeholder="3001234567" autoComplete="tel" />
              </label>
              <label className="grid gap-2">
                <span className={label}>Código postal (opcional)</span>
                <input name="postalCode" className={field} placeholder="110111" autoComplete="postal-code" />
              </label>
            </>
          ) : (
            <label className="grid gap-2 sm:col-span-2">
              <span className={label}>Teléfono (opcional)</span>
              <input name="phone" type="tel" className={field} placeholder="3001234567" autoComplete="tel" />
            </label>
          )}

          <div className="sm:col-span-2">
            <button
              type="submit"
              disabled={busy}
              className="mono w-full rounded-full bg-espresso px-7 py-4 text-xs uppercase tracking-[0.14em] text-porcelain transition-colors hover:bg-cocoa disabled:opacity-60 sm:w-auto"
            >
              {busy ? "Abriendo Wompi…" : `Pagar ${formatCop(format.priceCop)} con Wompi`}
            </button>
            <p aria-live="polite" className="mono mt-4 text-xs uppercase tracking-[0.12em] text-slate/60">
              {error ?? format.delivery}
            </p>
            {error && (
              <p className="mono mt-2 text-xs uppercase tracking-[0.12em] text-slate/60">
                ¿Sigue fallando? Escríbenos a {brand.email}.
              </p>
            )}
          </div>
        </form>
      </div>
    </section>
  );
}
