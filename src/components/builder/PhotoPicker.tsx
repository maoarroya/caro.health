"use client";

import { useEffect, useRef, useState } from "react";
import { IconUpload, IconX } from "@tabler/icons-react";
import { Frame } from "@/components/Frame";
import { PHOTOS, type Photo } from "@/lib/photos";
import { toImg, type Img } from "@/lib/landing";

const ARCHIVE = Object.values(PHOTOS);

const SETS: { id: Photo["set"] | "all"; label: string }[] = [
  { id: "all", label: "Todo" },
  { id: "studio", label: "Estudio" },
  { id: "lilac", label: "Lila" },
  { id: "ballet", label: "Ballet" },
  { id: "black", label: "Negro" },
  { id: "home", label: "En casa" },
  { id: "portrait", label: "Retratos" },
  { id: "detail", label: "Detalles" },
];

// Lado mayor al que se reduce una foto antes de subirla: de sobra para pantalla
// completa y liviano para subir desde el celular.
const MAX_SIDE = 2400;

/** Reduce la foto a JPEG en el navegador y genera su vista previa borrosa. */
async function prepare(file: File): Promise<{ blob: Blob; w: number; h: number; blur: string }> {
  const bitmap = await createImageBitmap(file, { imageOrientation: "from-image" }).catch(
    () => null,
  );
  if (!bitmap) throw new Error("No pude leer esa imagen. Prueba con un JPG o PNG.");

  const scale = Math.min(1, MAX_SIDE / Math.max(bitmap.width, bitmap.height));
  const w = Math.round(bitmap.width * scale);
  const h = Math.round(bitmap.height * scale);

  const draw = (width: number, height: number) => {
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("Tu navegador no pudo procesar la imagen.");
    // Fondo claro por si el PNG trae transparencia.
    ctx.fillStyle = "#fffdfb";
    ctx.fillRect(0, 0, width, height);
    ctx.imageSmoothingQuality = "high";
    ctx.drawImage(bitmap, 0, 0, width, height);
    return canvas;
  };

  const blob = await new Promise<Blob | null>((resolve) =>
    draw(w, h).toBlob(resolve, "image/jpeg", 0.86),
  );
  if (!blob) throw new Error("Tu navegador no pudo procesar la imagen.");
  const blur = draw(16, Math.max(1, Math.round((16 * h) / w))).toDataURL("image/jpeg", 0.6);
  bitmap.close();
  return { blob, w, h, blur };
}

export function PhotoPicker({
  onPick,
  onClose,
}: {
  onPick: (photo: Img) => void;
  onClose: () => void;
}) {
  const [set, setSet] = useState<Photo["set"] | "all">("all");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  async function upload(file: File) {
    setBusy(true);
    setError("");
    try {
      const { blob, w, h, blur } = await prepare(file);
      const form = new FormData();
      form.append("file", blob, "foto.jpg");
      const res = await fetch("/api/builder/upload", { method: "POST", body: form });
      const json = (await res.json().catch(() => ({}))) as { src?: string; error?: string };
      if (!res.ok || !json.src) throw new Error(json.error || "No se pudo subir la foto.");
      onPick({ src: json.src, w, h, blur });
    } catch (e) {
      setError(e instanceof Error ? e.message : "No se pudo subir la foto.");
      setBusy(false);
    }
  }

  const photos = set === "all" ? ARCHIVE : ARCHIVE.filter((photo) => photo.set === set);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Elegir foto"
      className="fixed inset-0 z-100 flex items-end justify-center bg-espresso/55 backdrop-blur-sm sm:items-center sm:p-6"
      onClick={onClose}
    >
      <div
        className="flex max-h-[92dvh] w-full max-w-3xl flex-col overflow-hidden rounded-t-4xl bg-porcelain sm:rounded-4xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-line px-6 py-4">
          <p className="display text-2xl text-espresso">Elige una foto</p>
          <button
            type="button"
            aria-label="Cerrar"
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-line-strong text-espresso transition-colors hover:bg-espresso hover:text-porcelain"
          >
            <IconX size={16} />
          </button>
        </div>

        <div className="overflow-y-auto p-6">
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              e.target.value = "";
              if (file) upload(file);
            }}
          />
          <button
            type="button"
            disabled={busy}
            onClick={() => fileRef.current?.click()}
            className="flex w-full items-center justify-center gap-3 rounded-2xl border border-dashed border-line-strong px-5 py-6 text-sm text-espresso transition-colors hover:border-cocoa hover:bg-cream/60 disabled:opacity-60"
          >
            <IconUpload size={18} />
            {busy ? "Subiendo…" : "Subir una foto desde tu dispositivo"}
          </button>
          {error && (
            <p role="alert" className="mt-3 text-sm text-red-700">
              {error}
            </p>
          )}

          <p className="mono mt-8 text-[0.62rem] uppercase tracking-[0.14em] text-slate">
            O elige del archivo
          </p>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {SETS.map((option) => (
              <button
                key={option.id}
                type="button"
                aria-pressed={set === option.id}
                onClick={() => setSet(option.id)}
                className={`mono rounded-full border px-3.5 py-1.5 text-[0.62rem] uppercase tracking-[0.12em] transition-colors ${
                  set === option.id
                    ? "border-espresso bg-espresso text-porcelain"
                    : "border-line-strong text-slate hover:border-cocoa"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>

          <div className="mt-4 grid grid-cols-3 gap-2 sm:grid-cols-5">
            {photos.map((photo) => (
              <button
                key={photo.id}
                type="button"
                disabled={busy}
                aria-label={`Foto ${photo.id}`}
                onClick={() => onPick(toImg(photo))}
                className="group overflow-hidden rounded-xl outline-offset-2 focus-visible:outline-2 focus-visible:outline-cocoa"
              >
                <Frame
                  photo={photo}
                  sizes="(max-width: 640px) 33vw, 150px"
                  className="aspect-3/4"
                  imgClassName="transition-transform duration-500 group-hover:scale-105"
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
