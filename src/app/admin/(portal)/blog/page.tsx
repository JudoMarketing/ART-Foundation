import type { Metadata } from "next";
import { adm } from "@/content/admin";
import { ARTICULOS_EJEMPLO } from "@/content/admin-demo";
import { ejemplosAdmin, idiomaAdmin } from "@/lib/admin-prefs";
import { Celda, Etiqueta, Fila, Pendiente, Tabla, Titulo, Vacio } from "../piezas";

export async function generateMetadata(): Promise<Metadata> {
  return { title: adm(await idiomaAdmin()).blog.metaTitle };
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

export default async function BlogAdminPage() {
  const idioma = await idiomaAdmin();
  const ejemplos = await ejemplosAdmin();
  const c = adm(idioma).blog;
  const comun = adm(idioma).comun;

  const filas = ejemplos ? ARTICULOS_EJEMPLO : [];

  return (
    <>
      <Titulo title={c.title} lead={c.lead} />

      {filas.length === 0 ? (
        <Vacio qué={c.empty} porQué={c.emptyWhy} />
      ) : (
        <Tabla cols={[c.cols.titulo, c.cols.estado, c.cols.idioma, c.cols.fecha]}>
          {filas.map((a) => (
            <Fila key={a.id}>
              <Celda fuerte>{a.titulo}</Celda>
              <Celda>
                <Etiqueta tono={a.estado === "publicado" ? "ok" : "aviso"}>
                  {c.estados[a.estado]}
                </Etiqueta>
              </Celda>
              <Celda>{a.idioma.toUpperCase()}</Celda>
              <Celda>{fecha(a.fecha, idioma)}</Celda>
            </Fila>
          ))}
        </Tabla>
      )}

      {/* El editor. Los campos están puestos y desactivados: es más fácil
          decir "falta la categoría" mirando el formulario que leyendo una
          lista de campos en un documento. */}
      <section className="mt-14 rounded-[--radius-card] border-2 border-line bg-paper p-8">
        <h2 className="text-2xl font-bold">{c.editorTitle}</h2>
        <p className="mt-2 text-ink-soft">{c.editorNota}</p>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <Campo etiqueta={c.campos.titulo} />
          <Campo etiqueta={c.campos.categoria} />
          <div className="lg:col-span-2">
            <Campo etiqueta={c.campos.resumen} lineas={2} />
          </div>
          <div className="lg:col-span-2">
            <Campo etiqueta={c.campos.cuerpo} lineas={8} />
          </div>
          <Campo etiqueta={c.campos.imagen} />
          <Campo etiqueta={c.campos.idioma} />
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <button
            type="button"
            disabled
            className="rounded-full bg-ink px-6 py-3 text-base font-bold text-paper opacity-40"
          >
            {c.publicar}
          </button>
          <button
            type="button"
            disabled
            className="rounded-full border-2 border-ink px-6 py-3 text-base font-bold opacity-40"
          >
            {c.guardar}
          </button>
        </div>

        <Pendiente etiqueta={comun.proximo} nota={comun.proximoNota} />
      </section>
    </>
  );
}

function Campo({ etiqueta, lineas = 1 }: { etiqueta: string; lineas?: number }) {
  return (
    <p>
      <span className="block text-base font-bold">{etiqueta}</span>
      <span
        aria-hidden="true"
        className="mt-2 block rounded-[--radius-card] border-2 border-line bg-paper-warm"
        style={{ height: `${lineas * 1.75 + 1.5}rem` }}
      />
    </p>
  );
}
