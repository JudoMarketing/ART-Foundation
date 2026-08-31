/**
 * Las piezas sueltas que repiten todas las pantallas del portal.
 *
 * Están juntas acá para que se vean iguales en los seis lados. Un portal donde
 * cada pantalla dibuja su propia tabla termina con seis tablas parecidas y
 * ninguna igual, y quien lo usa tiene que volver a aprender a leerla cada vez.
 */

export function Titulo({
  title,
  lead,
  extra,
}: {
  title: string;
  lead?: string;
  extra?: React.ReactNode;
}) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-4">
      <div>
        <h1 className="text-4xl font-bold sm:text-5xl">{title}</h1>
        {lead && <p className="mt-2 text-lg text-ink-soft">{lead}</p>}
      </div>
      {extra}
    </div>
  );
}

/**
 * Lo que se ve cuando no hay nada.
 *
 * Dice dos cosas y las dos importan: que está vacío, y **por qué** está vacío.
 * "No hay postulaciones" a secas deja a quien lo lee sin saber si es que nadie
 * se postuló o si el sistema está roto. Son dos situaciones muy distintas.
 */
export function Vacio({ qué, porQué }: { qué: string; porQué: string }) {
  return (
    <div className="mt-8 rounded-[--radius-card] border-2 border-dashed border-line bg-paper p-10 text-center">
      <p className="text-xl font-bold">{qué}</p>
      <p className="mx-auto mt-3 max-w-xl text-ink-soft">{porQué}</p>
    </div>
  );
}

/**
 * La tabla, siempre dentro de su propio marco con desplazamiento.
 *
 * Sin esto, una tabla ancha empuja la página entera y aparece la barra
 * horizontal abajo de todo: para leer la última columna hay que desplazar el
 * sitio completo, y el menú se va de pantalla. Con el marco, se desplaza la
 * tabla y nada más.
 */
export function Tabla({
  cols,
  children,
  nota,
}: {
  cols: string[];
  children: React.ReactNode;
  nota?: string;
}) {
  return (
    <>
      <div className="mt-8 overflow-x-auto rounded-[--radius-card] border border-line bg-paper">
        <table className="w-full min-w-[52rem] border-collapse text-left">
          <thead>
            <tr className="border-b-2 border-line">
              {cols.map((col) => (
                <th
                  key={col}
                  scope="col"
                  className="whitespace-nowrap px-5 py-4 text-sm font-bold uppercase tracking-[0.1em] text-ink-soft"
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>{children}</tbody>
        </table>
      </div>
      {nota && <p className="mt-4 max-w-3xl text-sm text-ink-soft">{nota}</p>}
    </>
  );
}

export function Fila({ children }: { children: React.ReactNode }) {
  return <tr className="border-b border-line last:border-0">{children}</tr>;
}

export function Celda({
  children,
  fuerte,
}: {
  children: React.ReactNode;
  fuerte?: boolean;
}) {
  return (
    <td className={`px-5 py-4 align-top ${fuerte ? "font-bold" : "text-ink-soft"}`}>
      {children}
    </td>
  );
}

/**
 * Las etiquetas de estado.
 *
 * El color no es el único que dice el estado: el texto lo dice también. Un
 * portal donde "vencido" se distingue de "al día" solo por el rojo no se puede
 * usar con daltonismo, y el rojo y el verde son justamente el par que más
 * gente confunde.
 */
const TONOS = {
  neutro: "bg-paper-warm text-ink-soft ring-line",
  ok: "bg-leaf-soft text-leaf-ink ring-leaf",
  aviso: "bg-sun-soft text-sun-ink ring-sun",
  info: "bg-sky-soft text-sky-ink ring-sky",
  /**
   * Rojo de verdad, no el magenta de la marca.
   *
   * El magenta es el color de la fundación y está por todo el sitio como color
   * alegre. Usarlo también para "vencido" le pide dos cosas contrarias al
   * mismo color, y en una tabla llena de magenta el problema deja de saltar.
   * El rojo de `--color-was` no se usa en ningún otro lado.
   */
  mal: "bg-paper text-[var(--color-was)] ring-[var(--color-was)]",
} as const;

export function Etiqueta({
  children,
  tono = "neutro",
}: {
  children: React.ReactNode;
  tono?: keyof typeof TONOS;
}) {
  return (
    <span
      className={`inline-block whitespace-nowrap rounded-full px-3 py-1 text-sm font-bold ring-1 ring-inset ${TONOS[tono]}`}
    >
      {children}
    </span>
  );
}

/** El aviso de "esto todavía no funciona", para los botones que aún no hacen nada. */
export function Pendiente({ etiqueta, nota }: { etiqueta: string; nota: string }) {
  return (
    <p className="mt-6 flex flex-wrap items-center gap-3 text-sm text-ink-soft">
      <span className="rounded-full bg-ink px-3 py-1 font-bold text-paper">{etiqueta}</span>
      {nota}
    </p>
  );
}
