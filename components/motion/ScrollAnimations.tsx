'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

const targets = '#main > section, #main article, #main #para-quien a, #main #proceso li, #main .service-grid > a, #main .testimonial-grid figure, #main [data-scroll-reveal]';

export function ScrollAnimations() {
  const pathname = usePathname();
  useEffect(() => {
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (motion.matches || !('IntersectionObserver' in window) || !Element.prototype.animate) return;
    const seen = new WeakSet<Element>();
    const animations = new Set<Animation>();
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const node = entry.target as HTMLElement;
        observer.unobserve(node);
        const isSection = node.tagName === 'SECTION';
        const siblings = node.parentElement ? Array.from(node.parentElement.children) : [];
        const delay = isSection ? 0 : Math.min(Math.max(siblings.indexOf(node), 0), 3) * 90;
        const animation = node.animate([{ opacity: 0, transform: 'translateY(12px)' }, { opacity: 1, transform: 'translateY(0)' }], { duration: 900, delay, easing: 'cubic-bezier(.22,1,.36,1)', fill: 'backwards' });
        animations.add(animation);
      }
    }, { threshold: .08, rootMargin: '0px 0px -24px 0px' });
    const observe = () => document.querySelectorAll(targets).forEach(node => { if (!seen.has(node)) { seen.add(node); observer.observe(node); } });
    observe();
    const main = document.getElementById('main');
    let pendingFrame = 0;
    const mutations = new MutationObserver(() => { if (!pendingFrame) pendingFrame = window.requestAnimationFrame(() => { pendingFrame = 0; observe(); }); });
    if (main) mutations.observe(main, { childList: true, subtree: true });
    const onMotionChange = () => { if (motion.matches) { observer.disconnect(); mutations.disconnect(); animations.forEach(animation => animation.cancel()); } };
    motion.addEventListener('change', onMotionChange);
    return () => { observer.disconnect(); mutations.disconnect(); if (pendingFrame) window.cancelAnimationFrame(pendingFrame); motion.removeEventListener('change', onMotionChange); animations.forEach(animation => animation.cancel()); };
  }, [pathname]);
  return null;
}
