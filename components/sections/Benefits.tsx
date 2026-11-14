import { Container } from '@/components/ui/Container';
import { SectionHeading } from './SectionHeading';
import { home, type BenefitCopy } from '@/content/home';
import styles from './Benefits.module.css';

const icons = [
  <><circle cx="12" cy="8" r="3" /><path d="M5 21c0-4 3-6 7-6s7 2 7 6" /></>,
  <><path d="m12 3 2.7 5.5 6 .9-4.3 4.2 1 6L12 16.8 6.6 20l1-6-4.3-4.6 6-.9z" /></>,
  <><path d="M4 5h16v11H9l-5 4z" /><path d="M8 9h8M8 12h5" /></>,
  <><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="5" /><path d="m12 12 8-8" /></>,
  <><path d="M12 21S4 17 4 10a4 4 0 0 1 8-1 4 4 0 0 1 8 1c0 7-8 11-8 11z" /></>,
  <><circle cx="12" cy="12" r="9" /><path d="m15.8 8.2-2.2 5.4-5.4 2.2 2.2-5.4z" /></>,
];

export function BenefitTile({ item, index }: { item: BenefitCopy; index: number }) {
  return <article className={styles.tile}><svg viewBox="0 0 24 24" width="36" height="36" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{icons[index]}</svg><h3>{item.title}</h3><p>{item.description}</p></article>;
}

export function Benefits() {
  return <section className={`section ${styles.section}`}><Container><SectionHeading eyebrow={home.benefits.eyebrow} title={home.benefits.title} tone="light"><p>{home.benefits.description}</p></SectionHeading><div className={styles.grid}>{home.benefits.items.map((item, index) => <BenefitTile key={item.title} item={item} index={index} />)}</div><p className={styles.note}>{home.benefits.note}</p></Container></section>;
}
