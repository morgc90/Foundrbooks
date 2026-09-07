import { useState } from "react";
import { Link } from "react-router-dom";
import { mailto, whatsappLink } from "../data";

/**
 * Generic stepped decision tool, driven entirely by a config object from
 * src/decisionTools.js. Adding another tool means adding data, not code.
 *
 * Deliberately has no server call and stores nothing — the answers never leave
 * the browser. For a page asking founders about their profits and where they
 * live, that is the right default, and it is stated on the results screen.
 */
export default function DecisionTool({ config }) {
  const { questions, outcomes, notes, results, disclaimer, cta, related } = config;
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState([]);

  const done = step >= questions.length;

  const choose = (optionIndex) => {
    const next = [...answers];
    next[step] = optionIndex;
    setAnswers(next);
    setStep(step + 1);
  };

  const back = () => setStep(Math.max(0, step - 1));
  const restart = () => { setAnswers([]); setStep(0); };

  // --- scoring -------------------------------------------------------------
  const totals = {};
  const raised = [];
  Object.keys(outcomes).forEach((k) => { totals[k] = 0; });

  answers.forEach((optionIndex, qi) => {
    const opt = questions[qi]?.options[optionIndex];
    if (!opt) return;
    Object.entries(opt.weights || {}).forEach(([k, v]) => { totals[k] = (totals[k] || 0) + v; });
    (opt.flags || []).forEach((f) => { if (!raised.includes(f)) raised.push(f); });
  });

  // A narrow margin is not a recommendation. Anything inside closeMargin is
  // reported as genuinely close rather than dressed up as a decision — a tool
  // that sounds confident on a 1-0 split is worse than one that admits it.
  const closeMargin = config.closeMargin ?? 3;
  const ranked = Object.entries(totals).sort((a, b) => b[1] - a[1]);
  const isClose = ranked.length > 1 && (ranked[0][1] - ranked[1][1]) < closeMargin;
  const winner = isClose ? "tie" : ranked[0]?.[0];
  const result = results[winner] || results.tie;

  const progress = Math.round((Math.min(step, questions.length) / questions.length) * 100);

  // --- results -------------------------------------------------------------
  if (done) {
    return (
      <div className="dt">
        <div className="dt-result-head">
          <div className="section-label">Your result</div>
          <h3>{result.headline}</h3>
          <p>{result.body}</p>
        </div>

        {raised.map((f) => {
          const n = notes[f];
          if (!n) return null;
          return (
            <div key={f} className={n.tone === "warn" ? "callout callout-warn" : "callout"}>
              <strong>{n.title}</strong> {n.body}
            </div>
          );
        })}

        <p className="dt-disclaimer">{disclaimer}</p>
        <p className="dt-privacy">
          Your answers stayed in your browser. Nothing was sent anywhere or stored.
        </p>

        <div className="dt-cta">
          <h4>{cta.heading}</h4>
          <p>{cta.sub}</p>
          <div className="hero-btns">
            <a href={mailto(cta.subject)} className="btn-primary btn-primary-blue">
              Book a free 30-min call →
            </a>
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost btn-ghost-light"
            >
              Chat on WhatsApp
            </a>
          </div>
        </div>

        <div className="dt-foot">
          <button type="button" className="dt-link" onClick={restart}>
            ← Start again
          </button>
          {related && <Link to={related.to} className="dt-link">{related.label} →</Link>}
        </div>
      </div>
    );
  }

  // --- question ------------------------------------------------------------
  const q = questions[step];

  return (
    <div className="dt">
      <div className="dt-progress" role="progressbar" aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100}>
        <span style={{ width: `${progress}%` }} />
      </div>
      <div className="dt-step">Question {step + 1} of {questions.length}</div>

      <h3 className="dt-q">{q.q}</h3>
      {q.help && <p className="dt-help">{q.help}</p>}

      <div className="dt-options">
        {q.options.map((opt, i) => (
          <button
            key={i}
            type="button"
            className={"dt-option" + (answers[step] === i ? " is-chosen" : "")}
            onClick={() => choose(i)}
          >
            {opt.label}
          </button>
        ))}
      </div>

      {step > 0 && (
        <button type="button" className="dt-link" onClick={back}>← Back</button>
      )}
    </div>
  );
}
