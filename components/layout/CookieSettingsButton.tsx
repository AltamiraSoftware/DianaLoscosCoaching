'use client';

export function CookieSettingsButton() {
  return <button type="button" className="button button-outline" onClick={() => { window.localStorage.removeItem('analytics-consent'); window.location.reload(); }}>Cambiar preferencia de analítica</button>;
}
