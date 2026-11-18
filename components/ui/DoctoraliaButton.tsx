import type { ReactNode } from 'react';
import { ButtonLink } from './Button';
import { DoctoraliaLogo } from './BrandLogos';
import type { AnalyticsEvent } from '@/lib/analytics';
import styles from './DoctoraliaButton.module.css';

export function DoctoraliaButton({ href, children, label, event = 'doctoralia_click', className = '' }: { href: string; children: ReactNode; label: string; event?: AnalyticsEvent; className?: string }) {
  return <ButtonLink href={href} external event={event} label={label} variant="secondary" className={`${styles.button} ${className}`}><DoctoraliaLogo className={styles.icon} /><span>{children}</span></ButtonLink>;
}
