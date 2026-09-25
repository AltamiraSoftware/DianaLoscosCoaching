const escapeHtml = (value) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { BREVO_API_KEY, MAIL_FROM, MAIL_TO } = process.env;

  if (!BREVO_API_KEY || !MAIL_FROM) {
    return res.status(500).json({ error: "Brevo not configured" });
  }

  const { name, lastName, email, message } = req.body || {};

  if (!name || !email || !message) {
    return res.status(400).json({ error: "Missing fields" });
  }

  const toEmail = MAIL_TO || MAIL_FROM;
  const safeName = escapeHtml(String(name));
  const safeLastName = escapeHtml(String(lastName || ""));
  const safeEmail = escapeHtml(String(email));
  const safeMessage = escapeHtml(String(message));

  const subject = `Nuevo mensaje desde la web - ${safeName} ${safeLastName}`.trim();
  const text = `Nombre: ${name} ${lastName || ""}\nEmail: ${email}\nMensaje:\n${message}`;
  const html = `
    <p><strong>Nombre:</strong> ${safeName} ${safeLastName}</p>
    <p><strong>Email:</strong> ${safeEmail}</p>
    <p><strong>Mensaje:</strong></p>
    <p>${safeMessage.replace(/\n/g, "<br />")}</p>
  `;

  try {
    const response = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": BREVO_API_KEY,
      },
      body: JSON.stringify({
        sender: { email: MAIL_FROM, name: "Diana Loscos Coaching" },
        to: [{ email: toEmail }],
        replyTo: { email, name: `${name} ${lastName || ""}`.trim() },
        subject,
        textContent: text,
        htmlContent: html,
      }),
    });

    if (!response.ok) {
      const detail = await response.text();
      return res.status(502).json({ error: "Brevo error", detail });
    }

    return res.status(200).json({ ok: true });
  } catch (err) {
    return res.status(500).json({ error: "Unexpected error" });
  }
}
