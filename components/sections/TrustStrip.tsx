import { Container } from '@/components/ui/Container';
import { site } from '@/lib/site';
import { BrandLink } from '@/components/ui/BrandLink';
import { ArrowIcon } from '@/components/ui/ArrowIcon';

export function TrustStrip() {
  return <section className="trust-strip" aria-label="Formación y modalidad"><Container className="trust-grid"><p><strong>Grado en Psicología</strong><span>Universidad Nebrija</span></p><p><strong>Coaching ejecutivo</strong><span>Escuela Europea de Coaching</span></p><p><strong>Colegiada M-45396</strong><span>Dato publicado en Doctoralia</span></p><BrandLink href={site.bookingUrl} external event="doctoralia_click" label="trust-strip" light>Ver perfil y credenciales <ArrowIcon diagonal /></BrandLink></Container></section>;
}
