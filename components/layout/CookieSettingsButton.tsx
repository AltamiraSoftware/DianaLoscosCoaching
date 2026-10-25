'use client';

import { Button } from '@/components/ui/Button';

export function CookieSettingsButton() {
  return <Button type="button" variant="outline" onClick={() => { window.localStorage.removeItem('analytics-consent'); window.location.reload(); }}>Cambiar preferencia de analítica</Button>;
}
