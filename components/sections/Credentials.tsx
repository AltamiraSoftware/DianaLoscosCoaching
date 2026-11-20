import interiorStyles from '@/app/Interior.module.css';
import { site } from '@/lib/site';
import { DoctoraliaButton } from '@/components/ui/DoctoraliaButton';

export function Credentials() {
  return <div className={`credentials ${interiorStyles['credentials']}`}><div data-scroll-reveal="credential"><span>01</span><p>Grado en Psicología<br /><small>Universidad Antonio de Nebrija</small></p></div><div data-scroll-reveal="credential"><span>02</span><p>Executive Coach<br /><small>Escuela Europea de Coaching (EEC)</small></p></div><div data-scroll-reveal="credential"><span>03</span><p>En proceso de acreditación ACC<br /><small>ICF (International Coaching Federation)</small></p></div><div data-scroll-reveal="credential"><span>04</span><p>Supervisión profesional continua<br /><small>ECC</small></p></div><p className={interiorStyles.credentialsNote}>Trabajo alineada con el código ético de la ICF.</p><DoctoraliaButton href={site.bookingUrl} label="credentials">Consultar datos en Doctoralia</DoctoraliaButton></div>;
}
