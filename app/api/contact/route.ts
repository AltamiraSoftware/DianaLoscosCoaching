import { NextResponse } from 'next/server';
import { parseContactBody } from '@/lib/contact';

export async function POST(request: Request) {
  let body: unknown;
  try { body = await request.json(); } catch { return NextResponse.json({ error: 'Solicitud inválida.' }, { status: 400 }); }
  const result = parseContactBody(body);
  if (result.kind === 'spam') return NextResponse.json({ ok: true });
  if (result.kind === 'invalid') return NextResponse.json({ error: 'Revisa los campos del formulario.' }, { status: 400 });
  const { name, email, phone, message } = result.data;
  const apiKey = process.env.BREVO_API_KEY;
  const fromEmail = process.env.CONTACT_FROM_EMAIL;
  const toEmail = process.env.CONTACT_TO_EMAIL;
  if (!apiKey || !fromEmail || !toEmail) return NextResponse.json({ error: 'El formulario no está disponible temporalmente.' }, { status: 503 });

  try {
    const response = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'api-key': apiKey },
      body: JSON.stringify({
        sender: { email: fromEmail, name: 'Diana Loscos web' },
        to: [{ email: toEmail }],
        replyTo: { email, name },
        subject: 'Nueva consulta desde dianaloscoscoach.com',
        textContent: `Nombre: ${name}\nEmail: ${email}\nTeléfono: ${phone || 'No indicado'}\n\nMensaje:\n${message}`,
      }),
      cache: 'no-store',
    });
    if (!response.ok) return NextResponse.json({ error: 'No se pudo entregar el mensaje.' }, { status: 502 });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: 'No se pudo entregar el mensaje.' }, { status: 502 });
  }
}
