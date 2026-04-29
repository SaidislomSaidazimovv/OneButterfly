import type { VercelRequest, VercelResponse } from '@vercel/node';
import { randomBytes } from 'node:crypto';
import { getAdminClient } from './_lib/supabase';
import { generateNdaPdf } from './_lib/nda-pdf';
import { sendNdaEmail } from './_lib/email';
import { notifySlack } from './_lib/slack';

const VALID_ROLES = ['brand', 'foundation', 'school', 'workplace', 'press', 'other'] as const;
type Role = typeof VALID_ROLES[number];

/**
 * POST /api/access
 * Submission endpoint for the gated access form.
 *
 * Click-required magic-link flow: this endpoint creates / refreshes the
 * gated_access_requests row, generates the signed NDA PDF, uploads it,
 * sends the email with a magic link, and pings Slack.
 *
 * It does NOT set the access cookie. The cookie is set only when the
 * recipient clicks the magic link, which hits /api/access/verify?token=X.
 */
export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const body = (req.body && typeof req.body === 'object') ? req.body : {};
  const full_name = stringField(body.full_name);
  const organization = stringField(body.organization);
  const role = body.role as string | undefined;
  const email = stringField(body.email)?.toLowerCase();
  const phone = stringField(body.phone) || null;

  if (!full_name) return res.status(400).json({ error: 'full_name is required' });
  if (!organization) return res.status(400).json({ error: 'organization is required' });
  if (!role || !VALID_ROLES.includes(role as Role)) {
    return res.status(400).json({ error: 'role must be one of brand, foundation, school, workplace, press, other' });
  }
  if (!email) return res.status(400).json({ error: 'email is required' });
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: 'email is not valid' });
  }

  const supabase = getAdminClient();
  const access_token = randomBytes(32).toString('hex');
  const ipAddress = readIp(req);
  const userAgent = (req.headers['user-agent'] || '').toString().slice(0, 500);
  const timestampUtc = new Date().toISOString();
  const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString();

  // Generate the signed PDF first so we have its bytes for both storage + email.
  const pdfBytes = await generateNdaPdf({
    fullName: full_name,
    organization,
    ipAddress,
    timestampUtc,
  });

  // Upload to private storage bucket. Path is keyed by access_token so each
  // re-submit gets its own PDF (the row's nda_pdf_path is overwritten).
  const bucket = process.env.NDA_BUCKET_NAME || 'nda_signatures';
  const pdfPath = `${access_token}.pdf`;
  const upload = await supabase.storage.from(bucket).upload(pdfPath, pdfBytes, {
    contentType: 'application/pdf',
    upsert: false,
  });
  if (upload.error) {
    console.error('Storage upload failed:', upload.error);
    return res.status(500).json({ error: 'Could not store the NDA. Please try again.' });
  }

  // Upsert the row keyed by email (unique index). On duplicate email we
  // refresh the token, reset verified_at, and bump expires_at.
  const { error: dbError } = await supabase
    .from('gated_access_requests')
    .upsert(
      {
        full_name,
        organization,
        role,
        email,
        phone,
        nda_accepted_at: timestampUtc,
        nda_pdf_path: pdfPath,
        ip_address: ipAddress,
        user_agent: userAgent,
        access_token,
        expires_at: expiresAt,
        verified_at: null,
      },
      { onConflict: 'email' }
    );
  if (dbError) {
    console.error('DB upsert failed:', dbError);
    return res.status(500).json({ error: 'Could not record the request. Please try again.' });
  }

  // Magic-link URL the recipient clicks from email.
  const baseUrl =
    process.env.BUTTERFLY_ONE_BASE_URL ||
    `https://${req.headers.host || 'butterfly.one'}`;
  const magicLinkUrl = `${baseUrl}/api/access/verify?token=${access_token}`;

  // Email + Slack run in parallel; failures are non-fatal but we record
  // delivery timestamps when each succeeds.
  const [emailResult, slackResult] = await Promise.all([
    sendNdaEmail({ to: email, fullName: full_name, magicLinkUrl, pdfBytes }),
    notifySlack({
      fullName: full_name, organization, role, email, phone, timestampUtc,
    }),
  ]);

  if (!emailResult.ok) console.warn('Email send failed:', emailResult.error);
  if (!slackResult.ok) console.warn('Slack notify failed:', slackResult.error);

  // Best-effort timestamp update (non-fatal if it fails).
  await supabase
    .from('gated_access_requests')
    .update({
      email_sent_at: emailResult.ok ? new Date().toISOString() : null,
      slack_sent_at: slackResult.ok ? new Date().toISOString() : null,
    })
    .eq('access_token', access_token);

  return res.status(200).json({
    ok: true,
    message: 'NDA email is on its way. Click the link inside to enter the portal.',
  });
}

function stringField(v: unknown): string | undefined {
  if (typeof v !== 'string') return undefined;
  const trimmed = v.trim();
  return trimmed.length > 0 ? trimmed : undefined;
}

function readIp(req: VercelRequest): string {
  const fwd = req.headers['x-forwarded-for'];
  if (typeof fwd === 'string') return fwd.split(',')[0].trim();
  if (Array.isArray(fwd) && fwd.length > 0) return fwd[0].split(',')[0].trim();
  return req.socket?.remoteAddress || 'unknown';
}
