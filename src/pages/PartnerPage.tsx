import {
  Navbar, Footer, FadeIn,
  Sponsors, ContactForm, AlertCircle
} from '../components/shared';

const AntiWashing = () => (
  <section className="section bg-white">
    <div className="container max-w-[800px]">
      <FadeIn>
        <div className="card border-ink/10 bg-bg-muted/50 p-10">
          <h3 className="mb-6 text-[22px]">Anti-washing clause</h3>
          <p className="text-muted text-[16px] mb-6">
            We do not accept partners who use mental health alignment for marketing purposes without operational commitment.
            Partnering means deploying — not decorating. Every partner agrees to measurable deployment milestones.
          </p>
          <div className="flex flex-col md:flex-row gap-6 items-start">
            <div className="card bg-white border-accent/20 p-6 flex-1">
              <div className="flex items-center gap-3 mb-3">
                <AlertCircle size={20} className="text-accent" />
                <span className="font-bold text-ink">Deadline</span>
              </div>
              <p className="text-accent font-bold text-[24px]">April 15, 2026</p>
              <p className="caption mt-2">Founding partner commitments close.</p>
            </div>
            <div className="card bg-white border-hair p-6 flex-1">
              <span className="font-bold text-ink block mb-3">Appendix</span>
              <button className="btn-ghost border-hair hover:border-accent text-sm font-bold w-full">
                Download Appendix PDF
              </button>
            </div>
          </div>
        </div>
      </FadeIn>
    </div>
  </section>
);

export default function PartnerPage() {
  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <Navbar />
      <main>
        <section className="bg-ink text-white pt-32 pb-20 px-6">
          <div className="container">
            <FadeIn>
              <span className="overline mb-4 block text-white/60">PARTNER WITH US</span>
              <h1 className="mb-6 text-white">Where everything <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-light to-accent">converts.</span></h1>
              <p className="text-[20px] font-medium max-w-[700px] text-white/70">
                Sponsorship tiers, briefing requests, and partnership inquiries. Organizations that move first define what standard looks like for their industry.
              </p>
            </FadeIn>
          </div>
        </section>
        <Sponsors />
        <AntiWashing />
        <ContactForm />
      </main>
      <Footer />
    </div>
  );
}
