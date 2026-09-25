'use client';

import { useEffect, useRef } from 'react';
import { trackEvent, type AnalyticsEvent } from '@/lib/analytics';

export function TrackView({ event, label }: { event: AnalyticsEvent; label: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        trackEvent(event, { label });
        observer.disconnect();
      }
    }, { threshold: 0 });
    observer.observe(node.parentElement ?? node);
    return () => observer.disconnect();
  }, [event, label]);
  return <span ref={ref} className="track-sentinel" aria-hidden="true" />;
}
