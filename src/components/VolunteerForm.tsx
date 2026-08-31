"use client";

import { useState } from "react";
import Link from "next/link";
import { localePath, type Locale } from "@/lib/i18n";
import {
  MAX_ARCHIVO_BYTES,
  MESES_VIGENCIA_CHEQUEO,
  TIPOS_ARCHIVO,
  f,
  franjasHorarias,
} from "@/content/forms";
import { ORG } from "@/content/site";
import FormShell, { type Paso, useError } from "@/components/FormShell";
import { Bloque, Campo, MensajeError, Opciones } from "@/components/FormFields";
import { IconCertificate, IconHelpingHands } from "@/components/ArtIcons";

/**
 * La postulación de voluntariado, en cuatro pasos.
 *
 * Era una sola pantalla con veinte campos. Se veía difícil aunque no lo
 * fuera, y un formulario que se ve difícil se abandona antes de empezarlo.
 *
 * Ahora usa el mismo armazón que la inscripción (`FormShell`), así que las
 * dos se comportan igual: la misma barra de avance, los mismos botones, el
 * mismo sitio para los errores. Quien llenó una ya sabe llenar la otra, y
 * eso vale doble en un sitio donde parte de quien lo usa necesita que las
 * cosas se comporten como la última vez.
 *
 * Los horarios salen de las clases que existen de verdad. Si mañana cambia
 * una clase en `content/site.ts`, este formulario se entera solo: ofrecerle a
 * alguien un horario en el que no hay nadie es hacerle perder un sábado.
 */

export default function VolunteerForm({ locale }: { locale: Locale }) {
  const c = f(locale);
  const franjas = franjasHorarias(locale);

  const [archivo, setArchivo] = useState<File | null>(null);
  const [enviando, setEnviando] = useState(false);
  const [listo, setListo] = useState(false);
  const [fallo, setFallo] = useState<string | null>(null);

  const req = (d: FormData, campos: string[]) => {
    const e: Record<string, string> = {};
    for (const k of campos) if (!String(d.get(k) ?? "").trim()) e[k] = c.errRequired;
    return e;
  };

  const pasos: Paso[] = [
    {
      id: "aboutYou",
      titulo: c.aboutYou,
      validar: (d) => {
        const e = req(d, ["firstName", "lastName", "email", "phone"]);
        const correo = String(d.get("email") ?? "");
        if (correo && !/^[^@\s]+@[^@\s]+\.[^@\s]{2,}$/.test(correo)) e.email = c.errEmail;
        const tel = String(d.get("phone") ?? "").replace(/\D/g, "");
        if (tel && tel.length < 10) e.phone = c.errPhone;
        return e;
      },
      contenido: (
        <Bloque>
          <Campo id="firstName" label={c.firstName} autoComplete="given-name" />
          <Campo id="lastName" label={c.lastName} autoComplete="family-name" />
          <Campo id="email" label={c.email} type="email" autoComplete="email" />
          <Campo id="phone" label={c.phone} type="tel" autoComplete="tel" />
          <Campo id="birthDate" label={c.birthDate} type="date" autoComplete="bday" />
          <Campo id="address" label={c.address} autoComplete="street-address" ancho />
          <Campo id="city" label={c.city} autoComplete="address-level2" />
          <Campo id="zip" label={c.zip} autoComplete="postal-code" inputMode="numeric" />
          <Campo id="emergencyName" label={c.emergencyName} />
          <Campo id="emergencyPhone" label={c.emergencyPhone} type="tel" />
        </Bloque>
      ),
    },

    {
      id: "yourTime",
      titulo: c.yourTime,
      validar: (d) => {
        const e = req(d, ["startDate", "hours"]);
        const horas = String(d.get("hours") ?? "").trim();
        if (horas && !/^\d{1,4}$/.test(horas)) e.hours = c.errHours;
        if (d.getAll("slots").length === 0) e.slots = c.errSlots;
        return e;
      },
      contenido: (
        <>
          <Bloque>
            <Campo id="startDate" label={c.startDate} type="date" ayuda={c.startHelp} />
            <Campo
              id="hours"
              label={c.hours}
              type="number"
              min={1}
              ayuda={c.hoursHelp}
              inputMode="numeric"
            />
          </Bloque>
          <div className="mt-6">
            <Opciones
              id="slots"
              legend={c.slots}
              ayuda={c.slotsHelp}
              name="slots"
              tipo="checkbox"
              opciones={franjas.map((fr) => ({ valor: fr.label, titulo: fr.label }))}
            />
          </div>
        </>
      ),
    },

    {
      id: "yourStudies",
      titulo: c.yourStudies,
      contenido: (
        <>
          <Bloque>
            <Campo id="school" label={c.school} ayuda={c.schoolHelp} ancho />
            <Campo id="program" label={c.program} ancho />
            <Campo id="certified" label={c.certified} ayuda={c.certifiedHelp} ancho />
          </Bloque>
          <div className="mt-6">
            <Opciones
              id="reason"
              legend={c.reason}
              name="reason"
              opciones={[
                { valor: c.reasonWork, titulo: c.reasonWork },
                { valor: c.reasonHelp2, titulo: c.reasonHelp2 },
                { valor: c.reasonBoth, titulo: c.reasonBoth },
              ]}
            />
          </div>
        </>
      ),
    },

    {
      id: "yourCheck",
      titulo: c.yourCheck,
      validar: (d) => {
        const e = req(d, ["checkDate"]);
        const fecha = String(d.get("checkDate") ?? "");
        if (fecha) {
          const emitido = new Date(`${fecha}T00:00:00`);
          const hoy = new Date();
          const limite = new Date();
          limite.setMonth(limite.getMonth() - MESES_VIGENCIA_CHEQUEO);
          if (emitido > hoy) e.checkDate = c.errCheckFuture;
          else if (emitido < limite) e.checkDate = c.errCheckOld;
        }
        if (!archivo) e.checkFile = c.errRequired;
        else if (archivo.size > MAX_ARCHIVO_BYTES) e.checkFile = c.errFileBig;
        else if (!TIPOS_ARCHIVO.includes(archivo.type)) e.checkFile = c.errFileType;
        if (!d.get("consent")) e.consent = c.errConsent;
        return e;
      },
      contenido: (
        <>
          <div className="flex items-start gap-4 rounded-[--radius-card] border border-line bg-paper-warm p-5">
            <span aria-hidden="true" className="shrink-0">
              <IconCertificate className="h-8 w-8" />
            </span>
            <p className="font-semibold">{c.checkIntro}</p>
          </div>

          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            <Campo id="checkDate" label={c.checkDate} type="date" ayuda={c.checkDateHelp} />
            <SubidaChequeo c={c} archivo={archivo} onArchivo={setArchivo} />
          </div>

          <Consentimiento c={c} locale={locale} />
        </>
      ),
    },
  ];

  async function enviar(datos: FormData) {
    datos.set("locale", locale);
    if (archivo) datos.set("checkFile", archivo);
    setEnviando(true);
    setFallo(null);
    try {
      const res = await fetch("/api/volunteer", { method: "POST", body: datos });
      if (!res.ok) throw new Error(String(res.status));
      setListo(true);
    } catch {
      setFallo(c.errSend.replace("{phone}", ORG.phone));
    } finally {
      setEnviando(false);
    }
  }

  if (listo) {
    return (
      <div
        tabIndex={-1}
        className="card rounded-[--radius-card] border-2 border-leaf bg-paper p-10"
      >
        <span aria-hidden="true" className="block">
          <IconHelpingHands className="h-11 w-11" />
        </span>
        <h2 className="mt-5 text-3xl font-bold sm:text-4xl">{c.okTitle}</h2>
        <p className="mt-4 max-w-2xl text-lg text-ink-soft">{c.okBody}</p>
        <Link
          href={localePath(locale, "/volunteer")}
          className="underline-grow mt-7 inline-block text-lg font-bold text-leaf-ink"
        >
          {c.okAgain} →
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
        tono="leaf"
        textos={{
          atras: c.back,
          siguiente: c.next,
          pasoDe: c.stepOf,
          enviar: c.submit,
          enviando: c.sending,
          errResumenUno: c.errSummaryOne,
          errResumen: c.errSummary,
        }}
      />
    </>
  );
}

/**
 * La subida del chequeo.
 *
 * El archivo no sale del navegador hasta que se envía el formulario entero.
 * Nada de subidas de fondo que dejan un documento sensible en un servidor
 * "por si acaso", y menos uno que a lo mejor nunca se termina de enviar.
 */
function SubidaChequeo({
  c,
  archivo,
  onArchivo,
}: {
  c: ReturnType<typeof f>;
  archivo: File | null;
  onArchivo: (a: File | null) => void;
}) {
  const error = useError("checkFile");
  return (
    <div id="checkFile" className="sm:col-span-2">
      <label htmlFor="checkFileInput" className="block text-base font-bold">
        {c.checkFile}
      </label>
      <p className="mt-1 text-sm text-ink-soft">{c.checkFileHelp}</p>
      <input
        id="checkFileInput"
        type="file"
        accept={TIPOS_ARCHIVO.join(",")}
        onChange={(e) => onArchivo(e.currentTarget.files?.[0] ?? null)}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? "checkFile-err" : undefined}
        className={`tap mt-3 block w-full rounded-[--radius-card] border-2 bg-paper p-3 file:mr-4 file:rounded-full file:border-0 file:bg-ink file:px-5 file:py-2.5 file:font-bold file:text-paper ${
          error ? "border-[var(--color-was)]" : "border-line"
        }`}
      />
      {archivo && (
        <p className="mt-2 text-sm font-semibold text-leaf-ink">
          {c.checkChosen}: {archivo.name} ({Math.round(archivo.size / 1024)} KB)
        </p>
      )}
      {error && <MensajeError msg={error} id="checkFile-err" />}
    </div>
  );
}

function Consentimiento({ c, locale }: { c: ReturnType<typeof f>; locale: Locale }) {
  const error = useError("consent");
  return (
    <div id="consent" className="mt-8">
      <label className="flex cursor-pointer items-start gap-3 text-base font-semibold">
        <input
          type="checkbox"
          name="consent"
          value="si"
          aria-invalid={error ? true : undefined}
          className="mt-1 h-5 w-5 shrink-0 accent-[var(--color-leaf-deep)]"
        />
        <span>
          {c.consent}{" "}
          <Link href={localePath(locale, "/terms")} className="link">
            {c.consentLink}
          </Link>
        </span>
      </label>
      {error && <MensajeError msg={error} />}
    </div>
  );
}
