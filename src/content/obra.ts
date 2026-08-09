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

  /**
   * ¿Ya se vendió?
   *
   * Cuando está en `true`, la pieza sale con el sello rojo de VENDIDO encima
   * y deja de ofrecerse. Hoy lo pone una persona a mano; **cuando entre el
   * cobro (fase 6), esto lo escribe la compra**: Stripe confirma el pago y el
   * panel marca la pieza. Ninguna se vende dos veces porque son únicas — es
   * un cuadro, no una camiseta con tallas.
   *
   * Hasta que eso exista, todas van en `false`. No hay ninguna marcada de
   * ejemplo a propósito: decir que la obra de un estudiante se vendió cuando
   * no se vendió es mentir sobre una persona concreta, y el día que alguien
   * pregunte por ella hay que explicar por qué figuraba vendida.
   */
  vendida: boolean;

  /**
   * Cuándo se vendió, en `AAAA-MM-DD`. `null` mientras esté disponible.
   *
   * La fecha no es un adorno: de ella sale la regla de los treinta días.
   */
  vendidaEl: string | null;
};

/**
 * Una pieza vendida **no se puede retirar del sitio hasta 30 días después de
 * la venta**.
 *
 * Es una regla del dueño y tiene sentido de sobra: la venta es la prueba de
 * que la tienda funciona. Si una pieza desaparece el mismo día que se vende,
 * el sitio queda igual que si nunca hubiera pasado nada — nadie ve que se
 * vendan cuadros, y el estudiante que la hizo pierde el único registro
 * público de que su obra encontró comprador.
 *
 * Treinta días es tiempo de sobra para que la vea quien la tenga que ver: la
 * familia, el propio estudiante, alguien que dude si comprar.
 *
 * Esta función es la que va a consultar el panel del administrador en la
 * fase 6, antes de dejar borrar nada.
 */
export const DIAS_MINIMOS_EN_VITRINA = 30;

export function sePuedeRetirar(pieza: Pieza, hoy = new Date()): boolean {
  if (!pieza.vendida || !pieza.vendidaEl) return true;
  const dias = Math.floor(
    (hoy.getTime() - new Date(`${pieza.vendidaEl}T00:00:00Z`).getTime()) / 86_400_000,
  );
  return dias >= DIAS_MINIMOS_EN_VITRINA;
}

/** Días que le faltan a una pieza para poder retirarse. 0 si ya se puede. */
export function diasParaRetirar(pieza: Pieza, hoy = new Date()): number {
  if (!pieza.vendida || !pieza.vendidaEl) return 0;
  const dias = Math.floor(
    (hoy.getTime() - new Date(`${pieza.vendidaEl}T00:00:00Z`).getTime()) / 86_400_000,
  );
  return Math.max(0, DIAS_MINIMOS_EN_VITRINA - dias);
}

/** Las que siguen a la venta. */
export const disponibles = (obra: Pieza[]) => obra.filter((x) => !x.vendida);

/** Las que ya tienen dueño. Van en su propia categoría, con su cuenta. */
export const vendidas = (obra: Pieza[]) => obra.filter((x) => x.vendida);

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
    vendida: false,
    vendidaEl: null,
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
    vendida: false,
    vendidaEl: null,
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
    vendida: false,
    vendidaEl: null,
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
    vendida: false,
    vendidaEl: null,
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
    vendida: false,
    vendidaEl: null,
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
    vendida: false,
    vendidaEl: null,
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
    vendida: false,
    vendidaEl: null,
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
    vendida: false,
    vendidaEl: null,
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
    vendida: false,
    vendidaEl: null,
  },
];

/** Las tres que se muestran en la tarjeta de la tienda de la portada. */
export const OBRA_TIENDA = ["kandinsky-ko", "naturaleza-05", "noche-estrellada-gi"] as const;

/**
 * El porcentaje de cada venta que va al estudiante.
 *
 * ⚠️ **Este número es un marcador de posición.** La fundación todavía no lo
 * decidió, y en la fase 6 se configura por pieza desde el panel del
 * administrador — el encargo pide justamente eso.
 *
 * Está acá, en un solo lugar y con este cartel encima, para que la tienda se
 * pueda ver como se va a ver. Vive en una constante y no repartido por las
 * plantillas: el día que haya un número real se cambia una vez, no diez.
 *
 * Mientras sea un marcador, **no se publica la tienda con precios**.
 */
export const PORCENTAJE_ESTUDIANTE_PROVISIONAL = 40;
