import PageHero from "../components/PageHero";
import Footer from "../components/Footer";
import FaqSection from "../components/FaqSection";
import GuideLinks from "../components/GuideLinks";
import CtaSection from "../components/CtaSection";
import { VAT_FAQ } from "../seo";

const MISTAKES = [
  {
    title: "Charging domestic VAT to everyone",
    body:
      "The most common error. A founder registers for VAT at home, adds one rate to every invoice, and discovers eighteen months later that they owed VAT at the customer's rate in nine other countries — payable out of margin already spent.",
  },
  {
    title: "Treating a VAT number as optional evidence",
    body:
      "The B2B reverse charge depends on your customer genuinely being a taxable person. If you can't produce a valid VAT number and evidence you checked it, the supply can be recharacterised as B2C, and the VAT becomes yours to pay.",
  },
  {
    title: "Missing the €10,000 threshold crossing",
    body:
      "Self-serve products cross it quietly. The threshold covers all cross-border B2C supplies of digital services combined, not per country, and once exceeded the general rules apply to everything from that point forward.",
  },
  {
    title: "Keeping no location evidence",
    body:
      "You are expected to hold supporting evidence of where each consumer belongs and to retain it. Reconstructing that after the fact from payment records is painful and sometimes impossible.",
  },
];

export default function VatDigitalServices() {
  return (
    <div className="app">
      <PageHero
        badge="UK & EU · digital services"
        title={<>VAT on <em>digital services,</em> explained.</>}
        sub="Selling software or digital products across borders means your VAT obligation follows your customer, not your company. Here's what actually applies, and where founders get caught."
        ctaSubject="VAT and cross-border compliance — free 30-min call"
      />

      <div className="main">
        <section className="section">
          <div className="section-label">Starting point</div>
          <h2>When you have to register at all.</h2>
          <div className="topic-grid">
            <div className="topic-card">
              <h3>Ireland</h3>
              <p>
                The registration thresholds are <strong>€85,000 for the supply of goods</strong> and{" "}
                <strong>€42,500 for the supply of services</strong>, measured over a twelve-month
                period. Software, SaaS and consulting sit under the services threshold, so it bites
                earlier than most founders expect.
              </p>
            </div>
            <div className="topic-card">
              <h3>United Kingdom</h3>
              <p>
                You must register once total taxable turnover exceeds{" "}
                <strong>£90,000 in any rolling twelve-month period</strong>. Note "rolling" — it is not
                measured against your financial year, so the test can be met mid-year.
              </p>
            </div>
          </div>
          <div className="callout">
            <strong>Registering early is sometimes the right call.</strong> If your customers are
            businesses who reclaim VAT anyway, and you have meaningful input VAT on software and
            services, voluntary registration can be worth money rather than costing it.
          </div>
        </section>

        <section className="section">
          <div className="section-label">The core rule</div>
          <h2>Place of supply decides everything.</h2>
          <p className="section-sub">
            Software delivered over the internet is an <em>electronically supplied service</em>. Who
            accounts for the VAT, and at what rate, depends on whether your customer is a business or
            a consumer, and where they belong.
          </p>
          <div className="topic-grid">
            <div className="topic-card">
              <h3>Selling to businesses (B2B)</h3>
              <p>
                Under the general B2B rule the place of supply is where the customer belongs, and the
                customer accounts for the VAT themselves under the <strong>reverse charge</strong>. You
                invoice without VAT — but only if you hold a valid VAT number for them and can evidence
                that you validated it.
              </p>
            </div>
            <div className="topic-card">
              <h3>Selling to consumers (B2C)</h3>
              <p>
                The place of supply is wherever your consumer lives, so VAT is due at{" "}
                <strong>their</strong> country's rate — not yours. A German consumer pays German VAT on
                your product whether or not you have any presence in Germany.
              </p>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="section-label">The relief</div>
          <h2>The €10,000 threshold, and the One Stop Shop.</h2>
          <div className="prose">
            <p>
              <strong>If you're established in one EU member state</strong> and your cross-border B2C
              supplies of telecommunications, broadcasting and electronic services stay below{" "}
              <strong>€10,000</strong> in both the current and the preceding calendar year, you can
              simply charge your own domestic rate on all of them. This is a genuine simplification for
              small sellers — and a trap, because once you exceed it the general rules apply to all
              supplies from that point forward, not just the ones above the line.
            </p>
            <p>
              Above the threshold, you have two options: register for VAT in every member state where
              you have consumers, or register once for the{" "}
              <strong>One Stop Shop (OSS)</strong> and file a single return covering all of them. For
              almost every small business, OSS is the answer.
            </p>
            <p>
              <strong>If you're a UK business</strong>, the €10,000 threshold isn't available to you —
              it applies to businesses established in the EU. Since Brexit, a UK company selling digital
              services to EU consumers must either register for the{" "}
              <strong>non-Union OSS scheme</strong> in an EU member state or register for VAT in each
              member state where it has consumers. There is no de minimis. A company selling into both
              the UK and the EU is therefore running two regimes at once.
            </p>
          </div>
        </section>

        <section className="section">
          <div className="section-label">Evidence</div>
          <h2>Proving where your customer belongs.</h2>
          <p className="section-sub">
            Because the rate follows the consumer, you're expected to hold and retain evidence of where
            each one is. Acceptable evidence includes:
          </p>
          <ul className="checklist">
            <li><span className="check">✓</span><span>The billing address the consumer gave you</span></li>
            <li><span className="check">✓</span><span>The IP address of the device used to make the purchase</span></li>
            <li><span className="check">✓</span><span>The consumer's bank details</span></li>
            <li><span className="check">✓</span><span>The country code of the SIM card, for mobile purchases</span></li>
            <li><span className="check">✓</span><span>Other commercially relevant information</span></li>
          </ul>
          <div className="callout">
            <strong>Where a payment provider is involved</strong> — Stripe, Paddle and similar — two
            non-contradictory pieces of information are generally sufficient: for example the billing
            address the customer entered, plus the country code the payment provider reports. If the two
            match, that's normally enough to fix their location. Most checkout tools can capture and
            store both automatically; it's worth checking yours does.
          </div>
        </section>

        <section className="section">
          <div className="section-label">Pitfalls</div>
          <h2>Where founders get caught.</h2>
          <div className="topic-grid">
            {MISTAKES.map((m, i) => (
              <div key={i} className="topic-card">
                <h3>{m.title}</h3>
                <p>{m.body}</p>
              </div>
            ))}
          </div>
          <div className="callout">
            <strong>A note on merchants of record.</strong> Some platforms — Paddle, Lemon Squeezy and
            others — act as the seller of record and take on the VAT obligation themselves. That can
            remove most of this problem entirely, at the cost of a higher fee. Whether that trade is
            worth it depends on your margin and volume, and it's worth modelling before you commit.
          </div>
        </section>

        <FaqSection items={VAT_FAQ} heading="VAT questions." />

        <GuideLinks current="/vat-digital-services" />

        <CtaSection
          heading="Get your VAT set up right the first time."
          sub="Unwinding a cross-border VAT mess costs considerably more than setting it up correctly."
          subject="VAT and cross-border compliance — free 30-min call"
          disclaimer="Thresholds and rules stated on this page were correct as of August 2026 and are drawn from Revenue and HMRC guidance. VAT rules change and depend heavily on your specific facts; this page is general information, not advice."
        />
      </div>

      <Footer />
    </div>
  );
}
