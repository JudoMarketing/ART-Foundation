# ARTxpwd, plan por fases

Orden pensado para que el dinero entre lo antes posible y lo complicado
venga después. Las donaciones y las inscripciones son las dos metas; todo lo
demás las apoya.

Cada fase se entrega funcionando. No hay fase que dependa de una futura para
servir de algo.

El encargo original, con las palabras del dueño, está en `docs/BRIEF.md`.
Todo lo de acá sale de ahí.

---

## Fase 0 · Esqueleto ✅ HECHO

Lo que ya está construido y compilando en este repositorio.

- Next.js 15 + Tailwind 4, TypeScript en modo estricto
- **Dos idiomas** con inglés de base: `/clases` en inglés, `/es/clases` en
  español. Es el mismo esquema del WordPress actual, para no perder lo
  indexado.
- **Sistema de marca** sacado del sitio actual y corregido donde fallaba
  contraste (ver `docs/MARCA.md`)
- **Base de accesibilidad**: salto al contenido, foco visible en todo,
  `prefers-reduced-motion`, menú móvil que cierra con Escape y devuelve el
  foco, idioma correcto en `<html lang>` por página
- **Kit de Judo instalado**: kill switch (encender/apagar desde tu portal) y
  el pie con "Website por Judo Marketing"
- **Página de inicio** completa en los dos idiomas
- **Barra de idiomas con banderas** (EE. UU. / España, las del sitio actual),
  siempre acompañadas del código EN/ES: una bandera de 18px sola no la
  distingue alguien con baja visión, y una bandera es un país, no un idioma
- **Términos y condiciones** en los dos idiomas, con versión fechada
  (`/terms`), borrador, pendiente de revisión legal
- **Tabla de redirecciones 301** desde las direcciones viejas de WordPress
- Aviso legal obligatorio de Florida y número de registro CH73874 en el pie

**Verificado, no asumido:** auditoría axe-core contra WCAG 2.1/2.2 AA sobre
las dos versiones de la portada → **0 violaciones**, 22 reglas pasadas, y
recorrido con teclado con foco visible en los 14 primeros elementos.

---

## Fase 1 · El sitio público completo

Las páginas que hoy son solo enlaces en el menú.

| Página | Qué lleva |
|---|---|
| Nosotros | Misión, los 4 pilares, el modelo ABArt, liderazgo, junta, aliados |
| Clases | Las tres clases con su detalle, horario, lugar y precio |
| Donar | Formulario de donación, a dónde va el dinero, lista de materiales |
| Tienda | Catálogo (todavía sin cobrar) |
| Voluntariado | Qué se hace, el formulario de postulación, y el aviso de seguimiento |
| Pasantías | La convocatoria, con el mismo aviso |
| Blog | Listado y página de artículo (todavía sin panel) |
| Contacto | Formulario, mapa, las dos direcciones |
| Accesibilidad | Declaración de accesibilidad, obligatoria en un sitio así |
| Términos | ✅ borrador listo en `/terms`. Falta revisión legal. |
| Privacidad | La que hay que aceptar al inscribirse |

**El aviso de seguimiento va en la página pública, no en el portal.** El
encargo pide avisarle al voluntario que todo lo que haga con la fundación
queda registrado. Ese registro es lo que después permite la carta de
recomendación con horas firmadas, o sea que es a favor del voluntario, no en
su contra, y así hay que escribirlo. Pero se dice **antes** de que se postule,
en la misma página donde está el formulario. Enterarse después de que te
estaban midiendo es otra cosa.

Se migra el contenido del WordPress actual quitando lo repetido. El sitio de
hoy repite el mismo bloque de "Support" y "Contact us" en cada página; eso
desaparece porque ya vive en el pie.

**Al terminar la fase 1 el sitio ya puede reemplazar al WordPress**, aunque
todavía no cobre.

---

## Fase 2 · Inscripciones a clases

El corazón del proyecto.

**El formulario pregunta primero: ¿te inscribes tú, o inscribes a alguien a
tu cargo?**

- **Para mí** → solo los datos de esa persona
- **Para mi hijo/a** → datos del cuidador **y** datos del estudiante

Después:

1. Elegir clases: Arte, Teatro, Guitarra, una, dos o las tres
2. **¿Necesita terapeuta uno a uno?** Si marca que sí, se provee sin costo.
   Esa casilla no cambia el precio ni saca al estudiante del grupo.
3. Aceptar términos y condiciones (casilla obligatoria, con el texto
   enlazado y legible antes de aceptar)
4. Confirmación por correo

El formulario se construye en pasos cortos, con una sola pregunta grande por
pantalla, porque lo va a llenar gente muy distinta entre sí. Guarda lo
escrito: si alguien se va a la mitad, al volver no empieza de cero.

**Consentimiento de imagen.** Va en toda inscripción, la del padre y la de
quien se inscribe solo:

- «Sí, está bien que mi hijo sea fotografiado o grabado»
- «No, no quiero que mi hijo sea fotografiado o grabado»

Si elige **No**, la pantalla le explica ahí mismo que la fundación hace
eventos y shows públicos que sí se graban, y que para esos casos se le pedirá
autorización de nuevo por separado. Decir que no a las clases no deja a nadie
fuera de los eventos.

Cada inscripción guarda **qué versión de los términos aceptó y cuándo**.

---

## Fase 3 · Donaciones con Stripe

- Botón de donar en todo el sitio, y montos sugeridos
- Donación única y donación mensual
- **Recibo por correo al donar**, con el número 501(c)(3) y el registro
  CH73874, para que el donante lo use en sus impuestos
- En la página de gracias: enlace a Instagram, Facebook y al blog, "mira a
  dónde va tu dinero"
- Texto claro de a dónde va: materiales, paseos y becas

Necesita la cuenta de Stripe non-profit cuando lleguemos aquí.

---

## Fase 4 · Cobro de las clases

Suscripción recurrente por Stripe para las inscripciones de la fase 2.
Va después de las donaciones porque una donación es un pago simple y una
suscripción es un pago con estados: al día, vencido, cancelado, en pausa.

- Suscripción por clase, con descuento si toma dos o tres (a definir)
- Portal para que la familia cambie su tarjeta o cancele sin llamar
- Aviso al administrador cuando un pago falla

---

## Fase 5 · Portal del administrador (Mónica)

Un solo lugar desde donde se maneja la fundación.

**Voluntarios y pasantes**
- Lista de postulaciones con su estado: nueva, aceptada, rechazada, **en cola**
- Al poner a alguien en cola: se le manda correo con **su posición en la
  cola** y un estimado de cuándo lo van a llamar
- Registro de horas, cargado por Mónica
- **Firma digital de la carta de recomendación**: Mónica pone las horas, el
  sistema llena el PDF que ya está preparado, ella firma desde el portal y
  sale el documento listo
- En la postulación, el voluntario declara: si está certificado en algo o
  certificándose, y si lo hace por experiencia laboral o por ayudar a la
  comunidad

**Blog**
- Escribir y publicar sin tocar código: título, subtítulos, texto, imágenes,
  video, fecha y categoría
- Es lo que va a hacer que el sitio suba en Google con el tiempo

**Panel**
- Ventas de la tienda, donaciones, inscripciones, visitas al sitio,
  voluntarios activos y en cola

Necesita el PDF de la carta de recomendación con sus campos cuando lleguemos
aquí.

---

## Fase 6 · Tienda con cobro

- Piezas de arte de los estudiantes, con foto y ficha
- **Porcentaje que va al estudiante**, configurable por pieza desde el panel
  y **visible en la página de la pieza** ("el 40% de esta venta va a Ana")
- Al confirmar la compra, pantalla de **"Haz una donación a este estudiante"**
- Explicación de a dónde va el resto: materiales, paseos y becas

---

## Fase 7 · Mudanza y SEO

La que no se puede improvisar.

1. Cruzar la tabla de 301 con el informe de Páginas de Search Console
2. Apuntar el dominio al sitio nuevo
3. Subir el sitemap nuevo
4. Vigilar los errores 404 las dos primeras semanas
5. Probar el kill switch: apagar → ver la mascota → prender

---

## Fase 8 · Auditoría de accesibilidad de verdad

Las herramientas automáticas encuentran cerca de un tercio de los problemas
reales. El resto se encuentra usando el sitio.

- Recorrido completo con lector de pantalla (NVDA y VoiceOver)
- Sitio entero solo con teclado, sin ratón
- Zoom al 200% y al 400% sin que se rompa nada
- Y lo que más vale: **probarlo con estudiantes de la fundación**

---

## Lo que NO lleva este sitio

- **Métricas al panel de Judo.** El dueño lo pidió así: la fundación maneja su
  propio presupuesto y las cifras se ven en el portal del administrador, no
  en judomarketing.net. Del kit solo se usa el kill switch.
- **Costo mensual.** Es sin fines de lucro y va sin cobro.
- **Vendedor asignado.** No hay.
