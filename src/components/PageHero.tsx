import Image from "next/image";

/**
 * La cabecera de las páginas interiores.
 *
 * Todas iguales por una razón: quien entra a una página desde Google tiene
 * que saber en tres segundos dónde cayó. Si cada página se presenta distinto,
 * cada una hay que aprenderla de nuevo.
 *
 * El `tone` cambia solo el color de fondo, y sigue el color de la sección a
 * la que pertenece la página en la portada: las clases son magenta, las
 * donaciones tinta, la tienda naranja, el voluntariado celeste. Es un mapa de
 * colores, no decoración, quien navega mucho el sitio empieza a saber dónde
 * está antes de leer el título.
 */

const TONES = {
  brand: "bg-brand-solid text-paper",
  ink: "bg-ink text-paper",
  sky: "bg-sky text-ink",
  sun: "bg-sun text-ink",
  leaf: "bg-leaf text-ink",
  paper: "paper-grain bg-paper-warm text-ink",
} as const;

/**
 * El color del texto secundario en cada fondo.
 *
 * Acá hubo un error que vale dejar escrito, porque es el más fácil de
 * repetir: al principio esto bajaba la opacidad del texto (`text-paper/85`,
 * `text-ink/80`) para darle jerarquía al título. Sobre fondos suaves no pasa
 * nada, pero sobre el magenta y el celeste (que ya son colores fuertes) la
 * opacidad se come el contraste y lo tira a 2.9:1. Se veía "elegante" y era
 * ilegible.
 *
 * Ahora todos van a color pleno. La jerarquía la da el tamaño y el peso de la
 * letra, que no le cuestan legibilidad a nadie. Solo la tinta conserva algo
 * de opacidad, porque sobre un fondo casi negro el blanco al 90% sigue
 * andando en 15:1.
 */
const SOFT = {
  brand: "text-paper",
  ink: "text-paper/90",
  sky: "text-ink",
  sun: "text-ink",
  leaf: "text-ink",
  paper: "text-ink-soft",
} as const;

/**
 * El color de los garabatos en cada fondo.
 *
 * Sobre fondos claros con texto oscuro van claros, para aclarar todavía más.
 * Sobre el magenta, que lleva texto blanco, van oscuros, si van claros
 * aclaran el magenta y el blanco deja de contrastar. Sobre la tinta, que es
 * casi negra, van claros: aclararla un poco no le quita nada al blanco, que
 * ahí anda por encima de 12:1.
 */
/**
 * El velo que va encima de la obra.
 *
 * Opaco del todo a la izquierda y abriéndose hacia la derecha. Los porcentajes
 * no son al gusto: a la izquierda el color tiene que estar entero para que el
 * contraste del título sea exactamente el mismo que sin imagen, y a la derecha
 * puede aflojar porque ahí no hay texto. En pantalla chica el texto ocupa todo
 * el ancho, así que el velo se queda opaco de lado a lado.
 */
/* Dos capas y no una, y hay motivo.
 *
 * El primer intento ponía el color sólido y el degradado en el mismo div
 * (`bg-sun sm:bg-linear-to-r ...`). Las dos reglas se aplican: el degradado
 * es `background-image` y el color es `background-color`, así que el color
 * queda pintado DETRÁS y se ve por donde el degradado es transparente. La
 * obra estaba ahí, cargada y colocada, y no se veía ni un píxel.
 *
 * Con dos capas exclusivas no hay forma de que eso vuelva a pasar: una tapa
 * entera para pantalla chica, donde el texto ocupa todo el ancho, y otra en
 * degradado para pantalla grande, donde el texto vive a la izquierda y la
 * obra puede respirar a la derecha.
 *
 * (Y de paso: en Tailwind 4 el degradado se llama `bg-linear-to-r`. Con el
 * nombre viejo, `bg-gradient-to-r`, la clase no existe y no se genera nada.) */
const VELO_SOLIDO = {
  brand: "bg-brand-solid",
  ink: "bg-ink",
  sky: "bg-sky",
  sun: "bg-sun",
  leaf: "bg-leaf",
  paper: "bg-paper-warm",
} as const;

const VELO_DEGRADADO = {
  brand: "bg-linear-to-r from-brand-solid from-30% via-brand-solid/92 to-brand-solid/45",
  ink: "bg-linear-to-r from-ink from-30% via-ink/92 to-ink/45",
  sky: "bg-linear-to-r from-sky from-30% via-sky/92 to-sky/45",
  sun: "bg-linear-to-r from-sun from-30% via-sun/92 to-sun/45",
  leaf: "bg-linear-to-r from-leaf from-30% via-leaf/92 to-leaf/45",
  paper: "bg-linear-to-r from-paper-warm from-30% via-paper-warm/92 to-paper-warm/45",
} as const;

const DOODLE = {
  brand: "text-ink",
  ink: "text-paper",
  sky: "text-paper",
  sun: "text-paper",
  leaf: "text-paper",
  paper: "text-ink",
} as const;

export default function PageHero({
  eyebrow,
  title,
  lead,
  tone = "paper",
  imagen,
  children,
}: {
  eyebrow?: string;
  title: string;
  lead?: string;
  tone?: keyof typeof TONES;
  /**
   * Obra de fondo, por su `slug` en `content/obra.ts`.
   *
   * Va detrás de un velo del color de la cabecera que arranca opaco a la
   * izquierda, donde vive el texto, y se abre hacia la derecha. Es el mismo
   * recurso del video de la portada, y por la misma razón: **el contraste no
   * se puede medir sobre una imagen**. Cada cuadro tiene zonas claras y
   * oscuras, así que el texto se apoya sobre el velo, que sí se conoce, y la
   * obra se ve donde no hay nada que leer.
   */
  imagen?: string;
  /** Lo que va debajo del texto: botones, datos sueltos, lo que haga falta. */
  children?: React.ReactNode;
}) {
  return (
    <section className={`relative isolate overflow-hidden ${TONES[tone]}`}>
      {imagen && (
        <>
          <Image
            src={`/obra/${imagen}.webp`}
            alt=""
            aria-hidden="true"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
          <div
            aria-hidden="true"
            className={`absolute inset-0 sm:hidden ${VELO_SOLIDO[tone]}`}
          />
          <div
            aria-hidden="true"
            className={`absolute inset-0 hidden sm:block ${VELO_DEGRADADO[tone]}`}
          />
        </>
      )}

      {/* Los garabatos de fondo. Con imagen no van: dos texturas encima de la
          misma cabecera es una de más, y la que pierde es la obra.

          Van solo en las cabeceras, donde hay tres
          líneas de texto grande y espacio de sobra, nunca detrás de un
          párrafo largo.

          El color no es estético, es de contraste: un dibujo encima del fondo
          CAMBIA el fondo, y con él cambia el contraste del texto. La regla es
          que el garabato tiene que empujar el fondo en dirección contraria al
          texto. Sobre el magenta, con letras blancas, unos garabatos blancos
          aclaran el fondo y tiran el contraste de 4.55 a 4.15, que es
          justamente por debajo del mínimo. Ahí van oscuros. */}
      {!imagen && <div aria-hidden="true" className={`doodles ${DOODLE[tone]}`} />}

      <div className="relative mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-24">
        {eyebrow && (
          <p className={`text-sm font-semibold uppercase tracking-[0.2em] ${SOFT[tone]}`}>
            {eyebrow}
          </p>
        )}
        <h1 className={`mt-4 text-5xl font-bold leading-[1.05] sm:text-6xl lg:text-7xl ${imagen ? "max-w-2xl" : "max-w-4xl"}`}>
          {title}
        </h1>
        {lead && (
          <p className={`mt-6 max-w-2xl text-xl leading-relaxed ${SOFT[tone]}`}>
            {lead}
          </p>
        )}
        {children && <div className="mt-10">{children}</div>}
      </div>
    </section>
  );
}
