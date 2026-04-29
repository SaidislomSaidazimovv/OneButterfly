interface SlackNotifyParams {
  fullName: string;
  organization: string;
  role: string;
  email: string;
  phone: string | null;
  timestampUtc: string;
}

/**
 * POST a partnership-lead notification to the configured Slack webhook.
 * Failures are non-fatal — the form must still succeed if Slack is down.
 *
 * Env: SLACK_WEBHOOK_URL (#partnerships channel webhook).
 */
export async function notifySlack({
  fullName, organization, role, email, phone, timestampUtc,
}: SlackNotifyParams): Promise<{ ok: true } | { ok: false; error: string }> {
  const url = process.env.SLACK_WEBHOOK_URL;
  if (!url) return { ok: false, error: 'SLACK_WEBHOOK_URL is not set' };

  const payload = {
    text: `New partner-access request: *${fullName}* (${organization})`,
    blocks: [
      {
        type: 'header',
        text: { type: 'plain_text', text: '🦋 New partner-access request', emoji: true },
      },
      {
        type: 'section',
        fields: [
          { type: 'mrkdwn', text: `*Name:*\n${fullName}` },
          { type: 'mrkdwn', text: `*Organization:*\n${organization}` },
          { type: 'mrkdwn', text: `*Role:*\n${role}` },
          { type: 'mrkdwn', text: `*Email:*\n${email}` },
          { type: 'mrkdwn', text: `*Phone:*\n${phone || '—'}` },
          { type: 'mrkdwn', text: `*Submitted:*\n${timestampUtc}` },
        ],
      },
      {
        type: 'context',
        elements: [
          { type: 'mrkdwn', text: 'NDA signed via butterfly.one/access · awaiting magic-link click' },
        ],
      },
    ],
  };

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      const body = await res.text().catch(() => '');
      return { ok: false, error: `Slack webhook ${res.status}: ${body.slice(0, 200)}` };
    }
    return { ok: true };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : 'Unknown Slack error' };
  }
}
