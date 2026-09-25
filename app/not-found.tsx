import Link from 'next/link';
import { Container } from '@/components/ui/Container';

export default function NotFound() { return <section className="not-found"><Container><p className="eyebrow">Error 404</p><h1 style={{ fontSize: 'clamp(60px, 8vw, 110px)' }}>Esta página no está aquí.</h1><p>Puede que la dirección haya cambiado. Puedes volver al inicio o explorar los servicios.</p><Link href="/" className="button button-primary">Volver al inicio →</Link></Container></section>; }
