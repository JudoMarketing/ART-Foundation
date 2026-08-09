"use client";

import { useState } from "react";
import Link from "next/link";
import { localePath, type Locale } from "@/lib/i18n";
import { f, i as intake } from "@/content/forms";
import { t } from "@/content/copy";
import { CLASSES, CLASS_DAY, ORG, bundleCents, formatPrice, savingsCents } from "@/content/site";
import FormShell, { type Paso } from "@/components/FormShell";
import { AreaTexto, Bloque, Campo, Opciones } from "@/components/FormFields";
import { CLASS_ICONS, IconHeart, IconTogether } from "@/components/ArtIcons";

/**
 * La inscripción. La llena el padre, la madre, el cuidador — o el propio
 * estudiante cuando viene solo.
 *
 * Se llena ANTES de pagar, y eso ordena el resto: primero la fundación sabe a
 * quién va a recibir, y recién después se habla de dinero. Una familia que
 * paga y después descubre que el horario no le servía es una devolución y una
 * mala tarde para las dos partes.
 *
 * ── La pregunta que cambia todo ───────────────────────────────────────────
 *
 * "¿Para quién es?" va primero porque de ella depende si hace falta un paso
 * entero. Quien se inscribe solo no tiene que ver una pantalla pidiéndole los
 * datos de un cuidador que no existe: el paso directamente no aparece.
 *
 * ── El consentimiento de imagen ───────────────────────────────────────────
 *
 * Es la pregunta más delicada del formulario y por eso tiene paso propio. Si
 * la respuesta es NO, la pantalla lo explica ahí mismo: la fundación hace
 * eventos públicos que sí se graban, y para esos se pide permiso aparte y por
 * escrito. Decir que no acá no deja al estudiante fuera de nada.
 *
 * Esa explicación aparece **al elegir**, no en un aviso legal al final. Una
 * familia que dice que no lo hace por una razón, y merece saber en ese
 * momento qué implica y qué no.
 */

export default function IntakeForm({ locale }: { locale: Locale }) {
  const c = intake(locale);
  const g = f(locale); // los textos genéricos: errores, etiquetas comunes
  const home = t(locale);

  const [para, setPara] = useState<"self" | "child" | null>(null);
  const [clases, setClases] = useState<string[]>([]);
  const [fotos, setFotos] = useState<"yes" | "no" | null>(null);
  const [enviando, setEnviando] = useState(false);
  const [listo, setListo] = useState(false);
  const [fallo, setFallo] = useState<string | null>(null);

  const total = bundleCents(clases.length);
  const ahorro = savingsCents(clases.length);

  const req = (datos: FormData, campos: string[]) => {
    const e: Record<string, string> = {};
    for (const k of campos) {
      if (!String(datos.get(k) ?? "").trim()) e[k] = g.errRequired;
    }
    return e;
  };

  const validarContacto = (datos: FormData, prefijo: string) => {
    const e: Record<string, string> = {};
    const correo = String(datos.get(`${prefijo}Email`) ?? "");
    if (correo && !/^[^@\s]+@[^@\s]+\.[^@\s]{2,}$/.test(correo)) {
      e[`${prefijo}Email`] = g.errEmail;
    }
    const tel = String(datos.get(`${prefijo}Phone`) ?? "").replace(/\D/g, "");
    if (tel && tel.length < 10) e[`${prefijo}Phone`] = g.errPhone;
    return e;
  };

  /* ── Los pasos ─────────────────────────────────────────────────────────
     Se arman aquí y no son fijos: el de "sobre ti" solo existe cuando la
     inscripción es para otra persona. */
  const pasos: Paso[] = [
    {
      id: "who",
      titulo: c.stepWho,
      validar: () => (para ? {} : { who: c.errPickWho } as Record<string, string>),
      contenido: (
        <Bloque>
          <Opciones
            id="who"
            legend={c.whoQuestion}
            name="who"
            tono="brand"
            onChange={(v) => setPara(v as "self" | "child")}
            opciones={[
              { valor: "self", titulo: c.whoSelf, ayuda: c.whoSelfHelp },
              { valor: "child", titulo: c.whoChild, ayuda: c.whoChildHelp },
            ]}
          />
        </Bloque>
      ),
    },
  ];

  if (para === "child") {
    pasos.push({
      id: "caregiver",
      titulo: c.stepCaregiver,
      validar: (d) => ({
        ...req(d, ["cgFirst", "cgLast", "cgEmail", "cgPhone", "cgRelation"]),
        ...validarContacto(d, "cg"),
      }),
      contenido: (
        <Bloque intro={c.caregiverIntro}>
          <Campo id="cgFirst" label={g.firstName} autoComplete="given-name" />
          <Campo id="cgLast" label={g.lastName} autoComplete="family-name" />
          <Campo id="cgEmail" label={g.email} type="email" autoComplete="email" />
          <Campo id="cgPhone" label={g.phone} type="tel" autoComplete="tel" />
          <Campo id="cgRelation" label={c.relationship} ayuda={c.relationshipHelp} ancho />
          <Campo id="cgAddress" label={g.address} autoComplete="street-address" ancho />
          <Campo id="cgCity" label={g.city} autoComplete="address-level2" />
          <Campo id="cgZip" label={g.zip} autoComplete="postal-code" inputMode="numeric" />
        </Bloque>
      ),
    });
  }

  pasos.push({
    id: "student",
    titulo: c.stepStudent,
    validar: (d) => {
      const base = req(d, ["stFirst", "stLast", "stBirth"]);
      // Quien se inscribe solo pone acá su propio contacto: si no hay paso de
      // cuidador, el correo y el teléfono son obligatorios en este.
      if (para === "self") {
        Object.assign(base, req(d, ["stEmail", "stPhone"]), validarContacto(d, "st"));
      }
      return base;
    },
    contenido: (
      <Bloque intro={c.studentIntro}>
        <Campo id="stFirst" label={c.studentFirst} />
        <Campo id="stLast" label={c.studentLast} />
        <Campo id="stBirth" label={c.studentBirth} type="date" />
        {para === "self" ? (
          <>
            <Campo id="stEmail" label={g.email} type="email" autoComplete="email" />
            <Campo id="stPhone" label={g.phone} type="tel" autoComplete="tel" />
            <Campo id="stAddress" label={g.address} autoComplete="street-address" ancho />
          </>
        ) : (
          <Campo id="stSchool" label={g.school} ancho />
        )}
        <Campo id="emergencyName" label={g.emergencyName} />
        <Campo id="emergencyPhone" label={g.emergencyPhone} type="tel" />
      </Bloque>
    ),
  });

  pasos.push({
    id: "classes",
    titulo: c.stepClasses,
    validar: () => (clases.length > 0 ? {} : { classes: c.errPickClass } as Record<string, string>),
    contenido: (
      <>
        <Opciones
          id="classes"
          legend={c.classesIntro}
          name="classes"
          tipo="checkbox"
          tono="brand"
          onChange={(v, marcado) =>
            setClases((prev) => (marcado ? [...prev, v] : prev.filter((x) => x !== v)))
          }
          opciones={CLASSES.map((k) => ({
            valor: k[locale].name,
            titulo: k[locale].name,
            ayuda: `${CLASS_DAY[locale]} · ${k.start}–${k.end}`,
          }))}
        />

        {/* La cuenta, en vivo. El descuento se ve al marcar la segunda, que
            es cuando importa. */}
        <div
          aria-live="polite"
          className="mt-6 rounded-[--radius-card] border-2 border-brand bg-brand-soft p-6"
        >
          <p className="text-sm font-bold uppercase tracking-[0.14em] text-ink-soft">
            {c.classesTotal}
          </p>
          <p className="mt-2">
            <span className="text-4xl font-bold">{formatPrice(total, locale)}</span>{" "}
            <span className="text-base text-ink-soft">
              {home.classes.perMonth} ·{" "}
              {clases.length === 1
                ? home.classes.oneClass
                : home.classes.manyClasses.replace("{n}", String(clases.length))}
            </span>
          </p>
          {ahorro > 0 && (
            <p className="mt-1 font-bold text-[var(--color-now)]">
              {home.classes.save.replace("{amount}", formatPrice(ahorro, locale))}
            </p>
          )}
          <p className="mt-2 text-sm text-ink-soft">{home.classes.included}</p>
        </div>
      </>
    ),
  });

  pasos.push({
    id: "support",
    titulo: c.stepSupport,
    validar: (d) =>
      d.get("support") ? {} : { support: c.errPickSupport } as Record<string, string>,
    contenido: (
      <>
        <Opciones
          id="support"
          legend={c.supportQuestion}
          ayuda={c.supportNote}
          name="support"
          tono="brand"
          opciones={[
            { valor: "yes", titulo: c.supportYes },
            { valor: "no", titulo: c.supportNo },
          ]}
        />
        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          <AreaTexto id="diagnosis" label={c.diagnosis} ayuda={c.diagnosisHelp} />
          <AreaTexto id="allergies" label={c.allergies} ayuda={c.allergiesHelp} />
        </div>
        <p className="mt-5 flex items-start gap-3 rounded-[--radius-card] bg-paper-warm p-5 text-sm font-semibold">
          <span aria-hidden="true" className="shrink-0">
            <IconTogether className="h-10 w-10" />
          </span>
          {c.healthPrivacy}
        </p>
      </>
    ),
  });

  pasos.push({
    id: "photos",
    titulo: c.stepPhotos,
    validar: () => (fotos ? {} : { photos: c.errPickPhoto } as Record<string, string>),
    contenido: (
      <>
        <Opciones
          id="photos"
          legend={c.photoQuestion}
          name="photos"
          tono="brand"
          onChange={(v) => setFotos(v as "yes" | "no")}
          opciones={[
            { valor: "yes", titulo: c.photoYes },
            { valor: "no", titulo: c.photoNo },
          ]}
        />

        {/* La explicación sale al elegir, no en la letra chica del final. */}
        {fotos && (
          <div
            aria-live="polite"
            className={`mt-6 flex items-start gap-4 rounded-[--radius-card] border-2 p-6 ${
              fotos === "no" ? "border-sky bg-sky-soft" : "border-leaf bg-leaf-soft"
            }`}
          >
            <span aria-hidden="true" className="shrink-0">
              <IconHeart className="h-12 w-12" />
            </span>
            <p className="font-medium">
              {fotos === "no" ? c.photoNoNote : c.photoYesNote}
            </p>
          </div>
        )}
      </>
    ),
  });

  pasos.push({
    id: "review",
    titulo: c.stepReview,
    validar: (d) => (d.get("terms") ? {} : { terms: g.errConsent } as Record<string, string>),
    contenido: (
      <>
        <p className="text-lg text-ink-soft">{c.reviewIntro}</p>

        <dl className="mt-6 divide-y divide-line rounded-[--radius-card] border-2 border-line bg-paper px-6">
          <Fila etiqueta={c.stepWho} valor={para === "self" ? c.whoSelf : c.whoChild} />
          <Fila
            etiqueta={c.stepClasses}
            valor={clases.length ? clases.join(", ") : "—"}
          />
          <Fila
            etiqueta={c.classesTotal}
            valor={`${formatPrice(total, locale)} ${home.classes.perMonth}`}
          />
          <Fila
            etiqueta={c.photoQuestion}
            valor={fotos === "yes" ? c.photoYes : fotos === "no" ? c.photoNo : "—"}
          />
        </dl>

        <div className="mt-6 flex items-start gap-4 rounded-[--radius-card] bg-paper-warm p-6">
          {CLASSES.slice(0, 3).map((k) => {
            const Icon = CLASS_ICONS[k.id];
            return (
              <span key={k.id} aria-hidden="true">
                <Icon className="h-12 w-12" />
              </span>
            );
          })}
          <p className="font-semibold">{c.paymentNote}</p>
        </div>
      </>
    ),
  });

  async function enviar(datos: FormData) {
    datos.set("locale", locale);
    datos.set("total", String(total));
    setEnviando(true);
    setFallo(null);
    try {
      const res = await fetch("/api/intake", { method: "POST", body: datos });
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
      <div
        tabIndex={-1}
        className="card rounded-[--radius-card] border-2 border-brand bg-paper p-10"
      >
        <span aria-hidden="true" className="block">
          <IconHeart className="h-20 w-20" />
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
      >
        <label id="terms" className="mt-8 flex cursor-pointer items-start gap-3 text-base font-semibold">
          <input
            type="checkbox"
            name="terms"
            value="si"
            className="mt-1 h-5 w-5 shrink-0 accent-[var(--color-brand-ink)]"
          />
          <span>
            {c.termsAccept}{" "}
            <Link href={localePath(locale, "/terms")} className="link">
              {c.termsLink}
            </Link>
          </span>
        </label>
      </FormShell>
    </>
  );
}

function Fila({ etiqueta, valor }: { etiqueta: string; valor: string }) {
  return (
    <div className="flex flex-wrap justify-between gap-x-6 gap-y-1 py-4">
      <dt className="text-ink-soft">{etiqueta}</dt>
      <dd className="font-bold">{valor}</dd>
    </div>
  );
}
