import { NextResponse } from "next/server";
import { ORG } from "@/content/site";
import {
  asuntoAviso,
  cuerpoHtml,
  cuerpoTexto,
  enviarCorreo,
  type Campo,
} from "@/lib/email";

/**
 * Solicitud de ayuda con la cuota. Llega en amarillo.
 *
 * Se pide lo mínimo a propósito: nombre, contacto, para quién son las clases,
 * y lo que la persona quiera contar. Ningún comprobante, ninguna cifra que
 * haya que ir a buscar. Pedir ayuda ya cuesta bastante.
 *
 * Lo que se cuente acá no se registra en ningún log ni se guarda: va al
 * correo de la administradora y ahí termina. Es exactamente lo que se le
 * promete a la familia en la pantalla, y una promesa de privacidad que el
 * código no cumple es peor que no haberla hecho.
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

  const nombre = limpio(datos.get("firstName"));
  const apellido = limpio(datos.get("lastName"));
  const correo = limpio(datos.get("email"));
  const telefono = limpio(datos.get("phone"));

  const faltan: string[] = [];
  if (!nombre) faltan.push("firstName");
  if (!apellido) faltan.push("lastName");
  if (!correo || !/^[^@\s]+@[^@\s]+\.[^@\s]{2,}$/.test(correo)) faltan.push("email");
  if (telefono.replace(/\D/g, "").length < 10) faltan.push("phone");
  if (!limpio(datos.get("forWhom"))) faltan.push("forWhom");

  if (faltan.length > 0) {
    return NextResponse.json({ error: "validacion", campos: faltan }, { status: 422 });
  }

  const quien = `${nombre} ${apellido}`;
  const campos: Campo[] = [
    { etiqueta: "Nombre", valor: quien },
    { etiqueta: "Correo", valor: correo },
    { etiqueta: "Teléfono", valor: telefono },
    { etiqueta: "Las clases son para", valor: limpio(datos.get("forWhom")) },
    { etiqueta: "Personas en el hogar", valor: limpio(datos.get("householdSize")) },
    { etiqueta: "Lo que podría cubrir al mes", valor: limpio(datos.get("canPay")) },
    { etiqueta: "Lo que cuenta", valor: limpio(datos.get("situation")) },
    { etiqueta: "Prefiere que la contacten por", valor: limpio(datos.get("prefer")) },
    { etiqueta: "Idioma del formulario", valor: limpio(datos.get("locale")) || "en" },
  ];

  const enviado = await enviarCorreo({
    para: ORG.operationsEmail,
    asunto: asuntoAviso("financiamiento", quien),
    html: cuerpoHtml(
      "financiamiento",
      quien,
      campos,
      "Responder pronto. Alguien que pide ayuda con la cuota y no recibe respuesta en unos días entiende que la respuesta fue no.",
    ),
    texto: cuerpoTexto(quien, campos),
    responderA: correo,
  });

  if (!enviado.ok) {
    console.error("[financiamiento] no se pudo enviar:", enviado.motivo);
    return NextResponse.json({ error: "envio", motivo: enviado.motivo }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
