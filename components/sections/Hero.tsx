import Image from 'next/image';
import { Container } from '@/components/ui/Container';
import { ArrowIcon } from '@/components/ui/ArrowIcon';
import { ButtonLink } from '@/components/ui/Button';
import { site } from '@/lib/site';
import styles from './Hero.module.css';

export function Hero() {
  return (
    <section id="inicio" className={`hero ${styles.hero} ${styles['hero']}`} aria-labelledby="hero-title">
      <Container className={`hero-grid ${styles.layout} ${styles['hero-grid']}`}>
        <div className={`hero-copy ${styles.copy} ${styles['hero-copy']}`}>
          <p className={`eyebrow hero-stagger hero-stagger-1 ${styles.eyebrow} ${styles['hero-stagger']} ${styles['hero-stagger-1']}`}>
            Coaching personal y profesional · Diana Loscos
          </p>
          <h1 id="hero-title" className={`hero-stagger hero-stagger-2 ${styles.title} ${styles['hero-stagger']} ${styles['hero-stagger-2']}`}>
            Aclara el siguiente <em>paso que quieres dar.</em>
          </h1>
          <p className={`hero-lede hero-stagger hero-stagger-3 ${styles.lede} ${styles['hero-lede']} ${styles['hero-stagger']} ${styles['hero-stagger-3']}`}>
            Un espacio para ordenar lo que estás viviendo, decidir con criterio y avanzar en lo personal y lo profesional.
          </p>
          <p className={`hero-stagger hero-stagger-3 ${styles.trustLine} ${styles['hero-stagger']} ${styles['hero-stagger-3']}`}>
            Psicóloga · Col. M-45396 · Coach Ejecutiva
          </p>
          <div className={`hero-actions hero-stagger hero-stagger-4 ${styles.actions} ${styles['hero-actions']} ${styles['hero-stagger']} ${styles['hero-stagger-4']}`}>
            <ButtonLink href={site.bookingUrl} external event="cta_booking_click" label="hero">
              Reservar una sesión <ArrowIcon diagonal />
            </ButtonLink>
            <ButtonLink href="/#proceso" variant="secondary">Ver cómo trabajo <ArrowIcon /></ButtonLink>
          </div>
          <p className={`hero-note hero-stagger hero-stagger-4 ${styles.note} ${styles['hero-note']} ${styles['hero-stagger']} ${styles['hero-stagger-4']}`}>
            Sesiones online de 60 minutos · Reserva en Doctoralia
          </p>
          <p className={`hero-signoff hero-stagger hero-stagger-4 ${styles.signoff} ${styles['hero-stagger']} ${styles['hero-stagger-4']} ${styles['hero-signoff']}`}>¿Empezamos?</p>
        </div>

        <figure className={`hero-portrait ${styles.portrait} ${styles['hero-portrait']}`}>
          <div className={`portrait-frame ${styles.portraitFrame} ${styles['portrait-frame']}`}>
            <Image
              src="/perfil.webp"
              alt="Retrato de Diana Loscos"
              width={356}
              height={402}
              loading="eager"
              fetchPriority="high"
              sizes="(max-width: 620px) 220px, (max-width: 860px) 220px, 380px"
            />
          </div>
          <figcaption className={styles.portraitCaption}><span>Diana Loscos</span><span>Coaching profesional</span></figcaption>
        </figure>
      </Container>
      <div className={`hero-baseline ${styles['hero-baseline']}`} aria-hidden="true" />
    </section>
  );
}
