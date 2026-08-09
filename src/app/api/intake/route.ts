import { NextResponse } from "next/server";
import { ORG } from "@/content/site";
import { TERMS_VERSION } from "@/content/terms";
import {
  asuntoAviso,
  cuerpoHtml,
  cuerpoTexto,
  enviarCorreo,
  type Campo,
} from "@/lib/email";

/**
 * Recibe la inscripción y se la manda a la fundación.
 *
 * Se valida otra vez acá por lo mismo de siempre: la validación del navegador
 * es cortesía para quien llena el formulario, la del servidor es la única que
 * cuenta.
 *
 * ── Lo que queda registrado del consentimiento ────────────────────────────
 *
 * Cada inscripción guarda QUÉ VERSIÓN de los términos se aceptó y CUÁNDO. Sin
 * eso, dentro de un año no hay forma de probar qué aceptó una familia, y en
 * un sitio con menores, información de salud y consentimiento de imagen, eso
 * no es un detalle administrativo.
 *
 * ── La información de salud ───────────────────────────────────────────────
 *
 * Viaja al correo de la fundación y no se guarda en ningún otro lado. No se
 * registra en los logs. Es lo mismo que se le promete a la familia en la
 * pantalla: la ven el personal que trabaja con ese estudiante y la
 * administradora que asigna el apoyo. Nadie más.
 */

export const runtime = "nodejs";

function limpio(v: FormDataEntryValue | null): string {
  return typeof v === "string" ? v.trim() : "";
}

export async function POST(req: Request) {
  let datos: FormData;
  try {
    datos = await req.formData();
  } catch {
    return NextResponse.json({ error: "cuerpo-invalido" }, { status: 400 });
  }

  const para = limpio(datos.get("who"));
  const esParaOtro = para === "child";
  const prefijo = esParaOtro ? "cg" : "st";

  const correo = limpio(datos.get(`${prefijo}Email`));
  const telefono = limpio(datos.get(`${prefijo}Phone`));
  const clases = datos.getAll("classes").map(limpio).filter(Boolean);

  const faltan: string[] = [];
  if (para !== "self" && para !== "child") faltan.push("who");
  if (!limpio(datos.get("stFirst"))) faltan.push("stFirst");
  if (!limpio(datos.get("stLast"))) faltan.push("stLast");
  if (!correo || !/^[^@\s]+@[^@\s]+\.[^@\s]{2,}$/.test(correo)) faltan.push("email");
  if (telefono.replace(/\D/g, "").length < 10) faltan.push("phone");
  if (clases.length === 0) faltan.push("classes");
  if (!limpio(datos.get("support"))) faltan.push("support");
  if (!limpio(datos.get("photos"))) faltan.push("photos");
  if (!limpio(datos.get("terms"))) faltan.push("terms");

  if (faltan.length > 0) {
    return NextResponse.json({ error: "validacion", campos: faltan }, { status: 422 });
  }

  const estudiante = `${limpio(datos.get("stFirst"))} ${limpio(datos.get("stLast"))}`;
  const cuidador = esParaOtro
    ? `${limpio(datos.get("cgFirst"))} ${limpio(datos.get("cgLast"))}`
    : "";

  const campos: Campo[] = [
    { etiqueta: "Inscripción para", valor: esParaOtro ? "Un menor o persona a cargo" : "Sí mismo" },
    { etiqueta: "Estudiante", valor: estudiante },
    { etiqueta: "Nacimiento del estudiante", valor: limpio(datos.get("stBirth")) },
    { etiqueta: "Cuidador", valor: cuidador },
    { etiqueta: "Relación con el estudiante", valor: limpio(datos.get("cgRelation")) },
    { etiqueta: "Correo de contacto", valor: correo },
    { etiqueta: "Teléfono de contacto", valor: telefono },
    {
      etiqueta: "Dirección",
      valor: [
        limpio(datos.get(`${prefijo}Address`)),
        limpio(datos.get("cgCity")),
        limpio(datos.get("cgZip")),
      ]
        .filter(Boolean)
        .join(", "),
    },
    {
      etiqueta: "Contacto de emergencia",
      valor: [limpio(datos.get("emergencyName")), limpio(datos.get("emergencyPhone"))]
        .filter(Boolean)
        .join(" · "),
    },
    { etiqueta: "Escuela", valor: limpio(datos.get("stSchool")) },
    { etiqueta: "Clases", valor: clases.join("\n") },
    {
      etiqueta: "Cuota mensual",
      valor: `$${(Number(limpio(datos.get("total")) || "0") / 100).toFixed(0)}`,
    },
    {
      etiqueta: "¿Necesita apoyo uno a uno?",
      valor: limpio(datos.get("support")) === "yes" ? "SÍ" : "No",
    },
    { etiqueta: "Para acompañarlo bien", valor: limpio(datos.get("diagnosis")) },
    { etiqueta: "Alergias o medicación", valor: limpio(datos.get("allergies")) },
    {
      etiqueta: "Consentimiento de imagen",
      valor:
        limpio(datos.get("photos")) === "yes"
          ? "SÍ, se puede fotografiar en clase"
          : "NO, no se fotografía en clase",
    },
    {
      etiqueta: "Términos aceptados",
      valor: `Versión ${TERMS_VERSION} · ${new Date().toISOString()}`,
    },
    { etiqueta: "Idioma del formulario", valor: limpio(datos.get("locale")) || "en" },
  ];

  const nota =
    limpio(datos.get("support")) === "yes"
      ? "Pide apoyo uno a uno. Hay que asignarle voluntario antes del primer sábado."
      : undefined;

  const enviado = await enviarCorreo({
    para: ORG.operationsEmail,
    asunto: asuntoAviso("estudiante", estudiante),
    html: cuerpoHtml("estudiante", estudiante, campos, nota),
    texto: cuerpoTexto(estudiante, campos),
    responderA: correo,
  });

  if (!enviado.ok) {
    // Nada del contenido va al registro: hay datos de salud de un menor.
    console.error("[inscripcion] no se pudo enviar:", enviado.motivo);
    return NextResponse.json({ error: "envio", motivo: enviado.motivo }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
