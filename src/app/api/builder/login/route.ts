import { NextResponse } from "next/server";
import { builderEnabled, checkPassword, endSession, startSession } from "@/lib/builder-auth";

/** Abre la sesión del builder con la contraseña de BUILDER_PASSWORD. */
export async function POST(req: Request) {
  if (!builderEnabled()) {
    return NextResponse.json({ error: "El builder no está configurado." }, { status: 503 });
  }
  let candidate = "";
  try {
    candidate = String(((await req.json()) as { password?: unknown }).password ?? "");
  } catch {
    return NextResponse.json({ error: "Solicitud inválida." }, { status: 400 });
  }
  if (!checkPassword(candidate)) {
    // Frena los intentos en serie.
    await new Promise((resolve) => setTimeout(resolve, 700));
    return NextResponse.json({ error: "Contraseña incorrecta." }, { status: 401 });
  }
  await startSession(candidate);
  return NextResponse.json({ ok: true });
}

export async function DELETE() {
  await endSession();
  return NextResponse.json({ ok: true });
}
