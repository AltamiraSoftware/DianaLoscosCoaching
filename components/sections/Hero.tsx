import Image from 'next/image';
import { Container } from '@/components/ui/Container';
import { ButtonLink } from '@/components/ui/Button';
import { StatusDots } from '@/components/ui/StatusDots';
import { home } from '@/content/home';
import { site } from '@/lib/site';
import styles from './Hero.module.css';

export function Hero() {
  const copy = home.hero;
  return <section id="inicio" className={styles.hero} aria-labelledby="hero-title">
    <Container className={styles.layout}>
      <div className={styles.copy}>
        <p className={styles.eyebrow}>{copy.eyebrow}</p>
        <h1 id="hero-title">{copy.title} <em>{copy.titleAccent}</em></h1>
        <StatusDots />
        <p className={styles.lede}>{copy.description}</p>
        <p className={styles.trustLine}>{copy.credentials}</p>
        <div className={styles.actions}><ButtonLink href={site.bookingUrl} external event="cta_booking_click" label="hero">{copy.primaryAction}</ButtonLink><ButtonLink href="/#para-quien" variant="secondary">{copy.secondaryAction}</ButtonLink></div>
        <p className={styles.note}>{copy.note}</p>
      </div>
      <figure className={styles.portrait}>
        <div className={styles.portraitFrame}><Image src="/perfil.webp" alt="Retrato de Diana Loscos" width={356} height={402} fetchPriority="high" sizes="(max-width: 620px) 85vw, (max-width: 860px) 35vw, 380px" /></div>
        <figcaption>{copy.photoCaption}</figcaption>
      </figure>
    </Container>
  </section>;
}
