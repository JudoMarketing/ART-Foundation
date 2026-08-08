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
