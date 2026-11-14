export type SectionCopy = { eyebrow: string; title: string; description?: string };
export type NumberedCard = { number: string; title: string; description: string; href: string };
export type BenefitCopy = { title: string; description: string };
export type FaqCopy = { question: string; answer: string };
export type TestimonialCopy = { quote: string; author: string; date: string };
export type PriceCopy = { title: string; description: string; price: string; perSession?: string; saving?: string; action: string };

export const home = {
  seo: { title: 'Diana Loscos | Coach Ontológico Online y Desarrollo Personal', description: '¿Has conseguido tus objetivos y sientes que algo te falta? Sesiones de coaching online 1:1 para parar, mirar lo que evitas y dar un paso. Reserva en Doctoralia.' },
  header: { navigation: ['Inicio', 'Servicios', 'Sobre mí', 'Opiniones', 'Preguntas frecuentes', 'Contacto'], services: ['Coaching personal', 'Coaching profesional y ejecutivo'], action: 'Reservar sesión', instagramUrl: 'https://www.instagram.com/dianaloscoscoach/' },
  hero: {
    eyebrow: 'COACHING PERSONAL Y PROFESIONAL · DIANA LOSCOS',
    title: '¿Has conseguido tus objetivos y sientes que',
    titleAccent: 'algo te falta?',
    description: 'Sesiones de coaching online 1:1 para parar, mirar lo que llevas tiempo evitando mirar y dar un paso que te acerque a donde quieres estar.',
    credentials: 'Psicóloga · Col. M-45396 · Coach de desarrollo personal y profesional',
    note: 'Sesiones online de 60 minutos · Reserva en Doctoralia',
    primaryAction: 'Reservar una sesión ↗', secondaryAction: 'Ver cómo trabajo →',
    photoCaption: 'DIANA LOSCOS · COACH DE DESARROLLO PERSONAL Y PROFESIONAL',
  },
  situations: {
    eyebrow: '¿TE RECONOCES?', title: 'Hay momentos en los que seguir igual deja de ser una opción.',
    description: 'No hace falta tenerlo todo claro para empezar. A veces basta con saber que necesitas mirar tu situación de otra forma.',
    action: 'Explorar esta situación',
    cards: [
      { number: '01', title: 'Algo ha cambiado en tu vida', description: 'Quieres entender lo que estás viviendo y qué necesitas ahora.', href: '/coaching-personal-online/' },
      { number: '02', title: 'Estás ante una decisión', description: 'En lo personal o en el trabajo, buscas mirar tus opciones con más perspectiva.', href: '/coaching-personal-online/' },
      { number: '03', title: 'Quieres avanzar en tu trabajo', description: 'Buscas dar un paso con intención ante un cambio profesional.', href: '/coaching-profesional/' },
      { number: '04', title: 'Lo has conseguido y algo falta', description: 'Cumples, avanzas, lo consigues… y por dentro sigue faltando algo.', href: '/coaching-personal-online/' },
      { number: '05', title: 'Cumples con todos. ¿Y contigo?', description: '«Hoy no tengo tiempo», «el lunes empiezo»… Cumplir con los demás está bien; la pregunta es qué lugar ocupas tú.', href: '/coaching-personal-online/' },
      { number: '06', title: 'Te evades para no pensar', description: 'Sales, desconectas, llenas la agenda… y el lunes vuelve todo.', href: '/coaching-personal-online/' },
    ] satisfies readonly NumberedCard[],
    closing: 'Vivir en automático también cansa. No es falta de capacidad: es sobrecarga, exigencia y miedo.',
  },
  process: {
    eyebrow: 'CÓMO TRABAJO', title: 'No te doy respuestas. Miramos eso que estás evitando mirar.',
    description: 'En mis sesiones 1:1 online tienes un espacio seguro y confidencial, donde se escucha sin juicio. A través de preguntas, das un paso y cierras un compromiso.',
    steps: [
      { number: '01', title: 'Empezar aunque haya miedo', description: 'Dar el primer paso no es no tener miedo: es decidir mirar lo que llevas tiempo evitando mirar.' },
      { number: '02', title: 'Suelta y confía', description: 'Soltar la necesidad de controlarlo todo y dejar de darle vueltas a lo mismo, para poder escucharte.' },
      { number: '03', title: 'Del «tengo que» a la acción', description: 'De cada sesión sales con un compromiso y una mini meta que te acerca a tu objetivo final.' },
    ],
    trust: 'Escucha sin juicio · Espacio seguro y confidencial · Sesiones online de 60 minutos', action: 'Reservar una sesión ↗',
  },
  benefits: {
    eyebrow: 'BENEFICIOS', title: '¿Qué puedes llevarte de las sesiones?', description: 'Cada proceso es distinto y parte de lo que tú quieras trabajar.',
    items: [
      { title: 'Autoconocimiento', description: 'Entender por qué actúas como actúas y cómo gestionas lo que sientes.' },
      { title: 'Confianza', description: 'Reconocer tus recursos y confiar en ti.' },
      { title: 'Comunicación', description: 'Expresarte y escuchar con más claridad.' },
      { title: 'Metas y acción', description: 'Pasar de la idea a pasos pequeños que sí das.' },
      { title: 'Equilibrio', description: 'Recuperar energía y cuidar cuerpo y mente.' },
      { title: 'Perspectiva', description: 'Ver tu situación desde otro lugar y descubrir opciones.' },
    ] satisfies readonly BenefitCopy[],
    note: 'Son los beneficios que más recogen los estudios de la ICF sobre coaching. Cada experiencia es personal y no anticipa resultados.',
  },
  about: {
    eyebrow: 'LA PERSONA DETRÁS DEL PROCESO', title: 'Hola, soy Diana.',
    paragraphs: [
      'Creo que muchas veces no necesitamos más respuestas, sino parar y mirar lo que no estamos viendo.',
      'Trabajé dos años y medio en Recursos Humanos. Conseguí lo que buscaba y sentí que no era mi camino. De ahí nace este proyecto.',
      'Me mueve ayudarte a sacar tu mayor potencial, a conocerte y a entender por qué actúas como actúas.',
      'Psicóloga, con formación en coaching acreditada por la ICF (Ciclo II) y 100 horas de sesiones. Estoy cursando el Máster en Psicología General Sanitaria.',
    ], action: 'Conoce mi historia →', href: '/sobre-mi/',
  },
  testimonials: {
    eyebrow: 'EN PALABRAS DE QUIENES HAN VENIDO', title: 'Personas que ya han trabajado conmigo.', description: 'Procesos reales. Reflexiones que abren nuevas perspectivas.',
    items: [
      { quote: 'Destaco muchísimo su cercanía y empatía.', author: 'M.G.C.', date: '11 sep 2026' },
      { quote: 'Me he sentido escuchada y acompañada', author: 'Blanca', date: '22 jun 2026' },
      { quote: 'Su atención fue muy personalizada', author: 'I. M.', date: '5 jun 2026' },
    ] satisfies readonly TestimonialCopy[],
    action: 'Leer en Doctoralia', note: 'Extractos de opiniones públicas en Doctoralia. Cada experiencia es personal y no anticipa resultados.', allAction: 'Ver todas las opiniones en Doctoralia →',
  },
  services: {
    eyebrow: 'FORMAS DE EMPEZAR', title: 'Una conversación, distintas situaciones.', description: 'Lo personal y lo profesional van de la mano: lo que te pasa en un lado se nota en el otro.', action: 'Conocer el servicio',
    cards: [
      { number: '01 / VIDA PERSONAL', title: 'Coaching personal', description: 'Para aclarar un bloqueo, una decisión o un cambio en tu vida y elegir un paso realista.', href: '/coaching-personal-online/' },
      { number: '02 / VIDA PROFESIONAL', title: 'Coaching profesional y ejecutivo', description: 'Para ordenar un bloqueo, una decisión o una etapa de cambio en tu trabajo, y pensar tu manera de liderar.', href: '/coaching-profesional/' },
    ] satisfies readonly NumberedCard[],
  },
  pricing: {
    eyebrow: 'CÓMO EMPEZAR', title: 'Empieza con una sola sesión.', description: 'Si ves que te funciona, puedes seguir sesión a sesión o elegir un proceso de 6 o 10 sesiones. Recomiendo un mínimo de 6, aunque todo depende de lo que quieras trabajar.',
    items: [
      { title: 'Sesión individual', description: '60 minutos · online', price: '60 €', action: 'Reservar una sesión ↗' },
      { title: 'Proceso de 6 sesiones', description: 'Para trabajar un objetivo con continuidad', perSession: '55 € por sesión', saving: 'ahorras 30 €', price: '330 €', action: 'Consultar proceso' },
      { title: 'Proceso de 10 sesiones', description: 'Para acompañar un proceso más amplio', perSession: '52 € por sesión', saving: 'ahorras 80 €', price: '520 €', action: 'Consultar proceso' },
    ] satisfies readonly PriceCopy[],
    recommended: 'Recomendado', fallbackAction: 'Reserva una llamada', note: 'El pago se hace 24 horas antes de la sesión. Antes de empezar firmamos un acuerdo de confidencialidad.',
  },
  faq: {
    eyebrow: 'LO QUE QUIZÁ TE PREGUNTAS', title: 'Respuestas claras antes de empezar.',
    items: [
      { question: '¿Cómo son las sesiones?', answer: 'Son sesiones 1:1 online de 60 minutos, en un espacio seguro y confidencial, donde se escucha sin juicio. Vienes con lo que hoy te preocupa y, a través de preguntas, das un paso y cierras un compromiso. Cada sesión termina con una mini meta que te acerca a tu objetivo final.' },
      { question: '¿Necesito saber exactamente qué quiero trabajar?', answer: 'No. Muchas veces solo sabes que algo falta o que llevas tiempo dándole vueltas a todo. Con preguntas vamos encontrando qué quieres trabajar.' },
      { question: '¿Cuántas sesiones necesito?', answer: 'Depende de lo que quieras trabajar. Te recomiendo empezar con una sesión; si ves que te funciona, puedes seguir sesión a sesión o coger un proceso de 6 o 10 sesiones. Mi recomendación mínima son 6, pero la decisión es tuya.' },
      { question: '¿Es psicoterapia?', answer: 'No. El coaching no es psicoterapia ni sustituye atención psicológica, médica ni psiquiátrica. Si veo que necesitas otro tipo de acompañamiento, te orientaré hacia el recurso adecuado.' },
      { question: '¿Es confidencial?', answer: 'Sí. Antes de empezar firmamos un acuerdo de confidencialidad, y las sesiones son un espacio seguro donde se escucha sin juicio.' },
      { question: '¿Cómo se paga?', answer: 'El pago se hace 24 horas antes de la sesión.' },
      { question: '¿Cómo reservo?', answer: 'La reserva se realiza en Doctoralia, donde puedes consultar disponibilidad y condiciones. Si prefieres que hablemos antes, déjame tu teléfono en el formulario y te llamo.' },
      { question: '¿Cómo sé si el coaching es para mí?', answer: 'Si has conseguido lo que te proponías y sientes que algo falta, si te evades para no pensar o si llevas días dándole vueltas a todo sin fuerzas, puede ser un buen momento para parar. Si no lo tienes claro, déjame tu teléfono y lo hablamos.' },
    ] satisfies readonly FaqCopy[],
  },
  contact: {
    eyebrow: 'SI PREFIERES HABLAR ANTES DE RESERVAR', title: '¿Quieres contarme qué te está pasando?', description: 'Déjame tu teléfono y la franja que mejor te venga, y te llamo. Sin compromiso. El formulario es para consultas; las sesiones se reservan en Doctoralia.',
    formTitle: 'Cuéntame qué te está preocupando', formDescription: 'Una nota breve es suficiente. Te llamo yo.',
    fields: { name: 'Nombre *', email: 'Email *', phone: 'Teléfono *', callWindow: '¿A qué hora te viene mejor que te llame? *', message: '¿Qué es lo que más te está removiendo ahora mismo? *', messagePlaceholder: 'Cuéntame en pocas líneas.', privacy: 'He leído la política de privacidad y acepto que me llamen al teléfono indicado y el tratamiento de mis datos para responder a esta consulta.' },
    callWindows: [{ value: 'manana', label: 'Mañana' }, { value: 'mediodia', label: 'Mediodía' }, { value: 'tarde', label: 'Tarde' }],
  },
  closing: { eyebrow: 'HABLEMOS', title: 'Tu siguiente paso puede empezar con una conversación.', description: 'Cuando empiezas a mirarte desde otra perspectiva, muchas cosas empiezan a cambiar. Reserva una sesión online y trae lo que hoy te pesa.', reelTitle: 'Empezar aunque haya miedo', motto: 'Exprimir el elixir del existir', action: 'Reservar una sesión ↗' },
} as const;
