import PageHero from "../components/PageHero";
import Footer from "../components/Footer";
import GuideLinks from "../components/GuideLinks";
import DecisionTool from "../components/DecisionTool";
import { IRELAND_VS_UK } from "../decisionTools";

export default function IrelandOrUk() {
  return (
    <div className="app">
      <PageHero
        badge={IRELAND_VS_UK.badge}
        title={<>Ireland or the UK: <em>which should you pick?</em></>}
        sub={IRELAND_VS_UK.intro}
        ctaSubject={IRELAND_VS_UK.cta.subject}
      />

      <div className="main">
        <section className="section">
          <DecisionTool config={IRELAND_VS_UK} />
        </section>

        <section className="section">
          <div className="section-label">How this works</div>
          <h2>What it weighs, and what it can't.</h2>
          <div className="prose">
            <p>
              The tool weighs the factors that decide this for most early-stage companies:
              where the board actually sits, expected profits, development spend, the
              EEA-resident director requirement, and where your customers are. It runs
              entirely in your browser and stores nothing.
            </p>
            <p>
              What it can't weigh is the rest of your situation — where you want to live,
              what your investors have already told you they expect, whether you have a
              co-founder in another country, or what you've already committed to. Those
              routinely outweigh a few points of corporation tax.
            </p>
            <p>
              It also can't settle tax residence, which is the question most likely to cost
              you money if you get it wrong. Residence can follow where a company is
              centrally managed and controlled rather than where it is registered, and that
              turns on facts a five-question form has no way of establishing.
            </p>
          </div>
        </section>

        <GuideLinks />
      </div>

      <Footer />
    </div>
  );
}
