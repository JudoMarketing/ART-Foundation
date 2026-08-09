import type { Metadata } from "next";
import { type Locale } from "@/lib/i18n";
import { fin } from "@/content/forms";
import PageHero from "@/components/PageHero";
import FinancingForm from "@/components/FinancingForm";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const c = fin(locale as Locale);
  return { title: c.metaTitle, description: c.metaDesc, robots: { index: false, follow: true } };
}

export default async function FinancingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  const locale = raw as Locale;
  const c = fin(locale);

  return (
    <>
      <PageHero eyebrow={c.eyebrow} title={c.title} lead={c.lead} tone="sun" />
      <section className="paper-grain bg-paper">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <FinancingForm locale={locale} />
        </div>
      </section>
    </>
  );
}
