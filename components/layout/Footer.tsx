import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { TrackedLink } from '@/components/ui/TrackedLink';
import { InstagramLogo, WhatsAppLogo } from '@/components/ui/BrandLogos';
import { site } from '@/lib/site';

export function Footer() {
  return <footer className="site-footer">
    <Container>
      <div className="footer-top">
        <div><p className="footer-brand">Diana Loscos<span>.</span></p><p className="footer-statement">Un espacio para pensar con claridad y avanzar con intención.</p></div>
        <div className="footer-columns">
          <div><h2>Explora</h2><Link href="/coaching-profesional/">Coaching profesional</Link><Link href="/cambio-profesional/">Cambio profesional</Link><Link href="/liderazgo-nuevos-managers/">Nuevo liderazgo</Link><Link href="/coaching-ejecutivo/">Coaching ejecutivo</Link></div>
          <div><h2>Diana</h2><Link href="/sobre-mi/">Sobre mí</Link><Link href="/opiniones/">Opiniones</Link><Link href="/preguntas-frecuentes/">Preguntas frecuentes</Link><Link href="/contacto/">Contacto</Link></div>
          <div><h2>Contacto</h2><TrackedLink href={`mailto:${site.email}`} event="email_click" label="footer">{site.email}</TrackedLink><TrackedLink href={site.whatsappUrl} external event="whatsapp_click" label="footer"><span className="inline-flex items-center gap-2"><WhatsAppLogo />WhatsApp</span></TrackedLink><TrackedLink href={site.linkedinUrl} external>LinkedIn</TrackedLink><TrackedLink href={site.instagramUrl} external><span className="inline-flex items-center gap-2"><InstagramLogo />Instagram</span></TrackedLink></div>
        </div>
      </div>
      <div className="footer-bottom"><p>© {new Date().getFullYear()} Diana Loscos · Madrid</p><div><Link href="/aviso-legal/">Aviso legal</Link><Link href="/privacidad/">Privacidad</Link><Link href="/cookies/">Cookies</Link></div></div>
    </Container>
  </footer>;
}
