import styles from './SituationCard.module.css';
import Link from 'next/link';

export function SituationCard({ number, title, description, href }: { number: string; title: string; description: string; href: string }) {
  return <Link href={href} className={styles['situation-row']}><span className={styles['situation-number']}>{number}</span><span className={styles['situation-content']}><strong>{title}</strong><span>{description}</span><span className={`diana-text-link ${styles['situation-action']}`}>Explorar esta situación</span></span></Link>;
}
