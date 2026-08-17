import { cookies } from "next/headers";
import { createHmac, timingSafeEqual } from "node:crypto";

/**
 * La puerta del portal.
 *
 * Esto guarda datos de familias y de menores: nombres, teléfonos, direcciones,
 * consentimientos de imagen, y más adelante chequeos policiales de los
 * voluntarios. O sea que la regla acá es la contraria a la del kill switch de
 * Judo.
 *
 * El kill switch **falla abierto**: si el panel de Judo no contesta, el sitio
 * sigue en pie, porque una fundación no se cae por un fallo nuestro.
 *
 * Esta puerta **falla cerrada**: si no hay clave configurada, el portal no
 * abre. Un portal abierto por error no se nota (nadie ve un cartel que diga
 * "estoy abierto"), y mientras nadie lo nota, la lista completa de familias
 * está a un enlace de distancia de cualquiera. Preferimos que Mónica llame
 * diciendo "no puedo entrar" antes que enterarnos por otro lado.
 *
 * ⚠️ Esto es una clave sola, compartida. Alcanza para un borrador y para una
 * persona. No alcanza para el portal de verdad de la fase 5, que necesita:
 * una cuenta por persona, contraseñas que solo su dueño conoce, segundo factor
 * y registro de quién miró qué. Cuando haya datos reales adentro, esto se
 * reemplaza. Está anotado en docs/PENDIENTES.md.
 */

const CLAVE = process.env.ADMIN_PASSWORD;
const SECRETO = process.env.ADMIN_COOKIE_SECRET || CLAVE;

const COOKIE = "admin_sesion";
const DURACION_HORAS = 8;

/** ¿Se puede abrir el portal? Sin clave configurada, no. */
export function portalConfigurado(): boolean {
  return typeof CLAVE === "string" && CLAVE.length >= 12;
}

function firmar(vence: number): string {
  return createHmac("sha256", SECRETO!).update(`admin:${vence}`).digest("hex");
}

/**
 * Comparación de tiempo constante.
 *
 * Comparar con `===` filtra información: la comparación corta en el primer
 * carácter distinto, así que una clave que empieza bien tarda un pelo más que
 * una que empieza mal. Con suficientes intentos, ese pelo se mide y se
 * adivina la clave letra por letra. `timingSafeEqual` siempre tarda lo mismo.
 */
function igual(a: string, b: string): boolean {
  const x = Buffer.from(a);
  const y = Buffer.from(b);
  if (x.length !== y.length) return false;
  return timingSafeEqual(x, y);
}

/** ¿Quien pide esta página tiene sesión abierta? */
export async function haySesion(): Promise<boolean> {
  if (!portalConfigurado()) return false;

  const galleta = (await cookies()).get(COOKIE)?.value;
  if (!galleta) return false;

  const [venceTexto, firma] = galleta.split(".");
  const vence = Number(venceTexto);
  if (!Number.isFinite(vence) || vence < Date.now()) return false;

  return igual(firma ?? "", firmar(vence));
}

/**
 * Abre la sesión si la clave es la correcta.
 *
 * Devuelve el motivo cuando no, para que la pantalla diga algo útil en vez de
 * "error".
 */
export async function abrirSesion(
  clave: string,
): Promise<{ ok: true } | { ok: false; motivo: "sin-configurar" | "clave-mala" }> {
  if (!portalConfigurado()) return { ok: false, motivo: "sin-configurar" };
  if (!igual(clave, CLAVE!)) return { ok: false, motivo: "clave-mala" };

  const vence = Date.now() + DURACION_HORAS * 60 * 60 * 1000;

  (await cookies()).set(COOKIE, `${vence}.${firmar(vence)}`, {
    // Sin acceso desde JavaScript: si algún día entra un script de terceros
    // al sitio, no se puede llevar la sesión de Mónica.
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/admin",
    maxAge: DURACION_HORAS * 60 * 60,
  });

  return { ok: true };
}

export async function cerrarSesion(): Promise<void> {
  (await cookies()).delete({ name: COOKIE, path: "/admin" });
}
