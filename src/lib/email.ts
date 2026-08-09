import { ORG } from "@/content/site";

/**
 * Los correos que salen del sitio.
 *
 * ── Los tres colores ──────────────────────────────────────────────────────
 *
 * Cada tipo de aviso llega con una franja de color distinta, porque quien los
 * recibe los recibe todos en la misma bandeja. Mónica abre el correo y antes
 * de leer una palabra ya sabe si es un voluntario, una familia nueva o una
 * venta. Es lo que pidió el dueño y tiene sentido operativo: son tres flujos
 * de trabajo distintos con tres urgencias distintas.
 *
 *   verde   → voluntarios y pasantes
 *   rojizo  → estudiantes nuevos
 *   azul    → ventas de la tienda
 *
 * El rojizo es un carmín, no el rojo puro: en este sitio el rojo pleno ya
 * significa "esto ya no" —el precio tachado, el sello de VENDIDO— y usarlo
 * para dar la bienvenida a una familia nueva sería decir lo contrario de lo
 * que pasa.
 *
 * ── Por qué el HTML es así de anticuado ───────────────────────────────────
 *
 * Tablas, estilos en línea y nada de flexbox. No es descuido: Outlook usa el
 * motor de Word para dibujar correos y no entiende CSS moderno. Un correo que
 * se ve precioso en Gmail y roto en Outlook es un correo roto, porque el
 * cliente lo abre donde quiere.
 *
 * Y va siempre con su versión en texto plano. Hay quien lee el correo sin
 * imágenes, y hay filtros de spam que castigan al que solo trae HTML.
 */

export type TipoAviso = "voluntario" | "estudiante" | "venta";

const COLORES: Record<TipoAviso, { franja: string; tinta: string; etiqueta: string }> = {
  voluntario: { franja: "#647e20", tinta: "#4a5f14", etiqueta: "VOLUNTARIADO" },
  estudiante: { franja: "#c2185b", tinta: "#a3134b", etiqueta: "ESTUDIANTE NUEVO" },
  venta: { franja: "#00607f", tinta: "#00506b", etiqueta: "VENTA" },
};

export type Campo = { etiqueta: string; valor: string };

function escapar(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export function asuntoAviso(tipo: TipoAviso, quien: string): string {
  return `[${COLORES[tipo].etiqueta}] ${quien}`;
}

/** La versión en texto plano. Va siempre, junto con la de HTML. */
export function cuerpoTexto(titulo: string, campos: Campo[]): string {
  const lineas = campos
    .filter((c) => c.valor.trim() !== "")
    .map((c) => `${c.etiqueta}: ${c.valor}`);
  return [titulo, "", ...lineas, "", `— ${ORG.name}`].join("\n");
}

export function cuerpoHtml(
  tipo: TipoAviso,
  titulo: string,
  campos: Campo[],
  nota?: string,
): string {
  const c = COLORES[tipo];
  const filas = campos
    .filter((x) => x.valor.trim() !== "")
    .map(
      (x) => `
        <tr>
          <td style="padding:10px 0;border-bottom:1px solid #e7e9ef;vertical-align:top;width:42%;color:#4b5163;font-size:14px;">
            ${escapar(x.etiqueta)}
          </td>
          <td style="padding:10px 0 10px 16px;border-bottom:1px solid #e7e9ef;vertical-align:top;color:#161922;font-size:15px;font-weight:600;">
            ${escapar(x.valor).replace(/\n/g, "<br>")}
          </td>
        </tr>`,
    )
    .join("");

  return `<!doctype html>
<html><body style="margin:0;padding:0;background:#faf7f2;font-family:-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#faf7f2;padding:24px 12px;">
    <tr><td align="center">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:620px;background:#ffffff;border-radius:12px;overflow:hidden;">

        <tr><td style="background:${c.franja};padding:20px 28px;">
          <div style="color:#ffffff;font-size:12px;font-weight:700;letter-spacing:2px;">
            ${c.etiqueta}
          </div>
          <div style="color:#ffffff;font-size:22px;font-weight:700;margin-top:6px;">
            ${escapar(titulo)}
          </div>
        </td></tr>

        <tr><td style="padding:8px 28px 24px;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0">${filas}</table>
          ${
            nota
              ? `<div style="margin-top:22px;padding:14px 16px;background:#faf7f2;border-left:4px solid ${c.franja};color:#161922;font-size:14px;">${escapar(nota)}</div>`
              : ""
          }
        </td></tr>

        <tr><td style="padding:18px 28px;border-top:1px solid #e7e9ef;color:#4b5163;font-size:12px;line-height:1.6;">
          ${escapar(ORG.name)}<br>
          ${escapar(ORG.office.street)}, ${escapar(ORG.office.city)}, ${ORG.office.state} ${ORG.office.zip}<br>
          ${escapar(ORG.phone)} · ${escapar(ORG.email)}
        </td></tr>

      </table>
    </td></tr>
  </table>
</body></html>`;
}

/**
 * Manda el correo.
 *
 * Usa Resend por HTTP y no una librería: son dos campos y un `fetch`, y así
 * el proyecto no arrastra una dependencia más ni se ata a un proveedor. El
 * día que se cambie de servicio, se cambia esta función y nada más.
 *
 * Devuelve `false` en vez de lanzar cuando falta la clave, para que quien
 * llame decida qué decirle a la persona que está delante del formulario.
 */
export async function enviarCorreo(opciones: {
  para: string;
  asunto: string;
  html: string;
  texto: string;
  responderA?: string;
  adjunto?: { nombre: string; contenidoBase64: string };
}): Promise<{ ok: boolean; motivo?: string }> {
  const clave = process.env.RESEND_API_KEY;
  const remitente = process.env.EMAIL_FROM;

  if (!clave || !remitente) {
    return { ok: false, motivo: "sin-credenciales" };
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${clave}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: remitente,
        to: [opciones.para],
        subject: opciones.asunto,
        html: opciones.html,
        text: opciones.texto,
        ...(opciones.responderA ? { reply_to: opciones.responderA } : {}),
        ...(opciones.adjunto
          ? {
              attachments: [
                {
                  filename: opciones.adjunto.nombre,
                  content: opciones.adjunto.contenidoBase64,
                },
              ],
            }
          : {}),
      }),
    });

    if (!res.ok) {
      return { ok: false, motivo: `${res.status}` };
    }
    return { ok: true };
  } catch {
    return { ok: false, motivo: "red" };
  }
}
