/**
 * La obra de los estudiantes.
 *
 * Salió del sitio actual (artfoundation-x-pwd.com), de la biblioteca de
 * medios del WordPress. Estaba ahí, en 4000 píxeles y 4.5 MB por archivo,
 * enterrada en páginas que nadie visita. Acá está reducida a 1000 píxeles en
 * WebP: las nueve juntas pesan menos que uno solo de los originales.
 *
 * ── Sobre los créditos ────────────────────────────────────────────────────
 *
 * Las iniciales vienen del nombre de archivo original (KO, XF, GI…). Se
 * dejan **solo las iniciales, nunca el nombre completo**: son menores, y el
 * nombre y apellido de un menor junto a su cara o su obra en una página que
 * Google indexa es información que no se puede retirar después.
 *
 * Las de la serie de naturaleza no traían iniciales. Van sin crédito antes
 * que con un crédito inventado.
 *
 * ── Sobre el texto alternativo ────────────────────────────────────────────
 *
 * Cada pieza lleva descripción en los dos idiomas, y describe **el cuadro**,
 * no el archivo. "Obra de estudiante" no le dice nada a nadie. En un sitio
 * sobre discapacidad, la obra tiene que llegarle también a quien no la ve.
 */

export type Pieza = {
  slug: string;
  /** Medidas reales del archivo, para reservar el espacio y que la página no salte. */
  w: number;
  h: number;
  /** Iniciales del estudiante. `null` cuando el original no las traía. */
  credito: string | null;
  tecnica: { en: string; es: string };
  alt: { en: string; es: string };
};

export const OBRA: Pieza[] = [
  {
    slug: "naturaleza-01",
    w: 797,
    h: 1000,
    credito: null,
    tecnica: { en: "Acrylic on paper", es: "Acrílico sobre papel" },
    alt: {
      en: "A gold branch with plum and magenta leaves on a bright green background.",
      es: "Una rama dorada con hojas color ciruela y magenta sobre un fondo verde intenso.",
    },
  },
  {
    slug: "kandinsky-ko",
    w: 773,
    h: 1000,
    credito: "K.O.",
    tecnica: { en: "Watercolour and ink", es: "Acuarela y tinta" },
    alt: {
      en: "Black looping lines over circles and squares in teal, pink and sand.",
      es: "Líneas negras en bucle sobre círculos y cuadrados en verde azulado, rosa y arena.",
    },
  },
  {
    slug: "naturaleza-05",
    w: 750,
    h: 1000,
    credito: null,
    tecnica: { en: "Acrylic on paper", es: "Acrílico sobre papel" },
    alt: {
      en: "A dark tree with orange leaves falling against a deep blue sky.",
      es: "Un árbol oscuro con hojas naranjas cayendo sobre un cielo azul profundo.",
    },
  },
  {
    slug: "noche-estrellada-gi",
    w: 1000,
    h: 813,
    credito: "G.I.",
    tecnica: { en: "Oil pastel on canvas board", es: "Pastel al óleo sobre tabla entelada" },
    alt: {
      en: "A Starry Night of their own: swirling stars over cypress trees and small houses.",
      es: "Su propia noche estrellada: estrellas en remolino sobre cipreses y casitas.",
    },
  },
  {
    slug: "naturaleza-04",
    w: 750,
    h: 1000,
    credito: null,
    tecnica: { en: "Acrylic on paper", es: "Acrílico sobre papel" },
    alt: {
      en: "Large grey-brown leaves and a red flower on orange and pink.",
      es: "Hojas grandes de color pardo y una flor roja sobre naranja y rosa.",
    },
  },
  {
    slug: "kandinsky-xf",
    w: 773,
    h: 1000,
    credito: "X.F.",
    tecnica: { en: "Watercolour and ink", es: "Acuarela y tinta" },
    alt: {
      en: "A long black line loops across pale yellow and pink, catching orange circles.",
      es: "Una línea negra larga cruza en bucles un fondo amarillo y rosa, atrapando círculos naranjas.",
    },
  },
  {
    slug: "naturaleza-03",
    w: 750,
    h: 1000,
    credito: null,
    tecnica: { en: "Acrylic on paper", es: "Acrílico sobre papel" },
    alt: {
      en: "Leaves and one flower in pink, orange and green over blue and lime.",
      es: "Hojas y una flor en rosa, naranja y verde sobre azul y verde lima.",
    },
  },
  {
    slug: "kandinsky-gi",
    w: 773,
    h: 1000,
    credito: "G.I.",
    tecnica: { en: "Watercolour and ink", es: "Acuarela y tinta" },
    alt: {
      en: "An eye, a spiral and blue rays float over soft grey and cream.",
      es: "Un ojo, una espiral y rayos azules flotan sobre gris suave y crema.",
    },
  },
  {
    slug: "naturaleza-09",
    w: 785,
    h: 1000,
    credito: null,
    tecnica: { en: "Acrylic on paper", es: "Acrílico sobre papel" },
    alt: {
      en: "A slim tree with coloured leaves growing out of a pink pot.",
      es: "Un árbol delgado de hojas de colores que crece de una maceta rosa.",
    },
  },
];

/** Las tres que se muestran en la tarjeta de la tienda. */
export const OBRA_TIENDA = ["kandinsky-ko", "naturaleza-05", "noche-estrellada-gi"] as const;
