/**
 * Dos idiomas, inglés de base.
 *
 * Las direcciones se mantienen como en el sitio actual de WordPress:
 *   inglés  → /programas            (sin prefijo)
 *   español → /es/programas
 * Eso NO es capricho: el sitio ya está indexado así. Cambiar el esquema
 * costaría el posicionamiento del árbol en español completo (30 páginas).
 */

export const LOCALES = ["en", "es"] as const;
export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "en";

export function isLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value);
}

/** Antepone /es solo cuando hace falta. En inglés la ruta va limpia. */
export function localePath(locale: Locale, path: string): string {
  const clean = path.startsWith("/") ? path : `/${path}`;
  return locale === DEFAULT_LOCALE ? clean : `/es${clean === "/" ? "" : clean}`;
}

export const LOCALE_LABELS: Record<
  Locale,
  { short: string; full: string; nav: string }
> = {
  // El nombre de cada idioma se escribe EN ese idioma: quien busca español
  // reconoce "Español", no "Spanish".
  // `nav` es el nombre del grupo de navegación, y ese sí va en el idioma de
  // la página actual, porque lo lee quien ya está en ella.
  en: { short: "EN", full: "English", nav: "Language" },
  es: { short: "ES", full: "Español", nav: "Idioma" },
};
