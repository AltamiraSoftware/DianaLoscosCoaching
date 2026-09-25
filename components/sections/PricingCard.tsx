import { prices, site } from '@/lib/site';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/sections/SectionHeading';
import { TrackedLink } from '@/components/ui/TrackedLink';
import { ArrowIcon } from '@/components/ui/ArrowIcon';
import { TrackView } from '@/components/motion/TrackView';

export function PricingCard() {
  return <section id="inversion" className="section section-pricing"><Container><span id="precios" /><TrackView event="pricing_view" label="home" /><div className="pricing-layout"><SectionHeading eyebrow="Inversión" title="Claridad también en el precio."><p>Empieza con una sesión individual o consulta la opción de proceso que encaje con lo que quieres trabajar.</p></SectionHeading><div className="pricing-panel"><div className="pricing-head"><span>Sesiones online</span><span>60 min por sesión</span></div>{prices.map(price => <div className="price-row" key={price.name}><div><strong>{price.name}</strong><small>{price.detail}</small></div><span>{price.price}</span></div>)}<div className="pricing-footer"><p>Precios publicados por Diana; la sesión individual figura también en Doctoralia. Confirma condiciones y disponibilidad al reservar.</p><TrackedLink href={site.bookingUrl} external event="cta_booking_click" label="pricing" className="button button-primary">Reservar una sesión <ArrowIcon diagonal /></TrackedLink></div></div></div></Container></section>;
}
