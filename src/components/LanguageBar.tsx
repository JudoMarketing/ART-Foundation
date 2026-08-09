"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { DEFAULT_LOCALE, LOCALES, LOCALE_LABELS, type Locale } from "@/lib/i18n";

/**
 * La barra de idiomas, con banderas.
 *
 * Las banderas son las mismas que usa el sitio actual (WPML): Estados Unidos
 * para el inglés y España para el español. Se conserva la convención que la
 * gente de la fundación ya reconoce.
 *
 * Van dibujadas en SVG y no como imagen: se ven nítidas en cualquier
 * pantalla, no hay archivo que descargar, y no se rompen si alguien mueve
 * una carpeta.
 *
 * Cuatro decisiones que importan y que no se ven:
 *
 * 1. La bandera NUNCA va sola. Va con "EN" / "ES" al lado. Una bandera de
 *    18px es indistinguible para alguien con baja visión, y una bandera no
 *    es un idioma, es un país. El texto es el que de verdad informa.
 * 2. Son ENLACES, no un desplegable. Un <select> con JavaScript encima es el
 *    patrón que más se rompe con lector de pantalla. Dos enlaces no.
 * 3. El nombre que oye un lector de pantalla es "English" / "Español",
 *    nunca "bandera de Estados Unidos". Y cada uno lleva su `lang`, para que
 *    lo pronuncie con la voz correcta.
 * 4. El idioma activo se marca con `aria-current` Y con contraste, no solo
 *    con color: quien no distingue colores igual tiene que saber cuál está
 *    puesto.
 */

function FlagUS() {
  return (
    <svg viewBox="0 0 24 16" className="h-4 w-6 shrink-0 rounded-[2px]" aria-hidden="true" focusable="false">
      <rect width="24" height="16" fill="#fff" />
      {[0, 2, 4, 6, 8, 10, 12].map((i) => (
        <rect key={i} y={(i * 16) / 13} width="24" height={16 / 13} fill="#b22234" />
      ))}
      <rect width="10" height={(16 / 13) * 7} fill="#3c3b6e" />
    </svg>
  );
}

function FlagES() {
  return (
    <svg viewBox="0 0 24 16" className="h-4 w-6 shrink-0 rounded-[2px]" aria-hidden="true" focusable="false">
      <rect width="24" height="16" fill="#aa151b" />
      <rect y="4" width="24" height="8" fill="#f1bf00" />
    </svg>
  );
}

const FLAGS: Record<Locale, () => React.ReactElement> = {
  en: FlagUS,
  es: FlagES,
};

export default function LanguageBar({ locale }: { locale: Locale }) {
  const pathname = usePathname() || "/";

  /** La misma página en el otro idioma, conservando la ruta. */
  function hrefFor(target: Locale): string {
    const bare = pathname.startsWith("/es")
      ? pathname.slice(3) || "/"
      : pathname;
    return target === DEFAULT_LOCALE ? bare : `/es${bare === "/" ? "" : bare}`;
  }

  return (
    <nav aria-label={LOCALE_LABELS[locale].nav}>
      <ul className="flex items-center gap-1">
        {LOCALES.map((code) => {
          const active = code === locale;
          const label = LOCALE_LABELS[code];
          const Flag = FLAGS[code];
          return (
            <li key={code}>
              <Link
                href={hrefFor(code)}
                lang={code}
                hrefLang={code}
                aria-current={active ? "true" : undefined}
                className={[
                  "tap inline-flex items-center gap-2 rounded-full px-2.5 py-1.5",
                  "text-sm font-semibold transition-colors",
                  active
                    ? "bg-ink text-paper"
                    : "text-ink-soft hover:bg-brand-soft hover:text-brand-ink",
                ].join(" ")}
              >
                {/* Un borde tenue alrededor de la bandera: sin él, la franja
                    blanca de la de EE. UU. desaparece sobre fondo blanco. */}
                <span className="inline-flex overflow-hidden rounded-[2px] ring-1 ring-black/25">
                  <Flag />
                </span>
                <span aria-hidden="true">{label.short}</span>
                <span className="sr-only">{label.full}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
