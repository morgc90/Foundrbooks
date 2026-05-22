import { useState, useRef, useEffect } from "react";
import "./App.css";

const PLANS = [
  {
    name: "Starter",
    desc: "Sole traders & freelancers",
    price: "€99",
    priceId: "price_1TZaZBG4d0qXhaypu2eBPcNg",
    features: ["Self assessment return", "Expense tracking", "AI assistant access", "Quarterly check-ins"],
    featured: false,
  },
  {
    name: "Growth",
    desc: "Limited companies & SaaS",
    price: "€249",
    priceId: "price_1TZaa8G4d0qXhaypiJccAh0R",
    features: ["Full bookkeeping", "Corporation tax", "VAT filing", "Payroll up to 3", "Unlimited AI assistant", "Monthly calls"],
    featured: true,
  },
  {
    name: "Scale",
    desc: "High-growth & e-commerce",
    price: "€449",
    priceId: "price_1TZaaoG4d0qXhaypQuwu4ENv",
    features: ["Everything in Growth", "Investor reporting", "Multi-currency", "Unlimited payroll", "Weekly calls"],
    featured: false,
  },
];

const SERVICES = [
  { icon: "🚀", name: "Startup accounting", desc: "Bookkeeping from incorporation through to Series A and beyond." },
  { icon: "🔁", name: "SaaS finance", desc: "MRR tracking, IFRS 15 compliance, and investor-ready metrics." },
  { icon: "🛒", name: "Shopify bookkeeping", desc: "Inventory, multi-currency, and payment gateway reconciliation." },
  { icon: "🧾", name: "VAT & compliance", desc: "VAT registration, filing, and cross-border EU compliance." },
  { icon: "👤", name: "Self-employed", desc: "Self assessment, expenses, and tax planning for freelancers." },
  { icon: "✨", name: "AI tax assistant", desc: "24/7 instant answers backed by a qualified accountant." },
];

const REVIEWS = [
  { name: "Sarah Chen", role: "Founder, TechFlow SaaS", text: "FoundrBooks helped us navigate complex revenue recognition and investor reporting. Their SaaS expertise is unmatched.", initial: "S" },
  { name: "David Murphy", role: "CEO, GreenStore", text: "As a Shopify store owner, having an accountant who truly understands e-commerce has been game-changing for our business.", initial: "D" },
  { name: "James O'Brien", role: "Freelance Designer", text: "I used to dread tax season. Now it's completely stress-free. My self assessment is filed on time every year without me lifting a finger.", initial: "J" },
  { name: "Aoife Kelly", role: "Co-founder, LaunchPad", text: "From incorporation to our first funding round, FoundrBooks has been with us every step. Genuinely feel like they're part of the team.", initial: "A" },
  { name: "Marco Rossi", role: "Director, Rossi Consulting", text: "The AI assistant alone is worth it — I get instant answers to tax questions at 11pm without waiting for a call back.", initial: "M" },
  { name: "Emma Walsh", role: "Owner, The Candle Co.", text: "Switched from a big accountancy firm and the difference is night and day. Personal, fast, and they actually explain things clearly.", initial: "E" },
];

const QUICK_PROMPTS = [
  { label: "Sole trader vs Ltd?", q: "Am I better off as a sole trader or limited company?" },
  { label: "What can I claim?", q: "What expenses can I claim as self-employed?" },
  { label: "VAT threshold?", q: "When do I need to register for VAT?" },
  { label: "Paying myself?", q: "How do I pay myself from my limited company?" },
];

export default function App() {
  const canvasRef = useRef(null);
  const chatEndRef = useRef(null);
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Hi! Ask me anything about Irish or UK tax, self assessment, VAT, limited companies, or business expenses." },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [checkingOut, setCheckingOut] = useState("");
  const [successPlan, setSuccessPlan] = useState("");

  // Check for success redirect
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const plan = params.get("plan");
    if (plan) setSuccessPlan(plan);
  }, []);

  // Animated canvas background
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
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
        x: Math.random() * W, y: Math.random() * H,
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

      // Grid
      ctx.strokeStyle = "rgba(91,163,245,0.035)";
      ctx.lineWidth = 0.5;
      for (let x = 0; x < W; x += 52) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke(); }
      for (let y = 0; y < H; y += 52) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke(); }

      // Connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 85) {
            ctx.strokeStyle = `rgba(91,163,245,${0.1 * (1 - d / 85)})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath(); ctx.moveTo(particles[i].x, particles[i].y); ctx.lineTo(particles[j].x, particles[j].y); ctx.stroke();
          }
        }
      }

      // Particles
      for (const p of particles) {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > W) p.vx *= -1;
        if (p.y < 0 || p.y > H) p.vy *= -1;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(91,163,245,${p.alpha})`; ctx.fill();
      }
      animId = requestAnimationFrame(draw);
    }

    resize(); init(); draw();
    window.addEventListener("resize", () => { resize(); init(); });
    return () => { cancelAnimationFrame(animId); };
  }, []);

  useEffect(() => { chatEndRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages, loading]);

  async function sendMessage(text) {
    const userText = text || input.trim();
    if (!userText || loading) return;
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
      } else {
        alert("Something went wrong. Please try again or contact us directly.");
      }
    } catch {
      alert("Connection error. Please try again.");
    }
    setCheckingOut("");
  }

  if (successPlan) {
    return (
      <div className="success-screen">
        <div className="success-card">
          <div className="success-icon">✓</div>
          <h1>Welcome to FoundrBooks!</h1>
          <p>Your <strong>{successPlan}</strong> subscription is confirmed. We'll be in touch within 24 hours to get you set up.</p>
          <p className="success-contact">Questions? Email us at <a href="mailto:cashinify@gmail.com">cashinify@gmail.com</a></p>
          <button onClick={() => { setSuccessPlan(""); window.history.replaceState({}, "", "/"); }}>Back to site</button>
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      {/* HERO */}
      <div className="hero-wrap">
        <canvas ref={canvasRef} className="hero-canvas" />
        <nav className="nav">
          <div className="logo">Foundr<span>Books</span></div>
          <div className="nav-links">
            <a href="#services" className="nav-link">Services</a>
            <a href="#pricing" className="nav-link">Pricing</a>
            <a href="#ai" className="nav-link">AI assistant</a>
            <a href="tel:+34658208448" className="nav-cta">Book a call</a>
          </div>
        </nav>
        <div className="hero-content">
        <div className="hero-inner">
          <div className="hero-text">
            <div className="hero-badge"><span className="badge-dot" />AI-powered · ACA Qualified</div>
            <h1>Accounting built for<br /><em>founders.</em></h1>
            <p className="hero-sub">Your AI tax assistant, real-time bookkeeping, and an ACA-qualified accountant — all in one place.</p>
            <div className="hero-btns">
              <a href="#pricing" className="btn-primary">See pricing</a>
              <a href="#ai" className="btn-ghost">Try AI assistant →</a>
            </div>
            <div className="trust-row">
              <span>✓ ACA Qualified</span>
              <span>✓ 24h response</span>
              <span>✓ Ireland & Spain</span>
              <span>✓ GDPR compliant</span>
            </div>
          </div>
          <div className="hero-image-wrap">
            <img
              src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80&auto=format&fit=crop"
              alt="Founders working in a modern office"
              className="hero-image"
            />
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
          {["Self assessment filed on time", "VAT registration end-to-end", "SaaS MRR tracking built in", "Shopify reconciliation automated", "Corporation tax optimised", "AI assistant 24/7"].concat(
            ["Self assessment filed on time", "VAT registration end-to-end", "SaaS MRR tracking built in", "Shopify reconciliation automated", "Corporation tax optimised", "AI assistant 24/7"]
          ).map((t, i) => <span key={i} className="ticker-item">{t}</span>)}
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
              <input className="chat-input" placeholder="Ask any tax or accounting question..."
                value={input} onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()} />
              <button className="send-btn" onClick={() => sendMessage()} disabled={loading}>↑</button>
            </div>
          </div>
        </section>

        {/* SERVICES */}
        <section className="section" id="services">
          <div className="section-label">Services</div>
          <h2>Everything you need.</h2>
          <p className="section-sub">Specialist accounting for online founders, SaaS businesses, Shopify stores, and the self-employed.</p>
          <div className="services-grid">
            {SERVICES.map((s, i) => (
              <div key={i} className="service-card">
                <div className="service-icon">{s.icon}</div>
                <div className="service-name">{s.name}</div>
                <div className="service-desc">{s.desc}</div>
              </div>
            ))}
          </div>
        </section>

        {/* PRICING */}
        <section className="section" id="pricing">
          <div className="section-label">Pricing</div>
          <h2>Simple pricing.</h2>
          <p className="section-sub">All plans include the AI assistant, monthly reports, and direct accountant access. Cancel anytime.</p>
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
                <div className="review-stars">★★★★★</div>
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

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-inner">
          <div>
            <div className="logo" style={{ marginBottom: 8 }}>Foundr<span>Books</span></div>
            <p className="footer-desc">Specialist accounting for online founders, freelancers, and the self-employed. ACA qualified.</p>
          </div>
          <div className="footer-links">
            <div className="footer-col">
              <div className="footer-col-title">Services</div>
              <span>Startup accounting</span>
              <span>SaaS finance</span>
              <span>Shopify bookkeeping</span>
              <span>VAT & compliance</span>
            </div>
            <div className="footer-col">
              <div className="footer-col-title">Contact</div>
              <a href="mailto:cashinify@gmail.com">cashinify@gmail.com</a>
              <a href="tel:+34658208448">+34 658 208 448</a>
              <a href="https://foundrbooks.com">foundrbooks.com</a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 FoundrBooks. All rights reserved.</span>
          <span>ACA Qualified · Ireland & Spain · Payments by Stripe</span>
        </div>
      </footer>
    </div>
  );
}
