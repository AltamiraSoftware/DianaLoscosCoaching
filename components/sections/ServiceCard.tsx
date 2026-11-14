import styles from './ServiceCard.module.css';
import Link from 'next/link';
import { TrackView } from '@/components/motion/TrackView';

export function ServiceCard({ eyebrow, title, description, href, homeStyle = false, featured = false }: { eyebrow: string; title: string; description: string; href: string; homeStyle?: boolean; featured?: boolean }) {
  return <Link href={href} className={`${styles['service-card']} ${homeStyle ? styles.homeCard : ''} ${featured ? styles.featured : ''}`}><TrackView event="service_view" label={title} /><p className="eyebrow">{eyebrow}</p><h3>{title}</h3><p>{description}</p><span className={`diana-text-link ${styles['service-card-action']}`}>Conocer el servicio</span></Link>;
}
