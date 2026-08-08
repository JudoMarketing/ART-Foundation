# Pendientes

Solo lo que hace falta **ahora**. Lo que corresponde a fases más adelante
está anotado dentro de su fase en `docs/FASES.md`, no aquí: no tiene sentido
pedir la cuenta de Stripe mientras estamos en lo visual.

---

## ✅ Resuelto

| Tema | Decisión |
|---|---|
| Precio | **$100 al MES** la primera clase, materiales incluidos. Confirmado por el dueño. El encargo original decía «se pagan semanal» (`docs/BRIEF.md`) y fue un error suyo: a $100 semanales serían $433 al mes por una clase de una hora los sábados, contra un encargo que pide «muy bajo costo». Queda cerrado: **mensual**. |
| Combos | Cada clase que se suma va a **mitad de precio**: 1 → $100, 2 → $150, 3 → $200. El descuento se aplica solo en la portada, sin cupón. |
| Horario | **Sábados**: Arte 9:30–11:00, Teatro 11:30–1:00, Guitarra 1:00–2:00. Reemplaza al horario del encargo original (que decía Arte 10–11, Teatro 12–1, Guitarra 1–2). |
| Obra en el sitio | Sacada del WordPress actual. Solo **obra**, no fotos de estudiantes. Crédito con iniciales. |
| Guitarra | Va, aunque no exista en el sitio actual. |
| Métricas | El sitio **no** reporta al panel de Judo. Solo apagar y prender. |
| Barra de idiomas | Con banderas: EE. UU. e España, las mismas del sitio actual. |
| Consentimiento de imagen | Sí / No en cada inscripción. Si es No, se le explica lo de los eventos públicos. |

---

## 🔴 Para seguir con lo visual (fase 1)

1. ~~**Que el repositorio me quede visible.**~~ ✅ Resuelto. El código está en
   `JudoMarketing/ART-Foundation` y lo alcanzo. Para leer los despliegues de
   Vercel falta un token: ver `docs/VERCEL.md`.
2. ~~**Obra de los estudiantes.**~~ ✅ Resuelto, y no hizo falta pedirla:
   estaba en el WordPress actual. Nueve piezas en `public/obra/`, sacadas de
   la biblioteca de medios (`/wp-json/wp/v2/media`, que está abierta) y
   reducidas de 4000 px a 1000 px en WebP — las nueve juntas pesan menos que
   uno solo de los originales. Ver `src/content/obra.ts`.

3. **Fotos de las clases.** Esto sí sigue faltando, y es distinto de la obra.
   En el WordPress hay **una sola** foto de clase (dos niñas en el escenario
   del teatro) y un volante de campamento con la cara de un niño.

   **No las usé, a propósito.** Son menores identificables, y el sitio nuevo
   pregunta el consentimiento de imagen en cada inscripción justamente porque
   esto importa. Publicar la cara de un menor porque estaba en el sitio viejo
   no es consentimiento: es haberla encontrado.

   Lo que hace falta: fotos de las clases **con el consentimiento firmado de
   cada familia que aparezca**, o fotos donde no se reconozca a nadie — manos
   trabajando, pinceles, el salón, la obra a medio hacer. Las de manos son
   las que mejor funcionan en un sitio así, y no necesitan permiso de nadie.

4. **El PDF de la carta de recomendación.** Pospuesto por el dueño para más
   adelante. Bloquea solo la firma digital de la fase 5, que está lejos.
5. **Logo en vectorial** (SVG o AI). Hoy solo existe como imagen.
6. **Los enlaces reales de Instagram y Facebook.** Los que están en el código
   los deduje del nombre; hay que verificarlos antes de publicar.
7. ~~**Acceso al WordPress actual.**~~ No hace falta credencial: la API de
   medios está abierta y por ahí salió la obra. Para los **artículos del
   blog** sirve igual (`/wp-json/wp/v2/posts`), cuando toque la fase 5.

---

## 🟠 Sobre los términos y condiciones

Ya está el borrador, en los dos idiomas, en `/terms`
(`src/content/terms.ts`). Cubre: quién puede inscribir, cuotas y cancelación,
apoyo uno a uno, información de salud, fotos y video, conducta en el salón,
voluntarios, tienda, donaciones, riesgo y cambios.

**Dos cosas antes de publicarlos:**

1. **Los tiene que ver un abogado con licencia en Florida.** No es formalismo
   de mi parte: hay menores, hay información de salud, y pedir donaciones en
   Florida es una actividad regulada. Yo puedo redactar el borrador; no puedo
   firmar que proteja legalmente a la fundación.
2. Confirmadas por el dueño y ya escritas: cancelar detiene el mes siguiente
   pero no devuelve el mes en curso; **si la fundación cancela una sesión no
   hay reposición ni abono**; en la tienda, la parte del artista menor se le
   paga al tutor, y **el permiso firmado del tutor lo gestiona la fundación
   con la familia**, no el sitio.

Cada versión del texto lleva fecha (`TERMS_VERSION`). Cuando se construyan
los formularios, cada inscripción va a guardar qué versión aceptó la familia
y cuándo — sin eso, dentro de un año no hay forma de probar qué aceptaron.

---

## 🟡 Preguntas de producto, cuando toque

No bloquean nada hoy. Las dejo escritas para no olvidarlas.

1. ~~**Descuento por tomar dos o tres clases.**~~ ✅ Resuelto: mitad de precio
   por cada clase que se suma. Está arriba, en la tabla.
2. **Edad mínima.** Teatro dice "de 7 años a adultos". ¿Arte y guitarra
   también?
3. **Cupos por clase.** El sitio actual dice "Space is limited". Si hay tope,
   la inscripción necesita lista de espera.
4. **Quién ve la información de salud.** En los términos escribí "el personal
   e instructores que trabajan con ese estudiante, y la administradora que
   asigna el apoyo". Confírmame que así es.
5. **Los artículos de blog en español** están hoy en el árbol de inglés
   (`/alimentacion-en-el-autismo/`). Al migrar hay que moverlos a `/es/` con
   su redirección.
6. **Lista de materiales de Blick.** El sitio actual la enlaza. ¿Se mantiene?

---

## Autocrítica del diseño (sigue en pie)

1. **La ilustración de la portada son cuatro círculos de color.** Es relleno.
   Ahí va obra de los estudiantes. Depende de la foto (punto 2 de arriba).
2. **Casi todo son tarjetas.** Cinco secciones de seis son rejillas
   parecidas. Las tres clases, que son lo más importante, merecen verse como
   una secuencia de horarios de un sábado y no como tres cajas iguales.
3. **La sección del blog está vacía.** Hasta que haya artículos, mejor
   quitarla que decir "vienen en camino".
