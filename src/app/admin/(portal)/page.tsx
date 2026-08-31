import type { Metadata } from "next";
import Link from "next/link";
import { adm } from "@/content/admin";
import { PANEL_EJEMPLO } from "@/content/admin-demo";
import { formatPrice } from "@/content/site";
import { ejemplosAdmin, idiomaAdmin } from "@/lib/admin-prefs";
import { Titulo } from "./piezas";

export async function generateMetadata(): Promise<Metadata> {
  return { title: adm(await idiomaAdmin()).panel.metaTitle };
}

export default async function PanelPage() {
  const idioma = await idiomaAdmin();
  const ejemplos = await ejemplosAdmin();
  const c = adm(idioma).panel;

  const d = PANEL_EJEMPLO;
  const guion = "—";

  /**
   * Las ocho cifras del panel.
   *
   * Sin ejemplos van con un guion y no con un cero, y la diferencia es real:
   * un cero dice "se midió y dio cero", un guion dice "todavía no se mide
   * nada". Poner ceros donde no hay medición es la manera más rápida de que
   * alguien crea que este mes no donó nadie.
   */
  const kpis = [
    { label: c.kpis.inscritos, valor: ejemplos ? String(d.inscritos) : guion, tono: "bg-brand-soft text-brand-ink" },
    { label: c.kpis.cobrado, valor: ejemplos ? formatPrice(d.cobradoCentavos, idioma) : guion, tono: "bg-sky-soft text-sky-ink" },
    { label: c.kpis.donado, valor: ejemplos ? formatPrice(d.donadoCentavos, idioma) : guion, tono: "bg-leaf-soft text-leaf-ink" },
    { label: c.kpis.vendido, valor: ejemplos ? formatPrice(d.vendidoCentavos, idioma) : guion, tono: "bg-sun-soft text-sun-ink" },
    { label: c.kpis.voluntariosActivos, valor: ejemplos ? String(d.voluntariosActivos) : guion, tono: "bg-leaf-soft text-leaf-ink" },
    { label: c.kpis.enCola, valor: ejemplos ? String(d.enCola) : guion, tono: "bg-sun-soft text-sun-ink" },
    { label: c.kpis.visitas, valor: ejemplos ? d.visitas.toLocaleString(idioma === "es" ? "es-US" : "en-US") : guion, tono: "bg-sky-soft text-sky-ink" },
    { label: c.kpis.pagosFallidos, valor: ejemplos ? String(d.pagosFallidos) : guion, tono: "bg-brand-soft text-brand-ink" },
  ];

  /**
   * Las frases van escritas enteras en cada idioma y no armadas por pedazos.
   *
   * El primer intento las componía con el nombre de la sección del menú y una
   * cifra, y salía "1 inscripciones", "1 voluntarios". El español concuerda en
   * número y el inglés no, así que una frase armada así funciona en un idioma
   * y queda mal en el otro. Escribirlas dos veces cuesta dos renglones.
   */
  const pendientes = ejemplos
    ? idioma === "es"
      ? [
          { texto: "Una inscripción: A. S.", detalle: "El pago falló y ya lleva un mes vencido.", href: "/admin/inscripciones" },
          { texto: "Dos voluntarias en cola", detalle: "Todavía no se les avisó su puesto.", href: "/admin/voluntarios" },
          { texto: "Una voluntaria: R. I.", detalle: "El chequeo policial tiene más de 6 meses.", href: "/admin/voluntarios" },
        ]
      : [
          { texto: "One registration: A. S.", detalle: "Payment failed and is a month past due.", href: "/admin/inscripciones" },
          { texto: "Two volunteers queued", detalle: "They have not been told their position yet.", href: "/admin/voluntarios" },
          { texto: "One volunteer: R. I.", detalle: "Background check is older than 6 months.", href: "/admin/voluntarios" },
        ]
    : [];

  return (
    <>
      <Titulo
        title={c.title}
        lead={c.lead}
        extra={
          <p className="rounded-full bg-paper px-4 py-2 text-sm font-bold ring-1 ring-inset ring-line">
            {c.period}
          </p>
        }
      />

      <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {kpis.map((k) => (
          <li key={k.label} className={`rounded-[--radius-card] p-6 ${k.tono}`}>
            <p className="font-display text-4xl font-bold">{k.valor}</p>
            <p className="mt-2 text-sm font-semibold text-ink-soft">{k.label}</p>
          </li>
        ))}
      </ul>

      <p className="mt-5 max-w-3xl text-sm text-ink-soft">{c.visitsNote}</p>

      <section className="mt-14">
        <h2 className="text-2xl font-bold">{c.pending}</h2>

        {pendientes.length === 0 ? (
          <p className="mt-5 rounded-[--radius-card] border-2 border-dashed border-line bg-paper p-8 text-center text-lg text-ink-soft">
            {c.pendingEmpty}
          </p>
        ) : (
          <ul className="mt-5 grid gap-3">
            {pendientes.map((p) => (
              <li key={p.texto}>
                <Link
                  href={p.href}
                  className="tap flex flex-wrap items-baseline gap-x-3 gap-y-1 rounded-[--radius-card] border border-line bg-paper px-6 py-4 transition-colors hover:border-ink"
                >
                  <span className="font-bold">{p.texto}</span>
                  <span className="text-ink-soft">{p.detalle}</span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>
    </>
  );
}
