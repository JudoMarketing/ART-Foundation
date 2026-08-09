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
      disciplines: ["Art", "Theatre", "Music"],
    },

    audience: {
      title: "Who these classes are for",
      lead: "Everyone. That is not a slogan. It is how the room actually works.",
      points: [
        {
          title: "Students with disabilities",
          body:
            "If a student needs one-on-one attention, our volunteers and students provide it at no extra cost. You ask for it on the registration form and that is the whole process.",
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
        "They run back to back, so a family can stay for one, two or all three without a second trip. Add a second class and it is half price.",
      support:
        "We have volunteers and students who provide one-on-one attention when a student needs it.",
      cta: "Register",
      add: "Add",
      added: "Added",
      removeHint: "Press again to remove it.",
      regular: "Regular price",
      now: "Now",
      halfOff: "Half price when you add it",
      bundleTitle: "Your Saturday",
      bundleEmpty: "Nothing picked yet.",
      bundleHint: "Pick one class. The next one is half price.",
      total: "Total",
      save: "You save {amount} a month.",
      goRegister: "Continue to register",
      oneClass: "1 class",
      manyClasses: "{n} classes",
      scheduleLabel: "Schedule",
      whereLabel: "Where",
      perMonth: "per month",
      included: "Materials included. Cancel any time.",
    },

    donate: {
      title: "Where your donation goes",
      lead: "Every dollar has a destination. These are the three:",
      flowLabel: "Your dollar, on its way",
      uses: [
        {
          title: "Materials",
          body: "Paint, brushes, canvas, instruments and costumes.",
        },
        {
          title: "Field trips",
          body: "Outings, parks and visits that take the work outside the classroom.",
        },
        {
          title: "Scholarships",
          body:
            "A paid seat for students whose families cannot cover the fee. Nobody is turned away for money.",
        },
      ],
      receipt:
        "We are a registered 501(c)(3). When you donate, we email you a receipt you can use on your taxes.",
      followTitle: "See where it lands.",
      follow: "We post the work as it happens.",
      cta: "Donate",
    },

    gallery: {
      title: "What comes out of the room",
      lead: "Work by our students. Every piece in the store is one of these.",
      byLabel: "by",
      sold: "Sold",
      cta: "See the store",
    },

    store: {
      title: "The store",
      lead: "Original pieces, made by our students.",
      note: "Part of every sale goes straight to the student who made it.",
      cta: "Visit the store",
    },

    volunteer: {
      title: "Volunteer and internships",
      lead: "Come help. We keep the record.",
      points: ["Hours logged from day one", "A signed letter when you finish", "Real work, with real students"],
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
      disciplines: ["Arte", "Teatro", "Música"],
    },

    audience: {
      title: "Para quién son estas clases",
      lead: "Para todos. No es una frase bonita: así funciona el salón de verdad.",
      points: [
        {
          title: "Estudiantes con discapacidad",
          body:
            "Si un estudiante necesita atención uno a uno, nuestros voluntarios y estudiantes se la dan sin costo adicional. Se pide en el formulario de inscripción y ya está.",
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
        "Van una detrás de otra, así que una familia puede quedarse para una, dos o las tres sin hacer otro viaje. Si sumas una segunda clase, va a mitad de precio.",
      support:
        "Tenemos voluntarios y estudiantes que dan atención uno a uno cuando el estudiante la necesita.",
      cta: "Inscribirse",
      add: "Agregar",
      added: "Agregada",
      removeHint: "Toca otra vez para quitarla.",
      regular: "Precio normal",
      now: "Ahora",
      halfOff: "Mitad de precio al agregarla",
      bundleTitle: "Tu sábado",
      bundleEmpty: "Todavía no elegiste nada.",
      bundleHint: "Elige una clase. La siguiente va a mitad de precio.",
      total: "Total",
      save: "Ahorras {amount} al mes.",
      goRegister: "Seguir con la inscripción",
      oneClass: "1 clase",
      manyClasses: "{n} clases",
      scheduleLabel: "Horario",
      whereLabel: "Dónde",
      perMonth: "al mes",
      included: "Materiales incluidos. Se puede cancelar cuando quieras.",
    },

    donate: {
      title: "A dónde va tu donación",
      lead: "Cada dólar tiene un destino. Son estos tres:",
      flowLabel: "Tu dólar, en camino",
      uses: [
        {
          title: "Materiales",
          body: "Pintura, pinceles, lienzos, instrumentos y trajes.",
        },
        {
          title: "Paseos",
          body: "Salidas, parques y visitas que sacan el trabajo fuera del salón.",
        },
        {
          title: "Becas",
          body:
            "Un lugar pagado para estudiantes cuyas familias no pueden cubrir la cuota. A nadie se le dice que no por dinero.",
        },
      ],
      receipt:
        "Somos una organización 501(c)(3) registrada. Cuando donas, te enviamos por correo un recibo que puedes usar en tus impuestos.",
      followTitle: "Mira dónde cae.",
      follow: "Publicamos el trabajo a medida que pasa.",
      cta: "Donar",
    },

    gallery: {
      title: "Lo que sale del salón",
      lead: "Obra de nuestros estudiantes. Cada pieza de la tienda es una de estas.",
      byLabel: "de",
      sold: "Vendido",
      cta: "Ver la tienda",
    },

    store: {
      title: "La tienda",
      lead: "Piezas originales, hechas por nuestros estudiantes.",
      note: "Parte de cada venta va directo al estudiante que la hizo.",
      cta: "Ver la tienda",
    },

    volunteer: {
      title: "Voluntariado y pasantías",
      lead: "Ven a ayudar. Nosotros llevamos el registro.",
      points: ["Horas registradas desde el primer día", "Una carta firmada al terminar", "Trabajo real, con estudiantes reales"],
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
