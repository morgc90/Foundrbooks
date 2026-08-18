import { Link } from "react-router-dom";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import { PLANS, mailto } from "../data";
import { SAAS_FAQ } from "../seo";

const DIFFERENCES = [
  {
    title: "Deferred revenue",
    body:
      "When a customer pays €1,200 up front for an annual plan, you have not earned €1,200. You have earned roughly €100 and taken on a €1,100 liability to deliver eleven more months of service. That liability sits on your balance sheet and unwinds monthly. Booking the full amount as revenue on day one inflates your profit and loss account, creates a corporation tax charge that shouldn't exist yet, and produces a revenue line no investor will trust.",
  },
  {
    title: "Revenue recognition",
    body:
      "Under IFRS 15 and FRS 102, revenue is recognised as the performance obligation is satisfied — not when the cash lands. For most SaaS that means straight-line recognition across the subscription term. It gets more involved when a contract bundles implementation fees, onboarding, support tiers or usage-based charges, because each may need to be identified and recognised separately.",
  },
  {
    title: "ARR is not recognised revenue",
    body:
      "Contracted ARR annualises your recurring revenue at a point in time. Recognised revenue reflects the service you actually delivered in the period. They measure different things and they will never match. Both are legitimate numbers — reporting one while calling it the other is where founders get into trouble.",
  },
  {
    title: "Multi-currency",
    body:
      "Selling in dollars from a euro-functional company means FX gains and losses running through your accounts every month, plus Stripe or Paddle settling in a third currency with fees netted off before the money reaches you. Gross revenue and net receipts diverge immediately, and only one of them belongs on your revenue line.",
  },
];

const HANDLED = [
  "Monthly bookkeeping built for subscription revenue — deferred revenue schedules maintained properly, not reconstructed at year end",
  "Revenue recognition policy documented and applied consistently under IFRS 15 / FRS 102",
  "Payment processor reconciliation — Stripe, Paddle, GoCardless, Chargebee — including fees, refunds, chargebacks and payout timing",
  "SaaS metrics reporting — MRR, ARR, net revenue retention, gross margin, CAC payback and runway",
  "Statutory accounts and corporation tax — Revenue and the CRO in Ireland, HMRC and Companies House in the UK",
  "R&D tax credit claims, including the technical narrative that supports them",
  "VAT registration and filing, including cross-border digital services and the One Stop Shop",
  "Payroll and share option reporting as you build out a team",
  "Board and investor reporting packs that stand up in a due-diligence process",
];

export default function SaasAccounting() {
  return (
    <div className="app">
      <div className="page-head">
        <Nav />
        <div className="page-head-inner">
          <div className="hero-badge"><span className="badge-dot" />Specialist practice · ACA Qualified</div>
          <h1>SaaS accounting for Irish &amp; UK <em>software companies.</em></h1>
          <p className="hero-sub page-head-sub">
            Most accountants can file your accounts. Few can tell you why your ARR says €40,000 and your
            profit and loss account says €12,000 — or which number your investors actually want.
          </p>
          <div className="hero-btns">
            <a href={mailto("SaaS accounting — free 30-min call")} className="btn-primary">Book a free 30-min call</a>
            <a href="#pricing" className="btn-ghost">See pricing →</a>
          </div>
        </div>
      </div>

      <div className="main">
        <section className="section">
          <div className="section-label">Why us</div>
          <h2>Built around subscription businesses.</h2>
          <div className="prose">
            <p>
              FoundrBooks is an ACA-qualified practice working with subscription software businesses across
              Ireland and the UK — from pre-revenue startups filing their first set of accounts to companies
              running seven figures of recurring revenue across multiple currencies and jurisdictions.
            </p>
            <p>
              A subscription business breaks the assumptions most bookkeeping is built on. Cash arrives before
              the service is delivered. A single annual invoice becomes twelve months of revenue. Upgrades,
              downgrades, refunds and churn all move the numbers mid-period. Get this wrong and you don't just
              misreport profit — you overstate revenue, overpay tax, and hand a due-diligence problem to
              whoever eventually looks at your books.
            </p>
          </div>
        </section>

        <section className="section">
          <div className="section-label">The specifics</div>
          <h2>Where SaaS accounting differs.</h2>
          <div className="topic-grid">
            {DIFFERENCES.map((d, i) => (
              <div key={i} className="topic-card">
                <h3>{d.title}</h3>
                <p>{d.body}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="section">
          <div className="section-label">Scope</div>
          <h2>What we handle.</h2>
          <ul className="checklist">
            {HANDLED.map((item, i) => (
              <li key={i}><span className="check">✓</span><span>{item}</span></li>
            ))}
          </ul>
        </section>

        <section className="section">
          <div className="section-label">R&amp;D tax credits</div>
          <h2>Product development is usually your biggest claim.</h2>
          <p className="section-sub">
            Development is often the single largest expense on a SaaS profit and loss account, and a
            meaningful share of it typically qualifies for R&amp;D relief. For most clients this is the
            highest-value work we do.
          </p>

          <div className="topic-grid">
            <div className="topic-card">
              <h3>Ireland</h3>
              <p>
                Ireland's R&amp;D Corporation Tax Credit is <strong>35% of qualifying expenditure</strong>,
                increased from 30% in Budget 2026. The first-year payment threshold also rose, from €75,000
                to €87,500. The credit is refundable — it can be paid out in cash over three annual
                instalments even if your company is loss-making and pays no corporation tax, which matters
                a great deal pre-revenue.
              </p>
            </div>
            <div className="topic-card">
              <h3>United Kingdom</h3>
              <p>
                The UK operates a <strong>merged R&amp;D expenditure credit at 20%</strong> for accounting
                periods beginning on or after 1 April 2024. Loss-making, R&amp;D-intensive SMEs may instead
                qualify for Enhanced R&amp;D Intensive Support, giving an additional 86% deduction on
                qualifying costs and a payable credit worth up to 14.5% of the surrenderable loss. To count
                as R&amp;D-intensive, at least 30% of total expenditure must be qualifying R&amp;D — a bar
                many early-stage software companies clear comfortably.
              </p>
            </div>
          </div>

          <div className="callout">
            <strong>The honest caveat.</strong> Routine development doesn't qualify. Building a standard
            interface isn't R&amp;D; resolving genuine technical uncertainty is. HMRC in particular has
            sharply increased its scrutiny of software claims, and a weak technical narrative now invites an
            enquiry. We only file claims we would be willing to defend.
          </div>
        </section>

        <section className="section">
          <div className="section-label">VAT</div>
          <h2>The part that catches software companies out.</h2>
          <p className="section-sub">
            Software sold over the internet is an <em>electronically supplied service</em>, and the VAT
            treatment depends on who is buying and where they are.
          </p>
          <div className="topic-grid">
            <div className="topic-card">
              <h3>Selling B2B</h3>
              <p>
                The general business-to-business place-of-supply rule applies: VAT is accounted for by your
                customer under the reverse charge, provided you hold a valid VAT number for them and can
                evidence it.
              </p>
            </div>
            <div className="topic-card">
              <h3>Selling B2C across borders</h3>
              <p>
                The place of supply is wherever your customer lives, so VAT is due at <em>their</em>
                country's rate. Rather than registering in every member state, you register once for the
                One Stop Shop (OSS) and file a single return.
              </p>
            </div>
            <div className="topic-card">
              <h3>The €10,000 threshold</h3>
              <p>
                If you're established in one member state and your cross-border B2C supplies of telecoms,
                broadcasting and electronic services stay under €10,000 in both the current and preceding
                calendar year, you can simply charge your domestic rate. Once you cross it, the general rules
                apply to all supplies from that point on. Self-serve products cross this line without anyone
                noticing.
              </p>
            </div>
            <div className="topic-card">
              <h3>Two regimes at once</h3>
              <p>
                Post-Brexit, a company selling into both the UK and the EU is dealing with two separate VAT
                systems simultaneously. Setting this up correctly at the start is considerably cheaper than
                unwinding it later.
              </p>
            </div>
          </div>
        </section>

        <section className="section" id="pricing">
          <div className="section-label">Pricing</div>
          <h2>Transparent monthly pricing.</h2>
          <p className="section-sub">
            No hourly billing and no surprise invoices. Most SaaS companies start on Growth.
          </p>
          <div className="pricing-grid">
            {PLANS.map((plan, i) => (
              <div key={i} className={`price-card ${plan.featured ? "featured" : ""}`}>
                {plan.featured && <div className="price-badge">Most SaaS clients</div>}
                <div className="price-name">{plan.name}</div>
                <div className="price-desc">{plan.desc}</div>
                <div className="price-amount">{plan.price}<span className="price-per">/mo</span></div>
                <div className="price-period">cancel anytime · EUR</div>
                <div className="price-features">
                  {plan.features.map((f, j) => (
                    <div key={j} className="price-feature"><span className="check">✓</span> {f}</div>
                  ))}
                </div>
                <Link to="/#pricing" className="price-cta price-cta-link">
                  Get started with {plan.name} →
                </Link>
              </div>
            ))}
          </div>
          <p className="pricing-note">All prices in EUR. Secure payment via Stripe. Cancel anytime with no fees.</p>
        </section>

        <section className="section faq-section">
          <div className="section-label">FAQ</div>
          <h2>SaaS accounting questions.</h2>
          <div className="faq-list">
            {SAAS_FAQ.map((item, i) => (
              <div key={i} className="faq-item">
                <h3>{item.q}</h3>
                <p>{item.a}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="section cta-section">
          <h2>Talk to an accountant who knows SaaS.</h2>
          <p className="section-sub">ACA-qualified, working with software companies in Ireland and the UK.</p>
          <div className="hero-btns">
            <a href={mailto("SaaS accounting — free 30-min call")} className="btn-primary btn-primary-blue">
              Book a free 30-min call →
            </a>
            <Link to="/" className="btn-ghost btn-ghost-light">Back to homepage</Link>
          </div>
          <p className="disclaimer">
            Rates and thresholds stated on this page were correct as of August 2026 and are drawn from
            Revenue and HMRC guidance. Tax legislation changes; this page is general information, not advice
            for your specific circumstances.
          </p>
        </section>
      </div>

      <Footer />
    </div>
  );
}
