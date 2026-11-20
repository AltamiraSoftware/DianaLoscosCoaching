import styles from './StatusDots.module.css';

export type StatusDotsTone = 'light' | 'dark';

export function StatusDots({ tone = 'light', className }: { tone?: StatusDotsTone; className?: string }) {
  return <svg className={`${styles.dots} ${tone === 'dark' ? styles.dark : styles.light} ${className ?? ''}`} viewBox="0 0 112 22" width="112" height="22" aria-hidden="true" focusable="false">
    {[11, 41, 71].map(cx => <g key={cx}><circle cx={cx} cy="11" r="9" fill="currentColor" /><path d={`M ${cx - 4} 11 l 2.5 2.5 5 -5`} fill="none" stroke="var(--dots-check)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></g>)}
    <circle cx="101" cy="11" r="9" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3" />
  </svg>;
}
