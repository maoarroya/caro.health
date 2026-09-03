import Link from "next/link";
import { nav, brand } from "@/lib/content";
import { PhotoRail } from "@/components/PhotoRail";
import { Sprig } from "@/components/Sprig";
import { ps } from "@/lib/photos";

const footerRail = ps(68, 3, 73, 12, 86, 70, 30, 66, 20, 93);

export function Footer() {
  return (
    <footer className="relative z-10 bg-espresso text-porcelain">
      <PhotoRail
        photos={footerRail}
        duration={70}
        reverse
        className="border-b border-porcelain/10 py-8"
        itemClassName="aspect-square w-28 rounded-xl sm:w-36"
        sizes="150px"
      />

      <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
        <div className="grid gap-14 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <p className="display flex items-center gap-3 text-5xl tracking-tight">
              <Sprig className="h-9 w-9 text-sand" />
              {brand.name}
            </p>
            <p className="mono mt-3 text-[0.6rem] uppercase tracking-[0.26em] text-gold">
              {brand.lockup}
            </p>
            <div className="rule-gold mt-5 max-w-xs opacity-60" />
            <p className="mono mt-5 text-[0.65rem] uppercase tracking-[0.16em] text-porcelain/50">
              {brand.disciplines}
            </p>
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-porcelain/60">
              Nutrición clínica integral y movimiento consciente en un solo
              método. {brand.tagline}
            </p>
            <a
              href={brand.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-2 text-sm text-porcelain/70 transition-colors hover:text-sand"
            >
              <span className="link-underline">@{brand.handle}</span>
              <span aria-hidden>↗</span>
            </a>
          </div>

          <div>
            <p className="eyebrow text-porcelain/40">Explora</p>
            <ul className="mt-6 space-y-3">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-porcelain/70 transition-colors hover:text-porcelain"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="eyebrow text-porcelain/40">Empezar</p>
            <ul className="mt-6 space-y-3">
              <li>
                <Link
                  href="/asesorias#postulacion"
                  className="text-sm text-porcelain/70 transition-colors hover:text-porcelain"
                >
                  Postular a una asesoría
                </Link>
              </li>
              <li>
                <Link
                  href="/virtual#membresia"
                  className="text-sm text-porcelain/70 transition-colors hover:text-porcelain"
                >
                  Membresía virtual
                </Link>
              </li>
              <li>
                <a
                  href={`mailto:${brand.email}`}
                  className="text-sm text-porcelain/70 transition-colors hover:text-porcelain"
                >
                  {brand.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-porcelain/10 pt-8 text-xs text-porcelain/40 sm:flex-row sm:items-center">
          <p>
            © {new Date().getFullYear()} caro.health · {brand.role}
          </p>
          <p>Alta vibración, todos los días.</p>
        </div>
      </div>
    </footer>
  );
}
