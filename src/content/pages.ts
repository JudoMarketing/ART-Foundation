import type { Locale } from "@/lib/i18n";

/**
 * Los textos de las páginas interiores, en los dos idiomas.
 *
 * Están separados de `copy.ts` —que tiene la portada, el menú y el pie— solo
 * por tamaño: juntos era un archivo de mil líneas donde no se encontraba
 * nada.
 *
 * La regla de escritura es la misma y acá aprieta más: **poco texto, mucho
 * dibujo**. Cada página tiene un título, una frase, y de ahí en adelante
 * manda lo visual. Nadie lee un folleto en pantalla, y menos alguien que
 * está decidiendo si inscribe a su hijo mientras hace otras tres cosas.
 *
 * Lo que sí va escrito, va corto y en voz activa: un lector de pantalla lee
 * esto en voz alta, palabra por palabra.
 */

const DICTS = {
  en: {
    /* ── Nosotros ───────────────────────────────────────────────────────── */
    about: {
      metaTitle: "About",
      metaDesc:
        "An art foundation in Miami since 2008. Classes for students of all abilities, where the support adjusts to the person.",
      eyebrow: "Miami, Florida · Since 2008",
      title: "Ability is where we start, not what we ask for.",
      lead: "A room, three classes, and whatever support each student needs to be in it.",
      stats: [
        { n: "2008", label: "Making art together since" },
        { n: "501(c)(3)", label: "Registered nonprofit" },
        { n: "3", label: "Classes, every Saturday" },
      ],
      pillarsTitle: "What we do",
      pillars: [
        { title: "Teach", body: "Art, theatre and guitar. Real instruction, not activities." },
        { title: "Support", body: "One-on-one attention for whoever needs it, at no extra cost." },
        { title: "Show", body: "Public events and shows. The work leaves the room." },
        { title: "Sell", body: "Students earn from their own pieces in our store." },
      ],
      founderTitle: "Who started it",
      founderRole: "Founder",
      founderBody:
        "The foundation grew out of a simple idea: that a person's disability should change how much help they get, and nothing else.",
      modelTitle: "The ABArt model",
      modelBody:
        "Art as the activity, structured support underneath it. The student comes to make something — the method is what makes that possible.",
      ctaTitle: "Two ways in.",
      ctaClasses: "See the classes",
      ctaDonate: "Donate",
    },

    /* ── Clases ─────────────────────────────────────────────────────────── */
    classes: {
      metaTitle: "Classes",
      metaDesc:
        "Art, theatre and guitar every Saturday in Miami. One class $100 a month; each extra class is half price.",
      eyebrow: "Every Saturday",
      title: "One Saturday. Up to three classes.",
      lead: "They run back to back, in the same building. Take one, two or all three without a second trip.",
      dayTitle: "How a Saturday goes",
      dayLead: "Drop off once. Stay for as much as you want.",
      pickTitle: "Build your Saturday",
      includedTitle: "What comes with it",
      included: [
        { title: "Materials", body: "Paint, canvas, instruments. Nothing to buy." },
        { title: "Support", body: "One-on-one attention when a student needs it." },
        { title: "No experience", body: "Nobody has to know anything to start." },
        { title: "Cancel any time", body: "Monthly. It stops when you say so." },
      ],
      venueTitle: "Where",
      venueNote: "The classes are not at the office. This is the address that matters on a Saturday.",
      officeNote: "Mail and paperwork go to the office.",
    },

    /* ── Donar ──────────────────────────────────────────────────────────── */
    donate: {
      metaTitle: "Donate",
      metaDesc:
        "Every dollar goes to materials, field trips or a scholarship. Registered 501(c)(3) — you get a receipt for your taxes.",
      eyebrow: "501(c)(3) · CH73874",
      title: "Give a student a seat.",
      lead: "Materials, field trips, and paid seats for families who cannot cover the fee.",
      amountsTitle: "What an amount buys",
      amountsNote: "Card payments arrive with Stripe. Meanwhile, call or write and we will tell you how.",
      amounts: [
        { amount: 2_500, buys: "Paint and brushes for one student, one month." },
        { amount: 5_000, buys: "A seat on the bus for a field trip." },
        { amount: 10_000, buys: "A full month of class for a student on scholarship." },
        { amount: 30_000, buys: "A quarter of classes, materials included." },
      ],
      usesTitle: "Where it goes",
      receiptTitle: "For your taxes",
      soonTitle: "Online donations are on the way.",
      soonBody: "Until the payment account is open, the fastest way to give is to call.",
      callCta: "Call the foundation",
      writeCta: "Write to us",
    },

    /* ── Tienda ─────────────────────────────────────────────────────────── */
    store: {
      metaTitle: "Store",
      metaDesc:
        "Original pieces by our students. Part of every sale goes straight to the student who made it.",
      eyebrow: "Made by our students",
      title: "Take a piece home.",
      lead: "Every one of these was made in a Saturday class. Part of the sale goes to whoever made it.",
      shareLabel: "to the student",
      sold: "Sold",
      soldNote: "This one already found a home.",
      availableTitle: "Looking for a wall",
      soldTitle: "Already sold",
      soldCount: "{n} sold",
      soldOne: "1 sold",
      soldOnLabel: "Sold on",
      soonTitle: "Not for sale online yet.",
      soonBody:
        "The checkout arrives with the payment account. If a piece caught your eye, write to us and we will tell you about it.",
      askCta: "Ask about a piece",
      restTitle: "Where the rest goes",
      restBody: "Materials, field trips, and seats for students who cannot pay.",
      byLabel: "by",
    },

    /* ── Voluntariado ───────────────────────────────────────────────────── */
    volunteer: {
      metaTitle: "Volunteer and internships",
      metaDesc:
        "Volunteer or intern with us. Your hours are recorded from day one, and you leave with a signed letter.",
      eyebrow: "Volunteers and interns",
      title: "Come help. We keep the record.",
      lead: "Every hour you give is written down — so that at the end there is something with your name on it.",
      stepsTitle: "How it goes",
      steps: [
        { title: "Apply", body: "A short form. Tell us what you are good at." },
        { title: "Wait your turn", body: "If there is a queue, we email you your place in it." },
        { title: "Show up", body: "Saturdays, with the students." },
        { title: "Take the letter", body: "Signed, with your exact hours on it." },
      ],
      trackTitle: "About the record",
      trackBody:
        "Everything you do with us is logged: the days, the hours, the class. We tell you now, before you apply, because that record is what makes the letter at the end worth anything.",
      declareTitle: "What we ask on the form",
      declare: [
        "Whether you are certified in something, or working toward it",
        "Whether you are here for work experience or to help",
        "Which days you can actually come",
      ],
      internTitle: "Internships",
      internBody:
        "Same process, longer commitment, and a letter that speaks to the work — not just the hours.",
      cta: "Apply",
      formLead: "The form takes about ten minutes and you only fill it once.",
      soon: "The form arrives soon. Meanwhile, write to us and we will start the process.",
    },

    /* ── Blog ───────────────────────────────────────────────────────────── */
    blog: {
      metaTitle: "Blog",
      metaDesc: "What we are working on, written by the people doing it.",
      eyebrow: "From the foundation",
      title: "What is happening in the room.",
      lead: "Written by the people doing it — not by a marketing department.",
      emptyTitle: "Nothing published yet.",
      emptyBody:
        "The foundation writes these from its own panel. When the first one goes up, it shows here.",
      categoriesTitle: "What we will write about",
      categories: ["Classes", "Students", "Events", "Volunteers", "The store"],
      meanwhileTitle: "Meanwhile",
      meanwhileBody: "The work goes up on Instagram and Facebook as it happens.",
    },

    /* ── Contacto ───────────────────────────────────────────────────────── */
    contact: {
      metaTitle: "Contact",
      metaDesc: "Call, write, or come by. Two addresses: the office and the classes.",
      eyebrow: "Talk to a person",
      title: "Call. Somebody answers.",
      lead: "For registration, donations, volunteering, or a question about a piece.",
      callTitle: "Call",
      writeTitle: "Write",
      extLabel: "ext.",
      officeTitle: "The office",
      officeNote: "Mail, paperwork, appointments.",
      venueTitle: "The classes",
      venueNote: "Saturdays. This is the one you want on a class day.",
      mapCta: "Open in maps",
      hoursTitle: "Class hours",
      followTitle: "Follow the work",
    },

    /* ── Inscripción ────────────────────────────────────────────────────── */
    register: {
      metaTitle: "Register",
      metaDesc:
        "Register yourself or someone in your care for art, theatre or guitar classes in Miami.",
      eyebrow: "Art, theatre, guitar",
      title: "Four questions and you are in.",
      lead: "Short, in plain language, and it remembers where you left off.",
      stepsTitle: "What we will ask",
      steps: [
        {
          title: "Who is this for?",
          body: "You, or someone in your care. If it is for a child, we take your details and theirs.",
        },
        {
          title: "Which classes?",
          body: "One, two or all three. The second one is half price.",
        },
        {
          title: "Any support needed?",
          body: "One-on-one attention, at no extra cost. Ticking this box changes nothing else.",
        },
        {
          title: "Photos: yes or no?",
          body: "Whether we can photograph the student in class. Saying no keeps them in everything else.",
        },
      ],
      formTitle: "Six short steps.",
      formBody:
        "Fill it in once and the foundation takes it from there. No payment on this form — we confirm the seat first, then tell you how to pay.",
      startCta: "Start the registration",
      pickCta: "See the classes first",
      callCta: "Call to register",
      termsNote: "Registering means accepting the terms and conditions.",
      termsCta: "Read the terms",
    },
  },

  es: {
    /* ── Nosotros ───────────────────────────────────────────────────────── */
    about: {
      metaTitle: "Nosotros",
      metaDesc:
        "Una fundación de arte en Miami desde 2008. Clases para estudiantes de todas las capacidades, donde el apoyo se ajusta a la persona.",
      eyebrow: "Miami, Florida · Desde 2008",
      title: "La capacidad es de donde partimos, no lo que pedimos.",
      lead: "Un salón, tres clases, y el apoyo que cada estudiante necesite para estar en él.",
      stats: [
        { n: "2008", label: "Haciendo arte juntos desde" },
        { n: "501(c)(3)", label: "Organización registrada" },
        { n: "3", label: "Clases, todos los sábados" },
      ],
      pillarsTitle: "Qué hacemos",
      pillars: [
        { title: "Enseñar", body: "Arte, teatro y guitarra. Clase de verdad, no entretenimiento." },
        { title: "Acompañar", body: "Atención uno a uno para quien la necesite, sin costo." },
        { title: "Mostrar", body: "Eventos y shows públicos. La obra sale del salón." },
        { title: "Vender", body: "El estudiante gana con sus propias piezas en la tienda." },
      ],
      founderTitle: "Quién la empezó",
      founderRole: "Fundador",
      founderBody:
        "La fundación salió de una idea simple: que la discapacidad de una persona cambie cuánta ayuda recibe, y nada más.",
      modelTitle: "El modelo ABArt",
      modelBody:
        "El arte es la actividad; debajo va el apoyo estructurado. El estudiante viene a hacer algo — el método es lo que lo hace posible.",
      ctaTitle: "Dos maneras de entrar.",
      ctaClasses: "Ver las clases",
      ctaDonate: "Donar",
    },

    /* ── Clases ─────────────────────────────────────────────────────────── */
    classes: {
      metaTitle: "Clases",
      metaDesc:
        "Arte, teatro y guitarra todos los sábados en Miami. Una clase $100 al mes; cada clase que sumes va a mitad de precio.",
      eyebrow: "Todos los sábados",
      title: "Un sábado. Hasta tres clases.",
      lead: "Van una detrás de otra, en el mismo edificio. Toma una, dos o las tres sin hacer otro viaje.",
      dayTitle: "Cómo es un sábado",
      dayLead: "Un solo viaje. Se quedan lo que quieran.",
      pickTitle: "Arma tu sábado",
      includedTitle: "Qué viene incluido",
      included: [
        { title: "Materiales", body: "Pintura, lienzos, instrumentos. No hay que comprar nada." },
        { title: "Apoyo", body: "Atención uno a uno cuando el estudiante la necesita." },
        { title: "Sin experiencia", body: "Nadie tiene que saber nada para empezar." },
        { title: "Cancela cuando quieras", body: "Es mensual. Se corta cuando lo digas." },
      ],
      venueTitle: "Dónde",
      venueNote: "Las clases no son en la oficina. Esta es la dirección que importa un sábado.",
      officeNote: "El correo y los papeles van a la oficina.",
    },

    /* ── Donar ──────────────────────────────────────────────────────────── */
    donate: {
      metaTitle: "Donar",
      metaDesc:
        "Cada dólar va a materiales, paseos o una beca. Somos 501(c)(3) — te enviamos el recibo para tus impuestos.",
      eyebrow: "501(c)(3) · CH73874",
      title: "Regálale un lugar a un estudiante.",
      lead: "Materiales, paseos, y lugares pagados para familias que no pueden cubrir la cuota.",
      amountsTitle: "Qué compra cada monto",
      amountsNote: "Los pagos con tarjeta llegan con Stripe. Mientras tanto, llama o escribe y te decimos cómo.",
      amounts: [
        { amount: 2_500, buys: "Pintura y pinceles para un estudiante, un mes." },
        { amount: 5_000, buys: "Un asiento en el bus para un paseo." },
        { amount: 10_000, buys: "Un mes completo de clase para un estudiante becado." },
        { amount: 30_000, buys: "Un trimestre de clases, con materiales." },
      ],
      usesTitle: "A dónde va",
      receiptTitle: "Para tus impuestos",
      soonTitle: "Las donaciones en línea vienen en camino.",
      soonBody: "Hasta que abra la cuenta de pagos, lo más rápido es llamar.",
      callCta: "Llamar a la fundación",
      writeCta: "Escríbenos",
    },

    /* ── Tienda ─────────────────────────────────────────────────────────── */
    store: {
      metaTitle: "Tienda",
      metaDesc:
        "Piezas originales de nuestros estudiantes. Parte de cada venta va directo al estudiante que la hizo.",
      eyebrow: "Hecho por nuestros estudiantes",
      title: "Llévate una pieza.",
      lead: "Cada una salió de una clase de sábado. Parte de la venta va a quien la hizo.",
      shareLabel: "al estudiante",
      sold: "Vendido",
      soldNote: "Esta ya encontró casa.",
      availableTitle: "Buscando pared",
      soldTitle: "Ya vendidas",
      soldCount: "{n} vendidas",
      soldOne: "1 vendida",
      soldOnLabel: "Vendida el",
      soonTitle: "Todavía no se venden en línea.",
      soonBody:
        "El pago llega con la cuenta de cobros. Si una pieza te gustó, escríbenos y te contamos de ella.",
      askCta: "Preguntar por una pieza",
      restTitle: "A dónde va el resto",
      restBody: "Materiales, paseos, y lugares para estudiantes que no pueden pagar.",
      byLabel: "de",
    },

    /* ── Voluntariado ───────────────────────────────────────────────────── */
    volunteer: {
      metaTitle: "Voluntariado y pasantías",
      metaDesc:
        "Sé voluntario o pasante. Tus horas quedan registradas desde el primer día, y te vas con una carta firmada.",
      eyebrow: "Voluntarios y pasantes",
      title: "Ven a ayudar. Nosotros llevamos el registro.",
      lead: "Cada hora que das queda escrita — para que al final haya algo con tu nombre.",
      stepsTitle: "Cómo funciona",
      steps: [
        { title: "Postúlate", body: "Un formulario corto. Cuéntanos en qué eres bueno." },
        { title: "Espera tu turno", body: "Si hay cola, te avisamos por correo qué lugar tienes." },
        { title: "Ven", body: "Los sábados, con los estudiantes." },
        { title: "Llévate la carta", body: "Firmada, con tus horas exactas." },
      ],
      trackTitle: "Sobre el registro",
      trackBody:
        "Todo lo que haces con nosotros queda anotado: los días, las horas, la clase. Te lo decimos ahora, antes de que te postules, porque ese registro es lo que hace que la carta del final valga algo.",
      declareTitle: "Qué te preguntamos en el formulario",
      declare: [
        "Si estás certificado en algo, o certificándote",
        "Si vienes por experiencia laboral o por ayudar",
        "Qué días puedes venir de verdad",
      ],
      internTitle: "Pasantías",
      internBody:
        "El mismo proceso, más compromiso, y una carta que habla del trabajo — no solo de las horas.",
      cta: "Postularme",
      formLead: "El formulario toma unos diez minutos y se llena una sola vez.",
      soon: "El formulario llega pronto. Mientras tanto, escríbenos y arrancamos el proceso.",
    },

    /* ── Blog ───────────────────────────────────────────────────────────── */
    blog: {
      metaTitle: "Blog",
      metaDesc: "En qué estamos trabajando, contado por quienes lo hacen.",
      eyebrow: "Desde la fundación",
      title: "Lo que pasa en el salón.",
      lead: "Escrito por quienes lo hacen — no por un departamento de marketing.",
      emptyTitle: "Todavía no hay nada publicado.",
      emptyBody:
        "La fundación los escribe desde su propio panel. Cuando suba el primero, aparece acá.",
      categoriesTitle: "De qué vamos a escribir",
      categories: ["Clases", "Estudiantes", "Eventos", "Voluntarios", "La tienda"],
      meanwhileTitle: "Mientras tanto",
      meanwhileBody: "El trabajo sube a Instagram y Facebook a medida que pasa.",
    },

    /* ── Contacto ───────────────────────────────────────────────────────── */
    contact: {
      metaTitle: "Contacto",
      metaDesc: "Llama, escribe o pásate. Dos direcciones: la oficina y las clases.",
      eyebrow: "Habla con una persona",
      title: "Llama. Contesta alguien.",
      lead: "Para inscripciones, donaciones, voluntariado, o una pregunta sobre una pieza.",
      callTitle: "Llamar",
      writeTitle: "Escribir",
      extLabel: "ext.",
      officeTitle: "La oficina",
      officeNote: "Correo, papeles, citas.",
      venueTitle: "Las clases",
      venueNote: "Sábados. Esta es la que quieres un día de clase.",
      mapCta: "Abrir en el mapa",
      hoursTitle: "Horario de clases",
      followTitle: "Sigue el trabajo",
    },

    /* ── Inscripción ────────────────────────────────────────────────────── */
    register: {
      metaTitle: "Inscripción",
      metaDesc:
        "Inscríbete tú o inscribe a alguien a tu cargo en las clases de arte, teatro o guitarra en Miami.",
      eyebrow: "Arte, teatro, guitarra",
      title: "Cuatro preguntas y ya estás.",
      lead: "Corto, en palabras claras, y se acuerda de dónde te quedaste.",
      stepsTitle: "Qué te vamos a preguntar",
      steps: [
        {
          title: "¿Para quién es?",
          body: "Para ti, o para alguien a tu cargo. Si es para un hijo, tomamos tus datos y los suyos.",
        },
        {
          title: "¿Qué clases?",
          body: "Una, dos o las tres. La segunda va a mitad de precio.",
        },
        {
          title: "¿Necesita apoyo?",
          body: "Atención uno a uno, sin costo. Marcar esa casilla no cambia nada más.",
        },
        {
          title: "Fotos: ¿sí o no?",
          body: "Si podemos fotografiar al estudiante en clase. Decir que no lo deja dentro de todo lo demás.",
        },
      ],
      formTitle: "Seis pasos cortos.",
      formBody:
        "Se llena una vez y la fundación sigue desde ahí. En este formulario no se paga nada — primero confirmamos el lugar y después te decimos cómo pagar.",
      startCta: "Empezar la inscripción",
      pickCta: "Ver las clases primero",
      callCta: "Llamar para inscribirse",
      termsNote: "Inscribirse implica aceptar los términos y condiciones.",
      termsCta: "Leer los términos",
    },
  },
};

/** El inglés es el contrato: si al español le falta una clave, no compila. */
export type PageDict = (typeof DICTS)["en"];

export const PAGES: Record<Locale, PageDict> = DICTS;

export function p(locale: Locale): PageDict {
  return PAGES[locale];
}
