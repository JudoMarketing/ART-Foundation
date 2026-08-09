import type { Metadata } from "next";
import { type Locale } from "@/lib/i18n";
import { i } from "@/content/forms";
import PageHero from "@/components/PageHero";
import IntakeForm from "@/components/IntakeForm";

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
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  const locale = raw as Locale;
  const c = i(locale);

  return (
    <>
      <PageHero eyebrow={c.eyebrow} title={c.title} lead={c.lead} tone="brand" />
      <section className="paper-grain bg-paper">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <IntakeForm locale={locale} />
        </div>
      </section>
    </>
  );
}
