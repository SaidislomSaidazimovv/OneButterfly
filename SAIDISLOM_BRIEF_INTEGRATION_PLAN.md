# SAIDISLOM_BRIEF — INTEGRATION PLAN FOR butterfly.one

> **Read this file together with [SAIDISLOM_BRIEF.md](./SAIDISLOM_BRIEF.md).**
>
> The brief was written assuming a **Next.js 14 App Router + Supabase** project. This project is **Vite 7 + React 19 + React Router 7** with **no backend**. This document explains exactly how to adapt the brief to the real codebase, what to substitute, what to confirm with the user before coding, and what is dangerous to touch.

---

## 0. PURPOSE OF THIS FILE

A Claude Code session reading this should be able to:

1. Understand what the brief asks for
2. Understand why parts of the brief don't apply to this codebase as-written
3. Know which substitutions to use
4. Know which decisions require the user's confirmation **before** writing code
5. Know what files to create, what files to touch, and what files to leave alone
6. Know what can break and how to avoid it

If anything in this file conflicts with the brief, **this file wins** — it was written with full knowledge of the actual project state.

---

## 1. PROJECT REALITY CHECK (verify these before starting)

| Property | Value |
|---|---|
| Framework | Vite 7 SPA (React 19 + React Router 7) |
| Backend | None — pure static SPA |
| Database | None — no Supabase client installed |
| Email | None — `/partner` form currently submits to nowhere real (placeholder for `protocol@butterfly.one`) |
| PDF library | None |
| Auth | None |
| Deploy | Vercel, with `vercel.json` rewriting `/(.*)` → `/index.html` |
| Domain | `butterfly.one` (already attached and live) |
| Existing routes | `/`, `/challenge`, `/protocol`, `/evidence`, `/month`, `/about`, `/partner`, `/blog`, `/launch`, `/deploy`, `/team` (redirects to `/about`), `/wip`, `/home-preview` |
| `/access` | Does **not** exist yet |
| Brand spec | [BUTTERFLY_ONE_FULL_SPEC_v2.md](./BUTTERFLY_ONE_FULL_SPEC_v2.md) — design system locked, do not change |

Verify by reading [package.json](./package.json), [vite.config.ts](./vite.config.ts), [vercel.json](./vercel.json), and [src/App.tsx](./src/App.tsx) before any edits.

---

## 2. THE FUNDAMENTAL CONFLICT

The brief locks the stack to Next.js 14 + Supabase + Resend + `@react-pdf/renderer`. Three of those don't exist in this project. The Next.js-specific patterns (App Router file paths, route handlers, Next middleware) are not portable.

**The chosen approach: Path A — keep Vite/React, add Vercel serverless functions.**

Vercel auto-detects `/api/*.ts` files at the project root as Node serverless functions, served from the same domain as the SPA. The frontend stays React Router. The brief's logic transplants to this layout cleanly with the substitutions in §4.

Do **not** convert the site to Next.js. That would be ~2–3 weeks of work and is wildly out of scope for this feature.

---

## 3. DECISIONS TO CONFIRM WITH THE USER BEFORE CODING

Stop and ask the user about each of these. Do not assume.

| # | Question | Why it matters | Default if user says "your call" |
|---|---|---|---|
| 1 | **Gated path: `/partner` (per brief literally) or new path `/portal`?** | The brief calls `/partner` a "placeholder." This project's `/partner` is a real public 3-tab page (Schools / Workplaces / Brands) with a contact form. Gating it forces every homepage CTA into the NDA wall. | Use `/portal` to keep `/partner` public, **unless** the user explicitly wants partnership info gated |
| 2 | **Magic-link flow: cookie on form submit, OR cookie only after email-link click?** | The brief is ambiguous (line 48 says "magic-link URL" in email; line 50 says cookie set immediately on submit). Click-required is more secure and matches the term "magic link." Submit-immediate is faster UX. | Click-required — implement `/api/access/verify?token=X` that sets the cookie |
| 3 | **PDF library: `@react-pdf/renderer` (brief) or `pdf-lib` (substitute)?** | `@react-pdf/renderer` ships ~30 MB of fonts and has known Vercel serverless cold-start issues. `pdf-lib` is ~3 MB pure JS, runs cleanly in Node functions. NDA output looks the same. | `pdf-lib` — explain the trade-off to the user, ship it unless they object |
| 4 | **Supabase project: new one for butterfly.one, or shared with another project?** | Brief says "same Supabase project as Core Platform." This project has no Supabase yet, so "Core Platform" doesn't exist here. Has to be created. | New project dedicated to butterfly.one |
| 5 | **Resend sending domain verification: who owns DNS for `butterfly.one`?** | Resend won't send mail until DNS records (SPF, DKIM, MX) are added at the registrar. Without verification, the email step fails silently in production. | Ask the user to add the records or get Oppoq involved |
| 6 | **Slack webhook URL: who provisions it?** | Brief says `#partnerships` channel. Webhook needs to be created in Slack admin. | Ask the user; Demi or Evan likely owns this |

**Do not start coding until at least decisions 1, 2, and 3 are answered.** They affect the file structure.

---

## 4. STACK SUBSTITUTION TABLE

| Brief says | Use instead | Reason |
|---|---|---|
| `app/(public)/access/page.tsx` (Next App Router) | `src/pages/AccessPage.tsx` + `<Route>` in `src/App.tsx` | This project uses React Router |
| `app/(gated)/partner/page.tsx` | Wrap existing `<Route path="/partner">` (or `/portal`) in `<AccessGate>` | Same |
| `app/api/access/route.ts` (Next route handler) | `api/access.ts` at project root (Vercel serverless function) | Vite has no API layer; Vercel's `/api/*.ts` convention does |
| Next middleware for `/partner/*` token check | `<AccessGate>` React component + `GET /api/access/check` endpoint | SPA can't use Next middleware; checks happen on mount |
| `@react-pdf/renderer` | `pdf-lib` | Smaller bundle, no font hassles, same end product |
| Supabase client `@supabase/ssr` | `@supabase/supabase-js` (admin client in serverless function only) | No SSR layer here — service role key stays server-side |
| `httpOnly` cookie read in middleware | `httpOnly` cookie + `/api/access/check` returning 200/401 | SPA cannot read httpOnly cookies; uses an API call to check session |

---

## 5. FILE-BY-FILE CHANGE PLAN

### NEW FILES

| Path | Purpose |
|---|---|
| `src/pages/AccessPage.tsx` | The form UI — fields per brief §"Form fields", styled with existing tokens (`card`, `btn-primary`, `overline`, `text-accent`, etc.) |
| `src/components/AccessGate.tsx` | Wraps gated routes; on mount, calls `/api/access/check`. While loading: render `null` or skeleton. On 401: navigate to `/access`. On 200: render children |
| `api/access.ts` | POST handler — validates body, inserts row, generates NDA PDF, uploads to Storage, sends Resend email (with magic-link if click-required flow), posts Slack webhook, sets `gated_access_token` httpOnly cookie (only if submit-immediate flow), returns 200 |
| `api/access/check.ts` | GET handler — reads `gated_access_token` cookie, looks up row, checks `expires_at`, returns 200 or 401 |
| `api/access/verify.ts` *(only if click-required flow chosen in §3 decision 2)* | GET handler — reads `?token=X` query param, finds matching row, sets httpOnly cookie, redirects to `/partner` (or `/portal`) |
| `api/_lib/supabase.ts` | `@supabase/supabase-js` admin client factory using `SUPABASE_URL` + `SUPABASE_SERVICE_ROLE_KEY` |
| `api/_lib/nda-pdf.ts` | `pdf-lib` template — embeds NDA text from brief §"NDA CONTENT" with name, organization, IP, timestamp filled in |
| `api/_lib/email.ts` | Resend SDK wrapper — sends "Your NDA + access link" email with PDF attachment + magic-link URL |
| `api/_lib/slack.ts` | `fetch` POST to `SLACK_WEBHOOK_URL` with name, org, role, email, timestamp |
| `supabase/migration-gated-access.sql` | The SQL from brief §"DATABASE MIGRATION". User runs this manually in Supabase dashboard; no automated migration tool here |

### MODIFIED FILES

| Path | Change | Risk |
|---|---|---|
| `src/App.tsx` | Add `<Route path="/access">`. Wrap `<Route path="/partner">` (or `/portal`) in `<AccessGate>`. Optionally add `<Route path="/portal" element={<Navigate to="/partner" replace />} />` for back-compat if path changes later | 🟢 Low — additive |
| `package.json` | Add `@supabase/supabase-js`, `resend`, `pdf-lib` to `dependencies` | 🟢 Low |
| `vercel.json` | Change rewrite source from `/(.*)` to `/((?!api/).*)` so `/api/*` requests reach the functions and don't get hijacked into `index.html` | 🟡 **Medium** — get the regex wrong and either API breaks or SPA routing breaks |

### LEAVE ALONE

| Path | Why |
|---|---|
| `src/App.tsx` other routes (`/`, `/challenge`, `/protocol`, `/evidence`, `/month`, `/about`, `/blog`, etc.) | Not in scope |
| `src/pages/PartnerPage.tsx` content | If gating `/partner`, the existing 3-tab content stays — only the route gets wrapped. If using `/portal`, `PartnerPage.tsx` is untouched entirely |
| `src/components/shared.tsx` | Reuse `Navbar`, `Footer`, `FadeIn`, `Link`, `ChevronRight`, etc. as-is in the new pages |
| `src/index.css` | All design tokens already exist — `card`, `btn-primary`, `btn-ghost`, `overline`, `caption`, `text-accent`, `text-ink`, `bg-bg-muted`, `border-hair`, etc. Don't add new styles |
| `BUTTERFLY_ONE_FULL_SPEC_v2.md` | Foundation site spec, separate document, do not edit |
| `vite.config.ts` | API functions don't go through Vite |
| `tsconfig.json` | Existing config covers `api/*.ts` files |
| `index.html` | Static SPA shell, unchanged |
| `public/butterfly-one-homepage.html` | Static homepage iframe target, unchanged |

---

## 6. ENV VARS (set in Vercel dashboard)

Strict separation between frontend-readable and backend-only:

| Name | Scope | Where read | Notes |
|---|---|---|---|
| `VITE_SUPABASE_URL` | Frontend (browser) | `import.meta.env.VITE_SUPABASE_URL` | Public anon URL only |
| `VITE_SUPABASE_ANON_KEY` | Frontend (browser) | `import.meta.env.VITE_SUPABASE_ANON_KEY` | If frontend talks to Supabase directly. If only the serverless function does, omit this |
| `SUPABASE_URL` | Backend (function) | `process.env.SUPABASE_URL` | Same URL, different name to avoid leaking to bundle |
| `SUPABASE_SERVICE_ROLE_KEY` | Backend (function) | `process.env.SUPABASE_SERVICE_ROLE_KEY` | **Never** prefix with `VITE_` — that would expose the service role key to every visitor |
| `RESEND_API_KEY` | Backend | `process.env.RESEND_API_KEY` | Server-only |
| `SLACK_WEBHOOK_URL` | Backend | `process.env.SLACK_WEBHOOK_URL` | Server-only |
| `NDA_BUCKET_NAME` | Backend | `process.env.NDA_BUCKET_NAME` | Default: `nda_signatures` |
| `BUTTERFLY_ONE_BASE_URL` | Backend | `process.env.BUTTERFLY_ONE_BASE_URL` | E.g. `https://butterfly.one`. Used to build magic-link URLs in emails |

**Critical:** Vite injects any env var prefixed `VITE_` into the browser bundle at build time. Anything without that prefix stays server-side. Get this wrong and the service role key ends up in shipped JavaScript.

---

## 7. GOTCHAS — read these before writing any code

1. **`vercel.json` regex must exclude `/api/`.** Current value `/(.*)` will route every request — including `/api/access` — to `index.html`. Fix:
   ```json
   { "rewrites": [{ "source": "/((?!api/).*)", "destination": "/index.html" }] }
   ```
   Test that `/api/access/check` returns JSON and `/protocol` still loads the SPA.

2. **httpOnly cookie cannot be read by the SPA.** Use a `GET /api/access/check` endpoint instead. The gate component calls it on mount.

3. **Cookie attributes must be:**
   ```
   gated_access_token=<value>; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=2592000
   ```
   `Max-Age=2592000` = 30 days. `Secure` is required in production. `SameSite=Lax` lets the cookie ride along on top-level navigations from the magic link.

4. **Local dev requires Vercel CLI.** `npm run dev` runs only Vite. To exercise `/api/*.ts` locally use:
   ```bash
   npx vercel dev
   ```
   The first run prompts to link the project — link to the existing butterfly.one Vercel project.

5. **Resend domain verification is a prerequisite.** Until DNS TXT records (SPF, DKIM) for `butterfly.one` are added at the registrar and verified in Resend's dashboard, every send returns an error. Plan this in parallel, not at the end.

6. **`pdf-lib` standard fonts only by default.** Helvetica/Times work without embedding. To match site typography (Inter), embed `Inter-Regular.ttf` from Google Fonts manually. ~300 KB added to function bundle.

7. **Function size budget.** Vercel's compressed limit is 50 MB. `@supabase/supabase-js` (~600 KB) + `resend` (~100 KB) + `pdf-lib` (~3 MB) + Inter font (~300 KB) is well under.

8. **Don't render gated content while the auth check is pending.** Otherwise the protected page flashes for ~200 ms before redirecting. `<AccessGate>` should render `null` (or a skeleton) while `fetch('/api/access/check')` is in flight.

9. **Existing `<form>` submission patterns.** [src/App.tsx:303](src/App.tsx#L303) has `onSubmit={(e) => { e.preventDefault(); }}` for the newsletter — copy that pattern for the AccessPage form.

10. **React Router 7 redirect for path migration.** If user later changes from `/portal` to `/partner` (or vice versa), add a one-line `<Route path="/old-path" element={<Navigate to="/new-path" replace />} />` for ~30 days so old magic-link emails still work.

11. **Duplicate email submission.** Brief says "update the existing row, regenerate token, send fresh email." Use Supabase upsert: `INSERT ... ON CONFLICT (email) DO UPDATE SET ...`. The brief's table doesn't have a unique constraint on email — add one in the migration, or handle the conflict in app code.

12. **Resend down → don't block the user.** Wrap the email send in try/catch. Log the error. Continue with the cookie + redirect. The brief explicitly allows this (line 224).

13. **IP address.** Read from `req.headers['x-forwarded-for']` (first entry). Vercel sets this automatically.

---

## 8. RECOMMENDED BUILD ORDER (5 days, adapted from brief)

| Day | Work |
|---|---|
| 1 | Provision Supabase project + run migration SQL + create `nda_signatures` private bucket. Set Vercel env vars. Verify Resend domain. Provision Slack webhook. |
| 2 | `api/_lib/supabase.ts`, `api/_lib/nda-pdf.ts` (with `pdf-lib`), `api/_lib/email.ts` (Resend), `api/_lib/slack.ts`. Test each in isolation via a throwaway `/api/test/*` endpoint. |
| 3 | `api/access.ts` POST handler wiring all four helpers. `api/access/check.ts`. `api/access/verify.ts` if click-required flow. Update `vercel.json`. Test via `vercel dev` + curl. |
| 4 | `src/pages/AccessPage.tsx` form UI. `src/components/AccessGate.tsx`. Update `src/App.tsx` to add `/access` route + wrap gated route. Test full flow end-to-end locally. |
| 5 | Mobile QA (iOS Safari, iOS Chrome, desktop Chrome, desktop Safari). Edge cases: duplicate email, empty fields, Resend failure, expired cookie, incognito visit to gated path. Deploy to staging Vercel deployment. Walk through brief's 10 acceptance criteria. |

---

## 9. ACCEPTANCE CRITERIA — TRANSLATED TO THIS STACK

The brief's [10 criteria](./SAIDISLOM_BRIEF.md#L162-L175) re-mapped:

| # | Brief criterion | What it means here |
|---|---|---|
| 1 | Visitor lands on `/access`, sees clean form on **dark** background | Brief said dark — but butterfly.one's design system is **white**. Match site palette (`bg-white`, `text-ink`, `text-accent`). Confirm with user; the brief's "dark background" was likely written generic. |
| 2 | Empty form → inline validation errors | Standard React state form with `required` + custom error display. No special server roundtrip. |
| 3 | Valid form → completes < 4 s | Cold-start function ~1.5 s + DB insert ~200 ms + PDF gen ~500 ms + Storage upload ~500 ms + Resend send (async) + Slack (async) + cookie set ~50 ms = ~2.7 s total. Achievable. |
| 4 | Email arrives < 60 s | Resend median delivery ~5–15 s. Achievable. |
| 5 | User is "auto-logged-in" + lands on `/partner` | Means: cookie is set + redirect happens client-side after fetch resolves. If click-required magic-link flow, this happens after they click the email link, not on form submit. **Clarify with user.** |
| 6 | Slack ping < 30 s | Webhook fires synchronously inside the function. Sub-second. |
| 7 | Second visit within 30 days lands directly on `/partner` | `<AccessGate>` calls `/api/access/check`, gets 200, renders children. |
| 8 | Incognito visit to `/partner` redirects to `/access` | `<AccessGate>` calls `/api/access/check`, gets 401, navigates to `/access`. |
| 9 | PDF in Storage matches PDF emailed | Generate once, upload to Storage, attach the same bytes to the email. Don't re-generate twice. |
| 10 | Mobile Safari + iOS Chrome + desktop Chrome + desktop Safari all work | Standard responsive form. Watch Safari ITP for cookies — `Secure; SameSite=Lax` should be enough since same-origin. |

---

## 10. THINGS THAT WILL BREAK IF DONE WRONG

| Mistake | Consequence | Avoidance |
|---|---|---|
| Leave `vercel.json` rewrite as `/(.*)` | `/api/access` returns HTML, frontend gets a JSON parse error | Use `/((?!api/).*)` and verify with `curl` in staging |
| Prefix `SUPABASE_SERVICE_ROLE_KEY` with `VITE_` | Service role key shipped in browser bundle — full DB takeover possible | Only `VITE_*` for frontend-safe values. Do a `grep` on `dist/` after build to verify no `service_role` substring leaks |
| Render gated page children before `/api/access/check` resolves | Flash of protected content before redirect | `<AccessGate>` returns `null` while `loading === true` |
| Forget `Secure` flag on cookie in production | Browsers reject the cookie on HTTPS pages | Always include `Secure` in `Set-Cookie` headers |
| Use `@react-pdf/renderer` per brief literally | Function bundle bloats, cold start spikes, possibly hits 50 MB limit with fonts | Use `pdf-lib` instead |
| Convert site to Next.js | Weeks of work, breaks every existing page | Don't. Keep Vite/React/React Router. |
| Gate `/partner` without confirming with user | Every homepage CTA pushes visitors into NDA wall | Ask first. See §3 decision 1. |
| Skip Resend domain verification | All emails fail in production with no obvious error | Verify on day 1, not day 5 |
| Hardcode magic-link base URL as `localhost:5173` | Production emails contain dev links | Use `process.env.BUTTERFLY_ONE_BASE_URL` with fallback to request `Host` header |

---

## 11. WHAT THIS PLAN DOES NOT INCLUDE (deferred)

- Marketing homepage redesign (handled by [BUTTERFLY_ONE_FULL_SPEC_v2.md](./BUTTERFLY_ONE_FULL_SPEC_v2.md))
- `/partner/tiers` page content (Oppoq drafts copy, wire up post-launch)
- `/partner/deck` download page (next sprint per brief)
- Tier-specific gating
- Admin panel — read submissions in Supabase dashboard
- DocuSign integration (V2)
- Internationalization
- reCAPTCHA — only if spam appears
- 90-day purge cron for `gated_access_requests` (V2)
- GDPR/CCPA flows beyond a one-line disclosure

---

## 12. CONTACT (per brief §"CONTACT")

- Architectural questions → Oppoq
- Brand/copy questions → Oppoq
- Email content questions → Demi
- Anything blocking the build → message Oppoq immediately

---

## 13. CHECKLIST FOR THE FRESH CLAUDE SESSION

Before writing a single line of code:

- [ ] Read [SAIDISLOM_BRIEF.md](./SAIDISLOM_BRIEF.md) end to end
- [ ] Read this file end to end
- [ ] Read [package.json](./package.json), [vite.config.ts](./vite.config.ts), [vercel.json](./vercel.json), [src/App.tsx](./src/App.tsx) to confirm project state matches §1
- [ ] Ask the user the six questions in §3
- [ ] Confirm the user is OK with `pdf-lib` substitution for `@react-pdf/renderer`
- [ ] Confirm the user has provisioned (or is about to provision): Supabase project, Resend account + verified domain, Slack webhook
- [ ] Confirm the user understands that local dev requires `vercel dev` (not just `npm run dev`)
- [ ] Get an explicit go-ahead before touching `vercel.json`

After all of the above is settled, follow §8 Build Order.

---

*If something here turns out to be wrong, trust the actual code state over this document. Update this file when reality changes.*
