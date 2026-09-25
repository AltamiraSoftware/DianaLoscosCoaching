export type ServiceContent = {
  path: string; name: string; eyebrow: string; title: string; description: string; intro: string;
  sectionTitle: string; sectionText: string; situationTitle: string; situations: string[];
  features: { title: string; text: string }[];
  closingTitle: string; closingText: string;
};

export const services: Record<string, ServiceContent> = {
  professional: {
    path: '/coaching-profesional/', name: 'Coaching profesional', eyebrow: 'El punto de partida',
    title: 'Coaching profesional para recuperar perspectiva.',
    description: 'Sesiones de coaching profesional online con Diana Loscos para momentos de bloqueo, cambio o decisión en el trabajo.',
    intro: 'Cuando una situación laboral se vuelve difícil de ordenar, conversar con alguien fuera de ella puede ayudarte a verla con más claridad y decidir tu siguiente paso.',
    sectionTitle: 'Un espacio para pensar tu trabajo con calma.',
    sectionText: 'Partimos de lo que estás viviendo, sin imponer un itinerario. La sesión ofrece preguntas, escucha y estructura para explorar tus opciones y convertir tus conclusiones en acciones posibles.',
    situationTitle: 'Puede ser para ti si…',
    situations: ['Te sientes bloqueada o bloqueado ante una decisión profesional.', 'Necesitas poner orden en prioridades, expectativas y límites.', 'Quieres explorar una situación laboral antes de actuar.'],
    features: [
      { title: 'Tu contexto primero', text: 'Empezamos por lo que sucede en tu trabajo y por lo que para ti importa ahora.' },
      { title: 'Preguntas útiles', text: 'Buscamos perspectivas que te permitan valorar posibilidades con más criterio.' },
      { title: 'Acción concreta', text: 'Cerramos con un paso que puedas probar y revisar, sin promesas de resultados.' },
    ],
    closingTitle: 'Tu siguiente paso no tiene por qué estar resuelto hoy.', closingText: 'Puedes empezar por una sesión individual y valorar después si quieres continuar.',
  },
  change: {
    path: '/cambio-profesional/', name: 'Cambio profesional', eyebrow: 'Cuando algo se mueve',
    title: 'Cambio profesional: encuentra una dirección que tenga sentido.',
    description: 'Acompañamiento online para explorar una transición laboral, ordenar opciones y decidir próximos pasos profesionales.',
    intro: 'Quizá sabes que necesitas un cambio, pero todavía no puedes ponerle nombre. O quizá tienes varias opciones y ninguna termina de encajar. Este espacio te ayuda a explorar antes de decidir.',
    sectionTitle: 'Antes de elegir, conviene comprender qué quieres cambiar.',
    sectionText: 'Trabajamos sobre tu situación actual, lo que ya no encaja, tus recursos y tus criterios. El objetivo de la conversación es que puedas distinguir una reacción urgente de una decisión pensada.',
    situationTitle: 'Situaciones con las que puedes llegar',
    situations: ['Estás valorando cambiar de puesto, empresa o rumbo profesional.', 'Sientes desgaste o desconexión y quieres entender qué lo provoca.', 'Tienes una oportunidad delante y necesitas revisar si encaja contigo.'],
    features: [
      { title: 'Mirar el presente', text: 'Identificar qué funciona, qué ha cambiado y qué necesitas dejar atrás.' },
      { title: 'Explorar alternativas', text: 'Poner sobre la mesa opciones reales y los criterios con los que evaluarlas.' },
      { title: 'Diseñar un primer paso', text: 'Pasar de la idea general de cambio a una acción concreta y asumible.' },
    ],
    closingTitle: 'Da espacio a la decisión que tienes delante.', closingText: 'Una sesión puede ayudarte a empezar a ordenar lo que hoy parece mezclado.',
  },
  leadership: {
    path: '/liderazgo-nuevos-managers/', name: 'Liderazgo para nuevos managers', eyebrow: 'Una nueva responsabilidad',
    title: 'Liderar por primera vez también se aprende conversando.',
    description: 'Coaching para profesionales que empiezan a liderar equipos y quieren pensar su nuevo rol, prioridades y conversaciones.',
    intro: 'Cuando pasas a coordinar a otras personas, cambian tus decisiones, tus relaciones y la forma en que usas tu tiempo. Tener un espacio de reflexión puede ayudarte a construir tu propio criterio como manager.',
    sectionTitle: 'Tu manera de liderar empieza por entender el rol.',
    sectionText: 'Exploramos situaciones concretas de tu día a día: delegación, expectativas, conversaciones difíciles y límites. La sesión no es una formación técnica ni ofrece recetas; parte de tus retos y de tu contexto.',
    situationTitle: 'Puede ayudarte si…',
    situations: ['Acabas de asumir la coordinación de un equipo.', 'Te cuesta pasar de hacer tú a delegar y acompañar.', 'Quieres preparar conversaciones o decisiones nuevas para ti.'],
    features: [
      { title: 'Rol y expectativas', text: 'Aclarar qué se espera de ti y qué tipo de liderazgo quieres ejercer.' },
      { title: 'Relaciones de trabajo', text: 'Pensar conversaciones, acuerdos y límites con el equipo.' },
      { title: 'Decisiones cotidianas', text: 'Revisar casos concretos para actuar con más intención.' },
    ],
    closingTitle: 'Empieza por el reto que hoy tienes delante.', closingText: 'No necesitas tener un estilo de liderazgo cerrado para comenzar.',
  },
  executive: {
    path: '/coaching-ejecutivo/', name: 'Coaching ejecutivo', eyebrow: 'Decisiones con responsabilidad',
    title: 'Coaching ejecutivo para pensar mejor tus decisiones.',
    description: 'Sesiones de coaching ejecutivo online para profesionales con responsabilidad de liderazgo, decisiones y cambio.',
    intro: 'Cuando tus decisiones afectan a otras personas, el espacio para detenerte suele escasear. El coaching ejecutivo ofrece una conversación estructurada para mirar el contexto, explorar alternativas y decidir con criterio.',
    sectionTitle: 'Un lugar donde separar urgencia, presión y dirección.',
    sectionText: 'Trabajamos sobre retos profesionales específicos: liderazgo, transición de rol, conversaciones, prioridades o decisiones complejas. El punto de partida son tus objetivos, no un modelo cerrado de gestión.',
    situationTitle: 'Temas que puedes traer',
    situations: ['Una decisión relevante que requiere perspectiva.', 'Un cambio de rol o de responsabilidades.', 'La relación con un equipo, colegas o stakeholders.'],
    features: [
      { title: 'Perspectiva', text: 'Leer la situación completa, incluyendo personas, contexto y supuestos.' },
      { title: 'Criterio propio', text: 'Explorar opciones y consecuencias antes de elegir.' },
      { title: 'Práctica', text: 'Definir acciones que puedas llevar a tu día a día y revisar.' },
    ],
    closingTitle: 'Un espacio para pensar lo que tu agenda no deja pensar.', closingText: 'La sesión individual online figura en Doctoralia a 60 €.',
  },
};
