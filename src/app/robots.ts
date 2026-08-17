import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

/**
 * El robots.txt.
 *
 * Tiene un trabajo que no es obvio: **impedir que el borrador compita con el
 * sitio real**. Mientras el dominio de la fundación siga en WordPress, este
 * sitio vive en `art-foundation.vercel.app`, y esa dirección es pública. Si
 * Google la encuentra, indexa una copia entera del sitio en otro dominio, y a
 * partir de ahí dos direcciones distintas dicen lo mismo. Google elige una, y
 * puede elegir la equivocada.
 *
 * La regla es simple: se permite indexar solo cuando la dirección base es la
 * de la fundación. En cualquier otra (la de prueba de Vercel, un subdominio de
 * borrador, una rama de vista previa) se prohíbe todo.
 *
 * Para que eso funcione hay que decirle a Vercel dónde está viviendo el sitio
 * en cada momento, con `NEXT_PUBLIC_SITE_URL`. Sin esa variable el valor por
 * defecto es el dominio real, o sea que se permite indexar: el criterio es
 * "solo se bloquea lo que sé que es un borrador", no "se bloquea todo lo que
 * no reconozco". Un sitio real bloqueado por error es invisible en Google
 * durante semanas y nadie se entera; un borrador indexado se arregla en un día.
 */
const ES_EL_SITIO_REAL = SITE_URL.endsWith("artfoundation-x-pwd.com");

export default function robots(): MetadataRoute.Robots {
  if (!ES_EL_SITIO_REAL) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Los formularios ya van con `noindex` en su propia página, pero eso
      // Google lo aprende recién después de entrar. Acá no entra.
      disallow: ["/api/", "/register/apply", "/volunteer/apply", "/classes/financing"],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
