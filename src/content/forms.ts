import type { Locale } from "@/lib/i18n";
import { CLASSES } from "@/content/site";

/**
 * Los textos de los formularios.
 *
 * Separados del resto porque un formulario es casi todo texto: etiqueta,
 * ayuda, error. Y porque lo que se escribe acá lo lee alguien que está
 * llenando campos, cansado, con prisa, o con un lector de pantalla leyéndole
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
      "Your application is with the foundation. Somebody reads it and gets back to you, and if there is a queue, we email you your place in it.",
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
    back: "Back",
    next: "Next",
    stepOf: "Step {n} of {total}",
    errSummaryOne: "One thing to fix on this step.",
    errSummary: "{n} things to fix on this step.",
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
      "Tu postulación está con la fundación. Alguien la lee y te responde, y si hay cola, te avisamos por correo qué lugar tienes.",
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
    back: "Atrás",
    next: "Siguiente",
    stepOf: "Paso {n} de {total}",
    errSummaryOne: "Falta una cosa en este paso.",
    errSummary: "Faltan {n} cosas en este paso.",
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

/* ══════════════════════════════════════════════════════════════════════════
   La inscripción: el formulario de los padres
   ══════════════════════════════════════════════════════════════════════════

   Se llena ANTES de pagar. Es a propósito: la fundación necesita saber a
   quién va a recibir antes de cobrarle nada, y una familia que ya pagó y
   después descubre que el horario no le sirve es una devolución y una mala
   tarde para todos.

   El orden de las preguntas también es a propósito. Primero para quién es,
   porque de eso depende todo lo demás; el precio va casi al final, cuando ya
   se sabe qué se está comprando. */

const INTAKE_DICTS = {
  en: {
    metaTitle: "Register",
    metaDesc:
      "Register yourself or someone in your care for art, theatre or guitar classes in Miami.",
    eyebrow: "Art, theatre, guitar",
    title: "Let's get you a seat.",
    lead: "Six short steps. It remembers where you left off.",

    stepWho: "Who is this for?",
    stepCaregiver: "About you",
    stepStudent: "About the student",
    stepSupport: "Support and health",
    stepPhotos: "Photos and video",
    stepReview: "Check and send",

    /* Paso 1 */
    whoQuestion: "Who are you registering?",
    whoSelf: "Myself",
    whoSelfHelp: "I am the student.",
    whoChild: "Someone in my care",
    whoChildHelp: "A child, or an adult I care for.",

    /* Cuidador */
    caregiverIntro: "So we know who to call.",
    relationship: "Your relationship to the student",
    relationshipHelp: "Mother, father, guardian, carer…",

    /* Estudiante */
    studentIntro: "The person who comes to class.",
    studentFirst: "Student's first name",
    studentLast: "Student's last name",
    studentBirth: "Student's date of birth",
    studentAge: "Age",

    /* Clases */
    classesTotal: "Your Saturday",
    changeClasses: "Change the classes",
    noClassesTitle: "Pick your classes first.",
    noClassesBody:
      "The registration needs to know what you are signing up for. It takes a minute: pick one, two or all three, and the form opens with them already in.",
    noClassesCta: "Go to the classes",

    /* Apoyo y salud */
    supportQuestion: "Does the student need one-on-one attention?",
    supportYes: "Yes, please",
    supportNo: "No, thank you",
    supportNote:
      "It costs nothing extra, and it changes nothing else: same class, same teachers, same room, same price.",
    diagnosis: "Anything we should know to support them well?",
    diagnosisHelp:
      "Diagnosis, triggers, what calms them, how they communicate. Only what you want to share. You can also tell us in person.",
    allergies: "Allergies or medication",
    allergiesHelp: "Including anything we would need in an emergency.",
    healthPrivacy:
      "Who sees this: the staff and instructors who work with the student, and the administrator who assigns support. Nobody else.",

    /* Fotos */
    photoQuestion: "May we photograph or film the student in class?",
    photoYes: "Yes, that is fine",
    photoNo: "No, please do not",
    photoNoNote:
      "Understood: no photos in class. One thing you should know: the foundation also runs public events and shows, and those are filmed. When one comes up we will ask you separately, in writing. Saying no here does not keep the student out of anything.",
    photoYesNote:
      "Thank you. We use them to show the work, never with the student's full name.",

    /* Revisión */
    reviewIntro: "Have a look before it goes.",
    termsAccept:
      "I confirm the information is true and I accept the terms and conditions.",
    termsLink: "Read the terms",
    paymentNote:
      "No payment yet. The foundation reads this, confirms the seat, and then tells you how to pay.",

    submit: "Send registration",
    sending: "Sending…",
    okTitle: "You are on the list.",
    okBody:
      "The foundation has your registration. Somebody confirms the seat and gets back to you about payment.",
    okBack: "Back to classes",

    errPickWho: "Pick one of the two.",
    errPickSupport: "Pick one.",
    errPickPhoto: "Pick one. This one matters.",
  },

  es: {
    metaTitle: "Inscripción",
    metaDesc:
      "Inscríbete o inscribe a alguien a tu cargo en las clases de arte, teatro o guitarra en Miami.",
    eyebrow: "Arte, teatro, guitarra",
    title: "Vamos a conseguirte un lugar.",
    lead: "Seis pasos cortos. Se acuerda de dónde te quedaste.",

    stepWho: "¿Para quién es?",
    stepCaregiver: "Sobre ti",
    stepStudent: "Sobre el estudiante",
    stepSupport: "Apoyo y salud",
    stepPhotos: "Fotos y video",
    stepReview: "Revisa y envía",

    whoQuestion: "¿A quién estás inscribiendo?",
    whoSelf: "A mí",
    whoSelfHelp: "Yo soy el estudiante.",
    whoChild: "A alguien a mi cargo",
    whoChildHelp: "Un hijo, o un adulto que cuido.",

    caregiverIntro: "Para saber a quién llamar.",
    relationship: "Tu relación con el estudiante",
    relationshipHelp: "Madre, padre, tutor, cuidador…",

    studentIntro: "La persona que viene a clase.",
    studentFirst: "Nombre del estudiante",
    studentLast: "Apellido del estudiante",
    studentBirth: "Fecha de nacimiento del estudiante",
    studentAge: "Edad",

    classesTotal: "Tu sábado",
    changeClasses: "Cambiar las clases",
    noClassesTitle: "Primero elige tus clases.",
    noClassesBody:
      "La inscripción necesita saber qué estás pidiendo. Toma un minuto: elige una, dos o las tres, y el formulario se abre con ellas puestas.",
    noClassesCta: "Ir a las clases",

    supportQuestion: "¿El estudiante necesita atención uno a uno?",
    supportYes: "Sí, por favor",
    supportNo: "No, gracias",
    supportNote:
      "No cuesta nada adicional, y no cambia nada más: la misma clase, los mismos maestros, el mismo salón, el mismo precio.",
    diagnosis: "¿Algo que debamos saber para acompañarlo bien?",
    diagnosisHelp:
      "Diagnóstico, qué lo altera, qué lo calma, cómo se comunica. Solo lo que quieras contar. También nos lo puedes decir en persona.",
    allergies: "Alergias o medicación",
    allergiesHelp: "Incluye lo que haría falta en una emergencia.",
    healthPrivacy:
      "Quién lo ve: el personal e instructores que trabajan con el estudiante, y la administradora que asigna el apoyo. Nadie más.",

    photoQuestion: "¿Podemos fotografiar o grabar al estudiante en clase?",
    photoYes: "Sí, está bien",
    photoNo: "No, por favor",
    photoNoNote:
      "Entendido: sin fotos en clase. Una cosa que conviene que sepas: la fundación también hace eventos y shows públicos, y esos sí se graban. Cuando haya uno te lo pedimos aparte, por escrito. Decir que no acá no deja al estudiante fuera de nada.",
    photoYesNote:
      "Gracias. Las usamos para mostrar el trabajo, nunca con el nombre completo del estudiante.",

    reviewIntro: "Dale un vistazo antes de que salga.",
    termsAccept:
      "Confirmo que la información es verdadera y acepto los términos y condiciones.",
    termsLink: "Leer los términos",
    paymentNote:
      "Todavía no se paga nada. La fundación lee esto, confirma el lugar, y después te dice cómo pagar.",

    submit: "Enviar inscripción",
    sending: "Enviando…",
    okTitle: "Ya estás en la lista.",
    okBody:
      "La fundación tiene tu inscripción. Alguien confirma el lugar y te escribe para lo del pago.",
    okBack: "Volver a las clases",

    errPickWho: "Elige una de las dos.",
    errPickSupport: "Elige una.",
    errPickPhoto: "Elige una. Esta importa.",
  },
};

export type IntakeDict = (typeof INTAKE_DICTS)["en"];
export const INTAKE: Record<Locale, IntakeDict> = INTAKE_DICTS;
export function i(locale: Locale): IntakeDict {
  return INTAKE[locale];
}

/* ══════════════════════════════════════════════════════════════════════════
   Ayuda con el pago
   ══════════════════════════════════════════════════════════════════════════

   El botón vive debajo de las clases, que es donde alguien ve el precio y
   piensa "no puedo". Ahí mismo, no en una página perdida del menú.

   El tono de todo este formulario es el que importa: pedir ayuda cuesta, y
   un formulario frío hace que la gente se vaya. Ninguna pregunta pide
   comprobantes ni cifras exactas. La fundación ya dice en la portada que a
   nadie se le dice que no por dinero; esto es solo la puerta. */

const FIN_DICTS = {
  en: {
    metaTitle: "Help with the fee",
    metaDesc:
      "Ask about a scholarship or a payment plan for art, theatre or guitar classes in Miami.",
    eyebrow: "Nobody is turned away for money",
    title: "Let's find a way.",
    lead: "Tell us a little and somebody calls you. No paperwork at this stage.",

    button: "Ask about help with the fee",
    buttonHelp: "Scholarships and payment plans. It stays between you and the foundation.",

    stepWho: "Who is asking",
    stepSituation: "Your situation",

    forWhom: "Who are the classes for?",
    forSelf: "For me",
    forChild: "For someone in my care",

    householdSize: "How many people live in your home?",
    householdHelp: "Counting yourself.",
    canPay: "What could you manage each month?",
    canPayHelp:
      "Any number is a good answer, including zero. It just helps us know where to start.",
    situation: "Anything you want to tell us?",
    situationHelp:
      "Only if you feel like it. It helps, and it is not a requirement.",
    prefer: "How should we reach you?",
    preferPhone: "Call me",
    preferEmail: "Write to me",

    privacy:
      "This goes to the foundation's administrator and stops there. It is not attached to the student's file and it changes nothing about how they are treated in class.",

    submit: "Send",
    sending: "Sending…",
    okTitle: "We have it.",
    okBody:
      "Somebody from the foundation gets in touch. There is almost always a way, and asking costs nothing.",
    okBack: "Back to the classes",
  },

  es: {
    metaTitle: "Ayuda con la cuota",
    metaDesc:
      "Pregunta por una beca o un plan de pago para las clases de arte, teatro o guitarra en Miami.",
    eyebrow: "A nadie se le dice que no por dinero",
    title: "Busquemos la forma.",
    lead: "Cuéntanos un poco y alguien te llama. En esta etapa no se pide ningún papel.",

    button: "Pedir ayuda con la cuota",
    buttonHelp: "Becas y planes de pago. Queda entre tú y la fundación.",

    stepWho: "Quién pregunta",
    stepSituation: "Tu situación",

    forWhom: "¿Para quién son las clases?",
    forSelf: "Para mí",
    forChild: "Para alguien a mi cargo",

    householdSize: "¿Cuántas personas viven en tu casa?",
    householdHelp: "Contándote a ti.",
    canPay: "¿Cuánto podrías cubrir al mes?",
    canPayHelp:
      "Cualquier número es una buena respuesta, incluido cero. Solo nos sirve para saber por dónde empezar.",
    situation: "¿Algo que quieras contarnos?",
    situationHelp: "Solo si te apetece. Ayuda, y no es un requisito.",
    prefer: "¿Cómo te contactamos?",
    preferPhone: "Llámame",
    preferEmail: "Escríbeme",

    privacy:
      "Esto va a la administradora de la fundación y ahí se queda. No se adjunta al expediente del estudiante y no cambia nada de cómo se le trata en clase.",

    submit: "Enviar",
    sending: "Enviando…",
    okTitle: "Ya lo tenemos.",
    okBody:
      "Alguien de la fundación se pone en contacto. Casi siempre hay una forma, y preguntar no cuesta nada.",
    okBack: "Volver a las clases",
  },
};

export type FinDict = (typeof FIN_DICTS)["en"];
export const FINANCIACION: Record<Locale, FinDict> = FIN_DICTS;
export function fin(locale: Locale): FinDict {
  return FINANCIACION[locale];
}
