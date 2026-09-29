import { TrackedLink } from '@/components/ui/TrackedLink';
import { WhatsAppLogo } from '@/components/ui/BrandLogos';
import { site } from '@/lib/site';
import styles from './FloatingWhatsApp.module.css';

export function FloatingWhatsApp() {
  return (
    <TrackedLink
      href={site.whatsappUrl}
      external
      event="whatsapp_click"
      label="floating-button"
      className={styles.button}
      aria-label="Escribir a Diana por WhatsApp"
    >
      <WhatsAppLogo className={styles.brandIcon} />
      <span className={styles.shine} aria-hidden="true" />
    </TrackedLink>
  );
}
