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
   reducidas de 4000 px a 1000 px en WebP, las nueve juntas pesan menos que
   uno solo de los originales. Ver `src/content/obra.ts`.

3. **Fotos de las clases.** Esto sí sigue faltando, y es distinto de la obra.
   En el WordPress hay **una sola** foto de clase (dos niñas en el escenario
   del teatro) y un volante de campamento con la cara de un niño.

   **No las usé, a propósito.** Son menores identificables, y el sitio nuevo
   pregunta el consentimiento de imagen en cada inscripción justamente porque
   esto importa. Publicar la cara de un menor porque estaba en el sitio viejo
   no es consentimiento: es haberla encontrado.

   Lo que hace falta: fotos de las clases **con el consentimiento firmado de
   cada familia que aparezca**, o fotos donde no se reconozca a nadie, manos
   trabajando, pinceles, el salón, la obra a medio hacer. Las de manos son
   las que mejor funcionan en un sitio así, y no necesitan permiso de nadie.

4. **El PDF de la carta de recomendación.** Pospuesto por el dueño para más
   adelante. Bloquea solo la firma digital de la fase 5, que está lejos.
5. **Logo en vectorial** (SVG o AI). Lo que hay en el sitio es una
   **reconstrucción** (`src/components/SiteLogo.tsx`): el marco de esquinas
   está a medida y es exacto, pero las letras se dibujan con la tipografía
   del sistema y no son las del logo original. Se ve bien y escala, pero no
   es el archivo. Cuando llegue el SVG bueno se reemplaza ese componente y
   nada más, el resto del sitio ya lo usa y no sabe cómo está hecho.

6. **El sello de Candid.** El *Gold Transparency 2025* está dibujado a mano
   en el pie porque se lo ganaron y tiene que verse. Pero el sello oficial lo
   entrega Candid con su propio código de inserción, y ese lleva al perfil de
   la organización. **Falta ese código** (o la dirección del perfil): hoy el
   sello va sin enlace, porque una dirección de perfil no me la puedo
   inventar.

7. **Confirmar la regla de los 30 días.** Una pieza vendida no se puede
   retirar del sitio hasta 30 días después de la venta, y pasa a la categoría
   "Ya vendidas" con la cuenta a la vista. Está montado
   (`DIAS_MINIMOS_EN_VITRINA` en `src/content/obra.ts`) y hoy no hay ninguna
   pieza marcada como vendida, marcarlo a mano sería decir que la obra de un
   estudiante se vendió cuando no. Lo escribirá la compra en la fase 6.

8. **El porcentaje que va al estudiante.** La tienda muestra hoy un **40% de
   marcador de posición** (`PORCENTAJE_ESTUDIANTE_PROVISIONAL` en
   `src/content/obra.ts`). El encargo pide que sea configurable por pieza
   desde el panel, y eso es la fase 6, pero el número que se muestre
   mientras tanto tiene que ser uno real. **La tienda no se publica con
   precios hasta que ese número esté decidido.**
9. **Los enlaces reales de Instagram y Facebook.** Los que están en el código
   los deduje del nombre; hay que verificarlos antes de publicar.
10. **Acceso al WordPress actual.** La API de medios estaba abierta y por ahí
   salió la obra. **Ya no:** el sitio devuelve una pantalla de "One moment,
   please…" a los pedidos automáticos. Por eso el logo, el sello y el fondo
   del pie (que son archivos del tema, no de la biblioteca) hubo que
   rehacerlos. Para los artículos del blog de la fase 5 va a hacer falta
   acceso de verdad.

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
y cuándo, sin eso, dentro de un año no hay forma de probar qué aceptaron.

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

## Autocrítica del diseño

Las tres de la ronda anterior están resueltas:

1. ~~Los cuatro círculos de la portada.~~ Ahora hay video en la portada y una
   galería con seis piezas de estudiantes.
2. ~~Casi todo eran tarjetas.~~ Las tres clases pasaron a ser un mostrador con
   precios que cambian, y el sábado se ve como una línea de tiempo.
3. ~~El blog vacío decía "vienen en camino".~~ Ahora dice que no hay nada
   publicado, que es la verdad, y muestra obra mientras tanto.

**Lo que sigue en pie:**

4. **El sitio sigue sin una sola foto de gente.** La obra levantó mucho, pero
   una fundación que enseña a personas es, al final, personas. Hoy no hay una
   sola cara ni una sola mano. Es el punto 3 de arriba y es lo que más falta.

5. **Ocho páginas terminan en un teléfono.** Donar, inscribirse, comprar y
   ser voluntario dicen todas "llámanos". Está bien dicho y es honesto, pero
   es el mismo callejón cuatro veces: sin Stripe y sin formularios, el sitio
   informa pero no cobra ni inscribe. Es exactamente lo que desbloquean las
   fases 2 a 4.
