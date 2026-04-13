import {
  Navbar, Footer, FadeIn,
  Sponsors, ContactForm, AlertCircle, FileText, Check
} from '../components/shared';

/** Section 1 — The opportunity */
const Opportunity = () => (
  <section className="section bg-white">
    <div className="container max-w-[800px]">
      <FadeIn>
        <span className="overline mb-4 block">THE OPPORTUNITY</span>
        <h2 className="mb-6">Founding partnership. Year 1 of a permanent platform.</h2>
        <p className="text-[18px] md:text-[20px] leading-relaxed">
          The Butterfly Movement launches May 2026. Founding partners shape what this means — for their brand, their industry, and the permanent record.
        </p>
      </FadeIn>
    </div>
  </section>
);

/** Section 3 — Activation menu (7 items) */
const ActivationMenu = () => (
  <section className="section bg-bg-muted/30">
    <div className="container max-w-[900px]">
      <FadeIn>
        <span className="overline mb-4 block">ACTIVATION MENU</span>
        <h2 className="mb-6">Partners choose from:</h2>
      </FadeIn>
      <div className="grid sm:grid-cols-2 gap-4 mb-12">
        {[
          "Co-branded Butterfly Month content",
          "Employee protocol deployment (See → Stay → Ask → Connect)",
          "Category exclusivity (guaranteed)",
          "Brand integration in challenge creative",
          "Founding event presence (Miami, April 30, F1 Weekend)",
          "\"Founding Partner\" designation — permanent",
          "Documentary consideration",
        ].map((item, i) => (
          <FadeIn key={i} delay={i * 0.05}>
            <div className="card card-hover p-6 border-hair flex gap-3 items-start h-full">
              <Check size={20} className="text-accent shrink-0 mt-0.5" />
              <span className="text-ink font-medium text-[15px]">{item}</span>
            </div>
          </FadeIn>
        ))}
      </div>
      <p className="text-[16px] text-muted italic">
        "What are we missing? Tell us what matters to your brand."
      </p>
    </div>
  </section>
);

/** Section 4 — Governance (from Constitution) */
const Governance = () => (
  <section className="section bg-white">
    <div className="container max-w-[900px]">
      <FadeIn>
        <span className="overline mb-4 block">GOVERNANCE</span>
        <h2 className="mb-6">The Butterfly Movement is governed by the Butterfly Constitution.</h2>
        <p className="caption mb-12 font-bold tracking-widest">OHF-BC-2026-001</p>
      </FadeIn>
      <div className="card border-hair p-8 md:p-10 mb-8">
        <p className="caption uppercase tracking-widest font-bold mb-6">Key governance points (Article III + Article VI)</p>
        <ul className="space-y-4">
          {[
            "Non-political. Non-religious. Non-commercial in its soul.",
            "No partner may own the mark.",
            "Capital serves the movement. The movement does not serve capital.",
            "No editorial control granted to any partner.",
            "Political neutrality written into every agreement.",
            "Anti-washing clause: no reputational cover without genuine deployment.",
            "Safety before scale. Always.",
            "Young people are a protected priority.",
          ].map((point, i) => (
            <li key={i} className="flex gap-3 text-ink text-[16px]">
              <span className="text-accent font-bold mt-0.5">/</span>
              <span>{point}</span>
            </li>
          ))}
        </ul>
      </div>
      <a href="#" className="text-accent font-bold hover:underline flex items-center gap-2 text-[16px]">
        Download the full Butterfly Constitution <span aria-hidden>→</span>
      </a>
    </div>
  </section>
);

/** Section 5 — Timeline */
const Timeline = () => (
  <section className="section bg-bg-muted/30">
    <div className="container max-w-[900px]">
      <FadeIn>
        <span className="overline mb-4 block">TIMELINE</span>
        <h2 className="mb-12">From now to launch.</h2>
      </FadeIn>
      <div className="space-y-px bg-hair border border-hair rounded-3xl overflow-hidden">
        {[
          { date: "April 15", title: "Partner commitment deadline", accent: true },
          { date: "April 30", title: "One Night For One Humanity", desc: "Queen Miami Beach. F1 Weekend." },
          { date: "May 1", title: "Butterfly Month launches globally" },
          { date: "May 31", title: "Campaign month ends", desc: "Gesture stays. Protocol continues." },
        ].map((item, i) => (
          <FadeIn key={i} delay={i * 0.08}>
            <div className={`bg-white p-6 md:p-8 flex flex-col md:flex-row gap-3 md:gap-12 hover:bg-bg-muted transition-colors ${item.accent ? 'border-l-4 border-accent' : ''}`}>
              <span className="md:w-32 shrink-0 font-bold text-accent uppercase tracking-widest text-[14px]">{item.date}</span>
              <div>
                <h4 className="font-bold text-ink text-[18px]">{item.title}</h4>
                {item.desc && <p className="text-muted text-[15px] mt-1">{item.desc}</p>}
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </div>
  </section>
);

/** Anti-washing inline callout (kept) + downloads */
const AntiWashingDownloads = () => (
  <section className="section bg-white">
    <div className="container max-w-[900px]">
      <FadeIn>
        <div className="card border-ink/10 bg-bg-muted/50 p-8 md:p-10 mb-12">
          <div className="flex items-center gap-3 mb-4">
            <AlertCircle size={20} className="text-accent" />
            <h3 className="text-[22px] font-bold mb-0">Anti-washing clause</h3>
          </div>
          <p className="text-muted text-[16px]">
            We do not accept partners who use mental health alignment for marketing purposes without operational commitment.
            Partnering means deploying — not decorating. Every partner agrees to measurable deployment milestones.
          </p>
        </div>
      </FadeIn>
      <FadeIn>
        <span className="overline mb-4 block">DOWNLOADS</span>
        <h2 className="mb-8">For your due diligence.</h2>
      </FadeIn>
      <div className="grid md:grid-cols-3 gap-4">
        {[
          { title: "Butterfly Constitution", type: "PDF · Full governance document" },
          { title: "Partnership Overview", type: "1-page summary" },
          { title: "Full Appendix", type: "For due diligence" },
        ].map((d, i) => (
          <FadeIn key={i} delay={i * 0.05}>
            <a href="#" className="card card-hover p-6 border-hair flex flex-col h-full hover:shadow-md transition-all">
              <FileText size={20} className="text-accent mb-3" />
              <h4 className="font-bold text-ink text-[16px] mb-1">{d.title}</h4>
              <p className="caption text-[13px]">{d.type}</p>
            </a>
          </FadeIn>
        ))}
      </div>
    </div>
  </section>
);

export default function PartnerPage() {
  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <Navbar />
      <main>
        <section className="bg-ink text-white pt-20 md:pt-32 pb-12 md:pb-20 px-6">
          <div className="container">
            <FadeIn>
              <span className="overline mb-4 block text-white/60">PARTNER WITH US</span>
              <h1 className="mb-6 text-white">Founding partnership. <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-light to-accent">Year 1 of a permanent platform.</span></h1>
              <p className="text-[20px] font-medium max-w-[700px] text-white/70">
                The Butterfly Movement launches May 2026. Founding partners shape what this means — for their brand, their industry, and the permanent record.
              </p>
            </FadeIn>
          </div>
        </section>
        <Opportunity />
        <Sponsors />
        <ActivationMenu />
        <Governance />
        <Timeline />
        <AntiWashingDownloads />
        <ContactForm />
      </main>
      <Footer />
    </div>
  );
}
