# Marca y accesibilidad

La paleta y la tipografía salen del sitio actual. Lo que cambió, cambió
porque no pasaba contraste, no por gusto.

## La paleta, medida

El magenta `#eb008b` es el color de la fundación y se conserva. Pero medido
contra WCAG 2.2:

| Color | Sobre blanco | ¿Sirve para texto? (pide 4.5:1) |
|---|---|---|
| `#eb008b` magenta de marca | **4.28:1** | ❌ no |
| `#00adeb` celeste | 2.57:1 | ❌ no |
| `#a5cd39` verde | 1.84:1 | ❌ no |
| `#f0a44a` naranja | 2.08:1 | ❌ no |

Ninguno de los cuatro sirve para texto. Y tres de ellos ni siquiera llegan a
3:1, que es el mínimo para un borde o un icono que signifique algo.

La solución no fue cambiar la marca: fue **oscurecer cada color manteniendo
su tono**, y separar los usos.

| Uso | Token | Valor | Contraste |
|---|---|---|---|
| Relleno de marca, iconos, bordes | `brand` | `#eb008b` | 4.28:1 ✓ (pide 3) |
| Texto, enlaces, botón sólido | `brand-ink` | `#b3006b` | 6.71:1 ✓ |
| Hover del botón | `brand-deep` | `#85004e` | 9.97:1 ✓ |
| Celeste legible | `sky-ink` | `#00607f` | 7.05:1 ✓ |
| Verde legible | `leaf-ink` | `#4a5f14` | 7.15:1 ✓ |
| Naranja legible | `sun-ink` | `#7a4a10` | 7.46:1 ✓ |
| Texto principal | `ink` | `#161922` | 17.55:1 ✓ |
| Texto secundario | `ink-soft` | `#4b5163` | 7.91:1 ✓ |

**La regla, en una frase:** los colores vivos son para rellenar, los `-ink`
son para leer.

## Tipografía

- **Domine** para títulos, es la del sitio actual, tiene carácter y se lee
  bien en tamaño grande.
- **Sans del sistema** para el cuerpo. No es pereza: en pantalla se lee más
  rápido que una serif, no hay descarga que esperar, y para alguien que lee
  despacio esa diferencia se nota.
- Interlineado 1.65. WCAG 1.4.12 pide que el texto aguante 1.5 sin romperse;
  se empieza por encima.

## Reglas de accesibilidad que no se negocian

Están en `src/app/globals.css` y aplican a todo el sitio.

1. **Foco visible siempre.** Anillo de dos capas (oscuro + blanco) para que
   se vea sobre cualquier fondo.
2. **`prefers-reduced-motion` se respeta.** Para alguien con trastorno
   vestibular una animación no es un adorno, es un mareo.
3. **Nada depende solo del color.** Los enlaces dentro de texto van
   subrayados. El idioma activo se marca con `aria-current`, no solo con
   fondo de color.
4. **Área táctil de 44px** en los controles (WCAG 2.2 pide 24; se da el
   doble, porque este sitio lo usa gente con dificultad motora).
5. **`<html lang>` correcto por página.** Si una página en español declara
   `lang="en"`, el lector de pantalla la lee con voz inglesa y no se entiende.
6. **Salto al contenido** como primer elemento enfocable.
7. **Sin carrusel automático.** El sitio actual usa Revolution Slider. Un
   carrusel que se mueve solo es de las cosas más hostiles que existen para
   quien lee despacio: el texto se va antes de que termine de leerlo.
8. **Modo de alto contraste de Windows** contemplado (`forced-colors`).

## Cómo se comprueba

```bash
npm run build && npm start          # en una terminal
node scripts/a11y-check.mjs         # en otra
```

Corre axe-core contra WCAG 2.0/2.1/2.2 nivel AA y hace un recorrido con
teclado comprobando que cada parada tenga foco visible.

**Última corrida:** portada en inglés y en español → **0 violaciones**, 22
reglas pasadas, 14/14 paradas de teclado con foco visible.

Y lo de siempre: esto encuentra como un tercio de los problemas reales. El
resto aparece cuando una persona usa el sitio. Eso es la fase 8.
