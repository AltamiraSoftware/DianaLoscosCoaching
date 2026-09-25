'use client';

import Link from 'next/link';
import type { ReactNode } from 'react';
import { trackEvent, type AnalyticsEvent } from '@/lib/analytics';

type Props = { href: string; children: ReactNode; className?: string; event?: AnalyticsEvent; label?: string; external?: boolean; 'aria-label'?: string };

export function TrackedLink({ href, children, className, event, label, external, ...rest }: Props) {
  const onClick = () => {
    if (event) trackEvent(event, { destination: href, label: label || '' });
    if (event === 'cta_booking_click') trackEvent('doctoralia_click', { destination: href, label: label || '' });
  };
  if (external || href.startsWith('https://') || href.startsWith('mailto:')) {
    return <a href={href} className={className} onClick={onClick} target={href.startsWith('https://') ? '_blank' : undefined} rel={href.startsWith('https://') ? 'noopener noreferrer' : undefined} {...rest}>{children}</a>;
  }
  return <Link href={href} className={className} onClick={onClick} {...rest}>{children}</Link>;
}
