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
      { source: "/creative-arts-2026", destination: "/classes", permanent: true },
      { source: "/theatre-classes-2026", destination: "/classes", permanent: true },
      { source: "/volunteer-opportunities", destination: "/volunteer", permanent: true },
      { source: "/internship-opportunities", destination: "/volunteer", permanent: true },
      { source: "/shop", destination: "/store", permanent: true },

      // — Español —
      // Ojo: /es/contact NO lleva regla. La dirección vieja y la nueva son la
      // misma, y una redirección de una dirección hacia sí misma es un bucle
      // infinito: el navegador corta con ERR_TOO_MANY_REDIRECTS y la página
      // deja de existir. Si no cambia, no se redirige.
      { source: "/es/apoyo", destination: "/es/donate", permanent: true },
      { source: "/es/programas-de-artes", destination: "/es/classes", permanent: true },
      { source: "/es/clases-de-arte-2026", destination: "/es/classes", permanent: true },
      { source: "/es/clases-de-teatro-2026", destination: "/es/classes", permanent: true },
      { source: "/es/oportunidades-de-voluntariado", destination: "/es/volunteer", permanent: true },
      { source: "/es/oportunidades-de-pasantias", destination: "/es/volunteer", permanent: true },
      { source: "/es/shop-2", destination: "/es/store", permanent: true },


      /* ── Lo que había y todavía no tiene página propia ──────────────────
         Estas 40 direcciones están indexadas en Google y el sitio nuevo no
         las tiene. Sin regla, el día que se apunte el dominio se convierten
         en 404 y se pierde todo lo que valen.

         Comprobado: con esta tabla, las 66 direcciones de los sitemaps
         responden 200. Sin ella respondían 26.

         Van a la página más cercana que sí existe. Un 301 a algo relacionado
         conserva parte de la autoridad; un 404 la tira entera.

         ⚠️ Los 14 artículos del blog apuntan al índice del blog, que hoy está
         vacío. Es un parche, no una solución: Google puede tratar un 301 a una
         página que no equivale al contenido original como un 404 disimulado.
         Lo que de verdad arregla esto es migrar los artículos (fase 5), y
         entonces cada uno de estos apunta a su artículo de verdad. */

      // Artículos del blog, en inglés
      { source: "/1st-day-of-creative-arts-class", destination: "/blog", permanent: true },
      { source: "/a-look-back-at-our-may-4th-art-theatre-event", destination: "/blog", permanent: true },
      { source: "/another-point-of-view", destination: "/blog", permanent: true },
      { source: "/beyond-sight", destination: "/blog", permanent: true },
      { source: "/exploring-the-world-of-aba", destination: "/blog", permanent: true },
      { source: "/how-art-transforms-us", destination: "/blog", permanent: true },
      { source: "/how-to-fight-for-your-childs-iep-a-guide-from-someone-whos-been-there", destination: "/blog", permanent: true },
      { source: "/the-contribution-of-psychology-to-child-development", destination: "/blog", permanent: true },
      { source: "/where-art-meets-science-a-holistic-approach-to-supporting-neurodivergent-children-and-youth", destination: "/blog", permanent: true },
      { source: "/in-the-media", destination: "/blog", permanent: true },

      // Páginas de la fundación, en inglés
      { source: "/artists-with-disabilities", destination: "/about", permanent: true },
      { source: "/the-abart-intervention-model", destination: "/about", permanent: true },
      { source: "/art-in-action-522/our-instructors", destination: "/about", permanent: true },
      { source: "/testimonials", destination: "/about", permanent: true },
      { source: "/events", destination: "/about", permanent: true },
      { source: "/creative-sessions", destination: "/classes", permanent: true },
      { source: "/workshops", destination: "/classes", permanent: true },
      { source: "/adult-open-studio-art-therapy-group-2025", destination: "/classes", permanent: true },
      { source: "/parents-caregivers", destination: "/classes", permanent: true },
      { source: "/photo-galleries", destination: "/store", permanent: true },
      { source: "/gallery-art-in-action", destination: "/store", permanent: true },
      { source: "/student-creations", destination: "/store", permanent: true },

      // Artículos del blog, en español
      { source: "/es/como-el-arte-nos-transforma", destination: "/es/blog", permanent: true },
      { source: "/es/como-luchar-por-el-iep-de-tu-hijo", destination: "/es/blog", permanent: true },
      { source: "/es/donde-el-arte-se-encuentra-con-la-ciencia-un-enfoque-integral-para-apoyar-a-ninos-y-jovenes-neurodivergentes", destination: "/es/blog", permanent: true },
      { source: "/es/la-contribucion-de-la-psicologia-al-desarrollo-infantil", destination: "/es/blog", permanent: true },
      { source: "/es/mas-alla-de-la-vista", destination: "/es/blog", permanent: true },
      { source: "/es/otro-punto-de-vista", destination: "/es/blog", permanent: true },
      { source: "/es/un-vistazo-a-nuestro-evento-de-arte-y-teatro-del-4-de-mayo", destination: "/es/blog", permanent: true },
      { source: "/es/en-los-medios", destination: "/es/blog", permanent: true },

      // Páginas de la fundación, en español
      { source: "/es/artistas-con-discapacidad", destination: "/es/about", permanent: true },
      { source: "/es/modelo-de-intervencion-abart", destination: "/es/about", permanent: true },
      // El slug en inglés dentro del árbol español. Existe indexado así.
      { source: "/es/the-abart-intervention-model", destination: "/es/about", permanent: true },
      { source: "/es/nuestros-instructores", destination: "/es/about", permanent: true },
      { source: "/es/testimonios", destination: "/es/about", permanent: true },
      { source: "/es/eventos-comunitarios", destination: "/es/about", permanent: true },
      { source: "/es/sesiones-creativas", destination: "/es/classes", permanent: true },
      { source: "/es/terapia-de-arte-para-adultos-2025", destination: "/es/classes", permanent: true },
      { source: "/es/padres-cuidadores", destination: "/es/classes", permanent: true },
      { source: "/es/galerias-de-fotos", destination: "/es/store", permanent: true },
      { source: "/es/creaciones-de-estudiantes", destination: "/es/store", permanent: true },

      // — Ruido del tema de WordPress: no se migra —
      { source: "/responsive_slider/:path*", destination: "/", permanent: true },
      { source: "/slide-types/:path*", destination: "/", permanent: true },
    ];
  },
};

export default nextConfig;
