"use client";

import { useId, useState, type ReactNode } from "react";
import {
  IconArrowDown,
  IconArrowUp,
  IconChevronDown,
  IconPlus,
  IconTrash,
  IconX,
} from "@tabler/icons-react";
import { Frame } from "@/components/Frame";
import { PhotoPicker } from "@/components/builder/PhotoPicker";
import type { Img, LinkT } from "@/lib/landing";

export const inputClass =
  "w-full rounded-xl border border-line-strong bg-porcelain px-3.5 py-2.5 text-sm text-espresso outline-none transition-colors placeholder:text-slate/40 focus:border-cocoa";

const labelClass = "mono block text-[0.62rem] uppercase tracking-[0.14em] text-slate";
const iconButton =
  "flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-slate transition-colors hover:bg-linen hover:text-espresso disabled:opacity-25 disabled:hover:bg-transparent";

/** Enlaces del sitio que se sugieren al escribir el destino de un botón. */
export const LINKS_LIST_ID = "builder-links";

export function Text({
  label,
  value,
  onChange,
  rows,
  hint,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  /** Con `rows` el campo es un área de texto. */
  rows?: number;
  hint?: string;
  placeholder?: string;
}) {
  const id = useId();
  return (
    <div>
      <label htmlFor={id} className={labelClass}>
        {label}
      </label>
      {rows ? (
        <textarea
          id={id}
          rows={rows}
          value={value}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
          className={`${inputClass} mt-2 resize-y leading-relaxed`}
        />
      ) : (
        <input
          id={id}
          value={value}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
          className={`${inputClass} mt-2`}
        />
      )}
      {hint && <p className="mt-1.5 text-xs text-slate/70">{hint}</p>}
    </div>
  );
}

export function LinkField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: LinkT;
  onChange: (value: LinkT) => void;
}) {
  return (
    <fieldset>
      <legend className={labelClass}>{label}</legend>
      <div className="mt-2 grid grid-cols-2 gap-2">
        <input
          aria-label={`${label}: texto`}
          value={value.label}
          placeholder="Texto"
          onChange={(e) => onChange({ ...value, label: e.target.value })}
          className={inputClass}
        />
        <input
          aria-label={`${label}: enlace`}
          value={value.href}
          placeholder="/pagina o https://…"
          list={LINKS_LIST_ID}
          onChange={(e) => onChange({ ...value, href: e.target.value })}
          className={inputClass}
        />
      </div>
      <p className="mt-1.5 text-xs text-slate/70">Deja el texto vacío para ocultarlo.</p>
    </fieldset>
  );
}

/** Lista corta de textos sueltos: líneas de un titular, párrafos, credenciales. */
export function Strings({
  label,
  values,
  onChange,
  rows,
  addLabel = "Agregar",
  max = 12,
}: {
  label: string;
  values: string[];
  onChange: (values: string[]) => void;
  rows?: number;
  addLabel?: string;
  max?: number;
}) {
  return (
    <div>
      <p className={labelClass}>{label}</p>
      <div className="mt-2 space-y-2">
        {values.map((value, i) => (
          <div key={i} className="flex items-start gap-1">
            {rows ? (
              <textarea
                rows={rows}
                value={value}
                aria-label={`${label} ${i + 1}`}
                onChange={(e) => onChange(values.map((v, j) => (j === i ? e.target.value : v)))}
                className={`${inputClass} resize-y leading-relaxed`}
              />
            ) : (
              <input
                value={value}
                aria-label={`${label} ${i + 1}`}
                onChange={(e) => onChange(values.map((v, j) => (j === i ? e.target.value : v)))}
                className={inputClass}
              />
            )}
            <button
              type="button"
              aria-label="Quitar"
              onClick={() => onChange(values.filter((_, j) => j !== i))}
              className={`${iconButton} mt-1`}
            >
              <IconX size={16} />
            </button>
          </div>
        ))}
      </div>
      {values.length < max && <AddButton label={addLabel} onClick={() => onChange([...values, ""])} />}
    </div>
  );
}

export function AddButton({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="mono mt-3 inline-flex items-center gap-2 rounded-full border border-dashed border-line-strong px-4 py-2 text-[0.65rem] uppercase tracking-[0.12em] text-slate transition-colors hover:border-cocoa hover:text-espresso"
    >
      <IconPlus size={14} />
      {label}
    </button>
  );
}

const move = <T,>(items: T[], from: number, to: number) => {
  const next = [...items];
  next.splice(to, 0, ...next.splice(from, 1));
  return next;
};

/** Lista de tarjetas plegables que se pueden reordenar, quitar y agregar. */
export function Items<T>({
  label,
  items,
  onChange,
  titleOf,
  keyOf,
  make,
  addLabel = "Agregar",
  max = 24,
  children,
  footer,
}: {
  label: string;
  items: T[];
  onChange: (items: T[]) => void;
  titleOf: (item: T, index: number) => string;
  keyOf?: (item: T) => string;
  /** Crea un ítem nuevo; sin `make` no hay botón de agregar (ver `footer`). */
  make?: () => T;
  addLabel?: string;
  max?: number;
  children: (item: T, update: (patch: Partial<T>) => void, index: number) => ReactNode;
  footer?: ReactNode;
}) {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div>
      <p className={labelClass}>{label}</p>
      <ul className="mt-2 space-y-2">
        {items.map((item, i) => {
          const isOpen = open === i;
          return (
            <li
              key={keyOf ? keyOf(item) : i}
              className="rounded-2xl border border-line bg-cream/60"
            >
              <div className="flex items-center gap-1 py-1.5 pl-1.5 pr-2">
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex min-w-0 flex-1 items-center gap-2 rounded-xl px-2 py-1.5 text-left"
                >
                  <IconChevronDown
                    size={16}
                    className={`shrink-0 text-slate transition-transform ${isOpen ? "" : "-rotate-90"}`}
                  />
                  <span className="mono text-[0.62rem] text-gold-ink">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="truncate text-sm text-espresso">{titleOf(item, i)}</span>
                </button>
                <button
                  type="button"
                  aria-label="Subir"
                  disabled={i === 0}
                  onClick={() => {
                    onChange(move(items, i, i - 1));
                    if (isOpen) setOpen(i - 1);
                  }}
                  className={iconButton}
                >
                  <IconArrowUp size={15} />
                </button>
                <button
                  type="button"
                  aria-label="Bajar"
                  disabled={i === items.length - 1}
                  onClick={() => {
                    onChange(move(items, i, i + 1));
                    if (isOpen) setOpen(i + 1);
                  }}
                  className={iconButton}
                >
                  <IconArrowDown size={15} />
                </button>
                <button
                  type="button"
                  aria-label="Eliminar"
                  onClick={() => {
                    onChange(items.filter((_, j) => j !== i));
                    setOpen(null);
                  }}
                  className={`${iconButton} hover:text-red-700`}
                >
                  <IconTrash size={15} />
                </button>
              </div>
              {isOpen && (
                <div className="space-y-4 border-t border-line p-3.5">
                  {children(
                    item,
                    (patch) => onChange(items.map((it, j) => (j === i ? { ...it, ...patch } : it))),
                    i,
                  )}
                </div>
              )}
            </li>
          );
        })}
      </ul>
      {make && items.length < max && (
        <AddButton
          label={addLabel}
          onClick={() => {
            onChange([...items, make()]);
            setOpen(items.length);
          }}
        />
      )}
      {footer}
    </div>
  );
}

export function PhotoField({
  label,
  value,
  onChange,
  hint,
}: {
  label: string;
  value: Img;
  onChange: (value: Img) => void;
  hint?: string;
}) {
  const [picking, setPicking] = useState(false);
  return (
    <div>
      <p className={labelClass}>{label}</p>
      <button
        type="button"
        onClick={() => setPicking(true)}
        className="group mt-2 flex w-full items-center gap-3 rounded-2xl border border-line-strong bg-porcelain p-2 text-left transition-colors hover:border-cocoa"
      >
        <Frame photo={value} sizes="96px" className="h-16 w-24 shrink-0 rounded-xl" />
        <span className="min-w-0">
          <span className="block text-sm text-espresso">Cambiar foto</span>
          <span className="block truncate text-xs text-slate/70">
            {hint ?? "Sube una nueva o elige del archivo"}
          </span>
        </span>
      </button>
      {picking && (
        <PhotoPicker
          onClose={() => setPicking(false)}
          onPick={(photo) => {
            onChange(photo);
            setPicking(false);
          }}
        />
      )}
    </div>
  );
}

/** Tira de fotos (la banda): miniaturas que se quitan con un clic y un botón para sumar. */
export function PhotoList({
  label,
  photos,
  onChange,
  max = 30,
}: {
  label: string;
  photos: Img[];
  onChange: (photos: Img[]) => void;
  max?: number;
}) {
  const [picking, setPicking] = useState(false);
  return (
    <div>
      <p className={labelClass}>{label}</p>
      <div className="mt-2 grid grid-cols-4 gap-2">
        {photos.map((photo, i) => (
          <div key={`${photo.src}-${i}`} className="group relative">
            <Frame photo={photo} sizes="96px" className="aspect-3/4 rounded-xl" />
            <button
              type="button"
              aria-label="Quitar foto"
              onClick={() => onChange(photos.filter((_, j) => j !== i))}
              className="absolute right-1 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-espresso/80 text-porcelain transition-colors hover:bg-espresso"
            >
              <IconX size={13} />
            </button>
          </div>
        ))}
        {photos.length < max && (
          <button
            type="button"
            aria-label="Agregar foto"
            onClick={() => setPicking(true)}
            className="flex aspect-3/4 items-center justify-center rounded-xl border border-dashed border-line-strong text-slate transition-colors hover:border-cocoa hover:text-espresso"
          >
            <IconPlus size={20} />
          </button>
        )}
      </div>
      {picking && (
        <PhotoPicker
          onClose={() => setPicking(false)}
          onPick={(photo) => {
            onChange([...photos, photo]);
            setPicking(false);
          }}
        />
      )}
    </div>
  );
}
