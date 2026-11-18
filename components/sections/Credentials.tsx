import interiorStyles from '@/app/Interior.module.css';
import { site } from '@/lib/site';
import { DoctoraliaButton } from '@/components/ui/DoctoraliaButton';

export function Credentials() {
  return <div className={`credentials ${interiorStyles['credentials']}`}><div data-scroll-reveal="credential"><span>01</span><p>Grado en Psicología<br /><small>Universidad Nebrija</small></p></div><div data-scroll-reveal="credential"><span>02</span><p>Coaching Ejecutivo<br /><small>Escuela Europea de Coaching</small></p></div><div data-scroll-reveal="credential"><span>03</span><p>Psicóloga colegiada<br /><small>N.º M-45396</small></p></div><DoctoraliaButton href={site.bookingUrl} label="credentials">Consultar datos en Doctoralia</DoctoraliaButton></div>;
}
