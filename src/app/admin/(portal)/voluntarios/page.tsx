import type { Metadata } from "next";
import { adm } from "@/content/admin";
import { VOLUNTARIOS_EJEMPLO } from "@/content/admin-demo";
import { ejemplosAdmin, idiomaAdmin } from "@/lib/admin-prefs";
import { IconCertificate } from "@/components/ArtIcons";
import { Celda, Etiqueta, Fila, Pendiente, Tabla, Titulo, Vacio } from "../piezas";

export async function generateMetadata(): Promise<Metadata> {
  return { title: adm(await idiomaAdmin()).voluntarios.metaTitle };
}

function fecha(iso: string, locale: "en" | "es") {
  const [y, m, d] = iso.split("-").map(Number);
  return new Intl.DateTimeFormat(locale === "es" ? "es-US" : "en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(Date.UTC(y, m - 1, d)));
}

/**
 * El chequeo policial tiene que tener menos de 6 meses.
 *
 * Se calcula contra el día que se mira, no contra el día que se cargó: un
 * chequeo que era válido cuando llegó deja de serlo solo, sin que nadie lo
 * toque, y el portal tiene que darse cuenta antes que la fundación.
 */
function estadoChequeo(emitido: string, hoy: Date): "ok" | "vence" | "vencido" {
  const [y, m, d] = emitido.split("-").map(Number);
  const emision = Date.UTC(y, m - 1, d);
  const meses = (hoy.getTime() - emision) / (1000 * 60 * 60 * 24 * 30.44);
  if (meses >= 6) return "vencido";
  if (meses >= 5) return "vence";
  return "ok";
}

export default async function VoluntariosPage() {
  const idioma = await idiomaAdmin();
  const ejemplos = await ejemplosAdmin();
  const c = adm(idioma).voluntarios;

  const filas = ejemplos ? VOLUNTARIOS_EJEMPLO : [];
  const hoy = new Date();

  const tonoEstado = {
    nueva: "info",
    aceptada: "ok",
    cola: "aviso",
    rechazada: "neutro",
  } as const;

  return (
    <>
      <Titulo title={c.title} lead={c.lead} />

      {filas.length === 0 ? (
        <Vacio qué={c.empty} porQué={c.emptyWhy} />
      ) : (
        <Tabla
          cols={[
            c.cols.persona,
            c.cols.estudia,
            c.cols.desde,
            c.cols.horas,
            c.cols.chequeo,
            c.cols.estado,
          ]}
          nota={c.chequeoNota}
        >
          {filas.map((v) => {
            const chequeo = estadoChequeo(v.chequeoEmitido, hoy);
            const pct = Math.round((v.horasHechas / v.horasPrometidas) * 100);

            return (
              <Fila key={v.id}>
                <Celda fuerte>{v.nombre}</Celda>
                <Celda>{v.estudia}</Celda>
                <Celda>{fecha(v.desde, idioma)}</Celda>

                <Celda>
                  <span className="block font-bold text-ink">
                    {v.horasHechas} {c.horasFormato} {v.horasPrometidas}
                  </span>
                  {/* La barra es decorativa: la cifra de al lado ya dice lo
                      mismo en texto, así que el lector de pantalla no la lee
                      dos veces. */}
                  <span
                    aria-hidden="true"
                    className="mt-2 block h-2 w-32 overflow-hidden rounded-full bg-line"
                  >
                    <span
                      className="block h-full rounded-full bg-leaf-deep"
                      style={{ width: `${Math.min(100, pct)}%` }}
                    />
                  </span>
                </Celda>

                <Celda>
                  {chequeo === "ok" && <Etiqueta tono="ok">{c.chequeoOk}</Etiqueta>}
                  {chequeo === "vence" && <Etiqueta tono="aviso">{c.chequeoVence}</Etiqueta>}
                  {chequeo === "vencido" && <Etiqueta tono="mal">{c.chequeoVencido}</Etiqueta>}
                  <span className="mt-2 block text-sm">{fecha(v.chequeoEmitido, idioma)}</span>
                </Celda>

                <Celda>
                  <Etiqueta tono={tonoEstado[v.estado]}>{c.estados[v.estado]}</Etiqueta>
                  {v.cola !== null && (
                    <span className="mt-2 block text-sm font-bold text-ink">
                      {c.colaPos} {v.cola}
                    </span>
                  )}
                </Celda>
              </Fila>
            );
          })}
        </Tabla>
      )}

      <p className="mt-4 max-w-3xl text-sm text-ink-soft">{c.colaNota}</p>

      {/* La carta de recomendación, que es lo que el voluntario se lleva. */}
      <section className="mt-14 rounded-[--radius-card] border-2 border-line bg-paper p-8">
        <span aria-hidden="true" className="block">
          <IconCertificate className="h-14 w-14" />
        </span>
        <h2 className="mt-4 text-2xl font-bold">{c.cartaTitle}</h2>
        <p className="mt-2 max-w-2xl text-ink-soft">{c.cartaBody}</p>

        <div className="mt-6 flex flex-wrap gap-3">
          <button
            type="button"
            disabled
            className="rounded-full bg-ink px-6 py-3 text-base font-bold text-paper opacity-40"
          >
            {c.cartaCta}
          </button>
          <button
            type="button"
            disabled
            className="rounded-full border-2 border-ink px-6 py-3 text-base font-bold opacity-40"
          >
            {c.registrarHoras}
          </button>
        </div>

        <p className="mt-5 max-w-2xl rounded-[--radius-card] bg-sun-soft p-4 text-sm font-semibold text-sun-ink">
          {c.cartaFalta}
        </p>

        <Pendiente etiqueta={adm(idioma).comun.proximo} nota={adm(idioma).comun.proximoNota} />
      </section>
    </>
  );
}
