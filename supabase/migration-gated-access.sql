-- ============================================================
-- Gated access — NDA-signed partner portal
-- Source: SAIDISLOM_BRIEF.md §"DATABASE MIGRATION"
-- Run this in the Supabase SQL editor (or `supabase db push`).
-- ============================================================

-- One row per partner-access request. Service-role-only via RLS.
create table if not exists gated_access_requests (
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
  -- click-required magic-link flow: cookie is only set after the user
  -- visits /api/access/verify?token=X and we record verified_at
  verified_at     timestamptz,
  email_sent_at   timestamptz,
  slack_sent_at   timestamptz,
  created_at      timestamptz not null default now()
);

-- Email is the natural identity for upsert on duplicate submission
-- (per brief §"What if someone submits twice with the same email?")
create unique index if not exists gated_access_requests_email_uniq
  on gated_access_requests(email);

create index if not exists gated_access_requests_token_idx
  on gated_access_requests(access_token);

create index if not exists gated_access_requests_expires_idx
  on gated_access_requests(expires_at);

-- Lock down: only the service role (used by the Vercel function) can read/write.
-- The browser anon key cannot touch this table.
alter table gated_access_requests enable row level security;

-- ============================================================
-- Storage bucket: nda_signatures
-- Create this manually in the Supabase dashboard:
--   - Bucket name: nda_signatures
--   - Public: false
--   - Access policy: service role only
-- (Buckets are not created via SQL migration in Supabase.)
-- ============================================================
