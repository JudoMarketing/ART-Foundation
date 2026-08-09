# ART Foundation, mapa de URLs actual (línea base SEO)

Capturado: 2026-08-08 desde los sitemaps de AIOSEO v5.0.0.1 de
https://artfoundation-x-pwd.com/

**Este archivo es la línea base contra la que se arma la tabla de 301.**
No se cambia ni una URL sin que su reemplazo esté en esta tabla.

## Resumen

| Grupo | Cantidad |
|---|---|
| Total en sitemaps | 75 |
| Español (`/es/…`) | 30 |
| Inglés (raíz) | 38 |
| Ruido técnico (`/responsive_slider/`, `/slide-types/`) | 7 |

Hallazgos que cambian el plan:

1. **El sitio es bilingüe** (inglés en la raíz, español bajo `/es/`). El brief
   decía "está en inglés". Son dos árboles de contenido, no uno.
2. **Existe `/shop/` y `/es/shop-2/`**, o sea que sí hay algo que se vende o
   se cobra, además de donaciones. Hay que preguntar qué es.
3. **Voluntariado, pasantías, talleres, eventos y clases** tienen página propia
   (`/volunteer-opportunities/`, `/internship-opportunities/`, `/workshops/`,
   `/events/`, `/creative-arts-2026/`, `/theatre-classes-2026/`). Todo eso son
   candidatos a conversión medible.
4. **No hay página de donación en el sitemap.** Si reciben donaciones, hoy no
   pasan por una URL indexada. Confirmar por dónde entra el dinero.
5. Las 7 URLs de `responsive_slider` / `slide-types` son artefactos del tema de
   WordPress, no contenido. Al migrar **no se replican**: se les pone 410 o se
   redirigen a su página padre.
6. `/es/the-abart-intervention-model/` está en el árbol español pero con slug
   en inglés, al migrar, corregir y dejar 301 desde la vieja.

## Inglés (38)

- https://artfoundation-x-pwd.com
- /1st-day-of-creative-arts-class/
- /a-look-back-at-our-may-4th-art-theatre-event/
- /adult-open-studio-art-therapy-group-2025/
- /afectividad-y-sexualidad-en-autismo-y-discapacidad-intelectual/  ← post en español dentro del árbol EN
- /alimentacion-en-el-autismo/                                      ← idem
- /another-point-of-view/
- /art-in-action-522/
- /art-in-action-522/our-instructors/
- /artists-with-disabilities/
- /arts-programs/
- /beyond-sight/
- /blog/
- /community-engagement-670/
- /como-colaborar-con-el-asistente-conductual-para-el-desarrollo-de-mi-hijo/ ← idem
- /contact-474/                    ← slug con número: basura de WordPress, se limpia con 301
- /creative-arts-2026/
- /creative-sessions/
- /events/
- /explorando-el-mundo-de-aba/     ← idem
- /exploring-the-world-of-aba/
- /gallery-art-in-action/
- /how-art-transforms-us/
- /how-to-fight-for-your-childs-iep-a-guide-from-someone-whos-been-there/
- /in-the-media/
- /internship-opportunities/
- /parents-caregivers/
- /photo-galleries/
- /shop/
- /student-creations/
- /support/
- /testimonials/
- /the-abart-intervention-model/
- /the-contribution-of-psychology-to-child-development/
- /theatre-classes-2026/
- /volunteer-opportunities/
- /where-art-meets-science-a-holistic-approach-to-supporting-neurodivergent-children-and-youth/
- /workshops/

## Español (30)

- /es/
- /es/apoyo/
- /es/artistas-con-discapacidad/
- /es/blog/
- /es/clases-de-arte-2026/
- /es/clases-de-teatro-2026/
- /es/como-el-arte-nos-transforma/
- /es/como-luchar-por-el-iep-de-tu-hijo/
- /es/contact/                     ← slug en inglés dentro del árbol ES
- /es/creaciones-de-estudiantes/
- /es/donde-el-arte-se-encuentra-con-la-ciencia-un-enfoque-integral-para-apoyar-a-ninos-y-jovenes-neurodivergentes/
- /es/en-los-medios/
- /es/eventos-comunitarios/
- /es/galerias-de-fotos/
- /es/la-contribucion-de-la-psicologia-al-desarrollo-infantil/
- /es/mas-alla-de-la-vista/
- /es/modelo-de-intervencion-abart/
- /es/nuestros-instructores/
- /es/oportunidades-de-pasantias/
- /es/oportunidades-de-voluntariado/
- /es/otro-punto-de-vista/
- /es/padres-cuidadores/
- /es/programas-de-artes/
- /es/sesiones-creativas/
- /es/shop-2/                      ← slug con "-2": basura de WordPress
- /es/terapia-de-arte-para-adultos-2025/
- /es/testimonios/
- /es/the-abart-intervention-model/ ← slug en inglés dentro del árbol ES
- /es/un-vistazo-a-nuestro-evento-de-arte-y-teatro-del-4-de-mayo/
- /es/workshops/                   ← slug en inglés dentro del árbol ES

## Ruido técnico (7), no se migran

- /responsive_slider/
- /responsive_slider/1st-day-of-creative-arts-class/
- /responsive_slider/art-class-23-03-24/
- /responsive_slider/creative-arts-aba-integration/
- /responsive_slider/family-centered/
- /responsive_slider/performing-arts-for-social-skills/
- /slide-types/home-slider/

## Lo que falta para cerrar la línea base

El servidor devuelve una página de desafío ("One moment, please…") a las
peticiones automáticas del HTML y del `wp-json`, así que **este mapa sale de
los sitemaps, no de un rastreo completo**. Puede haber URLs indexadas que no
estén en el sitemap. Para cerrarlo bien hace falta:

- **Search Console** → informe de Páginas (todas las URLs que Google conoce de
  verdad, incluidas las que el sitemap no lista) y el informe de consultas para
  saber qué páginas traen tráfico y no se pueden perder.
- **Analytics** → páginas más vistas de los últimos 12 meses.

Sin esos dos accesos, la tabla de 301 se arma a ciegas.
