"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { nav, brand } from "@/lib/content";
import { Logotipo } from "@/components/Logo";

/** El logotipo oficial: monograma CH + «Caro Health · bienestar integral». */
function Wordmark({ onClick }: { onClick?: () => void }) {
  return (
    <Link href="/" onClick={onClick} className="flex items-center" aria-label={brand.name}>
      <Logotipo className="h-10 w-auto text-cocoa transition-colors hover:text-espresso lg:h-12" />
    </Link>
  );
}

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    root.style.overflow = open ? "hidden" : "";
    return () => {
      root.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled && !open
            ? "border-b border-line/80 bg-porcelain/85 backdrop-blur-xl"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 lg:h-20 lg:px-8">
          <Wordmark onClick={() => setOpen(false)} />

          <div className="hidden items-center gap-6 lg:flex">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="mono link-underline text-xs uppercase tracking-[0.12em] text-slate transition-colors hover:text-espresso"
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/asesorias#postulacion"
              className="mono hidden rounded-full bg-espresso px-5 py-2.5 text-xs uppercase tracking-[0.12em] text-porcelain transition-colors hover:bg-cocoa xl:inline-block"
            >
              Postular
            </Link>
            <button
              aria-label="Abrir menú"
              aria-expanded={open}
              onClick={() => setOpen(true)}
              className="flex h-11 w-11 flex-col items-center justify-center gap-1.5 rounded-full border border-line bg-porcelain/70 backdrop-blur lg:hidden"
            >
              <span className="block h-px w-5 bg-espresso" />
              <span className="block h-px w-5 bg-espresso" />
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile full-screen menu */}
      <div
        aria-hidden={!open}
        className={`fixed inset-0 z-80 flex flex-col overflow-hidden bg-porcelain px-5 transition-[opacity,transform] duration-300 ease-out lg:hidden ${
          open
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-3 opacity-0"
        }`}
      >
        <button
          aria-label="Cerrar menú"
          onClick={() => setOpen(false)}
          className="absolute right-5 top-2.5 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-line-strong bg-porcelain text-espresso transition-colors hover:bg-espresso hover:text-porcelain"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
            <path d="M1 1L15 15M15 1L1 15" stroke="currentColor" strokeWidth="1.6" />
          </svg>
        </button>

        <div className="flex h-16 shrink-0 items-center">
          <Wordmark onClick={() => setOpen(false)} />
        </div>

        <nav className="flex flex-1 flex-col pt-4">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="display border-b border-line py-5 text-4xl text-espresso"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/asesorias#postulacion"
            onClick={() => setOpen(false)}
            className="mono mt-8 rounded-full bg-espresso px-6 py-4 text-center text-xs uppercase tracking-[0.14em] text-porcelain"
          >
            Postular a una asesoría
          </Link>

          <a
            href={brand.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="mono mt-auto py-6 text-xs uppercase tracking-[0.12em] text-slate/60"
          >
            @{brand.handle} ↗
          </a>
        </nav>
      </div>
    </>
  );
}
