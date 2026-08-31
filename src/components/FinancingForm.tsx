"use client";

import { useState } from "react";
import Link from "next/link";
import { localePath, type Locale } from "@/lib/i18n";
import { f, fin } from "@/content/forms";
import { ORG } from "@/content/site";
import FormShell, { type Paso } from "@/components/FormShell";
import { AreaTexto, Bloque, Campo, Opciones } from "@/components/FormFields";
import { IconCoinHand, IconTicket } from "@/components/ArtIcons";

/**
 * Ayuda con la cuota.
 *
 * Es el formulario más corto del sitio, y eso es una decisión, no una
 * casualidad. Pedir ayuda cuesta: cada campo de más es una razón más para
 * cerrar la pestaña. Dos pasos, ningún comprobante, ninguna cifra que haya
 * que ir a buscar a un papel.
 *
 * La pregunta de cuánto puede pagar acepta cero como respuesta, y lo dice.
 * Un formulario que da a entender que cero no es una respuesta válida deja
 * fuera justo a quien más falta le hace.
 *
 * El aviso de privacidad no es de relleno: una familia que pide ayuda quiere
 * saber si eso va a cambiar cómo tratan a su hijo en clase. La respuesta es
 * que no, y hay que decirla antes de que la pregunten.
 */

export default function FinancingForm({ locale }: { locale: Locale }) {
  const c = fin(locale);
  const g = f(locale);

  const [enviando, setEnviando] = useState(false);
  const [listo, setListo] = useState(false);
  const [fallo, setFallo] = useState<string | null>(null);

  const pasos: Paso[] = [
    {
      id: "who",
      titulo: c.stepWho,
      validar: (d) => {
        const e: Record<string, string> = {};
        for (const k of ["firstName", "lastName", "email", "phone"]) {
          if (!String(d.get(k) ?? "").trim()) e[k] = g.errRequired;
        }
        const correo = String(d.get("email") ?? "");
        if (correo && !/^[^@\s]+@[^@\s]+\.[^@\s]{2,}$/.test(correo)) e.email = g.errEmail;
        const tel = String(d.get("phone") ?? "").replace(/\D/g, "");
        if (tel && tel.length < 10) e.phone = g.errPhone;
        if (!d.get("forWhom")) e.forWhom = g.errRequired;
        return e;
      },
      contenido: (
        <>
          <Bloque>
            <Campo id="firstName" label={g.firstName} autoComplete="given-name" />
            <Campo id="lastName" label={g.lastName} autoComplete="family-name" />
            <Campo id="email" label={g.email} type="email" autoComplete="email" />
            <Campo id="phone" label={g.phone} type="tel" autoComplete="tel" />
          </Bloque>
          <div className="mt-6">
            <Opciones
              id="forWhom"
              legend={c.forWhom}
              name="forWhom"
              tono="brand"
              opciones={[
                { valor: c.forSelf, titulo: c.forSelf },
                { valor: c.forChild, titulo: c.forChild },
              ]}
            />
          </div>
        </>
      ),
    },

    {
      id: "situation",
      titulo: c.stepSituation,
      contenido: (
        <>
          <Bloque>
            <Campo
              id="householdSize"
              label={c.householdSize}
              ayuda={c.householdHelp}
              type="number"
              min={1}
              inputMode="numeric"
            />
            <Campo
              id="canPay"
              label={c.canPay}
              ayuda={c.canPayHelp}
              type="number"
              min={0}
              inputMode="numeric"
            />
            <AreaTexto id="situation" label={c.situation} ayuda={c.situationHelp} />
          </Bloque>

          <div className="mt-6">
            <Opciones
              id="prefer"
              legend={c.prefer}
              name="prefer"
              tono="brand"
              opciones={[
                { valor: c.preferPhone, titulo: c.preferPhone },
                { valor: c.preferEmail, titulo: c.preferEmail },
              ]}
            />
          </div>

          <p className="mt-6 flex items-start gap-4 rounded-[--radius-card] bg-paper-warm p-5 font-medium">
            <span aria-hidden="true" className="shrink-0">
              <IconTicket className="h-8 w-8" />
            </span>
            {c.privacy}
          </p>
        </>
      ),
    },
  ];

  async function enviar(datos: FormData) {
    datos.set("locale", locale);
    setEnviando(true);
    setFallo(null);
    try {
      const res = await fetch("/api/financing", { method: "POST", body: datos });
      if (!res.ok) throw new Error(String(res.status));
      setListo(true);
    } catch {
      setFallo(g.errSend.replace("{phone}", ORG.phone));
    } finally {
      setEnviando(false);
    }
  }

  if (listo) {
    return (
      <div tabIndex={-1} className="card rounded-[--radius-card] border-2 border-sun bg-paper p-10">
        <span aria-hidden="true" className="block">
          <IconCoinHand className="h-11 w-11" />
        </span>
        <h2 className="mt-5 text-3xl font-bold sm:text-4xl">{c.okTitle}</h2>
        <p className="mt-4 max-w-2xl text-lg text-ink-soft">{c.okBody}</p>
        <Link
          href={localePath(locale, "/classes")}
          className="underline-grow mt-7 inline-block text-lg font-bold text-brand-ink"
        >
          {c.okBack} →
        </Link>
      </div>
    );
  }

  return (
    <>
      {fallo && (
        <div
          role="alert"
          className="mb-8 max-w-3xl rounded-[--radius-card] border-2 border-[var(--color-was)] bg-paper p-6 font-semibold text-[var(--color-was)]"
        >
          {fallo}
        </div>
      )}

      <FormShell
        pasos={pasos}
        enviando={enviando}
        onSubmit={enviar}
        tono="brand"
        textos={{
          atras: g.back,
          siguiente: g.next,
          pasoDe: g.stepOf,
          enviar: c.submit,
          enviando: c.sending,
          errResumenUno: g.errSummaryOne,
          errResumen: g.errSummary,
        }}
      />
    </>
  );
}
