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

`hero.mp4` — 0.87 MB, H.264, sin audio, 1280×720, 8 segundos. Cumple la
tabla. Son manos tocando la guitarra: sin caras, que es exactamente lo que
conviene (ver `docs/VIDEO-PORTADA.md`).

## El códec: esto es lo que hay que revisar antes de subir otro

**El video tiene que ser H.264 (`avc1`).** No es un detalle técnico menor.

La versión que estuvo subida un rato venía en **H.265 / HEVC**, que es lo que
exportan por defecto los iPhone y varios editores. Se ve perfecto en Safari y
en un Mac — y **no se ve en Firefox, ni en Chrome en Linux, ni en buena parte
de los Android**. O sea: se prueba en el teléfono de uno, funciona, y está
roto para media internet sin que nadie se entere.

Cómo comprobar qué códec trae un archivo:

```
ffprobe -v error -select_streams v -show_entries stream=codec_name hero.mp4
```

Si dice `hevc` en vez de `h264`, hay que convertirlo:

```
ffmpeg -i entrada.mp4 -an -c:v libx264 -profile:v high -pix_fmt yuv420p \
       -crf 26 -preset slow -movflags +faststart hero.mp4
```

Ese comando hace las cuatro cosas de una: pasa a H.264, quita el audio
(`-an`), comprime, y mueve el índice al principio del archivo
(`+faststart`) para que empiece a verse antes de terminar de descargarse.
Convirtiendo así, la versión de 3.5 MB en H.265 quedó en 0.87 MB sin
diferencia visible en pantalla.

Ver `docs/VIDEO-PORTADA.md` para el detalle.
