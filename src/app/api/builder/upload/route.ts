import { NextResponse } from "next/server";
import { isAuthed } from "@/lib/builder-auth";
import { saveUpload, storageReady } from "@/lib/landing-store";

// El builder reduce la foto a JPEG antes de enviarla; esto es el tope de seguridad.
const MAX_BYTES = 4 * 1024 * 1024;

export async function POST(req: Request) {
  if (!(await isAuthed())) {
    return NextResponse.json({ error: "Tu sesión venció. Vuelve a entrar." }, { status: 401 });
  }
  if (!storageReady()) {
    return NextResponse.json(
      { error: "Falta configurar el almacenamiento (BLOB_READ_WRITE_TOKEN) para subir fotos." },
      { status: 503 },
    );
  }

  let file: FormDataEntryValue | null;
  try {
    file = (await req.formData()).get("file");
  } catch {
    return NextResponse.json({ error: "Solicitud inválida." }, { status: 400 });
  }
  if (!(file instanceof File)) {
    return NextResponse.json({ error: "No llegó ninguna foto." }, { status: 400 });
  }
  if (file.size > MAX_BYTES) {
    return NextResponse.json({ error: "La foto pesa demasiado." }, { status: 413 });
  }

  const bytes = Buffer.from(await file.arrayBuffer());
  const isJpeg = bytes.length > 3 && bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff;
  if (!isJpeg) {
    return NextResponse.json({ error: "Formato de imagen no admitido." }, { status: 415 });
  }

  try {
    return NextResponse.json({ src: await saveUpload(bytes) });
  } catch (error) {
    console.error("[builder] no se pudo subir la foto", error);
    return NextResponse.json({ error: "No se pudo subir la foto." }, { status: 500 });
  }
}
