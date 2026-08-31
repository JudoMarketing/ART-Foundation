import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Instrument_Serif, Inter } from "next/font/google";
import { isLocale, LOCALES, type Locale } from "@/lib/i18n";
import { t } from "@/content/copy";
import { ORG } from "@/content/site";
import { SITE_URL } from "@/lib/seo";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import "../globals.css";

/**
 * Las dos tipografías del sitio.
 *
 * `display: "swap"` en las dos: mientras la fuente baja, el texto se ve con
 * la de respaldo. La alternativa es media pantalla en blanco esperando un
 * archivo, y en una conexión de teléfono en Miami eso son segundos.
 *
 * Instrument Serif viene con un solo peso porque es el único que existe, y en
 * `globals.css` hay un `font-synthesis: none` que impide que el navegador se
 * invente una negrita engordando el trazo.
 */
const serif = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  variable: "--font-instrument-serif",
  display: "swap",
});

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
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
    // La dirección base contra la que Next resuelve todo lo que escribe en
    // absoluto: canónicos, hreflang y vistas previas de redes.
    metadataBase: new URL(SITE_URL),
    title: {
      default: es
        ? "Arte sin límites | ART Foundation for People with Disabilities"
        : "Art without limits | ART Foundation for People with Disabilities",
      template: `%s | ${ORG.shortName}`,
    },
    description: es
      ? "Clases de arte, teatro y guitarra en Miami para estudiantes de todas las capacidades. Si un estudiante necesita terapeuta uno a uno, se lo damos sin costo."
      : "Art, theatre and guitar classes in Miami for students of all abilities. If a student needs a one-on-one therapist, we provide one at no cost.",
    // Acá NO va el canónico. Los metadatos de Next se heredan, así que un
    // canónico puesto en el layout lo heredan las trece páginas interiores y
    // todas terminan declarando que su versión oficial es la portada. Cada
    // página declara el suyo con `alternatesFor`.
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
    <html lang={locale} className={`${serif.variable} ${sans.variable}`}>
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
