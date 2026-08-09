# ARTxpwd, Art Foundation for People with Disabilities

Sitio de la fundación. Miami, Florida. Construido por Judo Marketing.

Reemplaza al WordPress de `artfoundation-x-pwd.com`.

## Empezar

```bash
npm install
npm run dev          # http://localhost:3000
```

Variables de entorno: copiar `.env.example` a `.env.local` y llenar.
`JUDO_KIT_KEY` sale del expediente del sitio en judomarketing.net/admin.
**Nunca** lleva el prefijo `NEXT_PUBLIC`: si la clave llega al navegador,
cualquiera puede inyectar datos falsos al panel para siempre.

## Comprobar accesibilidad

No es opcional en este proyecto. Es una fundación para personas con
discapacidad: un sitio sobre inclusión que no se pueda usar se contradice
a sí mismo.

```bash
npm run build && npm start   # en una terminal
npm run a11y                 # en otra
```

Falla con código 1 si aparece una sola violación.

## Cómo está armado

| Ruta | Qué hay |
|---|---|
| `src/app/[locale]/` | Las páginas. `en` y `es`. |
| `src/content/site.ts` | Datos de la organización. Una sola fuente. |
| `src/content/copy.ts` | Todos los textos, en los dos idiomas. |
| `src/middleware.ts` | Kill switch de Judo + resolución de idioma. |
| `src/lib/judo-kit.ts` | Conexión al panel central. No tocar. |
| `next.config.ts` | Las redirecciones 301 desde el WordPress viejo. |
| `docs/` | Fases, marca, pendientes y mapa de URLs. |

### Los idiomas

Inglés en la raíz (`/classes`), español bajo `/es` (`/es/classes`). Es el
mismo esquema del WordPress actual: cambiarlo costaría el posicionamiento de
las 30 páginas en español que ya están indexadas.

Por dentro los dos van a `/[locale]`; el middleware reescribe sin redirigir,
así que la dirección que ve el visitante no cambia.

### El kill switch

El dueño puede apagar y prender el sitio desde judomarketing.net. Es
**fail-open**: si el panel central no responde, el sitio sigue funcionando.
Una fundación no se cae por un fallo de nuestra infraestructura.

Este sitio **no reporta métricas** al panel central, a diferencia de los
demás. La fundación maneja su propio presupuesto y las cifras se ven en el
portal del administrador. Del kit solo se usa el kill switch.

## Antes de tocar nada

Leer `docs/PENDIENTES.md`. Hay contradicciones sin resolver entre lo que
publica el sitio actual y lo que se acordó, sobre todo **el precio y los
horarios de las clases**. Los valores en disputa están en `null` a
propósito: es preferible que no se muestre nada a que se muestre un precio
equivocado.
