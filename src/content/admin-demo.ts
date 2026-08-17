/**
 * Datos de ejemplo para el portal.
 *
 * Nada de esto es una persona real y ninguno de estos nombres pertenece a
 * nadie. Están acá por una razón concreta: un portal vacío no se puede
 * revisar. Con las tablas vacías no se ve si las columnas están bien, si el
 * estado "en cola" se entiende, ni si el precio se lee de un vistazo. Con
 * cinco filas de ejemplo, sí.
 *
 * El portal arranca **vacío**, que es la verdad, y los ejemplos se prenden con
 * un botón que deja un cartel visible arriba diciendo que son de ejemplo. Un
 * dato inventado sin cartel es una mentira esperando a que alguien la crea.
 *
 * Cuando exista la base de datos, este archivo se borra completo.
 */

/** Los nombres son de fantasía, y los estudiantes van con inicial, como en el sitio. */
export const INSCRIPCIONES_EJEMPLO = [
  {
    id: "e1",
    estudiante: "L. M.",
    edad: 9,
    cuidador: "María Fernández",
    propia: false,
    clases: ["art", "theatre"] as const,
    terapeuta: true,
    fotos: true,
    pago: "aldia" as const,
    terminos: "2026-01-15",
    aceptadoEl: "2026-08-02",
    fecha: "2026-08-02",
  },
  {
    id: "e2",
    estudiante: "J. R.",
    edad: 14,
    cuidador: "Carlos Ramírez",
    propia: false,
    clases: ["guitar"] as const,
    terapeuta: false,
    fotos: false,
    pago: "aldia" as const,
    terminos: "2026-01-15",
    aceptadoEl: "2026-08-05",
    fecha: "2026-08-05",
  },
  {
    id: "e3",
    estudiante: "Patricia Vega",
    edad: 31,
    cuidador: null,
    propia: true,
    clases: ["art", "theatre", "guitar"] as const,
    terapeuta: false,
    fotos: true,
    pago: "aldia" as const,
    terminos: "2026-01-15",
    aceptadoEl: "2026-08-08",
    fecha: "2026-08-08",
  },
  {
    id: "e4",
    estudiante: "A. S.",
    edad: 7,
    cuidador: "Lucía Sosa",
    propia: false,
    clases: ["art"] as const,
    terapeuta: true,
    fotos: true,
    pago: "vencido" as const,
    terminos: "2026-01-15",
    aceptadoEl: "2026-07-11",
    fecha: "2026-07-11",
  },
  {
    id: "e5",
    estudiante: "D. C.",
    edad: 12,
    cuidador: "Jorge Castro",
    propia: false,
    clases: ["theatre", "guitar"] as const,
    terapeuta: false,
    fotos: false,
    pago: "pausa" as const,
    terminos: "2026-01-15",
    aceptadoEl: "2026-06-20",
    fecha: "2026-06-20",
  },
];

export const VOLUNTARIOS_EJEMPLO = [
  {
    id: "v1",
    nombre: "Andrea Pérez",
    estudia: "Terapia ocupacional · FIU",
    desde: "2026-09-05",
    horasHechas: 24,
    horasPrometidas: 100,
    chequeoEmitido: "2026-06-14",
    estado: "aceptada" as const,
    cola: null,
  },
  {
    id: "v2",
    nombre: "Miguel Duarte",
    estudia: "Educación especial · Miami Dade College",
    desde: "2026-09-05",
    horasHechas: 0,
    horasPrometidas: 60,
    chequeoEmitido: "2026-08-01",
    estado: "nueva" as const,
    cola: null,
  },
  {
    id: "v3",
    nombre: "Sofía Blanco",
    estudia: "Psicología · UM",
    desde: "2026-10-03",
    horasHechas: 0,
    horasPrometidas: 120,
    chequeoEmitido: "2026-07-22",
    estado: "cola" as const,
    cola: 2,
  },
  {
    id: "v4",
    nombre: "Tomás Ferreira",
    estudia: "Trabajo social · FIU",
    desde: "2026-09-12",
    horasHechas: 88,
    horasPrometidas: 90,
    chequeoEmitido: "2026-03-02",
    estado: "aceptada" as const,
    cola: null,
  },
  {
    id: "v5",
    nombre: "Rosa Iglesias",
    estudia: "Bellas artes · New World School of the Arts",
    desde: "2026-11-07",
    horasHechas: 0,
    horasPrometidas: 40,
    chequeoEmitido: "2026-01-09",
    estado: "cola" as const,
    cola: 3,
  },
];

export const DONACIONES_EJEMPLO = [
  { id: "d1", donante: "Elena Ruiz", centavos: 10_000, tipo: "mensual" as const, fecha: "2026-08-14" },
  { id: "d2", donante: "Anónimo", centavos: 30_000, tipo: "unica" as const, fecha: "2026-08-12" },
  { id: "d3", donante: "Familia Navarro", centavos: 5_000, tipo: "mensual" as const, fecha: "2026-08-09" },
  { id: "d4", donante: "Hugo Bermúdez", centavos: 2_500, tipo: "unica" as const, fecha: "2026-08-04" },
  { id: "d5", donante: "Clara Mendoza", centavos: 10_000, tipo: "mensual" as const, fecha: "2026-08-01" },
];

export const ARTICULOS_EJEMPLO = [
  { id: "a1", titulo: "El primer día de clases de arte", estado: "publicado" as const, idioma: "es" as const, fecha: "2026-08-10" },
  { id: "a2", titulo: "Where art meets science", estado: "publicado" as const, idioma: "en" as const, fecha: "2026-08-03" },
  { id: "a3", titulo: "Cómo luchar por el IEP de tu hijo", estado: "borrador" as const, idioma: "es" as const, fecha: "2026-08-16" },
];

/**
 * Las piezas vendidas del ejemplo.
 *
 * Van por `slug`, para que en modo ejemplo la tienda del portal muestre la
 * regla de los 30 días con casos de los tres tipos: una recién vendida, una a
 * mitad de camino, y una que ya se puede retirar. Sin eso, la regla es un
 * párrafo; con esto, se ve.
 */
export const VENDIDAS_EJEMPLO: Record<string, string> = {
  // Recién vendida: faltan casi los 30 días completos.
  "naturaleza-03": "2026-08-13",
  // A mitad de camino.
  "kandinsky-gi": "2026-08-01",
  // Ya pasó el mes: se puede retirar de la vitrina.
  "naturaleza-05": "2026-06-28",
};

/** Las cifras del panel, en modo ejemplo. */
export const PANEL_EJEMPLO = {
  inscritos: 27,
  cobradoCentavos: 285_000,
  donadoCentavos: 57_500,
  vendidoCentavos: 96_000,
  voluntariosActivos: 6,
  enCola: 3,
  visitas: 1_842,
  pagosFallidos: 1,
};
