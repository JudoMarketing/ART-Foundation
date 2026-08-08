import Link from "next/link";
import { localePath, type Locale } from "@/lib/i18n";
import { t } from "@/content/copy";
import { ORG, FL_DISCLOSURE } from "@/content/site";
import JudoFooter from "./JudoFooter";

/**
 * Pie del sitio.
 *
 * Lleva dos cosas que no son decorativas:
 *
 *  · El bloque 501(c)(3) con el número de registro CH73874 y el aviso literal
 *    de la División de Servicios al Consumidor de Florida. En Florida, una
 *    organización que pide donaciones está OBLIGADA a mostrarlo. No se
 *    traduce ni se resume: va tal cual dice la ley.
 *  · La línea "Website por Judo Marketing" con enlace y sin nofollow, que es
 *    la regla fija del protocolo del kit.
 */
export default function SiteFooter({ locale }: { locale: Locale }) {
  const c = t(locale);
  const es = locale === "es";

  return (
    <footer>
      {/* ── Bloque de la fundación ─────────────────────────────────────── */}
      <div className="border-t border-line bg-paper-warm">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-3">
          <div>
            <h2 className="font-[family-name:var(--font-display)] text-lg font-bold">
              {c.footer.contactTitle}
            </h2>
            <address className="mt-4 not-italic text-sm leading-relaxed text-ink-soft">
              <p className="font-semibold text-ink">{c.footer.officeLabel}</p>
              <p>{ORG.office.street}</p>
              <p>
                {ORG.office.city}, {ORG.office.state} {ORG.office.zip}
              </p>
              <p className="mt-4">
                <a className="link" href={ORG.phoneHref}>
                  {ORG.phone}
                </a>{" "}
                <span className="whitespace-nowrap">
                  {es ? "ext." : "ext."} {ORG.phoneExt}
                </span>
              </p>
              <p>
                <a className="link" href={`mailto:${ORG.email}`}>
                  {ORG.email}
                </a>
              </p>
            </address>
          </div>

          <div>
            <h2 className="font-[family-name:var(--font-display)] text-lg font-bold">
              {c.footer.classesLabel}
            </h2>
            <address className="mt-4 not-italic text-sm leading-relaxed text-ink-soft">
              <p className="font-semibold text-ink">{ORG.classVenue.name}</p>
              <p>{ORG.classVenue.detail}</p>
              <p>{ORG.classVenue.street}</p>
              <p>
                {ORG.classVenue.city}, {ORG.classVenue.state}{" "}
                {ORG.classVenue.zip}
              </p>
            </address>
            <Link
              href={localePath(locale, "/classes")}
              className="link mt-4 inline-block text-sm font-semibold"
            >
              {c.nav.classes}
            </Link>
          </div>

          <div>
            <h2 className="font-[family-name:var(--font-display)] text-lg font-bold">
              {c.footer.followTitle}
            </h2>
            <ul className="mt-4 flex flex-wrap gap-3">
              <li>
                <a
                  href={ORG.social.instagram}
                  className="tap inline-flex items-center gap-2 rounded-full border border-line px-4 py-2 text-sm font-semibold text-ink transition-colors hover:border-brand hover:bg-brand-soft hover:text-brand-ink"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="3" width="18" height="18" rx="5" />
                    <circle cx="12" cy="12" r="4" />
                    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
                  </svg>
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href={ORG.social.facebook}
                  className="tap inline-flex items-center gap-2 rounded-full border border-line px-4 py-2 text-sm font-semibold text-ink transition-colors hover:border-brand hover:bg-brand-soft hover:text-brand-ink"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">
                    <path d="M14 9h3V6h-3c-2.2 0-4 1.8-4 4v2H8v3h2v7h3v-7h3l1-3h-4v-2c0-.6.4-1 1-1z" />
                  </svg>
                  Facebook
                </a>
              </li>
            </ul>

            <div className="mt-6 rounded-2xl border border-line bg-paper p-4">
              <p className="text-sm font-semibold text-ink">
                {c.footer.taxLine}
              </p>
              <p className="mt-1 text-sm text-ink-soft">
                {c.footer.registrationLabel}:{" "}
                <span className="font-mono">{ORG.flRegistration}</span>
              </p>
            </div>
          </div>
        </div>

        {/* Aviso obligatorio del estado de Florida. Va en inglés siempre
            porque es el texto legal literal. */}
        <div className="mx-auto max-w-6xl px-4 pb-12 sm:px-6">
          <p
            lang="en"
            className="border-t border-line pt-6 text-xs leading-relaxed text-ink-soft"
          >
            {FL_DISCLOSURE}
          </p>
        </div>
      </div>

      {/* ── Línea de Judo (regla fija del protocolo) ────────────────────── */}
      <JudoFooter
        idioma={locale}
        negocio={{
          nombre: ORG.legalName,
          tagline: {
            en: "Art without limits. Miami, Florida.",
            es: "Arte sin límites. Miami, Florida.",
          },
          direccion: `${ORG.office.street}, ${ORG.office.city}, ${ORG.office.state} ${ORG.office.zip}`,
          telefono: ORG.phone,
          email: ORG.email,
          instagram: ORG.social.instagram,
        }}
        enlaces={[
          { texto: { en: "Classes", es: "Clases" }, href: localePath(locale, "/classes") },
          { texto: { en: "Donate", es: "Donar" }, href: localePath(locale, "/donate") },
          { texto: { en: "Store", es: "Tienda" }, href: localePath(locale, "/store") },
          { texto: { en: "Volunteer", es: "Voluntariado" }, href: localePath(locale, "/volunteer") },
          { texto: { en: "Accessibility", es: "Accesibilidad" }, href: localePath(locale, "/accessibility") },
          { texto: { en: "Terms", es: "Términos" }, href: localePath(locale, "/terms") },
        ]}
        tema={{
          fondo: "#161922",
          texto: "#ffffff",
          tenue: "rgba(255,255,255,0.72)",
          acento: "#ff8ecd",
          borde: "rgba(255,255,255,0.14)",
        }}
      />
    </footer>
  );
}
