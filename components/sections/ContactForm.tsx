'use client';

import { useRef, useState, type FormEvent } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { useRouter } from 'next/navigation';
import { trackEvent } from '@/lib/analytics';

export function ContactForm() {
  const router = useRouter();
  const started = useRef(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  const onFocus = () => {
    if (!started.current) { started.current = true; trackEvent('contact_form_start', { form: 'contact' }); }
  };
  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity()) return;
    setBusy(true); setError('');
    const data = Object.fromEntries(new FormData(form).entries());
    try {
      const response = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
      if (!response.ok) throw new Error('No se pudo enviar el mensaje. Inténtalo de nuevo o escríbeme por email.');
      trackEvent('contact_form_submit', { form: 'contact' });
      router.push('/gracias/');
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'No se pudo enviar el mensaje.');
      setBusy(false);
    }
  };
  return <form className="contact-form" onSubmit={submit} onFocusCapture={onFocus}>
    <h2>Cuéntame qué pasa.</h2><p>Una nota breve es suficiente. Te responderé por correo.</p>
    <div className="form-grid"><div className="field"><label htmlFor="contact-name">Nombre *</label><input id="contact-name" name="name" autoComplete="given-name" maxLength={100} required /></div><div className="field"><label htmlFor="contact-email">Email *</label><input id="contact-email" name="email" type="email" autoComplete="email" maxLength={254} required /></div></div>
    <div className="field"><label htmlFor="contact-phone">Teléfono <span>(opcional)</span></label><input id="contact-phone" name="phone" type="tel" autoComplete="tel" maxLength={30} /></div>
    <div className="field"><label htmlFor="contact-message">¿Qué te gustaría trabajar? *</label><textarea id="contact-message" name="message" minLength={10} maxLength={3000} required placeholder="Puedes contarme brevemente en qué momento profesional te encuentras." /></div>
    <div className="honeypot" aria-hidden="true"><label htmlFor="contact-website">Deja este campo vacío</label><input id="contact-website" name="website" tabIndex={-1} autoComplete="off" /></div>
    <label className="form-consent"><input type="checkbox" name="privacy" value="yes" required /><span>He leído la <Link href="/privacidad/" target="_blank">política de privacidad</Link> y acepto el tratamiento de mis datos para responder a esta consulta. *</span></label>
    <Button type="submit" disabled={busy}>{busy ? 'Enviando…' : 'Enviar mensaje'}</Button>
    {error && <p className="form-status form-error" role="alert">{error}</p>}
  </form>;
}
