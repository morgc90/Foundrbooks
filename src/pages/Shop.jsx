import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import { MERCH, TEE_SIZES, SHIPPING_EUR, merchById } from "../merch";
import { CAMO_SVG } from "../camo";

const BAG_KEY = "fb_bag";
const eur = (n) => `€${n % 1 ? n.toFixed(2) : n}`;

const TEE_PATH =
  "M95 20 L60 30 L10 72 L38 118 L66 102 L66 304 L234 304 L234 102 L262 118 L290 72 L240 30 L205 20 Q150 58 95 20 Z";

function Tee({ item }) {
  const clip = `clip-${item.id}`;
  return (
    <div className="tee" aria-hidden="true">
      <svg viewBox="0 0 300 320" width="240" height="256">
        {item.shirt === "camo" ? (
          <>
            <defs><clipPath id={clip}><path d={TEE_PATH} /></clipPath></defs>
            <g clipPath={`url(#${clip})`} dangerouslySetInnerHTML={{ __html: CAMO_SVG }} />
            <path d={TEE_PATH} fill="none" stroke="#0D0D0F" strokeWidth="4" strokeLinejoin="round" />
          </>
        ) : (
          <path d={TEE_PATH} fill={item.shirt} stroke="#0D0D0F" strokeWidth="4" strokeLinejoin="round" />
        )}
      </svg>
      <img className="tee-chest" src={item.chest} alt="" width="40" height="40" />
    </div>
  );
}

function StickerPack() {
  return (
    <div className="stk-pack" aria-hidden="true">
      <img className="stk-die stk-a" src="/merch/logo-filled.png" alt="" />
      <span className="stk-disc stk-b"><img src="/merch/head-bone.png" alt="" /></span>
      <span className="stk-disc stk-c"><img src="/merch/head-filled.png" alt="" /></span>
    </div>
  );
}

export default function Shop() {
  const [sizes, setSizes] = useState({});
  const [bag, setBag] = useState([]);
  const [added, setAdded] = useState(null);
  const [open, setOpen] = useState(false);
  const [paying, setPaying] = useState(false);
  const [error, setError] = useState("");

  // Restore the bag after hydration (the prerendered HTML always has an empty bag).
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(BAG_KEY) || "[]");
      if (Array.isArray(saved)) setBag(saved.filter((l) => merchById(l.id)));
    } catch {}
  }, []);
  useEffect(() => {
    try { localStorage.setItem(BAG_KEY, JSON.stringify(bag)); } catch {}
  }, [bag]);
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const visible = MERCH;
  const count = bag.reduce((n, l) => n + l.qty, 0);
  const subtotal = bag.reduce((n, l) => n + l.qty * merchById(l.id).price, 0);

  function add(item) {
    const size = item.kind === "tee" ? sizes[item.id] : null;
    if (item.kind === "tee" && !size) return;
    setBag((b) => {
      const i = b.findIndex((l) => l.id === item.id && l.size === size);
      if (i >= 0) return b.map((l, j) => (j === i ? { ...l, qty: Math.min(20, l.qty + 1) } : l));
      return [...b, { id: item.id, size, qty: 1 }];
    });
    setAdded(item.id);
    setTimeout(() => setAdded((a) => (a === item.id ? null : a)), 1600);
  }

  function changeQty(idx, delta) {
    setBag((b) => b.map((l, j) => (j === idx ? { ...l, qty: l.qty + delta } : l)).filter((l) => l.qty > 0));
  }

  async function checkout() {
    setPaying(true);
    setError("");
    try {
      const r = await fetch("/api/merch-checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items: bag }),
      });
      const data = await r.json();
      if (data.url) {
        window.location.href = data.url;
        return;
      }
      setError(data.error || "Checkout is unavailable right now.");
    } catch {
      setError("Connection error. Please try again.");
    }
    setPaying(false);
  }

  return (
    <div className="app">
      <Nav />

      <section className="shop-hero">
        <h1>Merch for people who <span className="hl">reconcile.</span></h1>
        <div className="shop-hero-side">
          <img src="/merch/logo-filled.png" alt="FoundrBooks monkey logo" width="150" height="150" className="shop-hero-logo" />
          <p>
            Three basic tees and a sticker pack. Printed on demand, so nothing sits in a warehouse.
            Very lean, very on-brand.
          </p>
        </div>
      </section>

      <div className="shop-bar">
        <div />
        <button className="bag-btn" onClick={() => setOpen(true)} aria-label={`Open bag, ${count} items`}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M6 7h12l-1 13H7L6 7z" /><path d="M9 7a3 3 0 0 1 6 0" />
          </svg>
          Bag <span className="bag-count">{count}</span>
        </button>
      </div>

      <section className="shop-grid" aria-label="Products">
        {visible.map((item) => {
          const isTee = item.kind === "tee";
          const chosen = sizes[item.id];
          const needSize = isTee && !chosen;
          const isAdded = added === item.id;
          return (
            <article key={item.id} className="prod">
              <div className="prod-stage" style={{ background: item.stage }}>
                {isTee ? <Tee item={item} /> : <StickerPack />}
                <span className="prod-tag">{item.tag}</span>
              </div>
              <div className="prod-body">
                <div className="prod-top">
                  <h2>{item.name}</h2>
                  <span className="prod-price">{eur(item.price)}</span>
                </div>
                <p className="prod-desc">{item.desc}</p>
                {isTee && (
                  <div className="sizes" role="group" aria-label={`Size for ${item.name}`}>
                    {TEE_SIZES.map((s) => (
                      <button
                        key={s}
                        className="size"
                        aria-pressed={chosen === s}
                        onClick={() => setSizes((m) => ({ ...m, [item.id]: s }))}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                )}
                <button
                  className={"add-btn" + (isAdded ? " is-added" : "")}
                  disabled={needSize}
                  onClick={() => add(item)}
                >
                  {isAdded ? "Added ✓" : needSize ? "Pick a size" : "Add to bag"}
                </button>
              </div>
            </article>
          );
        })}
      </section>

      <section className="shop-info">
        <div className="shop-info-inner">
          <h2>Zero inventory. Obviously.</h2>
          <div><h3>Made to order</h3><p>Each piece is printed when you order it. No waste, no dead stock.</p></div>
          <div><h3>Ships UK, IE &amp; EU</h3><p>Flat {eur(SHIPPING_EUR)} shipping. Printed in Europe, so no customs surprises.</p></div>
          <div><h3>Questions?</h3><p>Wrong size or a misprint? Message us and we'll sort it. <Link to="/" style={{ color: "#D4FF3A" }}>Back to accounting →</Link></p></div>
        </div>
      </section>

      <Footer />

      {open && (
        <>
          <div className="bag-scrim" onClick={() => setOpen(false)} />
          <aside className="bag" role="dialog" aria-modal="true" aria-label="Your bag">
            <div className="bag-head">
              <h2>Your bag</h2>
              <button className="bag-x" onClick={() => setOpen(false)} aria-label="Close bag">×</button>
            </div>
            <div className="bag-items">
              {bag.length === 0 && <p className="bag-empty">Nothing in here yet. Very pre-revenue of you.</p>}
              {bag.map((l, idx) => {
                const m = merchById(l.id);
                return (
                  <div key={l.id + (l.size || "")} className="bag-item">
                    <div>
                      <div className="bag-item-name">{m.name}</div>
                      <div className="bag-item-meta">{l.size ? `Size ${l.size} · ` : ""}{eur(m.price)} each</div>
                    </div>
                    <div className="qty">
                      <button onClick={() => changeQty(idx, -1)} aria-label={`One fewer ${m.name}`}>−</button>
                      <span aria-live="polite">{l.qty}</span>
                      <button onClick={() => changeQty(idx, 1)} aria-label={`One more ${m.name}`} disabled={l.qty >= 20}>+</button>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="bag-foot">
              <div className="bag-total"><span>Subtotal</span><span>{eur(subtotal)}</span></div>
              <div className="bag-fine">+ {eur(SHIPPING_EUR)} shipping to the UK, Ireland or EU. Secure payment by Stripe.</div>
              {error && <div className="bag-err" role="alert">{error}</div>}
              <button className="btn-primary" disabled={!bag.length || paying} onClick={checkout}>
                {paying ? "Opening checkout…" : "Checkout →"}
              </button>
            </div>
          </aside>
        </>
      )}
    </div>
  );
}
