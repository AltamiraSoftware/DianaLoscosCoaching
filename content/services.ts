export type ServiceContent = {
  path: string; name: string; seoTitle: string; serviceType: string; eyebrow: string; title: string; description: string; intro: string; cta: string;
  sectionTitle: string; sectionText: string; situationTitle: string; situations: readonly string[];
  detailTitle: string; detailText: string; features: readonly { title: string; text: string }[];
  related: readonly { href: string; label: string; text: string }[];
  faq: readonly { question: string; answer: string }[];
  closingTitle: string; closingText: string;
};

export const services: Record<string, ServiceContent> = {
  professional: {
    path: '/coaching-profesional/', name: 'Coaching profesional', seoTitle: 'Coaching profesional online | Diana Loscos', serviceType: 'Coaching profesional online', eyebrow: 'COACHING PROFESIONAL · SESIONES ONLINE',
    title: 'Coaching profesional para tomar decisiones en el trabajo',
    description: 'Coaching profesional para decisiones laborales, bloqueos y cambios de etapa. Sesiones individuales online con Diana Loscos. Consulta disponibilidad.',
    intro: 'Cuando una situación laboral te bloquea, necesitas poner límites o estás valorando un cambio, tener un espacio para pensar puede ayudarte a ordenar prioridades y explorar opciones sin precipitarte.', cta: 'Reservar una sesión de coaching profesional',
    sectionTitle: '¿En qué situaciones puede ayudarte el coaching profesional?', sectionText: 'Quizá estás valorando un cambio de puesto, tienes una conversación difícil pendiente o sientes que tus responsabilidades han dejado de encajar con lo que necesitas. Trabajaremos sobre tu contexto y las alternativas que tienes delante.',
    situationTitle: 'Situaciones que puedes trabajar', situations: ['Decisiones sobre un puesto, un equipo o una etapa laboral.', 'Conversaciones pendientes, prioridades y límites.', 'Alternativas ante un cambio en el trabajo.'],
    detailTitle: 'Coaching profesional online: qué puedes esperar', detailText: 'Una sesión individual de 60 minutos para comprender el contexto, revisar tus criterios y explorar un siguiente paso posible. No se trata de decirte qué decisión tomar, sino de ayudarte a construir una respuesta coherente con tu situación.',
    features: [{ title: 'Tu contexto primero', text: 'Empezamos por lo que sucede en tu trabajo y por lo que para ti importa ahora.' }, { title: 'Preguntas útiles', text: 'Buscamos perspectivas que te permitan valorar posibilidades con más criterio.' }, { title: 'Acción concreta', text: 'Cerramos con un paso que puedas probar y revisar, sin promesas de resultados.' }],
    related: [{ href: '/cambio-profesional/', label: 'Cambio profesional', text: 'Si estás valorando una transición de puesto, empresa o rumbo.' }, { href: '/liderazgo-nuevos-managers/', label: 'Coaching de liderazgo', text: 'Si acabas de asumir la coordinación de un equipo.' }, { href: '/coaching-ejecutivo/', label: 'Coaching ejecutivo', text: 'Si tus decisiones forman parte de una responsabilidad de liderazgo.' }],
    faq: [{ question: '¿En qué se diferencia del coaching ejecutivo?', answer: 'El coaching profesional puede abordar distintas situaciones relacionadas con el trabajo. El coaching ejecutivo se centra especialmente en responsabilidades de liderazgo, gestión de personas y decisiones vinculadas al rol directivo.' }],
    closingTitle: 'Tu siguiente paso no tiene por qué estar resuelto hoy.', closingText: 'Puedes empezar por una sesión individual y valorar después si quieres continuar.',
  },
  change: {
    path: '/cambio-profesional/', name: 'Cambio profesional', seoTitle: 'Cambio profesional y coaching online | Diana Loscos', serviceType: 'Coaching para cambio profesional', eyebrow: 'CAMBIO PROFESIONAL · SESIONES ONLINE',
    title: 'Cambio profesional: encuentra tu siguiente paso sin decidir a ciegas',
    description: '¿Te planteas un cambio profesional? Explora alternativas, revisa tus prioridades y prepara tus próximos pasos con sesiones de coaching online.',
    intro: 'Cambiar de trabajo, asumir un nuevo rol o replantearte tu trayectoria no es una decisión menor. En las sesiones podemos ordenar lo que ya no encaja, comparar alternativas y preparar un primer movimiento realista.', cta: 'Hablar sobre mi cambio profesional',
    sectionTitle: '¿Quieres cambiar de trabajo o necesitas cambiar algo en tu trabajo?', sectionText: 'No siempre se trata de marcharte. A veces necesitas revisar tus prioridades, negociar nuevas condiciones o comprender por qué tu situación actual ha dejado de funcionar para ti.',
    situationTitle: 'Situaciones que puedes trabajar', situations: ['Cambiar de puesto, empresa o rumbo profesional.', 'Revisar qué quieres mantener y qué necesitas cambiar.', 'Valorar una oportunidad antes de decidir.'],
    detailTitle: 'De la duda a un siguiente paso concreto', detailText: 'Trabajaremos sobre tus opciones y los criterios que utilizarás para evaluarlas. El objetivo es que puedas tomar decisiones con más información y preparar acciones acordes con tu situación.',
    features: [{ title: 'Mirar el presente', text: 'Identificar qué funciona y qué necesitas cambiar.' }, { title: 'Explorar alternativas', text: 'Poner sobre la mesa opciones reales y los criterios con los que evaluarlas.' }, { title: 'Preparar un paso', text: 'Concretar una acción asumible y revisable.' }],
    related: [{ href: '/coaching-profesional/', label: 'Coaching profesional', text: 'Si quieres trabajar una situación laboral sin decidir todavía un cambio.' }],
    faq: [{ question: '¿Tengo que saber hacia qué trabajo quiero cambiar?', answer: 'No. Podemos empezar por comprender qué buscas, qué necesitas y qué opciones tienes antes de elegir una dirección.' }],
    closingTitle: 'Da espacio a la decisión que tienes delante.', closingText: 'Una sesión puede ayudarte a empezar a ordenar lo que hoy parece mezclado.',
  },
  leadership: {
    path: '/liderazgo-nuevos-managers/', name: 'Liderazgo para nuevos managers', seoTitle: 'Coaching de liderazgo para nuevos managers | Diana Loscos', serviceType: 'Coaching de liderazgo', eyebrow: 'LIDERAZGO · SESIONES ONLINE',
    title: 'Coaching de liderazgo para nuevos managers',
    description: 'Coaching de liderazgo para profesionales que empiezan a dirigir equipos. Trabaja delegación, conversaciones y decisiones en sesiones online.',
    intro: 'Pasar de hacer bien tu trabajo a coordinar a otras personas cambia tus prioridades, tus relaciones y tus decisiones. Si acabas de asumir un equipo, podemos trabajar situaciones reales de delegación, expectativas y conversaciones difíciles.', cta: 'Reservar una sesión de liderazgo',
    sectionTitle: 'Los retos de empezar a liderar un equipo', sectionText: 'Quizá te cuesta delegar, no sabes cómo abordar una conversación delicada o sigues intentando resolver personalmente todo lo que antes dependía de ti.',
    situationTitle: 'Situaciones que puedes trabajar', situations: ['Asumir la coordinación de un equipo.', 'Delegar y acordar expectativas.', 'Preparar una conversación o una decisión difícil.'],
    detailTitle: 'Construye tu propio criterio como líder', detailText: 'No necesitas copiar un estilo de liderazgo ni seguir una receta. Partiremos de los retos que estás viviendo para explorar alternativas y preparar decisiones que puedas aplicar en tu trabajo.',
    features: [{ title: 'Rol y expectativas', text: 'Aclarar qué se espera de ti y qué tipo de liderazgo quieres ejercer.' }, { title: 'Relaciones de trabajo', text: 'Pensar conversaciones, acuerdos y límites con el equipo.' }, { title: 'Decisiones cotidianas', text: 'Revisar casos concretos para actuar con más intención.' }],
    related: [{ href: '/coaching-ejecutivo/', label: 'Coaching ejecutivo', text: 'Si quieres trabajar retos más amplios de liderazgo y responsabilidad.' }, { href: '/coaching-profesional/', label: 'Coaching profesional', text: 'Para otras decisiones relacionadas con tu trabajo.' }],
    faq: [{ question: '¿Es una formación para aprender a dirigir equipos?', answer: 'No. No es un curso de management. Es un proceso individual de coaching centrado en tus situaciones, decisiones y responsabilidades concretas.' }],
    closingTitle: 'Empieza por el reto que hoy tienes delante.', closingText: 'No necesitas tener un estilo de liderazgo cerrado para comenzar.',
  },
  executive: {
    path: '/coaching-ejecutivo/', name: 'Coaching ejecutivo', seoTitle: 'Coaching ejecutivo | Sesiones online con Diana Loscos', serviceType: 'Coaching ejecutivo online', eyebrow: 'COACHING EJECUTIVO · SESIONES ONLINE',
    title: 'Coaching ejecutivo para liderar y decidir con perspectiva',
    description: 'Coaching ejecutivo online para profesionales con responsabilidades de liderazgo. Trabaja decisiones, prioridades y retos de equipo con Diana Loscos.',
    intro: 'Si lideras un equipo, afrontas una transición de responsabilidad o necesitas tomar decisiones complejas, el coaching ejecutivo te ofrece un espacio de reflexión sobre tus retos concretos.', cta: 'Consultar disponibilidad de coaching ejecutivo',
    sectionTitle: '¿Para quién es el coaching ejecutivo?', sectionText: 'Para profesionales con responsabilidades de liderazgo o toma de decisiones que quieren dedicar tiempo a revisar su manera de actuar. Podemos abordar cambios de rol, prioridades, conversaciones difíciles y relaciones de trabajo.',
    situationTitle: 'Situaciones que puedes trabajar', situations: ['Decisiones que afectan a otras personas.', 'Cambios de rol y prioridades.', 'Conversaciones y relaciones de trabajo.'],
    detailTitle: 'Cómo trabajamos en las sesiones de coaching ejecutivo online', detailText: 'Las sesiones son individuales y duran 60 minutos. Partimos de una situación concreta, exploramos perspectivas y valoramos posibles acciones. El coaching no sustituye la consultoría de negocio ni la formación directiva.',
    features: [{ title: 'Perspectiva', text: 'Leer la situación completa, incluyendo personas, contexto y supuestos.' }, { title: 'Criterio propio', text: 'Explorar opciones y consecuencias antes de elegir.' }, { title: 'Práctica', text: 'Definir acciones que puedas llevar a tu día a día y revisar.' }],
    related: [{ href: '/liderazgo-nuevos-managers/', label: 'Coaching de liderazgo para nuevos managers', text: 'Si acabas de asumir tu primera responsabilidad de equipo.' }, { href: '/coaching-profesional/', label: 'Coaching profesional', text: 'Para otras situaciones relacionadas con tu trabajo.' }],
    faq: [{ question: '¿En qué se diferencia del mentoring o la consultoría?', answer: 'En el mentoring suele intervenir la experiencia del mentor para orientar. La consultoría ofrece análisis o recomendaciones especializadas. El coaching ejecutivo se centra en facilitar tu reflexión, explorar opciones y acompañar la toma de decisiones.' }],
    closingTitle: 'Un espacio para pensar lo que tu agenda no deja pensar.', closingText: 'La sesión individual online figura en Doctoralia a 60 €.',
  },
};
