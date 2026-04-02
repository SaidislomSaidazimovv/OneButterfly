# BUTTERFLY.ONE — UPDATE INSTRUCTIONS
## The site exists. This is what CHANGES.
## April 2, 2026

---

# WHAT HAPPENED

The deck went from 12 slides to 8. Everything that was removed from the deck
now needs to live on butterfly.one. The site already has most of this content
on the homepage — it just needs to be reorganized into separate pages
so each deck slide can link to the RIGHT page.

# WHAT STAYS THE SAME

- Design system (Apple aesthetic, white bg, typography, spacing) — unchanged
- The protocol walkthrough (interactive stepper) — unchanged
- The ROI calculator — unchanged
- Legal section (OSHA/ADA/HIPAA) — unchanged
- Training overview — unchanged
- Organization types (workplace/school/sports/faith) — unchanged
- Footer with 988 — unchanged
- All CSS, fonts, motion rules — unchanged

# WHAT CHANGES

## Change 1: Create URL routes

The homepage content gets split into pages. The content ALREADY EXISTS on the homepage — it just needs its own URL.

| New URL | What moves there | From homepage section |
|---------|-----------------|---------------------|
| /evidence | Highlights tiles + Context + Evidence table + ROI calculator | Sections 1, 2, 6, 7 |
| /protocol | Category definition + Protocol stepper + What it is/isn't + Legal + Training | Sections 3, 4, 5, 8, 9 |
| /team | Governance + new team content (see below) | Section 14 + new |
| /partner | Sponsor tiers + briefing form + contact | Sections 15, 16, 17 |
| /launch | NEW content (see below) | Does not exist yet |
| /deploy | Org segments + new timeline (see below) | Section 10 + new |

**Technical approach:** Either create separate pages that pull from the same components, or use anchor routes that scroll to the right section. Separate pages are better for the deck-link use case (VP taps a URL and lands on exactly the right content, not a long scroll).

## Change 2: Simplify the homepage

The homepage becomes a ROUTING page, not a 20-section scroll.

**Keep on homepage:**
- Hero (headline + 4-step diagram + CTA)
- 4 routing cards linking to /evidence, /protocol, /team, /partner
- Final CTA section
- Footer

**ADD to homepage hero:**
One bridge line below the hero subhead:
"The Butterfly Challenge teaches the world to recognize the sign. This site shows organizations what to do when they see it."
With a small link to butterflychallenge.org

**REMOVE from homepage** (moved to subpages):
Everything else. The subpages carry it now.

## Change 3: Add NEW content to /evidence

The deck no longer shows 970M, $5T, 11 years. This data now ONLY lives here. Add these if not already present:

**New data points:**
- 48.6% didn't know where to get help (SAMHSA NSDUH, 2023)
- 67-day median wait for new psychiatric patients (2023 National Audit)
- Average EAP: $30-100/employee/year at 2-8% utilization

**New section — Competitive Positioning Table:**
(Add BELOW the ROI calculator or the evidence table)

| Program | Time | Type |
|---------|------|------|
| Mental Health First Aid | 8 hours | Knowledge certification |
| QPR | 1 hour | Gatekeeper training |
| safeTALK | 3 hours | Awareness training |
| **Butterfly Protocol** | **30 seconds** | **Activation layer** |

This table is the single most persuasive element for sponsors. Make it visually prominent.

## Change 4: Create /launch (NEW page)

This page does NOT exist yet. It carries the 48-hour choreography and the distribution engine — content that used to be in the deck.

**Section 1 — 48-Hour Choreography:**
Visual timeline:
- Hour 0: 10 founding faces, Miami, April 30, FAME orchestrates
- Hour 12: Curiosity peaks, traffic to butterflychallenge.org
- Hour 24: Second wave, unexpected faces break embarrassment wall
- Hour 48: Chain multiplies, gesture becomes self-explanatory
- Week 1: "Someone posts it for their mom. She watches it 14 times."

**Section 2 — Distribution Engine:**
Three cards:
- FAME (Sheeraz Hasan): Celebrity amplification. 25 years. Portfolio: Kardashian, Zendaya, Gomez, Bieber, Lopez, Chopra. (FAME's track record, not Butterfly commitments.)
- Komi: 125,000 creators. CONFIRMED.
- ITP Media: Broadcast production. Global distribution. CONFIRMED.

**Section 3 — ALS Precedent:**
17M videos · $220M raised · 159 countries · 5 genes · 2 FDA treatments
"Same mechanic. Ours adds a permanent response system."

**CTA:** "Partner with the launch" → /partner

**Design note:** This page can be slightly darker/more energetic than the rest of butterfly.one. It's the most challenge-adjacent content.

## Change 5: Create /team (restructured)

The current governance section becomes /team, reorganized by FUNCTION:

- **Celebrity + Distribution:** FAME, Komi (125K), ITP
- **Product + Tech:** StratMinds — Richard Jhang (ex-IBM CIO), Anton Borzov (First Designer at WhatsApp, 1.8B users), Summer Kim
- **Clinical:** Ricky Brar/Brains (founding), Cleveland Clinic pathway
- **Finance:** David Knower/Cerberus, James Morgon/Milken Institute
- **Gaming:** Sang Yoon Lee/Creta, Thomas Vu/Riot Games
- **Culture:** Andrew Dawson, Ralph Simon, Bernd Breiter/World Club Dome
- **Founding Partners:** Ghazzawi, Kwon Hyuk/Naver, El Alami, Costa
- **Foundation:** Evan Klassen, OHF 501(c)(3), 30+ advisors

**RULE:** Only show CONFIRMED and ACTIVE. No one marked PENDING or IN DISCUSSION.

**CTA:** "Join the founding coalition" → /partner

## Change 6: Update /partner

If the sponsor section already exists, update with:

**Three tiers (if not already present):**
- Founding Partner: $1M/year — category exclusive, all activations
- Campaign Partner: $500K/year — challenge integration, event presence
- Community Partner: $250K/year — employee protocol, internal deployment

**Add if missing:**
- "What are we missing? Tell us what matters to your brand."
- Anti-washing clause
- Deadline: April 15, 2026
- Appendix PDF download link

## Change 7: Add /deploy

Move the organization segments (workplace/school/sports/faith) here. Add:

**Q1-Q4 Validation Timeline:**
- Q1: Advisory board, Safety Standard v1.0, first 3 pilots
- Q2: 3-5 enterprise pilots (200-2,000 employees), RE-AIM measurement
- Q3: Founding assembly, global cascade, announce results
- Q4: Broad rollout, publish data, certification program

## Change 8: Update navigation

**Old nav:** Overview · Protocol · Evidence · Training · Legal · For Organizations · Sponsors
**New nav:** Protocol · Evidence · Team · Partner

Keep: logo left, "Request Implementation Brief" CTA right.

---

# PRIORITY ORDER

| # | What | Time estimate | Blocks |
|---|------|--------------|--------|
| 1 | Create /partner route (move sponsor sections there) | 1-2 hours | Blocks deck |
| 2 | Create /evidence route (move data sections there, add competitive table) | 2-3 hours | Blocks deck |
| 3 | Simplify homepage to routing page | 1-2 hours | — |
| 4 | Create /protocol route (move protocol sections there) | 1-2 hours | — |
| 5 | Create /team (restructure governance into function map) | 2-3 hours | — |
| 6 | Create /launch (NEW — 48hr choreography + engine) | 3-4 hours | — |
| 7 | Create /deploy (move org segments + add timeline) | 2-3 hours | — |
| 8 | Update navigation | 30 min | — |

**Total: ~14-20 hours** (not 26 — the content mostly exists, it's reorganization + new content for /launch and /team).

**Critical path: /partner + /evidence = 3-5 hours. Ship these first.**

---

# THE DECK LINKS TO THESE URLs

| Deck slide | Links to |
|-----------|----------|
| 3 (the dare) | butterflychallenge.org/how |
| 4 (the bridge) | butterfly.one/protocol |
| 5 (the proof) | butterfly.one/launch |
| 6 (the people) | butterfly.one/team |
| 7 (the moment) | butterfly.one/partner |
| 8 (the invitation) | both QR codes |

If /partner and /evidence aren't live, the deck can't ship.

---

# ONE RULE

Every page ends with a CTA that points to /partner.
/partner is where everything converts.
