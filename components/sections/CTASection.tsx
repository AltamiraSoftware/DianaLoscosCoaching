import { Container } from '@/components/ui/Container';
import { TrackedLink } from '@/components/ui/TrackedLink';
import { ArrowIcon } from '@/components/ui/ArrowIcon';
import { site } from '@/lib/site';

export function CTASection({ title = 'Tu siguiente paso puede empezar con una conversación.', copy = 'Reserva una sesión online y trae lo que hoy te ocupa. Empezaremos por ahí.' }: { title?: string; copy?: string }) {
  return <section id="contacto" className="cta-section"><Container><p className="eyebrow">Hablemos</p><div className="cta-layout"><div><h2>{title}</h2><p>{copy}</p></div><TrackedLink href={site.bookingUrl} external event="cta_booking_click" label="final" className="button button-light">Reservar una sesión <ArrowIcon diagonal /></TrackedLink></div></Container></section>;
}
