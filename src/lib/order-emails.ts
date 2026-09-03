// Plantillas de correo del pedido del libro (compradora y Caro).
import "server-only";
import { brand, libro, type BookFormat } from "@/lib/content";
import { formatCop } from "@/lib/format";
import type { WompiTransaction } from "@/lib/wompi";
import type { Mail } from "@/lib/mail";

const esc = (s: unknown) =>
  String(s ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

const shippingLines = (tx: WompiTransaction): string[] => {
  const a = tx.shipping_address;
  if (!a) return [];
  return [
    a.name,
    [a.address_line_1, a.address_line_2].filter(Boolean).join(", "),
    [a.city, a.region, a.country].filter(Boolean).join(", "),
    a.postal_code,
    a.phone_number ? `Tel. ${a.phone_number}` : undefined,
  ].filter((l): l is string => Boolean(l && l.trim()));
};

/** Marco HTML compartido: papel de lino, serif para los titulares, un solo acento. */
function layout(title: string, bodyHtml: string): string {
  return `<!doctype html><html lang="es"><body style="margin:0;background:#f4f0ea;padding:32px 16px;font-family:'Helvetica Neue',Arial,sans-serif;color:#2d251f">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr><td align="center">
  <table role="presentation" width="560" cellpadding="0" cellspacing="0" style="max-width:560px;background:#fffdfb;border:1px solid #e6dfdb;border-radius:24px;padding:40px">
    <tr><td style="font-size:11px;letter-spacing:.16em;text-transform:uppercase;color:#806c3e;font-family:Menlo,monospace">${esc(brand.name)} · The CH Method</td></tr>
    <tr><td style="padding-top:18px;font-family:Georgia,'Times New Roman',serif;font-size:30px;line-height:1.1;font-weight:300">${title}</td></tr>
    <tr><td style="padding-top:20px;font-size:16px;line-height:1.6;color:#6c5f56">${bodyHtml}</td></tr>
    <tr><td style="padding-top:32px;border-top:1px solid #e6dfdb;margin-top:32px;font-size:12px;line-height:1.6;color:#6c5f56">
      ${esc(brand.role)} · <a href="mailto:${esc(brand.email)}" style="color:#564539">${esc(brand.email)}</a><br>${esc(brand.tagline)}
    </td></tr>
  </table></td></tr></table></body></html>`;
}

const button = (href: string, label: string) =>
  `<p style="margin:28px 0 8px"><a href="${esc(href)}" style="display:inline-block;background:#2d251f;color:#fffdfb;text-decoration:none;padding:14px 26px;border-radius:999px;font-size:12px;letter-spacing:.14em;text-transform:uppercase;font-family:Menlo,monospace">${esc(label)}</a></p>`;

const summaryHtml = (tx: WompiTransaction, format: BookFormat) =>
  `<p style="margin:20px 0 0;padding:16px 20px;background:#eee9e5;border-radius:16px;font-size:13px;line-height:1.7">
    <strong>Pedido</strong> ${esc(tx.reference)}<br>
    <strong>Formato</strong> ${esc(format.name)}<br>
    <strong>Total</strong> ${esc(formatCop(tx.amount_in_cents / 100))}<br>
    <strong>Medio de pago</strong> ${esc(tx.payment_method_type ?? "Wompi")}
  </p>`;

const summaryText = (tx: WompiTransaction, format: BookFormat) =>
  [
    `Pedido: ${tx.reference}`,
    `Formato: ${format.name}`,
    `Total: ${formatCop(tx.amount_in_cents / 100)}`,
    `Medio de pago: ${tx.payment_method_type ?? "Wompi"}`,
  ].join("\n");

/** A la compradora, cuando Wompi aprueba el pago. */
export function buyerApprovedMail(
  tx: WompiTransaction,
  format: BookFormat,
  opts: { to: string; downloadUrl?: string; downloadDays?: number },
): Mail {
  const { book } = libro;
  const firstName = tx.customer_data?.full_name?.split(" ")[0] || "";
  const hola = firstName ? `Hola, ${esc(firstName)}.` : "Hola.";

  if (format.id === "digital" && opts.downloadUrl) {
    const days = opts.downloadDays ?? 30;
    return {
      to: opts.to,
      replyTo: brand.email,
      subject: `Tu libro: ${book.title} (PDF)`,
      html: layout(
        `Tu ejemplar de <em style="color:#564539">${esc(book.title)}</em> está listo.`,
        `<p style="margin:0">${hola} Gracias por tu compra. Descarga tu libro con el botón de abajo y guárdalo: el enlace es personal y funciona durante ${days} días.</p>
         ${button(opts.downloadUrl, "Descargar el libro (PDF)")}
         <p style="margin:0;font-size:12px;color:#6c5f56">Si el botón no abre, copia este enlace: <a href="${esc(opts.downloadUrl)}" style="color:#564539;word-break:break-all">${esc(opts.downloadUrl)}</a></p>
         ${summaryHtml(tx, format)}
         <p style="margin:20px 0 0">Un consejo de Carohealth: no busques terminarlo rápido. Busca que el libro termine de transformarte a ti.</p>`,
      ),
      text: [
        `${hola.replace(/<[^>]+>/g, "")} Gracias por tu compra de "${book.title}".`,
        "",
        `Descarga tu libro (enlace personal, válido ${days} días):`,
        opts.downloadUrl,
        "",
        summaryText(tx, format),
        "",
        `${brand.name} · ${brand.email}`,
      ].join("\n"),
    };
  }

  const lines = shippingLines(tx);
  return {
    to: opts.to,
    replyTo: brand.email,
    subject: `Recibimos tu pedido: ${book.title} en tapa dura`,
    html: layout(
      `Tu ejemplar en <em style="color:#564539">tapa dura</em> va en camino.`,
      `<p style="margin:0">${hola} Gracias por tu compra. Preparamos el envío y te escribimos a este correo con la guía apenas salga. Llega en 5 a 8 días hábiles.</p>
       ${lines.length ? `<p style="margin:20px 0 0"><strong>Enviaremos a:</strong><br>${lines.map(esc).join("<br>")}</p>` : ""}
       ${summaryHtml(tx, format)}
       <p style="margin:20px 0 0">¿Algún dato de envío está mal? Responde a este correo y lo corregimos antes de despachar.</p>`,
    ),
    text: [
      `${hola.replace(/<[^>]+>/g, "")} Gracias por tu compra de "${book.title}" en tapa dura.`,
      "Preparamos el envío y te escribimos con la guía apenas salga (5 a 8 días hábiles).",
      "",
      lines.length ? `Enviaremos a:\n${lines.join("\n")}\n` : "",
      summaryText(tx, format),
      "",
      `${brand.name} · ${brand.email}`,
    ].join("\n"),
  };
}

/** A Caro, con todo lo necesario para despachar o dar soporte. */
export function merchantOrderMail(
  tx: WompiTransaction,
  format: BookFormat,
  opts: { to: string; buyerEmail: string; sandbox: boolean },
): Mail {
  const lines = shippingLines(tx);
  const name = tx.customer_data?.full_name ?? tx.shipping_address?.name ?? "";
  const phone = tx.customer_data?.phone_number ?? tx.shipping_address?.phone_number ?? "";
  const tag = opts.sandbox ? "[SANDBOX] " : "";
  const dashboard = "https://comercios.wompi.co/transactions";

  return {
    to: opts.to,
    replyTo: opts.buyerEmail,
    subject: `${tag}Nuevo pedido · ${format.name} · ${tx.reference}`,
    html: layout(
      `Nuevo pedido del libro: <em style="color:#564539">${esc(format.name)}</em>.`,
      `<p style="margin:0"><strong>Compradora</strong><br>${esc(name || "—")}<br><a href="mailto:${esc(opts.buyerEmail)}" style="color:#564539">${esc(opts.buyerEmail)}</a>${phone ? `<br>Tel. ${esc(phone)}` : ""}</p>
       ${format.needsShipping ? `<p style="margin:20px 0 0"><strong>Enviar a</strong><br>${lines.length ? lines.map(esc).join("<br>") : "Sin dirección en Wompi: contactar a la compradora"}</p>` : `<p style="margin:20px 0 0">Formato digital: el enlace de descarga ya se envió automáticamente.</p>`}
       ${summaryHtml(tx, format)}
       <p style="margin:20px 0 0;font-size:13px">Transacción Wompi <code>${esc(tx.id)}</code> · <a href="${dashboard}" style="color:#564539">Abrir panel de Wompi</a></p>`,
    ),
    text: [
      `${tag}Nuevo pedido del libro (${format.name})`,
      "",
      `Compradora: ${name || "—"}`,
      `Email: ${opts.buyerEmail}`,
      phone ? `Teléfono: ${phone}` : "",
      "",
      format.needsShipping ? `Enviar a:\n${lines.join("\n") || "Sin dirección en Wompi"}` : "Digital: enlace de descarga enviado automáticamente.",
      "",
      summaryText(tx, format),
      `Transacción Wompi: ${tx.id}`,
      dashboard,
    ].join("\n"),
  };
}
