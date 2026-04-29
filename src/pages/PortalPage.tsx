import { Navbar, Footer, FadeIn, Link } from '../components/shared';

/**
 * Placeholder gated landing page reached only after a signed NDA + magic-link
 * verification. Real partner content (tiers, deck, financials) lands here in
 * future sprints. For V1, this is just a "you're inside" confirmation.
 */
export default function PortalPage() {
  return (
    <div className="min-h-screen bg-white overflow-x-hidden flex flex-col">
      <Navbar />
      <main className="flex-1 pt-32 pb-20">
        <section className="section bg-white pt-0">
          <div className="container max-w-[800px]">
            <FadeIn>
              <span className="overline mb-4 block">PARTNER PORTAL</span>
              <h1 className="mb-6 text-ink">You're in. Welcome.</h1>
              <p className="text-muted text-[18px] leading-relaxed mb-10">
                You've signed the mutual NDA and verified your email. Confidential partnership material — tier
                pricing, financial projections, the founding-partner roster, and launch plans — will land here as
                they're prepared.
              </p>
            </FadeIn>

            <FadeIn delay={0.05}>
              <div className="grid md:grid-cols-2 gap-4 mb-10">
                <div className="card border-hair p-6">
                  <h3 className="text-ink font-bold text-[18px] mb-2">Partnership tiers</h3>
                  <p className="text-muted text-[14px]">In preparation. Available later this sprint.</p>
                </div>
                <div className="card border-hair p-6">
                  <h3 className="text-ink font-bold text-[18px] mb-2">Deck download</h3>
                  <p className="text-muted text-[14px]">In preparation. Next sprint.</p>
                </div>
                <div className="card border-hair p-6">
                  <h3 className="text-ink font-bold text-[18px] mb-2">Financial projections</h3>
                  <p className="text-muted text-[14px]">In preparation.</p>
                </div>
                <div className="card border-hair p-6">
                  <h3 className="text-ink font-bold text-[18px] mb-2">Founding partner roster</h3>
                  <p className="text-muted text-[14px]">In preparation.</p>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.1}>
              <div
                className="rounded-2xl p-6 border"
                style={{ borderColor: 'var(--hair)', background: 'var(--accent-light)' }}
              >
                <h3 className="text-ink font-bold text-[16px] mb-2">Direct line</h3>
                <p className="text-muted text-[14px] mb-3">
                  Questions, tier customization, or a same-day call? Reach the partnerships team.
                </p>
                <a
                  href="mailto:hello@butterfly.one"
                  className="text-accent font-bold text-[14px] hover:underline"
                >
                  hello@butterfly.one →
                </a>
              </div>
            </FadeIn>

            <FadeIn delay={0.15}>
              <p className="caption mt-12">
                Your access is bound by the NDA you signed. Don't share this URL — magic links are single-use and
                tied to your browser.{' '}
                <Link to="/partner" className="text-accent hover:underline">
                  Public partner page →
                </Link>
              </p>
            </FadeIn>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
