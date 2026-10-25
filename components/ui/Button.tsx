import type { ButtonHTMLAttributes, ComponentProps, CSSProperties } from 'react';
import { TrackedLink } from '@/components/ui/TrackedLink';

export type ButtonVariant = 'primary' | 'secondary';
type ButtonLinkAppearance = ButtonVariant | 'light';

function buttonClass(variant: ButtonLinkAppearance, className?: string) {
  return [
    'diana-button',
    `diana-button--${variant === 'light' ? 'primary' : variant}`,
    variant === 'light' && 'button button-light',
    className,
  ].filter(Boolean).join(' ');
}

function buttonStyle(variant: ButtonLinkAppearance, style?: CSSProperties): CSSProperties {
  return {
    borderRadius: 'var(--diana-radius-md)',
    ...(variant === 'light' && {
      backgroundColor: 'var(--diana-color-white)',
      borderColor: 'var(--diana-color-white)',
      color: 'var(--diana-color-petrol)',
      boxShadow: 'none',
    }),
    ...style,
  };
}

export function Button({ variant = 'primary', className, style, ...props }: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: ButtonVariant }) {
  return <button className={buttonClass(variant, className)} style={buttonStyle(variant, style)} {...props} />;
}

export function ButtonLink({ variant = 'primary', className, ...props }: ComponentProps<typeof TrackedLink> & { variant?: ButtonLinkAppearance }) {
  const linkProps = { ...props, className: buttonClass(variant, className), style: buttonStyle(variant) };
  return <TrackedLink {...linkProps} />;
}
