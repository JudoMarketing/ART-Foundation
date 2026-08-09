"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { CLASS_ICONS } from "@/components/ArtIcons";
import {
  bundleCents,
  formatPrice,
  savingsCents,
  FIRST_CLASS_CENTS,
  EXTRA_CLASS_CENTS,
  type ClassId,
} from "@/content/site";
import type { Locale } from "@/lib/i18n";

/**
 * El menú de las clases.
 *
 * Funciona como un mostrador, no como un formulario: se toca una clase, se
 * ve el precio, se toca otra y el precio de esa baja a la mitad delante de
 * los ojos. La cuenta de abajo se actualiza sola.
 *
 * Por qué así y no tres botones de "inscribirse": las tres clases son
 * seguidas el mismo sábado. La familia ya está en el edificio. Si el
 * descuento por sumar la segunda hay que ir a buscarlo a una página de
 * precios, no existe.
 *
 * Tres cosas que lo sostienen y que no se pueden sacar:
 *
 * 1. **Son botones de verdad**, con `aria-pressed`. Un lector de pantalla
 *    dice "Arte, seleccionado" — no hace falta ver el tilde.
 * 2. **El total se anuncia** por una región viva. Si el precio cambia porque
 *    tocaste otra cosa, alguien que no ve la pantalla se entera igual.
 * 3. **El precio tachado no depende del tachado.** Va con "Antes" y "Ahora"
 *    en texto para lector de pantalla: una línea encima de un número no la
 *    oye nadie.
 */

type Item = {
  id: ClassId;
  name: string;
  blurb: string;
  /** Ya formateado en el servidor, para que no haya dos horas distintas. */
  schedule: string;
  accent: "brand" | "sky" | "leaf";
};

export type PickerLabels = {
  scheduleLabel: string;
  cta: string;
  add: string;
  added: string;
  removeHint: string;
  regular: string;
  now: string;
  halfOff: string;
  bundleTitle: string;
  bundleEmpty: string;
  bundleHint: string;
  total: string;
  save: string;
  goRegister: string;
  perMonth: string;
  included: string;
  oneClass: string;
  manyClasses: string;
};

const SKINS = {
  brand: { fill: "bg-brand-solid", onFill: "text-paper", ink: "text-brand-ink", soft: "bg-brand-soft", ring: "ring-brand" },
  sky: { fill: "bg-sky", onFill: "text-ink", ink: "text-sky-ink", soft: "bg-sky-soft", ring: "ring-sky" },
  leaf: { fill: "bg-leaf", onFill: "text-ink", ink: "text-leaf-ink", soft: "bg-leaf-soft", ring: "ring-leaf" },
} as const;

export default function ClassPicker({
  items,
  labels,
  locale,
  registerHref,
}: {
  items: Item[];
  labels: PickerLabels;
  locale: Locale;
  registerHref: string;
}) {
  const [picked, setPicked] = useState<ClassId[]>([]);

  // La barra flotante se dibuja en el <body> por medio de un portal, no acá
  // dentro. Motivo: la sección de las clases lleva `clip-path` para el borde
  // rasgado, y un elemento con clip-path se convierte en el marco de
  // referencia de todo `position: fixed` que tenga dentro. La barra quedaba
  // anclada a la sección y recortada por el mismo borde — invisible.
  const [montado, setMontado] = useState(false);
  useEffect(() => setMontado(true), []);

  function toggle(id: ClassId) {
    setPicked((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  }

  const count = picked.length;
  const total = bundleCents(count);
  const saved = savingsCents(count);

  // El orden del descuento sale del orden de las clases, no del orden en que
  // se tocaron. Si dependiera de los clics, tocar en distinto orden mostraría
  // precios distintos para la misma cuenta — la misma plata contada de dos
  // maneras es la forma más rápida de que alguien deje de confiar.
  const firstPicked = items.find((k) => picked.includes(k.id))?.id;

  const full = formatPrice(FIRST_CLASS_CENTS, locale);
  const half = formatPrice(EXTRA_CLASS_CENTS, locale);

  /** Las clases elegidas viajan en la dirección, para no perderlas al saltar. */
  const destino =
    count > 0 ? `${registerHref}?class=${picked.join(",")}` : registerHref;

  return (
    <div>
      <ol className="grid gap-6 md:grid-cols-3">
        {items.map((k, i) => {
          const s = SKINS[k.accent];
          const Icon = CLASS_ICONS[k.id];
          const on = picked.includes(k.id);
          // Media entrada si ya hay otra elegida y esta no es la primera.
          const discounted = on ? k.id !== firstPicked : count > 0;

          return (
            <li
              key={k.id}
              className={`icon-play card flex flex-col rounded-[--radius-card] bg-paper p-8 transition-shadow ${
                on ? `ring-4 ${s.ring}` : "ring-0"
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <span className={s.ink}>
                  <Icon className="h-16 w-16" />
                </span>
                <span
                  aria-hidden="true"
                  className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-bold ${
                    on ? `${s.fill} ${s.onFill}` : "bg-paper-warm text-ink-soft"
                  }`}
                >
                  {on ? "✓" : i + 1}
                </span>
              </div>

              <h3 className="mt-6 text-3xl font-bold">{k.name}</h3>

              <p className={`mt-3 inline-flex w-fit items-center rounded-full ${s.soft} px-3.5 py-1.5 text-sm font-bold ${s.ink}`}>
                <span className="sr-only">{labels.scheduleLabel}: </span>
                {k.schedule}
              </p>

              {/* El precio. Cuando baja, el viejo se queda tachado en rojo al
                  lado del nuevo en verde: ver de dónde viene el descuento es
                  lo que lo hace creíble.

                  La `key` cambia cuando cambia el estado, y eso es lo que
                  obliga a React a montar de nuevo el bloque. Sin eso la
                  animación corre una sola vez en la vida de la tarjeta: se
                  agrega una clase, se quita, se vuelve a agregar, y la
                  segunda vez el precio cambia de golpe. */}
              <p
                key={discounted ? "rebajado" : "entero"}
                className="mt-4 flex flex-wrap items-baseline gap-x-3 gap-y-1"
              >
                {discounted && (
                  <s className="precio-antes text-2xl font-bold">
                    <span className="sr-only">{labels.regular}: </span>
                    {full}
                  </s>
                )}
                <span
                  className={`text-4xl font-bold ${discounted ? "precio-ahora" : ""}`}
                >
                  {discounted && <span className="sr-only">{labels.now}: </span>}
                  {discounted ? half : full}
                </span>
                <span className="text-base font-normal text-ink-soft">
                  {labels.perMonth}
                </span>
              </p>

              {discounted && (
                <p className="precio-ahora mt-2 text-sm font-bold">
                  {labels.halfOff}
                </p>
              )}

              <p className="mt-4 flex-1 text-ink-soft">{k.blurb}</p>

              <button
                type="button"
                onClick={() => toggle(k.id)}
                aria-pressed={on}
                className={`btn tap mt-7 inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-base font-bold transition-transform hover:scale-[1.03] ${
                  on
                    ? "border-2 border-ink bg-paper text-ink"
                    : `${s.fill} ${s.onFill}`
                }`}
              >
                {on ? (
                  <>
                    <span aria-hidden="true">✓</span>
                    {labels.added}
                    <span className="sr-only">
                      : {k.name}. {labels.removeHint}
                    </span>
                  </>
                ) : (
                  <>
                    {count > 0 ? labels.add : labels.cta}
                    <span className="sr-only">: {k.name}</span>
                  </>
                )}
              </button>
            </li>
          );
        })}
      </ol>

      {/* ── La cuenta ──────────────────────────────────────────────────────
          Siempre está, aunque no haya nada elegido. Una barra que aparece de
          golpe empuja la página hacia abajo y mueve lo que la persona estaba
          por tocar. */}
      <div className="mt-8 rounded-[--radius-card] bg-paper p-6 sm:p-8">
        <div className="flex flex-wrap items-center justify-between gap-x-8 gap-y-5">
          <div className="min-w-[16rem] flex-1">
            <h3 className="text-sm font-bold uppercase tracking-[0.14em] text-ink-soft">
              {labels.bundleTitle}
            </h3>

            <p aria-live="polite" className="mt-2">
              {count === 0 ? (
                <span className="text-lg font-medium text-ink-soft">
                  {labels.bundleEmpty}
                </span>
              ) : (
                <>
                  <span className="text-4xl font-bold">
                    {formatPrice(total, locale)}
                  </span>{" "}
                  <span className="text-base text-ink-soft">
                    {labels.perMonth} ·{" "}
                    {count === 1
                      ? labels.oneClass
                      : labels.manyClasses.replace("{n}", String(count))}
                  </span>
                  {saved > 0 && (
                    <span className="mt-1 block font-bold text-leaf-ink">
                      {labels.save.replace("{amount}", formatPrice(saved, locale))}
                    </span>
                  )}
                </>
              )}
            </p>

            <p className="mt-2 text-sm text-ink-soft">
              {count === 0 ? labels.bundleHint : labels.included}
            </p>
          </div>

          <Link
            href={destino}
            className="btn tap inline-flex items-center rounded-full bg-ink px-8 py-4 text-base font-bold text-paper transition-transform hover:scale-[1.03]"
          >
            {labels.goRegister}
          </Link>
        </div>
      </div>

      {montado &&
        count > 0 &&
        createPortal(
          /* ── La barra que te sigue, solo en teléfono ────────────────────
             En una pantalla chica la cuenta queda arriba y el dedo sigue
             bajando: para cuando alguien decide, el botón de seguir está tres
             pantallas atrás y hay que salir a buscarlo. Esta barra lo lleva
             consigo.

             Aparece solo cuando hay algo elegido — una barra fija que está
             siempre roba la parte de abajo de la pantalla, que en un teléfono
             es justo donde llega el pulgar. */
          <div className="fixed inset-x-0 bottom-0 z-40 border-t border-ink/10 bg-paper/95 p-3 shadow-[0_-8px_24px_rgb(0_0_0/0.12)] backdrop-blur lg:hidden">
            <div className="mx-auto flex max-w-6xl items-center gap-4 px-1">
              <p className="min-w-0 flex-1">
                <span className="block text-2xl font-bold leading-none">
                  {formatPrice(total, locale)}
                </span>
                <span className="block text-xs leading-tight text-ink-soft">
                  {labels.perMonth} ·{" "}
                  {count === 1
                    ? labels.oneClass
                    : labels.manyClasses.replace("{n}", String(count))}
                </span>
              </p>
              <Link
                href={destino}
                className="btn tap inline-flex shrink-0 items-center rounded-full bg-ink px-6 py-3.5 text-base font-bold text-paper"
              >
                {labels.cta}
              </Link>
            </div>
          </div>,
          document.body,
        )}

      {/* El colchón que evita que la barra tape lo último de la página. Sin
          esto, el pie queda debajo de la barra y no se puede leer ni tocar. */}
      {count > 0 && <div aria-hidden="true" className="h-24 lg:hidden" />}
    </div>
  );
}
