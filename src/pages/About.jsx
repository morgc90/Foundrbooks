import PageHero from "../components/PageHero";
import Footer from "../components/Footer";
import GuideLinks from "../components/GuideLinks";
import CtaSection from "../components/CtaSection";
import { CREDENTIAL, GOOGLE_PROFILE, XERO } from "../data";
import XeroBadge from "../components/XeroBadge";

// Clients are described, not named: a practice shouldn't put client names on a
// public page without their agreement, and the description carries the point
// just as well.
const CLIENTS = [
  "A drone distributor",
  "Shopify brands",
  "Shopify partner agencies",
  "A modular construction firm",
  "SaaS and subscription businesses",
];

const SECTORS = [
  {
    title: "E-commerce and Shopify brands",
    body:
      "Revenue arriving through several channels at once, each reporting it differently. Processor fees netted off before the money lands, refunds and chargebacks landing in a later month than the sale, stock sitting in more than one country. The gross number on the dashboard and the number that belongs in the accounts are rarely the same, and the gap is where the tax goes wrong.",
  },
  {
    title: "Software and subscriptions",
    body:
      "Annual plans paid up front, upgrades mid-term, refunds on cancellation. Deferred revenue schedules that hold up under IFRS 15 and FRS 102, MRR and ARR that reconcile back to recognised revenue rather than contradicting it, and metrics an investor can take at face value in a due-diligence process.",
  },
  {
    title: "Construction and project businesses",
    body:
      "Work billed in stages that never line up with the work actually done, retentions held for months, subcontractors and RCT in Ireland or the CIS in the UK. Revenue recognised on progress rather than on invoices, so profit lands in the year it was earned and the tax bill is not a surprise.",
  },
];

const BORDERS = [
  {
    title: "Ireland and the UK",
    body:
      "Two tax systems running side by side since Brexit, with separate VAT registrations, separate filing calendars, and the CRO and Companies House each wanting something different. Most of my clients touch both.",
  },
  {
    title: "The EU",
    body:
      "Selling digital services or goods across borders means VAT at the customer's rate once you pass the €10,000 threshold, and the One Stop Shop instead of registering in every country. Self-serve products cross that line without anyone noticing.",
  },
  {
    title: "The United States",
    body:
      "USD revenue settling into a euro or sterling account, fees taken off before it arrives, and sales tax obligations that depend on which states you sell into. I set the books up to handle it and say plainly when a US specialist needs to be in the room.",
  },
  {
    title: "Spain and Mexico",
    body:
      "Founders running Irish or UK companies from another country, or selling into one. Where the company is managed from can decide where it is taxed — a question worth settling early rather than discovering in year three.",
  },
];

const PRINCIPLES = [
  {
    title: "A qualified accountant signs the work",
    body:
      "The AI assistant answers questions at two in the morning. It does not file your return, and it does not decide what position to take on a grey area. That is my job, and my name is on it.",
  },
  {
    title: "Fixed monthly pricing",
    body:
      "You know what it costs before you start. No hourly billing, no invoice arriving after a phone call you thought was a chat.",
  },
  {
    title: "Plain answers",
    body:
      "Most accounting advice is written to be defensible rather than useful. I would rather tell you what I think you should do, flag where I might be wrong, and let you decide.",
  },
];

export default function About() {
  return (
    <div className="app">
      <PageHero
        badge={`ACA · ${CREDENTIAL.body} · ${XERO.partnerLabel}`}
        title={<>Accounting for companies <em>that sell across borders.</em></>}
        sub="Drone distribution, Shopify brands, modular construction, software. Ireland, the UK, the United States, Spain and Mexico. One chartered accountant, and software built to take the waiting out of the rest."
        ctaSubject="Intro call with FoundrBooks"
      />

      <div className="main">
        <section className="section">
          <div className="section-label">Who I work with</div>
          <h2>The companies behind the numbers.</h2>
          <p className="section-sub">
            Clients range from a drone distributor to candle makers to a modular construction
            firm, alongside the Shopify partner agencies building stores for everyone else.
            They are described rather than named — a client's business is their own.
          </p>
          <div className="client-strip">
            {CLIENTS.map((name) => (
              <span key={name} className="client-chip">{name}</span>
            ))}
          </div>
          <div className="topic-grid">
            {SECTORS.map((s) => (
              <div key={s.title} className="topic-card">
                <h3>{s.title}</h3>
                <p>{s.body}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="section">
          <div className="section-label">Across borders</div>
          <h2>Most of my clients sell in more than one country.</h2>
          <p className="section-sub">
            That is where small-company accounting stops being routine: the same sale can be
            taxed differently depending on who bought it and where they were standing.
          </p>
          <div className="topic-grid">
            {BORDERS.map((b) => (
              <div key={b.title} className="topic-card">
                <h3>{b.title}</h3>
                <p>{b.body}</p>
              </div>
            ))}
          </div>
          <div className="callout">
            <strong>Where I stop.</strong> Cross-border does not mean elaborate. I set up
            companies that trade internationally and keep them compliant in Ireland and the
            UK. I do not build multi-entity group structures or do transfer pricing, and when
            a client genuinely needs those, saying so early is worth more than taking the fee.
          </div>
        </section>

        <section className="section">
          <div className="section-label">Who you're dealing with</div>
          <h2>Morgan Cashin, ACA.</h2>
          <div className="about-intro">
            <div className="prose">
              <p>
                FoundrBooks is not a faceless platform. It is one chartered accountant, based in
                Ireland, working with founders and small companies across Ireland, the UK and
                further afield.
              </p>
              <p>
                Before this: five years at <strong>Grant Thornton</strong>, mostly on secondment
                into BlackRock, JPMorgan and State Street — redesigning accounts receivable,
                then two years on accounts payable and regulatory reporting under MiFID II and
                Sarbanes-Oxley. Before that, project finance on large construction programmes in
                San Francisco and Dublin.
              </p>
              <p>
                That background matters for an unglamorous reason. Most of what goes wrong in a
                small company's finances is process — a reconciliation nobody owns, a VAT
                treatment applied once and never revisited, a deadline that moved. I spent five
                years fixing exactly that where the consequences were measured in regulatory
                findings. The same discipline applied to a company with three employees is worth
                more than it sounds.
              </p>
              <p>
                You can verify the qualification independently. I am listed in the{" "}
                <a href={CREDENTIAL.directoryUrl} target="_blank" rel="noopener noreferrer">
                  {CREDENTIAL.body} firms directory
                </a>
                , and I would encourage you to check that for any accountant you are thinking of
                trusting with your company's numbers. I am also a {XERO.partnerLabel} and{" "}
                {XERO.short}, at Associate and Professional level, since {XERO.since}, and the
                practice has a{" "}
                <a href={GOOGLE_PROFILE.url} target="_blank" rel="noopener noreferrer">
                  Google business profile
                </a>{" "}
                if you would rather start there.
              </p>
              <XeroBadge />
            </div>

            <figure className="about-portrait">
              <picture>
                <source srcSet="/morgan-cashin.webp" type="image/webp" />
                <img
                  src="/morgan-cashin.jpg"
                  width="480"
                  height="600"
                  loading="eager"
                  alt="Morgan Cashin, chartered accountant (ACA) and founder of FoundrBooks, photographed in the Wicklow Mountains"
                />
              </picture>
              <figcaption>
                <strong>Morgan Cashin, ACA</strong> — Wicklow, where most of the thinking about
                this business got done.
              </figcaption>
            </figure>
          </div>
        </section>

        <section className="section">
          <div className="section-label">Why this exists</div>
          <h2>Built out of frustration, honestly.</h2>
          <div className="prose">
            <p>
              Taking on my own clients — in Ireland, the UK, the United States, Spain and
              Mexico — the same three things happened over and over.
            </p>
            <p>
              They had a question on a Sunday and no way to ask it. They were paying by the hour
              and had learned not to call. And when they did get an answer it arrived wrapped in
              so much professional hedging that they still could not tell what they were
              supposed to do.
            </p>
            <p>
              None of that is because accountants are unhelpful. It is because the economics of
              the profession make a five-minute question expensive to answer. So I built the
              thing that fixes it: an AI assistant trained on UK and Irish tax rules that handles
              the questions which never needed a qualified human, sitting on top of a real
              accounting practice for everything that does.
            </p>
            <p>
              I wrote the software myself. That is unusual for an accountant, and it is the
              reason the product understands the domain — the person deciding how deferred
              revenue should behave has actually prepared the schedules.
            </p>
          </div>
        </section>

        <section className="section">
          <div className="section-label">How I work</div>
          <h2>Three things I will not compromise on.</h2>
          <div className="topic-grid">
            {PRINCIPLES.map((p) => (
              <div key={p.title} className="topic-card">
                <h3>{p.title}</h3>
                <p>{p.body}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="section">
          <div className="section-label">Straight talk</div>
          <h2>What FoundrBooks is not.</h2>
          <div className="callout">
            <strong>Worth knowing before you get in touch.</strong> This is a small practice,
            not a firm with a bench. I do not audit — if you reach a size where a statutory
            audit is required, you will need a registered audit firm and I will tell you so
            rather than string it out. I do not do complex international group structuring,
            transfer pricing, or insolvency work. And the AI assistant is genuinely useful for
            questions, but it is an assistant: anything filed with Revenue, HMRC or the CRO is
            prepared and reviewed by a qualified accountant. If any of that rules me out for
            what you need, better that you know now than three months in.
          </div>
        </section>

        <GuideLinks />

        <CtaSection
          heading="Start with a conversation."
          sub="Thirty minutes, no charge, no obligation. Bring your situation and I'll tell you honestly whether I can help and what it would cost."
          subject="Intro call with FoundrBooks"
          disclaimer="FoundrBooks provides accounting and tax services to businesses in Ireland and the United Kingdom. Information on this site is general in nature and is not a substitute for advice on your own circumstances."
        />
      </div>

      <Footer />
    </div>
  );
}
