'use client';

import { useState } from 'react';
import Image from 'next/image';
import { InstagramReel, type Reel } from './InstagramReel';
import styles from './ProcessSteps.module.css';

export function ProcessReel({ reel }: { reel: Reel }) {
  const [open, setOpen] = useState(false);
  return <div className={styles.reelFrame}>{open ? <InstagramReel reel={reel} /> : <button className={styles.reelPoster} type="button" onClick={() => setOpen(true)} aria-label={`Cargar reel: ${reel.title}`}><Image src="/perfil.webp" alt="" fill sizes="(max-width: 620px) 85vw, 30vw" /><span className={styles.play} aria-hidden="true">▶</span><span className={styles.reelLabel}>Ver reel</span></button>}</div>;
}
