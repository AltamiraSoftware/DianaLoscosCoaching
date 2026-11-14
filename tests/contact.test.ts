import assert from 'node:assert/strict';
import { test } from 'node:test';
import { parseContactBody } from '../lib/contact.ts';

const valid = { name: ' Ana ', email: ' ana@example.com ', phone: '+34 600 123 456', callWindow: 'manana', message: ' Quiero aclarar mi siguiente paso profesional. ', privacy: 'yes' };

test('exige email, teléfono, franja permitida, mensaje y consentimiento válidos', () => {
  for (const change of [{ email: 'sin-arroba' }, { phone: '' }, { phone: '123' }, { phone: 'abc1234567' }, { callWindow: 'noche' }, { message: 'corto' }, { privacy: '' }]) {
    assert.deepEqual(parseContactBody({ ...valid, ...change }), { kind: 'invalid' });
  }
});
test('el campo trampa se trata como spam', () => { assert.deepEqual(parseContactBody({ website: 'spam.example' }), { kind: 'spam' }); });
test('acepta y normaliza una consulta con teléfono y franja', () => {
  assert.deepEqual(parseContactBody(valid), { kind: 'valid', data: { name: 'Ana', email: 'ana@example.com', phone: '+34 600 123 456', callWindow: 'manana', message: 'Quiero aclarar mi siguiente paso profesional.' } });
});
