import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/sections/SectionHeading';
import { MotionReveal } from '@/components/motion/MotionReveal';
import { ButtonLink } from '@/components/ui/Button';
import { ProcessReel } from './ProcessReel';
import { instagramReels } from './CTASection';
import { home } from '@/content/home';
import { site } from '@/lib/site';
import styles from './ProcessSteps.module.css';

export function ProcessSteps() {
  const reels = [instagramReels.home, instagramReels.personal, instagramReels.professional];
  return <section id="proceso" className={`section ${styles.section}`}><Container>
    <MotionReveal><SectionHeading eyebrow={home.process.eyebrow} title={home.process.title} tone="light" center><p>{home.process.description}</p></SectionHeading></MotionReveal>
    <ol className={styles.list}>{home.process.steps.map((step, index) => <li key={step.number}><ProcessReel reel={reels[index]} /><span className={styles.number}>{step.number}</span><h3>{step.title}</h3><p>{step.description}</p></li>)}</ol>
    <div className={styles.footer}><p>{home.process.trust}</p><ButtonLink href={site.bookingUrl} external event="cta_booking_click" label="proceso">{home.process.action}</ButtonLink></div>
  </Container></section>;
}
