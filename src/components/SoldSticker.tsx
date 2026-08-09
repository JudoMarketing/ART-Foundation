/**
 * El sello de VENDIDO.
 *
 * Va encima de la pieza cuando `vendida` está en `true`. Se pone solo: quien
 * compra dispara el cobro, el cobro marca la pieza, y la pieza sale con el
 * sello. Nadie tiene que acordarse de nada.
 *
 * ── Por qué está hecho así ────────────────────────────────────────────────
 *
 * **No basta con el rojo.** Uno de cada doce hombres no distingue el rojo del
 * verde. Por eso el sello dice la palabra, en grande, y no confía en el color
 * para contar nada.
 *
 * **Y no basta con la palabra dibujada.** El sello es decoración para quien
 * ve la pantalla; quien usa lector de pantalla necesita oírlo dentro del
 * texto de la pieza. Por eso el sello va `aria-hidden` y el estado se dice
 * aparte, en la ficha — dos caminos para el mismo dato, uno por ojo y otro
 * por oído.
 *
 * **La obra no se apaga del todo.** Se le baja un poco el color para que se
 * lea "esta ya no está", pero se sigue viendo: la hizo un estudiante y sigue
 * mereciendo verse aunque ya tenga dueño. Un gris del 100% sería tratarla
 * como un producto agotado en un catálogo.
 */
export default function SoldSticker({ label }: { label: string }) {
  return (
    <span
      aria-hidden="true"
      className="sello-vendido pointer-events-none absolute left-1/2 top-1/2 z-10 select-none"
    >
      {label}
    </span>
  );
}
