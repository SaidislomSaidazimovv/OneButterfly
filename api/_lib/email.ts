import { Resend } from 'resend';

interface SendNdaEmailParams {
  to: string;
  fullName: string;
  magicLinkUrl: string;
  pdfBytes: Uint8Array;
}

/**
 * Send the NDA + magic-link email via Resend. The PDF is attached and the
 * magic link inside the email is the only way to set the access cookie
 * (click-required flow).
 *
 * Env: RESEND_API_KEY. Sender domain (butterfly.one) must be verified in
 * Resend's dashboard before sends will succeed in production.
 */
export async function sendNdaEmail({
  to, fullName, magicLinkUrl, pdfBytes,
}: SendNdaEmailParams): Promise<{ ok: true } | { ok: false; error: string }> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return { ok: false, error: 'RESEND_API_KEY is not set' };
  }
  const resend = new Resend(apiKey);
  try {
    const result = await resend.emails.send({
      from: 'Butterfly Foundation <hello@butterfly.one>',
      to,
      subject: 'Your NDA + access link',
      html: emailHtml(fullName, magicLinkUrl),
      text: emailText(fullName, magicLinkUrl),
      attachments: [
        {
          filename: 'butterfly-foundation-nda.pdf',
          content: Buffer.from(pdfBytes),
        },
      ],
    });
    if (result.error) {
      return { ok: false, error: result.error.message || 'Resend returned an error' };
    }
    return { ok: true };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : 'Unknown email error' };
  }
}

function emailHtml(fullName: string, magicLinkUrl: string): string {
  return `<!DOCTYPE html>
<html><body style="font-family:-apple-system,BlinkMacSystemFont,'Inter',sans-serif;color:#1D1D1F;line-height:1.55;max-width:560px;margin:0 auto;padding:32px 24px;">
  <p style="font-size:15px;">Hi ${escapeHtml(fullName)},</p>
  <p style="font-size:15px;">You've signed the One Humanity Foundation Mutual Confidentiality Agreement. A signed PDF copy is attached for your records.</p>
  <p style="font-size:15px;">Click below to enter the partner portal:</p>
  <p style="margin:24px 0;">
    <a href="${magicLinkUrl}" style="display:inline-block;background:#0B9E99;color:#fff;text-decoration:none;font-weight:600;padding:12px 24px;border-radius:999px;font-size:14px;">Enter the partner portal →</a>
  </p>
  <p style="font-size:13px;color:#6E6E73;">Or paste this link in your browser:<br><a href="${magicLinkUrl}" style="color:#0B9E99;word-break:break-all;">${magicLinkUrl}</a></p>
  <p style="font-size:13px;color:#6E6E73;">This link is single-use and tied to the browser you click it from. After clicking, your access lasts 30 days.</p>
  <p style="font-size:13px;color:#6E6E73;margin-top:32px;">Questions? <a href="mailto:hello@butterfly.one" style="color:#0B9E99;">hello@butterfly.one</a></p>
  <p style="font-size:11px;color:#9999A0;margin-top:32px;border-top:1px solid #eaeaee;padding-top:16px;">Butterfly Foundation · 501(c)(3) · butterfly.one</p>
</body></html>`;
}

function emailText(fullName: string, magicLinkUrl: string): string {
  return `Hi ${fullName},

You've signed the One Humanity Foundation Mutual Confidentiality Agreement. A signed PDF copy is attached.

Enter the partner portal:
${magicLinkUrl}

This link is single-use and tied to the browser you click it from. After clicking, your access lasts 30 days.

Questions? hello@butterfly.one

Butterfly Foundation · 501(c)(3) · butterfly.one`;
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
