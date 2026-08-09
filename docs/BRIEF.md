# El encargo, tal cual

Este archivo existe porque el proyecto empezó en un chat y siguió en otro, y
entre sesión y sesión se pierde todo lo que no esté escrito en el
repositorio. El código sobrevivió; el encargo no. No vuelve a pasar.

**No se edita para "mejorarlo".** Es el texto original del dueño, con sus
palabras. Si una decisión cambia, cambia en `docs/PENDIENTES.md`, y ahí se
anota que cambió respecto de esto. Así siempre se puede ver la distancia
entre lo que se pidió y lo que se construyó.

---

## Prompt inicial

> Lo mismo que hicimos y haremos con todos los websites, lo dividiresmos en
> fases, te explico bien de que va el proyecto. Ponle la barra de los dos
> idiomas como siempre, que el idioma base sea el ingles.
>
> Es un programa sin fines de lucros al cual no les voy a cobrar, no va a
> tener costo, en este website las personas podran, registrar a sus hijos o a
> si mismos a sus clases de arte, que le pregunte al padre si el registro es
> para el o para el hijo, en ese caso toma la info del cuidador y la del
> estudiante, si es alguien registrandose a si mismo solo la info de esa
> persona. Van a tener que aceptar los terminos y condiciones.
>
> el sitio no se debe ver extremadamente complejo debe ser muy simple y
> accesible a otros porque este website es para personas con necesidades
> especiales, lo van a acceder personas que tienen impedimentos. Fisicos pero
> tambien personas regulares.
>
> Las personas pueden registrar su hijo en arte, teatro, o musica, o pueden
> elegir 2 o las 3, ya que se dan en horarios diferentes, seguidos uno detras
> del otro.
>
> Arte de 10am a 11am teatro de 12 a 1 y clases de guitarra de 1 a 2.
>
> Algo muy importante es que el website colecta donaciones, y eso debe ser
> gran parte, pueden donar o registrar a sus hijos a clases por muy bajo
> costo, especifica que no es solo para personas con necesidades especiales,
> tenemos adultos regulares y ninos regulares, la unica diferencia es que si
> en la pagina de registro marcan que su hijo necesita un terapeuta 1 a 1 se
> provee sin costo. Si no necesita ayuda puede hacerlo libre, por eso tenemos
> todo tipo de estudiante lo unico que cambia es el nivel de ayuda que
> reciben.
>
> En el voluntariado y las pasantias, informa que todo lo que hagan con
> nosotros sera trackeado. Lo que quiere decir que el admin del website desde
> su portal va a entrar, aceptar, negar, o enviar emails a un voluntario
> diciendo que esta en cola y su puesto en la cola, con un estimado de cuando
> sera convocado, que el admin que se llama monica pueda informarles esto.
> desde su portal. Cuando un voluntario termina, monica firma desde su portal
> digitalmente un documento que te voy a subir, que ya esta preparado y ya
> tiene los campos para firma y el texto, en este documento se muestra la
> cantidad de horas que el voluntario hizo, que sera agregado por monica y tu
> llenas eso en los campos, El PDF es un template que habla sobre lo bien que
> estubo el estudiante y el portque lo recomendamos para que sea contratado.
> Importante que el voluntario en sus campos diga si esta certificado en algo
> o se esta certificando para algo, si lo hace para experiencia laboral o si
> lo hace para ayudar a la comunidad.
>
> El blog, lo va a crear el admin desde su portal, asi que la pagina de BLOGS
> organizala bonita pero todo el contenido nuevo es generado por el admin,
> puede subir imagenes, videos, e informacion con titulos subtitulos. Fecha
> en que se posteo y la categoria a la que pertenece. Estos blogs luego nos
> van a ayudar a ir escalando en google.
>
> Tambien tienen una tienda virtual pestaña de Store. En donde se venden
> piezas de arte. De los estudiantes,
>
> Comentales que parte del dinero va al creador de la pieza y su compra nos
> ayuda a comprar materiales, hacer fieldtrips o paseos, y financiar
> estudiantes que no tienen el dinero para pagar nuestras clases (esto
> tambien agregalo en las donaciones) explica para que es usado el dinero.
>
> Comenzaremos a cobrar por stripe. Voy a crear una cuenta de non-profit.
>
> Oh, algo importante sobre las donaciones, dejales saber que al momento de
> donar le envias una forma por email a los donantes para que puedan declarar
> su donacion al momento de hacer impuestos. Y que si nos siguen en redes
> sociales pueden ver directamente donde estan yendo sus fondos, o a nuestro
> blog.
>
> el web debe tener botones para Instagram y facebook.
>
> Como siempre, creemos el esqueleto y este es tu prompt inicial de aqui
> parte todo.
>
> No me interesa ver las donaciones, a diferencia de los demas, este website
> no necesito metricas. Porque es una fundacion ellos manejan su budget.
>
> El nombre es el que aparece en el website. Lo que quiero es que tomes la
> paleta de colores del website, la informacion (solo para contexto, me
> parece que tiene demasiada) crea un borrador mas bonito, que no se vea
> slop, que se vea trabajado y hecho por un humano, que sea interactivo,
> agradable de navegar y muy intuitivo, se autocritico.
>
> Queremos lograr donaciones e inscripciones a clases.
>
> Los costos tomalos del website original. Las clases son subscripciones que
> se pagan semanal.
>
> el website tiene bastante informacion relevante que puedes usar, lo que sea
> repetitivo lo puedes quitar pero el website tiene cada pestaña bastante bien
> estructurada, te puedes enfocar mas en lo visual.
>
> No hay vendedores.
>
> Los costos no importan, solo permiteme apagarlo o prenderlo. desde mi
> portal de judo.
>
> El usuario de admin, permitele ver ventas, visitas al website, voluntarios y
> todo lo que un administrador de esta compañia que es sin fines de lucro le
> puedan interesar.
>
> Tambien cada articulo posteado que les pueda poner % que va al estudiante,
> y esto se pueda ver en el website, tambien que cuando el usuario compre,
> cuando le de confirmacion, les salga una pantalla. Make a donation to this
> specific student.
>
> Se que aun hay muchas cosas pendientes pero con esto podemos iniciar
> nuestro esqueleto y la estructura de fases. Lo que me falte agregalo como
> pendiente o agregalo a las fases y lo vamos haciendo poco a poco.

---

## Cómo se leyó esto

Tres cosas del encargo que no son obvias y que conviene no perder, porque son
las que se rompen primero cuando alguien "mejora" el sitio más adelante.

### 1 · «Simple y accesible» le gana a «interactivo»

El encargo pide las dos cosas: *muy simple y accesible* porque lo van a usar
personas con impedimentos, e *interactivo y agradable de navegar* para que no
se vea hecho a las apuradas. Tiran para lados distintos, y cuando chocan
**gana la accesibilidad**.

No es una preferencia de estilo. Es una fundación para personas con
discapacidad: un sitio sobre inclusión que no se pueda usar se contradice a
sí mismo. Que se vea trabajado se consigue con tipografía, ritmo, espacio y
buenas fotos, no con animaciones que hay que perseguir con el ratón.

### 2 · El sitio no es solo para personas con discapacidad

Es de las pocas frases del encargo que es, textualmente, una instrucción de
copia: *«especifica que no es solo para personas con necesidades
especiales»*. Hay adultos y niños sin discapacidad. **Lo único que cambia es
el nivel de apoyo**, y el terapeuta uno a uno es sin costo.

Ya está escrito en la portada, en los dos idiomas
(`src/content/copy.ts`). No se toca sin pensarlo dos veces: es la posición de
la fundación, no un texto de relleno.

### 3 · Métricas: dos portales distintos, no una contradicción

El encargo parece contradecirse: *«este website no necesito metricas»* y
después *«al admin permitele ver ventas, visitas al website, voluntarios»*.
No se contradice: son dos tableros.

| Portal | Qué ve |
|---|---|
| judomarketing.net (el dueño) | **Nada.** Solo el interruptor de apagar y prender. |
| Portal del administrador (Mónica) | Todo: ventas, donaciones, inscripciones, visitas, voluntarios. |

La fundación maneja su propio presupuesto. Por eso este sitio, a diferencia
de los demás de Judo, no reporta métricas al panel central.
