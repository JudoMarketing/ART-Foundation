import type { Metadata } from "next";
import { type Locale } from "@/lib/i18n";
import { f } from "@/content/forms";
import PageHero from "@/components/PageHero";
import VolunteerForm from "@/components/VolunteerForm";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const c = f(locale as Locale);
  return {
    title: c.metaTitle,
    description: c.metaDesc,
    // Un formulario no tiene nada que hacer en los resultados de Google: lo
    // que hay que encontrar es la página de voluntariado, que explica de qué
    // va. Acá se llega desde ahí, no desde una búsqueda.
    robots: { index: false, follow: true },
  };
}

export default async function VolunteerApplyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  const locale = raw as Locale;
  const c = f(locale);

  return (
    <>
      <PageHero eyebrow={c.eyebrow} title={c.title} lead={c.lead} tone="leaf" />

      <section className="paper-grain bg-paper">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <VolunteerForm locale={locale} />
        </div>
      </section>
    </>
  );
}
