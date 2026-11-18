import { Link } from "react-router-dom";
import PageHero from "../components/PageHero";
import Footer from "../components/Footer";
import FaqSection from "../components/FaqSection";
import CtaSection from "../components/CtaSection";
import { articleFor } from "../articles";
import { GUIDES } from "../data";

/**
 * Generic long-form page driven by src/articles.js. Used for the blog-style
 * guides and simple service pages, so adding a page is a data change only.
 */
export default function Article({ path }) {
  const a = articleFor(path);
  if (!a) return null;

  const related = (a.related || [])
    .map((to) => GUIDES.find((g) => g.to === to))
    .filter(Boolean);

  return (
    <div className="app">
      <PageHero badge={a.badge} title={a.h1} sub={a.sub} ctaSubject={a.ctaSubject} />

      <div className="main">
        {a.sections.map((s, i) => (
          <section className="section" key={i}>
            {s.label && <div className="section-label">{s.label}</div>}
            <h2>{s.h2}</h2>
            {s.paras && (
              <div className="prose">
                {s.paras.map((p, j) => <p key={j}>{p}</p>)}
              </div>
            )}
            {s.table && (
              <div className="table-wrap" style={{ marginTop: s.paras ? 16 : 0 }}>
                <table className="cmp-table" style={{ minWidth: 0 }}>
                  <thead>
                    <tr>{s.table.head.map((h) => <th key={h}>{h}</th>)}</tr>
                  </thead>
                  <tbody>
                    {s.table.rows.map((r) => (
                      <tr key={r[0]}>
                        <th>{r[0]}</th>
                        {r.slice(1).map((c, k) => <td key={k}>{c}</td>)}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            {s.bullets && (
              <div className="split-col" style={{ marginTop: s.paras ? 16 : 0 }}>
                <ul>
                  {s.bullets.map((b, j) => <li key={j}>{b}</li>)}
                </ul>
              </div>
            )}
            {s.callout && <div className="callout">{s.callout}</div>}
          </section>
        ))}

        {a.faq && a.faq.length > 0 && <FaqSection items={a.faq} />}

        {related.length > 0 && (
          <section className="section guides-section">
            <div className="section-label">Related guides</div>
            <h2>Keep reading.</h2>
            <div className="guides-grid">
              {related.map((g) => (
                <Link key={g.to} to={g.to} className="guide-card">
                  <div className="guide-name">{g.name}</div>
                  <div className="guide-desc">{g.desc}</div>
                  <div className="guide-more">Read →</div>
                </Link>
              ))}
            </div>
          </section>
        )}

        <CtaSection
          heading="Talk to a chartered accountant."
          sub="A free 30-minute call, no commitment. We'll tell you plainly what you need and what it costs."
          subject={a.ctaSubject}
          disclaimer="Figures on this page were checked against Revenue, CRO and HMRC guidance in November 2026. Tax rules change; this page is general information, not advice for your specific circumstances."
        />
      </div>

      <Footer />
    </div>
  );
}
