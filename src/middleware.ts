import { NextRequest, NextResponse } from "next/server";
import { fetchSiteStatus } from "./lib/judo-kit";

/**
 * Un solo middleware con dos trabajos:
 *
 *  1. Kill switch del Judo Site Kit, el dueño puede apagar y prender el sitio
 *     desde judomarketing.net. Fail-open: si el panel no responde, el sitio
 *     sigue vivo. Una fundación no se cae por un fallo nuestro.
 *  2. Idiomas, el inglés vive en la raíz (/classes) y el español bajo /es
 *     (/es/classes). Por dentro los dos van a /[locale], pero la dirección
 *     que ve el visitante y que indexó Google no cambia.
 */

let cachedStatus = "activo";
let cachedAt = 0;

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Los archivos estáticos pasan sin tocar.
  if (pathname.startsWith("/_next") || pathname.includes(".")) {
    return NextResponse.next();
  }

  // El idioma se resuelve primero porque la página de suspensión también
  // tiene que salir en el idioma en el que venía el visitante.
  const isSpanish = pathname === "/es" || pathname.startsWith("/es/");
  const locale = isSpanish ? "es" : "en";

  // ── 1. Kill switch ───────────────────────────────────────────────────────
  if (Date.now() - cachedAt > 60_000) {
    cachedStatus = await fetchSiteStatus();
    cachedAt = Date.now();
  }

  if (cachedStatus === "deshabilitado") {
    const url = req.nextUrl.clone();
    url.pathname = `/${locale}/judo-suspendido`;
    return NextResponse.rewrite(url);
  }

  // ── 2. Idioma ────────────────────────────────────────────────────────────
  // /es y /es/... ya caen en [locale] = "es"; se dejan pasar tal cual.
  if (isSpanish) {
    return NextResponse.next();
  }

  // Todo lo demás es inglés: se reescribe a /en/... por dentro.
  // Reescribir, no redirigir: la barra de direcciones sigue mostrando /classes.
  const url = req.nextUrl.clone();
  url.pathname = `/en${pathname === "/" ? "" : pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  /**
   * `/admin` queda afuera, y por dos motivos distintos.
   *
   * El del idioma: el portal no vive bajo `/[locale]`, tiene su propio marco
   * y su propio idioma guardado en una galleta. Si pasara por acá, `/admin`
   * se reescribiría a `/en/admin`, que no existe, y el portal daría 404.
   *
   * El del kill switch: cuando el sitio está apagado, el portal tiene que
   * seguir abriendo. Es justo el momento en que Mónica más necesita entrar a
   * ver qué pasó, y dejarla afuera de sus propios datos porque el sitio
   * público está en pausa no tiene ningún sentido.
   */
  matcher: "/((?!api|_next|admin|favicon.ico).*)",
};
