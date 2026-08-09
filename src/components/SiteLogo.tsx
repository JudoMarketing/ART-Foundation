/**
 * El logo de la fundación.
 *
 * ⚠️ **Es una reconstrucción, no el archivo original.** El dueño lo mandó
 * como imagen; el vectorial oficial sigue pendiente (`docs/PENDIENTES.md`).
 * El marco de esquinas está sacado a medida y es exacto — es la parte que da
 * la identidad, y la que se repite en los fondos. Las letras se dibujan con
 * la tipografía del sistema y **se ven parecidas, no idénticas**: la del logo
 * original es otra.
 *
 * Cuando llegue el SVG bueno, se reemplaza este archivo y nada más: el resto
 * del sitio ya usa este componente y no sabe cómo está hecho por dentro.
 *
 * El marco solo (`<Marco />`) sirve además como sello y como motivo de fondo.
 */

type Props = { className?: string };

const GRIS = "#58595b";

/** Las cuatro esquinas y las cuatro marcas del medio. */
function Marco({ color = GRIS }: { color?: string }) {
  return (
    // Sin `vectorEffect`: el trazo tiene que escalar con el dibujo. Con
    // `non-scaling-stroke` el marco se dibuja con 7 píxeles de pantalla
    // siempre, y a 44 px de alto el logo queda todo trazo y nada de letra.
    <g stroke={color} strokeWidth="7" strokeLinecap="butt" fill="none">
      {/* Esquinas */}
      <path d="M13 36V13h23" />
      <path d="M64 13h23v23" />
      <path d="M87 64v23H64" />
      <path d="M36 87H13V64" />
      {/* Las marcas del medio de cada lado */}
      <path d="M50 6v14M50 80v14M6 50h14M80 50h14" />
    </g>
  );
}

/**
 * El logotipo completo: marco, ART en tres colores y xpwd debajo.
 *
 * El texto de verdad va en un `<title>`, no dibujado: un lector de pantalla
 * tiene que oír el nombre de la fundación, no "imagen".
 */
export default function SiteLogo({ className }: Props) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      role="img"
      aria-label="ARTxpwd"
    >
      <Marco />

      {/* `textLength` con `spacingAndGlyphs` es lo que hace que esto sea
          fiable. Sin eso, el ancho del texto depende de la tipografía que
          tenga instalada quien mira: en una máquina entra justo y en otra se
          sale del marco. Con textLength el navegador estira o comprime hasta
          el ancho exacto que le pido, y el logo mide siempre lo mismo. */}
      <text
        x="50"
        y="47"
        textAnchor="middle"
        textLength="54"
        lengthAdjust="spacingAndGlyphs"
        fontFamily="var(--font-body)"
        fontSize="28"
        fontWeight="800"
      >
        <tspan fill="var(--color-brand)">A</tspan>
        <tspan fill="var(--color-leaf)">R</tspan>
        <tspan fill="var(--color-sky)">T</tspan>
      </text>

      <text
        x="50"
        y="75"
        textAnchor="middle"
        textLength="50"
        lengthAdjust="spacingAndGlyphs"
        fontFamily="var(--font-body)"
        fontSize="24"
        fontWeight="500"
      >
        <tspan fill="var(--color-brand)">x</tspan>
        <tspan fill={GRIS}>pwd</tspan>
      </text>

      {/* El punto sobre la x: es lo que convierte la letra en una figurita
          con cabeza, y es el detalle que hace reconocible al logo. La x
          arranca en x=25 y mide unos 12, así que su centro cae en 31. */}
      <circle cx="31" cy="58" r="3.4" fill="var(--color-brand)" />
    </svg>
  );
}

/** Solo el marco. Se usa de sello y de motivo suelto. */
export function LogoMark({ className, color }: Props & { color?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden="true" focusable="false">
      <Marco color={color} />
    </svg>
  );
}

/**
 * El sello Gold Transparency 2025 de Candid.
 *
 * Se lo ganaron y va donde se vea. Está dibujado acá en vez de traído como
 * imagen para que se vea nítido a cualquier tamaño y no dependa de un
 * servidor ajeno — pero **el sello oficial lo entrega Candid**, y lo correcto
 * es reemplazar esto por el suyo cuando el dueño pase el código de inserción
 * de su perfil. Queda anotado en `docs/PENDIENTES.md`.
 */
export function CandidSeal({ className }: Props) {
  return (
    <svg
      viewBox="0 0 120 132"
      className={className}
      role="img"
      aria-label="Gold Transparency 2025 · Candid"
    >
      <rect x="2" y="2" width="116" height="128" fill="#ffffff" stroke="#c8a137" strokeWidth="4" />
      <rect x="10" y="10" width="100" height="112" fill="none" stroke="#c8a137" strokeWidth="2" />
      <text fontFamily="var(--font-body)" fill="#161922" fontSize="14" fontWeight="600">
        <tspan x="22" y="42">Gold</tspan>
        <tspan x="22" y="60">Transparency</tspan>
      </text>
      <text
        x="22"
        y="82"
        fontFamily="var(--font-body)"
        fill="#161922"
        fontSize="17"
        fontWeight="700"
      >
        2025
      </text>
      <text
        x="22"
        y="110"
        fontFamily="var(--font-body)"
        fill="#161922"
        fontSize="17"
        fontWeight="700"
      >
        Candid.
      </text>
    </svg>
  );
}
