import PageHero from "../components/PageHero";
import Footer from "../components/Footer";
import FaqSection from "../components/FaqSection";
import GuideLinks from "../components/GuideLinks";
import CtaSection from "../components/CtaSection";
import { RD_FAQ } from "../seo";

const QUALIFIES = [
  "Designing a novel algorithm where no established approach existed",
  "Solving performance or scalability problems whose resolution wasn't foreseeable",
  "Building infrastructure to handle data volumes or latency that off-the-shelf tools couldn't",
  "Integrating systems in ways that required genuinely new technical work, not documented API calls",
  "Developing new methods of data processing, encryption, or machine learning where the outcome was uncertain",
  "Prototyping that failed — unsuccessful work still qualifies if the uncertainty was real",
];

const DOES_NOT = [
  "Building a conventional web or mobile application with established frameworks",
  "Standard CRUD interfaces, dashboards and admin panels",
  "Configuring, customising or integrating documented third-party APIs",
  "Cosmetic or user-interface work, however time-consuming",
  "Market research, business analysis, or writing documentation",
  "Work where a competent professional in the field could readily deduce the solution",
];

const STEPS = [
  {
    n: "01",
    name: "Eligibility review",
    desc: "We look at what your team actually built and where the technical uncertainty was. If there isn't a defensible claim, we tell you before you spend anything.",
  },
  {
    n: "02",
    name: "Cost identification",
    desc: "Staff time, subcontractors, consumables and relevant overheads apportioned to qualifying projects — with a methodology that holds up if it's questioned.",
  },
  {
    n: "03",
    name: "Technical narrative",
    desc: "The part most claims get wrong. A specific, project-level account of the uncertainty faced and the work done to resolve it, written to survive scrutiny.",
  },
  {
    n: "04",
    name: "Filing and follow-through",
    desc: "Submitted alongside your corporation tax return, with the supporting documentation retained. If an enquiry comes, we handle it.",
  },
];

export default function RdTaxCredits() {
  return (
    <div className="app">
      <PageHero
        badge="Ireland 35% · UK 20%"
        title={<>R&amp;D tax credits for <em>Irish &amp; UK companies.</em></>}
        sub="If your team spent the year solving genuinely hard technical problems, a meaningful share of that cost is probably reclaimable — in cash, even if you've never paid corporation tax."
        ctaSubject="R&D tax credits — free 30-min call"
      />

      <div className="main">
        <section className="section">
          <div className="section-label">What it's worth</div>
          <h2>The numbers, by jurisdiction.</h2>
          <div className="topic-grid">
            <div className="topic-card">
              <h3>Ireland — 35%, refundable</h3>
              <p>
                Following Budget 2026, Ireland's R&amp;D Corporation Tax Credit is{" "}
                <strong>35% of qualifying expenditure</strong>, up from 30%. Critically it is{" "}
                <strong>refundable in cash</strong> over three annual instalments, whether or not your
                company pays corporation tax. The first-year payment threshold rose from €75,000 to
                €87,500.
              </p>
              <p>
                For a pre-revenue company spending €200,000 a year on qualifying development, that is
                a €70,000 credit — payable even at a loss. It is one of the most generous regimes in
                Europe and it is routinely under-claimed by small companies who assume it's only for
                laboratories.
              </p>
            </div>
            <div className="topic-card">
              <h3>United Kingdom — 20% merged RDEC</h3>
              <p>
                For accounting periods beginning on or after 1 April 2024 the UK operates a single{" "}
                <strong>merged R&amp;D expenditure credit at 20%</strong>, replacing the old separate
                SME and RDEC schemes.
              </p>
              <p>
                Loss-making, R&amp;D-intensive SMEs can instead claim{" "}
                <strong>Enhanced R&amp;D Intensive Support</strong>: an additional 86% deduction on
                qualifying costs (186% in total) and a payable credit worth up to 14.5% of the
                surrenderable loss. To qualify as R&amp;D-intensive, at least{" "}
                <strong>30% of total expenditure</strong> must be qualifying R&amp;D — a threshold most
                early-stage product companies clear without difficulty.
              </p>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="section-label">Eligibility</div>
          <h2>What actually qualifies.</h2>
          <p className="section-sub">
            The test is not "was this difficult" or "was this new to us". It is whether the work sought
            to resolve a scientific or technological uncertainty that a competent professional in the
            field could not readily have deduced.
          </p>
          <div className="split-grid">
            <div className="split-col split-yes">
              <h3><span className="check">✓</span> Usually qualifies</h3>
              <ul>
                {QUALIFIES.map((q, i) => <li key={i}>{q}</li>)}
              </ul>
            </div>
            <div className="split-col split-no">
              <h3><span className="cross">✕</span> Usually doesn't</h3>
              <ul>
                {DOES_NOT.map((q, i) => <li key={i}>{q}</li>)}
              </ul>
            </div>
          </div>
          <div className="callout">
            <strong>Failed projects still count.</strong> There is a persistent myth that R&amp;D relief
            only applies to work that succeeded. The opposite is closer to the truth — an attempt that
            didn't work is often the clearest possible evidence that the technical outcome was genuinely
            uncertain.
          </div>
        </section>

        <section className="section how-section">
          <div className="section-label">Process</div>
          <h2>How a claim works.</h2>
          <div className="steps-grid steps-grid-4">
            {STEPS.map((s) => (
              <div key={s.n} className="step-card">
                <div className="step-num">{s.n}</div>
                <div className="step-name">{s.name}</div>
                <div className="step-desc">{s.desc}</div>
              </div>
            ))}
          </div>
        </section>

        <section className="section">
          <div className="section-label">Risk</div>
          <h2>Why claim quality matters more than it used to.</h2>
          <div className="prose">
            <p>
              HMRC has substantially increased its scrutiny of software R&amp;D claims following years
              of aggressive selling by claims firms working on contingency. A generic narrative that
              describes ordinary development work in scientific-sounding language is now a reliable way
              to attract an enquiry — and enquiries are expensive, slow, and can end with the relief
              clawed back plus penalties.
            </p>
            <p>
              We only file claims we would be prepared to defend, and we tell you plainly when we think
              the work doesn't qualify. That is occasionally an unwelcome conversation. It is a great
              deal cheaper than the alternative.
            </p>
            <p>
              Contemporaneous records help enormously: design documents, technical spikes, commit
              history, and notes on approaches that were tried and abandoned. If you're mid-year and
              think you may claim, start keeping them now rather than reconstructing the story later.
            </p>
          </div>
        </section>

        <FaqSection items={RD_FAQ} heading="R&D tax credit questions." />

        <GuideLinks current="/rd-tax-credits" />

        <CtaSection
          heading="Find out whether you have a claim."
          sub="A free 30-minute call is usually enough to tell whether it's worth pursuing."
          subject="R&D tax credits — free 30-min call"
          disclaimer="Rates and thresholds stated on this page were correct as of August 2026 and are drawn from Revenue and HMRC guidance. Tax legislation changes; this page is general information, not advice for your specific circumstances."
        />
      </div>

      <Footer />
    </div>
  );
}
