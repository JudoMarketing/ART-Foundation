# Pendientes

Solo lo que hace falta **ahora**. Lo que corresponde a fases más adelante
está anotado dentro de su fase en `docs/FASES.md`, no aquí: no tiene sentido
pedir la cuenta de Stripe mientras estamos en lo visual.

---

## 🔴 Contradicción con el encargo original — bloquea la fase 4

El prompt inicial (`docs/BRIEF.md`) dice, textual:

> Los costos tomalos del website original. **Las clases son subscripciones
> que se pagan semanal.**

Y el sitio hoy cobra **$100 al mes**. Las dos cosas juntas no cierran:

| Lectura | Sale | Al mes |
|---|---|---|
| $100 **mensual** (lo que publica el sitio actual, y lo que está en el código) | $100 | $100 |
| $100 **semanal** (la cadencia del encargo) | $100 × 4.33 | **$433** |

Cuatro veces más. Y el mismo encargo pide que las clases sean *«por muy bajo
costo»*, así que $433 al mes por una clase de una hora los sábados va en
contra de lo que se pidió.

**Mi lectura:** el precio ($100, sacado del sitio actual) es el correcto y la
palabra «semanal» se arrastró de los otros sitios de Judo, donde sí se cobra
así. Pero no es mío decidirlo — es dinero de familias.

Hoy no rompe nada porque todavía no se cobra: `priceCents: 10_000` está en el
código y la fase 4 (Stripe para clases) no empezó. **Se decide antes de
conectar Stripe, no después.**

Lo mismo, más chico, con el horario. El encargo decía Arte 10–11, Teatro
12–1, Guitarra 1–2. Lo que está en el código — Arte 9:30–11:00, Teatro
11:30–13:00, Guitarra 13:00–14:00, todo los sábados — se confirmó después y
es lo que vale. Lo dejo anotado para que la diferencia no parezca un error.

---

## ✅ Resuelto

| Tema | Decisión |
|---|---|
| Precio | **$100** por clase, materiales incluidos. Como lo publica el sitio actual. ⚠️ La cadencia (mensual o semanal) está en disputa, arriba. |
| Horario | **Sábados**: Arte 9:30–11:00, Teatro 11:30–1:00, Guitarra 1:00–2:00. Reemplaza al horario del encargo original. |
| Guitarra | Va, aunque no exista en el sitio actual. |
| Métricas | El sitio **no** reporta al panel de Judo. Solo apagar y prender. |
| Barra de idiomas | Con banderas: EE. UU. e España, las mismas del sitio actual. |
| Consentimiento de imagen | Sí / No en cada inscripción. Si es No, se le explica lo de los eventos públicos. |

---

## 🔴 Para seguir con lo visual (fase 1)

1. ~~**Que el repositorio me quede visible.**~~ ✅ Resuelto. El código está en
   `JudoMarketing/ART-Foundation` y lo alcanzo. Para leer los despliegues de
   Vercel falta un token: ver `docs/VERCEL.md`.
2. **El PDF de la carta de recomendación.** El encargo dice «un documento que
   te voy a subir, que ya esta preparado y ya tiene los campos para firma».
   No llegó al repositorio. Sin él no se puede construir la firma digital de
   la fase 5.
3. **Fotos.** Es lo que más levanta el sitio. Obra de los estudiantes y fotos
   de las clases. Hoy la portada tiene un dibujo de círculos de color porque
   no hay imágenes — y en el sitio de una fundación de arte eso se nota.
4. **Logo en vectorial** (SVG o AI). Hoy solo existe como imagen.
5. **Los enlaces reales de Instagram y Facebook.** Los que están en el código
   los deduje del nombre; hay que verificarlos antes de publicar.
6. **Acceso al WordPress actual** (administrador), para sacar las imágenes,
   las galerías y los artículos del blog sin volver a escribirlos.

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

1. **Descuento por tomar dos o tres clases.** Como van seguidas el mismo
   sábado, muchas familias van a tomar más de una. ¿$300 por las tres o hay
   precio combinado?
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
