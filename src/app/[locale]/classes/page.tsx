import type { Metadata } from "next";
import { localePath, type Locale } from "@/lib/i18n";
import { alternatesFor } from "@/lib/seo";
import { p } from "@/content/pages";
import { fin } from "@/content/forms";
import { t } from "@/content/copy";
import { CLASSES, CLASS_DAY, ORG } from "@/content/site";
import {
  CLASS_ICONS,
  IconBrushes,
  IconClock,
  IconHelpingHands,
  IconSpark,
} from "@/components/ArtIcons";
import ClassPicker from "@/components/ClassPicker";
import PageHero from "@/components/PageHero";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const c = p(locale as Locale);
  return {
    title: c.classes.metaTitle,
    description: c.classes.metaDesc,
    alternates: alternatesFor(locale as Locale, "/classes"),
  };
}

function hour(hhmm: string, locale: Locale) {
  const [h, m] = hhmm.split(":").map(Number);
  const d = new Date(2000, 0, 1, h, m);
  return new Intl.DateTimeFormat(locale === "es" ? "es-US" : "en-US", {
    hour: "numeric",
    minute: "2-digit",
  }).format(d);
}

export default async function ClassesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  const locale = raw as Locale;
  const c = p(locale).classes;
  const home = t(locale);
  const finTextos = fin(locale);

  const pickerItems = CLASSES.map((k) => ({
    id: k.id,
    accent: k.accent,
    name: k[locale].name,
    blurb: k[locale].blurb,
    schedule: `${hour(k.start, locale)} – ${hour(k.end, locale)}`,
  }));

  const includedIcons = [IconBrushes, IconHelpingHands, IconSpark, IconClock];
  const venueMap = `https://maps.google.com/?q=${encodeURIComponent(
    `${ORG.classVenue.street}, ${ORG.classVenue.city}, ${ORG.classVenue.state} ${ORG.classVenue.zip}`,
  )}`;

  return (
    <>
      <PageHero eyebrow={c.eyebrow} title={c.title} lead={c.lead} tone="paper" imagen="kandinsky-ko" />

      {/* El sábado como línea de tiempo, no como tres tarjetas.
          Tres cajas iguales dicen "hay tres clases". Una línea con horas
          dice lo que de verdad importa: que se encadenan, y que quien deja a
          su hijo a las 9:30 puede quedarse hasta las dos sin volver a
          manejar. */}
      <section className="bg-sky-soft">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <h2 className="text-4xl font-bold text-ink sm:text-5xl">{c.dayTitle}</h2>
          <p className="mt-4 text-lg text-ink-soft">{c.dayLead}</p>

          <ol className="mt-12 grid gap-4 md:grid-cols-3">
            {/* Eran tres bloques macizos de magenta, cian y verde, uno al
                lado del otro. Tres colores saturados en fila es lo más
                infantil que tenía el sitio, y encima obligaba a que el texto
                de cada uno fuera de un color distinto para que contrastara.

                Ahora los tres son la misma tarjeta sobre la tinta, separados
                por un filete claro. Lo que cambia entre ellos es la hora y el
                nombre, que es lo único que de verdad cambia. */}
            {CLASSES.map((k) => {
              const Icon = CLASS_ICONS[k.id];
              return (
                <li
                  key={k.id}
                  className="rounded-[--radius-card] card bg-paper p-7"
                >
                  <div className="flex items-center justify-between gap-4">
                    <span aria-hidden="true" className="icono-sobrio text-ink">
                      <Icon className="h-9 w-9" />
                    </span>
                    <span className="rotulo text-ink-soft">{CLASS_DAY[locale]}</span>
                  </div>
                  {/* ⚠️ El magenta acá vive de que el texto sea GRANDE.
                      #eb008b sobre esta tarjeta da 3.61:1. WCAG pide 4.5:1
                      para texto normal y 3:1 desde 24px, que es justo lo que
                      mide `text-2xl`. O sea que pasa, y pasa raspando: bajar
                      esto a `text-xl` lo rompe sin que se note. Si hay que
                      achicarlo, el color va a `text-paper`. */}
                  <p className="mt-8 font-display text-2xl text-brand">
                    <time>{hour(k.start, locale)}</time>
                    <span aria-hidden="true"> – </span>
                    <time>{hour(k.end, locale)}</time>
                  </p>
                  <h3 className="mt-1 text-2xl text-ink">{k[locale].name}</h3>
                  <p className="mt-3 text-ink-soft">{k[locale].blurb}</p>
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      {/* El mismo mostrador de la portada. A propósito el mismo: quien lo usó
          en la portada ya sabe usarlo acá, y aprender dos veces lo mismo es
          la clase de fricción que hace que alguien se vaya. */}
      <section id="clases" className="relative scroll-mt-20 bg-brand-soft">
        <div className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
          <h2 className="text-4xl font-bold text-ink sm:text-5xl">{c.pickTitle}</h2>
          <p className="mt-4 max-w-2xl text-lg text-ink">{home.classes.lead}</p>

          <div className="mt-12">
            <ClassPicker
              items={pickerItems}
              locale={locale}
              labels={home.classes}
              registerHref={localePath(locale, "/register/apply")}
              financiacion={{
                href: localePath(locale, "/classes/financing"),
                texto: finTextos.button,
                ayuda: finTextos.buttonHelp,
              }}
            />
          </div>

          <p className="mt-8 rounded-2xl bg-paper px-6 py-5 font-bold text-brand-ink">
            {home.classes.support}
          </p>
        </div>
      </section>

      {/* Qué viene incluido: cuatro dibujos y cuatro frases cortas. */}
      <section className="paper-grain bg-paper">
        <div className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
          <h2 className="text-4xl font-bold sm:text-5xl">{c.includedTitle}</h2>

          <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {c.included.map((item, i) => {
              const Icon = includedIcons[i];
              return (
                <li
                  key={item.title}
                  className="card card-lift rounded-[--radius-card] bg-paper p-7"
                >
                  <span aria-hidden="true" className="block">
                    <Icon className="h-10 w-10" />
                  </span>
                  <h3 className="mt-5 text-xl font-bold">{item.title}</h3>
                  <p className="mt-2 text-ink-soft">{item.body}</p>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* Las dos direcciones. La confusión entre oficina y salón es la que
          hace que una familia maneje media hora al lugar equivocado un
          sábado a la mañana. */}
      <section className="paper-grain bg-paper-warm">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <h2 className="text-4xl font-bold sm:text-5xl">{c.venueTitle}</h2>

          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            <article className="card rounded-[--radius-card] bg-paper p-8">
              <p className="text-sm font-bold uppercase tracking-[0.14em] text-brand-ink">
                {CLASS_DAY[locale]}
              </p>
              <p className="mt-3 font-display text-2xl font-bold">
                {ORG.classVenue.name}
              </p>
              <p className="text-ink-soft">{ORG.classVenue.detail}</p>
              <address className="mt-4 not-italic text-lg">
                {ORG.classVenue.street}
                <br />
                {ORG.classVenue.city}, {ORG.classVenue.state} {ORG.classVenue.zip}
              </address>
              <p className="mt-4 font-semibold">{c.venueNote}</p>
              <a
                href={venueMap}
                target="_blank"
                rel="noopener noreferrer"
                className="underline-grow mt-6 inline-block font-bold text-brand-ink"
              >
                {p(locale).contact.mapCta} →
              </a>
            </article>

            <article className="card rounded-[--radius-card] bg-paper p-8">
              <p className="text-sm font-bold uppercase tracking-[0.14em] text-ink-soft">
                {p(locale).contact.officeTitle}
              </p>
              <address className="mt-3 not-italic text-lg">
                {ORG.office.street}
                <br />
                {ORG.office.city}, {ORG.office.state} {ORG.office.zip}
              </address>
              <p className="mt-4 text-ink-soft">{c.officeNote}</p>
            </article>
          </div>
        </div>
      </section>
    </>
  );
}
