import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/sections/SectionHeading';
import { TestimonialCard } from '@/components/sections/TestimonialCard';
import { TrackView } from '@/components/motion/TrackView';
import { testimonials } from '@/content/testimonials';
import { site } from '@/lib/site';
import { BrandLink } from '@/components/ui/BrandLink';
import { ArrowIcon } from '@/components/ui/ArrowIcon';
import { DoctoraliaLogo } from '@/components/ui/BrandLogos';

export function DoctoraliaProof({ full = false }: { full?: boolean }) {
  const shown = full ? testimonials : testimonials.slice(0, 3);
  return <section className="section section-ivory"><Container><TrackView event="testimonial_view" label={full ? 'opiniones' : 'home'} /><div className="section-header-row"><SectionHeading eyebrow="En palabras de quienes han venido" title="La confianza se construye en la conversación."><p>Extractos breves de opiniones públicas. Cada experiencia es personal y no anticipa resultados.</p></SectionHeading><BrandLink href={site.bookingUrl} external event="doctoralia_click" label="opiniones-marca" className="doctoralia-mark"><DoctoraliaLogo className="h-6 w-6" />Doctoralia <ArrowIcon diagonal /></BrandLink></div><div className="testimonial-grid">{shown.map(item => <TestimonialCard key={item.author} {...item} />)}</div><BrandLink href={site.bookingUrl} external event="doctoralia_click" label="opiniones-seccion">Ver todas las opiniones en Doctoralia <ArrowIcon diagonal /></BrandLink></Container></section>;
}
