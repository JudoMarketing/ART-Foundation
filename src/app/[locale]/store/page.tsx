import type { Metadata } from "next";
import Image from "next/image";
import { type Locale } from "@/lib/i18n";
import { p } from "@/content/pages";
import { OBRA, disponibles, vendidas } from "@/content/obra";
import { ORG } from "@/content/site";
import { IconBrushes, IconTag, IconTicket, IconVan } from "@/components/ArtIcons";
import PageHero from "@/components/PageHero";
import SoldSticker from "@/components/SoldSticker";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const c = p(locale as Locale);
  return { title: c.store.metaTitle, description: c.store.metaDesc };
}

export default async function StorePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  const locale = raw as Locale;
  const c = p(locale).store;
  const aLaVenta = disponibles(OBRA);
  const yaVendidas = vendidas(OBRA);

  /** Una pieza. La misma tarjeta sirve para las dos categorías. */
  const tarjeta = (pieza: (typeof OBRA)[number]) => (
    <figure
      className={`card card-lift overflow-hidden rounded-[--radius-card] border-2 bg-paper ${
        pieza.vendida ? "pieza-vendida border-line/60" : "border-line"
      }`}
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-paper-warm [container-type:inline-size]">
        {pieza.vendida && <SoldSticker label={c.sold} />}
        <Image
          src={`/obra/${pieza.slug}.webp`}
          alt={pieza.alt[locale]}
          width={pieza.w}
          height={pieza.h}
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="h-full w-full object-cover"
        />
      </div>

      <figcaption className="p-6">
        <p className="font-display text-lg font-bold">
          {pieza.credito ? `${c.byLabel} ${pieza.credito}` : pieza.tecnica[locale]}
        </p>
        {pieza.credito && <p className="text-ink-soft">{pieza.tecnica[locale]}</p>}

        {/* El estado, en texto: el sello es para el ojo, esto para quien no
            lo ve. */}
        {pieza.vendida ? (
          <p className="mt-4 font-bold text-[var(--color-was)]">
            {c.sold}
            {pieza.vendidaEl && (
              <span className="block font-normal text-ink-soft">
                {c.soldOnLabel} {pieza.vendidaEl}
              </span>
            )}
          </p>
        ) : (
          /* El porcentaje que va al estudiante NO se publica. Es un acuerdo
             entre la fundación y la familia, y ponerlo en una etiqueta
             convierte la obra de un chico en una ficha de producto. Lo que sí
             se dice, y va abajo de la página, es que parte de cada venta va a
             quien la hizo. */
          <p className="mt-4 inline-flex items-center gap-2 rounded-full bg-sun-soft px-4 py-2 font-bold text-sun-ink">
            <span aria-hidden="true">
              <IconTag className="h-6 w-6" />
            </span>
            {c.shareLabel}
          </p>
        )}
      </figcaption>
    </figure>
  );

  return (
    <>
      <PageHero eyebrow={c.eyebrow} title={c.title} lead={c.lead} tone="sun" imagen="naturaleza-04" />

      {/* Dos categorías: las que están a la venta y las que ya se
          vendieron, con su cuenta.

          Las vendidas NO se borran cuando se venden. Se quedan al menos
          treinta días (`DIAS_MINIMOS_EN_VITRINA` en `content/obra.ts`), y
          después es el panel el que decide. La razón está escrita ahí: si la
          pieza desaparece el mismo día que se vende, nadie ve nunca que en
          esta tienda se venden cuadros, y el estudiante que la hizo pierde
          el único registro público de que su obra encontró comprador. */}
      <section className="paper-grain bg-paper">
        <div className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
          <h2 className="text-3xl font-bold sm:text-4xl">{c.availableTitle}</h2>
          <ul className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {aLaVenta.map((pieza) => (
              <li key={pieza.slug}>{tarjeta(pieza)}</li>
            ))}
          </ul>
        </div>
      </section>

      {yaVendidas.length > 0 && (
        <section className="border-t border-line bg-paper-warm">
          <div className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
            <div className="flex flex-wrap items-baseline gap-x-5 gap-y-2">
              <h2 className="text-3xl font-bold sm:text-4xl">{c.soldTitle}</h2>
              {/* La cuenta. Es la prueba de que la tienda funciona, y por eso
                  va grande y al lado del título, no escondida abajo. */}
              <p className="rounded-full bg-[var(--color-was)] px-5 py-2 text-lg font-bold text-paper">
                {yaVendidas.length === 1
                  ? c.soldOne
                  : c.soldCount.replace("{n}", String(yaVendidas.length))}
              </p>
            </div>

            <ul className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {yaVendidas.map((pieza) => (
                <li key={pieza.slug}>{tarjeta(pieza)}</li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* Todavía no se cobra. Decirlo, y dar la salida que sí existe. */}
      <section className="bg-ink">
        <div className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
          <div className="card rounded-[--radius-card] bg-paper p-10">
            <h2 className="text-3xl font-bold sm:text-4xl">{c.soonTitle}</h2>
            <p className="mt-4 max-w-2xl text-lg text-ink-soft">{c.soonBody}</p>
            <a
              href={`mailto:${ORG.email}`}
              className="btn tap mt-8 inline-flex items-center rounded-full bg-sun px-8 py-4 text-base font-bold text-ink transition-transform hover:scale-[1.03]"
            >
              {c.askCta}
            </a>
          </div>
        </div>
      </section>

      {/* A dónde va el resto del dinero. */}
      <section className="paper-grain bg-paper-warm">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <h2 className="text-3xl font-bold sm:text-4xl">{c.restTitle}</h2>
          <p className="mt-4 max-w-2xl text-lg text-ink-soft">{c.restBody}</p>
          <div aria-hidden="true" className="mt-8 flex flex-wrap items-center gap-5">
            <IconBrushes className="h-16 w-16" />
            <IconVan className="h-16 w-16" />
            <IconTicket className="h-16 w-16" />
          </div>
        </div>
      </section>
    </>
  );
}
