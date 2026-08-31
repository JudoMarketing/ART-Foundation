import type { Locale } from "@/lib/i18n";

/**
 * Las fotos de la fundación.
 *
 * ── De dónde salieron ─────────────────────────────────────────────────────
 *
 * De la biblioteca de medios del WordPress de la propia fundación
 * (artfoundation-x-pwd.com). Son fotos que la fundación **ya publica hoy en su
 * sitio público**, no material nuevo ni de terceros.
 *
 * ⚠️ Y eso hay que confirmarlo igual. Que una foto esté publicada en el sitio
 * viejo dice que hubo consentimiento para ESE sitio; el sitio nuevo es el
 * reemplazo del mismo, así que el uso es el mismo, pero la que tiene los
 * papeles firmados es la fundación y no nosotros. Antes de que esto salga en
 * vivo, Mónica confirma que los consentimientos de imagen cubren a cada
 * persona que aparece acá. Está anotado en `docs/PENDIENTES.md`.
 *
 * Hay menores en varias. Si alguna familia no autorizó, se saca esa foto y se
 * pone otra: por eso cada una vive en esta lista y no incrustada en una
 * página, para que sacar una sea borrar una entrada.
 *
 * ── Sobre el texto alternativo ────────────────────────────────────────────
 *
 * Cada foto describe **la escena**, en los dos idiomas. Dos reglas:
 *
 * 1. **Nunca un nombre.** Ni de menores ni de adultos. Una descripción no
 *    necesita identificar a nadie para funcionar.
 * 2. **Se describe lo que se ve, no lo que se supone.** "Un estudiante en
 *    silla de ruedas pinta sobre la mesa" es lo que hay en la imagen.
 *    "Un estudiante feliz" es una interpretación, y quien no ve la foto no
 *    tiene forma de saber que se la estamos poniendo nosotros.
 *
 * ── Formato ───────────────────────────────────────────────────────────────
 *
 * WebP, lado mayor 1400px. Las originales venían de 1200 a 2048px en JPEG de
 * hasta medio mega cada una; las catorce juntas pesan menos de 1.8 MB.
 */

export type Foto = {
  slug: string;
  /** Medidas reales del archivo, para reservar el hueco y que la página no salte. */
  w: number;
  h: number;
  alt: { en: string; es: string };
};

export const FOTOS: Foto[] = [
  {
    slug: "clase-apoyo-mesa",
    w: 1050,
    h: 1400,
    alt: {
      en: "A student in a wheelchair paints at a long table while an instructor works alongside them.",
      es: "Un estudiante en silla de ruedas pinta en una mesa larga mientras una instructora trabaja a su lado.",
    },
  },
  {
    slug: "clase-taller-lleno",
    w: 1050,
    h: 1400,
    alt: {
      en: "A full classroom: eight people around tables covered in coloured paper and paint.",
      es: "Un salón lleno: ocho personas alrededor de mesas cubiertas de papel de colores y pintura.",
    },
  },
  {
    slug: "clase-joven-pintando",
    w: 1050,
    h: 1400,
    alt: {
      en: "A young man in a red shirt paints a bright canvas at a worktable.",
      es: "Un joven de camiseta roja pinta un lienzo de colores vivos en una mesa de trabajo.",
    },
  },
  {
    slug: "grupo-con-bolsas",
    w: 1200,
    h: 929,
    alt: {
      en: "Six people stand together holding the canvas bags they painted.",
      es: "Seis personas de pie sostienen las bolsas de lienzo que pintaron.",
    },
  },
  {
    slug: "tres-con-su-obra",
    w: 1200,
    h: 1025,
    alt: {
      en: "Three students hold up the paintings they finished, one each.",
      es: "Tres estudiantes sostienen en alto los cuadros que terminaron, uno cada uno.",
    },
  },
  {
    slug: "apoyo-uno-a-uno",
    w: 1000,
    h: 1333,
    alt: {
      en: "An instructor leans in to help a student cut and place coloured paper shapes.",
      es: "Una instructora se acerca a ayudar a un estudiante a recortar y colocar figuras de papel de colores.",
    },
  },
  {
    slug: "nina-dibujando",
    w: 1000,
    h: 1333,
    alt: {
      en: "A girl draws on her own at a table set with paper and markers.",
      es: "Una niña dibuja sola en una mesa con papel y marcadores.",
    },
  },
  {
    slug: "adultos-en-taller",
    w: 1000,
    h: 1333,
    alt: {
      en: "Adults painting around a table covered with brushes and jars of colour.",
      es: "Adultos pintando alrededor de una mesa cubierta de pinceles y frascos de color.",
    },
  },
  {
    slug: "mesa-de-acuarelas",
    w: 1000,
    h: 1333,
    alt: {
      en: "A student works with a watercolour set on a table full of open paint boxes.",
      es: "Un estudiante trabaja con una caja de acuarelas en una mesa llena de estuches abiertos.",
    },
  },
  {
    slug: "dos-recortando",
    w: 1000,
    h: 1333,
    alt: {
      en: "Two students cut coloured card at the same table, each on their own piece.",
      es: "Dos estudiantes recortan cartulina de colores en la misma mesa, cada uno en lo suyo.",
    },
  },
  {
    slug: "teatro-en-escena",
    w: 1352,
    h: 1400,
    alt: {
      en: "The theatre group on stage under coloured lights, some standing, some in wheelchairs, arms raised.",
      es: "El grupo de teatro en escena bajo luces de colores, algunos de pie y otros en silla de ruedas, con los brazos en alto.",
    },
  },
  {
    slug: "teatro-silla-ruedas",
    w: 787,
    h: 1400,
    alt: {
      en: "A performer in a wheelchair alone on stage, one arm raised, under a spotlight.",
      es: "Un actor en silla de ruedas solo en escena, con un brazo en alto, bajo un foco.",
    },
  },
  {
    slug: "instructora-y-alumna",
    w: 1000,
    h: 1333,
    alt: {
      en: "An instructor and a student cut paper together, hands over the same sheet.",
      es: "Una instructora y una alumna recortan papel juntas, las dos manos sobre la misma hoja.",
    },
  },
  {
    slug: "entrega-de-cuadro",
    w: 1050,
    h: 1400,
    alt: {
      en: "A student holds a framed painting beside the person who helped make it.",
      es: "Una estudiante sostiene un cuadro enmarcado junto a la persona que la acompañó a hacerlo.",
    },
  },
];

const PORSLUG = new Map(FOTOS.map((f) => [f.slug, f]));

/** Busca una foto por su nombre. Devuelve `undefined` si no está, nunca revienta. */
export function foto(slug: string): Foto | undefined {
  return PORSLUG.get(slug);
}

/** El texto alternativo en el idioma de la página. */
export function altFoto(slug: string, locale: Locale): string {
  return PORSLUG.get(slug)?.alt[locale] ?? "";
}
