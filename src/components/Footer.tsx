import Link from "next/link";
import { nav, brand } from "@/lib/content";

export function Footer() {
  return (
    <footer className="relative z-10 bg-ink text-cream">
      <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
        <div className="grid gap-14 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <p className="display text-5xl tracking-tight">
              {brand.name}
              <span className="text-amber">.</span>
            </p>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-cream/60">
              {brand.tagline} Programas y cursos online de Pilates para moverte
              con fuerza, calma e intención — desde donde estés.
            </p>
            <a
              href={brand.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-2 text-sm text-cream/70 transition-colors hover:text-amber"
            >
              <span className="link-underline">@{brand.handle}</span>
              <span aria-hidden>↗</span>
            </a>
          </div>

          <div>
            <p className="eyebrow text-cream/40">Explora</p>
            <ul className="mt-6 space-y-3">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-cream/70 transition-colors hover:text-cream"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="eyebrow text-cream/40">Empezar</p>
            <ul className="mt-6 space-y-3">
              <li>
                <Link
                  href="/cursos"
                  className="text-sm text-cream/70 transition-colors hover:text-cream"
                >
                  Ver todos los cursos
                </Link>
              </li>
              <li>
                <Link
                  href="/#precios"
                  className="text-sm text-cream/70 transition-colors hover:text-cream"
                >
                  Membresía
                </Link>
              </li>
              <li>
                <a
                  href={`mailto:hola@${brand.handle}`}
                  className="text-sm text-cream/70 transition-colors hover:text-cream"
                >
                  hola@{brand.handle}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-cream/10 pt-8 text-xs text-cream/40 sm:flex-row sm:items-center">
          <p>
            © {new Date().getFullYear()} {brand.name} · {brand.role}
          </p>
          <p>Hecho con calma. Movimiento consciente.</p>
        </div>
      </div>
    </footer>
  );
}
