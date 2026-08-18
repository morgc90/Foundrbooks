import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import HeroVisual from "../components/HeroVisual";
import { PLANS, SERVICES, REVIEWS, QUICK_PROMPTS, CREDENTIAL, mailto } from "../data";

export default function Home() {
  const canvasRef = useRef(null);
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

  // Animated canvas background
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !canvas.parentElement) return;
    const ctx = canvas.getContext("2d");
    let animId;
    let particles = [];
    let W, H;

    function resize() {
      W = canvas.width = canvas.parentElement.offsetWidth;
      H = canvas.height = canvas.parentElement.offsetHeight;
    }

    function makeParticle() {
      return {
        x: Math.random() * W,
        y: Math.random() * H,
        r: Math.random() * 1.2 + 0.3,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        alpha: Math.random() * 0.5 + 0.1,
      };
    }

    function init() {
      particles = Array.from({ length: 70 }, makeParticle);
    }

    function draw() {
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = "#04091a";
      ctx.fillRect(0, 0, W, H);

      ctx.strokeStyle = "rgba(91,163,245,0.035)";
      ctx.lineWidth = 0.5;
      for (let x = 0; x < W; x += 52) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke(); }
      for (let y = 0; y < H; y += 52) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke(); }

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 85) {
            ctx.strokeStyle = `rgba(91,163,245,${0.1 * (1 - d / 85)})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      for (const p of particles) {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > W) p.vx *= -1;
        if (p.y < 0 || p.y > H) p.vy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(91,163,245,${p.alpha})`;
        ctx.fill();
      }
      animId = requestAnimationFrame(draw);
    }

    const onResize = () => { resize(); init(); };
    resize(); init(); draw();
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  // Keep the chat pinned to the latest message — but never on first render,
  // which would yank the visitor past the hero to the middle of the page.
  const hasInteracted = useRef(false);
  useEffect(() => {
    if (!hasInteracted.current) return;
    chatEndRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, [messages, loading]);

  async function sendMessage(text) {
    const userText = text || input.trim();
    if (!userText || loading) return;
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
      {/* HERO */}
      <div className="hero-wrap">
        <canvas ref={canvasRef} className="hero-canvas" aria-hidden="true" />
        <Nav home />
        <div className="hero-content">
          <div className="hero-inner">
            <div className="hero-text">
              <div className="hero-badge"><span className="badge-dot" />AI-powered · ACA Qualified</div>
              <h1>Accounting built for<br /><em>founders.</em></h1>
              <p className="hero-sub">
                Your AI tax assistant, real-time bookkeeping, and an ACA-qualified accountant — all in one place.
              </p>
              <div className="hero-btns">
                <a href="#pricing" className="btn-primary">See pricing</a>
                <a href="#ai" className="btn-ghost">Try AI assistant →</a>
              </div>
              <div className="trust-row">
                <span>✓ Chartered accountant</span>
                <span>✓ 24h response</span>
                <span>✓ UK &amp; Ireland</span>
                <span>✓ GDPR compliant</span>
              </div>
              <a
                className="hero-credential"
                href={CREDENTIAL.directoryUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                {CREDENTIAL.name} — verify with {CREDENTIAL.body} ↗
              </a>
            </div>
            <div className="hero-image-wrap">
              <HeroVisual />
            </div>
          </div>
        </div>
        <div className="float-cards">
          {[
            { label: "Tax saved", val: "€8,240", sub: "vs. doing it yourself" },
            { label: "AI response", val: "<3s", sub: "instant answers" },
            { label: "Clients served", val: "200+", sub: "founders & freelancers" },
          ].map((c, i) => (
            <div key={i} className={`fcard fcard-${i}`}>
              <div className="fcard-label">{c.label}</div>
              <div className="fcard-val">{c.val}</div>
              <div className="fcard-sub">{c.sub}</div>
            </div>
          ))}
        </div>
      </div>

      {/* TICKER */}
      <div className="ticker">
        <div className="ticker-inner">
          {[
            "Self assessment filed on time",
            "VAT registration end-to-end",
            "SaaS MRR tracking built in",
            "Shopify reconciliation automated",
            "Corporation tax optimised",
            "AI assistant 24/7",
          ]
            .concat([
              "Self assessment filed on time",
              "VAT registration end-to-end",
              "SaaS MRR tracking built in",
              "Shopify reconciliation automated",
              "Corporation tax optimised",
              "AI assistant 24/7",
            ])
            .map((t, i) => (
              <span key={i} className="ticker-item">{t}</span>
            ))}
        </div>
      </div>

      <div className="main">
        {/* AI SECTION */}
        <section className="section" id="ai">
          <div className="section-label">AI assistant</div>
          <h2>Instant answers to any tax question</h2>
          <p className="section-sub">Powered by Claude AI, backed by an ACA-qualified accountant.</p>
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
            <div className="quick-row">
              {QUICK_PROMPTS.map((p, i) => (
                <button key={i} className="qpill" onClick={() => sendMessage(p.q)}>{p.label}</button>
              ))}
            </div>
            <div className="input-row">
              <input
                className="chat-input"
                placeholder="Ask any tax or accounting question..."
                aria-label="Ask any tax or accounting question"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              />
              <button className="send-btn" onClick={() => sendMessage()} disabled={loading} aria-label="Send message">↑</button>
            </div>
          </div>
        </section>

        {/* SERVICES */}
        <section className="section" id="services">
          <div className="section-label">Services</div>
          <h2>Everything you need.</h2>
          <p className="section-sub">
            Specialist accounting for online founders, SaaS businesses, Shopify stores, and the self-employed.
          </p>
          <div className="services-grid">
            {SERVICES.map((s, i) => {
              const inner = (
                <>
                  <div className="service-icon">{s.icon}</div>
                  <div className="service-name">{s.name}</div>
                  <div className="service-desc">{s.desc}</div>
                  {s.to && <div className="service-more">Learn more →</div>}
                </>
              );
              return s.to ? (
                <Link key={i} to={s.to} className="service-card service-card-link">{inner}</Link>
              ) : (
                <div key={i} className="service-card">{inner}</div>
              );
            })}
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section className="section how-section">
          <div className="section-label">How it works</div>
          <h2>Up and running in 3 steps.</h2>
          <p className="section-sub">Switching accountants or starting fresh — we make it completely painless.</p>
          <div className="steps-grid">
            <div className="step-card">
              <div className="step-num">01</div>
              <div className="step-icon">📞</div>
              <div className="step-name">Book a free 30-min call</div>
              <div className="step-desc">We learn about your business, answer your questions, and recommend the right plan. No pressure, no commitment.</div>
            </div>
            <div className="step-card">
              <div className="step-num">02</div>
              <div className="step-icon">⚙️</div>
              <div className="step-name">We set everything up</div>
              <div className="step-desc">We handle the transition from your old accountant, connect your accounts, and get your books in order. You don't lift a finger.</div>
            </div>
            <div className="step-card">
              <div className="step-num">03</div>
              <div className="step-icon">😌</div>
              <div className="step-name">Sit back and relax</div>
              <div className="step-desc">Your books are handled, your taxes are filed on time, and your AI assistant is available 24/7 for any questions.</div>
            </div>
          </div>
          <div className="how-cta">
            <a href={mailto()} className="btn-primary btn-primary-blue">Book your free call →</a>
            <span className="how-note">No commitment · 30 minutes · ACA qualified accountant</span>
          </div>
        </section>

        {/* PRICING */}
        <section className="section" id="pricing">
          <div className="section-label">Pricing</div>
          <h2>Simple pricing.</h2>
          <p className="section-sub">
            All plans include the AI assistant, monthly reports, and direct accountant access. Cancel anytime.
          </p>
          <div className="pricing-grid">
            {PLANS.map((plan, i) => (
              <div key={i} className={`price-card ${plan.featured ? "featured" : ""}`}>
                {plan.featured && <div className="price-badge">Most popular</div>}
                <div className="price-name">{plan.name}</div>
                <div className="price-desc">{plan.desc}</div>
                <div className="price-amount">{plan.price}<span className="price-per">/mo</span></div>
                <div className="price-period">cancel anytime · EUR</div>
                <div className="price-features">
                  {plan.features.map((f, j) => (
                    <div key={j} className="price-feature"><span className="check">✓</span> {f}</div>
                  ))}
                </div>
                <button
                  className="price-cta"
                  onClick={() => handleCheckout(plan)}
                  disabled={checkingOut === plan.name}
                >
                  {checkingOut === plan.name ? "Loading..." : `Get started with ${plan.name} →`}
                </button>
              </div>
            ))}
          </div>
          <p className="pricing-note">All prices in EUR. Secure payment via Stripe. Cancel anytime with no fees.</p>
        </section>

        {/* REVIEWS */}
        <section className="section reviews-section">
          <div className="section-label">Client reviews</div>
          <h2>Trusted by founders.</h2>
          <p className="section-sub">Real feedback from real clients — founders, freelancers, and online businesses.</p>
          <div className="reviews-grid">
            {REVIEWS.map((r, i) => (
              <div key={i} className="review-card">
                <div className="review-stars" aria-label="5 out of 5 stars">★★★★★</div>
                <p className="review-text">"{r.text}"</p>
                <div className="review-author">
                  <div className="review-avatar">{r.initial}</div>
                  <div>
                    <div className="review-name">{r.name}</div>
                    <div className="review-role">{r.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* STATS */}
        <section className="section stats-section">
          <div className="stats-grid">
            <div className="stat-cell"><div className="stat-num">ACA</div><div className="stat-lbl">Qualified accountant</div></div>
            <div className="stat-cell"><div className="stat-num">24h</div><div className="stat-lbl">Response guarantee</div></div>
            <div className="stat-cell"><div className="stat-num">EU</div><div className="stat-lbl">Cross-border expertise</div></div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
}
