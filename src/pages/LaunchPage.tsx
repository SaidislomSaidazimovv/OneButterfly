import { Navbar, Footer, FadeIn, PartnerCTA } from '../components/shared';

/** 48-Hour Choreography — Change 4, Section 1 */
const Choreography = () => {
  const steps = [
    { time: "Hour 0", title: "10 founding faces", desc: "Miami, April 30. FAME orchestrates. The first gesture goes live.", accent: true },
    { time: "Hour 12", title: "Curiosity peaks", desc: "Traffic surges to butterflychallenge.org. People ask: what does this mean?" },
    { time: "Hour 24", title: "Second wave", desc: "Unexpected faces break the embarrassment wall. The gesture stops being weird." },
    { time: "Hour 48", title: "Chain multiplies", desc: "The gesture becomes self-explanatory. You don't need to be told — you see it and you know." },
    { time: "Week 1", title: "It gets personal", desc: '"Someone posts it for their mom. She watches it 14 times."' },
  ];

  return (
    <section className="section bg-ink/[0.03]">
      <div className="container">
        <FadeIn>
          <span className="overline mb-4 block">48-HOUR CHOREOGRAPHY</span>
          <h2 className="mb-12">How the signal spreads.</h2>
        </FadeIn>
        <div className="max-w-[800px] space-y-px bg-hair border border-hair rounded-3xl overflow-hidden">
          {steps.map((step, i) => (
            <FadeIn key={i} delay={i * 0.08}>
              <div className={`bg-white p-8 flex flex-col md:flex-row gap-6 md:gap-12 hover:bg-bg-muted transition-colors ${step.accent ? 'border-l-4 border-accent' : ''}`}>
                <span className="w-24 shrink-0 font-bold text-accent uppercase tracking-widest text-[14px]">{step.time}</span>
                <div>
                  <h4 className="font-bold text-ink mb-2 text-[18px]">{step.title}</h4>
                  <p className="text-muted">{step.desc}</p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};

/** Distribution Engine — Change 4, Section 2 */
const DistributionEngine = () => (
  <section className="section bg-white">
    <div className="container">
      <FadeIn>
        <span className="overline mb-4 block">DISTRIBUTION ENGINE</span>
        <h2 className="mb-12">Three forces behind the launch.</h2>
      </FadeIn>
      <div className="grid md:grid-cols-3 gap-6">
        {[
          {
            name: "FAME",
            lead: "Sheeraz Hasan",
            desc: "Celebrity amplification. 25 years. Portfolio: Kardashian, Zendaya, Gomez, Bieber, Lopez, Chopra.",
            note: "FAME's track record, not Butterfly commitments.",
            tag: "AMPLIFICATION"
          },
          {
            name: "Komi",
            lead: "125,000 creators",
            desc: "The largest creator-activation network aligned to a single cause campaign.",
            note: "CONFIRMED.",
            tag: "CREATORS"
          },
          {
            name: "ITP Media",
            lead: "Broadcast production",
            desc: "Global distribution infrastructure. Multi-format content production.",
            note: "CONFIRMED.",
            tag: "BROADCAST"
          },
        ].map((card, i) => (
          <FadeIn key={i} delay={i * 0.1}>
            <div className="card card-hover p-8 h-full flex flex-col border-hair hover:shadow-lg transition-all">
              <span className="text-[11px] font-bold text-accent uppercase tracking-[0.2em] mb-4">{card.tag}</span>
              <h3 className="text-ink font-bold text-[24px] mb-2">{card.name}</h3>
              <p className="text-accent font-bold text-[16px] mb-4">{card.lead}</p>
              <p className="text-muted text-[16px] mb-4 flex-grow">{card.desc}</p>
              <p className="caption text-[13px] italic">{card.note}</p>
            </div>
          </FadeIn>
        ))}
      </div>
    </div>
  </section>
);

/** ALS Precedent — Change 4, Section 3 */
const ALSPrecedent = () => (
  <section className="section bg-ink text-white">
    <div className="container text-center max-w-[800px]">
      <FadeIn>
        <span className="overline text-white/70 mb-4 block">THE PRECEDENT</span>
        <h2 className="text-white mb-12">The Ice Bucket Challenge proved the mechanic.</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 md:gap-8 mb-12">
          {[
            { stat: "17M", label: "videos" },
            { stat: "$220M", label: "raised" },
            { stat: "159", label: "countries" },
            { stat: "5", label: "genes discovered" },
            { stat: "2", label: "FDA treatments" },
          ].map((item, i) => (
            <div key={i} className="text-center">
              <div className="text-accent font-bold text-[32px] md:text-[40px]">{item.stat}</div>
              <div className="text-white/60 text-[14px] mt-1">{item.label}</div>
            </div>
          ))}
        </div>
        <p className="text-white/80 text-[20px] font-medium italic">
          "Same mechanic. Ours adds a permanent response system."
        </p>
      </FadeIn>
    </div>
  </section>
);

export default function LaunchPage() {
  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <Navbar />
      <main>
        <section className="bg-ink text-white pt-20 md:pt-32 pb-12 md:pb-20 px-6">
          <div className="container">
            <FadeIn>
              <span className="overline mb-4 block text-white/60">THE LAUNCH</span>
              <h1 className="mb-6 text-white">48 hours that <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-light to-accent">change the signal.</span></h1>
              <p className="text-[20px] font-medium max-w-[700px] text-white/70">
                The choreography, the distribution engine, and the precedent. How the Butterfly gesture goes from 10 faces to 10 million.
              </p>
            </FadeIn>
          </div>
        </section>
        <Choreography />
        <DistributionEngine />
        <ALSPrecedent />
        <PartnerCTA
          headline="Partner with the launch."
          buttonText="Become a launch partner →"
        />
      </main>
      <Footer />
    </div>
  );
}
