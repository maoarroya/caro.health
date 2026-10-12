"use client";

import { useState } from "react";
import { Isotipo } from "@/components/Logo";
import { inputClass } from "@/components/builder/fields";

export function Login() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError("");
    try {
      const res = await fetch("/api/builder/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (res.ok) {
        window.location.reload();
        return;
      }
      const json = (await res.json().catch(() => ({}))) as { error?: string };
      setError(json.error || "No se pudo entrar.");
    } catch {
      setError("No se pudo entrar. Revisa tu conexión.");
    }
    setBusy(false);
  }

  return (
    <main className="flex min-h-dvh items-center justify-center px-5">
      <form
        onSubmit={submit}
        className="w-full max-w-sm rounded-4xl border border-line bg-porcelain p-8 text-center"
      >
        <Isotipo className="mx-auto h-9 w-auto text-cocoa" />
        <h1 className="display mt-6 text-4xl text-espresso">Builder</h1>
        <p className="mt-3 text-sm text-slate">Edita los textos, las fotos y los cursos de la landing.</p>
        <label className="mono mt-8 block text-left text-[0.62rem] uppercase tracking-[0.14em] text-slate">
          Contraseña
          <input
            type="password"
            autoComplete="current-password"
            autoFocus
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={`${inputClass} mt-2 font-sans normal-case tracking-normal`}
          />
        </label>
        {error && (
          <p role="alert" className="mt-3 text-left text-sm text-red-700">
            {error}
          </p>
        )}
        <button
          type="submit"
          disabled={busy}
          className="mono mt-6 w-full rounded-full bg-espresso px-6 py-4 text-xs uppercase tracking-[0.14em] text-porcelain transition-colors hover:bg-cocoa disabled:opacity-60"
        >
          {busy ? "Entrando…" : "Entrar"}
        </button>
      </form>
    </main>
  );
}
