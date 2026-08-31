import type { Metadata } from "next";
import { type Locale } from "@/lib/i18n";
import { alternatesFor } from "@/lib/seo";
import { p } from "@/content/pages";
import { ORG } from "@/content/site";
import {
  IconCertificate,
  IconClock,
  IconHelpingHands,
  IconSpark,
  IconTicket,
} from "@/components/ArtIcons";
import Link from "next/link";
import { localePath } from "@/lib/i18n";
import PageHero from "@/components/PageHero";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const c = p(locale as Locale);
  return {
    title: c.volunteer.metaTitle,
    description: c.volunteer.metaDesc,
    alternates: alternatesFor(locale as Locale, "/volunteer"),
  };
}

export default async function VolunteerPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  const locale = raw as Locale;
  const c = p(locale).volunteer;

  const stepIcons = [IconTicket, IconClock, IconHelpingHands, IconCertificate];

  return (
    <>
      <PageHero eyebrow={c.eyebrow} title={c.title} lead={c.lead} tone="sky" imagen="kandinsky-xf" />

      {/* Los cuatro pasos, numerados y con dibujo. Es un proceso con espera
          de por medio; verlo entero de una hace que la espera se entienda en
          vez de sentirse como silencio. */}
      <section className="paper-grain bg-paper">
        <div className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
          <h2 className="text-4xl font-bold sm:text-5xl">{c.stepsTitle}</h2>

          <ol className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {c.steps.map((step, i) => {
              const Icon = stepIcons[i];
              return (
                <li
                  key={step.title}
                  className="card card-lift rounded-[--radius-card] bg-paper p-7"
                >
                  <div className="flex items-start justify-between gap-4">
                    <span aria-hidden="true" className="icono-sobrio text-ink-soft">
                      <Icon className="h-10 w-10" />
                    </span>
                    <span
                      aria-hidden="true"
                      className="flex h-9 w-9 items-center justify-center rounded-full bg-ink text-sm font-bold text-paper"
                    >
                      {i + 1}
                    </span>
                  </div>
                  <h3 className="mt-5 text-xl font-bold">{step.title}</h3>
                  <p className="mt-2 text-ink-soft">{step.body}</p>
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      {/* El aviso del registro. Va grande y antes del formulario, no en la
          letra chica: enterarse después de que te estaban midiendo es otra
          cosa. Y se cuenta a favor del voluntario, que es lo que de verdad
          es, sin ese registro no hay carta al final. */}
      <section className="bg-sky-soft">
        <div className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
          <div className="grid items-center gap-10 lg:grid-cols-[1fr_auto]">
            <div>
              <h2 className="text-4xl font-bold text-ink sm:text-5xl">
                {c.trackTitle}
              </h2>
              <p className="mt-6 max-w-3xl text-lg leading-relaxed text-ink-soft">
                {c.trackBody}
              </p>
            </div>
            <span aria-hidden="true" className="hidden lg:block">
              <IconCertificate className="h-40 w-40" />
            </span>
          </div>
        </div>
      </section>

      {/* Lo que se declara en el formulario. */}
      <section className="paper-grain bg-paper-warm">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <h2 className="text-3xl font-bold sm:text-4xl">{c.declareTitle}</h2>
          <ul className="mt-8 grid gap-4 md:grid-cols-3">
            {c.declare.map((d) => (
              <li
                key={d}
                className="card rounded-[--radius-card] border-2 border-sky bg-paper p-6 text-lg font-semibold"
              >
                {d}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Pasantías y el cierre. */}
      <section className="relative bg-brand-soft">
        <div className="mx-auto grid max-w-6xl gap-6 px-4 py-24 sm:px-6 lg:grid-cols-2">
          <article className="card rounded-[--radius-card] bg-paper p-10">
            <span aria-hidden="true" className="block">
              <IconSpark className="h-10 w-10" />
            </span>
            <h2 className="mt-5 text-3xl font-bold sm:text-4xl">{c.internTitle}</h2>
            <p className="mt-4 text-lg text-ink-soft">{c.internBody}</p>
          </article>

          <article className="card rounded-[--radius-card] bg-paper p-10">
            <span aria-hidden="true" className="block">
              <IconHelpingHands className="h-10 w-10" />
            </span>
            <h2 className="mt-5 text-3xl font-bold sm:text-4xl">{c.cta}</h2>
            <p className="mt-4 text-lg text-ink-soft">{c.formLead}</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href={localePath(locale, "/volunteer/apply")}
                className="btn tap inline-flex items-center rounded-full bg-ink px-8 py-4 text-lg font-bold text-paper transition-transform hover:scale-[1.03]"
              >
                {c.cta}
              </Link>
              <a
                href={ORG.phoneHref}
                className="btn tap inline-flex items-center rounded-full border-2 border-ink px-7 py-4 text-base font-bold text-ink transition-transform hover:scale-[1.03]"
              >
                {ORG.phone}
              </a>
            </div>
          </article>
        </div>
      </section>
    </>
  );
}
