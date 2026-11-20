import type { ReactNode } from 'react';

export function SectionHeading({ eyebrow, title, children, light = false, tone, center = false }: { eyebrow: string; title: ReactNode; children?: ReactNode; light?: boolean; tone?: 'light' | 'dark'; center?: boolean }) {
  return <div className={`section-heading ${light ? 'section-heading-light' : ''} ${tone === 'dark' ? 'section-heading-dark' : ''} ${center ? 'section-heading-center' : ''}`}><p className="eyebrow">{eyebrow}</p><h2>{title}</h2>{children && <div className="section-lede">{children}</div>}</div>;
}