import styles from './ContactChannels.module.css';
import type { Metadata } from 'next';
import { PageIntro } from '@/components/sections/PageIntro';
import { ContactForm } from '@/components/sections/ContactForm';
import { Container } from '@/components/ui/Container';
import { DoctoraliaLogo, InstagramLogo, WhatsAppLogo } from '@/components/ui/BrandLogos';
import { TrackedLink } from '@/components/ui/TrackedLink';
import { site } from '@/lib/site';
import { pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata('Contacto y reserva', 'Reserva una sesión online de coaching profesional con Diana Loscos en Doctoralia o envía una consulta.', '/contacto/');
export default function Page() {
  return <>
    <PageIntro eyebrow="Contacto" title="Empecemos por una conversación." name="Contacto" path="/contacto/">
      <p>Si ya quieres reservar, consulta disponibilidad en Doctoralia. Si necesitas preguntar algo antes, puedes escribirme aquí.</p>
    </PageIntro>
    <section className={`section ${styles.section}`} aria-labelledby="contact-channels-title">
      <Container className={`contact-layout ${styles.layout}`}>
        <div className={styles.channels}>
          <p className="eyebrow">Elige tu canal</p>
          <h2 id="contact-channels-title">Hablemos como prefieras.</h2>
          <p className={styles.intro}>Reserva tu sesión directamente o escríbeme si quieres resolver una duda antes de empezar.</p>
          <div className={`contact-options ${styles.grid}`}>
            <TrackedLink href={site.bookingUrl} external event="cta_booking_click" label="contact" className={`${styles.card} ${styles.featured}`} data-scroll-reveal="contact-channel">
              <span className={styles.icon}><DoctoraliaLogo /></span><span className={styles.title}>Reserva online</span><span className={styles.description}>Consulta horarios y reserva tu sesión en Doctoralia.</span><span className={styles.action}>Consultar disponibilidad</span>
            </TrackedLink>
            <TrackedLink href={site.whatsappUrl} external event="whatsapp_click" label="contact" className={styles.card} data-scroll-reveal="contact-channel">
              <span className={`${styles.icon} ${styles.whatsapp}`}><WhatsAppLogo /></span><span className={styles.title}>WhatsApp</span><span className={styles.description}>Escríbeme un mensaje si prefieres hablar por aquí.</span><span className={styles.action}>Enviar mensaje</span>
            </TrackedLink>
            <TrackedLink href={`mailto:${site.email}`} event="email_click" label="contact" className={styles.card} data-scroll-reveal="contact-channel">
              <span className={styles.icon}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m4 7 8 6 8-6"/></svg></span><span className={styles.title}>Correo electrónico</span><span className={styles.description}>{site.email}</span><span className={styles.action}>Escribir un correo</span>
            </TrackedLink>
            <TrackedLink href={site.instagramUrl} external className={styles.card} data-scroll-reveal="contact-channel">
              <span className={styles.icon}><InstagramLogo /></span><span className={styles.title}>Instagram</span><span className={styles.description}>Descubre contenidos y reflexiones en mi perfil.</span><span className={styles.action}>Visitar Instagram</span>
            </TrackedLink>
          </div>
          <p className={styles.note}>Las sesiones son online y duran 60 minutos. El formulario es para consultas; la reserva se confirma en Doctoralia.</p>
        </div>
        <ContactForm />
      </Container>
    </section>
  </>;
}
