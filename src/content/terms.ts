/**
 * Términos y condiciones.
 *
 * ⚠️ BORRADOR. Lo escribí a partir de lo que hace la fundación: clases con
 * menores, terapeutas uno a uno, información de salud, fotos y video,
 * voluntarios con verificación de antecedentes, venta de obra de estudiantes
 * y donaciones deducibles en Florida.
 *
 * NO está revisado por un abogado, y aquí sí hace falta: hay menores de por
 * medio, hay datos de salud, y hay solicitación de donaciones en Florida,
 * que es una actividad regulada. Antes de publicar esto tiene que verlo
 * alguien con licencia en Florida.
 *
 * Cada inscripción y cada postulación guarda: la versión aceptada, la fecha
 * y quién aceptó. Por eso VERSION se sube cada vez que cambie el texto — sin
 * eso, dentro de un año no se puede probar qué aceptó una familia.
 */

export const TERMS_VERSION = "2026-08-08b";

export type TermsSection = {
  id: string;
  en: { title: string; body: string[] };
  es: { title: string; body: string[] };
};

export const TERMS: TermsSection[] = [
  {
    id: "who-we-are",
    en: {
      title: "Who we are",
      body: [
        "Art Foundation for People with Disabilities, Inc. (“ARTxpwd”, “we”, “us”) is a 501(c)(3) non-profit organization based in Miami-Dade County, Florida. Our Florida charitable registration number is CH73874.",
        "These terms apply to anyone who registers for a class, applies to volunteer or intern, buys from our store, or donates through this website.",
      ],
    },
    es: {
      title: "Quiénes somos",
      body: [
        "Art Foundation for People with Disabilities, Inc. (“ARTxpwd”, “nosotros”) es una organización sin fines de lucro 501(c)(3) con sede en el condado de Miami-Dade, Florida. Nuestro número de registro benéfico en Florida es CH73874.",
        "Estos términos aplican a toda persona que se inscriba a una clase, se postule como voluntario o pasante, compre en nuestra tienda o done a través de este sitio.",
      ],
    },
  },
  {
    id: "who-registers",
    en: {
      title: "Who may register",
      body: [
        "An adult registering for themselves must be 18 or older.",
        "A student under 18 must be registered by a parent or legal guardian. By completing the form, you confirm that you are that parent or legal guardian and that you have the authority to accept these terms on the student’s behalf.",
        "You are responsible for the accuracy of what you enter. If something changes, whether it is a phone number, a medication or a support need, tell us so we can keep the student safe.",
      ],
    },
    es: {
      title: "Quién puede inscribirse",
      body: [
        "Un adulto que se inscriba a sí mismo debe tener 18 años o más.",
        "A un estudiante menor de 18 años lo inscribe su padre, madre o tutor legal. Al completar el formulario, usted confirma que es esa persona y que tiene la autoridad para aceptar estos términos en nombre del estudiante.",
        "Usted responde por la exactitud de lo que escribe. Si algo cambia, sea un teléfono, un medicamento o una necesidad de apoyo, avísenos para poder cuidar al estudiante.",
      ],
    },
  },
  {
    id: "fees",
    en: {
      title: "Classes, fees and cancellation",
      body: [
        "Classes are held on Saturdays. Art runs 9:30–11:00 AM, Theatre 11:30 AM–1:00 PM, and Guitar 1:00–2:00 PM, at Vineyard Community Church, 12725 SW 122nd Ave, Miami, FL 33186.",
        "Each class costs $100 per month and includes materials. Enrollment is a monthly subscription that renews until you cancel.",
        "You may cancel at any time. Cancelling stops the next month’s charge; it does not refund the month already in progress.",
        "Space is limited. If a class is full we will offer a place on a waiting list.",
      ],
    },
    es: {
      title: "Clases, cuotas y cancelación",
      body: [
        "Las clases son los sábados. Arte de 9:30 a 11:00 AM, Teatro de 11:30 AM a 1:00 PM y Guitarra de 1:00 a 2:00 PM, en Vineyard Community Church, 12725 SW 122nd Ave, Miami, FL 33186.",
        "Cada clase cuesta $100 al mes e incluye los materiales. La inscripción es una suscripción mensual que se renueva hasta que usted la cancele.",
        "Puede cancelar cuando quiera. Cancelar detiene el cobro del mes siguiente; no devuelve el mes que ya está en curso.",
        "Los cupos son limitados. Si una clase está llena, ofrecemos un lugar en lista de espera.",
      ],
    },
  },
  {
    id: "support",
    en: {
      title: "One-on-one support",
      body: [
        "If a student needs a one-on-one therapist or aide, we provide one at no additional cost. You request it on the registration form.",
        "Asking for support does not change the price, the class, or the group the student is in. The only thing that changes is the level of help the student receives.",
        "Our programs are educational and arts-based. They are not medical treatment, and they do not replace therapy, medical care, or the services in a student’s IEP.",
      ],
    },
    es: {
      title: "Apoyo uno a uno",
      body: [
        "Si un estudiante necesita terapeuta o asistente uno a uno, se lo damos sin costo adicional. Se solicita en el formulario de inscripción.",
        "Pedir apoyo no cambia el precio, ni la clase, ni el grupo en el que está el estudiante. Lo único que cambia es cuánta ayuda recibe.",
        "Nuestros programas son educativos y basados en las artes. No son tratamiento médico y no sustituyen la terapia, la atención médica ni los servicios del IEP del estudiante.",
      ],
    },
  },
  {
    id: "health-info",
    en: {
      title: "Disability and health information",
      body: [
        "The registration form asks whether the student needs one-on-one support and about any condition we should know in order to keep them safe. That is sensitive information and we treat it that way.",
        "It is seen only by the staff and instructors who work directly with that student, and by the administrator who assigns support. We do not sell it, we do not share it with advertisers, and we do not publish it.",
        "We keep it while the student is enrolled and for as long afterwards as our records obligations require. You may ask us what we hold about a student, ask us to correct it, or ask us to delete it, by writing to info@artfoundation-x-pwd.com.",
      ],
    },
    es: {
      title: "Información de discapacidad y de salud",
      body: [
        "El formulario de inscripción pregunta si el estudiante necesita apoyo uno a uno y por cualquier condición que debamos conocer para cuidarlo. Esa información es sensible y la tratamos como tal.",
        "Solo la ven el personal y los instructores que trabajan directamente con ese estudiante, y la administradora que asigna el apoyo. No la vendemos, no la compartimos con anunciantes y no la publicamos.",
        "La guardamos mientras el estudiante esté inscrito y el tiempo posterior que exijan nuestras obligaciones de archivo. Puede pedirnos qué tenemos de un estudiante, pedir que lo corrijamos o que lo borremos, escribiendo a info@artfoundation-x-pwd.com.",
      ],
    },
  },
  {
    id: "media",
    en: {
      title: "Photos and video",
      body: [
        "We sometimes photograph and record our classes. We use those images to promote the programs and to show our donors where their money is going.",
        "Every registration asks you to choose. There are two options and neither one is wrong:",
        "“Yes, my child may be photographed or recorded.” Or, if you are registering yourself, “Yes, I may be photographed or recorded.”",
        "“No, I do not want my child to be photographed or recorded.” Or “No, I do not want to be photographed or recorded.”",
        "If you choose No: we will not use that student’s image in our promotional material. Please know that we also hold public events, shows and exhibitions that are photographed and filmed, sometimes by press or by the venue. For those specific occasions we will ask you for permission again, separately. Choosing No for classes does not keep anyone out of the events.",
        "You can change your answer at any time by writing to info@artfoundation-x-pwd.com. We will stop using new images right away. Material already printed or already published elsewhere may not be possible to withdraw.",
      ],
    },
    es: {
      title: "Fotos y video",
      body: [
        "A veces tomamos fotos y grabamos nuestras clases. Usamos esas imágenes para promover los programas y para mostrarles a nuestros donantes a dónde está llegando su dinero.",
        "Cada inscripción le pide elegir. Hay dos opciones y ninguna está mal:",
        "«Sí, está bien que mi hijo sea fotografiado o grabado.» O, si se inscribe usted mismo, «Sí, está bien que yo sea fotografiado o grabado.»",
        "«No, no quiero que mi hijo sea fotografiado o grabado.» O «No, no quiero ser fotografiado ni grabado.»",
        "Si elige No: no usaremos la imagen de ese estudiante en nuestro material de promoción. Tenga en cuenta que también hacemos eventos, shows y exposiciones públicas que sí se fotografían y se graban, a veces por la prensa o por el local. Para esas ocasiones puntuales le pediremos autorización otra vez, por separado. Decir No para las clases no deja a nadie fuera de los eventos.",
        "Puede cambiar su respuesta cuando quiera escribiendo a info@artfoundation-x-pwd.com. Dejaremos de usar imágenes nuevas de inmediato. El material ya impreso o ya publicado en otro lado puede no ser posible de retirar.",
      ],
    },
  },
  {
    id: "conduct",
    en: {
      title: "In the classroom",
      body: [
        "Students are dropped off and picked up by the adult listed on the registration. Tell us in writing if someone else will pick a student up.",
        "We ask everyone, students, families, staff and volunteers alike, to treat each other with respect. We do not tolerate harassment or discrimination of any kind.",
        "If a student’s behaviour puts themselves or others at risk, we will contact the parent or guardian and work out a plan together. Removing a student from a program is a last resort and never a first response.",
      ],
    },
    es: {
      title: "En el salón",
      body: [
        "Al estudiante lo deja y lo recoge el adulto que figura en la inscripción. Avísenos por escrito si lo va a recoger otra persona.",
        "Le pedimos a todos, estudiantes, familias, personal y voluntarios por igual, tratarse con respeto. No toleramos acoso ni discriminación de ningún tipo.",
        "Si la conducta de un estudiante lo pone en riesgo a él o a otros, contactamos al padre o tutor y armamos un plan juntos. Sacar a un estudiante de un programa es el último recurso, nunca la primera respuesta.",
      ],
    },
  },
  {
    id: "volunteers",
    en: {
      title: "Volunteers and interns",
      body: [
        "Because some of our programs work with vulnerable people, we may ask you to complete a background check and HIPAA certification before you start.",
        "We record your hours from your first day. When you finish, we can issue a signed letter stating the hours you contributed and what you did with us.",
        "That letter reflects our honest assessment. We write it because we mean it, which also means we may decline to issue one if the commitment was not completed.",
        "Volunteering is unpaid and does not create an employment relationship.",
      ],
    },
    es: {
      title: "Voluntarios y pasantes",
      body: [
        "Como algunos de nuestros programas trabajan con personas vulnerables, podemos pedirle una verificación de antecedentes y la certificación HIPAA antes de empezar.",
        "Registramos sus horas desde el primer día. Al terminar, podemos emitir una carta firmada que indique las horas que aportó y qué hizo con nosotros.",
        "Esa carta refleja nuestra evaluación honesta. La escribimos porque la pensamos de verdad, lo que también significa que podemos no emitirla si el compromiso no se completó.",
        "El voluntariado no es remunerado y no crea una relación laboral.",
      ],
    },
  },
  {
    id: "store",
    en: {
      title: "The store",
      body: [
        "Our store sells original work made by our students. Each piece shows the percentage of the sale that goes to the student who made it. The rest funds materials, field trips and scholarships for students whose families cannot cover the fee.",
        "When the artist is a minor, their share is paid to their parent or legal guardian. We publish a student’s work only after their guardian has signed our permission form, which we handle with the family directly.",
        "Pieces are handmade and one of a kind, so what arrives will differ slightly from the photograph. That is the nature of the work, not a defect.",
        "If an item arrives damaged, write to us within 14 days and we will replace it or refund it.",
      ],
    },
    es: {
      title: "La tienda",
      body: [
        "Nuestra tienda vende obra original hecha por nuestros estudiantes. Cada pieza muestra qué porcentaje de la venta va al estudiante que la hizo. El resto financia materiales, paseos y becas para estudiantes cuyas familias no pueden pagar la cuota.",
        "Cuando el artista es menor de edad, su parte se le paga a su padre, madre o tutor legal. Publicamos la obra de un estudiante solo después de que su tutor haya firmado nuestra planilla de permiso, que gestionamos con la familia directamente.",
        "Las piezas son hechas a mano y únicas, así que lo que llega es un poco distinto de la foto. Eso es propio del trabajo, no un defecto.",
        "Si un artículo llega dañado, escríbanos dentro de los 14 días y lo reponemos o lo devolvemos.",
      ],
    },
  },
  {
    id: "donations",
    en: {
      title: "Donations",
      body: [
        "We are a registered 501(c)(3) charitable organization, so contributions are tax-deductible to the extent allowed by law. When you donate, we email you a receipt you can keep for your taxes.",
        "Donations are final and non-refundable. If you set up a monthly donation you can stop it at any time, and stopping it prevents future charges.",
        "Your money goes to materials, field trips, and scholarships. We post the work on our blog and on social media so you can see where it lands.",
        "A COPY OF THE OFFICIAL REGISTRATION AND FINANCIAL INFORMATION MAY BE OBTAINED FROM THE DIVISION OF CONSUMER SERVICES BY CALLING TOLL-FREE (800-435-7352) WITHIN THE STATE. REGISTRATION DOES NOT IMPLY ENDORSEMENT, APPROVAL, OR RECOMMENDATION BY THE STATE.",
      ],
    },
    es: {
      title: "Donaciones",
      body: [
        "Somos una organización benéfica 501(c)(3) registrada, así que las contribuciones son deducibles de impuestos en la medida que permite la ley. Cuando dona, le enviamos por correo un recibo que puede guardar para sus impuestos.",
        "Las donaciones son finales y no reembolsables. Si activa una donación mensual, puede detenerla cuando quiera, y detenerla evita los cobros futuros.",
        "Su dinero va a materiales, paseos y becas. Publicamos el trabajo en nuestro blog y en redes sociales para que pueda ver dónde cae.",
        "A COPY OF THE OFFICIAL REGISTRATION AND FINANCIAL INFORMATION MAY BE OBTAINED FROM THE DIVISION OF CONSUMER SERVICES BY CALLING TOLL-FREE (800-435-7352) WITHIN THE STATE. REGISTRATION DOES NOT IMPLY ENDORSEMENT, APPROVAL, OR RECOMMENDATION BY THE STATE.",
      ],
    },
  },
  {
    id: "liability",
    en: {
      title: "Risk and liability",
      body: [
        "Art, theatre and music involve tools, materials and physical movement. We take reasonable care, our staff are trained, and we adapt activities to each student.",
        "To the fullest extent permitted by Florida law, ARTxpwd is not liable for indirect or consequential damages arising from participation. Nothing in these terms limits liability for gross negligence or wilful misconduct, and nothing here waives any right that cannot be waived by law.",
        "Tell us about allergies, medications and physical limitations before the first class. We cannot adapt for what we do not know.",
      ],
    },
    es: {
      title: "Riesgo y responsabilidad",
      body: [
        "El arte, el teatro y la música implican herramientas, materiales y movimiento. Ponemos el cuidado razonable, nuestro personal está capacitado y adaptamos las actividades a cada estudiante.",
        "En la máxima medida que permite la ley de Florida, ARTxpwd no responde por daños indirectos o consecuentes derivados de la participación. Nada en estos términos limita la responsabilidad por negligencia grave o conducta intencional, y nada aquí renuncia a un derecho que la ley no permita renunciar.",
        "Cuéntenos de alergias, medicamentos y limitaciones físicas antes de la primera clase. No podemos adaptar lo que no sabemos.",
      ],
    },
  },
  {
    id: "changes",
    en: {
      title: "Changes and contact",
      body: [
        "We may update these terms. Each version is dated, and the version you accepted is recorded with your registration. If we change something that affects you materially, we will tell you by email before it takes effect.",
        "These terms are governed by the laws of the State of Florida.",
        "Questions: info@artfoundation-x-pwd.com · +1 (305) 330-1546 ext. 416 · 10200 NW 25th Street, Suite B-205, Miami, FL 33172.",
      ],
    },
    es: {
      title: "Cambios y contacto",
      body: [
        "Podemos actualizar estos términos. Cada versión lleva su fecha, y la versión que usted aceptó queda registrada junto con su inscripción. Si cambiamos algo que le afecte de forma importante, se lo avisamos por correo antes de que entre en vigor.",
        "Estos términos se rigen por las leyes del Estado de Florida.",
        "Consultas: info@artfoundation-x-pwd.com · +1 (305) 330-1546 ext. 416 · 10200 NW 25th Street, Suite B-205, Miami, FL 33172.",
      ],
    },
  },
];
