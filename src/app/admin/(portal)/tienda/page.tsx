import type { Metadata } from "next";
import Image from "next/image";
import { adm } from "@/content/admin";
import { VENDIDAS_EJEMPLO } from "@/content/admin-demo";
import {
  DIAS_MINIMOS_EN_VITRINA,
  OBRA,
  PORCENTAJE_ESTUDIANTE_PROVISIONAL,
  diasParaRetirar,
  disponibles,
  sePuedeRetirar,
  vendidas,
  type Pieza,
} from "@/content/obra";
import { ejemplosAdmin, idiomaAdmin } from "@/lib/admin-prefs";
import { Etiqueta, Titulo } from "../piezas";

export async function generateMetadata(): Promise<Metadata> {
  return { title: adm(await idiomaAdmin()).tienda.metaTitle };
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

export default async function TiendaPage() {
  const idioma = await idiomaAdmin();
  const ejemplos = await ejemplosAdmin();
  const c = adm(idioma).tienda;
  const hoy = new Date();

  /**
   * En modo ejemplo se marcan algunas piezas como vendidas **sin tocar el
   * archivo de la obra**. Esto es a propósito: `content/obra.ts` es la verdad
   * y ahí todas están en `false`, porque decir que la obra de un estudiante se
   * vendió cuando no se vendió es mentir sobre una persona concreta.
   */
  const obra: Pieza[] = ejemplos
    ? OBRA.map((p) =>
        VENDIDAS_EJEMPLO[p.slug]
          ? { ...p, vendida: true, vendidaEl: VENDIDAS_EJEMPLO[p.slug] }
          : p,
      )
    : OBRA;

  const enVenta = disponibles(obra);
  const yaVendidas = vendidas(obra);

  return (
    <>
      <Titulo title={c.title} lead={c.lead} />

      <Seccion
        titulo={`${c.disponibles} · ${enVenta.length}`}
        piezas={enVenta}
        idioma={idioma}
        c={c}
        hoy={hoy}
      />

      <section className="mt-16">
        <h2 className="text-2xl font-bold">
          {c.vendidas} ·{" "}
          <span className="text-ink-soft">
            {yaVendidas.length} {c.vendidasCuenta}
          </span>
        </h2>

        <p className="mt-3 max-w-3xl text-sm text-ink-soft">{c.reglaNota}</p>

        {yaVendidas.length === 0 ? (
          <p className="mt-6 rounded-[--radius-card] border-2 border-dashed border-line bg-paper p-8 text-center text-ink-soft">
            {c.empty}
          </p>
        ) : (
          <ul className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {yaVendidas.map((p) => {
              const libre = sePuedeRetirar(p, hoy);
              const faltan = diasParaRetirar(p, hoy);
              return (
                <Tarjeta key={p.slug} pieza={p} idioma={idioma} c={c}>
                  <p className="mt-3 text-sm">
                    <span className="font-semibold">{c.vendidaEl}</span>{" "}
                    {p.vendidaEl ? fecha(p.vendidaEl, idioma) : "—"}
                  </p>
                  <p className="mt-3">
                    {libre ? (
                      <Etiqueta tono="ok">{c.retirable}</Etiqueta>
                    ) : (
                      <Etiqueta tono="aviso">
                        {c.retirableEn} {faltan} {c.dias}
                      </Etiqueta>
                    )}
                  </p>
                  {/* La barra de los 30 días, para ver de un vistazo cuánto
                      lleva puesta. Decorativa: la etiqueta de arriba ya lo
                      dice en palabras. */}
                  <span
                    aria-hidden="true"
                    className="mt-3 block h-2 w-full overflow-hidden rounded-full bg-line"
                  >
                    <span
                      className="block h-full rounded-full bg-leaf-deep"
                      style={{
                        width: `${Math.round(((DIAS_MINIMOS_EN_VITRINA - faltan) / DIAS_MINIMOS_EN_VITRINA) * 100)}%`,
                      }}
                    />
                  </span>
                </Tarjeta>
              );
            })}
          </ul>
        )}
      </section>
    </>
  );
}

function Seccion({
  titulo,
  piezas,
  idioma,
  c,
}: {
  titulo: string;
  piezas: Pieza[];
  idioma: "en" | "es";
  c: ReturnType<typeof adm>["tienda"];
  hoy: Date;
}) {
  return (
    <section className="mt-12">
      <h2 className="text-2xl font-bold">{titulo}</h2>
      <p className="mt-3 max-w-3xl text-sm text-ink-soft">{c.porcentajeNota}</p>

      <ul className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {piezas.map((p) => (
          <Tarjeta key={p.slug} pieza={p} idioma={idioma} c={c} />
        ))}
      </ul>
    </section>
  );
}

function Tarjeta({
  pieza,
  idioma,
  c,
  children,
}: {
  pieza: Pieza;
  idioma: "en" | "es";
  c: ReturnType<typeof adm>["tienda"];
  children?: React.ReactNode;
}) {
  return (
    <li className="overflow-hidden rounded-[--radius-card] border border-line bg-paper">
      <span className="relative block aspect-4/3 bg-paper-warm">
        <Image
          src={`/obra/${pieza.slug}.webp`}
          alt={pieza.alt[idioma]}
          fill
          sizes="(min-width: 1024px) 22rem, (min-width: 640px) 45vw, 90vw"
          className={`object-cover ${pieza.vendida ? "pieza-vendida" : ""}`}
        />
      </span>

      <div className="p-5">
        <p className="font-bold">{pieza.tecnica[idioma]}</p>
        <p className="text-sm text-ink-soft">
          {c.credito}: {pieza.credito ?? "—"}
        </p>

        <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
          <div>
            <dt className="font-semibold text-ink-soft">{c.precio}</dt>
            {/* Todavía no hay precios definidos, y un precio inventado en el
                portal es un precio que alguien cobra. */}
            <dd className="font-bold">—</dd>
          </div>
          <div>
            <dt className="font-semibold text-ink-soft">{c.porcentaje}</dt>
            <dd className="font-bold">{PORCENTAJE_ESTUDIANTE_PROVISIONAL}%</dd>
          </div>
        </dl>

        {children}
      </div>
    </li>
  );
}
