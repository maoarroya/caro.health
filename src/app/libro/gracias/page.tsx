import type { Metadata } from "next";
import Link from "next/link";
import { brand, libro } from "@/lib/content";
import { formatCop } from "@/lib/format";
import { getTransaction, isConfigured, isSandbox, type WompiTransaction } from "@/lib/wompi";
import { mailConfigured } from "@/lib/mail";
import { formatFromReference, signDownloadToken } from "@/lib/book-order";
import { Sprig } from "@/components/Sprig";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Tu pedido",
  robots: { index: false },
};

export const dynamic = "force-dynamic";

type Search = Promise<{ id?: string }>;

const button =
  "mono inline-block rounded-full bg-espresso px-7 py-4 text-xs uppercase tracking-[0.14em] text-porcelain transition-colors hover:bg-cocoa";
const ghost =
  "mono inline-block rounded-full border border-espresso/20 px-7 py-4 text-xs uppercase tracking-[0.14em] text-espresso transition-colors hover:border-cocoa hover:text-cocoa";

function Shell({ eyebrow, title, children }: { eyebrow: string; title: React.ReactNode; children: React.ReactNode }) {
  return (
    <section className="px-5 pt-32 pb-24 lg:px-8 lg:pt-40 lg:pb-32">
      <div className="mx-auto max-w-3xl">
        <Reveal>
          <p className="eyebrow flex items-center gap-3 text-cocoa">
            <Sprig className="h-4 w-4" />
            {eyebrow}
          </p>
        </Reveal>
        <Reveal delay={0.05}>
          <h1 className="display mt-7 text-5xl text-espresso sm:text-6xl lg:text-7xl">{title}</h1>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="mt-9 space-y-5 text-lg leading-relaxed text-slate">{children}</div>
        </Reveal>
      </div>
    </section>
  );
}

function Summary({ tx }: { tx: WompiTransaction }) {
  const format = formatFromReference(tx.reference);
  return (
    <dl className="mono grid gap-2 rounded-3xl border border-line bg-porcelain p-6 text-xs uppercase tracking-[0.12em] text-slate sm:grid-cols-2">
      <div>
        <dt className="text-slate/50">Pedido</dt>
        <dd className="mt-1 text-espresso">{tx.reference}</dd>
      </div>
      <div>
        <dt className="text-slate/50">Formato</dt>
        <dd className="mt-1 text-espresso">{format?.name ?? "Libro"}</dd>
      </div>
      <div>
        <dt className="text-slate/50">Total</dt>
        <dd className="mt-1 text-espresso">{formatCop(tx.amount_in_cents / 100)}</dd>
      </div>
      <div>
        <dt className="text-slate/50">Estado</dt>
        <dd className="mt-1 text-espresso">{tx.status}</dd>
      </div>
    </dl>
  );
}

export default async function GraciasPage({ searchParams }: { searchParams: Promise<Awaited<Search>> }) {
  const { id } = await searchParams;
  const tx = id && isConfigured() ? await getTransaction(id) : null;

  if (!tx) {
    return (
      <Shell eyebrow="Tu pedido" title="No encontramos este pago.">
        <p>
          Si acabas de pagar, espera un momento y vuelve a abrir el enlace que te dio Wompi.
          Si el problema sigue, escríbenos con tu comprobante y lo resolvemos hoy mismo.
        </p>
        <div className="flex flex-wrap gap-3 pt-2">
          <Link href="/libro#comprar" className={button}>Volver al libro</Link>
          <a href={`mailto:${brand.email}?subject=${encodeURIComponent("Pedido del libro · Ayuda")}`} className={ghost}>
            Escribir a {brand.email}
          </a>
        </div>
      </Shell>
    );
  }

  const format = formatFromReference(tx.reference);

  if (tx.status === "APPROVED") {
    const digital = format?.id === "digital";
    return (
      <Shell
        eyebrow="Pago aprobado"
        title={
          <>
            Gracias. <em>Bienvenida</em> a tu frecuencia más alta.
          </>
        }
      >
        <Summary tx={tx} />
        {digital ? (
          <>
            <p>
              Tu ejemplar de <em className="text-cocoa">{libro.book.title}</em> está listo. El enlace
              es personal y funciona durante siete días; guarda el PDF apenas lo descargues.
            </p>
            <a href={`/api/libro/descargar?token=${encodeURIComponent(signDownloadToken(tx.id))}`} className={button}>
              Descargar el libro (PDF)
            </a>
            {mailConfigured() && tx.customer_email && (
              <p className="mono text-xs uppercase tracking-[0.12em] text-slate/60">
                También te enviamos el enlace a {tx.customer_email}.
              </p>
            )}
          </>
        ) : (
          <>
            <p>
              Tu ejemplar en tapa dura sale en camino a la dirección que registraste en el pago.
              Llega en 5 a 8 días hábiles; te escribimos al correo del pedido con la guía de envío.
            </p>
            {mailConfigured() && tx.customer_email && (
              <p className="mono text-xs uppercase tracking-[0.12em] text-slate/60">
                Enviamos la confirmación a {tx.customer_email}.
              </p>
            )}
            <Link href="/" className={button}>Volver al inicio</Link>
          </>
        )}
        {isSandbox() && (
          <p className="mono text-xs uppercase tracking-[0.12em] text-gold-ink">Pago de prueba (sandbox)</p>
        )}
      </Shell>
    );
  }

  if (tx.status === "PENDING") {
    return (
      <Shell eyebrow="Pago en proceso" title="Estamos confirmando tu pago.">
        <Summary tx={tx} />
        <p>
          Algunos medios de pago (PSE, transferencias) tardan unos minutos en confirmarse.
          Recarga esta página en un momento; no necesitas pagar de nuevo.
        </p>
        <a href={`/libro/gracias?id=${encodeURIComponent(tx.id)}`} className={button}>Actualizar estado</a>
      </Shell>
    );
  }

  return (
    <Shell eyebrow="Pago no completado" title="El pago no se aprobó.">
      <Summary tx={tx} />
      <p>
        {tx.status_message || "Tu banco o el medio de pago rechazó la transacción."} No se hizo
        ningún cobro. Puedes intentarlo de nuevo con otro medio de pago.
      </p>
      <div className="flex flex-wrap gap-3 pt-2">
        <Link href="/libro#comprar" className={button}>Intentar de nuevo</Link>
        <a href={`mailto:${brand.email}?subject=${encodeURIComponent(`Pedido ${tx.reference} · Ayuda`)}`} className={ghost}>
          Necesito ayuda
        </a>
      </div>
    </Shell>
  );
}
