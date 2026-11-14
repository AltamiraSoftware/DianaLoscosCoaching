import { Container } from '@/components/ui/Container';
import { ButtonLink } from '@/components/ui/Button';
import { SectionHeading } from './SectionHeading';
import { ContactForm } from './ContactForm';
import { InstagramReel } from './InstagramReel';
import { instagramReels } from './CTASection';
import { home } from '@/content/home';
import { site } from '@/lib/site';
import styles from './HomeContact.module.css';

export function HomeContactForm() {
  return <section id="contacto" className={styles.section}><Container><div className={styles.layout}><div><SectionHeading eyebrow={home.contact.eyebrow} title={home.contact.title} tone="dark"><p>{home.contact.description}</p></SectionHeading><p className={styles.guarantee}>{home.process.trust}</p></div><ContactForm /></div></Container></section>;
}

export function HomeClosing() {
  return <section id="hablemos" className={styles.section}><Container><div className={styles.closing}><div data-scroll-reveal="cta-copy"><SectionHeading eyebrow={home.closing.eyebrow} title={home.closing.title} tone="dark"><p>{home.closing.description}</p></SectionHeading><ButtonLink href={site.bookingUrl} external event="cta_booking_click" label="final" variant="onDark">{home.closing.action}</ButtonLink></div><div data-scroll-reveal="cta-media"><InstagramReel reel={instagramReels.home} /><p className={styles.motto}>{home.closing.motto}</p></div></div></Container></section>;
}
