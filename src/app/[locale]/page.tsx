import Link from "next/link";
import { localePath, type Locale } from "@/lib/i18n";
import { t } from "@/content/copy";
import { CLASSES, CLASS_DAY, ORG, formatPrice } from "@/content/site";
import { CLASS_ICONS, IconHeart, IconMaracas, IconPalette } from "@/components/ArtIcons";
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
 * Cada clase tiene su color pleno y su tinta.
 *
 * La regla: sobre el color pleno va TINTA OSCURA, nunca blanco. Medido —
 * cian 6.84:1, verde 9.52:1, naranja 8.45:1. El magenta es el único que
 * pide blanco, y para eso está `brand-solid`.
 */
const SKINS = {
  brand: {
    fill: "bg-brand-solid",
    onFill: "text-paper",
    ink: "text-brand-ink",
    border: "border-brand",
    soft: "bg-brand-soft",
  },
  sky: {
    fill: "bg-sky",
    onFill: "text-ink",
    ink: "text-sky-ink",
    border: "border-sky",
    soft: "bg-sky-soft",
  },
  leaf: {
    fill: "bg-leaf",
    onFill: "text-ink",
    ink: "text-leaf-ink",
    border: "border-leaf",
    soft: "bg-leaf-soft",
  },
} as const;

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  const locale = raw as Locale;
  const c = t(locale);

  return (
    <>
      {/* ══ Portada ═══════════════════════════════════════════════════════
          Video de fondo, capa oscura encima y el texto sobre la capa. Sin
          carrusel: el sitio actual usa Revolution Slider, y un carrusel que
          cambia solo se lleva el texto antes de que alguien lo termine de
          leer. */}
      <section className="relative isolate overflow-hidden">
        <HeroVideo
          src={process.env.NEXT_PUBLIC_HERO_VIDEO_URL}
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
          asumen que no es para ellas. Se aclara antes que nada. */}
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
              const s = [SKINS.brand, SKINS.sky, SKINS.leaf][i];
              return (
                <li
                  key={p.title}
                  className={`card card-lift rounded-[--radius-card] border-2 ${s.border} bg-paper p-8`}
                >
                  <span
                    aria-hidden="true"
                    className={`mb-6 block h-2 w-16 rounded-full ${s.fill}`}
                  />
                  <h3 className="text-2xl font-bold">{p.title}</h3>
                  <p className="mt-4 text-ink-soft">{p.body}</p>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* ══ Las tres clases ══════════════════════════════════════════════
          Sección a color pleno. El sábado se lee como una línea de tiempo,
          no como tres cajas sueltas: eso es lo que de verdad explica que se
          pueden encadenar. */}
      <section className="torn-top relative bg-brand-solid">
        <div className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
          <h2 className="max-w-3xl text-4xl font-bold text-paper sm:text-5xl">
            {c.classes.title}
          </h2>
          <p className="mt-5 max-w-2xl text-lg text-paper">
            {c.classes.lead}
          </p>

          <ol className="mt-14 grid gap-6 md:grid-cols-3">
            {CLASSES.map((k, i) => {
              const s = SKINS[k.accent];
              const Icon = CLASS_ICONS[k.id];
              return (
                <li
                  key={k.id}
                  className="icon-play card card-lift flex flex-col rounded-[--radius-card] bg-paper p-8"
                >
                  <div className="flex items-start justify-between gap-4">
                    <span className={s.ink}>
                      <Icon className="h-16 w-16" />
                    </span>
                    <span
                      aria-hidden="true"
                      className={`flex h-9 w-9 items-center justify-center rounded-full ${s.fill} ${s.onFill} text-sm font-bold`}
                    >
                      {i + 1}
                    </span>
                  </div>

                  <h3 className="mt-6 text-3xl font-bold">{k[locale].name}</h3>

                  <p className={`mt-3 inline-flex w-fit items-center rounded-full ${s.soft} px-3.5 py-1.5 text-sm font-bold ${s.ink}`}>
                    <span className="sr-only">
                      {c.classes.scheduleLabel}: {CLASS_DAY[locale]},{" "}
                    </span>
                    <time>{hour(k.start, locale)}</time>
                    <span aria-hidden="true" className="mx-1">–</span>
                    <time>{hour(k.end, locale)}</time>
                  </p>

                  <p className="mt-4 text-2xl font-bold">
                    {formatPrice(k.priceCents, locale)}{" "}
                    <span className="text-base font-normal text-ink-soft">
                      {c.classes.perMonth}
                    </span>
                  </p>

                  <p className="mt-4 flex-1 text-ink-soft">{k[locale].blurb}</p>

                  <Link
                    href={localePath(locale, `/register?class=${k.id}`)}
                    className={`btn tap mt-7 inline-flex items-center justify-center rounded-full ${s.fill} ${s.onFill} px-6 py-3 text-base font-bold transition-transform hover:scale-[1.03]`}
                  >
                    {c.classes.cta}
                    <span className="sr-only">: {k[locale].name}</span>
                  </Link>
                </li>
              );
            })}
          </ol>

          <div className="mt-10 grid gap-4 md:grid-cols-2">
            <p className="rounded-2xl bg-paper px-6 py-5 font-semibold text-ink">
              {c.classes.pick} {c.classes.included}
            </p>
            <p className="rounded-2xl bg-paper px-6 py-5 font-bold text-brand-ink">
              {c.classes.support}
            </p>
          </div>

          <p className="mt-8 text-paper">
            <span className="font-bold text-paper">{c.classes.whereLabel}:</span>{" "}
            {ORG.classVenue.name}. {ORG.classVenue.street}, {ORG.classVenue.city},{" "}
            {ORG.classVenue.state} {ORG.classVenue.zip}
          </p>
        </div>
      </section>

      {/* ══ Donaciones ═══════════════════════════════════════════════════ */}
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

          <ul className="mt-14 grid gap-6 md:grid-cols-3">
            {c.donate.uses.map((u, i) => {
              const fill = ["bg-sky", "bg-leaf", "bg-sun"][i];
              return (
                <li
                  key={u.title}
                  className={`card card-lift rounded-[--radius-card] ${fill} p-8 text-ink`}
                >
                  <h3 className="text-2xl font-bold">{u.title}</h3>
                  <p className="mt-4 font-medium text-ink/85">{u.body}</p>
                </li>
              );
            })}
          </ul>

          <div className="mt-10 grid gap-4 md:grid-cols-2">
            <p className="rounded-2xl bg-paper/10 px-6 py-5 text-paper ring-1 ring-inset ring-white/25">
              {c.donate.receipt}
            </p>
            <p className="rounded-2xl bg-paper/10 px-6 py-5 text-paper ring-1 ring-inset ring-white/25">
              {c.donate.follow}
            </p>
          </div>

          <Link
            href={localePath(locale, "/donate")}
            className="btn tap mt-10 inline-flex items-center rounded-full bg-brand-solid px-8 py-4 text-base font-bold text-paper transition-transform hover:scale-[1.03]"
          >
            {c.donate.cta}
          </Link>
        </div>
      </section>

      {/* ══ Tienda y voluntariado ════════════════════════════════════════ */}
      <section className="paper-grain bg-paper-warm">
        <div className="mx-auto grid max-w-6xl gap-6 px-4 py-24 sm:px-6 md:grid-cols-2">
          <article className="card card-lift rounded-[--radius-card] border-2 border-sun bg-paper p-10">
            <h2 className="text-3xl font-bold sm:text-4xl">{c.store.title}</h2>
            <p className="mt-5 text-ink-soft">{c.store.lead}</p>
            <Link
              href={localePath(locale, "/store")}
              className="underline-grow mt-7 inline-block text-lg font-bold text-sun-ink"
            >
              {c.store.cta} →
            </Link>
          </article>

          <article className="card card-lift rounded-[--radius-card] border-2 border-sky bg-paper p-10">
            <h2 className="text-3xl font-bold sm:text-4xl">{c.volunteer.title}</h2>
            <p className="mt-5 text-ink-soft">{c.volunteer.lead}</p>
            <Link
              href={localePath(locale, "/volunteer")}
              className="underline-grow mt-7 inline-block text-lg font-bold text-sky-ink"
            >
              {c.volunteer.cta} →
            </Link>
          </article>
        </div>
      </section>
    </>
  );
}
