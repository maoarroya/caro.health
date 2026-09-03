import { NextResponse } from "next/server";
import { getTransaction, isSandbox, verifyEventChecksum, type WompiEvent } from "@/lib/wompi";
import { formatFromReference, signDownloadToken } from "@/lib/book-order";
import { mailConfigured, ordersNotifyEmail, sendMail } from "@/lib/mail";
import { buyerApprovedMail, merchantOrderMail } from "@/lib/order-emails";

const DOWNLOAD_DAYS = 30;

/**
 * Wompi webhook — el momento fiable del pedido (la compradora puede cerrar
 * la pestaña antes de volver a /libro/gracias, y PSE aprueba minutos después).
 *
 * Con un evento APPROVED válido:
 *   · envía a la compradora el PDF (enlace firmado) o la confirmación de envío,
 *   · avisa a Caro con los datos para despachar o dar soporte.
 * Wompi reintenta cualquier respuesta distinta de 200, así que solo se rechaza
 * lo que no pasa el checksum.
 */
export async function POST(req: Request) {
  let event: WompiEvent;
  try {
    event = (await req.json()) as WompiEvent;
  } catch {
    return NextResponse.json({ error: "Cuerpo inválido" }, { status: 400 });
  }

  if (!verifyEventChecksum(event)) {
    return NextResponse.json({ error: "Checksum inválido" }, { status: 401 });
  }

  const fromEvent = event.data?.transaction;
  if (event.event !== "transaction.updated" || !fromEvent) {
    return NextResponse.json({ ok: true, ignored: event.event });
  }

  // El checksum ya autentica el evento; la API solo enriquece (nombre, dirección).
  const tx = (await getTransaction(fromEvent.id)) ?? fromEvent;
  const format = formatFromReference(tx.reference);
  const buyerEmail = tx.customer_email ?? fromEvent.customer_email ?? "";

  console.info(
    `[wompi] ${tx.status} ${tx.reference} (${format?.name ?? "?"}) ` +
      `${tx.amount_in_cents / 100} ${tx.currency} · ${buyerEmail || "sin email"} · ${tx.id}`,
  );

  if (tx.status !== "APPROVED" || !format) {
    return NextResponse.json({ ok: true, status: tx.status });
  }

  const origin = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || new URL(req.url).origin;
  const downloadUrl =
    format.id === "digital"
      ? `${origin}/api/libro/descargar?token=${encodeURIComponent(
          signDownloadToken(tx.id, DOWNLOAD_DAYS * 24 * 60 * 60 * 1000),
        )}`
      : undefined;

  const results = await Promise.all([
    buyerEmail
      ? sendMail(buyerApprovedMail(tx, format, { to: buyerEmail, downloadUrl, downloadDays: DOWNLOAD_DAYS }))
      : Promise.resolve({ ok: false, error: "La transacción no trae email de la compradora" }),
    sendMail(merchantOrderMail(tx, format, { to: ordersNotifyEmail(), buyerEmail, sandbox: isSandbox() })),
  ]);

  return NextResponse.json({
    ok: true,
    status: tx.status,
    mail: mailConfigured() ? { buyer: results[0].ok, merchant: results[1].ok } : "no configurado",
  });
}
