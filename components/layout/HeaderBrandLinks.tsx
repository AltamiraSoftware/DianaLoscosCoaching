import { DoctoraliaLogo, InstagramLogo, WhatsAppLogo } from '@/components/ui/BrandLogos';
import { TrackedLink } from '@/components/ui/TrackedLink';
import { site } from '@/lib/site';
import styles from './HeaderBrandLinks.module.css';

export function HeaderBrandLinks() {
  return (
    <nav className={styles.links} aria-label="Contacto y redes sociales">
      <TrackedLink
        href={site.whatsappUrl}
        external
        event="whatsapp_click"
        label="header"
        className={`${styles.link} ${styles.whatsapp}`}
        aria-label="WhatsApp en la cabecera"
      >
        <WhatsAppLogo className={styles.icon} />
      </TrackedLink>
      <TrackedLink
        href={site.instagramUrl}
        external
        className={styles.link}
        aria-label="Instagram en la cabecera"
      >
        <InstagramLogo className={styles.icon} />
      </TrackedLink>
      <TrackedLink
        href={site.bookingUrl}
        external
        event="cta_booking_click"
        label="header-logo"
        className={styles.link}
        aria-label="Reservar en Doctoralia"
      >
        <DoctoraliaLogo className={styles.icon} />
      </TrackedLink>
    </nav>
  );
}
