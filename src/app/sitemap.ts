import type { MetadataRoute } from "next";
import { localePath, LOCALES } from "@/lib/i18n";
import { RUTAS, SITE_URL } from "@/lib/seo";

/**
 * El sitemap.
 *
 * El sitio de WordPress tenía los suyos, generados por AIOSEO, y esos son los
 * que Google viene leyendo desde hace años (ver docs/mapa-urls.md). El día que
 * el dominio apunte acá, esos sitemaps desaparecen. Sin uno nuevo en su lugar,
 * Google se queda sin la lista de direcciones y descubre las 301 de a poco,
 * entrando por donde ya entraba. Eso alarga semanas la mudanza.
 *
 * Cada dirección va con sus dos idiomas declarados como alternativa, igual que
 * en el `<head>` de cada página. Los dos tienen que decir lo mismo.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return RUTAS.flatMap((ruta) =>
    LOCALES.map((locale) => ({
      url: `${SITE_URL}${localePath(locale, ruta)}`,
      alternates: {
        languages: Object.fromEntries(
          LOCALES.map((l) => [l, `${SITE_URL}${localePath(l, ruta)}`]),
        ),
      },
    })),
  );
}
