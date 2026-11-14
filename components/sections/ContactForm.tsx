'use client';

import { useRef, useState, type FormEvent } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { home } from '@/content/home';
import { isValidPhone } from '@/lib/contact';
import { trackEvent } from '@/lib/analytics';
import styles from './ContactForm.module.css';

type FieldName = 'name' | 'email' | 'phone' | 'callWindow' | 'message' | 'privacy';
type Errors = Partial<Record<FieldName, string>>;

export function ContactForm() {
  const router = useRouter();
  const started = useRef(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [errors, setErrors] = useState<Errors>({});
  const copy = home.contact;
  const onFocus = () => { if (!started.current) { started.current = true; trackEvent('contact_form_start', { form: 'contact' }); } };
  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    const next: Errors = {};
    for (const name of ['name', 'email', 'phone', 'callWindow', 'message', 'privacy'] as const) {
      const field = form.elements.namedItem(name) as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement | null;
      if (field && !field.checkValidity()) next[name] = name === 'email' ? 'Introduce un correo válido.' : name === 'message' ? 'Escribe al menos 10 caracteres.' : 'Completa este campo.';
    }
    if (typeof data.phone === 'string' && !isValidPhone(data.phone.trim())) next.phone = 'Introduce un teléfono válido.';
    setErrors(next);
    if (Object.keys(next).length) { const first = Object.keys(next)[0] as FieldName; (form.elements.namedItem(first) as HTMLElement | null)?.focus(); return; }
    setBusy(true); setError('');
    try {
      const response = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
      if (!response.ok) throw new Error('No se pudo enviar el mensaje. Inténtalo de nuevo o escríbeme por email.');
      trackEvent('contact_form_submit', { form: 'contact' });
      router.push('/gracias/');
    } catch (cause) { setError(cause instanceof Error ? cause.message : 'No se pudo enviar el mensaje.'); setBusy(false); }
  };
  const attributes = (name: FieldName) => ({ 'aria-invalid': errors[name] ? true : undefined, 'aria-describedby': errors[name] ? `contact-${name}-error` : undefined });
  const fieldError = (name: FieldName) => errors[name] && <span className={styles.fieldError} id={`contact-${name}-error`}>{errors[name]}</span>;
  return <form className={`contact-form ${styles['contact-form']}`} onSubmit={submit} onFocusCapture={onFocus} noValidate>
    <h2>{copy.formTitle}</h2><p>{copy.formDescription}</p>
    <div className={`form-grid ${styles['form-grid']}`}><div className={`field ${styles.field}`}><label htmlFor="contact-name">{copy.fields.name}</label><input id="contact-name" name="name" autoComplete="given-name" maxLength={100} required {...attributes('name')} />{fieldError('name')}</div><div className={`field ${styles.field}`}><label htmlFor="contact-email">{copy.fields.email}</label><input id="contact-email" name="email" type="email" autoComplete="email" maxLength={254} required {...attributes('email')} />{fieldError('email')}</div></div>
    <div className={`field ${styles.field}`}><label htmlFor="contact-phone">{copy.fields.phone}</label><input id="contact-phone" name="phone" type="tel" autoComplete="tel" maxLength={30} required {...attributes('phone')} />{fieldError('phone')}</div>
    <div className={`field ${styles.field}`}><label htmlFor="contact-window">{copy.fields.callWindow}</label><select id="contact-window" name="callWindow" defaultValue="" required {...attributes('callWindow')}><option value="" disabled>Selecciona una franja</option>{copy.callWindows.map(option => <option key={option.value} value={option.value}>{option.label}</option>)}</select>{fieldError('callWindow')}</div>
    <div className={`field ${styles.field}`}><label htmlFor="contact-message">{copy.fields.message}</label><textarea id="contact-message" name="message" minLength={10} maxLength={3000} required placeholder={copy.fields.messagePlaceholder} {...attributes('message')} />{fieldError('message')}</div>
    <div className={`honeypot ${styles.honeypot}`} aria-hidden="true"><label htmlFor="contact-website">Deja este campo vacío</label><input id="contact-website" name="website" tabIndex={-1} autoComplete="off" /></div>
    <label className={`form-consent ${styles['form-consent']}`}><input type="checkbox" name="privacy" value="yes" required {...attributes('privacy')} /><span>{copy.fields.privacy.split('política de privacidad')[0]}<Link href="/privacidad/" target="_blank">política de privacidad</Link>{copy.fields.privacy.split('política de privacidad')[1]} *</span></label>{fieldError('privacy')}
    <Button type="submit" disabled={busy}>{busy ? 'Enviando…' : 'Enviar mensaje'}</Button>
    {error && <p className={`form-status form-error ${styles['form-status']} ${styles['form-error']}`} role="alert">{error}</p>}
  </form>;
}
