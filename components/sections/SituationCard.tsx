import styles from './SituationCard.module.css';
import Link from 'next/link';

export function SituationCard({ number, title, description, href, homeStyle = false }: { number: string; title: string; description: string; href: string; homeStyle?: boolean }) {
  return <Link href={href} className={`${styles['situation-row']} ${homeStyle ? styles.homeCard : ''}`}><span className={styles['situation-number']}>{number}</span><span className={styles['situation-content']}><strong>{title}</strong><span>{description}</span><span className={`diana-button diana-button--primary ${styles['situation-action']}`}>Explorar esta situación</span></span></Link>;
}
