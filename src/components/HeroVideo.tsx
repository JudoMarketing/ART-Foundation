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
 * 3. **El texto nunca va directo sobre el video.** Va sobre una capa oscura
 *    que garantiza el contraste pase lo que pase en la imagen — un video
 *    cambia de brillo cuadro a cuadro y el contraste no se puede medir
 *    sobre algo que se mueve.
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
          carga, si el navegador lo bloquea o si todavía no existe, la
          portada se ve igual de viva. */}
      <div aria-hidden="true" className="absolute inset-0 bg-ink">
        <div className="hero-blobs absolute inset-0" />
      </div>

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

      {/* La capa que garantiza el contraste del texto. Más oscura a la
          izquierda, que es donde vive el título.

          Con video hace falta más capa, porque un video cambia de brillo
          cuadro a cuadro y el contraste no se puede medir sobre algo que se
          mueve. Sin video, el fondo pintado ya es nuestro y se conoce su
          luminancia, así que la capa puede ser mucho más liviana y dejar
          ver el color. */}
      <div
        aria-hidden="true"
        className={
          src
            ? "absolute inset-0 bg-gradient-to-r from-ink/92 via-ink/80 to-ink/60"
            : "absolute inset-0 bg-gradient-to-r from-ink/85 via-ink/60 to-ink/35"
        }
      />

      {src && (
        <button
          type="button"
          onClick={toggle}
          className="tap absolute bottom-5 right-5 z-20 inline-flex items-center gap-2 rounded-full border border-white/35 bg-ink/80 px-4 py-2 text-sm font-semibold text-paper backdrop-blur transition-colors hover:bg-ink"
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
