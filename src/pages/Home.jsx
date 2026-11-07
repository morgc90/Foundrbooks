import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import Badges from "../components/Badges";
import { PLANS, QUICK_PROMPTS, CREDENTIAL, GOOGLE_PROFILE, XERO, A2X, mailto, whatsappLink, WA_SECTION_23 } from "../data";

// Free questions before the assistant asks for a conversation instead.
const FREE_QUESTIONS = 4;
const ASK_KEY = "fb_ai_asked";

export default function Home() {
  const chatEndRef = useRef(null);
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Hi! Ask me anything about Irish or UK tax, self assessment, VAT, limited companies, or business expenses.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [checkingOut, setCheckingOut] = useState("");

  // Free questions before the assistant asks for a conversation. Deliberately a
  // soft cap: it is a nudge to book a call, not a security control — the server
  // enforces the real limit, because anything in the browser can be edited.
  const [askedCount, setAskedCount] = useState(() => {
    try { return Number(localStorage.getItem(ASK_KEY) || 0); } catch { return 0; }
  });
  const outOfQuestions = askedCount >= FREE_QUESTIONS;

  // Keep the chat pinned to the latest message — but never on first render,
  // which would yank the visitor past the hero to the middle of the page.
  const hasInteracted = useRef(false);
  useEffect(() => {
    if (!hasInteracted.current) return;
    chatEndRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, [messages, loading]);

  async function sendMessage(text) {
    const userText = text || input.trim();
    if (!userText || loading || askedCount >= FREE_QUESTIONS) return;
    hasInteracted.current = true;
    setInput("");
    const newMessages = [...messages, { role: "user", content: userText }];
    setMessages(newMessages);
    setLoading(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages }),
      });
      const data = await res.json();
      setMessages([...newMessages, { role: "assistant", content: data.reply }]);
      // Count only answered questions, so a failed request doesn't burn a turn.
      const used = askedCount + 1;
      setAskedCount(used);
      try { localStorage.setItem(ASK_KEY, String(used)); } catch {}
    } catch {
      setMessages([...newMessages, { role: "assistant", content: "Connection error. Please try again." }]);
    }
    setLoading(false);
  }

  async function handleCheckout(plan) {
    setCheckingOut(plan.name);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ priceId: plan.priceId, planName: plan.name }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
        return;
      }
      setCheckingOut("");
    } catch {
      setCheckingOut("");
    }
  }

  return (
    <div className="app">
      <Nav home />

      {/* HERO */}
      <section className="h-hero">
        <div>
          <div className="hero-badge"><span className="badge-dot" />ACA chartered accountant · UK &amp; Ireland</div>
          <h1>Accounting for people who'd rather be <span className="hl">building.</span></h1>
          <p className="h-hero-sub">
            A chartered accountant, real-time bookkeeping and an AI tax assistant that answers at 2am.
            For founders, SaaS, Shopify stores and the self-employed.
          </p>
          <div className="hero-btns">
            <a href={mailto()} className="btn-primary">Book a free 30-min call</a>
            <a href="#ai" className="btn-ghost">Ask the AI a tax question →</a>
          </div>
          <div className="h-trust">
            <span>{XERO.short}</span>
            <span>{A2X.short}</span>
            <span>24h response</span>
            <span>GDPR compliant</span>
            <a href={CREDENTIAL.directoryUrl} target="_blank" rel="noopener noreferrer">
              Verify {CREDENTIAL.name} with {CREDENTIAL.body} ↗
            </a>
          </div>
        </div>
        <div className="h-card" aria-label="Example of a month handled by FoundrBooks">
          <div className="h-card-top">
            <span className="h-card-title">Your month, sorted</span>
            <span className="h-tag">Example</span>
          </div>
          <div className="h-rows">
            {[["Bank feeds reconciled", "Today"], ["VAT return filed", "Q3"], ["Shopify payouts split", "Weekly"]].map(([l, m]) => (
              <div key={l} className="h-row">
                <span className="h-tick"><Tick /></span>
                <span className="h-row-label">{l}</span>
                <span className="h-row-meta">{m}</span>
              </div>
            ))}
            <div className="h-row h-row-pending">
              <span className="h-ring" />
              <span className="h-row-label">Corporation tax</span>
              <span className="h-row-meta h-row-meta-hot">Handled</span>
            </div>
          </div>
          <p className="h-card-foot">You: shipping product. Us: everything above.</p>
        </div>
      </section>

      {/* MARQUEE */}
      <div className="h-marquee" aria-hidden="true">
        <div className="h-marquee-inner">
          {[...MARQUEE, ...MARQUEE].map((t, i) => (
            <span key={i}>{t} <span className="h-marquee-star">✶</span></span>
          ))}
        </div>
      </div>

      <div className="main">
        {/* SERVICES */}
        <section className="h-section" id="services">
          <div className="h-head">
            <h2 className="h2">Everything boring.<br />Done properly.</h2>
            <p className="h-lede">Specialist accounting for online founders, SaaS businesses, Shopify stores and the self-employed.</p>
          </div>
          <Link to="/frs-102-section-23" className="h-feature">
            <span className="h-feature-l">
              <span className="h-chip-ink">NEW FOR 2026</span>
              <span className="h-feature-name">FRS 102 Section 23 switchover</span>
              <span>The one-off adjustment, the journal and the accounts note. Fixed fee.</span>
            </span>
            <span className="h-feature-more">What's involved →</span>
          </Link>
          <div className="h-services">
            {SERVICE_CARDS.map((s, i) => {
              const inner = (
                <>
                  <span className="h-svc-num">{String(i + 1).padStart(2, "0")}</span>
                  <h3>{s.name}</h3>
                  <p>{s.desc}</p>
                  {s.more && <span className="h-svc-more">{s.more} →</span>}
                </>
              );
              const cls = "h-svc" + (s.dark ? " h-svc-dark" : "");
              if (s.to) return <Link key={s.name} to={s.to} className={cls}>{inner}</Link>;
              if (s.href) return <a key={s.name} href={s.href} className={cls}>{inner}</a>;
              return <div key={s.name} className={cls}>{inner}</div>;
            })}
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section className="h-section h-section-tight">
          <h2 className="h2" style={{ marginBottom: 44 }}>Switch in three steps.</h2>
          <div className="h-steps">
            <div className="h-step"><div className="h-step-n">1</div><h3>Book a free 30-min call</h3><p>Talk through your business and the right plan. No pressure, no commitment.</p></div>
            <div className="h-step"><div className="h-step-n">2</div><h3>We do the switch</h3><p>We deal with your old accountant, connect your accounts and get the books in order.</p></div>
            <div className="h-step"><div className="h-step-n">3</div><h3>Get back to building</h3><p>Books kept, taxes filed on time, and the AI assistant on call 24/7.</p></div>
          </div>
          <div className="h-step-cta">
            <a href={mailto()} className="btn-primary">Book your free call →</a>
            <span>No commitment · 30 minutes · ACA qualified accountant</span>
          </div>
        </section>
      </div>

      {/* AI */}
      <section className="h-ai" id="ai">
        <div className="h-ai-inner">
          <div>
            <p className="h-kicker">AI TAX ASSISTANT</p>
            <h2 className="h2">Tax questions at 2am? Fair enough.</h2>
            <p className="h-ai-sub">
              Instant answers on Irish and UK tax, VAT, limited companies and expenses, powered by
              Claude and backed by a chartered accountant.
            </p>
            <p className="h-ai-note">{FREE_QUESTIONS} free questions · unlimited on every plan</p>
          </div>
          <div className="ai-panel">
            <div className="ai-topbar">
              <div className="ai-title"><span className="ai-dot" /> FoundrBooks AI</div>
              <span className="ai-badge">Powered by Claude</span>
            </div>
            <div className="chat-messages">
              {messages.map((m, i) => (
                <div key={i} className={`msg ${m.role}`}>
                  {m.role === "assistant" && <div className="avatar">FB</div>}
                  <div className={`bubble ${m.role}`}>{m.content}</div>
                </div>
              ))}
              {loading && (
                <div className="msg assistant">
                  <div className="avatar">FB</div>
                  <div className="bubble assistant typing"><span /><span /><span /></div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>
            {!outOfQuestions && (
              <div className="quick-row">
                {QUICK_PROMPTS.map((p, i) => (
                  <button key={i} className="qpill" onClick={() => sendMessage(p.q)}>{p.label}</button>
                ))}
              </div>
            )}
            {outOfQuestions ? (
              <div className="ai-gate">
                <div className="ai-gate-title">That's your free questions used.</div>
                <p>
                  The assistant is included with every plan. If you'd rather talk it through first,
                  a 30-minute call costs nothing and you'll get a straight answer from a qualified accountant.
                </p>
                <div className="hero-btns">
                  <a href={mailto("Question for FoundrBooks")} className="btn-primary btn-primary-blue">Book a free 30-min call →</a>
                  <a href="#pricing" className="btn-ghost btn-ghost-light">See plans</a>
                </div>
              </div>
            ) : (
              <>
                <div className="input-row">
                  <input
                    className="chat-input"
                    placeholder="Ask any tax or accounting question..."
                    aria-label="Ask any tax or accounting question"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                  />
                  <button className="send-btn" onClick={() => sendMessage()} disabled={loading} aria-label="Send message">→</button>
                </div>
                <div className="ai-remaining">
                  {FREE_QUESTIONS - askedCount} free question{FREE_QUESTIONS - askedCount === 1 ? "" : "s"} left · included with every plan
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section className="h-section" id="pricing">
        <div className="h-center">
          <h2 className="h2">Flat monthly. No surprises.</h2>
          <p className="h-lede">Every plan: AI assistant, monthly reports and a direct line to your accountant. Cancel anytime.</p>
        </div>
        <div className="h-pricing">
          {PLANS.map((plan) => (
            <div key={plan.name} className={"h-plan" + (plan.featured ? " h-plan-hot" : "")}>
              <div className="h-plan-top">
                <div><h3>{plan.name}</h3><p className="h-plan-for">{plan.desc}</p></div>
                {plan.featured && <span className="h-pop">Most popular</span>}
              </div>
              <div className="h-plan-price">{plan.price}<span>/mo</span></div>
              <ul>
                {plan.features.map((f) => (
                  <li key={f}><Tick size={18} />{f}</li>
                ))}
              </ul>
              <button className="h-plan-btn" onClick={() => handleCheckout(plan)} disabled={checkingOut === plan.name}>
                {checkingOut === plan.name ? "Loading…" : `Get started with ${plan.name}`}
              </button>
            </div>
          ))}
        </div>
        <div className="h-oneoff">
          <div>
            <div className="h-oneoff-k">ONE-OFF · ALONGSIDE ANY PLAN</div>
            <h3>FRS 102 Section 23 switchover</h3>
            <p>
              The 2026 revenue rules, done once: contracts reviewed, the retained earnings adjustment
              calculated and reconciled, the journal posted and the accounts note drafted. Fixed fee per
              company, agreed before we start.
            </p>
          </div>
          <div className="h-oneoff-actions">
            <a href={whatsappLink(WA_SECTION_23)} target="_blank" rel="noopener noreferrer" className="btn-primary">Get a quote on WhatsApp</a>
            <Link to="/frs-102-section-23" className="h-link">What's involved →</Link>
          </div>
        </div>
        <p className="h-note">All prices in EUR · Secure payment by Stripe · No cancellation fees</p>
      </section>

      {/* CREDENTIALS */}
      <section className="h-creds" aria-label="Credentials">
        <div className="h-creds-inner">
          <div className="h-creds-list">
            <a className="h-cred" href={CREDENTIAL.directoryUrl} target="_blank" rel="noopener noreferrer">ACA · {CREDENTIAL.body} ↗</a>
            <span className="h-cred">{XERO.partnerLabel} · {XERO.short}</span>
            <span className="h-cred">{A2X.short}</span>
            <span className="h-cred">24h response</span>
          </div>
          <Badges />
        </div>
      </section>

      {/* REVIEWS */}
      <section className="h-section">
        <div className="h-reviews">
          <div>
            <div className="h-stars" aria-label="Rated 5 out of 5 on Google">★★★★★</div>
            <h2 className="h2" style={{ fontSize: "clamp(30px, 4vw, 48px)", marginTop: 10 }}>Rated 5.0 on Google.</h2>
            <p>Read what clients actually say, unedited, on our Google Business Profile.</p>
          </div>
          <a href={GOOGLE_PROFILE.url} target="_blank" rel="noopener noreferrer" className="btn-primary">Read the reviews ↗</a>
        </div>
      </section>

      {/* MERCH */}
      <section className="h-merch">
        <div className="h-merch-inner">
          <div>
            <p className="h-oneoff-k" style={{ color: "#0D0D0F" }}>THE MERCH</p>
            <h2 className="h2">The monkey does the books.</h2>
            <p>Basic tees in black, white and woodland camo, plus the sticker pack. Printed on demand, shipped to the UK, Ireland and EU.</p>
            <Link to="/shop" className="btn-primary">Shop the merch →</Link>
          </div>
          <div className="h-merch-art" aria-hidden="true">
            <img className="h-merch-logo" src="/merch/logo-filled.png" alt="" width="300" height="300" />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="h-cta">
        <h2 className="h2">Hand over the books.</h2>
        <p>Free 30-minute call · No commitment · Straight to a chartered accountant</p>
        <div className="hero-btns">
          <a href={mailto()} className="btn-primary">Book your free call</a>
          <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="btn-ghost">Message on WhatsApp</a>
        </div>
      </section>

      <Footer />
    </div>
  );
}

function Tick({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 12l5 5L20 7" />
    </svg>
  );
}

const MARQUEE = ["SELF ASSESSMENT", "VAT & OSS", "SAAS MRR", "SHOPIFY + A2X", "R&D CREDITS", "PAYROLL", "FRS 102", "CORPORATION TAX"];

const SERVICE_CARDS = [
  { name: "SaaS finance", desc: "MRR tracking, IFRS 15 revenue recognition and investor-ready metrics.", to: "/saas-accounting", more: "SaaS accounting" },
  { name: "Shopify & e-commerce", desc: "A2X certified. Payouts split into sales, fees, refunds and VAT that reconcile." },
  { name: "Startup accounting", desc: "Bookkeeping from incorporation through to Series A and beyond." },
  { name: "R&D tax credits", desc: "35% in Ireland, merged RDEC in the UK. Claims we can defend.", to: "/rd-tax-credits", more: "R&D guide" },
  { name: "VAT & cross-border", desc: "Registration, OSS and digital services VAT across the UK and EU.", to: "/vat-digital-services", more: "VAT guide" },
  { name: "Payroll", desc: "Monthly payroll in Ireland and the UK, registrations through to year-end filings." },
  { name: "Ireland or UK?", desc: "Where to incorporate, and what each choice costs you in tax.", to: "/ireland-vs-uk-company", more: "Compare" },
  { name: "AI tax assistant", desc: "24/7 instant answers, backed by a qualified accountant.", href: "#ai", more: "Try it", dark: true },
];
