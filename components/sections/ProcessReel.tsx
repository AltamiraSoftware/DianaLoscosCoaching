import { InstagramReel, type Reel } from './InstagramReel';
import styles from './ProcessSteps.module.css';

export function ProcessReel({ reel }: { reel: Reel }) {
  return <div className={styles.reelFrame}><InstagramReel reel={reel} tone="light" showTitle={false} showFallback={false} /></div>;
}
