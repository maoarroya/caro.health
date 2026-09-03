import { stat, readFile } from "node:fs/promises";
import { NextResponse } from "next/server";
import { getTransaction } from "@/lib/wompi";
import {
  BOOK_PDF_FILENAME,
  bookPdfPath,
  bookPdfUrl,
  formatFromReference,
  verifyDownloadToken,
} from "@/lib/book-order";

/**
 * Serves the PDF only with a valid signed token AND a transaction that Wompi
 * still reports as APPROVED for the digital format.
 */
export async function GET(req: Request) {
  const token = new URL(req.url).searchParams.get("token") ?? "";
  const claim = verifyDownloadToken(token);
  if (!claim) {
    return NextResponse.json({ error: "Enlace inválido o vencido." }, { status: 403 });
  }

  const tx = await getTransaction(claim.transactionId);
  const format = tx ? formatFromReference(tx.reference) : undefined;
  if (!tx || tx.status !== "APPROVED" || format?.id !== "digital") {
    return NextResponse.json({ error: "No encontramos un pago aprobado para este enlace." }, { status: 403 });
  }

  const file = await loadPdf();
  if (!file) {
    return NextResponse.json(
      { error: "El archivo del libro aún no está disponible. Escríbenos y te lo enviamos." },
      { status: 404 },
    );
  }

  return new Response(new Uint8Array(file), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Length": String(file.byteLength),
      "Content-Disposition": `attachment; filename="${BOOK_PDF_FILENAME}"`,
      "Cache-Control": "private, no-store",
    },
  });
}

/** Local file first; otherwise the private remote copy (BOOK_PDF_URL). */
async function loadPdf(): Promise<Buffer | null> {
  const path = bookPdfPath();
  const local = await stat(path).then(() => true).catch(() => false);
  if (local) return readFile(path);

  const url = bookPdfUrl();
  if (!url) return null;
  try {
    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) return null;
    return Buffer.from(await res.arrayBuffer());
  } catch {
    return null;
  }
}
