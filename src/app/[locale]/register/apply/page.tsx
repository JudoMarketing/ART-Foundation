import type { Metadata } from "next";
import { type Locale } from "@/lib/i18n";
import Link from "next/link";
import { localePath } from "@/lib/i18n";
import { i } from "@/content/forms";
import { CLASSES } from "@/content/site";
import PageHero from "@/components/PageHero";
import IntakeForm from "@/components/IntakeForm";
import { IconTicket } from "@/components/ArtIcons";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const c = i(locale as Locale);
  return {
    title: c.metaTitle,
    description: c.metaDesc,
    // Un formulario no tiene nada que hacer en Google: lo que hay que
    // encontrar es la página de clases, que explica qué se está comprando.
    robots: { index: false, follow: true },
  };
}

export default async function RegisterApplyPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ class?: string }>;
}) {
  const { locale: raw } = await params;
  const { class: elegidas } = await searchParams;
  const locale = raw as Locale;
  const c = i(locale);

  // Las clases vienen del mostrador, en la dirección: ?class=art,theatre.
  // Se traducen aquí a sus nombres y se descarta lo que no exista, para que
  // nadie pueda inventarse una clase escribiéndola en la barra del navegador.
  const clases = (elegidas ?? "")
    .split(",")
    .map((id) => CLASSES.find((k) => k.id === id.trim()))
    .filter((k) => k !== undefined)
    .map((k) => k[locale].name);

  return (
    <>
      <PageHero eyebrow={c.eyebrow} title={c.title} lead={c.lead} tone="brand" />
      <section className="paper-grain bg-paper">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          {clases.length > 0 ? (
            <IntakeForm locale={locale} clases={clases} />
          ) : (
            /* Sin clases elegidas no hay inscripción posible: en vez de un
               formulario que pregunta lo que ya se debería saber, la vuelta
               al mostrador. */
            <div className="card max-w-3xl rounded-[--radius-card] border-2 border-brand bg-paper p-10">
              <span aria-hidden="true" className="block">
                <IconTicket className="h-10 w-10" />
              </span>
              <h2 className="mt-5 text-3xl font-bold sm:text-4xl">
                {c.noClassesTitle}
              </h2>
              <p className="mt-4 max-w-2xl text-lg text-ink-soft">{c.noClassesBody}</p>
              <Link
                href={`${localePath(locale, "/classes")}#clases`}
                className="btn tap mt-8 inline-flex items-center rounded-full bg-brand-solid px-8 py-4 text-lg font-bold text-paper transition-transform hover:scale-[1.03]"
              >
                {c.noClassesCta}
              </Link>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
