import { site } from '@/lib/site';
import { BrandLink } from '@/components/ui/BrandLink';
import { ArrowIcon } from '@/components/ui/ArrowIcon';

export function Credentials() {
  return <div className="credentials"><div><span>01</span><p>Grado en Psicología<br /><small>Universidad Nebrija</small></p></div><div><span>02</span><p>Coaching Ejecutivo<br /><small>Escuela Europea de Coaching</small></p></div><div><span>03</span><p>Psicóloga colegiada<br /><small>N.º M-45396</small></p></div><BrandLink href={site.bookingUrl} external event="doctoralia_click" label="credentials">Consultar datos en Doctoralia <ArrowIcon diagonal /></BrandLink></div>;
}
