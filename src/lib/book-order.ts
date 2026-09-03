// Pedido del libro: formatos, referencias de pago y tokens de descarga.
import "server-only";
import { createHmac, randomBytes, timingSafeEqual } from "node:crypto";
import { libro, type BookFormat, type BookFormatId } from "@/lib/content";

export const getFormat = (id: string): BookFormat | undefined =>
  libro.book.formats.find((f) => f.id === id);

const REF_PREFIX = "LIBRO";
const refTag: Record<BookFormatId, string> = { digital: "DIG", fisico: "FIS" };

/** LIBRO-DIG-m1x9k2-4f3a — legible en el panel de Wompi y parseable aquí. */
export function makeReference(format: BookFormatId): string {
  return `${REF_PREFIX}-${refTag[format]}-${Date.now().toString(36)}-${randomBytes(2).toString("hex")}`;
}

export function formatFromReference(reference: string): BookFormat | undefined {
  const tag = reference.split("-")[1];
  const id = (Object.keys(refTag) as BookFormatId[]).find((k) => refTag[k] === tag);
  return id ? getFormat(id) : undefined;
}

// ---- Descarga protegida ---------------------------------------------------

const secret = () =>
  process.env.BOOK_DOWNLOAD_SECRET || process.env.WOMPI_INTEGRITY_SECRET || process.env.WOMPI_INTEGRITY_KEY || "";

const b64 = (s: string) => Buffer.from(s, "utf8").toString("base64url");
const unb64 = (s: string) => Buffer.from(s, "base64url").toString("utf8");
const mac = (payload: string) => createHmac("sha256", secret()).update(payload).digest("base64url");

export const DOWNLOAD_TOKEN_TTL_MS = 7 * 24 * 60 * 60 * 1000;

/** token = base64url("<transactionId>.<expiresAt>") + "." + HMAC */
export function signDownloadToken(transactionId: string, ttlMs = DOWNLOAD_TOKEN_TTL_MS): string {
  const payload = `${transactionId}.${Date.now() + ttlMs}`;
  return `${b64(payload)}.${mac(payload)}`;
}

export function verifyDownloadToken(token: string): { transactionId: string } | null {
  if (!secret()) return null;
  const [encoded, sig] = token.split(".");
  if (!encoded || !sig) return null;
  let payload: string;
  try {
    payload = unb64(encoded);
  } catch {
    return null;
  }
  const expected = mac(payload);
  const a = Buffer.from(expected);
  const b = Buffer.from(sig);
  if (a.length !== b.length || !timingSafeEqual(a, b)) return null;
  const idx = payload.lastIndexOf(".");
  const transactionId = payload.slice(0, idx);
  const expiresAt = Number(payload.slice(idx + 1));
  if (!transactionId || !Number.isFinite(expiresAt) || Date.now() > expiresAt) return null;
  return { transactionId };
}

/** Where the PDF lives — outside /public so it is never served without a paid token. */
export const bookPdfPath = () =>
  process.env.BOOK_PDF_PATH || `${process.cwd()}/private/libro.pdf`;

/**
 * Remote private copy of the PDF (Vercel Blob, S3 presigned URL, Supabase
 * private bucket…). Needed on hosts without a persistent disk: the repo is
 * public, so the file is git-ignored and never reaches the deploy.
 */
export const bookPdfUrl = () => process.env.BOOK_PDF_URL || "";

export const BOOK_PDF_FILENAME = "Tu-puedes-ser-libre-Carolina-Velasquez.pdf";
