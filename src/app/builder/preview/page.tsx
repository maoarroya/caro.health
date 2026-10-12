"use client";

import { useEffect, useState } from "react";
import { Landing } from "@/components/Landing";
import { Nav } from "@/components/Nav";
import type { LandingData } from "@/lib/landing";

/**
 * La home dentro del iframe del builder. No lee nada guardado: pinta el
 * borrador que el editor le envía por postMessage y le avisa en qué sección
 * se hizo clic.
 */
export default function BuilderPreview() {
  const [data, setData] = useState<LandingData | null>(null);

  useEffect(() => {
    const editor = window.parent;
    if (editor === window) return;
    const origin = window.location.origin;

    const onMessage = (e: MessageEvent) => {
      if (e.origin !== origin || e.source !== editor) return;
      if (e.data?.type === "landing:data") setData(e.data.data as LandingData);
      if (e.data?.type === "landing:focus") {
        document
          .querySelector(`[data-section="${CSS.escape(String(e.data.id))}"]`)
          ?.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    };

    // Dentro de la vista previa los enlaces no navegan: un clic selecciona la sección.
    const onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("a")) e.preventDefault();
      const section = target.closest<HTMLElement>("[data-section]");
      if (section) editor.postMessage({ type: "landing:select", id: section.dataset.section }, origin);
    };

    window.addEventListener("message", onMessage);
    document.addEventListener("click", onClick, true);
    editor.postMessage({ type: "landing:ready" }, origin);
    return () => {
      window.removeEventListener("message", onMessage);
      document.removeEventListener("click", onClick, true);
    };
  }, []);

  if (!data) return null;
  return (
    <>
      <Nav />
      <main className="flex-1">
        <Landing data={data} preview />
      </main>
    </>
  );
}
