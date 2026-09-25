import type { Metadata } from 'next';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';

export const metadata: Metadata = { title: 'Mensaje enviado', robots: { index: false, follow: false } };
export default function Page() { return <section className="not-found"><Container><p className="eyebrow">Mensaje recibido</p><h1 style={{ fontSize: 'clamp(56px, 7vw, 90px)' }}>Gracias por escribirme.</h1><p>Tu mensaje se ha enviado. Te responderé por correo.</p><Link href="/" className="button button-primary">Volver al inicio →</Link></Container></section>; }
