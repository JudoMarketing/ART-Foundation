"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { localePath, type Locale } from "@/lib/i18n";
import { t } from "@/content/copy";
import LanguageBar from "./LanguageBar";
import SiteLogo from "./SiteLogo";

/**
 * Encabezado del sitio.
 *
 * El menú móvil es un <dialog>-like hecho a mano con las tres cosas que la
 * gente olvida y que rompen la navegación por teclado:
 *   · Escape lo cierra
 *   · el foco entra al panel al abrir y VUELVE al botón al cerrar
 *   · el fondo queda inerte, para no tabular hacia páginas que no se ven
 */
export default function SiteHeader({ locale }: { locale: Locale }) {
  const c = t(locale);
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const links = [
    { href: "/about", label: c.nav.about },
    { href: "/classes", label: c.nav.classes },
    { href: "/store", label: c.nav.store },
    { href: "/volunteer", label: c.nav.volunteer },
    { href: "/blog", label: c.nav.blog },
    { href: "/contact", label: c.nav.contact },
  ];

  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    }
    document.addEventListener("keydown", onKey);
    panelRef.current?.querySelector<HTMLElement>("a, button")?.focus();
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-paper/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center gap-4 px-4 py-3 sm:px-6">
        {/* El logo y, al lado, el nombre en dos líneas — como lo usa el sitio
            actual. El nombre no es adorno: "ARTxpwd" solo no le dice nada a
            quien entra por primera vez. */}
        <Link
          href={localePath(locale, "/")}
          className="tap mr-auto flex items-center gap-3 text-ink"
        >
          <SiteLogo className="h-11 w-11 shrink-0" />
          {/* El logotipo largo: la marca cuadrada y, al lado, el nombre con
              ART en los tres colores, como en el original. Van con las
              tintas oscuras y no con los colores plenos: el magenta pleno da
              4.28:1 y a 14 píxeles eso no se lee. */}
          <span className="hidden leading-tight sm:block">
            <span className="block text-sm font-bold uppercase tracking-wide">
              <span className="text-brand-ink">A</span>
              <span className="text-leaf-ink">R</span>
              <span className="text-sky-ink">T</span>{" "}
              <span className="text-ink">FOUNDATION</span>
            </span>
            <span className="block text-xs text-ink-soft">
              {locale === "es"
                ? "para personas con discapacidad"
                : "for people with disabilities"}
            </span>
          </span>
        </Link>

        <nav
          aria-label={c.nav.menu}
          className="hidden items-center gap-1 lg:flex"
        >
          {links.map((l) => (
            <Link
              key={l.href}
              href={localePath(locale, l.href)}
              className="tap inline-flex items-center rounded-full px-3 py-2 text-sm font-medium text-ink-soft transition-colors hover:bg-brand-soft hover:text-brand-ink"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:block">
          <LanguageBar locale={locale} />
        </div>

        <Link
          href={localePath(locale, "/donate")}
          className="btn tap hidden items-center rounded-full bg-brand-ink px-5 py-2.5 text-sm font-semibold text-paper transition-colors hover:bg-brand-deep sm:inline-flex"
        >
          {c.nav.donate}
        </Link>

        <button
          ref={toggleRef}
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="menu-movil"
          className="tap inline-flex items-center justify-center rounded-full border border-line px-3 lg:hidden"
        >
          <span className="sr-only">{open ? c.nav.close : c.nav.menu}</span>
          <svg width="22" height="22" viewBox="0 0 22 22" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            {open ? (
              <><path d="M5 5l12 12" /><path d="M17 5L5 17" /></>
            ) : (
              <><path d="M3 6h16" /><path d="M3 11h16" /><path d="M3 16h16" /></>
            )}
          </svg>
        </button>
      </div>

      {open && (
        <div
          id="menu-movil"
          ref={panelRef}
          className="border-t border-line bg-paper px-4 pb-6 pt-2 sm:px-6 lg:hidden"
        >
          <ul className="flex flex-col">
            {links.map((l) => (
              <li key={l.href}>
                <Link
                  href={localePath(locale, l.href)}
                  onClick={() => setOpen(false)}
                  className="block border-b border-line py-3 text-base font-medium text-ink"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-5 flex items-center justify-between gap-3">
            <LanguageBar locale={locale} />
            <Link
              href={localePath(locale, "/donate")}
              onClick={() => setOpen(false)}
              className="btn tap inline-flex items-center rounded-full bg-brand-ink px-5 py-2.5 text-sm font-semibold text-paper"
            >
              {c.nav.donate}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
