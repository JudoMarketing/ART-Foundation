"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Video de fondo de la portada.
 *
 * Un video que se mueve solo detrás del texto es de las cosas que más daño
 * hacen si se hacen mal. Aquí se hace con cuatro reglas:
 *
 * 1. **Si el visitante pidió menos movimiento, el video no arranca.** Se
 *    queda en el primer fotograma, quieto. No es una preferencia estética:
 *    para alguien con trastorno vestibular o epilepsia fotosensible, es
 *    salud.
 * 2. **Siempre hay un botón para pararlo**, visible y alcanzable con
 *    teclado. WCAG 2.2.2 lo exige para cualquier cosa que se mueva más de
 *    cinco segundos, y aquí además es de sentido común.
 * 3. **Encima del video no va ni una letra.** Antes iba: el título de la
 *    portada se apoyaba sobre el video, y para que se leyera había que
 *    taparlo con una capa oscura, porque un video cambia de brillo cuadro a
 *    cuadro y el contraste no se puede medir sobre algo que se mueve.
 *
 *    Ahora el video vive en su propio panel, al lado del texto y no debajo.
 *    Con eso se arreglan tres cosas de una: el contraste deja de ser un
 *    problema que hay que administrar, el video se ve entero en vez de
 *    oscurecido al 80%, y la portada deja de ser un rectángulo negro de
 *    pantalla completa.
 *
 *    (De paso: la capa vieja estaba declarada como `bg-gradient-to-r`, que es
 *    el nombre de Tailwind 3. En la 4 se llama `bg-linear-to-r`, así que esa
 *    clase no existía y no se generaba nada. O sea que la capa que
 *    garantizaba el contraste no estaba puesta, y el texto blanco venía
 *    apoyado directamente sobre el video.)
 * 4. **Sin sonido y sin depender del video.** Si no carga, si el navegador
 *    lo bloquea o si todavía no existe, queda el fondo pintado y la página
 *    se ve igual de bien.
 */
export default function HeroVideo({
  src,
  poster,
  labelPlay,
  labelPause,
}: {
  src?: string;
  poster?: string;
  labelPlay: string;
  labelPause: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    const quiet = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (quiet.matches) {
      v.pause();
      setPlaying(false);
      return;
    }
    v.play()
      .then(() => setPlaying(true))
      .catch(() => setPlaying(false)); // el navegador puede bloquearlo; no pasa nada
  }, [ready]);

  function toggle() {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      v.play().then(() => setPlaying(true)).catch(() => {});
    } else {
      v.pause();
      setPlaying(false);
    }
  }

  return (
    <>
      {/* Fondo pintado. Existe siempre, haya video o no: si el video no
          carga, si el navegador lo bloquea o si todavía no existe, el panel
          se ve igual de vivo. */}
      <div aria-hidden="true" className="hero-blobs absolute inset-0" />

      {src && (
        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-cover"
          src={src}
          poster={poster}
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden="true"
          tabIndex={-1}
          onLoadedData={() => setReady(true)}
        />
      )}

      {src && (
        <button
          type="button"
          onClick={toggle}
          /* Sigue siendo oscuro y opaco, y ahora que el respaldo del panel es
             claro eso importa más, no menos: el botón se apoya sobre el video,
             que cambia de brillo cuadro a cuadro, así que tiene que traer su
             propio fondo entero. `bg-ink/80` dejaba pasar el video por detrás
             de la letra blanca. */
          className="tap absolute bottom-4 right-4 z-20 inline-flex items-center gap-2 rounded-full bg-ink px-4 py-2 text-sm font-semibold text-paper shadow-lg transition-transform hover:scale-[1.04]"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true" fill="currentColor">
            {playing ? (
              <><rect x="2" y="1.5" width="3.5" height="11" rx="1" /><rect x="8.5" y="1.5" width="3.5" height="11" rx="1" /></>
            ) : (
              <path d="M3 1.8l9 5.2-9 5.2z" />
            )}
          </svg>
          {playing ? labelPause : labelPlay}
        </button>
      )}
    </>
  );
}
