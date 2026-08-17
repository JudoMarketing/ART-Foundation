import { cookies } from "next/headers";
import { isLocale, type Locale } from "@/lib/i18n";

/**
 * Las dos preferencias del portal: en qué idioma se ve y si muestra ejemplos.
 *
 * Van en galletas y no en la dirección porque tienen que sobrevivir el paso de
 * una página a otra. Si el idioma viviera en la dirección, cada enlace del menú
 * tendría que arrastrarlo, y el día que uno se olvide, el portal cambia de
 * idioma solo.
 */

const COOKIE_IDIOMA = "admin_lang";
const COOKIE_EJEMPLOS = "admin_demo";

/**
 * El portal arranca en español.
 *
 * Es una suposición, y conviene que esté escrita: quien lo usa hoy es Mónica,
 * y el correo de la fundación y el trato con las familias son en español. Si
 * mañana entra alguien que trabaja en inglés, lo cambia con el botón de arriba
 * y su elección le queda guardada. Cambiar el valor de acá cambia con qué
 * idioma abre la primera vez.
 */
const IDIOMA_POR_DEFECTO: Locale = "es";

export async function idiomaAdmin(): Promise<Locale> {
  const valor = (await cookies()).get(COOKIE_IDIOMA)?.value;
  return valor && isLocale(valor) ? valor : IDIOMA_POR_DEFECTO;
}

/**
 * Los ejemplos arrancan apagados.
 *
 * O sea que lo primero que se ve es la verdad: las tablas vacías, porque no
 * hay base de datos. Prenderlos es un acto deliberado, y mientras están
 * prendidos hay un cartel arriba que lo dice.
 */
export async function ejemplosAdmin(): Promise<boolean> {
  return (await cookies()).get(COOKIE_EJEMPLOS)?.value === "1";
}

export const COOKIES_ADMIN = {
  idioma: COOKIE_IDIOMA,
  ejemplos: COOKIE_EJEMPLOS,
} as const;
