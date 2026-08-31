import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { localePath, type Locale } from "@/lib/i18n";
import { alternatesFor } from "@/lib/seo";
import { p } from "@/content/pages";
import { ORG } from "@/content/site";
import { OBRA } from "@/content/obra";
import {
  IconCertificate,
  IconFramedArt,
  IconHelpingHands,
  IconPalette,
  IconTogether,
} from "@/components/ArtIcons";
import Foto from "@/components/Foto";
import PageHero from "@/components/PageHero";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const c = p(locale as Locale);
  return {
    title: c.about.metaTitle,
    description: c.about.metaDesc,
    alternates: alternatesFor(locale as Locale, "/about"),
  };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  const locale = raw as Locale;
  const c = p(locale).about;

  const pillarIcons = [IconPalette, IconHelpingHands, IconFramedArt, IconCertificate];

  return (
    <>
      <PageHero eyebrow={c.eyebrow} title={c.title} lead={c.lead} tone="paper" imagen="naturaleza-01" />

      {/* Los tres números. Van solos, grandes, sin párrafo alrededor: un año
          y un registro dicen más de una fundación que tres frases sobre su
          compromiso. */}
      <section className="bg-brand-soft">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-16 sm:grid-cols-3 sm:px-6">
          {c.stats.map((s) => (
            <div key={s.label}>
              <p className="font-display text-5xl font-bold text-ink sm:text-6xl">
                {s.n}
              </p>
              <p className="mt-2 text-ink-soft">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Los cuatro pilares: un verbo y un dibujo cada uno. */}
      <section className="paper-grain bg-paper">
        <div className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
          <h2 className="text-4xl font-bold sm:text-5xl">{c.pillarsTitle}</h2>

          <ul className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {c.pillars.map((pillar, i) => {
              const Icon = pillarIcons[i];
              return (
                <li
                  key={pillar.title}
                  className="card card-lift rounded-[--radius-card] bg-paper p-7"
                >
                  <span aria-hidden="true" className="block text-ink-soft">
                    <Icon className="h-11 w-11" />
                  </span>
                  <h3 className="mt-6 text-xl">{pillar.title}</h3>
                  <p className="mt-3 text-ink-soft">{pillar.body}</p>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* El fundador y el modelo, uno al lado del otro, con obra al costado
          para que la página no sea dos cajas de texto seguidas. */}
      <section className="relative bg-sky-soft">
        <div className="mx-auto grid max-w-6xl gap-6 px-4 py-24 sm:px-6 lg:grid-cols-2">
          <article className="card rounded-[--radius-card] bg-paper p-10">
            <p className="text-sm font-bold uppercase tracking-[0.14em] text-ink-soft">
              {c.founderTitle}
            </p>
            <p className="mt-4 font-display text-3xl font-bold sm:text-4xl">
              {ORG.founder}
            </p>
            <p className="mt-1 font-semibold text-brand-ink">{c.founderRole}</p>
            <p className="mt-5 text-lg text-ink-soft">{c.founderBody}</p>
          </article>

          <article className="card rounded-[--radius-card] bg-paper p-10">
            <p className="text-sm font-bold uppercase tracking-[0.14em] text-ink-soft">
              {c.modelTitle}
            </p>
            <span aria-hidden="true" className="mt-5 block">
              <IconTogether className="h-8 w-8" />
            </span>
            <p className="mt-5 text-lg text-ink-soft">{c.modelBody}</p>
          </article>
        </div>
      </section>

      {/* Gente trabajando, antes de la obra. Los cuadros dicen qué sale de
          acá; las fotos dicen quiénes lo hacen, y una fundación que enseña a
          personas al final es personas. */}
      <section className="bg-paper">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {["adultos-en-taller", "instructora-y-alumna", "teatro-en-escena", "grupo-con-bolsas"].map((f) => (
              <li key={f}>
                <Foto
                  slug={f}
                  locale={locale}
                  aspect="aspect-square"
                  className="card rounded-[--radius-card]"
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                />
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Obra al cierre. Es lo que hace la fundación; decirlo con cuadros
          ahorra el párrafo que lo diría peor. */}
      <section className="paper-grain bg-paper-warm">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <ul className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {OBRA.slice(0, 4).map((pieza) => (
              <li key={pieza.slug}>
                <div className="aspect-square overflow-hidden rounded-[--radius-card] border border-line">
                  <Image
                    src={`/obra/${pieza.slug}.webp`}
                    alt={pieza.alt[locale]}
                    width={pieza.w}
                    height={pieza.h}
                    sizes="(min-width: 640px) 25vw, 50vw"
                    className="h-full w-full object-cover"
                  />
                </div>
              </li>
            ))}
          </ul>

          <h2 className="mt-14 text-4xl font-bold sm:text-5xl">{c.ctaTitle}</h2>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href={localePath(locale, "/classes")}
              className="btn tap inline-flex items-center rounded-full bg-ink px-8 py-4 text-base font-bold text-paper transition-transform hover:scale-[1.03]"
            >
              {c.ctaClasses}
            </Link>
            <Link
              href={localePath(locale, "/donate")}
              className="btn tap inline-flex items-center rounded-full bg-brand-solid px-8 py-4 text-base font-bold text-paper transition-transform hover:scale-[1.03]"
            >
              {c.ctaDonate}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
