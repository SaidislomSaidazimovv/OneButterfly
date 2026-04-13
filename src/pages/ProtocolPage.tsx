import {
  Navbar, Footer, FadeIn, PartnerCTA,
  Category, ProtocolStepper, Comparison, Legal, Training,
  Check
} from '../components/shared';

/** Section 5 — Compliance detail */
const ComplianceDetail = () => (
  <section className="section bg-bg-muted/30">
    <div className="container max-w-[800px]">
      <FadeIn>
        <span className="overline mb-4 block">COMPLIANCE</span>
        <h2 className="mb-12">Built for legal review.</h2>
      </FadeIn>
      <div className="card border-hair p-8 md:p-10">
        <ul className="space-y-4">
          {[
            { title: "EEOC", desc: "Non-diagnostic, voluntary." },
            { title: "RE-AIM", desc: "Standardized evaluation framework." },
            { title: "Anti-washing clause", desc: "No reputational cover without genuine deployment." },
            { title: "No personal health data", desc: "Behavioral records, separately stored, 90-day retention." },
            { title: "DPIA-ready", desc: "Data Protection Impact Assessment template included for EU operations." },
          ].map((item, i) => (
            <li key={i} className="flex gap-3 text-ink text-[16px]">
              <Check size={18} className="text-accent shrink-0 mt-1" />
              <span><span className="font-bold">{item.title}:</span> <span className="text-muted">{item.desc}</span></span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </section>
);

export default function ProtocolPage() {
  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <Navbar />
      <main>
        <section className="bg-ink text-white pt-20 md:pt-32 pb-12 md:pb-20 px-6">
          <div className="container">
            <FadeIn>
              <span className="overline mb-4 block text-white/60">THE PROTOCOL</span>
              <h1 className="mb-6 text-white">Four steps. <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-light to-accent">Thirty seconds.</span></h1>
              <p className="text-[20px] font-medium max-w-[700px] text-white/70">
                You are the first responder, not the therapist. See. Stay. Ask. Connect.
              </p>
            </FadeIn>
          </div>
        </section>
        <Category />
        <ProtocolStepper />
        <Comparison />
        <Legal />
        <Training />
        <ComplianceDetail />
        <PartnerCTA
          headline="Deploy in your organization."
          buttonText="Deploy in your organization"
        />
      </main>
      <Footer />
    </div>
  );
}
