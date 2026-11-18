'use client';

import { useRef, useState, type FormEvent } from 'react';
import { site } from '@/lib/site';
import { isValidPhone } from '@/lib/contact';
import { trackEvent } from '@/lib/analytics';
import { ChatLogo } from './ChatLogo';
import styles from './ChatWidget.module.css';

type Step = 'menu' | 'form' | 'done';
type FieldName = 'name' | 'email' | 'phone' | 'message';

const WELCOME = [
  'Hola, soy Diana. ¿En qué puedo ayudarte?',
  'Puedo resolver dudas sobre las sesiones y facilitarte la reserva.',
] as const;

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<Step>('menu');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [errors, setErrors] = useState<Partial<Record<FieldName, string>>>({});
  const inputRef = useRef<HTMLFormElement>(null);

  const toggle = () => {
    const next = !open;
    setOpen(next);
    if (next) trackEvent('chat_open', { origin: 'floating' });
    else setStep('menu');
  };

  const choose = (action: 'book' | 'form' | 'whatsapp') => {
    trackEvent('chat_choice', { choice: action });
    if (action === 'book') { window.open(site.bookingUrl, '_blank', 'noopener'); trackEvent('cta_booking_click', { label: 'chat' }); }
    else if (action === 'whatsapp') { window.open(site.whatsappUrl, '_blank', 'noopener'); trackEvent('whatsapp_click', { label: 'chat' }); }
    else { setStep('form'); }
  };

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    const next: Partial<Record<FieldName, string>> = {};
    if (!String(data.name ?? '').trim()) next.name = 'Dime tu nombre.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(data.email ?? ''))) next.email = 'Introduce un correo válido.';
    if (typeof data.phone === 'string' && !isValidPhone(data.phone.trim())) next.phone = 'Introduce un teléfono válido.';
    if (String(data.message ?? '').length < 10) next.message = 'Escribe al menos 10 caracteres.';
    setErrors(next);
    if (Object.keys(next).length) return;
    setBusy(true); setError('');
    try {
      const response = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...data, callWindow: 'manana', privacy: 'yes', website: '' }) });
      if (!response.ok) throw new Error('No se pudo enviar el mensaje. Inténtalo de nuevo.');
      trackEvent('contact_form_submit', { form: 'chat' });
      setStep('done');
    } catch (cause) { setError(cause instanceof Error ? cause.message : 'No se pudo enviar el mensaje.'); setBusy(false); }
  };

  return (
    <div className={styles.zone}>
      {open && (
        <section className={styles.panel} aria-label="Chat con Diana Loscos">
          <header className={styles.header}>
            <span className={styles.avatar} aria-hidden="true">D</span>
            <div><strong>Asistente de Diana Loscos</strong><span className={styles.status}>Te ayudo con dudas y reservas</span></div>
            <button type="button" className={styles.close} onClick={toggle} aria-label="Cerrar chat">×</button>
          </header>

          <div className={styles.body}>
            {step === 'menu' && (
              <>
                <p className={`${styles.bubble} ${styles.bot}`}>{WELCOME[0]}</p>
                <p className={`${styles.bubble} ${styles.bot} ${styles.botSecondary}`}>{WELCOME[1]}</p>
                <div className={styles.options}>
                  <button type="button" className={styles.option} onClick={() => choose('book')}>Reservar una sesión</button>
                  <button type="button" className={styles.option} onClick={() => choose('form')}>Tengo una duda</button>
                  <button type="button" className={styles.option} onClick={() => choose('whatsapp')}>Hablar por WhatsApp</button>
                </div>
              </>
            )}

            {step === 'form' && (
              <form ref={inputRef} className={styles.form} onSubmit={submit} noValidate>
                <p className={`${styles.bubble} ${styles.bot}`}>Cuéntame, ¿en qué puedo ayudarte? Te responderé por correo.</p>
                <label className={styles.field}><span>Nombre</span><input name="name" maxLength={100} required aria-invalid={!!errors.name} /></label>
                {errors.name && <p className={styles.fieldError}>{errors.name}</p>}
                <label className={styles.field}><span>Email</span><input name="email" type="email" maxLength={254} required aria-invalid={!!errors.email} /></label>
                {errors.email && <p className={styles.fieldError}>{errors.email}</p>}
                <label className={styles.field}><span>Teléfono</span><input name="phone" type="tel" maxLength={30} required aria-invalid={!!errors.phone} /></label>
                {errors.phone && <p className={styles.fieldError}>{errors.phone}</p>}
                <label className={styles.field}><span>Tu mensaje</span><textarea name="message" minLength={10} maxLength={3000} required aria-invalid={!!errors.message} /></label>
                {errors.message && <p className={styles.fieldError}>{errors.message}</p>}
                <button type="submit" className={styles.send} disabled={busy}>{busy ? 'Enviando…' : 'Enviar consulta'}</button>
                {error && <p className={styles.formStatus} role="alert">{error}</p>}
              </form>
            )}

            {step === 'done' && (
              <>
                <p className={`${styles.bubble} ${styles.bot}`}>¡Gracias! He recibido tu consulta. Te responderé en breve, normalmente en 24 h.</p>
                <p className={`${styles.bubble} ${styles.bot} ${styles.botSecondary}`}>Si prefieres algo más inmediato, también puedes llamarme por WhatsApp.</p>
                <button type="button" className={styles.option} onClick={() => choose('whatsapp')}>Abrir WhatsApp</button>
              </>
            )}
          </div>
        </section>
      )}

      <button type="button" className={styles.button} onClick={toggle} aria-label={open ? 'Cerrar asistente' : 'Abrir asistente de reserva'} aria-expanded={open}>
        <ChatLogo open={open} />
      </button>
    </div>
  );
}