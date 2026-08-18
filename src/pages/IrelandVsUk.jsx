import PageHero from "../components/PageHero";
import Footer from "../components/Footer";
import FaqSection from "../components/FaqSection";
import GuideLinks from "../components/GuideLinks";
import CtaSection from "../components/CtaSection";
import { INCORPORATION_FAQ } from "../seo";

const COMPARISON = [
  {
    factor: "Corporation tax — trading",
    ie: "12.5%",
    uk: "25% above £250,000; 19% at £50,000 or below; marginal relief between",
  },
  {
    factor: "Corporation tax — passive",
    ie: "25% on non-trading income such as rent and investment income",
    uk: "Same rates as trading profits",
  },
  {
    factor: "R&D tax credit",
    ie: "35% of qualifying spend, refundable over three annual instalments",
    uk: "20% merged RDEC; enhanced support for R&D-intensive loss-making SMEs",
  },
  {
    factor: "Start-up relief",
    ie: "Section 486C — corporation tax reduced to nil where liability is €40,000 or less",
    uk: "No direct equivalent",
  },
  {
    factor: "Director residency",
    ie: "At least one EEA-resident director, or a €25,000 bond, or a Section 140 certificate",
    uk: "No residency requirement",
  },
  {
    factor: "Registry",
    ie: "Companies Registration Office (CRO)",
    uk: "Companies House",
  },
  {
    factor: "Market access",
    ie: "Inside the EU single market and the euro",
    uk: "Outside the EU since Brexit",
  },
];

const SCENARIOS = [
  {
    title: "Lean towards Ireland if…",
    points: [
      "You expect meaningful trading profits — the 12.5% rate compounds quickly against 25%",
      "You're spending heavily on product development and want the 35% refundable R&D credit",
      "Your customers are in the EU and you want frictionless single-market access",
      "You're new and profitable enough to benefit from Section 486C start-up relief",
      "You or a co-founder are EEA-resident, so the bond requirement never arises",
    ],
  },
  {
    title: "Lean towards the UK if…",
    points: [
      "You and your team are UK-based — tax residence should follow where decisions are made",
      "Profits will stay modest for a while, where the 19% small profits rate applies",
      "Your customers, investors and hiring market are predominantly British",
      "You want the cheapest, fastest formation and lightest ongoing filing burden",
      "No founder is EEA-resident and you'd rather avoid the bond or certificate route",
    ],
  },
];

export default function IrelandVsUk() {
  return (
    <div className="app">
      <PageHero
        badge="12.5% vs 25% · and the parts that matter more"
        title={<>Ireland or the UK: <em>where should you incorporate?</em></>}
        sub="The headline tax rates are the easiest part of this decision and rarely the deciding one. Here's the honest comparison, including the bits that catch founders out after they've already registered."
        ctaSubject="Ireland vs UK incorporation — free 30-min call"
      />

      <div className="main">
        <section className="section">
          <div className="section-label">Side by side</div>
          <h2>The comparison.</h2>
          <div className="table-wrap">
            <table className="cmp-table">
              <thead>
                <tr>
                  <th>Factor</th>
                  <th>Ireland</th>
                  <th>United Kingdom</th>
                </tr>
              </thead>
              <tbody>
                {COMPARISON.map((row, i) => (
                  <tr key={i}>
                    <th scope="row">{row.factor}</th>
                    <td>{row.ie}</td>
                    <td>{row.uk}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="section">
          <div className="section-label">Ireland's case</div>
          <h2>12.5%, and what sits behind it.</h2>
          <div className="prose">
            <p>
              Ireland charges <strong>12.5% corporation tax on trading income</strong> and{" "}
              <strong>25% on non-trading income</strong> such as rental and investment income. The
              distinction matters more than founders expect: income that isn't from an active trade
              doesn't get the headline rate.
            </p>
            <p>
              New companies may also qualify for <strong>Section 486C start-up relief</strong>, which
              can reduce corporation tax to nil where the company's total corporation tax liability for
              the period does not exceed <strong>€40,000</strong>. Marginal relief applies between
              €40,000 and €60,000, and there is no relief at €60,000 or above. The relief runs across a
              five-year period from the start of the qualifying trade.
            </p>
            <p>
              There's an important catch: the relief is <strong>capped by employer PRSI paid</strong> —
              a maximum of €5,000 per employee or director and €40,000 overall, with Class S PRSI
              limited to €1,000 per individual for periods from January 2025. A company with no payroll
              gets no relief, however profitable it is. In practice that means it rewards companies that
              actually employ people in Ireland, which is precisely the intent.
            </p>
            <p>
              Add the <strong>35% refundable R&amp;D credit</strong> and, for a product company that
              hires locally, Ireland's package is difficult to beat.
            </p>
          </div>
        </section>

        <section className="section">
          <div className="section-label">The catch</div>
          <h2>The EEA director requirement.</h2>
          <div className="prose">
            <p>
              Under <strong>Section 137 of the Companies Act 2014</strong>, an Irish company must have
              at least one director resident in an EEA member state. An alternate director does not
              satisfy this. This is the single most common surprise for founders incorporating in
              Ireland from outside the EEA — and post-Brexit, a UK-resident director no longer counts.
            </p>
            <p>If no director is EEA-resident, there are two routes:</p>
            <ul className="checklist">
              <li>
                <span className="check">✓</span>
                <span>
                  A <strong>bond of €25,000</strong> from an approved surety, valid for at least two
                  years, covering fines and penalties under the Companies Act and the Taxes
                  Consolidation Act.
                </span>
              </li>
              <li>
                <span className="check">✓</span>
                <span>
                  A <strong>Section 140 certificate</strong> from the Registrar, confirming the company
                  has a real and continuous link with economic activity being carried on in the State.
                </span>
              </li>
            </ul>
            <p>
              Neither is fatal, but both are cost and friction that don't exist on the UK side, and
              they're worth pricing in before you decide.
            </p>
          </div>
        </section>

        <section className="section">
          <div className="section-label">The trap</div>
          <h2>Where you register isn't necessarily where you're taxed.</h2>
          <div className="callout callout-warn">
            <strong>This is the one to get right.</strong> A company's tax residence can be determined
            by where it is centrally managed and controlled — that is, where the directors actually
            make decisions — not simply by where it is registered. Incorporating in Ireland while you
            and your board sit in London, or the reverse, can leave a company resident in one country,
            registered in another, and potentially exposed in both. Treaty tie-breakers exist, but
            relying on them is not a plan. Take advice before you incorporate, not after the first
            return is due.
          </div>
        </section>

        <section className="section">
          <div className="section-label">Rules of thumb</div>
          <h2>Which way to lean.</h2>
          <div className="topic-grid">
            {SCENARIOS.map((s, i) => (
              <div key={i} className="topic-card">
                <h3>{s.title}</h3>
                <ul className="plain-list">
                  {s.points.map((p, j) => <li key={j}>{p}</li>)}
                </ul>
              </div>
            ))}
          </div>
          <div className="callout">
            <strong>And a word against over-engineering.</strong> Founders sometimes design elaborate
            two-company structures to capture the best of both. For an early-stage business this is
            almost always a mistake: it doubles your filing obligations and audit surface, introduces
            transfer pricing questions, and costs more in professional fees than it saves in tax until
            you're well past the point where you'd have a finance team anyway. Incorporate simply where
            the business actually is; restructure later if scale justifies it.
          </div>
        </section>

        <FaqSection items={INCORPORATION_FAQ} heading="Incorporation questions." />

        <GuideLinks current="/ireland-vs-uk-company" />

        <CtaSection
          heading="Talk it through before you register."
          sub="Thirty minutes now is cheaper than restructuring in year two."
          subject="Ireland vs UK incorporation — free 30-min call"
          disclaimer="Rates, thresholds and requirements stated on this page were correct as of August 2026 and are drawn from Revenue, the CRO and HMRC guidance. This page is general information, not advice for your specific circumstances — company residence in particular depends closely on your own facts."
        />
      </div>

      <Footer />
    </div>
  );
}
