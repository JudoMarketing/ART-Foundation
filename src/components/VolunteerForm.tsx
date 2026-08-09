"use client";

import { useRef, useState } from "react";
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
import { IconCertificate, IconHelpingHands } from "@/components/ArtIcons";

/**
 * La postulación de voluntariado.
 *
 * Es el formulario más largo del sitio y lo va a llenar gente muy distinta
 * entre sí. Cinco decisiones que lo sostienen:
 *
 * 1. **Una sola página, en bloques.** No un asistente de cinco pasos. Quien
 *    usa lector de pantalla o navega con teclado puede recorrerlo entero de
 *    arriba abajo, y quien quiere saber cuánto falta lo ve de un vistazo.
 * 2. **Los errores viven pegados a su campo**, no todos juntos arriba. Y
 *    arriba va un resumen que enlaza a cada uno, para quien no ve la pantalla.
 * 3. **Nada se valida mientras se escribe.** Marcar en rojo un correo a medio
 *    escribir es regañar a alguien por no haber terminado. Se valida al
 *    enviar, y a partir de ahí sí en vivo, que es cuando ayuda.
 * 4. **Los horarios salen de las clases que existen.** No se escriben acá: si
 *    mañana cambia una clase, cambia en `content/site.ts` y el formulario se
 *    entera solo.
 * 5. **El archivo no se sube hasta enviar.** Nada de subidas de fondo que
 *    dejan un documento sensible en un servidor por si acaso.
 */

type Errores = Record<string, string>;

export default function VolunteerForm({ locale }: { locale: Locale }) {
  const c = f(locale);
  const franjas = franjasHorarias(locale);

  const [errores, setErrores] = useState<Errores>({});
  const [enviando, setEnviando] = useState(false);
  const [listo, setListo] = useState(false);
  const [fallo, setFallo] = useState<string | null>(null);
  const [archivo, setArchivo] = useState<File | null>(null);
  const resumenRef = useRef<HTMLDivElement>(null);
  const okRef = useRef<HTMLDivElement>(null);

  function validar(datos: FormData): Errores {
    const e: Errores = {};
    const req = (k: string) => {
      if (!String(datos.get(k) ?? "").trim()) e[k] = c.errRequired;
    };
    ["firstName", "lastName", "email", "phone", "startDate", "hours", "checkDate"].forEach(req);

    const correo = String(datos.get("email") ?? "");
    if (correo && !/^[^@\s]+@[^@\s]+\.[^@\s]{2,}$/.test(correo)) e.email = c.errEmail;

    const tel = String(datos.get("phone") ?? "").replace(/\D/g, "");
    if (tel && tel.length < 10) e.phone = c.errPhone;

    const horas = String(datos.get("hours") ?? "");
    if (horas && !/^\d{1,4}$/.test(horas.trim())) e.hours = c.errHours;

    if (datos.getAll("slots").length === 0) e.slots = c.errSlots;
    if (!datos.get("consent")) e.consent = c.errConsent;

    // La vigencia del chequeo: seis meses.
    const fecha = String(datos.get("checkDate") ?? "");
    if (fecha) {
      const emitido = new Date(`${fecha}T00:00:00`);
      const hoy = new Date();
      const limite = new Date();
      limite.setMonth(limite.getMonth() - MESES_VIGENCIA_CHEQUEO);
      if (emitido > hoy) e.checkDate = c.errCheckFuture;
      else if (emitido < limite) e.checkDate = c.errCheckOld;
    }

    if (archivo) {
      if (archivo.size > MAX_ARCHIVO_BYTES) e.checkFile = c.errFileBig;
      else if (!TIPOS_ARCHIVO.includes(archivo.type)) e.checkFile = c.errFileType;
    } else {
      e.checkFile = c.errRequired;
    }

    return e;
  }

  async function onSubmit(ev: React.FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    const form = ev.currentTarget;
    const datos = new FormData(form);
    datos.set("locale", locale);

    const e = validar(datos);
    setErrores(e);
    setFallo(null);

    if (Object.keys(e).length > 0) {
      // El foco va al resumen: quien no ve la pantalla tiene que enterarse de
      // que no se envió, y por qué.
      resumenRef.current?.focus();
      return;
    }

    setEnviando(true);
    try {
      const res = await fetch("/api/volunteer", { method: "POST", body: datos });
      if (!res.ok) throw new Error(String(res.status));
      setListo(true);
      // Y acá al mensaje de que sí salió, por lo mismo.
      setTimeout(() => okRef.current?.focus(), 60);
    } catch {
      setFallo(c.errSend.replace("{phone}", ORG.phone));
    } finally {
      setEnviando(false);
    }
  }

  if (listo) {
    return (
      <div
        ref={okRef}
        tabIndex={-1}
        className="card rounded-[--radius-card] border-2 border-leaf bg-paper p-10"
      >
        <span aria-hidden="true" className="block">
          <IconHelpingHands className="h-20 w-20" />
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

  const listaErrores = Object.entries(errores);

  return (
    <form onSubmit={onSubmit} noValidate className="max-w-3xl">
      {/* El resumen de errores. Es lo primero que se oye cuando algo falla. */}
      <div ref={resumenRef} tabIndex={-1} aria-live="assertive">
        {listaErrores.length > 0 && (
          <div className="mb-8 rounded-[--radius-card] border-2 border-[var(--color-was)] bg-paper p-6">
            <p className="font-bold text-[var(--color-was)]">
              {listaErrores.length === 1
                ? c.errSummaryOne
                : c.errSummary.replace("{n}", String(listaErrores.length))}
            </p>
            <ul className="mt-3 list-disc pl-5">
              {listaErrores.map(([campo, msg]) => (
                <li key={campo}>
                  <a href={`#${campo}`} className="link font-semibold">
                    {msg}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
        {fallo && (
          <div className="mb-8 rounded-[--radius-card] border-2 border-[var(--color-was)] bg-paper p-6 font-semibold text-[var(--color-was)]">
            {fallo}
          </div>
        )}
      </div>

      <Bloque titulo={c.aboutYou}>
        <Campo id="firstName" label={c.firstName} error={errores.firstName} autoComplete="given-name" />
        <Campo id="lastName" label={c.lastName} error={errores.lastName} autoComplete="family-name" />
        <Campo id="email" label={c.email} type="email" error={errores.email} autoComplete="email" />
        <Campo id="phone" label={c.phone} type="tel" error={errores.phone} autoComplete="tel" />
        <Campo id="birthDate" label={c.birthDate} type="date" error={errores.birthDate} autoComplete="bday" />
        <Campo id="address" label={c.address} error={errores.address} autoComplete="street-address" ancho />
        <Campo id="city" label={c.city} error={errores.city} autoComplete="address-level2" />
        <Campo id="zip" label={c.zip} error={errores.zip} autoComplete="postal-code" inputMode="numeric" />
        <Campo id="emergencyName" label={c.emergencyName} error={errores.emergencyName} />
        <Campo id="emergencyPhone" label={c.emergencyPhone} type="tel" error={errores.emergencyPhone} />
      </Bloque>

      <Bloque titulo={c.yourTime}>
        <Campo id="startDate" label={c.startDate} type="date" ayuda={c.startHelp} error={errores.startDate} />
        <Campo
          id="hours"
          label={c.hours}
          type="number"
          ayuda={c.hoursHelp}
          error={errores.hours}
          inputMode="numeric"
        />

        {/* Los horarios. Solo los que existen de verdad. */}
        <fieldset id="slots" className="sm:col-span-2">
          <legend className="text-base font-bold">{c.slots}</legend>
          <p className="mt-1 text-sm text-ink-soft">{c.slotsHelp}</p>
          <div className="mt-4 grid gap-3">
            {franjas.map((fr) => (
              <label
                key={fr.id}
                className="tap flex cursor-pointer items-center gap-3 rounded-[--radius-card] border-2 border-line bg-paper px-5 py-4 font-semibold transition-colors hover:border-leaf has-[:checked]:border-leaf has-[:checked]:bg-leaf-soft"
              >
                <input
                  type="checkbox"
                  name="slots"
                  value={fr.label}
                  className="h-5 w-5 accent-[var(--color-leaf-deep)]"
                />
                {fr.label}
              </label>
            ))}
          </div>
          {errores.slots && <MensajeError msg={errores.slots} />}
        </fieldset>
      </Bloque>

      <Bloque titulo={c.yourStudies}>
        <Campo id="school" label={c.school} ayuda={c.schoolHelp} error={errores.school} ancho />
        <Campo id="program" label={c.program} error={errores.program} ancho />
        <Campo id="certified" label={c.certified} ayuda={c.certifiedHelp} error={errores.certified} ancho />

        <fieldset className="sm:col-span-2">
          <legend className="text-base font-bold">{c.reason}</legend>
          <div className="mt-3 flex flex-wrap gap-3">
            {[c.reasonWork, c.reasonHelp2, c.reasonBoth].map((op) => (
              <label
                key={op}
                className="tap flex cursor-pointer items-center gap-2.5 rounded-full border-2 border-line bg-paper px-5 py-3 font-semibold transition-colors hover:border-leaf has-[:checked]:border-leaf has-[:checked]:bg-leaf-soft"
              >
                <input type="radio" name="reason" value={op} className="h-4 w-4 accent-[var(--color-leaf-deep)]" />
                {op}
              </label>
            ))}
          </div>
        </fieldset>
      </Bloque>

      {/* El chequeo policial. Va en su propio bloque y con su propia
          explicación: es lo más incómodo que se pide acá, y lo menos que se
          puede hacer es decir por qué. */}
      <Bloque titulo={c.yourCheck}>
        <div className="sm:col-span-2 flex items-start gap-4 rounded-[--radius-card] bg-leaf-soft p-5">
          <span aria-hidden="true" className="shrink-0">
            <IconCertificate className="h-12 w-12" />
          </span>
          <p className="font-semibold">{c.checkIntro}</p>
        </div>

        <Campo
          id="checkDate"
          label={c.checkDate}
          type="date"
          ayuda={c.checkDateHelp}
          error={errores.checkDate}
        />

        <div id="checkFile" className="sm:col-span-2">
          <label htmlFor="checkFileInput" className="block text-base font-bold">
            {c.checkFile}
          </label>
          <p className="mt-1 text-sm text-ink-soft">{c.checkFileHelp}</p>
          <input
            id="checkFileInput"
            name="checkFile"
            type="file"
            accept={TIPOS_ARCHIVO.join(",")}
            onChange={(e) => setArchivo(e.currentTarget.files?.[0] ?? null)}
            aria-invalid={errores.checkFile ? true : undefined}
            aria-describedby={errores.checkFile ? "checkFile-err" : undefined}
            className="tap mt-3 block w-full rounded-[--radius-card] border-2 border-line bg-paper p-3 file:mr-4 file:rounded-full file:border-0 file:bg-ink file:px-5 file:py-2.5 file:font-bold file:text-paper"
          />
          {archivo && (
            <p className="mt-2 text-sm font-semibold text-leaf-ink">
              {c.checkChosen}: {archivo.name} ({Math.round(archivo.size / 1024)} KB)
            </p>
          )}
          {errores.checkFile && <MensajeError msg={errores.checkFile} id="checkFile-err" />}
        </div>
      </Bloque>

      <div id="consent" className="mt-10">
        <label className="flex cursor-pointer items-start gap-3 text-base font-semibold">
          <input
            type="checkbox"
            name="consent"
            value="si"
            aria-invalid={errores.consent ? true : undefined}
            className="mt-1 h-5 w-5 shrink-0 accent-[var(--color-leaf-deep)]"
          />
          <span>
            {c.consent}{" "}
            <Link href={localePath(locale, "/terms")} className="link">
              {c.consentLink}
            </Link>
          </span>
        </label>
        {errores.consent && <MensajeError msg={errores.consent} />}
      </div>

      <button
        type="submit"
        disabled={enviando}
        className="btn tap mt-10 inline-flex items-center rounded-full bg-leaf-deep px-9 py-4 text-lg font-bold text-paper transition-transform hover:scale-[1.03] disabled:opacity-70"
      >
        {enviando ? c.sending : c.submit}
      </button>
    </form>
  );
}

/* ── Piezas ─────────────────────────────────────────────────────────────── */

function Bloque({ titulo, children }: { titulo: string; children: React.ReactNode }) {
  return (
    <section className="mt-12 first:mt-0">
      <h2 className="text-2xl font-bold sm:text-3xl">{titulo}</h2>
      <div className="mt-6 grid gap-5 sm:grid-cols-2">{children}</div>
    </section>
  );
}

/* Se llama MensajeError y no Error a propósito: un componente llamado
   `Error` tapa al constructor `Error` de JavaScript dentro del archivo, y
   `throw new Error(...)` deja de compilar con un mensaje que no dice nada de
   eso. */
function MensajeError({ msg, id }: { msg: string; id?: string }) {
  return (
    <p id={id} className="mt-2 font-semibold text-[var(--color-was)]">
      {msg}
    </p>
  );
}

function Campo({
  id,
  label,
  type = "text",
  ayuda,
  error,
  ancho,
  ...resto
}: {
  id: string;
  label: string;
  type?: string;
  ayuda?: string;
  error?: string;
  ancho?: boolean;
} & React.InputHTMLAttributes<HTMLInputElement>) {
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
