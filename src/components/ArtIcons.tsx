/**
 * Los vectores de las disciplinas: pintura, teatro, música y ritmo.
 *
 * Están dibujados en el espíritu de los que ya usa el sitio actual — los
 * separadores de 60px con la paleta, la máscara, las notas y las maracas —
 * pero rehechos en vectorial para que se vean a cualquier tamaño. Los de
 * hoy son PNG de 60 píxeles: se pixelan apenas crecen.
 *
 * El detalle que los ata al sitio viejo son las rayitas onduladas de arriba
 * y abajo. Están en todos los separadores originales y son lo que le da la
 * mano dibujada.
 *
 * Todos son `aria-hidden`: son ilustración, no información. Lo que dice qué
 * clase es, es el texto que va al lado.
 */

type IconProps = { className?: string };

const BASE = "shrink-0";

/** Las rayitas de humo/movimiento que llevan todos los separadores. */
function Squiggles({ y, flip = false }: { y: number; flip?: boolean }) {
  return (
    <g
      className="squiggle"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      fill="none"
      opacity="0.85"
      transform={flip ? `translate(0 ${y}) scale(1 -1)` : `translate(0 ${y})`}
    >
      <path d="M22 0c-3 4 3 7 0 11" />
      <path d="M32 -2c-3 4 3 7 0 11" />
      <path d="M42 0c-3 4 3 7 0 11" />
    </g>
  );
}

/** Pintura — la paleta. */
export function IconPalette({ className }: IconProps) {
  return (
    <svg viewBox="0 0 64 64" className={`${BASE} ${className ?? ""}`} aria-hidden="true" focusable="false">
      <Squiggles y={2} />
      <path
        d="M32 16c-11 0-20 6.5-20 15s9 15 20 15c3.2 0 4.6-1.8 4.6-3.6 0-1.9-1.6-2.9-1.6-4.8 0-2 1.7-3.3 3.9-3.3H43c6 0 9-3.6 9-8.4C52 21.6 43.4 16 32 16Z"
        fill="var(--color-leaf)"
        stroke="var(--color-ink)"
        strokeWidth="2.5"
      />
      <circle cx="22" cy="28" r="3.2" fill="var(--color-brand)" />
      <circle cx="31" cy="24.5" r="3.2" fill="var(--color-sky)" />
      <circle cx="40" cy="27" r="3.2" fill="var(--color-sun)" />
      <circle cx="23" cy="37" r="3.2" fill="var(--color-ink)" />
      <Squiggles y={62} flip />
    </svg>
  );
}

/** Teatro — la máscara. */
export function IconMask({ className }: IconProps) {
  return (
    <svg viewBox="0 0 64 64" className={`${BASE} ${className ?? ""}`} aria-hidden="true" focusable="false">
      <Squiggles y={2} />
      <path
        d="M10 26c0-3 2-5 5-5 6 0 10 2 17 2s11-2 17-2c3 0 5 2 5 5 0 9-7 19-14 19-4 0-6-3-8-3s-4 3-8 3c-7 0-14-10-14-19Z"
        fill="var(--color-brand)"
        stroke="var(--color-ink)"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      <path d="M18 29c2.5-2.5 6-2.5 8.5 0" fill="none" stroke="var(--color-paper)" strokeWidth="3" strokeLinecap="round" />
      <path d="M37.5 29c2.5-2.5 6-2.5 8.5 0" fill="none" stroke="var(--color-paper)" strokeWidth="3" strokeLinecap="round" />
      <path d="M50 18l2.5 4.5L57 25l-4.5 2.5L50 32l-2.5-4.5L43 25l4.5-2.5Z" fill="var(--color-sun)" stroke="var(--color-ink)" strokeWidth="1.6" strokeLinejoin="round" />
      <Squiggles y={62} flip />
    </svg>
  );
}

/** Música — las notas. */
export function IconNotes({ className }: IconProps) {
  return (
    <svg viewBox="0 0 64 64" className={`${BASE} ${className ?? ""}`} aria-hidden="true" focusable="false">
      <Squiggles y={2} />
      <g stroke="var(--color-ink)" strokeWidth="2.5" strokeLinejoin="round">
        <path d="M26 18v20" fill="none" strokeLinecap="round" />
        <path d="M42 15v20" fill="none" strokeLinecap="round" />
        <path d="M26 18c0-2 8-3 16-3v6c-8 0-16 1-16 3Z" fill="var(--color-sky)" />
        <ellipse cx="21" cy="39" rx="6" ry="5" fill="var(--color-brand)" />
        <ellipse cx="37" cy="36" rx="6" ry="5" fill="var(--color-sun)" />
      </g>
      <Squiggles y={62} flip />
    </svg>
  );
}

/** Ritmo — las maracas. */
export function IconMaracas({ className }: IconProps) {
  return (
    <svg viewBox="0 0 64 64" className={`${BASE} ${className ?? ""}`} aria-hidden="true" focusable="false">
      <Squiggles y={2} />
      <g stroke="var(--color-ink)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M25 34L18 46" fill="none" />
        <path d="M39 34l7 12" fill="none" />
        <ellipse cx="26" cy="26" rx="9" ry="10" fill="var(--color-sky)" transform="rotate(-14 26 26)" />
        <ellipse cx="38" cy="26" rx="9" ry="10" fill="var(--color-brand)" transform="rotate(14 38 26)" />
        <path d="M18 25c5 2 10 2 15 0" fill="none" stroke="var(--color-paper)" strokeWidth="2.5" />
        <path d="M31 25c5 2 10 2 15 0" fill="none" stroke="var(--color-paper)" strokeWidth="2.5" />
      </g>
      <Squiggles y={62} flip />
    </svg>
  );
}

/** Cuidado — el corazón. Va en la parte de donaciones. */
export function IconHeart({ className }: IconProps) {
  return (
    <svg viewBox="0 0 64 64" className={`${BASE} ${className ?? ""}`} aria-hidden="true" focusable="false">
      <Squiggles y={2} />
      <path
        d="M32 47S14 36 14 27c0-5.3 4.2-9 9-9 3.8 0 7 2.2 9 5 2-2.8 5.2-5 9-5 4.8 0 9 3.7 9 9 0 9-18 20-18 20Z"
        fill="var(--color-brand)"
        stroke="var(--color-ink)"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      <Squiggles y={62} flip />
    </svg>
  );
}

export const CLASS_ICONS = {
  art: IconPalette,
  theatre: IconMask,
  guitar: IconNotes,
} as const;

/* ══════════════════════════════════════════════════════════════════════════
   Para quién es
   ══════════════════════════════════════════════════════════════════════════

   Tres figuras que dicen lo mismo que el texto de al lado, pero de un
   vistazo. Van en rosa, azul y verde — los colores de la marca, en el mismo
   orden en que están las tres tarjetas.

   Una advertencia que vale escribir: la silla de ruedas representa una parte
   de la discapacidad, la que se ve. La mayoría de los estudiantes de esta
   fundación tienen discapacidades del desarrollo, que no se dibujan con una
   silla. Se usa igual porque es el símbolo que todo el mundo reconoce al
   instante, y de eso se trata acá — pero el texto de la tarjeta es el que
   manda, no el dibujo. */

/* Los tres van sin rayitas, a diferencia de los iconos de las clases. Son
   figuras grandes que llenan el cuadro: las rayitas les quedaban encima de la
   cabeza y de la rueda, y se veía sucio.

   Todos usan el mismo truco para que se lean de lejos: el trazo se dibuja dos
   veces, primero grueso en tinta y encima más fino en color. Sale una línea
   de color con contorno oscuro, que es lo que aguanta sobre fondo claro y
   sobre fondo de color sin cambiar nada. */

/** Estudiantes con discapacidad — la silla de ruedas. */
export function IconWheelchair({ className }: IconProps) {
  const body = "M42 24L34 35h12l3 10";
  return (
    <svg viewBox="0 0 64 64" className={`${BASE} ${className ?? ""}`} aria-hidden="true" focusable="false">
      <g strokeLinecap="round" strokeLinejoin="round">
        <circle cx="26" cy="40" r="18" fill="none" stroke="var(--color-ink)" strokeWidth="3.5" />
        <circle cx="26" cy="40" r="12" fill="none" stroke="var(--color-ink)" strokeWidth="1.6" opacity="0.3" />
        <path d={body} fill="none" stroke="var(--color-ink)" strokeWidth="11" />
        <path d={body} fill="none" stroke="var(--color-brand)" strokeWidth="6" />
        <circle cx="26" cy="40" r="4" fill="var(--color-ink)" />
        <circle cx="44" cy="14" r="7.5" fill="var(--color-brand)" stroke="var(--color-ink)" strokeWidth="3.5" />
        <circle cx="50" cy="47" r="3.2" fill="var(--color-ink)" />
      </g>
    </svg>
  );
}

/** Estudiantes sin discapacidad — la figura de pie, con un brazo arriba. */
export function IconStanding({ className }: IconProps) {
  const body = "M32 23v15M32 28l-11 6M32 27l11-8M32 38l-8 16M32 38l9 16";
  return (
    <svg viewBox="0 0 64 64" className={`${BASE} ${className ?? ""}`} aria-hidden="true" focusable="false">
      <g strokeLinecap="round" strokeLinejoin="round">
        <path d={body} fill="none" stroke="var(--color-ink)" strokeWidth="11" />
        <path d={body} fill="none" stroke="var(--color-sky)" strokeWidth="6" />
        <circle cx="32" cy="14" r="8" fill="var(--color-sky)" stroke="var(--color-ink)" strokeWidth="3.5" />
        <circle cx="49" cy="12" r="3.4" fill="var(--color-sun)" stroke="var(--color-ink)" strokeWidth="2.5" />
      </g>
    </svg>
  );
}

/** La única diferencia — dos manos agarradas.
 *
 *  Costó tres intentos. Los dos primeros dibujaban las manos del mismo verde
 *  y del mismo grosor, y el resultado era una sola mancha: parecía un bigote,
 *  no un apretón.
 *
 *  Lo que lo resuelve es que las dos manos NO sean iguales. La de adelante va
 *  en verde oscuro, es más alta y se monta encima de la de atrás. El
 *  contorno de esa que se monta es lo que dice "hay dos manos acá", y los
 *  dedos encima terminan de contarlo.
 */
export function IconHands({ className }: IconProps) {
  const A = "var(--color-leaf)";
  const B = "var(--color-leaf-deep)";

  /** Un dedo: una barra redondeada que cruza hacia la otra mano. */
  const finger = (x: number, y: number, fill: string) => (
    <rect
      key={`${x}-${y}`}
      x={x}
      y={y}
      width="26"
      height="6"
      rx="3"
      fill={fill}
      stroke="var(--color-ink)"
      strokeWidth="2.6"
    />
  );

  return (
    <svg viewBox="0 0 64 64" className={`${BASE} ${className ?? ""}`} aria-hidden="true" focusable="false">
      <g strokeLinecap="round" strokeLinejoin="round">
        {/* Las dos palmas. Se salen del cuadro por los dos lados, iguales:
            son las manos entrando en escena, no dos objetos recortados. */}
        <rect x="-8" y="17" width="28" height="30" rx="13" fill={A} stroke="var(--color-ink)" strokeWidth="3" />
        <rect x="44" y="17" width="28" height="30" rx="13" fill={B} stroke="var(--color-ink)" strokeWidth="3" />

        {/* Los pulgares. Son lo que convierte una forma redondeada en una
            mano: sin pulgar, una palma es una piedra. */}
        <g transform="rotate(-38 16 20)">
          <rect x="11" y="6" width="8" height="17" rx="4" fill={A} stroke="var(--color-ink)" strokeWidth="2.8" />
        </g>
        <g transform="rotate(-38 48 44)">
          <rect x="45" y="41" width="8" height="17" rx="4" fill={B} stroke="var(--color-ink)" strokeWidth="2.8" />
        </g>

        {/* Los dedos, alternados: uno de una mano, uno de la otra. El
            entrelazado es lo que dice que están agarradas. */}
        {finger(16, 20.5, A)}
        {finger(22, 27.5, B)}
        {finger(16, 34.5, A)}
        {finger(22, 41.5, B)}
      </g>
    </svg>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   A dónde va la donación
   ══════════════════════════════════════════════════════════════════════════

   Estos van en grupo, varios por tarjeta, y son chicos. Por eso no llevan
   rayitas: a 40px las rayitas se convierten en suciedad. */

/** Materiales — los pinceles.
 *
 *  Un pincel se reconoce por tres cosas juntas: el mango largo, la virola
 *  metálica y el pelo cargado de color. Si falta la virola parece un lápiz.
 */
function Brush({ tip }: { tip: string }) {
  return (
    <g strokeLinecap="round" strokeLinejoin="round">
      <path d="M32 60V30" fill="none" stroke="var(--color-ink)" strokeWidth="9" />
      <path d="M32 60V30" fill="none" stroke="var(--color-sun)" strokeWidth="4.5" />
      <rect x="26" y="23" width="12" height="8" rx="2" fill="var(--color-paper)" stroke="var(--color-ink)" strokeWidth="2.8" />
      <path
        d="M32 4c4.5 6.5 6 11 6 14.5 0 3.4-2.7 5.5-6 5.5s-6-2.1-6-5.5C26 15 27.5 10.5 32 4Z"
        fill={tip}
        stroke="var(--color-ink)"
        strokeWidth="2.8"
      />
    </g>
  );
}

export function IconBrushes({ className }: IconProps) {
  return (
    <svg viewBox="0 0 64 64" className={`${BASE} ${className ?? ""}`} aria-hidden="true" focusable="false">
      <g transform="rotate(-15 32 40) translate(-7 0) scale(0.92)">
        <Brush tip="var(--color-sky)" />
      </g>
      <g transform="rotate(14 32 40) translate(7 2)">
        <Brush tip="var(--color-brand)" />
      </g>
    </svg>
  );
}

/** Materiales — el pomo de pintura. */
export function IconPaintTube({ className }: IconProps) {
  return (
    <svg viewBox="0 0 64 64" className={`${BASE} ${className ?? ""}`} aria-hidden="true" focusable="false">
      <g stroke="var(--color-ink)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M24 20h20l4 30c.4 3-2 5-5 5H25c-3 0-5.4-2-5-5l4-30Z" fill="var(--color-sun)" />
        <path d="M27 13h14v7H27z" fill="var(--color-paper)" />
        <path d="M30 6h8v7h-8z" fill="var(--color-brand)" />
        <path d="M27 34h14" fill="none" strokeWidth="2" opacity="0.55" />
      </g>
    </svg>
  );
}

/** Materiales — la guitarra.
 *
 *  La silueta es una sola forma con cintura en el medio: dos círculos
 *  superpuestos dejan la costura a la vista y se ve como un muñeco de nieve.
 */
export function IconGuitarBody({ className }: IconProps) {
  return (
    <svg viewBox="0 0 64 64" className={`${BASE} ${className ?? ""}`} aria-hidden="true" focusable="false">
      <g strokeLinecap="round" strokeLinejoin="round">
        <path d="M32 22V8" fill="none" stroke="var(--color-ink)" strokeWidth="9" />
        <path d="M32 22V8" fill="none" stroke="var(--color-sun)" strokeWidth="4.5" />
        <rect x="26" y="2" width="12" height="8" rx="2.5" fill="var(--color-ink)" />
        <path
          d="M32 20c5.5 0 9 3.5 9 8 0 3.5-2.5 5.5-2.5 8s5.5 5 5.5 12c0 8.5-5.5 14-12 14s-12-5.5-12-14c0-7 5.5-9.5 5.5-12S23 31.5 23 28c0-4.5 3.5-8 9-8Z"
          fill="var(--color-leaf)"
          stroke="var(--color-ink)"
          strokeWidth="3"
        />
        <circle cx="32" cy="42" r="5" fill="var(--color-paper)" stroke="var(--color-ink)" strokeWidth="2.5" />
        <path d="M27 51h10" fill="none" stroke="var(--color-ink)" strokeWidth="3" />
      </g>
    </svg>
  );
}

/** Materiales — el traje, en su percha. */
export function IconCostume({ className }: IconProps) {
  return (
    <svg viewBox="0 0 64 64" className={`${BASE} ${className ?? ""}`} aria-hidden="true" focusable="false">
      <g stroke="var(--color-ink)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M32 12c3 0 5 2 5 4 0 3-5 3-5 7" fill="none" />
        <path d="M32 23L14 33h8l-4 22h28l-4-22h8L32 23Z" fill="var(--color-sky)" />
        <path d="M26 40h12" fill="none" strokeWidth="2" opacity="0.6" />
      </g>
    </svg>
  );
}

/** Paseos — la camioneta. */
export function IconVan({ className }: IconProps) {
  return (
    <svg viewBox="0 0 64 64" className={`${BASE} ${className ?? ""}`} aria-hidden="true" focusable="false">
      <g stroke="var(--color-ink)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 24h30l12 9h10v14H6V24Z" fill="var(--color-sun)" />
        <path d="M11 28h9v8h-9z" fill="var(--color-paper)" />
        <path d="M25 28h9v8h-9z" fill="var(--color-paper)" />
        <path d="M38 28h5l7 5h-12v-5Z" fill="var(--color-paper)" />
        <circle cx="19" cy="49" r="6" fill="var(--color-ink)" />
        <circle cx="45" cy="49" r="6" fill="var(--color-ink)" />
        <circle cx="19" cy="49" r="2" fill="var(--color-paper)" stroke="none" />
        <circle cx="45" cy="49" r="2" fill="var(--color-paper)" stroke="none" />
      </g>
    </svg>
  );
}

/** Paseos — la carpa. */
export function IconTent({ className }: IconProps) {
  return (
    <svg viewBox="0 0 64 64" className={`${BASE} ${className ?? ""}`} aria-hidden="true" focusable="false">
      <g stroke="var(--color-ink)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M32 14L10 50h44L32 14Z" fill="var(--color-brand)" />
        <path d="M32 22l-9 28h18l-9-28Z" fill="var(--color-paper)" />
        <path d="M32 14v8" fill="none" />
      </g>
    </svg>
  );
}

/** Paseos — el árbol del parque. */
export function IconTree({ className }: IconProps) {
  return (
    <svg viewBox="0 0 64 64" className={`${BASE} ${className ?? ""}`} aria-hidden="true" focusable="false">
      <g stroke="var(--color-ink)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M32 54V34" fill="none" strokeWidth="4" />
        <circle cx="32" cy="22" r="14" fill="var(--color-leaf)" />
        <circle cx="21" cy="30" r="8" fill="var(--color-leaf)" />
        <circle cx="43" cy="30" r="8" fill="var(--color-leaf)" />
        <path d="M32 42l-7-6" fill="none" />
      </g>
    </svg>
  );
}

/** Becas — el pase. El lugar ya está pagado. */
export function IconTicket({ className }: IconProps) {
  return (
    <svg viewBox="0 0 64 64" className={`${BASE} ${className ?? ""}`} aria-hidden="true" focusable="false">
      <g stroke="var(--color-ink)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M8 20h48v9a5 5 0 0 0 0 10v9H8v-9a5 5 0 0 0 0-10v-9Z" fill="var(--color-brand)" />
        <path d="M32 22v6M32 32v6M32 42v4" fill="none" stroke="var(--color-paper)" strokeWidth="2.5" strokeDasharray="0 0" />
        <path d="M16 30h9" fill="none" stroke="var(--color-paper)" strokeWidth="2.5" />
        <path d="M16 38h13" fill="none" stroke="var(--color-paper)" strokeWidth="2.5" opacity="0.75" />
      </g>
    </svg>
  );
}

/** Becas — las manos ahuecadas que reciben la moneda. */
export function IconCoinHand({ className }: IconProps) {
  const cup = "M12 36c0 11 9 19 20 19s20-8 20-19";
  return (
    <svg viewBox="0 0 64 64" className={`${BASE} ${className ?? ""}`} aria-hidden="true" focusable="false">
      <g strokeLinecap="round" strokeLinejoin="round">
        <circle cx="32" cy="19" r="11.5" fill="var(--color-sun)" stroke="var(--color-ink)" strokeWidth="3" />
        <path
          d="M32 11v16M28 15h5.5a2.8 2.8 0 0 1 0 5.5h-3a2.8 2.8 0 0 0 0 5.5H36"
          fill="none"
          stroke="var(--color-ink)"
          strokeWidth="2.4"
        />
        <path d={cup} fill="none" stroke="var(--color-ink)" strokeWidth="12" />
        <path d={cup} fill="none" stroke="var(--color-sky)" strokeWidth="6.5" />
      </g>
    </svg>
  );
}

/** El brillo que acompaña a las becas. */
export function IconSpark({ className }: IconProps) {
  return (
    <svg viewBox="0 0 64 64" className={`${BASE} ${className ?? ""}`} aria-hidden="true" focusable="false">
      <g stroke="var(--color-ink)" strokeWidth="2.5" strokeLinejoin="round">
        <path d="M32 8l6 16 16 6-16 6-6 16-6-16-16-6 16-6 6-16Z" fill="var(--color-sun)" />
      </g>
    </svg>
  );
}

/** La moneda suelta. Se usa en el rastro de dinero que se mueve. */
export function IconCoin({ className }: IconProps) {
  return (
    <svg viewBox="0 0 32 32" className={`${BASE} ${className ?? ""}`} aria-hidden="true" focusable="false">
      <circle cx="16" cy="16" r="13" fill="var(--color-sun)" stroke="var(--color-ink)" strokeWidth="2.5" />
      <path
        d="M16 8v16M13 12h5a2.5 2.5 0 0 1 0 5h-4a2.5 2.5 0 0 0 0 5h5"
        fill="none"
        stroke="var(--color-ink)"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   Tienda, voluntariado y redes
   ══════════════════════════════════════════════════════════════════════════ */

/** Una pieza enmarcada. El `art` cambia el dibujo de adentro: 0, 1 o 2. */
export function IconFramedArt({ className, art = 0 }: IconProps & { art?: 0 | 1 | 2 }) {
  const inside = [
    <g key="0">
      <circle cx="25" cy="29" r="7.5" fill="var(--color-brand)" />
      <path d="M32 48l9-14 9 14z" fill="var(--color-sky)" />
    </g>,
    <g key="1">
      <path d="M14 44c6-15 12-15 18 0s12 15 18 0" fill="none" stroke="var(--color-leaf)" strokeWidth="5.5" strokeLinecap="round" />
      <circle cx="44" cy="23" r="5.5" fill="var(--color-sun)" />
    </g>,
    <g key="2">
      <path d="M13 48l11-22 8 13 6-7 9 16z" fill="var(--color-sun)" />
      <circle cx="23" cy="21" r="4.5" fill="var(--color-brand)" />
    </g>,
  ][art];

  // El id del recorte lleva el número del dibujo: los tres cuadros conviven
  // en la misma página, y dos elementos con el mismo id es HTML roto — el
  // navegador aplica el primero a todos y los otros dos se ven vacíos.
  const clip = `frame-clip-${art}`;

  // Sin patas. Las tenía, y con las patas un marco deja de ser un cuadro
  // colgado y pasa a ser un monitor de computadora.
  return (
    <svg viewBox="0 0 64 64" className={`${BASE} ${className ?? ""}`} aria-hidden="true" focusable="false">
      <rect x="5" y="6" width="54" height="52" rx="2.5" fill="var(--color-paper)" stroke="var(--color-ink)" strokeWidth="3.5" />
      <g clipPath={`url(#${clip})`}>{inside}</g>
      <clipPath id={clip}>
        <rect x="12" y="13" width="40" height="38" rx="1.5" />
      </clipPath>
      <rect x="12" y="13" width="40" height="38" rx="1.5" fill="none" stroke="var(--color-ink)" strokeWidth="2" opacity="0.35" />
    </svg>
  );
}

/** El porcentaje que va al estudiante. */
export function IconTag({ className }: IconProps) {
  return (
    <svg viewBox="0 0 64 64" className={`${BASE} ${className ?? ""}`} aria-hidden="true" focusable="false">
      <g stroke="var(--color-ink)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M34 8H12a4 4 0 0 0-4 4v22l26 26 26-26L34 8Z" fill="var(--color-brand)" />
        <circle cx="20" cy="20" r="4.5" fill="var(--color-paper)" />
        <path d="M30 40l14-14" fill="none" stroke="var(--color-paper)" strokeWidth="3" />
        <circle cx="31" cy="27" r="3" fill="none" stroke="var(--color-paper)" strokeWidth="2.5" />
        <circle cx="43" cy="39" r="3" fill="none" stroke="var(--color-paper)" strokeWidth="2.5" />
      </g>
    </svg>
  );
}

/** Voluntariado — las manos que sostienen. */
export function IconHelpingHands({ className }: IconProps) {
  const cup = "M9 34c0 12.5 10.3 22 23 22s23-9.5 23-22";
  return (
    <svg viewBox="0 0 64 64" className={`${BASE} ${className ?? ""}`} aria-hidden="true" focusable="false">
      <g strokeLinecap="round" strokeLinejoin="round">
        <path
          d="M32 32S17 22.5 17 14.8C17 10.5 20.5 7 24.8 7c3 0 5.6 1.8 7.2 4.3C33.6 8.8 36.2 7 39.2 7 43.5 7 47 10.5 47 14.8 47 22.5 32 32 32 32Z"
          fill="var(--color-brand)"
          stroke="var(--color-ink)"
          strokeWidth="3"
        />
        <path d={cup} fill="none" stroke="var(--color-ink)" strokeWidth="13" />
        <path d={cup} fill="none" stroke="var(--color-sky)" strokeWidth="7" />
      </g>
    </svg>
  );
}

/** Las horas que quedan registradas. */
export function IconClock({ className }: IconProps) {
  return (
    <svg viewBox="0 0 64 64" className={`${BASE} ${className ?? ""}`} aria-hidden="true" focusable="false">
      <g stroke="var(--color-ink)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="32" cy="34" r="22" fill="var(--color-sky)" />
        <path d="M32 20v14l10 6" fill="none" stroke="var(--color-paper)" strokeWidth="3.5" />
        <path d="M24 8h16" fill="none" />
      </g>
    </svg>
  );
}

/** La carta firmada al terminar. */
export function IconCertificate({ className }: IconProps) {
  return (
    <svg viewBox="0 0 64 64" className={`${BASE} ${className ?? ""}`} aria-hidden="true" focusable="false">
      <g stroke="var(--color-ink)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="10" y="8" width="40" height="42" rx="3" fill="var(--color-paper)" />
        <path d="M18 20h20M18 28h24M18 36h14" fill="none" strokeWidth="2.5" opacity="0.6" />
        <circle cx="44" cy="44" r="9" fill="var(--color-sun)" />
        <path d="M40 56l4-6 4 6-4-2-4 2Z" fill="var(--color-brand)" />
      </g>
    </svg>
  );
}

/* Redes. Estos son marcas registradas, así que van con su forma reconocible
   y no reinterpretados: un logo que uno tiene que adivinar no sirve de nada.
   Heredan el color del texto para poder ponerlos sobre cualquier fondo. */

export function IconInstagram({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={`${BASE} ${className ?? ""}`} aria-hidden="true" focusable="false" fill="currentColor">
      <path d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41-.56-.22-.96-.48-1.38-.9-.42-.42-.68-.82-.9-1.38-.16-.42-.36-1.06-.41-2.23-.06-1.27-.07-1.65-.07-4.85s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41 1.27-.06 1.65-.07 4.85-.07M12 0C8.74 0 8.33.01 7.05.07 5.78.13 4.9.33 4.14.63c-.79.3-1.46.72-2.12 1.39C1.35 2.68.93 3.35.63 4.14.33 4.9.13 5.78.07 7.05.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.06 1.27.26 2.15.56 2.91.3.79.72 1.46 1.39 2.12.66.66 1.33 1.08 2.12 1.39.76.3 1.64.5 2.91.56C8.33 23.99 8.74 24 12 24s3.67-.01 4.95-.07c1.27-.06 2.15-.26 2.91-.56.79-.3 1.46-.72 2.12-1.39.66-.66 1.08-1.33 1.39-2.12.3-.76.5-1.64.56-2.91.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.06-1.27-.26-2.15-.56-2.91-.3-.79-.72-1.46-1.39-2.12C21.32 1.35 20.65.93 19.86.63c-.76-.3-1.64-.5-2.91-.56C15.67.01 15.26 0 12 0Zm0 5.84a6.16 6.16 0 1 0 0 12.32 6.16 6.16 0 0 0 0-12.32ZM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8Zm7.85-10.4a1.44 1.44 0 1 1-2.88 0 1.44 1.44 0 0 1 2.88 0Z" />
    </svg>
  );
}

export function IconFacebook({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={`${BASE} ${className ?? ""}`} aria-hidden="true" focusable="false" fill="currentColor">
      <path d="M24 12.07C24 5.4 18.63 0 12 0S0 5.4 0 12.07C0 18.1 4.39 23.09 10.13 24v-8.44H7.08v-3.49h3.05V9.41c0-3.02 1.79-4.69 4.53-4.69 1.31 0 2.68.24 2.68.24v2.96h-1.51c-1.49 0-1.96.93-1.96 1.89v2.26h3.33l-.53 3.49h-2.8V24C19.61 23.09 24 18.1 24 12.07Z" />
    </svg>
  );
}

/** El blog — la libreta con la pluma. */
export function IconBlog({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={`${BASE} ${className ?? ""}`} aria-hidden="true" focusable="false" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 3.5h11a2 2 0 0 1 2 2V19a2 2 0 0 1-2 2H4a1 1 0 0 1-1-1v-15a1 1 0 0 1 1-1Z" />
      <path d="M7 8h7M7 12h7M7 16h4" />
      <path d="M19.5 3.8l1.7 1.7-5.4 5.4-2.3.6.6-2.3 5.4-5.4Z" />
    </svg>
  );
}
