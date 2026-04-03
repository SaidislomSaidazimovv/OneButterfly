import { useEffect } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { Navbar, Footer, Hero, FadeIn, ChevronRight, PageWrapper } from './components/shared';

// Pages
import EvidencePage from './pages/EvidencePage';
import ProtocolPage from './pages/ProtocolPage';
import TeamPage from './pages/TeamPage';
import PartnerPage from './pages/PartnerPage';
import LaunchPage from './pages/LaunchPage';
import DeployPage from './pages/DeployPage';

/** Scroll to top on route change */
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, [pathname]);
  return null;
};

/** Routing cards on the simplified homepage — Change 2 */
const RoutingCards = () => {
  const cards = [
    {
      to: "/evidence",
      overline: "THE PROOF",
      title: "Evidence & ROI",
      desc: "Data points, research table, ROI calculator, and competitive positioning.",
    },
    {
      to: "/protocol",
      overline: "THE STANDARD",
      title: "Protocol & Legal",
      desc: "The 4-step framework, training modules, and legal positioning for your GC.",
    },
    {
      to: "/team",
      overline: "THE PEOPLE",
      title: "Team & Governance",
      desc: "Celebrity, tech, clinical, finance, gaming, culture — organized by function.",
    },
    {
      to: "/partner",
      overline: "THE INVITATION",
      title: "Partner With Us",
      desc: "Sponsorship tiers, briefing requests, and the founding partnership deadline.",
    },
  ];

  return (
    <section className="section bg-bg-muted/50">
      <div className="container">
        <FadeIn>
          <span className="overline mb-4 block">EXPLORE</span>
          <h2 className="mb-12">Everything you need. One click deep.</h2>
        </FadeIn>
        <div className="grid md:grid-cols-2 gap-6">
          {cards.map((card, i) => (
            <FadeIn key={i} delay={i * 0.1}>
              <Link
                to={card.to}
                className="card card-hover p-10 flex flex-col justify-between h-full hover:shadow-xl transition-all group border-hair bg-white"
              >
                <div>
                  <span className="overline text-accent mb-3 block text-[11px] tracking-[0.2em]">{card.overline}</span>
                  <h3 className="text-ink font-bold text-[24px] mb-3 group-hover:text-accent transition-colors">{card.title}</h3>
                  <p className="text-muted text-[16px]">{card.desc}</p>
                </div>
                <div className="mt-8 flex justify-end">
                  <div className="w-10 h-10 rounded-full bg-bg-muted group-hover:bg-accent flex items-center justify-center transition-all">
                    <ChevronRight size={20} className="text-ink group-hover:text-white transition-colors" />
                  </div>
                </div>
              </Link>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};

/** Final CTA — every page ends pointing to /partner */
const FinalCTA = () => (
  <section className="section bg-accent-light/50 border-none py-32">
    <div className="container text-center max-w-[800px] mx-auto">
      <FadeIn>
        <h2 className="mb-8 mx-auto">Organizations that move first define what standard looks like for their industry.</h2>
        <div className="flex flex-col md:flex-row items-center justify-center gap-6">
          <Link to="/partner" className="btn-primary px-6 md:px-10 py-3 md:py-5 text-base md:text-lg h-auto">Request Implementation Brief</Link>
          <Link to="/evidence" className="btn-ghost px-6 md:px-10 py-3 md:py-5 text-base md:text-lg h-auto bg-white border-accent">Download the Full Kit — Free</Link>
        </div>
        <p className="mt-12 caption font-bold mx-auto">Questions: protocol@onehumanity.org · Response within 24 business hours</p>
      </FadeIn>
    </div>
  </section>
);

/** Simplified Homepage — Change 2 */
/* const HomePage = () => (
  <PageWrapper>
    <div className="min-h-screen bg-white overflow-x-hidden">
      <Navbar />
      <main>
        <Hero />
        <RoutingCards />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  </PageWrapper>
); */

import WorkInProgress from './components/WorkInProgress';

const App = () => (
  <>
    <ScrollToTop />
    <Routes>
      <Route path="/" element={<WorkInProgress />} />
      <Route path="/evidence" element={<PageWrapper><EvidencePage /></PageWrapper>} />
      <Route path="/protocol" element={<PageWrapper><ProtocolPage /></PageWrapper>} />
      <Route path="/team" element={<PageWrapper><TeamPage /></PageWrapper>} />
      <Route path="/partner" element={<PageWrapper><PartnerPage /></PageWrapper>} />
      <Route path="/launch" element={<PageWrapper><LaunchPage /></PageWrapper>} />
      <Route path="/deploy" element={<PageWrapper><DeployPage /></PageWrapper>} />
    </Routes>
  </>
);

export default App;
