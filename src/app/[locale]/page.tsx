import Link from "next/link";
import { localePath, type Locale } from "@/lib/i18n";
import { t } from "@/content/copy";
import { CLASSES, CLASS_DAY, ORG } from "@/content/site";
import {
  CLASS_ICONS,
  IconBlog,
  IconBrushes,
  IconCertificate,
  IconClock,
  IconCoin,
  IconCoinHand,
  IconCostume,
  IconFacebook,
  IconFramedArt,
  IconGuitarBody,
  IconHands,
  IconHeart,
  IconHelpingHands,
  IconInstagram,
  IconMaracas,
  IconPaintTube,
  IconPalette,
  IconSpark,
  IconStanding,
  IconTag,
  IconTent,
  IconTicket,
  IconTree,
  IconVan,
  IconWheelchair,
} from "@/components/ArtIcons";
import ClassPicker from "@/components/ClassPicker";
import HeroVideo from "@/components/HeroVideo";

/** 13:00 → "1:00 PM" / "1:00 p. m." según el idioma. */
function hour(hhmm: string, locale: Locale) {
  const [h, m] = hhmm.split(":").map(Number);
  const d = new Date(2000, 0, 1, h, m);
  return new Intl.DateTimeFormat(locale === "es" ? "es-US" : "en-US", {
    hour: "numeric",
    minute: "2-digit",
  }).format(d);
}

/**
 * Las cinco monedas del rastro de "a dónde va tu donación".
 *
 * Van con `prefers-reduced-motion` respetado desde el CSS: si el visitante
 * pidió menos movimiento, las monedas se quedan repartidas a lo largo de la
 * línea y no se mueven. La idea — el dinero va de acá para allá — se entiende
 * igual quietas.
 */
const COINS = [0, 1.2, 2.4, 3.6, 4.8];
const COIN_RESTING = ["6%", "26%", "46%", "66%", "86%"];

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  const locale = raw as Locale;
  const c = t(locale);

  const pickerItems = CLASSES.map((k) => ({
    id: k.id,
    accent: k.accent,
    name: k[locale].name,
    blurb: k[locale].blurb,
    schedule: `${hour(k.start, locale)} – ${hour(k.end, locale)}`,
  }));

  const audienceIcons = [IconWheelchair, IconStanding, IconHands];

  /** Los grupos de vectores de cada destino de la donación. */
  const useIcons = [
    [IconBrushes, IconPaintTube, IconGuitarBody, IconCostume],
    [IconVan, IconTent, IconTree],
    [IconTicket, IconCoinHand, IconSpark],
  ];

  return (
    <>
      {/* ══ Portada ═══════════════════════════════════════════════════════
          Video de fondo, capa oscura encima y el texto sobre la capa. Sin
          carrusel: el sitio actual usa Revolution Slider, y un carrusel que
          cambia solo se lleva el texto antes de que alguien lo termine de
          leer.

          La dirección del video sale de la variable de entorno, y si no está
          puesta cae en el archivo del repositorio. Antes solo miraba la
          variable: como está vacía, la etiqueta <video> ni se dibujaba y el
          video no se reproducía nunca. */}
      <section className="relative isolate overflow-hidden">
        <HeroVideo
          src={process.env.NEXT_PUBLIC_HERO_VIDEO_URL || "/video/hero.mp4"}
          labelPlay={c.hero.playVideo}
          labelPause={c.hero.pauseVideo}
        />

        <div className="relative z-10 mx-auto max-w-6xl px-4 py-28 sm:px-6 md:py-40">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-paper/85">
            {c.hero.eyebrow}
          </p>
          <h1 className="mt-5 max-w-3xl text-5xl font-bold leading-[1.02] text-paper sm:text-7xl lg:text-8xl">
            {c.hero.title}
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-relaxed text-paper/90 sm:text-xl">
            {c.hero.lead}
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href={localePath(locale, "/register")}
              className="btn tap inline-flex items-center rounded-full bg-paper px-8 py-4 text-base font-bold text-ink transition-transform hover:scale-[1.03]"
            >
              {c.hero.primary}
            </Link>
            <Link
              href={localePath(locale, "/donate")}
              className="btn tap inline-flex items-center rounded-full bg-brand-solid px-8 py-4 text-base font-bold text-paper transition-transform hover:scale-[1.03]"
            >
              {c.hero.secondary}
            </Link>
          </div>

          {/* Las cuatro disciplinas, en fila. Es lo primero que dice de qué
              va esto, y se lee antes que cualquier párrafo. */}
          <ul className="mt-16 flex flex-wrap gap-x-10 gap-y-6">
            {c.hero.disciplines.map((d, i) => {
              const Icon = [IconPalette, CLASS_ICONS.theatre, CLASS_ICONS.guitar, IconMaracas][i];
              return (
                <li key={d} className="icon-play flex items-center gap-3 text-paper">
                  <span className="text-paper/70">
                    <Icon className="h-11 w-11" />
                  </span>
                  <span className="text-base font-semibold">{d}</span>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* ══ Para quién es ════════════════════════════════════════════════
          Va primero por una razón: el nombre de la fundación dice "for
          People with Disabilities" y muchas familias sin discapacidad
          asumen que no es para ellas. Se aclara antes que nada.

          Cada tarjeta lleva su figura: la silla de ruedas, la persona de
          pie, y las dos manos agarradas. La tercera es la que carga el
          sentido de toda la sección — lo único que cambia es la ayuda. */}
      <section className="paper-grain bg-paper">
        <div className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
          <h2 className="max-w-3xl text-4xl font-bold sm:text-5xl">
            {c.audience.title}
          </h2>
          <p className="mt-5 max-w-2xl text-lg text-ink-soft">
            {c.audience.lead}
          </p>

          <ul className="mt-14 grid gap-6 md:grid-cols-3">
            {c.audience.points.map((p, i) => {
              const border = ["border-brand", "border-sky", "border-leaf"][i];
              const Figure = audienceIcons[i];
              return (
                <li
                  key={p.title}
                  className={`icon-play card card-lift rounded-[--radius-card] border-2 ${border} bg-paper p-8`}
                >
                  <span className="mb-2 block">
                    <Figure className="h-28 w-28" />
                  </span>
                  <h3 className="text-2xl font-bold">{p.title}</h3>
                  <p className="mt-4 text-ink-soft">{p.body}</p>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* ══ Las tres clases ══════════════════════════════════════════════
          Ya no son tres tarjetas para mirar: son un mostrador. Se elige una,
          las otras bajan a mitad de precio y la cuenta de abajo se arma
          sola. Ver el descuento pasar delante de los ojos es lo que hace que
          una familia se lleve dos clases en vez de una. */}
      <section className="torn-top relative bg-brand-solid">
        <div className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
          <h2 className="max-w-3xl text-4xl font-bold text-paper sm:text-5xl">
            {c.classes.title}
          </h2>
          <p className="mt-5 max-w-2xl text-lg text-paper">
            {c.classes.lead}
          </p>

          <div className="mt-14">
            <ClassPicker
              items={pickerItems}
              locale={locale}
              labels={c.classes}
              registerHref={localePath(locale, "/register")}
            />
          </div>

          <p className="mt-8 rounded-2xl bg-paper px-6 py-5 font-bold text-brand-ink">
            {c.classes.support}
          </p>

          <p className="mt-6 text-paper">
            <span className="font-bold text-paper">{c.classes.whereLabel}:</span>{" "}
            {CLASS_DAY[locale]} · {ORG.classVenue.name}. {ORG.classVenue.street},{" "}
            {ORG.classVenue.city}, {ORG.classVenue.state} {ORG.classVenue.zip}
          </p>
        </div>
      </section>

      {/* ══ Donaciones ═══════════════════════════════════════════════════
          Las tres tarjetas ya no explican con párrafos: muestran las cosas.
          Pinceles, pomos, una guitarra y un traje dicen "materiales" más
          rápido que la palabra materiales.

          El texto no desaparece: sigue en la página para quien usa lector de
          pantalla. Un dibujo no se lee en voz alta, y una tarjeta que solo
          tiene dibujos es una tarjeta vacía para quien no ve. */}
      <section className="bg-ink">
        <div className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
          <div className="flex flex-wrap items-end justify-between gap-8">
            <div>
              <h2 className="max-w-3xl text-4xl font-bold text-paper sm:text-5xl">
                {c.donate.title}
              </h2>
              <p className="mt-5 max-w-2xl text-lg text-paper/85">
                {c.donate.lead}
              </p>
            </div>
            <span aria-hidden="true" className="text-paper/60">
              <IconHeart className="h-24 w-24" />
            </span>
          </div>

          {/* El dinero, moviéndose. */}
          <div className="coin-flow mt-12" aria-hidden="true">
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
          <p className="mt-3 text-center text-sm font-semibold uppercase tracking-[0.16em] text-paper/60">
            {c.donate.flowLabel}
          </p>

          <ul className="mt-8 grid gap-6 md:grid-cols-3">
            {c.donate.uses.map((u, i) => {
              const fill = ["bg-sky", "bg-leaf", "bg-sun"][i];
              return (
                <li
                  key={u.title}
                  className={`card card-lift rounded-[--radius-card] ${fill} p-8 text-ink`}
                >
                  <h3 className="text-2xl font-bold">{u.title}</h3>

                  {/* Los dibujos van en una fila que no se parte. Materiales
                      lleva cuatro y los otros tres: si se dejan sueltos, los
                      cuatro se cortan en 3+1 y esa tarjeta parece rota al
                      lado de las otras dos. */}
                  <div
                    aria-hidden="true"
                    className="mt-6 flex items-center justify-start gap-3"
                  >
                    {useIcons[i].map((Icon, j) => (
                      <Icon key={j} className="h-14 w-14 shrink-0 drop-shadow-sm" />
                    ))}
                  </div>

                  {/* Lo que ven los dibujos, dicho en palabras para quien no
                      los ve. */}
                  <p className="sr-only">{u.body}</p>
                </li>
              );
            })}
          </ul>

          <p className="mt-8 rounded-2xl bg-paper/10 px-6 py-5 text-paper ring-1 ring-inset ring-white/25">
            {c.donate.receipt}
          </p>

          {/* Seguirnos deja de ser una frase y pasa a ser tres botones. Lo
              que se pide con un verbo se hace con un botón. */}
          <div className="mt-8 rounded-2xl bg-paper/10 p-6 ring-1 ring-inset ring-white/25">
            <p className="text-lg font-bold text-paper">{c.donate.followTitle}</p>
            <p className="mt-1 text-paper/80">{c.donate.follow}</p>

            <div className="mt-5 flex flex-wrap gap-3">
              <a
                href={ORG.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="btn tap inline-flex items-center gap-2.5 rounded-full bg-paper px-6 py-3 text-base font-bold text-ink transition-transform hover:scale-[1.03]"
              >
                <IconInstagram className="h-5 w-5" />
                Instagram
              </a>
              <a
                href={ORG.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="btn tap inline-flex items-center gap-2.5 rounded-full bg-paper px-6 py-3 text-base font-bold text-ink transition-transform hover:scale-[1.03]"
              >
                <IconFacebook className="h-5 w-5" />
                Facebook
              </a>
              <Link
                href={localePath(locale, "/blog")}
                className="btn tap inline-flex items-center gap-2.5 rounded-full border-2 border-paper/70 px-6 py-3 text-base font-bold text-paper transition-transform hover:scale-[1.03]"
              >
                <IconBlog className="h-5 w-5" />
                {c.nav.blog}
              </Link>
            </div>
          </div>

          <Link
            href={localePath(locale, "/donate")}
            className="btn tap mt-10 inline-flex items-center rounded-full bg-brand-solid px-8 py-4 text-base font-bold text-paper transition-transform hover:scale-[1.03]"
          >
            {c.donate.cta}
          </Link>
        </div>
      </section>

      {/* ══ Tienda y voluntariado ════════════════════════════════════════
          Antes eran dos párrafos con un enlace. Ahora la tienda muestra
          cuadros y el voluntariado muestra manos: las dos cosas se entienden
          sin leer, que es como se miran estas dos tarjetas de verdad. */}
      <section className="paper-grain bg-paper-warm">
        <div className="mx-auto grid max-w-6xl gap-6 px-4 py-24 sm:px-6 md:grid-cols-2">
          <article className="card card-lift overflow-hidden rounded-[--radius-card] border-2 border-sun bg-paper">
            {/* La pared de la galería. */}
            <div className="gallery-wall flex items-end justify-center gap-4 px-8 pb-8 pt-10" aria-hidden="true">
              <IconFramedArt art={0} className="h-24 w-24 -rotate-3 sm:h-28 sm:w-28" />
              <IconFramedArt art={1} className="h-28 w-28 sm:h-36 sm:w-36" />
              <IconFramedArt art={2} className="h-24 w-24 rotate-3 sm:h-28 sm:w-28" />
            </div>

            <div className="p-10 pt-8">
              <h2 className="text-3xl font-bold sm:text-4xl">{c.store.title}</h2>
              <p className="mt-4 text-lg text-ink-soft">{c.store.lead}</p>

              <p className="mt-5 flex items-start gap-3 font-bold text-sun-ink">
                <span aria-hidden="true">
                  <IconTag className="mt-0.5 h-7 w-7" />
                </span>
                {c.store.note}
              </p>

              <Link
                href={localePath(locale, "/store")}
                className="underline-grow mt-7 inline-block text-lg font-bold text-sun-ink"
              >
                {c.store.cta} →
              </Link>
            </div>
          </article>

          <article className="card card-lift overflow-hidden rounded-[--radius-card] border-2 border-sky bg-paper">
            <div className="icon-play flex items-end justify-center bg-sky-soft px-8 pb-6 pt-10" aria-hidden="true">
              <IconHelpingHands className="h-40 w-40" />
            </div>

            <div className="p-10 pt-8">
              <h2 className="text-3xl font-bold sm:text-4xl">{c.volunteer.title}</h2>
              <p className="mt-4 text-lg text-ink-soft">{c.volunteer.lead}</p>

              <ul className="mt-6 space-y-4">
                {c.volunteer.points.map((point, i) => {
                  const Icon = [IconClock, IconCertificate, IconHelpingHands][i];
                  return (
                    <li key={point} className="flex items-center gap-3 font-semibold">
                      <span aria-hidden="true" className="shrink-0">
                        <Icon className="h-9 w-9" />
                      </span>
                      {point}
                    </li>
                  );
                })}
              </ul>

              <Link
                href={localePath(locale, "/volunteer")}
                className="underline-grow mt-7 inline-block text-lg font-bold text-sky-ink"
              >
                {c.volunteer.cta} →
              </Link>
            </div>
          </article>
        </div>
      </section>
    </>
  );
}
