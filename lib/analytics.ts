export type AnalyticsEvent =
  | 'cta_booking_click' | 'doctoralia_click' | 'whatsapp_click' | 'email_click'
  | 'contact_form_start' | 'contact_form_submit' | 'service_view'
  | 'pricing_view' | 'testimonial_view';

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export function trackEvent(event: AnalyticsEvent, params: Record<string, string> = {}) {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(new CustomEvent('diana:analytics', { detail: { event, ...params } }));
  if (window.localStorage.getItem('analytics-consent') === 'accepted') {
    window.gtag?.('event', event, params);
  }
}
