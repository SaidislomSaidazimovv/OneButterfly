import {
  Navbar, Footer, FadeIn, PartnerCTA,
  Category, ProtocolStepper, Comparison, Legal, Training
} from '../components/shared';

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
                A deployable safety standard for emotional stability — designed for anyone, not just clinicians. You are the first responder, not the therapist.
              </p>
            </FadeIn>
          </div>
        </section>
        <Category />
        <ProtocolStepper />
        <Comparison />
        <Legal />
        <Training />
        <PartnerCTA
          headline="Ready to deploy the protocol?"
          buttonText="Request Implementation Brief"
          secondaryText="Download the Full Kit — Free"
        />
      </main>
      <Footer />
    </div>
  );
}
