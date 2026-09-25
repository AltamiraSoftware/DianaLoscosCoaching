export type ContactData = { name: string; email: string; phone: string; message: string };
export type ContactResult = { kind: 'valid'; data: ContactData } | { kind: 'invalid' } | { kind: 'spam' };

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function parseContactBody(input: unknown): ContactResult {
  if (!input || typeof input !== 'object' || Array.isArray(input)) return { kind: 'invalid' };
  const body = input as Record<string, unknown>;
  if (typeof body.website === 'string' && body.website.trim()) return { kind: 'spam' };
  const name = typeof body.name === 'string' ? body.name.trim() : '';
  const email = typeof body.email === 'string' ? body.email.trim() : '';
  const phone = typeof body.phone === 'string' ? body.phone.trim() : '';
  const message = typeof body.message === 'string' ? body.message.trim() : '';
  if (!name || name.length > 100 || !emailPattern.test(email) || email.length > 254 || phone.length > 30 || message.length < 10 || message.length > 3000 || body.privacy !== 'yes') return { kind: 'invalid' };
  return { kind: 'valid', data: { name, email, phone, message } };
}
