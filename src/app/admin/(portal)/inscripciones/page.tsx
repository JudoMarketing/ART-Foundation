import type { Metadata } from "next";
import { adm } from "@/content/admin";
import { INSCRIPCIONES_EJEMPLO } from "@/content/admin-demo";
import { CLASSES } from "@/content/site";
import { ejemplosAdmin, idiomaAdmin } from "@/lib/admin-prefs";
import { Celda, Etiqueta, Fila, Tabla, Titulo, Vacio } from "../piezas";

export async function generateMetadata(): Promise<Metadata> {
  return { title: adm(await idiomaAdmin()).inscripciones.metaTitle };
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

export default async function InscripcionesPage() {
  const idioma = await idiomaAdmin();
  const ejemplos = await ejemplosAdmin();
  const c = adm(idioma).inscripciones;

  const filas = ejemplos ? INSCRIPCIONES_EJEMPLO : [];

  const nombreClase = (id: string) =>
    CLASSES.find((k) => k.id === id)?.[idioma].name ?? id;

  const tonoPago = {
    aldia: "ok",
    vencido: "mal",
    pausa: "aviso",
    cancelado: "neutro",
  } as const;

  return (
    <>
      <Titulo title={c.title} lead={c.lead} />

      {filas.length === 0 ? (
        <Vacio qué={c.empty} porQué={c.emptyWhy} />
      ) : (
        <>
          <Tabla
            cols={[
              c.cols.estudiante,
              c.cols.cuidador,
              c.cols.clases,
              c.cols.terapeuta,
              c.cols.fotos,
              c.cols.pago,
              c.cols.terminos,
              c.cols.fecha,
            ]}
            nota={c.terminosNota}
          >
            {filas.map((f) => (
              <Fila key={f.id}>
                <Celda fuerte>
                  {f.estudiante}
                  <span className="block text-sm font-normal text-ink-soft">
                    {f.edad}
                  </span>
                </Celda>

                <Celda>{f.propia ? c.selfLabel : f.cuidador}</Celda>

                <Celda>
                  <span className="flex flex-wrap gap-1.5">
                    {f.clases.map((k) => (
                      <Etiqueta key={k} tono="info">
                        {nombreClase(k)}
                      </Etiqueta>
                    ))}
                  </span>
                </Celda>

                <Celda>
                  {/* Que necesite terapeuta no cambia el precio ni lo saca del
                      grupo. Acá se marca para organizar el sábado, nada más. */}
                  {f.terapeuta ? (
                    <Etiqueta tono="ok">{c.terapeutaSi}</Etiqueta>
                  ) : (
                    <span className="text-ink-soft">{c.terapeutaNo}</span>
                  )}
                </Celda>

                <Celda>
                  {f.fotos ? (
                    <Etiqueta tono="ok">{c.fotosSi}</Etiqueta>
                  ) : (
                    <>
                      <Etiqueta tono="mal">{c.fotosNo}</Etiqueta>
                      <span className="mt-2 block text-sm">{c.fotosNoNota}</span>
                    </>
                  )}
                </Celda>

                <Celda>
                  <Etiqueta tono={tonoPago[f.pago]}>{c.pago[f.pago]}</Etiqueta>
                </Celda>

                <Celda>
                  <span className="block font-mono text-sm">{f.terminos}</span>
                  <span className="block text-sm">{fecha(f.aceptadoEl, idioma)}</span>
                </Celda>

                <Celda>{fecha(f.fecha, idioma)}</Celda>
              </Fila>
            ))}
          </Tabla>
        </>
      )}
    </>
  );
}
