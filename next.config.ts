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
