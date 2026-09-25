export const site = {
  name: 'Diana Loscos',
  description: 'Coaching profesional para momentos de cambio, bloqueo y decisión.',
  url: (process.env.NEXT_PUBLIC_SITE_URL || 'https://dianaloscoscoach.com').replace(/\/$/, ''),
  bookingUrl: process.env.NEXT_PUBLIC_DOCTORALIA_URL || 'https://www.doctoralia.es/diana-loscos-ortega/psicologo-terapeuta-complementario/madrid',
  linkedinUrl: process.env.NEXT_PUBLIC_LINKEDIN_URL || 'https://www.linkedin.com/in/diana-loscos-ortega-68b184214/',
  instagramUrl: process.env.NEXT_PUBLIC_INSTAGRAM_URL || 'https://www.instagram.com/dianaloscoscoach/',
  whatsappUrl: process.env.NEXT_PUBLIC_WHATSAPP_URL || 'https://wa.me/34604978407',
  email: 'contacto@dianaloscoscoach.com',
  city: 'Madrid',
  professionalRegistration: 'M-45396',
} as const;

export const prices = [
  { name: 'Sesión individual', price: '60 €', detail: '60 minutos · online', source: 'Doctoralia y web de Diana' },
  { name: 'Proceso de 6 sesiones', price: '330 €', detail: 'Para trabajar un objetivo con continuidad', source: 'Web de Diana' },
  { name: 'Proceso de 10 sesiones', price: '520 €', detail: 'Para acompañar un proceso más amplio', source: 'Web de Diana' },
] as const;

export const routes = [
  { href: '/', label: 'Inicio' },
  { href: '/coaching-profesional/', label: 'Coaching profesional' },
  { href: '/cambio-profesional/', label: 'Cambio profesional' },
  { href: '/liderazgo-nuevos-managers/', label: 'Nuevo liderazgo' },
  { href: '/coaching-ejecutivo/', label: 'Coaching ejecutivo' },
  { href: '/sobre-mi/', label: 'Sobre Diana' },
  { href: '/opiniones/', label: 'Opiniones' },
  { href: '/preguntas-frecuentes/', label: 'Preguntas frecuentes' },
  { href: '/contacto/', label: 'Contacto' },
] as const;

export const coachingChoices = [
  { href: '/cambio-profesional/', label: 'Algo ha cambiado en tu trabajo', detail: 'Cambio profesional' },
  { href: '/coaching-profesional/', label: 'Te cuesta tomar una decisión', detail: 'Claridad y criterio' },
  { href: '/liderazgo-nuevos-managers/', label: 'Empiezas a liderar', detail: 'Nuevos managers' },
  { href: '/coaching-ejecutivo/', label: 'Coaching ejecutivo', detail: 'Decisiones con responsabilidad' },
] as const;

export function absoluteUrl(path: string) {
  return `${site.url}${path.startsWith('/') ? path : `/${path}`}`;
}
