import { Link } from "react-router-dom";
import PageHero from "../components/PageHero";
import Footer from "../components/Footer";
import FaqSection from "../components/FaqSection";
import GuideLinks from "../components/GuideLinks";
import CtaSection from "../components/CtaSection";
import DecisionTool from "../components/DecisionTool";
import { SECTION_23 } from "../decisionTools";
import { FRS102_FAQ } from "../seo";

const WA_TEXT =
  "Hi FoundrBooks — I'd like to ask about the FRS 102 Section 23 revenue changes for my company.";
const CALL_SUBJECT = "FRS 102 Section 23 — free 30-min call";

// A real sequence, so the numbering carries meaning: each step feeds the next.
const STEPS = [
  {
    n: "01",
    name: "Find the contract",
    desc: "An agreement with a customer that creates rights and obligations — written, verbal or implied by how you normally trade.",
  },
  {
    n: "02",
    name: "List what you promised",
    desc: "Each separate thing the customer is paying for. Software access and a setup service are two promises, even on one invoice.",
  },
  {
    n: "03",
    name: "Work out the price",
    desc: "The total you expect to be paid for the whole contract, including discounts.",
  },
  {
    n: "04",
    name: "Share the price out",
    desc: "Split the total across the promises in proportion to what each would sell for on its own — not how the invoice happens to split it.",
  },
  {
    n: "05",
    name: "Count it as you deliver",
    desc: "A one-off service counts when it's done. An ongoing service counts month by month as the customer receives it.",
  },
];

const IN_SCOPE = [
  "Companies preparing accounts under FRS 102 — in Ireland and the UK",
  "Small companies using the Section 1A version of FRS 102",
  "Accounting periods beginning on or after 1 January 2026",
  "Every contract still running when your first affected year starts",
];

const DIFFERENT = [
  "Companies reporting under IFRS — already on IFRS 15, so nothing changes",
  "Micro-entities on FRS 105 — a simplified version of the same model applies from 1 January 2026, with its own switchover rules",
];

const MOST_AFFECTED = [
  "Subscriptions and memberships paid monthly in advance or annually up front",
  "Software, maintenance and support contracts",
  "Retainers and deposits for work that runs across a year end",
  "Anything sold as a bundle — setup plus subscription, equipment plus installation, product plus support",
  "Long projects billed in stages that don't line up with the work",
];

const DELIVERABLES = [
  "A review of your customer contracts and how income has been booked until now",
  "Old-rules versus new-rules figures, contract by contract",
  "Advice on which switchover method suits your company, and why",
  "The one-off retained earnings adjustment and its journal, reconciled to your trial balance and reviewed with you before anything goes into Xero or QuickBooks",
  "A draft of the note your accounts need, explaining the change and its effect on the year",
  "Deferred income worked out every month from then on, so year end brings no surprises",
];

export default function Frs102Section23() {
  return (
    <div className="app">
      <PageHero
        badge="FRS 102 · accounting periods from 1 January 2026"
        title={<>FRS 102 Section 23: <em>the new revenue rules, in plain English.</em></>}
        sub="From 2026, Irish and UK companies count income when they deliver what they promised — not when they send the invoice. What that means, whether it affects you, and what the switchover involves."
        ctaSubject={CALL_SUBJECT}
        waText={WA_TEXT}
      />

      <div className="main">
        <section className="section">
          <div className="section-label">The short version</div>
          <h2>Income counts when you deliver, not when you invoice.</h2>
          <div className="prose">
            <p>
              FRS 102 is the rulebook most private companies in Ireland and the UK use for their accounts.
              Section 23 is the chapter on revenue — when money from customers can be counted as income.
              The Financial Reporting Council has replaced it in full, for accounting periods beginning on
              or after 1 January 2026.
            </p>
            <p>
              The new version works through five steps, adapted from IFRS 15, the standard large
              international companies already use. The idea underneath is simple: you count income as you
              deliver what you promised the customer. In practice, a lot of small companies simply booked
              income on the day they invoiced. Where customers pay in advance for something delivered over
              time, that no longer works.
            </p>
            <p>
              Your cash doesn't change. What changes is <em>which year</em> the income lands in — and so
              the profit for each year. Not sure whether that's you?{" "}
              <a href="#checker">Take the one-minute check</a>.
            </p>
          </div>
        </section>

        <section className="section">
          <div className="section-label">An example</div>
          <h2>A €12,000 annual subscription, paid up front.</h2>
          <p className="section-sub">
            A customer signs up in July and pays for the full year. The company's year ends on 31 December.
          </p>
          <div className="table-wrap">
            <table className="cmp-table">
              <thead>
                <tr>
                  <th></th>
                  <th>How many small companies booked it</th>
                  <th>Under the new Section 23</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th>July, when paid</th>
                  <td>€12,000 of income</td>
                  <td>€1,000 of income. The other €11,000 is <strong>deferred income</strong> — received, but not yet earned.</td>
                </tr>
                <tr>
                  <th>Each month after</th>
                  <td>Nothing</td>
                  <td>€1,000 released from deferred income as the service is delivered</td>
                </tr>
                <tr>
                  <th>Income for the year to 31 December</th>
                  <td>€12,000</td>
                  <td>€6,000 — the other €6,000 belongs to next year</td>
                </tr>
                <tr>
                  <th>Cash in the bank</th>
                  <td>€12,000</td>
                  <td>€12,000 — unchanged</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="pricing-note">Spread evenly by month to keep the numbers simple; in practice it's usually worked out by day.</p>
        </section>

        <section className="section">
          <div className="section-label">How it works</div>
          <h2>The five steps.</h2>
          <p className="section-sub">
            Each step feeds the next. For a simple subscription they take seconds; for a bundled contract
            they're where the work is.
          </p>
          <div className="steps-grid steps-grid-5">
            {STEPS.map((s) => (
              <div key={s.n} className="step-card">
                <div className="step-num">{s.n}</div>
                <div className="step-name">{s.name}</div>
                <div className="step-desc">{s.desc}</div>
              </div>
            ))}
          </div>
          <div className="callout">
            <strong>Where it bites hardest: bundles.</strong> Sell a €5,000 setup and a €12,000 annual
            subscription together for €15,000, and the discount has to be shared across both in proportion
            to their standalone prices. The setup counts as income when it's done; the subscription over the
            year. How the invoice happened to split the €15,000 doesn't decide it.
          </div>
        </section>

        <section className="section">
          <div className="section-label">Who it affects</div>
          <h2>Almost every Irish and UK company.</h2>
          <div className="split-grid">
            <div className="split-col split-yes">
              <h3><span className="check">✓</span> In scope</h3>
              <ul>
                {IN_SCOPE.map((item, i) => <li key={i}>{item}</li>)}
              </ul>
            </div>
            <div className="split-col split-no">
              <h3><span className="cross">✕</span> Different rules</h3>
              <ul>
                {DIFFERENT.map((item, i) => <li key={i}>{item}</li>)}
              </ul>
            </div>
          </div>

          <div className="topic-grid" style={{ marginTop: 12 }}>
            <div className="topic-card">
              <h3>When it starts for you</h3>
              <p>
                If your year ends on <strong>31 December</strong>, your first affected year is the one ending
                31 December 2026. For any other year end, it's the first year that <em>starts</em> during
                2026 — so a 31 March year end is first affected in the year to 31 March 2027. The accounts
                are prepared later, but the figures are being set by contracts running now.
              </p>
            </div>
            <div className="topic-card">
              <h3>Who notices most</h3>
              <ul className="plain-list">
                {MOST_AFFECTED.map((item, i) => <li key={i}>{item}</li>)}
              </ul>
            </div>
          </div>
        </section>

        <section className="section" id="checker">
          <div className="section-label">Check in a minute</div>
          <h2>Are you affected?</h2>
          <p className="section-sub">Six questions. Your answers stay in your browser.</p>
          <DecisionTool config={SECTION_23} />
        </section>

        <section className="section">
          <div className="section-label">The switchover</div>
          <h2>A one-off adjustment, done once.</h2>
          <div className="prose">
            <p>
              When you move to the new rules, some contracts will be half-finished. Take that July
              subscription again: under the old habit all €12,000 was counted in the first year, but under
              the new rules half of it belongs to the second.
            </p>
            <p>
              Past years are closed, so they aren't reopened. Instead there is one correcting entry on the
              first day of the first affected year. It moves the unearned part out of{" "}
              <strong>retained earnings</strong> — the running total of past profits — and back into
              deferred income, so it can be counted properly as it's delivered. The accounts then carry a
              note explaining the change.
            </p>
          </div>
          <div className="topic-grid" style={{ marginTop: 20 }}>
            <div className="topic-card">
              <h3>Modified retrospective</h3>
              <p>
                The simpler route, and the usual choice for smaller companies. Last year's figures stay as
                they were. The whole effect goes through retained earnings at the start of the year, and the
                accounts explain how this year's income differs from the old rules. Only contracts still
                running at the switchover are adjusted.
              </p>
            </div>
            <div className="topic-card">
              <h3>Full retrospective</h3>
              <p>
                Last year's figures are restated as if the new rules had always applied, so the two years
                compare like for like. More work, and sometimes worth it — for example when investors or
                lenders will be comparing the years closely.
              </p>
            </div>
          </div>
          <div className="callout callout-warn">
            <strong>Don't leave the tax question to year end.</strong> Moving income between years moves
            profit between years, and the adjustment itself can have tax consequences. It's much easier to
            plan for before the accounts are drawn up than after.
          </div>
        </section>

        <section className="section">
          <div className="section-label">How we handle it</div>
          <h2>Your Section 23 switchover, for a fixed fee.</h2>
          <p className="section-sub">
            A fixed fee per company, agreed before we start. No hourly billing and no surprise invoices.
          </p>
          <ul className="checklist">
            {DELIVERABLES.map((item, i) => (
              <li key={i}><span className="check">✓</span><span>{item}</span></li>
            ))}
          </ul>
          <div className="callout">
            <strong>The honest caveat.</strong> For plenty of small companies the adjustment will be small or
            nil — if customers pay after you've delivered and little runs across your year end, very little
            changes. We'll tell you that on the first call rather than sell you work you don't need. Ongoing
            monthly bookkeeping is on our <Link to="/#pricing">regular plans</Link>.
          </div>
        </section>

        <FaqSection items={FRS102_FAQ} heading="Section 23 questions." />

        <GuideLinks current="/frs-102-section-23" />

        <CtaSection
          heading="Not sure how Section 23 lands for you?"
          sub="Send us your largest customer contracts and last year's accounts. Thirty minutes, no charge, and a straight answer on whether it's worth doing anything."
          subject={CALL_SUBJECT}
          waText={WA_TEXT}
          disclaimer="Correct as of September 2026, based on the amendments to FRS 102 and FRS 105 issued by the Financial Reporting Council, effective for accounting periods beginning on or after 1 January 2026. This page is general information, not advice for your specific circumstances."
        />
      </div>

      <Footer />
    </div>
  );
}
