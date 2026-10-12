import { readFile } from "node:fs/promises";
import path from "node:path";
import { UPLOADS_DIR } from "@/lib/landing-store";

const NAME = /^[a-f0-9]{16,40}\.jpg$/;

/** Sirve las fotos subidas desde el builder cuando se guardan en disco. */
export async function GET(_req: Request, { params }: { params: Promise<{ file: string }> }) {
  const { file } = await params;
  if (!NAME.test(file)) return new Response("Not found", { status: 404 });
  try {
    const bytes = await readFile(path.join(UPLOADS_DIR, file));
    return new Response(new Uint8Array(bytes), {
      headers: {
        "Content-Type": "image/jpeg",
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch {
    return new Response("Not found", { status: 404 });
  }
}
