/**
 * Datos fijos de la organización. Una sola fuente: si el teléfono cambia,
 * cambia aquí y cambia en todo el sitio.
 *
 * Todo lo de este archivo salió del sitio actual (artfoundation-x-pwd.com).
 * Lo que está marcado con TODO hay que confirmarlo con la fundación.
 */

export const ORG = {
  name: "Art Foundation for People with Disabilities",
  shortName: "ARTxpwd",
  legalName: "Art Foundation for People with Disabilities, Inc.",
  founded: 2008,
  founder: "Dr. Cesar Blumtritt",

  /** 501(c)(3). El número de registro es obligatorio mostrarlo en Florida. */
  taxStatus: "501(c)(3)",
  flRegistration: "CH73874",

  office: {
    street: "10200 NW 25th Street, Suite B-205",
    city: "Miami",
    state: "FL",
    zip: "33172",
    country: "US",
  },

  /** Las clases NO son en la oficina. Van en otra dirección. */
  classVenue: {
    name: "Vineyard Community Church",
    detail: "Vineyard Youth area",
    street: "12725 SW 122nd Ave",
    city: "Miami",
    state: "FL",
    zip: "33186",
  },

  phone: "+1 (305) 330-1546",
  phoneExt: "416",
  phoneHref: "tel:+13053301546",
  email: "info@artfoundation-x-pwd.com",
  operationsEmail: "mgonzalez@artfoundation-x-pwd.com",

  social: {
    // TODO: confirmar los enlaces exactos con la fundación antes de publicar.
    instagram: "https://www.instagram.com/artfoundationxpwd/",
    facebook: "https://www.facebook.com/artfoundationxpwd/",
  },
} as const;

/**
 * Aviso obligatorio del estado de Florida para organizaciones que piden
 * donaciones. Va en la página de donar y en el pie. No se traduce ni se
 * resume: es texto de ley y se muestra tal cual.
 */
export const FL_DISCLOSURE =
  "A COPY OF THE OFFICIAL REGISTRATION AND FINANCIAL INFORMATION MAY BE " +
  "OBTAINED FROM THE DIVISION OF CONSUMER SERVICES BY CALLING TOLL-FREE " +
  "(800-435-7352) WITHIN THE STATE. REGISTRATION DOES NOT IMPLY ENDORSEMENT, " +
  "APPROVAL, OR RECOMMENDATION BY THE STATE.";

/**
 * Las tres clases. Todas los SÁBADOS, una detrás de otra a propósito: una
 * familia puede dejar al estudiante en una y quedarse para las tres sin
 * hacer un segundo viaje.
 *
 * Confirmado por el dueño: horario y precio como los publica el sitio
 * actual. El cobro es MENSUAL, $100 por clase, materiales incluidos.
 */
export const CLASSES = [
  {
    id: "art",
    accent: "brand",
    start: "09:30",
    end: "11:00",
    /** En centavos enteros, nunca en decimales. 10000 = $100.00 */
    priceCents: 10_000,
    en: {
      name: "Art",
      blurb:
        "Drawing, painting and mixed media in a room built for exploring, not for getting it right.",
    },
    es: {
      name: "Arte",
      blurb:
        "Dibujo, pintura y técnicas mixtas en un salón hecho para explorar, no para hacerlo perfecto.",
    },
  },
  {
    id: "theatre",
    accent: "sky",
    start: "11:30",
    end: "13:00",
    priceCents: 10_000,
    en: {
      name: "Theatre",
      blurb:
        "Improvisation, voice and stage work. Students of all abilities, ages 7 through adults.",
    },
    es: {
      name: "Teatro",
      blurb:
        "Improvisación, voz y trabajo de escena. Estudiantes de todas las capacidades, de 7 años a adultos.",
    },
  },
  {
    id: "guitar",
    accent: "leaf",
    start: "13:00",
    end: "14:00",
    priceCents: 10_000,
    en: {
      name: "Guitar",
      blurb:
        "Rhythm, chords and playing together. No previous experience needed.",
    },
    es: {
      name: "Guitarra",
      blurb:
        "Ritmo, acordes y tocar en grupo. No hace falta experiencia previa.",
    },
  },
] as const;

export type ClassId = (typeof CLASSES)[number]["id"];

/** Todas las clases son el mismo día. */
export const CLASS_DAY = { en: "Saturdays", es: "Sábados" } as const;

export const CURRENCY = "USD";

/** $100.00 → "$100" cuando es redondo, "$100.50" cuando no. */
export function formatPrice(cents: number, locale: "en" | "es"): string {
  return new Intl.NumberFormat(locale === "es" ? "es-US" : "en-US", {
    style: "currency",
    currency: CURRENCY,
    minimumFractionDigits: cents % 100 === 0 ? 0 : 2,
  }).format(cents / 100);
}

/**
 * Consentimiento de imagen.
 *
 * Se pregunta en TODA inscripción: la llena el padre o cuidador cuando el
 * estudiante es menor, y la persona misma cuando se inscribe sola.
 *
 * La opción "no" no es un callejón sin salida: se le explica que en eventos
 * y shows públicos sí hay cámaras, y que en esos casos se le vuelve a pedir
 * permiso aparte. Decir que no a las clases no lo deja fuera de los eventos.
 */
export const MEDIA_CONSENT_VALUES = ["yes", "no"] as const;
export type MediaConsent = (typeof MEDIA_CONSENT_VALUES)[number];
