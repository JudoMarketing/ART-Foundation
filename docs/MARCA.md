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

## El color es acento, nunca superficie

Esta es la regla que rige todo el aspecto del sitio, y llegó después de una
corrección del cliente: **el primer borrador se veía infantil**.

El diagnóstico, concreto:

| Lo que había | Por qué leía como infantil |
|---|---|
| Cinco secciones de magenta a sangre, con el borde superior ondulado como papel rasgado | Color saturado a pantalla completa más un corte hecho a tijera |
| Tres bloques seguidos de magenta, cian y verde plenos | Cuatro colores saturados peleando entre sí es el lenguaje de un aula de jardín |
| Tarjetas con borde de 2px de un color distinto cada una | Una fila de tarjetas se leía como una caja de lápices |
| Botones en píldora completa, tres colores distintos en la misma pantalla | Botonera de juguete, y la acción principal no se distinguía |
| Veintisiete iconos de cuatro colores, a 80 y 96 píxeles | A ese tamaño y con esa paleta, imágenes prediseñadas |
| Esquinas de 20px y trama de puntos sobre los fondos claros | Redondeo de app de juegos y papel de cuaderno |

Ninguna de esas decisiones estaba mal por separado. Juntas daban una sola
lectura, y el sitio también lo miran adultos que están decidiendo dónde poner
su dinero y padres que deciden dónde dejar a su hijo.

### La corrección de la corrección

La primera pasada arregló el problema y creó otro: sacó el color saturado y
puso **secciones enteras de tinta casi negra** en su lugar, catorce en total,
más la portada. El dueño lo devolvió en una frase: *"esos negros están
terribles"*, y tenía razón otra vez.

El sitio que la fundación tiene hoy es luminoso, rosa y celeste. Ese ambiente
no era el problema. El problema era la **saturación**, no la claridad: un
magenta `#eb008b` a sangre grita, un rosa `#fce2f2` a sangre respira. Se puede
tener un sitio claro y cálido sin que parezca un aula de jardín, y eso es lo
que hay ahora: los tintes claros de la casa como superficie, y todo lo demás
de la corrección anterior (tipografía, filetes, esquinas chicas, iconos de un
tono, contención) intacto.

El negro se quedó donde le corresponde: en la letra y en el botón principal.

**La regla nueva:**

- **Superficies: cuatro, y todas claras.** Papel (`#ffffff`), papel cálido
  (`#f6f3ed`), rosa pálido (`#fce2f2`) y celeste pálido (`#dff5fd`). Toda
  sección es una de esas cuatro. El ritmo de la página sale de alternarlas y
  del aire entre ellas.
- **El magenta aparece en cosas chicas.** Un rótulo, un subrayado, el botón
  principal, la cifra de un monto, el aro de la clase que elegiste. Nunca un
  fondo grande.
- **El cian, el verde y el naranja plenos salieron del diseño.** Siguen
  definidos porque están dentro de los vectores, y el celeste sobrevive en su
  versión pálida como superficie. Ninguno viste una sección a saturación
  completa.
- **El color grande de la página lo pone la obra de los estudiantes.** Es lo
  mejor que tiene la fundación y antes competía contra un fondo magenta.
- **Esquinas de 6px, filetes de 1px.** No 20px y 2px de color.
- **La tinta (`#161922`) es color de LETRA, no de fondo.** Sobrevive en los
  botones principales y en el texto. Ninguna sección es negra.
- **Los iconos van en dos tonos del color del texto que tienen al lado**, y no
  pasan de 48px. La regla vive en `.icono-sobrio` y se aplica sola a los
  veintisiete desde `ArtIcons.tsx`.

## Tipografía

Cambió, y es lo que más se nota.

- **Instrument Serif** para los títulos grandes (`h1` y `h2`). Serif de
  contraste alto y trazo fino, del linaje de las revistas y los museos. Va en
  peso normal, con interletrado apretado (`-0.025em`): un título grande en
  peso normal se ve tranquilo, uno en negrita se ve gritando.
- **Inter** para todo lo demás: cuerpo, interfaz, formularios, y también los
  títulos chicos (`h3`, `h4`) en semi negrita. Nada que haya que leer despacio
  va en serif, y una serif fina a 20px se ve endeble además de leerse peor.
- Interlineado 1.65. WCAG 1.4.12 pide que el texto aguante 1.5 sin romperse;
  se empieza por encima.

Antes era **Domine** para todo lo que fuera título. Es una serif de bloque,
redondeada y amable, del tipo que usan las editoriales infantiles, y sumada al
color plano empujaba en la misma dirección equivocada.

**Dos trampas que ya están resueltas y conviene no volver a pisar:**

1. Instrument Serif tiene un solo peso. Sin `font-synthesis: none`, el
   navegador le inventa una negrita engordando el trazo cada vez que encuentra
   un `font-bold`, y esa negrita falsa es exactamente el aspecto barato que se
   estaba sacando. La regla está puesta en `globals.css` sobre `h1`, `h2` y
   `.font-display`.
2. Las dos familias se declaran en un bloque **`@theme inline`** separado. Un
   `@theme` normal que contenga un `var()` que Tailwind no conozca no da error:
   se cae el bloque entero en silencio. Eso ya pasó una vez, y dejó al sitio
   sin `bg-ink`, sin `text-paper` y sin un solo color de la marca.

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
