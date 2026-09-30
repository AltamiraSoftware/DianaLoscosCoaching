import type { ComponentProps } from 'react';
import { TrackedLink } from '@/components/ui/TrackedLink';

export function BrandLink({ className, light = false, ...props }: ComponentProps<typeof TrackedLink> & { light?: boolean }) {
  return <TrackedLink className={['brand-link', light && 'brand-link-light', className].filter(Boolean).join(' ')} {...props} />;
}
