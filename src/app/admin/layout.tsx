import type { Metadata } from "next";
import { Domine } from "next/font/google";
import { idiomaAdmin } from "@/lib/admin-prefs";
import "../globals.css";

const domine = Domine({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-domine",
  display: "swap",
});

/**
 * El portal no va a Google, y esto no es una preferencia: es la lista de
 * familias de la fundación. `noindex, nofollow` acá y `Disallow` en el
 * robots.txt, las dos, porque hacen cosas distintas: el robots pide que no
 * entren, y el `noindex` es lo que vale si alguien entró igual.
 */
export const metadata: Metadata = {
  robots: { index: false, follow: false, nocache: true },
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const idioma = await idiomaAdmin();

  return (
    <html lang={idioma} className={domine.variable}>
      <body className="min-h-dvh bg-paper-warm text-ink antialiased">{children}</body>
    </html>
  );
}
