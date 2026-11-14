import styles from './DoctoraliaProof.module.css';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/sections/SectionHeading';
import { TestimonialCard } from '@/components/sections/TestimonialCard';
import { TrackView } from '@/components/motion/TrackView';
import { testimonials } from '@/content/testimonials';
import { home } from '@/content/home';
import { site } from '@/lib/site';
import { BrandLink } from '@/components/ui/BrandLink';
import { ArrowIcon } from '@/components/ui/ArrowIcon';
import { DoctoraliaLogo } from '@/components/ui/BrandLogos';

export function DoctoraliaProof({ full = false }: { full?: boolean }) {
  const shown = full ? testimonials : home.testimonials.items;
  return <section className="section section-ivory"><Container><TrackView event="testimonial_view" label={full ? 'opiniones' : 'home'} /><div className={`section-header-row ${styles['section-header-row']}`}><SectionHeading eyebrow={full ? 'En palabras de quienes han venido' : home.testimonials.eyebrow} title={full ? 'La confianza se construye en la conversación.' : home.testimonials.title} tone={full ? undefined : 'light'}><p>{full ? 'Extractos breves de opiniones públicas. Cada experiencia es personal y no anticipa resultados.' : home.testimonials.description}</p>{full && <p>El coaching no sustituye atención psicológica, médica ni psiquiátrica.</p>}</SectionHeading><BrandLink href={site.bookingUrl} external event="doctoralia_click" label="opiniones-marca" className={`doctoralia-mark ${styles['doctoralia-mark']}`}><DoctoraliaLogo className="h-6 w-6" />Doctoralia <ArrowIcon diagonal /></BrandLink></div><div className={`testimonial-grid ${styles['testimonial-grid']}`}>{shown.map(item => <TestimonialCard key={item.author} {...item} homeStyle={!full} />)}</div>{!full && <p className={styles.note}>{home.testimonials.note}</p>}<BrandLink href={site.bookingUrl} external event="doctoralia_click" label="opiniones-seccion">{full ? 'Ver todas las opiniones en Doctoralia' : home.testimonials.allAction}</BrandLink></Container></section>;
}
