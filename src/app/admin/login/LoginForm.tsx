"use client";

import { useActionState } from "react";
import { entrar } from "../acciones";

/**
 * El formulario de la puerta.
 *
 * El error sale en `aria-live="assertive"` y el campo queda marcado con
 * `aria-invalid`: quien usa lector de pantalla se entera de que la clave está
 * mal en el momento, sin tener que salir a buscar el mensaje por la página.
 */
export default function LoginForm({
  label,
  hint,
  submit,
  errBad,
  errEmpty,
}: {
  label: string;
  hint: string;
  submit: string;
  errBad: string;
  errEmpty: string;
}) {
  const [estado, accion, enviando] = useActionState(entrar, null);

  const mensaje =
    estado?.error === "vacia"
      ? errEmpty
      : estado?.error === "clave-mala"
        ? errBad
        : null;

  return (
    <form action={accion} className="mt-8">
      <label htmlFor="clave" className="block text-base font-bold">
        {label}
      </label>

      <input
        id="clave"
        name="clave"
        type="password"
        autoComplete="current-password"
        required
        aria-invalid={mensaje ? true : undefined}
        aria-describedby={mensaje ? "clave-error clave-pista" : "clave-pista"}
        className="mt-2 w-full rounded-[--radius-card] border-2 border-ink bg-paper px-4 py-3.5 text-lg"
      />

      <p aria-live="assertive" className="min-h-6">
        {mensaje && (
          <span id="clave-error" className="mt-2 block font-bold text-[var(--color-was)]">
            {mensaje}
          </span>
        )}
      </p>

      <p id="clave-pista" className="mt-1 text-sm text-ink-soft">
        {hint}
      </p>

      <button
        type="submit"
        disabled={enviando}
        className="btn tap mt-6 w-full rounded-full bg-ink px-8 py-4 text-lg font-bold text-paper transition-transform hover:scale-[1.02] disabled:opacity-70"
      >
        {submit}
      </button>
    </form>
  );
}
