import { localePath, LOCALES, type Locale } from "@/lib/i18n";

/**
 * La dirección real del sitio.
 *
 * Next necesita saberla para armar las direcciones absolutas de los canónicos
 * y de las vistas previas de redes. Sin esto, Next las arma contra
 * `http://localhost:3000` y las escribe así en el HTML de producción: cada
 * página termina declarando que su versión oficial vive en la computadora de
 * quien la compiló.
 *
 * Se puede pisar con `NEXT_PUBLIC_SITE_URL` en Vercel. Eso sirve para el
 * período en que el borrador vive en una dirección de prueba y todavía no en
 * el dominio de la fundación.
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://artfoundation-x-pwd.com"
).replace(/\/$/, "");

/**
 * Las rutas que van a Google, una sola vez y en un solo lugar.
 *
 * De acá salen tres cosas que tienen que decir exactamente lo mismo: el
 * canónico de cada página, las alternativas de idioma, y el sitemap. Cuando
 * esas tres listas se escriben por separado se desincronizan, y una
 * contradicción entre canónico y sitemap es peor que no tener ninguno de los
 * dos: Google recibe dos respuestas y elige él.
 *
 * Lo que NO está acá tampoco tiene que estar:
 *
 *  - Los tres formularios (`/register/apply`, `/volunteer/apply`,
 *    `/classes/financing`) ya se declaran `noindex`. Un `noindex` con
 *    canónico al lado son dos instrucciones contradictorias sobre la misma
 *    página, así que van sin ninguno de los dos.
 *  - `judo-suspendido` es la página que sale cuando el sitio está apagado.
 *    No es contenido.
 *
 * `prioridad` no la usa Google desde hace años, así que no está. `lastModified`
 * sí la mira, pero mentirle poniendo la fecha de compilación en todas las
 * páginas es peor que no ponerla: le enseña que el dato no vale y lo empieza a
 * ignorar. Va solo cuando haya fechas reales por página (fase 5, con el blog).
 */
export const RUTAS = [
  "/",
  "/about",
  "/classes",
  "/store",
  "/donate",
  "/volunteer",
  "/register",
  "/blog",
  "/contact",
  "/terms",
] as const;

export type Ruta = (typeof RUTAS)[number];

/**
 * El canónico de una página y sus alternativas de idioma.
 *
 * Hay un error acá que estuvo puesto y conviene dejar anotado, porque no se
 * ve mirando la página: el canónico estaba declarado UNA sola vez, en el
 * layout, apuntando a la portada. Los metadatos de Next se heredan, así que
 * todas las páginas interiores heredaban ese canónico y cada una declaraba
 * que la versión oficial de sí misma era la portada. El resultado de eso, con
 * el dominio real apuntado, es que Google saca del índice las trece páginas y
 * deja una.
 *
 * Por eso ahora cada página declara la suya, y por eso la ruta se pasa a
 * mano: `generateMetadata` no recibe la dirección de la página, solo los
 * parámetros, así que no hay forma de deducirla.
 *
 * `languages` lleva las dos, y también `x-default`, que es la que Google usa
 * para quien no encaja en ninguno de los dos idiomas.
 */
export function alternatesFor(locale: Locale, ruta: Ruta) {
  const languages: Record<string, string> = {};
  for (const l of LOCALES) languages[l] = localePath(l, ruta);
  languages["x-default"] = localePath("en", ruta);

  return {
    canonical: localePath(locale, ruta),
    languages,
  };
}
