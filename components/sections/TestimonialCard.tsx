import styles from './TestimonialCard.module.css';
import { testimonialSource } from '@/content/testimonials';
import { DoctoraliaButton } from '@/components/ui/DoctoraliaButton';

export function TestimonialCard({ quote, author, date, homeStyle = false }: { quote: string; author: string; date: string; homeStyle?: boolean }) {
  return <figure className={`${styles['testimonial-card']} ${homeStyle ? styles.homeCard : ''}`}><blockquote>{homeStyle && <span className={styles.quoteMark} aria-hidden="true">“</span>}“{quote}”</blockquote><figcaption><span>{author}</span><time>{date}</time></figcaption><DoctoraliaButton href={testimonialSource} label={`opinion-${author}`}>Leer en Doctoralia</DoctoraliaButton></figure>;
}
