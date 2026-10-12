// Dónde vive lo que se edita en /builder.
//  · Con BLOB_READ_WRITE_TOKEN (Vercel Blob): cada guardado es un JSON nuevo y
//    las fotos subidas quedan en el mismo store. Necesario en hosting sin disco.
//  · Sin él: ./data/landing.json y ./data/uploads en el disco del servidor.
import "server-only";
import { randomBytes } from "node:crypto";
import { mkdir, readFile, rename, writeFile } from "node:fs/promises";
import path from "node:path";
import { defaultLanding, sanitizeLanding, type LandingData } from "@/lib/landing";

const DATA_DIR = path.join(process.cwd(), "data");
const DATA_FILE = path.join(DATA_DIR, "landing.json");
export const UPLOADS_DIR = path.join(DATA_DIR, "uploads");

const BLOB_DATA_PREFIX = "landing/data-";
const BLOB_HISTORY = 10;

const blobEnabled = () => Boolean(process.env.BLOB_READ_WRITE_TOKEN);

/** En Vercel el disco es de solo lectura: sin Blob no hay dónde guardar. */
export const storageReady = () => blobEnabled() || !process.env.VERCEL;

async function readStored(): Promise<unknown> {
  if (blobEnabled()) {
    const { list } = await import("@vercel/blob");
    const { blobs } = await list({ prefix: BLOB_DATA_PREFIX });
    const latest = blobs.sort((a, b) => b.pathname.localeCompare(a.pathname))[0];
    if (!latest) return null;
    const res = await fetch(latest.url);
    return res.ok ? res.json() : null;
  }
  try {
    return JSON.parse(await readFile(DATA_FILE, "utf8"));
  } catch {
    return null;
  }
}

export async function getLanding(): Promise<LandingData> {
  try {
    const stored = await readStored();
    return stored ? sanitizeLanding(stored) : defaultLanding;
  } catch (error) {
    console.error("[landing] no pude leer lo guardado; uso el contenido por defecto", error);
    return defaultLanding;
  }
}

export async function saveLanding(data: LandingData): Promise<void> {
  const json = JSON.stringify(data);
  if (blobEnabled()) {
    const { put, list, del } = await import("@vercel/blob");
    // Nombre nuevo en cada guardado: la CDN de Blob nunca sirve una versión vieja.
    // El timestamp va con ancho fijo para que el orden alfabético sea el cronológico.
    await put(`${BLOB_DATA_PREFIX}${String(Date.now()).padStart(15, "0")}.json`, json, {
      access: "public",
      contentType: "application/json",
      addRandomSuffix: false,
    });
    const { blobs } = await list({ prefix: BLOB_DATA_PREFIX });
    const stale = blobs
      .sort((a, b) => b.pathname.localeCompare(a.pathname))
      .slice(BLOB_HISTORY)
      .map((blob) => blob.url);
    if (stale.length) await del(stale);
    return;
  }
  await mkdir(DATA_DIR, { recursive: true });
  const tmp = `${DATA_FILE}.${randomBytes(4).toString("hex")}.tmp`;
  await writeFile(tmp, json, "utf8");
  await rename(tmp, DATA_FILE);
}

/** Guarda un JPEG ya reducido por el builder y devuelve el `src` que usará la página. */
export async function saveUpload(bytes: Buffer): Promise<string> {
  const name = `${randomBytes(12).toString("hex")}.jpg`;
  if (blobEnabled()) {
    const { put } = await import("@vercel/blob");
    const blob = await put(`landing/uploads/${name}`, bytes, {
      access: "public",
      contentType: "image/jpeg",
      addRandomSuffix: false,
    });
    return blob.url;
  }
  await mkdir(UPLOADS_DIR, { recursive: true });
  await writeFile(path.join(UPLOADS_DIR, name), bytes);
  return `/media/${name}`;
}
