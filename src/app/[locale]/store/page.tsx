import type { Metadata } from "next";
import Image from "next/image";
import { type Locale } from "@/lib/i18n";
import { p } from "@/content/pages";
import { OBRA, PORCENTAJE_ESTUDIANTE_PROVISIONAL } from "@/content/obra";
import { ORG } from "@/content/site";
import { IconBrushes, IconTag, IconTicket, IconVan } from "@/components/ArtIcons";
import PageHero from "@/components/PageHero";

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

  return (
    <>
      <PageHero eyebrow={c.eyebrow} title={c.title} lead={c.lead} tone="sun" />

      {/* La pared entera. Es una tienda de arte: lo que tiene que ocupar la
          pantalla son los cuadros, no las palabras.

          Cada uno lleva su porcentaje visible, que es lo que convierte
          "apoya a la fundación" en "esta parte va a esta persona". */}
      <section className="paper-grain bg-paper">
        <div className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
          <ul className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {OBRA.map((pieza) => (
              <li key={pieza.slug}>
                <figure className="card card-lift overflow-hidden rounded-[--radius-card] border-2 border-line bg-paper">
                  <div className="aspect-[4/5] overflow-hidden bg-paper-warm">
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
                      {pieza.credito ? (
                        <>
                          {c.byLabel} {pieza.credito}
                        </>
                      ) : (
                        pieza.tecnica[locale]
                      )}
                    </p>
                    {pieza.credito && (
                      <p className="text-ink-soft">{pieza.tecnica[locale]}</p>
                    )}

                    <p className="mt-4 inline-flex items-center gap-2 rounded-full bg-sun-soft px-4 py-2 font-bold text-sun-ink">
                      <span aria-hidden="true">
                        <IconTag className="h-6 w-6" />
                      </span>
                      {PORCENTAJE_ESTUDIANTE_PROVISIONAL}% {c.shareLabel}
                    </p>
                  </figcaption>
                </figure>
              </li>
            ))}
          </ul>
        </div>
      </section>

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
