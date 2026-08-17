import type { Metadata } from "next";
import { type Locale } from "@/lib/i18n";
import { alternatesFor } from "@/lib/seo";
import { p } from "@/content/pages";
import { t } from "@/content/copy";
import { FL_DISCLOSURE, ORG, formatPrice } from "@/content/site";
import {
  IconBlog,
  IconBrushes,
  IconCoin,
  IconCoinHand,
  IconCostume,
  IconFacebook,
  IconGuitarBody,
  IconInstagram,
  IconPaintTube,
  IconSpark,
  IconTent,
  IconTicket,
  IconTree,
  IconVan,
} from "@/components/ArtIcons";
import PageHero from "@/components/PageHero";
import Link from "next/link";
import { localePath } from "@/lib/i18n";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const c = p(locale as Locale);
  return {
    title: c.donate.metaTitle,
    description: c.donate.metaDesc,
    alternates: alternatesFor(locale as Locale, "/donate"),
  };
}

const COINS = [0, 1.2, 2.4, 3.6, 4.8];
const COIN_RESTING = ["6%", "26%", "46%", "66%", "86%"];

export default async function DonatePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  const locale = raw as Locale;
  const c = p(locale).donate;
  const home = t(locale);

  const useIcons = [
    [IconBrushes, IconPaintTube, IconGuitarBody, IconCostume],
    [IconVan, IconTent, IconTree],
    [IconTicket, IconCoinHand, IconSpark],
  ];

  return (
    <>
      <PageHero eyebrow={c.eyebrow} title={c.title} lead={c.lead} tone="ink" imagen="naturaleza-05">
        <div className="coin-flow max-w-3xl" aria-hidden="true">
          {COINS.map((delay, i) => (
            <span
              key={delay}
              className="coin"
              style={{ animationDelay: `${delay}s`, left: COIN_RESTING[i] }}
            >
              <IconCoin className="h-8 w-8" />
            </span>
          ))}
        </div>
      </PageHero>

      {/* Los montos, cada uno con lo que compra.
          Un botón que dice "$25" no le dice nada a nadie. Uno que dice "$25:
          pintura y pinceles para un estudiante, un mes" convierte una cifra
          abstracta en una cosa que existe. */}
      <section className="paper-grain bg-paper">
        <div className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
          <h2 className="text-4xl font-bold sm:text-5xl">{c.amountsTitle}</h2>

          <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {c.amounts.map((a, i) => {
              const fill = ["bg-sky-soft", "bg-leaf-soft", "bg-brand-soft", "bg-sun-soft"][i];
              const ink = ["text-sky-ink", "text-leaf-ink", "text-brand-ink", "text-sun-ink"][i];
              return (
                <li
                  key={a.amount}
                  className={`card card-lift rounded-[--radius-card] ${fill} p-7`}
                >
                  <p className={`font-display text-4xl font-bold ${ink}`}>
                    {formatPrice(a.amount, locale)}
                  </p>
                  <p className="mt-3 text-ink-soft">{a.buys}</p>
                </li>
              );
            })}
          </ul>

          <p className="mt-8 text-ink-soft">{c.amountsNote}</p>
        </div>
      </section>

      {/* A dónde va: los mismos tres destinos de la portada, con sus
          dibujos. Se repite a propósito, quien llega directo a esta página
          desde Google no vio la portada. */}
      <section className="bg-ink">
        <div className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
          <h2 className="text-4xl font-bold text-paper sm:text-5xl">{c.usesTitle}</h2>

          <ul className="mt-12 grid gap-6 md:grid-cols-3">
            {home.donate.uses.map((u, i) => {
              const fill = ["bg-sky", "bg-leaf", "bg-sun"][i];
              return (
                <li
                  key={u.title}
                  className={`card card-lift rounded-[--radius-card] ${fill} p-8 text-ink`}
                >
                  <h3 className="text-2xl font-bold">{u.title}</h3>
                  <div
                    aria-hidden="true"
                    className="mt-6 flex items-center justify-start gap-3"
                  >
                    {useIcons[i].map((Icon, j) => (
                      <Icon key={j} className="h-14 w-14 shrink-0" />
                    ))}
                  </div>
                  <p className="mt-5 font-medium text-ink/85">{u.body}</p>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* Cómo donar hoy, mientras no hay cobro en línea. Decirlo claro es
          mejor que un botón que no lleva a ningún lado. */}
      <section className="torn-top relative bg-brand-solid">
        <div className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
          <div className="card rounded-[--radius-card] bg-paper p-10">
            <h2 className="text-3xl font-bold sm:text-4xl">{c.soonTitle}</h2>
            <p className="mt-4 text-lg text-ink-soft">{c.soonBody}</p>

            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href={ORG.phoneHref}
                className="btn tap inline-flex items-center rounded-full bg-ink px-8 py-4 text-base font-bold text-paper transition-transform hover:scale-[1.03]"
              >
                {c.callCta} · {ORG.phone}
              </a>
              <a
                href={`mailto:${ORG.email}`}
                className="btn tap inline-flex items-center rounded-full border-2 border-ink px-8 py-4 text-base font-bold text-ink transition-transform hover:scale-[1.03]"
              >
                {c.writeCta}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Lo legal. El aviso de Florida es obligatorio y va tal cual: es texto
          de ley, no se traduce ni se resume. */}
      <section className="paper-grain bg-paper-warm">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <h2 className="text-3xl font-bold sm:text-4xl">{c.receiptTitle}</h2>
          <p className="mt-5 max-w-3xl text-lg text-ink-soft">{home.donate.receipt}</p>

          <p className="mt-4 font-semibold">
            {ORG.taxStatus} · {home.footer.registrationLabel} {ORG.flRegistration}
          </p>

          <p className="mt-8 max-w-3xl text-sm leading-relaxed text-ink-soft">
            {FL_DISCLOSURE}
          </p>

          <div className="mt-10">
            <p className="text-lg font-bold">{home.donate.followTitle}</p>
            <div className="mt-5 flex flex-wrap gap-3">
              <a
                href={ORG.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="btn tap inline-flex items-center gap-2.5 rounded-full bg-ink px-6 py-3 text-base font-bold text-paper transition-transform hover:scale-[1.03]"
              >
                <IconInstagram className="h-5 w-5" />
                Instagram
              </a>
              <a
                href={ORG.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="btn tap inline-flex items-center gap-2.5 rounded-full bg-ink px-6 py-3 text-base font-bold text-paper transition-transform hover:scale-[1.03]"
              >
                <IconFacebook className="h-5 w-5" />
                Facebook
              </a>
              <Link
                href={localePath(locale, "/blog")}
                className="btn tap inline-flex items-center gap-2.5 rounded-full border-2 border-ink px-6 py-3 text-base font-bold text-ink transition-transform hover:scale-[1.03]"
              >
                <IconBlog className="h-5 w-5" />
                {home.nav.blog}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
