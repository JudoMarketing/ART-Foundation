import type { Locale } from "@/lib/i18n";

/**
 * Los textos del portal del administrador, en los dos idiomas.
 *
 * El portal es de Mónica, y de quien ella sume después. Va en los dos idiomas
 * por la misma razón que el sitio: la fundación atiende en los dos, y quien
 * entre acá dentro de dos años puede no ser quien entra hoy.
 *
 * La voz es distinta a la del sitio público. Afuera hay que convencer; acá
 * adentro hay que trabajar rápido. Así que los textos son cortos, dicen qué
 * hace el botón, y no hay ni una frase de más.
 */

const DICTS = {
  es: {
    /* ── La puerta ──────────────────────────────────────────────────────── */
    login: {
      metaTitle: "Entrar al portal",
      eyebrow: "ART Foundation",
      title: "Portal del administrador",
      lead: "Acá se manejan las inscripciones, los voluntarios, la tienda y el blog.",
      label: "Clave",
      hint: "La clave la configura Judo Marketing en Vercel. Si no la tienes, escríbenos.",
      submit: "Entrar",
      errBad: "Esa clave no es. Fíjate en las mayúsculas.",
      errEmpty: "Escribe la clave.",
      notConfiguredTitle: "El portal todavía no tiene clave",
      notConfiguredBody:
        "Falta configurar ADMIN_PASSWORD en Vercel. Hasta que esté, el portal no abre para nadie: preferimos la puerta trabada a la puerta abierta.",
    },

    /* ── El marco: menú, avisos, salida ─────────────────────────────────── */
    chrome: {
      portal: "Portal",
      nav: {
        panel: "Panel",
        inscripciones: "Inscripciones",
        voluntarios: "Voluntarios",
        tienda: "Tienda",
        donaciones: "Donaciones",
        blog: "Blog",
      },
      logout: "Salir",
      skipToContent: "Ir al contenido",
      langLabel: "Idioma del portal",
      draftTitle: "Este portal es un borrador visual.",
      draftBody:
        "Todavía no hay base de datos, así que nada de lo que ves acá es real ni se guarda. Está construido para que veas cómo va a funcionar y digas qué cambiar antes de que se construya de verdad.",
      demoOn: "Ver con datos de ejemplo",
      demoOff: "Ver como está de verdad: vacío",
      demoBanner: "Datos de ejemplo. Nada de esto es una persona real.",
    },

    /* ── Panel ──────────────────────────────────────────────────────────── */
    panel: {
      metaTitle: "Panel",
      title: "Panel",
      lead: "Todo lo de la fundación en una pantalla.",
      period: "Este mes",
      kpis: {
        inscritos: "Estudiantes inscritos",
        cobrado: "Cobrado en clases",
        donado: "Donado",
        vendido: "Vendido en la tienda",
        voluntariosActivos: "Voluntarios activos",
        enCola: "Voluntarios en cola",
        visitas: "Visitas al sitio",
        pagosFallidos: "Pagos que fallaron",
      },
      pending: "Pendiente de atención",
      pendingEmpty: "Nada pendiente. Buen día.",
      visitsNote:
        "Las visitas salen del sitio, no de Judo. Las cifras de la fundación se ven acá y en ningún otro lado.",
    },

    /* ── Inscripciones ──────────────────────────────────────────────────── */
    inscripciones: {
      metaTitle: "Inscripciones",
      title: "Inscripciones",
      lead: "Quién se inscribió, a qué clase, y qué firmó.",
      empty: "Todavía no hay inscripciones.",
      emptyWhy:
        "Cuando el formulario de inscripción guarde en base de datos, cada familia que se inscriba aparece acá.",
      cols: {
        estudiante: "Estudiante",
        cuidador: "Quien inscribe",
        clases: "Clases",
        terapeuta: "Terapeuta 1 a 1",
        fotos: "Fotos",
        pago: "Pago",
        terminos: "Términos",
        fecha: "Fecha",
      },
      terapeutaSi: "Sí, sin costo",
      terapeutaNo: "No hace falta",
      fotosSi: "Autoriza",
      fotosNo: "No autoriza",
      fotosNoNota:
        "No autoriza fotos. Para eventos públicos hay que pedirle permiso aparte, cada vez.",
      pago: { aldia: "Al día", vencido: "Vencido", pausa: "En pausa", cancelado: "Cancelado" },
      terminosNota: "Versión aceptada y fecha. Se guarda para siempre, es el respaldo legal.",
      selfLabel: "Se inscribió sola",
    },

    /* ── Voluntarios ────────────────────────────────────────────────────── */
    voluntarios: {
      metaTitle: "Voluntarios",
      title: "Voluntarios y pasantes",
      lead: "Postulaciones, horas y cartas.",
      empty: "Todavía no hay postulaciones guardadas.",
      emptyWhy:
        "Hoy el formulario de voluntariado llega por correo a mgonzalez@artfoundation-x-pwd.com y no se guarda en ningún lado. Cuando haya base de datos, cada postulación entra acá con su estado.",
      cols: {
        persona: "Persona",
        estudia: "Estudia",
        desde: "Quiere empezar",
        horas: "Horas",
        chequeo: "Chequeo policial",
        estado: "Estado",
      },
      estados: {
        nueva: "Nueva",
        aceptada: "Aceptada",
        cola: "En cola",
        rechazada: "Rechazada",
      },
      horasFormato: "de",
      colaPos: "Puesto",
      colaNota:
        "Al poner a alguien en cola se le manda un correo con su puesto y un estimado de cuándo lo llaman. Nadie se queda esperando sin saber.",
      chequeoOk: "Vigente",
      chequeoVence: "Vence pronto",
      chequeoVencido: "Vencido",
      chequeoNota:
        "El chequeo policial tiene que tener menos de 6 meses. El archivo no se guarda: llega al correo de Mónica y ahí queda. Acá se guarda la fecha, nada más.",
      cartaTitle: "Carta de recomendación",
      cartaBody:
        "Mónica pone las horas, el sistema llena el PDF y ella firma desde acá. Sale el documento listo para entregar.",
      cartaCta: "Firmar y generar",
      cartaFalta: "Falta el PDF de la carta con sus campos. Lo tiene que subir la fundación.",
      registrarHoras: "Cargar horas",
    },

    /* ── Tienda ─────────────────────────────────────────────────────────── */
    tienda: {
      metaTitle: "Tienda",
      title: "Tienda",
      lead: "Las piezas, lo que se vendió, y cuánto le toca a cada estudiante.",
      disponibles: "En venta",
      vendidas: "Vendidas",
      vendidasCuenta: "piezas vendidas",
      porcentaje: "Al estudiante",
      porcentajeNota:
        "El porcentaje se configura por pieza. En el sitio público NO se muestra: el dueño pidió que no sea público.",
      precio: "Precio",
      vendidaEl: "Vendida el",
      retirable: "Se puede retirar",
      retirableEn: "Se puede retirar en",
      dias: "días",
      reglaNota:
        "Una pieza vendida se queda 30 días en la vitrina con su sello SOLD. Es lo que hace que el estudiante vea su cuadro vendido, y lo que le muestra a quien entra que acá se vende de verdad. Recién después pasa a Vendidas.",
      credito: "Autor",
      creditoNota:
        "Iniciales, nunca el nombre completo: son menores. La regla vale también acá adentro.",
      empty: "No hay piezas cargadas.",
    },

    /* ── Donaciones ─────────────────────────────────────────────────────── */
    donaciones: {
      metaTitle: "Donaciones",
      title: "Donaciones",
      lead: "Quién donó, cuánto, y si es de una vez o cada mes.",
      empty: "Todavía no hay donaciones.",
      emptyWhy:
        "Falta conectar Stripe. Hasta entonces las donaciones entran por teléfono o por correo y no pasan por acá.",
      cols: {
        donante: "Donante",
        monto: "Monto",
        tipo: "Tipo",
        recibo: "Recibo",
        fecha: "Fecha",
      },
      tipoUnica: "Una vez",
      tipoMensual: "Cada mes",
      reciboEnviado: "Enviado",
      reciboNota:
        "Cada donación manda su recibo por correo con el 501(c)(3) y el registro CH73874, para que el donante lo use en sus impuestos.",
      total: "Total del mes",
    },

    /* ── Blog ───────────────────────────────────────────────────────────── */
    blog: {
      metaTitle: "Blog",
      title: "Blog",
      lead: "Escribir y publicar sin tocar código.",
      nuevo: "Escribir artículo",
      empty: "Todavía no hay artículos en el sitio nuevo.",
      emptyWhy:
        "Hay 14 artículos en el WordPress viejo que están indexados en Google y todavía no se migraron. Mientras eso no pase, sus direcciones redirigen a este índice, que está vacío. No borrar el WordPress.",
      cols: { titulo: "Título", estado: "Estado", idioma: "Idioma", fecha: "Fecha" },
      estados: { borrador: "Borrador", publicado: "Publicado" },
      editorTitle: "Artículo nuevo",
      editorNota:
        "El editor de verdad se construye en la fase 5. Esto muestra qué campos va a tener.",
      campos: {
        titulo: "Título",
        resumen: "Resumen",
        cuerpo: "Texto",
        imagen: "Imagen de portada",
        categoria: "Categoría",
        idioma: "Idioma",
      },
      guardar: "Guardar borrador",
      publicar: "Publicar",
    },

    /* ── Comunes ────────────────────────────────────────────────────────── */
    comun: {
      ver: "Ver",
      volver: "Volver al panel",
      proximo: "Fase 5",
      proximoNota: "Esto todavía no funciona. Es el dibujo de cómo va a funcionar.",
      sinDatos: "Sin datos",
    },
  },

  en: {
    login: {
      metaTitle: "Sign in",
      eyebrow: "ART Foundation",
      title: "Administrator portal",
      lead: "Registrations, volunteers, the store and the blog are managed here.",
      label: "Password",
      hint: "Judo Marketing sets the password in Vercel. If you don't have it, write to us.",
      submit: "Sign in",
      errBad: "That's not the password. Check your capitals.",
      errEmpty: "Type the password.",
      notConfiguredTitle: "The portal has no password yet",
      notConfiguredBody:
        "ADMIN_PASSWORD is not set in Vercel. Until it is, the portal opens for nobody: we would rather have the door stuck shut than standing open.",
    },

    chrome: {
      portal: "Portal",
      nav: {
        panel: "Dashboard",
        inscripciones: "Registrations",
        voluntarios: "Volunteers",
        tienda: "Store",
        donaciones: "Donations",
        blog: "Blog",
      },
      logout: "Sign out",
      skipToContent: "Skip to content",
      langLabel: "Portal language",
      draftTitle: "This portal is a visual draft.",
      draftBody:
        "There is no database yet, so nothing here is real and nothing gets saved. It is built so you can see how it will work and say what to change before it gets built for real.",
      demoOn: "Show example data",
      demoOff: "Show it as it really is: empty",
      demoBanner: "Example data. None of this is a real person.",
    },

    panel: {
      metaTitle: "Dashboard",
      title: "Dashboard",
      lead: "The whole foundation on one screen.",
      period: "This month",
      kpis: {
        inscritos: "Students enrolled",
        cobrado: "Collected in classes",
        donado: "Donated",
        vendido: "Store sales",
        voluntariosActivos: "Active volunteers",
        enCola: "Volunteers queued",
        visitas: "Site visits",
        pagosFallidos: "Failed payments",
      },
      pending: "Needs attention",
      pendingEmpty: "Nothing pending. Good day.",
      visitsNote:
        "Visits come from the site, not from Judo. The foundation's numbers live here and nowhere else.",
    },

    inscripciones: {
      metaTitle: "Registrations",
      title: "Registrations",
      lead: "Who signed up, for which class, and what they signed.",
      empty: "No registrations yet.",
      emptyWhy:
        "Once the registration form saves to a database, every family that signs up shows up here.",
      cols: {
        estudiante: "Student",
        cuidador: "Signed up by",
        clases: "Classes",
        terapeuta: "1-on-1 therapist",
        fotos: "Photos",
        pago: "Payment",
        terminos: "Terms",
        fecha: "Date",
      },
      terapeutaSi: "Yes, at no cost",
      terapeutaNo: "Not needed",
      fotosSi: "Consents",
      fotosNo: "Does not consent",
      fotosNoNota:
        "Does not consent to photos. Public events need separate permission, every time.",
      pago: { aldia: "Current", vencido: "Past due", pausa: "Paused", cancelado: "Canceled" },
      terminosNota: "Version accepted and date. Kept forever, it is the legal record.",
      selfLabel: "Signed herself up",
    },

    voluntarios: {
      metaTitle: "Volunteers",
      title: "Volunteers and interns",
      lead: "Applications, hours and letters.",
      empty: "No applications saved yet.",
      emptyWhy:
        "Today the volunteer form arrives by email at mgonzalez@artfoundation-x-pwd.com and is not stored anywhere. Once there is a database, every application lands here with its status.",
      cols: {
        persona: "Person",
        estudia: "Studying",
        desde: "Wants to start",
        horas: "Hours",
        chequeo: "Background check",
        estado: "Status",
      },
      estados: {
        nueva: "New",
        aceptada: "Accepted",
        cola: "Queued",
        rechazada: "Declined",
      },
      horasFormato: "of",
      colaPos: "Position",
      colaNota:
        "Queueing someone sends them an email with their position and an estimate of when they will be called. Nobody waits without knowing.",
      chequeoOk: "Valid",
      chequeoVence: "Expiring soon",
      chequeoVencido: "Expired",
      chequeoNota:
        "The background check must be less than 6 months old. The file is not stored: it reaches Monica's inbox and stays there. Only the date is kept here.",
      cartaTitle: "Recommendation letter",
      cartaBody:
        "Monica enters the hours, the system fills the PDF, and she signs from here. Out comes a finished document.",
      cartaCta: "Sign and generate",
      cartaFalta: "The letter PDF with its fields is missing. The foundation has to provide it.",
      registrarHoras: "Log hours",
    },

    tienda: {
      metaTitle: "Store",
      title: "Store",
      lead: "The pieces, what sold, and each student's share.",
      disponibles: "For sale",
      vendidas: "Sold",
      vendidasCuenta: "pieces sold",
      porcentaje: "To the student",
      porcentajeNota:
        "The share is set per piece. It is NOT shown on the public site: the owner asked to keep it private.",
      precio: "Price",
      vendidaEl: "Sold on",
      retirable: "Can be removed",
      retirableEn: "Can be removed in",
      dias: "days",
      reglaNota:
        "A sold piece stays on the wall for 30 days with its SOLD sticker. That is what lets the student see their painting sold, and what shows a visitor that work really sells here. Only then does it move to Sold.",
      credito: "Artist",
      creditoNota:
        "Initials, never full names: they are minors. The rule holds in here too.",
      empty: "No pieces loaded.",
    },

    donaciones: {
      metaTitle: "Donations",
      title: "Donations",
      lead: "Who gave, how much, and whether it is once or monthly.",
      empty: "No donations yet.",
      emptyWhy:
        "Stripe is not connected yet. Until then donations come in by phone or email and never pass through here.",
      cols: {
        donante: "Donor",
        monto: "Amount",
        tipo: "Kind",
        recibo: "Receipt",
        fecha: "Date",
      },
      tipoUnica: "One time",
      tipoMensual: "Monthly",
      reciboEnviado: "Sent",
      reciboNota:
        "Every donation sends its receipt by email with the 501(c)(3) and registration CH73874, so the donor can use it on their taxes.",
      total: "Month total",
    },

    blog: {
      metaTitle: "Blog",
      title: "Blog",
      lead: "Write and publish without touching code.",
      nuevo: "Write an article",
      empty: "No articles on the new site yet.",
      emptyWhy:
        "There are 14 articles on the old WordPress that Google has indexed and that have not been migrated. Until they are, their addresses redirect to this index, which is empty. Do not delete the WordPress.",
      cols: { titulo: "Title", estado: "Status", idioma: "Language", fecha: "Date" },
      estados: { borrador: "Draft", publicado: "Published" },
      editorTitle: "New article",
      editorNota:
        "The real editor gets built in phase 5. This shows which fields it will have.",
      campos: {
        titulo: "Title",
        resumen: "Summary",
        cuerpo: "Body",
        imagen: "Cover image",
        categoria: "Category",
        idioma: "Language",
      },
      guardar: "Save draft",
      publicar: "Publish",
    },

    comun: {
      ver: "View",
      volver: "Back to dashboard",
      proximo: "Phase 5",
      proximoNota: "This does not work yet. It is the drawing of how it will work.",
      sinDatos: "No data",
    },
  },
} as const;

export type AdminDict = (typeof DICTS)["es"];

export function adm(locale: Locale): AdminDict {
  return DICTS[locale] as AdminDict;
}
