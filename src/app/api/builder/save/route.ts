import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { isAuthed } from "@/lib/builder-auth";
import { sanitizeLanding } from "@/lib/landing";
import { saveLanding, storageReady } from "@/lib/landing-store";

/** Publica la landing: sanea lo que llega, lo guarda y regenera las páginas. */
export async function POST(req: Request) {
  if (!(await isAuthed())) {
    return NextResponse.json({ error: "Tu sesión venció. Vuelve a entrar." }, { status: 401 });
  }
  if (!storageReady()) {
    return NextResponse.json(
      { error: "Falta configurar el almacenamiento (BLOB_READ_WRITE_TOKEN) para poder guardar." },
      { status: 503 },
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Solicitud inválida." }, { status: 400 });
  }

  const data = sanitizeLanding(body);
  try {
    await saveLanding(data);
  } catch (error) {
    console.error("[builder] no se pudo guardar", error);
    return NextResponse.json({ error: "No se pudo guardar. Inténtalo de nuevo." }, { status: 500 });
  }

  // La home y las páginas que comparten el llamado final.
  revalidatePath("/", "layout");
  return NextResponse.json({ data });
}
