import { ContactForm } from '@/components/sections/ContactForm';
import { Container } from '@/components/ui/Container';
import styles from './ContactSection.module.css';

export function ContactSection() {
  return <section className={`section ${styles.section}`} aria-labelledby="contact-section-title">
    <Container className={styles.layout}>
      <div className={styles.intro}>
        <p className="eyebrow">Antes de reservar</p>
        <h2 id="contact-section-title">¿Quieres contarme qué te trae aquí?</h2>
        <p>Si tienes una pregunta antes de reservar, escríbeme. Una nota breve es suficiente para empezar la conversación.</p>
        <p>El formulario es para consultas; las sesiones se reservan en Doctoralia.</p>
      </div>
      <ContactForm />
    </Container>
  </section>;
}
