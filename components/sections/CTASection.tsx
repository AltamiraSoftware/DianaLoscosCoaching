import { Container } from '@/components/ui/Container';
import { ButtonLink } from '@/components/ui/Button';
import { ArrowIcon } from '@/components/ui/ArrowIcon';
import { site } from '@/lib/site';
import { InstagramReel, type Reel } from './InstagramReel';
import styles from './CTASection.module.css';

export const instagramReels = {
  home: {
    title: 'Empezar aunque haya miedo',
    permalink: 'https://www.instagram.com/reel/DbJFltRqBk9/',
  },
  personal: {
    title: 'Suelta y confía',
    permalink: 'https://www.instagram.com/reel/Dd1_Oi8M8dF/',
  },
  professional: {
    title: 'Del “tengo que” a la acción',
    permalink: 'https://www.instagram.com/reel/DdrIOG1qOd5/',
  },
} satisfies Record<string, Reel>;

export function CTASection({ title = 'Tu siguiente paso puede empezar con una conversación.', copy = 'Reserva una sesión online y trae lo que hoy te ocupa. Empezaremos por ahí.', reel }: { title?: string; copy?: string; reel?: Reel }) {
  return <section id="contacto" className="cta-section"><Container><p className="eyebrow">Hablemos</p>{reel
    ? <div className={styles.withReel}>
      <div className={styles.copy}><h2>{title}</h2><p>{copy}</p><ButtonLink href={site.bookingUrl} external event="cta_booking_click" label="final" variant="light">Reservar una sesión <ArrowIcon diagonal /></ButtonLink></div>
      <InstagramReel reel={reel} />
    </div>
    : <div className="cta-layout"><div><h2>{title}</h2><p>{copy}</p></div><ButtonLink href={site.bookingUrl} external event="cta_booking_click" label="final" variant="light">Reservar una sesión <ArrowIcon diagonal /></ButtonLink></div>}
  </Container></section>;
}
