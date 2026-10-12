import { NextResponse } from "next/server";
import { isAuthed } from "@/lib/builder-auth";
import { youtubeId } from "@/lib/landing";

/** Título de un video de YouTube (oEmbed), para rellenar el nombre de la clase. */
export async function GET(req: Request) {
  if (!(await isAuthed())) return NextResponse.json({ error: "No autorizado." }, { status: 401 });

  const id = youtubeId(new URL(req.url).searchParams.get("id") ?? "");
  if (!id) return NextResponse.json({ error: "Enlace de YouTube inválido." }, { status: 400 });

  try {
    const watch = encodeURIComponent(`https://www.youtube.com/watch?v=${id}`);
    const res = await fetch(`https://www.youtube.com/oembed?format=json&url=${watch}`, {
      signal: AbortSignal.timeout(5000),
    });
    if (!res.ok) {
      return NextResponse.json(
        { error: "YouTube no reconoce ese video. Revisa que sea público o no listado." },
        { status: 404 },
      );
    }
    const meta = (await res.json()) as { title?: string };
    return NextResponse.json({ title: String(meta.title ?? "").slice(0, 160) });
  } catch {
    return NextResponse.json({ error: "No pude consultar YouTube." }, { status: 502 });
  }
}
