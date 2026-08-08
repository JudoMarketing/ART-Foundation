# Aquí va el video de la portada

Nombre del archivo: `hero.mp4`

Después de ponerlo, agregar en las variables de entorno (Vercel, o
`.env.local` si es en tu máquina):

```
NEXT_PUBLIC_HERO_VIDEO_URL=/video/hero.mp4
```

Si la variable está vacía, la portada usa el fondo pintado y se ve bien
igual. El video suma, no sostiene.

## Antes de subirlo, revisar

| | |
|---|---|
| Peso | menos de 3 MB. Es lo primero que carga la página. |
| Audio | sin pista de sonido. El navegador bloquea lo que suena solo. |
| Duración | 8 a 12 segundos, en bucle limpio. |
| Encuadre | lo bueno del video, en el tercio derecho. El texto vive a la izquierda y encima lleva un velo oscuro. |

Si el archivo pesa más de 3 MB, no va en el repositorio. Se sube a Vercel
Blob o a un CDN y se pone la dirección completa en la variable.

Ver `docs/VIDEO-PORTADA.md` para el detalle.
