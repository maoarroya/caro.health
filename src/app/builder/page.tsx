import type { Metadata } from "next";
import { Builder } from "@/components/builder/Builder";
import { Login } from "@/components/builder/Login";
import { builderEnabled, isAuthed } from "@/lib/builder-auth";
import { getLanding, storageReady } from "@/lib/landing-store";

export const metadata: Metadata = {
  title: "Builder",
  robots: { index: false, follow: false },
};

// Depende de la sesión y de lo último guardado: nunca se prerenderiza.
export const dynamic = "force-dynamic";

/** El editor de la landing. Se entra con la contraseña de BUILDER_PASSWORD. */
export default async function BuilderPage() {
  if (!builderEnabled()) {
    return (
      <main className="flex min-h-dvh items-center justify-center px-5">
        <div className="max-w-md rounded-4xl border border-line bg-porcelain p-8 text-center">
          <h1 className="display text-4xl text-espresso">Builder sin configurar</h1>
          <p className="mt-4 leading-relaxed text-slate">
            Define la variable de entorno <code className="mono text-sm">BUILDER_PASSWORD</code>{" "}
            con la contraseña de la dueña del sitio y reinicia el servidor.
          </p>
        </div>
      </main>
    );
  }
  if (!(await isAuthed())) return <Login />;
  return <Builder initial={await getLanding()} canSave={storageReady()} />;
}
