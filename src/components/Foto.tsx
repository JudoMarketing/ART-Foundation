import Image from "next/image";
import { foto } from "@/content/fotos";
import type { Locale } from "@/lib/i18n";

/**
 * Una foto de la fundación, con su descripción y su hueco reservado.
 *
 * Tres cosas que hace y que si se ponen a mano en cada página se olvidan una
 * de cada tres veces:
 *
 * 1. **Reserva el espacio antes de que la imagen llegue.** El `aspect` fija la
 *    altura desde el principio, así que el texto de abajo no salta cuando la
 *    foto termina de bajar. Un salto de página a media lectura es molesto para
 *    cualquiera y es un problema de verdad para quien lee despacio o usa un
 *    puntero con dificultad: el enlace que iba a tocar se movió de lugar.
 * 2. **Trae su texto alternativo del catálogo**, en el idioma de la página. La
 *    descripción vive en `content/fotos.ts` junto a la foto y no repartida por
 *    catorce plantillas, que es como terminan las fotos con `alt=""`.
 * 3. **Le dice al navegador qué ancho va a ocupar** con `sizes`, para que baje
 *    la versión del tamaño correcto y no una de 1400px para un hueco de 300.
 */
export default function Foto({
  slug,
  locale,
  /** Proporción del recorte. La foto se recorta al centro para llenarla. */
  aspect = "aspect-4/3",
  sizes = "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw",
  className = "",
  priority = false,
  /**
   * Foco del recorte. Casi todas las fotos van bien centradas, pero en una
   * vertical recortada a apaisada el centro puede caer en la mesa y dejar
   * afuera las caras.
   */
  posicion = "object-center",
}: {
  slug: string;
  locale: Locale;
  aspect?: string;
  sizes?: string;
  className?: string;
  priority?: boolean;
  posicion?: string;
}) {
  const f = foto(slug);

  // Si el nombre no existe no se dibuja nada. Es preferible un hueco a una
  // imagen rota con un icono de archivo perdido en medio de la página.
  if (!f) return null;

  return (
    <span
      className={`relative block overflow-hidden bg-paper-warm ${aspect} ${className}`}
    >
      <Image
        src={`/fotos/${f.slug}.webp`}
        alt={f.alt[locale]}
        fill
        sizes={sizes}
        priority={priority}
        className={`object-cover ${posicion}`}
      />
    </span>
  );
}
