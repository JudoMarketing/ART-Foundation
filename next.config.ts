import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,

  /**
   * Redirecciones 301 desde las direcciones del WordPress viejo.
   * El sitio lleva años indexado: cada dirección que cambie sin su 301 es
   * posicionamiento que se pierde y no vuelve.
   *
   * ⚠️ Esta tabla está INCOMPLETA a propósito. Está armada con las 75 URLs
   * de los sitemaps (ver docs/mapa-urls.md). Falta cruzarla con el informe
   * de Páginas de Search Console, que es el único lugar donde aparecen las
   * direcciones que Google conoce y el sitemap no lista.
   */
  /**
   * Cacheo de lo que pesa.
   *
   * Por defecto Vercel sirve todo lo de `public/` con
   * `max-age=0, must-revalidate`: el navegador vuelve a preguntar por cada
   * archivo en cada visita. Para un video de varios megas y nueve cuadros,
   * eso es una conversación entera antes de que se vea nada.
   *
   * La obra se cachea un año y en firme: cada pieza tiene su nombre propio y
   * no se reemplaza en el sitio — si entra una nueva, entra con otro nombre.
   *
   * El video va a una semana con `stale-while-revalidate`: si algún día se
   * reemplaza `hero.mp4` por una versión más liviana, el cambio llega solo
   * dentro de la semana, y mientras tanto nadie espera por él.
   */
  async headers() {
    return [
      {
        source: "/obra/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
      {
        source: "/video/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=604800, stale-while-revalidate=2592000",
          },
        ],
      },
    ];
  },

  async redirects() {
    return [
      // — Inglés —
      { source: "/contact-474", destination: "/contact", permanent: true },
      { source: "/community-engagement-670", destination: "/about", permanent: true },
      { source: "/art-in-action-522", destination: "/about", permanent: true },
      { source: "/support", destination: "/donate", permanent: true },
      { source: "/arts-programs", destination: "/classes", permanent: true },
      { source: "/creative-arts-2026", destination: "/classes/art", permanent: true },
      { source: "/theatre-classes-2026", destination: "/classes/theatre", permanent: true },
      { source: "/volunteer-opportunities", destination: "/volunteer", permanent: true },
      { source: "/internship-opportunities", destination: "/volunteer/internships", permanent: true },
      { source: "/shop", destination: "/store", permanent: true },

      // — Español —
      // Ojo: /es/contact NO lleva regla. La dirección vieja y la nueva son la
      // misma, y una redirección de una dirección hacia sí misma es un bucle
      // infinito: el navegador corta con ERR_TOO_MANY_REDIRECTS y la página
      // deja de existir. Si no cambia, no se redirige.
      { source: "/es/apoyo", destination: "/es/donate", permanent: true },
      { source: "/es/programas-de-artes", destination: "/es/classes", permanent: true },
      { source: "/es/clases-de-arte-2026", destination: "/es/classes/art", permanent: true },
      { source: "/es/clases-de-teatro-2026", destination: "/es/classes/theatre", permanent: true },
      { source: "/es/oportunidades-de-voluntariado", destination: "/es/volunteer", permanent: true },
      { source: "/es/oportunidades-de-pasantias", destination: "/es/volunteer/internships", permanent: true },
      { source: "/es/shop-2", destination: "/es/store", permanent: true },

      // — Ruido del tema de WordPress: no se migra —
      { source: "/responsive_slider/:path*", destination: "/", permanent: true },
      { source: "/slide-types/:path*", destination: "/", permanent: true },
    ];
  },
};

export default nextConfig;
