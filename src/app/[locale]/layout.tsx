import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Domine } from "next/font/google";
import { isLocale, LOCALES, type Locale } from "@/lib/i18n";
import { t } from "@/content/copy";
import { ORG } from "@/content/site";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import "../globals.css";

/** Domine es la tipografía del sitio actual. Se conserva la identidad. */
const domine = Domine({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-domine",
  display: "swap",
});

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const es = locale === "es";
  return {
    title: {
      default: es
        ? "Arte sin límites | ART Foundation for People with Disabilities"
        : "Art without limits | ART Foundation for People with Disabilities",
      template: `%s | ${ORG.shortName}`,
    },
    description: es
      ? "Clases de arte, teatro y guitarra en Miami para estudiantes de todas las capacidades. Si un estudiante necesita terapeuta uno a uno, se lo damos sin costo."
      : "Art, theatre and guitar classes in Miami for students of all abilities. If a student needs a one-on-one therapist, we provide one at no cost.",
    // Cada idioma se declara como alternativa del otro: así Google entiende
    // que son la misma página y no contenido duplicado.
    alternates: {
      canonical: es ? "/es" : "/",
      languages: { en: "/", es: "/es" },
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const c = t(locale as Locale);

  return (
    <html lang={locale} className={domine.variable}>
      <body className="min-h-dvh bg-paper text-ink antialiased">
        {/* Primer elemento enfocable de la página: saltar la navegación.
            Para quien navega con teclado, ahorra 8 tabulaciones por página. */}
        <a href="#contenido" className="skip-link">
          {c.nav.skipToContent}
        </a>

        <SiteHeader locale={locale as Locale} />

        <main id="contenido" tabIndex={-1}>
          {children}
        </main>

        <SiteFooter locale={locale as Locale} />
      </body>
    </html>
  );
}
