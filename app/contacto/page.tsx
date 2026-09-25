import type { Metadata } from 'next';
import { PageIntro } from '@/components/sections/PageIntro';
import { ContactForm } from '@/components/sections/ContactForm';
import { Container } from '@/components/ui/Container';
import { TrackedLink } from '@/components/ui/TrackedLink';
import { site } from '@/lib/site';
import { pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata('Contacto y reserva', 'Reserva una sesión online de coaching profesional con Diana Loscos en Doctoralia o envía una consulta.', '/contacto/');
export default function Page() { return <><PageIntro eyebrow="Contacto" title="Empecemos por una conversación." name="Contacto" path="/contacto/"><p>Si ya quieres reservar, consulta disponibilidad en Doctoralia. Si necesitas preguntar algo antes, puedes escribirme aquí.</p></PageIntro><section className="section section-mist"><Container className="contact-layout"><div><p className="eyebrow">Elige tu canal</p><div className="contact-options"><TrackedLink href={site.bookingUrl} external event="cta_booking_click" label="contact"><span>Reserva online</span>Doctoralia</TrackedLink><TrackedLink href={`mailto:${site.email}`} event="email_click" label="contact"><span>Correo</span>{site.email}</TrackedLink><TrackedLink href={site.whatsappUrl} external event="whatsapp_click" label="contact"><span>Mensaje</span>WhatsApp</TrackedLink></div><p style={{ marginTop: 22, color: 'var(--color-graphite)', fontSize: 13 }}>Las sesiones son online y duran 60 minutos. El formulario es para consultas; la reserva se confirma en Doctoralia.</p></div><ContactForm /></Container></section></>; }
