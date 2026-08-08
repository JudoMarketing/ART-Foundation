import type { Locale } from "@/lib/i18n";

/**
 * Los textos del sitio, en los dos idiomas.
 *
 * Regla de escritura para este sitio: frases cortas, voz activa, y nada de
 * lenguaje de folleto. Lo lee gente que decide si inscribe a su hijo — y
 * también lo lee un lector de pantalla en voz alta, palabra por palabra.
 * Una frase de cuatro líneas es una frase que nadie termina de escuchar.
 */

const DICTS = {
  en: {
    nav: {
      home: "Home",
      about: "About",
      classes: "Classes",
      donate: "Donate",
      store: "Store",
      volunteer: "Volunteer",
      blog: "Blog",
      contact: "Contact",
      register: "Register",
      menu: "Menu",
      close: "Close",
      skipToContent: "Skip to main content",
      languageLabel: "Language",
    },

    hero: {
      eyebrow: "Miami, Florida · Since 2008",
      title: "Art without limits.",
      lead:
        "We run art, theatre and guitar classes where ability is the starting point, not the entry requirement. Everyone is welcome, and the support adjusts to each student.",
      primary: "Register for classes",
      secondary: "Donate",
      playVideo: "Play",
      pauseVideo: "Pause",
      disciplines: ["Painting", "Theatre", "Music", "Rhythm"],
    },

    audience: {
      title: "Who these classes are for",
      lead: "Everyone. That is not a slogan. It is how the room actually works.",
      points: [
        {
          title: "Students with disabilities",
          body:
            "If a student needs a one-on-one therapist, we provide one at no extra cost. You ask for it on the registration form and that is the whole process.",
        },
        {
          title: "Students without disabilities",
          body:
            "Children and adults join because they want to make art. Same class, same teachers, same room.",
        },
        {
          title: "The only difference",
          body:
            "How much support each student receives. Nothing else changes: not the class, not the price, not the group.",
        },
      ],
    },

    classes: {
      title: "Three classes, every Saturday",
      lead:
        "They run back to back, so a family can stay for one, two or all three without a second trip.",
      pick: "Students can take one class, two, or all three.",
      support: "Need a one-on-one therapist? We provide one at no cost.",
      cta: "Register",
      scheduleLabel: "Schedule",
      whereLabel: "Where",
      perMonth: "per month",
      included: "Materials included.",
    },

    donate: {
      title: "Where your donation goes",
      lead: "Every dollar has a destination. These are the three:",
      uses: [
        {
          title: "Materials",
          body: "Paint, canvas, instruments and everything the classes consume.",
        },
        {
          title: "Field trips",
          body: "Outings and visits that take the work outside the classroom.",
        },
        {
          title: "Scholarships",
          body:
            "Students whose families cannot cover the fee. Nobody is turned away for money.",
        },
      ],
      receipt:
        "We are a registered 501(c)(3). When you donate, we email you a receipt you can use on your taxes.",
      follow:
        "Want to see where the money lands? Follow us on Instagram and Facebook, or read the blog. We post the work.",
      cta: "Donate",
    },

    store: {
      title: "The store",
      lead:
        "Original pieces made by our students. Part of every sale goes straight to the student who made it.",
      cta: "Visit the store",
    },

    volunteer: {
      title: "Volunteer and internships",
      lead:
        "Your hours are recorded from the first day. When you finish, we sign a letter that states exactly how many hours you gave and why we recommend you.",
      cta: "Apply to volunteer",
    },

    blog: {
      title: "From the foundation",
      lead: "What we are working on, written by the people doing it.",
      cta: "Read the blog",
      empty: "The first posts are on their way.",
    },

    footer: {
      contactTitle: "Contact",
      followTitle: "Follow us",
      officeLabel: "Office",
      classesLabel: "Classes",
      taxLine: "Registered 501(c)(3) charitable organization",
      registrationLabel: "Florida registration",
    },
  },

  es: {
    nav: {
      home: "Inicio",
      about: "Nosotros",
      classes: "Clases",
      donate: "Donar",
      store: "Tienda",
      volunteer: "Voluntariado",
      blog: "Blog",
      contact: "Contacto",
      register: "Inscribirse",
      menu: "Menú",
      close: "Cerrar",
      skipToContent: "Saltar al contenido principal",
      languageLabel: "Idioma",
    },

    hero: {
      eyebrow: "Miami, Florida · Desde 2008",
      title: "Arte sin límites.",
      lead:
        "Damos clases de arte, teatro y guitarra donde la capacidad es el punto de partida, no el requisito de entrada. Todos son bienvenidos y el apoyo se ajusta a cada estudiante.",
      primary: "Inscribirse a las clases",
      secondary: "Donar",
      playVideo: "Reproducir",
      pauseVideo: "Pausar",
      disciplines: ["Pintura", "Teatro", "Música", "Ritmo"],
    },

    audience: {
      title: "Para quién son estas clases",
      lead: "Para todos. No es una frase bonita: así funciona el salón de verdad.",
      points: [
        {
          title: "Estudiantes con discapacidad",
          body:
            "Si un estudiante necesita terapeuta uno a uno, se lo damos sin costo adicional. Se pide en el formulario de inscripción y ya está.",
        },
        {
          title: "Estudiantes sin discapacidad",
          body:
            "Niños y adultos que vienen porque quieren hacer arte. La misma clase, los mismos maestros, el mismo salón.",
        },
        {
          title: "La única diferencia",
          body:
            "Cuánto apoyo recibe cada estudiante. Nada más cambia: ni la clase, ni el precio, ni el grupo.",
        },
      ],
    },

    classes: {
      title: "Tres clases, todos los sábados",
      lead:
        "Van una detrás de otra, así que una familia puede quedarse para una, dos o las tres sin hacer otro viaje.",
      pick: "El estudiante puede tomar una clase, dos o las tres.",
      support: "¿Necesita terapeuta uno a uno? Se lo damos sin costo.",
      cta: "Inscribirse",
      scheduleLabel: "Horario",
      whereLabel: "Dónde",
      perMonth: "al mes",
      included: "Materiales incluidos.",
    },

    donate: {
      title: "A dónde va tu donación",
      lead: "Cada dólar tiene un destino. Son estos tres:",
      uses: [
        {
          title: "Materiales",
          body: "Pintura, lienzos, instrumentos y todo lo que consumen las clases.",
        },
        {
          title: "Paseos",
          body: "Salidas y visitas que sacan el trabajo fuera del salón.",
        },
        {
          title: "Becas",
          body:
            "Estudiantes cuyas familias no pueden pagar la cuota. A nadie se le dice que no por dinero.",
        },
      ],
      receipt:
        "Somos una organización 501(c)(3) registrada. Cuando donas, te enviamos por correo un recibo que puedes usar en tus impuestos.",
      follow:
        "¿Quieres ver dónde cae ese dinero? Síguenos en Instagram y Facebook, o lee el blog. Ahí publicamos el trabajo.",
      cta: "Donar",
    },

    store: {
      title: "La tienda",
      lead:
        "Piezas originales hechas por nuestros estudiantes. Parte de cada venta va directo al estudiante que la hizo.",
      cta: "Ver la tienda",
    },

    volunteer: {
      title: "Voluntariado y pasantías",
      lead:
        "Tus horas quedan registradas desde el primer día. Al terminar, firmamos una carta que dice exactamente cuántas horas diste y por qué te recomendamos.",
      cta: "Postularme como voluntario",
    },

    blog: {
      title: "Desde la fundación",
      lead: "En qué estamos trabajando, contado por quienes lo hacen.",
      cta: "Leer el blog",
      empty: "Las primeras publicaciones vienen en camino.",
    },

    footer: {
      contactTitle: "Contacto",
      followTitle: "Síguenos",
      officeLabel: "Oficina",
      classesLabel: "Clases",
      taxLine: "Organización benéfica 501(c)(3) registrada",
      registrationLabel: "Registro de Florida",
    },
  },
};

/** La forma del inglés es el contrato: el español tiene que tener las
 *  mismas claves o TypeScript no compila. Así no se publica media página
 *  traducida y media en inglés. */
export type Dict = (typeof DICTS)["en"];

export const COPY: Record<Locale, Dict> = DICTS;

export function t(locale: Locale): Dict {
  return COPY[locale];
}
