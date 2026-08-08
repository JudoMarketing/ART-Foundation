# Aquí va el video de la portada

Nombre del archivo: **`hero.mp4`**. El nombre importa: la portada lo busca en
`/video/hero.mp4` cuando no hay variable de entorno puesta. El archivo estuvo
un tiempo como `hero.mp4.mp4` —con la extensión repetida— y por eso no se
reproducía.

Para servirlo desde otro lado (Vercel Blob, un CDN), se pone la dirección
completa en las variables de entorno de Vercel o en `.env.local`:

```
NEXT_PUBLIC_HERO_VIDEO_URL=https://…/hero.mp4
```

Esa variable manda sobre el archivo del repositorio. Y si el video no carga,
si el navegador lo bloquea o si el archivo no está, la portada usa el fondo
pintado y se ve bien igual. El video suma, no sostiene.

## Antes de subirlo, revisar

| | |
|---|---|
| Peso | menos de 3 MB. Es lo primero que carga la página. |
| Audio | sin pista de sonido. El navegador bloquea lo que suena solo. |
| Duración | 8 a 12 segundos, en bucle limpio. |
| Encuadre | lo bueno del video, en el tercio derecho. El texto vive a la izquierda y encima lleva un velo oscuro. |

Si el archivo pesa más de 3 MB, no va en el repositorio. Se sube a Vercel
Blob o a un CDN y se pone la dirección completa en la variable.

## El archivo que hay hoy

`hero.mp4` — **6.4 MB, con pista de audio**. Es H.264 con AAC, así que se ve
en cualquier navegador, pero incumple dos de las cuatro reglas de la tabla:
pesa más del doble de lo que debería y trae sonido que nadie va a oír (la
portada lo reproduce en silencio, es la única forma de que un navegador deje
que un video arranque solo).

Comprimirlo y quitarle el audio lo dejaría cerca de 1.5 MB sin que se note la
diferencia en pantalla:

```
ffmpeg -i hero.mp4 -an -vf scale=1600:-2 -c:v libx264 -crf 28 -preset slow hero-web.mp4
```

Vale la pena: es lo primero que carga la página, y quien entra desde un
teléfono con datos lo paga.

Ver `docs/VIDEO-PORTADA.md` para el detalle.
