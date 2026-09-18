import PageHero from "../components/PageHero";
import Footer from "../components/Footer";
import GuideLinks from "../components/GuideLinks";
import CtaSection from "../components/CtaSection";
import { CREDENTIAL, XERO } from "../data";
import XeroBadge from "../components/XeroBadge";

const TRACK_RECORD = [
  {
    org: "Grant Thornton Ireland",
    years: "2020 – 2024",
    detail:
      "Senior Consultant, largely on secondment into large financial institutions. Accounts receivable redesign at BlackRock that cut processing time by 40%, then two years on accounts payable and regulatory reporting at JPMorgan under MiFID II and Sarbanes-Oxley. Shorter engagements in fund accounting at State Street and on internal audit.",
  },
  {
    org: "Chartered Accountants Ireland",
    years: "Qualified 2023",
    detail:
      "ACA, passed the Final Admitting Exams first time. Listed in the Chartered Accountants Ireland firms directory, which you can check independently rather than take on trust.",
  },
  {
    org: "UCD Michael Smurfit Graduate Business School",
    years: "2014 – 2016",
    detail:
      "MSc in Management Consultancy. Before that, a degree in International Business and Languages and several years running project finance on construction programmes in San Francisco and Dublin.",
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
        badge="ACA · Chartered Accountants Ireland"
        title={<>The accountant <em>behind FoundrBooks.</em></>}
        sub="FoundrBooks is not a faceless platform. It is one chartered accountant, a decade of finance experience, and software built to remove the parts of the job that never needed a human."
        ctaSubject="Intro call with FoundrBooks"
      />

      <div className="main">
        <section className="section">
          <div className="section-label">Who you're dealing with</div>
          <h2>Morgan Cashin, ACA.</h2>
          <div className="about-intro">
          <div className="prose">
            <p>
              I am a chartered accountant based in Ireland, working with founders,
              freelancers and small companies across Ireland and the UK. Ten years in
              finance: five of them at <strong>Grant Thornton</strong>, mostly on secondment
              into BlackRock, JPMorgan and State Street, and before that project finance on
              large construction programmes in San Francisco and Dublin.
            </p>
            <p>
              That background matters for an unglamorous reason. Most of what goes wrong in a
              small company's finances is process — a reconciliation nobody owns, a VAT
              treatment applied once and never revisited, a deadline that moved. I spent five
              years fixing exactly that inside organisations where the consequences were
              measured in regulatory findings. The same discipline applied to a company with
              three employees is worth a great deal more than it sounds.
            </p>
            <p>
              You can verify the qualification independently. I am listed in the{" "}
              <a
                href={CREDENTIAL.directoryUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                {CREDENTIAL.body} firms directory
              </a>
              , and I would encourage you to check that for any accountant you are thinking
              of trusting with your company's numbers. I am also a {XERO.partnerLabel} and {XERO.short}, at Associate and{" "}
              Professional level, since {XERO.since}.
            </p>
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
              <strong>Morgan Cashin, ACA</strong> — Wicklow, where most of the thinking
              about this business got done.
            </figcaption>
          </figure>
          </div>
        </section>

        <section className="section">
          <div className="section-label">Track record</div>
          <h2>Where the experience comes from.</h2>
          <div className="topic-grid">
            {TRACK_RECORD.map((item, i) => (
              <div key={i} className="topic-card">
                <h3>{item.org}</h3>
                <div className="section-label" style={{ marginBottom: 8 }}>
                  {item.years}
                </div>
                <p>{item.detail}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="section">
          <div className="section-label">Why this exists</div>
          <h2>Built out of frustration, honestly.</h2>
          <div className="prose">
            <p>
              After leaving practice I started taking on my own clients: founders in Ireland,
              the UK, Spain and Mexico, mostly early-stage, mostly software. The same three
              things happened over and over.
            </p>
            <p>
              They had a question on a Sunday and no way to ask it. They were paying by the
              hour and had learned not to call. And when they did get an answer it arrived
              wrapped in so much professional hedging that they still could not tell what
              they were supposed to do.
            </p>
            <p>
              None of that is because accountants are unhelpful. It is because the economics
              of the profession make a five-minute question expensive to answer. So I built
              the thing that fixes it: an AI assistant trained on UK and Irish tax rules that
              handles the questions which never needed a qualified human, sitting on top of a
              real accounting practice for everything that does.
            </p>
            <p>
              I wrote the software myself. That is unusual for an accountant and it is the
              reason the product understands the domain — the person deciding how deferred
              revenue should behave has actually prepared the schedules.
            </p>
          </div>
        </section>

        <section className="section">
          <div className="section-label">How I work</div>
          <h2>Three things I will not compromise on.</h2>
          <div className="topic-grid">
            {PRINCIPLES.map((p, i) => (
              <div key={i} className="topic-card">
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
            transfer pricing, or insolvency work. And the AI assistant is genuinely useful
            for questions, but it is an assistant: anything filed with Revenue, HMRC or the
            CRO is prepared and reviewed by a qualified accountant. If any of that rules me
            out for what you need, better that you know now than three months in.
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
