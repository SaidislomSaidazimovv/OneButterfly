# SAIDISLOM — BUILD BRIEF
## Feature: Gated Access Form for butterfly.one
## Target: ship in 5 working days

---

## CONTEXT (read once)

butterfly.one is the One Humanity Foundation's funding-priority website. We have 14 days to ship the gated partner portal so Evan can send the URL to first-tier brand prospects. Without this gate, there's no NDA, no qualified leads, no funded partners. This feature is the conversion engine.

You are building **one feature only**: the access gate. Not the whole website. The marketing homepage is being designed separately. You receive form submissions, you grant access, you notify the team. That's the scope.

---

## LOCKED DECISIONS (do not change)

| Decision | Value | Why |
|----------|-------|-----|
| Domain | `butterfly.one` (single domain, all routes) | One source of truth, one analytics, one auth |
| Stack | Next.js 14 App Router + Supabase + Vercel + Resend | Same as Core Platform Spec, no new deps |
| Auth model | Magic-link, 30-day session, no password | Lowest friction for partners |
| Database | Same Supabase project as Core Platform | Add tables, do not fork the project |
| Email transactional | Resend | Reliable, simple API, free tier covers V1 |
| PDF generation | `@react-pdf/renderer` | Already used in Core Platform |
| Notification channel | Slack webhook to #partnerships | Demi and Evan get instant alerts |
| Brand colors | `#5ceec6` `#00b18d` `#6ecdff` `#3178f1` gold `#c9a96e` | From design system V9.3 |

---

## WHAT YOU ARE BUILDING

A single page at `butterfly.one/access` with one form.

**Form fields:**
- Full name (text, required)
- Organization (text, required)
- Role (dropdown: Brand · Foundation · School · Workplace · Press · Other)
- Email (work email, required, validated)
- Phone (optional, international format)
- NDA checkbox (required) with expandable accordion showing the full NDA text

**On submit, in this order:**

1. Validate inputs server-side
2. Insert row into `gated_access_requests` table
3. Generate NDA PDF with their name + timestamp + IP
4. Upload PDF to Supabase Storage (bucket: `nda_signatures`)
5. Send email to user via Resend: subject "Your NDA + access link", attach PDF, include magic-link URL
6. Send Slack webhook to #partnerships with: name, org, role, email, timestamp
7. Set `gated_access_token` httpOnly cookie (30-day expiry)
8. Redirect user to `/partner` (the gated landing page — also part of this scope, see below)

**Auth middleware on `/partner/*` routes:**

Check for valid `gated_access_token`. If absent or expired, redirect to `/access`. If present, allow through.

---

## DATABASE MIGRATION

```sql
create table gated_access_requests (
  id              uuid primary key default gen_random_uuid(),
  full_name       text not null,
  organization    text not null,
  role            text not null check (role in (
    'brand', 'foundation', 'school', 'workplace', 'press', 'other'
  )),
  email           text not null,
  phone           text,
  nda_accepted_at timestamptz not null default now(),
  nda_pdf_path    text,
  ip_address      inet,
  user_agent      text,
  access_token    text unique not null,
  expires_at      timestamptz not null default (now() + interval '30 days'),
  created_at      timestamptz default now()
);

create index gated_access_requests_email_idx on gated_access_requests(email);
create index gated_access_requests_token_idx on gated_access_requests(access_token);

-- RLS: only service role can read/write (no client access)
alter table gated_access_requests enable row level security;
```

Storage bucket setup:
```
Bucket name: nda_signatures
Visibility: private
Access policy: service role only
```

---

## ROUTE / FILE STRUCTURE

```
app/
├── (public)/
│   └── access/
│       └── page.tsx              — The form
├── (gated)/
│   ├── layout.tsx                — Auth check middleware
│   └── partner/
│       └── page.tsx              — Placeholder landing for now
├── api/
│   └── access/
│       └── route.ts              — POST handler
├── lib/
│   ├── nda-pdf.tsx               — NDA template using @react-pdf/renderer
│   ├── email.ts                  — Resend wrapper
│   └── slack.ts                  — Slack webhook helper
└── middleware.ts                  — Token check for /partner/*
```

---

## NDA CONTENT (use verbatim)

```
ONE HUMANITY FOUNDATION
Mutual Confidentiality Agreement

Between: One Humanity Foundation, a 501(c)(3) corporation
And: [Recipient name and organization]
Date: [Auto-filled on submit]

1. CONFIDENTIAL INFORMATION
Recipient may receive non-public information including partnership tiers,
financial projections, founding partner identities, launch plans, and
research materials. Recipient agrees to keep this information confidential
and not share it with third parties without written permission from the
Foundation.

2. PERMITTED USE
Recipient may share confidential information with their own legal counsel,
financial advisors, and authorized officers strictly for the purpose of
evaluating partnership.

3. EXCLUSIONS
This agreement does not cover information already publicly available or
information independently developed by the Recipient.

4. TERM
This agreement remains in effect for two (2) years from the date of signing.

5. GOVERNING LAW
This agreement is governed by the laws of the State of Delaware, USA.

By checking the box above, Recipient agrees to be bound by this agreement
in the same manner as a signed paper document.

Signed electronically by: [Recipient name]
Organization: [Recipient organization]
IP address: [Auto-filled]
Timestamp: [Auto-filled UTC]
```

---

## ACCEPTANCE CRITERIA (definition of done)

The feature is shipped when ALL of these pass:

1. ✅ A new visitor lands on `/access` and sees a clean form on dark background with brand styling.
2. ✅ Submitting an empty form shows inline validation errors.
3. ✅ Submitting a valid form completes in under 4 seconds.
4. ✅ The submitter receives an email with PDF attachment within 60 seconds.
5. ✅ The submitter is automatically logged in and lands on `/partner` with a working session.
6. ✅ Slack #partnerships receives a notification within 30 seconds.
7. ✅ A second visit from the same browser (within 30 days) lands directly on `/partner` without re-submitting the form.
8. ✅ Visiting `/partner` from an incognito window redirects to `/access`.
9. ✅ The PDF in Supabase Storage matches the PDF the user received via email.
10. ✅ Mobile Safari + iOS Chrome + desktop Chrome + desktop Safari all work.

---

## WHAT IS NOT IN THIS SCOPE

- The marketing homepage (Oppoq + Claude design are handling)
- The `/partner/tiers` page content (Oppoq drafts the copy, you wire it up after)
- The `/partner/deck` download page (next sprint)
- Tier-specific gating (everyone past the gate sees the same thing for now)
- Admin panel for viewing submissions (use Supabase dashboard for V1)
- DocuSign integration (V2 — click-through is legally sufficient for V1)
- Internationalization (English only for V1)

---

## CLAUDE PROMPT — START YOUR CLAUDE CODE SESSION WITH THIS

> I'm building a gated access feature for butterfly.one, a nonprofit partner portal.
>
> Stack: Next.js 14 App Router, Supabase (auth + DB + storage), Resend for email, @react-pdf/renderer for PDF generation, Vercel deployment.
>
> The feature: a `/access` page with a form (name, organization, role dropdown, email, phone, NDA checkbox). On submit, the system creates a database row, generates a signed NDA PDF, emails it to the user with a magic-link, sets a 30-day session cookie, sends a Slack notification, and redirects to `/partner`.
>
> I'll attach the full brief with database schema, NDA text, file structure, and acceptance criteria.
>
> Build this in this order, waiting for my confirmation between each step:
> 1. The database migration SQL
> 2. The NDA PDF component (@react-pdf/renderer)
> 3. The Resend email helper
> 4. The Slack webhook helper
> 5. The form page UI (/access)
> 6. The API route handler (/api/access)
> 7. The auth middleware (for /partner/*)
> 8. The placeholder /partner landing page
>
> Show me one file at a time. Always give me the complete file, not snippets. When the file works, I'll say "next."

---

## QUESTIONS YOU MIGHT HAVE

**"Where do environment variables live?"**
Same Vercel project as Core Platform. Add: `RESEND_API_KEY`, `SLACK_WEBHOOK_URL`, `NDA_BUCKET_NAME=nda_signatures`. Use existing Supabase keys.

**"Should I add admin views for the submissions?"**
No. Demi reads them via the Supabase dashboard. Building an admin panel is V2.

**"What if Resend is down?"**
The form should still succeed — store the request, mark `email_sent_at = null`, and a daily cron retries. But for V1 just log the error and continue. Don't block the user on email delivery.

**"What if someone submits twice with the same email?"**
Update the existing row, regenerate token, send fresh email. Don't error.

**"Do I need to handle GDPR/CCPA?"**
For V1: include a "your email is used only for partnership communication" line below the form. Full compliance flows are V2.

**"Should the gate include reCAPTCHA?"**
Add it if spam happens. Don't preempt. The NDA itself is a good filter.

---

## CONTACT

- Architectural questions → Oppoq
- Brand/copy questions → Oppoq
- Email content questions → Demi
- Anything blocking the build → message Oppoq immediately, do not wait

---

## ESTIMATED EFFORT

5 working days for a confident Next.js/Supabase developer with Claude $200 plan.

| Day | Work |
|-----|------|
| 1 | DB migration + NDA PDF component + Resend helper |
| 2 | Form UI + Slack helper + initial API route |
| 3 | Auth middleware + /partner placeholder + cookie logic |
| 4 | Email templates + integration testing + edge cases |
| 5 | Mobile QA + deploy to staging + acceptance criteria walkthrough |

---

*One feature. Five days. Then we ship.*
