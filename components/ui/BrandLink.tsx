import type { ComponentProps } from 'react';
import { TrackedLink } from '@/components/ui/TrackedLink';

export function BrandLink({ className, light = false, ...props }: ComponentProps<typeof TrackedLink> & { light?: boolean }) {
  const linkProps = {
    ...props,
    className: ['diana-text-link', className].filter(Boolean).join(' '),
    style: { minHeight: 44, width: 'fit-content', ...(light && { color: 'var(--diana-color-white)' }) },
  };
  return <TrackedLink {...linkProps} />;
}
