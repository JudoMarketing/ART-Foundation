import type { Metadata } from "next";
import { type Locale } from "@/lib/i18n";
import { p } from "@/content/pages";
import { CLASSES, CLASS_DAY, ORG } from "@/content/site";
import { CLASS_ICONS, IconFacebook, IconInstagram } from "@/components/ArtIcons";
import PageHero from "@/components/PageHero";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const c = p(locale as Locale);
  return { title: c.contact.metaTitle, description: c.contact.metaDesc };
}

function hour(hhmm: string, locale: Locale) {
  const [h, m] = hhmm.split(":").map(Number);
  const d = new Date(2000, 0, 1, h, m);
  return new Intl.DateTimeFormat(locale === "es" ? "es-US" : "en-US", {
    hour: "numeric",
    minute: "2-digit",
  }).format(d);
}

function mapUrl(street: string, city: string, state: string, zip: string) {
  return `https://maps.google.com/?q=${encodeURIComponent(`${street}, ${city}, ${state} ${zip}`)}`;
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  const locale = raw as Locale;
  const c = p(locale).contact;

  return (
    <>
      {/* El teléfono y el correo van EN la cabecera, no más abajo.
          Quien entra a "Contacto" viene a hacer una sola cosa; hacérsela
          bajar media pantalla es hacerla esperar por nada. */}
      <PageHero eyebrow={c.eyebrow} title={c.title} lead={c.lead} tone="sky">
        <div className="flex flex-wrap gap-4">
          <a
            href={ORG.phoneHref}
            className="btn tap inline-flex flex-col rounded-[--radius-card] bg-ink px-8 py-5 text-paper transition-transform hover:scale-[1.02]"
          >
            <span className="text-sm font-semibold uppercase tracking-[0.14em] text-paper/70">
              {c.callTitle}
            </span>
            <span className="mt-1 font-display text-2xl font-bold sm:text-3xl">
              {ORG.phone}
            </span>
            <span className="text-sm text-paper/70">
              {c.extLabel} {ORG.phoneExt}
            </span>
          </a>

          <a
            href={`mailto:${ORG.email}`}
            className="btn tap inline-flex flex-col rounded-[--radius-card] bg-paper px-8 py-5 text-ink transition-transform hover:scale-[1.02]"
          >
            <span className="text-sm font-semibold uppercase tracking-[0.14em] text-ink-soft">
              {c.writeTitle}
            </span>
            <span className="mt-1 break-all font-display text-xl font-bold sm:text-2xl">
              {ORG.email}
            </span>
          </a>
        </div>
      </PageHero>

      {/* Las dos direcciones, con la de las clases primero y marcada.
          Son distintas, y equivocarse un sábado a la mañana cuesta media
          hora de auto con un niño en el asiento de atrás. */}
      <section className="paper-grain bg-paper">
        <div className="mx-auto grid max-w-6xl gap-6 px-4 py-24 sm:px-6 lg:grid-cols-2">
          <article className="card card-lift rounded-[--radius-card] border-2 border-brand bg-paper p-8">
            <p className="text-sm font-bold uppercase tracking-[0.14em] text-brand-ink">
              {c.venueTitle} · {CLASS_DAY[locale]}
            </p>
            <p className="mt-3 font-display text-2xl font-bold">{ORG.classVenue.name}</p>
            <p className="text-ink-soft">{ORG.classVenue.detail}</p>
            <address className="mt-4 not-italic text-lg">
              {ORG.classVenue.street}
              <br />
              {ORG.classVenue.city}, {ORG.classVenue.state} {ORG.classVenue.zip}
            </address>
            <p className="mt-4 font-semibold">{c.venueNote}</p>
            <a
              href={mapUrl(
                ORG.classVenue.street,
                ORG.classVenue.city,
                ORG.classVenue.state,
                ORG.classVenue.zip,
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="underline-grow mt-6 inline-block font-bold text-brand-ink"
            >
              {c.mapCta} →
            </a>
          </article>

          <article className="card card-lift rounded-[--radius-card] border-2 border-line bg-paper p-8">
            <p className="text-sm font-bold uppercase tracking-[0.14em] text-ink-soft">
              {c.officeTitle}
            </p>
            <address className="mt-3 not-italic text-lg">
              {ORG.office.street}
              <br />
              {ORG.office.city}, {ORG.office.state} {ORG.office.zip}
            </address>
            <p className="mt-4 text-ink-soft">{c.officeNote}</p>
            <a
              href={mapUrl(
                ORG.office.street,
                ORG.office.city,
                ORG.office.state,
                ORG.office.zip,
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="underline-grow mt-6 inline-block font-bold text-sky-ink"
            >
              {c.mapCta} →
            </a>
          </article>
        </div>
      </section>

      {/* El horario, con el icono de cada clase. */}
      <section className="bg-ink">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <h2 className="text-4xl font-bold text-paper sm:text-5xl">{c.hoursTitle}</h2>
          <ul className="mt-10 grid gap-4 sm:grid-cols-3">
            {CLASSES.map((k) => {
              const Icon = CLASS_ICONS[k.id];
              return (
                <li
                  key={k.id}
                  className="icon-play flex items-center gap-4 rounded-[--radius-card] bg-paper/10 px-6 py-5 text-paper ring-1 ring-inset ring-white/25"
                >
                  <span aria-hidden="true" className="text-paper">
                    <Icon className="h-12 w-12" />
                  </span>
                  <span>
                    <span className="block text-lg font-bold">{k[locale].name}</span>
                    <span className="text-paper/80">
                      <time>{hour(k.start, locale)}</time>
                      <span aria-hidden="true"> – </span>
                      <time>{hour(k.end, locale)}</time>
                    </span>
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <section className="paper-grain bg-paper-warm">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <h2 className="text-3xl font-bold sm:text-4xl">{c.followTitle}</h2>
          <div className="mt-7 flex flex-wrap gap-3">
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
          </div>
        </div>
      </section>
    </>
  );
}
