import styles from './DoctoraliaProof.module.css';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/sections/SectionHeading';
import { TestimonialCard } from '@/components/sections/TestimonialCard';
import { TrackView } from '@/components/motion/TrackView';
import { testimonials } from '@/content/testimonials';
import { home } from '@/content/home';
import { site } from '@/lib/site';
import { DoctoraliaButton } from '@/components/ui/DoctoraliaButton';

export function DoctoraliaProof({ full = false }: { full?: boolean }) {
  const shown = full ? testimonials : home.testimonials.items;
  return <section className="section section-ivory"><Container><TrackView event="testimonial_view" label={full ? 'opiniones' : 'home'} /><div className={`section-header-row ${styles['section-header-row']}`}><SectionHeading eyebrow={full ? 'En palabras de quienes han venido' : home.testimonials.eyebrow} title={full ? 'La confianza se construye en la conversación.' : home.testimonials.title} tone={full ? undefined : 'light'}><p>{full ? 'Extractos breves de opiniones públicas. Cada experiencia es personal y no anticipa resultados.' : home.testimonials.description}</p>{full && <p>El coaching no sustituye atención psicológica, médica ni psiquiátrica.</p>}</SectionHeading><DoctoraliaButton href={site.bookingUrl} label="opiniones-marca" className={`doctoralia-mark ${styles.profileButton}`}>Ver perfil en Doctoralia</DoctoraliaButton></div><div className={`testimonial-grid ${styles['testimonial-grid']}`}>{shown.map(item => <TestimonialCard key={item.author} {...item} homeStyle={!full} />)}</div>{!full && <p className={styles.note}>{home.testimonials.note}</p>}<DoctoraliaButton href={site.bookingUrl} label="opiniones-seccion">Ver todas las opiniones en Doctoralia</DoctoraliaButton></Container></section>;
}
