"use client";

import { useCallback, useEffect, useRef, useState, type RefObject } from "react";
import {
  IconArrowDown,
  IconArrowUp,
  IconChevronDown,
  IconDeviceDesktop,
  IconDeviceMobile,
  IconExternalLink,
  IconEye,
  IconEyeOff,
  IconLogout,
} from "@tabler/icons-react";
import { Isotipo } from "@/components/Logo";
import { nav } from "@/lib/content";
import {
  PLACEHOLDER_IMG,
  SECTION_LABELS,
  uid,
  youtubeId,
  youtubeUrl,
  type Course,
  type LandingData,
  type Lesson,
  type SectionId,
} from "@/lib/landing";
import {
  Items,
  LINKS_LIST_ID,
  LinkField,
  PhotoField,
  PhotoList,
  Strings,
  Text,
  inputClass,
} from "@/components/builder/fields";

type Device = "desktop" | "mobile";
type SetSection = <K extends SectionId>(key: K, patch: Partial<LandingData[K]>) => void;
type Status = { kind: "idle" | "saving" | "saved" | "error"; message?: string };

const LINK_SUGGESTIONS = [
  "/",
  ...nav.map((item) => item.href),
  "/asesorias#postulacion",
  "/virtual#membresia",
  "/retiros#archivo",
  "#cursos",
  "#pilares",
  "#sobre-mi",
];

const iconButton =
  "flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-slate transition-colors hover:bg-linen hover:text-espresso disabled:opacity-25 disabled:hover:bg-transparent";

export function Builder({ initial, canSave }: { initial: LandingData; canSave: boolean }) {
  const [data, setData] = useState(initial);
  const [saved, setSaved] = useState(() => JSON.stringify(initial));
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const [open, setOpen] = useState<SectionId | null>("hero");
  const [device, setDevice] = useState<Device>("desktop");
  const [tab, setTab] = useState<"edit" | "preview">("edit");
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const dirty = JSON.stringify(data) !== saved;

  const post = useCallback((message: object) => {
    iframeRef.current?.contentWindow?.postMessage(message, window.location.origin);
  }, []);

  // Cada cambio viaja a la vista previa; ella avisa cuando está lista o cuando
  // se hace clic en una sección.
  useEffect(() => {
    const timer = setTimeout(() => post({ type: "landing:data", data }), 60);
    const onMessage = (e: MessageEvent) => {
      if (e.origin !== window.location.origin) return;
      if (e.data?.type === "landing:ready") post({ type: "landing:data", data });
      if (e.data?.type === "landing:select" && e.data.id in SECTION_LABELS) {
        setOpen(e.data.id as SectionId);
        setTab("edit");
      }
    };
    window.addEventListener("message", onMessage);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("message", onMessage);
    };
  }, [data, post]);

  useEffect(() => {
    if (!dirty) return;
    const warn = (e: BeforeUnloadEvent) => e.preventDefault();
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [dirty]);

  const save = useCallback(async () => {
    setStatus({ kind: "saving" });
    try {
      const res = await fetch("/api/builder/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = (await res.json().catch(() => ({}))) as { data?: LandingData; error?: string };
      if (!res.ok || !json.data) throw new Error(json.error || "No se pudo guardar.");
      setData(json.data);
      setSaved(JSON.stringify(json.data));
      setStatus({ kind: "saved" });
    } catch (e) {
      setStatus({ kind: "error", message: e instanceof Error ? e.message : "No se pudo guardar." });
    }
  }, [data]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "s") {
        e.preventDefault();
        if (dirty && canSave) save();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [dirty, canSave, save]);

  const set: SetSection = (key, patch) => {
    setStatus({ kind: "idle" });
    setData((d) => ({ ...d, [key]: { ...d[key], ...patch } }));
  };

  const toggleOpen = (id: SectionId) => {
    const next = open === id ? null : id;
    setOpen(next);
    if (next) post({ type: "landing:focus", id: next });
  };

  const moveSection = (index: number, by: number) => {
    setStatus({ kind: "idle" });
    setData((d) => {
      const order = [...d.order];
      order.splice(index + by, 0, ...order.splice(index, 1));
      return { ...d, order };
    });
  };

  const toggleHidden = (id: SectionId) => {
    setStatus({ kind: "idle" });
    setData((d) => ({
      ...d,
      hidden: d.hidden.includes(id) ? d.hidden.filter((h) => h !== id) : [...d.hidden, id],
    }));
  };

  // El título llega después de pegar el enlace: se aplica sobre el estado más
  // reciente y solo si la clase sigue sin nombre.
  const fillLessonTitle = useCallback(async (lessonId: string, videoId: string) => {
    try {
      const res = await fetch(`/api/builder/youtube?id=${videoId}`);
      if (!res.ok) return;
      const { title } = (await res.json()) as { title?: string };
      if (!title) return;
      setData((d) => ({
        ...d,
        courses: {
          ...d.courses,
          courses: d.courses.courses.map((course) => ({
            ...course,
            lessons: course.lessons.map((lesson) =>
              lesson.id === lessonId && lesson.videoId === videoId && !lesson.title
                ? { ...lesson, title }
                : lesson,
            ),
          })),
        },
      }));
    } catch {
      // Sin título automático: se escribe a mano.
    }
  }, []);

  const logout = async () => {
    if (dirty && !window.confirm("Tienes cambios sin publicar. ¿Salir de todos modos?")) return;
    await fetch("/api/builder/login", { method: "DELETE" });
    window.location.reload();
  };

  const statusText =
    status.kind === "saving"
      ? "Publicando…"
      : status.kind === "error"
        ? status.message
        : dirty
          ? "Cambios sin publicar"
          : status.kind === "saved"
            ? "Publicado"
            : "Al día";

  return (
    <div className="flex h-dvh flex-col bg-cream">
      <datalist id={LINKS_LIST_ID}>
        {LINK_SUGGESTIONS.map((href) => (
          <option key={href} value={href} />
        ))}
      </datalist>

      <header className="flex h-14 shrink-0 items-center gap-3 border-b border-line bg-porcelain px-4">
        <Isotipo className="h-6 w-auto text-cocoa" />
        <p className="display text-xl text-espresso">Builder</p>
        <p
          role="status"
          className={`mono ml-2 hidden min-w-0 truncate text-[0.62rem] uppercase tracking-[0.12em] sm:block ${
            status.kind === "error" ? "text-red-700" : dirty ? "text-gold-ink" : "text-slate/60"
          }`}
        >
          {statusText}
        </p>

        <div className="ml-auto flex items-center gap-1.5">
          <div className="mr-1 hidden rounded-full border border-line p-0.5 lg:flex">
            {(
              [
                ["desktop", IconDeviceDesktop, "Computador"],
                ["mobile", IconDeviceMobile, "Celular"],
              ] as const
            ).map(([id, Icon, label]) => (
              <button
                key={id}
                type="button"
                aria-label={`Vista previa: ${label}`}
                aria-pressed={device === id}
                onClick={() => setDevice(id)}
                className={`flex h-8 w-9 items-center justify-center rounded-full transition-colors ${
                  device === id ? "bg-espresso text-porcelain" : "text-slate hover:text-espresso"
                }`}
              >
                <Icon size={17} />
              </button>
            ))}
          </div>
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Ver el sitio"
            title="Ver el sitio"
            className={iconButton}
          >
            <IconExternalLink size={17} />
          </a>
          <button type="button" aria-label="Salir" title="Salir" onClick={logout} className={iconButton}>
            <IconLogout size={17} />
          </button>
          {dirty && (
            <button
              type="button"
              onClick={() => {
                setData(JSON.parse(saved) as LandingData);
                setStatus({ kind: "idle" });
              }}
              className="mono hidden rounded-full px-3 py-2 text-[0.65rem] uppercase tracking-[0.12em] text-slate transition-colors hover:text-espresso sm:block"
            >
              Descartar
            </button>
          )}
          <button
            type="button"
            disabled={!dirty || !canSave || status.kind === "saving"}
            onClick={save}
            className="mono rounded-full bg-espresso px-5 py-2.5 text-[0.68rem] uppercase tracking-[0.12em] text-porcelain transition-colors hover:bg-cocoa disabled:bg-line-strong disabled:text-porcelain"
          >
            {status.kind === "saving" ? "Publicando…" : "Publicar"}
          </button>
        </div>
      </header>

      {status.kind === "error" && (
        <p role="alert" className="shrink-0 bg-red-50 px-4 py-2.5 text-center text-sm text-red-800 sm:hidden">
          {status.message}
        </p>
      )}

      {!canSave && (
        <p role="alert" className="shrink-0 bg-gold-soft px-4 py-2.5 text-center text-sm text-espresso">
          Este servidor no tiene dónde guardar los cambios. Configura{" "}
          <code className="mono text-xs">BLOB_READ_WRITE_TOKEN</code> para poder publicar.
        </p>
      )}

      {/* En pantallas chicas el panel y la vista previa se alternan. */}
      <div className="flex shrink-0 border-b border-line bg-porcelain lg:hidden">
        {(
          [
            ["edit", "Editar"],
            ["preview", "Vista previa"],
          ] as const
        ).map(([id, label]) => (
          <button
            key={id}
            type="button"
            aria-pressed={tab === id}
            onClick={() => setTab(id)}
            className={`mono flex-1 border-b-2 py-3 text-[0.65rem] uppercase tracking-[0.14em] transition-colors ${
              tab === id ? "border-espresso text-espresso" : "border-transparent text-slate/60"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="grid min-h-0 flex-1 lg:grid-cols-[26rem_1fr]">
        <aside
          className={`min-h-0 overflow-y-auto border-line bg-porcelain lg:block lg:border-r ${
            tab === "edit" ? "" : "hidden"
          }`}
        >
          <p className="px-5 pb-2 pt-5 text-sm leading-relaxed text-slate">
            Abre una sección para editar sus textos y fotos. Usa las flechas para cambiar el
            orden y el ojo para ocultarla.
          </p>
          <ul className="pb-24">
            {data.order.map((id, i) => {
              const isOpen = open === id;
              const isHidden = data.hidden.includes(id);
              return (
                <li key={id} className="border-b border-line">
                  <div className="flex items-center gap-1 py-2 pl-3 pr-3">
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      onClick={() => toggleOpen(id)}
                      className="flex min-w-0 flex-1 items-center gap-2.5 rounded-xl px-2 py-2 text-left"
                    >
                      <IconChevronDown
                        size={17}
                        className={`shrink-0 text-slate transition-transform ${isOpen ? "" : "-rotate-90"}`}
                      />
                      <span
                        className={`display truncate text-2xl ${isHidden ? "text-slate/40 line-through" : "text-espresso"}`}
                      >
                        {SECTION_LABELS[id]}
                      </span>
                    </button>
                    <button
                      type="button"
                      aria-label={`Subir ${SECTION_LABELS[id]}`}
                      disabled={i === 0}
                      onClick={() => moveSection(i, -1)}
                      className={iconButton}
                    >
                      <IconArrowUp size={16} />
                    </button>
                    <button
                      type="button"
                      aria-label={`Bajar ${SECTION_LABELS[id]}`}
                      disabled={i === data.order.length - 1}
                      onClick={() => moveSection(i, 1)}
                      className={iconButton}
                    >
                      <IconArrowDown size={16} />
                    </button>
                    <button
                      type="button"
                      aria-label={isHidden ? `Mostrar ${SECTION_LABELS[id]}` : `Ocultar ${SECTION_LABELS[id]}`}
                      aria-pressed={isHidden}
                      onClick={() => toggleHidden(id)}
                      className={iconButton}
                    >
                      {isHidden ? <IconEyeOff size={16} /> : <IconEye size={16} />}
                    </button>
                  </div>
                  {isOpen && (
                    <div className="space-y-5 px-5 pb-7 pt-1">
                      <Panel id={id} data={data} set={set} fillLessonTitle={fillLessonTitle} />
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </aside>

        <Preview device={device} iframeRef={iframeRef} hidden={tab !== "preview"} />
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Vista previa: la home real dentro de un iframe, así los cortes responsive
// son los del ancho simulado y no los del panel.
// ---------------------------------------------------------------------------

const DESKTOP_WIDTH = 1280;
const PHONE = { w: 390, h: 844 };

function Preview({
  device,
  iframeRef,
  hidden,
}: {
  device: Device;
  iframeRef: RefObject<HTMLIFrameElement | null>;
  hidden: boolean;
}) {
  const boxRef = useRef<HTMLDivElement>(null);
  const [box, setBox] = useState({ w: 0, h: 0 });

  useEffect(() => {
    const el = boxRef.current;
    if (!el) return;
    const observer = new ResizeObserver(([entry]) =>
      setBox({ w: entry.contentRect.width, h: entry.contentRect.height }),
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Pantalla chica: la vista previa ocupa todo, sin marco ni escala.
  const narrow = box.w < 640;
  const phone = device === "mobile" && !narrow;
  let width = box.w;
  let height = box.h;
  let scale = 1;
  if (phone) {
    width = PHONE.w;
    height = Math.min(PHONE.h, box.h - 48);
  } else if (!narrow) {
    width = Math.max(box.w, DESKTOP_WIDTH);
    scale = box.w / width;
    height = box.h / scale;
  }

  return (
    <div
      ref={boxRef}
      className={`min-h-0 items-center justify-center overflow-hidden bg-linen lg:flex ${
        hidden ? "hidden" : "flex"
      }`}
    >
      <div
        className={phone ? "overflow-hidden rounded-[2.2rem] border-8 border-espresso shadow-2xl" : ""}
        style={{ width: width * scale, height: height * scale }}
      >
        <iframe
          ref={iframeRef}
          src="/builder/preview"
          title="Vista previa de la landing"
          className="origin-top-left bg-cream"
          style={{ width, height, transform: `scale(${scale})` }}
        />
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Campos de cada sección
// ---------------------------------------------------------------------------

function Panel({
  id,
  data,
  set,
  fillLessonTitle,
}: {
  id: SectionId;
  data: LandingData;
  set: SetSection;
  fillLessonTitle: (lessonId: string, videoId: string) => void;
}) {
  switch (id) {
    case "hero": {
      const s = data.hero;
      return (
        <>
          <Text label="Antetítulo" value={s.eyebrow} onChange={(eyebrow) => set("hero", { eyebrow })} />
          <Text label="Titular" value={s.title} rows={2} onChange={(title) => set("hero", { title })} />
          <Text label="Texto" value={s.body} rows={4} onChange={(body) => set("hero", { body })} />
          <LinkField label="Botón principal" value={s.primary} onChange={(primary) => set("hero", { primary })} />
          <LinkField label="Botón secundario" value={s.secondary} onChange={(secondary) => set("hero", { secondary })} />
          <Text label="Línea final" value={s.note} onChange={(note) => set("hero", { note })} />
          <PhotoField
            label="Foto en computador"
            hint="Horizontal. El texto va a la izquierda."
            value={s.photoWide}
            onChange={(photoWide) => set("hero", { photoWide })}
          />
          <PhotoField
            label="Foto en celular"
            hint="Vertical. El texto va abajo."
            value={s.photoTall}
            onChange={(photoTall) => set("hero", { photoTall })}
          />
        </>
      );
    }
    case "band": {
      const s = data.band;
      return (
        <>
          <Text
            label="Frase"
            value={s.claim}
            rows={2}
            hint="Encierra entre *asteriscos* lo que va en cursiva."
            onChange={(claim) => set("band", { claim })}
          />
          <LinkField label="Enlace" value={s.link} onChange={(link) => set("band", { link })} />
          <PhotoList label="Fotos del carrusel" photos={s.photos} onChange={(photos) => set("band", { photos })} />
        </>
      );
    }
    case "manifesto": {
      const s = data.manifesto;
      return (
        <>
          <Text label="Antetítulo" value={s.eyebrow} onChange={(eyebrow) => set("manifesto", { eyebrow })} />
          <Strings
            label="Titular, línea por línea"
            values={s.lines}
            max={6}
            addLabel="Agregar línea"
            onChange={(lines) => set("manifesto", { lines })}
          />
          <Text label="Texto" value={s.body} rows={4} onChange={(body) => set("manifesto", { body })} />
          <PhotoField label="Foto de fondo" value={s.photo} onChange={(photo) => set("manifesto", { photo })} />
        </>
      );
    }
    case "pillars": {
      const s = data.pillars;
      return (
        <>
          <Text label="Antetítulo" value={s.eyebrow} onChange={(eyebrow) => set("pillars", { eyebrow })} />
          <Text label="Titular" value={s.title} rows={2} onChange={(title) => set("pillars", { title })} />
          <Text label="Texto" value={s.body} rows={4} onChange={(body) => set("pillars", { body })} />
          <Text label="Nota al pie" value={s.note} onChange={(note) => set("pillars", { note })} />
          <Items<LandingData["pillars"]["items"][number]>
            label="Pilares"
            items={s.items}
            max={12}
            addLabel="Agregar pilar"
            titleOf={(item) => item.title || "Pilar sin título"}
            make={() => ({ title: "", claim: "", text: "", photo: PLACEHOLDER_IMG })}
            onChange={(items) => set("pillars", { items })}
          >
            {(item, update) => (
              <>
                <Text label="Título" value={item.title} onChange={(title) => update({ title })} />
                <Text label="Promesa" value={item.claim} onChange={(claim) => update({ claim })} />
                <Text label="Texto" value={item.text} rows={3} onChange={(text) => update({ text })} />
                <PhotoField
                  label="Foto"
                  value={item.photo}
                  // El encuadre fino era de la foto anterior.
                  onChange={(photo) => update({ photo, focus: undefined })}
                />
              </>
            )}
          </Items>
        </>
      );
    }
    case "verticals": {
      const s = data.verticals;
      return (
        <>
          <Text label="Antetítulo" value={s.eyebrow} onChange={(eyebrow) => set("verticals", { eyebrow })} />
          <Text label="Titular" value={s.title} rows={2} onChange={(title) => set("verticals", { title })} />
          <Items
            label="Caminos"
            items={s.items}
            max={16}
            addLabel="Agregar camino"
            titleOf={(item) => item.title || "Sin título"}
            make={() => ({ title: "", text: "", href: "/", photo: PLACEHOLDER_IMG })}
            onChange={(items) => set("verticals", { items })}
          >
            {(item, update) => (
              <>
                <Text label="Título" value={item.title} onChange={(title) => update({ title })} />
                <Text label="Texto" value={item.text} rows={3} onChange={(text) => update({ text })} />
                <div>
                  <label className="mono block text-[0.62rem] uppercase tracking-[0.14em] text-slate">
                    Enlace
                    <input
                      value={item.href}
                      list={LINKS_LIST_ID}
                      onChange={(e) => update({ href: e.target.value })}
                      className={`${inputClass} mt-2 font-sans normal-case tracking-normal`}
                    />
                  </label>
                </div>
                <PhotoField label="Foto" value={item.photo} onChange={(photo) => update({ photo })} />
              </>
            )}
          </Items>
        </>
      );
    }
    case "courses": {
      const s = data.courses;
      return (
        <>
          <Text label="Antetítulo" value={s.eyebrow} onChange={(eyebrow) => set("courses", { eyebrow })} />
          <Text label="Titular" value={s.title} rows={2} onChange={(title) => set("courses", { title })} />
          <Text label="Texto" value={s.body} rows={3} onChange={(body) => set("courses", { body })} />
          <Items<Course>
            label="Cursos"
            items={s.courses}
            max={20}
            addLabel="Agregar curso"
            keyOf={(course) => course.id}
            titleOf={(course) =>
              `${course.title || "Curso sin título"} · ${course.lessons.length} ${course.lessons.length === 1 ? "clase" : "clases"}`
            }
            make={() => ({ id: uid(), title: "", level: "", description: "", lessons: [] })}
            onChange={(courses) => set("courses", { courses })}
          >
            {(course, update) => (
              <>
                <Text label="Nombre del curso" value={course.title} onChange={(title) => update({ title })} />
                <Text
                  label="Nivel"
                  value={course.level}
                  placeholder="Principiante, Intermedio…"
                  onChange={(level) => update({ level })}
                />
                <Text
                  label="Descripción"
                  value={course.description}
                  rows={3}
                  onChange={(description) => update({ description })}
                />
                <Items<Lesson>
                  label="Clases"
                  items={course.lessons}
                  max={60}
                  keyOf={(lesson) => lesson.id}
                  titleOf={(lesson, i) => lesson.title || `Clase ${i + 1}`}
                  onChange={(lessons) => update({ lessons })}
                  footer={
                    <AddLessons
                      onAdd={(videoIds) => {
                        const added = videoIds.map((videoId) => ({
                          id: uid(),
                          title: "",
                          videoId,
                          duration: "",
                        }));
                        update({ lessons: [...course.lessons, ...added].slice(0, 60) });
                        added.forEach((lesson) => fillLessonTitle(lesson.id, lesson.videoId));
                      }}
                    />
                  }
                >
                  {(lesson, updateLesson) => (
                    <LessonFields
                      lesson={lesson}
                      update={updateLesson}
                      fillLessonTitle={fillLessonTitle}
                    />
                  )}
                </Items>
              </>
            )}
          </Items>
        </>
      );
    }
    case "about": {
      const s = data.about;
      return (
        <>
          <Text label="Antetítulo" value={s.eyebrow} onChange={(eyebrow) => set("about", { eyebrow })} />
          <Text label="Titular" value={s.title} rows={2} onChange={(title) => set("about", { title })} />
          <Strings
            label="Párrafos"
            values={s.body}
            rows={5}
            max={8}
            addLabel="Agregar párrafo"
            onChange={(body) => set("about", { body })}
          />
          <Strings
            label="Credenciales"
            values={s.credentials}
            addLabel="Agregar credencial"
            onChange={(credentials) => set("about", { credentials })}
          />
          <PhotoField label="Retrato" value={s.portrait} onChange={(portrait) => set("about", { portrait })} />
          <PhotoField
            label="Foto pequeña"
            hint="Se monta sobre la esquina del retrato."
            value={s.detail}
            onChange={(detail) => set("about", { detail })}
          />
        </>
      );
    }
    case "cta": {
      const s = data.cta;
      return (
        <>
          <Text label="Antetítulo" value={s.eyebrow} onChange={(eyebrow) => set("cta", { eyebrow })} />
          <Text label="Titular" value={s.title} rows={2} onChange={(title) => set("cta", { title })} />
          <Text label="Texto" value={s.body} rows={3} onChange={(body) => set("cta", { body })} />
          <LinkField label="Botón principal" value={s.primary} onChange={(primary) => set("cta", { primary })} />
          <LinkField label="Botón secundario" value={s.secondary} onChange={(secondary) => set("cta", { secondary })} />
          <PhotoField label="Foto de fondo" value={s.photo} onChange={(photo) => set("cta", { photo })} />
          <p className="text-xs leading-relaxed text-slate/70">
            Este bloque también cierra las páginas de Libro, Retiros y Blog.
          </p>
        </>
      );
    }
  }
}

function LessonFields({
  lesson,
  update,
  fillLessonTitle,
}: {
  lesson: Lesson;
  update: (patch: Partial<Lesson>) => void;
  fillLessonTitle: (lessonId: string, videoId: string) => void;
}) {
  const [url, setUrl] = useState(lesson.videoId ? youtubeUrl(lesson.videoId) : "");
  const invalid = url.trim() !== "" && !youtubeId(url);

  return (
    <>
      <div>
        <label className="mono block text-[0.62rem] uppercase tracking-[0.14em] text-slate">
          Enlace de YouTube
          <input
            value={url}
            placeholder="https://youtu.be/…"
            inputMode="url"
            onChange={(e) => {
              setUrl(e.target.value);
              const videoId = youtubeId(e.target.value) ?? "";
              if (videoId === lesson.videoId) return;
              update({ videoId });
              if (videoId && !lesson.title) fillLessonTitle(lesson.id, videoId);
            }}
            className={`${inputClass} mt-2 font-sans normal-case tracking-normal ${invalid ? "border-red-700" : ""}`}
          />
        </label>
        {invalid && <p className="mt-1.5 text-xs text-red-700">Ese enlace no es de un video de YouTube.</p>}
      </div>
      {lesson.videoId && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={`https://i.ytimg.com/vi/${lesson.videoId}/mqdefault.jpg`}
          alt=""
          className="aspect-video w-40 rounded-xl object-cover"
        />
      )}
      <Text label="Título de la clase" value={lesson.title} onChange={(title) => update({ title })} />
      <Text
        label="Duración"
        value={lesson.duration}
        placeholder="12 min"
        onChange={(duration) => update({ duration })}
      />
    </>
  );
}

/** Pegar uno o varios enlaces de YouTube: cada uno se vuelve una clase. */
function AddLessons({ onAdd }: { onAdd: (videoIds: string[]) => void }) {
  const [value, setValue] = useState("");
  const [error, setError] = useState("");

  const add = () => {
    const entries = value.split(/[\s,]+/).filter(Boolean);
    const ids = [...new Set(entries.map(youtubeId).filter((id): id is string => Boolean(id)))];
    if (ids.length === 0) {
      setError("No encontré ningún enlace de YouTube válido.");
      return;
    }
    onAdd(ids);
    setValue("");
    setError("");
  };

  return (
    <div className="mt-3 rounded-2xl border border-dashed border-line-strong p-3">
      <label className="mono block text-[0.62rem] uppercase tracking-[0.14em] text-slate">
        Agregar clases
        <textarea
          rows={3}
          value={value}
          placeholder={"Pega los enlaces de YouTube,\nuno por línea"}
          onChange={(e) => {
            setValue(e.target.value);
            setError("");
          }}
          className={`${inputClass} mt-2 resize-y font-sans normal-case tracking-normal`}
        />
      </label>
      {error && <p className="mt-1.5 text-xs text-red-700">{error}</p>}
      <button
        type="button"
        disabled={!value.trim()}
        onClick={add}
        className="mono mt-2 rounded-full bg-espresso px-4 py-2 text-[0.65rem] uppercase tracking-[0.12em] text-porcelain transition-colors hover:bg-cocoa disabled:bg-line-strong"
      >
        Agregar
      </button>
    </div>
  );
}
