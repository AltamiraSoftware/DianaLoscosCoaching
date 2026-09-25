import { site } from '@/lib/site';

// Extractos literales breves de opiniones públicas de Doctoralia, revisados el 24/09/2026.
// No se atribuye a estas reseñas una reserva o pago verificado.
export const testimonials = [
  { quote: 'Destaco muchísimo su cercanía y empatía.', author: 'M.G.C.', date: '11 septiembre 2026' },
  { quote: 'Me he sentido escuchada y acompañada', author: 'Blanca', date: '22 junio 2026' },
  { quote: 'Todo muy profesionalizado, ordenado', author: 'GLS', date: '11 junio 2026' },
  { quote: 'Muy profesional y cercana', author: 'DPO', date: '5 junio 2026' },
  { quote: 'su atención fue muy personalizada', author: 'Iván Martín', date: '5 junio 2026' },
] as const;

export const testimonialSource = site.bookingUrl;
