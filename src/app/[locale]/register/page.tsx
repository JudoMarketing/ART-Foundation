import type { Metadata } from "next";
import Link from "next/link";
import { localePath, type Locale } from "@/lib/i18n";
import { alternatesFor } from "@/lib/seo";
import { p } from "@/content/pages";
import { ORG } from "@/content/site";
import {
  IconStanding,
  IconTicket,
  IconTogether,
  IconWheelchair,
} from "@/components/ArtIcons";
import { CLASS_ICONS } from "@/components/ArtIcons";
import PageHero from "@/components/PageHero";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const c = p(locale as Locale);
  return {
    title: c.register.metaTitle,
    description: c.register.metaDesc,
    alternates: alternatesFor(locale as Locale, "/register"),
  };
}

export default async function RegisterPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  const locale = raw as Locale;
  const c = p(locale).register;

  const stepIcons = [IconStanding, CLASS_ICONS.art, IconTogether, IconWheelchair];

  return (
    <>
      <PageHero eyebrow={c.eyebrow} title={c.title} lead={c.lead} tone="brand" imagen="kandinsky-gi" />

      {/* Las cuatro preguntas, a la vista antes de empezar.
          Un formulario que no dice cuánto falta es un formulario que la gente
          abandona a la mitad. Mostrar las cuatro de entrada es la diferencia
          entre "esto es largo" y "esto son cuatro cosas". */}
      <section className="paper-grain bg-paper">
        <div className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
          <h2 className="text-4xl font-bold sm:text-5xl">{c.stepsTitle}</h2>

          <ol className="mt-14 grid gap-6 sm:grid-cols-2">
            {c.steps.map((step, i) => {
              const Icon = stepIcons[i];
              return (
                <li
                  key={step.title}
                  className="card card-lift flex gap-6 rounded-[--radius-card] bg-paper p-8"
                >
                  <span aria-hidden="true" className="icono-sobrio shrink-0 text-ink-soft">
                    <Icon className="h-11 w-11" />
                  </span>
                  <div>
                    <span
                      aria-hidden="true"
                      className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-ink text-sm font-bold text-paper"
                    >
                      {i + 1}
                    </span>
                    <h3 className="mt-3 text-2xl font-bold">{step.title}</h3>
                    <p className="mt-2 text-ink-soft">{step.body}</p>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      {/* El formulario todavía no existe. En vez de un botón muerto, la vía
          que sí funciona hoy, y el paso previo que conviene hacer primero. */}
      <section className="bg-ink">
        <div className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
          <div className="card rounded-[--radius-card] bg-paper p-10">
            <span aria-hidden="true" className="block">
              <IconTicket className="h-10 w-10" />
            </span>
            <h2 className="mt-5 text-3xl font-bold sm:text-4xl">{c.formTitle}</h2>
            <p className="mt-4 max-w-2xl text-lg text-ink-soft">{c.formBody}</p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href={localePath(locale, "/register/apply")}
                className="btn tap inline-flex items-center rounded-full bg-brand-solid px-8 py-4 text-lg font-bold text-paper transition-transform hover:scale-[1.03]"
              >
                {c.startCta}
              </Link>
              <Link
                href={`${localePath(locale, "/classes")}#clases`}
                className="btn tap inline-flex items-center rounded-full border-2 border-ink px-7 py-4 text-base font-bold text-ink transition-transform hover:scale-[1.03]"
              >
                {c.pickCta}
              </Link>
              <a
                href={ORG.phoneHref}
                className="btn tap inline-flex items-center rounded-full border-2 border-ink px-8 py-4 text-base font-bold text-ink transition-transform hover:scale-[1.03]"
              >
                {c.callCta} · {ORG.phone}
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="paper-grain bg-paper-warm">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <p className="text-lg font-semibold">{c.termsNote}</p>
          <Link
            href={localePath(locale, "/terms")}
            className="underline-grow mt-3 inline-block text-lg font-bold text-brand-ink"
          >
            {c.termsCta} →
          </Link>
        </div>
      </section>
    </>
  );
}
