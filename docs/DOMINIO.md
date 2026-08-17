# Apuntar `artfoundation-x-pwd.com` al sitio nuevo

Medido el 2026-08-17. Todo lo de acá se comprobó, no se supone.

## Dónde está cada cosa hoy

| Qué | Dónde | Valor |
|---|---|---|
| Registrador (dónde se paga y se renueva) | **Squarespace Domains LLC** | vence **2026-10-16** |
| Servidores de nombres (dónde viven los registros) | **GoDaddy** | `ns17.domaincontrol.com`, `ns18.domaincontrol.com` |
| `A` de `@` | GoDaddy | `68.178.132.165` (el WordPress) |
| `www` | GoDaddy | `CNAME` a `artfoundation-x-pwd.com` |
| Correo (`MX`) | **Google Workspace** | `aspmx.l.google.com` + 4 alternativos |
| `SPF` | GoDaddy | `v=spf1 ip4:68.178.132.165 include:_spf.google.com ~all` |

Las dos cosas importantes de esa tabla:

1. **El dominio se compró en Squarespace pero los registros se editan en
   GoDaddy.** Squarespace solo tiene la delegación. Cambiar un `A` desde el
   panel de Squarespace no hace nada mientras los servidores de nombres sigan
   siendo los de GoDaddy: el mundo pregunta a GoDaddy y GoDaddy contesta lo que
   tiene guardado.
2. **El correo de la fundación es Google Workspace y no se toca.** Los cinco
   `MX` no tienen ninguna relación con el `A` del sitio web. Se cambia el `A`,
   la web se muda, y `mgonzalez@artfoundation-x-pwd.com` sigue funcionando sin
   un minuto de corte. Esto vale decirlo porque es el miedo razonable de
   cualquiera que mira una zona de DNS por primera vez.

**Lo que vence en octubre:** el dominio, no el hosting. Si nadie lo renueva, en
octubre no hay sitio, no hay correo y no hay nada. Conviene ponerlo en
renovación automática antes de mudar cualquier cosa.

## Los registros a cambiar, en GoDaddy

Dos líneas. Nada más.

| Tipo | Nombre | Valor viejo | Valor nuevo | TTL |
|---|---|---|---|---|
| `A` | `@` | `68.178.132.165` | `76.76.21.21` | 600 |
| `CNAME` | `www` | `artfoundation-x-pwd.com` | `cname.vercel-dns.com` | 600 |

Antes de tocarlos, en Vercel: agregar los dos dominios al proyecto
(`artfoundation-x-pwd.com` y `www.artfoundation-x-pwd.com`). Vercel arranca ahí
el pedido del certificado, y cuando el `A` cambie ya lo tiene esperando. Al
revés, el sitio queda unos minutos sin HTTPS y el navegador pone la pantalla
roja de sitio no seguro.

**TTL en 600 el día anterior.** El TTL es cuánto tiempo cada proveedor de
internet se queda con la respuesta guardada antes de volver a preguntar. Con el
TTL alto que suele venir por defecto (una hora, a veces un día), si algo sale
mal, volver atrás tarda eso. Con 600 segundos, volver atrás tarda diez minutos.
Se sube de nuevo una semana después, cuando ya se sabe que anduvo.

**Lo que NO se toca:** los cinco `MX`, ni ningún `TXT` de verificación de
Google. Se cambian dos líneas y se deja el resto quieto.

**Después de la mudanza, el `SPF`.** Hoy dice `ip4:68.178.132.165`, o sea que
autoriza al servidor viejo a mandar correo en nombre de la fundación. Cuando
ese servidor deje de ser suyo, esa autorización sigue escrita y firmada. Se
saca ese pedazo y queda `v=spf1 include:_spf.google.com ~all`. No es urgente el
mismo día, sí en la misma semana.

## La alternativa que no toca nada

Si el borrador todavía no está aprobado y de todas formas se quiere verlo en el
dominio de la fundación, se agrega **un registro nuevo** en vez de cambiar los
que hay:

| Tipo | Nombre | Valor |
|---|---|---|
| `CNAME` | `nuevo` | `cname.vercel-dns.com` |

Con eso `nuevo.artfoundation-x-pwd.com` muestra el sitio nuevo y
`artfoundation-x-pwd.com` sigue mostrando el de siempre. Es reversible borrando
una línea, y el sitio en vivo no se enteró.

Si se usa esa vía, hay que poner en Vercel
`NEXT_PUBLIC_SITE_URL=https://nuevo.artfoundation-x-pwd.com`. Eso hace dos
cosas: los canónicos apuntan a donde el sitio realmente está, y `robots.txt`
pasa a prohibir la indexación completa, porque un borrador indexado le compite
al sitio real por sus propias palabras. Ver `src/app/robots.ts`.

## Lo que ya está resuelto del lado del código

- **Las 66 direcciones indexadas responden 200.** Están en `docs/mapa-urls.md`,
  sacadas de los sitemaps del WordPress. Antes de armar la tabla de
  redirecciones respondían 26; las otras 40 eran 404. Cada 404 en una dirección
  que Google tiene indexada es posicionamiento que se tira. La tabla está en
  `next.config.ts` y se comprobó una por una contra una compilación de
  producción.
- **Canónicos y hreflang, uno por página.** Acá había un error puesto: el
  canónico estaba declarado una sola vez en el layout y los metadatos de Next
  se heredan, así que las trece páginas interiores declaraban que su versión
  oficial era la portada. Con el dominio apuntado, eso saca del índice a todas
  menos una. Ahora cada página declara el suyo (`src/lib/seo.ts`).
- **`sitemap.xml` y `robots.txt`** (`src/app/sitemap.ts`, `src/app/robots.ts`).
  Los sitemaps de AIOSEO desaparecen el día de la mudanza; sin uno nuevo,
  Google descubre las 301 de a poco y la mudanza tarda semanas más.

## Lo que queda flojo, dicho de frente

**Los 14 artículos del blog.** Están indexados, el sitio nuevo no los tiene, y
hoy su redirección va al índice del blog, que está vacío. Un 301 hacia algo que
no es equivalente al contenido original Google lo puede tratar como un 404
disimulado y sacarlo del índice igual. La redirección evita el error duro y no
mucho más. Lo que arregla esto de verdad es migrar los artículos, y entonces
cada uno apunta al suyo. Es fase 5.

Mientras eso no esté, mudar el dominio cuesta la visibilidad de esos 14
artículos. Puede ser un costo chico o el tráfico principal del sitio; el dato de
cuánto valen está en Search Console y no lo tengo. Vale mirarlo antes de decidir
la fecha.

## Después de apuntar

1. En Search Console, subir `https://artfoundation-x-pwd.com/sitemap.xml`.
2. En el informe de Páginas, mirar los 404 durante dos semanas. Ahí van a
   aparecer las direcciones indexadas que el sitemap del WordPress no listaba,
   que son las que hoy no puedo saber desde afuera. Cada una que aparezca se
   agrega a la tabla de `next.config.ts`.
3. No borrar el WordPress por 90 días. Es la única copia de los 14 artículos.
