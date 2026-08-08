/**
 * Layout raíz.
 *
 * Next exige que exista, pero aquí no hace nada: quien pinta <html> y <body>
 * es `[locale]/layout.tsx`, porque el atributo `lang` tiene que decir el
 * idioma REAL de la página. Si el sitio declara `lang="en"` en una página en
 * español, el lector de pantalla la lee con voz inglesa y no se entiende
 * nada (WCAG 3.1.1).
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
