"use client";

import { useRef, useState } from "react";

/**
 * El armazón de los formularios largos.
 *
 * Un formulario de treinta campos en una sola pantalla se abandona. No porque
 * sea difícil, sino porque **se ve** difícil: alguien lo abre, ve la barra de
 * desplazamiento diminuta, y decide llamar por teléfono o no hacerlo. Partido
 * en pasos cortos, el mismo formulario se termina.
 *
 * ── Lo que hace que un formulario por pasos no sea peor que uno largo ─────
 *
 * Partir en pasos es fácil de hacer mal. Estas seis cosas son las que lo
 * salvan, y ninguna es opcional:
 *
 * 1. **Todos los pasos existen siempre en el documento**, escondidos con el
 *    atributo `hidden`. No se desmontan. Así lo escrito no se pierde al ir y
 *    volver, el `FormData` del final los junta todos, y el autocompletar del
 *    navegador funciona, que para alguien que escribe con dificultad es la
 *    diferencia entre llenarlo y no.
 * 2. **El foco viaja al título del paso nuevo.** Sin esto, quien usa lector
 *    de pantalla toca "Siguiente", la pantalla cambia entera y él sigue
 *    oyendo el botón que acaba de tocar: no se entera de que avanzó.
 * 3. **No se avanza con un paso mal llenado**, y los errores salen ahí mismo,
 *    no tres pantallas después.
 * 4. **Se ve cuánto falta.** "Paso 2 de 6" con su barra. Un formulario sin
 *    final visible se siente infinito.
 * 5. **Se puede volver atrás** sin perder nada.
 * 6. **El último paso muestra todo junto** antes de enviar. Nadie manda a
 *    ciegas algo que lleva sus datos y los de su hijo.
 */

export type Paso = {
  id: string;
  titulo: string;
  /** Los campos que este paso valida. El armazón no sabe qué significan. */
  validar?: (datos: FormData) => Record<string, string>;
  contenido: React.ReactNode;
};

export type TextosArmazon = {
  atras: string;
  siguiente: string;
  pasoDe: string; // "Paso {n} de {total}"
  enviar: string;
  enviando: string;
  errResumenUno: string;
  errResumen: string; // "{n} cosas que corregir"
};

export default function FormShell({
  pasos,
  textos,
  onSubmit,
  enviando,
  tono = "leaf",
  children,
}: {
  pasos: Paso[];
  textos: TextosArmazon;
  onSubmit: (datos: FormData) => void;
  enviando: boolean;
  tono?: "leaf" | "brand";
  /** Lo que va encima del botón de enviar en el último paso. */
  children?: React.ReactNode;
}) {
  const [indice, setIndice] = useState(0);
  const [errores, setErrores] = useState<Record<string, string>>({});
  const formRef = useRef<HTMLFormElement>(null);
  const tituloRef = useRef<HTMLHeadingElement>(null);

  const ultimo = indice === pasos.length - 1;
  const paso = pasos[indice];

  const acento =
    tono === "leaf"
      ? { barra: "bg-leaf-deep", boton: "bg-leaf-deep", anillo: "border-leaf" }
      : { barra: "bg-brand-solid", boton: "bg-brand-solid", anillo: "border-brand" };

  function irA(nuevo: number) {
    setIndice(nuevo);
    setErrores({});
    // Un respiro antes de mover el foco: si se mueve en el mismo cuadro, el
    // navegador a veces no lo anuncia.
    setTimeout(() => tituloRef.current?.focus(), 40);
    formRef.current?.scrollIntoView({ block: "start", behavior: "smooth" });
  }

  function validarPaso(): boolean {
    if (!formRef.current || !paso.validar) return true;
    const e = paso.validar(new FormData(formRef.current));
    setErrores(e);
    if (Object.keys(e).length > 0) {
      setTimeout(() => tituloRef.current?.focus(), 40);
      return false;
    }
    return true;
  }

  function alEnviar(ev: React.FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    if (!validarPaso()) return;
    onSubmit(new FormData(ev.currentTarget));
  }

  const lista = Object.entries(errores);

  return (
    <form ref={formRef} onSubmit={alEnviar} noValidate className="max-w-3xl scroll-mt-24">
      {/* Cuánto falta. */}
      <div className="mb-8">
        <div className="flex items-baseline justify-between gap-4">
          <p className="text-sm font-bold uppercase tracking-[0.14em] text-ink-soft">
            {textos.pasoDe
              .replace("{n}", String(indice + 1))
              .replace("{total}", String(pasos.length))}
          </p>
          <p className="text-sm font-semibold text-ink-soft">
            {Math.round(((indice + 1) / pasos.length) * 100)}%
          </p>
        </div>
        <div
          className="mt-2 h-2 w-full overflow-hidden rounded-full bg-line"
          role="progressbar"
          aria-valuenow={indice + 1}
          aria-valuemin={1}
          aria-valuemax={pasos.length}
          aria-label={textos.pasoDe
            .replace("{n}", String(indice + 1))
            .replace("{total}", String(pasos.length))}
        >
          <div
            className={`h-full rounded-full ${acento.barra} transition-[width] duration-500`}
            style={{ width: `${((indice + 1) / pasos.length) * 100}%` }}
          />
        </div>
      </div>

      {/* El título del paso. Recibe el foco al cambiar de paso: es lo que le
          dice a quien no ve la pantalla que la página cambió debajo. */}
      <h2
        ref={tituloRef}
        tabIndex={-1}
        className="text-3xl font-bold outline-none sm:text-4xl"
      >
        {paso.titulo}
      </h2>

      <div aria-live="assertive">
        {lista.length > 0 && (
          <div className="mt-6 rounded-[--radius-card] border-2 border-[var(--color-was)] bg-paper p-6">
            <p className="font-bold text-[var(--color-was)]">
              {lista.length === 1
                ? textos.errResumenUno
                : textos.errResumen.replace("{n}", String(lista.length))}
            </p>
            <ul className="mt-3 list-disc pl-5">
              {lista.map(([campo, msg]) => (
                <li key={campo}>
                  <a href={`#${campo}`} className="link font-semibold">
                    {msg}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Todos los pasos viven acá. Los que no tocan van con `hidden`, que los
          saca del árbol de accesibilidad y del recorrido con teclado sin
          borrar lo que ya se escribió. */}
      {pasos.map((s, n) => (
        <div key={s.id} hidden={n !== indice} className="mt-8">
          <ErroresContexto.Provider value={n === indice ? errores : {}}>
            {s.contenido}
          </ErroresContexto.Provider>
        </div>
      ))}

      {ultimo && children}

      <div className="mt-10 flex flex-wrap items-center gap-3">
        {indice > 0 && (
          <button
            type="button"
            onClick={() => irA(indice - 1)}
            className="btn tap inline-flex items-center rounded-full border-2 border-ink px-7 py-3.5 text-base font-bold text-ink transition-transform hover:scale-[1.03]"
          >
            ← {textos.atras}
          </button>
        )}

        {ultimo ? (
          <button
            type="submit"
            disabled={enviando}
            className={`btn tap inline-flex items-center rounded-full ${acento.boton} px-9 py-4 text-lg font-bold text-paper transition-transform hover:scale-[1.03] disabled:opacity-70`}
          >
            {enviando ? textos.enviando : textos.enviar}
          </button>
        ) : (
          <button
            type="button"
            onClick={() => validarPaso() && irA(indice + 1)}
            className={`btn tap inline-flex items-center rounded-full ${acento.boton} px-9 py-4 text-lg font-bold text-paper transition-transform hover:scale-[1.03]`}
          >
            {textos.siguiente} →
          </button>
        )}
      </div>
    </form>
  );
}

/* Los errores viajan por contexto para que cada campo pinte el suyo sin que
   haya que pasarlos a mano por cinco niveles de componentes. */
import { createContext, useContext } from "react";
const ErroresContexto = createContext<Record<string, string>>({});
export function useError(id: string): string | undefined {
  return useContext(ErroresContexto)[id];
}
