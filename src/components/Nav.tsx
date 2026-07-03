"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { nav, brand } from "@/lib/content";

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
    if (open) {
      root.style.overflow = "hidden";
    } else {
      root.style.overflow = "";
    }
    return () => {
      root.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled && !open
            ? "bg-cream/85 backdrop-blur-xl border-b border-line/70"
            : "bg-transparent border-b border-transparent"
        }`}
      >
        <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 lg:h-20 lg:px-8">
          <Link
            href="/"
            className="display text-2xl leading-none tracking-tight text-ink"
            onClick={() => setOpen(false)}
          >
            {brand.name}
            <span className="text-oxblood">.</span>
          </Link>

          <div className="hidden items-center gap-8 md:flex">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="mono link-underline text-xs uppercase tracking-wide text-ink/70 transition-colors hover:text-ink"
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/cursos"
              className="mono hidden rounded-full bg-ink px-5 py-2.5 text-xs uppercase tracking-wide text-cream transition-all hover:bg-oxblood md:inline-block"
            >
              Semana gratis
            </Link>
            <button
              aria-label="Abrir menú"
              aria-expanded={open}
              onClick={() => setOpen(true)}
              className="flex h-11 w-11 flex-col items-center justify-center gap-1.5 rounded-full border border-line bg-cream/60 backdrop-blur md:hidden"
            >
              <span className="block h-px w-5 bg-ink" />
              <span className="block h-px w-5 bg-ink" />
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile full-screen menu — solid background, sits above everything */}
      <div
        aria-hidden={!open}
        className={`fixed inset-0 z-[80] flex flex-col overflow-hidden bg-cream px-5 transition-[opacity,transform] duration-300 ease-out md:hidden ${
          open
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-3 opacity-0"
        }`}
      >
        {/* absolute close button — always top-right, immune to layout */}
        <button
          aria-label="Cerrar menú"
          onClick={() => setOpen(false)}
          className="absolute right-5 top-2.5 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-ink/25 bg-cream text-ink transition-colors hover:bg-ink hover:text-cream"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
            <path
              d="M1 1L15 15M15 1L1 15"
              stroke="currentColor"
              strokeWidth="1.6"
            />
          </svg>
        </button>

        {/* menu top row mirrors the header bar */}
        <div className="flex h-16 shrink-0 items-center">
          <Link
            href="/"
            className="display text-2xl leading-none tracking-tight text-ink"
            onClick={() => setOpen(false)}
          >
            {brand.name}
            <span className="text-oxblood">.</span>
          </Link>
        </div>

        <nav className="flex flex-1 flex-col pt-4">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="display border-b border-line/70 py-5 text-4xl text-ink"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/cursos"
            onClick={() => setOpen(false)}
            className="mono mt-8 rounded-full bg-ink px-6 py-4 text-center text-xs uppercase tracking-wide text-cream"
          >
            Empieza con una semana gratis
          </Link>

          <a
            href={brand.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="mono mt-auto py-6 text-xs uppercase tracking-wide text-ink/60"
          >
            @{brand.handle} ↗
          </a>
        </nav>
      </div>
    </>
  );
}
