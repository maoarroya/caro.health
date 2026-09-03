import { stat } from "node:fs/promises";
import { NextResponse } from "next/server";
import { isConfigured, isSandbox } from "@/lib/wompi";
import { bookPdfPath, bookPdfUrl } from "@/lib/book-order";
import { mailConfigured, mailFrom, ordersNotifyEmail } from "@/lib/mail";

export const dynamic = "force-dynamic";

/**
 * Semáforo de configuración (sin secretos). Ábrelo tras pegar las llaves:
 * todo en `true` = la venta del libro funciona de punta a punta.
 */
export async function GET() {
  const pdf = await stat(bookPdfPath()).then((s) => s.size).catch(() => 0);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || null;

  const checks = {
    wompi: {
      keys: isConfigured(),
      environment: isConfigured() ? (isSandbox() ? "sandbox" : "production") : null,
      eventsSecret: Boolean(process.env.WOMPI_EVENTS_SECRET),
      webhookUrl: siteUrl ? `${siteUrl.replace(/\/$/, "")}/api/wompi/events` : "(define NEXT_PUBLIC_SITE_URL)",
    },
    mail: {
      resend: mailConfigured(),
      from: mailFrom(),
      ordersNotifyEmail: ordersNotifyEmail(),
    },
    book: {
      pdfPresent: pdf > 0 || Boolean(bookPdfUrl()),
      pdfSource: pdf > 0 ? "archivo local" : bookPdfUrl() ? "BOOK_PDF_URL" : null,
      pdfBytes: pdf,
      downloadSecret: Boolean(process.env.BOOK_DOWNLOAD_SECRET || process.env.WOMPI_INTEGRITY_SECRET || process.env.WOMPI_INTEGRITY_KEY),
    },
    siteUrl,
  };

  const ready =
    checks.wompi.keys && checks.wompi.eventsSecret && checks.mail.resend && checks.book.pdfPresent && Boolean(siteUrl);

  return NextResponse.json({ ready, ...checks });
}
