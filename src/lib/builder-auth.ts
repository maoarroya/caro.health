// Acceso al builder: una contraseña y una cookie firmada.
import "server-only";
import { createHash, createHmac, scryptSync, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

const COOKIE = "builder_session";
const TTL_S = 30 * 24 * 60 * 60;

// La contraseña del builder va fija en el código, pero como huella scrypt: el
// repo es público y el texto plano no debe quedar a la vista. Para cambiarla
// sin tocar código, define BUILDER_PASSWORD (tiene prioridad).
// La sesión es otra derivación de la misma contraseña (`sessionSalt`); aquí
// solo se guarda su sha256, así que nada de este archivo sirve para fabricar
// una cookie válida.
const BURNED = {
  salt: "f035e2028f1afcf1a773f66a2e06cf10",
  hash: "339fa7df6c91b675360e78c301fa3c99f6f6a3d08fe8aa1ea28c4a4003c21855",
  sessionSalt: "59c028c8a0e3c7c5f8071f539df58a78",
  sessionHash: "eecc5690963be3ac94d402aebc387806820ad45445af33430df00c36f40cdbc0",
};

const override = () => process.env.BUILDER_PASSWORD || "";

export const builderEnabled = () => true;

const digest = (value: string) => createHash("sha256").update(value).digest();
const same = (a: Buffer, b: Buffer) => a.length === b.length && timingSafeEqual(a, b);

export function checkPassword(candidate: string): boolean {
  if (override()) return same(digest(candidate), digest(override()));
  return same(scryptSync(candidate, BURNED.salt, 32), Buffer.from(BURNED.hash, "hex"));
}

/** El valor de la cookie: solo se puede calcular conociendo la contraseña. */
const sessionToken = (password: string) =>
  override()
    ? createHmac("sha256", override()).update("builder-session").digest("base64url")
    : scryptSync(password, BURNED.sessionSalt, 32).toString("base64url");

/** Llamar solo después de `checkPassword(password)`. */
export async function startSession(password: string): Promise<void> {
  (await cookies()).set(COOKIE, sessionToken(password), {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: TTL_S,
  });
}

export async function endSession(): Promise<void> {
  (await cookies()).delete(COOKIE);
}

export async function isAuthed(): Promise<boolean> {
  const value = (await cookies()).get(COOKIE)?.value;
  if (!value) return false;
  if (override()) return same(Buffer.from(value), Buffer.from(sessionToken("")));
  return same(digest(value), Buffer.from(BURNED.sessionHash, "hex"));
}
