import {
  Navbar, Footer, FadeIn, PartnerCTA,
  Highlights, Context, Evidence, ROICalculator
} from '../components/shared';

/** New data points per spec — Change 3 */
const NewDataPoints = () => (
  <section className="section bg-bg-muted/30">
    <div className="container">
      <FadeIn>
        <span className="overline mb-4 block">THE NUMBERS</span>
        <h2 className="mb-12">What the data says.</h2>
      </FadeIn>
      <div className="grid md:grid-cols-3 gap-6">
        {[
          { stat: "48.6%", desc: "didn't know where to get help", source: "SAMHSA NSDUH, 2023" },
          { stat: "67 days", desc: "median wait for new psychiatric patients", source: "2023 National Audit" },
          { stat: "$30–100", desc: "average EAP cost per employee/year at 2–8% utilization", source: "Industry average" },
        ].map((item, i) => (
          <FadeIn key={i} delay={i * 0.1}>
            <div className="card p-8 h-full border-hair">
              <div className="text-accent font-bold text-[40px] mb-4">{item.stat}</div>
              <p className="text-ink font-medium text-[18px] mb-2">{item.desc}</p>
              <p className="caption text-[13px]">{item.source}</p>
            </div>
          </FadeIn>
        ))}
      </div>
    </div>
  </section>
);

/** Competitive Positioning Table — Change 3 */
const CompetitiveTable = () => (
  <section className="section bg-white">
    <div className="container">
      <FadeIn>
        <span className="overline mb-4 block">COMPETITIVE POSITIONING</span>
        <h2 className="mb-12">How the Butterfly Protocol compares.</h2>
      </FadeIn>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b-2 border-ink">
              <th className="py-6 font-bold text-ink text-[16px] pr-8">Program</th>
              <th className="py-6 font-bold text-ink text-[16px] pr-8">Time</th>
              <th className="py-6 font-bold text-ink text-[16px]">Type</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-hair">
            <tr className="hover:bg-bg-muted transition-colors">
              <td className="py-8 text-ink pr-8 text-[18px]">Mental Health First Aid</td>
              <td className="py-8 text-muted pr-8 text-[16px]">8 hours</td>
              <td className="py-8 text-muted text-[16px]">Knowledge certification</td>
            </tr>
            <tr className="hover:bg-bg-muted transition-colors">
              <td className="py-8 text-ink pr-8 text-[18px]">QPR</td>
              <td className="py-8 text-muted pr-8 text-[16px]">1 hour</td>
              <td className="py-8 text-muted text-[16px]">Gatekeeper training</td>
            </tr>
            <tr className="hover:bg-bg-muted transition-colors">
              <td className="py-8 text-ink pr-8 text-[18px]">safeTALK</td>
              <td className="py-8 text-muted pr-8 text-[16px]">3 hours</td>
              <td className="py-8 text-muted text-[16px]">Awareness training</td>
            </tr>
            <tr className="bg-accent/5 border-l-4 border-accent">
              <td className="py-8 pr-8 text-[18px]">
                <span className="font-bold text-ink">Butterfly Protocol</span>
              </td>
              <td className="py-8 pr-8 text-[16px]">
                <span className="font-bold text-accent text-[20px]">30 seconds</span>
              </td>
              <td className="py-8 text-[16px]">
                <span className="font-bold text-accent">Activation layer</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </section>
);

export default function EvidencePage() {
  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <Navbar />
      <main>
        <section className="bg-ink text-white pt-32 pb-20 px-6">
          <div className="container">
            <FadeIn>
              <span className="overline mb-4 block text-white/60">THE EVIDENCE</span>
              <h1 className="mb-6 text-white">The proof behind <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-light to-accent">the protocol.</span></h1>
              <p className="text-[20px] font-medium max-w-[700px] text-white/70">
                Every claim is sourced. Every number is cited. Here's what the science says — and what we don't yet claim.
              </p>
            </FadeIn>
          </div>
        </section>
        <Highlights />
        <NewDataPoints />
        <Context />
        <Evidence />
        <ROICalculator />
        <CompetitiveTable />
        <PartnerCTA
          headline="The numbers make the case. The protocol makes it real."
          buttonText="Request Implementation Brief"
          secondaryText="Download the Full Kit — Free"
        />
      </main>
      <Footer />
    </div>
  );
}
