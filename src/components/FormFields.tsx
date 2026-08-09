"use client";

import { useError } from "./FormShell";

/**
 * Los campos, compartidos por los dos formularios.
 *
 * Cada uno se pinta su propio error leyéndolo del contexto del armazón. Así
 * un campo no necesita que le pasen nada por cinco niveles de componentes, y
 * más importante todavía, no hay forma de olvidarse de mostrar un error: si el
 * armazón lo tiene, el campo lo pinta.
 *
 * Todos comparten tres cosas que no se negocian:
 *   · `<label>` de verdad, atado por `htmlFor`. Nada de marcadores de posición
 *     haciendo de etiqueta: cuando alguien empieza a escribir, el marcador se
 *     va y ya no sabe qué le estaban preguntando.
 *   · el texto de ayuda y el de error atados con `aria-describedby`
 *   · `aria-invalid` cuando corresponde, que es lo que hace que un lector de
 *     pantalla diga "no válido" al entrar al campo
 */

export function MensajeError({ msg, id }: { msg: string; id?: string }) {
  return (
    <p id={id} className="mt-2 font-semibold text-[var(--color-was)]">
      {msg}
    </p>
  );
}

export function Bloque({
  children,
  intro,
}: {
  children: React.ReactNode;
  intro?: string;
}) {
  return (
    <>
      {intro && <p className="text-lg text-ink-soft">{intro}</p>}
      <div className={`grid gap-5 sm:grid-cols-2 ${intro ? "mt-6" : ""}`}>
        {children}
      </div>
    </>
  );
}

export function Campo({
  id,
  label,
  type = "text",
  ayuda,
  ancho,
  ...resto
}: {
  id: string;
  label: string;
  type?: string;
  ayuda?: string;
  ancho?: boolean;
} & React.InputHTMLAttributes<HTMLInputElement>) {
  const error = useError(id);
  const ayudaId = ayuda ? `${id}-ayuda` : undefined;
  const errId = error ? `${id}-err` : undefined;

  return (
    <div className={ancho ? "sm:col-span-2" : ""}>
      <label htmlFor={id} className="block text-base font-bold">
        {label}
      </label>
      {ayuda && (
        <p id={ayudaId} className="mt-1 text-sm text-ink-soft">
          {ayuda}
        </p>
      )}
      <input
        id={id}
        name={id}
        type={type}
        aria-invalid={error ? true : undefined}
        aria-describedby={[ayudaId, errId].filter(Boolean).join(" ") || undefined}
        className={`tap mt-2 block w-full rounded-[--radius-card] border-2 bg-paper px-4 py-3 text-base ${
          error ? "border-[var(--color-was)]" : "border-line"
        }`}
        {...resto}
      />
      {error && <MensajeError msg={error} id={errId} />}
    </div>
  );
}

export function AreaTexto({
  id,
  label,
  ayuda,
  ...resto
}: {
  id: string;
  label: string;
  ayuda?: string;
} & React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  const error = useError(id);
  const ayudaId = ayuda ? `${id}-ayuda` : undefined;
  const errId = error ? `${id}-err` : undefined;

  return (
    <div className="sm:col-span-2">
      <label htmlFor={id} className="block text-base font-bold">
        {label}
      </label>
      {ayuda && (
        <p id={ayudaId} className="mt-1 text-sm text-ink-soft">
          {ayuda}
        </p>
      )}
      <textarea
        id={id}
        name={id}
        rows={4}
        aria-invalid={error ? true : undefined}
        aria-describedby={[ayudaId, errId].filter(Boolean).join(" ") || undefined}
        className={`tap mt-2 block w-full rounded-[--radius-card] border-2 bg-paper px-4 py-3 text-base ${
          error ? "border-[var(--color-was)]" : "border-line"
        }`}
        {...resto}
      />
      {error && <MensajeError msg={error} id={errId} />}
    </div>
  );
}

/**
 * Tarjetas grandes para elegir. Se usan en vez de un `<select>` cuando hay
 * dos o tres opciones y la elección importa.
 *
 * El motivo no es estético: un desplegable esconde las opciones hasta que se
 * toca, obliga a un gesto más, y en un teléfono abre una rueda del sistema
 * que tapa media pantalla. Tres tarjetas grandes se ven todas de una y se
 * tocan con el pulgar sin apuntar.
 *
 * Por dentro siguen siendo `<input type=radio>` dentro de un `<fieldset>`,
 * así que las flechas del teclado funcionan como en cualquier grupo de
 * opciones y un lector de pantalla dice "1 de 3".
 */
export function Opciones({
  id,
  legend,
  ayuda,
  name,
  opciones,
  tipo = "radio",
  tono = "leaf",
  onChange,
}: {
  id: string;
  legend: string;
  ayuda?: string;
  name: string;
  opciones: { valor: string; titulo: string; ayuda?: string }[];
  tipo?: "radio" | "checkbox";
  tono?: "leaf" | "brand";
  onChange?: (valor: string, marcado: boolean) => void;
}) {
  const error = useError(id);
  const borde =
    tono === "leaf"
      ? "hover:border-leaf has-[:checked]:border-leaf has-[:checked]:bg-leaf-soft"
      : "hover:border-brand has-[:checked]:border-brand has-[:checked]:bg-brand-soft";
  const acento = tono === "leaf" ? "accent-[var(--color-leaf-deep)]" : "accent-[var(--color-brand-ink)]";

  return (
    <fieldset id={id} className="sm:col-span-2">
      <legend className="text-base font-bold">{legend}</legend>
      {ayuda && <p className="mt-1 text-sm text-ink-soft">{ayuda}</p>}

      <div className="mt-4 grid gap-3">
        {opciones.map((o) => (
          <label
            key={o.valor}
            className={`tap flex cursor-pointer items-start gap-3 rounded-[--radius-card] border-2 bg-paper px-5 py-4 transition-colors ${
              error ? "border-[var(--color-was)]" : "border-line"
            } ${borde}`}
          >
            <input
              type={tipo}
              name={name}
              value={o.valor}
              onChange={(e) => onChange?.(o.valor, e.currentTarget.checked)}
              className={`mt-1 h-5 w-5 shrink-0 ${acento}`}
            />
            <span>
              <span className="block font-bold">{o.titulo}</span>
              {o.ayuda && (
                <span className="block text-sm text-ink-soft">{o.ayuda}</span>
              )}
            </span>
          </label>
        ))}
      </div>

      {error && <MensajeError msg={error} />}
    </fieldset>
  );
}
