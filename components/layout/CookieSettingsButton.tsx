'use client';

import { Button } from '@/components/ui/Button';

export function CookieSettingsButton() {
  return <Button type="button" variant="secondary" onClick={() => { window.localStorage.removeItem('analytics-consent'); window.localStorage.removeItem('external-content-consent'); window.location.reload(); }}>Cambiar preferencias de privacidad</Button>;
}
