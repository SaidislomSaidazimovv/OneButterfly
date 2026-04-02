import {
  Navbar, Footer, FadeIn, PartnerCTA,
  Organizations, DeployTimeline, Measurement
} from '../components/shared';

/** Q1-Q4 Validation Timeline — Change 7 */
const ValidationTimeline = () => (
  <section className="section bg-bg-muted/30">
    <div className="container">
      <FadeIn>
        <span className="overline mb-4 block">VALIDATION ROADMAP</span>
        <h2 className="mb-12">Q1–Q4 2026: From pilots to proof.</h2>
      </FadeIn>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          {
            quarter: "Q1",
            title: "Foundation",
            items: ["Advisory board formed", "Safety Standard v1.0 published", "First 3 pilots launched"]
          },
          {
            quarter: "Q2",
            title: "Enterprise Pilots",
            items: ["3–5 enterprise pilots (200–2,000 employees)", "RE-AIM measurement framework active", "First responder confidence data"]
          },
          {
            quarter: "Q3",
            title: "Scale",
            items: ["Founding assembly convened", "Global cascade begins", "Pilot results announced publicly"]
          },
          {
            quarter: "Q4",
            title: "Broad Rollout",
            items: ["Broad organizational rollout", "Publish aggregate outcome data", "Certification program launches"]
          },
        ].map((q, i) => (
          <FadeIn key={i} delay={i * 0.1}>
            <div className="card card-hover p-8 h-full flex flex-col border-hair">
              <div className="flex items-center gap-3 mb-6">
                <span className="text-accent font-bold text-[28px]">{q.quarter}</span>
                <span className="text-ink font-bold text-[18px]">{q.title}</span>
              </div>
              <ul className="space-y-3 flex-grow">
                {q.items.map((item, j) => (
                  <li key={j} className="flex gap-3 text-muted text-[15px]">
                    <span className="text-accent font-bold mt-0.5">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>
        ))}
      </div>
    </div>
  </section>
);

export default function DeployPage() {
  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <Navbar />
      <main>
        <section className="bg-ink text-white pt-20 md:pt-32 pb-12 md:pb-20 px-6">
          <div className="container">
            <FadeIn>
              <span className="overline mb-4 block text-white/60">DEPLOY</span>
              <h1 className="mb-6 text-white">Same protocol. <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-light to-accent">Your context.</span></h1>
              <p className="text-[20px] font-medium max-w-[700px] text-white/70">
                Organization segments, deployment timelines, and the validation roadmap. From pilots to proof in four quarters.
              </p>
            </FadeIn>
          </div>
        </section>
        <Organizations />
        <DeployTimeline />
        <ValidationTimeline />
        <Measurement />
        <PartnerCTA
          headline="Ready to deploy?"
          buttonText="Request a Pilot Briefing"
          secondaryText="Download 30-Day Checklist"
        />
      </main>
      <Footer />
    </div>
  );
}
