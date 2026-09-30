import type { ButtonHTMLAttributes, ComponentProps } from 'react';
import { TrackedLink } from '@/components/ui/TrackedLink';

export type ButtonVariant = 'primary' | 'secondary' | 'light' | 'ghost';

function buttonClass(variant: ButtonVariant, className?: string) {
  return ['button', `button-${variant}`, className].filter(Boolean).join(' ');
}

export function Button({ variant = 'primary', className, ...props }: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: ButtonVariant }) {
  return <button className={buttonClass(variant, className)} {...props} />;
}

export function ButtonLink({ variant = 'primary', className, ...props }: ComponentProps<typeof TrackedLink> & { variant?: ButtonVariant }) {
  return <TrackedLink className={buttonClass(variant, className)} {...props} />;
}
