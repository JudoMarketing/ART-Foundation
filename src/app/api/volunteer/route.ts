import { NextResponse } from "next/server";
import { ORG } from "@/content/site";
import {
  MAX_ARCHIVO_BYTES,
  MESES_VIGENCIA_CHEQUEO,
  TIPOS_ARCHIVO,
} from "@/content/forms";
import {
  asuntoAviso,
  cuerpoHtml,
  cuerpoTexto,
  enviarCorreo,
  type Campo,
} from "@/lib/email";

/**
 * Recibe la postulación de voluntariado y se la manda a Mónica.
 *
 * ── Por qué se valida otra vez acá ────────────────────────────────────────
 *
 * El formulario ya valida en el navegador, y eso es para ayudar a quien lo
 * llena. Esto es otra cosa: cualquiera puede mandar un POST a esta dirección
 * sin pasar por el formulario. La validación del navegador es cortesía; la
 * del servidor es la única que cuenta.
 *
 * ── Sobre el chequeo policial ─────────────────────────────────────────────
 *
 * Es un documento sensible de una persona identificable. Tres decisiones al
 * respecto, y las tres a propósito:
 *
 *  1. **No se guarda en ningún lado.** Viaja del navegador a este servidor,
 *     de acá al correo de la fundación, y se acabó. No hay base de datos ni
 *     almacenamiento intermedio que después haya que proteger, auditar o
 *     borrar.
 *  2. **No se registra en los logs.** Ni el archivo ni la fecha de nacimiento
 *     ni la dirección. Un log es un archivo que alguien puede leer más tarde.
 *  3. **La vigencia se comprueba con la fecha declarada**, porque un PDF no
 *     dice cuándo se emitió de forma que un programa pueda leerla. Quien
 *     reciba el correo tiene que abrir el documento y confirmarlo con los
 *     ojos: acá se filtra lo obvio, no se certifica nada.
 */

export const runtime = "nodejs";

const DESTINO = ORG.operationsEmail;

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

  const nombre = limpio(datos.get("firstName"));
  const apellido = limpio(datos.get("lastName"));
  const correo = limpio(datos.get("email"));
  const telefono = limpio(datos.get("phone"));
  const chequeoFecha = limpio(datos.get("checkDate"));
  const consentimiento = limpio(datos.get("consent"));
  const horarios = datos.getAll("slots").map((s) => limpio(s)).filter(Boolean);

  // Lo mínimo sin lo cual el correo no sirve de nada.
  const faltan: string[] = [];
  if (!nombre) faltan.push("firstName");
  if (!apellido) faltan.push("lastName");
  if (!correo || !/^[^@\s]+@[^@\s]+\.[^@\s]{2,}$/.test(correo)) faltan.push("email");
  if (telefono.replace(/\D/g, "").length < 10) faltan.push("phone");
  if (horarios.length === 0) faltan.push("slots");
  if (!consentimiento) faltan.push("consent");
  if (!chequeoFecha) faltan.push("checkDate");

  // La vigencia del chequeo: seis meses, ni un día más.
  if (chequeoFecha) {
    const emitido = new Date(`${chequeoFecha}T00:00:00Z`);
    const hoy = new Date();
    const limite = new Date(hoy);
    limite.setMonth(limite.getMonth() - MESES_VIGENCIA_CHEQUEO);
    if (Number.isNaN(emitido.getTime())) faltan.push("checkDate");
    else if (emitido > hoy) faltan.push("checkFuture");
    else if (emitido < limite) faltan.push("checkOld");
  }

  const archivo = datos.get("checkFile");
  let adjunto: { nombre: string; contenidoBase64: string } | undefined;

  if (archivo instanceof File && archivo.size > 0) {
    if (archivo.size > MAX_ARCHIVO_BYTES) faltan.push("fileBig");
    else if (!TIPOS_ARCHIVO.includes(archivo.type)) faltan.push("fileType");
    else {
      const buf = Buffer.from(await archivo.arrayBuffer());
      adjunto = {
        nombre: `chequeo-${apellido || "postulante"}-${chequeoFecha}${
          archivo.type === "application/pdf" ? ".pdf" : ".jpg"
        }`,
        contenidoBase64: buf.toString("base64"),
      };
    }
  }

  if (faltan.length > 0) {
    return NextResponse.json({ error: "validacion", campos: faltan }, { status: 422 });
  }

  const campos: Campo[] = [
    { etiqueta: "Nombre", valor: `${nombre} ${apellido}` },
    { etiqueta: "Correo", valor: correo },
    { etiqueta: "Teléfono", valor: telefono },
    { etiqueta: "Fecha de nacimiento", valor: limpio(datos.get("birthDate")) },
    {
      etiqueta: "Dirección",
      valor: [limpio(datos.get("address")), limpio(datos.get("city")), limpio(datos.get("zip"))]
        .filter(Boolean)
        .join(", "),
    },
    {
      etiqueta: "Contacto de emergencia",
      valor: [limpio(datos.get("emergencyName")), limpio(datos.get("emergencyPhone"))]
        .filter(Boolean)
        .join(" · "),
    },
    { etiqueta: "Quiere empezar el", valor: limpio(datos.get("startDate")) },
    { etiqueta: "Horarios disponibles", valor: horarios.join("\n") },
    { etiqueta: "Horas que planea completar", valor: limpio(datos.get("hours")) },
    { etiqueta: "Dónde estudia", valor: limpio(datos.get("school")) },
    { etiqueta: "Qué estudia", valor: limpio(datos.get("program")) },
    { etiqueta: "Certificaciones", valor: limpio(datos.get("certified")) },
    { etiqueta: "Por qué viene", valor: limpio(datos.get("reason")) },
    { etiqueta: "Chequeo policial emitido el", valor: chequeoFecha },
    {
      etiqueta: "Documento",
      valor: adjunto ? "Adjunto a este correo" : "No lo subió",
    },
    { etiqueta: "Idioma del formulario", valor: limpio(datos.get("locale")) || "en" },
  ];

  const quien = `${nombre} ${apellido}`;
  const enviado = await enviarCorreo({
    para: DESTINO,
    asunto: asuntoAviso("voluntario", quien),
    html: cuerpoHtml(
      "voluntario",
      quien,
      campos,
      adjunto
        ? "El chequeo policial va adjunto. Ábrelo y confirma la fecha con los ojos: el sitio comprueba la que declaró la persona, no la del documento."
        : "Esta persona no adjuntó el chequeo policial. Hay que pedírselo antes de asignarle nada.",
    ),
    texto: cuerpoTexto(quien, campos),
    responderA: correo,
    adjunto,
  });

  if (!enviado.ok) {
    // A propósito no se registra nada del contenido: son datos personales.
    console.error("[voluntariado] no se pudo enviar:", enviado.motivo);
    return NextResponse.json({ error: "envio", motivo: enviado.motivo }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
