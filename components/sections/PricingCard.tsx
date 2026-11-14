import { prices, SHOW_PRICES, site } from '@/lib/site';
import { home } from '@/content/home';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/sections/SectionHeading';
import { ButtonLink } from '@/components/ui/Button';
import { TrackView } from '@/components/motion/TrackView';
import styles from './PricingCard.module.css';

export function PricingCard() {
  return <section id="inversion" className={`section ${styles.section}`}><Container><span id="precios" /><TrackView event="pricing_view" label="home" /><SectionHeading eyebrow={home.pricing.eyebrow} title={home.pricing.title} tone="light"><p>{home.pricing.description}</p></SectionHeading>{SHOW_PRICES ? <div className={styles.grid}>{prices.map((price, index) => <article className={`${styles.card} ${index === 1 ? styles.recommended : ''}`} key={price.name}>{index === 1 && <span className={styles.badge}>{home.pricing.recommended}</span>}<h3>{price.name}</h3><p>{price.detail}</p>{'perSession' in price && <p className={styles.perSession}>{price.perSession} <span className={styles.saving}>{price.saving}</span></p>}<strong>{price.price}</strong><ButtonLink href={index === 0 ? site.bookingUrl : '/contacto/'} external={index === 0} event={index === 0 ? 'cta_booking_click' : undefined} label="pricing" variant={index === 1 ? 'onDark' : 'primary'}>{home.pricing.items[index].action}</ButtonLink></article>)}</div> : <ButtonLink href="/contacto/">{home.pricing.fallbackAction}</ButtonLink>}<p className={styles.note}>{home.pricing.note}</p></Container></section>;
}
