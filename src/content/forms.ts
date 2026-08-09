import type { Locale } from "@/lib/i18n";
import { CLASSES } from "@/content/site";

/**
 * Los textos de los formularios.
 *
 * Separados del resto porque un formulario es casi todo texto: etiqueta,
 * ayuda, error. Y porque lo que se escribe acá lo lee alguien que está
 * llenando campos — cansado, con prisa, o con un lector de pantalla leyéndole
 * cada palabra.
 *
 * Tres reglas que se respetan en todos los mensajes de error:
 *
 * 1. **Dicen qué pasó y qué hacer.** "Campo inválido" no es un error, es un
 *    reproche. "El chequeo policial tiene que ser de los últimos 6 meses" sí.
 * 2. **No culpan.** Nada de "usted olvidó".
 * 3. **Van pegados al campo**, no todos juntos arriba.
 */

/** Los horarios que se ofrecen salen de las clases que existen de verdad. */
export function franjasHorarias(locale: Locale) {
  const fmt = (hhmm: string) => {
    const [h, m] = hhmm.split(":").map(Number);
    return new Intl.DateTimeFormat(locale === "es" ? "es-US" : "en-US", {
      hour: "numeric",
      minute: "2-digit",
    }).format(new Date(2000, 0, 1, h, m));
  };
  return CLASSES.map((k) => ({
    id: k.id,
    label: `${k[locale].name} · ${fmt(k.start)} – ${fmt(k.end)}`,
  }));
}

const DICTS = {
  en: {
    metaTitle: "Volunteer application",
    metaDesc:
      "Apply to volunteer or intern with the Art Foundation. Saturdays in Miami.",
    eyebrow: "Volunteers and interns",
    title: "Tell us about you.",
    lead: "Ten minutes, once. After this we call you.",

    /* Bloques del formulario */
    aboutYou: "About you",
    yourTime: "Your time",
    yourStudies: "Your studies",
    yourCheck: "Background check",

    firstName: "First name",
    lastName: "Last name",
    email: "Email",
    phone: "Phone",
    birthDate: "Date of birth",
    address: "Address",
    city: "City",
    zip: "ZIP code",
    emergencyName: "Emergency contact",
    emergencyPhone: "Emergency contact phone",

    startDate: "When would you like to start?",
    startHelp: "Any Saturday works. We will confirm the exact date.",
    slots: "Which times can you come?",
    slotsHelp: "These are the only hours we run classes. Pick all that work.",
    hours: "How many hours do you plan to complete with us?",
    hoursHelp: "An estimate is fine. It is what goes on your final letter.",

    school: "Where do you study?",
    schoolHelp: "School, college or university. Leave blank if you are not studying.",
    program: "What are you studying?",
    certified: "Are you certified in something, or working toward it?",
    certifiedHelp: "Tell us what. It changes where we can place you.",
    reason: "Why are you coming?",
    reasonWork: "For work experience",
    reasonHelp2: "To help the community",
    reasonBoth: "Both",

    checkTitle: "Police background check",
    checkIntro:
      "We work with children and adults with disabilities, so this one is not optional.",
    checkDate: "Date the check was issued",
    checkDateHelp: "It has to be less than 6 months old.",
    checkFile: "Upload the document",
    checkFileHelp: "PDF or photo, up to 4 MB.",
    checkChosen: "Chosen file",

    consent:
      "I confirm the information above is true, and I accept the terms and conditions.",
    consentLink: "Read the terms",

    submit: "Send application",
    sending: "Sending…",

    okTitle: "Got it.",
    okBody:
      "Your application is with the foundation. Somebody reads it and gets back to you — and if there is a queue, we email you your place in it.",
    okAgain: "Back to volunteering",

    /* Errores */
    errRequired: "This one is needed.",
    errEmail: "That email address has a typo somewhere.",
    errPhone: "Ten digits, please.",
    errSlots: "Pick at least one time.",
    errHours: "A number of hours, please.",
    errCheckOld: "The check has to be from the last 6 months.",
    errCheckFuture: "That date is in the future.",
    errFileBig: "That file is over 4 MB. Try a photo instead of a scan.",
    errFileType: "PDF, JPG or PNG.",
    errConsent: "We need this to process the application.",
    errSend:
      "It did not go through. Call the foundation at {phone} and we will take it by phone.",
    errSummaryOne: "One thing to fix before this can be sent.",
    errSummary: "{n} things to fix before this can be sent.",
  },

  es: {
    metaTitle: "Postulación de voluntariado",
    metaDesc:
      "Postúlate como voluntario o pasante en la Art Foundation. Sábados en Miami.",
    eyebrow: "Voluntarios y pasantes",
    title: "Cuéntanos de ti.",
    lead: "Diez minutos, una sola vez. Después te llamamos nosotros.",

    aboutYou: "Sobre ti",
    yourTime: "Tu tiempo",
    yourStudies: "Tus estudios",
    yourCheck: "Chequeo policial",

    firstName: "Nombre",
    lastName: "Apellido",
    email: "Correo electrónico",
    phone: "Teléfono",
    birthDate: "Fecha de nacimiento",
    address: "Dirección",
    city: "Ciudad",
    zip: "Código postal",
    emergencyName: "Contacto de emergencia",
    emergencyPhone: "Teléfono del contacto de emergencia",

    startDate: "¿Cuándo te gustaría empezar?",
    startHelp: "Cualquier sábado sirve. Te confirmamos la fecha exacta.",
    slots: "¿En qué horarios puedes venir?",
    slotsHelp: "Son las únicas horas en que hay clase. Marca todas las que te sirvan.",
    hours: "¿Cuántas horas planeas completar con nosotros?",
    hoursHelp: "Un estimado está bien. Es lo que va en tu carta final.",

    school: "¿Dónde estudias?",
    schoolHelp: "Colegio, instituto o universidad. Déjalo vacío si no estudias.",
    program: "¿Qué estudias?",
    certified: "¿Estás certificado en algo, o certificándote?",
    certifiedHelp: "Cuéntanos en qué. Cambia dónde te podemos ubicar.",
    reason: "¿Por qué vienes?",
    reasonWork: "Por experiencia laboral",
    reasonHelp2: "Por ayudar a la comunidad",
    reasonBoth: "Por las dos cosas",

    checkTitle: "Chequeo policial",
    checkIntro:
      "Trabajamos con niños y con adultos con discapacidad, así que este no es opcional.",
    checkDate: "Fecha de emisión del chequeo",
    checkDateHelp: "Tiene que tener menos de 6 meses.",
    checkFile: "Sube el documento",
    checkFileHelp: "PDF o foto, hasta 4 MB.",
    checkChosen: "Archivo elegido",

    consent:
      "Confirmo que la información es verdadera y acepto los términos y condiciones.",
    consentLink: "Leer los términos",

    submit: "Enviar postulación",
    sending: "Enviando…",

    okTitle: "Recibido.",
    okBody:
      "Tu postulación está con la fundación. Alguien la lee y te responde — y si hay cola, te avisamos por correo qué lugar tienes.",
    okAgain: "Volver a voluntariado",

    errRequired: "Este hace falta.",
    errEmail: "A ese correo le falta algo.",
    errPhone: "Diez dígitos, por favor.",
    errSlots: "Marca al menos un horario.",
    errHours: "Un número de horas, por favor.",
    errCheckOld: "El chequeo tiene que ser de los últimos 6 meses.",
    errCheckFuture: "Esa fecha está en el futuro.",
    errFileBig: "Ese archivo pasa de 4 MB. Prueba con una foto en vez de un escaneo.",
    errFileType: "PDF, JPG o PNG.",
    errConsent: "Lo necesitamos para poder procesar la postulación.",
    errSend:
      "No salió. Llama a la fundación al {phone} y la tomamos por teléfono.",
    errSummaryOne: "Falta una cosa para poder enviar.",
    errSummary: "Faltan {n} cosas para poder enviar.",
  },
};

export type FormDict = (typeof DICTS)["en"];
export const FORMS: Record<Locale, FormDict> = DICTS;
export function f(locale: Locale): FormDict {
  return FORMS[locale];
}

/** Tope del archivo. Vercel corta el cuerpo de una petición cerca de 4.5 MB. */
export const MAX_ARCHIVO_BYTES = 4 * 1024 * 1024;
export const TIPOS_ARCHIVO = ["application/pdf", "image/jpeg", "image/png"];

/** Vigencia del chequeo policial, en meses. */
export const MESES_VIGENCIA_CHEQUEO = 6;
