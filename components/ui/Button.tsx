import styles from './Button.module.css';
import type { ButtonHTMLAttributes, ComponentProps, CSSProperties } from 'react';
import { TrackedLink } from '@/components/ui/TrackedLink';

export type ButtonVariant = 'primary' | 'secondary' | 'onDark' | 'light';
type ButtonLinkAppearance = ButtonVariant;

/**
 * Sistema unificado de botones según el fondo donde se colocan.
 *  - primary  : sobre fondo claro  → sólido petrol
 *  - secondary: sobre fondo claro  → contorno (outline)
 *  - onDark   : sobre fondo oscuro → claro/blanco
 *  - light    : alias de onDark (fondo oscuro, botón claro)
 */
function buttonClass(variant: ButtonLinkAppearance, className?: string) {
  if (variant === 'onDark' || variant === 'light') {
    return ['diana-button', styles.onDark, className].filter(Boolean).join(' ');
  }
  return ['diana-button', `diana-button--${variant}`, className].filter(Boolean).join(' ');
}

export function Button({ variant = 'primary', className, style, ...props }: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: ButtonVariant }) {
  return <button className={buttonClass(variant, className)} style={style} {...props} />;
}

export function ButtonLink({ variant = 'primary', className, style, ...props }: ComponentProps<typeof TrackedLink> & { variant?: ButtonLinkAppearance; style?: CSSProperties }) {
  const linkProps = { ...props, className: buttonClass(variant, className), style };
  return <TrackedLink {...linkProps} />;
}