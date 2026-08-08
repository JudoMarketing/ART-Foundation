# El video de la portada

El sitio ya está preparado para recibirlo. Cuando exista el archivo, se pone
su dirección en la variable `NEXT_PUBLIC_HERO_VIDEO_URL` y aparece solo. Si
la variable está vacía, la portada usa el fondo pintado y se ve igual de
bien — el video suma, no sostiene.

---

## El prompt para HeyGen

Va en inglés porque estos generadores responden mejor así.

> **Prompt principal**
>
> Cinematic slow-motion montage on a bright white studio background,
> shot from above and at close range. Real human hands of different ages
> and skin tones making art together: a brush loading magenta paint and
> sweeping it across white paper; fingers pressing cyan and yellow
> pigment onto a canvas; two hands passing a paintbrush to each other;
> a hand steadying a child's hand as it draws a curved line; palms
> covered in green and pink paint pressing onto white; a hand strumming
> nylon guitar strings; hands shaking a pair of maracas. Paint splashes
> and colored powder drift softly through the air against the white
> background. Warm natural daylight, soft shadows, shallow depth of
> field. The mood is joyful, calm and generous — helping, not
> performing. Colors are saturated and vivid: magenta, cyan, lime green,
> warm orange. No faces, no text, no logos, no watermarks. Camera moves
> slowly and steadily, never shaky.
>
> **Negative prompt**
>
> faces, portraits, people looking at camera, text, letters, captions,
> logos, watermarks, dark background, gloomy lighting, fast cuts, strobe,
> flashing lights, rapid flicker, shaky camera, clutter, medical or
> clinical setting, sad expressions

### Por qué está escrito así

**Sin caras.** Dos razones. Una legal: una cara reconocible en la portada de
una fundación que trabaja con menores necesita autorización, y una cara
generada por computadora que se parezca a alguien real es un problema que no
vale la pena. Y una honesta: son manos haciendo arte, que es exactamente lo
que la fundación hace. Cuando haya fotos reales de los estudiantes con su
permiso, esas van a valer más que cualquier video generado.

**Sin texto ni letras.** Todo el texto va en la página, en HTML. Texto
quemado dentro de un video no lo lee un lector de pantalla, no se traduce al
español, no se puede agrandar y se ve borroso en pantallas grandes.

**Sin destellos ni cortes rápidos.** No es gusto: contenido que parpadea más
de tres veces por segundo puede provocar una convulsión (WCAG 2.3.1). En un
sitio para personas con discapacidad eso no se negocia. Por eso el prompt
pide movimiento lento y constante, y el negativo bloquea *strobe*,
*flashing* y *rapid flicker*.

**Fondo blanco.** Lo pediste tú y además funciona: el velo oscuro de la
portada convierte el blanco en un lienzo parejo, y los colores de la
fundación resaltan encima sin pelearse con el texto.

---

## Especificaciones del archivo

| | |
|---|---|
| Duración | 8 a 12 segundos, en bucle limpio (que el final empalme con el inicio) |
| Formato | MP4 (H.264) y, si se puede, WebM además |
| Resolución | 1920×1080 mínimo |
| Peso | **por debajo de 3 MB.** Es lo primero que carga la página |
| Audio | ninguno. El archivo va sin pista de sonido |
| Encuadre | la acción, en el tercio derecho: el texto vive a la izquierda |

Ese último punto importa. El título y los botones ocupan la mitad izquierda
de la portada y encima hay un velo oscuro. Si lo bueno del video queda a la
izquierda, no se va a ver.

---

## Cómo se conecta

1. Subir el archivo a `public/video/hero.mp4` (o a un CDN).
2. En Vercel, agregar:
   ```
   NEXT_PUBLIC_HERO_VIDEO_URL=/video/hero.mp4
   ```
3. Desplegar.

El componente `src/components/HeroVideo.tsx` se encarga del resto:

- **Si el visitante pidió menos movimiento** (`prefers-reduced-motion`), el
  video no arranca. Se queda quieto en el primer fotograma.
- **Siempre aparece un botón de pausa**, visible y alcanzable con teclado.
  WCAG 2.2.2 lo exige para cualquier cosa que se mueva más de cinco segundos.
- **El texto nunca va directo sobre el video**: va sobre un velo oscuro que
  garantiza el contraste. Un video cambia de brillo cuadro a cuadro y el
  contraste no se puede medir sobre algo que se mueve.
- **Si el video no carga o el navegador lo bloquea**, queda el fondo pintado
  y no se nota.
