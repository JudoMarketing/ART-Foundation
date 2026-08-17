import type { Metadata } from "next";
import { adm } from "@/content/admin";
import { DONACIONES_EJEMPLO } from "@/content/admin-demo";
import { formatPrice } from "@/content/site";
import { ejemplosAdmin, idiomaAdmin } from "@/lib/admin-prefs";
import { Celda, Etiqueta, Fila, Tabla, Titulo, Vacio } from "../piezas";

export async function generateMetadata(): Promise<Metadata> {
  return { title: adm(await idiomaAdmin()).donaciones.metaTitle };
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

export default async function DonacionesPage() {
  const idioma = await idiomaAdmin();
  const ejemplos = await ejemplosAdmin();
  const c = adm(idioma).donaciones;

  const filas = ejemplos ? DONACIONES_EJEMPLO : [];
  const total = filas.reduce((suma, d) => suma + d.centavos, 0);

  return (
    <>
      <Titulo
        title={c.title}
        lead={c.lead}
        extra={
          filas.length > 0 ? (
            <p className="rounded-[--radius-card] bg-leaf-soft px-6 py-4 text-leaf-ink">
              <span className="block text-sm font-semibold">{c.total}</span>
              <span className="font-display text-3xl font-bold">
                {formatPrice(total, idioma)}
              </span>
            </p>
          ) : undefined
        }
      />

      {filas.length === 0 ? (
        <Vacio qué={c.empty} porQué={c.emptyWhy} />
      ) : (
        <Tabla
          cols={[c.cols.donante, c.cols.monto, c.cols.tipo, c.cols.recibo, c.cols.fecha]}
          nota={c.reciboNota}
        >
          {filas.map((d) => (
            <Fila key={d.id}>
              <Celda fuerte>{d.donante}</Celda>
              <Celda>
                <span className="font-display text-lg font-bold text-ink">
                  {formatPrice(d.centavos, idioma)}
                </span>
              </Celda>
              <Celda>
                <Etiqueta tono={d.tipo === "mensual" ? "ok" : "info"}>
                  {d.tipo === "mensual" ? c.tipoMensual : c.tipoUnica}
                </Etiqueta>
              </Celda>
              <Celda>
                <Etiqueta tono="ok">{c.reciboEnviado}</Etiqueta>
              </Celda>
              <Celda>{fecha(d.fecha, idioma)}</Celda>
            </Fila>
          ))}
        </Tabla>
      )}
    </>
  );
}
