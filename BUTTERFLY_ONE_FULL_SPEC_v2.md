# BUTTERFLY.ONE — FULL WEBSITE SPEC v2
## Foundation site. Design stays. Content evolves.
## For Saidislom. April 16, 2026.

---

# SUMMARY

butterfly.one evolves from "protocol product page" to "foundation home." The design system is UNCHANGED. The structure changes. 8 pages. The protocol, evidence, and ROI calculator stay exactly as built.

---

# DESIGN SYSTEM — NO CHANGES

All existing CSS, typography, spacing, colors, motion rules, card radius (28px), max width (1120px) — untouched. The Apple aesthetic continues. White background. System-ui stack. Zero photography on protocol/evidence pages. Evan's photo on /about is the single exception.

---

# NAVIGATION (all pages)

Old: Standard · Protocol · Evidence · Team · Partner
New: Challenge · Protocol · About · Partner · [Donate]

Evidence and Month: accessible from homepage links and footer. Not in main nav.

---

# FOOTER (all pages)

Butterfly Foundation · 501(c)(3) · hello@butterfly.one

Links: Challenge · Protocol · Evidence · Month · About · Partner · Blog
Support: 988 · findahelpline.com
Legal: Privacy · Terms · Accessibility · Safeguarding
Bridge: "For the Challenge: thebutterflychallenge.com"

---

# PAGE 1: HOMEPAGE (/) — REBUILD

11 scroll sections. Each one viewport on desktop.

## Scroll 1 — Hero
Butterfly Foundation
"Mental health is everyone's story."
"We're building a world where mental health is openly supported, universally accessible, and never faced alone."
CTA: [Join the Movement → thebutterflychallenge.com] + [Our Mission → scroll]
Design: Large centered type. Butterfly glyph or subtle line animation behind. No photos.

## Scroll 2 — The Foundation
"What started as One Humanity has become a movement the world can feel."
Full paragraph about the Butterfly Foundation mission.
Credential strip: WHO recommended · 30+ years research · 100+ studies · 60 seconds
Design: Centered text, max 70ch. Credential strip as muted pills.

## Scroll 3 — Many → One → Billion
"How one gesture reaches a billion people."
Three columns: MANY (The Challenge) → ONE (The Sign) → BILLION (The Impact)
Each column: label, title, 2-line description, link
Design: Triptych line element connecting the three. Converge → point → diverge.

## Scroll 4 — Four Programs
"Four ways we're changing the world."
4 cards in 2×2 grid:
- The Butterfly Symbol: universal symbol for mental health
- The Butterfly Challenge: viral movement, 60-second videos → thebutterflychallenge.com
- Butterfly Month: every May → /month
- ONETOPIA Festival: coming 2027

## Scroll 5 — Mental Health Belongs in Every Space
"Whether you lead a classroom, a team, or a brand — we have free tools built for you."
3 cards: [For Schools] [For Workplaces] [For Brands] → each links to /partner with tab pre-selected

## Scroll 6 — The Scale
1B people · 1 in 5 young people · 11 years wait · 60 seconds to learn the sign
Large numbers, sourced. "60 seconds" as the answer below the 3 problem stats.

## Scroll 7 — Founder
Evan photo (warm, natural light) + quote: "The pandemic forced me to face something I'd been ignoring my whole life..."
Link: "Read the full story → /about"
ONLY photograph allowed on the foundation site.

## Scroll 8 — Latest From Us
"News, stories & resources." 3 blog cards (placeholder). → /blog

## Scroll 9 — Newsletter
"Stay connected. Be part of the movement."
Email input + Subscribe. Stores to Supabase email_reminders or newsletter_subscribers table.

## Scroll 10 — CTA
"60 seconds. Be the person who showed up."
Two buttons: [Take the Challenge] + [Deploy the Protocol]

## Scroll 11 — Support + Donate
Left: "Struggling right now?" + 988 + Find Support Now
Right: "Every dollar lifts a hand." + donate amounts + [Donate → donate.butterfly.one]

---

# PAGE 2: /challenge — NEW (bridge page)

One-page overview that bridges to thebutterflychallenge.com. NOT a duplicate.

Section 1: Hero — "Two hands. One signal. A billion lives." + counter + [Take the Challenge →]
Section 2: How It Works — 3 steps (Take/Show/Lift) as cards
Section 3: The Story — timeline (1998 Lucina Artigas → 2024 Prince Harry → 2026 The Challenge)
Section 4: CTA — [Take the Challenge → thebutterflychallenge.com]

Counter pulls from Supabase hand_raises (read-only).
Estimated: 2-3 hours.

---

# PAGE 3: /protocol — STAYS AS-IS + small additions

EVERYTHING stays. Stepper, legal cards, training, compliance, downloads. All untouched.

ADD at top (below headline):
"The Butterfly Challenge teaches the world the sign. This page shows organizations what to do when they see it."
Small link: "See the Challenge → thebutterflychallenge.com"

ADD at bottom (after compliance section):
"Deploy in Your Organization" section with 4 org types (Workplace/School/Sports/Faith), 90-day rollout phases, and [Request Deployment Brief → /partner] CTA.

Estimated: 30 minutes.

---

# PAGE 4: /evidence — NO CHANGES

Everything stays exactly as is. Stats, ROI calculator, science table, competitive table, "what we don't claim." Only update: footer links to match new nav.

Estimated: 0 hours (footer update only).

---

# PAGE 5: /month — NEW

Butterfly Month explainer + participation paths + May calendar.

Section 1: Hero — "Butterfly Month. Every May. Starting 2026." + countdown
Section 2: How to Participate — As individual (challenge), school (kit), workplace (protocol), brand (alliance)
Section 3: May Calendar — April 30 event → May 1 launch → May 10 Mother's Day → May 15 competition → May 31 close
Section 4: Vision — "One humanity. Many flags. One butterfly." + flag visual (reuse from challenge site)
Section 5: CTA — [Take the Challenge] + [Deploy in your organization]

Estimated: 3-4 hours.

---

# PAGE 6: /about — REPLACES /team

Section 1: Founder Story — Evan photo + quote + full narrative
Section 2: Confirmed Coalition — by function, CONFIRMED ONLY:
  - Celebrity: FAME (confirmed), Komi (confirmed), ITP (confirmed)
  - Product: Ari Spool (Head of Product)
  - Advisory: StratMinds (Jhang, Borzov, Kim)
  - Foundation: Evan Klassen, 501(c)(3), 30+ advisors

REMOVED (unconfirmed): Cleveland Clinic, Cerberus, Milken, Riot Games, Creta, all individual founding partners unless publicly confirmed.

Section 3: Governance — 501(c)(3), clinical advisors, OSHA/WHO/SAMHSA/ISO review, Constitution download
Section 4: CTA — [Partner with us → /partner]

Estimated: 3-4 hours.

---

# PAGE 7: /partner — REFRAMED

From "sponsorship tiers" to "bring this to your world."

Section 1: Hero — "Mental health belongs in every space."
Section 2: 3 Tabs — [For Schools] [For Workplaces] [For Brands] with specific content per tab (kits, protocol deployment, brand activation)
Section 3: The Alliance — roles grid (Creators, Celebrities, Athletes, etc.) + "1,000+ leaders showing up"
Section 4: Sponsorship Tiers — Founding ($1M), Campaign ($500K), Community ($250K) + "53% of Gen Z" stat
Section 5: Governance — Constitution points (non-political, no editorial control, anti-washing, safety before scale) + PDF download
Section 6: Contact Form — Name, Title, Org, Email, Interest checkboxes, Message → sends to protocol@butterfly.one

CRITICAL: Form backend sends to protocol@butterfly.one = your inbox.

Estimated: 4-5 hours.

---

# PAGE 8: /blog — PLACEHOLDER

3 static cards:
1. "Why the butterfly hug works: the neuroscience" (Science)
2. "How May became the most important month in mental health" (Movement)
3. "Introducing the Butterfly Protocol for teams" (Partnership)

Each card: category pill + headline + excerpt + date. Links to simple article pages or expands in place. Full CMS comes post-launch.

Estimated: 1-2 hours.

---

# DONATE SUBDOMAIN

donate.butterfly.one — DNS CNAME to donation platform (Every.org, Stripe, or custom).
Set up when Ari chooses platform. For now: placeholder page with email capture.

---

# BUILD ORDER

| # | Page | Hours | Priority |
|---|------|-------|----------|
| 1 | Homepage (11 scrolls) | 6-8 | 🔴 Coachella |
| 2 | /about (founder + team + governance) | 3-4 | 🔴 Coachella |
| 3 | /challenge (bridge page) | 2-3 | 🟡 |
| 4 | /partner (reframed with tabs) | 4-5 | 🟡 |
| 5 | /month | 3-4 | 🟡 |
| 6 | /protocol (small additions) | 0.5 | 🟢 |
| 7 | /blog (placeholder) | 1-2 | 🟢 |
| 8 | Nav + footer updates (all pages) | 1.5 | 🟢 |
| 9 | donate.butterfly.one DNS | 0.25 | 🟢 |

Total: ~22-28 hours.
Coachella sprint (2 days): Homepage + /about + nav/footer = ~12 hours.

---

# PROTOCOL NAME

Stays: THE BUTTERFLY PROTOCOL.
No HumanSignal. No new domain. Lives at butterfly.one/protocol. Same brand. Same butterfly. Same logo. Done.

---

# WHAT DIDN'T CHANGE

| Element | Status |
|---------|--------|
| /protocol page content | ✅ Untouched |
| /evidence page content | ✅ Untouched |
| ROI calculator | ✅ Untouched |
| Legal cards | ✅ Untouched |
| Training section | ✅ Untouched |
| Protocol stepper | ✅ Untouched |
| Design system | ✅ Untouched |
| 988 routing | ✅ Everywhere |
| Contact form → protocol@butterfly.one | ✅ Your inbox |

The foundation grew around the protocol. The protocol didn't change. It just got a bigger house.
