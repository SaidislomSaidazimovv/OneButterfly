import { Navbar, Footer, FadeIn, PartnerCTA } from '../components/shared';

const teams = [
  {
    function: "Celebrity + Distribution",
    members: [
      { name: "FAME (Sheeraz Hasan)", role: "Celebrity amplification. 25 years. Portfolio: Kardashian, Zendaya, Gomez, Bieber, Lopez, Chopra." },
      { name: "Komi", role: "125,000 creators. CONFIRMED." },
      { name: "ITP Media", role: "Broadcast production. Global distribution. CONFIRMED." },
    ]
  },
  {
    function: "Product + Tech",
    members: [
      { name: "Richard Jhang", role: "StratMinds — ex-IBM CIO" },
      { name: "Anton Borzov", role: "StratMinds — First Designer at WhatsApp (1.8B users)" },
      { name: "Summer Kim", role: "StratMinds" },
    ]
  },
  {
    function: "Clinical",
    members: [
      { name: "Ricky Brar / Brains", role: "Founding clinical partner" },
      { name: "Cleveland Clinic", role: "Clinical pathway development" },
    ]
  },
  {
    function: "Finance",
    members: [
      { name: "David Knower", role: "Cerberus" },
      { name: "James Morgon", role: "Milken Institute" },
    ]
  },
  {
    function: "Gaming",
    members: [
      { name: "Sang Yoon Lee", role: "Creta" },
      { name: "Thomas Vu", role: "Riot Games" },
    ]
  },
  {
    function: "Culture",
    members: [
      { name: "Andrew Dawson", role: "" },
      { name: "Ralph Simon", role: "" },
      { name: "Bernd Breiter", role: "World Club Dome" },
    ]
  },
  {
    function: "Founding Partners",
    members: [
      { name: "Ghazzawi", role: "" },
      { name: "Kwon Hyuk", role: "Naver" },
      { name: "El Alami", role: "" },
      { name: "Costa", role: "" },
    ]
  },
  {
    function: "Foundation",
    members: [
      { name: "Evan Klassen", role: "OHF 501(c)(3)" },
      { name: "Advisory Board", role: "30+ advisors across psychiatry, organizational psychology, emergency medicine, crisis intervention" },
    ]
  },
];

export default function TeamPage() {
  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <Navbar />
      <main>
        <section className="bg-ink text-white pt-20 md:pt-32 pb-12 md:pb-20 px-6">
          <div className="container">
            <FadeIn>
              <span className="overline mb-4 block text-white/60">THE TEAM</span>
              <h1 className="mb-6 text-white">Who builds and <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-light to-accent">deploys this.</span></h1>
              <p className="text-[20px] font-medium max-w-[700px] text-white/70">
                Organized by function. Every name listed is confirmed and active.
              </p>
            </FadeIn>
          </div>
        </section>

        <section className="section bg-bg-muted/30">
          <div className="container">
            <div className="space-y-12">
              {teams.map((team, i) => (
                <FadeIn key={i} delay={i * 0.05}>
                  <div className="card card-hover p-8 md:p-10 border-hair">
                    <h3 className="text-accent font-bold uppercase tracking-widest text-[14px] mb-6">{team.function}</h3>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {team.members.map((member, j) => (
                        <div key={j} className="flex flex-col">
                          <span className="text-ink font-bold text-[18px]">{member.name}</span>
                          {member.role && <span className="text-muted text-[15px] mt-1">{member.role}</span>}
                        </div>
                      ))}
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        <section className="section bg-white">
          <div className="container">
            <FadeIn>
              <div className="card bg-bg-muted border-none p-6 md:p-12 text-center">
                <h2 className="mb-6 mx-auto">Governance</h2>
                <p className="text-[18px] font-medium mb-4 mx-auto">One Humanity Foundation · 501(c)(3) · Published governance · Independent board</p>
                <p className="mb-4 mx-auto">Developed with clinical advisors across: Psychiatry · Organizational Psychology · Emergency Medicine · Crisis Intervention</p>
                <p className="caption mx-auto">Reviewed against: OSHA · WHO mhGAP · SAMHSA · ISO 45003</p>
              </div>
            </FadeIn>
          </div>
        </section>

        <PartnerCTA
          headline="Join the founding coalition."
          buttonText="Partner with us →"
        />
      </main>
      <Footer />
    </div>
  );
}
