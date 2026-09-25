import assert from 'node:assert/strict';
import { test } from 'node:test';
import { parseContactBody } from '../lib/contact.ts';

test('el contacto exige email válido, mensaje y consentimiento', () => {
  const invalid = [
    { name: 'Ana', email: 'sin-arroba', message: 'Quiero revisar mi trabajo', privacy: 'yes' },
    { name: 'Ana', email: 'ana@example.com', message: 'corto', privacy: 'yes' },
    { name: 'Ana', email: 'ana@example.com', message: 'Quiero revisar mi trabajo' },
  ];
  for (const body of invalid) assert.deepEqual(parseContactBody(body), { kind: 'invalid' });
});

test('el campo trampa se trata como spam', () => {
  assert.deepEqual(parseContactBody({ website: 'spam.example' }), { kind: 'spam' });
});

test('acepta y normaliza una consulta válida con teléfono opcional', () => {
  assert.deepEqual(parseContactBody({ name: ' Ana ', email: ' ana@example.com ', message: ' Quiero aclarar mi siguiente paso profesional. ', privacy: 'yes' }), {
    kind: 'valid', data: { name: 'Ana', email: 'ana@example.com', phone: '', message: 'Quiero aclarar mi siguiente paso profesional.' },
  });
  assert.equal(parseContactBody({ name: 'Ana', email: 'ana@example.com', phone: '6'.repeat(31), message: 'Quiero revisar mi trabajo.', privacy: 'yes' }).kind, 'invalid');
});
