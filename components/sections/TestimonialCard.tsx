import styles from './TestimonialCard.module.css';
import { testimonialSource } from '@/content/testimonials';
import { BrandLink } from '@/components/ui/BrandLink';

export function TestimonialCard({ quote, author, date, homeStyle = false }: { quote: string; author: string; date: string; homeStyle?: boolean }) {
  return <figure className={`${styles['testimonial-card']} ${homeStyle ? styles.homeCard : ''}`}><blockquote>{homeStyle && <span className={styles.quoteMark} aria-hidden="true">“</span>}“{quote}”</blockquote><figcaption><span>{author}</span><time>{date}</time></figcaption><BrandLink href={testimonialSource} external event="doctoralia_click" label={`opinion-${author}`}>Leer en Doctoralia</BrandLink></figure>;
}
