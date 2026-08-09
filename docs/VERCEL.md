# Vercel

Dos cosas distintas que se suelen confundir:

1. **Publicar el sitio.** Lo hace Vercel solo, conectando el repositorio.
   No hace falta que yo tenga acceso.
2. **Que yo pueda *leer* qué pasó en un despliegue.** Para eso sí hace falta
   un token, y con eso alcanza: leer, no publicar.

---

## 1 · Conectar el repositorio (una sola vez, lo haces tú)

1. Entrar a [vercel.com/new](https://vercel.com/new) con la cuenta de Judo.
2. Importar `JudoMarketing/ART-Foundation`.
3. Framework: **Next.js**. Todo lo demás se detecta solo — no hay que tocar
   comando de build ni carpeta de salida.
4. Antes de darle a *Deploy*, cargar las variables de abajo.

### Variables de entorno

| Variable | Ambientes | Qué es |
|---|---|---|
| `JUDO_KIT_KEY` | Production, Preview | Clave del expediente en judomarketing.net/admin. **Sin** `NEXT_PUBLIC`: si llega al navegador, cualquiera puede inyectar datos falsos al panel. |
| `NEXT_PUBLIC_JUDO_STATUS_URL` | Production, Preview | `https://ajsuskyeatgatbubctzl.supabase.co` |
| `JUDO_ANON_KEY` | Production, Preview | La anon key de Supabase. |
| `NEXT_PUBLIC_HERO_VIDEO_URL` | Production, Preview | Dirección del video de portada. Vacía, la portada usa el archivo del repositorio. Ver `docs/VIDEO-PORTADA.md`. |
| `RESEND_API_KEY` | Production, Preview | Clave de [resend.com](https://resend.com/api-keys). **Sin ella el formulario de voluntariado no envía nada**: la persona llena todo, le da a enviar, y ve el teléfono de la fundación como salida. |
| `EMAIL_FROM` | Production, Preview | Remitente de los correos. Tiene que ser de un dominio verificado en Resend — p. ej. `web@artfoundation-x-pwd.com`. Un remitente sin verificar hace que los correos caigan en spam o se rechacen. |

El kill switch es *fail-open*: si estas variables faltan o el panel no
contesta, el sitio sigue en pie. Una fundación no se cae por un fallo de
nuestra infraestructura. Pero entonces el botón de apagar tampoco funciona,
así que conviene cargarlas bien.

### Dominio

Mientras se prueba, se usa el `.vercel.app` que da Vercel. El dominio real
`artfoundation-x-pwd.com` **no se apunta acá todavía**: hoy sirve el
WordPress viejo y hay 75 direcciones indexadas. Se mueve recién cuando la
tabla de 301 de `next.config.ts` esté cruzada con Search Console
(ver `docs/mapa-urls.md`).

---

## 2 · Darme acceso de lectura

No puedo crear la cuenta ni conectar el repositorio por ti. Lo que sí puedo,
con un token, es leer: ver si un despliegue compiló, leer el log de error
cuando falla, comprobar qué variables existen y si el dominio quedó
verificado. Eso ahorra el ida y vuelta de "no funciona" / "pásame la captura".

1. Ir a [vercel.com/account/tokens](https://vercel.com/account/tokens).
2. Crear un token con el alcance más chico que sirva (el proyecto, no toda
   la cuenta) y vencimiento corto.
3. Guardarlo como variable de entorno **del entorno de Claude Code**
   (Settings → Environments → variables de entorno), con el nombre
   `VERCEL_TOKEN`. Si la cuenta es de equipo, agregar también
   `VERCEL_TEAM_ID`.

**Que no pase:** el token no va en este repositorio, ni en `.env.example`, ni
pegado en el chat. Un token pegado en una conversación queda escrito ahí para
siempre; una variable de entorno se rota y se acabó.

### Después, esto ya funciona

```bash
node scripts/vercel.mjs whoami                  # confirmar que el token sirve
node scripts/vercel.mjs projects                # proyectos y estado de producción
node scripts/vercel.mjs deployments             # últimos 10 despliegues
node scripts/vercel.mjs deployment <id>         # detalle de uno
node scripts/vercel.mjs logs <id>               # el log de construcción
node scripts/vercel.mjs env art-foundation      # NOMBRES de variables, nunca valores
node scripts/vercel.mjs domains art-foundation  # dominios y si están verificados
```

`scripts/vercel.mjs` hace **solo peticiones GET**. No despliega, no borra, no
cambia variables, y nunca imprime el valor de una variable de entorno — solo
su nombre y en qué ambiente vive. Si alguna vez hace falta ver un valor, se
mira en el panel con tu cuenta, no desde un script cuya salida puede terminar
copiada en cualquier lado.
