import type { ReactNode } from 'react';
import { StatusDots, type StatusDotsTone } from '@/components/ui/StatusDots';
import styles from './SectionHeading.module.css';

export function SectionHeading({ eyebrow, title, children, light = false, tone }: { eyebrow: string; title: ReactNode; children?: ReactNode; light?: boolean; tone?: StatusDotsTone }) {
  return <div className={`section-heading ${light ? 'section-heading-light' : ''} ${tone ? styles.withDots : ''} ${tone === 'dark' ? styles.dark : ''}`}><p className="eyebrow">{eyebrow}</p><h2>{title}</h2>{children && <div className="section-lede">{children}</div>}{tone && <div className={styles.divider}><StatusDots tone={tone} /></div>}</div>;
}
