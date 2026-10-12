// La landing (home) como datos: lo que el builder edita y lo que la página pinta.
// Los valores por defecto salen de content.ts; lo guardado desde /builder los pisa.

import { brand, chMethod, home, images } from "@/lib/content";
import { p, type Photo } from "@/lib/photos";

/** Una foto tal como la necesita <Frame>: del archivo de Caro o subida desde el builder. */
export type Img = { src: string; w: number; h: number; blur?: string };
export type LinkT = { label: string; href: string };

export const SECTION_IDS = [
  "hero",
  "band",
  "manifesto",
  "pillars",
  "verticals",
  "courses",
  "about",
  "cta",
] as const;
export type SectionId = (typeof SECTION_IDS)[number];

export const SECTION_LABELS: Record<SectionId, string> = {
  hero: "Portada",
  band: "Banda de fotos",
  manifesto: "Manifiesto",
  pillars: "Pilares del método",
  verticals: "Los caminos",
  courses: "Cursos en video",
  about: "Sobre Caro",
  cta: "Llamado final",
};

export type Lesson = { id: string; title: string; videoId: string; duration: string };
export type Course = {
  id: string;
  title: string;
  level: string;
  description: string;
  lessons: Lesson[];
};

export type LandingData = {
  order: SectionId[];
  hidden: SectionId[];
  hero: {
    eyebrow: string;
    title: string;
    body: string;
    primary: LinkT;
    secondary: LinkT;
    note: string;
    photoWide: Img;
    photoTall: Img;
  };
  band: { claim: string; link: LinkT; photos: Img[] };
  manifesto: { eyebrow: string; lines: string[]; body: string; photo: Img };
  pillars: {
    eyebrow: string;
    title: string;
    body: string;
    note: string;
    items: { title: string; claim: string; text: string; photo: Img; focus?: string }[];
  };
  verticals: {
    eyebrow: string;
    title: string;
    items: { title: string; text: string; href: string; photo: Img }[];
  };
  courses: { eyebrow: string; title: string; body: string; courses: Course[] };
  about: {
    eyebrow: string;
    title: string;
    body: string[];
    credentials: string[];
    portrait: Img;
    detail: Img;
  };
  cta: {
    eyebrow: string;
    title: string;
    body: string;
    primary: LinkT;
    secondary: LinkT;
    photo: Img;
  };
};

export const toImg = ({ src, w, h, blur }: Photo): Img => ({ src, w, h, blur });

/** Foto con la que nace un ítem nuevo en el builder. */
export const PLACEHOLDER_IMG = toImg(p(3));

export const uid = () => Math.random().toString(36).slice(2, 10).padEnd(8, "0");

export const defaultLanding: LandingData = {
  order: [...SECTION_IDS],
  hidden: [],
  hero: {
    ...home.hero,
    note: brand.role,
    photoWide: toImg(images.hero.wide),
    photoTall: toImg(images.hero.tall),
  },
  band: {
    // *asteriscos* = cursiva
    claim: "Fluye con gracia. *Alcanza la elegancia* en cada movimiento.",
    link: { label: "Ver el archivo", href: "/retiros#archivo" },
    photos: images.marquee.map(toImg),
  },
  manifesto: { ...home.manifesto, photo: toImg(images.manifesto) },
  pillars: {
    eyebrow: chMethod.eyebrow,
    title: chMethod.title,
    body: chMethod.body,
    note: "Cinco pilares · uno encima del otro",
    items: chMethod.pillars.map((pillar) => ({
      title: pillar.title,
      claim: pillar.claim,
      text: pillar.text,
      photo: toImg(pillar.photo),
      ...("focus" in pillar ? { focus: pillar.focus } : {}),
    })),
  },
  verticals: {
    eyebrow: home.verticals.eyebrow,
    title: home.verticals.title,
    items: home.verticals.items.map((item) => ({
      title: item.title,
      text: item.text,
      href: item.href,
      photo: toImg(item.photo),
    })),
  },
  courses: {
    eyebrow: "Cursos en video",
    title: "Aprende a tu ritmo.",
    body: "Clases grabadas por Caro, ordenadas por curso. Elige uno, dale play y avanza clase a clase.",
    courses: [],
  },
  about: {
    ...home.authority,
    portrait: toImg(images.founder.portrait),
    detail: toImg(images.founder.detail),
  },
  cta: {
    eyebrow: "Empieza hoy",
    title: brand.tagline,
    body: "Practica hoy mismo desde casa, o postúlate a una asesoría si quieres el protocolo completo.",
    primary: { label: "Practicar en casa", href: "/virtual" },
    secondary: { label: "Postular a una asesoría", href: "/asesorias#postulacion" },
    photo: toImg(images.cta),
  },
};

// ---------------------------------------------------------------------------
// YouTube
// ---------------------------------------------------------------------------

const YT_ID = /^[\w-]{11}$/;

/** Acepta el enlace en cualquiera de sus formas (watch, youtu.be, shorts, embed, live) o el id suelto. */
export function youtubeId(input: string): string | null {
  const value = input.trim();
  if (YT_ID.test(value)) return value;
  let url: URL;
  try {
    url = new URL(/^https?:\/\//i.test(value) ? value : `https://${value}`);
  } catch {
    return null;
  }
  const host = url.hostname.replace(/^(www|m|music)\./, "");
  let id: string | null = null;
  if (host === "youtu.be") id = url.pathname.split("/")[1] ?? null;
  else if (host === "youtube.com" || host === "youtube-nocookie.com") {
    const [, first, second] = url.pathname.split("/");
    if (first === "watch") id = url.searchParams.get("v");
    else if (["shorts", "embed", "live", "v"].includes(first)) id = second ?? null;
  }
  return id && YT_ID.test(id) ? id : null;
}

export const youtubeUrl = (videoId: string) => `https://youtu.be/${videoId}`;

// ---------------------------------------------------------------------------
// Saneado: todo lo que entra (del builder o del disco) pasa por aquí, así la
// página nunca recibe una forma inesperada ni un enlace o una imagen ajenos.
// ---------------------------------------------------------------------------

type Rec = Record<string, unknown>;
const rec = (v: unknown): Rec =>
  v && typeof v === "object" && !Array.isArray(v) ? (v as Rec) : {};

const text = (v: unknown, fallback: string, max = 300) =>
  typeof v === "string" ? v.slice(0, max) : fallback;

const list = <T>(v: unknown, fallback: T[], each: (item: unknown) => T, max = 24): T[] =>
  Array.isArray(v) ? v.slice(0, max).map(each) : fallback;

const HREF = /^(\/(?!\/)|#|https?:\/\/|mailto:|tel:)/i;
const href = (v: unknown, fallback: string) =>
  typeof v === "string" && HREF.test(v.trim()) ? v.trim().slice(0, 300) : fallback;

const link = (v: unknown, fallback: LinkT): LinkT => {
  const r = rec(v);
  return { label: text(r.label, fallback.label, 80), href: href(r.href, fallback.href) };
};

const IMG_SRC =
  /^(\/photos\/p\d+\.jpg|\/media\/[a-f0-9]{16,40}\.jpg|https:\/\/[a-z0-9-]+\.public\.blob\.vercel-storage\.com\/[\w\-./%]+)$/i;
const BLUR = /^data:image\/(jpeg|png|webp);base64,[A-Za-z0-9+/=]+$/;
const dim = (v: unknown) =>
  typeof v === "number" && Number.isFinite(v) && v > 0 && v <= 20000 ? Math.round(v) : 0;

function image(v: unknown, fallback: Img): Img {
  const r = rec(v);
  const w = dim(r.w);
  const h = dim(r.h);
  if (typeof r.src !== "string" || !IMG_SRC.test(r.src) || !w || !h) return fallback;
  const blur =
    typeof r.blur === "string" && r.blur.length < 6000 && BLUR.test(r.blur) ? r.blur : undefined;
  return blur ? { src: r.src, w, h, blur } : { src: r.src, w, h };
}

const FOCUS = /^object-\[\d{1,3}%_\d{1,3}%\]$/;
const ID = /^[a-z0-9]{4,16}$/;
const id = (v: unknown) => (typeof v === "string" && ID.test(v) ? v : uid());

export function sanitizeLanding(input: unknown, base: LandingData = defaultLanding): LandingData {
  const src = rec(input);
  const isSection = (v: unknown): v is SectionId =>
    typeof v === "string" && (SECTION_IDS as readonly string[]).includes(v);

  // Orden: lo guardado, sin repetidos, más cualquier sección nueva al final.
  const order = [...new Set(list(src.order, [], (v) => v, 40).filter(isSection))];
  for (const sectionId of base.order) if (!order.includes(sectionId)) order.push(sectionId);
  const hidden = [...new Set(list(src.hidden, [], (v) => v, 40).filter(isSection))];

  const hero = rec(src.hero);
  const band = rec(src.band);
  const manifesto = rec(src.manifesto);
  const pillars = rec(src.pillars);
  const verticals = rec(src.verticals);
  const courses = rec(src.courses);
  const about = rec(src.about);
  const cta = rec(src.cta);

  return {
    order,
    hidden,
    hero: {
      eyebrow: text(hero.eyebrow, base.hero.eyebrow),
      title: text(hero.title, base.hero.title),
      body: text(hero.body, base.hero.body, 800),
      primary: link(hero.primary, base.hero.primary),
      secondary: link(hero.secondary, base.hero.secondary),
      note: text(hero.note, base.hero.note),
      photoWide: image(hero.photoWide, base.hero.photoWide),
      photoTall: image(hero.photoTall, base.hero.photoTall),
    },
    band: {
      claim: text(band.claim, base.band.claim),
      link: link(band.link, base.band.link),
      photos: list(band.photos, base.band.photos, (v) => image(v, PLACEHOLDER_IMG), 30),
    },
    manifesto: {
      eyebrow: text(manifesto.eyebrow, base.manifesto.eyebrow),
      lines: list(manifesto.lines, base.manifesto.lines, (v) => text(v, "", 80), 6),
      body: text(manifesto.body, base.manifesto.body, 800),
      photo: image(manifesto.photo, base.manifesto.photo),
    },
    pillars: {
      eyebrow: text(pillars.eyebrow, base.pillars.eyebrow),
      title: text(pillars.title, base.pillars.title),
      body: text(pillars.body, base.pillars.body, 800),
      note: text(pillars.note, base.pillars.note),
      items: list(
        pillars.items,
        base.pillars.items,
        (v) => {
          const r = rec(v);
          const focus = typeof r.focus === "string" && FOCUS.test(r.focus) ? r.focus : undefined;
          return {
            title: text(r.title, "", 120),
            claim: text(r.claim, "", 160),
            text: text(r.text, "", 600),
            photo: image(r.photo, PLACEHOLDER_IMG),
            ...(focus ? { focus } : {}),
          };
        },
        12,
      ),
    },
    verticals: {
      eyebrow: text(verticals.eyebrow, base.verticals.eyebrow),
      title: text(verticals.title, base.verticals.title),
      items: list(
        verticals.items,
        base.verticals.items,
        (v) => {
          const r = rec(v);
          return {
            title: text(r.title, "", 120),
            text: text(r.text, "", 600),
            href: href(r.href, "/"),
            photo: image(r.photo, PLACEHOLDER_IMG),
          };
        },
        16,
      ),
    },
    courses: {
      eyebrow: text(courses.eyebrow, base.courses.eyebrow),
      title: text(courses.title, base.courses.title),
      body: text(courses.body, base.courses.body, 800),
      courses: list(
        courses.courses,
        base.courses.courses,
        (v) => {
          const r = rec(v);
          return {
            id: id(r.id),
            title: text(r.title, "", 120),
            level: text(r.level, "", 80),
            description: text(r.description, "", 600),
            lessons: list(
              r.lessons,
              [],
              (l) => {
                const lesson = rec(l);
                return {
                  id: id(lesson.id),
                  title: text(lesson.title, "", 160),
                  videoId: youtubeId(text(lesson.videoId, "", 200)) ?? "",
                  duration: text(lesson.duration, "", 20),
                };
              },
              60,
            ),
          };
        },
        20,
      ),
    },
    about: {
      eyebrow: text(about.eyebrow, base.about.eyebrow),
      title: text(about.title, base.about.title),
      body: list(about.body, base.about.body, (v) => text(v, "", 1200), 8),
      credentials: list(about.credentials, base.about.credentials, (v) => text(v, "", 120), 12),
      portrait: image(about.portrait, base.about.portrait),
      detail: image(about.detail, base.about.detail),
    },
    cta: {
      eyebrow: text(cta.eyebrow, base.cta.eyebrow),
      title: text(cta.title, base.cta.title),
      body: text(cta.body, base.cta.body, 800),
      primary: link(cta.primary, base.cta.primary),
      secondary: link(cta.secondary, base.cta.secondary),
      photo: image(cta.photo, base.cta.photo),
    },
  };
}
