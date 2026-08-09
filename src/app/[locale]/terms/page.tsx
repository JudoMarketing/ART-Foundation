import type { Metadata } from "next";
import { type Locale } from "@/lib/i18n";
import { TERMS, TERMS_VERSION } from "@/content/terms";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: locale === "es" ? "Términos y condiciones" : "Terms and conditions",
  };
}

export default async function TermsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  const locale = raw as Locale;
  const es = locale === "es";

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-24">
      <h1 className="text-4xl font-bold sm:text-5xl">
        {es ? "Términos y condiciones" : "Terms and conditions"}
      </h1>
      <p className="mt-4 text-ink-soft">
        {es ? "Versión" : "Version"} {TERMS_VERSION}
      </p>

      {/* Índice. En un documento largo, poder saltar a la sección que
          importa es la diferencia entre leerlo y no leerlo, y para quien
          usa lector de pantalla, entre 20 segundos y cuatro minutos. */}
      <nav
        aria-label={es ? "Contenido" : "Contents"}
        className="mt-10 rounded-[--radius-card] border border-line bg-paper-warm p-6"
      >
        <h2 className="text-lg font-bold">{es ? "Contenido" : "Contents"}</h2>
        <ol className="mt-4 grid gap-x-8 gap-y-2 sm:grid-cols-2">
          {TERMS.map((s, i) => (
            <li key={s.id}>
              <a href={`#${s.id}`} className="link text-sm">
                {i + 1}. {s[locale].title}
              </a>
            </li>
          ))}
        </ol>
      </nav>

      <div className="prose mt-14">
        {TERMS.map((s, i) => (
          <section key={s.id} id={s.id} className="mt-12 scroll-mt-28">
            <h2 className="text-2xl font-bold">
              <span className="text-brand-ink">{i + 1}.</span> {s[locale].title}
            </h2>
            {s[locale].body.map((p, j) => (
              <p key={j} className="mt-4 leading-relaxed text-ink-soft">
                {p}
              </p>
            ))}
          </section>
        ))}
      </div>
    </div>
  );
}
